
var ractive = new Ractive({
  // The `el` option can be a node, an ID, or a CSS selector.
  el: '#container',

  // We could pass in a string, but for the sake of convenience
  // we're passing the ID of the <script> tag above.
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

document.querySelector("#send").addEventListener("click", function(){
	var controller = document.querySelector("#controller").value;
	var vserver = document.querySelector("#vserver").value;
	var volumeName = document.querySelector("#volumeName").value;
	var aggregate = document.querySelector("#aggregate").value;
	var junctionPath = document.querySelector("#junctionPath").value;
	var size = document.querySelector("#size").value;

	sendCommand(controller, vserver, volumeName, aggregate, junctionPath, size);		
}, false);

function sendCommand(controller, vserver, volumeName, aggregate, junctionPath, size) {
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
	makeRequest('/command/', data, handleCommand);
}