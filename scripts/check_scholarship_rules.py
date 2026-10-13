"""Check visible corrections in scholarship guides and their category summaries."""
import json
import re
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path
from urllib.request import urlopen

cases = {
    '/becas/mec/bachillerato': ['asignaturas del curso anterior salvo una', 'requisitos académicos de Bachillerato'],
    '/becas/mec/renuncia': ['Renunciar no borra', 'BOE-A-2003-20977'],
    '/becas/mec/subsanacion': ['sin sábados, domingos ni festivos', 'No hay una segunda oportunidad automática'],
    '/becas/mec/no-devolver': ['Renunciar no elimina'],
    '/becas/mec/estado': ['no esperes un plazo supuesto'],
    '/becas': ['asignaturas del curso anterior salvo una', 'Ninguna permite conservar automáticamente'],
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
        'no_false_repayment_escape': 'corta el reintegro' not in html and 'cortas el reintegro' not in html,
        'no_shortened_business_days': 'uno o dos de calendario' not in html,
        'no_wait_for_dni': 'espera 24-48 horas' not in html,
    }
    if path == '/becas/mec/bachillerato':
        checks['no_fp_hours_rule'] = '85%' not in html
    return {'path': path, 'checks': checks, 'passed': all(checks.values())}

with ThreadPoolExecutor(max_workers=4) as pool:
    results = list(pool.map(check, cases.items()))
Path('docs/scholarship-rules-public-smoke.json').write_text(json.dumps(results, ensure_ascii=False, indent=2), encoding='utf-8')
print(json.dumps({'pages': len(results), 'passed': all(r['passed'] for r in results)}))
assert all(r['passed'] for r in results), results
