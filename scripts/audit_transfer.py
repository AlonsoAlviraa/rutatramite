"""Measure public transfer sizes; not a browser/Core Web Vitals benchmark."""
import concurrent.futures
import gzip
import json
import re
import time
from pathlib import Path
from urllib.request import Request, urlopen
from urllib.parse import urljoin

BASE = 'https://rutatramite.com'

def measure(path):
    started = time.perf_counter()
    with urlopen(Request(urljoin(BASE, path), headers={'Accept-Encoding': 'gzip'}), timeout=30) as response:
        first_headers = time.perf_counter()
        raw = response.read()
        decoded = gzip.decompress(raw) if response.headers.get('Content-Encoding') == 'gzip' else raw
        return {'path': path, 'status': response.status, 'transfer_bytes': len(raw),
                'decoded_bytes': len(decoded), 'headers_ms': round((first_headers-started)*1000),
                'total_ms': round((time.perf_counter()-started)*1000),
                'cache_control': response.headers.get('Cache-Control'),
                'encoding': response.headers.get('Content-Encoding')}, decoded

if __name__ == '__main__':
    page, html = measure('/')
    assets = sorted(set(re.findall(r'(?:src|href)="(/_next/[^"<>]+)"', html.decode())))
    with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:
        rows = [row for row, _ in pool.map(measure, assets)]
    report = {'method': 'One HTTP sample, gzip requested; timings include DNS/TLS and local network. Referenced assets include conditional polyfills and exclude later browser requests. No browser execution, cache simulation or Core Web Vitals.',
              'page': page, 'assets': rows,
              'referenced_transfer_bytes': page['transfer_bytes'] + sum(row['transfer_bytes'] for row in rows)}
    Path('docs/audit-transfer.json').write_text(json.dumps(report, indent=2), encoding='utf-8')
    print(json.dumps(report))
