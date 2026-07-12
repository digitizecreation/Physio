#!/usr/bin/env bun
/**
 * update-claude-md.ts
 *
 * Automatically updates Claude.md after a commit by:
 * 1. Getting the latest commit's diff
 * 2. Analyzing what changed using the z-ai SDK
 * 3. Generating a concise changelog entry + any relevant doc updates
 * 4. Appending the entry to Claude.md's Changelog section
 *
 * Usage:
 *   bun run scripts/update-claude-md.ts           # Analyze last commit
 *   bun run scripts/update-claude-md.ts --dry-run  # Show what would change without writing
 */

import ZAI from "z-ai-web-dev-sdk";
import { readFileSync, writeFileSync, existsSync } from "fs";
import { execSync } from "child_process";

const CLAUDE_MD_PATH = "/home/z/my-project/Claude.md";
const DRY_RUN = process.argv.includes("--dry-run");

// ─── Helpers ───────────────────────────────────────────────

function run(cmd: string): string {
  try {
    return execSync(cmd, { encoding: "utf-8", cwd: "/home/z/my-project" }).trim();
  } catch {
    return "";
  }
}

function getLatestCommitInfo() {
  const hash = run("git rev-parse HEAD");
  const shortHash = run("git rev-parse --short HEAD");
  const message = run("git log -1 --pretty=%B");
  const date = run("git log -1 --pretty=%ci").split(" ")[0];
  const author = run("git log -1 --pretty=%an");
  return { hash, shortHash, message, date, author };
}

function getLatestDiff(): string {
  // Get the diff of the latest commit (committed changes)
  // Limit to 5000 chars to avoid token overflow
  const diff = run("git diff HEAD~1 HEAD --stat") + "\n\n" + run("git diff HEAD~1 HEAD -- src/ next.config.ts eslint.config.mjs tsconfig.json Caddyfile package.json");
  return diff.slice(0, 5000);
}

function getCurrentClaudeMd(): string {
  if (!existsSync(CLAUDE_MD_PATH)) {
    console.error("❌ Claude.md not found at", CLAUDE_MD_PATH);
    process.exit(1);
  }
  return readFileSync(CLAUDE_MD_PATH, "utf-8");
}

// ─── AI Analysis ───────────────────────────────────────────

async function analyzeChanges(
  commitInfo: ReturnType<typeof getLatestCommitInfo>,
  diff: string,
  currentClaudeMd: string,
): Promise<{ changelogEntry: string; docUpdates: string[] }> {
  console.log("🤖 Analyzing commit with AI...");

  const zai = await ZAI.create();

  const prompt = `You are a documentation assistant for a Next.js physiotherapy website project.

A new git commit was just made. Your job is to update the project's Claude.md file (a permanent instruction manual for AI coding agents).

## Latest Commit
- Hash: ${commitInfo.shortHash}
- Message: ${commitInfo.message}
- Date: ${commitInfo.date}
- Author: ${commitInfo.author}

## Diff (truncated to 5000 chars)
\`\`\`
${diff}
\`\`\`

## Current Claude.md (last 60 lines)
\`\`\`
${currentClaudeMd.split("\n").slice(-60).join("\n")}
\`\`\`

## Your Task
Generate a JSON response with two fields:

1. "changelogEntry" — A single concise line for the Changelog section, formatted as:
   "- **YYYY-MM-DD**: [Brief description of what the commit changed or added]"
   Use the commit date. Keep it under 120 characters. Focus on WHAT changed, not HOW.

2. "docUpdates" — An array of strings. Each string is a specific instruction for updating Claude.md (e.g., "Add a new section component to the Section Components table", "Update the Known Debt section to remove the fixed item", "Note the new API route in Project Structure"). Only include updates that are actually needed based on the diff. If no doc updates are needed (just a changelog entry), return an empty array.

Rules:
- Be concise. The changelog entry is ONE line.
- Only suggest doc updates if the commit changes architecture, adds/removes files, changes conventions, or fixes known debt.
- Do NOT suggest rewriting large sections — only targeted additions/removals.
- Return ONLY valid JSON, no markdown fences, no explanation.

Response format:
{"changelogEntry": "- **2025-07-12**: ...", "docUpdates": ["...", "..."]}`;

  const response = await zai.chat.completions.create({
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    thinking: { type: "disabled" },
  });

  const content = response.choices[0]?.message?.content?.trim() || "";

  // Parse JSON — handle potential markdown fences
  let jsonStr = content;
  if (jsonStr.startsWith("```")) {
    jsonStr = jsonStr.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "");
  }

  try {
    const parsed = JSON.parse(jsonStr);
    return {
      changelogEntry: parsed.changelogEntry || "",
      docUpdates: Array.isArray(parsed.docUpdates) ? parsed.docUpdates : [],
    };
  } catch {
    console.warn("⚠️  Could not parse AI response as JSON. Using fallback.");
    return {
      changelogEntry: `- **${commitInfo.date}**: ${commitInfo.message.split("\n")[0].slice(0, 100)}`,
      docUpdates: [],
    };
  }
}

