import { Component } from '@angular/core';
import { NavController, NavParams, Events, AlertController, ToastController } from 'ionic-angular';
import { BackendProvider } from '../../providers/backend/backend';
import { CartPage } from '../../pages/cart/cart';

/**
 * Generated class for the ProductsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-products',
  templateUrl: 'products.html',
})
export class ProductsPage {
  categoria="";
  numero="4";
  loading=false;
  filter="";
  displayedproducts:any=[];
  
  products:any=[];


  products_old:any=[
    {
      id: "001",
      categoria: "minimarket",
      price: "50",
      nome: "Pelle di leopardo",
      descr: "Eccezionale pelle di leopardo, per far ruggire i tuoi momenti di relax !",
      imageurl: "https://www.strangethings.it/wp-content/uploads/2016/08/Tappeto-di-pelo-di-leopardo-200-cm-x-120-cm-Tappetino-scendi-letto-di-BRUBAKER-0-420x268.jpg"
    },
    {
      id: "002",
      categoria: "minimarket",
      price: "25",
      nome: "Clava in osso",
      descr: "Vuoi rivivere le gesta degli uomini primitivi ? Questa favolosa clava in osso di mammuth fa al caso tuo !",
      imageurl: "https://images-na.ssl-images-amazon.com/images/I/41E7kZM1n-L.jpg"
    },
    {
      id: "003",
      categoria: "minimarket",
      price: "18",
      nome: "Canna da pesca per sgombri",
      descr: "Frustrato perchè peschi di tutto ma gli sgombri sono territorio vietato per te ? Riprova con la canna da pesca per sgombri, e vedrai che la vita tornerà a sorriderti",
      imageurl: "https://www.decathlon.it/media/835/8350211/big_7990b70ebaba45cd8b6ab7b022df7b12.jpg"
    },
    {
      id: "004",
      categoria: "minimarket",
      nome: "Sapone per brufoli",
      price: "4",
      descr: "Quel brufolo stamani ti ha rabbuiato la giornata ? Spazzalo via con l'apposito sapone, che restituisce alla tua pelle il color del sole, cioè giallo !",
      imageurl: "http://brufoli.biz/images/sampledata/topexan%20detergente.jpg"
    }
  ]

  constructor(public toastCtrl: ToastController, public alertCtrl: AlertController, public backend: BackendProvider, public events: Events, public navCtrl: NavController, public navParams: NavParams) {
    this.categoria=this.navParams.get("categoria");
  }

  onInput(ev){
    console.log("onInput",ev);
    this.filterProducts();
  }

  onCancel(ev){
    console.log("onCancel",ev);
    this.filterProducts();
  }

  filterProducts(){
    var questo=this;

    if (questo.filter.trim()==""){
      questo.displayedproducts=questo.products
    } else {
      var prods=[];
      questo.products.forEach(function(item,idx){
        if (item.nome.toLowerCase().indexOf(questo.filter.toLowerCase())>-1) prods.push(item);
        
            })
            questo.displayedproducts=prods;

    }
   
  }

  ionViewDidLoad() {
    var questo=this;
    console.log('ionViewDidLoad ProductsPage');
    var url=questo.backend.rooturl+"/minimarket/list";
    questo.loading=true;
    questo.backend.fetchData(url,function(data){
      questo.products=data.rows;
      console.log("questo.products",questo.products);
      questo.filterProducts();
      questo.loading=false;
    })
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


    viewCart(){
      this.navCtrl.push(CartPage);

    }

    addToCart(p){
      var questo=this;
      console.log("addtocart",p);
      var elid=p.id+"_qty";
      var n=document.getElementById(elid).getElementsByTagName('input')[0];
      //console.log(n);
      var qty=parseInt(n.value,10);
      //console.log("qty",n.value);

      //search for product in cart to see if it already exists
      var found=false;
      questo.backend.cart.forEach(function(item,idx){
        if (item.product.id==p.id) {
          found=true;
          var q=parseInt(item.qty,10);
          q+=qty;
          item.qty=q;
        }
      })

      //add it if not found in cart
      if (!found){
        var newcartprod={
          product: p,
          qty: qty
        }
   
        questo.backend.cart.push(newcartprod);

      }

      let toast = questo.toastCtrl.create({
        message:  "Hai aggiunto "+qty+" "+p.nome+" al tuo carrello prenotazioni",
        position: "top",
        duration: 2200
      });
      toast.present();
      n.value="1";

      if (1==1) return;

      let alrt = questo.alertCtrl.create({
        title: 'Aggiunto con successo !',
        subTitle: "Hai aggiunto "+qty+" "+p.nome+" al tuo carrello prenotazioni",
        buttons: ['Chiudi']
      });
      alrt.present();
    
    }

    getCartTotal(){
      var total=0;
      var questo=this;
      questo.backend.cart.forEach(function(item,idx){
        total+=parseInt(item.qty,10);
      })
      return total;
    }


    changeQty(ev){
      console.log("changeQty",ev.value);
      if (ev.value.trim()=="") ev.value="1";
    }


    qtyMinus(p){
      var questo=this;
      var elid=p.id+"_qty";
      var n=document.getElementById(elid).getElementsByTagName('input')[0];
      //console.log(n);
      var qty=parseInt(n.value,10);
      qty--;
      if (qty<1) qty=1;
      document.getElementById(elid).getElementsByTagName('input')[0].value=String(qty);
      

    }


    qtyPlus(p){
      var questo=this;
      var elid=p.id+"_qty";
      var n=document.getElementById(elid).getElementsByTagName('input')[0];
      //console.log(n);
      var qty=parseInt(n.value,10);
      qty++;
      
      document.getElementById(elid).getElementsByTagName('input')[0].value=String(qty);
      

    }
}
