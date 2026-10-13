"""Read-only HTML crawl: sitemap, metadata, headings, schema and internal links.

Usage: python scripts/audit_site.py --base https://rutatramite.com --output docs/audit-production.json
"""
import argparse
from collections import Counter
from concurrent.futures import ThreadPoolExecutor
from datetime import datetime, timezone
from html.parser import HTMLParser
import json
from pathlib import Path
import time
from urllib.parse import urljoin, urlsplit
from urllib.request import Request, urlopen
from urllib.error import HTTPError
import xml.etree.ElementTree as ET


class Page(HTMLParser):
    def __init__(self):
        super().__init__()
        self.title = ''
        self.h1 = []
        self.meta = {}
        self.canonicals = []
        self.links = set()
        self.ids = set()
        self.schemas = []
        self.in_title = self.in_h1 = self.in_schema = False
        self.schema_text = ''
        self.lang = None

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if a.get('id'): self.ids.add(a['id'])
        if tag == 'html': self.lang = a.get('lang')
        if tag == 'title': self.in_title = True
        if tag == 'h1':
            self.in_h1 = True
            self.h1.append('')
        if tag == 'meta': self.meta[a.get('name', a.get('property', ''))] = a.get('content', '')
        if tag == 'link' and a.get('rel') == 'canonical': self.canonicals.append(a.get('href'))
        if tag == 'a' and a.get('href'): self.links.add(a['href'])
        if tag == 'script' and a.get('type') == 'application/ld+json':
            self.in_schema = True
            self.schema_text = ''

    def handle_data(self, data):
        if self.in_title: self.title += data
        if self.in_h1: self.h1[-1] += data
        if self.in_schema: self.schema_text += data

    def handle_endtag(self, tag):
        if tag == 'title': self.in_title = False
        if tag == 'h1': self.in_h1 = False
        if tag == 'script' and self.in_schema:
            try: self.schemas.append(json.loads(self.schema_text))
            except ValueError: self.schemas.append({'error': 'invalid JSON-LD'})
            self.in_schema = False


def fetch(url):
    start = time.monotonic()
    try:
        with urlopen(Request(url, headers={'User-Agent': 'RutaTramite-SEO-Audit/1.0'}), timeout=35) as r:
            return r.status, r.read().decode('utf-8', errors='replace'), r.url, round(time.monotonic()-start, 3)
    except HTTPError as e: return e.code, '', url, round(time.monotonic()-start, 3)
    except Exception as e: return 0, str(e), url, round(time.monotonic()-start, 3)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--base', required=True)
    ap.add_argument('--canonical', default='https://rutatramite.com')
    ap.add_argument('--output', required=True)
    args = ap.parse_args()
    base = args.base.rstrip('/')
    status, xml, _, _ = fetch(base + '/sitemap.xml')
    if status != 200: raise SystemExit(f'Sitemap HTTP {status}: {xml[:200]}')
    urls = [n.text for n in ET.fromstring(xml).iter() if n.tag.endswith('}loc')]
    paths = sorted(set(urlsplit(u).path or '/' for u in urls))

    def audit(p):
        status, html, final, seconds = fetch(base+p)
        page = Page()
        page.feed(html)
        issues = []
        if status != 200: issues.append(f'HTTP {status}')
        if urlsplit(final).path != p: issues.append('redirect in sitemap')
        if not page.title: issues.append('missing title')
        if not page.meta.get('description'): issues.append('missing description')
        if len(page.h1) != 1: issues.append(f'{len(page.h1)} H1 headings')
        expected = args.canonical.rstrip('/') + (p if p != '/' else '')
        if len(page.canonicals) != 1 or page.canonicals[0].rstrip('/') != expected.rstrip('/'): issues.append('canonical mismatch')
        if 'noindex' in page.meta.get('robots', ''): issues.append('noindex in sitemap')
        if not page.lang: issues.append('missing language')
        if any(s.get('error') for s in page.schemas if isinstance(s, dict)): issues.append('invalid JSON-LD')
        broken_fragments = [a for a in page.links if a.startswith('#') and a[1:] not in page.ids]
        if broken_fragments: issues.append('broken local fragments')
        internal = sorted({urlsplit(urljoin(args.canonical+p, a)).path or '/' for a in page.links if urlsplit(urljoin(args.canonical+p,a)).netloc == urlsplit(args.canonical).netloc})
        return {'path':p, 'status':status, 'seconds':seconds, 'title':page.title, 'description':page.meta.get('description'), 'canonical':page.canonicals, 'robots':page.meta.get('robots'), 'h1':page.h1, 'issues':issues, 'broken_fragments':broken_fragments, 'internal_links':internal}

    with ThreadPoolExecutor(max_workers=4) as pool: pages = list(pool.map(audit, paths))
    all_linked = sorted({p for page in pages for p in page['internal_links']} - set(paths))
    with ThreadPoolExecutor(max_workers=4) as pool:
        extra = list(pool.map(lambda p: {'path':p, 'status':fetch(base+p)[0]}, all_linked))
    titles = Counter(p['title'] for p in pages)
    descriptions = Counter(p['description'] for p in pages)
    report = {'generated':datetime.now(timezone.utc).isoformat(), 'base':base, 'sitemap_count':len(urls), 'duplicate_sitemap_urls':len(urls)-len(set(urls)), 'pages':pages, 'linked_pages_outside_sitemap':extra, 'duplicate_titles':{k:v for k,v in titles.items() if v>1}, 'duplicate_descriptions':{k:v for k,v in descriptions.items() if v>1}, 'issue_counts':dict(Counter(i for p in pages for i in p['issues'])), 'broken_link_targets':[p for p in extra if p['status'] != 200]}
    Path(args.output).write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding='utf-8')
    print(json.dumps({k:v for k,v in report.items() if k not in ['pages','linked_pages_outside_sitemap']}, ensure_ascii=False))


if __name__ == '__main__': main()
