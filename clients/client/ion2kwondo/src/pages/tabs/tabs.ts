import { Component,ViewChild } from '@angular/core';
import { Nav, Platform, AlertController, Events, Tabs } from 'ionic-angular';
import { HomePage } from '../home/home';
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { ContactsPage } from '../contacts/contacts';
import { TwitterPage } from '../twitter/twitter';
import { BpPage } from '../bp/bp';
import { PartnerworldPage } from '../partnerworld/partnerworld';
import { LinkedinPage } from '../linkedin/linkedin';
import { SocketService } from '../../providers/socket-service/socket-service';
import { BackendProvider } from '../../providers/backend/backend';
//import { ScrollableTabs } from '../../components/scrollable-tabs/scrollable-tabs';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  homepage: any = HomePage;
  partnerworld: any = PartnerworldPage;
  linkedin: any = LinkedinPage;
  contacts: any = ContactsPage;
  twitter: any = TwitterPage;
  bppage: any = BpPage;
  tab2Root: any = AboutPage;
  tab3Root: any = ContactPage;
  unread = this.socket.totalunreadcount;
  activeTab=0;
  @ViewChild("mytabs") mytabs: Tabs;

  constructor(public socket: SocketService, public events: Events, public nav: Nav, public platform: Platform) {
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
  }

  setUnread(n) {
    this.unread = n;
  }

  ionViewWillEnter() {

    console.log("entering tabs.ts")


  }
}
