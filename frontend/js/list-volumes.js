
var ractive = new Ractive({
  // The `el` option can be a node, an ID, or a CSS selector.
  el: '#container',

  // We could pass in a string, but for the sake of convenience
  // we're passing the ID of the <script> tag above.
  template: '#template',

  // Here, we're passing in some initial data
  data: {
	siteConf: siteConf,
	results: [],
	controllers: [],
	selectedController: ""
  }
});

ractive.on( 'changeSisStatus', function ( event ) {
	console.log("event", event.keypath, event.context);
	var controller = ractive.get("selectedController");
	var debug = ractive.get("debug");
	var vserver = event.context.Vserver;
	var volume = event.context.Name;
	var state = event.context.sis;
	changeSisStatus(event.keypath, controller, vserver, volume, state, debug);
});

ractive.on( 'listVolumes', function ( event ) {
	listVolumes(ractive.get("selectedController"));		
});

//dropdown liste 'controller' füllen'
getControllers(); 

//übergabe von parametern über die aufgerufene url
//start der abfrag mit diesem parameter
var params = extractUrlParameters(window.location.search);      
if (params.controller) {
	ractive.set("selectedController", params.controller);
	listVolumes(params.controller);
}

function changeSisStatus(keypath, controller, vserver, volume, state, debug) {
	var data = {
		user: "Ralph",
		mailFrom: "absender@v3consulting.com",
		mailTo: 
		[
			"panik@v3consulting.com"
		],
		command: "change-dedupe",
		controller: controller,
		debug: debug,
		param: {
			"vserver": vserver,
			"volume": volume,
			"state": state
		}
	};
	console.log(data);
	makeRequest('/command/', data, handleChangeSIS.bind(null, keypath));
}
function handleChangeSIS(keypath, json){
	console.log(keypath, json);
	ractive.set(keypath + ".sis", json.SUCCESS);
}

function listVolumes(controller) {
	var data = {
		user: "Ralph",
		mailFrom: "absender@v3consulting.com",
		mailTo: 
		[
			"panik@v3consulting.com"
		],
		command: "list-volumes",
		controller: controller,
		param: []
	};
	makeRequest('/command/', data, handleCommand);
}

function getControllers() {
	var data = {
		user: "Ralph",
		mailFrom: "absender@v3consulting.com",
		mailTo: 
		[
			"panik@v3consulting.com"
		],
		command: "get-ControllerList"
	};
	makeRequest('/command/', data, setController);
}

function setController(json){
	console.log(json);
	ractive.set("controllers", json.SUCCESS);
}