import hashlib
import io
import json
import tarfile
import tempfile
import unittest
from pathlib import Path
from datetime import datetime,timedelta,timezone
from unittest.mock import patch
import probe_sources as sources
import probe_run


class ProbeSourceTests(unittest.TestCase):
    def bundle(self,sha='a'*40):
        return sources.build(sha,{name:b'fixture' for name in sources.REQUIRED})

    def test_switch_keeps_previous_generation_available_to_running_job(self):
        with tempfile.TemporaryDirectory() as directory:
            root=Path(directory)/'sources';archive=Path(directory)/'source.tar'
            body=self.bundle();archive.write_bytes(body)
            sources.install(archive,'a'*40,hashlib.sha256(body).hexdigest(),root)
            pinned=(root/'current').resolve()
            body=self.bundle('b'*40);archive.write_bytes(body)
            second=sources.install(archive,'b'*40,hashlib.sha256(body).hexdigest(),root)
            self.assertEqual(sources.verify(pinned)['sha'],'a'*40)
            self.assertEqual(sources.verify((root/'current').resolve())['sha'],'b'*40)
            self.assertEqual(second['previous'],str(pinned))

    def test_tampered_contents_do_not_replace_current_generation(self):
        with tempfile.TemporaryDirectory() as directory:
            root=Path(directory)/'sources';archive=Path(directory)/'source.tar';body=self.bundle();archive.write_bytes(body)
            sources.install(archive,'a'*40,hashlib.sha256(body).hexdigest(),root);previous=(root/'current').resolve()
            damaged=body.replace(b'fixture',b'changed',1);archive.write_bytes(damaged)
            with self.assertRaisesRegex(ValueError,'integrity'):
                sources.install(archive,'a'*40,hashlib.sha256(damaged).hexdigest(),root)
            self.assertEqual((root/'current').resolve(),previous)

    def test_archive_traversal_and_links_are_rejected(self):
        with tempfile.TemporaryDirectory() as directory:
            archive=Path(directory)/'source.tar'
            for name,kind in [('../escape',tarfile.REGTYPE),('link',tarfile.SYMTYPE)]:
                with tarfile.open(archive,'w') as output:
                    item=tarfile.TarInfo(name);item.type=kind;item.linkname='/etc/passwd';output.addfile(item)
                with self.assertRaises(ValueError):sources.install(archive,'a'*40,hashlib.sha256(archive.read_bytes()).hexdigest(),Path(directory)/'sources')

    def test_changed_files_and_unlisted_files_fail_verification(self):
        with tempfile.TemporaryDirectory() as directory:
            archive=Path(directory)/'source.tar';body=self.bundle();archive.write_bytes(body)
            r=sources.install(archive,'a'*40,hashlib.sha256(body).hexdigest(),Path(directory)/'sources');root=Path(r['source'])
            (root/'unexpected.py').write_text('extra')
            with self.assertRaisesRegex(ValueError,'Unlisted'):sources.verify(root)
            (root/'unexpected.py').unlink();(root/'scripts/build_species_index_join.py').write_text('modified')
            with self.assertRaisesRegex(ValueError,'integrity'):sources.verify(root)

    def test_new_model_inputs_require_explicit_scope_review(self):
        with self.assertRaisesRegex(ValueError,'weights'):sources.selected(sources.REQUIRED|{'models/new.pt'})
        with self.assertRaisesRegex(ValueError,'missing'):sources.selected({'scripts/build_species_index_join.py'})

    def test_stale_confirmation_cannot_produce_a_green_probe(self):
        with tempfile.TemporaryDirectory() as directory:
            root=Path(directory)/'sources';archive=Path(directory)/'source.tar';body=self.bundle();archive.write_bytes(body)
            result=sources.install(archive,'a'*40,hashlib.sha256(body).hexdigest(),root)
            path=Path(result['source'])/'installation.json';record=json.loads(path.read_text())
            record['installed_at']=(datetime.now(timezone.utc)-timedelta(minutes=11)).isoformat();path.write_text(json.dumps(record))
            with patch.object(sources,'ROOT',root),self.assertRaisesRegex(RuntimeError,'older than ten minutes'):probe_run.confirmed_source()

    def test_requested_revision_must_match_the_pinned_bundle(self):
        with tempfile.TemporaryDirectory() as directory:
            root=Path(directory)/'sources';archive=Path(directory)/'source.tar';body=self.bundle();archive.write_bytes(body)
            sources.install(archive,'a'*40,hashlib.sha256(body).hexdigest(),root)
            with patch.object(sources,'ROOT',root),self.assertRaisesRegex(ValueError,'Unexpected source commit'):probe_run.confirmed_source('b'*40)


if __name__=='__main__':unittest.main()
