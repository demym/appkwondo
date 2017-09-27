var appModule = require("application");
var dom = require("nativescript-dom");
//var vmModule = require("./main-view-model");
//var vmModule = require("./gara-view-model");
var view = require("ui/core/view");
var listViewModule = require("ui/list-view");
var scrollViewModule = require("ui/scroll-view");
var tabViewModule = require("ui/tab-view");
var frameModule = require("ui/frame");
var segmentedBarModule = require("ui/segmented-bar");
var gestures = require("ui/gestures");
var labelModule = require("ui/label");
var repeaterModule = require("ui/repeater");
var observableArrayModule = require("data/observable-array");
//var observable = require("data/observable");
var observableModule = require("data/observable");
var activityIndicatorModule = require("ui/activity-indicator");
var buttonModule = require("ui/button");
var platform = require("platform")

var socket = require("../../shared/socket");
var backend = require("../../shared/backend");
var utils = require("../../shared/utils");
var file = require("../../shared/file");
var glbservice = require("../../shared/globalservice");
var realtimeservice = require("../../shared/realtimeservice");

var rtservice = realtimeservice.RealtimeService;

var count = 42;
var gara;
var tkdt;
var matchesbyprog = {};
var matchesbyatleta = {};
var cronaca = {};
var page;
var lvprog;
var lvatleta;
var lvcronaca;
var sbprog;
var fetched = false;
var array;
var garatitle;
var garalocationdata;
var garalocation;
var barsindex = 0;
var barselectedIndex = new observableModule.Observable(barsindex);
var garaid;
var garadata;
var ai;
var isLoading = false;
var source = new observableModule.Observable();
var pokemon = ["Bulbasaur", "Charmander", "Squirtle"];
var filters = global.garafilters;
var filteredresults=false;

var displaymbp = {
	rows:[]
};
var displaympa = {
	rows:[]
};

var gs = glbservice.GlobalService;

gs.e.on("sockmsg", function (ev) {
	console.log("evento sockmsg in gara !!!", JSON.stringify(ev));
	var data = ev.object;

	var tipo = data.type;

	if (tipo == "notification") {


		var currpage = frameModule.topmost().currentPage;
		console.log("currentpage", currpage);
		if (data.updategara) {
			if (data.updategara == "yes") refreshGara();
		}


		return;
	}

	if (tipo == "refreshgara") {
		console.log("received refreshgara");
		return;
	}

	//utils.colog("rtservice rtarray",JSON.stringify(rtservice.rtarray));

})

gs.e.on("chatmsg", function (ev) {
	source.set("unreadchat", gs.unreadchat.length);

});

barselectedIndex.addEventListener(observableModule.Observable.propertyChangeEvent, function (x) {
	alert(x);
});

var model = {
	medaglie: {
		ori: "4",
		argenti: "3",
		bronzi: "5"
	}
}

var navigated = false;


function pageLoaded(args) {

	console.log("pageloaded gara, navigated ", navigated);

	page = args.object;
	
	var navigationContext = page.navigationContext;
	var refreshfilters=false;
	var caller="";
	if (navigationContext.caller) caller=navigationContext.caller;
	if (navigationContext.refreshfilters) refreshfilters=navigationContext.refreshfilters;
	if (caller!="gare") refreshfilters=false;
	console.log("context", JSON.stringify(navigationContext));
	
	source.set("ori", "0");
	source.set("argenti", "0");
	source.set("bronzi", "0");
	source.set("pokemon", pokemon);
	page.bindingContext = source;
	var labels = page.getElementsByTagName('Label');
	labels.forEach(function (item, i) {
		var campo = labels[i];
		//console.log("item",JSON.stringify(item));
		/*var labelBindingOptions={

                sourceProperty: "model." + p,
                targetProperty: "text",
                twoWay: true

		}*/
		//campo.bind(textFieldBindingOptions, source);
	})
	// Bind the busy property of the indicator to the isLoading property of the image

	garaid = navigationContext.garaid;
	console.log("refreshGara ", garaid);
	if (!garaid) {
		garaid = glbservice.currentgaraid;
		utils.colog("using garaid from glbservice.garaid");
	}
	glbservice.currentgaraid = garaid;
	console.log("garaid: " + garaid);
	appModule.resources["getMatchesStyle"] = getMatchesStyle;
	appModule.resources["getMatchStyle"] = getMatchStyle;
	var lv1 = view.getViewById(page, "lvx");

	/*
	global.socket.on("notification", function (data) {
		console.log("global.socket.notification in gara " + JSON.stringify(data));
		var currpage = frameModule.topmost().currentPage;
		console.log("currentpage", currpage);
		if (data.updategara) {
			if (data.updategara == "yes") refreshGara();
		}
	})
	*/


	/*
	global.socket.on("refreshgara", function (data) {
		console.log("received refreshgara");
		console.log(data);


	});
	*/

	ai = page.getViewById("ai");
	garatitle = view.getViewById(page, "garatitle");
	garalocation = view.getViewById(page, "garalocation");
	garalocationdata = view.getViewById(page, "garalocationdata");
	lvprog = view.getViewById(page, "lvprog");
	lvatleta = view.getViewById(page, "lvatleta");
	lvcronaca = view.getViewById(page, "lvcronaca");
	/*
	if (refreshfilters){
		if (String(refreshfilters)=="true"){
			global.garafilters={};
			filters=global.garafilters;
			//navigated=false;
		}
	}
	*/
	filters=global.garafilters;
	if (navigationContext.refresh) {
		if (String(navigationContext.refresh) == "true") {
			refreshGara(function () {

			});

		}
	}

	return;
	

}


