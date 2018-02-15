import { Component } from '@angular/core';
import { NavController, NavParams, Events, ToastController, ViewController, AlertController } from 'ionic-angular';
import { BackendProvider } from '../../providers/backend/backend';
import * as moment from 'moment';

/**
 * Generated class for the AtletaPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-editgara',
  templateUrl: 'editgara.html',
})
export class EditgaraPage {
  gara: any = {
    title: "",
    ngiorni: 1,
    iscritti: ""

  };
  tkdtgara;
  mode = "view";
  tkdtjsonview = false;
  loadingtkdt = false;
  tkdtSave = false;
  iscrittiarr: any[] = [];
  iscrittitemp="";



  constructor(public alertCtrl: AlertController, public viewCtrl: ViewController, public toastCtrl: ToastController, public events: Events, public backend: BackendProvider, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    var questo = this;
    var g = this.navParams.get("gara");
    console.log('ionViewDidLoad EditgaraPage', g);
    questo.gara = g;
    questo.iscrittiarr = questo.backend.atleti;
    if (!questo.gara.hasOwnProperty("ngiorni")) questo.gara.ngiorni = 1;
   

    // this.gara.datafull=moment(this.gara.data.trim(),"DD/MM/YYYY",true);
    // console.log("datafull",this.gara.datafull);

    if (questo.gara.hasOwnProperty("tkdt_id")) {
      if (questo.gara.tkdt_id.trim() != "") {
        var tkdtid = questo.gara.tkdt_id;
        console.log("this gara has a tkdt_id", tkdtid);
        var url = questo.backend.rooturl + "/tkdt/getfromfile/" + tkdtid + "?societaid=" + questo.backend.user.societaid;
        questo.backend.fetchData(url, function (data) {
          console.log("dati ufficiali di gara " + tkdtid, data);
          questo.tkdtgara = data;
        })
      }

    }
    questo.iscrittitemp=questo.gara.iscritti;
    console.log("iscrittitemp",questo.iscrittitemp);

    /*
        $.ajax({
          url: rooturl + "/tkdt/getfromfile/" + gara.doc.tkdt_id + "?societaid=" + settings.mysocieta,
          dataType: "json",
          type: "GET"
        })
        .done(function (data) {
          */
  }


  getIscrittiLen(){
    //console.log("iscritti",this.gara.iscritti);
    var a=this.gara.iscritti.split(",");
    var retvalue=a.length;
    if (this.gara.iscritti.trim()=="") retvalue=0;
    return retvalue;
  }
  selectIscritti() {
    var questo = this;
    console.log("iscrittitemp",questo.iscrittitemp);
    let myAlert = this.alertCtrl.create({
      title: 'Iscritti',
      buttons: [
        
        {
          text: 'Seleziona tutti',
          handler: data => {
            var arr=[]
           questo.backend.atleti.forEach(function(item,idx){
             var id=item.doc.id;
            arr.push(id);
           }) 
           questo.iscrittitemp=arr.join(",");
           questo.selectIscritti();
          }
        },
        {
          text: 'Deseleziona tutti',
          handler: data => {
          
           questo.iscrittitemp="";
           questo.selectIscritti();
          }
        },
        {
          text: 'Annulla',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
            questo.iscrittitemp=questo.gara.iscritti;
          }
        },
        {
          text: 'OK',
          handler: data => {
           console.log("ok",data);
           questo.gara.iscritti=data.join(",");
           questo.gara.myiscritti=questo.gara.iscritti;
          }
        }
      ]
    });
    console.log("selectIscrtti")
    console.log("atleti",questo.backend.atleti);
    console.log("icrittiarr",questo.iscrittiarr);
    questo.backend.atleti.forEach(function (item, idx) {
      var ck=false;
      if (questo.iscrittitemp.split(',').indexOf(item.doc.id)>-1) ck=true;
      myAlert.addInput({
        type: 'checkbox',
        label: item.doc.cognome + ' '+ item.doc.nome,
        value: item.doc.id,
        checked: ck
      })



    })
    myAlert.present();


  }

  getTkdtGara() {
    var questo = this;
    if (questo.tkdtgara) {
      return JSON.stringify(questo.tkdtgara);
    } else return "";
  }

  toggleTkdtJson() {
    this.tkdtjsonview = !this.tkdtjsonview;
  }

  changeInput(name, ev) {
    console.log("changeinput", name, ev);
  }

  getArrLength(arr) {
    console.log("arr", arr);
    var questo = this;
    var retvalue = 0;

    if (arr.trim() != "") {
      retvalue = arr.split(",").length;
    }
    return retvalue;

  }

  readTkdtGara() {
    var questo = this;
    var tkdtid = questo.gara.tkdt_id;
    console.log("this gara has a tkdt_id", tkdtid);
    var url = questo.backend.rooturl + "/tkdt/getfromfile/" + tkdtid + "?societaid=" + questo.backend.user.societaid;
    questo.backend.fetchData(url, function (data) {
      console.log("dati ufficiali di gara " + tkdtid, data);
      questo.tkdtgara = data;

    })

  }


  retrieveTkdtGara(save) {

    var tksave = false;

    if (save) {
      if (String(save) == "true") tksave = true;
    }

    var questo = this;
    var tkdtid = questo.gara.tkdt_id;
    console.log("this gara has a tkdt_id", tkdtid);
    var rtext = "";
    if (!tksave) rtext = "/nosave";
    var url = questo.backend.rooturl + "/tkdt/retrieve/" + tkdtid + rtext + "?societaid=" + questo.backend.settings.mysocieta;
    questo.loadingtkdt = true;
    questo.backend.fetchData(url, function (data) {
      console.log("retreive " + rtext + " dati ufficiali di gara  " + tkdtid, data);
      questo.tkdtgara = data;
      questo.loadingtkdt = false;

    })

  }

  saveGara() {
    var questo = this;
    console.log(questo.gara);
    var isAdded = false;
    if (!questo.gara.hasOwnProperty("id")) isAdded = true;
    var txt = "salvata";
    if (isAdded) txt = "aggiunta";
    console.log("tkdtSave", questo.tkdtSave);
    var url = questo.backend.rooturl + "/gare/update";
    if (isAdded) url = questo.backend.rooturl + "/gare/add";
    questo.backend.postData(url, questo.gara, function (data) {
      console.log("Gara " + txt + " !", data);
      if (questo.tkdtSave) {
        if (questo.gara.hasOwnProperty("tkdt_id")) {
          if (questo.gara.tkdt_id.trim() != "") {
            var turl = questo.backend.rooturl + "/tkdt/retrieve/" + questo.gara.tkdt_id;
            questo.backend.fetchData(turl, function (tkdata) {
              console.log("saved tkdt gara " + questo.gara.tkdt_id + " !!");
              questo.showToast("Gara e TKDT " + questo.gara.tkdt_id + " " + txt + " !!");

              setTimeout(function () {
                questo.viewCtrl.dismiss("saved");
              }, 3000)
            })

          }
        }



      } else {

        questo.showToast("Gara " + txt + " !!");
        setTimeout(function () {
          questo.viewCtrl.dismiss("saved");
        }, 3000)
      }
    })


  }


  showToast(txt) {
    let toast = this.toastCtrl.create({
      message: txt,
      duration: 3000,
      position: 'top'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();

  }

  cancelGara() {
    this.viewCtrl.dismiss();
    //this.navCtrl.pop();
  }


  matchTkdtIscritti() {
    var questo = this;

    /*
        var cont = $(obj).closest("div[data-role=content]");
        var ta=cont.find("textarea");
        if (ta.length>0){
            var val=ta.val();
            var json=JSON.parse(val);
            console.log(json);
        }
        */
    var foundcount = 0;
    var notfoundcount = 0;
    var totali = 0;
    var iscrittistring = "";
    var notfound = [];


    var json = {
      atleti_iscritti: []
    };

    if (questo.tkdtgara.hasOwnProperty("atleti_iscritti")) json = questo.tkdtgara;

    json.atleti_iscritti.forEach(function (item, i) {



      var row = json.atleti_iscritti[i];
      var nome = row.nome.toLowerCase().trim();
      var soc = row.societa;


      if (soc == "A.S.D. TAEKWONDO ROZZANO") {

        totali++;
        var atls = questo.backend.getAtletaByCognoNome(nome);
        //console.log("ricerca "+nome+": "+atls.length);
        if (atls.length > 0) {
          if (iscrittistring.trim() != "") iscrittistring += ",";
          iscrittistring += atls[0].id;
          foundcount++;
        } else {
          console.log("atleta non trovato: ", nome);
          notfoundcount++;
          notfound.push(nome);
        }
      }

    })

    console.log("trovati " + foundcount + " su " + totali + " (" + notfoundcount + " non trovati)");
    console.log("new iscritti string", iscrittistring);

    var r = confirm("trovati " + foundcount + " su " + totali + " (" + notfoundcount + " non trovati)\n\nVuoi sostituire il campo iscritti ?");
    if (r == true) {


      //var iscr = $("#page_editgara #iscritti");
      //iscr.val(iscrittistring);
      questo.gara.iscritti = iscrittistring;





    } else {

    }



    if (notfound.length > 0) {
      var al = "";
      for (var i = 0; i < notfound.length; i++) {
        //divnf.append("<span>" + notfound[i] + "</span><br>");
        al += notfound[i] + "/n";

      }
      alert(al);

    }

  }

  ionViewWillEnter() {
    var questo = this;
    this.events.subscribe("hwbackbutton", function (data) {
      console.log("hwbackbutton in gare.ts");
      questo.viewCtrl.dismiss();
    })
  }

  ionViewWillLeave() {
    this.events.unsubscribe("hwbackbutton");


  }




  syncGaraWithTkdt(callback?: any) {
    var questo = this;
    if (!questo.gara.hasOwnProperty("tkdt_id")) {
      alert("TKDT_ID non definito per questa gara");
      return;
    }
    //var cont = $(obj).closest("div[data-role=content]");
    //var tid = cont.find("#tkdt_id").val();
    var tid = questo.gara.tkdt_id;
    //var div = cont.find("#tkdt");
    var tipo = "combattimento";
    if (questo.gara.hasOwnProperty("tipo")) tipo = questo.gara.tipo;
    //var tipo = cont.find("#tipo");
    var isForme = false;
    if (tipo.toLowerCase() == "forme") isForme = true;
    var gara = null;
    if (tid.trim() == "") {
      alert("Nessun tkdt_id, impossibile recuperare i dati ufficiali di gara");
      return;
    }

    if (!isForme) {

      var url = questo.backend.rooturl + "/tkdt/retrieve/" + tid;
      questo.loadingtkdt = true;
      questo.backend.fetchData(url, function (data) {



        console.log(data);
        questo.tkdtgara = data;


        //div.empty();
        questo.loadingtkdt = false;
        //progressStop();
        let toast = this.toastCtrl.create({
          message: 'Dati ufficiali di gara garicati per gara tkdt_id ' + tid,
          duration: 3000,
          position: 'top'
        });

        toast.onDidDismiss(() => {
          console.log('Dismissed toast');
        });

        toast.present();



        //questo.backend.toast("Dati ufficiali di gara garicati per gara tkdt_id " + tid);


        // console.log("Atleti iscritti: " + data.atleti_iscritti.length);
        // div.append("Atleti effettivi in gara: " + data.atleti.length + "<br>");
        //div.append("Tabulati trovati: " + data.tabulati.length + "<br>");


        //  var tk = data;
        //  editgaratkdt = tk;
        /*
        var tk = {
            atleti: data.atleti,
            tabulati: data.tabulati,
            atleti_iscritti: data.atleti_iscritti
        }*/


        //    div.append('<br><label><input type="checkbox" name="ck_tkdt" id="ck_tkdt">&nbsp;Salva TKDT</label><br>');
        //div.append("<textarea id='tatkdt'>" + JSON.stringify(tk) + "</textarea><br>");

        if (callback) callback(data);

      });

    } else {
      //è una gara di forme

      var urlf = questo.backend.rooturl + "/tkdt/retrieveforme/" + tid;
      questo.loadingtkdt = true;
      console.log("Recupero dati ufficiali di gara " + tid + " ....")
      questo.backend.fetchData(urlf, function (data) {

        console.log(data);
        questo.tkdtgara = data;


        //div.empty();
        questo.loadingtkdt = false;
        //progressStop();

        console.log("Dati ufficiali di gara garicati per gara tkdt_id " + tid);


        // div.append("Atleti iscritti: " + data.atleti_iscritti.length + "<br>");
        // div.append("Atleti effettivi in gara: " + data.atleti.length + "<br>");
        // var tk = data;
        // editgaratkdt = tk;
        /*
div.append("Tabulati trovati: " + data.tabulati.length + "<br>");
 

var tk=data;
editgaratkdt=tk;
 

div.append('<br><label><input type="checkbox" name="ck_tkdt" id="ck_tkdt">&nbsp;Salva TKDT</label><br>');
 
*/
        if (callback) callback(data);

      });


    }

  }

}
