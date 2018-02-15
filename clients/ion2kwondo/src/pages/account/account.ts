import { Component } from '@angular/core';
import { NavController, NavParams, Events, AlertController } from 'ionic-angular';
import { BackendProvider } from '../../providers/backend/backend';
import { UtilsProvider } from '../../providers/utils/utils';
/*
  Generated class for the Account page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-account',
  templateUrl: 'account.html'
})
export class AccountPage {
  view = "";
  pswchange: any = {
    email: "",
    currentpsw: "",
    newpsw: "",
    verifynewpsw: ""
  }

  constructor(public utils: UtilsProvider, public alertCtrl: AlertController, public events: Events, public backend: BackendProvider, public navCtrl: NavController, public navParams: NavParams) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountPage');
  }

  changePsw() {
    //alert("changepsw")
    var questo = this;
    questo.view = "changepsw";
  }

  ionViewWillEnter() {
    var questo = this;
    this.events.subscribe("hwbackbutton", function (data) {
      console.log("hwbackbutton in gare.ts");
      questo.navCtrl.pop();
    })
  }

  ionViewWillLeave() {
    this.events.unsubscribe("hwbackbutton");


  }

  isSubmitEnabled() {
    var questo = this;
    var enabled = true;
    if (questo.pswchange.currentpsw.trim() == "") enabled = false;
    if (questo.pswchange.newpsw.trim() == "") enabled = false;
    if (questo.pswchange.verifynewpsw.trim() == "") enabled = false;
    return enabled;
  }


  doChangePsw() {
    var questo = this;
    questo.pswchange.email = questo.backend.user.email;
    console.log(questo.pswchange, questo.backend.user);

    var url = questo.backend.rooturl + "/users/changepsw";
    var cdata = questo.pswchange;
    questo.backend.postData(url, cdata, function (data) {
      console.log(data);
      var text = "";
      if (data.error) text += "ATTENZIONE !<br><br>";
      text += data.msg;
      let alrt = questo.alertCtrl.create({
        title: 'Esito operazione',
        subTitle: text,
        buttons: ['Chiudi']
      });
      alrt.present();


      if (String(data.error) == "false") {
        questo.view = "";

        var creds = window.btoa(questo.backend.user.email + ":" + questo.pswchange.newpsw);

        questo.utils.setJsonStorage("ion2kwondo_creds", creds);

        questo.pswchange = {
          email: "",
          currentpsw: "",
          newpsw: "",
          verifynewpsw: ""

        }
      }

    })

    //if (questo.pswchange.currentpsw)

  }

}
