var topmost = require("ui/frame").topmost;
var TTS = require("nativescript-texttospeech");
var platformModule = require("platform");
var application = require("application");
var socket = require("~/shared/socket");
var file = require("~/shared/file");
var appSettings = require("application-settings");
var sound = require("nativescript-sound");
var audio = require("nativescript-audio");
var Toast = require("nativescript-toast");
var LocalNotifications = require("nativescript-local-notifications");
var dialogs = require("ui/dialogs");
var animationModule = require('ui/animation');
var platformModule = require('platform');
var absoluteLayoutModule = require('ui/layouts/absolute-layout');
var debugActive = false;
var tts = new TTS.TNSTextToSpeech();
var http = require("http");

var fs = require("file-system");
var documents = fs.knownFolders.currentApp();


var options = [{
        name: "notifications",
        text: "Notifiche",
        value: false
    },
    {
        name: "voice",
        text: "Output vocale",
        value: false
    }, {
        name: "sound",
        text: "Suoni",
        value: false
    }
]

var elMenu;
var elMainContent;
var page;

var chatsound = sound.create("~/sound/roundstart.mp3");

var menu = global.menu;
var player;


exports.playVoice = function (txt) {


    if (appSettings.getBoolean("voice", false) == false) {
        console.log("voice settings is false");
        return;
    }

    var plat = platformModule.device.os.toLowerCase();
    var speakrate = 0.5;

    if (plat != "ios") speakrate = 1;

    tts.speak({
        text: txt, /// *** required ***
        speakRate: speakrate, // optional - default is 1.0
        pitch: 1.0, // optional - default is 1.0
        volume: 1.0, // optional - default is 1.0
        language: "it-IT", // optional - default is system language,*/
        finishedCallback: function () {
            console.log("finished speaking");
        }
    });
}


exports.sgetCategoria = function (dn, useCurrentDate) {

    return dn;
}

exports.getCategoria = function (dn, referral_date) {


    var cat = "senior a";
    var curyear = new Date().getFullYear();
    //console.log("curyear "+curyear)
    if (referral_date) {
        var arrd = referral_date.split("/");
        var annogara = arrd[2];
        curyear = annogara;
    }
    //sdebug("curyear: "+curyear);

    if (dn.trim() == "") {
        return "senior b";
    }
    var ar = dn.split(".");
    var byear = ar[2];

    var eta = parseInt(curyear, 10) - parseInt(byear, 10);
    //sdebug("calcolo età: "+eta);

    if ((eta >= 18) && (eta <= 35)) cat = "senior a";
    if ((eta >= 15) && (eta <= 17)) cat = "junior";
    if ((eta >= 12) && (eta <= 14)) cat = "cadetti a";
    if ((eta >= 10) && (eta <= 11)) cat = "cadetti b";
    if (eta > 35) cat = "senior b";
    if (eta < 10) cat = "esordienti";


    return cat

}

exports.setLoading = function (b) {
    var aiwidth = 20;
    var aiheight = 20;
    //isLoading=b;
    var page = topmost().currentPage;
    console.log("setLoading " + b);
    var ai = page.getViewById("ai");
    if (ai) {
        colog("ai found in this page");
        ai.busy = b;
        if (ai.busy) {
            ai.width = aiwidth;
            ai.height = aiheight;
        } else {
            ai.width = 0;
            ai.height = 0;
            //ai.hide();
        }


    }

}



exports.playChatSound = function () {
    colog("playing sound");
    //chatsound.play();
}


exports.playRemoteSound = function (url) {
    var filePath = fs.path.join(fs.knownFolders.documents().path, "downloadedfile.m4a");
    conslog("Donwloading file " + url);
    http.getFile(url, filePath).then(function (r) {
        //// Argument (r) is File!
        conslog("file downloaded to " + filePath);
        /*fs.readSync(function (e) {
            console.log("e", e);
        })*/
        if (!player) player = new audio.TNSPlayer();
        console.log(JSON.stringify(player));
        player.playfromFile({
            audioFile: filePath, // ~ = app directory
            loop: false,
            completeCallback: function () {
                console.log("audio play completed")
            },
            errorCallback: function () {
                console.log("audio play error")
            },
            infoCallback: function (args) {
                console.log("infocallback", JSON.stringify(args));
            }
        }).then(function () {
            console.log("is playing")
            /*player.getAudioTrackDuration().then(function (duration) {
                // iOS: duration is in seconds
                // Android: duration is in milliseconds
                console.log("song duration", duration);
            });*/
        });


    }, function (e) {
        //// Argument (e) is Error!
    });


}

