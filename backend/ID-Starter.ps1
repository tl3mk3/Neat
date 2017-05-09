param (
  [string]$id = "leer"
)


if ($id -eq "leer")
{
    $list = Get-ChildItem -Path "$PSScriptRoot\BackendWorker\json\in"

    $id = (($list | select name, CreationTime | Out-GridView -PassThru).name).split(".")[0]
}

$json = Get-Content $PSScriptRoot\BackendWorker\json\in\$id.json | ConvertFrom-Json

$command = $json.command

$return = Invoke-Expression ("$PSScriptRoot\BackendWorker\commands\$command\start.ps1 -id $id")

$return