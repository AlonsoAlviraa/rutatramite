#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "${BASH_SOURCE[0]}")/../.."

if bash .github/scripts/pm.sh has-script typecheck; then
  bash .github/scripts/pm.sh run typecheck
  exit 0
fi

if bash .github/scripts/pm.sh has-script type-check; then
  bash .github/scripts/pm.sh run type-check
  exit 0
fi

if [[ ! -f tsconfig.json ]]; then
  echo "No typecheck script or tsconfig.json; skipping."
  exit 0
fi

if ! bash .github/scripts/pm.sh has-dep typescript; then
  echo "tsconfig.json is present but typescript is not a dependency; skipping."
  exit 0
fi

# next-env.d.ts is generated and gitignored. A minimal reference keeps
# `tsc --noEmit` working before `next build` writes the full file.
if [[ ! -f next-env.d.ts ]] && bash .github/scripts/pm.sh has-dep next; then
  printf '%s\n' \
    '/// <reference types="next" />' \
    '/// <reference types="next/image-types/global" />' \
    > next-env.d.ts
  echo "Wrote a minimal next-env.d.ts so tsc can run before the Next build."
fi

bash .github/scripts/pm.sh exec tsc --noEmit --pretty false
