"""Distinct page/rule checks on the generated artifact; no ranking/AI score.

Uses the actual HTML and sitemap, not source templates. HTTP is checked separately.
"""
import argparse
from collections import Counter, deque
from datetime import datetime, timezone
import json
from pathlib import Path
from urllib.parse import urljoin, urlsplit, unquote
import xml.etree.ElementTree as ET
from audit_site import Page

ORIGIN = 'https://rutatramite.com'

class Document(Page):
    def __init__(self):
        super().__init__()
        self.mains = 0
        self.image_alts = []
    def handle_starttag(self, tag, attrs):
        super().handle_starttag(tag, attrs)
        a = dict(attrs)
        if tag == 'main': self.mains += 1
        if tag == 'img': self.image_alts.append('alt' in a)

def entities(value):
    if isinstance(value, list):
        for item in value: yield from entities(item)
    elif isinstance(value, dict):
        if '@type' in value: yield value
        for item in value.values():
            if isinstance(item, (dict, list)): yield from entities(item)

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--root', default='.')
    ap.add_argument('--output', default='docs/audit-discoverability.json')
    args = ap.parse_args()
    root = Path(args.root).resolve()
    urls = [n.text for n in ET.parse(root/'public/sitemap.xml').iter() if n.tag.endswith('}loc')]
    assert len(urls) == len(set(urls)), 'Duplicate sitemap URLs'
    pages = {}
    for url in urls:
        path = urlsplit(url).path or '/'
        assert urlsplit(url).netloc == 'rutatramite.com', url
        file = root/'.next/server/app'/('index.html' if path == '/' else path.lstrip('/')+'.html')
        p = Document()
        p.feed(file.read_text(encoding='utf-8'))
        pages[path] = p
    graph = {path: {unquote(urlsplit(urljoin(ORIGIN+path, h)).path) or '/' for h in p.links
                   if urlsplit(urljoin(ORIGIN+path, h)).netloc == 'rutatramite.com'} for path,p in pages.items()}
    depth = {'/': 0}
    queue = deque(['/'])
    while queue:
        path = queue.popleft()
        for target in graph.get(path, set()):
            if target in pages and target not in depth:
                depth[target] = depth[path]+1
                queue.append(target)
    titles = Counter(p.title for p in pages.values())
    descriptions = Counter(p.meta.get('description') for p in pages.values())
    rows = []
    for path,p in pages.items():
        checks = []
        def check(rule, passed, applicable=True):
            checks.append({'rule':rule, 'result':('pass' if passed else 'fail') if applicable else 'skipped'})
        es = list(entities(p.schemas))
        articles = [e for e in es if e['@type'] == 'Article']
        citations = [c for e in es if e['@type'] in ('Article','Dataset') for c in (e.get('citation',[]) if isinstance(e.get('citation',[]),list) else [e['citation']])]
        check('title_present', bool(p.title.strip()))
        check('title_unique', titles[p.title] == 1)
        check('description_present', bool(p.meta.get('description','').strip()))
        check('description_unique', descriptions[p.meta.get('description')] == 1)
        check('one_nonempty_h1', len(p.h1) == 1 and bool(p.h1[0].strip()))
        check('canonical_matches_sitemap', len(p.canonicals)==1 and p.canonicals[0].rstrip('/')==(ORIGIN+path).rstrip('/'))
        check('indexable_meta', 'noindex' not in p.meta.get('robots','').lower())
        check('spanish_document', p.lang == 'es')
        check('one_main_landmark', p.mains == 1)
        check('responsive_viewport', 'width=device-width' in p.meta.get('viewport',''))
        check('open_graph_title', bool(p.meta.get('og:title')))
        check('open_graph_description', bool(p.meta.get('og:description')))
        check('open_graph_url', p.meta.get('og:url','').rstrip('/')==(ORIGIN+path).rstrip('/'))
        check('twitter_card', bool(p.meta.get('twitter:card')))
        check('jsonld_present', bool(p.schemas))
        check('jsonld_parseable', not any(isinstance(s,dict) and s.get('error') for s in p.schemas))
        check('organization_identified', any(e['@type']=='Organization' and e.get('@id')==ORIGIN+'#organization' for e in es))
        check('reachable_via_indexable_pages_from_home', path in depth)
        check('local_fragment_targets', all(unquote(h[1:]) in p.ids for h in p.links if h.startswith('#') and h != '#'))
        check('image_alt_attribute', all(p.image_alts), bool(p.image_alts))
        check('article_editorial_date', all(bool(e.get('dateModified')) for e in articles), bool(articles))
        check('citations_visible_as_links', all(isinstance(c,str) and c in {urljoin(ORIGIN+path,h) for h in p.links} for c in citations), bool(citations))
        rows.append({'path':path, 'click_depth':depth.get(path), 'checks':checks})
    counts = Counter(c['result'] for r in rows for c in r['checks'])
    report = {'checked_at':datetime.now(timezone.utc).isoformat(), 'build_id':(root/'.next/BUILD_ID').read_text().strip(),
              'scope':'Generated HTML: distinct page/rule pairs. Skipped rules excluded; no HTTP, ranking or AI citation guarantee.',
              'pages':len(pages), 'counts':dict(counts), 'maximum_click_depth':max(depth.values()), 'results':rows}
    (root/args.output).write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf-8')
    print(json.dumps({k:v for k,v in report.items() if k!='results'}))
    if counts['fail']: raise SystemExit(1)

if __name__ == '__main__': main()
