"""Read-only live HTML graph and optional GSC inspections, with raw evidence.

No ranking score, no submissions, no automatic editorial/indexability changes.
"""
import argparse
from collections import Counter, deque
from concurrent.futures import ThreadPoolExecutor
from datetime import datetime, timezone
import hashlib
import json
from pathlib import Path
import re
import time
from urllib.error import HTTPError
from urllib.parse import urljoin, urlsplit
from urllib.request import Request, urlopen
import xml.etree.ElementTree as ET

from audit_site import Page
from submit_search import gsc_refresh, http_json

ROOT = Path(__file__).resolve().parents[1]
ORIGIN = 'https://rutatramite.com'


def timestamp():
    return datetime.now(timezone.utc).isoformat()


class LinkDocument(Page):
    def __init__(self):
        super().__init__()
        self.main_depth = 0
        self.ignored = 0
        self.anchors = []
        self.anchor = None
        self.main_text = []

    def handle_starttag(self, tag, attrs):
        super().handle_starttag(tag, attrs)
        a = dict(attrs)
        if tag == 'main': self.main_depth += 1
        if tag in ('script', 'style'): self.ignored += 1
        if tag == 'a' and a.get('href'):
            self.anchor = {'href': a['href'], 'text': '', 'main': bool(self.main_depth), 'rel': a.get('rel', '')}
            self.anchors.append(self.anchor)
        if tag == 'img' and self.anchor:
            self.anchor['text'] += a.get('alt', '')

    def handle_data(self, data):
        super().handle_data(data)
        if not self.ignored:
            if self.anchor is not None: self.anchor['text'] += data
            if self.main_depth: self.main_text.append(data)

    def handle_endtag(self, tag):
        super().handle_endtag(tag)
        if tag == 'a': self.anchor = None
        if tag == 'main': self.main_depth = max(0, self.main_depth - 1)
        if tag in ('script', 'style'): self.ignored = max(0, self.ignored - 1)


def local_path(base, href):
    url = urlsplit(urljoin(base, href))
    if url.scheme not in ('http', 'https') or url.netloc != 'rutatramite.com': return None
    # Queries are retained: do not silently equate a filtered page to its parent.
    return (url.path or '/') + ('?' + url.query if url.query else '')


def html_candidate(path):
    return not (urlsplit(path).path.startswith(('/api/', '/datos/', '/_next/')) or
                re.search(r'\.[a-zA-Z0-9]{2,8}$', urlsplit(path).path))


def distances(graph):
    if '/' not in graph: return {}
    found = {'/': 0}
    queue = deque(['/'])
    while queue:
        source = queue.popleft()
        for target in sorted(graph.get(source, ())):
            if target not in found:
                found[target] = found[source] + 1
                queue.append(target)
    return found


