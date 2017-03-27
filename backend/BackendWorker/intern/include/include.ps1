##nur für testzwecke
##im betrieb auskommentieren
#$scriptpath = 'C:\WORK\PowerShell\WFA-mini\PROTOTYP\BackendWorker\commands\list-volumes'
#$id = '148959249207359'
##

$ErrorActionPreference = "Stop"

#Remove-Module *
#werde ich wohl nicht brauchen, nur aus Bequemlichkeitsgründen hier, damit ich es nicht suchen muss

Import-Module ((get-item $scriptpath).parent.parent.FullName + "\intern\write-V3log\write-V3log.psm1")

enum LogLevel
{
    debug = 1
    info = 2
    warning = 3
    error = 4
}

#Erstellen eines Objektes, in dem alle Configdaten stehen, damit diese leichter übergeben werden können
#######################################################################################################
$config = New-Object –TypeName PSObject

##globale Informationen
$globalConfig = Get-Content $scriptpath\..\..\..\global\global.json | ConvertFrom-Json
$config | Add-Member –MemberType NoteProperty –Name global –Value $globalConfig

##Informationen aus dem Befehlsumfeld
$config | Add-Member –MemberType NoteProperty –Name command –Value (Get-Content $scriptpath\config.json | ConvertFrom-Json)

##Informationen von Befelsaufruf 
$path = (get-item $scriptpath).parent.parent.FullName + "\json\in\$id.json"
$config | Add-Member –MemberType NoteProperty –Name local –Value (Get-Content $path | ConvertFrom-Json)

#Verbinde mit Controller
########################
#$controller = [string]($config.local.param | where key -EQ 'controller').value
$controller = $config.local.controller
if (![string]::IsNullOrEmpty($controller))
{
    $pathstring = $config.global.globalpath + "BackendWorker\intern\connect-V3controller\connect-V3controller.ps1"
    $null = . $pathstring -controllername $controller
}


##todo
#parameter, ob controller benutzt werden soll
##nein, include.ps1 sollte von selbst erkennen, ob ein controller angegeben ist oder nicht!
#7mode include bauen -> later (haben keinen controller mit 7mode, oder ist das unabhängig?) 
##wenn dann wird es aber als parameter übergeben