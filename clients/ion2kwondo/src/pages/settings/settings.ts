import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { BackendProvider } from '../../providers/backend/backend';

/*
  Generated class for the Settings page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {
  settings;


  constructor(public backend: BackendProvider, public navCtrl: NavController, public navParams: NavParams) {
    //this.settings = this.backend.appSettings;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

  ionViewWillLeave() {
    console.log("ionViewWillLeave SettingsPage");
    window.localStorage.setItem("ion2kwondo_settings",JSON.stringify(this.backend.appSettings));
  }

  onServerChange(ev){
    console.log("onserverchange",ev);
    this.backend.rooturl=ev;
  }
}
