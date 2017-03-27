#
# Skelett für ein NEat-Backendscript
#
# Version 
#
# How-to:
# 1. diesen Ordner kopieren
# 2. Ordner umbenennen (bitte nach üblichen Gepflogenheiten benennen) -> 'verb-noun'
#    -> https://msdn.microsoft.com/en-us/library/ms714428(v=vs.85).aspx
#    -> get-verb
# 3. command schreiben 
# 4. Webseite erstellen und einhängen (wenn Befehl eine Ausgabe ins Web hat und nicht nur intern verwendet wird)

###############
# Headerbereich

#parameterliste
# $controller [string]
#(der Übersichtlichkeit wegen angeben)

#der vorgegebene Wert für die id wird verwendet um ein schon 
#vorhandenes json auszurufen um das Command direkt zu testen
#sollte im normalen Betrieb ausgkommentiert werden
param (
  [string]$id #= "148526049858982"
)

#Includes
# Hier wird unter anderem automatisch die Verbindung zum Filer aufgebaut. 
$scriptpath = $PSScriptRoot
. $PSScriptRoot/../../intern/include/include.ps1
#####################################
# Platz für Custom Includes

#####################################

#ab hier können Logs geschrieben werden
#'id' kann frei gesetzt werden, im Normalfall wird jedoch $id verwendet
#'user' kann gesetzt werden, wird jedoch automatisch gefüllt wenn nicht

write-V3log -id $id -category "info" -logtext "Hier wird list-volumes gestartet" -config $config

#Das LogLevel, was mindestens erreicht sein muss, um in die Logdatein zu schreiben
#überschreibt für diese Ausführung den im Befehl gespeicherten LogLevel und hat
#höhere Prio als der globale LogLevel
#$config.command.logLevel = [LogLevel]::debug

##Extrahiere Parameter

#einzeln
$controller = $config.local.param.controller

#alle, als Objekt
$params = $config.local.param



################################################################
# Start des Custom Codes

##Eigentlicher Befehlsablauf
#
#
# Hier kommt der CUstom code rein
#
#
#
#

# Beispielcode für Zugriff auf cdot cluster:
$qtree = Get-NcQtree

# Beispielcode für Zugriff auf 7mode Cluster:
#(aktuell wird jedoch nur eine Verbindung via cdot aufgebaut)
$qtree = Get-NaQtree


#Beispiel: So schreibt man ins Logfile:



#### Beispielcode für erstellung des Rückgabe-objekts

#initialisiere returobjekt
$returobjekt = @()


#befülle returnobjekt mit extrahiertem parameter
$returobjekt += @{command = 'controller'; wert = $controller} 


#befülle returnobjekt werten aus parameterobjekt
foreach($pair in $params.param)
{
    if ($pair.key -eq "qtrees")
    { 
        $returobjekt += @{command = 'qtree'; wert = $key.values} 
    }
}

# Ende des Custom Codes
# Rückgabeobjekt muss in $returnobjekt stehen.
################################################################

# ab hier bitte nicht ändern.

#$returobjekt als objekt zusammenfügen
$returobjekt = $returobjekt | % { new-object PSObject -Property $_}

return $returobjekt


<#
##Beispiel JSON

{
	"user": "Ralph",
	"mailFrom": "absender@v3consulting.com",
	"mailTo": ["panik@v3consulting.com"],
	"logLevel": "warning";
	"command": "list-volumes",
	"param": {
		"controller": "cluster1.int.v3consulting.com",
		"aggregate": "aggr0",
		"volume-list": ["vol1", "vol2", "vol3"]
	}
}

alle root einträge werden als variable von 'include.ps1' hierher zurückgegeben (ausser command)
also $user, $mailFrom, $mailTo, $LogLevel und $param
diese sind also verbindlich im JSON!

#>

<#
#LOG Categorien:

enum LogLevel
{
    debug = 1
    info = 2
    warning = 3
    error = 4
}

Welche LogLevel gelog werden steht im Globalen Dings
Das wird jedoch von den Configdaten im Befehl überschrieben (wenn da was steht)
bzw händisch im Befehl selbst zu Entwicklungszwecken

-> $logLevel = [LogLevel]::debug

#>