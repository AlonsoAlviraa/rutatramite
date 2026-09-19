#!/usr/bin/env bash
set -euo pipefail
npm ci --no-audit --no-fund
npm test
npx tsc --noEmit
python scripts/test_growth.py
python scripts/test_weekly_review.py
