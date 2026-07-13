#!/bin/bash
#
# install-hooks.sh — Installs the git post-commit hook for CLAUDE.md auto-update
#
# Usage:   bash scripts/install-hooks.sh
#
# Resolves paths from the script's own location, so it works on any host
# (Linux sandbox, Windows + Git Bash, macOS). No bun required.
#

set -e

# Resolve project root and hook source/dest relative to this script
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
HOOK_SOURCE="$SCRIPT_DIR/post-commit"
HOOK_DEST="$PROJECT_DIR/.git/hooks/post-commit"

echo "🔧 Installing git hooks..."
echo ""
echo "Project dir:  $PROJECT_DIR"
echo "Hook source:  $HOOK_SOURCE"
echo "Hook dest:    $HOOK_DEST"
echo ""

# Sanity checks
if [ ! -f "$HOOK_SOURCE" ]; then
  echo "❌ Hook source not found: $HOOK_SOURCE"
  exit 1
fi

if [ ! -d "$PROJECT_DIR/.git" ]; then
  echo "❌ Not a git repository: $PROJECT_DIR"
  exit 1
fi

if [ ! -d "$PROJECT_DIR/.git/hooks" ]; then
  echo "❌ .git/hooks directory missing."
  exit 1
fi

# Copy + chmod
cp "$HOOK_SOURCE" "$HOOK_DEST"
chmod +x "$HOOK_DEST"

echo "✅ Installed post-commit hook."
echo ""

# Verify the updater script exists
if [ ! -f "$SCRIPT_DIR/update-claude-md.ts" ]; then
  echo "❌ update-claude-md.ts not found at $SCRIPT_DIR/update-claude-md.ts"
  exit 1
fi
echo "✅ update-claude-md.ts found."

# Verify CLAUDE.md exists
if [ ! -f "$PROJECT_DIR/CLAUDE.md" ]; then
  echo "⚠️  CLAUDE.md not found at project root — the hook will create the file on first run."
else
  echo "✅ CLAUDE.md found."
fi

# Detect runtime
if command -v bun >/dev/null 2>&1; then
  RUNTIME="bun"
elif command -v node >/dev/null 2>&1; then
  RUNTIME="node (the hook auto-detects)"
else
  echo "❌ Neither bun nor node is on PATH. Install Node 20+ and try again."
  exit 1
fi
echo "✅ Runtime available: $RUNTIME"

# Optional: z-ai config check (for AI-powered updates)
if [ -f "$PROJECT_DIR/.z-ai-config" ] || [ -f "$HOME/.z-ai-config" ] || [ -f "/etc/.z-ai-config" ]; then
  echo "✅ .z-ai-config found — AI-powered doc updates will be used."
else
  echo "ℹ️  No .z-ai-config found — hook will use the deterministic fallback (commit message → changelog line)."
  echo "   To enable AI summarization, create a .z-ai-config with baseUrl + apiKey."
fi

echo ""
echo "🎉 Setup complete!"
echo ""
echo "How it works:"
echo "  1. You make changes and commit:  git commit -m 'Add new feature'"
echo "  2. The post-commit hook runs automatically:"
echo "     a. Runs ESLint on the changed files (pre-existing errors in other files won't block)"
echo "     b. Runs tsc --noEmit on src/ (must be clean)"
echo "     c. Updates CLAUDE.md's Changelog section"
echo "     d. Amends your commit to include the CLAUDE.md update"
echo ""
echo "To skip the hook for a specific commit:"
echo "  SKIP_CLAUDE_MD_UPDATE=1 git commit -m 'quick fix'"
echo ""
echo "To test without committing:"
echo "  node scripts/update-claude-md.ts --dry-run"