function gotoChat() {
	frameModule.topmost().navigate({
		moduleName: "pages/chat/chat"
	});

}

exports.gotoRtConsole=function() {
	frameModule.topmost().navigate({
		moduleName: "pages/rtconsole/rtconsole"
	});

}

function tapMedals(args) {
	var done = false;
	if (model.gara.rows[0].doc.tkdt) {
		if (model.gara.rows[0].doc.tkdt.giorni) {
			if (model.gara.rows[0].doc.tkdt.giorni.length > 0) {
				if (model.gara.rows[0].doc.tkdt.giorni[0].id) {
					var tkdtid = model.gara.rows[0].doc.tkdt.giorni[0].id;
					done = true;
					console.log("tapped medals", tkdtid);
					var url = global.rooturl + "/tkdt/medagliereglobale/" + tkdtid;
					//source.set("busy",true)
					var ret = {
						url: url,
						title: "Medagliere Globale"
					}
					frameModule.topmost().navigate({
						moduleName: "pages/browser/browser",
						context: ret

					});
					return;
					backend.getData(url, function (data) {
						//source.set("busy",false)
						//console.log(data);
						var ret = {
							html: data
						}

						frameModule.topmost().navigate({
							moduleName: "pages/browser/browser",
							context: ret

						});

						return;
					})
				}
			}
		}
	}
	if (!done) {
		alert("Medagliere globale non disponibile");
	}
}

function byprogTap(args) {

	console.log('Clicked byprog');
	//var lv1=view.getViewById(page, "lvx");
	barselectedIndex = 0;
	lvprog.visibility = "visible";
	lvatleta.visibility = "collapsed";
	lvcronaca.visibility = "collapsed";
	//lvprog.items = matchesbyprog.rows;
}

function byatletaTap(args) {
	console.log('Clicked byatleta');
	//var lv1=view.getViewById(page, "lvx");
	barselectedIndex = 1;
	lvprog.visibility = "collapsed";
	lvatleta.visibility = "visible";
	lvcronaca.visibility = "collapsed";
	//lvatleta.items = matchesbyatleta;
}

function bycronacaTap(args) {
	console.log('Clicked bycronaca');
	//var lv1=view.getViewById(page, "lvx");
	barselectedIndex = 2;
	lvprog.visibility = "collapsed";
	lvatleta.visibility = "collapsed";
	lvcronaca.visibility = "visible";

	//lvcronaca.items = cronaca.rows;
}


function barTap(args) {
	var index = args.index;
	alert('Clicked tab with index ' + index);

}

function tabTap(args) {

	var index = args.index;
	console.log('Clicked tab with index ' + index);
	var lv1 = view.getViewById(page, "lvx");
	if (index == "0") {

		lv1.items = gara.matchesbyprog.rows;

	}

	if (index == "1") {

		lv1.items = gara.matchesbyatleta;

	}




}


function matchTap(args) {

	var target = args.object;
	console.log(target);
	var idx = target.index;



	var index = args.index;
	console.log("index", idx + " - " + index)
	var atl = displaymbp.rows[index].doc;
	//var atl=lvprog.items[idx].doc;
	var aid = atl.atletaid;
	//alert(aid);

	//alert(index+ " - " +atl.atletaname)
	//garatitle.text=index+ " - " +atl.atletaname;
	var mbp = renderByProg(gara.matchesbyprog, true);



	var ret = filterRows(mbp, {
		atletaid: aid
	});
	ret.garaid = garaid;
	ret.atletaid = aid;

	ret.tkdt = tkdt;
	ret.garadata = garadata;


	frameModule.topmost().navigate({
		moduleName: "pages/matchesatleta/matchesatleta",
		context: ret

	});


}

function matchTap_old(args) {

	var target = args.object;
	console.log(target);
	var idx = target.index;



	var index = args.index;
	console.log("index", idx + " - " + index)
	var atl = matchesbyprog.rows[index].doc;
	//var atl=lvprog.items[idx].doc;
	var aid = atl.atletaid;
	//alert(aid);

	//alert(index+ " - " +atl.atletaname)
	//garatitle.text=index+ " - " +atl.atletaname;
	var mbp = renderByProg(gara.matchesbyprog, true);



	var ret = filterRows(mbp, {
		atletaid: aid
	});
	ret.garaid = garaid;
	ret.atletaid = aid;

	ret.tkdt = tkdt;
	ret.garadata = garadata;


	frameModule.topmost().navigate({
		moduleName: "pages/matchesatleta/matchesatleta",
		context: ret

	});


}