exports.playSound = function (fn) {
    if (fn) {
        //var cs = sound.create(fn);  
        //var chatsound = sound.create("~/sounds/chat.mp3");
        //cs.play();
        console.log("player", JSON.stringify(player));

        if (!player) player = new audio.TNSPlayer();

          player.playFromUrl({
                audioFile: fn, // ~ = app directory
                loop: false,
                completeCallback: function () {
                    console.log("audio play completed")
                },
                errorCallback: function () {
                    console.log("audio play error")
                },
                infoCallback: function (args) {
                    console.log("infocallback", JSON.stringify(args));
                }
            }).then(function () {
                console.log("is playing")
                /*player.getAudioTrackDuration().then(function (duration) {
                    // iOS: duration is in seconds
                    // Android: duration is in milliseconds
                    console.log("song duration", duration);
                });*/
            });



        /*
        
        
        
        player.dispose().then(function () {



            console.log("Media Player Disposed");
            console.log("player", JSON.stringify(player));


          
        }, function (err) {
            console.log(err);
        });
        */


        /*  player.dispose().then(function () {
              console.log("Media Player Disposed, initializing new play");
      
          }, function (err) {
              console.log(err);
          });*/


    } else {
        chatsound.play();
    }
}

exports.stopSound = function () {
    if (!player) return;
    player.dispose().then(function () {
        console.log("Media Player Disposed");
    }, function (err) {
        console.log(err);
    });
}


colog = function () {
    var dbg = debugActive;
    if (!dbg) return;
    console.log.apply(console, arguments);
}

conslog = function () {
    var dbg = debugActive;
    if (!dbg) return;
    console.log.apply(console, arguments);
}

exports.navBtnTap = function (args) {
    //BasePage.prototype.toggleDrawer();
    console.log(args);
    var btn = args.object;
    //var pagename=menu[args.index].title;
    var pageName = btn.text.toLowerCase();

    //console.log("pagename",pageName);
    if (pageName == "logout") {

        global.user = {};
        file.readJsonFile("remembme.json", function (data) {

            data.rememberme = false;
            file.writeJsonFile("remembme.json", data, function (fdata) {
                console.log("setted rememberme to false");
                //alert("minchia")
                topmost().navigate("pages/login/login");
                return;
            })

        })
    } else topmost().navigate("pages/" + pageName + "/" + pageName);
    //appViewModel.set("meimage", meimage);

}



var b64encode = function (input) {

    var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

    var output = "";


    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;


    var i = 0;




    input = _utf8_encode(input);




    while (i < input.length) {




        chr1 = input.charCodeAt(i++);


        chr2 = input.charCodeAt(i++);


        chr3 = input.charCodeAt(i++);




        enc1 = chr1 >> 2;


        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);


        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);


        enc4 = chr3 & 63;




        if (isNaN(chr2)) {


            enc3 = enc4 = 64;


        } else if (isNaN(chr3)) {


            enc4 = 64;


        }




        output = output +


            _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +


            _keyStr.charAt(enc3) + _keyStr.charAt(enc4);




    }




    return output;


}


_utf8_encode = function (string) {


    string = string.replace(/\r\n/g, "\n");


    var utftext = "";




    for (var n = 0; n < string.length; n++) {




        var c = string.charCodeAt(n);




        if (c < 128) {


            utftext += String.fromCharCode(c);


        } else if ((c > 127) && (c < 2048)) {


            utftext += String.fromCharCode((c >> 6) | 192);


            utftext += String.fromCharCode((c & 63) | 128);


        } else {


            utftext += String.fromCharCode((c >> 12) | 224);


            utftext += String.fromCharCode(((c >> 6) & 63) | 128);


            utftext += String.fromCharCode((c & 63) | 128);


        }




    }




    return utftext;


}

LocalNotifications.addOnMessageReceivedCallback(
    function (notificationData) {
        dialogs.alert({
            title: "Notification received",
            message: "ID: " + notificationData.id +
                "\nTitle: " + notificationData.title +
                "\nBody: " + notificationData.body,
            okButtonText: "Excellent!"
        });
    }
);

