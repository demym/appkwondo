import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { BackendProvider } from '../../providers/backend/backend';
/**
 * Generated class for the IscrittiPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-iscritti',
  templateUrl: 'iscritti.html',
})
export class IscrittiPage {

  gara:any={};
  iscrittiarr:any=[];
  atletiarr:any=[];

  constructor(public backend: BackendProvider, public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams) {
    var questo=this;
    this.gara=navParams.get("gara");
    //console.log("gara",this.gara);
    var iscrittiarr=this.gara.gara.rows[0].doc.iscritti.split(",");
    console.log("iscrittiarr",iscrittiarr);
    questo.backend.atleti.forEach(function(item,idx){
      var selected=false;
     
      if (iscrittiarr.indexOf(item.doc.id)>-1) selected=true;
      console.log(selected, item);
      var atl={
        atl: questo.backend.getAtletaById(item.doc.id),
        selected:selected
      }
      questo.atletiarr.push(atl);  
      
    });

    questo.atletiarr.sort(function(a,b){
      var a1=a.atl.cognome+a.atl.nome;
      var b1=b.atl.cognome+b.atl.nome;
      if (a1>b1) return 1;
      if (a1<b1) return -1;
      return 0;
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IscrittiPage');
  }

  cancel(){
    this.viewCtrl.dismiss();
  }

  ok(){
    var questo=this;
    var iarr:any=[];
    questo.atletiarr.forEach(function(item,idx){
      if (item.selected){
        iarr.push(item.atl.id);
      }
    })
    var iscr=iarr.join(",");
    console.log(iscr);
    var struct={
      count: questo.getNSelezionati(),
      iscr: iscr
    }
    this.viewCtrl.dismiss(struct);
  }

  selectAll(){
    this.atletiarr.forEach(function(item,idx){
      item.selected=true;
    })
  }

  selectNone(){
    this.atletiarr.forEach(function(item,idx){
      item.selected=false;
    })
  }


  getNSelezionati(){
    var retvalue=0;
    this.atletiarr.forEach(function(item,idx){
      if (item.selected) retvalue++
    })
    return retvalue;
  }

}
