#!/usr/bin/env bash
# Start an isolated local preview of the uploaded archive; do not activate it.
set -euo pipefail
ARCHIVE=${1:?archive required}
EXPECTED=${2:?SHA256 required}
ROOT=/srv/tenants/slot2
case "$ARCHIVE" in /tmp/rutatramite-*.tar) ;; *) exit 1;; esac
[[ "$EXPECTED" =~ ^[a-f0-9]{64}$ ]] || exit 1
printf '%s  %s\n' "$EXPECTED" "$ARCHIVE" | sha256sum --check --status
if ss -H -ltn 'sport = :8199' | grep -q .; then echo 'Preview port is occupied' >&2; exit 1; fi
STAMP=$(date -u +%Y%m%dT%H%M%SZ)
PREVIEW="$ROOT/previews/$STAMP"
UNIT="slot2-preview-$STAMP"
sudo mkdir -p "$ROOT/previews"
sudo chmod 750 "$ROOT/previews"
sudo chown root:slot2 "$ROOT/previews"
sudo mkdir "$PREVIEW"
tar -tf "$ARCHIVE" | awk '/^\// || /(^|\/)\.\.($|\/)/ { bad=1 } END { exit bad }'
sudo tar --no-same-owner -xf "$ARCHIVE" -C "$PREVIEW"
sudo test -f "$PREVIEW/server.js"
sudo chown -R slot2:slot2 "$PREVIEW"
sudo chmod -R u=rwX,go= "$PREVIEW"
trap 'sudo systemctl stop "$UNIT.service" >/dev/null 2>&1 || true' EXIT
sudo systemd-run --quiet --collect --unit "$UNIT" --uid slot2 --property "WorkingDirectory=$PREVIEW" --property Slice=tenant-slot2.slice --setenv PORT=8199 --setenv HOSTNAME=127.0.0.1 --setenv NEXT_PUBLIC_SITE_URL=https://rutatramite.com /usr/bin/node server.js
for attempt in $(seq 1 30); do
  if curl --fail --silent --max-time 3 http://127.0.0.1:8199/ >/dev/null; then break; fi
  sleep 1
done
python3 - <<'PY'
import re
from urllib.request import urlopen
from urllib.error import HTTPError
from urllib.parse import urlsplit
from concurrent.futures import ThreadPoolExecutor
from xml.etree import ElementTree
base='http://127.0.0.1:8199'
def read(path):
    with urlopen(base+path,timeout=20) as r:
        assert r.status==200,(path,r.status)
        return r.read().decode()
home=read('/')
assert 'Guías para hacer tus trámites en España' in home
dni=read('/dni/cita-previa')
assert 'FAQPage' not in dni and 'href="#preguntas-frecuentes"' not in dni
cobro=read('/becas/mec/cuando-se-cobra')
assert 'FAQPage' in cobro and 'cuatro o cinco semanas' in cobro
assert '¿Dónde se pide Cuándo se cobra' not in cobro
assert 'Sobre RutaTrámite' in home
fp_beca=read('/becas/fp')
assert 'hasta 45 días' not in fp_beca and 'convocatoria abrirá en primavera' not in fp_beca
assert 'En primero de grado medio' in fp_beca and '85%' in fp_beca
assert '/fp-bachillerato-otros/que-necesitas.html' in fp_beca
mec=read('/becas/mec/plazo')
assert '19 de mayo' in mec and 'BOE-B-2026-16327' in mec
muface=read('/becas/muface')
assert 'propio mutualista' in muface and 'idProc=132654' in muface
assert 'mutualistas y sus beneficiarios' not in muface
gva=read('/becas/autonomicas/beca-salario-gva')
assert 'id_proc=95885' in gva and 'nueva ventana en noviembre' not in gva
cyl=read('/becas/autonomicas/ayudas-estudio-cyl')
assert 'haber obtenido beca del Ministerio' in cyl
assert 'perdiste la MEC o te quedaste corto' not in cyl
madrid=read('/empadronarse/comunidad-de-madrid/madrid/madrid')
assert 'Fuente: sede.madrid.es' in madrid
assert 'Eso explica el tono' not in madrid
stub=read('/empadronarse/comunidad-de-madrid/madrid/alamo-el')
assert 'noindex' in stub
robots=read('/robots.txt')
assert 'Disallow: /api/' in robots
sitemap=ElementTree.fromstring(read('/sitemap.xml'))
urls=[x.text for x in sitemap.iter() if x.tag.endswith('}loc')]
assert len(urls)==len(set(urls)) and len(urls)>200
assert base not in str(urls)
def check_indexed(url):
    assert urlsplit(url).netloc == 'rutatramite.com',url
    path=urlsplit(url).path or '/'
    html=read(path)
    assert not re.search(r'<meta[^>]+name="robots"[^>]+content="[^"]*noindex',html),path
    assert len(re.findall(r'<h1(?:\s|>)',html))==1,path
    assert 'rel="canonical"' in html,path
    return path
with ThreadPoolExecutor(max_workers=4) as pool:
    checked=list(pool.map(check_indexed,urls))
assets=set(re.findall(r'(?:src|href)="(/_next/[^"<>]+)"',home))
assert assets
styles=[]
for asset in assets:
    with urlopen(base+asset.replace('&amp;','&'),timeout=20) as response:
        assert response.status==200,asset
        if 'text/css' in response.headers.get('Content-Type',''):
            styles.append(response.read().decode())
assert 'font-source-sans' in ''.join(styles)
try:
    urlopen(base+'/ruta-de-auditoria-inexistente',timeout=20)
    raise AssertionError('Missing page returned success')
except HTTPError as e:
    assert e.code==404,e.code
print(f'HTTP_CHECKS_OK sitemap={len(urls)} checked_pages={len(checked)} assets={len(assets)}')
PY
REPORT="/tmp/rutatramite-artifact-audit-$STAMP.json"
sudo -u slot2 python3 /tmp/rutatramite-audit-tools/audit_build.py --root "$PREVIEW" --build-dir .next --output "$REPORT"
sudo -u slot2 python3 - "$REPORT" "$PREVIEW" <<'PY'
import json,sys
from pathlib import Path
report=json.loads(Path(sys.argv[1]).read_text())
assert report['build_id']==(Path(sys.argv[2])/'.next/BUILD_ID').read_text().strip()
assert report['html_pages']>=900 and not report['issues'] and not report['issue_counts'],report
print(f"PREVIEW_OK artifact_html={report['html_pages']} build_id={report['build_id']}")
PY
printf 'PREVIEW=%s\n' "$PREVIEW"
