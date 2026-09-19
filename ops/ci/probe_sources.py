"""Small, immutable source bundles for the reviewed VisionSetil probes."""
import hashlib
import io
import json
import re
import shutil
import tarfile
import uuid
from datetime import datetime, timezone
from pathlib import Path, PurePosixPath

ROOT=Path('/opt/ruta-ci/probe-sources')
REQUIRED={'scripts/build_species_index_join.py','data/species_catalog/species_catalog_v2.json','data/species_catalog/synonyms.yaml','frontend/scripts/verify-production-operational.mjs','backend/app/__init__.py','backend/app/ml/__init__.py','backend/app/ml/weight_discovery.py'}


def selected(paths):
    paths=set(paths)
    if not REQUIRED<=paths:raise ValueError('Required probe source is missing')
    # Weights would change discovery behavior; do not silently omit new inputs.
    if any(path.endswith(('.pt','.pth','.onnx','.safetensors')) for path in paths):
        raise ValueError('Tracked model weights require a review of the probe bundle scope')
    return sorted(REQUIRED|{path for path in paths if path.endswith('/label2idx.json')})


def safe_path(value):
    path=PurePosixPath(value)
    if not value or path.is_absolute() or '..' in path.parts or '\\' in value or path.as_posix()!=value:
        raise ValueError('Invalid source path')
    return path


def build(sha, contents):
    if not re.fullmatch('[a-f0-9]{40}',sha):raise ValueError('Invalid source commit')
    if not REQUIRED<=contents.keys():raise ValueError('Required probe source is missing')
    if set(contents)!=set(selected(contents)):raise ValueError('Unreviewed probe input')
    manifest={'schema':'ruta-ci.probe-source.v1','repository':'AlonsoAlviraa/VisionSetil','sha':sha,'files':{}}
    for path,body in sorted(contents.items()):
        safe_path(path)
        if path=='source-manifest.json':raise ValueError('Reserved manifest path')
        manifest['files'][path]={'bytes':len(body),'sha256':hashlib.sha256(body).hexdigest()}
    output=io.BytesIO()
    with tarfile.open(fileobj=output,mode='w') as archive:
        for path,body in [*sorted(contents.items()),('source-manifest.json',json.dumps(manifest,sort_keys=True).encode())]:
            entry=tarfile.TarInfo(path);entry.size=len(body);entry.mode=0o644;archive.addfile(entry,io.BytesIO(body))
    return output.getvalue()


def verify(directory, sha=None):
    directory=Path(directory)
    manifest=json.loads((directory/'source-manifest.json').read_text())
    if manifest.get('schema')!='ruta-ci.probe-source.v1' or manifest.get('repository')!='AlonsoAlviraa/VisionSetil':raise ValueError('Invalid source manifest')
    if not re.fullmatch('[a-f0-9]{40}',manifest.get('sha','')) or sha and manifest['sha']!=sha:raise ValueError('Unexpected source commit')
    if not REQUIRED<=manifest['files'].keys():raise ValueError('Missing required probe files')
    if set(manifest['files'])!=set(selected(manifest['files'])):raise ValueError('Unreviewed probe input')
    expected=set(manifest['files'])|{'source-manifest.json','installation.json'}
    for path in directory.rglob('*'):
        if path.is_symlink():raise ValueError('Source links are forbidden')
        if path.is_file() and path.relative_to(directory).as_posix() not in expected:raise ValueError('Unlisted source file')
    for name,expected_file in manifest['files'].items():
        path=directory/safe_path(name);body=path.read_bytes()
        if len(body)!=expected_file['bytes'] or hashlib.sha256(body).hexdigest()!=expected_file['sha256']:raise ValueError('Source integrity mismatch: '+name)
    return manifest


def install(archive,sha,digest,root=ROOT):
    root=Path(root);body=Path(archive).read_bytes()
    if hashlib.sha256(body).hexdigest()!=digest:raise ValueError('Source archive digest mismatch')
    if not re.fullmatch('[a-f0-9]{40}',sha):raise ValueError('Invalid source commit')
    with tarfile.open(fileobj=io.BytesIO(body)) as package:
        names=[]
        for entry in package:
            safe_path(entry.name)
            if not entry.isfile():raise ValueError('Only regular source files are permitted')
            names.append(entry.name)
        if len(names)!=len(set(names)) or 'installation.json' in names:raise ValueError('Duplicate or reserved archive entry')
        root.mkdir(parents=True,exist_ok=True,mode=0o755)
        stamp=datetime.now(timezone.utc).strftime('%Y%m%dT%H%M%SZ')
        candidate=root/(sha+'-'+stamp+'-'+uuid.uuid4().hex[:8]);candidate.mkdir(mode=0o755)
        try:
            package.extractall(candidate,filter='data');verify(candidate,sha)
            record={'sha':sha,'digest':digest,'installed_at':datetime.now(timezone.utc).isoformat(),'source':str(candidate),'previous':str((root/'current').resolve()) if (root/'current').exists() else None}
            (candidate/'installation.json').write_text(json.dumps(record,indent=2))
            for path in [candidate,*candidate.rglob('*')]:path.chmod(0o755 if path.is_dir() else 0o644)
            pending=root/('.current-'+uuid.uuid4().hex);pending.symlink_to(candidate,target_is_directory=True);pending.replace(root/'current')
            return record
        except Exception:
            # Only this call's unpublished candidate can be removed.
            if (root/'current').resolve()!=candidate.resolve() and candidate.resolve().parent==root.resolve():shutil.rmtree(candidate)
            raise
