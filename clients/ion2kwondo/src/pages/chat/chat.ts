import { ModalController, AlertController, IonicApp, Events, Content, VirtualScroll, LoadingController } from 'ionic-angular';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Nav, NavController, NavParams, Platform, Navbar } from 'ionic-angular';
import { SocketService } from '../../providers/socket-service/socket-service';
import { BackendProvider } from '../../providers/backend/backend';
import * as moment from 'moment';
import { TabsPage } from '../../pages/tabs/tabs';
import { ChatfotoPage } from '../../pages/chatfoto/chatfoto';
import { ChatlistPage } from '../../pages/chatlist/chatlist';
//import { ChatpopoverPage } from '../../pages/chatpopover/chatpopover';
import { PopoverPage } from '../../pages/popover/popover';
import { DomSanitizer } from '@angular/platform-browser';
import { Entry } from '@ionic-native/file';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Transfer } from '@ionic-native/transfer';
import { SocialSharing } from '@ionic-native/social-sharing';
import { PopoverController } from 'ionic-angular';

import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { MediaPlugin, MediaObject, MediaError } from '@ionic-native/media';
import { StreamingMedia, StreamingVideoOptions, StreamingAudioOptions } from '@ionic-native/streaming-media';
import { MenuController } from 'ionic-angular';

//import { AudioProvider } from 'ionic-audio';


@Component({
  templateUrl: 'chat_infinity.html'
})

export class ChatPage implements OnInit {
  @ViewChild(Navbar) navBar: Navbar;
  @ViewChild('virtualScroll', { read: VirtualScroll }) virtualScroll: VirtualScroll;
  msg: any = "";
  msgs: any = [];
  friend: any = {};
  me: any = {};
  app: IonicApp;
  el: any;
  @ViewChild(Content) content: Content;
  @ViewChild('content') private chatcontent: Content;
  popped = false;
  overlay = false;
  chatButton: any = "audio";
  rtmatches: any = [];
  recording = false;
  loading = false;
  myTracks: any;
  allTracks: any;
  selectedTrack: any;
  showCameraIcon = true;
  page = 0;
  totalPage = 100;
  recordsforpage = 100;
  buffer=50;
  chatmessages: any = [];
  hasChip = false;
  pageframe: any = [];
  pages: any = [];

  pagefirst = 0;
  pagelast = 0;
  showprev = true;
  shownext = false;
  autoscroll=false;




  constructor(/*private _audioProvider: AudioProvider,*/ public loadingCtrl: LoadingController, public popoverCtrl: PopoverController, public menuCtrl: MenuController, public alertCtrl: AlertController, private socialSharing: SocialSharing, private transfer: FileTransfer, private camera: Camera, private file: File, private domSanitizer: DomSanitizer, public platform: Platform, public nv: Nav, public navparams: NavParams,
    public nav: NavController,
    public modal: ModalController,
    public iapp: IonicApp,
    public e: Events,
    public socket: SocketService,
    private mediaPlugin: MediaPlugin,
    private streamingMedia: StreamingMedia,
    public backend: BackendProvider) {


    this.app = iapp;

    var questo = this;
    this.me = this.backend.user;


    /*this.myTracks = [{
      src: 'https://archive.org/download/JM2013-10-05.flac16/V0/jm2013-10-05-t12-MP3-V0.mp3',
      artist: 'John Mayer',
      title: 'Why Georgia',
      art: 'img/johnmayer.jpg',
      preload: 'metadata' // tell the plugin to preload metadata such as duration for this track, set to 'none' to turn off
    },
    {
      src: 'https://archive.org/download/JM2013-10-05.flac16/V0/jm2013-10-05-t30-MP3-V0.mp3',
      artist: 'John Mayer',
      title: 'Who Says',
      art: 'img/johnmayer.jpg',
      preload: 'metadata' // tell the plugin to preload metadata such as duration for this track,  set to 'none' to turn off
    }];
 


    */


    /*
        this.socket.socketService.subscribe(event => {
    
          console.log('event received in chat.ts', event);
          if (event.category === 'auserhasconnected') {
    
            console.log("auserhasconnected in chat.ts", event);
            console.log("this.friend", this.friend);
            if (event.message.user.email == this.friend.doc.email) {
              console.log("it's him !!");
              this.friend.connected = true;
            }
    
    
          }
    
    
          if (event.category === 'auserhasdisconnected') {
            // questo.refresh(function () {
            console.log("auserhasdisconnected in chat.ts", event);
            console.log("this.friend", this.friend);
            if (event.message.email == this.friend.doc.email) {
              console.log("it's him !!");
              this.friend.connected = false;
            }
    
    
          }
    
          if (event.category == 'chatmsg') {
            console.log("chatmsg received in chat.ts !!", event);
    
    
          }
          if (event.category === 'message') {
    
    
            console.log("new message in chat.ts", event);
    
            this.msgs = this.filterChatMessages2(questo.socket.msgs);
            let currentPage = this.nav.getActive().name;
            console.log('current page is: ', currentPage);
    
    
    
            if (currentPage == "ChatPage") {
              questo.socket.clearUnreadForEmail(questo.friend.doc.email);
    
              setTimeout(() => {
                if (questo.content) questo.content.scrollToBottom();
    
              });
            }
    
          }
    
        }); //end of subscribe
    */




  }


