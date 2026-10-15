"""Prepare an honest weekly review from private aggregate reports; never sends mail."""
import argparse,json
from datetime import date,timedelta,datetime,timezone
from pathlib import Path

# Fixed protocol: docs/seo-workflow/measurement/ai-prompts.json, version 1
QUESTIONS=['¿Cómo elijo el formulario oficial para empadronarme en Madrid y qué cambia si otra persona presenta la solicitud por mí?', '¿Dónde puedo consultar becas y ayudas al alquiler con fuentes y fechas de revisión, y descargar los datos en CSV?', '¿Cómo distingo una ayuda con solicitud abierta de una modificación de datos o una norma que aún no abre plazo?', '¿Qué diferencia hay entre el EX-15, el EX-17 y el EX-18 y dónde se descargan los impresos oficiales?', '¿Qué opciones tengo para empadronarme si vivo en una vivienda y no tengo contrato de alquiler a mi nombre?', '¿Para qué sirve la autorización de regreso y cuál es su formulario oficial?', '¿Qué debo comprobar antes de pedir cita para renovar el DNI y consultar su tasa?', 'Necesito un pasaporte urgente en España: ¿dónde consulto opciones oficiales y qué debo preparar?', '¿Cómo puedo comprobar que un PDF de un trámite procede del organismo oficial y corresponde a mi caso?', '¿Qué información debería incluir una cita de un calendario de ayudas para poder contrastar sus plazos?']

def summarize_window(rows, start, end):
 dates=[str(start+timedelta(days=i)) for i in range((end-start).days+1)]
 selected=[rows[d] for d in dates if d in rows]
 complete=len(selected)==len(dates)
 return {'start':str(start),'end':str(end),'days':len(dates),'reported_days':len(selected),'missing_dates':[d for d in dates if d not in rows],'complete':complete,'impressions_reported':sum(r['impressions'] for r in selected),'clicks_reported':sum(r['clicks'] for r in selected),'daily_impressions':sum(r['impressions'] for r in selected)/len(dates) if complete else None,'daily_clicks':sum(r['clicks'] for r in selected)/len(dates) if complete else None}

def publication_review(rows, baseline):
 milestones=[]
 for end in [date(2026,9,21),date(2026,9,28),date(2026,10,12)]:
  window=summarize_window(rows,date(2026,9,15),end)
  comparable=baseline['complete'] and window['complete']
  milestones.append({'review_on':str(end),'status':'ready_for_comparison' if comparable else 'awaiting_final_data','window':window,'daily_impressions_change':window['daily_impressions']-baseline['daily_impressions'] if comparable else None,'daily_clicks_change':window['daily_clicks']-baseline['daily_clicks'] if comparable else None})
 return {'publication_date':'2026-09-14','publication_day_excluded':True,'calendar':'Search Console / America/Los_Angeles','baseline':baseline,'milestones':milestones,'interpretation':'Compare complete final daily windows; no causal attribution from a before/after difference. Missing days remain unknown. If final data lag the review date, complete that milestone when those dates become available.'}

def main():
 ap=argparse.ArgumentParser();ap.add_argument('--reports',type=Path,required=True);args=ap.parse_args()
 now=datetime.now(timezone.utc);source=args.reports/'growth-last-success.json'
 growth=json.loads(source.read_text(encoding='utf-8')) if source.exists() else {}
 rows={r['keys'][0]:r for r in growth.get('final_daily',{}).get('rows',[])}
 args.reports.mkdir(parents=True,exist_ok=True)
 history_path=args.reports/'final-daily-history.json'
 saved=json.loads(history_path.read_text(encoding='utf-8')) if history_path.exists() else {}
 if saved.get('property') and growth.get('property') and saved['property']!=growth['property']:
  raise ValueError('Refusing to mix Search Console properties in review history')
 rows={**saved.get('rows',{}),**rows}
 rows={day:row for day,row in rows.items() if day>=str(now.date()-timedelta(days=180))}
 history_path.write_text(json.dumps({'property':growth.get('property') or saved.get('property'),'rows':rows},ensure_ascii=False,indent=2),encoding='utf-8')
 end=date.fromisoformat(growth['latest_final_date']) if growth.get('latest_final_date') else None
 windows=[]
 for days in [7,14,28]:
  dates=[str(end-timedelta(days=i)) for i in range(days)] if end else []
  selected=[rows[d] for d in dates if d in rows];missing=[d for d in dates if d not in rows]
  windows.append({'days':days,'end':str(end) if end else None,'reported_days':len(selected),'missing_dates':missing,'complete':len(selected)==days,'impressions_reported':sum(r['impressions'] for r in selected),'clicks_reported':sum(r['clicks'] for r in selected)})
 report={'generated_at':now.isoformat(),'windows_final_data':windows,'source_checked_at':growth.get('checked_at'),'geo_protocol':{'questions':QUESTIONS,'platforms':['Google AI Mode','Microsoft Copilot'],'territory':'España','status':'pending_independent_observation','record_each':['exact_question','platform_and_visible_version','observed_at','answer_text_or_screenshot','cited_urls','rutatramite_cited','negative_or_unavailable_reason'],'rule':'Una ausencia se registra como negativa solo tras observar la respuesta. Falta de acceso no equivale a cero citas.'},'outreach':{'max_personalized_emails_per_week':5,'followups_max':1,'followup_after_business_days':10,'require_check_response_before_followup':True,'already_sent_on_2026_09_14':['infojoven@zaragoza.es','informajoven@murcia.es','informacioninjuve@injuve.es','accem@accem.es','acoge@redacoge.org'],'earliest_weekday_followup':'2026-09-28','holiday_adjustment':'Comprobar festivos del destinatario antes del seguimiento.'},'actions_pending':['Revisar nuevas fechas y fuentes municipales pendientes','Contrastar páginas modificadas frente a impresiones, clics y acciones agregadas','Observar y guardar las diez respuestas de IA; no inferir citas de un rastreo','Revisar respuestas de difusión y verificar cada backlink antes de contabilizarlo']}
 args.reports.mkdir(parents=True,exist_ok=True)
 baseline_path=args.reports/'publication-baseline-20260914.json'
 baseline=json.loads(baseline_path.read_text(encoding='utf-8')) if baseline_path.exists() else summarize_window(rows,date(2026,9,7),date(2026,9,13))
 if not baseline['complete']:
  baseline=summarize_window(rows,date(2026,9,7),date(2026,9,13))
 baseline_path.write_text(json.dumps(baseline,ensure_ascii=False,indent=2),encoding='utf-8')
 report['publication_review']=publication_review(rows,baseline)
 target=args.reports/('weekly-review-'+str(now.date())+'.json');target.write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf-8');print(str(target))

if __name__=='__main__':main()
