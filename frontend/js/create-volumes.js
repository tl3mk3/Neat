
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
	var nameqt1 = document.querySelector("#nameqt1").value;
	var nameqt2 = document.querySelector("#nameqt2").value;
	var nameqt3 = document.querySelector("#nameqt3").value;
	var nameqt4 = document.querySelector("#nameqt4").value;
	var nameqt5 = document.querySelector("#nameqt5").value;
	var ReadOnlySecurityFlavor1 = document.querySelector("#ReadOnlySecurityFlavor1").value;
	var ReadOnlySecurityFlavor2 = document.querySelector("#ReadOnlySecurityFlavor2").value;
	var ReadOnlySecurityFlavor3 = document.querySelector("#ReadOnlySecurityFlavor3").value;
	var ReadOnlySecurityFlavor4 = document.querySelector("#ReadOnlySecurityFlavor4").value;
	var ReadOnlySecurityFlavor5 = document.querySelector("#ReadOnlySecurityFlavor5").value;
	var ReadWriteSecurityFlavor1 = document.querySelector("#ReadWriteSecurityFlavor1").value;
	var ReadWriteSecurityFlavor2 = document.querySelector("#ReadWriteSecurityFlavor2").value;
	var ReadWriteSecurityFlavor3 = document.querySelector("#ReadWriteSecurityFlavor3").value;
	var ReadWriteSecurityFlavor4 = document.querySelector("#ReadWriteSecurityFlavor4").value;
	var ReadWriteSecurityFlavor5 = document.querySelector("#ReadWriteSecurityFlavor5").value;
	var debug = ractive.get("debug");
	sendCommand(controller, vserver, volumeName, aggregate, junctionPath, size, nameqt1, nameqt2, nameqt3, nameqt4, nameqt5, ReadOnlySecurityFlavor1, ReadOnlySecurityFlavor2, ReadOnlySecurityFlavor3, ReadOnlySecurityFlavor4, ReadOnlySecurityFlavor5, ReadWriteSecurityFlavor1, ReadWriteSecurityFlavor2, ReadWriteSecurityFlavor3, ReadWriteSecurityFlavor4, ReadWriteSecurityFlavor5, debug);		
}, false);

function sendCommand(controller, vserver, volumeName, aggregate, junctionPath, size, nameqt1, nameqt2, nameqt3, nameqt4, nameqt5, ReadOnlySecurityFlavor1, ReadOnlySecurityFlavor2, ReadOnlySecurityFlavor3, ReadOnlySecurityFlavor4, ReadOnlySecurityFlavor5, ReadWriteSecurityFlavor1, ReadWriteSecurityFlavor2, ReadWriteSecurityFlavor3, ReadWriteSecurityFlavor4, ReadWriteSecurityFlavor5, debug) {
	var data = {
	"user": "Ralph",
	"mailFrom": "absender@v3consulting.com",
	"mailTo": [
		"panik@v3consulting.com"
	],
	"command": "create-VolumeWithEverything",
	"controller": controller,
	"debug": debug,
	"param": {
		"vserver": vserver,
		"volumeName": volumeName,
		"aggregate": aggregate,
		"junctionPath": junctionPath,
		"size": size,
		"qtrees":[{
			"name": nameqt1,
			"ReadOnlySecurityFlavor": ReadOnlySecurityFlavor1,
			"ReadWriteSecurityFlavor": ReadWriteSecurityFlavor1
		}, {
			"name": nameqt2,
			"ReadOnlySecurityFlavor": ReadOnlySecurityFlavor2,
			"ReadWriteSecurityFlavor": ReadWriteSecurityFlavor2
		}, {
			"name": nameqt3,
			"ReadOnlySecurityFlavor": ReadOnlySecurityFlavor3,
			"ReadWriteSecurityFlavor": ReadWriteSecurityFlavor3
		}, {
			"name": nameqt4,
			"ReadOnlySecurityFlavor": ReadOnlySecurityFlavor4,
			"ReadWriteSecurityFlavor": ReadWriteSecurityFlavor4
		}, {
			"name": nameqt5,
			"ReadOnlySecurityFlavor": ReadOnlySecurityFlavor5,
			"ReadWriteSecurityFlavor": ReadWriteSecurityFlavor5
		}]
	}
};
	makeRequest('/command/', data, handleCommand);
}