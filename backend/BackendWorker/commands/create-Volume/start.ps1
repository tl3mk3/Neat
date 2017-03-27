#parameterliste
# $controller [string]

param (
  [string]$id #= "148526049858982"
)

#Includes
$scriptpath = $PSScriptRoot
. $PSScriptRoot/../../intern/include/include.ps1

##Extrahiere Parameter
$controller =   [string]($json.param | where key -EQ 'controller').value
$Vserver =      [string]($json.param | where key -EQ 'vserver').value
$volumeName =   [string]($json.param | where key -EQ 'volumeName').value
$aggregate =    [string]($json.param | where key -EQ 'aggregate').value
$junctionPath = [string]($json.param | where key -EQ 'junctionPath').value
$size =         [string]($json.param | where key -EQ 'size').value

#Eigentlicher Befehlsablauf

$log = @()

try{
    $return = New-NcVol -name $volumeName -Aggregate $aggregate -JunctionPath $junctionPath -Size $size -VserverContext $Vserver
    $log += @{command = 'New-NcVol'; wert = $return} 
}
catch {$log += @{command = 'New-NcVol (error)'; wert = $Error[0]}} 

$log = $log | % { new-object PSObject -Property $_}

return $log