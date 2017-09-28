import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { BackendProvider } from '../../providers/backend/backend';

/**
 * Generated class for the MedagliereglobalePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-medagliereglobale',
  templateUrl: 'medagliereglobale.html',

})
export class MedagliereglobalePage {
  html= "";
  gara: any={};
  jgara: any={};
  loading=false;

  constructor(public backend: BackendProvider, public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams) {
    //this.html=navParams.get('html');
    this.gara=navParams.get("gara");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MedagliereglobalePage');
    this.jgara=this.navParams.get("gara");
    this.getMedagliereGlobale();
  }

  close(){
    this.viewCtrl.dismiss();
  }


  getMedagliereGlobale(){
    var questo=this;
    var tkdt_rooturl = "https://www.tkdtechnology.it/index.php/welcome/";
    var tkdt_garaid=questo.jgara.tkdt_id;
    var giornataid;
    if (!giornataid) {
      if (questo.jgara.tkdt) {
        if (questo.jgara.tkdt.giorni) {
          if (questo.jgara.tkdt.giorni.length > 0) {
            giornataid = questo.jgara.tkdt.giorni[0].id;
            console.log("using giornataid from tkdt structure",giornataid)
          }
        }
      }
    }
  
  
  
    var url = questo.backend.rooturl + "/tkdt/medagliereglobale/" + giornataid;
  
    //var caricamentotext = imgtext + "Caricamento in corso...."
  
    questo.loading=true;
    questo.backend.fetchText(url,function(data){
      questo.loading=false;
      console.log("got medagliere globale",data);
      var pos=data.indexOf("<table class=");

      questo.html=data.slice(pos);
      setTimeout(function(){
        let clarr: any=document.getElementsByClassName("link_w_tooltip_gold");
        questo.transform(clarr);
        clarr=document.getElementsByClassName("link_w_tooltip_silver");
        questo.transform(clarr);
        clarr=document.getElementsByClassName("link_w_tooltip_bronze");
        questo.transform(clarr);
        let table: any=document.getElementsByClassName("table-striped")[0];
        table.border="1";
        table.width="100%";
      
        //console.log("clarr",clarr,clarr.length);

     
   
      },1000)
   
      /*let profileModal = questo.modalCtrl.create(MedagliereglobalePage, { html: data });
      profileModal.present();*/
    })  

   
  }

  replaceAll(input, search, replacement) {
    var target = input;
    return target.replace(new RegExp(search, 'g'), replacement);
} 

transform(clarr){
  var questo=this;
  for (var i=0; i<clarr.length; i++){
    // clarr[i].text="minchia";
    let atleti=clarr[i].title;
    atleti=questo.replaceAll(atleti,"<b>","");
    atleti=questo.replaceAll(atleti,"</b>","");

    let arratleti=atleti.split("<br>");
    arratleti.sort(function(a,b){
      if (a>b) return 1;
      if (a<b) return -1;
      return 0;

    })

    atleti=arratleti.join("\n");

   // atleti=questo.replaceAll(atleti,"<br>","\n");

    console.log("atleti",atleti);
    clarr[i].onclick=function(){
      alert(atleti);
    }


   }

}

}
