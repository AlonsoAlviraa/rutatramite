"""Check published category notices and passport directory scope."""
import json
import re
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path
from urllib.request import urlopen

paths = ['/dni', '/pasaporte', '/mudanza', '/extranjeria', '/colegio', '/comedor', '/fp', '/bebe', '/becas', '/modelos']

def check(path):
    with urlopen('https://rutatramite.com' + path, timeout=30) as response:
        status = response.status
        html = response.read().decode()
    html = re.sub(r'<script\b[^>]*>[\s\S]*?</script>', '', html, flags=re.I)
    checks = {
        'http_200': status == 200,
        'independent_notice': 'No somos Administración Pública' in html,
        'no_padron_notice': 'El padrón lo gestiona cada Ayuntamiento' not in html,
    }
    if path != '/mudanza':  # This route uses TramitePage, not PackIndex.
        checks['general_notice'] = 'Consulta las fuentes de esta guía' in html
        checks['search_label'] = 'Buscar en esta categoría' in html
    if path == '/pasaporte':
        checks.update({
            'passport_heading': 'Pasaporte: cita, documentos y renovación</h1>' in html,
            'passport_guide': 'href="/pasaporte/cita-previa"' in html,
            'shared_minor_guide': 'href="/dni/primera-expedicion-menor"' in html,
            'no_dni_bank_guide': 'href="/dni/caducado-banco"' not in html,
        })
    return {'path': path, 'checks': checks, 'passed': all(checks.values())}

with ThreadPoolExecutor(max_workers=4) as pool:
    results = list(pool.map(check, paths))
Path('docs/category-context-public-smoke.json').write_text(json.dumps(results, ensure_ascii=False, indent=2), encoding='utf-8')
print(json.dumps({'pages': len(results), 'passed': all(r['passed'] for r in results)}))
assert all(r['passed'] for r in results), results
