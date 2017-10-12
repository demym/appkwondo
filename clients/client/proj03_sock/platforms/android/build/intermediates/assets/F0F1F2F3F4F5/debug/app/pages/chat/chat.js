//var createViewModel = require("./main-view-model").createViewModel;
var SocketIO = require('nativescript-socket.io');
var textFieldModule = require("ui/text-field");
var listViewModule = require("ui/list-view");
var labelModule = require("ui/label");
var observableArrayModule = require("data/observable-array");
var observableModule = require("data/observable");
var view = require("ui/core/view");
var gl = require("ui/layouts/grid-layout");
var ChatViewModule = require("nativescript-chatview");
var glbservice = require("../../shared/globalservice");
var realtimeservice = require("../../shared/realtimeservice");
//var sock = require("../../shared/socket");
var utils = require("../../shared/utils");
var backend = require("../../shared/backend");
var moment = require("moment");
var imageSource = require("image-source");
var bufferModule = require("buffer");

var frameModule = require("ui/frame");
var http = require("http");
var platform = require("platform")
var camera = require("nativescript-camera");
var appSettings = require("application-settings");
var audio = require("nativescript-audio");
var fs = require("file-system");
var documents = fs.knownFolders.currentApp();


var source = new observableModule.Observable();
var observableArray = require("data/observable-array");


var timer = require("timer");

var base64 = require('base-64');
var utf8 = require('utf8');

var socket;
var page;
var tf1;
var lv1;
var lvrt;
var gl;
var lvrtrowheight = 59;
var player = new audio.TNSPlayer();

var gs = glbservice.GlobalService;
var rtservice = realtimeservice.RealtimeService;
var chat = [];
var rtmatches=[];



gs.e.on("realtimematches", function (data) {
    utils.conslog("evento realtimematches in chat.js !!", JSON.stringify(data));
    var matches = data.object.matches;
    updateRealTime(matches);
})


gs.e.on("sockmsg", function (ev) {
    //console.log("evento sockmsg in chat !!!");
    var obj = ev.object;
    var tipo = obj.type;
    if (tipo == "notification") {

        if (obj.updategara) {
           // if (obj.updategara == "yes") renderRealTime();
        }
    }
    
    //utils.colog("rtservice rtarray",JSON.stringify(rtservice.rtarray));

})

gs.e.on("chatmsg", function (ev) {


    var ev1 = JSON.parse(JSON.stringify(ev.object));
    delete ev1.foto;

    utils.conslog("chatmsg received in chat.js");

    var data = ev.object;

    data.isRight = false;
    data.img = "~/img/user.png";
    utils.conslog("global.user.nickname", global.user.nickname);
    if (data.nickname == global.user.nickname) data.isRight = true;
    utils.conslog("chat length: " + chat.length);
    chat.push(data);
    utils.conslog("chat length: " + chat.length);
    source.set("chat", chat);
    //var lv1 = page.getViewById("lv1");
    //lv1.items=chat;
    lv1.refresh();
    refreshChat();
    /*
    lv1.items=chat;
    lv1.refresh();
    lv1.scrollToIndex(chat.length - 1);
    */

})




function updateRealTime(matches) {
    var data=matches;
    
    data.forEach(function (item, idx) {
        item.tnstext = item.text.replace(/<(?:.|\n)*?>/gm, '');
    })
    rtmatches=data;
    source.set("rtmatches",rtmatches);
    //lvrt.items = data;
    lvrt.height = lvrtrowheight * data.length;
    //lvrt.items = rtarray;
    //lvrt.height = lvrtrowheight * rtarray.length;
    gl.height = lvrt.height;

    lvrt.refresh();

}

function renderRealTime() {
    //return;


    global.socket.emit('getrealtimematches');

    return;

}


function refreshChat() {

    //var lv1 = view.getViewById(page, "lv1");
    rightizeChat(chat);
    lv1.refresh();
    lv1.scrollToIndex(chat.length - 1);

}








var realtime = [{
        matchn: "102",
        text: "match in corso"
    },
    {
        matchn: "204",
        text: "pausa primo round"
    },
    {
        matchn: "307",
        text: "golden point"
    }
];

//var rtarray = new observableArrayModule.ObservableArray(rtservice.rtarray);
rtarray = rtservice.rtarray;

