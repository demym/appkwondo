var http = require("http");
var utils = require("~/shared/utils");
var file = require("~/shared/file");


exports.blueLogin = function (email, psw, callback) {
    utils.colog("bluelogin in backend");
    var url = global.rooturl + "/atleti/login";
    //var email = "demymortelliti@it.ibm.com";
    //var psw = "ser54glr";
    var btoa = "ZGVteW1vcnRlbGxpdGlAaXQuaWJtLmNvbTpzZXI1M2dscg==";
    var authorization = "Basic " + btoa;

    // var auth = new java.lang.String(email + ":" + psw);

    var auth2 = "Basic " + utils.b64encode(email + ":" + psw);

    // console.log("Auth",auth);
    utils.conslog("auth2", auth2);


    //  var auth_encoded = "Basic "+android.util.Base64.encodeToString(auth.getBytes(), android.util.Base64.DEFAULT);

    // var encodeString = android.util.Base64.encodeToString(auth_encoded.getBytes(), android.util.Base64.DEFAULT);
    //   console.log(auth_encoded);
    var data = {
        authorization: auth2
    }


    http.request({
        url: url,
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        content: JSON.stringify(data)
    }).then(function (response) {
        result = response.content.toJSON();
        //console.log("result",JSON.stringify(result));
        if (result.loggedin) {
            global.user = result;
            utils.colog("role", global.user.role);

            if (callback) callback(result);

        } else {
            callback(result);
        }


    }, function (error) {
        console.error(JSON.stringify(error));
        if (callback) callback(error);
    })




}


getPlanner = function (callback) {

    var url = global.rooturl + "/events/listallevents?token=" + global.user.token;
    var repemail = "dino_ravasi@it.ibm.com"
    var body = {
        repemail: repemail,
        rssibm_url: "http://www.ibm.com/events/it/it/index.rss?ca=rss_eventi&me=W&met=eventirh",
        rsspp_url: "http://gse.dst.ibm.com/sales/gss/download/repenabler/FeedProvider?repid=" + repemail + "&pagetype=rep&country=IT&language=it&item=events&type=rss&callback=?",
        format: "json",
        role: global.user.role
    }

    postData(url, body, function (data) {
        //console.log("gotplanner",JSON.stringify(data));
        if (callback) callback(data);

    })


}


getReachme = function (callback) {
    utils.conslog("getreachme")

    var more = global.user.company;
    utils.conslog(more);
    if (global.user.company.toLowerCase().trim() == "ibm") {

        if (global.user.selectedcustomer) {
            more = global.user.selectedcustomer;
        } else more = global.user.customers.split(",")[0];
    }
    var url = global.rooturl + "/reachme/all/" + more;

    utils.conslog(url);
    //var url=global.rooturl+"/reachme/all/"+global.user.role+"/"+global.user.email+"?token="+global.user.token;

    //console.log("url",url)
    fetchData(url, function (data) {
        utils.conslog("got reachme");
        if (callback) callback(data);



    })
}


exports.syncPlanner = function (callback) {
    getPlanner(function (data) {

        utils.colog("getplanner done", data);
        file.writeJsonFile("planner.json", data, function (fdata) {
            utils.conslog(JSON.stringify(fdata));
            if (callback) callback();
        })

    });

}

exports.syncElibrary = function (callback) {
    getElibrary(function (data) {

        utils.colog("getelibrary done", data);
        file.writeJsonFile("elibrary.json", data, function (fdata) {
            utils.conslog(JSON.stringify(fdata));
            if (callback) callback();
        })

    });

}

exports.syncReachme = function (callback) {
    getReachme(function (data) {

        utils.colog("getreachme done", data);
        file.writeJsonFile("reachme.json", data, function (fdata) {
            utils.conslog(JSON.stringify(fdata));
            if (callback) callback();
        })

    });

}

exports.syncAtleti = function (callback) {
    getAtleti(function (data) {

        utils.colog("getatleti done", data);
        file.writeJsonFile("atleti.json", data, function (fdata) {
            utils.conslog(JSON.stringify(fdata));
            if (callback) callback();
        })

    });

}

exports.syncGare = function (callback) {
    getGare(function (data) {

        utils.colog("getgare done", data);
        file.writeJsonFile("gare.json", data, function (fdata) {
            utils.conslog(JSON.stringify(fdata));
            if (callback) callback();
        })

    });

}

exports.syncGara = function (garaid, callback) {
    getGara(garaid, function (data) {

        utils.colog("getgara " + garaid + " done ", data);
        file.writeJsonFile("gara_"+garaid+".json", data, function (fdata) {
            utils.conslog(JSON.stringify(fdata));
            if (callback) callback();
        })

    });

}


