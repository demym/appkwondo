//var vmModule = require("./main-view-model");
var application = require("application");
var view = require("ui/core/view");
var listViewModule = require("ui/list-view");
var scrollViewModule = require("ui/scroll-view");
//var SocketIO = require('nativescript-socketio');
//var socketIO = new SocketIO("http://tkdr.herokuapp.com");
//require('nativescript-websockets');
/*var mySocket = new WebSocket("ws://tkdr.herokuapp.com", [  "protocol","http" ]);
mySocket.addEventListener('open', function (evt) { console.log("We are Open"); evt.target.send("Hello"); });
mySocket.addEventListener('message', function(evt) { console.log("We got a message: ", evt.data); evt.target.close(); });
mySocket.addEventListener('close', function(evt) { console.log("The Socket was Closed:", evt.code, evt.reason); });
mySocket.addEventListener('error', function(evt) { console.log("The socket had an error", evt.error); });*/
var frameModule = require("ui/frame");
var count=42;



/*socketIO.on("notification",function(data){
	
	console.log(data);
	
});*/

function pageLoaded(args) {
    var page = args.object;
	
    //page.bindingContext = vmModule.mainViewModel;
	var lv1=view.getViewById(page, "lv1");
	lv1.items=[{name: "News"},{name: "Atleti"},{name: "Gare"},{name: "Società"},{name: "Impostazioni"},{name: "Connessioni"},{name: "Logout"},{name:"Chiudi AppKwonDo"},{name:"Chat"}];
		
		
	fetchAtleti(function(data){
		 
		  //application.resources["atleti"] = data;
		  global.atleti=data;
		 
		  //lb1.text=atleti.rows.length+" atleti";
		
	});
	
	
}

function listViewItemTap(args) {
	var index = args.index;
    console.log('Clicked item with index ' + index);
    if (index=="1") frameModule.topmost().navigate("atleti");
	if (index=="2") frameModule.topmost().navigate("gare");
	if (index=="3") frameModule.topmost().navigate("societa");
	if (index=="0") frameModule.topmost().navigate("tabs");
	if (index=="8") frameModule.topmost().navigate("chat");
}

function fetchAtleti(callback) {
	
	fetch(global.rooturl+"/atleti/findall").then(function (response) { return response.json(); }).then(function (r) {
    // Argument (r) is JSON object!
	
	 
	 console.log("atleti rows: "+r.rows.length);
	 
	 if (callback) callback(r);
}, function (e) {
    // Argument (e) is Error!
	alert("Errore: "+e);
	callback(e);
});
}

exports.pageLoaded = pageLoaded;
exports.listViewItemTap = listViewItemTap;

