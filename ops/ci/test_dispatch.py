import json
import sqlite3
import tempfile
import unittest
from pathlib import Path
from contextlib import closing
from unittest.mock import Mock, patch
from dispatch import accept, connect_database, current_revision, identity, reconcile


class DeliveryTests(unittest.TestCase):
    def setUp(self):
        self.directory = tempfile.TemporaryDirectory()
        self.addCleanup(self.directory.cleanup)
        self.path = Path(self.directory.name)/'events.sqlite'
        self.job = {'repository':'rutatramite','sha':'a'*40,'base':'b'*40,'mode':'pr','scope':'pr/4'}

    def test_duplicate_acknowledged_delivery_is_not_sent_again(self):
        send = Mock(return_value={'status':'queued','queue_id':7})
        accept(self.path, self.job, send)
        self.assertEqual(accept(self.path, self.job, send)['status'], 'recorded')
        send.assert_called_once()

    def test_lost_controller_reply_is_reconciled_with_same_identity(self):
        send = Mock(side_effect=TimeoutError)
        with self.assertRaises(TimeoutError):
            accept(self.path, self.job, send)
        with connect_database(self.path) as database:
            self.assertEqual(database.execute('SELECT status FROM deliveries').fetchone()[0], 'dispatching')
        recover = Mock(return_value={'status':'existing','build':12})
        reconcile(self.path, recover)
        self.assertEqual(send.call_args, recover.call_args)
        self.assertEqual(reconcile(self.path, recover), [])

    def test_failed_reconciliation_preserves_pending_intent(self):
        with self.assertRaises(TimeoutError):
            accept(self.path, self.job, Mock(side_effect=TimeoutError))
        with self.assertRaises(TimeoutError):
            reconcile(self.path, Mock(side_effect=TimeoutError))
        with connect_database(self.path) as database:
            self.assertEqual(database.execute('SELECT status FROM deliveries').fetchone()[0], 'dispatching')

    def test_scopes_and_base_changes_have_distinct_delivery_identity(self):
        self.assertNotEqual(identity(self.job), identity(dict(self.job, scope='pr/5')))
        self.assertNotEqual(identity(self.job), identity(dict(self.job, base='c'*40)))

    @patch('dispatch.github_app.token',return_value='test-only')
    @patch('dispatch.github_app.request')
    def test_out_of_order_first_delivery_is_rejected_using_current_github_head(self,request,token):
        request.return_value={'state':'open','draft':False,'head':{'sha':'c'*40},'base':{'sha':'b'*40}}
        self.assertFalse(current_revision(self.job))
        request.return_value['head']['sha']='a'*40
        self.assertTrue(current_revision(self.job))
        request.return_value['state']='closed'
        self.assertFalse(current_revision(self.job))

    def test_legacy_ambiguous_delivery_is_recovered_without_inventing_pr(self):
        key='rutatramite:'+('a'*40)+':'+('b'*40)+':pr'
        with closing(sqlite3.connect(self.path)) as database:
            database.execute('CREATE TABLE deliveries(identity TEXT PRIMARY KEY,status TEXT,created_at TEXT DEFAULT CURRENT_TIMESTAMP)')
            database.execute('INSERT INTO deliveries(identity,status) VALUES (?,?)',(key,'dispatching'))
            database.commit()
        send=Mock(return_value={'status':'existing','queue_id':9})
        reconcile(self.path,send)
        job, event_id, sequence=send.call_args.args
        self.assertEqual(sequence,1)
        self.assertEqual(job['scope'],'legacy/'+event_id)
        self.assertEqual(job['sha'],'a'*40)
        with connect_database(self.path) as database:
            self.assertEqual(database.execute('SELECT status FROM deliveries').fetchone()[0],'queued')

if __name__ == '__main__': unittest.main()
