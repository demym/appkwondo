import { Component } from '@angular/core';
import { NavController, NavParams, Events, ViewController } from 'ionic-angular';
import { BackendProvider } from '../../providers/backend/backend';

/**
 * Generated class for the EditatletaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-editatleta',
  templateUrl: 'editatleta.html',
})
export class EditatletaPage {
  mode="edit";
  atleta:any={};
  title="";
  societa:any=[];

  constructor(public viewCtrl: ViewController, public backend: BackendProvider, public events: Events, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditatletaPage');
  }


  ionViewWillEnter(){
    var questo=this;
    questo.atleta=questo.navParams.get("atleta");
    questo.title="Modifica";
    if (!questo.atleta.hasOwnProperty("id")) {
      questo.mode="insert";
      questo.mode="Aggiungi";
    }

    questo.backend.getSocieta(function(data){
      questo.societa=data.rows;
      console.log("loaded societa in editatleta.ts",questo.societa);
    })

   
    
    questo.events.subscribe("hwbackbutton",function(data){
      console.log("hwbackbutton in gare.ts");
      questo.navCtrl.pop();
    })
  }

  ionViewWillLeave() {
    this.events.unsubscribe("hwbackbutton");
    
    
    }


    saveAtleta(){
      var questo=this;
      var url=questo.backend.rooturl + "/atleti/add";
      var text="aggiunto";

      if (questo.mode=="edit"){
        url=questo.backend.rooturl + "/atleti/update/" + questo.atleta.id;
        text="salvato";
        
      }
      questo.atleta.atletaid=questo.atleta.id;
      var postdata=questo.atleta;
      questo.backend.postData(url,postdata,function(data){
        console.log("done "+url,data);
        questo.viewCtrl.dismiss({text: text, action: "saved", atleta: questo.atleta});
      })


    

    }

    cancelAtleta(){
      this.viewCtrl.dismiss();

    }
}
