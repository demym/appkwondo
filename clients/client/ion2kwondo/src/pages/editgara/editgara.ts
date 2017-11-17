import { Component } from '@angular/core';
import { NavController, NavParams,Events} from 'ionic-angular';
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
    title: ""
   
  };
  tkdtgara;
  mode="view";
  tkdtjsonview=false;
  loadingtkdt=false;


  constructor(public events: Events, public backend: BackendProvider, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    var questo=this;
    var g = this.navParams.get("gara");
    console.log('ionViewDidLoad EditgaraPage', g);
    this.gara = g;

  
   // this.gara.datafull=moment(this.gara.data.trim(),"DD/MM/YYYY",true);
   // console.log("datafull",this.gara.datafull);

    if (questo.gara.hasOwnProperty("tkdt_id")){
      if (questo.gara.tkdt_id.trim()!=""){
        var tkdtid=questo.gara.tkdt_id;
        console.log("this gara has a tkdt_id",tkdtid);
        var url=questo.backend.rooturl+"/tkdt/getfromfile/"+tkdtid+"?societaid="+questo.backend.user.societaid;
        questo.backend.fetchData(url,function(data){
          console.log("dati ufficiali di gara "+tkdtid,data);
          questo.tkdtgara=data;
        })
      }

    }

/*
    $.ajax({
      url: rooturl + "/tkdt/getfromfile/" + gara.doc.tkdt_id + "?societaid=" + settings.mysocieta,
      dataType: "json",
      type: "GET"
    })
    .done(function (data) {
      */
  }

  getTkdtGara(){
    var questo=this;
    if (questo.tkdtgara){
      return JSON.stringify(questo.tkdtgara);
    } else return "";
  }

  toggleTkdtJson(){
    this.tkdtjsonview=!this.tkdtjsonview;
  }

  changeInput(name,ev){
    console.log("changeinput",name,ev);
  }

  getArrLength(arr){
    console.log("arr",arr);
    var questo=this;
    var retvalue=0;

    if (arr.trim()!="") {
      retvalue=arr.split(",").length;
    }
    return retvalue;
    
  }

  readTkdtGara(){
    var questo=this;
    var tkdtid=questo.gara.tkdt_id;
    console.log("this gara has a tkdt_id",tkdtid);
    var url=questo.backend.rooturl+"/tkdt/getfromfile/"+tkdtid+"?societaid="+questo.backend.user.societaid;
    questo.backend.fetchData(url,function(data){
      console.log("dati ufficiali di gara "+tkdtid,data);
      questo.tkdtgara=data;
  
    })

  }

 
  retrieveTkdtGara(save){
    
    var questo=this;
    var tkdtid=questo.gara.tkdt_id;
    console.log("this gara has a tkdt_id",tkdtid);
    var rtext="";
    if (!save) rtext="/nosave";
    var url=questo.backend.rooturl+"/tkdt/retrieve/"+tkdtid+rtext+"?societaid="+questo.backend.user.societaid;
    questo.loadingtkdt=true;
    questo.backend.fetchData(url,function(data){
      console.log("retreive "+rtext+" dati ufficiali di gara  "+tkdtid,data);
      questo.tkdtgara=data;
      questo.loadingtkdt=false;
  
    })

  }

  saveGara(){
    console.log(this.gara);
  }

  cancelGara(){
    this.navCtrl.pop();
  }


  matchTkdtIscritti(){
    var questo=this;
    
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
    
        json.atleti_iscritti.forEach(function (item,i) {
    
    
    
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
          questo.gara.iscritti=iscrittistring;
    
    
    
    
    
        } else {
    
        }
    
        
    
        if (notfound.length > 0) {
            var al="";
            for (var i = 0; i < notfound.length; i++) {
                //divnf.append("<span>" + notfound[i] + "</span><br>");
                al+=notfound[i]+"/n";
    
            }
            alert(al);
    
        }
    
    }

    ionViewWillEnter(){
      var questo=this;
      this.events.subscribe("hwbackbutton",function(data){
        console.log("hwbackbutton in gare.ts");
        questo.navCtrl.pop();
      })
    }
  
    ionViewWillLeave() {
      this.events.unsubscribe("hwbackbutton");
      
      
      }
}