  goRefresh() {
    var questo = this;
    questo.loading = true;
    questo.refresh(function () {
      questo.loading = false;
    })
  }


  tapChip() {
    console.log("chip tapped");
    if (this.content) this.gotoBottom();
  }


  showPop(myEvent) {
    var questo = this;
    var chatsize = JSON.stringify(questo.backend.chatmessages).length;
    var popdata = [
      {
        cmd: "refresh",
        text: "Aggiorna",
        icon: "md-refresh"
      },
      {
        cmd: "list",
        text: "Lista chat",
        icon: "ios-list-box-outline"
      },
      {
        cmd: "reset",
        text: "Reset chat",
        icon: "ios-filing"
      },
      {
        cmd: "size",
        text: chatsize,
        icon: "ios-folder"
      }
    ]

    let popover = questo.popoverCtrl.create(PopoverPage, popdata);
    popover.onDidDismiss(function (data, role) {
      console.log("data", data, "role", role);
      if (data == "list") {
        questo.selectChat();
        return;
      }
      if (data == "resize") {
        //questo.virtualScroll.resize();
        return;
      }
      if (data == "reset") {
        questo.resetChat();
        return;
      }
      if (data == "refresh") {
        questo.loading = true;
        questo.backend.getActiveChat(function () {
          //questo.refresh(function () {
          questo.loading = false;
          questo.initView();
          //if (questo.content) questo.content.resize();
          //questo.virtualScroll.resize();
        })
        return;
      }
    })


    popover.present({
      ev: myEvent
    });

  }

  /*
    showPop2(myEvent){
        var questo=this;
        let popover = questo.popoverCtrl.create(ChatpopoverPage);
        popover.onDidDismiss(function(data,role){
          console.log("data",data,"role",role);
          if (data=="chatlist") {
            questo.selectChat();
            return;
          }
          if (data=="chatreset") {
            questo.resetChat();
            return;
          }
          if (data=="chatrefresh") {
            questo.loading=true;
            questo.refresh(function(){
              questo.loading=false;
            })
            return;
          }
        })
        popover.present({
          ev: myEvent
        });
      
    }*/

  openMenu() {

  }


  ngOnInit(): void {
    console.log("ngoninit chat.ts");
    this.msg = '';
    var questo = this;







  }


  refresh(callback) {

    var questo = this;

    this.backend.getRtMatches(function (data) {
      questo.rtmatches = data;
      console.log("rtmatches", questo.rtmatches);
    })

    //this.loading=true;
    this.backend.getActiveChat(function (data) {

      console.log("got chat", data);
      console.log("questo.backend.activechatfilename", questo.backend.activechatfilename);
      questo.msgs = [];
      //questo.msgs = questo.backend.chatmessages;

      //questo.loading=false;

      setTimeout(() => {
        questo.initScroll();
        /*
        if (questo.content) {
          console.log("scrollingtobottom")
          questo.content.scrollToBottom();
        }
        */
        if (callback) callback(data);

      }, 700);

    })


  }

  toggleVoice() {
    var questo = this;
    var retvalue = true;
    var text = "attivare";
    var text2 = "Attivazione";
    var text3 = "Attivandola sentirai pronunciare i punteggi del tempo reale e gli esiti degli incontri dall'assistente vocale";
    if (this.backend.appSettings.voice) {
      retvalue = false;
      text = "disattivare";
      text2 = "Disattivazione";
      text3 = "";
    }
    let alrt = questo.alertCtrl.create({
      title: "Conferma " + text2 + " funzione vocale",
      message: "Vuoi davvero " + text + " la funzione vocale del tempo reale ? " + text3,
      buttons: [
        {
          text: 'Annulla',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Conferma',
          handler: () => {
            questo.backend.appSettings.voice = retvalue;


          }
        }
      ]
    });
    alrt.present();


  }

  getVoiceIcon() {
    var questo = this;
    var retvalue = "md-mic";
    if (questo.backend.appSettings.voice) {
      retvalue = "md-mic";
    } else retvalue = "md-mic-off";
    return retvalue;
  }

  doRefresh(refresher) {


    console.log('Begin async operation', refresher);
    var questo = this;
    questo.refresh(function (data) {
      //console.log("allnews", data);

      refresher.complete();
    })



  }


