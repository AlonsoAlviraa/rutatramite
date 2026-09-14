import base64
import json
from pathlib import Path
script='def j=jenkins.model.Jenkins.get();\n'
for repo in ['rutatramite','visionsetil']:
    for action in ['publish','rollback']:
        name=repo+'-'+action
        parameters="parameters { string(name: 'BUILD_NUMBER_TO_PUBLISH', defaultValue: '', description: 'Número de build completo y aprobado'); choice(name: 'ACTION', choices: ['preview','publish'], description: 'Preparar o publicar exactamente ese paquete') }" if action=='publish' else ''
        command=r"$ciArgs=@('C:/Users/Mariano/CI/rutatramite/ops/ci/publish.py','--repo','REPO','--build',$env:BUILD_NUMBER_TO_PUBLISH,'--action',$env:ACTION)" if action=='publish' else r"$ciArgs=@('C:/Users/Mariano/CI/rutatramite/ops/ci/rollback.py','--repo','REPO')"
        pipeline="""pipeline {
 agent { label 'windows-ci' }
 options { timestamps(); disableConcurrentBuilds(); buildDiscarder(logRotator(daysToKeepStr: '30')) }
 PARAMETERS
 stages { stage('Operación manual') { steps { lock(resource: 'production-shared-caddy') { powershell '''
  $ErrorActionPreference = 'Stop'
  COMMAND
  & C:/Users/Mariano/CI/runtime/Scripts/python.exe @ciArgs
  exit $LASTEXITCODE
 ''' } } } }
}""".replace('PARAMETERS',parameters).replace('COMMAND',command).replace('REPO',repo)
        encoded=base64.b64encode(pipeline.encode()).decode()
        variable='job'+repo+action
        script+=f"def {variable}=j.getItem('{name}') ?: j.createProject(org.jenkinsci.plugins.workflow.job.WorkflowJob,'{name}'); {variable}.setDefinition(new org.jenkinsci.plugins.workflow.cps.CpsFlowDefinition(new String('{encoded}'.decodeBase64(),'UTF-8'),true)); {variable}.save();\n"
        if action=='publish':
            script+=f"{variable}.addProperty(new hudson.model.ParametersDefinitionProperty(new hudson.model.StringParameterDefinition('BUILD_NUMBER_TO_PUBLISH','','Build aprobado'),new hudson.model.ChoiceParameterDefinition('ACTION',['preview','publish'] as String[],'Operación manual'))); {variable}.save();\n"
script+="println('Four manual publication/recovery jobs configured; no deployment executed.')"
Path('C:/Users/Mariano/CI/migration/manual-setup.json').write_text(json.dumps({'path':'scriptText','data':{'script':script}}))
