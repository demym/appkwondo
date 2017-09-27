var view = require("ui/core/view");
var listViewModule = require("ui/list-view");
var scrollViewModule = require("ui/scroll-view");
var frameModule = require("ui/frame");
var observableModule = require("data/observable");

var observableArrayModule = require("data/observable-array");
var source = new observableModule.Observable();
var count = 42;
var atleti = {};

var lv1;



var connections = [];
var conns = new observableArrayModule.ObservableArray(connections);
var page;

var glbservice = require("../../shared/globalservice");
var gs = glbservice.GlobalService;
gs.e.on("auserhasconnected", function (data) {
    //refreshChatStatuses();
    console.log("evento auserhasconnected in connections !!!", JSON.stringify(data));
	fetchConnections();

})
gs.e.on("auserhasdisconnected", function (data) {
    //refreshChatStatuses();
    console.log("evento auserhasdisconnected in connections !!!", JSON.stringify(data));
	fetchConnections();

})



function pageLoaded(args) {
	page = args.object;
	source.set("loading",false);
	source.set("conncount",0);
	page.bindingContext=source;
	

	lv1 = view.getViewById(page, "lv1");
	fetchConnections(function (data) {
		

	})


}

function listViewItemTap(args) {
	var index = args.index;
	console.log('Clicked item with index ' + index);

}

function refetch(args){
	source.set("loading",true);
	fetchConnections(function(){
		source.set("loading",false);
	})
}

function fetchConnections(callback) {
	console.log("fetchconnections")
	fetch(global.rooturl + "/socketusers").then(function (response) {
		return response.json();
	}).then(function (r) {
		// Argument (r) is JSON object!
		//alert("rows: "+r.rows.length)
		console.log(JSON.stringify(r));
		source.set("connections",r);
		source.set("conncount",r.length);
		lv1.items=r;
		lv1.refresh();


		if (callback) callback(r);
	}, function (e) {
		// Argument (e) is Error!
		alert("Errore: " + e);
	});


}


function onNavBtnTap(args) {

	frameModule.topmost().navigate({
		moduleName: "pages/homepage/homepage",
		context: {}

	});


}

exports.onNavBtnTap = onNavBtnTap;



exports.pageLoaded = pageLoaded;
exports.listViewItemTap = listViewItemTap;
exports.refetch=refetch;