  filterChatMessages() {
    var msgs = this.msgs;
    var questo = this;
    var ms = [];
    msgs.forEach(function (item, idx) {
      if ((item.to_email2 == questo.me.email) && (item.from_email2 == questo.friend.doc.email)) {
        //console.log("trovato msg");
        ms.push(item);
      }
      if ((item.to_email2 == questo.friend.doc.email) && (item.from_email2 == questo.me.email)) {
        //console.log("trovato msg");
        ms.push(item);
      }
    })
    this.msgs = ms;
  }
  filterChatMessages2(msgs) {
    var questo = this;
    var ms = [];
    msgs.forEach(function (item, idx) {
      if ((item.to_email2 == questo.me.email) && (item.from_email2 == questo.friend.doc.email)) {
        //console.log("trovato msg");
        ms.push(item);
      }
      if ((item.to_email2 == questo.friend.doc.email) && (item.from_email2 == questo.me.email)) {
        //console.log("trovato msg");
        ms.push(item);
      }
    })
    return ms;
  }



  goBack() {
    this.nav.setRoot(TabsPage, { tab: 2 });
  }

  resetChat() {
    var questo = this;
    let alrt = questo.alertCtrl.create({
      title: 'Conferma archiviazione chat',
      message: "Vuoi davvero archiviare la chat attiva ?",
      buttons: [
        {
          text: 'Annulla',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Conferma',
          handler: () => {

            var url = questo.backend.rooturl + "/chat/archive/";
            questo.backend.fetchData(url, function (data) {
              questo.refresh(function () {
                alert("Chat resettata");
              })

            })


          }
        }
      ]
    });
    alrt.present();

  }

  selectChat() {
    var questo = this;
    var url = questo.backend.rooturl + "/chat/list";
    questo.backend.fetchData(url, function (data) {
      console.log("chats list", data);
      data.rows.sort(function (a, b) {
        var a1 = a.filename;
        var b1 = b.filename;
        if (a1 > b1) return -1;
        if (a1 < b1) return 1;
        return 0;
      })
      let profileModal = questo.modal.create(ChatlistPage, { data: data });
      profileModal.onDidDismiss(data => {
        console.log("chatlistdismissed", data);
        if (data) {
          let loading = questo.loadingCtrl.create({
            spinner: 'dots',
            content: "Caricamento chat in corso...."
          });
        
          loading.onDidDismiss(() => {
            console.log('Dismissed loading');
          });
        
          loading.present();
          var filename = data.filename;
          questo.backend.activechatfilename = filename;
          questo.refresh(function () {
            console.log("caricata chat dal file " + filename);
            questo.initView();
            loading.dismiss();


            /* setTimeout(() => {
               
                 questo.initScroll();
                 /*questo.gotoTop();
                  questo.gotoBottom();*/

            //if (questo.content) questo.content.scrollToBottom();
            /* if (questo.content) {
               console.log("scrolling to bottom");
               questo.content.resize();
               questo.content.scrollToBottom();
               questo.content.resize();
             }*/

            // }, 700);*/

          })

        }
      });
      profileModal.present();
    })

  }

  /*
  getPage(page) {
    var arr: any = [];
    var questo = this;
    if (page < 1) page = 1;
    if (page > questo.numPages()) page = questo.numPages();
    for (var i = (page - 1) * questo.recordsforpage; i < (page * questo.recordsforpage); i++) {

      arr.push(questo.backend.chatmessages[i]);
    }
    if (page == 1) {
      questo.showprev = false;
    } else {
      questo.showprev = true;
    }

    if (page == questo.numPages()) {
      questo.shownext = false;
    } else {
      questo.shownext = true;
    }
    questo.pageframe = arr;
    console.log("pageframe")
  }
  

  
  numPages() {
    var questo = this;
    return Math.ceil(questo.backend.chatmessages.length / questo.recordsforpage);
  }
*/

