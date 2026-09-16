import json
import tarfile
import tempfile
import unittest
from pathlib import Path
from frontend_artifact import preserve, restore, package


class FrontendArtifactTests(unittest.TestCase):
    def setUp(self):
        self.temporary = tempfile.TemporaryDirectory()
        self.addCleanup(self.temporary.cleanup)
        self.root = Path(self.temporary.name)
        self.web = self.root/'frontend/dist-app'
        (self.web/'prerendered/core').mkdir(parents=True)
        (self.web/'prerendered/core/home.html').write_text('web home')
        (self.web/'sitemap.xml').write_text('web sitemap')
        (self.web/'RELEASE_MANIFEST.json').write_text(json.dumps({'git_sha': 'a'*40}))
        (self.root/'ci-results').mkdir()

    def test_native_validation_cannot_replace_deployable_web_package(self):
        preserve(self.root)
        self.web.mkdir()
        (self.web/'index.html').write_text('native shell without SEO')
        restore(self.root)
        archive = package(self.root, self.root/'ci-results', 'a'*40)
        with tarfile.open(archive) as bundle:
            self.assertEqual(bundle.extractfile('dist-app/prerendered/core/home.html').read(), b'web home')
            self.assertIn('dist-app/RELEASE_MANIFEST.json', bundle.getnames())
            self.assertNotIn('dist-app/index.html', bundle.getnames())
        self.assertEqual((self.root/'ci-results/native-dist-app/index.html').read_text(), 'native shell without SEO')

    def test_missing_seo_fails_before_moving_output(self):
        (self.web/'sitemap.xml').unlink()
        with self.assertRaises(ValueError): preserve(self.root)
        self.assertTrue(self.web.is_dir())

    def test_wrong_commit_cannot_be_packaged(self):
        with self.assertRaises(ValueError): package(self.root, self.root/'ci-results', 'b'*40)

    def test_restore_refuses_to_overwrite_previous_native_evidence(self):
        preserve(self.root)
        self.web.mkdir()
        (self.root/'ci-results/native-dist-app').mkdir()
        with self.assertRaises(ValueError): restore(self.root)
        self.assertTrue((self.root/'ci-results/production-dist-app/sitemap.xml').is_file())
