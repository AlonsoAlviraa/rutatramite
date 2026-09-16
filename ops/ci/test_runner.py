import unittest
from unittest.mock import patch
from types import SimpleNamespace
from runner import choose_stages, validate_sha, resources_for, container_resources, wait_resources


class ResourceTests(unittest.TestCase):
    def test_frontend_matches_successful_trial(self):
        self.assertEqual(container_resources('vision-frontend'),
                         ['--cpus', '2', '--memory', '3g', '--memory-swap', '3g'])

    def test_unmeasured_heavy_jobs_keep_existing_reservation(self):
        for step in ['vision-android', 'vision-journeys', 'ruta-full', 'docker-build']:
            self.assertEqual(resources_for(step)['host_gib'], 8)
            self.assertEqual(resources_for(step)['memory_gib'], 6)

    @patch('runner.time.sleep')
    @patch('runner.shutil.disk_usage', return_value=SimpleNamespace(free=21*1024**3))
    @patch('runner.available_memory', side_effect=[1*1024**3, 3*1024**3])
    def test_frontend_waits_for_host_headroom(self, memory, disk, sleep):
        wait_resources('vision-frontend')
        sleep.assert_called_once_with(30)

    @patch('runner.time.sleep')
    @patch('runner.shutil.disk_usage', side_effect=[SimpleNamespace(free=19*1024**3), SimpleNamespace(free=21*1024**3)])
    @patch('runner.available_memory', return_value=3*1024**3)
    def test_disk_guard_is_preserved(self, memory, disk, sleep):
        wait_resources('vision-security')
        sleep.assert_called_once_with(30)

    @patch('runner.time.sleep')
    @patch('runner.shutil.disk_usage', return_value=SimpleNamespace(free=21*1024**3))
    @patch('runner.available_memory', return_value=1*1024**3)
    def test_checkout_does_not_require_build_memory(self, memory, disk, sleep):
        wait_resources('checkout')
        sleep.assert_not_called()

class RoutingTests(unittest.TestCase):
    def test_rejects_branch_names_and_command_injection(self):
        for revision in ['main','HEAD','a'*39,'a'*40+';whoami','../main','A'*40]:
            with self.assertRaises(ValueError):
                validate_sha(revision)
    def test_full_release_always_includes_all_gates(self):
        self.assertEqual(set(choose_stages('visionsetil','full',['docs/readme.md'])), {'vision-security','gitleaks','vision-backend','vision-german','vision-frontend','docker-build'})
    def test_backend_pr_keeps_security_and_backend(self):
        self.assertEqual(choose_stages('visionsetil','pr',['backend/app/main.py']), ['vision-security','gitleaks','vision-backend'])
    def test_shared_change_expands_checks(self):
        self.assertIn('docker-build',choose_stages('visionsetil','pr',['pyproject.toml']))
    def test_german_change_checks_frontend_integration(self):
        self.assertIn('vision-frontend',choose_stages('visionsetil','pr',['sites/pilzbestimmung.com/assets/app.js']))
    def test_missing_diff_fails_closed_to_full_coverage(self):
        self.assertIn('docker-build',choose_stages('visionsetil','pr',[]))

if __name__ == '__main__':
    unittest.main()