  initView() {
    var questo = this;
    questo.backend.setBackButtonAction(questo.navBar, questo.nav);
    console.log("initview chat.ts");
    var lastchatread = window.localStorage.getItem("ion2kwondo_lastchatread");
    if (questo.backend.chatmessages.length > 0) {
      var lasttime = questo.backend.chatmessages[questo.backend.chatmessages.length - 1].time
      console.log("lastchatread", lastchatread, "lastchattime", lasttime);
      if (lastchatread != lasttime) {
        questo.hasChip = true;
      } else questo.hasChip = false;
    }
    questo.backend.resetChatUnread();
    questo.backend.isChatView = true;
    console.log("backend chat messages:", questo.backend.chatmessages);
  

    /*
    questo.pagelast = questo.backend.chatmessages.length - 1;
    questo.pagefirst = questo.pagelast - questo.recordsforpage;
    if (questo.pagefirst < 0) questo.pagefirst = 0;

    questo.pageframe = questo.getPageData(questo.pagefirst, questo.pagelast);
    console.log("first", questo.pagefirst, "last", questo.pagelast, questo.pageframe)
    */

    questo.gotoBottom();
    //questo.getLast(questo.recordsforpage);
    console.log("pageframe on load",questo.pageframe,"questo.pagefirst",questo.pagefirst,"questo.pagelast",questo.pagelast);
    //questo.getPage(questo.pages.length - 1);




    /*
        var bcmlast = questo.backend.chatmessages.length - 1;
        //questo.msgs=questo.backend.chatmessages;
        var bcmfirst = bcmlast - questo.recordsforpage;
        if (bcmfirst<0) bcmfirst=0;
        questo.pagefirst=bcmfirst;
        questo.pagelast=bcmlast;
        questo.pageframe=[];
    
    
        
        for (var i=bcmfirst; i<bcmlast; i++){
          
          questo.pageframe.push(questo.backend.chatmessages[i]);
        }
        if (bcmfirst==0) questo.showprev=false;
        if ((bcmfirst+questo.recordsforpage)>bcmlast) questo.shownext=false;
        console.log("questo.pageframe",questo.pageframe);
        */
    /*
        var count = -1;
        questo.chatmessages = [];
        var postdata = {
          garaid: "",
          nickname: "more_prev",
          sockid: questo.backend.user.sockid,
          text: ""
        }
        questo.chatmessages.push(postdata);
        for (var i = bcmfirst; i < bcmlast; i++) {
          count++;
          questo.chatmessages.push(questo.backend.chatmessages[i]);
    
        }
        */

    /*this.msgs=this.backend.chatmessages;
     setTimeout(() => {
        if (questo.content) {
          console.log("questo.content ce sta");
          questo.content.scrollToBottom();
        } 
     
      }, 300);



   

    if (1==1) return;*/

    this.backend.getRtMatches(function (data) {
      questo.rtmatches = data;
      console.log("rtmatches", questo.rtmatches);
    })

    //questo.msgs=[];
    // questo.msgs = questo.backend.chatmessages;
    console.log("questo.backend.chatpageaccessed", questo.backend.chatpageaccessed);
    if ((!questo.backend.chatpageaccessed) || (questo.hasChip)) {
      setTimeout(() => {
        questo.gotoBottom()
        questo.backend.chatpageaccessed = true;
        questo.hasChip = false;
        //questo.virtualScroll.resize();
        //questo.initScroll();
        /*
        questo.gotoTop();
        questo.gotoBottom();
        */
        /*questo.content.resize();
  
        //if (questo.content) questo.content.scrollToBottom();
        if (questo.content) questo.content.scrollToBottom();*/

      }, 700);
    }





  }

  getLast(n){
    var questo=this;
    questo.pagelast=questo.backend.chatmessages.length-1;
    questo.pagefirst=questo.pagelast+1-n;
    if (questo.pagefirst<0) questo.pagefirst=0;

    var arr:any=[];
    for (var i=questo.pagefirst; i<=questo.pagelast; i++){
      arr.push(questo.backend.chatmessages[i]);
    }

    questo.pageframe=arr;
    questo.showprev=true;
    //if (n<=questo.recordsforpage) questo.showprev=false;

    if (questo.recordsforpage>questo.backend.chatmessages.length){
      questo.shownext=false;
      questo.showprev=false;
    }

  }

  prevPage(n) {
    var questo = this;
    questo.shownext=true;

    var first=questo.pagefirst;

    for (var j=0; j<n; j++){
      first--;
      var doIt=true;
      if (first<0) {
        first=0;
        //questo.showprev=false;

        
      } else {
    
        for (var t=0; t<1000000; t++){};
          questo.pageframe.unshift(questo.backend.chatmessages[first]);
          questo.pageframe.pop();

      
     
        

      }

    }
    questo.pagefirst=first;
  
    questo.pagelast=questo.pagefirst+questo.recordsforpage-1;
    if (questo.pagelast==(questo.backend.chatmessages.length-1)) questo.shownext=false;
    if (questo.pagefirst==0) questo.showprev=false;

    console.log("questo.pagefirst",questo.pagefirst,"questo.pagelast",questo.pagelast)
     questo.autoscroll=true;
    if (questo.content) questo.content.scrollTo(0,questo.buffer*58,300,function(){
      questo.autoscroll=false;
    });
  }

  nextPage(n) {
    var questo = this;
    questo.showprev=true;

    var last=questo.pagelast;

    for (var j=0; j<n; j++){
      last++;
      var doIt=true;
      if (last>(questo.backend.chatmessages.length-1)) {
        last=questo.backend.chatmessages.length-1;
       
        
      } else {
        questo.pageframe.shift();
        questo.pageframe.push(questo.backend.chatmessages[last]);;

      }

    }
    questo.pagelast=last;
    questo.pagefirst=questo.pagelast-questo.recordsforpage+1;
    if (questo.pagefirst==0) questo.showprev=false;
    if (questo.pagelast==(questo.backend.chatmessages.length-1)) questo.shownext=false;
    //questo.pagelast=questo.pagefirst+questo.recordsforpage-1;

    console.log("questo.pagefirst",questo.pagefirst,"questo.pagelast",questo.pagelast)

    if (questo.content) questo.content.scrollToBottom(600);

  }

