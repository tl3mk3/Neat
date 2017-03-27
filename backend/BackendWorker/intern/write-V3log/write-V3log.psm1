function write-V3log(
  [Parameter(Mandatory=$true)][string]$id,
  [Parameter(Mandatory=$true)][LogLevel]$category,
  [string]$user,
  [Parameter(Mandatory=$true)][string]$logtext,
  [Parameter(Mandatory=$true)][PSObject]$config
)
{

#Wenn vom Commando ein anderer LogLevel kommt als global gesetzt wird, nimm diesen
$localLogLevel = $config.global.globalLogLevel
if (![string]::IsNullOrWhiteSpace($config.command.logLevel))
{
    if($localLogLevel -ne $config.command.logLevel)
    {
        $localLogLevel = $config.command.logLevel
    }
}

#wenn kein Benutzer übergeben, dann den aus dem Befehlsjson nehmen
if (![string]::IsNullOrWhiteSpace($user))
{
    $user = $config.local.user
}

#wenn die category grösser oder gleich dem loglevel ist, dann wird geschrieben
#[LogLevel] wird in '\intern\include\include.ps1' definiert
if (([LogLevel]$category).value__ -ge ([LogLevel]$localLogLevel).value__)
{
    $date = get-date -format yyyyMMdd
    $path = "$PSScriptRoot\..\..\logs\log-$date.txt"

    #ToDo
    #write to DB (erst wenn DB fest eingebaut)


    $log = Get-Date -Format "yyyy-MM-ddZHH:mm:ss"
    $log += "|"
    $log += $id
    $log += "|"
    $log += $category
    $log += "|"
    $log += $user
    $log += "|"
    $log += $logtext

    $log >> $path
    }
}







# log-debug
# log-info
# log-warning
# log-error

# set-log-level -loglevel 'error'

# loglevel = warning heisst dass debug, info nicht geloggt wird.



<#



# Beispiel:

set-log-level 'warning'
log-debug 1
log-info 2
log-warning 3
set-loglevel info
log-debug 4
log-info 5
set-log-level debug
log-debug 6
log-info 7

Ausgabe:
3
5
6
7

wo wird das loglevel gesetzt und wo gespeichert?
anfang von start.ps1
globale variable? -> eher nicht 


es gibt ein globales loglevel, das verwendet wird, wenn nichts anderes gesetzt wird. das steht im config des servers (oder besser des befehls? <-- das)
von der webseite aus kann ein anderes loglevel übergeben werden, dieses wird verwendet, wenn es übergeben wird.

#>