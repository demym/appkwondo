import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { BackendProvider } from '../../providers/backend/backend';
/**
 * Generated class for the ConnectionsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-connections',
  templateUrl: 'connections.html',
})
export class ConnectionsPage {
  sockusers:any=[];
  loading=false;

  constructor(public backend: BackendProvider, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConnectionsPage');
    this.doRefresh();
  }

  refresh(callback){
    var questo=this;
    var url=questo.backend.rooturl+"/socketusers";
    questo.backend.fetchData(url,function(data){
      console.log(data);
      questo.sockusers=data
      if (callback) callback(data);
    })
  }

  doRefresh(){
    var questo=this;
    questo.loading=true;
    questo.refresh(function(){
      questo.loading=false;

    })
  }
}
