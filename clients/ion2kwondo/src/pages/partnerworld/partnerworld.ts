import { Component, ViewChild } from "@angular/core";
import { SocketService } from '../../providers/socket-service/socket-service';
import { BackendProvider } from '../../providers/backend/backend';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-partnerworld',
  templateUrl: 'partnerworld.html'
})
export class PartnerworldPage {
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
    backend.getPartnerworld(function (data) {
      console.log("partnerworld", data);
      var imgurl=data.rss.channel.image.url;
      questo.allnews = data.rss.channel.item;
      questo.allnews.forEach(function (item, idx) {
        item.likes = questo.backend.getRandomNumber(20);
        item.comments = questo.backend.getRandomNumber(10);
        item.foto=imgurl;
      })
    })
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    var questo = this;
    questo.backend.getPartnerworld(function (data) {
      console.log("partnerworld", data);
      questo.allnews = data.rss.channel.item;
      var imgurl=data.rss.channel.image.url;
       questo.allnews.forEach(function (item, idx) {
        item.likes = questo.backend.getRandomNumber(20);
        item.comments = questo.backend.getRandomNumber(10);
        item.foto=imgurl;
      })

      refresher.complete();
    })


  }

  openUrl(url) {
    this.backend.openUrl(url);
  }

}
