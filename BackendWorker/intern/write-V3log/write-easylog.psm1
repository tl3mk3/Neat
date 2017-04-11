function write-easylog(
  [Parameter(Mandatory=$true)][string]$id,
  [Parameter(Mandatory=$true)][string]$logtext
)
{

$date = get-date -format yyyyMMdd
$path = "$PSScriptRoot\..\..\logs\log-$date.txt"

$log = Get-Date -Format "yyyy-MM-ddZHH:mm:ss"
$log += "|"
$log += $id
$log += "|"
$log += "SYSTEM"
$log += "|"
$log += "SYSTEM"
$log += "|"
$log += $logtext

Write-Host $log

$log >> $path
}