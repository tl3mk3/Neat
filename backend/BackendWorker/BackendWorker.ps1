#parameter: name der json datei (/json/in/xxxxxxx.json)

#auslesen
    #sql abfrage?
    #command?

#-> sql abfrage
#sql ausführen
#return $json
#geht entweder an normale datenbank oder an die playground DB (letztere kann lesen und schreiben)

#-> command
#auslesen aus config
    #direkte ausführung
    #asynchrone ausführung

#-> direkte ausführung
#befehl ausführen
#return $json

#-> asynchron
#"/json/out/xxxxxxx.status" mit inhalt "$timestamp:angekommen" speichern
#BackgroundWorkerAsyncron starten mit xxxxxxx als Parameter
    #beispielaufruf: Start-Process powershell ".\test2.ps1 xxxxxxxx"
    #skriptname und parameter müssen zusammen in hochkommas stehen
#return "Ticket:xxxxxxx" als json 

param (
  [string]$id
)

$json = Get-Content $PSScriptRoot\json\in\$id.json | ConvertFrom-Json

$command = $json.command

if ($command.StartsWith("SQL:"))
{
    return ('magischer rückgabewert für SQL' | ConvertTo-Json)
}
elseif ($command.StartsWith("SQLPlayground:"))
{
    return ('magischer rückgabewert für SQLPlayground' | ConvertTo-Json)
}
else
{    
    $config = Get-Content $PSScriptRoot\commands\$command\config.json | ConvertFrom-Json
    if ($config.immediately -eq $true)
    {
        write-easylog -id $TimeStamp -logtext "Befehlsausführung: Synchron"
        write-easylog -id $TimeStamp -logtext "Befehlsausführung: gestartet"
        $message = Invoke-Expression ("$PSScriptRoot\commands\$command\start.ps1 -id $id")
        write-easylog -id $TimeStamp -logtext "Rückgabewert: $message"
        write-easylog -id $TimeStamp -logtext "Befehlsausführung: beendet"
        #ToDo: Abfrage, ob ergebnis auch in JSON-OUT gespeichert werden soll 
        return ($message | ConvertTo-Json)
    }
    else
    {
        write-easylog -id $TimeStamp -logtext "Befehlsausführung: Asynchron"
        write-easylog -id $TimeStamp -logtext "Befehlsausführung: gestartet"
        Start-Process powershell "$PSScriptRoot\BackendWorkerAsyncron.ps1 $id"
        $timestamp = Get-Date -format "yyyy-mm-ddTHH:mm"
        $timestamp + " : übergeben" >> $PSScriptRoot\json\out\$id.status
        return ($id | ConvertTo-Json)
        write-easylog -id $TimeStamp -logtext "Befehlsausführung: übergeben"
    }
}