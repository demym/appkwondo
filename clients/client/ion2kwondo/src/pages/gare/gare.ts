import { Component, ViewChild } from '@angular/core';
import { Events, NavController, NavParams, App, AlertController, Navbar,ModalController } from 'ionic-angular';
import { BackendProvider } from '../../providers/backend/backend';
import { GaraPage } from '../../pages/gara/gara';
import { EditgaraPage } from '../../pages/editgara/editgara';
import { DeviceFeedback } from '@ionic-native/device-feedback';
//import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';

/*
  Generated class for the GarePage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-gare',
  templateUrl: 'gare.html'
})
export class GarePage {
  @ViewChild(Navbar) navBar: Navbar;
  gare = [];
  loading = false;
  totali={
    ori: 0,
    argenti: 0,
    bronzi: 0,
    punti: 0
  }

  constructor(public modalCtrl:ModalController, public events: Events, public alertCtrl: AlertController, public deviceFeedback: DeviceFeedback, public app: App, public backend: BackendProvider, public navCtrl: NavController, public navParams: NavParams) { }

  ionViewWillEnter(){
    var questo=this;
    this.calcolaTotali();
    this.events.subscribe("hwbackbutton",function(data){
      console.log("hwbackbutton in gare.ts");
      questo.navCtrl.pop();
    })
   
  }
  ionViewWillLeave() {
    this.events.unsubscribe("hwbackbutton");
    
    
    }

  ionViewDidLoad() {
    //this.backend.setPushNativeTransition();
    console.log('ionViewDidLoad GarePagePage');
    this.gare = this.backend.gare;
    this.backend.setBackButtonAction(this.navBar,this.navCtrl);
    this.backend.setupNavbarBack(this.navBar,this.navCtrl);

    /*this.refresh(function(data){
     
    }) */
  }

  refresh(callback) {
    var questo = this;
    this.backend.getGare(function (data) {
      questo.gare = data.rows;
     
      console.log("gare", questo.gare);
      if (callback) callback(data);
    })
  }


  calcolaTotali(){
    var questo=this;
    var totori=0;
    var totargenti=0;
    var totbronzi=0;
    var totpunti=0;
    questo.backend.gare.forEach(function(item,idx){
     // console.log(item);
      
      if (item.hasOwnProperty("doc")){
        if (item.doc.hasOwnProperty("ori")){
          totori+=parseInt(item.doc.ori,10);
          

        }
        if (item.doc.hasOwnProperty("argenti")){
          totargenti+=parseInt(item.doc.argenti,10);
          
        }
        if (item.doc.hasOwnProperty("bronzi")){
          totbronzi+=parseInt(item.doc.bronzi);
          
        }
      }

    })
    totpunti=totori*7+totargenti*3+totbronzi;
    questo.totali.ori=totori;
    questo.totali.argenti=totargenti;
    questo.totali.bronzi=totbronzi;
    questo.totali.punti=totpunti;
  }


  doRefresh2() {
    
    
  
        var questo = this;
        questo.loading=true;
        questo.refresh(function (data) {
          //console.log("allnews", data);
    
         questo.loading=false;
        })
    
    
    
      }
    

  doRefresh(refresher) {


    console.log('Begin async operation', refresher);
    var questo = this;
    questo.refresh(function (data) {
      //console.log("allnews", data);

      refresher.complete();
    })



  }

  gotoGara(id) {
    var questo = this;
    console.log("gotoGara", id);
    this.backend.playFeedback();
    //this.deviceFeedback.acoustic();
    //ios-transition

    this.navCtrl.push(GaraPage, {
      id: id
    }, questo.backend.navOptions);
  }

  getLen(m) {
    var retvalue = 0;
    if (m.trim() != "") {
      var arr = m.split(",");
      retvalue = arr.length;

    }
    return retvalue;



  }

  pressGara(g) {
    var questo = this;
    if (questo.backend.user.role.toLowerCase() != "tkdradmin") return;
    console.log("pressed gara", g);
    let alert = this.alertCtrl.create({
      title: 'Modifica gara',
      message: 'Vuoi modificare questa gara ?',
      buttons: [
        {
          text: 'ANNULLA',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'SEGNA COME DISPUTATA',
          handler: () => {
            questo.loading = true;
            questo.backend.markGara(g.doc.id, "disputata", function (data) {
              console.log(data);

              questo.refresh(function () {
                console.log("gare refreshed");
                questo.loading = false;

              })
            })
          }
        },
        {
          text: 'SEGNA COME NONDISPUTATA',
          handler: () => {
            questo.loading = true;
            questo.backend.markGara(g.doc.id, "nondisputata", function (data) {
              console.log(data);

              questo.refresh(function () {
                console.log("gare refreshed");
                questo.loading = false;
              })
            })
          }
        },
        {
          text: 'SEGNA COME INCORSO',
          handler: () => {
            questo.loading = true;
            questo.backend.markGara(g.doc.id, "incorso", function (data) {
              console.log(data);

              questo.refresh(function () {
                console.log("gare refreshed");
                questo.loading = false;
              })
            })
          }
        },
        {
          text: 'MODIFICA',
          handler: () => {
            console.log('Buy clicked');

            let profileModal = this.modalCtrl.create(EditgaraPage, {
              gara: g.doc
            });
            profileModal.onDidDismiss(data => {
              console.log(data);
              if (data=="saved") {
                questo.doRefresh2();
              }
            });
            profileModal.present();
            /*
            questo.navCtrl.push(EditgaraPage, {
              gara: g.doc
            }, questo.backend.navOptions)*/
          }
        },
        {
          text: 'ELIMINA',
          handler: () => {
            console.log('Buy clicked');
            let alert2 = questo.alertCtrl.create({
              title: 'Elimina gara',
              message: 'Vuoi realmente eliminare questa gara ?',
              buttons: [
                {
                  text: 'ANNULLA',
                  role: 'cancel',
                  handler: () => {
                    console.log('Cancel clicked');
                  }
                },
                {
                  text: 'SI, ELIMINA LA GARA',
                  handler: () => {
                    console.log('eliminagara confirmed clicked');
                    //delete code
                  }
                }
              ]
            });
            alert2.present();
          }
        }
      ]
    });
    alert.present();
  }

  getClass(g) {
    var retvalue = "";
    if (g.doc.stato.toLowerCase() == "disputata") retvalue = "garadisputata";
    return retvalue;
  }

  setBackButtonAction(nb,nc) {
    var questo = this;
    nb.backButtonClick = () => {
      //Write here wherever you wanna do
      let x = Object.assign({}, questo.backend.navOptions);

      x.direction = "back";
      nc.pop(x);
    }
  }

  addGara(){
    var questo=this;
    console.log('add Gara');
    var newgara={
      location: "",
      title: "",
      data: "",
      stato: "nondisputata",
      iscritti: "",
      myiscritti: "",
      maplocation: "",
      ori: 0,
      argenti: 0,
      bronzi: 0,
      ngiorni: "1"

    }
    questo.navCtrl.push(EditgaraPage, {
      gara: newgara
    }, questo.backend.navOptions)

  }


}
