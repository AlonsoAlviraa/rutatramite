import argparse
import ssh_transport as vps
import json
import re

def main():
    parser=argparse.ArgumentParser()
    parser.add_argument('--repo',choices=['rutatramite','visionsetil'],required=True)
    args=parser.parse_args()
    client=vps.connect()
    try:
        with client.open_sftp().open('/opt/ruta-ci/receipts/'+args.repo+'/last-success.json') as source:
            receipt=json.load(source)
        if not re.fullmatch('[a-f0-9]{40}',receipt['sha']) or not re.fullmatch('[a-f0-9]{64}',receipt['digest']):
            raise ValueError('Invalid rollback receipt')
        command=f"sudo python3 /opt/ruta-ci/config/activate.py {args.repo} rollback {receipt['sha']} {receipt['digest']}"
        if vps.run(client,command):
            raise RuntimeError('Rollback failed; original output retained')
    finally:
        client.close()

if __name__=='__main__': main()
