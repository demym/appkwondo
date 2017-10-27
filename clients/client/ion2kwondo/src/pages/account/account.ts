import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { BackendProvider } from '../../providers/backend/backend';
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

  constructor(public backend: BackendProvider, public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountPage');
  }

  changePsw(){
    alert("changepsw")
  }

}
