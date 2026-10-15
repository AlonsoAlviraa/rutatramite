"""Reconcile a completed live visibility capture without changing its evidence."""
import argparse
from collections import Counter
from datetime import datetime, timezone
import hashlib
import json
from pathlib import Path
import re
from urllib.parse import urlsplit
from urllib.robotparser import RobotFileParser

from audit_visibility import summarize, ORIGIN


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('evidence', type=Path)
    args = parser.parse_args()
    source = args.evidence
    report = json.loads(source.read_text(encoding='utf-8'))
    if not report.get('completed_at'):
        raise SystemExit('Capture is not complete; do not report final coverage')
    if report.get('crawl_limit_pending'):
        raise SystemExit('Crawl limit reached; unresolved targets must be reviewed before final coverage')
    pages = report['pages']
    seeds = sorted({urlsplit(u).path or '/' for u in report['sitemap_urls']})
    graph = summarize(pages, seeds)
    robots = RobotFileParser()
    robots.parse(Path(report['robots']['raw_file']).read_text(encoding='utf-8').splitlines())
    inspections = {urlsplit(x['url']).path or '/': x for x in report['inspections']}
    technical = []
    for path in seeds:
        row = pages.get(path, {})
        findings = []
        if row.get('status') != 200 or not row.get('html'): findings.append('failed_html_fetch')
        else:
            if row['noindex']: findings.append('noindex_in_sitemap')
            if row['snippet_restricted']: findings.append('snippet_restricted')
            if row['canonical'] != [ORIGIN + path] and not (path == '/' and row['canonical'] == [ORIGIN]): findings.append('canonical_mismatch')
            if not row.get('title', '').strip(): findings.append('missing_title')
            if not row.get('description', '').strip(): findings.append('missing_description')
            if len(row['h1']) != 1 or not row['h1'][0].strip(): findings.append('h1_structure')
            if not robots.can_fetch('Googlebot', ORIGIN + path): findings.append('robots_blocks_googlebot')
        technical.append({'path': path, 'findings': findings})
    edition = []
    for path in seeds:
        row = pages[path]
        matched = re.search(r'Edición del contenido (\d{4}-\d{2}-\d{2})', row.get('main_text', ''))
        if matched:
            edition.append({'path': path, 'edition_date': matched[1], 'title': row['title'],
                            'decision': 'No individual review date displayed in captured HTML; not proof that every claim is wrong.'})
    coverage = Counter()
    by_path = []
    for row in graph['pages']:
        path = row['path']
        inspection = inspections.get(path, {})
        state = inspection.get('data', {}).get('inspectionResult', {}).get('indexStatusResult', {})
        label = state.get('coverageState', 'API unavailable or not requested')
        coverage[label] += 1
        by_path.append({**row, 'inspection_checked_at': inspection.get('checked_at'), 'google': state})
    counts = Counter(f for r in technical for f in r['findings'])
    out = {
        'reviewed_at': datetime.now(timezone.utc).isoformat(),
        'source': str(source), 'source_sha256': hashlib.sha256(source.read_bytes()).hexdigest(),
        'capture_completed_at': report['completed_at'],
        'scope': '258-target scope is derived from the captured sitemap, never hard-coded. HTML observations, graph and stored Google index state are distinct. Incoming-link counts are page counts, not PageRank or ranking causality.',
        'graph_summary': {k: v for k, v in graph.items() if k != 'pages'},
        'technical_issue_counts': dict(counts), 'technical_checks': technical,
        'inspection_counts': dict(coverage), 'edition_only_count': len(edition), 'edition_only_pages': edition,
        'single_incoming_pages': [r['path'] for r in graph['pages'] if len(r['incoming_pages']) == 1],
        'pages': by_path,
    }
    target = source.with_name('review.json')
    target.write_text(json.dumps(out, ensure_ascii=False, indent=2), encoding='utf-8')
    print(json.dumps({'report': str(target), 'technical_issues': dict(counts), 'inspection_counts': dict(coverage),
                      'edition_only_count': len(edition), 'single_incoming_count': len(out['single_incoming_pages'])}))


if __name__ == '__main__': main()
