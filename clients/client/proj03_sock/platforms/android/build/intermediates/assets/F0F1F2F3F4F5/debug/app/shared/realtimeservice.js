var utils = require("~/shared/utils");
var gservice = require("~/shared/globalservice");


var observableModule = require("data/observable");
var observableArrayModule = require("data/observable-array");


var me;

var rttemplate = {

}

var rtconsoles = [{
        round: "1",
        fineround: false,
        pause: false,
        running: true,
        active: true,
        result: "2-0",
        match: {
            matchid: "201",
            atletaname: "Giacomo Leopardi"
        }
    },
    {
        round: "2",
        fineround: true,
        pause: false,
        running: true,
        active: true,
        result: "3-6",
        match: {
            matchid: "305",
            atletaname: "Muzio Scevola"
        }
    },
    
    {
        round: "3",
        fineround: false,
        pause: false,
        running: true,
        active: true,
        result: "8-2",
        match: {
            matchid: "507",
            atletaname: "Antonio Puledro"
        }
    }
]











var RealtimeService = (function () {

    me = this;

    var evmanager = new observableModule.Observable;
    var rtarray = new observableArrayModule.ObservableArray;
    var gs = gservice.GlobalService;
    var rtc=[];
    
    gs.e.on("sockmsg", function (ev) {

        var msg = ev.object;
        if (msg.type == "realtime") {
            utils.colog("evento sockmsg->realtime in realtimeservice !!!", JSON.stringify(ev)); //, JSON.stringify(ev));

            if (msg.match) {
                var vtext = msg.match.atletaname + " " + msg.result.replace("-", " a ");
                utils.playVoice(vtext);
                delete msg.match;
            }

            




            //find the corresponding rtarray elements
            var mid = msg.matchid;
            var gid = msg.garaid;
            var x = -1;
            rtarray.forEach(function (item, idx) {
                if ((item.doc.id == mid) && (item.doc.garaid == gid)) {
                    //var doc=item.doc;
                    item.rtdata = msg;
                    item.rtdata.text = item.rtdata.text.replace("<br>", "");
                    item.rtdata.text = item.rtdata.text.replace("<font color='blue'>", "");
                    item.rtdata.text = item.rtdata.text.replace("<font color='black'>", "");
                    item.rtdata.text = item.rtdata.text.replace("</font>", "");

                    //item.rtdata = msg;
                    x = idx;
                    utils.colog("found it !!", JSON.stringify(item));
                    gs.trigger("realtimechange");

                }

            })

            //utils.colog("rtarray",JSON.stringify(rtarray[x]));


        }
        //utils.colog("rtservice rtarray",JSON.stringify(rtservice.rtarray));

    })

    evmanager.on("messaggiocaz", function () {
        console.log("evmanager on messaggiocaz");

    })


    return {

        e: evmanager,

        rtarray: rtarray,

        rtc: rtc,

        syncRealtimeMatches: function (rta, gid) {
            var l = rtarray.length;
            utils.colog("syncRealtimeMathes in realtimeservice for gara " + gid, rta.length);
            //first, check if elements in rta are found in rtarray, if not add them
            rta.forEach(function (item, index) {
                //utils.colog("item",JSON.stringify(item));
                var matchid = item.doc.id;
                var garaid = item.doc.garaid;
                //utils.colog("garaid", garaid, "matchid", matchid);
                var found = false;
                rtarray.forEach(function (item1, index1) {
                    if ((item1.doc.id == matchid) && (item1.doc.garaid == garaid)) found = true;

                })

                if (!found) {

                    var newrt = {
                        rtdata: {
                            text: "TEMPO REALE !",
                            result: "0-0",
                            running: false,
                            paused: true,
                            round: "1",
                            fineround: false,
                            ammoniz1: 0,
                            ammoniz2: 0
                        },
                        doc: item.doc

                    };
                    rtarray.push(newrt);
                }

            })

            utils.colog("checking rta for removals", rta.length);



            rtarray.forEach(function (it, idx) {
                var matchid = it.doc.id;
                var garaid = it.doc.garaid;



                if (garaid == gid) {
                    utils.colog("checking for persistence of match " + matchid);
                    var found = false;

                    rta.forEach(function (item1, index1) {

                        if (item1.doc.id == matchid) found = true;
                    })
                    utils.colog("found", found);
                    if (!found) rtarray.splice(idx, 1);


                }
            });

            console.log("resulting rtarray after sync", rtarray.length);

            rtc=[];
            rtarray.forEach(function(item,idx){
                var newrt=item.rtdata;
                newrt.match=item.doc;
                newrt.temporeale=true;
                rtc.push(newrt);

            })
            console.log("rtc",rtc.length);
             console.log("resulting rtarray after sync", rtarray.length,rtc.length);

            //rtc=rtarray;
            if (rtarray.length != l) gs.trigger("realtimechange");

        },

        getRtc: function(){
            console.log("get rtc",rtc.length);
            return rtc;
        },


        publicMethod: function () {
            utils.colog("called publicmethod of realtimeservice");
        },
        onSocketMsg: function (msg) {
            console.log("RealtimeService onSocketMsg", msg.message)
        },

        trigger: function (ev, evdata) {
            console.log("realtimeservice triggering event", ev);
            var eventData = {
                eventName: ev,
                object: evdata
            };

            evmanager.notify(eventData);

        },
        name: "genoveffo"
    };




})(observableModule.Observable);

//

exports.RealtimeService = RealtimeService;