$volumes = Get-NcVol
$volumes | Add-Member "sis" "undefined"
$sisList = Get-NcSis | select path, state, vserver


foreach  ($volume in $volumes)
{
    if ($volume.Dedupe -eq "True")
    {
        #$volume.sis = (Get-NcSis -path ("/vol/" + $volume.name) -Vserver $volume.vserver | select State).state
        $volume.sis = ($sisList | Where-object {($_.Path -eq ("/vol/" + $volume.name)) -and ($_.Vserver -eq $volume.vserver)} | select State).state
        #$volume.Name
        #$volume.sis
        #'#############'
    }
}


#$volumes | select name, dedupe, sis

$volumes