"""Boot an isolated artifact, check real HTTP responses, then stop its unit."""
import hashlib
import json
import os
import re
import socket
import stat
import subprocess
import time
import urllib.error
import urllib.parse
import urllib.request
import uuid
from datetime import datetime, timezone
from html.parser import HTMLParser
from pathlib import Path
from xml.etree import ElementTree

PREVIEWS = Path('/opt/ruta-ci/previews')
ORIGINS = {'rutatramite':'https://rutatramite.com', 'visionsetil':'https://visionsetil.com'}
PORTS = {'rutatramite':18190, 'visionsetil':18191}


class NoRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, request, fp, code, message, headers, url):
        return None


class Html(HTMLParser):
    def __init__(self):
        super().__init__()
        self.assets = set()
        self.canonical = []
        self.h1 = 0
        self.robots = []

    def handle_starttag(self, tag, attrs):
        values = dict(attrs)
        if tag == 'h1': self.h1 += 1
        if tag == 'meta' and values.get('name') == 'robots': self.robots.append(values.get('content', ''))
        if tag == 'link' and values.get('rel') == 'canonical': self.canonical.append(values.get('href'))
        asset = values.get('src') if tag == 'script' else values.get('href') if tag == 'link' and values.get('rel') in ('stylesheet','modulepreload','preload') else None
        if asset: self.assets.add(asset)


def local_path(url, origin):
    value = urllib.parse.urlsplit(url)
    if value.scheme or value.netloc:
        if value.scheme != 'https' or value.netloc != urllib.parse.urlsplit(origin).netloc:
            raise ValueError('Sitemap or artifact URL leaves the expected origin')
    if not value.path.startswith('/') or value.fragment or value.query:
        raise ValueError('Expected an absolute artifact path without query or fragment')
    return value.path


def get(base, path):
    if not path.startswith('/') or path.startswith('//'):
        raise ValueError('Preview requests must use an absolute local path')
    request = urllib.request.Request(base + path, headers={'User-Agent':'Ruta-CI-Artifact-Preview/1.0','X-RutaTramite-Test':'1'})
    with urllib.request.build_opener(NoRedirect).open(request, timeout=15) as response:
        return response.read(), dict(response.headers)


def check_artifact(repository, target, sha, base):
    origin = ORIGINS[repository]
    pages = []
    assets = set()
    result = {'pages':pages,'assets':[],'pdfs':[],'scope':'artifact HTTP checks; no backend or browser journey equivalence claimed'}
    if repository == 'rutatramite':
        xml, _ = get(base, '/sitemap.xml')
        urls = [node.text for node in ElementTree.fromstring(xml).iter() if node.tag.endswith('}loc')]
        if not urls or len(urls) != len(set(urls)):
            raise ValueError('Empty or duplicate sitemap')
        for url in urls:
            path = local_path(url, origin)
            body, headers = get(base, path)
            page = Html(); page.feed(body.decode('utf-8'))
            if page.h1 != 1 or len(page.canonical) != 1 or page.canonical[0].rstrip('/') != url.rstrip('/') or any('noindex' in value for value in page.robots):
                raise ValueError('Invalid indexable page metadata: ' + path)
            assets.update(page.assets)
            pages.append({'path':path,'status':200})
        result['build_id'] = (target/'.next/BUILD_ID').read_text().strip()
        manifest_file = target/'public/pdf/manifest.json'
        if manifest_file.exists():
            manifest = json.loads(manifest_file.read_text())
            for form in manifest['files']:
                path = local_path('/' + form['file'], origin)
                body, headers = get(base, path)
                if not body.startswith(b'%PDF-') or len(body) != form['bytes'] or hashlib.sha256(body).hexdigest() != form['sha256']:
                    raise ValueError('PDF contents do not match the artifact manifest: ' + path)
                if headers.get('Content-Type','').split(';')[0] != 'application/pdf' or headers.get('X-Robots-Tag') != 'noindex':
                    raise ValueError('Invalid PDF response headers: ' + path)
                result['pdfs'].append({'path':path,'sha256':form['sha256']})
        try:
            get(base, '/ci-preview-route-that-does-not-exist')
        except urllib.error.HTTPError as error:
            if error.code != 404: raise
        else:
            raise ValueError('Unknown application page did not return 404')
    else:
        manifest, _ = get(base, '/RELEASE_MANIFEST.json')
        if json.loads(manifest)['git_sha'] != sha:
            raise ValueError('Served frontend commit identity differs from the selected artifact')
        paths = ['/', '/index.html'] + ['/' + path.relative_to(target).as_posix() for path in sorted((target/'prerendered').rglob('*.html'))]
        for path in paths:
            body, _ = get(base, path)
            expected = target/'prerendered/core/home.html' if path == '/' else target/path.lstrip('/')
            if hashlib.sha256(body).digest() != hashlib.sha256(expected.read_bytes()).digest():
                raise ValueError('Served HTML differs from the selected artifact: ' + path)
            page = Html(); page.feed(body.decode('utf-8'))
            assets.update(page.assets)
            pages.append({'path':path,'status':200})
        result['git_sha'] = sha
        result['routing_scope'] = 'Static artifact paths and prerendered homepage; production Caddy routing and API are separate checks.'
    for asset in sorted(assets):
        parsed = urllib.parse.urlsplit(asset)
        if parsed.netloc and parsed.netloc != urllib.parse.urlsplit(origin).netloc:
            continue
        # Public API/media are not frontend build assets. Only check bundled resources.
        if not parsed.path.startswith(('/assets/', '/_next/', '/static/')):
            continue
        path = parsed.path + (('?' + parsed.query) if parsed.query else '')
        body, headers = get(base, path)
        if not body or 'text/html' in headers.get('Content-Type',''):
            raise ValueError('Bundled resource returned empty content or HTML: ' + path)
        result['assets'].append({'path':path,'status':200,'sha256':hashlib.sha256(body).hexdigest()})
    if not result['assets']:
        raise ValueError('No bundled assets were exercised')
    return result


