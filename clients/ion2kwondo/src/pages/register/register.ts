import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { BackendProvider } from '../../providers/backend/backend';
/**
 * Generated class for the RegisterPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  registerCredentials:any={
    email: "",
    nickname: "",
    psw: ""
  }


  constructor(public backend: BackendProvider, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  register(){
    var questo=this;
    console.log(questo.registerCredentials);
    questo.backend.playFeedback();
    var url = questo.backend.rooturl + "/users/register";
    questo.backend.postData(url,questo.registerCredentials,function(data){
      console.log(data);
      var error=false;
      if (data.hasOwnProperty("error")){
        if (String(data.error)=="true") error=true;

      }
      if (!error){
        var text = "Grazie ! Registrazione completata ! Riceverai a breve una email all'indirizzo " + questo.registerCredentials.email + " con i dettagli per l'attivazione della tua userid su AppKwonDo";
        alert(text);
        questo.navCtrl.pop();
      } else {
        
        alert(data.msg);
      }
    })
    

  }

}
