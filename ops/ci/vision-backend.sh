#!/usr/bin/env bash
set -euo pipefail
python -m pip install --upgrade pip
pip install -e '.[dev]'
ruff check backend
python scripts/check_media_licenses.py --fail-on-commercial-leak
black --check backend
mypy backend/app || true # Existing nonblocking baseline; keep original output.
pytest -q --junitxml=/workspace/ci-results/backend.xml
python scripts/verify_detection.py --num-images 5 --threshold 0.25
