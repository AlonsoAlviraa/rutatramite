$ErrorActionPreference = 'Stop'
$ciRoot = 'C:/Users/Mariano/CI'
if (-not (Test-Path "$ciRoot/agent/agent.jar")) { throw 'Falta agent.jar verificado' }
if (-not (Test-Path "$ciRoot/secrets/windows-agent")) { throw 'Falta el secreto del agente' }
$ciDocker = 'C:/Program Files/Docker/Docker/resources/bin/docker.exe'
& $ciDocker info --format '{{.ServerVersion}}' 2>$null
if ($LASTEXITCODE -ne 0) {
  Start-Process -FilePath 'C:/Program Files/Docker/Docker/Docker Desktop.exe' -WindowStyle Hidden
  for ($ciAttempt = 0; $ciAttempt -lt 60; $ciAttempt++) {
    Start-Sleep -Seconds 5
    & $ciDocker info --format '{{.ServerVersion}}' 2>$null
    if ($LASTEXITCODE -eq 0) { break }
  }
}
& 'C:/Program Files/Eclipse Adoptium/jdk-21.0.12.8-hotspot/bin/java.exe' -Xmx256m -jar "$ciRoot/agent/agent.jar" -url https://ci.rutatramite.com/ -secret "@$ciRoot/secrets/windows-agent" -name windows-ci -webSocket -workDir "$ciRoot/agent"
exit $LASTEXITCODE
