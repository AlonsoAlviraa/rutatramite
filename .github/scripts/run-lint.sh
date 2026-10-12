#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "${BASH_SOURCE[0]}")/../.."

if bash .github/scripts/pm.sh has-script lint; then
  bash .github/scripts/pm.sh run lint
  exit 0
fi

found=0
for candidate in \
  eslint.config.js eslint.config.mjs eslint.config.cjs eslint.config.ts \
  .eslintrc .eslintrc.js .eslintrc.cjs .eslintrc.json .eslintrc.yml .eslintrc.yaml
do
  if [[ -f "$candidate" ]]; then
    found=1
    break
  fi
done
if [[ "$found" -eq 1 ]]; then
  bash .github/scripts/pm.sh exec eslint .
  exit 0
fi

echo "No lint script or ESLint config found; skipping."
