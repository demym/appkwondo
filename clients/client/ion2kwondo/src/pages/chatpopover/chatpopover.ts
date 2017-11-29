import { Component } from '@angular/core';
import { NavController, NavParams,ViewController } from 'ionic-angular';
import { BackendProvider } from '../../providers/backend/backend';

/**
 * Generated class for the ChatpopoverPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-chatpopover',
  templateUrl: 'chatpopover.html',
})
export class ChatpopoverPage {

  constructor(public backend: BackendProvider, public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatpopoverPage');
  }

  chatlist(){

    this.viewCtrl.dismiss("chatlist");

  }

  chatreset(){
    this.viewCtrl.dismiss("chatreset");

  }

}
