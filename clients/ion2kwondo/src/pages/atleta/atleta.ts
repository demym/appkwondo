import { Component } from '@angular/core';
import { NavController, NavParams,Events } from 'ionic-angular';
import { BackendProvider } from '../../providers/backend/backend';
import { GoogleDriveProvider } from '../../providers/google/google';

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


  constructor(public google: GoogleDriveProvider, public events: Events, public backend: BackendProvider, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {

    var atl = this.navParams.get("atleta");
    console.log('ionViewDidLoad AtletaPage', atl);
    this.atleta = atl.doc;
    var gid="1-B1k4i03XPkuvGKP7ILgsQ8-EbeYFNo6tKjZXvxBRp0";
    var fullurl="https://docs.google.com/spreadsheets/d/e/2PACX-1vSS_MWmRxn4pi1D8XJxcIGUEjlmZ-BuH0Wo7Lw1QdUfYyKefCUzwJQPfuxmoRgQqRMXVBFwjj_DghlC/pubhtml"
    /*this.google.load(gid).then(function(data){
      console.log("googledata",data)}
    );*/
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
