import hashlib
from pathlib import Path

REQUIRED = {
    'rutatramite': {'ruta-full'},
    'visionsetil': {'vision-security','gitleaks','vision-backend','vision-german','vision-frontend','docker-build'},
}

def validate(report, repository, main_sha, package, jenkins_result):
    if jenkins_result != 'SUCCESS' or report.get('status') != 'passed':
        raise ValueError('The complete Jenkins build must have succeeded')
    if report.get('repo') != repository or report.get('mode') != 'full':
        raise ValueError('A full build of the selected repository is required')
    if report.get('sha') != main_sha:
        raise ValueError('The candidate is not the current reviewed main commit')
    passed = {step['name'] for step in report.get('steps',[]) if step.get('status') == 'passed'}
    if not REQUIRED[repository].issubset(passed):
        raise ValueError('Required checks are missing')
    package = Path(package)
    with package.open('rb') as source:
        actual = hashlib.file_digest(source,'sha256').hexdigest()
    if actual != report.get('package',{}).get('sha256'):
        raise ValueError('The package SHA-256 does not match the verified candidate')
    return actual
