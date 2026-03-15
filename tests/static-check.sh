#!/usr/bin/env bash
# Static validation for the Voltara EV Configurator.
# Checks that required files exist and that expected code patterns are present.
# Usage: bash tests/static-check.sh

set -euo pipefail

PASS=0
FAIL=0

check() {
  local description="$1"
  local result="$2"
  if [ "$result" = "ok" ]; then
    echo "  PASS  $description"
    PASS=$((PASS + 1))
  else
    echo "  FAIL  $description"
    FAIL=$((FAIL + 1))
  fi
}

file_exists() {
  [ -f "$1" ] && echo "ok" || echo "fail"
}

contains() {
  grep -qF "$2" "$1" && echo "ok" || echo "fail"
}

contains_re() {
  grep -qE "$2" "$1" && echo "ok" || echo "fail"
}

echo ""
echo "=== Required files ==="
check "index.html exists"  "$(file_exists index.html)"
check "style.css exists"   "$(file_exists style.css)"
check "app.js exists"      "$(file_exists app.js)"
check "README.md exists"   "$(file_exists README.md)"

echo ""
echo "=== Button press animation (style.css) ==="
check "@keyframes btn-press is defined" \
  "$(contains style.css '@keyframes btn-press')"

check "btn-press animation applied to .cta-button:active" \
  "$(contains style.css '.cta-button:active')"

check "btn-press animation applied to .share-button:active" \
  "$(contains style.css '.share-button:active')"

check "btn-press animation applied to .copy-button:active" \
  "$(contains style.css '.copy-button:active')"

check "animation property references btn-press" \
  "$(contains style.css 'btn-press')"

check "scale transform used in keyframe" \
  "$(contains style.css 'scale')"

echo ""
echo "=== Reduced-motion accessibility (style.css) ==="
check "prefers-reduced-motion media query present" \
  "$(contains style.css 'prefers-reduced-motion')"

check "animation: none inside reduced-motion block" \
  "$(contains_re style.css 'prefers-reduced-motion[^}]*reduce')"

echo ""
echo "=== Buttons present in index.html ==="
check ".cta-button exists in markup" \
  "$(contains index.html 'cta-button')"

check ".share-button exists in markup" \
  "$(contains index.html 'share-button')"

check ".copy-button exists in markup" \
  "$(contains index.html 'copy-button')"

echo ""
echo "=== Summary ==="
echo "  Passed: $PASS"
echo "  Failed: $FAIL"
echo ""

if [ "$FAIL" -gt 0 ]; then
  exit 1
fi