function onNavBtnTap(args) {

	frameModule.topmost().navigate({
		moduleName: "pages/gare/gare",
		context: {}

	});


}

function matchAtletaTap(args) {



	var index = args.index;
	//alert(index);

	//var atl = matchesbyatleta.rows[index];
	var atl=displaympa.rows[index];
	console.log(atl);



	var aid = atl.id;
	//alert(aid);

	var mbp = renderByProg(gara.matchesbyprog, true);



	var ret = filterRows(mbp, {
		atletaid: aid
	});

	ret.garaid = garaid;

	ret.atletaid = aid;

	ret.tkdt = tkdt;
	ret.garadata = garadata;

	frameModule.topmost().navigate({
		moduleName: "pages/matchesatleta/matchesatleta",
		context: ret

	});

	//var mbp=renderByProg(gara.matchesbyprog,true);

	//var ret=filterRows(matchesbyprog,{atletaid: aid});

	return;

	frameModule.topmost().navigate({
		moduleName: "pages/matchesatleta/matchesatleta",
		context: ret

	});



}


function renderByProg(obj, include_dd_no) {

	if (!include_dd_no) include_dd_no = false;
	var ret = {
		rows: []
	}
	for (var i = 0; i < obj.rows.length; i++) {

		var doc = obj.rows[i].doc;

		var d = doc.disputato.toLowerCase();
		var dd = doc.dadisputare.toLowerCase();
		var v = doc.vinto.toLowerCase();

		if (dd == "yes") {

			if (d == "yes") {
				if (v == "yes") {
					doc.imgurl = "res://matchok";
					//doc.imgurl="~/images/logo.png
					doc.matchcolor = "green";
					doc.risultext = "Vinto, risultato: " + doc.risultato;

				} else {

					doc.imgurl = "res://matchko";
					doc.risultext = "Perso, risultato: " + doc.risultato;
					doc.matchcolor = "red";
				}

				if (doc.medagliamatch.toLowerCase() != "none") {

					doc.imgurl = "res://medaglia_" + doc.medagliamatch;

				}

				if (doc.realtime) {

					if (String(doc.realtime) == "true") {
						doc.imgurl = "res://greenblink";
						doc.temporeale = true;

					} else {
						doc.temporeale = false;
					}
				} else doc.temporeale = false;


			} else {
				doc.imgurl = "res://matchtoplay";
				doc.risultext = "Non disputato"
			}




			var doc2 = {
				doc: doc

			}
			ret.rows.push(doc2);

		} else {


			if (include_dd_no == true) {
				doc.imgurl = "res://matchnull";
				doc.risultext = ""
				doc.matchcolor = "gray";
				var doc2 = {
					doc: doc

				}
				ret.rows.push(doc2);

			}


		}


	}

	return ret;


}


function renderByAtleta(obj) {
	//console.log("renderbyatleta");
	//console.log(JSON.stringify(obj));
	var ret = {
		rows: []
	}

	for (var i = 0; i < obj.rows.length; i++) {
		var mba = obj.rows[i];
		var medaglia = "none";
		mba.imgurl = "res://matchnoplay";
		for (var j = 0; j < mba.matchesarray.length; j++) {
			//var doc=obj.rows[i].doc;
			var doc = mba.matchesarray[j];
			//console.log("elemento");
			var d = doc.disputato.toLowerCase();
			var dd = doc.dadisputare.toLowerCase();
			var v = doc.vinto.toLowerCase();

			//console.log("qui");
			if (dd == "yes") {

				if (d == "yes") {
					if (v == "yes") {
						//mba.imgurl="res://matchok";
						//mba.risultext="Vinto, risultato: "+doc.risultato;

					} else {

						//doc.imgurl="res://matchko";
						//doc.risultext="Perso, risultato: "+doc.risultato;
					}

					if (doc.medagliamatch) {
						if (doc.medagliamatch.toLowerCase() != "none") {
							//console.log(mba.nome+" has a medaglia: "+doc.medagliamatch);
							mba.imgurl = "res://medaglia_" + doc.medagliamatch;

						}
					}


				} else {
					//mba.imgurl="res://matchtoplay";
					//mba.risultext="Non disputato"
				}


				var doc2 = {
					doc: doc

				}
				ret.rows.push(mba);

			} else {


			}


		}

	}

	return ret;


}


function setLoading(b) {
	//isLoading=b;
	console.log("setLoading " + b);
	ai.busy = b;
	/*if (ai.busy) {
		ai.width = 30;
		ai.height = 30;
	} else {
		ai.width = 0;
		ai.height = 0;
		//ai.hide();
	}*/
	//source.set("busy",ai);
}