def unit_command(repository, target, unit, port):
    properties = ['Type=exec','DynamicUser=yes','NoNewPrivileges=yes','PrivateTmp=yes','ProtectSystem=strict','ProtectHome=yes',
                  'MemoryMax=512M','CPUQuota=100%','TasksMax=256','RuntimeMaxSec=600',
                  'WorkingDirectory='+str(target),'RuntimeDirectory='+unit,
                  'InaccessiblePaths=-/opt/ruta-ci/secrets -/opt/ruta-ci/jenkins -/opt/ruta-ci/probe -/srv/tenants -/opt/visionsetil']
    command = ['systemd-run','--quiet','--collect','--unit',unit]
    for value in properties: command += ['--property',value]
    command += ['--setenv','HOME=/run/'+unit]
    if repository == 'rutatramite':
        for value in ['HOSTNAME=127.0.0.1','PORT='+str(port),'NODE_ENV=production','NODE_OPTIONS=--max-old-space-size=384',
                      'NEXT_PUBLIC_SITE_URL='+ORIGINS[repository],'METRICS_DB_PATH=/run/'+unit+'/metrics.sqlite']:
            command += ['--setenv',value]
        command += ['/usr/bin/node','server.js']
    else:
        config = target.parent/'preview-server.json'
        config.write_text(json.dumps({'admin':{'disabled':True},'apps':{'http':{'servers':{'preview':{
            'listen':['127.0.0.1:'+str(port)],'routes':[
                {'handle':[{'handler':'headers','response':{'set':{'X-Robots-Tag':['noindex']}}}]},
                {'match':[{'path':['/']}],'handle':[{'handler':'rewrite','uri':'/prerendered/core/home.html'}]},
                {'handle':[{'handler':'file_server','root':str(target)}]}
            ]}}}}}))
        config.chmod(0o644)
        command += ['/usr/bin/caddy','run','--config',str(config)]
    return command


def run_preview(repository, target, sha, digest, receipts):
    target = Path(target).resolve(strict=True)
    root = (PREVIEWS/repository).resolve(strict=True)
    if root not in target.parents or not re.fullmatch('[a-f0-9]{40}',sha):
        raise ValueError('Preview target or commit is invalid')
    # The dynamic service account can read the artifact, but cannot mutate it.
    for path in [PREVIEWS,root,target,*target.rglob('*')]:
        if path.is_symlink(): continue
        path.chmod(0o755 if path.is_dir() or path.stat().st_mode & 0o111 else 0o644)
    target.parent.chmod(0o755)
    port = PORTS[repository]
    with socket.socket() as probe:
        probe.bind(('127.0.0.1',port))
    stamp = datetime.now(timezone.utc).strftime('%Y%m%dT%H%M%SZ')
    unit = 'ruta-ci-preview-'+repository+'-'+uuid.uuid4().hex[:12]
    record = {'status':'starting','repository':repository,'sha':sha,'digest':digest,'target':str(target),'unit':unit,'at':stamp,'base':'http://127.0.0.1:'+str(port)}
    receipts = Path(receipts); receipts.mkdir(parents=True,exist_ok=True)
    receipt = receipts/('preview-'+stamp+'-'+unit.rsplit('-',1)[1]+'.json')
    def save(): receipt.write_text(json.dumps(record,indent=2))
    save()
    try:
        command = unit_command(repository,target,unit,port)
        subprocess.run(command,check=True,timeout=30)
        for attempt in range(30):
            try:
                get(record['base'],'/')
                break
            except (urllib.error.URLError,TimeoutError):
                state=subprocess.run(['systemctl','is-active','--quiet',unit],capture_output=True)
                if state.returncode and attempt > 1:
                    raise RuntimeError('Preview service failed during startup')
                time.sleep(1)
        else: raise RuntimeError('Preview did not become reachable')
        record['checks'] = check_artifact(repository,target,sha,record['base'])
        record['status'] = 'passed'
    except Exception as error:
        record.update(status='failed',error=type(error).__name__+': '+str(error))
        raise
    finally:
        logs=subprocess.run(['journalctl','-u',unit,'--no-pager','-n','80'],capture_output=True,text=True)
        record['service_log']=logs.stdout
        subprocess.run(['systemctl','stop',unit],capture_output=True,timeout=30)
        state=subprocess.run(['systemctl','is-active','--quiet',unit],capture_output=True)
        record['stopped']=state.returncode in (3,4)
        record['finished_at']=datetime.now(timezone.utc).isoformat()
        if not record['stopped']: record['status']='failed'
        save()
    if not record['stopped']: raise RuntimeError('Preview service did not stop')
    return dict(record,receipt=str(receipt))
