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
  html = "";
  gara: any = {};
  jgara: any = {};
  loading = false;
  toggles: any = {
    medagliereglobale: true,
    giornigara: false,
    societa: false
  }
  activetab = "medagliereglobale";
  activegiorno = 0;
  activegiornata: any = {

  };
  viewatletisocieta = false;
  viewsocieta = false;
  viewsocietaiscritte = false;
  viewmedagliere=false;
  viewmedagliereglobale=false;
  viewtabulati=false;
  activesocieta = "";

  jgaratemplate = {
    atleti: [],
    atleti_iscritti: [],
    giorni: [],
    tabulati: []
  }

  hasGiornate = false;
  table;
  societaiscritte=[];

  constructor(public backend: BackendProvider, public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams) {
    //this.html=navParams.get('html');
    this.gara = navParams.get("gara");
  }

  ionViewDidLoad() {
    var questo = this;
    console.log('ionViewDidLoad MedagliereglobalePage');

    questo.jgara = this.navParams.get("gara");
    console.log("JGARA",questo.jgara)

    questo.getMedagliereGlobale(function (data) {


      console.log("got medagliere globale",data);


      if (questo.jgara.hasOwnProperty("tkdt")) {
        if (questo.jgara.tkdt.hasOwnProperty("giorni")) {
          if (questo.jgara.tkdt.giorni.length > 0) {
            questo.activegiornata = questo.jgara.tkdt.giorni[0];
            questo.hasGiornate = true

          }
        }


      } else {
        questo.jgara.tkdt = Object.assign({}, questo.jgaratemplate);
        questo.activegiornata = {};
        questo.hasGiornate = false;
      }



    });
    questo.getSocieta();
    questo.societaiscritte=questo.getSocietaIscritte();
  }

  close() {
    this.viewCtrl.dismiss();
  }


  getMedagliereGlobale(callback) {
    var questo = this;
    var tkdt_rooturl = "https://www.tkdtechnology.it/index.php/welcome/";
    var tkdt_garaid = questo.jgara.tkdt_id;
    var giornataid;
    if (!giornataid) {
      if (questo.jgara.hasOwnProperty("tkdt")) {
        if (questo.jgara.tkdt.hasOwnProperty("giorni")) {
          if (questo.jgara.tkdt.giorni.length > 0) {
            giornataid = questo.jgara.tkdt.giorni[0].id;
            console.log("using giornataid from tkdt structure", giornataid)
          }
        }
      }
    } else {
      console.log("giornataid not found !!");
      
    }



    var url = questo.backend.rooturl + "/tkdt/medagliereglobale/" + giornataid;

    //var caricamentotext = imgtext + "Caricamento in corso...."

    questo.loading = true;
    questo.backend.fetchText(url, function (data) {
      questo.loading = false;
      //console.log("got medagliere globale", data);
      var pos = data.indexOf("<table class=");

      questo.html = data.slice(pos);
      
      setTimeout(function () {

        questo.domize();

        if (callback) callback();
        /*
        let clarr: any = document.getElementsByClassName("link_w_tooltip_gold");
        questo.transform(clarr);
        clarr = document.getElementsByClassName("link_w_tooltip_silver");
        questo.transform(clarr);
        clarr = document.getElementsByClassName("link_w_tooltip_bronze");
        questo.transform(clarr);
        let table: any = document.getElementsByClassName("table-striped")[0];
        table.border = "1";
        table.width = "100%";
        */

        //console.log("clarr",clarr,clarr.length);



      }, 1000)

      /*let profileModal = questo.modalCtrl.create(MedagliereglobalePage, { html: data });
      profileModal.present();*/
    })


  }

  replaceAll(input, search, replacement) {
    var target = input;
    return target.replace(new RegExp(search, 'g'), replacement);
  }

  transform(clarr) {
    var questo = this;
    for (var i = 0; i < clarr.length; i++) {
      // clarr[i].text="minchia";
      let atleti = clarr[i].title;
      atleti = questo.replaceAll(atleti, "<b>", "");
      atleti = questo.replaceAll(atleti, "</b>", "");

      let arratleti = atleti.split("<br>");
      arratleti.sort(function (a, b) {
        if (a > b) return 1;
        if (a < b) return -1;
        return 0;

      })

      atleti = arratleti.join("\n");

      // atleti=questo.replaceAll(atleti,"<br>","\n");

      //console.log("atleti", atleti);
      clarr[i].onclick = function () {
        alert(atleti);
      }


    }

  }


  toggle(what) {
    this.toggles[what] = !this.toggles[what];
  }


  getSocieta() {
    var tkdt = Object.assign({}, this.jgaratemplate);
    
    if (this.jgara.hasOwnProperty("tkdt")) tkdt = this.jgara.tkdt;
    console.log("tkdt", tkdt);
  }

  getIndex(n) {
    var retvalue = parseInt(n, 10);
    return retvalue;
  }

  giornoChanged(ev) {

    var n = parseInt(ev.value, 10);
    console.log("giornochanged", n);
    if (n!=-1){
    this.activegiornata = this.jgara.tkdt.giorni[n];
    } 
    //console.log("activegiornata",this.activegiornata);
  }

  toggleSocieta(){
    var questo=this;
    console.log("togglesocieta");
    questo.viewsocieta = !questo.viewsocieta;
  }

  toggleSocietaIscritte(){
    var questo=this;
    console.log("togglesocieta");
    questo.viewsocietaiscritte = !questo.viewsocietaiscritte;
  }



  toggleMedagliere(){
    var questo=this;
    console.log("togglemedagliere");
    questo.viewmedagliere = !questo.viewmedagliere;
  }
  toggleMedagliereGlobale(){
    var questo=this;
    console.log("togglemedagliereglobale");
    questo.viewmedagliereglobale = !questo.viewmedagliereglobale;
    if (questo.viewmedagliereglobale) questo.domize();
  }
  toggleTabulati(){
    var questo=this;
    console.log("toggletabulati");
    questo.viewtabulati = !questo.viewtabulati;

  }


  toggleAtletiSocieta(p) {
    console.log("toggleatletisocieta", p);
    var questo = this;
    questo.viewatletisocieta = !questo.viewatletisocieta;

    questo.activesocieta = p.societaname;

    console.log(questo.activesocieta);
  }

  sorted(a, campo) {
    a.sort(function (a, b) {
      var a1 = a[campo];
      var b1 = b[campo];
      if (a1 > b1) return 1;
      if (a1 < b1) return -1;
      return 0;
    })
    console.log("sorted", a);
    return a;

  }


  getCategorieCoperte(societa?: any) {
    var questo = this;

    if (!societa) societa = "A.S.D. TAEKWONDO ROZZANO";

    var result = {
      cats: [],
      text: "Dati ufficiali categorie non disponibili"
    }
    if (questo.jgara.tkdt) return result;
    if (questo.jgara) {

      var garadoc = questo.jgara;
      var tkdtiscritti = garadoc.tkdt.atleti;
      if (tkdtiscritti.length == 0) tkdtiscritti = garadoc.tkdt.atleti_iscritti;

      let roz = questo.backend.filterArray(tkdtiscritti, {
        societa: societa
      }, true);
      //console.log($roz);

      //sort by categoria

      roz.sort(function (a, b) {
        var a1 = a.catcintura + a.cateta + a.catpeso + a.sesso;
        var b1 = b.catcintura + b.cateta + b.catpeso + b.sesso;
        if (a1 > b1) return 1;
        if (a1 < b1) return -1;
        return 0;


      })

      //scan categorie
      var cat = "";
      var catcount = 0;
      var res = [];
      roz.forEach(function (item, i) {
        var atl = roz[i];
        var cateta = atl.cateta;
        var catpeso = atl.catpeso;
        var catcintura = atl.catcintura;
        var sesso = atl.sesso;
        var catx = catcintura + cateta + catpeso + sesso;

        if (catx != cat) {
          //count = 0;

          var newcat = {
            cateta: cateta,
            catpeso: catpeso,
            catcintura: catcintura,
            sesso: sesso,
            atleti: []
          }

          res.push(newcat);
          catcount++;
          cat = catx;


        }
        var lastres = res[res.length - 1];
        lastres.atleti.push(atl)
        //count++;

      })

      //console.log(res);

      var text = res.length + " categorie coperte con  " + roz.length + " atleti"
      console.log(text);
      res.forEach(function (ritem, ri) {
        var r = res[ri];
        //console.log(r.sesso+" - "+r.cateta+" - "+r.catcintura+" - "+r.catpeso+": "+r.atleti.length+" atleti");

      })

      result.cats = res;
      result.text = text;



    }
    return result;

  }


  domize() {
    var questo = this;
    setTimeout(function(){
 
      let clarr: any = document.getElementsByClassName("link_w_tooltip_gold");
      questo.transform(clarr);
      clarr = document.getElementsByClassName("link_w_tooltip_silver");
      questo.transform(clarr);
      clarr = document.getElementsByClassName("link_w_tooltip_bronze");
      questo.transform(clarr);
      let table: any = document.getElementsByClassName("table-striped")[0];
      console.log("table",table);
    
      if (table) {
        table.border = "1";
        table.width = "100%";
      }

    },300);
    
  }

  tabChanged(ev) {
    var questo = this;
    console.log("tabchanged", ev.value);
    if (ev.value == "medagliereglobale") {
      if (questo.hasGiornate) questo.domize();
    }
  }

  getSocietaIscritte(){
    var questo=this;
    var tiscr = questo.jgara.tkdt.atleti_iscritti;
    
      var socs = [];
      var socindex = -1;
    
      tiscr.sort(function (a, b) {
        var a1 = questo.replaceAll(a.societa,".", "");
        var b1 = questo.replaceAll(b.societa,".", "");
    
        if (a1 > b1) return 1;
        if (a1 < b1) return -1;
        return 0;
    
      });
    
      var soc = "";
      for (var i = 0; i < tiscr.length; i++) {
        var iscr = tiscr[i];
        var cat = iscr.sesso + " " + iscr.cateta + " " + iscr.catcintura + " " + iscr.catpeso;
        //console.log(iscr);
        var style = "color: black;";
        if (iscr.societa == "A.S.D. TAEKWONDO ROZZANO") style = "color: blue; font-weight: bold;";
    
        if (iscr.societa != soc) {
    
    
          soc = iscr.societa;
          var iscrsoc = questo.backend.filterArray(tiscr, {
            societa: soc
          },true);
          var liscrsoc = iscrsoc.length;
    
          iscrsoc.sort(function (a, b) {
            var a1 = a.nome;
            var b1 = b.nome;
            if (a1 > b1) return 1;
            if (a1 < b1) return -1;
            return 0;
    
          })
    
          var newsoc = {
            societa: soc,
            atleti: iscrsoc
          }
          socs.push(newsoc)
    
          //console.log("iscrsoc",iscrsoc);
    
    
          /*for (var j = 0; j < iscrsoc.length; j++) {
    
            var siscr = iscrsoc[j];
    
            var scat = siscr.sesso + " " + siscr.cateta + " " + siscr.catcintura + " " + siscr.catpeso;
    
          }*/
    
        }
    
      }
      console.log(socs)
      return socs;
  }


}
