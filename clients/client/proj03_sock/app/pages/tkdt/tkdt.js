var appModule = require("application");
var view = require("ui/core/view");
var listViewModule = require("ui/list-view");
var scrollViewModule = require("ui/scroll-view");
var frameModule = require("ui/frame");
var observableModule = require("data/observable");
var source = new observableModule.Observable();
var LoadingIndicator = require("nativescript-loading-indicator").LoadingIndicator;
var activityIndicatorModule = require("ui/activity-indicator");
var utils = require("../../shared/utils");
var backend = require("../../shared/backend");
var ai;
// or with TypeScript: 
// import {LoadingIndicator} from "nativescript-loading-indicator"; 

var loader = new LoadingIndicator();

var loaderOptions = {
	message: 'Loading...',
	progress: 0.65,
	android: {
		indeterminate: true,
		cancelable: false,
		max: 100,
		progressNumberFormat: "%1d/%2d",
		progressPercentFormat: 0.53,
		progressStyle: 1,
		secondaryProgress: 1
	},
	ios: {
		details: "Additional detail note!",
		square: false,
		margin: 10,
		dimBackground: true,
		color: "#4B9ED6",
		mode: "" // see iOS specific options below 
	}
};


var iscritti = "";
var jIscritti = [];
var garaid;
var parms;
var datagara;
var lv1;
var page;
var tkdt;
var gara;


exports.onNavBtnTap = function (args) {
	frameModule.topmost().goBack();
	return;

	frameModule.topmost().navigate({
		moduleName: "pages/gara/gara",
		context: garaid

	});


}



exports.pageLoaded = function (args) {
	page = args.object;
	parms = page.navigationContext;
	tkdt = parms.tkdt;
	gara = parms.gara;
	//utils.conslog("gara",JSON.stringify(gara));
	ai = page.getViewById("ai");
	ai.visibility = "collapsed";
	lv1 = page.getViewById("lv1");
	var giorni = [];
	if (tkdt.giorni) giorni = tkdt.giorni;
	//utils.colog("tkdt",JSON.stringify(giorni));
	source.set("giorni", giorni);
	source.set("ngiorni", giorni.length);
	source.set("tkdt", tkdt);
	source.set("busy", false);
	source.set("datagara",gara.data);
	source.set("locationgara",gara.location);
	source.set("titologara",gara.title);
	//lv1.items=tkdt.giorni;
	page.bindingContext = source;
	refresh(function () {

	});
	return;





}



exports.getMedagliereGiorno = function (args) {
	utils.colog(tkdt.giorni.length);
	utils.colog(args.index);
	var giorno = tkdt.giorni[args.index];
	//utils.colog("giorno",JSON.stringify(giorno));
	if (!giorno.id) return;
	source.set("busy", true);
	backend.getMedagliereGiorno(giorno.id, function (data) {

		utils.colog("got medagliere for giorno " + giorno.id);
		source.set("html", data);
		source.set("busy", false);
	})

}


function refresh(callback) {
	source.set("busy", true);

	backend.getTkdt(gara.tkdt_id, function (data) {
		tkdt = data;
		source.set("tkdt", tkdt);
		source.set("giorni", tkdt.giorni);
		//lv1.refresh();
		source.set("busy", false);
		
		if (tkdt.giorni.length > 0) {
			if (tkdt.giorni[0].enabled) {
				utils.conslog("getting medagliere", tkdt.giorni[0].id);
				source.set("busy", true);
				backend.getMedagliereGiorno(tkdt.giorni[0].id, function (mdata) {
					utils.conslog("got medagliere for giorno " + tkdt.giorni[0].id);
					source.set("html", mdata);
					source.set("busy", false);
				})
			}
		} 
		
		if (callback) callback();
	})

}


exports.refresh = refresh;