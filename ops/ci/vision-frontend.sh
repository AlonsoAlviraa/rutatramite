#!/usr/bin/env bash
set -euo pipefail
git config --global --add safe.directory /workspace
cd frontend
npm ci
npx tsc --noEmit
npm run lint
npm run seo:content && npm run seo:assets && npm run seo:prerender
# URL fallback tests require an unconfigured app URL; builds retain the runner URL.
env -u VITE_PUBLIC_APP_URL npm test -- --maxWorkers=2 --minWorkers=1
node --test scripts/score-seo-growth.test.mjs scripts/summarize-seo-growth.test.mjs scripts/verify-production-operational.test.mjs scripts/indexation-watchlist.test.mjs
python -m unittest discover -s ../deploy -p test_patch_caddy_production_policy.py
npm run store:check -- --maxWorkers=2 --minWorkers=1
npm run build
git diff --exit-code -- ../content/guias public src/data/generated src/styles/home-critical.generated.css
npm run build:german
git diff --exit-code -- ../sites/pilzbestimmung.com/feldwerkstatt
node ../scripts/check_bundle_budget.mjs
cp mobile.env.example .env.native
npm run mobile:build
STORE_REQUIRE_DIST=1 npm run store:check -- --maxWorkers=2 --minWorkers=1
npx playwright install --with-deps chromium
npx playwright test e2e/identify-blocked.spec.ts e2e/media-smoke.spec.ts e2e/legal-cookies.spec.ts --project=chromium
if [ -f ../sites/pilzbestimmung.com/scripts/validate-site.mjs ]; then npm run test:german; fi
