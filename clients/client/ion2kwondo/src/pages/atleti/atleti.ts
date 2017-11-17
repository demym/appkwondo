import { Component, ViewChild } from '@angular/core';
import { Events, NavController, NavParams, Navbar } from 'ionic-angular';
import { BackendProvider } from '../../providers/backend/backend';
import { AtletaPage } from '../../pages/atleta/atleta';

/*
  Generated class for the GarePage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-atleti',
  templateUrl: 'atleti.html'
})
export class AtletiPage {
  @ViewChild(Navbar) navBar: Navbar;
  atleti=[];

  constructor(public events: Events, public backend: BackendProvider, public navCtrl: NavController, public navParams: NavParams) {}

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

  ionViewDidLoad() { 
   
    console.log('ionViewDidLoad AtletiPage');
    this.atleti=this.backend.atleti;
    this.backend.setBackButtonAction(this.navBar,this.navCtrl);
    this.backend.setupNavbarBack(this.navBar,this.navCtrl);
    /*this.refresh(function(data){
     
    })  */
  }

  refresh(callback){
    var questo=this;
    this.backend.getAtleti(function(data){
       questo.atleti=data.rows;
       console.log("atleti",questo.atleti);
      if (callback) callback(data);
    })
  }

    doRefresh(refresher) {
    

    console.log('Begin async operation', refresher);
    var questo = this;
    questo.refresh(function (data) {
      //console.log("allnews", data);

      refresher.complete();
    })
  }
  

  getCategoria(m){
    return this.backend.getCategoria(m.doc.datanascita,null);

  }

  gotoAtleta(atl){
    this.navCtrl.push(AtletaPage,{atleta: atl});
  }

}
