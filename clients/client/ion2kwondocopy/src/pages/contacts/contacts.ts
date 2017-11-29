import { Component, ViewChild } from "@angular/core";
import { SocketService } from '../../providers/socket-service/socket-service';
import { BackendProvider } from '../../providers/backend/backend';
import { ChatPage } from '../../pages/chat/chat';
import { TabsPage } from '../../pages/tabs/tabs';
import { NavController, Events,AlertController } from 'ionic-angular';
//import { MyApp } from '../../app/app.component'
import {App} from 'ionic-angular';

@Component({
  selector: 'page-contacts',
  templateUrl: 'contacts.html'
})
export class ContactsPage {
  @ViewChild('chat') chat: any;
  allnews = [];
  socketHost: string;
 isIbmAdmin = false;

  user = {
    email: ""
  }

  constructor(public alert: AlertController, private app:App, public events: Events, public nav: NavController, public socket: SocketService, public backend: BackendProvider) {
    var questo = this;
    this.user.email = backend.user.email;
    questo.isIbmAdmin = questo.backend.isIbmAdmin;




  }

  ngOnInit() {
    console.log("ngoninit contact.ts");
    var questo = this;
    this.events.subscribe('updatetotalunreadcount', (msg, time) => {
      console.log("updatetotalunreadcount ! in contacts.ts");
      this.allnews = this.socket.contacts;
      console.log(this.allnews);
    });
    this.socket.socketService.subscribe(event => {

      console.log('message received from server in contacts.ts... ', event);

      if (event.category === 'auserhasdisconnected') {
        this.allnews = this.socket.contacts;
        console.log(this.allnews);
      }
      if (event.category === 'auserhasconnected') {

        this.allnews = this.socket.contacts;
        console.log(this.allnews);
      }
      if (event.category === 'message') {

        this.allnews = this.socket.contacts;
        console.log(this.allnews);
      }
    });

    questo.refresh(function () {

    });
  }


  doRefresh(refresher) {

    this.refresh(function () {
      refresher.complete();

    })

  }

  refresh(callback) {
    this.allnews = this.socket.contacts;
    callback();

  }

  tapChatUser(user) {
    console.log("tapped", user);
    /*this.myapp.openPageWithParams(ChatPage,{
      user: user
    })*/

    let nav = this.app.getRootNav();


    /*
    nav.setRoot(ChatPage, {
      user: user
    });
    */
    
   this.nav.push(ChatPage, {
     user: user
   });
  }

  ionViewWillEnter() {
    var tag = "ionviewwillenter contacts.ts";
    var questo = this;
    questo.isIbmAdmin = questo.backend.isIbmAdmin;
    this.refresh(function () {
      console.log(tag, "refresh completed", questo.allnews);
      //refresher.complete();

    })// THERE IT IS!!!
    /*
    var questo = this;
    this.socket.socketService.subscribe(event => {

      console.log('message received from server... ', event);
      if (event.category === 'auserhasconnected') {
        questo.refresh(function () {

        });
      }

      if (event.category === 'auserhasdisconnected') {

        questo.refresh(function () {

        });
      }
      if (event.category === 'message') {
        console.log("habemus messaggio")
        questo.refresh(function () {

        });
      }
    }); //end of subscribe
     questo.refresh(function () {

        });
    //return this.service.getComments().then(data => this.comments = data);
    */
  }

  broadcast() {
    let alert = this.alert.create({
      title: 'Broadcast a message',
      inputs: [
        {
          name: 'message',
          placeholder: 'Write your broadcast message here'
        }/*,
      {
        name: 'password',
        placeholder: 'Password',
        type: 'password'
      }*/
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Send broadcast',
          handler: data => {
            this.socket.sendCustomMessage("broadcast", data.message);
          }
        }
      ]
    });
    alert.present();
  }

}
