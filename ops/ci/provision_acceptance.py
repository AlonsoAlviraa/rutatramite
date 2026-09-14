import base64
import json
from pathlib import Path
pipeline = r'''pipeline {
  agent { label 'windows-ci' }
  options { timestamps(); buildDiscarder(logRotator(daysToKeepStr: '30')); timeout(time: 15, unit: 'MINUTES') }
  parameters { booleanParam(name: 'EXPECTED_FAILURE', defaultValue: false, description: 'Ensayo explícito de fallo, sin modificar las webs') }
  stages {
    stage('Controles del orquestador') {
      steps { powershell ''' + "'''" + r'''
        $ErrorActionPreference = 'Stop'
        & 'C:/Program Files/Docker/Docker/resources/bin/docker.exe' run --rm --memory 512m --cpus 1 --mount type=bind,source=C:/Users/Mariano/CI/rutatramite/ops/ci,target=/ci,readonly -w /ci ruta-ci-node20:20260914 bash /ci/acceptance.sh
        if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
        New-Item -ItemType Directory -Force ci-results | Out-Null
        '{"agent":"windows-ci","isolated_containers":true}' | Set-Content ci-results/connection.json
        if ($env:EXPECTED_FAILURE -eq 'true') { throw 'Fallo deliberado para comprobar la señalización' }
      ''' + "'''" + r''' }
    }
  }
  post { always { archiveArtifacts artifacts: 'ci-results/**', allowEmptyArchive: true } }
}'''
encoded = base64.b64encode(pipeline.encode()).decode()
script = "def j=jenkins.model.Jenkins.get(); def job=j.getItem('ci-acceptance') ?: j.createProject(org.jenkinsci.plugins.workflow.job.WorkflowJob,'ci-acceptance'); job.setDefinition(new org.jenkinsci.plugins.workflow.cps.CpsFlowDefinition(new String('"+encoded+"'.decodeBase64(),'UTF-8'),true)); job.save(); println('Acceptance job configured.')"
root = Path('C:/Users/Mariano/CI/migration')
(root/'acceptance-setup.json').write_text(json.dumps({'path':'scriptText','data':{'script':script}}))
(root/'acceptance-run.json').write_text(json.dumps({'path':'job/ci-acceptance/build','data':{}}))
(root/'acceptance-status.json').write_text(json.dumps({'path':'job/ci-acceptance/lastBuild/api/json?tree=number,result,building,url,artifacts[fileName]'}))
