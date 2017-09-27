var appModule = require("application");
var vmModule = require("./atleti-view-model");
var view = require("ui/core/view");
var listViewModule = require("ui/list-view");
var scrollViewModule = require("ui/scroll-view");
var LabelModule = require("ui/label");
var frameModule = require("ui/frame");

var observableModule = require("data/observable");
var source = new observableModule.Observable();

var socket = require("../../shared/socket");
var backend = require("../../shared/backend");
var utils = require("../../shared/utils");
var file = require("../../shared/file");

var count=42;
var atleti={};
var lb1;
var lv1;
var page;





function pageLoaded(args) {
    page = args.object;
    
	lv1=view.getViewById(page, "lv1");
	console.log("lv1: "+lv1);
	lb1=view.getViewById(page,"lb1");
	//lb1.text="Caricamento in corso...";
	appModule.resources["getCategoria"] = getCategoria;
	appModule.resources["formatName"] = formatName;
	utils.setLoading(false)
	page.bindingContext = source;
	refreshAll(function(data){
	//fetchAtleti(function(data){
		
		
	});
}

refetch = function () {
    source.set("loading", true);
	utils.setLoading(true);
    backend.syncAtleti(function () {
		utils.colog("synched atleti")
        refreshAll(function () {

            utils.colog("refetch complete");
            source.set("loading", false);
			utils.setLoading(false);
        });
    })

}

var getCategoria=function(doc){

	var retvalue=doc.sesso.toUpperCase()+" - "+global.getCategoria(doc.datanascita).toUpperCase() ;
	return retvalue;
}

var formatName=function(doc){
	retvalue=doc.cognome.toUpperCase()+" "+doc.nome.toUpperCase();
	return retvalue;

}



function refreshAll(callback){


    file.readJsonFile("atleti.json", function (data) {

		global.atleti=data;
		  console.log("binding page");
		  console.log("atleti "+global.atleti.rows.length)
		  //var lv1=view.getViewById(page, "lv1");
		   lv1.items = global.atleti.rows;
		  //appModule.resources["atleti"] = atleti;
		  
		 lb1=page.getViewById("lb1");
		  console.log("lb1",lb1);
		  lb1.text=global.atleti.rows.length+" atleti";
		  //console.log("suca")

		  if (callback) callback();

	});
}

function onNavBtnTap(args){
	
	frameModule.topmost().navigate({
		moduleName: "pages/homepage/homepage",
		context: {}
		
	});
	
	
}


function listViewItemTap(args) {
	var index = args.index;
    console.log('Clicked item with index ' + index);
	
}
function fetchAtleti(callback) {
	
	fetch("http://tkdr.herokuapp.com/atleti/findall").then(function (response) { return response.json(); }).then(function (r) {
    // Argument (r) is JSON object!
	 //alert("rows: "+r.rows.length)
	 atleti=r;
	 if (callback) callback(r);
}, function (e) {
    // Argument (e) is Error!
	alert("Errore: "+e);
	callback(e);
});
	
	
}


exports.pageLoaded = pageLoaded;
exports.listViewItemTap = listViewItemTap;
exports.onNavBtnTap=onNavBtnTap;
exports.refetch=refetch;