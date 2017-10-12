var appModule = require("application");
//var vmModule = require("./main-view-model");
var view = require("ui/core/view");
var listViewModule = require("ui/list-view");
var labelModule = require("ui/label");
var frameModule = require("ui/frame");
var utilityModule = require("utils/utils");
var StackLayout = require("ui/layouts/stack-layout").StackLayout;
var observableArrayModule = require("data/observable-array");
var observableModule = require("data/observable");
var utils = require("../../shared/utils");
var backend = require("../../shared/backend");
var dom = require("nativescript-dom");

var matches;
var lvprog;
var lvhist;
var lvavvers;
var lvdaticat;
var lbavvers;
var lvtabulati;
var lbtitle;
var lvcaz;
var page;
var garaid;
var garadata;
var atletaid;
var mytkdtatl = {};
var myatl;
var source = new observableArrayModule.ObservableArray;
var history = new observableArrayModule.ObservableArray;
var tabuls = [];

function pageLoaded(args) {
	console.log("pageloaded matychesatleta");
	page = args.object;
	source.set("history", history);
	matches = page.navigationContext;
	garaid = matches.garaid;
	atletaid = matches.atletaid;
	tkdt = matches.tkdt;
	garadata = matches.garadata;
	myatl = global.getAtletaById(atletaid);
	//utils.colog("matches: "+JSON.stringify(matches));
	//utils.colog("tkdt",JSON.stringify(tkdt));


	lvprog = view.getViewById(page, "lvprog");
	lbtitle = view.getViewById(page, "lbtitle");
	lvhist = page.getViewById("lvhist");
	lvavvers = page.getViewById("lvavvers");
	lvdaticat = page.getViewById("lvdaticat");
	lvtabulati = page.getViewById("lvtabulati");
	lbavvers = page.getViewById("lbavvers");
	lvcaz = page.getViewById("lvcaz");
	lvprog.visibility = "visible";
	lvprog.items = matches.rows;
	lbtitle.text = "- " + matches.rows.length + " match per " + myatl.nome + " " + myatl.cognome;

	backend.getHistoryAtleta(atletaid, function (data) {

		var hist = data.rows;
		history = [];
		var datagara = matches.garadata;
		utils.conslog("datagara", datagara);
		var jdg = utils.getJulianDateOnly(datagara);
		hist.forEach(function (item, idx) {
			var d = item.data;
			var jd = utils.getJulianDateOnly(d);
			//utils.conslog(d,jd);
			if (jd < jdg) history.push(item);


		})


		//history = data.rows;
		utils.colog("history rows", history.length);
		history.forEach(function (item, idx) {
			//utils.colog("item",JSON.stringify(item));
			var medaglia = "-";
			if (item.ori > 0) medaglia = "ORO";
			if (item.arg > 0) medaglia = "ARG";
			if (item.bro > 0) medaglia = "BRO";
			//utils.colog("medaglia",medaglia);
			item.medaglia = medaglia;


		})
		lvhist.items = history;

		var tkdtatl = [];
		if (tkdt.atleti_iscritti) tkdtatl = tkdt.atleti_iscritti;
		if (tkdt.atleti) {
			if (tkdt.atleti.length > 0) tkdtatl = tkdt.atleti;
		}

		utils.colog("tkdtatleti", tkdtatl.length);
		utils.colog("myatl", JSON.stringify(myatl));
		//find tkdt category

		//utils.colog("myatl record",JSON.stringify(myatl));
		mytkdtatl = {};
		tkdtatl.forEach(function (item, index) {
			var tkdtname = item.nome.toLowerCase();
			tkdtname = utils.normalizeName(tkdtname);
			/*if (tkdtname.indexOf("pass")>-1) utils.colog("--- "+tkdtname);
			if (tkdtname.indexOf("nicol")>-1) utils.colog("--- "+tkdtname);
			if (tkdtname.indexOf("desir")>-1) utils.colog("--- "+tkdtname);*/
			//utils.colog(tkdtname);
			var myname = myatl.nome.toLowerCase() + " " + myatl.cognome.toLowerCase();
			var myreversename = myatl.cognome.toLowerCase() + " " + myatl.nome.toLowerCase();
			myname = utils.normalizeName(myname);
			myreversename = utils.normalizeName(myreversename);
			var doIt = false;
			if (tkdtname.trim() == myname.trim()) doIt = true;
			if (tkdtname.trim() == myreversename.trim()) doIt = true;
			if (doIt) {
				mytkdtatl = item;
			}


		})

		utils.colog("mytkdtatl", JSON.stringify(mytkdtatl));


		var avvers = [];

		tkdtatl.forEach(function (item, index) {
			var sesso = item.sesso;
			var cateta = item.cateta;
			var catpeso = item.catpeso;
			var catcintura = item.catcintura;

			if ((sesso == mytkdtatl.sesso) && (cateta == mytkdtatl.cateta) && (catpeso == mytkdtatl.catpeso) && (catcintura == mytkdtatl.catcintura)) {
				if (item != mytkdtatl) avvers.push(item);


			}




		})



		lvavvers.items = avvers;
		lbavvers.text = "+ Avversari (" + avvers.length + ")";



		//mycategoria
		var catdata_arr = [{
				col1: "Sesso",
				col2: mytkdtatl.sesso
			},
			{
				col1: "Categoria Età",
				col2: mytkdtatl.cateta
			},
			{
				col1: "Categoria Cintura",
				col2: mytkdtatl.catcintura
			},
			{
				col1: "Categoria Peso",
				col2: mytkdtatl.catpeso + " kg"
			}
		];

		utils.colog("daticat", JSON.stringify(catdata_arr));
		lvdaticat.items = catdata_arr;


		tabuls = [];
		if (tkdt.tabulati) {
			utils.conslog("sono ai tabulati");
			if (tkdt.tabulati.length > 0) {
				tkdt.tabulati.forEach(function (item, idx) {

					var sesso = item.sesso;
					var categoria_eta = item.categoria_eta;
					var cintura_da = item.cintura_da;
					var cintura_a = item.cintura_a;
					var categoria_peso = item.categoria_peso.replace("kg", "").trim();

					var catcintura = cintura_da + " -> " + cintura_a;
					var doIt = false;
					if ((catcintura == mytkdtatl.catcintura) && (categoria_peso == mytkdtatl.catpeso) && (categoria_eta == mytkdtatl.cateta) && (sesso == mytkdtatl.sesso)) {
						doIt = true;
						utils.conslog("trovato tabulato !!")
					}

					if (doIt) {
						var newtabul = {
							href: item.oldhref,
							html: "<iframe src='" + item.oldhref + "' />"
						}
						tabuls.push(newtabul);



					}


				})
			}

		}

		if (tabuls.length > 0) {
			var tabhref = tabuls[0].href;
			var arr = tabhref.split("id=");
			var tabid = arr[1];
			utils.conslog("tabulato id", tabid)
			backend.getTabulatoImage(tabid, function (data) {

				utils.conslog("got tabulato image", data);
				utils.conslog("tabuls", tabuls.length);
				tabuls[0].tabimage = data;
				lvtabulati.items = tabuls;
				lvtabulati.refresh();
			})

		}



		var caz = [{
				text: "caz"
			},
			{
				text: "mink"
			}
		]
		utils.colog("caz", caz);


		lvcaz.on(listViewModule.ListView.itemLoadingEvent, function (args) {
			var sl = new StackLayout();
			utils.conslog("args.object", args.object, args.view, args.index);
			//utils.conslog("args.view",args.view);

			var label = new labelModule.Label();
			label.text = "label_" + args.index;
			// connect to live view
			//args.view = new labelModule.Label();
			sl.addChild(label);
			args.view.addChild(sl);
			/*if (!args.view) {
				// Create label if it is not already created.
				args.view = new labelModule.Label();
			}*/
			//(args.view).text = "mavaffanculo";

		});
		lvcaz.items = caz;

	});


}

