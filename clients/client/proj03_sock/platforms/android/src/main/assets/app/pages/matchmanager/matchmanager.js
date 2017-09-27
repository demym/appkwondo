var view = require("ui/core/view");
var listViewModule = require("ui/list-view");
var scrollViewModule = require("ui/scroll-view");
var frameModule = require("ui/frame");
var switchModule = require("ui/switch");
var utils = require("../../shared/utils");
var backend = require("../../shared/backend");
var socket = require("../../shared/socket");
var http = require("http");
var observableModule = require("data/observable");
var source = new observableModule.Observable();

var context;
var rtswitch;
var match;
var page;
var garaid;

var rtatemplate ={}


var rta=[];
var rtaindex=0;	

var isPageLoaded = false;


function pageLoaded(args) {
	isPageLoaded = true;
	utils.conslog("pageloaded matchmanager");
	page = args.object;

	rtswitch = page.getViewById("rtswitch");
	var matchlabel = page.getViewById("matchlabel");

	context = page.navigationContext;
	console.log("matchmanager navigationcontext", JSON.stringify(context));
	match = context.match;
	garaid = context.garaid;

	matchlabel.text = "Gestione match " + match.matchid + " - " + match.atletaname;

	var realtime = b(match.realtime);
	console.log("realtime", realtime);

	source.set("realtime", realtime);

	page.bindingContext = source;
	isPageLoaded = false;
	rtatemplate= {
		type: "realtime",
		to: "all",
		garaid: garaid,
		//matchid: selectedid,
		matchid: match.id,
		//matchnumber: selectedmatchid,
		matchnumber: match.matchid,
		result: "0-0",
		round: "1",
		fineround: false,
		running: true,
		paused: false,
		ammoniz1: 0,
		ammoniz2: 0,
		event: "realtime",
		text: "TEMPO REALE",
		//match: getMatchById(selectedid),
		match: match,
		active: true

	}
	rta=[rtatemplate];

}


function rtChanged(args) {
	if (isPageLoaded) return;
	console.log("Property Changed!");
	console.log("Event name:" + args.eventName);
	console.log("Object:" + args.object);
	console.log("propertyname:" + args.propertyName);
	console.log("value:" + args.value)




	var testo = "disattivato";
	//if (active) testo = "attivato";
	//sendRealtime(true);
	//colog("realtimeindex before call: " + realtimeindex);

	var urln = global.rooturl + "/matches/update/" + garaid + "/" + match.id;
	console.log("url", urln);
	var doc = {
		realtime: args.value
	}

	console.log("posting", JSON.stringify(doc));

	/*backend.postData(urln, doc, function (d) {
		console.log("data", d);
	})*/
	http.request({
		url: urln,
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		//content: doc,
		content: JSON.stringify(doc)
	}).then(function (response) {
		//var result = response.content.toJSON();
		console.log("response", response);


		var sockmsg = {
			type: "notification",
			to: "all",
			text: "",
			garaid: garaid,
			updategara: "yes"

		}
		socket.send(sockmsg);

	}, function (e) {
		console.log("Error occurred " + e);
		//if (callback) callback(e);
	});





}




function butConsoleTap(args) {

	var rt=rta[rtaindex];

	if (source.get("realtime") == false) return;

	var button = args.object;
	var ris = page.getViewById("risult1");
	var round = "1";
	var fineround = rt.fineround;
	var running = rt.running;
	var paused = rt.paused;
	var active = rt.active;

	var mtext = "in pausa";

	var buttonid = button.id;


	console.log("tapped console button", buttonid);

	var arrp = ris.text.split("-");
	var p1 = parseInt(arrp[0], 10);
	var p2 = parseInt(arrp[1], 10);
	//var p1="0";
	//var p2="0";

	if (buttonid == "butplus1") p1++;
	if (buttonid == "butplus2") p2++;
	if (buttonid == "butminus1") p1--;
	if (buttonid == "butminus2") p2--;
	if (p1 < 0) p1 = 0;
	if (p2 < 0) p2 = 0;
	var result = String(p1) + "-" + String(p2);
	ris.text = result;

	if (buttonid.indexOf("butround") > -1) {
		fineround = false;
		round = buttonid.replace("butround", "").toUpperCase();
		running = true;
		paused = false;
		active = true;
	}

	if (buttonid == "butpause") {
		console.log("butpause",new Date(),running,paused,active);
		running = !running;
		paused = !paused;
		active = !active
		console.log("** running", running, "paused", paused, "active", active);

	}

	if (buttonid=="butfineround"){
		fineround=true;
		running=false;
		
		active=false;
	}






	var text = "TEMPO REALE !<br>";
	var color = "black";


	if (running) {
		mtext = "IN CORSO";
		color = "blue";
	} else {
		mtext = "in pausa";
		color = "black";
	}

	if (fineround) {
		mtext = "FINE ROUND " + round;
		color = "black";
		
	}

	console.log("running", running, "paused", paused, "active", active);

	var rtext = "<font color='" + color + "'>Round " + round;
	if (round == "GP") rtext = "<font color='" + color + "'>GoldenPoint"
	text += " " + rtext;

	text += ", " + mtext;

	text += ", " + result + "</font>";

	console.log(text);


	var rdata = {
		type: "realtime",
		to: "all",
		garaid: garaid,
		//matchid: selectedid,
		matchid: match.id,
		//matchnumber: selectedmatchid,
		matchnumber: match.matchid,
		result: result,
		round: round,
		fineround: fineround,
		running: running,
		paused: paused,
		ammoniz1: 0,
		ammoniz2: 0,
		event: "realtime",
		text: text,
		//match: getMatchById(selectedid),
		match: match,
		active: active

	}

	rt=rdata;

	socket.send(rdata)
}



function onNavBtnTap(args) {

	frameModule.topmost().goBack();

}


function b(v) {
	return v === "false" ? false : !!v;
}

exports.onNavBtnTap = onNavBtnTap;
exports.butConsoleTap = butConsoleTap;
exports.rtChanged = rtChanged;
exports.pageLoaded = pageLoaded;