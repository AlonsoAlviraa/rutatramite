"""Prepare writable Next runtime state inside the service's private /tmp."""
import json
import os
import shutil
import sys
import tempfile
from pathlib import Path


def prepare(source, destination):
    source=Path(source).resolve(strict=True)
    destination=Path(destination)
    destination.mkdir(exist_ok=False)
    for entry in source.iterdir():
        target=destination/entry.name
        if entry.name=='.next':
            shutil.copytree(entry,target,symlinks=False)
        elif entry.is_dir():
            target.symlink_to(entry,target_is_directory=True)
        else:
            shutil.copyfile(entry,target)
    return {str(path.relative_to(destination)):path.stat().st_mtime_ns
            for path in (destination/'.next/server/app').rglob('*.html')}


def main():
    source=Path(sys.argv[1]).resolve(strict=True)
    runtime=Path(tempfile.mkdtemp(prefix='ruta-ci-runtime-'))/'app'
    initial=prepare(source,runtime)
    Path(os.environ['PREVIEW_RUNTIME_REPORT']).write_text(json.dumps({'root':str(runtime),'initial_html_mtimes':initial}))
    os.chdir(runtime)
    os.execv('/usr/bin/node',['/usr/bin/node',str(runtime/'server.js')])


if __name__=='__main__':main()
