
var ractive = new Ractive({
  // The `el` option can be a node, an ID, or a CSS selector.
  el: '#container',

  // We could pass in a string, but for the sake of convenience
  // we're passing the ID of the <script> tag above.
  template: '#template',

  // Here, we're passing in some initial data
  data: {
	uebergabewert: extractUrlParameters(window.location.search)
  }
});

//übergabe von parametern über die aufgerufene url
//start der abfrag mit diesem parameter
var params = extractUrlParameters(window.location.search);     
 
if (params.Feld1) {
	XXX = params.Feld1 + " bearbeiteter Wert!"
	ractive.set("tester", XXX);
}
