var mongo = require('../routes/mongo');
var utils = require("../routes/utils");


var rta = [];
var scoreboards=[];

initRealtime();


function initRealtime(callback) {
    var rtcount=0;
    
    mongo.getallfiles(function (data) {
        //console.log(data.length + " files read");
        
        data.forEach(function (item, idx) {
            var filename = item.filename;
            
            if (filename.indexOf("matches_") > -1) {
                //console.log(filename);
                var garaid = filename.split("_")[1];
                var matches = item.filecontent;
                if (matches.rows){
                matches.rows.forEach(function (mitem, midx) {
                    var match = mitem.doc;
                    if (match.hasOwnProperty("realtime")) {
                        if (String(match.realtime) == "true") {
                            rtcount++;
                            var newrtm = {
                                "type": "realtime",
                                "to": "all",
                                "garaid": garaid,
                                "matchid": match.id,
                                "result": "0-0",
                                "round": "1",
                                "fineround": false,
                                "running": true,
                                "paused": false,
                                "ammoniz1": 0,
                                "ammoniz2": 0,
                                "event": "realtime",
                                "text": "TEMPO REALE !",
                                "active":true,
                                "match": match
                            }
                            syncRealtimeMatches(newrtm);
                        }
                    }

                })
                }
            }

        })


        console.log("Initialized realtimematches ",rtcount+" realtime matches restored");
        if (callback) callback();

    })
}






function getRealtimeMatches() {
    return rta;
}

function clearRealtime(){
    rta=[];
}

function clearScoreboards(){
    scoreboards=[];
}

function getScoreboards(){
    return scoreboards;
}

function syncRealtimeMatches(rtm) {
   console.log("syncrealtime ", rtm);

    var found = false;
    rta.forEach(function (item, idx) {

        //console.log("rta item",item);

        if ((item.match.garaid == rtm.match.garaid) && (item.match.id == rtm.match.id)) {
            found = true;
            console.log("match "+item.match.garaid+" "+item.match.id+" found, updating it in realtimematches")
            rta[idx] = rtm;
        }

    })
    if (!found) {
        console.log("match not found, adding it to realtimematches");
        rta.push(rtm);
    }
    
}

function syncScoreboards(rtm) {
    console.log("syncscoreboards ", rtm);
 
     var found = false;
     scoreboards.forEach(function (item, idx) {
 
         //console.log("rta item",item);
 
         if ((item.clientid == rtm.clientid)) {
             found = true;
             console.log("clientid "+item.clientid+" found, updating it in scoreboards")
             scoreboards[idx] = rtm;
         }
 
     })
     if (!found) {
         console.log("clientid not found, adding it to scoreboards");
         scoreboards.push(rtm);
     }
     
 }

 function updateScoreboards(rtm) {
    console.log("updatescoreboards ", rtm);
 
     var found = false;
     scoreboards.forEach(function (item, idx) {
 
         //console.log("rta item",item);
 
         if ((item.clientid == rtm.clientid)) {
             found = true;
             console.log("clientid "+item.clientid+" found, updating it in scoreboards")
             scoreboards[idx] = rtm;
         }
 
     })
     if (!found) console.log("clientid not found, not updated in scoreboards");
     
 }

function updateRealtimeMatches(rtm) {
   console.log("updaterealtime ", rtm);

    var found = false;
    rta.forEach(function (item, idx) {

        //console.log("rta item",item);

        if ((item.match.garaid == rtm.match.garaid) && (item.match.id == rtm.match.id)) {
            found = true;
            console.log("match "+item.match.garaid+" "+item.match.id+" found, updating it in realtimematches")
            rta[idx] = rtm;
        }

    })
    if (!found) console.log("match not found, not updated in updateRealtimeMatches");
    
}

function remove(garaid, matchid) {
    console.log("realtime remove garaid",garaid,"matchid",matchid);
    var found=false;
    rta.forEach(function (item, idx) {
        //console.log("item",item);
        if ((item.match.garaid == garaid) && (item.match.id == matchid)) {
            rta.splice(idx, 1);
            found=true;
            console.log("match found !!!!!");
            
        }


    })
    console.log("resulting rta",rta);
    if (!found) console.log("tried to remove garaid "+garaid+" matchid "+matchid+" from realtimematches but not found it, all ok");
}


function removeScoreboard(clientid) {
    console.log("scoreboard remove clienti",clientid);
    var found=false;
    scoreboards.forEach(function (item, idx) {
        //console.log("item",item);
        if ((item.clientid == clientid)) {
            scoreboards.splice(idx, 1);
            found=true;
            console.log("scoreboard found !!!!!");
            
        }


    })
    console.log("resulting scoreboards",scoreboards);
    if (!found) console.log("tried to remove clientid "+clientid+" from scoreboards but not found it, all ok");
}





exports.getRealtimeMatches = getRealtimeMatches;
exports.syncRealtimeMatches = syncRealtimeMatches;
exports.updateRealtimeMatches = updateRealtimeMatches;
exports.remove = remove;
exports.clearRealtime=clearRealtime;
exports.initRealtime=initRealtime;
exports.clearScoreboards=clearScoreboards;
exports.removeScoreboard=removeScoreboard;
exports.getScoreboards=getScoreboards;
exports.syncScoreboards=syncScoreboards;
exports.updateScoreboards=updateScoreboards;
