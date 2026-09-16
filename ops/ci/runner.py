"""Trusted Windows orchestrator: repository code runs only inside disposable containers."""
import argparse
import ctypes
import hashlib
import json
import os
import re
import shutil
import subprocess
import sys
import time
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path('C:/Users/Mariano/CI')
SCRIPTS = Path(__file__).resolve().parent
SOURCES = {'rutatramite': ROOT/'rutatramite', 'visionsetil': ROOT/'visionsetil'}
REPOSITORIES = {'rutatramite':'AlonsoAlviraa/rutatramite','visionsetil':'AlonsoAlviraa/VisionSetil'}

class Memory(ctypes.Structure):
    _fields_ = [('length',ctypes.c_ulong),('load',ctypes.c_ulong)] + [(name,ctypes.c_ulonglong) for name in ('total','available','total_page','available_page','total_virtual','available_virtual','extended')]

def available_memory():
    if os.name != 'nt':
        return 0
    result = Memory()
    result.length = ctypes.sizeof(result)
    if not ctypes.windll.kernel32.GlobalMemoryStatusEx(ctypes.byref(result)):
        raise OSError('Cannot inspect memory; refusing heavy work')
    return result.available

def resources_for(step):
    # Host headroom is separate from the Docker/WSL container ceiling.
    # Frontend passed the complete 3 GiB trial. Other PR stages are bounded
    # trials at the same ceiling: any failure still fails the job.
    if step == 'checkout':
        return {'host_gib': 0.5, 'memory_gib': None, 'cpus': None}
    if step in {'vision-frontend', 'vision-security', 'vision-german', 'vision-backend', 'gitleaks'}:
        return {'host_gib': 2, 'memory_gib': 3, 'cpus': 2}
    return {'host_gib': 8, 'memory_gib': 6, 'cpus': 6}


def wait_resources(step):
    minimum = resources_for(step)['host_gib']
    while available_memory() < minimum*1024**3 or shutil.disk_usage(ROOT).free < 20*1024**3:
        print(f'WAITING_RESOURCES: {step} needs {minimum:g} GiB available host RAM and 20 GiB free disk; this step has not started.',flush=True)
        time.sleep(30)


def container_resources(step):
    profile = resources_for(step)
    args = ['--cpus', str(profile['cpus']), '--memory', str(profile['memory_gib'])+'g']
    if profile['memory_gib'] == 3:
        args += ['--memory-swap', '3g']
    return args

def validate_sha(value):
    if not re.fullmatch('[0-9a-f]{40}',value):
        raise ValueError('An exact 40-character commit SHA is required')
    return value

def choose_stages(repo, mode, changes):
    if repo == 'rutatramite':
        return ['ruta-full'] if mode == 'full' else ['ruta-pr']
    if mode == 'journeys':
        return ['vision-journeys']
    if mode == 'android':
        return ['vision-android']
    stages = ['vision-security','gitleaks']
    all_checks = mode == 'full' or not changes
    known = ('frontend/','backend/','sites/pilzbestimmung.com/','docs/')
    all_checks |= any(not p.startswith(known) for p in changes)
    if all_checks or any(p.startswith('backend/') for p in changes):
        stages.append('vision-backend')
    if all_checks or any(p.startswith(('frontend/','sites/pilzbestimmung.com/')) for p in changes):
        stages.extend(['vision-german','vision-frontend'])
    if all_checks:
        stages.append('docker-build')
    return stages

def run_command(args, log, timeout=3600, env=None):
    print('STEP ' + log.stem, flush=True)
    with log.open('wb') as output:
        result = subprocess.run(args,stdout=output,stderr=subprocess.STDOUT,timeout=timeout,env=env)
    if result.returncode:
        print(f'FAILED {log.name}; original output retained.',flush=True)
        raise subprocess.CalledProcessError(result.returncode,args)

