$ErrorActionPreference = 'Stop'
$ciRoot = 'C:/Users/Mariano/CI'
$ciPython = "$ciRoot/runtime/Scripts/python.exe"
$ciLog = "$ciRoot/archive/maintenance.log"
& $ciPython -X utf8 "$PSScriptRoot/sync_backup.py" >> $ciLog 2>&1
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
& $ciPython -X utf8 "$PSScriptRoot/cleanup_runs.py" >> $ciLog 2>&1
exit $LASTEXITCODE
