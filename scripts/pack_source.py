"""Bundle build inputs, without dependencies, outputs or environment secrets."""
from pathlib import Path
import hashlib,json,tarfile,tempfile
from release_inputs import ROOT,RECORD,fingerprint

inputs=fingerprint()
assert inputs==json.loads(RECORD.read_text()),'Inputs changed'
target=Path(tempfile.mkdtemp(prefix='rutatramite-source-'))/'source.tar.gz'
roots=['src','data','content','public','messages','tests','scripts',
       'pack/rutatramite-empadronamiento-agent-pack/05_content/escenarios']
files=['package.json','package-lock.json','next.config.ts','tailwind.config.ts',
       'postcss.config.mjs','tsconfig.json','next-env.d.ts','vitest.config.ts']
def include(info):
    if any(part in ('__pycache__','_drafts') for part in Path(info.name).parts): return None
    return info
with tarfile.open(target,'w:gz') as archive:
    for name in roots+files: archive.add(ROOT/name,arcname=name,filter=include)
with target.open('rb') as source: digest=hashlib.file_digest(source,'sha256').hexdigest()
assert inputs==fingerprint(),'Inputs changed while bundling'
report={'archive':str(target),'sha256':digest,'bytes':target.stat().st_size,'source_inputs':inputs}
(ROOT/'docs/source-bundle.json').write_text(json.dumps(report,indent=2),encoding='utf-8')
print(json.dumps(report),flush=True)
