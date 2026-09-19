import hashlib
import io
import tarfile
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch

import activate


class ActivationTests(unittest.TestCase):
    def rollback_fixture(self,root):
        old,new,later=(root/name for name in ['old','new','later'])
        for path in [old,new,later]:
            (path/'.next').mkdir(parents=True);(path/'.next/BUILD_ID').write_text(path.name)
        link=root/'current';link.symlink_to(new)
        return old,new,later,link,{'schema':'ruta-ci.activation.v2','status':'passed','action':'publish','sha':'a'*40,'digest':'b'*64,'active':str(new),'previous':str(old),'active_identity':{'kind':'next-build','id':'new'},'previous_identity':{'kind':'next-build','id':'old'}}

    def test_http_200_from_another_next_build_is_not_healthy(self):
        def response(*args,**kwargs):
            body=io.BytesIO(b'<!DOCTYPE html><!--different-build--><html>healthy looking</html>');body.status=200;return body
        with tempfile.TemporaryDirectory() as directory:
            with patch.dict(activate.LINKS,{'rutatramite':Path(directory)}),patch.object(activate,'release_identity',return_value={'kind':'next-build','id':'expected-build'}),patch.object(activate.urllib.request,'urlopen',side_effect=response),patch('time.sleep'):
                with self.assertRaisesRegex(RuntimeError,'health check failed') as error:activate.health('rutatramite')
                self.assertIn('Served Next build',str(error.exception.__cause__))

    def test_http_200_with_the_wrong_frontend_manifest_is_not_healthy(self):
        def response(request,**kwargs):
            body=io.BytesIO(b'{"git_sha":"wrong"}' if '/RELEASE_MANIFEST.json' in request.full_url else b'<html>healthy looking</html>');body.status=200;return body
        with tempfile.TemporaryDirectory() as directory:
            with patch.dict(activate.LINKS,{'visionsetil':Path(directory)}),patch.object(activate,'release_identity',return_value={'kind':'git-sha','id':'a'*40}),patch.object(activate.urllib.request,'urlopen',side_effect=response),patch('time.sleep'):
                with self.assertRaisesRegex(RuntimeError,'health check failed') as error:activate.health('visionsetil')
                self.assertIn('Served frontend commit',str(error.exception.__cause__))

    def test_failed_health_does_not_overwrite_another_tasks_new_release(self):
        with tempfile.TemporaryDirectory() as directory:
            root=Path(directory);old,new,later,link,receipt=self.rollback_fixture(root)
            link.unlink();link.symlink_to(old)
            def failed_health(*args):
                link.unlink();link.symlink_to(later);raise RuntimeError('Health failed after another publication')
            with patch.dict(activate.ROOTS,{'rutatramite':root}),patch.dict(activate.LINKS,{'rutatramite':link}),patch.object(activate.subprocess,'run') as command,patch.object(activate,'health',side_effect=failed_health):
                with self.assertRaisesRegex(RuntimeError,'preserve it'):activate.activate_release('rutatramite',new,'publish')
            self.assertEqual(link.resolve(),later)
            self.assertEqual(sum(call.args[0][:2]==['systemctl','restart'] for call in command.call_args_list),1)

    def test_old_rollback_receipt_cannot_replace_a_later_publication(self):
        with tempfile.TemporaryDirectory() as directory:
            root=Path(directory);old,new,later,link,receipt=self.rollback_fixture(root)
            link.unlink();link.symlink_to(later)
            with patch.dict(activate.ROOTS,{'rutatramite':root}),patch.dict(activate.LINKS,{'rutatramite':link}):
                with self.assertRaisesRegex(ValueError,'Active release changed'):activate.rollback_target('rutatramite',receipt,'a'*40,'b'*64)
            self.assertEqual(link.resolve(),later)

    def test_changed_rollback_target_identity_is_rejected(self):
        with tempfile.TemporaryDirectory() as directory:
            root=Path(directory);old,new,later,link,receipt=self.rollback_fixture(root)
            (old/'.next/BUILD_ID').write_text('different')
            with patch.dict(activate.ROOTS,{'rutatramite':root}),patch.dict(activate.LINKS,{'rutatramite':link}):
                with self.assertRaisesRegex(ValueError,'identities'):activate.rollback_target('rutatramite',receipt,'a'*40,'b'*64)
            self.assertEqual(link.resolve(),new)

    def test_valid_rollback_selects_only_the_recorded_previous_release(self):
        with tempfile.TemporaryDirectory() as directory:
            root=Path(directory);old,new,later,link,receipt=self.rollback_fixture(root)
            with patch.dict(activate.ROOTS,{'rutatramite':root}),patch.dict(activate.LINKS,{'rutatramite':link}):
                self.assertEqual(activate.rollback_target('rutatramite',receipt,'a'*40,'b'*64),old)

    def test_rejects_tampered_archive(self):
        with tempfile.TemporaryDirectory() as directory:
            archive = Path(directory)/'release.tar'
            archive.write_bytes(b'tampered')
            with self.assertRaisesRegex(ValueError,'digest'):
                activate.verify_archive(archive,'0'*64)

    def test_rejects_archive_path_escape(self):
        with tempfile.TemporaryDirectory() as directory:
            archive = Path(directory)/'release.tar'
            with tarfile.open(archive,'w') as output:
                item = tarfile.TarInfo('../../outside')
                item.size = 1
                output.addfile(item,io.BytesIO(b'x'))
            digest = hashlib.sha256(archive.read_bytes()).hexdigest()
            with self.assertRaises(tarfile.FilterError):
                activate.verify_archive(archive,digest)

    def test_rejects_archive_symlink_escape(self):
        with tempfile.TemporaryDirectory() as directory:
            archive = Path(directory)/'release.tar'
            with tarfile.open(archive,'w') as output:
                item = tarfile.TarInfo('link')
                item.type = tarfile.SYMTYPE
                item.linkname = '/etc/passwd'
                output.addfile(item)
            digest = hashlib.sha256(archive.read_bytes()).hexdigest()
            with self.assertRaises(tarfile.FilterError):
                activate.verify_archive(archive,digest)

    def test_failed_health_restores_previous_symlink(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            old, new, link = root/'previous', root/'new', root/'current'
            old.mkdir()
            new.mkdir()
            link.symlink_to(old)
            with patch.dict(activate.ROOTS,{'rutatramite':root}), patch.dict(activate.LINKS,{'rutatramite':link}), patch.object(activate.subprocess,'run') as command, patch.object(activate,'health',side_effect=[RuntimeError('unhealthy'),None]):
                with self.assertRaisesRegex(RuntimeError,'unhealthy'):
                    activate.activate_release('rutatramite',new,'publish')
                self.assertEqual(link.resolve(),old)
                self.assertEqual(sum(call.args[0][:2]==['systemctl','restart'] for call in command.call_args_list),2)

    def test_rejects_target_outside_tenant(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            releases = root/'releases'
            releases.mkdir()
            outside = root/'outside'
            outside.mkdir()
            with patch.dict(activate.ROOTS,{'rutatramite':releases}):
                with self.assertRaisesRegex(ValueError,'outside'):
                    activate.swap('rutatramite',outside)


if __name__ == '__main__':
    unittest.main()
