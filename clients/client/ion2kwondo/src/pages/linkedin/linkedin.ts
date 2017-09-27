import { Component, ViewChild } from "@angular/core";
import { SocketService } from '../../providers/socket-service/socket-service';
import { BackendProvider } from '../../providers/backend/backend';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-linkedin',
  templateUrl: 'linkedin.html'
})
export class LinkedinPage {
  @ViewChild('chat') chat: any;
  allnews = [];
  socketHost: string;


  constructor(public navCtrl: NavController, public socket: SocketService, public backend: BackendProvider) {
    var questo = this;
    this.socket.socketService.subscribe(event => {
      console.log('message received from server... ', event);
      if (event.category === 'message') {

      }
    }); //end of subscribe
    backend.getLinkedin(function (data) {
      console.log("linkedin", data);
      questo.allnews = data.rows;
      questo.allnews.forEach(function (item, idx) {
        item.likes = questo.backend.getRandomNumber(20);
        item.comments = questo.backend.getRandomNumber(10);
      })
    })
  }


  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    var questo = this;
    questo.backend.getLinkedin(function (data) {
      console.log("linkedin", data);
      questo.allnews = data.rows;
       questo.allnews.forEach(function (item, idx) {
        item.likes = questo.backend.getRandomNumber(20);
        item.comments = questo.backend.getRandomNumber(10);
      })

      refresher.complete();
    })


  }

  openUrl(url) {
    this.backend.openUrl(url);
  }


}
