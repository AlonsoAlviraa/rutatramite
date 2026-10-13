"""Verify the four published guides affected by the minor-document review."""
import json
import re
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path
from urllib.request import urlopen

cases = {
    '/dni/primera-expedicion-menor': ['Primera expedición del DNI', 'Primera expedición del pasaporte', 'Real Decreto 255/2025', 'DICIREG', 'custodia exclusiva'],
    '/pasaporte/bebe': ['DICIREG', 'por separado', 'no sustituye automáticamente', 'antes de cumplir treinta'],
    '/dni/checklist': ['consentimiento de todos', 'consulta electrónica', 'ese mismo día'],
    '/pasaporte/cita-previa': ['no están obligados', 'todas las personas', 'ese mismo día'],
}

def check(item):
    path, phrases = item
    with urlopen('https://rutatramite.com' + path, timeout=30) as response:
        status = response.status
        html = response.read().decode()
    html = re.sub(r'<script\b[^>]*>[\s\S]*?</script>', '', html, flags=re.I)
    checks = {
        'http_200': status == 200,
        'visible_corrections': all(phrase in html for phrase in phrases),
        'official_procedure_source': 'pasaporte/procedimiento-de-expedicion/' in html,
        'no_family_book_alternative': 'o libro de familia' not in html and 'nacimiento / libro' not in html,
        'no_vague_consent': 'Consentimiento del otro progenitor cuando toque' not in html,
    }
    return {'path': path, 'checks': checks, 'passed': all(checks.values())}

with ThreadPoolExecutor(max_workers=4) as pool:
    results = list(pool.map(check, cases.items()))
Path('docs/minor-documents-public-smoke.json').write_text(json.dumps(results, ensure_ascii=False, indent=2), encoding='utf-8')
print(json.dumps({'pages': len(results), 'passed': all(r['passed'] for r in results)}))
assert all(r['passed'] for r in results), results
