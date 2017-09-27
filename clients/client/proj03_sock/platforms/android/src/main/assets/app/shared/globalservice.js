var utils = require("~/shared/utils");
var observableModule = require("data/observable");

var GlobalService = (function () {

    var me = this;
    var currentgaraid="";
    var evmanager = new observableModule.Observable;

    evmanager.on("messaggiocaz",function(){
        utils.conslog("evmanager on messaggiocaz");

    })
   

    return {

        e: evmanager,

        unreadchat:[],


        lastreadchattimestamp: "",
       

        publicMethod: function () {
            // code
        },
        onSocketMsg: function (msg) {
            utils.conslog("BaseClass onSocketMsg", msg.message)
        },
       
        trigger: function (ev, evdata) {
            utils.colog("globalservice triggering event", ev);
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

exports.GlobalService = GlobalService;