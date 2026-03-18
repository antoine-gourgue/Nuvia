#!/usr/bin/env bash
# Validates that a PR description contains the required Versioning section.
# Used by CI to enforce versioning discipline on every merge request.
#
# Usage: PR_BODY="..." ./scripts/check-pr-versioning.sh

set -euo pipefail

if [ -z "${PR_BODY:-}" ]; then
  echo "::error::PR_BODY environment variable is empty or not set."
  exit 1
fi

ERRORS=()

check_section() {
  local pattern="$1"
  local label="$2"
  if ! echo "$PR_BODY" | grep -qi "$pattern"; then
    ERRORS+=("Missing required section: $label")
  fi
}

check_section "## Versioning" "## Versioning"
check_section "Release impact" "Release impact"
check_section "Suggested version" "Suggested version"
check_section "Changelog summary" "Changelog summary"
check_section "Migration notes" "Migration notes"

# Check that at least one impact checkbox is checked
if ! echo "$PR_BODY" | grep -qE "\[x\] (major|minor|patch|none)"; then
  ERRORS+=("No release impact selected (mark at least one checkbox with [x])")
fi

if [ ${#ERRORS[@]} -gt 0 ]; then
  echo "::error::PR versioning validation failed:"
  for err in "${ERRORS[@]}"; do
    echo "  - $err"
  done
  echo ""
  echo "Please fill in the Versioning section of your PR description."
  exit 1
fi

echo "PR versioning check passed."
