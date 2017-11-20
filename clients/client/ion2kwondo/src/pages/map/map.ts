import { Component } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';
import {SafeResourceUrl, DomSanitizer} from '@angular/platform-browser'; 

/*
  Generated class for the MapPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {
  mapsrc:SafeResourceUrl;

  constructor(public events: Events, public sanitizer: DomSanitizer, public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapPagePage');
    var mapsrc=this.navParams.get("mapsrc");
    this.mapsrc=this.sanitizer.bypassSecurityTrustResourceUrl(mapsrc);
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
