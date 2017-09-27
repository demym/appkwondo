var observableModule = require("data/observable");
var stackLayoutModule = require("ui/layouts/stack-layout");
var labelModule = require("ui/label");
var tabViewModule = require("tns-core-modules/ui/tab-view");
var fs = require("file-system");
var frameModule = require("ui/frame");
var glbservice = require("../../shared/globalservice");
var rts = require("../../shared/realtimeservice");
var utils = require("../../shared/utils");
var socket = require("../../shared/socket");
var http = require("http");


var page;
var tabview;
var source = new observableModule.Observable();
var consoleSelectedIdx = 0;

//rtconsoles=rts.RealtimeService.rtc;

var rtconsoles = []

var gs = glbservice.GlobalService;

gs.e.on("realtimechange", function (ev) {


    rtconsoles = rts.RealtimeService.getRtc();
    source.set("rtconsole", rtconsoles[0]);
    console.log("rtconsoles", rtconsoles.length);
    loadTabs();


    renderConsole(0);


})






exports.pageLoaded = function (args) {
    page = args.object;
    console.log("rtconsole loaded");
    //source.set("rtconsole", rtconsoles[0]);
    //source.set("tabs", tabs);
    page.bindingContext = source;
    tabview = page.getViewById("tabview");
    rtconsoles = rts.RealtimeService.getRtc();
    console.log("rtconsoles found",rtconsoles.length);

    
    source.set("rtconsole", rtconsoles[0]);
    console.log("rtconsoles", rtconsoles.length);
    loadTabs();


    renderConsole(0);
}


exports.segBarSelected = function (args) {
    //console.log(JSON.stringify(args));
    var obj = args.object;



    console.log("segbarselected", obj.selectedIndex);
}

exports.onSelectedIndexChanged = function (args) {
    //console.log(JSON.stringify(args));
    var obj = args.object;
    console.log("tabview selindex", obj.selectedIndex);
    renderConsole(obj.selectedIndex);
}

exports.rtChanged = function (args) {

    var obj = args.object;
    console.log("obj property changed", obj);

    var rtcons = rtconsoles[consoleSelectedIdx];
    rtcons.active = !rtcons.active;

}

exports.butConsoleTap = function (args) {
    var btn = args.object;
    var id = btn.id;

    console.log("id", id);
    var rtcons = rtconsoles[consoleSelectedIdx];

    if (id.indexOf("butround") > -1) {

        var round = id.replace("butround", "");

        rtcons.round = round;
        rtcons.fineround = false;
        rtcons.paused = false;
    }

    if (id == "butfineround") {
        rtcons.fineround = true;
        rtcons.paused = true;
    }

    if (id == "butpause") {

        rtcons.paused = !rtcons.paused;
    }

    if (id == "butrealtime") {
        rtcons.temporeale = !rtcons.temporeale;
        var text = "attivato";
        if (!rtcons.temporeale) text = "disattivato";

        var testo = "disattivato";
        //if (active) testo = "attivato";
        //sendRealtime(true);
        //colog("realtimeindex before call: " + realtimeindex);

        var urln = global.rooturl + "/matches/update/" + rtcons.match.garaid + "/" + rtcons.match.id;
        console.log("url", urln);
        var doc = {
            realtime: rtcons.temporeale
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
                garaid: rtcons.match.garaid,
                updategara: "yes"

            }
            socket.send(sockmsg);
        
            utils.toast("Tempo reale " + text + " per " + rtcons.match.matchid + " " + rtcons.match.atletaname);

            return;

        }, function (e) {
            console.log("Error occurred " + e);
            utils.toast("Errore "+e);
            return;
            //if (callback) callback(e);
        });



        
    }

    var arrp = rtcons.result.split("-");
    var p1 = parseInt(arrp[0], 10);
    var p2 = parseInt(arrp[1], 10);
    if (id == "butplus1") p1++;
    if (id == "butplus2") p2++;
    if (id == "butminus1") p1--;
    if (id == "butminus2") p2--;
    if (p1 < 0) p1 = 0;
    if (p2 < 0) p2 = 0;
    var result = String(p1) + "-" + String(p2);
    rtcons.result = result



    renderConsole(consoleSelectedIdx);


    sendRealtime(rtcons);



}

function sendRealtime(rtcons) {

    var mtext = "in pausa";
    var text = "TEMPO REALE !<br>";
    var color = "black";
    var running = !rtcons.paused;

    if (running) {
        mtext = "IN CORSO";
        color = "blue";
    } else {
        mtext = "in pausa";
        color = "black";
    }

    if (rtcons.fineround) {
        mtext = "FINE ROUND " + rtcons.round;
        color = "black";

    }

    console.log("running", !rtcons.paused, "paused", rtcons.paused, "active", rtcons.active);

    var rtext = "<font color='" + color + "'>Round " + rtcons.round;
    if (rtcons.round.toLowerCase() == "gp") rtext = "<font color='" + color + "'>GoldenPoint"
    text += " " + rtext;

    text += ", " + mtext;

    text += ", " + rtcons.result + "</font>";

    console.log(text);



    var rdata = {
        type: "realtime",
        to: "all",
        garaid: rtcons.match.garaid,
        //matchid: selectedid,
        matchid: rtcons.match.id,
        //matchnumber: selectedmatchid,
        matchnumber: rtcons.match.matchid,
        result: rtcons.result,
        round: rtcons.round,
        fineround: rtcons.fineround,
        running: !rtcons.paused,
        paused: rtcons.paused,
        ammoniz1: 0,
        ammoniz2: 0,
        event: "realtime",
        text: text,
        //match: getMatchById(selectedid),
        match: rtcons.match,
        active: true

    }



    socket.send(rdata)
}

function loadTabs() {

    console.log("loadtabs")
    var items = [];


    rtconsoles.forEach(function (item, idx) {
        console.log("rtconsole" + idx, JSON.stringify(item));
        var StackLayout0 = new stackLayoutModule.StackLayout();
        var label0 = new labelModule.Label();


        var tabEntry0 = new tabViewModule.TabViewItem();
        tabEntry0.title = item.match.matchid + " - " + item.match.atletaname;
        tabEntry0.view = StackLayout0;


        items.push(tabEntry0);



    });

    tabview.items = items;
}


function renderConsole(idx) {

    console.log("renderconsole", idx, rtconsoles.length);
    //var rtcons = rtconsoles[idx];
    var rtcons = rtconsoles[idx];
    console.log("rtcons", JSON.stringify(rtcons));
    console.log("renderconsole", idx, rtconsoles.length);
    // return;
    //if (!rtcons.rtdata.result) rtcons.rtdata.result="0-0";

    consoleSelectedIdx = idx;
    source.set("rtconsole", new observableModule.Observable(rtcons));



}

exports.gotoChat = function () {
    frameModule.topmost().navigate({
        moduleName: "pages/chat/chat"
    });

}