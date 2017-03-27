var siteConf = {
	siteName:"NEat",
	pages:[{
		title: "Controller List",
		url: "list-controllers.html"
	},{
		title: "Volume List",
		url: "list-volumes.html"
	},{
		title: "Export Policies",
		url: "export-policies.html"
	},{
		title: "Export Rules",
		url: "export-rules.html"
	},]
}

function handleCommand(json){
	console.log(json);
	if (!json.SUCCESS) { 
		console.log("handleCommand error", json);
		return;
	}
	console.log("handleCommand success", json);
	var id = json.SUCCESS;
	function repeated() {
		makeRequest('/result/', id, function(json) {
			handleResult(json, repeated);
		});
	}
	repeated();
}
function handleResult(json, again) {
	console.log(json);
	if (!json.SUCCESS) { 
		console.log("handleResult error", json);
		return;
	}
	console.log("handleResult success", json);
	var success = json.SUCCESS;
	if (success.NotReady) {
		console.log("not ready yet");
		setTimeout(again, 1000);
		return;
	}
	var finished = success.Finished;
	console.log("handleResult finished", finished);
	displayResult(finished);
}

function displayResult(result) {
	ractive.set("results",result);
	//for debug: insert json in <pre id=result>
	//document.querySelector("#result").textContent = JSON.stringify(result, undefined, 2);
}

function makeRequest(url,data,continuation) {
    var httpRequest = new XMLHttpRequest();
	httpRequest.onreadystatechange = function() {
		if (httpRequest.readyState === XMLHttpRequest.DONE) {
			console.log(httpRequest.status);
			console.log(httpRequest.responseText);
			if (httpRequest.status === 200) {
				continuation(JSON.parse(httpRequest.responseText));
			}	
			/*
			else {
				console.log('There was a problem with the request.');
			}*/
			
		}
	};
	httpRequest.open('POST', url);
	httpRequest.setRequestHeader('Content-Type', 'application/json');
	httpRequest.send(JSON.stringify(data));	
}

function extractUrlParameters(searchString) {
  var parse = function(params, pairs) {
    var pair = pairs[0];
    var parts = pair.split('=');
    var key = decodeURIComponent(parts[0]);
    var value = decodeURIComponent(parts.slice(1).join('='));

    // handle multiple parameters of the same name
    if (typeof params[key] === "undefined") {
      params[key] = value;
    } else {
      params[key] = [].concat(params[key], value);
    }

    return pairs.length == 1 ? params : parse(params, pairs.slice(1));
  };
  return searchString.length == 0 ? {} : parse({}, searchString.substr(1).split('&')); // get rid of leading ?
}

