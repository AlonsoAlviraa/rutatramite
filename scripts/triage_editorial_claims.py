"""Inventory wording that deserves review; never classify a claim as false.

Works only on a completed captured sitemap. Does not modify original evidence,
editorial dates, indexability or the local review ledger. Negative statements,
quotations, correct rules and templates may all match these lexical patterns.
"""
import argparse
from collections import Counter
from datetime import datetime, timezone
import hashlib
import json
from pathlib import Path
import re
from urllib.parse import urlsplit

PATTERNS = {
    'absolute_or_universal': r'\b(?:siempre|nunca|en cualquier|en todos los|ning[uú]n|sin excepci[oó]n|autom[aá]ticamente)\b',
    'immediate_or_guaranteed': r'\b(?:al momento|inmediata|instant[aá]ne[oa]|garantiza|garantizado|en cualquier momento)\b',
    'unsupported_frequency_candidate': r'\b(?:lo habitual|la mayor[ií]a|casi siempre|suelen|es frecuente|el m[aá]s demandado|los m[aá]s demandados)\b',
    'numeric_deadline_or_amount': r'\b\d+(?:[.,]\d+)?\s*(?:d[ií]as|horas|semanas|meses|a[nñ]os|euros|€|%)',
    'normative_claim': r'\b(?:obligatori[oa]|debe(?:s|n)? presentar|no (?:puede|pueden|admite|existe)|exige|exigen|es ilegal)\b',
}


def triage(report):
    if not report.get('completed_at') or report.get('crawl_limit_pending'):
        raise ValueError('A completed, uncapped capture is required')
    paths = sorted({urlsplit(u).path or '/' for u in report['sitemap_urls']})
    rows = []
    for path in paths:
        page = report['pages'].get(path, {})
        if page.get('status') != 200 or not page.get('html') or page.get('noindex'):
            raise ValueError('Sitemap page needs technical reconciliation: ' + path)
        text = page.get('main_text', '')
        signals = []
        for kind, pattern in PATTERNS.items():
            for match in re.finditer(pattern, text, re.I):
                start, end = max(0, match.start() - 140), min(len(text), match.end() + 210)
                signals.append({'kind': kind, 'match': match.group(), 'start': match.start(),
                                'context': text[start:end]})
        rows.append({
            'path': path, 'title': page.get('title'), 'captured_body_sha256': page.get('sha256'),
            'captured_review_label': bool(re.search(r'Revisión editorial\s+\d{4}-\d{2}-\d{2}', text)),
            'main_external_hosts': sorted({urlsplit(a['href']).hostname for a in page.get('anchors', [])
                                          if a.get('main') and a['href'].startswith('https://')
                                          and urlsplit(a['href']).hostname != urlsplit(report['origin']).hostname}),
            'signal_counts': dict(Counter(s['kind'] for s in signals)), 'signals': signals,
            'decision': 'Needs contextual review; matches and absence of matches are not accuracy judgments.',
        })
    return rows


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('evidence', type=Path)
    parser.add_argument('--output', type=Path, required=True)
    args = parser.parse_args()
    if args.output.resolve() == args.evidence.resolve():
        raise SystemExit('Original evidence cannot be overwritten')
    report = json.loads(args.evidence.read_text(encoding='utf-8'))
    pages = triage(report)
    result = {
        'created_at': datetime.now(timezone.utc).isoformat(),
        'source': str(args.evidence), 'source_sha256': hashlib.sha256(args.evidence.read_bytes()).hexdigest(),
        'capture_completed_at': report['completed_at'],
        'scope': 'All captured sitemap HTML, including pages with an editorial review date. Lexical triage only; no factual verdicts, severity scores, ranking causality or current local-content validation.',
        'limitations': ['Negations and accurate quotations may match.', 'Unmatched wording is not verified.',
                        'External hosts are destinations, not proof of primary-source support.',
                        'The production snapshot can contain claims already corrected in unpublished local work.'],
        'patterns': PATTERNS,
        'page_count': len(pages), 'pages_with_signals': sum(bool(p['signals']) for p in pages),
        'review_labeled_pages_with_signals': sum(p['captured_review_label'] and bool(p['signals']) for p in pages),
        'counts': dict(Counter(s['kind'] for p in pages for s in p['signals'])), 'pages': pages,
    }
    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(json.dumps(result, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    print(json.dumps({k: result[k] for k in ('page_count', 'pages_with_signals', 'review_labeled_pages_with_signals', 'counts')}))


if __name__ == '__main__':
    main()
