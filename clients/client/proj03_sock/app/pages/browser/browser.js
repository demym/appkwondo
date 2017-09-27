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
var url;
var title="Browser";
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
	
	url=parms.url;
	title=parms.title;
	source.set("busy",true);
	source.set("title",title);
	page.bindingContext = source;
	backend.getData(url, function (data) {
						source.set("busy",false)
						//data=data.replace("<table ","<table border=1")
						source.set("html", data);
	 					
					})
	

	


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
	source.set("busy",true);
	backend.getData(url, function (data) {
						source.set("busy",false)
						
						source.set("html", data);
	 					
					})

}


exports.refresh = refresh;