function readMatches(id, callback) {
	file.readJsonFile("gara_" + id + ".json", function (r) {




		setLoading(false);
		gara = r;
		// Argument (r) is JSON object!
		//console.log("matchesbyprog rows: "+r.matchesbyprog.rows.length)
		matchesbyprog = filterRows(r.matchesbyprog, {
			dadisputare: "yes"
		});
		tkdt = {
			atleti_iscritti: [],
			atleti: [],
			giorni: [],
			tabulati: []
		};
		if (r.gara.rows[0].doc.tkdt) tkdt = r.gara.rows[0].doc.tkdt;
		garadata = r.gara.rows[0].doc.data;
		renderByProg(matchesbyprog);
		//console.log(JSON.stringify(matchesbyprog));

		matchesbyatleta = r.matchesbyatleta;
		renderByAtleta(r.matchesbyatleta);
		cronaca = r.cronaca;

		utils.colog("matchesbyprog: " + matchesbyprog.rows.length);
		utils.colog("matchesbyatleta: " + matchesbyatleta.rows.length);
		utils.colog("cronaca: " + cronaca.rows.length);
		if (tkdt.atleti_iscritti) utils.colog("tkdt.atleti_iscritti: ", tkdt.atleti_iscritti.length);
		if (tkdt.atleti) utils.colog("tkdt.atleti: ", tkdt.atleti.length);

		setMatchesStyle();
		//console.log("matchesbyatleta: ");
		//console.log(JSON.stringify(matchesbyatleta));
		if (callback) callback(r);
	}, function (e) {
		// Argument (e) is Error!
		alert("Errore: " + e);
	});


}

function fetchMatches(id, callback) {
	var url = global.rooturl + "/gare/fullgarabyid/" + id + "?societaid=20160217220400";
	console.log(url)
	setLoading(true);
	fetch(url).then(function (response) {
		return response.json();
	}).then(function (r) {
		setLoading(false);
		gara = r;
		//filterMatches();
		// Argument (r) is JSON object!
		//console.log("matchesbyprog rows: "+r.matchesbyprog.rows.length)
		matchesbyprog = filterRows(r.matchesbyprog, {
			dadisputare: "yes"
		});
		
		tkdt = {
			atleti_iscritti: [],
			atleti: [],
			giorni: [],
			tabulati: []
		};
		if (r.gara.rows[0].doc.tkdt) tkdt = r.gara.rows[0].doc.tkdt;
		garadata = r.gara.rows[0].doc.data;
		//renderByProg(matchesbyprog);
		//console.log(JSON.stringify(matchesbyprog));

		matchesbyatleta = r.matchesbyatleta;
		renderByAtleta(r.matchesbyatleta);
		cronaca = r.cronaca;

		utils.colog("matchesbyprog: " + matchesbyprog.rows.length);
		utils.colog("matchesbyatleta: " + matchesbyatleta.rows.length);
		utils.colog("cronaca: " + cronaca.rows.length);
		if (tkdt.atleti_iscritti) utils.colog("tkdt.atleti_iscritti: ", tkdt.atleti_iscritti.length);
		if (tkdt.atleti) utils.colog("tkdt.atleti: ", tkdt.atleti.length);

		setMatchesStyle();
		//console.log("matchesbyatleta: ");
		//console.log(JSON.stringify(matchesbyatleta));
		if (callback) callback(r);
	}, function (e) {
		// Argument (e) is Error!
		alert("Errore: " + e);
	});


}

var getMatchStyle = function (m) {


	//var m=value[i];
	var d = m.disputato.toLowerCase();
	var dd = m.dadisputare.toLowerCase();
	var v = m.vinto.toLowerCase();
	var mid = m.matchid;

	var cl = "non disputato"
	if (dd == "yes") {

		if (d == "yes") {

			if (v == "yes") {
				cl = "vinto"
			} else cl = "perso";


		}


	} else {

		cl = "danondisputare";

	}


	//console.log("getmatchstyle result class for match "+mid+": ",cl);
	return cl;
}


var setMatchesStyle = function () {
	var matl = matchesbyatleta.rows;
	//console.log("matl length:",matl.length);
	for (var j = 0; j < matl.length; j++) {
		//console.log("J",j,JSON.stringify(matl[j]));
		var result = "";
		var value = matl[j].matchesarray;
		for (var i = 0; i < value.length; i++) {
			var m = value[i];
			var d = m.disputato.toLowerCase();
			var dd = m.dadisputare.toLowerCase();
			var v = m.vinto.toLowerCase();
			var mid = m.matchid;

			var cl = "non disputato"
			if (dd == "yes") {

				if (d == "yes") {

					if (v == "yes") {
						cl = "vinto"
					} else cl = "perso";


				}


			} else {

				cl = "danondisputare";

			}
			//console.log("class: ",cl)

			//if (result.trim()!="") result+=","
			//result+=mid;

			matchesbyatleta.rows[j].matchesarray[i].mclass = cl;
			//console.log(matchesbyatleta[j].matchesarray[i].mclass)
			//m.mclass=cl;
		}
	}

}


