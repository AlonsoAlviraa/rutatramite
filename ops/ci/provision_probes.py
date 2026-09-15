import base64
import json
from pathlib import Path
script = """def j=jenkins.model.Jenkins.get(); if(j.getNode('vps-probe')==null) { def n=new hudson.slaves.DumbSlave('vps-probe','/opt/ruta-ci/probe',new hudson.slaves.JNLPLauncher(true)); n.setNumExecutors(1); n.setLabelString('vps-probe'); n.setMode(hudson.model.Node.Mode.EXCLUSIVE); j.addNode(n); }\n"""
for name,cron,command,artifact in [
    ('visionsetil-operational','17 */6 * * *','python3 -B /opt/ruta-ci/config/probe_run.py operational --sha "$SOURCE_SHA" $IDENTIFY_ARGUMENT','operational.json,probe-source.json'),
    ('visionsetil-species','15 4 * * *','python3 -B /opt/ruta-ci/config/probe_run.py species --sha "$SOURCE_SHA"','species.json,probe-source.json')]:
    pipeline = """pipeline {
  agent { label 'vps-probe' }
  options { timestamps(); disableConcurrentBuilds(); timeout(time: 5, unit: 'MINUTES'); buildDiscarder(logRotator(daysToKeepStr: '30', artifactDaysToKeepStr: '30')) }
  parameters {
    string(name: 'SOURCE_SHA', defaultValue: '', description: 'Revisión confirmada de main; vacío usa el enlace actual recién actualizado')
    booleanParam(name: 'REQUIRE_IDENTIFY_AVAILABLE', defaultValue: false, description: 'Exigir identificación disponible, solo tras una publicación de modelo revisada')
  }
  stages { stage('Comprobar') { steps { sh '''
    set -eu
    IDENTIFY_ARGUMENT=''
    if [ "$REQUIRE_IDENTIFY_AVAILABLE" = 'true' ]; then IDENTIFY_ARGUMENT='--require-identify'; fi
    COMMAND
  ''' } } }
  post { always { archiveArtifacts artifacts: 'ARTIFACT', allowEmptyArchive: true } }
}""".replace('COMMAND',command).replace('ARTIFACT',artifact)
    encoded=base64.b64encode(pipeline.encode()).decode()
    script += "def job"+name.replace('-','')+"=j.getItem('"+name+"') ?: j.createProject(org.jenkinsci.plugins.workflow.job.WorkflowJob,'"+name+"');\n"
    variable='job'+name.replace('-','')
    script += variable+".setDefinition(new org.jenkinsci.plugins.workflow.cps.CpsFlowDefinition(new String('"+encoded+"'.decodeBase64(),'UTF-8'),true)); "+variable+".save();\n"
    script += variable+".addProperty(new hudson.model.ParametersDefinitionProperty(new hudson.model.StringParameterDefinition('SOURCE_SHA','','Revisión confirmada de main'),new hudson.model.BooleanParameterDefinition('REQUIRE_IDENTIFY_AVAILABLE',false,'Exigir Identify disponible'))); "+variable+".save();\n"
    # Timers intentionally enabled only after cutover acceptance, to avoid duplicate monitoring.
script += "j.save(); println('Two VPS jobs configured; schedules await validated cutover.')"
root=Path('C:/Users/Mariano/CI/migration')
(root/'probes-setup.json').write_text(json.dumps({'path':'scriptText','data':{'script':script}}))
(root/'probe-secret.json').write_text(json.dumps({'path':'scriptText','data':{'script':"println(jenkins.model.Jenkins.get().getComputer('vps-probe').getJnlpMac())"},'output':'/opt/ruta-ci/secrets/probe-agent'}))
