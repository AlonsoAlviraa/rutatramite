"""SEO Machine + existing GSC OAuth, with dated evidence and no paid services.

Runs the upstream keyword/quick-win/low-CTR analysis through an adapter that
fixes the reporting window, uses finalized web data and one domain property.
Does not copy credentials to third-party repositories or publish content.
"""
import argparse, importlib.util, json, re, subprocess, sys
from datetime import date, datetime, timedelta, timezone
from pathlib import Path
from urllib.parse import quote
from submit_search import gsc_refresh, http_json

ROOT = Path(__file__).resolve().parents[1]
SITE = 'sc-domain:rutatramite.com'
BRAND = re.compile(r'ruta[\s-]*tr[aá]mite|rutatramite\.com', re.I)

class Request:
    def __init__(self, service, body): self.service, self.body = service, body
    def execute(self): return self.service.fetch(self.body)

class FinalizedGSC:
    def __init__(self, token, start, end):
        self.auth={'Authorization':'Bearer '+token}
        self.start,self.end=str(start),str(end)
        self.cache={}; self.evidence=[]
    def searchanalytics(self): return self
    def query(self, *, siteUrl, body):
        if siteUrl != SITE: raise ValueError('Unexpected property')
        return Request(self,body)
    def fetch(self, body, *, window=None):
        start,end=window or (self.start,self.end)
        body={**body,'startDate':str(start),'endDate':str(end),'type':'web','dataState':'final','rowLimit':25000}
        dims=body.get('dimensions',[])
        has_page_filter=any(f.get('dimension')=='page' for g in body.get('dimensionFilterGroups',[]) for f in g.get('filters',[]))
        body['aggregationType']='byPage' if 'page' in dims or has_page_filter else 'byProperty'
        key=json.dumps(body,sort_keys=True)
        if key in self.cache: return self.cache[key]
        rows=[]; pages=[]; offset=0
        while True:
            payload={**body,'startRow':offset}
            status,text=http_json('https://www.googleapis.com/webmasters/v3/sites/'+quote(SITE,safe='')+'/searchAnalytics/query',payload,self.auth)
            if status!=200: raise RuntimeError(f'GSC HTTP {status}')
            response=json.loads(text); batch=response.get('rows',[]); rows.extend(batch)
            pages.append({'request':payload,'response':response})
            if len(batch)<25000: break
            offset+=25000
            if offset>=100000: raise RuntimeError('Pagination safety limit: incomplete extraction')
        combined={'rows':rows,'responseAggregationType':response.get('responseAggregationType')}
        self.cache[key]=combined; self.evidence.extend(pages)
        return combined

def totals(rows):
    impressions=sum(r['impressions'] for r in rows); clicks=sum(r['clicks'] for r in rows)
    return {'reported_rows':len(rows),'impressions':impressions if rows else None,'clicks':clicks if rows else None,'ctr':clicks/impressions if impressions else None,'no_rows_means':'no reported data; not proof of zero demand' if not rows else None}

def main():
    ap=argparse.ArgumentParser(); ap.add_argument('--output-dir',default='docs/seo-workflow'); args=ap.parse_args()
    now=datetime.now(timezone.utc); stamp=now.strftime('%Y%m%dT%H%M%SZ')
    output=ROOT/args.output_dir/stamp; output.mkdir(parents=True,exist_ok=False)
    lock=json.loads((ROOT/'scripts/seo-tools.lock.json').read_text())['seomachine']; repo=ROOT/lock['directory']
    actual=subprocess.check_output(['git','-C',str(repo),'rev-parse','HEAD'],text=True).strip()
    if actual!=lock['commit']: raise SystemExit('SEO Machine commit differs from reviewed lock')
    spec=importlib.util.spec_from_file_location('seomachine_gsc',repo/'data_sources/modules/google_search_console.py')
    module=importlib.util.module_from_spec(spec); spec.loader.exec_module(module)
    service=FinalizedGSC(gsc_refresh(),now.date()-timedelta(days=89),now.date())
    latest_daily=service.fetch({'dimensions':['date']})['rows']
    if not latest_daily: raise RuntimeError('No finalized reporting date; do not invent comparison window')
    end=max(date.fromisoformat(r['keys'][0]) for r in latest_daily); start=end-timedelta(days=89)
    service.start,service.end=str(start),str(end)
    # Reuse upstream analysis without its service-account-only constructor.
    client=module.GoogleSearchConsole.__new__(module.GoogleSearchConsole)
    client.site_url=SITE; client.service=service
    keywords=client.get_keyword_positions(days=90,limit=25000)
    quick_wins=client.get_quick_wins(days=90,prioritize_commercial=False)
    low_ctr=client.get_low_ctr_pages(days=90,path_filter=None)
    current=service.fetch({'dimensions':['date']})
    previous=service.fetch({'dimensions':['date']},window=(start-timedelta(days=90),start-timedelta(days=1)))
    year_window=(start.replace(year=start.year-1),end.replace(year=end.year-1))
    last_year=service.fetch({'dimensions':['date']},window=year_window)
    pages=service.fetch({'dimensions':['page']})['rows']
    query_pages=service.fetch({'dimensions':['query','page']})['rows']
    devices=service.fetch({'dimensions':['device']})['rows']
    countries=service.fetch({'dimensions':['country']})['rows']
    branded=[r for r in keywords if BRAND.search(r['keyword'])]
    unbranded=[r for r in keywords if not BRAND.search(r['keyword'])]
    report={'checked_at':now.isoformat(),'property':SITE,'upstream':lock,'window':{'start':str(start),'end':str(end),'days':90,'data_state':'final','timezone':'America/Los_Angeles'},'current':totals(current['rows']),'previous_90_days':totals(previous['rows']),'previous_year_same_dates':totals(last_year['rows']),'keywords':keywords,'brand_split':{'branded':branded,'nonbranded':unbranded,'note':'Only disclosed query rows; omitted/anonymized queries are not assigned to either group.'},'quick_wins':quick_wins,'low_ctr_candidates':low_ctr,'pages':pages,'query_page_rows':query_pages,'devices':devices,'countries':countries,'limitations':['GSC returns reported top rows, not all queries or market search volumes. Pagination does not recover anonymized queries.','Missing dates and empty historical windows are unknown, not fabricated traffic zeros.','Upstream low-CTR potential_clicks is a 5% CTR scenario, not a forecast.','Quick-win intent weighting disabled: English commercial keywords do not fit this Spanish public-information site.','No GA4 or visitor event implementation found in the source inspection; downloads and official-site clicks are not measured conversions.','All current finalized rows predate the September 14 releases; no before/after causal result can be established today.'],'paid_api_calls':0,'evidence_file':'gsc-evidence.json'}
    (output/'gsc-evidence.json').write_text(json.dumps(service.evidence,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    (output/'seomachine-gsc.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    (ROOT/args.output_dir/'latest-seomachine.json').write_text(json.dumps({'directory':str(output),'report':str(output/'seomachine-gsc.json')},indent=2)+'\n',encoding='utf-8')
    print(json.dumps({'report':str(output/'seomachine-gsc.json'),'current':report['current'],'quick_wins':len(quick_wins),'low_ctr_candidates':len(low_ctr),'pages':len(pages),'query_page_rows':len(query_pages),'window':report['window']}))

if __name__=='__main__': main()
