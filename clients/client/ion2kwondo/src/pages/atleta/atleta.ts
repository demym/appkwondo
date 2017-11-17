import { Component } from '@angular/core';
import { NavController, NavParams,Events } from 'ionic-angular';
import { BackendProvider } from '../../providers/backend/backend';

/**
 * Generated class for the AtletaPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-atleta',
  templateUrl: 'atleta.html',
})
export class AtletaPage {
  atleta: any = {
    cognome: "",
    nome: ""
  };
  mode="view";


  constructor(public events: Events, public backend: BackendProvider, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {

    var atl = this.navParams.get("atleta");
    console.log('ionViewDidLoad AtletaPage', atl);
    this.atleta = atl.doc;
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
