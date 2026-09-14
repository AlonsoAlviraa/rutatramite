#!/usr/bin/env bash
set -euo pipefail
git config --global --add safe.directory /workspace
if [ -f sites/pilzbestimmung.com/scripts/validate-editorial-queue.mjs ]; then
  node sites/pilzbestimmung.com/scripts/validate-editorial-queue.mjs
  node sites/pilzbestimmung.com/scripts/build-content-index.mjs
  node --check sites/pilzbestimmung.com/assets/app.js
  node --check sites/pilzbestimmung.com/sw.js
  node sites/pilzbestimmung.com/scripts/validate-site.mjs
  git diff --exit-code -- sites/pilzbestimmung.com
else
  printf 'SKIP: German site is absent in this commit\n'
fi
