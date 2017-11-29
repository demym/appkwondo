import { Component } from '@angular/core';
import { NavController, NavParams, Events, AlertController } from 'ionic-angular';
import { BackendProvider } from '../../providers/backend/backend';
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

  constructor(public alertCtrl: AlertController, public events: Events, public backend: BackendProvider, public navCtrl: NavController, public navParams: NavParams) {
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
    let confirm = this.alertCtrl.create({
      title: 'Vuoi confermare la tua prenotazione ?',
      message: 'Potrai passare in società per il pagamento ed il ritiro',
      buttons: [
        {
          text: 'Conferma',
          handler: () => {
            console.log('Disagree clicked');
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