var getMatchesStyle = function (value) {
	var result = "";
	for (var i = 0; i < value.length; i++) {
		var m = value[i];
		var d = m.disputato.toLowerCase();
		var dd = m.dadisputare.toLowerCase();
		var v = m.vinto.toLowerCase();
		var mid = m.matchid;

		var cl = "non disputato"
		if (dd == "yes") {

			if (d == "yes") {

				if (v == "yes") {
					cl = "vinto"
				} else cl = "perso";


			}


		} else {

			cl = "danondisputare";

		}

		//if (result.trim()!="") result+=","
		//result+=mid;
	}
	return result;
}

var getMatchesStyle_old = function (value) {
	var result = "";
	for (var i = 0; i < value.length; i++) {
		var m = value[i];
		var d = m.disputato;
		var dd = m.dadisputare;
		var v = m.vinto;
		var mid = m.matchid;

		if (result.trim() != "") result += ","
		result += mid;
	}
	return result;
}

function lvatletaItemLoading2(args) {
	var listView = args.object;
	var listViewBindingContent = listView.bindingContext;
	var item = args.view;
	var itemBindingContext = args.view.bindingContext;
	console.log(args.index)
	/*console.log(listViewBindingContent);
	console.log(item);
	console.log(itemBindingContext);*/
}

function lvatletaItemLoading(args) {


	//if (fetched) return; 
	//console.log("creating atleti item "+args.index);
	var index = args.index;


	var stackview = args.view.getViewById("stack");
	var sv2 = args.view.getViewById("sv2")
	var lbnome = new labelModule.Label();
	lbnome.text = gara.matchesbyatleta[index].nome;
	lbnome.cssClass = "atleta";
	console.log("listview itemloadingevent " + lbnome.text)

	if (!stackview.getViewById("muzio")) {



		var ma = lvatleta.items[index].matchesarray;
		//console.log("ma.length: "+ma.length)
		var lbnome = new labelModule.Label();
		for (var i = 0; i < ma.length; i++) {
			var label = new labelModule.Label();

			label.id = "muzio";
			label.text = ma[i].matchid + " ";


			var cl = "nondisputato";
			var d = ma[i].disputato.toLowerCase();
			var dd = ma[i].dadisputare.toLowerCase();
			var v = ma[i].vinto.toLowerCase();

			if (dd == "yes") {

				if (d == "yes") {
					if (v == "yes") {
						cl = "vinto"
					} else cl = "perso";



				}


			} else {

				cl = "danondisputare";

			}

			label.cssClass = cl;

			//console.log("adding label with matchid "+ma[i].matchid)
			lvatleta.items[index].loaded = "ok";
			stackview.addChild(label);


		}


	}
	sv2.addChild(lbnome);

	//args.view = new labelModule.Label();
	//args.view.text = "eccheccazz";

	//args.view.getViewById("stack").addChild(label);





}



function filterRows($m, filt, exact) {
	if (!exact) exact = false;
	colog("filterrows: ")
	//console.log($m)
	var $retrows = {
		rows: []
	};
	var rows = $m.rows; //[{person:"me", age :"30"},{person:"you",age:"25"}];


	for (var i = 0; i < rows.length; i++) {
		//$(rows).each(function(i){

		var row = rows[i];
		var eligible = true;

		for (var key in row.doc) {
			// console.log("key: "+key + " . "+ row.doc[key]);
			for (var fkey in filt) {
				if (fkey == key) {
					//console.log("found key ---->"+fkey);
					var v1 = filt[fkey].toLowerCase();
					if (v1.trim() != "") {
						var v2 = row.doc[key].toLowerCase();
						if (exact) {
							if (v2.trim() == v1.trim()) {
								// console.log("found !: "+v2);

							} else {
								eligible = eligible && false;
							}
						} else {
							if (v2.indexOf(v1) > -1) {
								// console.log("found !: "+v2);

							} else {
								eligible = eligible && false;
							}


						}

					}

				}
			}
		}
		if (eligible) $retrows.rows.push(row);
	}

	return $retrows;
}

function colog(txt) {
	console.log(txt);

}

