#!/usr/bin/env node
/**
 * update-claude-md.ts
 *
 * Automatically updates CLAUDE.md after a commit by appending a changelog entry.
 * Two modes:
 *   1. AI mode (if .z-ai-config exists) — uses z-ai SDK to summarize the diff and
 *      suggest doc updates.
 *   2. Fallback mode (default) — generates a deterministic changelog line from the
 *      commit message. No network, no API key, no bun required.
 *
 * Usage:
 *   node scripts/update-claude-md.ts           # Update after the last commit
 *   node scripts/update-claude-md.ts --dry-run  # Show what would change without writing
 */

import { readFileSync, writeFileSync, existsSync } from "fs";
import { execSync } from "child_process";
import { join } from "path";
import { homedir } from "os";

// ─── Config ────────────────────────────────────────────────
// process.cwd() is set to project root by the post-commit hook (and is the default
// for `node scripts/...` invocations from the project root).
const PROJECT_DIR = process.cwd();
const CLAUDE_MD_PATH = join(PROJECT_DIR, "CLAUDE.md");
const ZAI_CONFIG_PATHS = [
  join(PROJECT_DIR, ".z-ai-config"),
  join(homedir(), ".z-ai-config"),
  "/etc/.z-ai-config",
];

const DRY_RUN = process.argv.includes("--dry-run");

// ─── Helpers ───────────────────────────────────────────────

function run(cmd: string): string {
  try {
    return execSync(cmd, { encoding: "utf-8", cwd: PROJECT_DIR }).trim();
  } catch {
    return "";
  }
}

function hasZaiConfig(): boolean {
  return ZAI_CONFIG_PATHS.some((p) => existsSync(p));
}

function getLatestCommitInfo() {
  const hash = run("git rev-parse HEAD");
  const shortHash = run("git rev-parse --short HEAD");
  const message = run("git log -1 --pretty=%B");
  const date = run("git log -1 --pretty=%ci").split(" ")[0];
  const author = run("git log -1 --pretty=%an");
  return { hash, shortHash, message, date, author };
}

function getLatestDiffStat(): string {
  return run("git diff HEAD~1 HEAD --stat") || "";
}

function getCurrentClaudeMd(): string {
  if (!existsSync(CLAUDE_MD_PATH)) {
    console.error("❌ CLAUDE.md not found at", CLAUDE_MD_PATH);
    process.exit(1);
  }
  return readFileSync(CLAUDE_MD_PATH, "utf-8");
}

// ─── Fallback (deterministic, no AI) ───────────────────────

function makeFallbackEntry(commit: ReturnType<typeof getLatestCommitInfo>): string {
  // First line of commit message, trimmed
  const subject = commit.message.split("\n")[0].trim();
  // Conventional-commit prefix: drop "feat:", "fix:" etc. for cleaner changelog
  const cleanSubject = subject.replace(/^(feat|fix|chore|docs|refactor|perf|test|build|ci|style)(\([^)]+\))?:\s*/i, "");
  // Truncate to keep changelog readable
  const truncated = cleanSubject.length > 100 ? cleanSubject.slice(0, 97) + "..." : cleanSubject;
  return `- **${commit.date}**: ${truncated}`;
}

// ─── AI mode (optional, requires .z-ai-config) ─────────────

type AnalysisResult = { changelogEntry: string; docUpdates: string[] };

async function analyzeChangesWithAi(
  commit: ReturnType<typeof getLatestCommitInfo>,
  diff: string,
  currentClaudeMd: string,
): Promise<AnalysisResult> {
  console.log("🤖 Analyzing commit with AI (z-ai SDK)...");

  // Dynamic import so the fallback path doesn't pay the cost
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const ZAI = (await import("z-ai-web-dev-sdk")).default;

  const zai = await ZAI.create();

  const prompt = `You are a documentation assistant for a Next.js physiotherapy website project.

A new git commit was just made. Your job is to update the project's CLAUDE.md file (a permanent instruction manual for AI coding agents).

## Latest Commit
- Hash: ${commit.shortHash}
- Message: ${commit.message}
- Date: ${commit.date}
- Author: ${commit.author}

## Diff (truncated to 5000 chars)
\`\`\`
${diff.slice(0, 5000)}
\`\`\`

## Current CLAUDE.md (last 60 lines)
\`\`\`
${currentClaudeMd.split("\n").slice(-60).join("\n")}
\`\`\`

## Your Task
Generate a JSON response with two fields:

1. "changelogEntry" — A single concise line for the Changelog section, formatted as:
   "- **YYYY-MM-DD**: [Brief description of what the commit changed or added]"
   Use the commit date. Keep it under 120 characters. Focus on WHAT changed, not HOW.

2. "docUpdates" — An array of strings. Each string is a specific instruction for updating CLAUDE.md (e.g., "Add a new section component to the Section Components table", "Update the Known Debt section to remove the fixed item"). Only include updates that are actually needed. If none are needed, return an empty array.

Rules:
- Be concise. The changelog entry is ONE line.
- Only suggest doc updates if the commit changes architecture, adds/removes files, changes conventions, or fixes known debt.
- Do NOT suggest rewriting large sections — only targeted additions/removals.
- Return ONLY valid JSON, no markdown fences, no explanation.

Response format:
{"changelogEntry": "- **2025-07-12**: ...", "docUpdates": ["..."]}`;

  const response = await zai.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    thinking: { type: "disabled" },
  });

  const content = (response.choices[0]?.message?.content || "").trim();

  // Parse JSON — handle potential markdown fences
  let jsonStr = content;
  if (jsonStr.startsWith("```")) {
    jsonStr = jsonStr.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "");
  }

  try {
    const parsed = JSON.parse(jsonStr);
    return {
      changelogEntry: parsed.changelogEntry || makeFallbackEntry(commit),
      docUpdates: Array.isArray(parsed.docUpdates) ? parsed.docUpdates : [],
    };
  } catch {
    console.warn("⚠️  Could not parse AI response as JSON. Using fallback.");
    return {
      changelogEntry: makeFallbackEntry(commit),
      docUpdates: [],
    };
  }
}