/*
var chat = [{
        time: "201609011024",
        text: "eccoce",
        nickname: "tns"
    },
    {
        time: "201609011024",
        text: "e allura",
        nickname: "manlio"
    },
    {
        time: "201609011024",
        text: "ciao fagiano",
        nickname: "gordo"
    },
    {
        time: "201609011024",
        text: "ciao mosca",
        nickname: "tns"
    }
];
*/


var nickname = global.nickname;
var userimg = "~/img/user.png";

function rightizeChat() {

    for (var i = 0; i < chat.length; i++) {
        var ch = chat[i];

        ch.img = "~/img/user.png";
        var isRight = false;
        if (ch.nickname) {

            //console.log(ch.nickname+" - "+global.user.nickname);
            if (ch.nickname.toLowerCase() == global.user.nickname.toLowerCase()) isRight = true;

            //console.log("isright for nick "+ch.nickname+": "+isRight);


        }
        ch.isRight = isRight;
        ch.side = "left";
        if (String(ch.isRight) == "true") ch.side = "right";


        if (ch.color) {
            if (ch.color.toLowerCase() == "yellow") {
                ch.side = "center";
            }

        }
        if (ch.audiourl) utils.conslog("audiourl", ch.audiourl);
        chat[i] = ch;


    }


}

function onTap() {
    utils.conslog("ontap");
    var tf1 = page.getViewById("tf1");
    //var ht1=view.getViewById(page, "ht1");
    //ht1.html="<b>ciao frantoio</b>";
    if (!tf1.text) return;
    utils.conslog(tf1.text);


    var chatmsg = {
        nickname: nickname,
        sockid: socket.id,
        text: tf1.text,
        img: userimg
    }
    //socket.emit('chatmsg', chatmsg);
    postChat(chatmsg);
    tf1.text = "";
    if (tf1.android) {
        tf1.android.clearFocus();
    }


    //chat.push(chatmsg);
    //refreshChat();

}


function postChat(msg) {
    utils.conslog("posting chat");
    http.request({
        url: global.rooturl + "/chat/put",
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        content: JSON.stringify(msg)
    }).then(function (response) {
        //result = response.content.toJSON();
        // console.log("response",JSON.stringify(response));
        utils.conslog("chat posted");
    }, function (e) {
        console.log("Error occurred " + e);
    });

}


function onLoaded(args) {
    page = args.object;
    gs.unreadchat = [];
    utils.conslog("page loaded");
    source.set("rtmatches",rtmatches);

    lv1 = view.getViewById(page, "lv1");
    lvrt = page.getViewById("lvrt");
    lvrt.rowHeight = lvrtrowheight;
    gl = page.getViewById("gl");

    renderRealTime();

    /* backend.getRealtime(function (data) {
         console.log("matches in realtime", data.length);
         console.log(JSON.stringify(data));
         lvrt.items = data;
         lvrt.height = lvrtrowheight * data.length;
         //lvrt.items = rtarray;
         //lvrt.height = lvrtrowheight * rtarray.length;
         gl.height = lvrt.height;
         lvrt.refresh();


     })*/



    var url = "http://tkdr.herokuapp.com";


    var width1 = platform.screen.mainScreen.widthDIPs;
    var width2 = platform.screen.mainScreen.widthPixels;
    utils.conslog("width", width1, width2);

    var pos = parseInt(width1, 10) - 80;

    utils.conslog("pos", pos);

    source.set("fotoleft", String(pos));
    //source.set("fotoleft",width1);
    source.set("chatfocus", false);
    source.set("isRecording", false);
    source.set("chat", chat);


    page.bindingContext = source;
    socket = global.socket;

    fetchChat(function (data) {
        chat = data.rows;

        var lastchattimestamp = chat[chat.length - 1].time;
        appSettings.setString("lastchattimestamp", lastchattimestamp);
        gs.unreadchat = [];
        utils.conslog("lastchattimestamp", lastchattimestamp);
        rightizeChat(chat);
        //console.log("Chat",JSON.stringify(chat))
        source.set("chat", chat);
        //lv1.items = chat;
        lv1.scrollToIndex(chat.length - 1);
    });

}

