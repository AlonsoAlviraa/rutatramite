"""Check external anchors from indexed build pages without treating bot blocks as 404s."""
import argparse
from collections import Counter, defaultdict
from concurrent.futures import ThreadPoolExecutor, as_completed
from html.parser import HTMLParser
import json
from pathlib import Path
from urllib.parse import urlsplit, urlunsplit
from urllib.request import Request, urlopen
from urllib.error import HTTPError

class Links(HTMLParser):
    def __init__(self):
        super().__init__()
        self.links = set()
        self.noindex = False
    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == 'meta' and attrs.get('name') == 'robots':
            self.noindex = 'noindex' in attrs.get('content', '')
        if tag == 'a' and attrs.get('href'):
            parsed = urlsplit(attrs['href'])
            if parsed.scheme in ('https', 'http') and parsed.hostname not in ('rutatramite.com', 'www.rutatramite.com'):
                self.links.add(urlunsplit(parsed._replace(fragment='')))

def check(url):
    for method in ('HEAD', 'GET'):
        try:
            with urlopen(Request(url, method=method, headers={'User-Agent': 'RutaTramite-Link-Audit/1.0'}), timeout=12) as response:
                return {'url': url, 'status': response.status, 'final_url': response.url, 'result': 'reachable'}
        except HTTPError as error:
            if error.code in (405, 501) and method == 'HEAD':
                continue
            result = 'missing' if error.code in (404, 410) else 'unverified'
            return {'url': url, 'status': error.code, 'result': result}
        except Exception as error:
            return {'url': url, 'status': None, 'result': 'unverified', 'reason': str(error)}

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--root', required=True)
    parser.add_argument('--output', required=True)
    args = parser.parse_args()
    root = Path(args.root).resolve()
    build = root/'.next/server/app'
    origins = defaultdict(list)
    count = 0
    for file in build.rglob('*.html'):
        page = Links()
        page.feed(file.read_text(encoding='utf-8'))
        if page.noindex:
            continue
        count += 1
        route = '/' + file.relative_to(build).as_posix()[:-5]
        if route == '/index': route = '/'
        for url in page.links:
            origins[url].append(route)
    rows = []
    print(f'Indexed pages={count}; external URLs={len(origins)}', flush=True)
    with ThreadPoolExecutor(max_workers=4) as pool:
        pending = {pool.submit(check, url): url for url in sorted(origins)}
        for future in as_completed(pending):
            row = future.result()
            row['pages'] = sorted(origins[row['url']])
            rows.append(row)
            if len(rows) % 20 == 0:
                print(f'Checked {len(rows)}/{len(origins)}', flush=True)
    report = {'build_id': (root/'.next/BUILD_ID').read_text().strip(), 'indexed_pages': count,
              'method': 'External anchors; HEAD, GET only if HEAD unsupported. HTTP success does not establish factual correctness. Blocks/timeouts require manual verification.',
              'counts': dict(Counter(row['result'] for row in rows)), 'links': sorted(rows, key=lambda row: row['url'])}
    Path(args.output).write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding='utf-8')
    print(json.dumps(report['counts']), flush=True)