exports.tapUrl = function (args) {

	if (tabuls.length == 0) return;
	var href = tabuls[0].tabimage;
	utils.conslog("opening href", href);
	utilityModule.openUrl(href);
}

function onNavBtnTap(args) {


	//	frameModule.topmost().goBack();


	frameModule.topmost().navigate({
		moduleName: "pages/gara/gara",
		context: {
			garaid: garaid,
			refreshfilters: false,
			refresh: false
		}

	});



}

function matchTap(args) {
	var index = args.index;
	utils.colog('Clicked item with index ' + index, global.user.role);
	if (global.user.role.toLowerCase() != "tkdradmin") return;

	var mode="single";
	if (matches.rows[index].doc.realtime){
		if (String(matches.rows[index].doc.realtime)=="true") mode="multi";
	}

	//var gara=gare.rows[index];
	//console.log(gara.doc.title+" - "+gara.doc.id);
	frameModule.topmost().navigate({
		//moduleName: "pages/matchmanager/matchmanager",
		moduleName: "pages/rtconsole/rtconsole",
		context: {
			garaid: garaid,
			match: matches.rows[index].doc,
			mode: mode
		}

	});

}

function toggleHistory(args) {
	var but = args.object;
	toggleListview(lvhist, but);
	/*var vis=lvhist.visibility;
	//utils.colog("vis",newvis);
	var newvis="visible";
	if (vis=="visible") newvis="collapsed";
	utils.colog("newvis",newvis);
	lvhist.visibility=newvis;
	//utils.colog("lvhist vis",lvhist.visibility);*/

}

function toggleAvversari(args) {
	var but = args.object;
	toggleListview(lvavvers, but);


}

function toggleDaticat(args) {
	var but = args.object;
	toggleListview(lvdaticat, but);


}

function toggleMatches(args) {
	var but = args.object;
	toggleListview(lvprog, but);


}

function toggleTabulati(args) {
	var but = args.object;
	toggleListview(lvtabulati, but);


}


function toggleListview(lv, but) {
	var vis = lv.visibility;
	//utils.colog("vis",newvis);
	var newvis = "visible";
	if (vis == "visible") newvis = "collapsed";
	//utils.colog("newvis",newvis);
	lv.visibility = newvis;

	var t = but.text;
	var segno = "+";

	t = t.replace("+", "");
	t = t.replace("-", "");
	if (newvis == "visible") segno = "-";
	but.text = segno + " " + t.trim();

	/*if (newvis == "visible") {
		lvprog.visibility = "collapsed";
	} else lvprog.visibility = "visible";*/

	/*var ctls=page.getElementsByTagName('Button');

	ctls.forEach(function(item,idx){
		if (item!=but){
		item.visibility="collapsed";
} else item.visibility="visible";
	})*/

}


exports.matchTap = matchTap;
exports.onNavBtnTap = onNavBtnTap;
exports.pageLoaded = pageLoaded;
exports.toggleHistory = toggleHistory;
exports.toggleAvversari = toggleAvversari;
exports.toggleDaticat = toggleDaticat;
exports.toggleMatches = toggleMatches;
exports.toggleTabulati = toggleTabulati;