"""Read-only daily Google organic progress; never infer goal achievement from tests.

Finalized data, one property, property aggregation. Missing days remain unknown.
Seven consecutive finalized days are the conservative sustained-goal criterion.
"""
import argparse,json
from datetime import date,datetime,timedelta,timezone
from pathlib import Path
from urllib.parse import quote
from submit_search import gsc_refresh,http_json

ROOT=Path(__file__).resolve().parents[1]
TARGET={'impressions':1000,'clicks':50}

def evaluate(rows,end,days=7):
    by_date={r['keys'][0]:r for r in rows}
    daily=[]
    for offset in range(days-1,-1,-1):
        day=str(end-timedelta(days=offset)); row=by_date.get(day)
        daily.append({'date':day,'reported':row is not None,
                      'impressions':row.get('impressions') if row else None,
                      'clicks':row.get('clicks') if row else None,
                      'meets_target':bool(row and row.get('impressions',0)>=1000 and row.get('clicks',0)>=50)})
    return {'target_per_day':TARGET,'consecutive_days_required':days,'daily':daily,
            'days_meeting_target':sum(r['meets_target'] for r in daily),
            'goal_evidenced':all(r['meets_target'] for r in daily),
            'missing_days':[r['date'] for r in daily if not r['reported']]}

def save_report(report, directory, now):
    """Keep the latest attempt visible without losing the last successful sample."""
    directory.mkdir(parents=True, exist_ok=True)
    target=directory/('growth-'+now.strftime('%Y%m%dT%H%M%SZ')+'.json')
    payload=json.dumps(report,ensure_ascii=False,indent=2)
    target.write_text(payload,encoding='utf-8')
    (directory/'growth-latest.json').write_text(payload,encoding='utf-8')
    if not report.get('error'):
        (directory/'growth-last-success.json').write_text(payload,encoding='utf-8')
    return target

def main():
    ap=argparse.ArgumentParser()
    ap.add_argument('--end',type=date.fromisoformat)
    ap.add_argument('--output-dir',type=Path,default=ROOT/'docs')
    args=ap.parse_args()
    now=datetime.now(timezone.utc)
    end=args.end or now.date()
    report={'checked_at':now.isoformat(),'scope':'Google web organic, one property; Search Console calendar dates are Pacific Time. Provisional figures do not prove the goal.'}
    try:
        auth={'Authorization':'Bearer '+gsc_refresh()}
        def request(url,payload=None):
            status,body=http_json(url,payload,auth)
            if status!=200: raise RuntimeError(f'Google API HTTP {status}')
            return json.loads(body)
        sites=request('https://www.googleapis.com/webmasters/v3/sites').get('siteEntry',[])
        available={s['siteUrl'] for s in sites}
        property=next((s for s in ['sc-domain:rutatramite.com','https://rutatramite.com/'] if s in available),None)
        if not property: raise RuntimeError('No authorized RutaTramite property')
        report['property']=property
        endpoint='https://www.googleapis.com/webmasters/v3/sites/'+quote(property,safe='')+'/searchAnalytics/query'
        common={'startDate':str(end-timedelta(days=27)),'endDate':str(end),'type':'web','dataState':'final','rowLimit':25000}
        daily=request(endpoint,{**common,'dimensions':['date'],'aggregationType':'byProperty'})
        report['request']=common
        report['final_daily']=daily
        final_rows=daily.get('rows',[])
        latest=max((date.fromisoformat(r['keys'][0]) for r in final_rows),default=end)
        report['latest_final_date']=str(latest) if final_rows else None
        report['evaluation']=evaluate(final_rows,latest)
        report['evaluation']['measurement_age_days']=(now.date()-latest).days if final_rows else None
        if not final_rows or (now.date()-latest).days>3:
            report['evaluation']['goal_evidenced']=False
            report['evaluation']['stale_or_missing_evidence']=True
        report['pages']=request(endpoint,{**common,'dimensions':['page'],'aggregationType':'byPage'})
        report['queries']=request(endpoint,{**common,'dimensions':['query'],'aggregationType':'byProperty'})
        recent={'startDate':str(end-timedelta(days=6)),'endDate':str(end),'type':'web','dataState':'all','rowLimit':25000}
        report['recent_all_states']={name:request(endpoint,{**recent,'dimensions':[dimension],'aggregationType':aggregation}) for name,dimension,aggregation in [('daily','date','byProperty'),('pages','page','byPage'),('queries','query','byProperty')]}
    except Exception as exc:
        # Do not serialize OAuth response bodies or headers.
        report['error']=type(exc).__name__+': '+str(exc)[:120] if isinstance(exc,RuntimeError) else type(exc).__name__
        report['evaluation']={'goal_evidenced':False,'reason':'measurement unavailable'}
    target=save_report(report,args.output_dir,now)
    print(json.dumps({'report':str(target),'property':report.get('property'),'evaluation':report['evaluation'],'error':report.get('error')}))
    if report.get('error'): raise SystemExit(1)

if __name__=='__main__':main()
