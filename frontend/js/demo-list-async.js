
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
	selectedController: ""
  }
});

ractive.on( 'getExportPolicies', function ( event ) {
	getExportPolicies(ractive.get("selectedController"));		
});

function getExportPolicies(controller) {
	var data = {
		user: "Ralph",
		mailFrom: "absender@v3consulting.com",
		mailTo: 
		[
			"panik@v3consulting.com"
		],
		command: "get-ExportPolicies",
		controller: controller
	};
	makeRequest('/command/', data, handleCommand);
}
