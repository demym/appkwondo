import { Component, ViewChild } from '@angular/core';
import { Events, NavController, NavParams, Navbar, ModalController, ToastController, AlertController } from 'ionic-angular';
import { BackendProvider } from '../../providers/backend/backend';
import { AtletaPage } from '../../pages/atleta/atleta';
import { EditatletaPage } from '../../pages/editatleta/editatleta';

/*
  Generated class for the GarePage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-atleti',
  templateUrl: 'atleti.html'
})
export class AtletiPage {
  @ViewChild(Navbar) navBar: Navbar;
  atleti = [];
  newAtleta = {
    cognome: "",
    nome: "",
    datanascita: "01.01.2005",
    sesso: "M",
    squadra: "",
    categoriapeso: "",
    palestra: "",
    cintura: "",
    punticlass: "",
    societaid: "20160217220400"
  }
  displayedatleti:any=[];
  filter="";
  loading=false;

  constructor(public alertCtrl: AlertController, public toastCtrl: ToastController, public modalCtrl: ModalController, public events: Events, public backend: BackendProvider, public navCtrl: NavController, public navParams: NavParams) { }

  ionViewWillEnter() {
    var questo = this;
    this.events.subscribe("hwbackbutton", function (data) {
      console.log("hwbackbutton in gare.ts");
      questo.navCtrl.pop();
    })
    questo.refresh(function(data){});
  }

  ionViewWillLeave() {
    this.events.unsubscribe("hwbackbutton");


  }

  ionViewDidLoad() {

    console.log('ionViewDidLoad AtletiPage');
    this.atleti = this.backend.atleti;
    this.backend.setBackButtonAction(this.navBar, this.navCtrl);
    this.backend.setupNavbarBack(this.navBar, this.navCtrl);
    /*this.refresh(function(data){
     
    })  */
  }

  refresh(callback) {
    var questo = this;
    questo.loading=true;
    questo.backend.getAtleti(function (data) {
      questo.atleti = data.rows;
      questo.filterAtleti();
      
      console.log("atleti", questo.displayedatleti);
      questo.loading=false;
      if (callback) callback(data);
    })
  }

  filterAtleti(){
    var questo=this;
    var atleti=[];
    if (questo.filter.trim()==""){
      atleti=questo.atleti;
    } else {
     
      questo.atleti.forEach(function(item,idx){
        var doIt=false;
        if (item.doc.cognome.toLowerCase().indexOf(questo.filter.toLowerCase())>-1) doIt=true;
        if (item.doc.nome.toLowerCase().indexOf(questo.filter.toLowerCase())>-1) doIt=true;
        if (doIt) atleti.push(item);

      })
      
    }
    questo.displayedatleti=atleti;
  }

  doRefresh(refresher) {


    console.log('Begin async operation', refresher);
    var questo = this;
    questo.refresh(function (data) {
      //console.log("allnews", data);

      refresher.complete();
    })
  }


  getCategoria(m) {
    return this.backend.getCategoria(m.doc.datanascita, null);

  }

  gotoAtleta(atl) {
    this.navCtrl.push(AtletaPage, { atleta: atl });
  }


  editAtleta(a) {
    console.log("editatleta", a);
    var questo = this;
    let profileModal = questo.modalCtrl.create(EditatletaPage, { atleta: a.doc });
    profileModal.onDidDismiss(data => {
      console.log(data);
      if (data) {
        if (data.hasOwnProperty("action")) {
          var text = data.text;
          questo.refresh(function(){
            let toast = questo.toastCtrl.create({
              message: 'Atleta ' + a.doc.cognome + " " + a.doc.nome + " " + text,
              duration: 3000,
              position: 'top'
            });
  
            toast.onDidDismiss(() => {
              console.log('Dismissed toast');
            });
  
            toast.present();


          })
         

        }
      }
    });
    profileModal.present();

  }


  addAtleta() {
    var questo = this;
    let profileModal = questo.modalCtrl.create(EditatletaPage, { atleta: questo.newAtleta });
    profileModal.onDidDismiss(data => {
      console.log(data);
      if (data.hasOwnProperty("action")) {
        var text = data.text;
        questo.refresh(function(){
          let toast = questo.toastCtrl.create({
            message: 'Atleta ' + data.atleta.cognome + " " + data.atleta.nome + " " + text,
            duration: 3000,
            position: 'top'
          });
  
          toast.onDidDismiss(() => {
            console.log('Dismissed toast');
          });
  
          toast.present();
        



        });
      

      }
    });
    profileModal.present();
    //this.navCtrl.push(EditatletaPage,{atleta: questo.newAtleta}, questo.backend.navOptions)

  }

  deleteAtleta(a) {
    var questo = this;
    var url = questo.backend.rooturl + "/atleti/delete";
    var postdata = {
      id: a.doc.id,
      rev: a.doc.id
    }
    questo.backend.postData(url, postdata, function (data) {
      console.log("atleta deleted", data);
      questo.refresh(function () {
        let toast = questo.toastCtrl.create({
          message: 'Atleta ' + a.doc.cognome + " " + a.doc.nome + " eliminato",
          duration: 3000,
          position: 'top'
        });
  
        toast.onDidDismiss(() => {
          console.log('Dismissed toast');
        });
  
        toast.present();



       });  
      

    })
  }


  pressAtleta(a) {
    var questo = this;
    if (questo.backend.user.role != "tkdradmin") return;
    let alrt = questo.alertCtrl.create({
      title: 'Seleziona una scelta',
      message: 'Esegui una tra le azioni elencate',
      buttons: [
        {
          text: 'ANNULLA',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Modifica atleta',
          handler: () => {
            questo.editAtleta(a);
          }
        },
        {
          text: 'Elimina atleta',
          handler: () => {
            console.log('Buy clicked');
            let alert2 = questo.alertCtrl.create({
              title: 'Elimina atleta',
              message: 'Vuoi realmente eliminare ' + a.doc.cognome + ' ' + a.doc.nome + ' ?',
              buttons: [
                {
                  text: 'ANNULLA',
                  role: 'cancel',
                  handler: () => {
                    console.log('Cancel clicked');
                  }
                },
                {
                  text: 'SI, ELIMINA ' + a.doc.cognome + ' ' + a.doc.nome,
                  handler: () => {
                    questo.deleteAtleta(a);
                    console.log('eliminaatleta confirmed clicked');
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
    alrt.present();
  }

  onInput(ev){
    var questo=this;
    console.log("onInput",ev);

        console.log("filter",questo.filter)
        //questo.filter=ev.data;
        questo.filterAtleti();



  }
  onCancel(ev){
    var questo=this;
    console.log("onCancel",ev);
    //questo.filter="";
    
    
  }

}
