#!/usr/bin/env bash
set -euo pipefail
pip install bandit pip-audit
bandit -r backend/app -ll -x backend/app/tests
pip-audit -r backend/requirements.txt || pip-audit --path backend || true
cd frontend
npm audit --omit=dev --audit-level=high
