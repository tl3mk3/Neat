param (
  [string]$controllername
)

$PSScriptRoot

$controller =  (Get-Content $PSScriptRoot\..\..\..\global\controller.json | ConvertFrom-Json) | Where-Object {$_.Name -eq $controllername}

$secpasswd = ConvertTo-SecureString $controller.pwd -AsPlainText -Force
$mycreds = New-Object System.Management.Automation.PSCredential ($controller.User, $secpasswd)
$vers = Connect-NcController -Name $controller.Address -Credential $mycreds