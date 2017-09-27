import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { BackendProvider } from '../../providers/backend/backend';
import { MatchesforatletaPage } from '../../pages/matchesforatleta/matchesforatleta';
import { ChatPage } from '../../pages/chat/chat';
import { MapPage } from '../../pages/map/map';
import { FiltersPage } from '../../pages/filters/filters';
import { MedagliereglobalePage } from '../../pages/medagliereglobale/medagliereglobale';
import { Events } from 'ionic-angular';
import { DeviceFeedback } from '@ionic-native/device-feedback';
import * as moment from 'moment';

 

/*
  Generated class for the GaraPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-gara',
  templateUrl: 'gara.html'
})
export class GaraPage {
  gara: any = {
    gara:{
      rows:[]
    },
    matchesbyprog: {
      rows: []
    }
  };
  displayedgara: any = {
    gara:{
      rows:[]
    },
    matchesbyprog: {
      rows: []
    }
  };
  view = "matchesbyprog";
  garaid;
  selectedtab = 0;
  realtimecount:any=0;
  jgara: any={};
  viewInfobar: any=false;
  loading: any = false;
  iscritti: any=[];
  showIscritti=false;
  atletiiscritti=[];
  filters: any ={
    sesso: "",
    categoria: "",
    medaglie: "",
    quadrato: ""
  }
  filtersApplied=false;


  info: any ={

  }

  constructor(public modalCtrl: ModalController, public deviceFeedback: DeviceFeedback, public events: Events, public backend: BackendProvider, public navCtrl: NavController, public navParams: NavParams) {
    var questo=this;
   
    this.events.subscribe("updategara",function(msg,time){
      console.log("refreshgara in gara.ts !!");
      questo.refresh(function(){
        questo.backend.syncConsoles(questo.gara.matchesbyprog);
        // questo.events.publish("realtimematches",questo.gara.matchesbyprog);
        questo.events.publish("consolessynced",questo.gara.matchesbyprog);
        questo.events.publish("updatematchesforatleta",questo.gara.matchesbyprog);
      });
    })
   

    

   }

  ionViewDidLoad() {

     let questo = this;
    questo.garaid = this.navParams.get("id");
    console.log('ionViewDidLoad GaraPage', this.garaid);

    
    
    questo.refresh(function (data) {

    })
    
   
  }

  refresh(callback) {
    var questo = this;
    questo.loading=true;
    questo.atletiiscritti=[];
    questo.backend.getGara(questo.garaid, function (data) {
      //let data= Object.assign({}, d);
      console.log("got gara",data,data.matchesbyatleta.rows.length);
     
     
      questo.gara = data;
      
      console.log("sono qui");
      questo.jgara=data.gara.rows[0].doc;
      console.log("e poi qui");
      var rtcount=0;
      if (questo.gara.matchesbyprog.rows.length==0) questo.showIscritti=true;

      questo.gara.matchesbyprog.rows.forEach(function (item, idx) {
        var doc = item.doc;
        var imgsrc = "matchtoplay.png";
        if (doc.disputato == "yes") {
          imgsrc = "matchko.png";
          if (doc.vinto == "yes") imgsrc = "matchok.png";
        }
        doc.imgsrc = "assets/img/" + imgsrc;
        if (doc.realtime){
          if (String(doc.realtime)=="true") rtcount++;
        }


        
      })

    

      console.log("gara", questo.gara);
      console.log("jgara", questo.jgara);
      questo.realtimecount=rtcount;
      questo.iscritti=questo.jgara.iscritti.split(",");

      questo.iscritti.forEach(function(item,idx){
        var atl=questo.getAtletaIscritto(item);
        questo.atletiiscritti.push(atl);

      })
      questo.atletiiscritti.sort(function(a,b){
        var a1=a.cognome+a.nome;
        var b1=b.cognome+b.nome;
        if (a1>b1) return 1;
        if (a1<b1) return -1;
        return 0;
      })

      if (questo.filtersApplied){
        questo.displayedgara=questo.filterGara(questo.gara);
        
        
      } else questo.displayedgara=questo.gara;

      console.log("displayedgara",questo.displayedgara);


      console.log("atletiiscritti",questo.atletiiscritti);
      questo.loading=false;
      questo.info.dadisputare=questo.backend.filterRows(questo.gara.matchesbyprog,{ dadisputare: "yes"});
      questo.info.disputati=questo.backend.filterRows(questo.gara.matchesbyprog,{ disputato: "yes"});
      questo.info.vinti=questo.backend.filterRows(questo.gara.matchesbyprog,{ disputato: "yes", vinto: "yes"});
      questo.info.persi=questo.backend.filterRows(questo.gara.matchesbyprog,{ disputato: "yes", vinto: "no"});
      console.log("questo.info",questo.info);
      
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

  showMatchesForAtleta(aid){
    console.log("showmatchesforatleta",aid);
    //var atl=this.backend.getAtletaById(aid);
    //console.log("atl",atl);
    var mfa=[];
    this.gara.matchesbyprog.rows.forEach(function(item,idx){
      if (item.doc.atletaid==aid) mfa.push(item);

    })
    console.log(mfa);
    var questo=this;
    questo.deviceFeedback.acoustic();
    this.navCtrl.push(MatchesforatletaPage,{
      gara: questo.gara,
      
      atletaid: aid,
      mfa: mfa
    })
  }

  getAtletaIscritto(i){
    return this.backend.getAtletaById(i);
  }

  getArrLen(m){

    var arr=m.split(",");
    var l=arr.length;
    if (m.trim()=="") l=0;
    return l;

  }

  toggleInfobar(){
    this.viewInfobar=!this.viewInfobar;
    this.deviceFeedback.acoustic();
  }

  tapSegment(){
    console.log("tapSegment");
    this.deviceFeedback.acoustic();

  }

  getMedals(){
    var ret={
      ori: 0,
      arg: 0,
      bro: 0
    }
    this.gara.matchesbyprog.rows.forEach(function(item,idx){
      var doc=item.doc;
      if (doc.medagliamatch=="oro")ret.ori++;
      if (doc.medagliamatch=="bronzo")ret.bro++;
      if (doc.medagliamatch=="argento")ret.arg++;
        

      

    })
    return ret;
    
    
  }

  gotoChat(){
    this.deviceFeedback.acoustic();
    this.navCtrl.push(ChatPage);

  }

  hasMap(){
    var retvalue=false;
    if (this.jgara.maplocation){
      if (this.jgara.maplocation.trim()!="") retvalue=true;
    }
    return retvalue;
  }

  showMap(){
    this.deviceFeedback.acoustic();
    var questo=this;
    //var url=questo.sanitizer.bypassSecurityTrustUrl(jgara.maplocation);

    //this.backend.openUrl(this.jgara.maplocation);
    this.navCtrl.push(MapPage,{
      mapsrc: questo.jgara.maplocation
    })
    
  }


  getMaschiFemmine(m,sucosa?: any){
    return this.backend.getMaschiFemmine(m,sucosa);
  }

  getCronacaTime(t){
    var m=moment(t, "YYYYMMDDHHmmSS").format("DD/MM/YYYY HH:mm:SS");
    return m;

  }

getDerbyText(id){
     
    var m=this.backend.getMatchById(id);
    //console.log("M",id,m);
    var atl=this.backend.getAtletaById(m.rows[0].doc.atletaid);
    var retvalue="derby con "+atl.cognome+" "+atl.nome+" !!";
    retvalue=retvalue.toUpperCase();
    if (!id) retvalue="";
    return retvalue;

  }

  setFilters(){
    var questo=this;
    let profileModal = this.modalCtrl.create(FiltersPage, questo.filters);
    profileModal.onDidDismiss(data => {
      console.log("modal return",data);
      questo.filters=data;
      questo.filtersApplied=false;
      for (var k in questo.filters){
        if (questo.filters[k].trim()!="") questo.filtersApplied=true;
      }
      questo.refresh(function(){
        console.log("refreshed");
      })
    });
    profileModal.present();
  }

  getFiltersClass(){
    var retvalue="filt";
    if (this.filtersApplied){
      retvalue="filt filtapplied";
    } else {
      retvalue="filt";
    }
    return retvalue;
  }
  getFiltersText(){
    var retvalue="Filtri";
    if (this.filtersApplied){
      retvalue="Filtri applicati";
    } else {
      retvalue="Filtri";
    }
    return retvalue;
  }


  filterGara(data){
    console.log("filterGara",data);
    var arrmpb=[];
    var arrmpa=[];
    var questo=this;
    
    data.matchesbyprog.rows.forEach(function(item,idx){
      var match=item.doc;
      var atl=questo.backend.getAtletaById(match.atletaid);
      //console.log("atl",atl);
      //SESSO
      var doIt=true;
      if (questo.filters.sesso.trim()!=""){
        if (atl.sesso.toLowerCase()!=questo.filters.sesso.toLowerCase()){
          doIt=doIt && false;
          //console.log("aggiunto match mbp",item);
        }

      }

        //CATEGORIA

        if (questo.filters.categoria.trim()!=""){
          if (atl.categoria.toLowerCase()!=questo.filters.categoria.toLowerCase()){
          
         
            doIt=doIt && false;
            //console.log("aggiunto match mba",item);
          }
  
        }

     
       if (doIt) arrmpb.push(item);
      
    })

    
   
    data.matchesbyatleta.rows.forEach(function(item,idx){
      var match=item;
      var atl=questo.backend.getAtletaById(match.id);
      //console.log("atl",atl);
      //SESSO
      var doIt=true;
      if (questo.filters.sesso.trim()!=""){
        if (atl.sesso.toLowerCase()!=questo.filters.sesso.toLowerCase()){
          doIt=doIt && false;
         
          //console.log("aggiunto match mba",item);
        }

      }

      //CATEGORIA

      if (questo.filters.categoria.trim()!=""){
        if (atl.categoria.toLowerCase()!=questo.filters.categoria.toLowerCase()){
        
       
          doIt=doIt && false;
          //console.log("aggiunto match mba",item);
        }

      }



      if (doIt) arrmpa.push(item);
      
    })
    
    //console.log("dopo filtermatches",data);
    data.matchesbyprog.rows=arrmpb;
    data.matchesbyatleta.rows=arrmpa;
    return data;
    
  }


  getMedagliereGlobale(){
    var questo=this;
    let profileModal = questo.modalCtrl.create(MedagliereglobalePage, { gara: questo.gara.gara.rows[0].doc });
    profileModal.present();


    if (1==1) return;
   
    var tkdt_rooturl = "https://www.tkdtechnology.it/index.php/welcome/";
    var tkdt_garaid=questo.gara.gara.rows[0].doc.tkdt_id;
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
      let profileModal = questo.modalCtrl.create(MedagliereglobalePage, { html: data });
      profileModal.present();
    })  

   
  }



}
