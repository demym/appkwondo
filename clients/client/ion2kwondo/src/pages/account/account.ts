import { Component } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';
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

  constructor(public events: Events, public backend: BackendProvider, public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountPage');
  }

  changePsw(){
    alert("changepsw")
  }

  ionViewWillEnter(){
    var questo=this;
    this.events.subscribe("hwbackbutton",function(data){
      console.log("hwbackbutton in gare.ts");
      questo.navCtrl.pop();
    })
  }

  ionViewWillLeave() {
    this.events.unsubscribe("hwbackbutton");
    
    
    }

}
