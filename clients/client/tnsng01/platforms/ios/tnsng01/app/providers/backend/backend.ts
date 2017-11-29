import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import { Observable as RxObservable } from "rxjs/Observable";

import "rxjs/add/operator/map";
import "rxjs/add/operator/do";

@Injectable()
export class Backend {
  //rooturl="https://bpeitaly.mybluemix.net";
  rooturl = "http://tkdr.herokuapp.com";
  token = "token";
  atleti = [];
  chat = [];
  activegara: any = {};
  user:any={
    token: "",
    email: "",
    nickname: ""
  }


  constructor(public http: Http) {

  }


blueLogin(user, callback) {
  var questo=this;
  console.log("bluelogin", user);
  var email = user.email;
  var psw = user.password;
  var url = this.rooturl + "/users/login";
  var questo = this;
  //var authorization = "Basic " + window.btoa(email + ":" + psw);
  var auth2 = "Basic " + questo.b64encode(email + ":" + psw);
  console.log("authorization", auth2);
  var data = {
    authorization: auth2

  }
  if (user.gcmtoken) {

    console.log("this user has gcmtoken", user.gcmtoken);
    data["gcmtoken"] = user.gcmtoken;


  }

  console.log("trying to login at", url);
  this.postData(url, data, function (data) {
    console.log("data", data);
    if (String(data.loggedin) == "true") {
      console.log("login successfull");
      questo.user = data;
      if (!data.email) questo.user.email = email;
      if (!data.nickname) questo.user.nickname = email;

      console.log("USER", questo.user);

      //questo.events.publish('username:changed', questo.user);
      console.log("user token", questo.user.token);

      if (questo.user.role == "IBM_ADMIN") questo.isIbmAdmin = true;

      //questo.utils.setJsonStorage("creds", user);
      //questo.getAtleti(function () { });

      if (callback) callback(data);





    } else {
      console.log("login was not successfull");
      if (callback) callback(data);
    }

  });










}


  fetchData(url, callback) {
    //("fetchdata");
    if (url.indexOf("token") == -1) {
      if (url.indexOf("?") > -1) {
        url += "&token=" + this.user.token;

      } else url += "?token=" + this.user.token;

    }
    //utils.colog("calling url ", url);

    this.http.get(url).map((res) => res.json()).subscribe((data) => {
      console.log("got data", data);
      if (callback) callback(data);
    });
  }

