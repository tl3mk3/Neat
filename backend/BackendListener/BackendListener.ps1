#lauscht auf angegebenem port nach anfragen vom frontend
#anfragen kommen in form von "http://myServer:8000/command/" mit den anfragen als json im POST
#spätere anforderungen, z.B. serverstatus werden durch eine andere adresse als "/command/" erkannt

#'/result/' fragt explizit nach einem schon vorhandenem ergebnis, welches als json datei in '/JSON/out/' liegt
#entweder es wird ein ergebnis zurückgeliefert, oder der status (übergeben, in arbeit, error, ....)

#der BackendListener entscheidet NICHT, ob eine Aufgabe syncron oder asyncron abgearbeitet wird!
#dies erledigt der 

# Start of script
[Reflection.Assembly]::LoadWithPartialName("System.Web") | Out-Null
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add('http://+:8000/') # Must exactly match the netsh command above

$listener.Start()
"This is the BackendListener"
"Listening ..."

$i = 0

$message = ""


function intEND
{
    [byte[]] $buffer = [System.Text.Encoding]::UTF8.GetBytes('is de4d')
    $response.ContentLength64 = $buffer.length
    $output = $response.OutputStream
    $output.Write($buffer, 0, $buffer.length)
    $output.Close()
}

function intCommand
{
    try
    {
        #befehl anwerfen
        $request | select *
        $StreamReader = New-Object System.IO.StreamReader $request.InputStream
        $json = [System.Web.HttpUtility]::UrlDecode($StreamReader.ReadToEnd())

        $DateTime = (Get-Date).ToUniversalTime()
        $TimeStamp = [System.Math]::Truncate((Get-Date -Date $DateTime -UFormat %s))

        $json >> "$PSScriptRoot\..\BackendWorker\json\in\$TimeStamp.json"

        $message = Invoke-Expression ("$PSScriptRoot\..\BackendWorker\BackendWorker.ps1 " + $TimeStamp)
        $message = '{"SUCCESS": ' + $message + '}'
    }
    catch
    {
        $message = '{"Error": ' + ($_.Exception | ConvertTo-Json)  + '}'
    }

    return $message
}

function intStatus
{
    $request | select *
    $StreamReader = New-Object System.IO.StreamReader $request.InputStream
    $json = [System.Web.HttpUtility]::UrlDecode($StreamReader.ReadToEnd()) | ConvertFrom-Json
    $id = $json.id

    $pathStatus = (get-item $PSScriptRoot).parent.FullName + "\BackendWorker\json\out\$id.status"     
    If (Test-Path $pathStatus)
    { 
        $statuscomplete = Get-Content $pathStatus | select -Last 1
        $timestamp = $statuscomplete.substring(0,16)
        $status = $statuscomplete.split(':')[2]
        $message = @{"timestamp" = $TimeStamp; "status" = $status} | ConvertTo-Json
    }        
    else
    {
        $message = '{"ERROR": "ID ist unbekannt"}'
    } 

    return $message
}

function intResult
{
    #testen, ob statusfile existiert
    #existiert ein 'finished' flag in der letzten zeile des statusfiles?
        #prüfen ob ergebnisfile existiert
            #file auslesen und als json zurückgeben
            #nein -> fehlermeldung,, panik
        #nein -> letzten status zurückgeben  
    $request | select *
    $StreamReader = New-Object System.IO.StreamReader $request.InputStream
    $json = [System.Web.HttpUtility]::UrlDecode($StreamReader.ReadToEnd()) | ConvertFrom-Json
    $id = $json

    $pathStatus = (get-item $PSScriptRoot).parent.FullName + "\BackendWorker\json\out\$id.status"
    $pathResult = (get-item $PSScriptRoot).parent.FullName + "\BackendWorker\json\out\$id.json"

    If (Test-Path $pathStatus)
    {
        $status = Get-Content $pathStatus | select -Last 1
        if (($status).EndsWith('finished'))
        {
            If (Test-Path $pathResult)
            {
                $result = Get-Content $pathResult
                $message = '{"SUCCESS": {"Finished": ' + $result + '}}'
            }
            else
            {
                $message =  '{"ERROR": "ID abgearbeitet aber kein Ergebnis"}'
                #es sollte immer ein Ergebnis geschrieben werden, selbst wenn NULL zurückgegeben wird
            }
        }
        elseif (($status).contains(': ERROR '))
        {
            $message = '{"ERROR": "' + $status + '"}'
            #Fehler, der von BackendWorkerAsyncron gefangen wurde
        }
        else
        {
            $message = '{"SUCCESS": {"NotReady": "' + $status + '"}}'
            #ToDo: hier kann noch ein Timeout eingebaut werden, die Zeit sollte aber bei jedem Befehl
            #unterschiedlich sein, manche können theoretisch Stunden brauchen (komplette umstrukturierung von Server z.B.)
        }
    }
    else
    {
        $message = '{"ERROR": "ID ist unbekannt"}'
    } 

    return $message
}