// ─── Update Claude.md ──────────────────────────────────────

function updateClaudeMd(
  current: string,
  changelogEntry: string,
  docUpdates: string[],
  commitInfo: ReturnType<typeof getLatestCommitInfo>,
): string {
  let updated = current;

  // 1. Add changelog entry under "## Changelog (Recent)" header
  const changelogHeader = "## Changelog (Recent)";
  if (updated.includes(changelogHeader)) {
    const headerIndex = updated.indexOf(changelogHeader) + changelogHeader.length;
    // Find the next newline after the header
    const afterHeader = updated.indexOf("\n", headerIndex);
    const insertPoint = afterHeader + 1;

    // Check if this exact entry already exists (avoid duplicates)
    if (!updated.includes(changelogEntry)) {
      updated =
        updated.slice(0, insertPoint) +
        changelogEntry +
        "\n" +
        updated.slice(insertPoint);
      console.log("✅ Added changelog entry:", changelogEntry);
    } else {
      console.log("ℹ️  Changelog entry already exists, skipping.");
    }
  }

  // 2. If there are doc updates, append them as an HTML comment at the end
  //    (so they don't clutter the doc but are visible to the next agent)
  if (docUpdates.length > 0) {
    const note = `
<!--
AUTO-GENERATED DOC UPDATE SUGGESTIONS (from commit ${commitInfo.shortHash} on ${commitInfo.date})
Review and apply manually, then delete this comment:
${docUpdates.map((u) => `- ${u}`).join("\n")}
-->`;
    // Remove any previous auto-generated note first
    updated = updated.replace(/<!--\nAUTO-GENERATED DOC UPDATE SUGGESTIONS[\s\S]*?-->/g, "");
    updated = updated.trimEnd() + "\n" + note + "\n";
    console.log(`📝 Added ${docUpdates.length} doc update suggestion(s) as HTML comment.`);
  }

  return updated;
}

// ─── Main ──────────────────────────────────────────────────

async function main() {
  console.log("📋 Claude.md Auto-Updater");
  console.log("==========================\n");

  const commitInfo = getLatestCommitInfo();
  console.log(`Latest commit: ${commitInfo.shortHash} — "${commitInfo.message.split("\n")[0]}"`);
  console.log(`Date: ${commitInfo.date}, Author: ${commitInfo.author}\n`);

  const diff = getLatestDiff();
  if (!diff || diff.trim().length < 10) {
    console.log("ℹ️  No meaningful diff found. Nothing to update.");
    return;
  }

  const currentClaudeMd = getCurrentClaudeMd();

  const { changelogEntry, docUpdates } = await analyzeChanges(diff, diff, currentClaudeMd).catch((err) => {
    console.error("❌ AI analysis failed:", err.message);
    process.exit(1);
  });

  console.log("\n--- AI Analysis Results ---");
  console.log("Changelog entry:", changelogEntry);
  console.log("Doc updates:", docUpdates.length > 0 ? docUpdates : "(none)");

  if (DRY_RUN) {
    console.log("\n🧪 Dry run mode — not writing changes.");
    return;
  }

  const updated = updateClaudeMd(currentClaudeMd, changelogEntry, docUpdates, commitInfo);

  if (updated !== currentClaudeMd) {
    writeFileSync(CLAUDE_MD_PATH, updated, "utf-8");
    console.log("\n✅ Claude.md updated successfully!");
  } else {
    console.log("\nℹ️  No changes needed.");
  }
}

main().catch((err) => {
  console.error("❌ Fatal error:", err);
  process.exit(1);
});
