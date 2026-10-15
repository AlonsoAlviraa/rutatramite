"""Pinned lychee: sitemap URLs and official references on the resources page.

Windows: downloads a GitHub release and verifies its published SHA256.
Elsewhere: supply LYCHEE_PATH to an independently verified lychee 0.24.2.
Failures stay in the report; HTTP 403/429/timeouts do not establish a dead link.
"""
import argparse, hashlib, json, os, platform, subprocess, sys, zipfile
from pathlib import Path
from urllib.request import urlopen
from urllib.parse import urlsplit
import xml.etree.ElementTree as ET
from audit_site import Page, fetch

ROOT=Path(__file__).resolve().parents[1]
VERSION='0.24.2'
ASSET='lychee-x86_64-pc-windows-msvc'
SHA256='32975d1493ee1a975d6bb41e4fb56fe419cb442ded628bb772ba2e614acfacad'
URL=f'https://github.com/lycheeverse/lychee/releases/download/lychee-v{VERSION}/{ASSET}.zip'

def binary():
    if os.environ.get('LYCHEE_PATH'): exe=Path(os.environ['LYCHEE_PATH'])
    else:
        assert platform.system()=='Windows', 'Set LYCHEE_PATH to verified lychee 0.24.2'
        cache=ROOT/'tmp/audit-tools/lychee'
        cache.mkdir(parents=True,exist_ok=True)
        archive=cache/(ASSET+'.zip')
        if not archive.exists():
            with urlopen(URL,timeout=90) as response: archive.write_bytes(response.read())
        assert hashlib.sha256(archive.read_bytes()).hexdigest()==SHA256,'Release checksum mismatch'
        with zipfile.ZipFile(archive) as z:
            for item in z.infolist():
                target=(cache/item.filename).resolve()
                assert target.is_relative_to(cache.resolve()),'Unsafe archive path'
            z.extractall(cache)
        exe=cache/ASSET/'lychee.exe'
    version=subprocess.check_output([str(exe),'--version'],text=True).strip()
    assert version.split()[1]==VERSION,version
    return exe

def main():
    ap=argparse.ArgumentParser()
    ap.add_argument('--base',default='https://rutatramite.com')
    ap.add_argument('--output',default='docs/audit-lychee.json')
    ap.add_argument('--references',default='/recursos')
    args=ap.parse_args()
    base=args.base.rstrip('/')
    status,xml,_,_=fetch(base+'/sitemap.xml')
    assert status==200,status
    urls={n.text for n in ET.fromstring(xml).iter() if n.tag.endswith('}loc')}
    status,html,_,_=fetch(base+args.references)
    assert status==200,status
    page=Page(); page.feed(html)
    urls.update(h for h in page.links if h.startswith('https://') and urlsplit(h).netloc!=urlsplit(base).netloc)
    if args.references=='/recursos': urls.update(base+p for p in ['/datos/ayudas.json','/datos/ayudas.csv'])
    inputs=ROOT/'tmp/audit-tools/link-inputs.txt'
    inputs.parent.mkdir(parents=True,exist_ok=True)
    inputs.write_text('\n'.join(sorted(urls))+'\n',encoding='utf-8')
    exe=binary()
    command=[str(exe),'--no-progress','--format','json','--output',args.output,'--max-concurrency','4','--host-concurrency','2','--timeout','20','--max-retries','1',str(inputs)]
    result=subprocess.run(command)
    print(json.dumps({'tool':'lychee','version':VERSION,'input_urls':len(urls),'exit_code':result.returncode,'report':args.output}))
    sys.exit(result.returncode)

if __name__=='__main__':main()