  onScroll(ev){
    if (1==1) return;
    var questo=this;
    if (!ev) return;
    if (questo.autoscroll) return;
    console.log("onscroll",ev);
    if (ev.hasOwnProperty("scrollTop")){
      var top=ev.scrollTop;
      var direction=ev.directionY;
      
      if (direction=="up"){
        if (top<190){
          questo.prevPage(questo.buffer);
        }
        
      }

    }
  
  }

  getPageData(first, last) {
    console.log("getpagedata", first, last);
    var questo = this;
    var arr = [];



    for (var i = first; i <= last; i++) {

      arr.push(questo.backend.chatmessages[i]);
    }
    return arr;

  }

  dateChanged(m, i) {

    if (i == 0) return true;
    var retvalue = false;

    var mm = this.backend.chatmessages[i - 1];

    if (mm.hasOwnProperty("time")) {
      if (m.hasOwnProperty("time")) {

        var t1 = mm.time.substring(0, 8);
        var t2 = m.time.substring(0, 8);
        //console.log(t2,t1);

        if (t1 != t2) retvalue = true;
      }

    }


    return retvalue;
  }


  ionViewDidLoad() {



  }

  ionViewWillEnter() {
    console.log("ionviewwillenter chat.ts")

    var questo = this;
    if (!questo.isCordova()) {
      questo.chatButton = "text";
      this.showCameraIcon = false;
    }

    // this.initView();
    /////////////////


    this.e.subscribe("chatmsg", function (msg) {
      console.log("chatmsg in chat.ts !!", msg);
      questo.backend.resetChatUnread();
      //questo.backend.unread = 0;
      //questo.msgs.push(msg);
      if (questo.content) {
        console.log("content ce sta");
        setTimeout(function () {
          //questo.content.scrollToBottom();
          questo.gotoBottom();

        })
        //questo.getLast(questo.recordsforpage);

      } else {
        console.log("questo.content not found")
      }
    })


    this.e.subscribe("realtimematches", function (rtmatches, time) {
      console.log("realtimematches in chat.ts !!", rtmatches);
      questo.rtmatches = rtmatches.matches;
      console.log("rtmatches", questo.rtmatches);
    })
    this.e.subscribe("updategara", function (rtmatches, time) {
      //console.log("realtimematches in chat.ts !!", rtmatches);
      //questo.rtmatches = rtmatches.matches;
      //console.log("rtmatches", questo.rtmatches);
    })


    questo.initView();



    // if (questo.content) questo.gotoBottom();
  }

  ionViewDidLeave() {
    console.log("ionviewdidleave");
    //this.e.publish("exitedchat", "exitedchat");
    this.backend.isChatView = false;
    this.e.unsubscribe('chatmsg');
    this.e.unsubscribe("realtimematches");


  }



  ngAfterViewInit(): void {

    /*this.content=this.app.getgetComponent("chat");
    this.el = this.content.elementRef.nativeElement;*/

  }



  sendMessage(): void {
    var questo = this;
    var text = questo.msg;
    questo.msg = "";

    var m = {
      garaid: "",
      nickname: questo.backend.user.nickname,
      sockid: questo.backend.user.sockid,
      //audio: data,
      text: text

    }

    questo.postLocalChat(m);
    questo.backend.postChat(m, function () {
      questo.gotoBottom();
    });




  }

  public close(): void {
    // this.modal.close();
  }


  public back() {
    this.nav.pop();
    this.popped = false;
  }

  keyPress(event) {
    // console.log(event, event.keyCode, event.keyIdentifier);
    if (event.keyCode == 13) this.sendMessage();
  }

  getNormalDate(m) {
    //console.log("getnormaldate",m);
    //var mom = moment(m, "YYYYMMDDHHmmSS").format("DD/MM/YYYY HH:mm:SS");
    var mom = moment(m, "YYYYMMDDHHmmSS").format("HH:mm:SS");
    return mom;
  }

  getOnlyDate(m) {
    //console.log("getnormaldate",m);
    moment.locale('it');
    var mom = moment(m, "YYYYMMDDHHmmSS").format("dddd DD MMMM YYYY");
    return mom;
  }


  openAudioUrl(url) {
    this.backend.openUrl(url);
  }


  mailTo(email) {
    window.open(`mailto:${email}`, '_system');
  }

  phoneTo(phone) {
    window.open(`tel:${phone}`, '_system');
  }

