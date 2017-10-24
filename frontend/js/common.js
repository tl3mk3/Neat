// This array is referenced during initialization of Ractive in all other .js files
// and defines some configurations of the main web site.
var siteConfData = {
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


// This function is used to handle asynchronous requests. It checks periodically
// if the request has been finished. 
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


// This function is used by handleCommand and displays the result after the request
// finished successfully.
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


// This function is used by handleResult and displays a result.
function displayResult(result) {
	ractive.set("results",result);
	//for debug: insert json in <pre id=result>
	//document.querySelector("#result").textContent = JSON.stringify(result, undefined, 2);
}


// This function is called from all other .js files and executes the request.
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


// This function is called from other .js files if GET requests need to be parsed.
// The function creates an array "params" that can be used to access the parsed data.
// 
// TL: Hier fehlt ein Beispiel der Datenstruktur, die verarbeitet wird
//
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

