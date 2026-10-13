"""Run pinned axe-core against representative public templates in an isolated browser.

Install requirements-audit.txt and Chromium, or set AUDIT_PLAYWRIGHT_PATH and
AUDIT_CHROME_PATH to an existing isolated installation. No user browser profiles.
"""
import argparse,json,os,sys
from pathlib import Path
from datetime import datetime,timezone

if os.environ.get('AUDIT_PLAYWRIGHT_PATH'):
    sys.path.insert(0,os.environ['AUDIT_PLAYWRIGHT_PATH'])
from playwright.sync_api import sync_playwright

ROOT=Path(__file__).resolve().parents[1]
DEFAULT_PATHS=['/','/recursos','/ayudas','/becas','/alquiler','/becas/colaboracion','/alquiler/bono-alquiler-joven-madrid','/empadronarse','/empadronarse/con-contrato','/empadronarse/sin-contrato','/empadronarse/cita-previa-madrid','/inventario-fianza-alquiler','/bebe/calendario-vacunal-castilla-y-leon','/fuentes','/contacto']

def main():
    ap=argparse.ArgumentParser()
    ap.add_argument('--base',default='https://rutatramite.com')
    ap.add_argument('--output',required=True)
    ap.add_argument('--paths',nargs='*')
    ap.add_argument('--widths',nargs='+',type=int,default=[390,1280])
    args=ap.parse_args()
    axe=ROOT/'node_modules/axe-core/axe.min.js'
    assert axe.is_file(),'npm ci is required'
    rows=[]; errors=[]
    def save(completed=False):
        report={'checked_at':datetime.now(timezone.utc).isoformat(),'base':args.base,'pages':rows,'javascript_errors':errors,'passed_page_rules':sum(len(r['axe']['passes']) for r in rows),'violated_page_rules':sum(len(r['axe']['violations']) for r in rows),'manual_review_page_rules':sum(len(r['axe']['incomplete']) for r in rows),'checks_completed':completed,'scope':'Automated page/rule checks; incomplete results need review. Not WCAG certification.'}
        Path(args.output).write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf-8')
        return report
    with sync_playwright() as p:
        options={'headless':True}
        if os.environ.get('AUDIT_CHROME_PATH'): options['executable_path']=os.environ['AUDIT_CHROME_PATH']
        browser=p.chromium.launch(**options)
        for width in args.widths:
            page=browser.new_page(viewport={'width':width,'height':900})
            page.on('pageerror',lambda error: errors.append(str(error)))
            for path in args.paths or DEFAULT_PATHS:
                response=page.goto(args.base.rstrip('/')+path,wait_until='networkidle',timeout=90000)
                assert response.status==200,(path,response.status)
                page.add_script_tag(path=str(axe))
                result=page.evaluate("""async () => {
                  const r = await axe.run(document, {runOnly: {type: 'tag', values: ['wcag2a','wcag2aa','wcag21a','wcag21aa','best-practice']}});
                  const detail = x => ({id:x.id,impact:x.impact,description:x.description,helpUrl:x.helpUrl,nodes:x.nodes.map(n=>({target:n.target,summary:n.failureSummary}))});
                  return {version:r.testEngine.version,passes:r.passes.map(x=>x.id),violations:r.violations.map(detail),incomplete:r.incomplete.map(detail),inapplicable:r.inapplicable.map(x=>x.id)};
                }""")
                row={'path':path,'width':width,'overflow':page.evaluate('document.documentElement.scrollWidth > innerWidth'),'axe':result}
                rows.append(row)
                save()
                print(json.dumps({'path':path,'width':width,'passes':len(result['passes']),'violations':[x['id'] for x in result['violations']],'incomplete':len(result['incomplete'])}),flush=True)
            page.close()
        report=save(completed=True)
        browser.close()
    if errors or report['violated_page_rules'] or any(r['overflow'] for r in rows): raise SystemExit(1)

if __name__=='__main__':main()
