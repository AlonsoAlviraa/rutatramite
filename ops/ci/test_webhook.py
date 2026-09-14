import hashlib
import hmac
import unittest
from webhook import select_event,valid_signature

class WebhookTests(unittest.TestCase):
    def test_signature_rejects_altered_body(self):
        signature='sha256='+hmac.new(b'secret',b'original',hashlib.sha256).hexdigest()
        self.assertTrue(valid_signature(b'original',signature,b'secret'))
        self.assertFalse(valid_signature(b'altered',signature,b'secret'))
    def test_unknown_repository_is_ignored(self):
        self.assertIsNone(select_event('push',{'repository':{'full_name':'someone/else'}}))
    def test_owned_pr_is_accepted(self):
        payload={'repository':{'full_name':'AlonsoAlviraa/VisionSetil'},'action':'opened','pull_request':{'head':{'repo':{'full_name':'AlonsoAlviraa/VisionSetil'},'sha':'a'*40},'base':{'sha':'b'*40}}}
        self.assertEqual(select_event('pull_request',payload)['sha'],'a'*40)
        payload['pull_request']['head']['repo']['full_name']='external/fork'
        self.assertIsNone(select_event('pull_request',payload))
    def test_branch_deletion_does_not_build_zero_commit(self):
        self.assertIsNone(select_event('push',{'repository':{'full_name':'AlonsoAlviraa/VisionSetil'},'ref':'refs/heads/main','deleted':True}))

if __name__=='__main__': unittest.main()
