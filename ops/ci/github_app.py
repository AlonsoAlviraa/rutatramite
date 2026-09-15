"""Short-lived GitHub App credentials, restricted to the requested repository."""
import base64
import json
import os
import time
import urllib.request
from pathlib import Path

REPOS={'rutatramite':'AlonsoAlviraa/rutatramite','visionsetil':'AlonsoAlviraa/VisionSetil'}
CONFIG=Path(os.environ.get('RUTA_CI_GITHUB_CONFIG','C:/Users/Mariano/CI/secrets/github-app.json' if os.name=='nt' else '/opt/ruta-ci/secrets/github-app.json'))

def request(path,token,data=None):
    headers={'Authorization':'Bearer '+token,'Accept':'application/vnd.github+json','X-GitHub-Api-Version':'2022-11-28','User-Agent':'Ruta-CI'}
    req=urllib.request.Request('https://api.github.com/'+path,headers=headers,data=json.dumps(data).encode() if data is not None else None)
    with urllib.request.urlopen(req,timeout=30) as response:
        return json.load(response)

def token(repository,write_status=False,read_pr=False):
    import jwt
    configuration=json.loads(CONFIG.read_text())
    now=int(time.time())
    signed=jwt.encode({'iat':now-60,'exp':now+540,'iss':configuration['app_id']},Path(configuration['private_key']).read_bytes(),algorithm='RS256')
    permissions={'contents':'read','metadata':'read'}
    if write_status:
        permissions['statuses']='write'
    if read_pr:
        permissions['pull_requests']='read'
    return request(f"app/installations/{configuration['installation_id']}/access_tokens",signed,{'repositories':[REPOS[repository].split('/')[1]],'permissions':permissions})['token']

def main_sha(repository):
    return request('repos/'+REPOS[repository]+'/commits/main',token(repository))['sha']

def git_environment(repository):
    credential=token(repository)
    auth=base64.b64encode(('x-access-token:'+credential).encode()).decode()
    return dict(os.environ,GIT_TERMINAL_PROMPT='0',GIT_CONFIG_COUNT='2',GIT_CONFIG_KEY_0='http.https://github.com/.extraheader',GIT_CONFIG_VALUE_0='AUTHORIZATION: basic '+auth,GIT_CONFIG_KEY_1='credential.helper',GIT_CONFIG_VALUE_1='')

def status(repository,sha,state,context,url,description):
    return request('repos/'+REPOS[repository]+'/statuses/'+sha,token(repository,True),{'state':state,'context':'jenkins/'+context,'target_url':url,'description':description[:140]})
