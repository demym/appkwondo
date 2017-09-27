var appModule = require("application");
//var vmModule = require("./main-view-model");
var view = require("ui/core/view");
var listViewModule = require("ui/list-view");
var scrollViewModule = require("ui/scroll-view");
var frameModule = require("ui/frame");
var observableModule = require("data/observable");
var source = new observableModule.Observable();
var gestures = require("ui/gestures");

var socket = require("../../shared/socket");
var backend = require("../../shared/backend");
var utils = require("../../shared/utils");
var file = require("../../shared/file");

var count = 42;
var gare = {};
var page;
var ai;
var lv1;
var countlabel;


function isLoading() {
	ai.show();
	ai.isLoading = true;
}

exports.isLoading = isLoading;

var getMinchia = function (value) {
	var result = value.toUpperCase();
	return result;
}

var getIscrittiLength = function (value) {
	var result = 0;
	if (value.trim() != "") result = value.split(",").length;
	result += " iscritti";
	return result;
}

var getDatiGara = function (doc) {

	var iscr = getIscrittiLength(doc.iscritti);
	var retvalue = iscr + " - ORI: " + doc.ori + " ARG: " + doc.argenti + " BRO: " + doc.bronzi;
	return retvalue;


}



function onNavBtnTap(args) {

	frameModule.topmost().navigate({
		moduleName: "pages/homepage/homepage",
		context: {}

	});


}



function pageLoaded(args) {
	page = args.object;
	appModule.resources["getMinchia"] = getMinchia;
	appModule.resources["getIscrittiLength"] = getIscrittiLength;
	appModule.resources["getDatiGara"] = getDatiGara;
	//source.fanculo="fanculo";
	page.bindingContext = source;
	console.log("binding page");
	lv1 = view.getViewById(page, "lv1");
	ai = page.getViewById("ai");
	countlabel = view.getViewById(page, "count");

	lv1.on(listViewModule.ListView.itemLoadingEvent, function (args) {
		//console.log("loading");
		var stack = args.view;
		/*if (!args.view) {
			// Create label if it is not already created.
			args.view = new labelModule.Label();
		}*/
		//var stack=args.getViewById("stack");
		stack.on(gestures.GestureTypes.longpress, function (args) {
			console.log("long press" + args);
		});
	});

	//setLoading(true);

	refreshGare(function () {

		console.log("refreshed");
		//setLoading(false);	

	});





}

function refreshAll(callback) {


	file.readJsonFile("gare.json", function (data) {

		//utils.colog(JSON.stringify(data));

		callback(data);

	});
}

function setLoading(b) {
	var aiwidth = 20;
	var aiheight = 20;
	//isLoading=b;
	console.log("setLoading " + b);
	ai.busy = b;
	if (ai.busy) {
		ai.width = aiwidth;
		ai.height = aiheight;
	} else {
		ai.width = 0;
		ai.height = 0;
		//ai.hide();
	}
}




function refreshGare(callback) {
	//global.loaderShow();
	setLoading(true);

	refreshAll(function (data) {
		gare = data;
		//fetchGare(function(){
		setLoading(false);
		console.log("gare " + gare.rows.length)

		//var lv1=view.getViewById(page, "lv1");
		//var count=view.getViewById(page, "count");
		lv1.items = gare.rows;
		countlabel.text = gare.rows.length + " gare";
		//global.loaderHide();
		if (callback) callback();


	});

}

function gareTap(args) {
	var index = args.index;
	console.log('Clicked item with index ' + index);
	var gara = gare.rows[index];
	console.log(gara.doc.title + " - " + gara.doc.id);

	/*backend.syncGara(gara.doc.id, function (data) {
 



		frameModule.topmost().navigate({
			moduleName: "pages/gara/gara",
			context: gara.doc.id

		});

	})*/

	global.garafilters={};
	frameModule.topmost().navigate({
			moduleName: "pages/gara/gara",
			context: {
				garaid: gara.doc.id,
				refresh: true,
				refreshfilters: true,
				caller: "gare"
			}

		});



}
function fetchGare(callback) {
	fetch(global.rooturl + "/gare/findall").then(function (response) { return response.json(); }).then(function (r) {
		// Argument (r) is JSON object!
		//alert("rows: "+r.rows.length)
		gare = r;
		if (callback) callback();
	}, function (e) {
		// Argument (e) is Error!
		alert("Errore: " + e);
	});


}

refetch = function () {
	source.set("loading", true);
	setLoading(true);
	backend.syncGare(function () {
		refreshGare(function () {

			utils.colog("refetch complete");
			source.set("loading", false);
			setLoading(false);
		});
	})

}




exports.onNavBtnTap = onNavBtnTap;
exports.pageLoaded = pageLoaded;
exports.gareTap = gareTap;
exports.refreshGare = refreshGare;
exports.refetch = refetch;