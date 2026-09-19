import base64
import json
from pathlib import Path
root=Path('C:/Users/Mariano/CI')
pipeline="""pipeline {
 agent { label 'windows-ci' }
 options { timestamps(); disableConcurrentBuilds(); buildDiscarder(logRotator(daysToKeepStr: '30')) }
 parameters { string(name: 'SHA', defaultValue: '', description: 'Commit completo de main que contiene la política revisada') }
 stages { stage('Política Caddy') { steps { lock(resource: 'production-shared-caddy') { powershell '''
  $ErrorActionPreference='Stop'
  & C:/Users/Mariano/CI/runtime/Scripts/python.exe C:/Users/Mariano/CI/rutatramite/ops/ci/caddy_policy.py --sha $env:SHA
  exit $LASTEXITCODE
 ''' } } } }
}"""
encoded=base64.b64encode(pipeline.encode()).decode()
script="def j=jenkins.model.Jenkins.get(); def job=j.getItem('visionsetil-caddy') ?: j.createProject(org.jenkinsci.plugins.workflow.job.WorkflowJob,'visionsetil-caddy'); job.setDefinition(new org.jenkinsci.plugins.workflow.cps.CpsFlowDefinition(new String('"+encoded+"'.decodeBase64(),'UTF-8'),true)); job.addProperty(new hudson.model.ParametersDefinitionProperty(new hudson.model.StringParameterDefinition('SHA','','Commit exacto de main'))); job.save(); println('Manual Caddy job ready; no production policy applied.')"
(root/'migration/caddy-job.json').write_text(json.dumps({'path':'scriptText','data':{'script':script}}))
