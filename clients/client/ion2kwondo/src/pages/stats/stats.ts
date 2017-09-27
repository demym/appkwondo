import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, NavParams } from 'ionic-angular';
import { BackendProvider } from '../../providers/backend/backend';

/**
 * Generated class for the StatsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-stats',
  templateUrl: 'stats.html',
})
export class StatsPage {
  sortranking = "ranking_tkdr";
  ranking = [];
  loading=false;
  tipostat="ranking";

  constructor(public alertCtrl: AlertController, public backend: BackendProvider, public navCtrl: NavController, public navParams: NavParams) {
  }

  getPos(i) {
    var x = parseInt(i, 10) + 1;
    return x;
  }

  refresh(callback) {
    var questo = this;
    this.backend.getRanking(function (data) {
      console.log("got ranking", data);
      data.rows.sort(function(a,b){
        var a1=a.doc[questo.sortranking];
        var b1=b.doc[questo.sortranking];
        if (a1>b1) return -1;
        if (a1<b1) return 1;
        return 0;
      })
      questo.ranking = data.rows;

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


  ionViewDidLoad() {
    console.log('ionViewDidLoad StatsPage');
    var questo=this;
    questo.loading=true;
    this.refresh(function (data) {
      questo.loading=false;
    })
  }

  sortStats() {
    var questo = this;
    let prompt = this.alertCtrl.create({
      title: 'Ordina per',
      message: 'Scegli tipo di ordinamento',
      inputs: [
        {
          type: 'radio',
          label: 'Classifica generale',
          value: 'ranking_tkdr'
        },
        {
          type: 'radio',
          label: 'ORI',
          value: 'ori'
        },
        {
          type: 'radio',
          label: 'ARGENTI',
          value: 'argenti'
        },
        {
          type: 'radio',
          label: 'BRONZI',
          value: 'bronzi'
        },
        {
          type: 'radio',
          label: 'GARE DISPUTATE',
          value: 'garedisputate'
        },
        {
          type: 'radio',
          label: 'MATCH DISPUTATI',
          value: 'matchdisputati'
        }

      ],
      buttons: [
        {
          text: "Annulla",
          handler: data => {
            console.log("cancel clicked");
          }
        },
        {
          text: "OK",
          handler: data => {
            console.log("search clicked", data);
            questo.sortranking = data;
            questo.loading=true;
            questo.refresh(function(data){
              questo.loading=false;
            });

          }
        }
      ]
    });
    prompt.present();
  }




}
