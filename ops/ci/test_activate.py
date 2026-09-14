import hashlib
import io
import tarfile
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch

import activate


class ActivationTests(unittest.TestCase):
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