/*
function refreshAll(callback) {

	var garafname = "gara_" + garaid + ".json";
	var exists = file.fileExists(garafname);
	utils.colog("filexists", garafname, exists);
	exists = false;
	if (!exists) {
		utils.conslog(garafname + " does note exist, getching gara " + garaid);
		refreshGara(function () {

		


			if (callback) callback();

		})
	}
	if (!exists) return;
	file.readJsonFile(garafname, function (fdata) {
		console.log(garafname + " read");
		var r = fdata;
		

		gara = r;
	
		matchesbyprog = filterRows(r.matchesbyprog, {
			dadisputare: "yes"
		});



		renderByProg(matchesbyprog);
		

		matchesbyatleta = r.matchesbyatleta;
		renderByAtleta(r.matchesbyatleta);
		cronaca = r.cronaca;

		console.log("matchesbyprog: " + matchesbyprog.rows.length);
		console.log("matchesbyatleta: " + matchesbyatleta.rows.length);
		console.log("cronaca: " + cronaca.rows.length);

		setMatchesStyle();
	
		lvprog.visibility = "visible";
		
		lvatleta.visibility = "visible";
		lvcronaca.visibility = "visible";
		fetched = true;
	
		isLoading = false;
		var medaglie = global.getMedaglieGara(matchesbyprog);
	
		model = gara;
		model.medaglie = medaglie;
		

		setGaraInfo();



		source.set("model", model);
		source.set("ori", model.medaglie.ori);
		source.set("argenti", model.medaglie.argenti);
		source.set("bronzi", model.medaglie.bronzi);
		source.set("titologara", model.gara.rows[0].doc.title);
		source.set("location", model.gara.rows[0].doc.location);
		source.set("garalocationdata", model.gara.rows[0].doc.location.toUpperCase() + " - " + model.gara.rows[0].doc.data);
		source.set("mbp", matchesbyprog.rows);
		source.set("mba", matchesbyatleta.rows);
		source.set("cronaca", gara.cronaca.rows);

		

		console.log("medaglie gara", JSON.stringify(medaglie));



	



		if (callback) callback();


	})

}

*/

function filterMatches() {
	
	displaymbp={
		rows: []
	};
	displaympa={
		rows: []
	}
	//displaympa=matchesbyatleta.rows;
	//return;
    var hasFilters=false;
	var mbp = gara.matchesbyprog.rows;

	mbp.forEach(function (item, idx) {

		var eligible=true;
		var atl = utils.getAtletaById(item.doc.atletaid);
		var cat=utils.getCategoria(atl.datanascita,garadata);

		if (filters.sesso) {
			hasFilters=true;
			if (atl.sesso.toLowerCase().trim() != filters.sesso.toLowerCase().trim()) eligible=false;
		
		}
		if (filters.categoria) {
			hasFilters=true;
			if (cat.toLowerCase().trim() != filters.categoria.toLowerCase().trim()) eligible=false;
		}

		//console.log(atl.cognome,atl.nome,eligible);
		if (eligible) displaymbp.rows.push(item);
	
	})


	filteredresults=hasFilters;
	displaymbp=renderByProg(displaymbp);

	

	var mpa = gara.matchesbyatleta.rows;

	mpa.forEach(function (item, idx) {
		var eligible=true;
		//console.log("item",item.nome);
		var eligible=true;
		var atl = utils.getAtletaById(item.id);
		var cat=utils.getCategoria(atl.datanascita,garadata);
		
		if (filters.sesso) {
			if (atl.sesso.toLowerCase().trim() != filters.sesso.toLowerCase().trim()) eligible=false;
		
		}
		if (filters.categoria) {
			if (cat.toLowerCase().trim() != filters.categoria.toLowerCase().trim()) eligible=false;
		}

		//console.log(atl.cognome,atl.nome,eligible);
		if (eligible) displaympa.rows.push(item);

	})




	







}


