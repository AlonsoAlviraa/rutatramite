"""Run pinned FreeCrawl against the live indexable HTML sitemap; preserve evidence."""
import argparse, hashlib, json, subprocess, sys
from datetime import datetime, timezone
from pathlib import Path
from urllib.request import urlopen
from urllib.parse import urlsplit
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--output-dir', default='docs/seo-workflow')
    args = ap.parse_args()
    lock = json.loads((ROOT/'scripts/seo-tools.lock.json').read_text())['freecrawl']
    repo = ROOT/lock['directory']
    commit = subprocess.check_output(['git','-C',str(repo),'rev-parse','HEAD'],text=True).strip()
    if commit != lock['commit']: raise SystemExit('FreeCrawl commit differs from reviewed lock')
    cli = repo/'apps/cli/dist/index.js'
    if not cli.exists(): raise SystemExit('Build FreeCrawl first: npm ci --ignore-scripts; npx tsc -b apps/cli')
    stamp = datetime.now(timezone.utc).strftime('%Y%m%dT%H%M%SZ')
    output = (ROOT/args.output_dir/stamp).resolve(); output.mkdir(parents=True,exist_ok=False)
    private = ROOT/'tmp/seo-tools/runs'/stamp; private.mkdir(parents=True,exist_ok=False)
    with urlopen('https://rutatramite.com/sitemap.xml',timeout=30) as response: xml = response.read()
    urls = [n.text for n in ET.fromstring(xml).findall('{*}url/{*}loc')]
    if not urls or len(urls) != len(set(urls)): raise SystemExit('Empty or duplicated sitemap')
    if any(urlsplit(u).netloc != 'rutatramite.com' or urlsplit(u).scheme != 'https' for u in urls): raise SystemExit('Unexpected sitemap host')
    (output/'urls.txt').write_text('\n'.join(urls)+'\n',encoding='utf-8')
    config = ROOT/'scripts/freecrawl.config.json'
    command = ['node',str(cli),'--list',str(output/'urls.txt'),'--config',str(config),'--max',str(len(urls)+10),'--db',str(private/'crawl.seoproject'),'--out',str(private/'crawl.json'),'--json']
    with (output/'freecrawl-summary.json').open('w',encoding='utf-8') as stdout, (output/'freecrawl-stderr.log').open('w',encoding='utf-8') as stderr:
        result = subprocess.run(command,cwd=repo,stdout=stdout,stderr=stderr)
    report = {'checked_at':datetime.now(timezone.utc).isoformat(),'tool':lock,'exit_code':result.returncode,'sitemap_count':len(urls),'sitemap_sha256':hashlib.sha256(xml).hexdigest(),'config_sha256':hashlib.sha256(config.read_bytes()).hexdigest(),'raw_export':str(private/'crawl.json'),'project_db':str(private/'crawl.seoproject'),'scope':'Live sitemap HTML via HTTP, no JavaScript rendering; issue counts are heuristics, not ranking scores.'}
    (output/'run.json').write_text(json.dumps(report,indent=2)+'\n',encoding='utf-8')
    (ROOT/args.output_dir/'latest-freecrawl.json').write_text(json.dumps({'directory':str(output),**report},indent=2)+'\n',encoding='utf-8')
    print(json.dumps({'directory':str(output),'exit_code':result.returncode,'urls':len(urls)}))
    return result.returncode

if __name__ == '__main__': sys.exit(main())
