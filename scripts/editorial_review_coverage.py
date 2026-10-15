"""Partition captured sitemap URLs by the explicit local editorial review ledger.

This reports coverage, never factual accuracy, SEO quality or publication status.
Run from the repository root; supply --output to preserve each dated snapshot.
"""
import argparse
from collections import Counter
from datetime import datetime, timezone
import hashlib
import json
from pathlib import Path


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--triage', type=Path, default=Path('docs/seo-workflow/20260916T091910Z-visibility/claims-triage.json'))
    parser.add_argument('--ledger', type=Path, default=Path('docs/seo-workflow/editorial-review-ledger-20260916.json'))
    parser.add_argument('--output', type=Path, required=True)
    args = parser.parse_args()
    if args.output.exists():
        parser.error('Output already exists; choose a new snapshot path.')
    triage = json.loads(args.triage.read_text(encoding='utf-8'))
    ledger = json.loads(args.ledger.read_text(encoding='utf-8'))
    entries = ledger['pages'] + ledger['additional_pages'] + ledger.get('verified_unchanged_pages', [])
    local_changes = {p['path'] for p in entries if p['status'] == 'reviewed_local_unpublished'}
    unchanged = {p['path'] for p in entries if p['status'] == 'reviewed_unchanged'}
    reviewed = local_changes | unchanged
    captured = {p['path'] for p in triage['pages']}
    assert len(captured) == len(triage['pages']), 'Duplicate captured URL'
    assert len({p['path'] for p in entries}) == len(entries), 'Duplicate ledger URL'
    assert reviewed <= captured, 'Ledger URL absent from captured sitemap'
    scenarios = {'/empadronarse/' + p.stem for p in Path('content/escenarios').glob('*.md')}
    institutional = {'/aviso-legal', '/privacidad', '/contacto', '/fuentes', '/metodologia'}
    resources = {'/descargas', '/recursos', '/recursos/padron-municipal'}
    hubs = {'/', '/alquiler', '/ayudas', '/bebe', '/becas', '/colegio', '/comedor', '/dni', '/empadronarse', '/extranjeria', '/fp', '/modelos', '/pasaporte'}

    def category(path):
        if path in scenarios:
            return 'padron_scenario'
        if path.startswith('/empadronarse/'):
            return {2: 'regional_directory', 3: 'provincial_directory', 4: 'municipal_detail'}[len(path.strip('/').split('/'))]
        if path in institutional:
            return 'institutional_information'
        if path in resources:
            return 'resource_catalogue'
        if path in hubs:
            return 'topic_hub'
        return 'individual_guide'

    remaining = [dict(path=p['path'], title=p['title'], category=category(p['path']),
                      captured_review_label=p['captured_review_label'], captured_body_sha256=p['captured_body_sha256'],
                      signal_counts=p['signal_counts'], status='not_in_current_review_ledger')
                 for p in triage['pages'] if p['path'] not in reviewed]
    assert len(reviewed) + len(remaining) == len(captured)
    sha = lambda p: hashlib.sha256(p.read_bytes()).hexdigest()
    result = dict(created_at=datetime.now(timezone.utc).isoformat(),
                  sources=[dict(path=str(p), sha256=sha(p)) for p in [args.triage, args.ledger]],
                  scope='Coverage of this audit ledger against the captured 258-URL sitemap, not all public URLs or all previous reviews.',
                  limitations=['Not in this ledger does not mean never reviewed, false or low quality.',
                               'Dates and lexical signals are not factual verdicts or ranking causes.',
                               'Directory categories group routes for checking shared templates; each URL remains listed.',
                               'Reviewed local changes are unpublished; no search metrics were queried.'],
                  captured_count=len(captured), reviewed_local_count=len(local_changes), verified_unchanged_count=len(unchanged),
                  reviewed_count=len(reviewed), remaining_count=len(remaining),
                  remaining_category_counts=dict(sorted(Counter(p['category'] for p in remaining).items())),
                  remaining=remaining)
    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(json.dumps(result, ensure_ascii=False, indent=2)+'\n', encoding='utf-8')
    print(json.dumps({k: result[k] for k in ['captured_count', 'reviewed_local_count', 'verified_unchanged_count', 'reviewed_count', 'remaining_count', 'remaining_category_counts']}, indent=2))


if __name__ == '__main__':
    main()
