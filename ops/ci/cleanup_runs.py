"""Retain completed local runs for 30 days. Active work and release archives are excluded."""
import json
import re
import shutil
from datetime import datetime, timedelta, timezone
from pathlib import Path


def cleanup(root, now):
    root = root.resolve(strict=True)
    removed = []
    for candidate in root.iterdir():
        if candidate.is_symlink() or not candidate.is_dir():
            continue
        if not re.fullmatch(r'(rutatramite|visionsetil)-[a-f0-9]{12}-\d{8}T\d{6}Z',candidate.name):
            continue
        if candidate.resolve(strict=True).parent != root:
            raise ValueError('Run escaped its dedicated parent')
        report_path = candidate/'results/result.json'
        if not report_path.is_file():
            continue
        report = json.loads(report_path.read_text())
        if report.get('status') not in ['passed','failed'] or not report.get('finished_at'):
            continue
        if datetime.fromisoformat(report['finished_at']) >= now-timedelta(days=30):
            continue
        shutil.rmtree(candidate)
        removed.append(candidate.name)
    return removed


if __name__ == '__main__':
    print(json.dumps({'removed':cleanup(Path('C:/Users/Mariano/CI/runs'),datetime.now(timezone.utc))}))
