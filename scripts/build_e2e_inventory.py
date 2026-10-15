"""Build an exhaustive test inventory from emitted HTML, linked targets and assets."""
import argparse
import json
import re
from pathlib import Path
from urllib.parse import urljoin,urlsplit,unquote
from xml.etree import ElementTree as ET
from audit_site import Page

def main():
    ap=argparse.ArgumentParser();ap.add_argument('--build-dir',default='.next');ap.add_argument('--output',default='docs/e2e-inventory.json');args=ap.parse_args()
    root=Path(__file__).resolve().parents[1];build=root/args.build_dir/'server/app'
    if not build.is_dir():raise SystemExit('Build first; no inferred coverage')
    sitemap={urlsplit(x.text).path or '/' for x in ET.parse(root/'public/sitemap.xml').iter() if x.tag.endswith('}loc')}
    pages=[];targets=set(sitemap)
    for file in sorted(build.rglob('*.html')):
        url='/'+file.relative_to(build).as_posix()[:-5];url='/' if url=='/index' else url
        html=file.read_text(encoding='utf-8');p=Page();p.feed(re.sub(r'<script(?![^>]*application/ld\+json)[\s\S]*?</script>','',html))
        if url.startswith('/_'):continue
        pages.append({'path':url,'indexable':url in sitemap,'title':p.title})
        for href in list(p.links)+re.findall(r'(?:src|href)="([^"<>]+)"',html):
            parsed=urlsplit(urljoin('https://rutatramite.com'+url,href.replace('&amp;','&')))
            if parsed.netloc=='rutatramite.com' and parsed.scheme in ('http','https'):targets.add(unquote(parsed.path) or '/')
    targets.update(['/datos/ayudas.json','/datos/ayudas.csv','/datos/padron-municipal.json','/datos/padron-municipal.csv','/api/guias','/sitemap.xml','/robots.txt'])
    manifest=json.loads((root/'public/pdf/manifest.json').read_text(encoding='utf-8'))
    targets.update('/'+f['file'] for f in manifest['files'])
    result={'build_id':(root/args.build_dir/'BUILD_ID').read_text().strip(),'pages':pages,'targets':sorted(targets),'pdfs':manifest['files']}
    dest=root/args.output;dest.parent.mkdir(parents=True,exist_ok=True);dest.write_text(json.dumps(result,ensure_ascii=False,indent=2),encoding='utf-8')
    print(json.dumps({'build_id':result['build_id'],'pages':len(pages),'targets':len(targets),'pdfs':len(result['pdfs'])}))
if __name__=='__main__':main()
