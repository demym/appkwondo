import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { BackendProvider } from '../../providers/backend/backend';
/**
 * Generated class for the UsersPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-users',
  templateUrl: 'users.html',
})
export class UsersPage {
  users: any = [];
  loading = false;
  sortfield = "email";
  filter = "";
  potentialiosusers: any = [];

  constructor(public alertCtrl: AlertController, public backend: BackendProvider, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    var questo = this;
    console.log('ionViewDidLoad UsersPage');
    questo.loading = true;
    this.refresh(function () {
      questo.loading = false;
    });
  }

  refresh(callback) {
    var questo = this;

    var iosurl = questo.backend.rooturl + "/users/potentialios";
    var arrios: any = [];
    questo.backend.fetchData(iosurl, function (idata) {
      idata.rows.forEach(function (iitem, iidx) {
        arrios.push(iitem.doc.email);
      })



      var url = questo.backend.rooturl + "/users/list";
      questo.backend.fetchData(url, function (data) {
        console.log("users", data)
        data.rows.forEach(function (item, idx) {
          item.doc.potentialios = false;
          if (arrios.indexOf(item.doc.email) > -1) item.doc.potentialios = true;

        })
        console.log("DATA",data);
        var users: any = [];
        if (questo.filter.trim() == "") {
          users = data.rows;
        } else {
          data.rows.forEach(function (item, idx) {
            var addIt = false;

            if (questo.filter == "approvati") {
              if (item.doc.hasOwnProperty("active")) {
                if (String(item.doc.active) == "true") addIt = true;
              }
            }
            if (questo.filter == "nonapprovati") {
              if (!item.doc.hasOwnProperty("active")) {
                addIt = true;
              } else {
                if (String(item.doc.active) != "true") addIt = true;
              }
            }
            if (questo.filter == "potentialios") {
              if (item.doc.potentialios) {
                addIt = true;
              }
            }

            if (addIt) users.push(item);

          });

        }
        questo.users = users;




        questo.users.sort(function (a, b) {
          var a1 = a.doc[questo.sortfield].toLowerCase();
          var b1 = b.doc[questo.sortfield].toLowerCase();
          if (a1 > b1) return 1;
          if (a1 < b1) return -1;
          return 0;
        })






        if (callback) callback(data);
      })


    })
  }

  needsApprove(u) {
    var active = true;
    if (u.doc.hasOwnProperty("active")) {
      if (String(u.doc.active) != "true") active = false;
    }

    return !active;
  }

  approveUser(u) {
    var questo = this;

    const alert = questo.alertCtrl.create({
      title: 'Conferma approvazione',
      message: "Vuoi davvero approvare l'utente " + u.doc.email + " ?",
      buttons: [
        {
          text: 'Annulla',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Si, approva',
          handler: () => {
            console.log('OK clicked');


            var url = questo.backend.rooturl + "/users/approve/" + u.doc.email;
            questo.backend.fetchData(url, function (data) {

              console.log("approve result", data);
              questo.refresh(function () { });
            })
          }
        }
      ]
    });
    alert.present();


  }



  deleteUser(u) {
    var questo = this;


    const alert = questo.alertCtrl.create({
      title: 'Conferma eliminazione',
      message: "Vuoi davvero eliminare l'utente " + u.doc.email + " ?",
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

            var url = questo.backend.rooturl + "/users/delete";
            var doc = {
              email: u.doc.email
            }

            questo.backend.postData(url, doc, function (data) {

              console.log("delete result", data);
              questo.refresh(function () { });
            })

          }
        }
      ]
    });
    alert.present();



  }

  doRefresh() {
    var questo = this;
    questo.loading = true;
    questo.refresh(function () {
      questo.loading = false;
    })

  }


  sortUsers() {

    var questo = this;
    var inps: any = [
      {
        type: 'radio',
        label: 'Email',
        value: 'email'
      },
      {
        type: 'radio',
        label: 'Nickname',
        value: 'nickname'
      }];


    inps.forEach(function (item, idx) {
      var ck = false;
      if (item.value == questo.sortfield) ck = true;
      item.checked = ck;
    })


    let prompt = this.alertCtrl.create({
      title: 'Ordinamento per',
      message: 'Seleziona un campo',
      inputs: inps,
      buttons: [
        {
          text: "Cancel",
          handler: data => {
            console.log("cancel clicked");
          }
        },
        {
          text: "Ordina",
          handler: data => {
            console.log("ordina clicked", data);
            questo.sortfield = data;
            questo.doRefresh();

          }
        }]
    });
    prompt.present();

  }

  showUser(u) {
    alert(u.doc.password);
  }

  changeFilter(ev) {
    var questo = this;
    console.log("changeFilter", ev);
    questo.filter = ev;
    questo.doRefresh();

  }
}