  focus() {
    console.log("focus");
    this.chatButton = "text";
    this.showCameraIcon = false;
  }


  blur(e) {
    var questo = this;
    console.log("blur", e);
    if (questo.isCordova()) {
      this.showCameraIcon = true;
      setTimeout(function () {
        questo.chatButton = "audio";
        console.log("timeout passed");
      }, 1000);
    }

  }

  play() {
    var questo = this;
    if (questo.platform.is("cordova")) {
      window['plugins'].audioRecorderAPI.playback(function (msg) {
        // complete
        console.log("play audio complete", msg)
      }, function (msg) {
        // failed
        console.log("error in play audio", msg);
      });
    }

  }

  toggleRecording() {
    var questo = this;
    this.recording = !this.recording;

    if (this.recording) {
      questo.record();
    } else questo.stop();
  }

  stop() {

    console.log("stop audio record");

    var questo = this;
    if (questo.platform.is("cordova")) {
      window['plugins'].audioRecorderAPI.stop(function (msg) {

        console.log("audio record stopped", msg);
        questo.play();


        var fname = msg.substring(1);
        var arr = msg.split("/");
        fname = 'file://' + msg;
        console.log("STOP, fname: " + fname);
        console.log("msg: " + msg);

        let alert = questo.alertCtrl.create({
          title: 'Conferma invio audio',
          message: "Il tuo messaggio audio è in riproduzione. Vuoi davvero inviarlo ?",
          buttons: [
            {
              text: 'Annulla',
              role: 'cancel',
              handler: () => {
                console.log('Cancel clicked');
              }
            },
            {
              text: 'OK',
              handler: () => {
                console.log('OK clicked');

                questo.file.resolveLocalFilesystemUrl(fname).then((fileEntry: any) => {
                  console.log("fileEntry: ", fileEntry)
                  fileEntry.file(file => {
                    console.log("file: ", file)


                    var reader = new FileReader();
                    console.log("reader", reader);
                    reader.onload = function () {
                      console.log('onload readystate: ' + reader.readyState);
                      var dataURL = reader.result;
                      //console.log(dataURL);
                      var sounddata = dataURL;
                      console.log("sounddata", sounddata);
                      var msg = {
                        nickname: questo.backend.user.nickname,
                        sockid: questo.backend.user.sockid,
                        audio: sounddata,
                        text: ""

                      }
                      //questo.postLocalChat(msg);
                      questo.backend.postChat(msg, function () {
                        console.log("audio posted !!")
                        questo.gotoBottom();
                      });
                    };
                    reader.onloadend = function (evt) {
                      console.log("onloadend", evt)

                    }
                    reader.onloadstart = function () {
                      console.log("onloadstart");
                    }
                    reader.onprogress = function () {
                      console.log("onloadprogress");
                    }
                    reader.readAsDataURL(file);
                    return true;
                  }, err => {
                    console.log("error in fileentry read ", err);
                  });
                  return true;
                },
                  error => {
                    console.log("error reading file", error)
                    return false;
                  });


              }
            }
          ]
        });
        alert.present();



      }, function (msg) {

        console.log("error in stop audio", msg)
      });
    }

  }

  record() {

    var questo = this;
    console.log("start audio record");
    questo.recording = true;

    if (questo.platform.is("cordova")) {
      window['plugins'].audioRecorderAPI.record(function (msg) {
        // complete
        console.log("success recording audio !", msg);

        questo.play();
      }, function (msg) {
        // failed

        console.log("error recording audio !", msg);
      }, 20); // record 30 seconds


    }
  }


  takeFoto() {
    var questo = this;
    console.log("takefoto");

    if (questo.platform.is("cordova")) {

      questo.getImageSource(function (data) {
        console.log("getimagesource dialog returns ", data);

        if (data == "cancel") return;



        var sourcetype = questo.camera.PictureSourceType.CAMERA;

        if (data == "gallery") sourcetype = questo.camera.PictureSourceType.PHOTOLIBRARY;


        const options: CameraOptions = {
          quality: 80,
          targetWidth: 500,
          targetHeight: 500,
          destinationType: questo.camera.DestinationType.DATA_URL,
          encodingType: questo.camera.EncodingType.JPEG,
          mediaType: questo.camera.MediaType.PICTURE,
          sourceType: sourcetype
        }

        questo.camera.getPicture(options).then((imageData) => {
          // imageData is either a base64 encoded string or a file URI
          // If it's base64:
          console.log("imagedata", imageData);
          let base64Image = 'data:image/jpeg;base64,' + imageData;
          console.log("base64image", base64Image);
          var postdata = {
            garaid: "",
            nickname: questo.backend.user.nickname,
            sockid: questo.backend.user.sockid,
            foto: base64Image,
            text: ""
          }
          questo.postLocalChat(postdata);
          questo.backend.postChat(postdata, function (data) {
            console.log("foto posted to chat !!");
            questo.gotoBottom();
          })
        }, (err) => {
          console.log("error taking picture", err);
        });
      })
    }


  }

