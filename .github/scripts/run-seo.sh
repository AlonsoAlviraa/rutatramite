#!/usr/bin/env bash
# Run package.json scripts whose names mention sitemap, llms, or metadata.
set -euo pipefail
cd "$(dirname "${BASH_SOURCE[0]}")/../.."

if [[ ! -f package.json ]]; then
  echo "No package.json; skipping SEO scripts."
  exit 0
fi

mapfile -t names < <(node -e '
  const fs = require("fs");
  const pkg = JSON.parse(fs.readFileSync("package.json", "utf8"));
  const scripts = pkg.scripts || {};
  for (const name of Object.keys(scripts)) {
    if (/(sitemap|llms|metadata)/i.test(name)) console.log(name);
  }
')

if [[ ${#names[@]} -eq 0 ]]; then
  echo "No sitemap, llms, or metadata npm scripts; skipping."
  exit 0
fi

if ! command -v python >/dev/null 2>&1 && command -v python3 >/dev/null 2>&1; then
  mkdir -p "${HOME}/.local/bin"
  ln -sfn "$(command -v python3)" "${HOME}/.local/bin/python"
  export PATH="${HOME}/.local/bin:${PATH}"
fi

for name in "${names[@]}"; do
  echo "::group::npm script ${name}"
  bash .github/scripts/pm.sh run "$name"
  echo "::endgroup::"
done
