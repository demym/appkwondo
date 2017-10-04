import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
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


  constructor(public backend: BackendProvider, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    var questo=this;
    var g = this.navParams.get("gara");
    console.log('ionViewDidLoad EditgaraPage', g);
    this.gara = g;

  
    this.gara.datafull=moment(this.gara.data.trim(),"DD/MM/YYYY",true);
    console.log("datafull",this.gara.datafull);

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
    questo.backend.fetchData(url,function(data){
      console.log("retreive "+rtext+" dati ufficiali di gara  "+tkdtid,data);
      questo.tkdtgara=data;
  
    })

  }
}
