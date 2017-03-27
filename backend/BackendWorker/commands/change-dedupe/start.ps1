#parameterliste
# $vserver
# $volume
# $state

param (
  [string]$id #= "148959273750232"
)

#Includes
$scriptpath = $PSScriptRoot
. $PSScriptRoot/../../intern/include/include.ps1

##Extrahiere Parameter
$vserver = $config.local.param.vserver
$volume = $config.local.param.volume
$state = $config.local.param.state

#Eigentlicher Befehlsablauf

#Was ist der 'state'
    #true -> auf false setzen
    #false -> auf true setzen
    #alles andere -> auf true setzen 

if($state -eq 'enabled')
{
    try{
    $null = Disable-NcSis -name $volume -VserverContext $vserver
    $returnwert = 'disabled' 
    }
    catch{$returnwert ='ERROR'}
}
else
{
    try{
    $null = Enable-NcSis -name $volume -VserverContext $vserver
    $returnwert = 'enabled' 
    }
    catch{$returnwert ='ERROR'}  
}

return $returnwert
