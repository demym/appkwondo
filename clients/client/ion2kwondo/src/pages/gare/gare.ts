import { Component } from '@angular/core';
import { NavController, NavParams, App, AlertController } from 'ionic-angular';
import { BackendProvider } from '../../providers/backend/backend';
import { GaraPage } from '../../pages/gara/gara';
import { EditgaraPage } from '../../pages/editgara/editgara';
import { DeviceFeedback } from '@ionic-native/device-feedback';

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
  gare = [];

  constructor(public alertCtrl: AlertController, public deviceFeedback: DeviceFeedback, public app: App, public backend: BackendProvider, public navCtrl: NavController, public navParams: NavParams) { }

  ionViewDidLoad() {

    console.log('ionViewDidLoad GarePagePage');
    this.gare = this.backend.gare;
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

  doRefresh(refresher) {


    console.log('Begin async operation', refresher);
    var questo = this;
    questo.refresh(function (data) {
      //console.log("allnews", data);

      refresher.complete();
    })



  }

  gotoGara(id) {
    console.log("gotoGara", id);
    this.deviceFeedback.acoustic();
    this.navCtrl.push(GaraPage, {
      id: id
    });
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
    if (questo.backend.user.role.toLowerCase()!="tkdradmin") return;
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
          text: 'MODIFICA',
          handler: () => {
            console.log('Buy clicked');
            questo.navCtrl.push(EditgaraPage, {
              gara: g.doc
            })
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

  getClass(g){
    var retvalue="";
    if (g.doc.stato.toLowerCase()=="disputata") retvalue="garadisputata";
    return retvalue;
  }


}
