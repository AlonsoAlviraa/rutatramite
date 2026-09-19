import argparse
import ssh_transport as vps
import subprocess
from pathlib import Path
from runner import validate_sha

def main():
    parser=argparse.ArgumentParser()
    parser.add_argument('--sha',type=validate_sha,required=True)
    args=parser.parse_args()
    main_sha=subprocess.check_output(['C:/Program Files/GitHub CLI/gh.exe','api','repos/AlonsoAlviraa/VisionSetil/commits/main','--jq','.sha'],text=True).strip()
    if args.sha!=main_sha: raise ValueError('Caddy changes require the current reviewed main commit')
    root=Path('C:/Users/Mariano/CI')
    repo=root/'visionsetil'
    subprocess.run(['git','-C',str(repo),'fetch','origin',args.sha],check=True)
    files=[]
    for path,name in [('deploy/patch_caddy_production_policy.py','policy.py'),('deploy/activate-frontend-release.sh','activator.sh')]:
        target=root/'migration'/(args.sha+'-'+name)
        target.write_bytes(subprocess.check_output(['git','-C',str(repo),'show',args.sha+':'+path]))
        files.append(target)
    client=vps.connect()
    try:
        sftp=client.open_sftp()
        for item in files: vps.put_file(sftp,str(item),'/tmp/ruta-ci-'+item.name)
        vps.put_file(sftp,str(Path(__file__).with_name('caddy-policy.sh')),'/tmp/ruta-ci-caddy-policy.sh')
        command=f"flock /tmp/ruta-ci-caddy-policy.lock bash /tmp/ruta-ci-caddy-policy.sh /tmp/ruta-ci-{files[0].name} /tmp/ruta-ci-{files[1].name} {args.sha}"
        if vps.run(client,command): raise RuntimeError('Caddy policy verification failed')
    finally: client.close()

if __name__=='__main__': main()
