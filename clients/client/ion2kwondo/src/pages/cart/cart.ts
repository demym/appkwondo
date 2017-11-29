import { Component } from '@angular/core';
import { NavController, NavParams, Events, AlertController,ToastController } from 'ionic-angular';
import { BackendProvider } from '../../providers/backend/backend';
import { UtilsProvider } from '../../providers/utils/utils';
import * as moment from "moment";
/**
 * Generated class for the CartPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {

  constructor(public utils: UtilsProvider, public toastCtrl: ToastController, public alertCtrl: AlertController, public events: Events, public backend: BackendProvider, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewWillEnter(){
    var questo=this;
    
    this.events.subscribe("hwbackbutton",function(data){
      console.log("hwbackbutton in servizisocieta.ts");
      questo.navCtrl.pop();
    })
   
  }
  ionViewWillLeave() {
    this.events.unsubscribe("hwbackbutton");
    
    
    }


  ionViewDidLoad() {
    console.log('ionViewDidLoad CartPage');
  }

  confirmOrder(){
    var questo=this;
    let confirm = this.alertCtrl.create({
      title: 'Vuoi confermare la tua prenotazione ?',
      message: 'Potrai passare in società per il pagamento ed il ritiro',
      buttons: [
        {
          text: 'Conferma',
          handler: () => {
            console.log('Disagree clicked');
            var d=new Date();
            var mom=moment(d).format("YYYYMMDDHHmmssSSS");
            
            var cart={
              email: questo.backend.user.email,
              nick: questo.backend.user.nickname,
              cart: questo.backend.cart,
              stato: "inoltrato",
              id:""
            }
            cart.id=mom;
            var url=questo.backend.rooturl+"/minimarket/addorder";
            var postdata=cart;
            questo.backend.postData(url,postdata,function(pdata){
              let toast = questo.toastCtrl.create({
                message: "Hai inoltrato correttamente la tua prenotazione. Puoi passare in società per il pagamento e ritiro",
                position: "top",
                duration: 2200
              });
              toast.present();
              questo.backend.cart=[];
              questo.utils.setJsonStorage("ion2kwondo_"+questo.backend.user.id+"_mcrt", questo.backend.cart);
            })
          }
        },
        {
          text: 'Annulla',
          handler: () => {
            console.log('Agree clicked');
          }
        }
      ]
    });
    confirm.present();
  }


  getTotalPrice(){
    console.log("cart",this.backend.cart);
    var questo=this;
    var tot=0;
    questo.backend.cart.forEach(function(item,idx){
      tot+=parseFloat(item.product.price)*item.qty;

    });
    var ttot=tot.toFixed(2);
    return ttot;
  }

  getTotaleRiga(c){
    console.log("cart",this.backend.cart);
    var questo=this;
    var tot=0;
    tot=parseFloat(c.product.price)*c.qty;
    var ttot=tot.toFixed(2);
    return ttot;
  }

  

}
