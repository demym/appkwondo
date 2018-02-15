import { Component } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';
import { ProductsPage } from '../../pages/products/products';
import { OrdersPage } from '../../pages/orders/orders';
import { BackendProvider } from '../../providers/backend/backend';

/**
 * Generated class for the ServizisocietaPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-servizisocieta',
  templateUrl: 'servizisocieta.html',
})
export class ServizisocietaPage {

  constructor(public backend: BackendProvider,public events: Events, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ServizisocietaPage');
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


    gotoProducts(cat){
      var questo=this;
      questo.navCtrl.push(ProductsPage,{
        categoria: cat
      })
    }


  isMarketAdmin() {
    var questo = this;
    var isadmin = false;
    if (questo.backend.user.role == 'tkdradmin') isadmin = true;
    if (questo.backend.user.role == 'marketadmin') isadmin = true;
    return isadmin;

  }

  viewOrders(){
    this.navCtrl.push(OrdersPage)
  }



}