def collect(work, output):
    for relative in ['ci-results','frontend/test-results','frontend/playwright-report','frontend/monitor-results','frontend/monitor-report','tmp/e2e/ci','docs']:
        source = work/relative
        if source.exists():
            target = output/'evidence'/relative
            shutil.copytree(source,target,dirs_exist_ok=True)

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--repo',choices=SOURCES,required=True)
    parser.add_argument('--sha',type=validate_sha,required=True)
    parser.add_argument('--base',type=validate_sha)
    parser.add_argument('--mode',choices=['pr','full','journeys','android'],required=True)
    parser.add_argument('--source',choices=['local','github'],default='github')
    args = parser.parse_args()
    if args.mode == 'android' and args.repo != 'visionsetil':
        parser.error('Android belongs to VisionSetil')
    stamp = datetime.now(timezone.utc).strftime('%Y%m%dT%H%M%SZ')
    run = ROOT/'runs'/f'{args.repo}-{args.sha[:12]}-{stamp}'
    run.mkdir(parents=True)
    output = run/'results'
    output.mkdir()
    work = run/'source'
    destination = Path(os.environ.get('WORKSPACE',str(run)))/'ci-results'
    if destination.exists():
        resolved=destination.resolve(strict=True)
        if ROOT.resolve() not in resolved.parents or resolved.name!='ci-results' or destination.is_symlink():
            raise ValueError('Unsafe artifact destination')
        shutil.rmtree(resolved)
    destination.mkdir(parents=True,exist_ok=True)
    report = {'repo':args.repo,'sha':args.sha,'mode':args.mode,'status':'waiting_resources','started_at':stamp,'steps':[]}
    def record():
        (output/'result.json').write_text(json.dumps(report,indent=2))
        (destination/'result.json').write_text(json.dumps(report,indent=2))
    record()
    wait_resources('checkout')
    source = str(SOURCES[args.repo]) if args.source == 'local' else 'https://github.com/'+REPOSITORIES[args.repo]+'.git'
    report['status'] = 'running'
    record()
    try:
        git_env=None
        if args.source == 'github':
            import github_app
            github_app.status(args.repo,args.sha,'pending',args.mode,os.environ.get('BUILD_URL','https://ci.rutatramite.com/'),'Comprobaciones en curso')
            git_env=github_app.git_environment(args.repo)
        run_command(['git','-c','core.autocrlf=false','clone','--no-local','--no-checkout',source,str(work)],output/'checkout.log',env=git_env)
        run_command(['git','-C',str(work),'fetch','origin',args.sha],output/'fetch.log',env=git_env)
        git_env=None
        run_command(['git','-C',str(work),'-c','core.autocrlf=false','checkout','--detach',args.sha],output/'revision.log')
        actual = subprocess.check_output(['git','-C',str(work),'rev-parse','HEAD'],text=True).strip()
        assert actual == args.sha
        if args.mode == 'android':
            main_sha = subprocess.check_output(['git','ls-remote','https://github.com/'+REPOSITORIES[args.repo]+'.git','refs/heads/main'],text=True).split()[0]
            assert args.sha == main_sha, 'Signing is restricted to the current reviewed main commit'
            keys = ROOT/'secrets/android'
            shutil.copy2(keys/'keystore.properties',work/'frontend/android/keystore.properties')
            shutil.copy2(keys/'visionsetil-upload.jks',work/'frontend/android/app/visionsetil-upload.jks')
        changes = subprocess.check_output(['git','-C',str(work),'diff','--name-only',args.base,args.sha],text=True).splitlines() if args.base else []
        (work/'ci-results').mkdir(exist_ok=True)
        for step in choose_stages(args.repo,args.mode,changes):
            wait_resources(step)
            if step == 'docker-build':
                command = ['docker','buildx','build','--builder','ruta-ci','--load','-f',str(work/'Dockerfile.cpu'),'-t','visionsetil-ci:'+args.sha,str(work)]
            else:
                command = ['docker','run','--rm','--init',*container_resources(step),'--pids-limit','512','--label','ruta-ci=true','--mount',f'type=bind,source={work},target=/workspace','-w','/workspace']
                if step == 'gitleaks':
                    command += ['zricethezav/gitleaks:v8.30.1','git','/workspace','--redact','--report-format','json','--report-path','/workspace/ci-results/gitleaks.json']
                else:
                    image = 'ruta-ci-android:20260914' if step == 'vision-android' else ('ruta-ci-node22:20260914' if step == 'vision-frontend' else 'ruta-ci-node20:20260914')
                    command += ['--mount',f'type=bind,source={SCRIPTS},target=/ci,readonly','-e','GITHUB_SHA='+args.sha,'-e','VITE_PUBLIC_APP_URL=https://visionsetil.com','-e','SEO_SITE_ORIGIN=https://visionsetil.com','-e','VITE_API_URL=/api']
                    if step == 'vision-frontend':
                        command += ['-e','NODE_OPTIONS=--max-old-space-size=2048']
                    command += [image,'bash','/ci/stage-profile.sh',step]
            entry = {'name':step,'status':'running','resources':resources_for(step)}
            report['steps'].append(entry)
            record()
            try:
                run_command(command,output/(step+'.log'),timeout=7200)
                entry['status'] = 'passed'
            except Exception:
                entry['status'] = 'failed'
                raise
            record()
        report['status'] = 'passed'
        if args.mode == 'android':
            bundle = work/'ci-results/app-release.aab'
            retained = ROOT/'archive/android'/args.sha/stamp
            retained.mkdir(parents=True,exist_ok=False)
            shutil.copy2(bundle,retained/'app-release.aab')
            with bundle.open('rb') as handle:
                report['package'] = {'name':bundle.name,'sha256':hashlib.file_digest(handle,'sha256').hexdigest(),'bytes':bundle.stat().st_size}
            (retained/'identity.json').write_text(json.dumps({'sha':args.sha,'package':report['package'],'certificate':json.loads((SCRIPTS/'android-certificate.json').read_text())},indent=2))
        if args.mode == 'full':
            if args.repo == 'visionsetil':
                archive = Path(shutil.make_archive(str(output/'release'),'gztar',work/'frontend','dist-app'))
            else:
                manifest = json.loads((work/'docs/release-manifest.json').read_text())
                # pack_release currently writes to the container's /tmp; copy through a mounted output in the build script.
                archive = work/'ci-results/release.tar'
                assert archive.exists(), 'Verified package is missing'
                shutil.copy2(archive,output/'release.tar')
                archive = output/'release.tar'
            with archive.open('rb') as handle:
                report['package'] = {'name':archive.name,'sha256':hashlib.file_digest(handle,'sha256').hexdigest(),'bytes':archive.stat().st_size}
    except Exception as error:
        report['status'] = 'failed'
        report['error'] = type(error).__name__ + ': ' + str(error)
    finally:
        for relative in ['frontend/android/keystore.properties','frontend/android/app/visionsetil-upload.jks']:
            key = work/relative
            if args.mode == 'android' and key.exists():
                assert work.resolve() in key.resolve().parents
                key.unlink()
        collect(work,output)
        report['finished_at'] = datetime.now(timezone.utc).isoformat()
        if args.source == 'github':
            try:
                import github_app
                github_app.status(args.repo,args.sha,'success' if report['status']=='passed' else 'failure',args.mode,os.environ.get('BUILD_URL','https://ci.rutatramite.com/'),'Comprobaciones completas' if report['status']=='passed' else 'Revisar pruebas y registros')
            except Exception as error:
                report['github_status_error']=type(error).__name__
                report['status']='failed'
        record()
        if destination.resolve() != output.resolve():
            shutil.copytree(output,destination,dirs_exist_ok=True)
        print(json.dumps({'status':report['status'],'result':str(output/'result.json')}),flush=True)
    return 0 if report['status']=='passed' else 1

if __name__ == '__main__':
    raise SystemExit(main())
