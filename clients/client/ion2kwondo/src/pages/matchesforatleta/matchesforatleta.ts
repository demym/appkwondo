import { Component, ViewChild } from '@angular/core';
import { NavController, AlertController, NavParams, Events, Navbar, ToastController } from 'ionic-angular';
import { BackendProvider } from '../../providers/backend/backend';
import { MatchconsolePage } from '../../pages/matchconsole/matchconsole';
import { GaraPage } from '../../pages/gara/gara';
import { ChatPage } from '../../pages/chat/chat';

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
  mfa: any = [];
  atletaid: any = "";
  gara: any = {};
  atleta: any = {};
  history: any = [];
  viewAvversari: any = false;
  viewHistory: any = false;
  viewTkdt: any = false;
  viewTkdtCategoria: any = false;
  viewTabulato: any = false;
  tkdt: any = {};
  avversari: any = [];
  tkdtatleta: any = {};
  tkdtatletaarr: any = [];
  tabulato: any = {};
  tabulatoimg: any = "assets/img/boxbianco.jpg";
  activetab = "matches";
  loading = false;
  ordbinarr = new Array("finale", "semifinale", "quarto di finale", "ottavo di finale", "sedicesimo di finale", "trentaduesimo di finale");

  constructor(public toastCtrl: ToastController, public alertCtrl: AlertController, public events: Events, public backend: BackendProvider, public navCtrl: NavController, public navParams: NavParams) {
    var questo = this;

  }

  getMatchOrd(m) {
    var questo = this;
    var order = "";
    //console.log("mfa", questo.mfa);
    var l = questo.mfa.length;



    questo.mfa.forEach(function (item, idx) {
      if (m.doc.id == item.doc.id) {
        var ordidx = l - idx - 1;
        if (ordidx < questo.ordbinarr.length) {
          if (ordidx < 2) {
            order = questo.ordbinarr[ordidx].toUpperCase();
          }
        }
      }

    })

    return order;

  }

  ionViewWillEnter() {

    var questo = this;
    questo.initView();
    console.log("ionviewwillenter in matchesforatleta.ts");
    questo.events.subscribe("updatematchesforatleta", function (m) {
      console.log("updatematchesforatleta in matchesforatleta.ts !!");
      questo.mfa = questo.backend.filterRows(questo.backend.activegara.matchesbyprog, { atletaid: questo.atletaid }).rows;
      console.log("questo.mfa", questo.mfa);

    })
    this.events.subscribe("hwbackbutton", function (data) {
      console.log("hwbackbutton in gare.ts");
      questo.navCtrl.pop();
    })
  }

  initView() {
    var questo = this;
    console.log("initView in matchesforatleta.ts");

    questo.mfa = questo.backend.filterRows(questo.backend.activegara.matchesbyprog, { atletaid: questo.atletaid }).rows;
  }

  ionViewWillLeave() {
    var questo = this;
    console.log("ionviewwillleave in matchesforatleta.ts");
    questo.events.unsubscribe("updatematchesforatleta");
    questo.events.unsubscribe("hwbackbutton");

  }

  ionViewDidLoad() {
    var questo = this;
    questo.backend.setBackButtonAction(questo.navBar, questo.navCtrl);
    questo.backend.setupNavbarBack(this.navBar, this.navCtrl);
    console.log('ionViewDidLoad MatchesforatletaPagePage');
    this.atletaid = this.navParams.get("atletaid");
    this.gara = this.navParams.get("gara");
    console.log("gara", this.gara);
    if (this.gara.gara.rows[0].doc.tkdt) this.tkdt = this.gara.gara.rows[0].doc.tkdt;

    questo.mfa = questo.backend.filterRows(questo.backend.activegara.matchesbyprog, { atletaid: questo.atletaid }).rows;
    //this.mfa=this.navParams.get("mfa");
    console.log("mfa", questo.mfa);
    console.log(JSON.stringify(questo.mfa));
    this.atleta = this.backend.getAtletaById(this.atletaid);
    console.log("this.atleta", this.atleta);
    var cat = this.getCategoria(this.atleta.datanascita);
    this.tkdtatleta = this.backend.getTkdtAtleta(this.atleta);


    var avversari = this.backend.getTkdtAtletiCategoria(this.tkdtatleta.cateta, this.tkdtatleta.catcintura, this.tkdtatleta.catpeso, this.tkdtatleta.sesso);

    avversari.forEach(function (item, idx) {
      if (item.nome.toLowerCase() != questo.tkdtatleta.nome.toLowerCase()) questo.avversari.push(item);
    });




    for (var k in this.tkdtatleta) {
      if (this.tkdtatleta.hasOwnProperty(k)) {
        var newel = {
          name: k,
          value: this.tkdtatleta[k]
        }
        this.tkdtatletaarr.push(newel);
      }
    }

    console.log("tkdtatleta", this.tkdtatleta);
    console.log("avversari", this.avversari);

    this.tabulato = this.backend.getTkdtTabulatiCategoria(this.tkdtatleta.cateta, this.tkdtatleta.catcintura, this.tkdtatleta.catpeso, this.tkdtatleta.sesso);
    console.log("tabulato", this.tabulato);

    var hastabulato = true;
    for (var kk in questo.tabulato) {
      if (questo.tabulato.hasOwnProperty(kk)) {
        if (questo.tabulato[kk] == "--") hastabulato = hastabulato && false;
      }
    }
    console.log("hastabulato", hastabulato)
    if (hastabulato) {
      //if (this.tabulato!={}){
      questo.backend.getTabulatoImg(questo.tabulato.oldhref, function (data) {
        console.log("tabulato image", data);
        questo.tabulatoimg = data;
      })
    }
    this.refresh(function () { });

  }


  getImg(m) {
    //console.log("getImg", m);
    var imgsrc: String = "matchtoplay.png";
    if (m.doc.disputato == "yes") {
      imgsrc = "matchko.png";
      if (m.doc.vinto == "yes") imgsrc = "matchok.png";
      if (m.doc.medagliamatch) {
        if (m.doc.medagliamatch != "none") {
          imgsrc = "medaglia_" + m.doc.medagliamatch + ".png";
        }
      }

    }
    if (m.doc.realtime) {
      if (String(m.doc.realtime) == "true") imgsrc = "greenblink.gif";
    }


    imgsrc = "assets/img/" + imgsrc;
    //console.log("imgsrc", imgsrc);
    return imgsrc;



  }

  getImgPerAtleta(m) {
    //console.log("getImgPerAtleta", m);
    var imgsrc: String = "matchtoplay.png";
    var medaglia = "none";
    m.matchesarray.forEach(function (item, idx) {

      if (item.medagliamatch != "none") {
        medaglia = item.medagliamatch;
      }
    });
    if (medaglia != "none") imgsrc = "medaglia_" + medaglia + ".png";


    imgsrc = "assets/img/" + imgsrc;
    //console.log("imgsrc", imgsrc);
    return imgsrc;



  }

  getCategoria(dn) {
    return this.backend.getCategoria(dn, this.gara.gara.rows[0].doc.data);
  }

  getVintoText(m) {
    var text = "Non disputato";
    if (m.disputato == "yes") {
      if (m.vinto == "yes") text = "Vinto,";
      if (m.vinto == "no") text = "Perso,";
      text = text + " risultato: " + m.risultato;
    }
    return text;
  }

  getClass(m) {
    var cl = "nondisputato";
    if (m.disputato == "yes") {
      if (m.vinto == "yes") cl = "vinto";
      if (m.vinto == "no") cl = "perso";
    }
    if (m.dadisputare == "no") cl = "danondisputare";
    return cl;
  }

  refresh(callback) {
    var questo = this;
    this.backend.getHistoryAtleta(this.atletaid, function (data) {
      questo.history = data.rows;
      console.log("got history", data);
      if (callback) callback(data);
    })
  }

  getMedagliaHistory(m) {
    var ret = {
      medaglia: "--",
      color: "history black"
    }

    if (m.ori > 0) {
      ret.medaglia = "ORO";
      ret.color = "history yellow";
    }
    if (m.arg > 0) {
      ret.medaglia = "ARG";
      ret.color = "history silver"
    }
    if (m.bro > 0) {
      ret.medaglia = "BRO";
      ret.color = "history orange"
    }

    return ret;

  }

  showMatchconsole(m) {
    var questo=this;
    //this.backend.matchconsoles.push(m);
    if (this.backend.user.role.toLowerCase() != "tkdradmin") return;

    this.backend.playFeedback();
    console.log(this.backend.activegara);
    if (this.backend.activegara.gara.rows[0].doc.stato != "incorso") return;
    //m.matchord=questo.getMatchOrd({doc: m});
    this.navCtrl.push(MatchconsolePage, {
      match: m
    });
  }

  getDerbyText(id) {
    var retvalue = "";
    var m = this.backend.getMatchById(id);
    //console.log("M",m);
    if (m) {
      if (m.hasOwnProperty("rows")) {
        if (m.rows[0].hasOwnProperty("doc")) {
          var atl = this.backend.getAtletaById(m.rows[0].doc.atletaid);
          retvalue = "derby con " + atl.cognome + " " + atl.nome + " !!";
          retvalue = retvalue.toUpperCase();

        }
      }
    }

    if (!id) retvalue = "";
    return retvalue;

  }

  tapSegment(item) {
    this.backend.playFeedback();
  }

  addMatches() {
    var questo = this;
    questo.backend.playFeedback();
    const alert = this.alertCtrl.create({
      title: 'Aggiungi match',
      inputs: [
        {
          name: 'matches',
          placeholder: 'Match separati da virgola',
          value: "101"
        }
      ],
      buttons: [
        {
          text: 'Annulla',
          role: 'cancel',
          handler: data => {
            questo.backend.playFeedback();
            console.log('Cancel clicked');
          }
        },
        {
          text: 'OK, aggiungi',
          handler: data => {
            console.log("matches", data.matches);
            questo.backend.playFeedback();
            questo.performAddMatches(data.matches);
          }
        }
      ]
    });
    alert.present();
  }


  performAddMatches(matches) {
    var questo = this;
    //var $mid = $("#popAddMatch #matchid");
    //var $color = $("#popAddMatch #color").val();

    var color = "red";
    var matchid = matches;
    var selectedAtl = questo.backend.getAtletaById(questo.atletaid);
    var garaid = questo.backend.activegara.gara.rows[0].doc.id


    //var progid=$mid.val().substring(1);

    var progid = matchid; //get last two characters for match progid- updated 25/01/2016


    //var datanascita=$atleta.find("datanascita").text();
    var datanascita = selectedAtl.datanascita;
    var atletaname = selectedAtl.cognome + " " + selectedAtl.nome;
    var atletaid = selectedAtl.id;
    //var atletaname=$atleta.find("cognome").text()+" "+$atleta.find("nome").text();
    //alert(datanascita);
    //return;

    var doc = {
      progid: progid,
      societaid: questo.backend.settings.mysocieta,
      societaname: questo.backend.settings.mysocietaname,
      garaid: garaid,
      atletaid: atletaid,
      atletaname: atletaname,
      risultato: "",
      ordine: "1",
      vinto: "no",
      disputato: "no",
      dadisputare: "yes",
      matchid: matches,
      color: color,
      lastupdate: "never",
      datanascita: datanascita

    }

    var url = questo.backend.rooturl + "/matches/add/" + garaid;

    questo.loading = true;

    questo.backend.postData(url, doc, function (data) {
      console.log("posted", data);
      questo.backend.getGara(garaid, function (gdata) {
        questo.refresh(function () {

          questo.mfa = questo.backend.filterRows(questo.backend.activegara.matchesbyprog, { atletaid: questo.atletaid }).rows;
          questo.loading = false;
          const toast = questo.toastCtrl.create({
            message: 'Match aggiunti',
            duration: 3000,
            position: 'top'
          });
          questo.events.publish("updategara", []);

          toast.onDidDismiss(() => {
            console.log('Dismissed toast');
          });

          toast.present();


        })

      })
    })


    //console.log(JSON.stringify(doc));
    /*
      $.ajax({
          url: rooturl + "/matches/add/" + garaid,
          type: "POST",
          data: doc
        })
        .done(function (data) {
       
          if (data.error) {
            console.log("error");
          } else {
            console.log("posted")
           
            $(data.addedmatches.rows).each(function (i) {
    
              var row = data.addedmatches.rows[i];
              var addedid = row.doc.id;
              var cat = getCategoria(row.doc.datanascita);
              colog("derbies");
              colog("$allmatches")
              var $allmatches = jGara.matchesbyprog;
              colog($allmatches);
              $allmatches.rows.push(row);
              var derbies = getDerby(addedid, cat);
              colog(derbies);
              if (derbies.rows.length > 0) {
                if ($allmatches.rows.length > 0) {
                  
                  var derbyid = derbies.rows[0].doc.id;
                
                  var urld = "/matches/update/" + jcurrentgara.id + "/" + addedid;
    
                  $.ajax({
                    type: "POST",
                    url: rooturl + urld,
                    data: {
                      derby: derbyid
                    },
                    async: false
                  });
    
                  urld = "/matches/update/" + jcurrentgara.id + "/" + derbyid;
                  $.ajax({
                    type: "POST",
                    url: rooturl + urld,
                    data: {
                      derby: addedid
                    },
                    async: false
                  });
    
    
    
    
                
                }
              }
    
            })
            toast("Match " + doc.matchid + " added for atleta " + selectedAtl.cognome + " " + selectedAtl.nome);
            openGara(jGara.gara.rows[0].doc.id, function () {
             
              refreshIscritti();
              $("#popAddMatch").popup("close");
              showMatchesForAtleta(selectedAtl.id)
    
            })
    
    
    
          }
    
         
        })
        .fail(function () {
          toast("Error posting", "long");
    
        });
    
    */

  }


  gotoChat() {
    var questo = this;
    this.backend.playFeedback();
    this.navCtrl.push(ChatPage, {}, questo.backend.navOptions);

  }


  openTabulato(url) {
    window.open(url, '_system');

  }


  deleteMatch(m) {
    var questo = this;

    const alrt = questo.alertCtrl.create({
      title: 'Conferma eliminazione match',
      message: "Vuoi davvero eliminare il match " + m.matchid + " ?",
      buttons: [
        {
          text: 'Annulla',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Si, elimina',
          handler: () => {
            console.log('OK clicked');
            console.log("attempting delete of match", m.matchid);
            var url = questo.backend.rooturl + "/matches/deletenew/" + m.garaid + "/" + m.id + "/" + m.atletaid;
            console.log("will call " + url);
            questo.backend.fetchData(url, function (data) {
              console.log("resulting matches", data);
              questo.mfa = data;
            })


          }
        }
      ]
    });
    alrt.present();

    /*
      var id = delmatchid;
    
      gConfirm("Sei sicuro di voler cancellare l'incontro ?", "Conferma", function () {
    
        colog("deleting matchid " + id);
    
        var url = "updagent.php?action=delete&tag=match";
    
    
        //find and reset its derby counterpart, if there is one
        var $allmatches = jGara.matchesbyprog;
        $($allmatches.rows).each(function (i) {
          var meid = $allmatches.rows[i].doc.id;
          var doc = $allmatches.rows[i].doc;
          if (meid.trim() == id.trim()) {
            if (doc.derby) {
    
              if (doc.derby.trim() != "") {
                var did = doc.derby;
    
                var urld = "/matches/update/" + jcurrentgara.id + "/" + did;
    
                $.ajax({
                  type: "POST",
                  url: rooturl + urld,
                  data: {
                    derby: null
                  },
                  async: false
                });
    
                colog("resetted derby flag on matchid " + did);
    
    
              }
    
    
            }
          }
    
        })
    
        url += "&id=" + id;
        url += "&garaid=" + garaid;
    
        url = "/matches/delete/" + jcurrentgara.id + "/" + id;
    
        $.post(rooturl + url, {
          a: '1'
        }, function () {
          delmatchid = "";
          openGara(jcurrentgara.id, function () {
    
            //refreshMatches(function() {
    
            var tipogara = "combattimento";
            if (jcurrentgara.tipo) {
              if (jcurrentgara.tipo == "forme") tipogara = "forme";
    
            }
            $("#matchesatleta #popDelMatch").popup("close");
            if (tipogara == "combattimento") {
    
              showMatchesForAtleta(selectedAtl.id);
    
            } else {
    
              showMatchesForAtletaForme(selectedAtl.id);
    
            }
    
    
    
            // $.mobile.changePage("#matchesatleta");
    
          })
    
        });
    
      }, function () {
        cancelDelMatch()
    
      });
      */

  }

}
