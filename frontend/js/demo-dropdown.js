
var ractive = new Ractive({
  // The `el` option can be a node, an ID, or a CSS selector.
  el: '#container',

  // We could pass in a string, but for the sake of convenience
  // we're passing the ID of the <script> tag above.
  template: '#template',

  // Here, we're passing in some initial data
  data: {
	siteConf: siteConf,
	controllers: []
  }
});

getControllers(); 

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