def summarize(pages, seeds):
    valid = {p: row for p, row in pages.items() if row.get('status') == 200 and row.get('html')}
    graph = {p: set(r['internal_links']) for p, r in valid.items()}
    indexable = {p for p, r in valid.items() if not r['noindex']}
    depth = distances(graph)
    index_depth = distances({p: targets & indexable for p, targets in graph.items() if p in indexable})
    incoming = {p: [] for p in seeds}
    main_incoming = {p: [] for p in seeds}
    for source, row in valid.items():
        for target in set(row['internal_links']) & set(seeds):
            if source != target: incoming[target].append(source)
        for target in set(row['main_internal_links']) & set(seeds):
            if source != target: main_incoming[target].append(source)
    rows = []
    for path in seeds:
        row = pages.get(path, {})
        rows.append({'path': path, 'depth': depth.get(path), 'indexable_path_depth': index_depth.get(path),
                     'incoming_pages': sorted(incoming[path]), 'main_incoming_pages': sorted(main_incoming[path]),
                     'indexable_incoming_count': sum(p in indexable for p in incoming[path]),
                     'status': row.get('status'), 'noindex': row.get('noindex'),
                     'internal_destinations': len(row.get('internal_links', [])),
                     'noindex_destinations': sorted(p for p in row.get('internal_links', []) if p in valid and valid[p]['noindex'])})
    return {'html_pages': len(valid), 'noindex_html_pages': len(valid.keys() - indexable),
            'fetch_issues': [{'path': p, 'status': r.get('status'), 'error': r.get('error')}
                             for p, r in pages.items() if p not in valid],
            'sitemap_pages': len(seeds), 'depth_counts': dict(Counter(str(r['depth']) for r in rows)),
            'unreachable_sitemap_pages': [r['path'] for r in rows if r['depth'] is None],
            'sitemap_pages_without_indexable_path': [r['path'] for r in rows if r['indexable_path_depth'] is None],
            'sitemap_pages_without_other_incoming_link': [r['path'] for r in rows if not r['incoming_pages']],
            'sitemap_noindex': [r['path'] for r in rows if r['noindex']], 'pages': rows}


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--inspect', action='store_true')
    parser.add_argument('--max-pages', type=int, default=1200)
    args = parser.parse_args()
    stamp = datetime.now(timezone.utc).strftime('%Y%m%dT%H%M%SZ')
    out = ROOT / 'docs/seo-workflow' / (stamp + '-visibility')
    raw = ROOT / 'tmp/seo-tools/runs' / (stamp + '-visibility')
    out.mkdir(parents=True, exist_ok=False)
    raw.mkdir(parents=True, exist_ok=False)
    report = {'started_at': timestamp(), 'origin': ORIGIN, 'raw_directory': str(raw),
              'scope': 'Live HTML links, HTTP/meta indexability and optional stored-index GSC results. No JS execution, verified crawler logs, field CWV, ranking causality or exhaustive editorial review.',
              'pages': {}, 'inspections': [], 'excluded_non_html_targets': []}
    def save():
        (out/'evidence.json').write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding='utf-8')
    def fetch(path):
        row = {'path': path, 'checked_at': timestamp()}
        started = time.monotonic()
        try:
            request = Request(ORIGIN + path, headers={'User-Agent': 'RutaTramite-Visibility-Audit/1.0', 'X-RutaTramite-Test': '1'})
            try: response = urlopen(request, timeout=30)
            except HTTPError as error: response = error
            with response:
                body = response.read()
                row.update(status=response.status, final_url=response.url,
                           headers={k.lower(): v for k, v in response.headers.items()})
            row['sha256'] = hashlib.sha256(body).hexdigest()
            rawfile = raw / (hashlib.sha256(path.encode()).hexdigest() + '.body')
            rawfile.write_bytes(body)
            row['raw_file'] = str(rawfile)
            row['bytes'] = len(body)
            row['html'] = 'text/html' in row['headers'].get('content-type', '')
            if row['html']:
                doc = LinkDocument()
                doc.feed(body.decode('utf-8'))
                row.update(title=doc.title, description=doc.meta.get('description'), h1=doc.h1, canonical=doc.canonicals,
                           robots={k: v for k, v in doc.meta.items() if k.lower() in ('robots', 'googlebot')},
                           anchors=doc.anchors, schemas=doc.schemas,
                           main_text=' '.join(' '.join(doc.main_text).split()))
                directives = ' '.join([*row['robots'].values(), row['headers'].get('x-robots-tag', '')]).lower()
                row['noindex'] = bool(re.search(r'\b(noindex|none)\b', directives))
                row['snippet_restricted'] = bool(re.search(r'\bnosnippet\b|max-snippet\s*:\s*0\b', directives))
                row['internal_links'] = sorted({p for a in doc.anchors if (p := local_path(response.url, a['href'])) is not None})
                row['main_internal_links'] = sorted({p for a in doc.anchors if a['main'] and (p := local_path(response.url, a['href'])) is not None})
        except Exception as error:
            row['error'] = type(error).__name__
        row['seconds'] = round(time.monotonic() - started, 3)
        return row
    sitemap = fetch('/sitemap.xml')
    report['sitemap'] = sitemap
    if sitemap.get('status') != 200: save(); raise SystemExit('Sitemap unavailable')
    xml = ET.fromstring(Path(sitemap['raw_file']).read_bytes())
    urls = [n.text for n in xml.iter() if n.tag.endswith('}loc')]
    assert all(u.startswith(ORIGIN + '/') for u in urls), 'Unexpected sitemap origin'
    seeds = sorted({local_path(ORIGIN, u) for u in urls})
    report['sitemap_urls'] = urls
    report['robots'] = fetch('/robots.txt')
    pending = seeds
    with ThreadPoolExecutor(max_workers=2) as pool:
        while pending:
            if len(report['pages']) + len(pending) > args.max_pages:
                report['crawl_limit_pending'] = pending
                break
            for row in pool.map(fetch, pending):
                report['pages'][row['path']] = row
            save()
            linked = {p for r in report['pages'].values() for p in r.get('internal_links', [])}
            report['excluded_non_html_targets'] = sorted(p for p in linked if not html_candidate(p))
            pending = sorted(p for p in linked - report['pages'].keys() if html_candidate(p))
            print(f"HTML graph: {len(report['pages'])} fetched; {len(pending)} pending", flush=True)
    report['graph'] = summarize(report['pages'], seeds)
    save()
    if args.inspect:
        auth = {'Authorization': 'Bearer ' + gsc_refresh()}
        def inspect(url):
            payload = {'inspectionUrl': url, 'siteUrl': 'sc-domain:rutatramite.com', 'languageCode': 'es-ES'}
            row = {'url': url, 'checked_at': timestamp(), 'request': payload}
            try:
                status, body = http_json('https://searchconsole.googleapis.com/v1/urlInspection/index:inspect', payload, auth)
                row.update(status=status, data=json.loads(body))
            except Exception as error: row['error'] = type(error).__name__
            return row
        with ThreadPoolExecutor(max_workers=2) as pool:
            for row in pool.map(inspect, urls):
                report['inspections'].append(row)
                if len(report['inspections']) % 25 == 0:
                    save(); print(f"Google inspections: {len(report['inspections'])}/{len(urls)}", flush=True)
        report['inspection_counts'] = dict(Counter(r.get('data', {}).get('inspectionResult', {}).get('indexStatusResult', {}).get('coverageState', 'API error') for r in report['inspections']))
    report['completed_at'] = timestamp()
    save()
    (out/'graph.json').write_text(json.dumps(report['graph'], ensure_ascii=False, indent=2), encoding='utf-8')
    print(json.dumps({'report': str(out/'evidence.json'), 'graph': {k: v for k, v in report['graph'].items() if k != 'pages'}, 'inspections': report.get('inspection_counts')}), flush=True)


if __name__ == '__main__':
    main()
