
var ractive = new Ractive({
  // The `el` option can be a node, an ID, or a CSS selector.
  el: '#container',

  // We could pass in a string, but for the sake of convenience
  // we're passing the ID of the <script> tag above.
  template: '#template',
  data: {
	siteConf: siteConf,
	//results: [],
	controllers: []
  }
});

getControllerList();	

function getControllerList() {
	var data = {
		user: "Ralph",
		mailFrom: "absender@v3consulting.com",
		mailTo: 
		[
			"panik@v3consulting.com"
		],
		command: "get-ControllerList"
	};
	makeRequest('/command/', data, function(json){
		ractive.set("controllers", json.SUCCESS);
	});
}