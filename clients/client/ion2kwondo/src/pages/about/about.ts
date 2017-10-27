import { Component, ViewChild } from '@angular/core';

import { NavController } from 'ionic-angular';
import {HomePage} from '../../pages/home/home'

import { FacebookProvider } from '../../providers/facebook/facebook';
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

  constructor(private fb: FacebookProvider, public navCtrl: NavController) {

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
}
