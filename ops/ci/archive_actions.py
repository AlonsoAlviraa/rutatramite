"""Archive available Actions artifacts, validate ZIPs, retain independent SHA-256 receipts."""
import hashlib
import json
import subprocess
import zipfile
from pathlib import Path

gh = 'C:/Program Files/GitHub CLI/gh.exe'
root = Path('C:/Users/Mariano/CI/archive/github-actions')
root.mkdir(parents=True, exist_ok=True)
records = []
for repository in ['rutatramite','VisionSetil']:
    artifacts = []
    page = 1
    while True:
        data = json.loads(subprocess.check_output([gh,'api',f'repos/AlonsoAlviraa/{repository}/actions/artifacts?per_page=100&page={page}']))
        artifacts.extend(data['artifacts'])
        if len(data['artifacts']) < 100:
            break
        page += 1
    (root/f'{repository}-inventory.json').write_text(json.dumps(artifacts,indent=2))
    for artifact in artifacts:
        if artifact['expired']:
            continue
        target = root/f'{repository}-{artifact["id"]}.zip'
        if not target.exists():
            part = target.with_suffix('.partial')
            with part.open('wb') as output:
                response = subprocess.run([gh,'api',f'repos/AlonsoAlviraa/{repository}/actions/artifacts/{artifact["id"]}/zip'],stdout=output,stderr=subprocess.PIPE)
            if response.returncode:
                print(f'UNAVAILABLE {repository} {artifact["id"]}',flush=True)
                continue
            part.replace(target)
        with zipfile.ZipFile(target) as archive:
            assert archive.testzip() is None
        with target.open('rb') as handle:
            digest = hashlib.file_digest(handle,'sha256').hexdigest()
        records.append({'repo':repository,'id':artifact['id'],'name':artifact['name'],'path':str(target),'sha256':digest,'bytes':target.stat().st_size})
        (root/'verified.json').write_text(json.dumps(records,indent=2))
        print(f'VERIFIED {repository} {artifact["id"]} {target.stat().st_size}',flush=True)
print(f'Archived {len(records)} artifacts. Nothing deleted from GitHub.',flush=True)
