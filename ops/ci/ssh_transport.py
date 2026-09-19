"""Private CI connection settings and mandatory, pre-established SSH host key."""
import json
import shlex
import sys
from pathlib import Path

import paramiko

SECRETS = Path('C:/Users/Mariano/CI/secrets')


def connect():
    configuration = json.loads((SECRETS/'vps.json').read_text())
    client = paramiko.SSHClient()
    client.load_host_keys(str(SECRETS/'known_hosts'))
    client.set_missing_host_key_policy(paramiko.RejectPolicy())
    client.connect(hostname=configuration['host'], username=configuration['username'],
                   password=configuration['password'], timeout=25,
                   look_for_keys=False, allow_agent=False)
    return client


def run(client, command, timeout=1800):
    channel = client.get_transport().open_session()
    channel.settimeout(timeout)
    channel.set_combine_stderr(True)
    channel.exec_command(command)
    while True:
        data = channel.recv(65536)
        if not data:
            break
        sys.stdout.write(data.decode('utf-8', 'replace'))
        sys.stdout.flush()
    return channel.recv_exit_status()


def put_file(sftp, local, remote):
    # Deployment directories are provisioned by the administrator, never by repository code.
    sftp.put(local, remote)


def checked_exec(client, arguments):
    if run(client, shlex.join(arguments)):
        raise RuntimeError('Remote operation failed; see retained logs')
