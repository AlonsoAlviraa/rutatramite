#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "${BASH_SOURCE[0]}")/../.."

shopt -s nullglob
vitest_configs=(vitest.config.ts vitest.config.mts vitest.config.js vitest.config.mjs vitest.config.cts vitest.config.cjs)
jest_configs=(jest.config.ts jest.config.js jest.config.mjs jest.config.cjs jest.config.json)
has_vitest=0
has_jest=0
[[ ${#vitest_configs[@]} -gt 0 ]] && has_vitest=1
[[ ${#jest_configs[@]} -gt 0 ]] && has_jest=1
bash .github/scripts/pm.sh has-dep vitest && has_vitest=1
bash .github/scripts/pm.sh has-dep jest && has_jest=1

coverage=0
if bash .github/scripts/pm.sh has-dep @vitest/coverage-v8 \
  || bash .github/scripts/pm.sh has-dep @vitest/coverage-istanbul \
  || bash .github/scripts/pm.sh has-dep jest; then
  coverage=1
fi

if bash .github/scripts/pm.sh has-script test:coverage; then
  bash .github/scripts/pm.sh run test:coverage
  exit 0
fi

if [[ "$coverage" -eq 1 && "$has_vitest" -eq 1 ]]; then
  bash .github/scripts/pm.sh exec vitest run --coverage
  exit 0
fi

if [[ "$coverage" -eq 1 && "$has_jest" -eq 1 ]]; then
  bash .github/scripts/pm.sh exec jest --coverage
  exit 0
fi

if bash .github/scripts/pm.sh has-script test; then
  bash .github/scripts/pm.sh run test
  exit 0
fi

if [[ "$has_vitest" -eq 1 ]]; then
  bash .github/scripts/pm.sh exec vitest run
  exit 0
fi

if [[ "$has_jest" -eq 1 ]]; then
  bash .github/scripts/pm.sh exec jest
  exit 0
fi

echo "No unit test script, Vitest config, or Jest config; skipping."
