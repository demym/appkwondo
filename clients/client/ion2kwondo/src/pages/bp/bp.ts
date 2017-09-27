import { Component } from '@angular/core';
import { BackendProvider } from '../../providers/backend/backend';

import { NavController, AlertController, LoadingController } from 'ionic-angular';

@Component({
  selector: 'page-bp',
  templateUrl: 'bp.html'
})
export class BpPage {
  /*
  displayednews = [{
    title: "BP01",
    description: "Best BP in Lumbardia",
    imgurl: "https://www.medipta.com/pic/business_partner.jpg",
    autore: "",
    likes: 2,
    comments: 8


  },
  {
    title: "BP02",
    description: "Best BP in Piemontis",
    imgurl: "https://www.medipta.com/pic/business_partner.jpg",
    autore: "",
    likes: 2,
    comments: 8


  },
  {
    title: "BP03",
    description: "Best BP in Liguria",
    imgurl: "https://www.medipta.com/pic/business_partner.jpg",
    autore: "",
    likes: 2,
    comments: 8


  }

  ]*/
  displayednews = [];
  bpfilters = {};
  bpfiltersarray = [];
  filters = {};
  filtersShown = false;


  constructor(public loadingCtrl: LoadingController, public alertCtrl: AlertController, public backend: BackendProvider, public navCtrl: NavController) {
    /*this.refresh(function(data){

    })*/
  }

  showFilterMsg() {
    var retvalue = true;
    console.log(this.filters);
    var count = 0;
    for (var k in this.filters) {
      console.log("k", k);
      count++;

    }
    if (count > 0) retvalue = false;
    //if ((this.filters==={}) && !this.filtersShown) retvalue=true;
    console.log("showFilterMsg", retvalue);
    return retvalue;
  }

  toggleFilters() {
    this.filtersShown = !this.filtersShown;
  }

  tapCard(item) {
    console.log("tapcard", item);
  }

  doRefresh(refresher) {
    if (this.hasFilters()){

    console.log('Begin async operation', refresher);
    var questo = this;
    questo.refresh(function (data) {
      //console.log("allnews", data);

      refresher.complete();
    })
    } else refresher.complete();


  }


  refresh(callback) {
    var questo = this;
    questo.backend.getBp(questo.filters, function (data) {
      questo.displayednews = data.rows;
      console.log(data);
      if (callback) callback(data);

    })
  }


  ionViewWillEnter() {
    this.bpfilters = this.backend.bpfilters;
    let keys = [];
    for (let key in this.bpfilters) {
      keys.push(key);
    }
    this.bpfiltersarray = keys;
    console.log("bpfilters", this.bpfilters, "bpfiltersarray", this.bpfiltersarray);

  }



  onFilterChange(ev) {
    console.log("filterchange", ev);
  }

  getFilter(key) {
    var retvalue = "ANY";
    if (this.filters.hasOwnProperty(key)) retvalue = this.filters[key];
    return retvalue;
  }

  getFilters(key) {
    console.log("getfilters(" + key + ")", this.bpfilters[key]);
    return this.bpfilters[key];
  }

  selectFilter(key) {
    var questo = this;
    let alert = this.alertCtrl.create();
    alert.setTitle(key);
    var anychecked=false;
    if (!questo.filters.hasOwnProperty(key)) anychecked=true;
    alert.addInput({
      type: 'radio',
      label: "ANY",
      value: "ANY",
      checked: anychecked

    })

    this.bpfilters[key].forEach(function (filtitem, filtidx) {


      var checked = false;
      if (questo.filters.hasOwnProperty(key)) {
        if (questo.filters[key].toLowerCase() == filtitem.toLowerCase()) checked = true;
      }

      alert.addInput({
        type: 'radio',
        label: filtitem,
        value: filtitem,
        checked: checked
      });
    });



    alert.addButton('Cancel');
    alert.addButton({
      text: 'OK',
      handler: data => {
        console.log("pressed ok,selected ", data, "for filter named ", key);

        questo.filters[key] = data;
        if (data == "ANY") delete questo.filters[key]
        console.log("filters", questo.filters);
        questo.filtersShown = false;

        
        if (questo.hasFilters()) {
          let loader = this.loadingCtrl.create({
            content: "Please wait..."
          });
          loader.present();



          questo.refresh(function () {
            loader.dismiss();

          })
        } else {
          questo.displayednews=[];
        }
      }
    });
    alert.present();
  }




  hasFilters(){
    var retvalue=false;
    var count=0;
    for (var k in this.filters){
      count++;
    }
    if (count>0) retvalue=true;
    return retvalue;
  }

}