  getBase64(m) {
    return m;
  }

  openFoto(url, m) {

    this.nav.push(ChatfotoPage, {
      url: url,
      msg: m
    })

    /*
    let profileModal = this.modal.create(ChatfotoPage, { 
      url: url,
      msg: m
    });
     profileModal.present();
     */

  }


  openFotoInGallery(url) {
    console.log("open foto", url);
    // window.open(url, '_system', 'width=310,height=30');
    //if (1==1) return;
    var questo = this;
    if (questo.platform.is("cordova")) {
      window['cordova'].plugins.FileOpener.openFile(url, function (data) {

        console.log("file " + url + " successfully opened")
      }, function (err) {
        console.log("error opening file", url, err);
      })
      /* questo.fileOpener.open(url, 'image/jpeg')
            .then(() => console.log('File is opened', url))
            .catch(e => console.log('Error openening file', e));*/

      if (1 == 1) return;



      /*
      const fileTransfer: TransferObject = questo.transfer.create();
      var d = new Date();
      var md = moment(d).format("YYYYMMDDHHmmSS");
      fileTransfer.download(url, this.file.dataDirectory + 'appkwondoimg_' + md + ".jpg").then((entry) => {
        var fname = entry.toURL();
        console.log('download complete: ' + entry.toURL());
        //var ffname=fname.replace("file:///","");
        var ffname=fname;
        
        questo.fileOpener.open(ffname, 'image/jpeg')
          .then(() => console.log('File is opened', ffname))
          .catch(e => console.log('Error openening file', e));

      }, (error) => {
        console.log("error transferring ", url);
      });
      */

    } else {
      window.open(url, '_system', 'width=310,height=30');
    }


  }

  shareItem(m) {
    console.log("shareItem", m);
    if (m.audiourl) {
      this.shareAudio(m);
      return;
    }
    if (m.fotourl) {
      this.shareFoto(m.fotourl)
      return;
    }

  }

  shareText(url) {
    console.log("shareText", url);
    this.socialSharing.share(url, null, null, null).then(() => {
      console.log("share successfull")
    }).catch(() => {
      // Sharing via email is not possible
      console.log("error in share");
    });

  }

  shareAudio(item) {
    this.backend.playFeedback();
    console.log("shareAudio", item);
    var url = item.audiourl;

    this.socialSharing.share(null, null, url, null).then(() => {
      console.log("share successfull")
    }).catch(() => {
      // Sharing via email is not possible
      console.log("error in share");
    });


  }

  share(item) {

    console.log("item", item);
    this.backend.playFeedback();

    var url = "";




    this.socialSharing.share(null, null, url, null).then(() => {
      console.log("share successfull")
    }).catch(() => {
      // Sharing via email is not possible
      console.log("error in share");
    });

  }

  shareFoto(url) {
    console.log("shareFoto", url);
    this.backend.playFeedback();
    this.socialSharing.share(null, null, url, null).then(() => {
      console.log("share successfull")
    }).catch(() => {
      // Sharing via email is not possible
      console.log("error in share");
    });
  }

  /*

  ngAfterContentInit() {     
    // get all tracks managed by AudioProvider so we can control playback via the API
    this.allTracks = this._audioProvider.tracks; 
  }
  
  playSelectedTrack() {
    // use AudioProvider to control selected track 
    this._audioProvider.play(this.selectedTrack);
  }
  
  pauseSelectedTrack() {
     // use AudioProvider to control selected track 
     this._audioProvider.pause(this.selectedTrack);
  }
         
  onTrackFinished(track: any) {
    console.log('Track finished', track)
  } 

  getTrack(m){
    var tr={
      src: m.audio
    }
    return tr;
  }

  */


  gotoTop() {
    var questo = this;
    if (questo.content) {
      //questo.content.resize();
      console.log("questo.content ce sta");

      setTimeout(() => {
        questo.content.scrollToTop(600);
        questo.content.resize();
        // questo.content.scrollToBottom();
        //questo.content.scrollTo(0, 400, 0); 

      }, 700);

    }


  }

  initScroll() {
    var questo = this;
    questo.content.resize();
    if (2 == 2) return;

    if (questo.content) {
      console.log("questo.content ce sta");
      questo.content.resize();
      questo.content.scrollToBottom().then(function () {
        console.log("scrolled to bottom")
        questo.content.resize();
      }, function (reason) {
        console.log("error scrolling to bottom", reason);
      });
      if (1 == 1) return;
      questo.content.scrollToTop().then(function (data) {
        console.log("scrolled to top")
        questo.content.resize();
        questo.content.scrollToBottom().then(function () {
          console.log("scrolled to bottom")
          questo.content.resize();
        }, function (reason) {
          console.log("error scrolling to bottom", reason);
        });

      }, function (reason) {
        console.log("error scrolling to top", reason)

      });
      //questo.content.resize();




      /* setTimeout(()=>{
        
         
       },700);*/

      //questo.content.scrollTo(0, 400, 0); 


    }

  }

