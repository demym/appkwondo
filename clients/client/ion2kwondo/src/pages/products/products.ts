import { Component } from '@angular/core';
import { NavController, NavParams, Events, AlertController, ToastController, ModalController } from 'ionic-angular';
import { BackendProvider } from '../../providers/backend/backend';
import { UtilsProvider } from '../../providers/utils/utils';
import { CartPage } from '../../pages/cart/cart';
import { EditproductPage } from '../editproduct/editproduct';

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
  categoria = "";
  numero = "4";
  loading = false;
  filter = "";
  displayedproducts: any = [];

  products: any = [];


  products_old: any = [
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

  constructor(public utils: UtilsProvider, public modalCtrl: ModalController, public toastCtrl: ToastController, public alertCtrl: AlertController, public backend: BackendProvider, public events: Events, public navCtrl: NavController, public navParams: NavParams) {
    this.categoria = this.navParams.get("categoria");
    console.log("SHOWING categoria",this.categoria);
  }

  onInput(ev) {
    console.log("onInput", ev);
    this.filterProducts();
  }

  onCancel(ev) {
    console.log("onCancel", ev);
    this.filterProducts();
  }

  filterProducts() {
    var questo = this;

    if (questo.filter.trim() == "") {
      questo.displayedproducts = questo.products
    } else {
      var prods = [];
      questo.products.forEach(function (item, idx) {
        if (item.nome.toLowerCase().indexOf(questo.filter.toLowerCase()) > -1) prods.push(item);

      })
      questo.displayedproducts = prods;

    }

  }

  ionViewDidLoad() {
    var questo = this;
    console.log('ionViewDidLoad ProductsPage');
    questo.refresh(function () {

    })
  }


  refresh(callback?: any) {
    var questo = this;
    var url = questo.backend.rooturl + "/minimarket/list";
    questo.loading = true;
    questo.backend.fetchData(url, function (data) {
      var products=[];
      data.rows.forEach(function(item,idx){
        if (item.categoria==questo.categoria) products.push(item);
      })
      questo.products = products;
      console.log("questo.products", questo.products);
      questo.filterProducts();
      questo.loading = false;
      if (callback) callback();
    })

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


  viewCart() {
    this.navCtrl.push(CartPage);

  }

  addToCart(p) {
    var questo = this;
    console.log("addtocart", p);
    var elid = p.id + "_qty";
    //var n=document.getElementById(elid).getElementsByTagName('input')[0];
    var n = <HTMLInputElement>document.getElementById(elid);
    //console.log(n);
    var qty = parseInt(n.value, 10);
    //console.log("qty",n.value);

    //search for product in cart to see if it already exists
    var found = false;
    questo.backend.cart.forEach(function (item, idx) {
      if (item.product.id == p.id) {
        found = true;
        var q = parseInt(item.qty, 10);
        q += qty;
        item.qty = q;
      }
    })

    //add it if not found in cart
    if (!found) {
      var newcartprod = {
        product: p,
        qty: qty
      }

      questo.backend.cart.push(newcartprod);

    }

    let toast = questo.toastCtrl.create({
      message: "Hai aggiunto " + qty + " " + p.nome + " al tuo carrello prenotazioni",
      position: "top",
      duration: 2200
    });
    toast.present();
    n.value = "1"; 
    questo.utils.setJsonStorage("ion2kwondo_"+questo.backend.user.id+"_mcrt", questo.backend.cart);

    if (1 == 1) return;

    let alrt = questo.alertCtrl.create({
      title: 'Aggiunto con successo !',
      subTitle: "Hai aggiunto " + qty + " " + p.nome + " al tuo carrello prenotazioni",
      buttons: ['Chiudi']
    });
    alrt.present();

  }

  getCartTotal() {
    var total = 0;
    var questo = this;
    questo.backend.cart.forEach(function (item, idx) {
      total += parseInt(item.qty, 10);
    })
    return total;
  }


  changeQty(ev) {
    console.log("changeQty", ev.value);
    if (ev.value.trim() == "") ev.value = "1";
  }


  qtyMinus(p) {
    var questo = this;
    var elid = p.id + "_qty";
    //var n=document.getElementById(elid).getElementsByTagName('input')[0];
    var n = <HTMLInputElement>document.getElementById(elid);
    //console.log(n);
    var qty = parseInt(n.value, 10);
    qty--;
    if (qty < 1) qty = 1;
    //document.getElementById(elid).getElementsByTagName('input')[0].value=String(qty);
    n.value = String(qty);


  }


  qtyPlus(p) {
    var questo = this;
    var elid = p.id + "_qty";
    //var n=document.getElementById(elid).getElementsByTagName('input')[0];
    var n = <HTMLInputElement>document.getElementById(elid);
    //console.log(n);
    var qty = parseInt(n.value, 10);
    qty++;

    //document.getElementById(elid).getElementsByTagName('input')[0].value=String(qty);
    n.value = String(qty);


  }


  isMarketAdmin() {
    var questo = this;
    var isadmin = false;
    if (questo.backend.user.role == 'tkdradmin') isadmin = true;
    if (questo.backend.user.role == 'marketadmin') isadmin = true;
    return isadmin;

  }


  addProduct() {
    var questo = this;
    let profileModal = this.modalCtrl.create(EditproductPage, { mode: "insert" });
    profileModal.onDidDismiss(data => {
      console.log(data);
      if (data == "saved") {
        let toast = questo.toastCtrl.create({
          message: "Prodotto aggiunto !",
          position: "top",
          duration: 2200
        });
        toast.present();
        questo.refresh();
      }
    });
    profileModal.present();

  }

  getUpperCase(f){
    return f.toUpperCase();
  }

  editProduct(item) {
    var questo = this;
    if (!this.isMarketAdmin()) return;
    let profileModal = this.modalCtrl.create(EditproductPage, { mode: "edit", product: item });
    profileModal.onDidDismiss(data => {
      console.log(data);
      if ((data == "saved") || (data == "deleted")) {
        var msg = "aggiornato";
        if (data == "deleted") msg = "eliminato";
        let toast = questo.toastCtrl.create({
          message: "Prodotto " + msg + " !",
          position: "top",
          duration: 2200
        });
        toast.present();
        questo.refresh();

      }

    });
    profileModal.present();

  }
}