while ($true) {
    Start-Sleep -Milliseconds 10 #kurzer break, damit auf keinen Fall die gleichen ID vergeben werden.

    #todo: alle variablen müssen am anfang dieser Schleife auf NULL gesetzt werden

    $context = $listener.GetContext() # blocks until request is received
    $request = $context.Request
    $response = $context.Response

    $context.Request.RemoteEndPoint.ToString() + "    " + $request.Url

    $message = ""

#/index.html geht natürlich nicht, da das schon von node.js abgefangen wird ;)
#aber eventuell sollten alle direkten seitenaufrufe (also alles mit .html so behandelt werden, dass COMMAND.html
#an ein html file im befehlsordner weitergeleitet wird, damit könnten die befehle und die entsprechenden webseiten gut gekapselt werden

#    if ($request.Url -match '/index.html')  {
#        $htmlseite = get-content  "C:\WORK\PowerShell\WFA-mini\PROTOTYP\FrontendHTML\src\index.html"
#        [byte[]] $buffer = [System.Text.Encoding]::UTF8.GetBytes($htmlseite)
#        $response.ContentLength64 = $buffer.length
#        $response.ContentType = "text/html"
#        $output = $response.OutputStream
#        $output.Write($buffer, 0, $buffer.length)
#        $output.Close()
#        continue 
#    }

<#
    if ($request.Url -match '.html')  {
        $command = [string]$request.Url
        $command = ($command.split('/'))[-1]
        $command = ($command.split('.'))[0] #'.html' wegschneiden
        if($command.Length -gt 0)
        {
            $htmlseite = get-content "$PSScriptRoot\..\BackendWorker\commands\$command\index.html"
            [byte[]] $buffer = [System.Text.Encoding]::UTF8.GetBytes($htmlseite)
            $response.ContentLength64 = $buffer.length
            $response.ContentType = "text/html"
            $output = $response.OutputStream
            $output.Write($buffer, 0, $buffer.length)
            $output.Close()
            continue 
        }
        else
        {
            'fehlermeldung weil command nicht übergeben'
        }        
    }
#>

    if ($request.Url -match '/end/') 
    {
        $message = intEnd
        break
    }
    if ($request.Url -match '/command/')
    { # response to http://myServer:8000/command/
        $message = intCommand

    }
    elseif($request.Url -match '/status/')
    { #gibt den status einer bestimmten Anfrage zurück.
        $message = intStatus
    }
    elseif($request.Url -match '/result/')
    {#gibt das Ergebnis einer bestimmten Anfrage zurück.
        $message = intResult  
    }
    else
    {
        $message = '{"ERROR": "URL ist unbekannt! ' + $request.Url +'"}'
    }

    if ([string]::IsNullOrEmpty($message)){$message='{"ERROR": "Kein Rückgabewert geliefert. Sooooory!"}'}

    [byte[]] $buffer = [System.Text.Encoding]::UTF8.GetBytes($message)
    $response.ContentLength64 = $buffer.length
    $output = $response.OutputStream
    $output.Write($buffer, 0, $buffer.length)
    $output.Close()
}

$listener.Stop()