// ─── File update ───────────────────────────────────────────

function insertChangelogEntry(current: string, entry: string): string {
  const header = "## Changelog (Recent)";
  if (!current.includes(header)) {
    // File doesn't have the expected section — append at the end
    return current.trimEnd() + "\n\n## Changelog (Recent)\n" + entry + "\n";
  }

  // Avoid duplicates
  if (current.includes(entry)) {
    console.log("ℹ️  Changelog entry already exists, skipping.");
    return current;
  }

  const headerIndex = current.indexOf(header) + header.length;
  const afterHeader = current.indexOf("\n", headerIndex);
  const insertPoint = afterHeader + 1;

  return current.slice(0, insertPoint) + entry + "\n" + current.slice(insertPoint);
}

function appendDocUpdateSuggestions(
  current: string,
  docUpdates: string[],
  commit: ReturnType<typeof getLatestCommitInfo>,
): string {
  if (docUpdates.length === 0) return current;

  const note = `
<!--
AUTO-GENERATED DOC UPDATE SUGGESTIONS (from commit ${commit.shortHash} on ${commit.date})
Review and apply manually, then delete this comment:
${docUpdates.map((u) => `- ${u}`).join("\n")}
-->`;

  // Remove any previous auto-generated note
  const cleaned = current.replace(/<!--\nAUTO-GENERATED DOC UPDATE SUGGESTIONS[\s\S]*?-->/g, "");
  return cleaned.trimEnd() + "\n" + note + "\n";
}

// ─── Main ──────────────────────────────────────────────────

async function main() {
  console.log("📋 CLAUDE.md Auto-Updater");
  console.log("==========================\n");

  const commit = getLatestCommitInfo();
  if (!commit.hash) {
    console.error("❌ No git commit found at", PROJECT_DIR);
    process.exit(1);
  }

  console.log(`Latest commit: ${commit.shortHash} — "${commit.message.split("\n")[0]}"`);
  console.log(`Date: ${commit.date}, Author: ${commit.author}\n`);

  const diffStat = getLatestDiffStat();
  if (!diffStat || diffStat.trim().length < 5) {
    console.log("ℹ️  No meaningful diff found. Nothing to update.");
    return;
  }

  const currentClaudeMd = getCurrentClaudeMd();

  // Choose mode
  const useAi = hasZaiConfig();
  let changelogEntry: string;
  let docUpdates: string[];

  if (useAi) {
    try {
      const result = await analyzeChangesWithAi(commit, diffStat, currentClaudeMd);
      changelogEntry = result.changelogEntry;
      docUpdates = result.docUpdates;
    } catch (err) {
      console.warn("⚠️  AI analysis failed, falling back to deterministic mode:", (err as Error).message);
      changelogEntry = makeFallbackEntry(commit);
      docUpdates = [];
    }
  } else {
    console.log("ℹ️  No .z-ai-config found — using deterministic fallback (commit message → changelog line).");
    changelogEntry = makeFallbackEntry(commit);
    docUpdates = [];
  }

  console.log("\n--- Result ---");
  console.log("Changelog entry:", changelogEntry);
  console.log("Doc updates:", docUpdates.length > 0 ? docUpdates : "(none)");

  if (DRY_RUN) {
    console.log("\n🧪 Dry run mode — not writing changes.");
    return;
  }

  let updated = insertChangelogEntry(currentClaudeMd, changelogEntry);
  updated = appendDocUpdateSuggestions(updated, docUpdates, commit);

  if (updated !== currentClaudeMd) {
    writeFileSync(CLAUDE_MD_PATH, updated, "utf-8");
    console.log("\n✅ CLAUDE.md updated successfully!");
  } else {
    console.log("\nℹ️  No changes needed.");
  }
}

main().catch((err) => {
  console.error("❌ Fatal error:", err);
  process.exit(1);
});
