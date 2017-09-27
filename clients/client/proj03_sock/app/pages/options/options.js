
var view = require("ui/core/view");
var listViewModule = require("ui/list-view");
var scrollViewModule = require("ui/scroll-view");
var frameModule = require("ui/frame");

var appSettings = require("application-settings");
var observableModule = require("data/observable");
var observableArrayModule = require("data/observable-array");
var utils = require("../../shared/utils");

var count=42;
var atleti={};

var source = new observableModule.Observable();
var options=new observableArrayModule.ObservableArray();



/*
var options=[{
	name: "notifications",
	text: "Notifiche",
	value: false
},
{
	name: "voice",
	text: "Output vocale",
	value: false	
},{
	name: "sound",
	text: "Suoni",
	value: false

}]*/

function pageLoaded(args) {
    var page = args.object;
  
	var lv1=view.getViewById(page, "lv1");
	//lv1.items=options;

	options=[];
	var opts=utils.getOptions();
	opts.forEach(function(item,idx){

		var el=new observableModule.Observable(item);
		el.value = appSettings.getBoolean(item.name, false);
		options.push(el);



	})

	source.set("options",options);
	page.bindingContext=source;
}

function listViewItemTap(args) {
	var index = args.index;
    console.log('Clicked item with index ' + index);
	
}
function fetchAtleti(callback) {
	fetch(global.rooturl+"/societa/findall?societaid="+global.mysocieta.id).then(function (response) { return response.json(); }).then(function (r) {
    // Argument (r) is JSON object!
	 //alert("rows: "+r.rows.length)
	 atleti=r;
	 if (callback) callback();
}, function (e) {
    // Argument (e) is Error!
	alert("Errore: "+e);
});
	
	
}


function applySettings(args){

	var opts=source.get("options");

	utils.saveOptions(opts);

	/*opts.forEach(function(item,idx){
		console.log(JSON.stringify(item));
		appSettings.setBoolean(item.name, item.value);
	})*/


	frameModule.topmost().goBack();
	utils.toast("Impostazioni salvate");
	

}

function onNavBtnTap(args){
	
	frameModule.topmost().navigate({
		moduleName: "pages/homepage/homepage",
		context: {}
		
	});
	
	
}

exports.onNavBtnTap=onNavBtnTap;



exports.pageLoaded = pageLoaded;
exports.listViewItemTap = listViewItemTap;
exports.applySettings=applySettings;