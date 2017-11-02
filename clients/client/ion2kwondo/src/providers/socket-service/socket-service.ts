import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import * as io from 'socket.io-client';
import { BackendProvider } from '../backend/backend';
import { Badge } from '@ionic-native/badge';
import { Platform } from 'ionic-angular';
import { Events } from 'ionic-angular';
declare var navigator: any;


/*
  Generated class for the SocketService provider.
  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class SocketService {
  socketObserver: any;
  socketService: any;
  socket: any;
  user: any;
  data: any = null;
  socketHost = 'https://bpeitaly.mybluemix.net';
  msgs: any = [];
  contacts = [];
  totalunreadcount = 0;

  constructor(public events: Events, public backend: BackendProvider, public badge: Badge, public platform: Platform) {
    this.socketService = Observable.create(observer => {
      this.socketObserver = observer;
    });
    this.socketHost = backend.rooturl;
    this.initialize();
  }


  initialize() {
    var questo = this;
    this.socket = io.connect(this.socketHost);


   // this.refreshContacts(function () { });

    this.socket.on("connect", (msg) => {
      console.log('socket connect received');
      //this.socketObserver.next({ category: 'connect', message: 'user connected'});
    });

    this.socket.on("reconnecting", (msg) => {
      console.log('socket reconnecting received');
    });

    this.socket.on("getclientspecs", (msg) => {
      console.log('socket getclientspecs received', msg);
      var connsock = {
        useremail: this.backend.user.email
      };
      this.socket.emit('connected', connsock);

    });

    this.socket.on("getnickname", (msg) => {
      console.log('socket getnickname received', msg);
      questo.backend.user.sockid=msg.sockid;
      var connsock = {
        useremail: this.backend.user.email
      };
      var m = {
        device: "browser",
        type: "clientspecs",
        nickname: questo.backend.user.nickname,
        email: questo.backend.user.email,
        appversion: "2.0.0"
  
      }

      if (questo.platform.is("cordova")) m.device = "mobile";
  
      //if (message) msg=message;
  
      //questo.socket.send(msg);
  
      questo.socket.emit('message', m);

    });

    this.socket.on("realtime",function(data){
      console.log("socket realtime received !!",data);

      questo.renderVoice(data);

      
      questo.events.publish('realtime', data, Date.now());
    })

    this.socket.on("realtimematches",function(rtmatches){
      console.log("socket realtimematches received !!",rtmatches);
      questo.events.publish('realtimematches', rtmatches, Date.now());
    })

    this.socket.on("reconnect_error", (msg) => {
      console.log('on reconnect_error');
    });

    this.socket.on("reconnect_failed", (msg) => {
      console.log('on reconnect_failed');
    });

    this.socket.on("auserhasconnected", (msg) => {
      console.log('socket auserhasconnected in socket.ts', msg);
      /*questo.refreshContacts(function () {
        console.log("contacts refreshed", questo.contacts);
        questo.socketObserver.next({ category: 'auserhasconnected', message: msg });
      });*/

    });

    this.socket.on("auserhasdisconnected", (msg) => {
      console.log('socket auserhasdisconnected in socket.ts', msg);
      /*
      questo.refreshContacts(function () {
        console.log("contacts refreshed", questo.contacts);
        questo.socketObserver.next({ category: 'auserhasdisconnected', message: msg });
      });
      */

    });

    this.socket.on('disconnect', function () {
      console.log('user disconnected');
      // io.emit('user disconnected');
    });

    this.socket.on("updategara",function(msg){
      console.log("received refreshgara!");
      questo.events.publish('updategara', msg, Date.now());
      
    })

     this.socket.on("chatmsg", (msg) => {
       console.log("chatmsg in socket.ts!",msg);
       questo.msgs.push(msg);
       var sockid=msg.sockid;
       var addit=false;
       if (msg.audio) addit=true;
       if (sockid!=questo.backend.user.sockid) addit=true;
       if (addit){
        questo.backend.chatmessages.push(msg);
        questo.backend.addChatUnread();
        questo.events.publish('chatmsg', msg);
        console.log("isChatView",questo.backend.isChatView);
        if (!questo.backend.isChatView){
          console.log("local notification emitted");
          questo.backend.localNotify(msg.nickname+" - "+msg.text);
        }
        if (msg.hasOwnProperty("nickname")){
          if (msg.nickname.toLowerCase()=="system"){
            var txt=msg.text.replace("-"," a ");
            txt=txt.replace("n."," numero ");
            questo.backend.playVoice(txt);
          }
        }

       }
     
    
     });

    this.socket.on("message", (msg) => {
      console.log("socket message", msg);
      var tipo = msg.tipo;
      if (tipo == "msg") {
        //colog("received tipo msg ");
        //colog(msg);
        // var to_email = msg.to_email;
        var to_email2 = msg.to_email2;
        var from_email2 = msg.from_email2;
        //if (to_email==globals.socketid){



        if (to_email2 == this.backend.user.email) {
          console.log("SOCKET.JS - MESSAGE FOR ME !!", JSON.stringify(msg));
          //msg.unread = true;
        }
        if (from_email2 == this.backend.user.email) {
          console.log("SOCKET.JS - MY OWN MESSAGE CALLBACK FOR ME !!", JSON.stringify(msg));
          //msg.unread = true;
          //msg.unread=false;
        }

        this.msgs.push(msg);
        this.computeUnread();
        console.log("messages in socket.js this.msgs", this.msgs.length);
        console.log("contacts", this.contacts);
        this.socketObserver.next({ category: 'message', message: msg });
        questo.events.publish('updatetotalunreadcount', msg, Date.now());

        //this.requestBadgePermission();
        var bcount = this.getAllUnreadMessages().length;
        //console.log("unreadmessages",bcount);
        //cordova.plugins.notification.badge.set(10);


      }
      //this.socketObserver.next({ category: 'message', message: msg });
    }); //end of socket.on('message')


    questo.syncChatMessages(function(data){
      console.log("chatmessages synced in socket.ts");
    })
  }


  renderVoice(data){
    var questo=this;
    var text=data.match.atletaname;
    text+=", "+data.result;
    if (String(data.fineround)=="true"){
      text+=". Fine round "+data.round;
    }

   
    questo.backend.playVoice(text);
  }

  resetUnreadMessagesFromEmail(email) {
    //console.log("resetunreadmessagesfromemail",email);

    var questo = this;
    this.msgs.forEach(function (item, idx) {



      /*console.log("my email",questo.backend.user.email);
      console.log("from",item.from_email2,"to",item.to_email2);
      console.log("item",item);*/
      if ((item.from_email2 == email) && (item.to_email2 == questo.backend.user.email)) {

        item.unread = false;
      }


    })

    var arr = this.getAllUnreadMessages();
    console.log("unread messages", arr.length);
  }

  computeUnread() {

    var questo = this;
    var totunread = 0;
    this.contacts.forEach(function (item, idx) {
      var email = item.doc.email;
      var unread = 0;
      questo.msgs.forEach(function (mitem, midx) {
        if ((mitem.to_email2 == questo.backend.user.email) && (mitem.from_email2 == email)) {
          if (mitem.hasOwnProperty("unread")) {
            if (String(mitem.unread) == "true") {
              unread++;
              totunread++;
            }
          }
        }
      })
      item.doc.unreadcount = unread;
      console.log("computeunread, unread for " + item.doc.email, item.doc.unreadcount);

    })
    questo.totalunreadcount = totunread;
  }

  getUnreadMessagesFromEmail(email) {

    var unread = [];
    var questo = this;
    this.msgs.forEach(function (item, idx) {


      var checkIt = false;
      /*console.log("my email",questo.backend.user.email);
      console.log("from",item.from_email2,"to",item.to_email2);
      console.log("item",item);*/
      if ((item.from_email2 == email) && (item.to_email2 == questo.backend.user.email)) {
        //console.log("eccone una !");
        checkIt = true;
      }

      if (checkIt) {
        if (item.hasOwnProperty("unread")) {
          if (String(item.unread) == "true") unread.push(item);
        }
      }
    })
    //console.log("getunreadmessagesfromemail",email,unread.length);
    return unread;
  }

  getAllUnreadMessages() {

    var unread = [];
    var questo = this;
    this.msgs.forEach(function (item, idx) {


      var checkIt = false;
      /*console.log("my email",questo.backend.user.email);
      console.log("from",item.from_email2,"to",item.to_email2);
      console.log("item",item);*/
      if (item.to_email2 == questo.backend.user.email) {
        //console.log("eccone una !");
        checkIt = true;
      }

      if (checkIt) {
        if (item.hasOwnProperty("unread")) {
          if (String(item.unread) == "true") unread.push(item);
        }
      }
    })
    //console.log("getunreadmessagesfromemail",email,unread.length);
    console.log("setting badge to ", unread.length);
    //this.setBadges(bcount);

    if (this.platform.is('cordova')) {

      // (<any>window).plugins.notification.badge.set(bcount);
      console.log("platform is ready");
      questo.badge.hasPermission().then(function (a) {
        console.log("has permission", a);
        questo.badge.set(unread.length);

        console.log("badgenumber", questo.badge.get());

      });

    };
    return unread;
  }

  syncChatMessages(callback) {
    var questo = this;
    this.backend.getChatMessages(function (data) {
      questo.msgs = data.rows;
      if (callback) callback(data);
    })
  }

  clearUnreadForEmail(email) {
    var tag = "clearunreadforemail " + email;
    var questo = this;
    var total = 0;
    this.contacts.forEach(function (item, idx) {


      if (item.doc.email == email) item.doc.unreadcount = 0;
      var unr = item.doc.unreadcount;
      total += unr;
    })
    this.msgs.forEach(function (item, idx) {
      var doIt = false;
      if ((item.from_email2 == email) && (item.to_email2 == questo.backend.user.email)) doIt = true;
      if (doIt) item.unread = false;

    })
    this.totalunreadcount = total;
    console.log(tag, "totalunreadcount", this.totalunreadcount, this.contacts);

    this.events.publish('updatetotalunreadcount', this.contacts, Date.now());
    var url = questo.backend.rooturl + "/chat/setmsgsread/" + email + "/" + questo.backend.user.email;
    questo.backend.fetchData(url, function (data) {
      console.log("setted msgs from " + email + " to " + questo.backend.user.email + " as read", data);
    })
  }


  sendMessage(message) {
    console.log('socket sendMessage', message);
    this.socket.emit('message', message);

    //this.msgs.push(message);
    this.socketObserver.next({ category: 'sendMessage', message: message });


  }

  sendCustomMessage(type, message) {
    console.log('socket sendCustomMessage ' + type, message);
    this.socket.emit(type, message);
    //this.socketObserver.next({ category: 'sendMessage', message: message });
    //this.msgs.push(message);

  }


  getChatMessages(callback) {
    var questo = this;
    this.backend.getChatMessages(function (data) {
      console.log("getchatmessages in socket.ts",data);
      if (!data) data=[];
      data.rows.forEach(function(item,idx){
        if (item.from_email2==questo.backend.user.email) item.unread=false;
      })
      questo.msgs = data.rows;
      if (callback) callback(data);
    })
  }

  refreshContacts(callback) {
    var questo = this;
    questo.getChatMessages(function (mdata) {
      console.log("got chatmessages",mdata);
  
      questo.backend.getContacts(function (data) {

        data.forEach(function (item, idx) {

          if (item.doc.email == questo.backend.user.email) {
            data.splice(idx, 1);
          }


        })
        var totalunreadcount = 0;
        data.forEach(function (item, idx) {
          var unreadcount = questo.getUnreadMessagesFromEmail(item.doc.email).length;

          item.doc.unreadcount = unreadcount;
          totalunreadcount += unreadcount;
        })
        questo.contacts = data;
        questo.totalunreadcount = totalunreadcount;
        console.log("total unreadcount",questo.totalunreadcount);
        questo.events.publish('updatetotalunreadcount', {}, Date.now());
        if (callback) callback(questo.contacts);
      });
    })
  }

}