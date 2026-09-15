"""Refresh immutable probe sources manually or with the configured GitHub App."""
import argparse
import base64
import fcntl
import hashlib
import json
import tempfile
from pathlib import Path
import github_app
import probe_sources


def refresh_from_github():
    token=github_app.token('visionsetil')
    path='repos/AlonsoAlviraa/VisionSetil/'
    sha=github_app.request(path+'commits/main',token)['sha']
    tree=github_app.request(path+'git/trees/'+sha+'?recursive=1',token)
    if tree.get('truncated'):raise RuntimeError('GitHub tree was truncated')
    entries={item['path']:item for item in tree['tree'] if item['type']=='blob'}
    contents={}
    for name in probe_sources.selected(entries):
        if entries[name]['mode'] not in ['100644','100755']:raise ValueError('Non-regular source input')
        item=github_app.request(path+'git/blobs/'+entries[name]['sha'],token)
        if item['encoding']!='base64':raise ValueError('Unexpected GitHub blob encoding')
        contents[name]=base64.b64decode(item['content'])
    body=probe_sources.build(sha,contents)
    if github_app.request(path+'commits/main',token)['sha']!=sha:raise RuntimeError('Main advanced while preparing probe sources; no switch made')
    with tempfile.TemporaryDirectory(prefix='probe-refresh-') as temporary:
        archive=Path(temporary)/'source.tar';archive.write_bytes(body)
        return probe_sources.install(archive,sha,hashlib.sha256(body).hexdigest())


def main():
    parser=argparse.ArgumentParser()
    parser.add_argument('--github',action='store_true')
    parser.add_argument('--archive',type=Path);parser.add_argument('--sha');parser.add_argument('--digest')
    args=parser.parse_args()
    if args.github==bool(args.archive):parser.error('Choose GitHub or a verified uploaded archive')
    if args.archive and (not args.sha or not args.digest):parser.error('Archive identity is required')
    with open('/run/lock/ruta-ci-probe-refresh.lock','w') as lock:
        fcntl.flock(lock,fcntl.LOCK_EX)
        record=refresh_from_github() if args.github else probe_sources.install(args.archive,args.sha,args.digest)
    print(json.dumps(record))


if __name__=='__main__':main()
