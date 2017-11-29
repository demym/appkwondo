import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class UtilsProvider {
  debugActive = true;

  constructor(private storage: Storage) {

  }

  public randomId() {
    return Math.random().toString(36).substring(7);
  }


  setStorage(key, value) {

    window.localStorage.setItem(key, value);

    this.storage.set(key, value);
  }

  setJsonStorage(key, obj) {
    window.localStorage.setItem(key, JSON.stringify(obj));
    //this.storage.set(key, JSON.stringify(obj));
  }

  
  

  getStorage(key, callback) {
    if (callback) {
    this.storage.get(key).then((val) => {
      console.log(key+'=', val);
      callback(val);
    });
  } else {
     var val=window.localStorage.getItem(key);
     return val;

    }

  }

  getJsonStorage(key){
   /* if (callback) {

       this.getStorage(key,function(value){
      if (callback) callback(JSON.parse(value));
    })
    }  else {*/
      var val=window.localStorage.getItem(key);
      return JSON.parse(val);
    //}
  }





  colog() {
    var dbg = this.debugActive;
    if (!dbg) return;
    console.log.apply(console, arguments);
  }


  conslog() {
    var dbg = this.debugActive;
    if (!dbg) return;
    console.log.apply(console, arguments);
  }

}