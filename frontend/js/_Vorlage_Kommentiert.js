

// ractive ist die template-engine zum befüllen der HTML-Seite mit der Rückgabe der Backendkommandos
// ractive initialisieren
var ractive = new Ractive({
  // The `el` option can be a node, an ID, or a CSS selector.
  el: '#container',

  // We could pass in a string, but for the sake of convenience
  // we're passing the ID of the <script> tag above.
  // der von ractive gtesteuerte Bereich ist durch 
  // <script id="template" type="text/ractive>  ...... </script> 
  // eingeschlossen.
  template: '#template',

  // Here, we're passing in some initial data
  data: {
	  results: []
  }
});

// example
var newVolume = {
	controller: document.querySelector("#controller").value,
	vserver: document.querySelector("#vserver").value
};

console.log(newVolume.controller);

// hier wird an einen button ein Command gehängt, das eine Backendfunktion aufruft
document.querySelector("#send").addEventListener("click", function(){
	var controller = document.querySelector("#controller").value;
	var vserver = document.querySelector("#vserver").value;
	var volumeName = document.querySelector("#volumeName").value;
	var aggregate = document.querySelector("#aggregate").value;
	var junctionPath = document.querySelector("#junctionPath").value;
	var size = document.querySelector("#size").value;

	sendCommand(controller, vserver, volumeName, aggregate, junctionPath, size);		
}, false);

// hier die Definition des AUfrufs des Backendcommandss
function sendCommand(controller, vserver, volumeName, aggregate, junctionPath, size) {
    // hier wird die Datenstruktur definiert, die als json ans Backend geschickt wird
	// die Struktur hier muss mit dem Übereinstimmen, was das Backend erwartet.
    // die Basisstruktur muss grundsätzlich wie folgt aussehen:
	/*
	var data = {
	"user": "Ralph",
	"mailFrom": "absender@v3consulting.com",
	"mailTo": [
		"panik@v3consulting.com"
	],
	"command": "create-Volume",
		controller: controller,
	"param": [{ "vserver": blub
	}]     
	*/
	// diese Datenstruktur kann im backend unter $config.local abgerufen werden.
	// zB: $config.local.param ist der param-Teil
	// $user = $config.local.user um den User zu bekommen
	
	var data = {
	"user": "Ralph",
	"mailFrom": "absender@v3consulting.com",
	"mailTo": [
		"panik@v3consulting.com"
	],
	"command": "create-Volume",
		controller: controller,
	"param": [{
		"key": "vserver",
		"value": vserver
	}, {
		"key": "volumeName",
		"value": volumeName
	}, {
		"key": "aggregate",
		"value": aggregate
	}, {
		"key": "junctionPath",
		"value": junctionPath
	}, {
		"key": "size",
		"value": size
	}
	]
};
	// makeRequest startet den Request. Die Rückgabe des Requests wird für asynchrone Requests von handleCommand bearbeitet.
	// bei synchronen Requests braucht man eigene rückgabe-handler statt handleCommand 
	// handleCommand fragt periodisch ab, ob das command schon beendet ist.
	//     wenn das Command bei handleCommand beendet ist, wird die "results"-Sektion per ractive mit dem Ergebnis befüllt
	makeRequest('/command/', data, handleCommand);
}