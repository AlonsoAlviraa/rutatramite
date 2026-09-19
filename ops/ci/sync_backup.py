"""Copy a matching recovery pair off the VPS and verify the extracted configuration."""
import hashlib
import json
import re
import tarfile
import tempfile
import xml.etree.ElementTree as ET
from datetime import datetime, timezone
from pathlib import Path

import ssh_transport

ROOT = Path('C:/Users/Mariano/CI')


def download(client, remote, target):
    command = 'sudo cat -- '+remote  # remote is constructed exclusively from a validated timestamp.
    _, output, error = client.exec_command(command, timeout=120)
    temporary = target.with_suffix(target.suffix+'.part')
    with temporary.open('wb') as destination:
        while chunk := output.read(1024*1024):
            destination.write(chunk)
    if output.channel.recv_exit_status():
        raise RuntimeError('Backup download failed: '+error.read().decode()[:200])
    temporary.replace(target)


def main():
    client = ssh_transport.connect()
    try:
        _, output, _ = client.exec_command('sudo find /opt/ruta-ci/backups -maxdepth 1 -type f -name "*.tar.gz" -printf "%f\\n"')
        names = output.read().decode().splitlines()
        if output.channel.recv_exit_status():
            raise RuntimeError('Cannot list controller backups')
        names = sorted(name for name in names if re.fullmatch(r'\d{8}T\d{6}Z\.tar\.gz',name))
        if not names:
            raise RuntimeError('No completed backup available')
        name = names[-1]
        metadata = ROOT/'archive/controller'/name
        recovery = ROOT/'secrets/controller-recovery'/('recovery-'+name)
        for target in (metadata, recovery):
            target.parent.mkdir(parents=True,exist_ok=True)
        if not metadata.is_file():
            download(client,'/opt/ruta-ci/backups/'+name,metadata)
        if not recovery.is_file():
            download(client,'/opt/ruta-ci/secrets/recovery-'+name,recovery)
    finally:
        client.close()
    # Restore to an isolated temporary directory. Never overwrite the running controller.
    # Both archives contain sensitive Jenkins settings; the extraction inherits the secrets ACL.
    with tempfile.TemporaryDirectory(prefix='restore-check-',dir=ROOT/'secrets') as temporary:
        restored = Path(temporary)
        with tarfile.open(metadata) as archive:
            if any(name.endswith('/master.key') for name in archive.getnames()):
                raise ValueError('Master key must remain in the separate recovery bundle')
            archive.extractall(restored,filter='data')
        with tarfile.open(recovery) as archive:
            archive.extractall(restored/'private',filter='data')
        ET.parse(restored/'jenkins/config.xml')
        jobs = sorted((restored/'jenkins/jobs').glob('*/config.xml'))
        for job in jobs:
            ET.parse(job)
        assert jobs and (restored/'private/jenkins-master.key').stat().st_size > 0
        assert (restored/'config/controller.compose.yaml').is_file()
    def digest(path):
        with path.open('rb') as source:
            return hashlib.file_digest(source,'sha256').hexdigest()
    receipt = {'at':datetime.now(timezone.utc).isoformat(),'backup':name,
               'metadata_sha256':digest(metadata),'recovery_sha256':digest(recovery),
               'job_configurations':len(jobs),'extraction_and_xml':'passed',
               'isolated_controller_boot':'not_tested'}
    (metadata.parent/'latest-verified.json').write_text(json.dumps(receipt,indent=2))
    print(json.dumps(receipt))


if __name__ == '__main__':
    main()
