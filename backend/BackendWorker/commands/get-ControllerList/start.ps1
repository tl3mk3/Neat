#parameterliste
# ---

param (
  [string]$id = "149001763329717"
)

#Vorarbeiten
Import-Module $PSScriptRoot\..\..\intern\get-V3controller\get-V3controller
$path = (get-item $PSScriptRoot).parent.parent.FullName + "\json\in\$id.json"
$json = Get-Content $path | ConvertFrom-Json
$config = Get-Content $PSScriptRoot\config.json | ConvertFrom-Json


#Skript Hauptteil
$controllerlist = get-V3controller

return $controllerlist