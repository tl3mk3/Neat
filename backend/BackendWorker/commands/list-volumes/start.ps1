#parameterliste
# $controller [string]

param (
  [string]$id
)

#Includes
$scriptpath = $PSScriptRoot
. $PSScriptRoot/../../intern/include/include.ps1

#Das LogLevel, was mindestens erreicht sein muss, um in die Logdatein zu schreiben
#überschreibt für diese Ausführung den im Befehl gespeicherten LogLevel und hat
#höhere Prio als der globale LogLevel
#$config.command.logLevel = [LogLevel]::debug

##Extrahiere Parameter
#keine Parameter notwendig

#Eigentlicher Befehlsablauf
write-V3log -id $id -category "info" -logtext "Hier wird list-volumes gestartet" -config $config

$volumes = Get-NcVol
$volumes | Add-Member "sis" "undefined"

$sisList = Get-NcSis | select path, state, vserver
foreach  ($volume in $volumes)
{
    if ($volume.Dedupe -eq "True")
    {
        $volume.sis = ($sisList | Where-object {($_.Path -eq ("/vol/" + $volume.name)) -and ($_.Vserver -eq $volume.vserver)} | select State).state
    }
}

write-V3log -id $id -category "info" -logtext "Hier wird list-volumes beendet" -config $config

return $volumes