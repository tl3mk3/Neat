function get-V3controller()
{
$controllerListFull = Get-Content $PSScriptRoot\..\..\..\global\controller.json | ConvertFrom-Json

#hole DEFAULT Werte
$controllerDefault = $controllerListFull | Where-Object {$_.Name -eq 'DEFAULT'}

#hole alle anderen Werte
$controllerListOut = $controllerListFull | Where-Object {$_.Name -ne 'DEFAULT'}

#nutze Defaultwerte wenn Feld nicht gefüllt
foreach($controller in $controllerListOut)
{
    if($controller.Address -eq ""){$controller.Address = $controllerDefault.Address}
    if($controller.Port -eq ""){$controller.Port = $controllerDefault.Port}
    if($controller.User -eq ""){$controller.User = $controllerDefault.User}
    if($controller.pwd -eq ""){$controller.pwd = $controllerDefault.pwd}
}

return $controllerListOut
}