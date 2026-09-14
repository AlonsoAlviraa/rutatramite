import unittest
from runner import choose_stages, validate_sha

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
