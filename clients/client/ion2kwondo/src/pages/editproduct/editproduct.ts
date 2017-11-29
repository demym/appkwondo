import { Component } from '@angular/core';
import { NavController, NavParams,Events,ViewController,AlertController } from 'ionic-angular';
import { BackendProvider } from '../../providers/backend/backend';
import * as moment from "moment";

/**
 * Generated class for the EditproductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-editproduct',
  templateUrl: 'editproduct.html',
})
export class EditproductPage {
  title="Modifica prodotto";
  mode="edit";
  product:any={
    nome: "",
    price: "",
    descr: "",
    imgurl: "",
    id: "",
    categoria: ""
  }

  constructor(public alertCtrl: AlertController,public viewCtrl: ViewController, public backend: BackendProvider, public events: Events, public navCtrl: NavController, public navParams: NavParams) {
    this.mode=navParams.get("mode");
    if (this.mode=="insert") {
      this.title="Aggiungi prodotto";
      var d=new Date();
      var mom=moment(d).format("YYYYMMDDHHmmssSSS");
      this.product.id=mom;
    }
    if (this.mode=="edit"){
      this.title="Modifica prodotto";
      this.product=navParams.get("product");
    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditproductPage');
  }

  ionViewWillEnter(){
    var questo=this;

   
    
    this.events.subscribe("hwbackbutton",function(data){
      console.log("hwbackbutton in servizisocieta.ts");
     questo.cancel();
    })
   
  }
  ionViewWillLeave() {
    this.events.unsubscribe("hwbackbutton");
    
    
    }

    cancel(){
      this.viewCtrl.dismiss();
    }

    save(){
      var questo=this;
      var url=questo.backend.rooturl+"/minimarket/editproduct";

      if (questo.mode=="insert"){
        url=questo.backend.rooturl+"/minimarket/addproduct"

      }

      var postdata={
        product: questo.product
      }
      console.log("postdata",postdata);
      questo.backend.postData(url,postdata,function(data){
        console.log("save operation result",data);
        questo.viewCtrl.dismiss("saved");

      })
     
    }


    delete(){
      var questo=this;
      let alrt = questo.alertCtrl.create({
        title: 'Conferma',
        message: 'Vuoi davvero eliminare questo prodotto ?',
        buttons: [
          {
            text: 'Annulla',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Conferma eliminazione',
            handler: () => {
              var url=questo.backend.rooturl+"/minimarket/deleteproduct";
              var postdata={
                product: questo.product
              }
              console.log("postdata",postdata);
              questo.backend.postData(url,postdata,function(data){
                console.log("delete operation result",data);
                questo.viewCtrl.dismiss("deleted");
        
              })
            }
          }
        ]
      });
      alrt.present();


      

    }


}
