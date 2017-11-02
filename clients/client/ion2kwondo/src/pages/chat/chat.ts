import { ModalController, AlertController, IonicApp, Events, Content } from 'ionic-angular';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Nav, NavController, NavParams, Platform, Navbar } from 'ionic-angular';
import { SocketService } from '../../providers/socket-service/socket-service';
import { BackendProvider } from '../../providers/backend/backend';
import * as moment from 'moment';
import { TabsPage } from '../../pages/tabs/tabs';
import { ChatfotoPage } from '../../pages/chatfoto/chatfoto';
import { DomSanitizer } from '@angular/platform-browser';
import { Entry } from '@ionic-native/file';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Transfer} from '@ionic-native/transfer';
import { SocialSharing } from '@ionic-native/social-sharing';

import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { MediaPlugin, MediaObject, MediaError } from '@ionic-native/media';
import { StreamingMedia, StreamingVideoOptions, StreamingAudioOptions} from '@ionic-native/streaming-media';


//import { AudioProvider } from 'ionic-audio';


@Component({
  templateUrl: 'chat.html'
})

export class ChatPage implements OnInit {
  @ViewChild(Navbar) navBar: Navbar;
  msg: any = "";
  msgs: any = [];
  friend: any = {};
  me: any = {};
  app: IonicApp;
  el: any;
  @ViewChild(Content) content: Content;
  popped = false;
  overlay = false;
  chatButton: any = "audio";
  rtmatches: any = [];
  recording = false;
  loading = false;
  myTracks: any;
  allTracks: any;
  selectedTrack: any;



  constructor(/*private _audioProvider: AudioProvider,*/ public alertCtrl: AlertController, private socialSharing: SocialSharing, private transfer: FileTransfer,private camera: Camera, private file: File, private domSanitizer: DomSanitizer, public platform: Platform, public nv: Nav, public navparams: NavParams,
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
      questo.msgs = questo.backend.chatmessages;

      //questo.loading=false;

      setTimeout(() => {
        if (questo.content) questo.content.scrollToBottom();
        if (callback) callback(data);

      }, 500);

    })


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

  initView(){
    var questo = this;
    questo.backend.setBackButtonAction(questo.navBar, questo.nav);
    console.log("ionviewdidload chat.ts");
    questo.backend.resetChatUnread();
    questo.backend.isChatView = true;
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


    questo.msgs = questo.backend.chatmessages;
    setTimeout(() => {
      if (questo.content) questo.content.scrollToBottom();

    }, 500);
  }


  ionViewDidLoad() {
  
    var questo=this;
    if (1 == 1) return;


    this.loading = true;
    this.backend.getActiveChat(function (data) {

      console.log("got chat", data);
      questo.msgs = questo.backend.chatmessages;

      questo.loading = false;

      setTimeout(() => {
        if (questo.content) questo.content.scrollToBottom();

      }, 500);

    })






  }

  ionViewWillEnter() {
    console.log("ionviewwillenter chat.ts")

    var questo = this;

    this.initView();
    /////////////////


    this.e.subscribe("chatmsg", function (msg) {
      console.log("chatmsg in chat.ts !!", msg);
      questo.backend.unread = 0;
      //questo.msgs.push(msg);
      if (questo.content) {
        console.log("content ce sta");
        setTimeout(function () {
          questo.content.scrollToBottom();


        })

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

    var m={
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
    var mom = moment(m, "YYYYMMDDHHmmSS").format("DD/MM/YYYY HH:mm:SS");
    return mom;
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
  }


  blur(e) {
    var questo = this;
    console.log("blur", e);
    setTimeout(function () {
      questo.chatButton = "audio";
      console.log("timeout passed");
    }, 1000);

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
          message: "Vuoi inviare l'audio registrato ?",
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
                      var msg={
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

  shareItem(m){
    console.log("shareItem",m);
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
    if (questo.content) questo.content.scrollToTop();


  }

  gotoBottom() {
    var questo = this;

    if (questo.content) questo.content.scrollToBottom();

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


  isCordova(){
    var isCordova=this.platform.is("cordova");
    return isCordova;

  }

  isCordovaIOS(){
    var questo=this;
    var retvalue=false;

    var isCordova=questo.platform.is("cordova");
    var isIOS=questo.platform.is("ios");
    //console.log("iscordova",isCordova,"isIOS",isIOS);

    if (isCordova && isIOS) retvalue=true;
    
   // console.log("retvalue",retvalue);
    
    return retvalue;
  }


  playAudioIos(m){
    console.log(m);
    if (m.hasOwnProperty("audiourl")) window.open(m.audiourl);
   
  }


  downloadFileAndPlay(url){

    console.log("dowloadandplay",url);
    
    let options: StreamingAudioOptions = {
      successCallback: () => { console.log('Video played') },
      errorCallback: (e) => { console.log('Error streaming') },
      initFullscreen: false
    };
    
    this.streamingMedia.playAudio(url, options);
    if (2==2) return;
    
   
  }

  postLocalChat(msg){
    var questo=this;
    var tim=moment().format("YYYYMMDDHHmmSS");
    var sockid=questo.backend.user.sockid;
    var localmsg = Object.assign({}, msg);
    localmsg.time=tim;
    localmsg.sockid=sockid;
    questo.backend.chatmessages.push(localmsg);
    setTimeout(function(){
      questo.gotoBottom();
    },300)
   
  }


}