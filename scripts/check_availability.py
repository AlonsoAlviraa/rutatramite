"""Check availability claims on public guides and their directory."""
import json
import re
from pathlib import Path
from urllib.request import urlopen

results = []
for path in ['/dni/no-hay-citas', '/dni/a-que-hora-se-liberan-citas', '/dni/paginas-clon-cita', '/dni']:
    with urlopen('https://rutatramite.com' + path, timeout=30) as response:
        status = response.status
        html = response.read().decode()
    html = re.sub(r'<script\b[^>]*>[\s\S]*?</script>', '', html, flags=re.I)
    checks = {
        'http_200': status == 200,
        'official_portal': 'citapreviadnie.es' in html,
        'no_fixed_release_hour': '6:00' not in html,
        'no_daily_quota_claim': 'cupo diario' not in html,
        'no_missed_appointment_penalty': 'por inasistencias a citas anteriores' not in html,
    }
    if path != '/dni/paginas-clon-cita':
        checks['qualified_availability'] = 'hora verificada' in html or 'No tenemos verificada' in html
    results.append({'path': path, 'checks': checks, 'passed': all(checks.values())})
Path('docs/availability-public-smoke.json').write_text(json.dumps(results, ensure_ascii=False, indent=2), encoding='utf-8')
print(json.dumps({'pages': len(results), 'passed': all(r['passed'] for r in results)}))
assert all(r['passed'] for r in results), results