function refreshGara(callback) {
	isLoading = true;
	//garatitle.text = "Caricamento...."
	garalocationdata.text = "Caricamento....";
	//file.readJsonFile("gara.json",function(fdata) {
	fetchMatches(garaid, function () {
		//readGara(garaid,function(){	

		console.log("fetchmatches callback");
		//lvatleta.items=gara.matchesbyatleta;
		//console.log(JSON.stringify(gara.cronaca.rows));

		//lvcronaca.items = gara.cronaca.rows;
		lvprog.visibility = "visible";
		//array = new observableArrayModule.ObservableArray(matchesbyprog.rows);

		//lvprog.items = matchesbyprog.rows;
		//lvatleta.items = matchesbyatleta.rows;
		lvatleta.visibility = "visible";
		lvcronaca.visibility = "visible";
		fetched = true;
		//garatitle.text = gara.gara.rows[0].doc.title;
		//garalocation.text=gara.gara.rows[0].doc.location+" - "+gara.gara.rows[0].doc.data; 
		isLoading = false;
		//var medaglie = global.getMedaglieGara(matchesbyprog);
		var medaglie = global.getMedaglieGara(displaymbp);
		console.log("medaglie",JSON.stringify(medaglie));
		/*model.ori=medaglie.ori;
		model.argenti=medaglie.argenti;
		model.bronzi=medaglie.bronzi;*/
		model = gara;
		model.medaglie = medaglie;
		//page.getViewById("")
		//console.log("model",JSON.stringify(model));
		//console.log("sunchi")
		setGaraInfo();
		//utils.conslog("e mo sun chi");
		matchesbyprog.rows.forEach(function (item, idx) {
			//console.log("item",JSON.stringify(item));
			var doc = item.doc;
			//console.log(JSON.stringify(doc));
			var atl = utils.getAtletaById(doc.atletaid);
			//console.log("atl",JSON.stringify(atl));
			doc.categoria = utils.getCategoria(atl.datanascita, model.gara.rows[0].doc.data).toUpperCase();
		})

		matchesbyatleta.rows.forEach(function (item, idx) {
			//console.log("item",JSON.stringify(item));
			var doc = item;
			//console.log(JSON.stringify(doc));
			var atl = utils.getAtletaById(doc.id);
			//console.log("atl",JSON.stringify(atl));
			doc.categoria = utils.getCategoria(atl.datanascita, model.gara.rows[0].doc.data).toUpperCase();
		})

		filterMatches();
		medaglie = global.getMedaglieGara(displaymbp);
		model.medaglie=medaglie;
		console.log("matches filtered");
		source.set("model", model);
		source.set("ori", model.medaglie.ori);
		source.set("argenti", model.medaglie.argenti);
		source.set("bronzi", model.medaglie.bronzi);
		source.set("titologara", model.gara.rows[0].doc.title);
		source.set("location", model.gara.rows[0].doc.location);
		source.set("garalocationdata", model.gara.rows[0].doc.location.toUpperCase() + " - " + model.gara.rows[0].doc.data);
		/*source.set("mbp", matchesbyprog.rows);
		source.set("mba", matchesbyatleta.rows);*/
		console.log("displaymbp",displaymbp.rows.length)
		source.set("mbp",displaymbp.rows);
		source.set("mba",displaympa.rows);
		source.set("cronaca", gara.cronaca.rows);
		source.set("filteredresults",filteredresults);


		var garaid = model.gara.rows[0].doc.id;


		utils.colog("gare in realtime per la gara " + garaid, model.realtime.rows.length);
		//utils.colog("rtservice rta",rtservice.rtarray);
		rtservice.syncRealtimeMatches(model.realtime.rows, garaid);
		//utils.conslog("e mo sun chichi");


		//utils.conslog("trying to write current gara to file");

		var garafname = "gara_" + garaid + ".json";

		file.writeJsonFile(garafname, gara, function (d) {
			utils.conslog(JSON.stringify(d));
			navigated = true;
		})
		//utils.conslog("calling callback for refreshgara");
		setGaraInfo();
	
		if (callback) callback();
	});


}



