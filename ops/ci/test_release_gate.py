import hashlib
import tempfile
import unittest
from pathlib import Path
from release_gate import validate

class GateTests(unittest.TestCase):
    def setUp(self):
        self.directory = tempfile.TemporaryDirectory()
        self.addCleanup(self.directory.cleanup)
        self.package = Path(self.directory.name)/'release.tar'
        self.package.write_bytes(b'verified-package')
        self.sha = 'a'*40
        self.report = {'repo':'rutatramite','mode':'full','sha':self.sha,'status':'passed','steps':[{'name':'ruta-full','status':'passed'}],'package':{'sha256':hashlib.sha256(b'verified-package').hexdigest()}}
    def check(self):
        return validate(self.report,'rutatramite',self.sha,self.package,'SUCCESS')
    def test_accepts_exact_verified_package(self): self.check()
    def test_rejects_modified_package(self):
        self.package.write_bytes(b'changed')
        with self.assertRaises(ValueError): self.check()
    def test_rejects_pr_result(self):
        self.report['mode']='pr'
        with self.assertRaises(ValueError): self.check()
    def test_rejects_old_revision(self):
        self.report['sha']='b'*40
        with self.assertRaises(ValueError): self.check()
    def test_rejects_missing_tests(self):
        self.report['steps']=[]
        with self.assertRaises(ValueError): self.check()
    def test_rejects_jenkins_failure_even_when_receipt_claims_success(self):
        with self.assertRaises(ValueError): validate(self.report,'rutatramite',self.sha,self.package,'FAILURE')

if __name__ == '__main__': unittest.main()
