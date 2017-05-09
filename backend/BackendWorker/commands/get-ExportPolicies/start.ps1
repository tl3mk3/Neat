#parameterliste
# $controller [string]
# Vserver [string]

param (
  [string]$id
)

#Includes
$scriptpath = $PSScriptRoot
. $PSScriptRoot/../../intern/include/include.ps1

##Extrahiere Parameter
$Vserver = [string]($json.param | where key -EQ 'vserver').value

#Eigentlicher Befehlsablauf

if ([string]::IsNullOrEmpty($Vserver))
{
    $result = Get-NcExportPolicy | select * 
}
else
{
    $result = Get-NcExportPolicy | where Vserver -eq $Vserver | select * 
}
return $result