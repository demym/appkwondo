import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { BackendProvider } from '../../providers/backend/backend';

/*
  Generated class for the GarePage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-eventi',
  templateUrl: 'eventi.html'
})
export class EventiPage {
  gare=[];

  constructor(public backend: BackendProvider, public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
   
    console.log('ionViewDidLoad EventiPage');
    this.refresh(function(data){
     
    })  
  }

  refresh(callback){
    var questo=this;
    this.backend.getEventi(function(data){
       questo.gare=data.rows;
       console.log("gare",questo.gare);
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


}
