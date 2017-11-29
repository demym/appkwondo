import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController,Platform } from 'ionic-angular';
import { BackendProvider } from '../../providers/backend/backend';
import { ThemeableBrowser, NativeStorage, TwitterConnect } from 'ionic-native';
//import {Facebook} from "ng2-cordova-oauth/core";
//import {OauthCordova} from 'ng2-cordova-oauth/platform/cordova';
import { AppAvailability } from '@ionic-native/app-availability';
import * as moment from 'moment';
/*
  Generated class for the TwitterPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-twitter',
  templateUrl: 'twitter.html'
})
export class TwitterPage {
  tweets = [];
  searchtext = "ibmpartners";
  //private oauth: OauthCordova = new OauthCordova();
    /*private facebookProvider: Facebook = new Facebook({
      clientId: "587829961354143",
      appScope: ["email"]
    })*/
    /*private linkedinProvider: LinkedIn = new LinkedIn({
      clientId: "77m4gl9l7fgf9m",
      //clientSecret: "lhuq3lTGd7dOUWhZ",
      appScope: ["r_basicprofile","r_emailaddress"]
    })*/

    public facebook() {
      /*
        this.platform.ready().then(() => {
            this.oauth.logInVia(this.facebookProvider).then(success => {
                console.log("RESULT: " + JSON.stringify(success));
            }, error => {
                console.log("ERROR: ", error);
            });
        });
        */
    }

    public linkedin() {
      var url=this.backend.rooturl+"/linkedin/authorize";
        this.backend.openUrl(url);
        return;
        /*
        this.platform.ready().then(() => {
            this.oauth.logInVia(this.linkedinProvider).then(success => {
                console.log("RESULT: " + JSON.stringify(success));
            }, error => {
                console.log("ERROR: ", error);
            });
        });
        */
    }
  
  constructor(private appAvailability: AppAvailability, private platform: Platform, public loadingCtrl: LoadingController, private backend: BackendProvider, public navCtrl: NavController, public navParams: NavParams) {
    
    
    var questo=this;
    this.search(function(data){
      questo.tweets = data.data.statuses;
      console.log("data", data, "tweets", questo.tweets);

    })

  }

  ionViewDidEnter() {
    console.log('ionViewDidLoad TwitterPagePage');
    var questo = this;
    /*this.search(function (data) {

      questo.tweets = data.data.statuses;
      console.log("data", data, "tweets", questo.tweets);

    });*/
    /*
    var questo=this;
    this.backend.twitterSearch("IBM",function(data){
     console.log("data",data);
      questo.tweets=data.data.statuses;
       console.log("tweets",questo.tweets);
    })
    */
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    var questo = this;
    this.search(function (data) {
      questo.tweets = data.data.statuses;
      console.log("data", data, "tweets", questo.tweets);
      refresher.complete();

    })

    /*
   this.backend.twitterSearch("IBM",function(data){
        console.log("search",data);
        questo.tweets=data.data.status;
     
        
      })*/


  }

  search(callback) {
    var questo = this;
    this.backend.twitterSearch(questo.searchtext, function (data) {
      console.log("search", data);
      //questo.tweets=data.data.status;
      if (callback) callback(data);

    })


  }

  onSearchChange(searchValue: string) {
    var questo = this;
    console.log(searchValue);
    this.searchtext = searchValue;
    this.search(function (data) {
      questo.tweets = data.data.status;

    })
  }

  onSearchInput(ev) {
    console.log("onsearchinput", ev);
    var questo = this;
    this.searchtext = ev.target.value;
    this.search(function (data) {
      questo.tweets = data.data.statuses;
    })

  }

  onSearchCancel(ev) {
    console.log("onsearchcancel", ev);

  }

  getNormalDate(m) {
    //console.log("getnormaldate",m);
    var mom = moment(m).format("DD/MM/YYYY HH:mm:SS");
    return mom;
  }


  twitterLogin() {
    
    //var opts = "location=no,clearcache=yes,toolbar=yes,closebuttoncaption=Back,toobarposition=top";
    var url = this.backend.rooturl + "/twitter/login/twitter?callback=" + this.backend.rooturl;
    let browser = new ThemeableBrowser(url, '_blank', {
        statusbar: {
          color: '#4178be'
        },
        toolbar: {
          height: 44,
          color: '#4178be'
        },
        title: {
          color: '#003264ff',
          showPageTitle: true
        },
        backButton: {
          image: 'back',
          imagePressed: 'back_pressed',
          align: 'left',
          event: 'backPressed'
        },
        forwardButton: {
          image: 'forward',
          imagePressed: 'forward_pressed',
          align: 'left',
          event: 'forwardPressed'
        },
        closeButton: {
          image: 'close',
          imagePressed: 'close_pressed',
          align: 'left',
          event: 'closePressed'
        },
        customButtons: [
          {
            image: 'share',
            imagePressed: 'share_pressed',
            align: 'right',
            event: 'sharePressed'
          }
        ],
        menu: {
          image: 'menu',
          imagePressed: 'menu_pressed',
          title: 'Test',
          cancel: 'Cancel',
          align: 'right',
          items: [
            {
              event: 'helloPressed',
              label: 'Hello World!'
            },
            {
              event: 'testPressed',
              label: 'Test!'
            }
          ]
        },
        backButtonCanClose: true
      });
    browser.on('loadstop').subscribe(
      (res) => {
        console.log("loadstop",res);
        var url=res.url;
        if (url.indexOf("return")>-1){
          var p=url.split("?")[1];
          var params=p.split("&");
          params.forEach(function(item,idx){
            console.log("param",item);
            //var arr=item.split("=");
            //questo.backend.user.twitter[arr[0]]=arr[1];
            browser.close();
          })

        }
        
      },
      (error) => {
        // Handle error here
        console.log("loadstop error",error);
      }
    );
  }

  doTwLogin(){
    
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();

    //Request for login
    TwitterConnect.login().then(function(result) {
      //Get user data
      TwitterConnect.showUser().then(function(user){
        //Save the user data in NativeStorage
        NativeStorage.setItem('twitter_user',
        {
          name: user.name,
          userName: user.screen_name,
          followers: user.followers_count,
          picture: user.profile_image_url_https
        }).then(function() {
          alert("successfulll loggedin twitter")
          //nav.push(UserPage);
        })
      }, function(error){
        loading.dismiss();
      });
    });
  }

  tapCard(item) {
    console.log("tapcard", item);
    //var infosource = item.infosource.toLowerCase();
    var link=item.user.url;
    if (item.entities.urls){
      if (item.entities.urls.length>0){
         link=item.entities.urls[0].url;

      }
    }
    this.launch(link, "_blank");
    return;
   
   /*
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
          this.backend.openUrl(link, "_system");
          

          console.log(app + ' is available')
        },
        (no) => {
          this.launch(link, "_blank");
          console.log(app + ' is NOT available')
        }
        );

    



*/

    /*
     this.navCtrl.push(ChatPage, {
      user: user
    }
    );
    */
  }


  launch(url, mode) {
    this.openUrl(url, mode);
    /*
        this.platform.ready().then(() => {
           // cordova.InAppBrowser.open(url, "_system", "location=true");
        });
        */
  }

    openUrl(url, mode) {

    this.platform.ready().then(() => {

      this.backend.openUrl(url);


    })


  }

}