function setGaraInfo() {
	utils.colog("setgarainfo");
	var lay = page.getViewById("garainfo");

	var l = lay.getElementsByTagName('Label');
	console.log("labels", l.length);
	for (var i = 0; i < l.length; i++) {
		//console.log(l[i]);
		lay.removeChild(l[i]);
	}


	//var $m = matchesbyprog.rows;
	var $m = displaymbp.rows;
	var gara = model.gara.rows[0].doc;
	//console.log("$m",$m);

	var dd = utils.filterRows($m, {
		dadisputare: "yes"
	});

	//dd=displaymbp.rows;

	var d = utils.filterRows($m, {
		disputato: "yes"
	});
	var v = utils.filterRows(d, {
		vinto: "yes"
	});
	var ori = utils.filterRows(d, {
		medagliamatch: "oro"
	});
	var arg = utils.filterRows(d, {
		medagliamatch: "argento"
	});
	var bro = utils.filterRows(d, {
		medagliamatch: "bronzo"
	});
	var p = d.rows.length - v.rows.length;

	addCampo(lay,"Gara",gara.title,"campo");
	addCampo(lay,"ID","ID: " + gara.id + " - TKDT_ID: " + gara.tkdt_id,"campo");
	addCampo(lay,"Location",gara.location,"campo");
	/*var label = new labelModule.Label();
	label.text = "ID: " + gara.id + " - TKDT_ID: " + gara.tkdt_id;
	lay.addChild(label);

	label = new labelModule.Label();
	label.text = "Location: " + gara.location;
	lay.addChild(label);
	*/

	var label = new labelModule.Label();
	label.text = "";
	lay.addChild(label);


	/*var but=new buttonModule.Button();
	but.text="Mappa";
	
	lay.addChild(but);*/


	label = new labelModule.Label();
	var gmf = utils.getMaschiFemmine(dd);
	//label.text = dd.rows.length + " match da disputare (M: " + gmf.maschi + ", F: " + gmf.femmine + ")";
	label.text = displaymbp.rows.length + " match da disputare (M: " + gmf.maschi + ", F: " + gmf.femmine + ")";
	lay.addChild(label);

	label = new labelModule.Label();
	var gmfd = utils.getMaschiFemmine(d);
	label.text = d.rows.length + " match disputati (M: " + gmfd.maschi + ", F: " + gmfd.femmine + ")";
	lay.addChild(label);

	label = new labelModule.Label();
	var gmfv = utils.getMaschiFemmine(v);
	label.text = v.rows.length + " match vinti (M: " + gmfv.maschi + ", F: " + gmfv.femmine + ")";
	lay.addChild(label);

	label = new labelModule.Label();
	gmf = utils.getMaschiFemmine(p);
	var mas = gmfd.maschi - gmfv.maschi;
	var fem = gmfd.femmine - gmfv.femmine;
	label.text = p + " match persi (M: " + mas + ", F: " + fem + ")";
	lay.addChild(label);

	label = new labelModule.Label();
	label.text = "";
	lay.addChild(label);

	var punti;

	label = new labelModule.Label();
	gmf = utils.getMaschiFemmine(ori);
	punti = ori.rows.length * 7;
	label.text = "ORI: " + ori.rows.length + " (M: " + gmf.maschi + ", F: " + gmf.femmine + ") - punti: " + punti;
	lay.addChild(label);

	label = new labelModule.Label();
	gmf = utils.getMaschiFemmine(arg);
	punti = arg.rows.length * 3;
	label.text = "ARG: " + arg.rows.length + " (M: " + gmf.maschi + ", F: " + gmf.femmine + ") - punti: " + punti;
	lay.addChild(label);

	label = new labelModule.Label();
	gmf = utils.getMaschiFemmine(bro);
	punti = bro.rows.length;
	label.text = "BRO: " + bro.rows.length + " (M: " + gmf.maschi + ", F: " + gmf.femmine + ") - punti: " + punti;
	lay.addChild(label);

	label = new labelModule.Label();
	label.text = "";
	lay.addChild(label);

	var totpunti = ori.rows.length * 7 + arg.rows.length * 3 + bro.rows.length;

	label = new labelModule.Label();
	label.text = "Punteggio totale medaglie: " + totpunti;
	lay.addChild(label);

	label = new labelModule.Label();
	label.text = "";
	lay.addChild(label);


	label = new labelModule.Label();
	var d = new Date();

	/*var YY=d.getFullYear();
	var MM=d.getMonth();
	var DD=d.getDate();

	var hh=d.getHours();
	var mm=d.getMinutes();
	var ss=d.getSeconds();

	var sdata=DD+"/"+MM+"/"+YY+" "+hh+":"+mm+":"+ss;*/
	var sdata = utils.getDateString(d);

	label.text = "Ultimo aggiornamento: " + sdata;
	lay.addChild(label);



	//console.log("fine showInfo")




}

function addCampo(lay,descr,text,classname){
	var label = new labelModule.Label();
	label.text = descr;
	label.className="campolabel";
	lay.addChild(label);

	label = new labelModule.Label();
	label.text = text;
	label.className=classname;
	lay.addChild(label);

}


exports.showIscritti = function () {

	frameModule.topmost().navigate({
		moduleName: "iscritti",
		context: {
			iscritti: gara.gara.rows[0].doc.myiscritti,
			gara: gara
		}

	});

}


exports.tapTitle = function (args) {

	console.log("titolo tapped");

}

exports.filterData = function () {

	var context = {
		filters: filters
	};
	console.log("context",JSON.stringify(context));

	page.showModal("pages/garafilters/garafilters", context, function closeCallback(data) {
		
		//alert(JSON.stringify(data));
		if (data){
		filters = data;
		global.garafilters=filters;
		console.log("filters", JSON.stringify(filters));
		refreshGara(function(){
			console.log("refreshgara done");
		})
		}
	

		// Log the user in...
	}, false);
	//alert("not implemented yet");
}


function showTkdt() {
	if (!gara.gara.rows[0].doc.tkdt) {
		alert("Dati ufficiali non disponibili");
		return;
	}

	var tkdt = gara.gara.rows[0].doc.tkdt
	frameModule.topmost().navigate({
		moduleName: "pages/tkdt/tkdt",
		context: {
			tkdt: tkdt,
			gara: gara.gara.rows[0].doc
		}

	});

}


exports.navigatedTo = function (args) {
	utils.colog("Navigated To gara !!!");


}

exports.infogaraclass = "lvitem";
exports.lvatletaItemLoading2 = lvatletaItemLoading2;
exports.lvatletaItemLoading = lvatletaItemLoading;
exports.bycronacaTap = bycronacaTap;
exports.byatletaTap = byatletaTap;
exports.byprogTap = byprogTap;
exports.pageLoaded = pageLoaded;
exports.matchTap = matchTap;
exports.barTap = barTap;
exports.onNavBtnTap = onNavBtnTap;
exports.barselectedIndex = barselectedIndex;
exports.refreshGara = refreshGara;
exports.isLoading = isLoading;
exports.gotoChat = gotoChat;
exports.showTkdt = showTkdt;
exports.matchAtletaTap = matchAtletaTap;
exports.tapMedals = tapMedals;