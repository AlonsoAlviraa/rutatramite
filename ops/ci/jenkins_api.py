"""Local controller administration. Passwords never enter command arguments or logs."""
import base64
import http.cookiejar
import json
import sys
import urllib.parse
import urllib.request
from pathlib import Path

def api(path, data=None, content_type='application/json'):
    password = Path('/opt/ruta-ci/secrets/admin-password').read_text().strip()
    opener = urllib.request.build_opener(urllib.request.HTTPCookieProcessor(http.cookiejar.CookieJar()))
    auth = 'Basic ' + base64.b64encode(('mariano:' + password).encode()).decode()
    headers = {'Authorization': auth}
    if data is not None:
        req = urllib.request.Request('http://127.0.0.1:18080/crumbIssuer/api/json', headers=headers)
        crumb = json.load(opener.open(req, timeout=30))
        headers[crumb['crumbRequestField']] = crumb['crumb']
        headers['Content-Type'] = content_type
    req = urllib.request.Request('http://127.0.0.1:18080/' + path, data=data, headers=headers)
    with opener.open(req, timeout=120) as response:
        return response.read()

if __name__ == '__main__':
    request = json.loads(Path(sys.argv[1]).read_text())
    payload = request.get('data')
    if isinstance(payload, dict):
        payload = urllib.parse.urlencode(payload).encode()
    elif isinstance(payload, str):
        payload = payload.encode()
    result = api(request['path'], payload, request.get('content_type','application/x-www-form-urlencoded'))
    if request['path'] == 'scriptText' and (b'Exception:' in result or b'startup failed:' in result):
        print(result.decode()[:2500])
        raise SystemExit(1)
    if 'output' in request:
        target = Path(request['output'])
        target.write_bytes(result)
        target.chmod(0o600)
        print(json.dumps({'saved': str(target), 'bytes': len(result)}))
    else:
        print(result.decode())
