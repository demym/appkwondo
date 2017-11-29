import { Component } from '@angular/core';
import { NavController, NavParams,ViewController } from 'ionic-angular';
import { BackendProvider } from '../../providers/backend/backend';

/**
 * Generated class for the PopoverPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-popover',
  templateUrl: 'popover.html',
})
export class PopoverPage {
  popdata: any=[];

  constructor(public viewCtrl: ViewController, public backend: BackendProvider, public navCtrl: NavController, public navParams: NavParams) {
    let data=this.navParams.data;
    console.log("popover data",data);
    this.popdata=data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PopoverPage');
  }


  doAction(cmd){
    this.viewCtrl.dismiss(cmd);
  }


  

}
