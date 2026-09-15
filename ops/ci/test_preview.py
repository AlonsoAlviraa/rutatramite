import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch
from types import SimpleNamespace
import json
import preview
import preview_runtime


class PreviewTests(unittest.TestCase):
    def test_runtime_cache_writes_do_not_change_verified_artifact(self):
        with tempfile.TemporaryDirectory() as directory:
            source=Path(directory)/'artifact'; cache=source/'.next/server/app';cache.mkdir(parents=True)
            (cache/'page.html').write_text('verified original')
            (source/'server.js').write_text('server')
            destination=Path(directory)/'runtime'
            initial=preview_runtime.prepare(source,destination)
            (destination/'.next/server/app/page.html').write_text('regenerated')
            self.assertEqual((cache/'page.html').read_text(),'verified original')
            self.assertIn('.next/server/app/page.html',initial)
            self.assertFalse((destination/'.next').is_symlink())

    def test_sitemap_cannot_escape_to_public_site_or_another_origin(self):
        self.assertEqual(preview.local_path('https://rutatramite.com/recursos','https://rutatramite.com'),'/recursos')
        for url in ['https://attacker.invalid/','//attacker.invalid/path','http://rutatramite.com/','/foo?redirect=x','relative']:
            with self.assertRaises(ValueError):
                preview.local_path(url,'https://rutatramite.com')

    def test_preview_rejects_production_and_parent_directories(self):
        with tempfile.TemporaryDirectory() as directory:
            root=Path(directory); (root/'rutatramite').mkdir(); (root/'production').mkdir()
            with patch.object(preview,'PREVIEWS',root):
                for target in [root/'production',root/'rutatramite']:
                    with self.assertRaisesRegex(ValueError,'target'):
                        preview.run_preview('rutatramite',target,'a'*40,'b'*64,root/'receipts')

    def test_server_uses_loopback_and_isolated_identity(self):
        command=preview.unit_command('rutatramite',Path('/candidate'),'unit-test',18190)
        self.assertIn('DynamicUser=yes',command)
        self.assertIn('HOSTNAME=127.0.0.1',command)
        self.assertIn('ProtectSystem=strict',command)
        self.assertIn('METRICS_DB_PATH=/run/unit-test/metrics.sqlite',command)
        self.assertNotIn('slot2-app.service',command)

    def test_redirects_do_not_validate_a_different_running_release(self):
        self.assertIsNone(preview.NoRedirect().redirect_request(None,None,302,'',{},'https://rutatramite.com/'))

    def test_static_preview_disables_caddy_admin_and_uses_candidate_root(self):
        with tempfile.TemporaryDirectory() as directory:
            target=Path(directory)/'dist-app'; target.mkdir()
            command=preview.unit_command('visionsetil',target,'unit-test',18191)
            import json
            config=json.loads((target.parent/'preview-server.json').read_text())
            self.assertTrue(config['admin']['disabled'])
            server=config['apps']['http']['servers']['preview']
            self.assertEqual(server['listen'],['127.0.0.1:18191'])
            self.assertEqual(server['routes'][-1]['handle'][0]['root'],str(target))

    def test_failed_checks_stop_service_and_preserve_failure_receipt(self):
        with tempfile.TemporaryDirectory() as directory:
            root=Path(directory); target=root/'rutatramite'/'candidate'; target.mkdir(parents=True)
            commands=[]
            def run(command, **kwargs):
                commands.append(command)
                return SimpleNamespace(returncode=3 if command[:2]==['systemctl','is-active'] else 0,stdout='service evidence')
            with patch.object(preview,'PREVIEWS',root), patch.object(preview.socket,'socket'), patch.object(preview,'get',return_value=(b'ok',{})), patch.object(preview,'check_artifact',side_effect=ValueError('deliberate broken asset')), patch.object(preview.subprocess,'run',side_effect=run):
                with self.assertRaisesRegex(ValueError,'broken asset'):
                    preview.run_preview('rutatramite',target,'a'*40,'b'*64,root/'receipts')
            receipt=json.loads(next((root/'receipts').glob('preview-*.json')).read_text())
            self.assertEqual(receipt['status'],'failed')
            self.assertTrue(receipt['stopped'])
            self.assertIn('broken asset',receipt['error'])
            self.assertIn(['systemctl','stop',receipt['unit']],commands)
            self.assertEqual(receipt['service_log'],'service evidence')

if __name__ == '__main__': unittest.main()
