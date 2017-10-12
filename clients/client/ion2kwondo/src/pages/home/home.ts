import { Component, ViewChild } from "@angular/core";
import { SocketService } from '../../providers/socket-service/socket-service';
import { BackendProvider } from '../../providers/backend/backend';
import { Platform, AlertController, Content,LoadingController,ToastController } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { AppAvailability } from '@ionic-native/app-availability';

import { ChatPage } from '../../pages/chat/chat';
import { GarePage } from '../../pages/gare/gare';
import { AtletiPage } from '../../pages/atleti/atleti';
import { EventiPage } from '../../pages/eventi/eventi';
import { SocietaPage } from '../../pages/societa/societa';
import { StatsPage } from '../../pages/stats/stats';

import { DeviceFeedback } from '@ionic-native/device-feedback';









@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
 @ViewChild('chat') chat: any;
 @ViewChild(Content) content: Content;
  allnews = [];
  displayednews = [];
  socketHost: string;
  isIbmAdmin = false;
  filter = "All";
  unreadposts=0;
  menu=[
    {
      name: "ChatKwonDo",
      icon: "md-chatbubbles",
      page: ChatPage,
      authrequired: false
    },{
      name:"Gare",
      icon: "md-trophy",
      page: GarePage,
      authrequired: false
    },{
      name: "Atleti",
      icon: "ios-people",
      page: AtletiPage,
      authrequired: true
    },{
      name: "Eventi",
      icon: "md-calendar",
      page: EventiPage,
      authrequired: false
    },{
      name: "Società",
      icon: "md-flag",
      page: SocietaPage,
      authrequired: true
    },{
      name: "Statistiche",
      icon: "md-stats",
      page: StatsPage,
      authrequired: false
    }
  ];
  displayedmenu:any=[];
  user: any={};
  server:any={};

 

  

  constructor(public deviceFeedback: DeviceFeedback, public toastCtrl: ToastController, public loadingCtrl: LoadingController, public alert: AlertController, private appAvailability: AppAvailability, private platform: Platform, public navCtrl: NavController, public socket: SocketService, public backend: BackendProvider) {
    var questo = this;

    this.socket.socketService.subscribe(event => {
      console.log('message received from server... ', event);
      if (event.category === 'message') {

      }
    }); //end of subscribe

    
/*    
    let loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();
  
 
    questo.refresh(function (data) {
      //console.log("allnews", data);
      questo.allnews = data;
      questo.isIbmAdmin = questo.backend.isIbmAdmin;
      questo.filterNews();
      loader.dismiss();
    })
    */
  }


gotoPage(p){
  var questo=this;
  this.backend.playFeedback(); //deviceFeedback.acoustic();
  

  

  /*if (this.backend.isCordova()) {
    console.log("isCordova");
    this.navCtrl.push(p,{},{animate: false});
  } else */
   
  this.navCtrl.push(p,{},questo.backend.navOptions);

  //this.navCtrl.push(p,{});
}


  openUrl(url, mode) {

    this.platform.ready().then(() => {

      this.backend.openUrl(url);


    })


  }

  getSourceIcon(item) {
    var icon = "logo-linkedin";
    //console.log("infosource",item.infosource);
    if (item.infosource == "Linkedin") icon = "logo-linkedin";
    if (item.infosource == "Twitter") icon = "logo-twitter";
    if (item.infosource == "PartnerWorld") icon = "md-globe";
    if (item.infosource == "ThinkMagazine") icon = "md-book";

    return icon;
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    var questo = this;
    questo.refresh(function (data) {
      //console.log("allnews", data);
      questo.allnews = data;
      questo.filterNews();
      refresher.complete();
    })


  }


  refresh(callback) {
    var questo = this;
    questo.backend.getAllNews(function (data) {
      console.log("allnews", data);
      data.forEach(function (item, idx) {
        item.likes = questo.backend.getRandomNumber(20);
        item.comments = questo.backend.getRandomNumber(10);
        if (item.imgurl.trim() == "") item.imgurl = "assets/img/globe.png";
        //var data=moment(questo.data).fromNow();
      })
      questo.unreadposts=questo.backend.unreadposts;

      /*
    let toast = questo.toastCtrl.create({
      message: 'User was added successfully',
      showCloseButton: true,
      closeButtonText: 'Ok',
      position: "middle"
    });
    toast.present();*/
      questo.backend.clearUnreadPosts();
      if (callback) callback(data);
      //questo.allnews = data;

    })

  }




  launch(url, mode) {
    this.openUrl(url, mode);
    /*
        this.platform.ready().then(() => {
           // cordova.InAppBrowser.open(url, "_system", "location=true");
        });
        */
  }

  tapCard(item) {
    console.log("tapcard", item);
    var infosource = item.infosource.toLowerCase();

    if (infosource == "linkedin") {
      let app;



      if (this.platform.is('ios')) {
        app = 'twitter://';
      } else if (this.platform.is('android')) {
        app = 'com.twitter.android';
      }

      this.appAvailability.check(app)
        .then(
        (yes) => {
          //var opts = "location=no,clearcache=no,clearsessioncache=no,toolbar=yes,closebuttoncaption=Done,toolbarposition=top";
          this.backend.openUrl(item.link, "_system");
          

          console.log(app + ' is available')
        },
        (no) => {
          this.launch(item.link, "_blank");
          console.log(app + ' is NOT available')
        }
        );

    } else {
      this.backend.openUrl(item.link);
    }





    /*
     this.navCtrl.push(ChatPage, {
      user: user
    }
    );
    */
  }

  tappedSegment(e) {
    console.log("tappedsegment", e);
    var value = e.value;
    if (value.toLowerCase() == "twitter") {
      this.filter = value;
      this.getTweets();
      
    } else {
      
      this.filterNews();
      this.filter = value;

    }



  }


  filterNews() {
    console.log("filterNews")
    var arr = [];
    var questo = this;
    questo.allnews.forEach(function (item, idx) {
      var src = item.infosource.toLowerCase();
      console.log("src", src, "filter", questo.filter);
      var doIt = false;
      if (src == questo.filter.toLowerCase()) doIt = true;
      if (questo.filter.toLowerCase() == "all") doIt = true;
      if (doIt) arr.push(item);
    })
    questo.displayednews = arr;
  }


  getTweets() {
    console.log("getTweets");
    var questo = this;
    var searchtext = "IBM";
    this.backend.twitterSearch(searchtext, function (data) {
      console.log("search", data);
      //questo.tweets=data.data.status;
      var arr = [];
      data.data.statuses.forEach(function (item, idx) {
        var newitem = {
          title: item.user.name,
          data: item.created_at,
          description: item.text,
          imgurl: item.user.profile_image_url
        }
        arr.push(newitem);

      });
      questo.displayednews = arr;

    })
  }

  onFilterChange(ev){
    console.log("filterchange !",ev);
      this.filter = ev;
      this.filterNews();


  }

  ionViewDidLoad(){
    var questo=this;
    this.user=this.backend.user;
    this.server=this.backend.rooturl;
    var arr=[];
    this.menu.forEach(function(item,idx){
      if (questo.getAuth(item)) arr.push(item);

    })
    questo.displayedmenu=arr;
  }


  getAuth(m){
    var role=this.backend.user.role;
    console.log("role",role);
    var retvalue=true;
    if (m.authrequired){
      if (this.backend.user.role.toLowerCase()!="tkdradmin") retvalue=false;

    }
    return retvalue;
  }
}
