#parameterliste
# a (int)
# b (int)

param (
  [string]$id
)

$path = (get-item $PSScriptRoot).parent.parent.FullName + "\json\in\$id.json"

$json = Get-Content $path | ConvertFrom-Json
$config = Get-Content $PSScriptRoot\config.json | ConvertFrom-Json

$a = [int]($json.param | where key -EQ 'a').value
$b = [int]($json.param | where key -EQ 'b').value

return $a * $b