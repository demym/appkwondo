import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';  
import 'rxjs/add/operator/map';
import { BackendProvider } from '../../providers/backend/backend';

/*
  Generated class for the FacebookProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/



@Injectable()
export class FacebookProvider {

  private accessToken = '529fcc9e16343c272347f83c8d6a9cf4';

  private graphUrl = 'https://graph.facebook.com/';
  private graphQuery = `?access_token=${this.accessToken}&date_format=U&fields=posts{from,created_time,message,attachments}`;

  constructor(public backend: BackendProvider, private http: Http) { }

  getPosts(pageName: string,callback) {
    let url = this.graphUrl + pageName + this.graphQuery;

    this.backend.fetchData(url,function(data){
      callback(data);
    })



   
   }
}