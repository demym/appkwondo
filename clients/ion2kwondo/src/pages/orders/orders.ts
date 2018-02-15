import { Component } from '@angular/core';
import { NavController, NavParams, Events,AlertController, ToastController } from 'ionic-angular';
import { BackendProvider } from '../../providers/backend/backend';
import * as moment from "moment";

/**
 * Generated class for the OrdersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-orders',
  templateUrl: 'orders.html',
})
export class OrdersPage {
  loading=false;
  orders:any=[];
  displayedorders:any=[];
  vieworder="";
  statusfilter="inoltrato";

  constructor(public toastCtrl: ToastController, public alertCtrl: AlertController,public events: Events,public backend: BackendProvider, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrdersPage');
    this.refresh(function(){});
  }


  ionViewWillEnter() {
    var questo = this;



    this.events.subscribe("hwbackbutton", function (data) {
      console.log("hwbackbutton in servizisocieta.ts");
      questo.navCtrl.pop();
    })

  }
  ionViewWillLeave() {
    this.events.unsubscribe("hwbackbutton");


  }


  changeFilter(ev){
    console.log("changefilter",ev);
    this.refresh(function(){});
  }
  
  refresh(callback?: any) {
    var questo = this;
    var url = questo.backend.rooturl + "/minimarket/listorders";
    questo.loading = true;
    questo.backend.fetchData(url, function (data) {
      questo.orders = data.rows;
      var orders=[];

      if (questo.statusfilter==""){
        questo.displayedorders=data.rows;
      } else {
        data.rows.forEach(function(item,idx){
          if (item.stato==questo.statusfilter) orders.push(item);
        })
        questo.displayedorders=orders;
      }
    
      
      console.log("questo.orders", questo.orders);
      //questo.filterProducts();
      questo.loading = false;
      if (callback) callback();
    })

  }

  getOrderTotal(){
    return 0;  
  }

  getDataOrdine(o){
    var m=moment(o.id,"YYYYMMDDHHmmssSSS").format("DD/MM/YYYY HH:mm");
    return m;
  }

  getTotalPrice(o){
   
    var questo=this;
    var tot=0;
    o.cart.forEach(function(item,idx){
      tot+=parseFloat(item.product.price)*item.qty;

    });
    var ttot=tot.toFixed(2);
    return ttot;
  }





  deleteOrder(o){
    var questo=this;
    let alrt = questo.alertCtrl.create({
      title: 'Conferma eliminazione ordine',
      message: 'Vuoi davvero eliminare questo ordine ?',
      buttons: [
        {
          text: 'Annulla',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Conferma',
          handler: () => {
            console.log('Buy clicked');
            var url=questo.backend.rooturl+"/minimarket/deleteorder/"+o.id;
            questo.backend.fetchData(url,function(data){
              let toast = questo.toastCtrl.create({
                message: "Hai eliminato l'ordine",
                position: "top",
                duration: 2200
              });
              
              toast.present();
              questo.refresh(function(){});

              
            })
          }
        }
      ]
    });
    alrt.present();

  }

  completeOrder(o){
    var questo=this;
    let alrt = questo.alertCtrl.create({
      title: 'Conferma completamento ordine',
      message: 'Vuoi davvero completare questo ordine ?',
      buttons: [
        {
          text: 'Annulla',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Conferma',
          handler: () => {
            console.log('Buy clicked');
            var url=questo.backend.rooturl+"/minimarket/changeorderstatus/"+o.id+"/completato";
            questo.backend.fetchData(url,function(data){
              let toast = questo.toastCtrl.create({
                message: "Hai completato questo ordine",
                position: "top",
                duration: 2200
              });
              
              toast.present();
              questo.refresh(function(){});

              
            })
          }
        }
      ]
    });
    alrt.present();

  }

  getTotaleRiga(c){
    //console.log("cart",this.backend.cart);
    var questo=this;
    var tot=0;
    tot=parseFloat(c.product.price)*c.qty;
    var ttot=tot.toFixed(2);
    return ttot;
  }

  viewOrder(o){
    var neworderid=o.id;
    if (this.vieworder==neworderid) neworderid="";
    this.vieworder=neworderid;
  }


}
