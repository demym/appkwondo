import { Component, ViewChild} from '@angular/core';

import { NavController,Content,Events } from 'ionic-angular';
import {HomePage} from '../../pages/home/home'

import { FacebookProvider } from '../../providers/facebook/facebook';
import { BackendProvider } from '../../providers/backend/backend';
import { Observable } from 'rxjs/Rx';  
import 'rxjs/add/operator/map';

import { ScrollableTabs } from '../../components/scrollable-tabs/scrollable-tabs';


@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  public posts: Observable<any[]>;
  relationship="friends";


  AboutRoot: any = HomePage;
  CalendarRoot: any = HomePage;
  CameraRoot: any = HomePage;
  CloudRoot: any = HomePage;
  ContactRoot: any = HomePage;
  FolderRoot: any = HomePage;
  HomeRoot: any = HomePage;
  MapRoot: any = HomePage;
  SettingsRoot: any = HomePage;

  tabsColor: string = "default";
  tabsMode: string = "md";
  tabsPlacement: string = "top";

  tabToShow: Array<boolean> = [true, true, true, true, true, true, true, true, true];
  scrollableTabsopts: any = {};
  items:any=[];
  users:any=[];
  @ViewChild(Content) content: Content;

  constructor(public events: Events, public backend: BackendProvider, private fb: FacebookProvider, public navCtrl: NavController) {
    var questo=this;
    
    questo.users=[];
    questo.backend.getRandomUsers(function(data){
        console.log("users",data);
        questo.users=data;
        questo.content.resize();
    })
    for (var i=0; i<1000; i++){
      var newitem={
        nome: i

      }
      this.items.push(newitem);

    }

  }

  selectedEnemies(){
    console.log(this.relationship);
  }

  goFB() {
    console.log("goFB!")

    this.fb.getPosts("demymortelliti", function(data){

    })

   
   
  }

  mapPosts = (post) => {
    return {
      from: post.from,
      time: post.created_time * 1000, // convert to milliseconds
      message: post.message,
      photos: this.getPhotos(post)
    };
  }

  getPhotos = (post) => {
    if (!post.attachments)
      return [];

    let attachments = post.attachments.data[0].subattachments ||
                      post.attachments;

    return attachments.data
      .filter(x => x.type == "photo")
      .map(x => x.media.image);
  }

  gotoBottom(){
    if (this.content) this.content.scrollToBottom()
  }
  gotoTop(){
    if (this.content) this.content.scrollToTop()
  }

  ionViewWillEnter(){
    var questo=this;
    this.events.subscribe("hwbackbutton",function(data){
      console.log("hwbackbutton in gare.ts");
      questo.navCtrl.pop();
    })
  }

  ionViewWillLeave() {
    this.events.unsubscribe("hwbackbutton");
    
    
    }

}
