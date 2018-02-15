import { Component,ViewChild } from '@angular/core';
import { Nav, Platform, AlertController, Events, Tabs, Navbar, NavController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { ChatPage } from '../chat/chat';

/*import { ContactPage } from '../contact/contact';
import { ContactsPage } from '../contacts/contacts';
import { TwitterPage } from '../twitter/twitter';
import { BpPage } from '../bp/bp';
import { PartnerworldPage } from '../partnerworld/partnerworld';
import { LinkedinPage } from '../linkedin/linkedin';*/
import { SocketService } from '../../providers/socket-service/socket-service';
import { BackendProvider } from '../../providers/backend/backend';
//import { ScrollableTabs } from '../../components/scrollable-tabs/scrollable-tabs';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page

  @ViewChild(Navbar) navBar: Navbar;
  homepage: any = HomePage;
  chatpage: any = ChatPage;


 
  unread = this.socket.totalunreadcount;
  activeTab=0;
  @ViewChild("mytabs") mytabs: Tabs;
  realtimeEvents=false;
  showrtbutton=false;

  constructor(public navCtrl: NavController, public backend: BackendProvider, public socket: SocketService, public events: Events, public nav: Nav, public platform: Platform) {
    var questo = this;

    //this.socket.socketService.subscribe(event => {
    events.subscribe("switchtocontacts",function(t){
      questo.activeTab=2;
    })
    events.subscribe('updatetotalunreadcount', (msg, time) => {
      console.log('message updatetotalunreadcount received from server in tab.ts... ');


      console.log("habemus messaggio in tabs.ts");
      var unr = this.socket.getAllUnreadMessages().length;
      this.unread = this.socket.totalunreadcount;
      //this.unread = unr;
      //this.unread

    });

    events.subscribe('realtimematches', function (rtmatches) {
      console.log("realtimematches event", rtmatches);
      if (rtmatches.matches.length > 0) {
        questo.realtimeEvents = true;
        questo.showrtbutton = true;
      } else {
        questo.realtimeEvents = false;
        questo.showrtbutton = false;
      }

      //this.isChatPage = false;
    })

    events.subscribe("updategara", function (msg, time) {
      console.log("refreshgara in tabs.ts !!");
      questo.backend.getRtMatches(function (data) {
        if (data.length > 0) {
          questo.realtimeEvents = true
          questo.showrtbutton = true;
        } else {
          questo.realtimeEvents = false;
          questo.showrtbutton = false;
        }
      })

    })



    questo.backend.getRtMatches(function (data) {
      console.log("got rtmatches in tabs.ts", data);
      if (data.length > 0) {
        questo.realtimeEvents = true
      } else {
        questo.realtimeEvents = false;
      }
    })
  }

  setUnread(n) {
    this.unread = n;
  }

  ionViewWillEnter() {
    var questo=this;
    console.log("entering tabs.ts")
    //questo.backend.setBackButtonAction(questo.navBar, questo.nav);


  }

  tappedTab(){
    //console.log("tappedTab");
    this.backend.playFeedback();
  }


  gotoChat(){
    console.log("gotochat");
    var questo=this;
    questo.mytabs.select(1);

  }
}
