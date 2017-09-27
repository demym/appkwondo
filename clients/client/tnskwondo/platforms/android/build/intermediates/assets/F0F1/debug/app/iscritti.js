var appModule = require("application");
var vmModule = require("./main-view-model");
var view = require("ui/core/view");
var listViewModule = require("ui/list-view");
var scrollViewModule = require("ui/scroll-view");
var frameModule = require("ui/frame");
var observableModule = require("data/observable");
var source = new observableModule.Observable();
var parms;

var iscritti="";
var jIscritti=[];




exports.onNavBtnTap=function(args){
	
	frameModule.topmost().navigate({
		moduleName: "gara",
		context: parms.gara.gara.rows[0].doc.id
		
	});
	
	
}



exports.pageLoaded=function(args) {
    var page = args.object;
    parms=page.navigationContext;
    iscritti=parms.iscritti;
	alert(parms.gara.gara.rows[0].doc.id);
    console.log(iscritti);
    
	//source.fanculo="fanculo";
	//page.bindingContext = source;
	//console.log("binding page");
	var lv1=view.getViewById(page, "lv1");
    var arr=iscritti.split(",");
	
	if (iscritti.trim()=="") arr=[];
	
	jIscritti=[];
	for (var i=0; i<arr.length; i++){
		
		var atl=global.getAtletaById(arr[i]);
		
		var newel={
			atletaid: arr[i],
			atletaname: atl.cognome+" "+atl.nome
		}
		
		jIscritti.push(newel)
		
		
	}
	
	
    lv1.items=jIscritti;



}




