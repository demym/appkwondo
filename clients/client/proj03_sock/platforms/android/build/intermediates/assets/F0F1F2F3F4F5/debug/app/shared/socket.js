var application = require("application");
var SocketIO = require('nativescript-socket.io');
var utils = require("~/shared/utils");
var backend = require("~/shared/backend");
var file = require("~/shared/file");
var gservice = require("~/shared/globalservice");
var topmost = require("ui/frame").topmost;
var frameModule = require("ui/frame");

var b = gservice.GlobalService;

var chat = []
var unreadchat = [];


exports.chat = chat;

exports.variabile = "vaffanguls";


exports.test = function () {
    //alert(b.name);


}

exports.disconnect = function () {
    //SocketIO.disconnect();

}

exports.connect = function () {
    //SocketIO.enableDebug(); // optionnal

    // or use your own debug function
    // SocketIO.enableDebug(myCustomDebugFunction);
    //alert(b.name);
    //b.name="fattosocket";
    var url = global.rooturl;
    utils.colog("socketservice connecting to socket at " + url);
    global.socket = SocketIO.connect(url, {
        log: true,
        secure: false
        //forceWebsockets: true,
    });
    utils.conslog("socketservice socket", socket);

    global.socket.on('connect', function () {
        utils.colog('socketservice received connect');
    });


    global.socket.on("chatmsg", function (msg) {
        //utils.conslog('socketservice received chatmsg', JSON.stringify(msg));
        utils.conslog("socketservice received chatmsg");
        var page = frameModule.topmost().currentPage;


        file.readJsonFile("chatmessages.json", function (data) {

            var newmsg = msg;
            data.push(newmsg);
            file.writeJsonFile("chatmessages.json", data, function (fdata) {
                //console.log("readfile chatmessages.json",JSON.stringify(data));

                //console.log(page);
                if (String(page).indexOf("chat.xml") == -1) {
                    utils.localNotify(msg.message);
                    b.unreadchat.push(msg);


                }

                b.trigger("chatmsg", msg);


            })


        })



    })

    global.socket.on('message', function (msg) {
        var tipo = msg.tipo;
        b.trigger("sockmsg", msg);
        utils.conslog('socketservice received message with tipo', tipo);

        if (tipo == "connected") {
            //utils.colog(JSON.stringify(msg));
            //global.user=msg.user;

        }

        //MESSAGE TIPO MSG
        if (tipo == "msg") {
            //colog("received tipo msg ");
            //colog(msg);
            var to_email = msg.to_email;
            var to_email2 = msg.to_email2;
            //if (to_email==globals.socketid){



            if (to_email2 == global.user.email) {
                utils.colog("socketservice - MESSAGE FOR ME !!", JSON.stringify(msg));
                utils.playChatSound();


                var page = frameModule.topmost().currentPage;
                utils.conslog(page);
                if (String(page).indexOf("chat.xml") == -1) {
                    utils.localNotify(msg.message);

                    utils.conslog("message out of chat page");
                    file.readJsonFile("unreadchat.json", function (data) {
                        utils.conslog(JSON.stringify(data));
                        var chatter = msg.from_email2;
                        var found = false;
                        for (var i = 0; i < data.length; i++) {
                            var row = data[i];
                            if (row.chatter == chatter) {
                                row.notreadcount++;
                                found = true;
                            }
                        }
                        if (!found) {
                            var newnotread = {
                                chatter: chatter,
                                notreadcount: 1
                            }
                            data.push(newnotread);

                        }
                        file.writeJsonFile("unreadchat.json", data, function (fdata) {
                            utils.conslog(fdata);
                            b.trigger("sockmsg", msg);

                        })

                    })
                } else b.trigger("sockmsg", msg);

                file.readJsonFile("chatmessages.json", function (data) {

                    var newmsg = msg;
                    data.push(newmsg);
                    file.writeJsonFile("chatmessages.json", data, function (fdata) {
                        utils.conslog(fdata);


                    })


                })


            }
        };


    });

    global.socket.on("getclientspecs", function (sock) {

        utils.colog("socketservice received getclientspecs request from server to this socket id " + sock.id);
        global.user.socketid = sock.id;
        global.socket.emit('connected', {
            useremail: global.user.email
        });




    });

    global.socket.on('auserhasconnected', function (msg) {
        utils.conslog("socketservice received auserhasconnected");
        b.trigger("auserhasconnected", msg);
        //console.log(msg);
        /*questo.getChatUsers(function(){
             
            questo.socketmsg$.next(msg);

        })*/


    });

    global.socket.on('auserhasdisconnected', function (msg) {
        utils.conslog("socketservice received auserhasdisconnected from the chat");
        b.trigger("auserhasdisconnected", msg);
        //console.log(msg);
        /*questo.getChatUsers(function(){
             
            questo.socketmsg$.next(msg);

        })*/
    });


    global.socket.on("notification", function (data) {
        utils.conslog("socketservice received notification", JSON.stringify(data));
        b.trigger("sockmsg", data);
    })

    global.socket.on("realtime", function (data) {
        utils.conslog("socketservice received realtime");
        //b.trigger("sockmsg", data);
    })

     global.socket.on("realtimematches", function (data) {
        utils.conslog("socketservice received realtimematches");
        b.trigger("realtimematches", data);
    })
      global.socket.on("updategara", function (data) {
        utils.conslog("socketservice received updategara");
        b.trigger("updategara", data);
    })

    global.socket.on('getnickname', function (data) {
        utils.conslog('socketservice received getnickname', JSON.stringify(data));
        var msg = {
			device: "mobile",
			type: "clientspecs",
			nickname: global.user.nickname,
			appversion: "2.0.Native"

		}
         global.socket.emit('message',msg);
        //global.socket.socket.send("clientspecs",msg);
    });




}



exports.addToChatFile = function (msg) {
    utils.colog("addToChatFile")
    var fname = "chatmessages.json";

    file.readJsonFile(fname, function (data) {
        utils.colog("before adding, chatmessages", data.length);
        data.push(msg);
        utils.colog("after adding, chatmessages", data.length);
        file.writeJsonFile(fname, data, function (fdata) {
            utils.colog(JSON.stringify(fdata));
        })

    })

}

exports.send=function(msg){
    //console.log("sending socket msg",JSON.stringify(msg));
    //SocketIO.send(msg);
     global.socket.emit('message',msg);

}


exports.getChatUsers = function (callback) {
    //console.log("GETCHATUSERS in socketservice");

    var url = global.rooturl + "/chat/users/connected";

    //console.log("getting chat users at "+url);

    //$http.get(url, { params: { "key1": "value1", "key2": "value2" } })

    backend.fetchData(url, function (data) {
        //questo.chatusers = data;
        //console.log("data",JSON.stringify(data));
        if (callback) callback(data);

    })

}