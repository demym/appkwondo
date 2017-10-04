import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { UtilsProvider } from '../utils/utils';
import { Platform } from 'ionic-angular';
import { ThemeableBrowser } from 'ionic-native';
import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { DeviceFeedback } from '@ionic-native/device-feedback';
import * as moment from 'moment';
import * as xml2js from "xml2js";


/*
  Generated class for the BackendProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/ 
@Injectable()
export class BackendProvider {
  //public rooturl = "https://bpeitaly.mybluemix.net";
  public rooturl = "http://tkdr.herokuapp.com";
  //public rooturl = "http://localhost:3000";
  //9.71.212.38
  //public rooturl="http://9.71.212.38:3000";
  //public rooturl="http://192.168.1.107:3000";
  token = "eyJhbGciOiJIUzI1NiJ9.ZGVteW1vcnRlbGxpdGlAaXQuaWJtLmNvbQ.mA3t-fOoUDsugN-kWblqO0ueVFSXya2W6hs5fa5sddQ";
  user: any = {
    token: "",
    email: "",
    gcmtoken: "",
    twitter: {
      oauth_token: "",
      oauth_verifier: ""
    },
    role: "BP_GUEST"
  };
  browser;
  debugActive = true;
  private oldConsoleLog = null;
  isIbmAdmin = false;
  unreadposts = 0;
  lastunreadpost = "";
  bpfilters = {};
  atleti: any = [];
  rtmatches: any = [];
  chatmessages: any = [];
  gare: any = [];
  soundTimer;
  soundTime = 1500;
  appSettings = {
    sound: false,
    voice: false,
    feedback: true,
    server: "http://tkdr.herokuapp.com",


  }
  activegara: any = {};
  matchconsoles: any = [];



  enableLogger() {

    if (this.oldConsoleLog == null) { return; }

    window['console']['log'] = this.oldConsoleLog;
  }

  disableLogger() {
    this.oldConsoleLog = console.log;
    window['console']['log'] = function () { };
  };

  playFeedback() {
    var questo = this;
    if (this.appSettings.feedback) questo.feedback.acoustic();

  }

  /*
    refreshContacts(callback) {
      var questo = this;
      questo.getContacts(function (data) {
       
        data.forEach(function (item, idx) {
         
          if (item.doc.email == questo.user.email) {
            data.splice(idx, 1);
          }
  
  
        })
        var totalunreadcount = 0;
        data.forEach(function (item, idx) {
          var unreadcount = questo.socket.getUnreadMessagesFromEmail(item.doc.email).length;
         
          item.doc.unreadcount = unreadcount;
          totalunreadcount += unreadcount;
        })
        questo.contacts = data;
        questo.totalunreadcount=totalunreadcount;
        if (callback) callback(questo.contacts);
      });
    }
   */


  constructor(public feedback: DeviceFeedback, private storage: Storage, public events: Events, public platform: Platform, public http: Http, private utils: UtilsProvider) {
    console.log('Hello BackendProvider Provider');
    //this.browser=
    /*this.refreshContacts(function(data){

    });*/

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

  getRandomNumber(n) {
    return Math.floor((Math.random() * n) + 1);
  }

  getAllNews(callback) {
    var questo = this;
    var unreadposts = 0;
    var lastunread = "";
    var stordata = window.localStorage.getItem('lastreadpost');
    //alert(stordata);

    //var stordata=questo.utils.getStorage("lastreadpost",null);

    //questo.storage.get('lastreadpost').then((stordata) => {
    //console.log('Name: ' + name);
    //});
    //questo.utils.getStorage("bpei_lastreadpost", function (stordata) {

    console.log("******** stordata", stordata);

    if (!stordata) {
      lastunread = questo.lastunreadpost;
      console.log("no unreadposts storage var found, lastunread=", lastunread, questo.lastunreadpost);


    } else lastunread = stordata;
    console.log("bpei_lastreadpost", lastunread);

    var allnews = [];


    /* questo.twitterSearch("ibmpartners", function (twdata) {

       twdata.data.statuses.forEach(function (twitem, twidx) {
         twitem.infosource = "Twitter";
         var ndate = twitem.created_at;
         twitem.jdate = moment(ndate).format("YYYYMMDDHHmmSS");
         twitem.data = moment(ndate).format("DD/MM/YYYY HH:mm:SS");
         twitem.title = "";
         twitem.description = twitem.text;
         twitem.imgurl = twitem.user.profile_image_url;
         twitem.autore = twitem.user.screen_name;
         twitem.link = twitem.user.url;
         allnews.push(twitem);

       })*/


    questo.getThinkMagazine(function (tdata) {
      // console.log("thinkmagazine", tdata);
      tdata.forEach(function (titem, tidx) {
        titem.infosource = "ThinkMagazine";
        var ndate = new Date();
        titem.jdate = moment(ndate).format("YYYYMMDDHHmmSS");
        titem.jdate = "20170601000000";
        titem.data = moment(ndate).format("DD/MM/YYYY HH:mm:SS");
        titem.link = titem.link_social;
        allnews.push(titem);
      })
      questo.getLinkedin(function (ldata) {
        //console.log("ldata",JSON.stringify(ldata));
        ldata.rows.forEach(function (item, idx) {

          var ddata = item.doc.data.split(" ");
          var arr1 = ddata[0].split("/");
          var arr2 = ddata[1].split(":");
          var jdate = arr1[2] + arr1[1] + arr1[0] + arr2[0] + arr2[1] + "00";
          //console.log("jdate1",jdate);
          var newitem = {
            title: item.doc.title,
            description: item.doc.description,
            link: item.doc.link,
            autore: item.doc.autore,
            data: item.doc.data,
            imgurl: item.doc.foto,
            jdate: jdate,
            infosource: "Linkedin",
            imgsource: "\uf08c"
          }

          allnews.push(newitem);
        })
        questo.getPartnerworld(function (pdata) {
          //console.log("pdata",JSON.stringify(pdata));
          var adata = pdata.rss.channel.item;
          // console.log("pw rows:", adata.length);
          adata.forEach(function (item, idx) {

            var pubdate = item.pubDate;
            var arrd = pubdate.split("-");

            var pdate = arrd[2] + "/" + arrd[1] + "/" + arrd[0] + " " + arrd[3] + ":00";

            var jdate = arrd[0] + arrd[1] + arrd[2] + arrd[3].replace(":", "") + "00";
            //console.log("jdate",jdate)
            var newitem = {
              title: item.title,
              description: item.description,
              link: item.link,
              autore: "",
              data: pdate,
              jdate: jdate,
              imgurl: "",
              infosource: "PartnerWorld",
              imgsource: "PW"
            }

            allnews.push(newitem);
          })
          allnews.sort(function (a, b) {
            var a1 = a.jdate;
            var b1 = b.jdate;
            if (a1 > b1) return -1;
            if (a1 < b1) return 1;
            return 0;
          })
          var maxunread = "";
          allnews.forEach(function (aitm, aidx) {
            var jdate = aitm.jdate;
            console.log("jdate", jdate, aitm.infosource, jdate.length)

            if (jdate.length == 14) {
              if (jdate > lastunread) {
                aitm.isnew = true;

                unreadposts++;
                if (jdate > maxunread) maxunread = jdate;
                //console.log(jdate, lastunread, maxunread);

              } else aitm.isnew = false;
            }
          })

          questo.unreadposts = unreadposts;
          console.log("unreadposts", unreadposts, "maxunread", maxunread);
          if (maxunread != "") {
            questo.lastunreadpost = maxunread;
            window.localStorage.setItem('lastreadpost', maxunread);
            //questo.utils.setStorage("lastreadpost",maxunread);
            //questo.storage.set('lastreadpost', maxunread).then(() => {
            console.log('lastunread has been set');
          }
          if (callback) callback(allnews);
          //});
          //  questo.utils.setStorage("bpei_lastreadpost", maxunread)

        })


      })
    });




  }

  clearUnreadPosts() {
    this.unreadposts = 0;
  }

  getLinkedin(callback) {
    var url = this.rooturl + "/linkedin/feeds";
    this.fetchData(url, function (data) {
      console.log("got linkedin");
      if (callback) callback(data);



    })

  }

  getBp(filters, callback) {
    var url = this.rooturl + "/bp/filteredlist";
    this.postData(url, filters, function (data) {
      console.log("got bps");
      if (callback) callback(data);



    })

  }

  getBpFilters(callback) {
    var questo = this;
    var url = this.rooturl + "/bp/getfilters";
    this.fetchData(url, function (data) {
      console.log("got bps filters");
      questo.bpfilters = data;
      if (callback) callback(data);



    })

  }

  getPartnerworld(callback) {
    var url = this.rooturl + "/partnerworld/rss";
    this.fetchData(url, function (data) {
      console.log("got partnerworld");
      if (callback) callback(data);



    })
  }

  getContacts(callback) {

    var more = "";
    var url = this.rooturl + "/reachme/all/" + more;

    console.log(url);
    //var url=global.rooturl+"/reachme/all/"+global.user.role+"/"+global.user.email+"?token="+global.user.token;

    //console.log("url",url)
    this.fetchData(url, function (data) {
      console.log("got contacts");
      if (callback) callback(data);



    })
  }



  getThinkMagazine(callback) {


    var url = this.rooturl + "/thinkmagazine";

    this.fetchData(url, function (data) {

      console.log("got thinkmagazine", data.articles.article.length);

      data.articles.article.forEach(function (item, idx) {
        item.autore = item.author;

        item.imgurl = "https://www-01.ibm.com/easytools/runtime/hspx/prod/public/X0028/PortalX/file/RESOURCE/*/*/*" + item.image;
        item.description = item.summary;
      })

      if (callback) callback(data.articles.article);

      //callback(data);



    })
  }

  getGare(callback) {
    var questo = this;
    var url = this.rooturl + "/gare/findall?societa=20160217220400";
    this.fetchData(url, function (data) {
      questo.gare = data.rows;
      if (callback) callback(data);
    })
  }


  getGara(id, callback) {
    var questo = this;
    var url = this.rooturl + "/gare/fullgarabyid/" + id + "?societaid=20160217220400";
    this.fetchData(url, function(data) {
      console.log("fetched getGara in backend.ts", data);
      questo.rtmatches = data.realtime;
      //let activegara= Object.assign({}, data);
      questo.activegara = data;
      
      /*questo.events.publish('updatertmatches', data, Date.now());*/
      if (callback) callback(data);
    })

  }
  getSocieta(callback) {
    var url = this.rooturl + "/societa/findall?societaid=20160217220400";
    this.fetchData(url, function (data) {
      if (callback) callback(data);
    })

  }

  getAtleti(callback) {
    var questo = this;
    var url = this.rooturl + "/atleti/findall?societa=20160217220400";
    this.fetchData(url, function (data) {
      questo.atleti = data.rows;
      if (callback) callback(data);
    })
  }

  getRanking(callback) {
    var questo = this;
    var url = this.rooturl + "/atleti/ranking/save?societa=20160217220400";
    this.fetchData(url, function (data) {

      if (callback) callback(data);
    })
  }

  getEventi(callback) {
    var url = this.rooturl + "/eventi/findall?societa=20160217220400";
    this.fetchData(url, function (data) {
      if (callback) callback(data);
    })
  }


  getChatMessages(callback) {


    //var url = this.rooturl + "/chat/getmessages";
    var url = this.rooturl + "/chat/getno64";

    this.fetchData(url, function (data) {
      console.log("got chatmessages", data, data.length);


      if (callback) callback(data);



    })
  }


  fetchText(url, callback) {
    //("fetchdata");
    if (url.indexOf("token") == -1) url += "?token=" + this.token;
    //utils.colog("calling url ", url);

    this.http.get(url).map(res => res.text()).subscribe(data =>  {
      //console.log("fetchText data",data);
      if (callback) callback(data);
    })
  }


  fetchData(url, callback) {
    //("fetchdata");
    if (url.indexOf("token") == -1) {
      if (url.indexOf("?") > -1) {
        url += "&token=" + this.token;

      } else url += "?token=" + this.token;

    }
    //utils.colog("calling url ", url);

    this.http.get(url).map(res => res.json()).subscribe(data => {
      if (callback) callback(data);
    });
  }



  blueLogin(user, callback) {
    console.log("bluelogin", user);
    var email = user.email;
    var psw = user.password;
    var url = this.rooturl + "/atleti/login";
    var questo = this;
    var authorization = "Basic " + window.btoa(email + ":" + psw);
    console.log("authorization", authorization);
    var data = {
      authorization: authorization

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

        questo.utils.setJsonStorage("creds", user);
        questo.getAtleti(function () { });

        if (callback) callback(data);





      } else {
        console.log("login was not successfull");
        if (callback) callback(data);
      }

    });










  }

  twitterSearch(query, callback) {
    var url = this.rooturl + "/twitter/search?query=" + query + "&src=typd";
    this.fetchData(url, function (data) {
      if (callback) callback(data);
    })
  }

  postData(url, data, callback) {
    this.http.post(url, data)
      .subscribe(data => {
        var result = data.json();
        callback(result);
      }, error => {
        console.log(error.json());
        callback(error.json());
      });
  }

  openUrl(url, target?: string) {

    this.platform.ready().then(() => {
      /*var options = {
        location: 'yes',
        clearcache: 'yes',
        toolbar: 'yes',
        closebuttoncaption: 'DONE?'
      };*/

      var m = "_blank";
      if (target) m = target;

      //var opts = "location=no,clearcache=no,clearsessioncache=no,toolbar=yes,closebuttoncaption=Done,toolbarposition=top";
      let browser = new ThemeableBrowser(url, m, {
        statusbar: {
          color: '#049a55'
        },
        toolbar: {
          height: 44,
          color: '#049a55'
        },
        title: {
          color: '#003264ff',
          showPageTitle: true
        },
        backButton: {
          image: 'back',
          imagePressed: 'back_pressed',
          align: 'left',
          event: 'backPressed'
        },
        forwardButton: {
          image: 'forward',
          imagePressed: 'forward_pressed',
          align: 'left',
          event: 'forwardPressed'
        },
        closeButton: {
          image: 'close',
          imagePressed: 'close_pressed',
          align: 'left',
          event: 'closePressed'
        }/*,
        customButtons: [
          {
            image: 'share',
            imagePressed: 'share_pressed',
            align: 'right',
            event: 'sharePressed'
          }
        ],
        menu: {
          image: 'menu',
          imagePressed: 'menu_pressed',
          title: 'Test',
          cancel: 'Cancel',
          align: 'right',
          items: [
            {
              event: 'helloPressed',
              label: 'Hello World!'
            },
            {
              event: 'testPressed',
              label: 'Test!'
            }
          ]
        }*/,
        backButtonCanClose: true
      });

      /*if (!this.browser) {
          this.browser = new InAppBrowser(url, '_system', opts);
      } else {
          this.browser.open(url, '_system', opts);
      }*/
      //let browser = new InAppBrowser(url, '_blank', options);

    });
  }


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


  getActiveChat(callback) {
    var questo = this;
    var url = this.rooturl + "/chat/getno64";
    this.fetchData(url, function (data) {
      questo.chatmessages = data.rows;
      console.log("got active chatmessages", questo.chatmessages);
      if (callback) callback(data);

    })

  }

  getHistoryAtleta(aid, callback) {
    var url = this.rooturl + "/gare/history/" + aid;
    this.fetchData(url, function (data) {
      if (callback) callback(data);
    })
  }

  getMatchById(id) {
    var matches = this.activegara.matchesbyprog;
    //console.log("getmatchesbyid "+id,matches);
    var m = this.filterRows(matches, { id: id }, true);
    return m;
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
  
    rows.forEach(function (item,i) {
  
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


  getRtMatches(callback) {
    var url = this.rooturl + "/realtime";
    this.fetchData(url, function (data) {
      if (callback) callback(data);

    })
  }

  postChat(msg, callback) {
    var questo = this;
    var chatmultiroom = false;

    console.log("postchat", msg);

    var obj = {
      sockid: questo.user.sockid,
      nickname: questo.user.nickname,
      garaid: "",
      text: "prova"

    }

    if (!msg) msg = obj;


    var doReturn = false;
    var hasFoto = false;
    var hasAudio = false;


    if (msg.foto) {

      if (msg.foto.trim() != "") hasFoto = true;

    }
    if (msg.audio) {
      if (msg.audio.trim() != "") hasAudio = true;

    }

    var hasMedia = hasFoto || hasAudio;

    if ((msg.text.trim() == "") && !hasMedia) doReturn = true;

    if (doReturn) return;
    var url = questo.rooturl + "/chat/put";
    //var url = questo.rooturl + "/chat/put/" + jcurrentgara.id;
    //if (!chatmultiroom) url = 

    //playSound("img/chatsend");
    //$("#page_chat #chatmsg").val("");
    questo.postData(url, msg, function (data) {
      console.log("chatmsg sent");
      if (callback) callback();

    })

  }



  playSound(filename) {
    var questo = this;
    clearTimeout(this.soundTimer);
    //console.log(settings)
    if (!questo.appSettings) return;
    if (!questo.appSettings.sound) return;
    if (String(questo.appSettings.sound) != "true") return;
    questo.soundTimer = setTimeout(function () {
      document.getElementById("sound").innerHTML = '<audio autoplay="autoplay"><source src="' + filename + '.mp3" type="audio/mpeg" /><source src="' + filename + '.ogg" type="audio/ogg" /><embed hidden="true" autostart="true" loop="false" src="' + filename + '.mp3" /></audio>';
      clearTimeout(questo.soundTimer);
    }, questo.soundTime);

  }

  getObjectArray(o) {
    var arr = [];
    for (var k in o) {
      //console.log("found key",k);
      if (o.hasOwnProperty(k)) {
        var newProp = {
          name: k,
          value: o[k]
        }
        arr.push(newProp);

      }
    }
    return arr;
  }


  userIsAdmin() {
    var ret = false;
    if (this.user.role == "tkdradmin") ret = true;
    return ret;
  }

  addConsoleIfNotExists(m) {
    console.log("addconsoleifnotexists", m);
    var found = false;
    var foundidx = -1;
    this.matchconsoles.forEach(function (item, idx) {
      console.log("item", item.match.id, "m", m.id);
      if (item.match.id == m.id) {
        found = true;
        foundidx = idx;
      }
    })
    if (!found) {

      var newrta = {
        active: false,
        match: m,
        result: "0-0",
        round: "0",
        paused: true,
        running: false
      }

      this.matchconsoles.push(newrta);
      console.log("console was not found for match, added it", this.matchconsoles)
    } else {
      console.log("console was already there for match", m);
      this.matchconsoles[foundidx].match = m;
    }
  }

  removeConsolesIfNotRealtime() {
    var questo = this;
    this.matchconsoles.forEach(function (item, idx) {
      console.log("item", item.id);
      var removeit = true;
      if (item.match.realtime) {
        if (String(item.match.realtime) == "true") {
          removeit = false;
        }
      }
      if (removeit) {
        console.log("removing not realtime console", item);
        questo.matchconsoles.splice(idx, 1);
      }
    })

    console.log("matchconsoles", this.matchconsoles);

  }


  syncConsoles(matches) {
    var questo = this;
    console.log("syncConsoles", matches);
    matches.rows.forEach(function (item, idx) {
      var doc = item.doc;
      questo.matchconsoles.forEach(function (citem, cidx) {
        if ((doc.id == citem.match.id) && (doc.garaid == citem.match.garaid)) {
          citem.match = doc;
        }
      })
    })

  }

  setResult(match, atl, mfa, callback) {
    var questo = this;
    var doc = {
      match: match,
      atl: atl,
      mfa: mfa
    }
    var url = questo.rooturl + "/matches/setresultok";
    console.log("posting result, match", match);
    questo.postData(url, doc, function (data) {
      if (callback) callback(data);
    })
  }

  replaceAll = function (string, search, replacement) {
    var target = string;
    return target.split(search).join(replacement);
  };



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



    var source = [];
    if (!this.activegara.gara.rows[0].doc.hasOwnProperty("tkdt")) return retvalue;
    if (this.activegara.gara.rows[0].doc.tkdt.atleti) source = this.activegara.gara.rows[0].doc.tkdt.atleti;
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

  getTkdtAtletiCategoria(cateta, catcintura, catpeso, sesso) {
    var questo = this;

    console.log("getTkdtAtletiCategoria searching atleti in categoria", cateta + " " + catcintura + " " + catpeso + " " + sesso)
    var retvalue = "notfound";
    var avversari = [];

    var source = [];


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
    var tkdt_tabulati = [];


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
    var arr=h.split("id=");
    var tabid=arr[1];
    var url=this.rooturl+"/tkdt/tabulatoimage/"+tabid

    this.http.get(url).map(res => res.text()).subscribe(
      (data) => {
        console.log("data",data)
        callback(data);
       } ,
      (err) => {
        console.log(err)
        callback("");
      }
      );
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






  normalizeAccento(txt) {
    txt = this.replaceAll(txt, "à", "a'");
    txt = this.replaceAll(txt, "è", "e'");
    txt = this.replaceAll(txt, "ì", "i'");
    txt = this.replaceAll(txt, "ò", "o'");
    txt = this.replaceAll(txt, "ù", "u'");
    return txt
  }

  markGara(id, stato, callback) {

    console.log("markgara",id,stato);

    var questo=this;
    
      var postdata = {
        
        stato: stato,
        id: id
      }
      
      var url=questo.rooturl+"/gare/update";
        questo.postData(url,postdata,function(data){
          console.log("gara marked",postdata,data);
          if (callback) callback(data);
        })

        /*
      $.ajax({
          url: rooturl + "/gare/update",
          type: "POST",
          data: data
        })
        .done(function (data) {
          popGareCancel();
          refreshGareServer();
    
        });
        */
    
    }


}

