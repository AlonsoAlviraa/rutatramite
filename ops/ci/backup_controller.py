"""Consistent metadata backup; master key and operational secrets are stored separately."""
import fcntl
import shutil
import subprocess
import sqlite3
import tarfile
from datetime import datetime, timezone
from pathlib import Path

root=Path('/opt/ruta-ci')
lock=open('/run/lock/ruta-ci-backup.lock','w')
fcntl.flock(lock,fcntl.LOCK_EX)
if shutil.disk_usage(root).free < 10*1024**3:
    raise RuntimeError('Insufficient disk reserve for a safe controller backup')
stamp=datetime.now(timezone.utc).strftime('%Y%m%dT%H%M%SZ')
backup=root/'backups'
backup.mkdir(exist_ok=True,mode=0o700)
target=backup/(stamp+'.tar.gz')
secret=root/'secrets'/('recovery-'+stamp+'.tar.gz')
subprocess.run(['docker','pause','config-jenkins-1'],check=True)
try:
    with tarfile.open(target,'w:gz') as archive:
        def include(info):
            parts=Path(info.name).parts
            if any(x in parts for x in ['workspace','archive','caches','war','.cache','master.key']):
                return None
            return info
        archive.add(root/'jenkins',arcname='jenkins',filter=include)
        archive.add(root/'config',arcname='config')
        if (root/'events.sqlite').exists():
            snapshot=backup/(stamp+'.sqlite')
            with sqlite3.connect(root/'events.sqlite') as source, sqlite3.connect(snapshot) as destination:
                source.backup(destination)
            archive.add(snapshot,arcname='events.sqlite')
            snapshot.unlink()
    with tarfile.open(secret,'w:gz') as archive:
        archive.add(root/'jenkins/secrets/master.key',arcname='jenkins-master.key')
        for item in (root/'secrets').iterdir():
            if item.is_file() and not item.name.startswith('recovery-') and item.name != 'request.json':
                archive.add(item,arcname=item.name)
    target.chmod(0o600)
    secret.chmod(0o600)
finally:
    subprocess.run(['docker','unpause','config-jenkins-1'],check=True)
with tarfile.open(target) as archive:
    names=archive.getnames()
    assert 'jenkins/config.xml' in names and not any(n.endswith('/master.key') for n in names)
print(str(target))
for folder,pattern in [(backup,'*.tar.gz'),(root/'secrets','recovery-*.tar.gz')]:
    for old in sorted(folder.glob(pattern),reverse=True)[7:]:
        if old.is_file() and not old.is_symlink() and folder.resolve() in old.resolve().parents:
            old.unlink()
