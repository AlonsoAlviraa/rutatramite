#!/usr/bin/env bash
set -euo pipefail
cd frontend
npm ci
npx playwright install --with-deps chromium
mkdir -p monitor-results
curl --fail --silent --show-error https://visionsetil.com/RELEASE_MANIFEST.json -o monitor-results/release.json
node scripts/verify-production-operational.mjs > monitor-results/operational.json
npx playwright test --config playwright.monitor.config.ts