exports.grantLocalNotificationsPermissions = function () {
    LocalNotifications.requestPermission().then(
        function (granted) {
            console.log("Permission granted? " + granted);
        }
    )


}

exports.localNotify = function (msg) {
    console.log("localnotify", msg);
    LocalNotifications.schedule([{
        id: 0,
        title: "AppKwonDo",
        body: msg,
        ticker: msg
    }]).then(function () {
        console.log("Notification scheduled");
    }, function (error) {
        console.log("ERROR", error);
    });
}


function toggleMenu() {






    var newv = "collapsed";

    var v = elMenu.visibility;
    if (v == "collapsed") newv = "visible";
    elMenu.visibility = "visible";
    var view = page.getViewById("menuwrapper");

    var posx = view.translateX;
    console.log("viewleft", posx);
    var duration = 150;
    var closepos = -600;

    if (posx == closepos) {
        view.animate({
            translate: {
                y: 0,
                x: 0
            },
            duration: duration
        });

    } else {

        view.animate({
            translate: {
                y: 0,
                x: closepos
            },
            duration: duration
        });


    }


    return;

    elMenu.visibility = newv;
    console.log(v);


}







exports.setMenu = function (s) {


    s.set("username", global.user.firstname + " " + global.user.lastname);
    s.set("useremail", global.user.email);
    s.set("userrole", global.user.role);
    s.set("usercompany", global.user.company);
    s.set("menu", menu);
    var userimg = global.preimg + global.user.userphoto;
    s.set("userimg", userimg);

}


var getMaschiFemmine = function ($mr, su_cosa) {
    //colog("getmaschifemmine");
    //colog(jcurrentgara.iscritti)
    var $m = $mr;
    if ($mr.rows) $m = $mr.rows;
    //var iscritti = jcurrentgara.iscritti.split(",");
    var maschi = 0;
    var femmine = 0;
    for (var i = 0; i < $m.length; i++) {
        //$($m).each(function (i) {
        //console.log("$M: "+JSON.stringify($m[i]))
        var $a;
        if (su_cosa == "iscritti") {
            $a = getAtletaById($m[i]);
        } else $a = getAtletaById($m[i].doc.atletaid);

        var sesso = "M";
        if ($a.sesso) sesso = $a.sesso.toUpperCase();

        if (sesso == "M") maschi++;
        if (sesso == "F") femmine++;
        //console.log($a.cognome+" "+$a.nome+" - "+sesso);

    }

    var retvalue = {
        maschi: maschi,
        femmine: femmine
    }

    return retvalue;





}


var getMedaglieGara = function ($m) {
    //console.log("$m",$m.rows.length);
    //alert($m);
    var ori = 0;
    var argenti = 0;
    var bronzi = 0;
    for (var i = 0; i < $m.rows.length; i++) {
        //$($m.rows).each(function (i) {
        var match = $m.rows[i].doc;
        var mid = match.garaid;
        var datanasc = match.datanascita;
        var med = match.medagliamatch.trim();
        //console.log(med);
        //var computa=false;
        var computa = true;
        /*
         if ($.trim(viewcat)!="")
          {
          var catatleta=getCategoria(datanasc);
          sdebug("categoria : "+catatleta);				  
          if  ($.trim(viewcat)==$.trim(catatleta)) computa=true;	 
        			   
          } else computa=true;
        */
        if (computa) {
            if (med.trim() == "oro") ori++;
            if (med.trim() == "argento") argenti++;
            if (med.trim() == "bronzo") bronzi++;


        }

    }
    var medals = {
        ori: ori,
        argenti: argenti,
        bronzi: bronzi
    }
    //var retvalue = "<span style='color: yellow;'>ORI: <b>" + ori + "</b></span>&nbsp;&nbsp;&nbsp;<span style='color: silver;'>ARG: <b>" + argenti + "</b></span>&nbsp;&nbsp;&nbsp;<span style='color: orange;'>BRO: <b>" + bronzi + "</b></span>";
    return medals;

}

