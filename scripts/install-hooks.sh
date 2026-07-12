#!/bin/bash
#
# install-hooks.sh — Installs the git post-commit hook for Claude.md auto-update
#
# Usage: bash scripts/install-hooks.sh
#

set -e

PROJECT_DIR="/home/z/my-project"
HOOK_SOURCE="$PROJECT_DIR/scripts/post-commit"
HOOK_DEST="$PROJECT_DIR/.git/hooks/post-commit"

echo "🔧 Installing git hooks..."
echo ""

# Check if source exists
if [ ! -f "$HOOK_SOURCE" ]; then
  echo "❌ Hook source not found: $HOOK_SOURCE"
  exit 1
fi

# Check if .git/hooks exists
if [ ! -d "$PROJECT_DIR/.git/hooks" ]; then
  echo "❌ .git/hooks directory not found. Is this a git repo?"
  exit 1
fi

# Copy the hook
cp "$HOOK_SOURCE" "$HOOK_DEST"
chmod +x "$HOOK_DEST"

echo "✅ Installed post-commit hook to: $HOOK_DEST"
echo ""

# Verify the update script exists
if [ ! -f "$PROJECT_DIR/scripts/update-claude-md.ts" ]; then
  echo "❌ update-claude-md.ts not found. Please create it first."
  exit 1
fi
echo "✅ update-claude-md.ts found."

# Verify Claude.md exists
if [ ! -f "$PROJECT_DIR/Claude.md" ]; then
  echo "⚠️  Claude.md not found. The hook will create changelog entries but there's no file to update."
else
  echo "✅ Claude.md found."
fi

echo ""
echo "🎉 Setup complete!"
echo ""
echo "How it works:"
echo "  1. You make changes and commit:  git commit -m 'Add new feature'"
echo "  2. The post-commit hook runs automatically:"
echo "     a. Runs lint + TypeScript check"
echo "     b. Analyzes your commit diff with AI"
echo "     c. Updates Claude.md's Changelog section"
echo "     d. Amends your commit to include the Claude.md update"
echo ""
echo "To skip the hook for a commit:"
echo "  SKIP_CLAUDE_MD_UPDATE=1 git commit -m 'quick fix'"
echo ""
echo "To test without committing:"
echo "  bun run scripts/update-claude-md.ts --dry-run"
