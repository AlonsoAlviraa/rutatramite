"""Emit reviewed controller setup; no repository-controlled Jenkinsfile is executed."""
import json
import base64
from pathlib import Path

ROOT = Path('C:/Users/Mariano/CI')
script = r'''
import jenkins.model.Jenkins
import hudson.model.*
import hudson.slaves.*
import org.jenkinsci.plugins.workflow.job.WorkflowJob
import org.jenkinsci.plugins.workflow.cps.CpsFlowDefinition
import jenkins.model.BuildDiscarderProperty
import hudson.tasks.LogRotator
def j = Jenkins.get()
if (j.getNode('windows-ci') == null) {
  def node = new DumbSlave('windows-ci','C:/Users/Mariano/CI/agent',new JNLPLauncher(true))
  node.setNumExecutors(1)
  node.setLabelString('windows-ci')
  node.setMode(Node.Mode.EXCLUSIVE)
  j.addNode(node)
}
'''
for repo in ['rutatramite','visionsetil']:
    for mode in ['pr','full'] + (['journeys','android'] if repo=='visionsetil' else []):
        name = repo+'-'+mode
        pipeline = """pipeline {
  agent { label 'windows-ci' }
  options { timestamps(); disableConcurrentBuilds(); buildDiscarder(logRotator(daysToKeepStr: '30', artifactDaysToKeepStr: '30')) }
  parameters {
    string(name: 'SHA', defaultValue: '', description: 'Commit SHA completo; obligatorio')
    string(name: 'BASE_SHA', defaultValue: '', description: 'Base de la propuesta; vacío ejecuta todas las comprobaciones')
    choice(name: 'SOURCE', choices: ['github','local'], description: 'GitHub normalmente; local solo para validar la migración')
  }
  stages {
    stage('Comprobar') {
      steps {
        powershell '''
          $ErrorActionPreference = 'Stop'
          if ($env:SHA -notmatch '^[0-9a-f]{40}$') { throw 'SHA inválido' }
          $ciArgs = @('C:/Users/Mariano/CI/rutatramite/ops/ci/runner.py', '--repo', 'REPO', '--sha', $env:SHA, '--mode', 'MODE', '--source', $env:SOURCE)
          if ($env:BASE_SHA) { $ciArgs += @('--base', $env:BASE_SHA) }
          & C:/Users/Mariano/CI/runtime/Scripts/python.exe @ciArgs
          exit $LASTEXITCODE
        '''
      }
    }
  }
  post {
    always { archiveArtifacts artifacts: 'ci-results/**', allowEmptyArchive: true, fingerprint: true }
  }
}""".replace('REPO',repo).replace('MODE',mode)
        # Job source is managed only through authenticated controller administration.
        script += f"\ndef job = j.getItem({json.dumps(name)}) ?: j.createProject(WorkflowJob, {json.dumps(name)})\n".replace('def job','job' if 'job =' in script else 'def job')
        encoded = base64.b64encode(pipeline.encode()).decode()
        script += "job.setDefinition(new CpsFlowDefinition(new String('"+encoded+"'.decodeBase64(), 'UTF-8'), true))\n"
        script += "job.addProperty(new BuildDiscarderProperty(new LogRotator(30,-1,30,-1)))\njob.save()\n"
script += "j.save(); println('Configured 6 isolated checking jobs; Actions unchanged.')\n"
(ROOT/'migration/provision-jobs.json').write_text(json.dumps({'path':'scriptText','data':{'script':script}}))
(ROOT/'migration/agent-secret.json').write_text(json.dumps({'path':'scriptText','data':{'script':"println(jenkins.model.Jenkins.get().getComputer('windows-ci').getJnlpMac())"},'output':'/opt/ruta-ci/secrets/windows-agent'}))