exports.refetchChat = function () {
    utils.conslog("refetching chat");
    fetchChat(function (data) {
        chat = data.rows;

        var lastchattimestamp = chat[chat.length - 1].time;
        appSettings.setString("lastchattimestamp", lastchattimestamp);
        gs.unreadchat = [];
        utils.conslog("lastchattimestamp", lastchattimestamp);
        rightizeChat(chat);
        //console.log("Chat",JSON.stringify(chat))
        //source.set("chat",chat);
        lv1.items = chat;
        lv1.scrollToIndex(chat.length - 1);
        utils.conslog("chat refetched");
    });


}

function getTime() {
    var now = new Date();

    var hours = now.getHours();
    return numberToString(hours == 12 ? 12 : (hours % 12)) + ":" + numberToString(now.getMinutes()) + " " +
        (hours < 13 ? "AM" : "PM");
}

function numberToString(n) {
    var str = "" + n;
    if (n < 10) {
        str = "0" + str;
    }
    return str;
}


function fetchChat(callback) {

    fetch("http://tkdr.herokuapp.com/chat/get").then(function (response) {
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


function onNavBtnTap(args) {

    /*frameModule.topmost().navigate({
    	moduleName: "homepage",
    	context: {}
    	
    });*/

    frameModule.topmost().goBack();



}


function scrollTop() {
    lv1.scrollToIndex(0);

}

function scrollBottom() {
    lv1.scrollToIndex(chat.length - 1);

}

function doAddOnMessageReceivedCallback() {
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
}


exports.playChatAudio = function (args) {
    var btn = args.object;
    var item = btn.bindingContext;
    utils.conslog("item", item.audiourl);
    utils.playSound(item.audiourl);
    //utils.playRemoteSound(item.audiourl);
}
exports.stopChatAudio = function (args) {
    var btn = args.object;
    var item = btn.bindingContext;
    utils.conslog("item", item.audiourl);
    utils.stopSound(item.audiourl);
}

exports.selectItemTemplate = function (item, index, items) {
    var retvalue = "normal";
    if (item.fotourl) retvalue = "photo";
    if (item.audiourl) {
        retvalue = "audio";
        item.html = "<a href='" + item.audiourl + "'>PLAY</a>";
        item.html = '<audio controls><source src="horse.ogg" type="audio/ogg"><source src="' + item.audiourl + '" type="audio/mpeg">Your browser does not support the audio element.</audio>'
    }
    item.timestamp = moment(item.time, 'YYYYMMDDHHmmSS').format('DD/MM/YYYY HH:mm:SS');
    //console.log("itemtemplate", retvalue, JSON.stringify(item));
    return retvalue;
}


exports.scattaFoto = function () {
    utils.conslog("scattafoto");
    var imageModule = require("ui/image");

    var options = {
        width: 300,
        height: 300,
        keepAspectRatio: true,
        saveToGallery: false
    };
    camera.requestPermissions();
    camera.takePicture(options)
        .then(function (imageAsset) {
            utils.conslog("Size: " + imageAsset.options.width + "x" + imageAsset.options.height);
            utils.conslog("keepAspectRatio: " + imageAsset.options.keepAspectRatio);
            utils.conslog("Photo saved in Photos/Gallery for Android or in Camera Roll for iOS");
            /*var vbase64 = imageAsset.toBase64String("jpeg", 100);
            console.log("vbase64",vbase64);*/
            imageSource.fromAsset(imageAsset).then(function (res) {
                utils.conslog("res", res);
                var myImageSource = res;
                var base64 = myImageSource.toBase64String("jpeg", 100);
                //console.log("base64",base64);
                base64 = "data:image/jpeg;base64," + base64;
                utils.conslog(base64.substring(0, 40) + ".....");
                var postdata = {
                    garaid: "",
                    nickname: global.user.nickname,
                    sockid: global.user.sockid,
                    foto: base64,
                    text: ""
                }
                postChat(postdata);
            })
        }).catch(function (err) {
            console.log("Error -> " + err.message);
        });
}

exports.chatfocus = function () {
    utils.conslog("chatfocus");
    source.set("chatfocus", true);
}



var recorder;
var recaudiofilename = documents.path + "/recorded.m4a";
var recorded = false;
exports.recordAudio = function (args) {
    recorded = false;
    if (recorded) {

        var enc = utils.getAudioUrl(function (adata) {
            // console.log(adata);

            var msg = {
                garaid: "",
                nickname: global.user.nickname,
                sockid: global.user.sockid,
                audio: adata,
                text: ""
            }

            //postChat(msg);
        });



        return;
    }
    var butrecord = page.getViewById("chataudio");
    var butstop = page.getViewById("chataudiostop");
    var labrecording = page.getViewById("labrecording");

    var isrecording = source.get("isRecording");
    utils.conslog("recordaudio", isrecording)
    if (isrecording) {

        //but.text="&#xf130";
        butstop.visibility = "collapsed";
        butrecord.visibility = "visible";
        labrecording.visibility = "collapsed";
        player.dispose().then(function () {
            utils.conslog("Media Player Disposed");
        }, function (err) {
            console.log(err);
        });
        //player = new audio.TNSPlayer();
        recorder.stop().then(function () {
            source.set("isRecording", false);
            utils.conslog("recording stopped");


            var sourceFile = fs.File.fromPath(recaudiofilename);



            var src = sourceFile.readSync(function (e) {
                error = e;
                console.log("error", error);
            });
            utils.conslog("sonoqui");
            var b64;
            try {
                //var b64 = src.toBase64String();
                b64 = new bufferModule.Buffer(src).toString('base64');
                utils.conslog("b64", b64.substring(0, 40) + ".......");
            } catch (e) {
                console.log("error", e);
            }



            player.playFromFile({
                audioFile: recaudiofilename, // ~ = app directory
                loop: true,
                completeCallback: function () {
                    utils.conslog("play completed");
                },
                errorCallback: function () {
                    console.log("error playing recorded file")
                }
            }).then(function () {

                player.getAudioTrackDuration().then(function (duration) {
                    // iOS: duration is in seconds
                    // Android: duration is in milliseconds
                    utils.conslog("song duration:", duration);
                });
            });
            recorded = true;
            var dialogs = require("ui/dialogs");
            dialogs.confirm({
                title: "Conferma audio",
                message: "Vuoi inviare questa registrazione ?",
                okButtonText: "OK",
                cancelButtonText: "Annulla",

            }).then(function (result) {
                // result argument is boolean
                utils.conslog("Dialog result: " + result);
                player.dispose().then(function () {
                    utils.conslog("Media Player Disposed");
                }, function (err) {
                    console.log("error is dispose", err);
                });

                if (result) {

                    utils.conslog("trying to post audio");
                    var audio = "data:audio/mp3;base64," + b64;
                    //audio=b64;
                    var postdata = {
                        garaid: "",
                        nickname: global.user.nickname,
                        sockid: global.user.sockid,
                        audio: audio,
                        text: ""
                    }
                    postChat(postdata);

                }
            });


        }, function (ex) {
            utils.conslog("ex", ex);
            source.set("isRecording", false);

        });
        return;
    } else {

        utils.conslog("preparing to record");
        recorder = new audio.TNSRecorder();

        utils.conslog("fname", recaudiofilename);



        var recorderOptions = {
            filename: recaudiofilename,
            format: 2, //working: 2
            encoder: 1, //working: 1
            sampleRate: 44100,
            channels: 1,
            bitRate: 16,
            //metering: true,
            infoCallback: function (infoObject) {
                utils.conslog("infocallback", JSON.stringify(infoObject));
            },
            errorCallback: function (errorObject) {
                console.log("errorcallback", JSON.stringify(errorObject));
            }
        }


        butstop.visibility = "visible";
        butrecord.visibility = "collapsed";
        labrecording.visibility = "visible";



        //but.text="OO";
        recorder.start(recorderOptions).then(function (result) {
            source.set("isRecording", true);
            utils.conslog("recording in progress");
            if (recorderOptions.metering) {
                initMeter();
            }

        }, function (err) {
            source.set("isRecording", false);
            resetMeter();

            console.log("err", err);
        });

    }
}

var meterInterval;

function initMeter() {

    resetMeter();
    return;
    meterInterval = setInterval(function () {
        utils.conslog(recorder.getMeters());
    }, 500);
}

function resetMeter() {
    if (meterInterval) {
        clearInterval(meterInterval);
        meterInterval = undefined;
    }
}

exports.tapRealtimeMatch=function(args){

    var idx=args.index;
     console.log("taprealtimematch",args.index);
    //var bc=args.bindingContext;
    //console.log("bc",JSON.stringify(bc[idx]));
}

exports.scrollBottom = scrollBottom;
exports.scrollTop = scrollTop;
exports.onNavBtnTap = onNavBtnTap;
exports.onLoaded = onLoaded;
exports.onTap = onTap;