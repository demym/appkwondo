import { Component} from '@angular/core';
import { ViewController, NavController, NavParams } from 'ionic-angular';
import { BackendProvider } from '../../providers/backend/backend';
import * as moment from 'moment'
/**
 * Generated class for the ChatlistPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-chatlist',
  templateUrl: 'chatlist.html',
})
export class ChatlistPage {
  chatlist:any=[];

  constructor(public backend: BackendProvider,public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams) {
    var data=navParams.get('data');
    console.log('UserId',data);
    this.chatlist=data.rows;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatlistPage');
    
  }

  dismiss(){
   
    this.viewCtrl.dismiss();
  }

  selectChat(c){
    let data = { 'foo': 'bar' };
    this.viewCtrl.dismiss(c);

  }


formatBytes(bytes) {
	if (bytes < 1024) return bytes + " Bytes";
	else if (bytes < 1048576) return (bytes / 1024).toFixed(3) + " KB";
	else if (bytes < 1073741824) return (bytes / 1048576).toFixed(3) + " MB";
	else return (bytes / 1073741824).toFixed(3) + " GB";
}

formatData(fname){
  if (fname.indexOf("_")==-1) return "";
  var data=fname.split("_")[1];
  data=data.split(".")[0];
  var d=moment(data,"YYYYMMDDHHmmSS").toDate();
  var mdata=moment(d).format("DD/MM/YYYY HH:mm");
  var rettext="Archiviata in data "+mdata;
  return rettext;

}

}
