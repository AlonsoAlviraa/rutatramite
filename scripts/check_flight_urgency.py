"""Verify visible flight and urgent-DNI corrections after publication."""
import json
import re
from pathlib import Path
from urllib.request import urlopen

cases = {
    '/dni/urgente-sin-cita': ['no garantiza atención inmediata', 'Actualizar el chip no equivale', 'Real Decreto 255/2025'],
    '/dni/caducado-vueling': ['nacionalidad española', 'pasaporte español caducado hasta cinco años', 'Irlanda', 'help.vueling.com'],
}
results = []
for path, phrases in cases.items():
    with urlopen('https://rutatramite.com' + path, timeout=30) as response:
        status = response.status
        html = response.read().decode()
    html = re.sub(r'<script\b[^>]*>[\s\S]*?</script>', '', html, flags=re.I)
    checks = {
        'http_200': status == 200,
        'visible_corrections': all(phrase in html for phrase in phrases),
        'no_guaranteed_rescue': 'te salvan en 24-48 horas' not in html,
        'no_hidden_quota': 'puede dar acceso a cupos' not in html,
        'no_airport_dni_promise': 'atienden pasaportes de emergencia y, según el caso, DNI' not in html,
        'review_date': '2026-09-07' in html,
    }
    results.append({'path': path, 'checks': checks, 'passed': all(checks.values())})
Path('docs/flight-urgency-public-smoke.json').write_text(json.dumps(results, ensure_ascii=False, indent=2), encoding='utf-8')
print(json.dumps({'pages': len(results), 'passed': all(r['passed'] for r in results)}))
assert all(r['passed'] for r in results), results
