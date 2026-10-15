#!/usr/bin/env bash
# Place a downloaded next-build artifact at ./.next, whichever layout the uploader used.
set -euo pipefail
cd "$(dirname "${BASH_SOURCE[0]}")/../.."

src="${1:-next-artifact}"
if [[ ! -d "$src" ]]; then
  echo "No build artifact directory at ${src}; skipping restore."
  exit 0
fi

if [[ -z "$(find "$src" -mindepth 1 -print -quit)" ]]; then
  echo "Build artifact is empty; skipping restore."
  rm -rf "$src"
  exit 0
fi

rm -rf .next
if [[ -d "$src/.next" ]]; then
  mv "$src/.next" .next
elif [[ -f "$src/BUILD_ID" || -d "$src/server" || -d "$src/static" ]]; then
  mv "$src" .next
else
  echo "Build artifact did not contain Next.js output." >&2
  find "$src" -maxdepth 2 -type d -o -type f | head -50 >&2
  exit 1
fi

rm -rf "$src"
test -f .next/BUILD_ID
echo "Restored .next ($(cat .next/BUILD_ID))"
