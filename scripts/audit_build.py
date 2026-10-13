"""Audit every generated HTML page and internal link after next build finishes."""
from pathlib import Path
from collections import Counter
from concurrent.futures import ThreadPoolExecutor
import json
import argparse
import re
from urllib.parse import urljoin, urlsplit, unquote
import xml.etree.ElementTree as ET
from audit_site import Page

ROOT = Path(__file__).resolve().parents[1]
ap = argparse.ArgumentParser()
ap.add_argument('--build-dir', default='.next')
ap.add_argument('--output', default='docs/audit-build.json')
ap.add_argument('--root', default=str(ROOT))
args = ap.parse_args()
ROOT = Path(args.root).resolve()
build = ROOT / args.build_dir / 'server/app'
if not build.is_dir(): raise SystemExit(f'Missing build: {build}')
ORIGIN = 'https://rutatramite.com'
def parse_page(f):
    path = '/' + f.relative_to(build).as_posix()[:-5]
    if path == '/index': path = '/'
    html = f.read_text(encoding='utf-8')
    # React's serialized transport is not visible content; avoid parsing it as HTML.
    html = re.sub(r'<script(?![^>]*application/ld\+json)[\s\S]*?</script>', '', html)
    p = Page()
    p.feed(html)
    return path, p

pages = {}
files = list(build.rglob('*.html'))
with ThreadPoolExecutor(max_workers=8) as pool:
    for path, page in pool.map(parse_page, files):
        pages[path] = page
        if len(pages) % 100 == 0: print(f'Parsed {len(pages)}/{len(files)} HTML pages', flush=True)

xml = ET.parse(ROOT / 'public/sitemap.xml')
sitemap_urls = [n.text for n in xml.iter() if n.tag.endswith('}loc')]
sitemap = {urlsplit(url).path or '/' for url in sitemap_urls}
issues = []
def issue(path, kind, detail=''):
    issues.append({'path':path,'kind':kind,'detail':detail})

for url, count in Counter(sitemap_urls).items():
    if count > 1: issue(url, 'duplicate sitemap URL', count)

indexable = {}
public_targets = set('/' + f.relative_to(ROOT/'public').as_posix() for f in (ROOT/'public').rglob('*') if f.is_file())
for path, p in pages.items():
    if 'noindex' not in p.meta.get('robots',''):
        indexable[path] = p
        if path not in sitemap: issue(path,'indexable page missing from sitemap')
        expected = ORIGIN + (path if path != '/' else '')
        if len(p.canonicals) != 1 or p.canonicals[0].rstrip('/') != expected: issue(path,'canonical',p.canonicals)
        if not p.title: issue(path,'missing title')
        if not p.meta.get('description'): issue(path,'missing description')
        if len(p.h1) != 1: issue(path,'H1 count',len(p.h1))
        if p.lang != 'es': issue(path,'unexpected page language',p.lang)
        if any(isinstance(s,dict) and s.get('error') for s in p.schemas): issue(path,'invalid JSON-LD')
    elif path in sitemap: issue(path,'noindex in sitemap')
    for href in p.links:
        url = urlsplit(urljoin(ORIGIN+path,href))
        if url.netloc != 'rutatramite.com' or url.scheme not in ('http','https'): continue
        target = unquote(url.path) or '/'
        if target not in pages:
            if target not in public_targets: issue(path,'missing internal target',href)
        elif url.fragment and unquote(url.fragment) not in pages[target].ids: issue(path,'missing fragment',href)

for path in sitemap:
    if path not in pages: issue(path,'sitemap target missing from build')
for field in ('title','description'):
    values = Counter(p.title if field == 'title' else p.meta.get(field) for p in indexable.values())
    for text, n in values.items():
        if n > 1: issue('*',f'duplicate {field}',{'value':text,'count':n})
report = {'build_id': (ROOT / args.build_dir / 'BUILD_ID').read_text().strip(), 'html_pages':len(pages),'indexable_pages':len(indexable),'sitemap_urls':len(sitemap),'issue_counts':dict(Counter(i['kind'] for i in issues)),'issues':issues}
(ROOT/args.output).write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps({k:v for k,v in report.items() if k != 'issues'}))
