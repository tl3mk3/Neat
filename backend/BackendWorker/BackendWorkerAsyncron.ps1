#wird von BackendWorker.ps1 aufgerufen
#arbeitet befehle ab, die länger dauern können
#bekommt xxxxxxx als parameter übergeben (dateiname von json datei in /json/in/)
#schreibt 'timestamp:in arbeit' in "/json/out/xxxxxxx.status"
#befehl ausführen
#ergebnis als json in /json/out/xxxxxx.json schreiben
#schreibt 'timestamp:beendet' in "/json/out/xxxxxxx.status"

param (
  [string]$id
)

Import-Module "$PSScriptRoot\intern\write-V3log\write-easylog.psm1"

try
{
    $json = Get-Content $PSScriptRoot\json\in\$id.json | ConvertFrom-Json
    $command = $json.command

    $timestamp = Get-Date -format "yyyy-mm-ddTHH:mm"

    $timestamp + ": in work" >> $PSScriptRoot\json\out\$id.status

    write-easylog -id $id -logtext "Start Invoke Command $command"
    $result = Invoke-Expression ("$PSScriptRoot\commands\$command\start.ps1 -id $id")
    write-easylog -id $id -logtext "End Invoke Command"

    "$PSScriptRoot\commands\$command\start.ps1 -id $id"
    #$result

    $result | ConvertTo-Json >> $PSScriptRoot\json\out\$id.json

    $timestamp = Get-Date -format "yyyy-mm-ddTHH:mm"
    $timestamp + ": finished" >> $PSScriptRoot\json\out\$id.status
}
catch
{
    $timestamp + ": ERROR: " + $_.Exception.Message >> $PSScriptRoot\json\out\$id.status
}