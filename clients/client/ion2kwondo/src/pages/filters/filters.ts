import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the FiltersPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-filters',
  templateUrl: 'filters.html',
})
export class FiltersPage {
  filters: any ={
    sesso: "",
    categoria: "",
    medaglie: "",
    quadrato: ""
  }

  constructor(public viewCtrl: ViewController, public navCtrl: NavController, public params: NavParams) {
    this.filters={
      sesso: params.get('sesso'),
      categoria: params.get('categoria'),
      medaglie:  params.get('medaglie'),
      quadrato: params.get('quadrato')

    }
    console.log('filters', this.filters);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FiltersPage');
  }

  resetFilters(){
    for (var k in this.filters){
      this.filters[k]="";
      console.log("resetFilters done",this.filters);
    }

  }

  applyFilters(){
    this.viewCtrl.dismiss(this.filters);
  }

  cancel(){
    this.viewCtrl.dismiss();
  }

}
