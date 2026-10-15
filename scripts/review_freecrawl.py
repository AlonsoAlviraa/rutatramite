"""Review FreeCrawl evidence for this Spanish site without altering raw findings."""
import json, sqlite3, sys
from collections import Counter
from datetime import datetime, timezone
from pathlib import Path
from urllib.parse import unquote, urlsplit
from audit_discoverability import Document, entities

ROOT=Path(__file__).resolve().parents[1]

def check_coverage(urls, rows):
    fetched={r['url']:r for r in rows if r.get('statusCode') is not None}
    missing=[u for u in urls if u not in fetched]
    failed=[u for u in urls if u in fetched and (fetched[u].get('statusCode')!=200 or fetched[u].get('indexability')!='indexable' or fetched[u].get('contentKind')!='html')]
    return {'missing_urls':missing,'failed_urls':failed,'passed':not missing and not failed,'discovered_but_unfetched':sum(r.get('statusCode') is None for r in rows)}

def conflicting_ids(es):
    seen={}; conflicts=[]
    for e in es:
        if not e.get('@id'): continue
        target=seen.setdefault(e['@id'],{})
        for k in ['@type','name','url','headline']:
            if k not in e: continue
            if k in target and target[k]!=e[k]: conflicts.append({'id':e['@id'],'property':k})
            target[k]=e[k]
    return conflicts

def main():
    latest=json.loads((ROOT/'docs/seo-workflow/latest-freecrawl.json').read_text())
    output=Path(latest['directory']); urls=(output/'urls.txt').read_text().splitlines()
    rows=json.loads(Path(latest['raw_export']).read_text(encoding='utf-8')); coverage=check_coverage(urls,rows)
    by_url={r['url']:r for r in rows}; titles=Counter(by_url[u]['title'] for u in urls if u in by_url)
    descriptions=Counter(by_url[u]['metaDescription'] for u in urls if u in by_url)
    db=sqlite3.connect(Path(latest['project_db']).as_uri()+'?mode=ro',uri=True)
    records=[]; clusters=[]
    for url in urls:
        r=by_url.get(url,{})
        source=db.execute('SELECT s.body FROM urls u LEFT JOIN url_sources s ON s.url_id=u.id WHERE u.url=?',(url,)).fetchone()
        if not source or not source[0]:
            records.append({'url':url,'checks':{'html_evidence_available':False}}); continue
        doc=Document(); doc.feed(source[0]); es=list(entities(doc.schemas))
        checks={
            'http_200':r.get('statusCode')==200,
            'indexable':r.get('indexability')=='indexable',
            'self_canonical':len(doc.canonicals)==1 and doc.canonicals[0].rstrip('/')==url.rstrip('/'),
            'title_present_unique':bool(doc.title.strip()) and titles[doc.title]==1,
            'description_present_unique':bool(doc.meta.get('description')) and descriptions[doc.meta.get('description')]==1,
            'single_nonempty_h1':len(doc.h1)==1 and bool(doc.h1[0].strip()),
            'spanish_document':doc.lang=='es',
            'responsive_viewport':'width=device-width' in doc.meta.get('viewport',''),
            'valid_jsonld':bool(doc.schemas) and not any(isinstance(s,dict) and 'error' in s for s in doc.schemas),
            'consistent_entity_ids':not conflicting_ids(es),
            'one_main':doc.mains==1,
            'skip_link_resolves':'#contenido' in doc.links and 'contenido' in doc.ids,
            'html_images_have_alt':all(doc.image_alts),
            'local_fragments_resolve':all(unquote(a[1:]) in doc.ids for a in doc.links if a.startswith('#') and a!='#'),
        }
        municipal_links=sorted(a for a in doc.links if '/empadronarse/' in a and len(urlsplit(a).path.strip('/').split('/'))==4)
        records.append({'url':url,'checks':checks,'html_img_count':len(doc.image_alts)})
        if r.get('clusterSize',0)>1: clusters.append({'url':url,'cluster_id':r['clusterId'],'word_count':r['wordCount'],'municipal_links':municipal_links,'decision':'Directory template similarity. Distinct municipality destinations; no automatic canonical consolidation.'})
    db.close()
    counts=Counter('pass' if passed else 'fail' for r in records for passed in r['checks'].values())
    report={'checked_at':datetime.now(timezone.utc).isoformat(),'scope':'Independent review of saved FreeCrawl HTTP HTML snapshots. Critical checks; not a replacement or alteration of upstream raw issues.','coverage':coverage,'counts':dict(counts),'pages':len(records),'results':records,'near_duplicate_review':clusters,'triage':[
        {'raw_rule':'crawledNotInSitemap','decision':'List mode did not ingest sitemap metadata. Exact coverage reconciled with the actual fetched sitemap, preserved as urls.txt.'},
        {'raw_rule':'skipLinkMissing','decision':'Upstream only recognizes selected English target IDs; #contenido is verified against actual HTML.'},
        {'raw_rule':'schemaDuplicateId','decision':'Repeated references to the same Organization are not conflicting entities. Shared identifying fields checked.'},
        {'raw_rule':'schemaMissingRequired','decision':'Upstream hard-codes Article image/datePublished as required. Google Article documentation says no required properties. Do not invent dates or images to clear this warning.','source':'https://developers.google.com/search/docs/appearance/structured-data/article'},
        {'raw_rule':'titleTooLong/metaPixelWidthTooLong','decision':'Review candidates, not mandatory character limits; no automatic truncation.','source':'https://developers.google.com/search/docs/appearance/title-link'},
        {'raw_rule':'contentThin/fleschVeryDifficult','decision':'Word-count thresholds and non-Spanish readability heuristics are not a quality verdict. Review intent and actual source coverage.'},
        {'raw_rule':'analyticsMissing','decision':'Confirmed: no visitor analytics detected. GSC clicks do not establish downloads, sessions or completed official procedures.'},
        {'raw_rule':'imageMissingAlt','decision':'Inspect actual HTML img elements separately; CSS backgrounds have no HTML alt attribute.'}
    ]}
    (output/'review.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    print(json.dumps({k:v for k,v in report.items() if k not in ['results','triage','near_duplicate_review']}))
    return 1 if counts['fail'] or not coverage['passed'] else 0

if __name__=='__main__':sys.exit(main())