  fetchText(url, callback) {
    //("fetchdata");
    if (url.indexOf("token") == -1) {
      if (url.indexOf("?") > -1) {
        url += "&token=" + this.user.token;

      } else url += "?token=" + this.user.token;

    }
    //utils.colog("calling url ", url);

    this.http.get(url).map((res) => res.text()).subscribe((data) => {
      console.log("got data", data);
      if (callback) callback(data);
    });
  }


postData(url, data, callback) {
  
    if (url.indexOf("token") == -1) {
      if (url.indexOf("?") > -1) {
        url += "&token=" + this.user.token;
  
      } else url += "?token=" + this.user.token;
  
    }
  
    this.http.post(url, data)
      .subscribe(data => {
        var result = data.json();
        callback(result);
      }, error => {
        console.log(error.json());
        callback(error.json());
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
    var questo = this;
    var atl: any = {};
    //console.log("atleti",this.atleti);
    this.atleti.forEach(function (item, idx) {
      //console.log(item);
      if (item.doc.id == id) {
        //console.log("trovato !!");
        atl = item.doc;
        atl.categoria = questo.getCategoria(atl.datanascita, null);
      }
    })
    return atl;
  }


  getMaschiFemmine = function ($mr, su_cosa?: any) {
    //colog("getmaschifemmine");
    //colog(jcurrentgara.iscritti)
    var $m = $mr;
    if ($mr.rows) $m = $mr.rows;
    //var iscritti = jcurrentgara.iscritti.split(",");
    var maschi = 0;
    var femmine = 0;
    for (var i = 0; i < $m.length; i++) {
      //$($m).each(function (i) {
      //console.log("$M: "+JSON.stringify($m[i]))
      var $a;
      if (su_cosa == "iscritti") {
        $a = this.getAtletaById($m[i]);
      } else $a = this.getAtletaById($m[i].doc.atletaid);

      var sesso = "M";
      if ($a.sesso) sesso = $a.sesso.toUpperCase();

      if (sesso == "M") maschi++;
      if (sesso == "F") femmine++;
      //console.log($a.cognome+" "+$a.nome+" - "+sesso);

    }

    var retvalue = {
      maschi: maschi,
      femmine: femmine
    }

    return retvalue;





  }


  filterRows = function ($m, filt, exact?: any) {
    if (!exact) exact = false;
    //console.log("filterrows: ")
    //console.log($m)
    var $retrows = {
      rows: []
    };

    var rows = $m;
    if ($m.rows) rows = $m.rows;
    //var rows = $m.rows; //[{person:"me", age :"30"},{person:"you",age:"25"}];

    for (var i = 0; i < rows.length; i++) {

      var row = rows[i];
      var eligible = true;

      for (var key in row.doc) {
        // console.log("key: "+key + " . "+ row.doc[key]);
        for (var fkey in filt) {
          if (fkey == key) {
            //console.log("found key ---->"+fkey);
            var v1 = filt[fkey].toLowerCase();

            if (v1.trim() != "") {
              var v2 = row.doc[key].toLowerCase();
              //console.log(v2);
              if (exact) {
                if (v2.trim() == v1.trim()) {
                  // console.log("found !: "+v2);

                } else {
                  eligible = eligible && false;
                }
              } else {
                if (v2.indexOf(v1) > -1) {
                  // console.log("found !: "+v2);

                } else {
                  eligible = eligible && false;
                }


              }

            }

          }
        }
      }

      if (eligible) $retrows.rows.push(row);
    }

    return $retrows;
  }

  filterArray($m, filt, exact) {
    if (!exact) exact = false;
    //colog("filterrows: ")
    //console.log($m)
    var $retrows = [];
    var rows = $m; //[{person:"me", age :"30"},{person:"you",age:"25"}];

    rows.forEach(function (item, i) {

      var row = rows[i];
      var eligible = true;

      for (var key in row) {
        // console.log("key: "+key + " . "+ row.doc[key]);
        for (var fkey in filt) {
          if (fkey == key) {
            //console.log("found key ---->"+fkey);
            var v1 = filt[fkey].toLowerCase();
            if (v1.trim() != "") {
              var v2 = row[key].toLowerCase();
              if (exact) {
                if (v2.trim() == v1.trim()) {
                  // console.log("found !: "+v2);

                } else {
                  eligible = eligible && false;
                }
              } else {
                if (v2.indexOf(v1) > -1) {
                  // console.log("found !: "+v2);

                } else {
                  eligible = eligible && false;
                }


              }

            }

          }
        }
      }
      if (eligible) $retrows.push(row);
    });

    return $retrows;
  }


getTkdtAtleta(atleta) {
  var questo = this;
  console.log("getTkdtAtleta searching this atleta", atleta)
  var retvalue = {
    nome: "atleta non trovato",
    catcintura: "--",
    catpeso: "--",
    cateta: "--",
    societa: "--",
    sesso: "--",
    giorno: "--"
  };


  var anome = atleta.nome.toLowerCase();
  var acnome = atleta.cognome.toLowerCase();

  anome = anome.replace("à", "a'");
  anome = anome.replace("è", "e'");
  anome = anome.replace("ì", "i'");
  anome = anome.replace("ò", "o'");
  anome = anome.replace("ù", "u'");

  acnome = acnome.replace("à", "a'");
  acnome = acnome.replace("è", "e'");
  acnome = acnome.replace("ì", "i'");
  acnome = acnome.replace("ò", "o'");
  acnome = acnome.replace("ù", "u'");

  console.log("activegara", this.activegara);



  var source: any = [];
  if (!questo.activegara.gara.rows[0].doc.hasOwnProperty("tkdt")) return retvalue;
  if (questo.activegara.gara.rows[0].doc.tkdt.atleti) source = this.activegara.gara.rows[0].doc.tkdt.atleti;
  console.log("source", source.length);

  if (source.length == 0) source = this.activegara.gara.rows[0].doc.tkdt.atleti_iscritti;



  source.forEach(function (item, i) {


    var nome = anome + " " + acnome;
    var nomex = acnome + " " + anome;

    var atl = source[i];
    var atlnome = atl.nome.toLowerCase().trim();
    atlnome = questo.normalizeAccento(atlnome);


    //console.log(atlnome);
    //console.log(atlnome, nome);
    if (atlnome.indexOf("colangel") > -1) console.log(atlnome, nome);
    if ((atlnome == nome.trim()) || (atlnome == nomex.trim())) {
      console.log("TROVATO !!");
      retvalue = atl;
    }




  })

  return retvalue;



}

normalizeAccento(txt) {
  txt = this.replaceAll(txt, "à", "a'");
  txt = this.replaceAll(txt, "è", "e'");
  txt = this.replaceAll(txt, "ì", "i'");
  txt = this.replaceAll(txt, "ò", "o'");
  txt = this.replaceAll(txt, "ù", "u'");
  return txt
}


replaceAll = function (string, search, replacement) {
  var target = string;
  return target.split(search).join(replacement);
};



getTkdtAtletiCategoria(cateta, catcintura, catpeso, sesso) {
  var questo = this;

  console.log("getTkdtAtletiCategoria searching atleti in categoria", cateta + " " + catcintura + " " + catpeso + " " + sesso)
  var retvalue = "notfound";
  var avversari: any = [];

  var source: any = [];


  if (!this.activegara.gara.rows[0].doc.hasOwnProperty("tkdt")) return avversari;

  if (this.activegara.gara.rows[0].doc.tkdt.atleti) source = this.activegara.gara.rows[0].doc.tkdt.atleti;

  if (source.length == 0) source = questo.activegara.gara.rows[0].doc.tkdt.atleti_iscritti;

  source.forEach(function (item, i) {

    var atl = source[i];

    var cpeso = "";
    if (atl.catpeso) cpeso = atl.catpeso.toLowerCase();
    var ccint = atl.catcintura.toLowerCase();
    var ceta = atl.cateta.toLowerCase();
    var csesso = atl.sesso.toLowerCase();


    var doIt = true;
    if (cpeso != catpeso.toLowerCase()) doIt = doIt && false;
    if (ccint != catcintura.toLowerCase()) doIt = doIt && false;
    if (ceta != cateta.toLowerCase()) doIt = doIt && false;
    if (csesso != sesso.toLowerCase()) doIt = doIt && false;

    if (doIt) {
      avversari.push(atl);
    }
    //console.log(atlnome);
    //console.log(atlnome,nome);





  })

  return avversari;

}


getTkdtTabulatiCategoria(cateta, catcintura, catpeso, sesso) {
  var retvalue = {
    categoria_peso: "--",
    categoria_eta: "--",
    cintura_da: "--",
    cintura_a: "--",
    sesso: "--"
  };

  if (!this.activegara.gara.rows[0].doc.hasOwnProperty("tkdt")) return retvalue;
  var tkdt_tabulati: any = [];


  if (this.activegara.gara.rows[0].doc.tkdt.hasOwnProperty("tabulati")) tkdt_tabulati = this.activegara.gara.rows[0].doc.tkdt.tabulati;

  console.log("getTkdtTabulatiCategoria searching tabulato in categoria", cateta + " " + catcintura + " " + catpeso + " " + sesso);
  var tabname = sesso + " - " + cateta + " - " + catcintura + " - " + catpeso + " kg";


  tkdt_tabulati.forEach(function (item, i) {

    var tab = tkdt_tabulati[i];

    var cpeso = tab.categoria_peso.replace("kg", "").trim().toLowerCase();
    var ccint = tab.cintura_da.toLowerCase() + " -> " + tab.cintura_a.toLowerCase();
    var ceta = tab.categoria_eta.toLowerCase();
    var csesso = tab.sesso.toLowerCase();

    //console.log(cpeso+" - "+ccint+" - "+ceta+" - "+csesso);
    var doIt = true;
    if (cpeso != catpeso.toLowerCase()) doIt = doIt && false;
    if (ccint != catcintura.toLowerCase()) doIt = doIt && false;
    if (ceta != cateta.toLowerCase()) doIt = doIt && false;
    if (csesso != sesso.toLowerCase()) doIt = doIt && false;

    if (doIt) {
      console.log("TROVATO TABULATO !!")
      tab.tabname = tabname;
      retvalue = tab;
    }
    //console.log(atlnome);
    //console.log(atlnome,nome);





  })

  return retvalue;

}


getTabulatoImg(h, callback) {
  //window.open(h);
  //return;
  var questo=this;
  var arr = h.split("id=");
  var tabid = arr[1];
  var url = this.rooturl + "/tkdt/tabulatoimage/" + tabid;
  questo.fetchText(url,function(data){
    if (callback) callback(data);
  })

  /*
  this.http.get(url).map(res => res.text()).subscribe(
    (data) => {
      console.log("data", data)
      callback(data);
    },
    (err) => {
      console.log(err)
      callback("");
    }
  );
  */
  /*
  $.ajax({
    url: h,
    type: "GET",
    dataType: "html"
  })
    .done(function (data) {
      colog(data);
      var img = $(data).find("img[alt=drawing_load_error]");
      var src = img.attr("src").replace("./", "");
      colog(src);
      var im = "<img style='width: 500px; height: 600px;' src='http://demo.tkdtechnology.it/" + src + "' />";
      callback(im);
      progressStop();
    });
    */

}

b64encode(input) {
  var questo=this;
  
      var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  
      var output = "";
  
  
      var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
  
  
      var i = 0;
  
  
  
  
      input = questo._utf8_encode(input);
  
  
  
  
      while (i < input.length) {
  
  
  
  
          chr1 = input.charCodeAt(i++);
  
  
          chr2 = input.charCodeAt(i++);
  
  
          chr3 = input.charCodeAt(i++);
  
  
  
  
          enc1 = chr1 >> 2;
  
  
          enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
  
  
          enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
  
  
          enc4 = chr3 & 63;
  
  
  
  
          if (isNaN(chr2)) {
  
  
              enc3 = enc4 = 64;
  
  
          } else if (isNaN(chr3)) {
  
  
              enc4 = 64;
  
  
          }
  
  
  
  
          output = output +
  
  
              _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
  
  
              _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
  
  
  
  
      }
  
  
  
  
      return output;
  
  
  }
  
  
  _utf8_encode(string) {
  
  
      string = string.replace(/\r\n/g, "\n");
  
  
      var utftext = "";
  
  
  
  
      for (var n = 0; n < string.length; n++) {
  
  
  
  
          var c = string.charCodeAt(n);
  
  
  
  
          if (c < 128) {
  
  
              utftext += String.fromCharCode(c);
  
  
          } else if ((c > 127) && (c < 2048)) {
  
  
              utftext += String.fromCharCode((c >> 6) | 192);
  
  
              utftext += String.fromCharCode((c & 63) | 128);
  
  
          } else {
  
  
              utftext += String.fromCharCode((c >> 12) | 224);
  
  
              utftext += String.fromCharCode(((c >> 6) & 63) | 128);
  
  
              utftext += String.fromCharCode((c & 63) | 128);
  
  
          }
  
  
  
  
      }
  
  
  
  
      return utftext;
  
  
  }
  



}
