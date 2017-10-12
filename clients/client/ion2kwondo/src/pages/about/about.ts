import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { FacebookProvider } from '../../providers/facebook/facebook';
import { Observable } from 'rxjs/Rx';  
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  public posts: Observable<any[]>;

  constructor(private fb: FacebookProvider, public navCtrl: NavController) {

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
