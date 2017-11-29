import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import { Observable as RxObservable } from "rxjs/Observable";

import "rxjs/add/operator/map";
import "rxjs/add/operator/do";

@Injectable()
export class Backend {
    //rooturl="https://bpeitaly.mybluemix.net";
    rooturl = "http://tkdr.herokuapp.com";
    token="token";
    atleti=[];
    chat=[];
    activegara: any={};


    constructor(public http: Http) {

    }


    fetchData(url, callback) {
        //("fetchdata");
        if (url.indexOf("token") == -1) {
            if (url.indexOf("?") > -1) {
                url += "&token=" + this.token;

            } else url += "?token=" + this.token;

        }
        //utils.colog("calling url ", url);

        this.http.get(url).map((res) => res.json()).subscribe((data) => {
            console.log("got data",data);
            if (callback) callback(data);
        });
    }

// tslint:disable-next-line:no-consecutive-blank-lines

  getCategoria(dn, referralDate) {
    
        var cat = "senior a";
        var curyear: any = new Date().getFullYear();
        //console.log("curyear "+curyear)
        //if (!jcurrentgara.data) useCurrentDate = true;
        if (referralDate) {
          var arrd = referralDate.split("/");
          var annogara = arrd[2];
          curyear = annogara;
        }
        //sdebug("curyear: "+curyear);
    
        if (dn.trim() == "") {
          return "senior b";
        }
        var ar = dn.split(".");
        var byear = ar[2];
    
        var eta = parseInt(curyear, 10) - parseInt(byear, 10);
        //sdebug("calcolo età: "+eta);
    
        if ((eta >= 18) && (eta <= 35)) cat = "senior a";
        if ((eta >= 15) && (eta <= 17)) cat = "junior";
        if ((eta >= 12) && (eta <= 14)) cat = "cadetti a";
        if ((eta >= 10) && (eta <= 11)) cat = "cadetti b";
        if (eta > 35) cat = "senior b";
        if (eta < 10) cat = "esordienti";
    
    
        return cat
    
      }




  getAtletaById(id) {
    var questo=this;
    var atl: any = {};
    //console.log("atleti",this.atleti);
    this.atleti.forEach(function (item, idx) {
      //console.log(item);
      if (item.doc.id == id) {
        //console.log("trovato !!");
        atl = item.doc;
        atl.categoria=questo.getCategoria(atl.datanascita,null);
      }
    })
    return atl;
  }


}
