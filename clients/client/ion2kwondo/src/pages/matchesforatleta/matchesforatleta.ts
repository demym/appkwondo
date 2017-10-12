import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Events, Navbar } from 'ionic-angular';
import { BackendProvider } from '../../providers/backend/backend';
import { MatchconsolePage } from '../../pages/matchconsole/matchconsole';
import { GaraPage } from '../../pages/gara/gara';

/*
  Generated class for the MatchesforatletaPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-matchesforatleta',
  templateUrl: 'matchesforatleta.html'
})
export class MatchesforatletaPage {
  @ViewChild(Navbar) navBar: Navbar;
  mfa: any=[];
  atletaid: any="";
  gara: any={};
  atleta: any={};
  history: any=[];
    viewAvversari: any = false;
  viewHistory: any = false;
  viewTkdt: any = false;
  viewTkdtCategoria: any=false;
  viewTabulato: any=false;
  tkdt: any={};
  avversari: any=[];
  tkdtatleta:any={};
  tkdtatletaarr: any=[];
  tabulato: any={};
  tabulatoimg: any="assets/img/boxbianco.jpg";


  constructor(public events: Events, public backend: BackendProvider, public navCtrl: NavController, public navParams: NavParams) {
    var questo=this;
    this.events.subscribe("updatematchesforatleta",function(m){
      console.log("updatematchesforatleta in matchesforatleta.ts !!");
      questo.mfa=questo.backend.filterRows(m,{atletaid: questo.atletaid}).rows;
      console.log("questo.mfa",questo.mfa);
    })
  }

  ionViewDidLoad() {
    var questo=this;
    questo.backend.setBackButtonAction(questo.navBar,questo.navCtrl);
    console.log('ionViewDidLoad MatchesforatletaPagePage');
    this.atletaid=this.navParams.get("atletaid"); 
    this.gara=this.navParams.get("gara");
    console.log("gara",this.gara);
    if (this.gara.gara.rows[0].doc.tkdt) this.tkdt=this.gara.gara.rows[0].doc.tkdt;
    
    questo.mfa=questo.backend.filterRows(questo.backend.activegara.matchesbyprog,{atletaid: questo.atletaid}).rows;
    //this.mfa=this.navParams.get("mfa");
    console.log("mfa",questo.mfa);
    console.log(JSON.stringify(questo.mfa));
    this.atleta=this.backend.getAtletaById(this.atletaid);
    console.log("this.atleta",this.atleta);
    var cat=this.getCategoria(this.atleta.datanascita);
    this.tkdtatleta=this.backend.getTkdtAtleta(this.atleta);
    this.avversari=this.backend.getTkdtAtletiCategoria(this.tkdtatleta.cateta,this.tkdtatleta.catcintura,this.tkdtatleta.catpeso,this.tkdtatleta.sesso);
    

    


    for (var k in this.tkdtatleta){
      if (this.tkdtatleta.hasOwnProperty(k)){
        var newel={
          name: k,
          value: this.tkdtatleta[k]
        }
        this.tkdtatletaarr.push(newel);
      }
    }

    console.log("tkdtatleta",this.tkdtatleta);
    console.log("avversari",this.avversari);

    this.tabulato=this.backend.getTkdtTabulatiCategoria(this.tkdtatleta.cateta,this.tkdtatleta.catcintura,this.tkdtatleta.catpeso,this.tkdtatleta.sesso)  ;
    console.log("tabulato",this.tabulato);

    var hastabulato=true;
    for (var kk in questo.tabulato){
      if (questo.tabulato.hasOwnProperty(kk)){
        if (questo.tabulato[kk]=="--") hastabulato=hastabulato && false;
      }
    }  
    console.log("hastabulato",hastabulato)
    if (hastabulato) {
    //if (this.tabulato!={}){
      questo.backend.getTabulatoImg(questo.tabulato.oldhref,function(data){
        console.log("tabulato image",data);
        questo.tabulatoimg=data;
      })
    }
    this.refresh(function(){});
    
  }


  getImg(m) {
    //console.log("getImg", m);
    var imgsrc: String = "matchtoplay.png";
    if (m.doc.disputato == "yes") {
      imgsrc = "matchko.png";
      if (m.doc.vinto == "yes") imgsrc = "matchok.png";
      if (m.doc.medagliamatch) {
        if (m.doc.medagliamatch != "none") {
          imgsrc = "medaglia_" + m.doc.medagliamatch+".png";
        }
      }

    }
    if (m.doc.realtime){
      if (String(m.doc.realtime)=="true") imgsrc="greenblink.gif";
    }


    imgsrc = "assets/img/" + imgsrc;
    //console.log("imgsrc", imgsrc);
    return imgsrc;



  }

    getImgPerAtleta(m) {
    //console.log("getImgPerAtleta", m);
    var imgsrc: String = "matchtoplay.png";
      var medaglia="none";
    m.matchesarray.forEach(function(item,idx){
    
      if (item.medagliamatch!="none"){
        medaglia=item.medagliamatch;
      }
    });
    if (medaglia!="none") imgsrc="medaglia_"+medaglia+".png";

    
    imgsrc = "assets/img/" + imgsrc;
    //console.log("imgsrc", imgsrc);
    return imgsrc;



  }

  getCategoria(dn){
    return this.backend.getCategoria(dn,this.gara.gara.rows[0].doc.data);
  }

  getVintoText(m){
    var text="Non disputato";
    if (m.disputato=="yes") {
      if (m.vinto=="yes") text="Vinto,";
      if (m.vinto=="no") text="Perso,";
      text=text+" risultato: "+m.risultato;
    }
    return text;
  }

  getClass(m){
    var cl="nondisputato";
    if (m.disputato=="yes"){
      if (m.vinto=="yes") cl="vinto";
      if (m.vinto=="no") cl="perso";
    }
    if (m.dadisputare=="no") cl="danondisputare";
    return cl;
  }

  refresh(callback){
    var questo=this;
    this.backend.getHistoryAtleta(this.atletaid,function(data){
      questo.history=data.rows;
      console.log("got history",data);
      if (callback) callback(data);
    })
  }

  getMedagliaHistory(m){
    var ret={
      medaglia: "--",
      color: "history black"
    }
  
    if (m.ori>0) {
      ret.medaglia="ORO";
      ret.color="history yellow";
    }
    if (m.arg>0) {
      ret.medaglia="ARG";
      ret.color="history silver"
    }
    if (m.bro>0) {
      ret.medaglia="BRO";
      ret.color="history orange"
    }

    return ret;

  }

  showMatchconsole(m){
    //this.backend.matchconsoles.push(m);
    if (this.backend.user.role.toLowerCase()!="tkdradmin") return;
    this.backend.playFeedback();
    this.navCtrl.push(MatchconsolePage,{
      match: m
    });
  }

  getDerbyText(id){ 
     
    var m=this.backend.getMatchById(id);
    //console.log("M",m);
    var atl=this.backend.getAtletaById(m.rows[0].doc.atletaid);
    var retvalue="derby con "+atl.cognome+" "+atl.nome+" !!";
    retvalue=retvalue.toUpperCase();
    if (!id) retvalue="";
    return retvalue;

  }

}
