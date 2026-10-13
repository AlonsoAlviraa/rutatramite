"""Check visible published fee corrections across the eleven travel guides."""
import json
import re
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path
from urllib.request import urlopen

paths = re.findall(r'path: "([^"]+)"', Path('src/lib/tramites/viaje.ts').read_text(encoding='utf-8'))

def check(path):
    with urlopen('https://rutatramite.com' + path, timeout=30) as response:
        status = response.status
        html = response.read().decode()
    html = re.sub(r'<script\b[^>]*>[\s\S]*?</script>', '', html, flags=re.I)
    checks = {
        'http_200': status == 200,
        'call_cost': 'la llamada al 060 tiene coste' in html,
        'loss_not_exemption': 'La pérdida del documento no es por sí sola una exención' in html,
        'dni_source': 'tasas/dni/' in html,
        'passport_source': 'tasas/pasaporte/index.html' in html,
        'phone_source': 'BOE-A-2023-18093' in html,
        'no_false_loss_exemption': 'primeras pérdidas' not in html,
        'no_wrong_payment_form': 'Confirma el modelo 790' not in html,
        'no_seo_instructions': not re.search(r'Query útil|La query|Long-tail local', html),
    }
    return {'path': path, 'checks': checks, 'passed': all(checks.values())}

with ThreadPoolExecutor(max_workers=4) as pool:
    results = list(pool.map(check, paths))
Path('docs/travel-fees-public-smoke.json').write_text(json.dumps(results, ensure_ascii=False, indent=2), encoding='utf-8')
print(json.dumps({'pages': len(results), 'passed': all(r['passed'] for r in results)}))
assert len(results) == 11 and all(r['passed'] for r in results), results
