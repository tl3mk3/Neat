// ####################
// ## INITIALIZATION ##
// ####################

var ractive = new Ractive({
  // The `el` option can be a node, an ID, or a CSS selector.
  // This option determines where the created HTML code will be placed in list-volumes.html.
  // In this case the code will be placed in a HTLM tag with the ID 'container'.
  el: '#container',

  // We could pass in a string, but for the sake of convenience
  // we're passing the ID of the <script> tag.
  // This option determines where the HTML code for 'el' above is created.
  // In this case it is created inside a <script> tag with the ID 'template' in list-volumes.html.
  template: '#template',

  // Here, we're defining the data structure
  // which corresponds to the ractive-template parts.
  // 
  // e.g.
  // siteConf refers to the array siteConfData from common.js.
  // Common.js in turn is loaded in list-volumes.html.
  // The construct {{siteConf.siteName}} would be dereferenced with the value
  // of the key 'siteName' within siteConf. Usage of such a construct in list-volumes.html
  // is only possible if it is defined here.
  //
  // {{#siteConf.pages}} ... {{/siteConf.pages}} is another possible construct
  // that would iterate through the array 'data->siteConf->pages'. 
  //   
  data: {
	siteConf: siteConfData,
	results: [],
	controllers: [],
	selectedController: ""
  }
});


// #############################
// ## DEFINITION OF LISTENERS ##
// #############################

// Ractive is listening for the event changeSisStatus and executes the
// defined function when triggered in list-volumes.html
ractive.on( 'changeSisStatus', function ( event ) {
	console.log("event", event.keypath, event.context);
	var controller = ractive.get("selectedController");
	var debug = ractive.get("debug");
	var vserver = event.context.Vserver;
	var volume = event.context.Name;
	var state = event.context.sis;
	// Executes the function changeSisStatus which is defined below
	changeSisStatus(event.keypath, controller, vserver, volume, state, debug);
});

// Ractive is listening for the event listVolumes and executes the
// defined function when triggered in list-volumes.html
ractive.on( 'listVolumes', function ( event ) {
	listVolumes(ractive.get("selectedController"));		
});


// ##########
// ## MAIN ##
// ##########

// Executes the function getControllers which is defined below
getControllers(); 

// Checks if the URL parameters include the name of a controller
// If yes, executes the function listVolumes which is defined below.
// These lines are only relevant if list-volumes.html is directly called for a specific controller via GET.
// Otherwise the listener above is handling to call the function listVolumes. 
// Example for expected syntax:
// http://localhost:8080/list-volumes.html?controller=Trinidad
var params = extractUrlParameters(window.location.search);      
if (params.controller) {
	ractive.set("selectedController", params.controller);
	listVolumes(params.controller);
}


// #############################
// ## DEFINITION OF FUNCTIONS ##
// #############################

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