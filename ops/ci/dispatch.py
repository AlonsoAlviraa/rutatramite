"""Idempotent controller dispatch and recovery of lost webhook acknowledgements."""
import base64
import hashlib
import json
import re
import sqlite3
import urllib.parse
from contextlib import contextmanager
from pathlib import Path
from jenkins_api import api
import github_app


def identity(job):
    return hashlib.sha256(json.dumps(job, sort_keys=True, separators=(',', ':')).encode()).hexdigest()


def current_revision(job):
    """Reject first deliveries arriving out of order, using GitHub as authority."""
    repository=job['repository']
    base='repos/'+github_app.REPOS[repository]
    scope=job['scope']
    if scope.startswith('pr/'):
        number=scope.removeprefix('pr/')
        if not re.fullmatch('[1-9][0-9]*',number):
            raise ValueError('Invalid proposal scope')
        current=github_app.request(base+'/pulls/'+number,github_app.token(repository,read_pr=True))
        return current.get('state')=='open' and not current.get('draft') and current['head']['sha']==job['sha'] and current['base']['sha']==job['base']
    if scope.startswith('branch/'):
        branch=urllib.parse.quote(scope.removeprefix('branch/'),safe='')
        current=github_app.request(base+'/commits/'+branch,github_app.token(repository))
        return current['sha']==job['sha']
    if scope.startswith('legacy/'):
        return True  # Controller lookup only; unknown legacy intent never launches a new run.
    raise ValueError('Invalid event scope')


def enqueue(job, event_id, sequence):
    if job.get('repository') not in ('rutatramite', 'visionsetil') or job.get('mode') != 'pr':
        raise ValueError('Only repository PR checks can be dispatched')
    if not re.fullmatch('[a-f0-9]{40}', job['sha']) or (job['base'] and not re.fullmatch('[a-f0-9]{40}', job['base'])):
        raise ValueError('Invalid revision')
    if not current_revision(job):
        return {'status':'superseded','reason':'GitHub revision or proposal state changed'}
    payload = dict(job, identity=event_id, sequence=sequence, recover_only=job['scope'].startswith('legacy/'))
    encoded = base64.b64encode(json.dumps(payload).encode()).decode()
    script = Path(__file__).with_name('dispatch.groovy').read_text().replace('__PAYLOAD__', encoded)
    raw = api('scriptText', urllib.parse.urlencode({'script': script}).encode(), 'application/x-www-form-urlencoded')
    receipt = json.loads(raw)
    if receipt.get('status') not in ('existing', 'queued', 'superseded'):
        raise RuntimeError('Controller did not acknowledge a build')
    return receipt


@contextmanager
def connect_database(path):
    database = sqlite3.connect(path, timeout=150)
    try:
        database.execute('BEGIN IMMEDIATE')
        database.execute('CREATE TABLE IF NOT EXISTS deliveries (identity TEXT PRIMARY KEY, status TEXT, created_at TEXT DEFAULT CURRENT_TIMESTAMP)')
        columns = {row[1] for row in database.execute('PRAGMA table_info(deliveries)')}
        for name in ('payload', 'receipt'):
            if name not in columns:
                database.execute('ALTER TABLE deliveries ADD COLUMN ' + name + ' TEXT')
        database.commit()
        with database:
            yield database
    finally:
        database.close()


def accept(path, job, send=enqueue):
    event_id = identity(job)
    with connect_database(path) as database:
        database.execute('BEGIN IMMEDIATE')
        old = database.execute('SELECT status FROM deliveries WHERE identity=?', (event_id,)).fetchone()
        if old and old[0] == 'queued':
            return {'status': 'recorded'}
        database.execute('INSERT OR IGNORE INTO deliveries(identity,status,payload) VALUES (?,?,?)', (event_id, 'dispatching', json.dumps(job)))
        sequence = database.execute('SELECT rowid FROM deliveries WHERE identity=?', (event_id,)).fetchone()[0]
        database.commit()  # Persist intent before the network call, even when its answer is lost.
        receipt = send(job, event_id, sequence)
        database.execute('UPDATE deliveries SET status=?,receipt=? WHERE identity=?', ('queued', json.dumps(receipt), event_id))
        return receipt


def reconcile(path, send=enqueue):
    results = []
    with connect_database(path) as database:
        pending = list(database.execute("SELECT identity,payload,rowid FROM deliveries WHERE status='dispatching' ORDER BY rowid DESC"))
    for key, payload, sequence in pending:
        if payload:
            job = json.loads(payload)
            event_id = key
        else:
            # Preserve and recover pre-migration intent without grouping unrelated proposals.
            repo, sha, base, mode = key.split(':')
            event_id = hashlib.sha256(key.encode()).hexdigest()
            job = {'repository': repo, 'sha': sha, 'base': base, 'mode': mode, 'scope': 'legacy/' + event_id}
        receipt = send(job, event_id, sequence)
        with connect_database(path) as database:
            database.execute('UPDATE deliveries SET status=?,receipt=? WHERE identity=?', ('queued', json.dumps(receipt), key))
        results.append({'identity': key, 'receipt': receipt})
    return results


if __name__ == '__main__':
    print(json.dumps(reconcile(Path('/opt/ruta-ci/events.sqlite'))))
