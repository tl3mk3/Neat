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

try
{
    $json = Get-Content $PSScriptRoot\json\in\$id.json | ConvertFrom-Json
    $command = $json.command

    $timestamp = Get-Date -format "yyyy-mm-ddTHH:mm"

    $timestamp + ": in work" >> $PSScriptRoot\json\out\$id.status

    $result = Invoke-Expression ("$PSScriptRoot\commands\$command\start.ps1 -id $id")

    "$PSScriptRoot\commands\$command\start.ps1 -id $id"
    $result

    $result | ConvertTo-Json >> $PSScriptRoot\json\out\$id.json

    $timestamp = Get-Date -format "yyyy-mm-ddTHH:mm"
    $timestamp + ": finished" >> $PSScriptRoot\json\out\$id.status
}
catch
{
    $timestamp + ": ERROR " >> $PSScriptRoot\json\out\$id.status
    $_.Exception.Message >> $PSScriptRoot\json\out\$id.status
    $_.Exception.ItemName >> $PSScriptRoot\json\out\$id.status
}