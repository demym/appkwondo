import { Component } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';
import { BackendProvider } from '../../providers/backend/backend';

/*
  Generated class for the GarePage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-societa',
  templateUrl: 'societa.html'
})
export class SocietaPage {
  societa=[];

  constructor(public events: Events, public backend: BackendProvider, public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
   
    console.log('ionViewDidLoad SocietaPage');
    this.refresh(function(data){
     
    })  
  }

  refresh(callback){
    var questo=this;
    this.backend.getSocieta(function(data){
       questo.societa=data.rows;
       console.log("societa",questo.societa);
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