var filterRows = function ($m, filt, exact) {
    if (!exact) exact = false;
    //console.log("filterrows: ")
    //console.log($m)
    var $retrows = {
        rows: []
    };

    var rows = $m;
    if ($m.rows) rows = $m.rows;
    //var rows = $m.rows; //[{person:"me", age :"30"},{person:"you",age:"25"}];

    for (var i = 0; i < rows.length; i++) {

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
                        //console.log(v2);
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


var getAtletaById = function (id) {

    //var atleti=appModule.resources["atleti"];
    var atleti = global.atleti;
    //console.log("atleti: "+atleti.rows.length);
    var retvalue = {};

    for (var i = 0; i < atleti.rows.length; i++) {

        var row = atleti.rows[i];
        var doc = row.doc;
        if (doc.id == id) {


            return doc;
        }

    }

    return retvalue;
}

exports.normalizeName = function (name) {
    var retvalue = "";
    name = name.replaceAll("à", "a'");
    name = name.replaceAll("è", "e'");
    name = name.replaceAll("ì", "i'");
    name = name.replaceAll("ò", "o'");
    name = name.replaceAll("ù", "u'");
    return name;

}

String.prototype.replaceAll = function (find, replace) {
    var str = this;
    return str.replace(new RegExp(find.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1"), 'g'), replace);
};

exports.getDateString = function (d) {

    var YY = d.getFullYear();
    var MM = parseInt(d.getMonth(), 10) + 1;
    var DD = d.getDate();

    var hh = d.getHours();
    var mm = d.getMinutes();
    var ss = d.getSeconds();

    YY = Right("0000" + YY, 4);
    MM = Right("0000" + MM, 2);
    DD = Right("0000" + DD, 2);
    hh = Right("0000" + hh, 2);
    mm = Right("0000" + mm, 2);
    ss = Right("0000" + ss, 2);


    var sdata = DD + "/" + MM + "/" + YY + " " + hh + ":" + mm + ":" + ss;
    return sdata;

}


exports.getJulianDateOnly = function (sdate) {
    //conslog("getjuliandateonly",sdate);
    var yyyy = sdate.substring(6, 10);
    var mm = sdate.substring(3, 5);
    var dd = sdate.substring(0, 2);
    var jdate = yyyy + mm + dd;
    //conslog("jdate",jdate);
    return jdate;
}

function Left(str, n) {
    if (n <= 0)
        return "";
    else if (n > String(str).length)
        return str;
    else
        return String(str).substring(0, n);
}

function Right(str, n) {
    if (n <= 0)
        return "";
    else if (n > String(str).length)
        return str;
    else {
        var iLen = String(str).length;
        return String(str).substring(iLen, iLen - n);
    }
}



function getOptions() {
    options.forEach(function (item, idx) {
        var key = item.name;
        var boolValue = appSettings.getBoolean(key, false);
        item.value = boolValue

    })
    return options;

}


function saveOptions(opt) {
    opt.forEach(function (item, idx) {
        appSettings.setBoolean(item.name, item.value);

    })

}

exports.toast = function (txt) {
    var toast = Toast.makeText(txt);
    toast.show();
}


exports.getAudioUrl = function (callback) {
    var fname = documents.path + "/recorded.mp3";
    var sourceFile = fs.File.fromPath(fname);
    console.log("sourcefile", JSON.stringify(sourceFile));

    var source = sourceFile.readSync(e => {
        console.log("e", e);
        error = e;
    });
    //console.log("source",source);
    var b64 = android.util.Base64.encodeToString(source, android.util.Base64.NO_WRAP);


    sourceFile.readText().then(function (content) {
        // content contains the data read from the file
        //console.log("content", content);
        const text = new java.lang.String(content);

        var data = text.getBytes("UTF-8");


        const base64Encoded = android.util.Base64.encodeToString(data, android.util.Base64.NO_WRAP);
        //console.log("encoded", base64Encoded);

        //var b64=b64encode(content);
        //var b64=b64encode(b);

        var adata = "data:audio/mpeg;base64," + b64;

        callback(adata);
    });



    return;



}


exports.colog = colog;
exports.conslog = conslog;
exports.toggleMenu = toggleMenu;
exports.getAtletaById = getAtletaById;
exports.filterRows = filterRows;
exports.getMaschiFemmine = getMaschiFemmine;
exports.getMedaglieGara = getMedaglieGara;
exports.Left = Left;
exports.Right = Right;
exports.getOptions = getOptions;
exports.saveOptions = saveOptions;
exports.b64encode = b64encode;