getAtleti = function (callback) {
    var url = global.rooturl + "/atleti/findall";
    fetchData(url, function (data) {
        utils.conslog("got atleti");
        if (callback) callback(data);



    })
}


getGare = function (callback) {
    var url = global.rooturl + "/gare/findall";
    fetchData(url, function (data) {
        utils.conslog("got gare");
        if (callback) callback(data);



    })
}

getGara = function (garaid, callback) {
    //var url=global.rooturl+"/gare/findall";
    var url = global.rooturl + "/gare/fullgarabyid/" + garaid + "?societaid=20160217220400";
    fetchData(url, function (data) {
        utils.conslog("got gara " + garaid);
        if (callback) callback(data);



    })

}


getHistoryAtleta = function (atletaid, callback) {
    //var url=global.rooturl+"/gare/findall";
    //http://tkdr.herokuapp.com/gare/history/20150211120920?_=1485091611229
    var url = global.rooturl + "/gare/history/" + atletaid + "?societaid=20160217220400";
    fetchData(url, function (data) {
        utils.colog("got history for atleta " + atletaid);
        if (callback) callback(data);



    })

}





getElibrary = function (callback) {
    var url = global.rooturl + "/elibrary/" + global.user.role + "/" + global.user.email + "?token=" + global.user.token;
    fetchData(url, function (data) {
        utils.conslog("got elibray");
        if (callback) callback(data);



    })
}


getTabulatoImage = function (tabulatoid, callback) {
    var url = global.rooturl + "/tkdt/tabulatoimage/" + tabulatoid + "?token=" + global.user.token;
    utils.conslog("calling url " + url);
    http.getString(url).then(function (response) {
        utils.conslog("got tabulatoimage", response);
        if (callback) callback(response);
    });



}



function getTkdt(tkdtid,callback){

 var url="http://tkdr.herokuapp.com/tkdt/get/"+tkdtid;
    fetchData(url, function (data) {
        utils.conslog("got tkdt");
        if (callback) callback(data);



    })

}


function getMedagliereGiorno(giornoid,callback){

    var url="http://tkdr.herokuapp.com/tkdt/medagliere/"+giornoid;
    utils.conslog("calling url " + url);
    http.getString(url).then(function (response) {
        //console.log("got tabulatoimage", response);
        if (callback) callback(response);
    });
}


var postData = function (url, data, callback) {

    if (url.indexOf("token") == -1) url += "?token=" + global.user.token;
    utils.conslog("calling url ", url);


    http.request({
        url: url,
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        content: JSON.stringify(data)
    }).then(function (response) {
        var result = response.content.toJSON();
         utils.conslog(result);
        if (callback) callback(result);
       
    }, function (e) {
        console.log("Error occurred " + e);
        if (callback) callback(e);
    });

}

fetchData = function (url, callback) {
    utils.conslog("fetchdata");
    if (url.indexOf("token") == -1) {
        if (url.indexOf("?") == -1) {
            url += "?token=" + global.user.token;
        } else url += "&token=" + global.user.token;

    }
    utils.colog("calling url ", url);

    http.getJSON(url).then(function (result) {
        if (callback) callback(result);
    }, function (error) {
        console.error(JSON.stringify(error));
        if (callback) callback(error);
    });
}


getData=function(url,callback){
     http.getString(url).then(function (result) {
        if (callback) callback(result);
    }, function (error) {
        console.error(JSON.stringify(error));
        if (callback) callback(error);
    });

}

function fetchChat(callback) {

    fetch(global.rooturl+"/chat/get").then(function (response) {
        return response.json();
    }).then(function (r) {
        // Argument (r) is JSON object
        if (callback) callback(r);
    }, function (e) {
        // Argument (e) is Error!
        alert("Errore: " + e);
        callback(e);
    });


}


function getRanking(callback){
    var url=global.rooturl+"/atleti/ranking/save";
    fetchData(url,function(data){
        if (callback) callback(data);
    })
}

function getRealtime(callback){
    var url=global.rooturl+"/realtime";
    fetchData(url,function(data){
        if (callback) callback(data);
    })
}






exports.fetchData = fetchData;
exports.getData = getData;
exports.postData=postData;
exports.getPlanner = getPlanner;
exports.getElibrary = getElibrary;
exports.getReachme = getReachme;
exports.getAtleti = getAtleti;
exports.getGare = getGare;
exports.getGara = getGara;
exports.getHistoryAtleta = getHistoryAtleta;
exports.getTabulatoImage = getTabulatoImage;
exports.getMedagliereGiorno=getMedagliereGiorno;
exports.getTkdt=getTkdt;
exports.getRanking=getRanking;
exports.getRealtime=getRealtime;
exports.fetchChat=fetchChat;