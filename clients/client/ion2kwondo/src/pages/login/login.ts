import { Component, ViewChild } from "@angular/core";
import { BackendProvider } from '../../providers/backend/backend';
import { UtilsProvider } from '../../providers/utils/utils';
import { TabsPage } from '../../pages/tabs/tabs';
import { HomePage } from '../../pages/home/home';
import { RegisterPage } from '../../pages/register/register';

import { NavController, AlertController /*LoadingController, AlertController, Loading */} from 'ionic-angular';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  @ViewChild('chat') chat: any;
  allnews = [];
  socketHost: string;
  
  //loading: Loading;
  //registerCredentials= { email: 'demymortelliti@it.ibm.com', password: 'ser56glr' };
  registerCredentials = { email: 'youremail@it.ibm.com', password: '', gcmtoken: '' };
  constructor(private utils: UtilsProvider, private nav: NavController, private backend: BackendProvider, private alertCtrl: AlertController/*, private loadingCtrl: LoadingController*/) {


  }

  public createAccount() {
    this.backend.playFeedback();
    this.nav.push(RegisterPage);
  }

  public login() {
    var questo = this;
    questo.backend.playFeedback();
    //this.showLoading()
    var logindata = this.registerCredentials;
    if (this.backend.user.gcmtoken) {
      if (this.backend.user.gcmtoken != "") {
        logindata["gcmtoken"] = this.backend.user.gcmtoken;
      }
    }

    this.backend.blueLogin(logindata, function (data) {
      console.log("bluelogin result",data);
      if (data.loggedin) {
        if (String(data.loggedin) == "true") {
          console.log("navigating to homepage");
           questo.backend.getActiveChat(function(data){
              console.log("chatmessages have been loaded");
              questo.backend.computeUnreadChats();
            });

            questo.backend.getGare(function(data){
              console.log("gare caricate");
            })

            questo.backend.getAtleti(function(data){
              console.log("atleti caricati");
            })

            /*var unread=window.localStorage.getItem("ion2kwondo_chatunread");
            if (unread==null){
              questo.backend.resetChatUnread();
            } else {
              questo.backend.setChatUnread(parseInt(unread,10));
            }
            console.log("chatunread set to "+questo.backend.unread+" by localstorage");
            questo.backend.setBackgroundMode(true);*/
            questo.nav.setRoot(TabsPage);
           
          


        } else {
          //alert("login error");
          console.log(data.error);
          questo.showError("Login error")
        }
      } else {
        alert("Login fallito, controlla i tuoi dati di accesso")
      }



    })

  }

  showLoading() {
    /*
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: false
    });
    this.loading.present();
    */
  }

  showError(text) {
   
    //this.loading.dismiss();

    /*
    let alrt = this.alertCtrl.create({
      title: 'Login fallito',
      subTitle: text,
      buttons: ['OK']
    });
    alrt.present(prompt);
    */
    
  }


  ionViewDidEnter() {
    console.log("ionViewDidEnter login.ts");
    var questo = this;
    var json=this.utils.getJsonStorage("ion2kwondo_creds");
    //alert(json);
      console.log("JSONSTORAGE", json);
      if (!json) {
        console.log("regcreds are null")
      } else {
        var em=window.atob(json).split(":")[0];
        var pw=window.atob(json).split(":")[1];
        questo.registerCredentials.gcmtoken=questo.backend.user.gcmtoken;
        questo.registerCredentials.email = em;
        questo.registerCredentials.password = pw;

        console.log("regcreds", questo.registerCredentials);
        //questo.login();
      }
    

  }
}
