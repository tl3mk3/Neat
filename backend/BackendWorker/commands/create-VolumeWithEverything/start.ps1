#parameterliste
# $controller [string]

param (
  [string]$id = "148975036670911"
)

#Includes
$scriptpath = $PSScriptRoot
. $PSScriptRoot/../../intern/include/include.ps1

##Extrahiere Parameter
$controller =   $config.local.param.controller
$Vserver =      $config.local.param.vserver
$volumeName =   $config.local.param.volumeName
$aggregate =    $config.local.param.aggregate
$junctionPath = $config.local.param.junctionPath
$size =         $config.local.param.size
$qtrees =       $config.local.param.qtrees

#Eigentlicher Befehlsablauf

$log = @()

try{
    $return = New-NcVol -name $volumeName -Aggregate $aggregate -JunctionPath $junctionPath -Size $size -VserverContext $Vserver
    $log += @{command = 'New-NcVol'; wert = $return} 
}
catch {$log += @{command = 'New-NcVol (error)'; wert = $Error[0]}} 


foreach($qtree in $qtrees)
{
    $name = $qtree.name
    $ROSF = $qtree.ReadOnlySecurityFlavor
    $RWSF = $qtree.ReadWriteSecurityFlavor
    try{
        $return = New-NcQtree -Volume $volumeName -Qtree $name -VserverContext $Vserver
        $log += @{command = 'New-NcQtree'; wert = $return} 
    }
    catch {$log += @{command = 'New-NcQtree (error)'; wert = $Error[0]}} 

    try{
        $return = New-NcExportPolicy -name ($volumeName + $name) -VserverContext $Vserver 
        $log += @{command = 'New-NcExportPolicy'; wert = $return} 
    }
    catch {$log += @{command = 'New-NcExportPolicy (error)'; wert = $Error[0]}} 

    try{
        $return = New-NcExportRule -Policy ($volumeName + $name) -ClientMatch "127.0.0.1" -ReadOnlySecurityFlavor $ROSF -ReadWriteSecurityFlavor $RWSF -VserverContext $Vserver
        $log += @{command = 'New-NcExportRule'; wert = $return} 
    }
    catch {$log += @{command = 'New-NcExportRule (error)'; wert = $Error[0]}} 

} 

$log = $log | % { new-object PSObject -Property $_}

return $log