//var vmModule = require("./main-view-model");
var application = require("application");
var view = require("ui/core/view");
var listViewModule = require("ui/list-view");
var scrollViewModule = require("ui/scroll-view");
var SocketIO = require('nativescript-socket.io');
var LocalNotifications = require("nativescript-local-notifications");
var LabelModule = require("ui/label");
var observable = require("data/observable");
var utils = require("../../shared/utils");
var backend = require("../../shared/backend");
var glbservice = require("../../shared/globalservice");

var frameModule = require("ui/frame");
var count = 42;


var userimg = "~/img/user.png";

var socket;
var source = new observable.Observable();

var lv1;

var menu = [{
        name: "ChatKwonDo",
        icon: "\uf0e6",
        imgicon: "~/img/chaticon03.png",
        haswebview: true,
        realtime: false
    }, {
        name: "Atleti",
        icon: "\uf007",
        imgicon: "~/img/fight.png"
    }, {
        name: "Gare",
        icon: "\uf091"
    }, {
        name: "Societa",
        icon: "\uf201"
    }, {
        name: "Impostazioni",
        icon: "\uf013"
    }, {
        name: "Connessioni",
        icon: "\uf1e6"
    },
    {
        name: "Ranking",
        icon: "\uf080"
    }, {
        name: "Logout",
        icon: "\uf08b"
    }, {
        name: "News",
        icon: "\uf1ea"
    } /*,{name:"Chiudi AppKwonDo"},{name:"Chat2"}*/
];

var gs = glbservice.GlobalService;

gs.e.on("chatmsg", function (data) {
    utils.conslog("unreadchat", gs.unreadchat.length);
    source.set("unreadchat", gs.unreadchat.length);
    menu[0].unreadchat = gs.unreadchat.length;
    refreshLv();
});

gs.e.on("realtimematches", function (data) {
    utils.conslog("evento realtimematches in homepage !!", JSON.stringify(data));
    var matches = data.object.matches;
    updateRealTime(matches);
})

gs.e.on("sockmsg", function (ev) {
    //console.log("evento sockmsg in chat !!!", JSON.stringify(ev));
    var obj = ev.object;
    var tipo = obj.type;
    if (tipo == "notification") {

        if (obj.updategara) {
           // if (obj.updategara == "yes") renderRealTime();
        }
    }
    //if (tipo == "realtime") renderRealTime();
    //utils.colog("rtservice rtarray",JSON.stringify(rtservice.rtarray));

})


function refreshLv() {
    lv1.items = menu;
    lv1.refresh();
}


function pageLoaded(args) {

    //registerPush();
    var page = args.object;

    LocalNotifications.requestPermission().then((granted) => {
        if (granted) {
            utils.conslog("permission granted to localnotifications");
        } else utils.conslog("permission NOT granted to localnotifications");
    })
    source.set("realtime", false);
    source.set("unreadchat", gs.unreadchat.length);
    page.bindingContext = source;
    lv1 = view.getViewById(page, "lv1");

    /*
        lv1.on(listViewModule.ListView.itemLoadingEvent, function (args) {
            if (!args.view) {
                // Create label if it is not already created.
                //args.view = new labelModule.Label();
            }
            var lab = args.view.getViewById("lab");
            console.log(lab);
            lab.text = "&#xf114;";
            lab.text = "\uf293";


        });
    */
    var lb1 = view.getViewById(page, "lb1");
    var lb2 = view.getViewById(page, "lb2");
    utils.conslog(lb1);
    lb1.text = "Ciao " + global.user.nickname + ", benvenuto in AppKwonDo";
    lb2.text = "";
    if (global.user.role.toLowerCase() == "tkdradmin") lb2.text = "Accesso amministratore eseguito";



    for (var i = 0; i < menu.length; i++) {

        //menu[i].img=userimg.replace("user.",menu[i].name.toLowerCase()+".");
        //menu[i].img="res://"+menu[i].name.toLowerCase();
        menu[i].unreadchat = 0;
        menu[i].img = "res://user";
    }

    menu[0].unreadchat = gs.unreadchat.length;
    lv1.items = menu;




    utils.playVoice("Buongiorno " + global.user.nickname);




    fetchAtleti(function (data) {

        //application.resources["atleti"] = data;
        global.atleti = data;


        //lb1.text=atleti.rows.length+" atleti";

    });


    global.socket.emit('getrealtimematches');

    //renderRealTime();


}

