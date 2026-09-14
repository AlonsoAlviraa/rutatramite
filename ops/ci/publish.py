"""Manual publication entrypoint. Download verified Jenkins artifacts; never rebuild."""
import argparse
import base64
import json
import subprocess
import urllib.request
from pathlib import Path
from release_gate import validate
import ssh_transport as vps

ROOT = Path('C:/Users/Mariano/CI')
REPOS = {'rutatramite':'rutatramite','visionsetil':'VisionSetil'}

def get(path):
    password = (ROOT/'secrets/jenkins-password').read_text().strip()
    request = urllib.request.Request('https://ci.rutatramite.com/'+path,headers={'Authorization':'Basic '+base64.b64encode(('mariano:'+password).encode()).decode()})
    return urllib.request.urlopen(request,timeout=90)

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--repo',choices=REPOS,required=True)
    parser.add_argument('--build',type=int,required=True)
    parser.add_argument('--action',choices=['preview','publish'],default='preview')
    args = parser.parse_args()
    if args.build < 1:
        parser.error('A successful build number is required')
    path = f'job/{args.repo}-full/{args.build}/'
    with get(path+'api/json') as response:
        build = json.load(response)
    with get(path+'artifact/ci-results/result.json') as response:
        report = json.load(response)
    package_name = 'release.tar' if args.repo == 'rutatramite' else 'release.tar.gz'
    if report.get('package',{}).get('name') != package_name:
        raise ValueError('Unexpected package name')
    target = ROOT/'archive/releases'/args.repo/str(args.build)
    target.mkdir(parents=True,exist_ok=True)
    package = target/package_name
    with get(path+'artifact/ci-results/'+package_name) as response, package.open('wb') as output:
        import shutil
        shutil.copyfileobj(response,output)
    main_sha = subprocess.check_output(['C:/Program Files/GitHub CLI/gh.exe','api',f'repos/AlonsoAlviraa/{REPOS[args.repo]}/commits/main','--jq','.sha'],text=True).strip()
    digest = validate(report,args.repo,main_sha,package,build['result'])
    client = vps.connect()
    try:
        remote = '/opt/ruta-ci/incoming/'+args.repo+'-'+main_sha+'-'+digest+'.tar'
        vps.put_file(client.open_sftp(),str(package),remote)
        command = f'sudo python3 /opt/ruta-ci/config/activate.py {args.repo} {args.action} {main_sha} {digest}'
        if vps.run(client,command) != 0:
            raise RuntimeError('Activation failed; inspect preserved controller and server logs')
    finally:
        client.close()
    (target/'verified-build.json').write_text(json.dumps(report,indent=2))

if __name__ == '__main__':
    main()
