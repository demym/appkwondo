import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, Platform} from 'ionic-angular';
import * as moment from 'moment';

/**
 * Generated class for the ChatfotoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-chatfoto',
  templateUrl: 'chatfoto.html',
})
export class ChatfotoPage {
  imgsrc="";
  title="";
  data="";
  url="";

  constructor(public platform: Platform, public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams) {
    
  }

  ionViewDidLoad() {
    
    var url=this.navParams.get("url");
    var msg=this.navParams.get("msg");
    this.title=msg.nickname;
    this.url=url;
    this.data=moment(msg.time, "YYYYMMDDHHmmSS").format("DD/MM/YYYY HH:mm:SS");
    console.log('ionViewDidLoad ChatfotoPage',url,msg);
    this.imgsrc=url;
  }

  closeModal(){
    this.navCtrl.pop();
    //this.viewCtrl.dismiss();
  }

  openFotoInGallery() {
    var url=this.url;
    console.log("open foto", url);
    // window.open(url, '_system', 'width=310,height=30');
    //if (1==1) return;
    var questo = this;
    if (questo.platform.is("cordova")) {
      window['cordova'].plugins.FileOpener.openFile(url,function(data){

        console.log("file " + url + " successfully opened")
      },function(err){
        console.log("error opening file",url,err);
      })
    /* questo.fileOpener.open(url, 'image/jpeg')
          .then(() => console.log('File is opened', url))
          .catch(e => console.log('Error openening file', e));*/

      if (1==1) return;



      /*
      const fileTransfer: TransferObject = questo.transfer.create();
      var d = new Date();
      var md = moment(d).format("YYYYMMDDHHmmSS");
      fileTransfer.download(url, this.file.dataDirectory + 'appkwondoimg_' + md + ".jpg").then((entry) => {
        var fname = entry.toURL();
        console.log('download complete: ' + entry.toURL());
        //var ffname=fname.replace("file:///","");
        var ffname=fname;
        
        questo.fileOpener.open(ffname, 'image/jpeg')
          .then(() => console.log('File is opened', ffname))
          .catch(e => console.log('Error openening file', e));

      }, (error) => {
        console.log("error transferring ", url);
      });
      */

    } else {
      window.open(url, '_system', 'width=310,height=30');
    }


  }

}
