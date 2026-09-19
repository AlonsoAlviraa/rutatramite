"""Authenticated event ingestion. No shell commands or repository code execute here."""
import hashlib
import hmac
import json
import re
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from dispatch import accept

REPOS={'AlonsoAlviraa/rutatramite':'rutatramite','AlonsoAlviraa/VisionSetil':'visionsetil'}
ROOT=Path('/opt/ruta-ci')

def select_event(event,payload):
    repository=REPOS.get(payload.get('repository',{}).get('full_name'))
    if repository is None:
        return None
    if event=='pull_request':
        pr=payload['pull_request']
        if payload.get('action') not in ['opened','synchronize','reopened','ready_for_review'] or pr.get('draft'):
            return None
        if pr['head'].get('repo',{}).get('full_name') != payload['repository']['full_name']:
            return None # Forks require a deliberate manual build in the private panel.
        sha,base=pr['head']['sha'],pr['base']['sha']
        number=payload.get('number',pr.get('number'))
        if type(number) is not int or number < 1:
            raise ValueError('Invalid proposal number')
        scope='pr/'+str(number)
    elif event=='push' and payload.get('ref') in ['refs/heads/main','refs/heads/master','refs/heads/develop','refs/heads/merge/best-of-both']:
        if payload.get('deleted'):
            return None
        sha,base=payload['after'],payload['before']
        scope='branch/'+payload['ref'].removeprefix('refs/heads/')
        if base=='0'*40:
            base=''
    else:
        return None
    if not re.fullmatch('[a-f0-9]{40}',sha) or (base and not re.fullmatch('[a-f0-9]{40}',base)):
        raise ValueError('Invalid revision')
    return {'repository':repository,'sha':sha,'base':base,'mode':'pr','scope':scope}

def valid_signature(body,signature,secret):
    expected='sha256='+hmac.new(secret,body,hashlib.sha256).hexdigest()
    return hmac.compare_digest(expected,signature)

class Handler(BaseHTTPRequestHandler):
    def do_POST(self):
        if self.path!='/events/github':
            self.send_error(404); return
        length=int(self.headers.get('Content-Length','0'))
        if length<1 or length>1024*1024:
            self.send_error(413); return
        body=self.rfile.read(length)
        secret=(ROOT/'secrets/webhook-secret').read_bytes().strip()
        if not valid_signature(body,self.headers.get('X-Hub-Signature-256',''),secret):
            self.send_error(403); return
        try:
            job=select_event(self.headers.get('X-GitHub-Event',''),json.loads(body))
            if job:
                accept(ROOT/'events.sqlite',job)
            self.send_response(202); self.end_headers()
        except (ValueError,KeyError):
            self.send_error(400)
        except Exception:
            self.send_error(503)

if __name__=='__main__':
    ThreadingHTTPServer(('127.0.0.1',18081),Handler).serve_forever()
