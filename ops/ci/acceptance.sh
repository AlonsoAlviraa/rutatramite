#!/usr/bin/env bash
set -euo pipefail
cd /ci
node --version
python --version
python -m pip install --disable-pip-version-check -r /ci/requirements-windows.lock.txt
python -B - <<'PY'
import sys
import unittest
suite = unittest.defaultTestLoader.discover('/ci')
result = unittest.TextTestRunner(stream=sys.stdout, verbosity=2).run(suite)
raise SystemExit(0 if result.wasSuccessful() else 1)
PY
for script in /ci/*.sh; do
  bash -n "$script"
done
