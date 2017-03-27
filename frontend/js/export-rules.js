
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

ractive.on( 'send', function ( event ) {
	console.log("event", event.keypath, event.context);
	var controller = document.querySelector("#controller").value;
	console.log(controller);
	getExportRules(controller);
});

ractive.on( 'getExportRules', function ( event ) {
	getExportRules(ractive.get("selectedController"));		
});

//dropdown liste 'controller' füllen'
getControllers(); 

//übergabe von parametern über die aufgerufene url
//start der abfrag mit diesem parameter
var params = extractUrlParameters(window.location.search);      
if (params.controller) {
	ractive.set("selectedController", params.controller);
	getExportRules(params.controller);
}

function getExportRules(controller) {
	var data = {
		user: "Ralph",
		mailFrom: "absender@v3consulting.com",
		mailTo: 
		[
			"panik@v3consulting.com"
		],
		command: "get-ExportRules",
		controller: controller
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