function renderRealTime(callback) {

    backend.getRealtime(function (data) {
        //console.log("realtime matches", data.length);
        if (data.length > 0) {
            source.set("realtime", true);
            menu[0].realtime = true;

        } else menu[0].realtime = false;
        if (callback) callback(data);

    })



  
}

function updateRealTime(data) {

    
        utils.conslog("realtime matches", data.length);
        //return;
        if (data.length > 0) {
            source.set("realtime", true);
            menu[0].realtime = true;

        } else {
            menu[0].realtime = false;
            source.set("realtime", false);
        }
        //if (callback) callback(data);

    



  
}


/*

function registerPush(){
	var settings = {
        // Android settings 
        senderID: '866111544630', // Android: Required setting with the sender/project number 
        notificationCallbackAndroid: function(message) { // Android: Callback to invoke when a new push is received. 
            console.log(JSON.stringify(message));
            alert(JSON.stringify(message));            
        },
  
        // iOS settings 
        badge: true, // Enable setting badge through Push Notification 
        sound: true, // Enable playing a sound 
        alert: true, // Enable creating a alert 
  
        // Callback to invoke, when a push is received on iOS 
        notificationCallbackIOS: function(message) {
            alert(JSON.stringify(message));
        }
    };
         
    pushPlugin.register(settings,
        // Success callback 
        function(token) {
              // if we're on android device we have the onMessageReceived function to subscribe 
            // for push notifications 
            if(pushPlugin.onMessageReceived) {
                pushPlugin.onMessageReceived(settings.notificationCallbackAndroid);
            }
  
            alert('Device registered successfully : ' + token);
            viewModel.set("regId", token);
        },
        // Error Callback 
        function(error){
            console.log(error);
            alert(error.message);
        }
    );
	
}
*/
function listViewItemTap(args) {
    var index = args.index;
    var mitem = menu[index].name.toLowerCase();
    utils.conslog('Clicked item with index ' + index);
    if (mitem == "atleti") frameModule.topmost().navigate("pages/atleti/atleti");
    if (mitem == "gare") frameModule.topmost().navigate("pages/gare/gare");
    if (mitem == "societa") frameModule.topmost().navigate("pages/societa/societa");
    if (mitem == "tabs") frameModule.topmost().navigate("pages/tabs/tabs");
    if (mitem == "impostazioni") frameModule.topmost().navigate("pages/options/options");
    if (mitem == "connessioni") frameModule.topmost().navigate("pages/connections/connections");
    if (mitem == "ranking") frameModule.topmost().navigate("pages/ranking/ranking");
    if (mitem == "chatkwondo") frameModule.topmost().navigate("pages/chat/chat");
    if (mitem == "chat2") frameModule.topmost().navigate("pages/chat2/chat2");
    if (mitem == "logout") {
        global.nickname = "";
        global.user = {};
        frameModule.topmost().navigate("pages/login/login");
    }
}

function fetchAtleti(callback) {

    fetch(global.rooturl + "/atleti/findall").then(function (response) {
        return response.json();
    }).then(function (r) {
        // Argument (r) is JSON object!


        utils.conslog("atleti rows: " + r.rows.length);

        if (callback) callback(r);
    }, function (e) {
        // Argument (e) is Error!
        alert("Errore: " + e);
        callback(e);
    });
}

exports.pageLoaded = pageLoaded;
exports.listViewItemTap = listViewItemTap;