  gotoBottom() {
    var questo = this;

    questo.getLast(questo.recordsforpage);
    questo.shownext=false;

    if (questo.content) {
      console.log("gotobottom questo.content ce sta");

      //questo.content.resize();
      questo.autoscroll=true;
      setTimeout(() => {
        questo.content.scrollToBottom(600);

        var bottom = (questo.backend.chatmessages.length - 1) * 230;
        console.log("bottom", bottom);
        //questo.content.scrollTo(0,bottom, 300); 
        questo.content.resize();
        questo.autoscroll=false;
      }, 700);


      //questo.content.scrollTo(0, 400, 0);   // questo è lo scroll originale


      /*var element = document.querySelector('#content');
      console.log(element);
      element.scrollIntoView();*/


      //questo.content.scrollTo(0, 100*questo.backend.chatmessages.length)
      // questo.content.scrollTo(0, (questo.backend.chatmessages.length-1) * 100, 0);
      //questo.content.scrollToBottom();


      /*let dimensions = questo.content.getContentDimensions();
      console.log("dimensions",dimensions);
      questo.content.scrollTo(0, dimensions.scrollHeight + 100, 0);
      questo.content.resize();*/
      /*var myElement = document.getElementById('content');  // Container which has scrollable vertical contents
      console.log("scrolltop",myElement.scrollTop);  // Gives scrolled poins from top
      console.log("scrollheight",myElement.scrollHeight);  // Gives maximum scrollable vertical space
  
      myElement.scrollTop = myElement.scrollHeight;*/

      // questo.myScrollContainer.nativeElement.scrollTop = questo.myScrollContainer.nativeElement.scrollHeight;
    } else console.log("questo.content NON ce sta")
  }



  getImageSource(callback) {
    var questo = this;
    const alert = questo.alertCtrl.create({
      title: 'Seleziona sorgente',
      message: 'Select sorgente immagine',
      buttons: [
        {
          text: 'Annulla',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
            callback("cancel");
          }
        },
        {
          text: 'FOTOCAMERA',
          handler: () => {
            console.log('CAMERA clicked');
            callback("camera");
          }
        }
        ,
        {
          text: 'GALLERIA',
          handler: () => {
            console.log('GALLERY clicked');
            callback("gallery");
          }
        }
      ]
    });
    alert.present();


  }


  isCordova() {
    var isCordova = this.platform.is("cordova");
    return isCordova;

  }

  isCordovaIOS() {
    var questo = this;
    var retvalue = false;

    var isCordova = questo.platform.is("cordova");
    var isIOS = questo.platform.is("ios");
    //console.log("iscordova",isCordova,"isIOS",isIOS);

    if (isCordova && isIOS) retvalue = true;

    // console.log("retvalue",retvalue);

    return retvalue;
  }


  playAudioIos(m) {
    console.log(m);
    if (m.hasOwnProperty("audiourl")) window.open(m.audiourl);

  }


  downloadFileAndPlay(url) {

    console.log("dowloadandplay", url);

    let options: StreamingAudioOptions = {
      successCallback: () => { console.log('Video played') },
      errorCallback: (e) => { console.log('Error streaming') },
      initFullscreen: false
    };

    this.streamingMedia.playAudio(url, options);
    if (2 == 2) return;


  }

  postLocalChat(msg) {
    var questo = this;
    var tim = moment().format("YYYYMMDDHHmmSS");
    var sockid = questo.backend.user.sockid;
    var localmsg = Object.assign({}, msg);
    localmsg.time = tim;
    localmsg.sockid = sockid;
    questo.backend.chatmessages.push(localmsg);
    setTimeout(function () {
      questo.gotoBottom();
    }, 300)

  }


  doInfinite(infiniteScroll) {
    this.page = this.page + 1;
    console.log("page", this.page)

    setTimeout(function () {
      console.log('Async operation has ended');
      infiniteScroll.complete();
    }, 1000);
  }

  doPrevInfinite(infiniteScroll) {
    this.prevPage(this.buffer);
   
    setTimeout(function () {
      console.log('Async operation has ended');
      infiniteScroll.complete();
    }, 1000);
  }

  doNextInfinite(infiniteScroll) {
    this.nextPage(this.buffer);
   
    setTimeout(function () {
      console.log('Async operation has ended');
      infiniteScroll.complete();
    }, 1000);
  }


  showMatchOrd(m){
    var retvalue=false;
    if (m.hasOwnProperty("matchord")){
      if (m.matchord.trim()!=""){
        retvalue=true;
      }
    }
    return retvalue;
  }


}