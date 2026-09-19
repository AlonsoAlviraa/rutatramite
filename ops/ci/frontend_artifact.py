"""Keep the production web output separate from the native validation build."""
import argparse
import json
import shutil
from pathlib import Path


def paths(work):
    root = Path(work).resolve(strict=True)
    values = [root/'frontend/dist-app', root/'ci-results/production-dist-app', root/'ci-results/native-dist-app']
    for value in values:
        if value.is_symlink() or root not in value.resolve().parents:
            raise ValueError('Artifact path leaves the isolated checkout')
    return values


def require_web(directory, sha=None):
    for name in ('RELEASE_MANIFEST.json', 'sitemap.xml', 'prerendered/core/home.html'):
        if not (directory/name).is_file():
            raise ValueError('Production web artifact is missing ' + name)
    manifest = json.loads((directory/'RELEASE_MANIFEST.json').read_text())
    if sha is not None and manifest.get('git_sha') != sha:
        raise ValueError('Production web artifact has a different commit')


def preserve(work):
    web, saved, native = paths(work)
    require_web(web)
    if saved.exists() or native.exists():
        raise ValueError('Refusing to overwrite an existing artifact')
    saved.parent.mkdir(exist_ok=True)
    web.rename(saved)


def restore(work):
    web, saved, native = paths(work)
    require_web(saved)
    if native.exists() or not web.is_dir():
        raise ValueError('Native output is missing or its destination already exists')
    web.rename(native)
    saved.rename(web)
    require_web(web)


def package(work, output, sha):
    web, _, _ = paths(work)
    require_web(web, sha)
    return Path(shutil.make_archive(str(Path(output)/'release'), 'gztar',
                                  root_dir=web.parent, base_dir='dist-app'))


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('action', choices=['preserve', 'restore'])
    parser.add_argument('workspace', type=Path)
    args = parser.parse_args()
    {'preserve': preserve, 'restore': restore}[args.action](args.workspace)
