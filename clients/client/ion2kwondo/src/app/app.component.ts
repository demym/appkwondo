import { Component, ViewChild } from '@angular/core';
import { Nav, NavController, Platform, AlertController } from 'ionic-angular';
import { StatusBar } from 'ionic-native';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TabsPage } from '../pages/tabs/tabs';
import { ContactsPage } from '../pages/contacts/contacts';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { UsersPage } from '../pages/users/users';
import { ConnectionsPage } from '../pages/connections/connections';
import { Events } from 'ionic-angular';
import { App, Tabs, ToastController } from 'ionic-angular';
import { DeviceFeedback } from '@ionic-native/device-feedback';


import { SettingsPage } from '../pages/settings/settings';
import { AccountPage } from '../pages/account/account';
import { AboutPage } from '../pages/about/about';
import { ChatPage } from '../pages/chat/chat';
//import { Push } from 'ionic-native';
import { BackendProvider } from '../providers/backend/backend';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  @ViewChild("mytabs") mytabs: Tabs;
  private navCtrl: NavController;
  user = {
    firstname: "Demosio",
    lastname: "Cioc",
    email: "demymortelliti@it.ibm.com",
    role: "IBM BP",
    userphoto: ""
  }
  icons = [
    "md-home",
    "md-settings",
    "md-person",
    
    "md-information-circle",
    "ios-people",
    "md-wifi",
    "md-exit",
    "md-close-circle"
  ]
  isChatPage = false;
  realtimeEvents = false;
  showrtbutton = false;
  chatunread = 0;


  //rootPage = TabsPage;
  rootPage = LoginPage;

  pages: Array<{ title: string, component: any }>;

  constructor(public toastCtrl: ToastController, private deviceFeedback: DeviceFeedback, private app: App, private _SplashScreen: SplashScreen, public events: Events, private alertCtrl: AlertController, public platform: Platform, public backend: BackendProvider) {
    var questo = this;


    var IS_PRODUCTION = false;

    if (IS_PRODUCTION) {
      console.log("LOGGER IS DISABBLED!!!");
      backend.disableLogger();
    }



    this.initializeApp();


    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Homepage', component: HomePage },
      { title: 'Impostazioni', component: SettingsPage },
      { title: 'Account', component: AccountPage },
      
      { title: 'Informazioni', component: AboutPage },
      { title: 'Users', component: UsersPage },
      { title: 'Connessioni', component: ConnectionsPage },
      { title: 'Logout', component: LoginPage },
      { title: 'Chiudi Appkwondo', component: LoginPage }
    ];






    events.subscribe('username:changed', user => {
      console.log("user changed !!!", user);
      this.user = user;

    })

    events.subscribe('enteredchat', user => {
      console.log("enteredchat !!!", user);
      this.isChatPage = true;
    })
    events.subscribe('exitedchat', user => {
      console.log("exitedchat !!!", user);
      this.isChatPage = false;
    })

    events.subscribe('realtimematches', function (rtmatches) {
      console.log("realtimematches event", rtmatches);
      if (rtmatches.matches.length > 0) {
        questo.realtimeEvents = true;
        questo.showrtbutton = true;
      } else {
        questo.realtimeEvents = false;
        questo.showrtbutton = false;
      }

      //this.isChatPage = false;
    })

    events.subscribe("updategara", function (msg, time) {
      console.log("refreshgara in app.component.ts !!");
      questo.backend.getRtMatches(function (data) {
        if (data.length > 0) {
          questo.realtimeEvents = true
          questo.showrtbutton = true;
        } else {
          questo.realtimeEvents = false;
          questo.showrtbutton = false;
        }
      })

    })


    events.subscribe("chatmsg", function (msg) {

      console.log("chatmsg in app.component.ts!", msg);
      /*
      let toast = questo.toastCtrl.create({
        message: msg.nickname + " - " + msg.text,
        duration: 2000,
        position: "top"
      });
      toast.present();
      questo.chatunread++;
      */
    });


  }
  openPage(page) {
    var questo = this;
    questo.backend.playFeedback();
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    if (page.title == "Logout") {
      let alert = this.alertCtrl.create({
        title: 'Confirm',
        subTitle: 'Do you really want to logout',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'OK',
            handler: () => {
              console.log('OK clicked');
              this.nav.setRoot(page.component);
            }
          }
        ]
      });
      alert.present();

    } else {
      if (page.title == "Chiudi Appkwondo") {
        const alert = questo.alertCtrl.create({
          title: 'Chiudi Appkwondo',
          message: 'Vuoi veramente chiudere Appkwondo V2 ?',
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
                questo.platform.exitApp();
              }
            }
          ]
        });
        alert.present();

      } else {
        var pushpages = ["Impostazioni", "Users", "Connessioni", "Informazioni", "Account"];
        if (pushpages.indexOf(page.title) > -1) {
          this.nav.push(page.component)

        } else this.nav.setRoot(page.component);
      }
    }
  }

  openPageWithParams(page, params) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.backend.playFeedback();
    this.nav.setRoot(page.component, params);
  }

  ionViewDidLoad() {
    console.log("ROLE", this.backend.user.role);
    this.user = this.backend.user;
    console.log("USER", this.user);
  }



  public setUser(user) {
    this.user = user;
  }


  public getUserImage() {
    var img = "assets/img/person-icon.png";
    if (this.user.userphoto) {
      if (this.user.userphoto.trim() != "") {
        //console.log("user has userphoto");
        img = "data:image/jpeg;base64," + this.user.userphoto;
      }
    }
    return img;
  }

  initializeApp() {

    var questo = this;



    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

      StatusBar.styleDefault();
      setTimeout(() => {
        this._SplashScreen.hide();
      }, 0);
      //Splashscreen.hide();

      if (this.platform.is('cordova')) {
        /*var push = Push.init({
          android: {
            senderID: "403763864066"
          },
          ios: {
            alert: "true",
            badge: true,
            sound: 'false'
          },
          windows: {}
        });

        push.on('registration', (data) => {
          console.log("registration!!!")
          console.log("push notification registrationId !!", data.registrationId);
          //alert(data.registrationId.toString());
          this.backend.user.gcmtoken = data.registrationId.toString();

        });
        push.on('notification', (data) => {
          console.log("push notification!", data);
          //alert("Hi, Am a push notification");
        });
        push.on('error', (e) => {
          console.log(e.message);
        });*/


        //questo.deviceFeedback.acoustic();
        questo.deviceFeedback.isFeedbackEnabled()
          .then((feedback) => {
            console.log("deviceFeedback", feedback);
            // {
            //   acoustic: true,
            //   haptic: true
            // }
            // questo.deviceFeedback.acoustic();

            //this.deviceFeedback.haptic(0);
          });





      }


      questo.platform.registerBackButtonAction(() => {



        if (questo.nav.canGoBack()) {
          console.log("hw back nutton pressed, going back");
          questo.backend.playFeedback();
          let x = Object.assign({}, questo.backend.navOptions);
          x.direction = "back";
          questo.nav.pop(x);
        } else {
          console.log("nav cannot go back");
        }

      });

      /*
            this.platform.registerBackButtonAction(() => {
             
              console.log("hardwarebackbutton pressed, page", questo.isChatPage);
      
              if (questo.isChatPage) this.events.publish('goback', "hwbackbutton");
         
            });
            */
      if (questo.platform.is('cordova')) {
        questo.deviceFeedback.isFeedbackEnabled()
          .then((feedback) => {
            console.log("feedback", feedback);
            // {
            //   acoustic: true,
            //   haptic: true
            // }
          });
      }

      if (questo.platform.is('ios')) {
        questo.backend.navOptions = {
          animate: true,
          animation: 'ios-transition'

        }


      }





    });


    /*
    questo.backend.getRtMatches(function (data) {
      console.log("got rtmatches in app.component.ts", data);
      if (data.length > 0) {
        questo.realtimeEvents = true
      } else {
        questo.realtimeEvents = false;
      }
    })
    */
  }



  gotoChat() {
    
    console.log("app this", this);
    this.nav.push(ChatPage);
  }

  /*
  setRtbutton(value){

    var page=this.app.getActiveNav().getActive().instance;
    console.log("page",page);
    var isvalid=true;
    if (page==ChatPage) isvalid=false;
    if (page==LoginPage) isvalid=false;
    return isvalid;
    
  }*/


  isVisibleMenu(text){
    
    var questo=this;
    var retvalue=true;
    var t=text.toLowerCase();

    var adminpages=["users","connessioni"];

    if (adminpages.indexOf(t)>-1) {
      //console.log("this is an admin page !",questo.backend.user.role);
      if (questo.backend.user.role!='tkdradmin') retvalue=false;

    }
   // console.log("isVisibleMenu",text,retvalue);
    return retvalue;

  }

}
