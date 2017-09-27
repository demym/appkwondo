import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { BackendProvider } from '../../providers/backend/backend';

/**
 * Generated class for the AtletaPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-editgara',
  templateUrl: 'editgara.html',
})
export class EditgaraPage {
  gara: any = {
    title: ""
   
  };
  mode="view";


  constructor(public backend: BackendProvider, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {

    var g = this.navParams.get("gara");
    console.log('ionViewDidLoad EditgaraPage', g);
    this.gara = g;
  }

}
