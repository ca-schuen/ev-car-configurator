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
echo "=== Dark mode toggle (index.html) ==="
check "dark-toggle button exists in markup" \
  "$(contains index.html 'dark-toggle')"

check "dark mode early-init script present in <head>" \
  "$(contains index.html 'localStorage.getItem')"

check "dark mode class applied to <html> element" \
  "$(contains index.html "document.documentElement.classList.add('dark')")"

echo ""
echo "=== Dark mode styles (style.css) ==="
check "html.dark body rule defined" \
  "$(contains style.css 'html.dark body')"

check "html.dark header rule defined" \
  "$(contains style.css 'html.dark header')"

check "html.dark .summary-panel rule defined" \
  "$(contains style.css 'html.dark .summary-panel')"

check "dark-toggle button styled" \
  "$(contains style.css '.dark-toggle')"

echo ""
echo "=== Dark mode logic (app.js) ==="
check "initDarkMode function defined" \
  "$(contains app.js 'initDarkMode')"

check "dark-toggle element retrieved by id" \
  "$(contains app.js 'dark-toggle')"

check "classList.toggle used to switch dark class" \
  "$(contains app.js "classList.toggle")"

check "localStorage used to persist dark mode preference" \
  "$(contains app.js "localStorage.setItem")"

check "sun emoji shown in dark mode" \
  "$(contains app.js '☀️')"

check "moon emoji shown in light mode" \
  "$(contains app.js '🌙')"

check "initDarkMode called on page load" \
  "$(contains_re app.js 'initDarkMode\(\)')"

echo ""
echo "=== Summary ==="
echo "  Passed: $PASS"
echo "  Failed: $FAIL"
echo ""

if [ "$FAIL" -gt 0 ]; then
  exit 1
fi