import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Navbar, Events } from 'ionic-angular';
import { BackendProvider } from '../../providers/backend/backend';
import { GaraPage } from '../../pages/gara/gara';

/*
  Generated class for the GarePage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-eventi',
  templateUrl: 'eventi.html'
})
export class EventiPage {
  @ViewChild(Navbar) navBar: Navbar;
  gare = [];
  nextevents: any = [];
  view = "nextevents";
  detailview="";
  loading=false;

  constructor(public events: Events, public backend: BackendProvider, public navCtrl: NavController, public navParams: NavParams) { }

  ionViewDidLoad() {

    console.log('ionViewDidLoad EventiPage');
    this.backend.setBackButtonAction(this.navBar, this.navCtrl);
    this.backend.setupNavbarBack(this.navBar, this.navCtrl);
    this.refresh(function (data) {

    })
  }

  refresh(callback) {
    var questo = this;
    questo.backend.getNextEvents(function () {
      questo.backend.getEventi(function (data) {
        questo.gare = data.rows;
        console.log("gare", questo.gare);
        if (callback) callback(data);
      })
    })
  }

  doRefresh2(){
    var questo=this;
    questo.loading=true;
    questo.refresh(function(){
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


  ionViewWillEnter() {
    var questo = this;
    this.events.subscribe("hwbackbutton", function (data) {
      console.log("hwbackbutton in gare.ts");
      questo.navCtrl.pop();
    })

    /*
    questo.backend.getNextEvents(function(data){
      console.log("fatto nextevents");
      questo.nextevents=data;
    });*/

  }

  ionViewWillLeave() {
    this.events.unsubscribe("hwbackbutton");


  }

  getAbs(n) {
    return Math.abs(n);
  }

  showDetails(g){
    var questo=this;
    var newdetailview=g.gara.id;
    if (questo.detailview==g.gara.id) newdetailview="";
    questo.detailview=newdetailview;

  }

  getDescr(g){
    var retvalue="";
    if (g.gara.hasOwnProperty("descr")) retvalue=g.gara.descr;
    return retvalue;
  }

  openGara(g){

    var id=g.gara.id;

    var questo = this;
    console.log("openGara", id);
    questo.backend.playFeedback();
    //this.deviceFeedback.acoustic();
    //ios-transition

    questo.navCtrl.push(GaraPage, {
      id: id
    }, questo.backend.navOptions);
  }


 


}
