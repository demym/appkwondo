var view = require("ui/core/view");
var listViewModule = require("ui/list-view");
var scrollViewModule = require("ui/scroll-view");
var frameModule = require("ui/frame");
var observableModule = require("data/observable");
var utils = require("../../shared/utils");
var backend = require("../../shared/backend");
var glbservice = require("../../shared/globalservice");

var observableArrayModule = require("data/observable-array");
var source = new observableModule.Observable();
//var source=new observableArrayModule.ObservableArray();
var count = 42;
var atleti = {};

var lv1;

var connections = [];
var conns = new observableArrayModule.ObservableArray(connections);
var page;
function pageLoaded(args) {
	page = args.object;
	source.set("ranking",[]);
	source.set("loading",false);
	source.set("sortfield","ranking_tkdr");
	page.bindingContext=source;

	

	lv1 = view.getViewById(page, "lv1");
	fetchRanking(function (data) {
		console.log("ranking data",JSON.stringify(data));

	})


}

function listViewItemTap(args) {
	var index = args.index;
	var r=source.get("ranking");

	var item=r[index].doc;

	item.showmedals=!item.showmedals;
	console.log(JSON.stringify(item));
	source.set("ranking",r);



	console.log('Clicked item with index ' + index);

}

function fetchRanking(callback) {
	console.log("fetchconnections")
	source.set("loading",true);
	backend.getRanking(function(data){
		var sortfield=source.get("sortfield");
		data.rows.sort(function(a,b){
			var a1=a.doc[sortfield];
			var b1=b.doc[sortfield];
			if (a1>b1) return -1;
			if (a1<b1) return 1;
			return 0;
		})
		data.rows.forEach(function(item,idx){
			item.doc.position=parseInt(idx,10)+1;
			item.doc.showmedals=false;
		})
		
		
		source.set("ranking",data.rows);
		source.set("loading",false);
		if (callback) callback(data);
	});
	


}


function onNavBtnTap(args) {

	frameModule.topmost().navigate({
		moduleName: "pages/homepage/homepage",
		context: {}

	});


}

function tapOrdina(args){

	var dialogs = require("ui/dialogs");
dialogs.action({
    message: "Ordinare per",
    cancelButtonText: "Annulla",
    actions: ["Punti", "Gare","Match","Ori","Argenti","Bronzi"]
}).then(function (result) {
    console.log("Dialog result: " + result);
	var campo="none";
	if (result=="Punti") campo="ranking_tkdr";
	if (result=="Gare") campo="garedisputate";
	if (result=="Match") campo="matchdisputati";
	if (result=="Ori") campo="ori";
	if (result=="Argenti") campo="argenti";
	if (result=="Bronzi") campo="bronzi";

	if (campo!="none"){

		var r=source.get("ranking");
		source.set("sortfield",campo);
		/*
		r.sort(function(a,b){
			var a1=a.doc[campo];
			var b1=b.doc[campo];
			if (a1>b1) return -1;
			if (a1<b1) return 1;
			return 0;
		})
		r.forEach(function(item,idx){
			item.doc.position=parseInt(idx,10)+1;
		})
		//console.log("r",JSON.stringify(r));
		source.set("ranking",r);
		
		lv1.refresh();
		*/
		fetchRanking(function(data){
			console.log("fetch done");
		})
	
		



	}

});
}

exports.onNavBtnTap = onNavBtnTap;



exports.pageLoaded = pageLoaded;
exports.listViewItemTap = listViewItemTap;
exports.tapOrdina=tapOrdina;
exports.fetchRanking=fetchRanking;