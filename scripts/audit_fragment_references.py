"""Read-only check of cross-page anchors and ARIA ID references in a build."""
import argparse
from collections import Counter
from html.parser import HTMLParser
import json
from pathlib import Path
from urllib.parse import unquote, urljoin, urlsplit

class References(HTMLParser):
    def __init__(self):
        super().__init__()
        self.ids = Counter()
        self.links = []
        self.references = []

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if attrs.get('id'):
            self.ids[attrs['id']] += 1
        if tag == 'a' and attrs.get('href'):
            self.links.append(attrs['href'])
        for name in ('aria-labelledby', 'aria-describedby', 'aria-controls'):
            for target in attrs.get(name, '').split():
                self.references.append((name, target))
        if tag == 'label' and attrs.get('for'):
            self.references.append(('for', attrs['for']))

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--build-dir', required=True)
    ap.add_argument('--output', required=True)
    args = ap.parse_args()
    root = Path(args.build_dir)
    pages = {}
    for file in (root / 'server/app').rglob('*.html'):
        path = '/' + file.relative_to(root / 'server/app').as_posix()[:-5]
        if path == '/index':
            path = '/'
        parser = References()
        parser.feed(file.read_text(encoding='utf-8'))
        pages[path] = parser
    issues = []
    fragment_count = reference_count = 0
    for path, page in pages.items():
        for target, count in page.ids.items():
            if count > 1:
                issues.append({'path': path, 'kind': 'duplicate_id', 'target': target})
        for name, target in page.references:
            reference_count += 1
            if target not in page.ids:
                issues.append({'path': path, 'kind': name, 'target': target})
        for href in page.links:
            url = urlsplit(urljoin('https://rutatramite.com' + path, href))
            if url.netloc != 'rutatramite.com' or not url.fragment:
                continue
            target = unquote(url.fragment)
            if target.startswith(':~:text='):
                continue
            fragment_count += 1
            destination = pages.get(url.path or '/')
            if destination is None:
                issues.append({'path': path, 'kind': 'fragment_target_not_in_build', 'target': href})
            elif target not in destination.ids:
                issues.append({'path': path, 'kind': 'missing_fragment', 'target': href})
    report = {
        'build_id': (root / 'BUILD_ID').read_text().strip(),
        'pages': len(pages), 'fragment_links': fragment_count,
        'id_references': reference_count, 'issues': issues,
        'scope': 'Static ID and fragment resolution; not full accessibility conformance',
    }
    Path(args.output).write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding='utf-8')
    print(json.dumps(report, ensure_ascii=False))
    if not pages or issues:
        raise SystemExit(1)

if __name__ == '__main__':
    main()
