webpackJsonp([1],{

/***/ 136:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_socket_service_socket_service__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_backend_backend__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_app_availability__ = __webpack_require__(141);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_gare_gare__ = __webpack_require__(519);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_atleti_atleti__ = __webpack_require__(553);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_eventi_eventi__ = __webpack_require__(557);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_societa_societa__ = __webpack_require__(558);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_stats_stats__ = __webpack_require__(559);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_account_account__ = __webpack_require__(155);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_about_about__ = __webpack_require__(156);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_servizisocieta_servizisocieta__ = __webpack_require__(157);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};














//import { DeviceFeedback } from '@ionic-native/device-feedback';
var HomePage = (function () {
    function HomePage(toastCtrl, loadingCtrl, alert, appAvailability, platform, navCtrl, socket, backend) {
        this.toastCtrl = toastCtrl;
        this.loadingCtrl = loadingCtrl;
        this.alert = alert;
        this.appAvailability = appAvailability;
        this.platform = platform;
        this.navCtrl = navCtrl;
        this.socket = socket;
        this.backend = backend;
        this.allnews = [];
        this.displayednews = [];
        this.isIbmAdmin = false;
        this.filter = "All";
        this.unreadposts = 0;
        this.menu = [
            /*
            {
              name: "ChatKwonDo",
              icon: "md-chatbubbles",
              page: ChatPage,
              authrequired: false
            },*/ {
                name: "Gare",
                icon: "md-trophy",
                page: __WEBPACK_IMPORTED_MODULE_5__pages_gare_gare__["a" /* GarePage */],
                authrequired: false
            }, {
                name: "Atleti",
                icon: "ios-people",
                page: __WEBPACK_IMPORTED_MODULE_6__pages_atleti_atleti__["a" /* AtletiPage */],
                authrequired: true
            }, {
                name: "Eventi",
                icon: "md-calendar",
                page: __WEBPACK_IMPORTED_MODULE_7__pages_eventi_eventi__["a" /* EventiPage */],
                authrequired: false
            }, {
                name: "Società",
                icon: "md-flag",
                page: __WEBPACK_IMPORTED_MODULE_8__pages_societa_societa__["a" /* SocietaPage */],
                authrequired: true
            }, {
                name: "Statistiche",
                icon: "md-stats",
                page: __WEBPACK_IMPORTED_MODULE_9__pages_stats_stats__["a" /* StatsPage */],
                authrequired: false
            }
        ];
        this.displayedmenu = [];
        this.user = {};
        this.server = {};
        var questo = this;
        this.socket.socketService.subscribe(function (event) {
            console.log('message received from server... ', event);
            if (event.category === 'message') {
            }
        }); //end of subscribe
        /*
            let loader = this.loadingCtrl.create({
              content: "Please wait..."
            });
            loader.present();
          
         
            questo.refresh(function (data) {
              //console.log("allnews", data);
              questo.allnews = data;
              questo.isIbmAdmin = questo.backend.isIbmAdmin;
              questo.filterNews();
              loader.dismiss();
            })
            */
    }
    HomePage.prototype.showAbout = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_11__pages_about_about__["a" /* AboutPage */]);
    };
    HomePage.prototype.gotoPage = function (p) {
        var questo = this;
        this.backend.playFeedback(); //deviceFeedback.acoustic();
        /*if (this.backend.isCordova()) {
          console.log("isCordova");
          this.navCtrl.push(p,{},{animate: false});
        } else */
        /*if (p==ChatPage) {
          console.log("setting ChatPage as root")
          this.navCtrl.setRoot(ChatPage);
        } else {*/
        this.navCtrl.push(p, {}, questo.backend.navOptions);
        //}
        //this.navCtrl.push(p,{});
    };
    HomePage.prototype.openUrl = function (url, mode) {
        var _this = this;
        this.platform.ready().then(function () {
            _this.backend.openUrl(url);
        });
    };
    HomePage.prototype.getSourceIcon = function (item) {
        var icon = "logo-linkedin";
        //console.log("infosource",item.infosource);
        if (item.infosource == "Linkedin")
            icon = "logo-linkedin";
        if (item.infosource == "Twitter")
            icon = "logo-twitter";
        if (item.infosource == "PartnerWorld")
            icon = "md-globe";
        if (item.infosource == "ThinkMagazine")
            icon = "md-book";
        return icon;
    };
    HomePage.prototype.doRefresh = function (refresher) {
        console.log('Begin async operation', refresher);
        var questo = this;
        questo.refresh(function (data) {
            //console.log("allnews", data);
            questo.allnews = data;
            questo.filterNews();
            refresher.complete();
        });
    };
    HomePage.prototype.refresh = function (callback) {
        var questo = this;
        questo.backend.getAllNews(function (data) {
            console.log("allnews", data);
            data.forEach(function (item, idx) {
                item.likes = questo.backend.getRandomNumber(20);
                item.comments = questo.backend.getRandomNumber(10);
                if (item.imgurl.trim() == "")
                    item.imgurl = "assets/img/globe.png";
                //var data=moment(questo.data).fromNow();
            });
            questo.unreadposts = questo.backend.unreadposts;
            /*
          let toast = questo.toastCtrl.create({
            message: 'User was added successfully',
            showCloseButton: true,
            closeButtonText: 'Ok',
            position: "middle"
          });
          toast.present();*/
            questo.backend.clearUnreadPosts();
            if (callback)
                callback(data);
            //questo.allnews = data;
        });
    };
    HomePage.prototype.launch = function (url, mode) {
        this.openUrl(url, mode);
        /*
            this.platform.ready().then(() => {
               // cordova.InAppBrowser.open(url, "_system", "location=true");
            });
            */
    };
    HomePage.prototype.tapCard = function (item) {
        var _this = this;
        console.log("tapcard", item);
        var infosource = item.infosource.toLowerCase();
        if (infosource == "linkedin") {
            var app_1;
            if (this.platform.is('ios')) {
                app_1 = 'twitter://';
            }
            else if (this.platform.is('android')) {
                app_1 = 'com.twitter.android';
            }
            this.appAvailability.check(app_1)
                .then(function (yes) {
                //var opts = "location=no,clearcache=no,clearsessioncache=no,toolbar=yes,closebuttoncaption=Done,toolbarposition=top";
                _this.backend.openUrl(item.link, "_system");
                console.log(app_1 + ' is available');
            }, function (no) {
                _this.launch(item.link, "_blank");
                console.log(app_1 + ' is NOT available');
            });
        }
        else {
            this.backend.openUrl(item.link);
        }
        /*
         this.navCtrl.push(ChatPage, {
          user: user
        }
        );
        */
    };
    HomePage.prototype.tappedSegment = function (e) {
        console.log("tappedsegment", e);
        var value = e.value;
        if (value.toLowerCase() == "twitter") {
            this.filter = value;
            this.getTweets();
        }
        else {
            this.filterNews();
            this.filter = value;
        }
    };
    HomePage.prototype.filterNews = function () {
        console.log("filterNews");
        var arr = [];
        var questo = this;
        questo.allnews.forEach(function (item, idx) {
            var src = item.infosource.toLowerCase();
            console.log("src", src, "filter", questo.filter);
            var doIt = false;
            if (src == questo.filter.toLowerCase())
                doIt = true;
            if (questo.filter.toLowerCase() == "all")
                doIt = true;
            if (doIt)
                arr.push(item);
        });
        questo.displayednews = arr;
    };
    HomePage.prototype.getTweets = function () {
        console.log("getTweets");
        var questo = this;
        var searchtext = "IBM";
        this.backend.twitterSearch(searchtext, function (data) {
            console.log("search", data);
            //questo.tweets=data.data.status;
            var arr = [];
            data.data.statuses.forEach(function (item, idx) {
                var newitem = {
                    title: item.user.name,
                    data: item.created_at,
                    description: item.text,
                    imgurl: item.user.profile_image_url
                };
                arr.push(newitem);
            });
            questo.displayednews = arr;
        });
    };
    HomePage.prototype.onFilterChange = function (ev) {
        console.log("filterchange !", ev);
        this.filter = ev;
        this.filterNews();
    };
    HomePage.prototype.ionViewDidLoad = function () {
        var questo = this;
        this.user = this.backend.user;
        this.server = this.backend.rooturl;
        var arr = [];
        this.menu.forEach(function (item, idx) {
            if (questo.getAuth(item))
                arr.push(item);
        });
        questo.displayedmenu = arr;
    };
    HomePage.prototype.getAuth = function (m) {
        var questo = this;
        var role = this.backend.user.role;
        console.log("role", role);
        var retvalue = true;
        if (m.authrequired) {
            if (!questo.backend.userIsAdmin())
                retvalue = false;
            //if (this.backend.user.role.toLowerCase()!="tkdradmin") retvalue=false;
        }
        return retvalue;
    };
    HomePage.prototype.myAccount = function () {
        var questo = this;
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_10__pages_account_account__["a" /* AccountPage */], {}, questo.backend.navOptions);
    };
    HomePage.prototype.gotoServiziSocieta = function () {
        var questo = this;
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_12__pages_servizisocieta_servizisocieta__["a" /* ServizisocietaPage */], {}, questo.backend.navOptions);
    };
    return HomePage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('chat'),
    __metadata("design:type", Object)
], HomePage.prototype, "chat", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["c" /* Content */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["c" /* Content */])
], HomePage.prototype, "content", void 0);
HomePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-home',template:/*ion-inline-start:"/Users/demetriomortelliti/Desktop/demy/PROJECTS/appkwondo/clients/ion2kwondo/src/pages/home/home.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle="left" start>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>AppKwonDoV2</ion-title>\n    <!--<button ion-button menuToggle="right" end>\n        <ion-icon name="menu"></ion-icon>\n      </button>-->\n    <ion-buttons end>\n\n      <button (tap)="showAbout()" ion-button icon-only>\n        <ion-icon name="ios-information-circle"></ion-icon>\n      </button>\n\n\n<button (tap)="broadcast()" ion-button icon-only>\n  <ion-icon *ngIf="isIbmAdmin" name="ios-radio-outline"></ion-icon>\n</button>\n\n\n</ion-buttons>\n  </ion-navbar>\n  \n    \n</ion-header>\n\n<ion-content spadding class="ion-content">\n\n   \n  <ion-card>\n    <ion-card-content style="padding: 7px;">\n      <ion-row>\n        <ion-col col-9>\n            <div class="benvenuto">Benvenuto <b>{{user.nickname}}</b></div>\n            </ion-col>\n            <ion-col col-3 style="text-align: right">\n                <button style="height: 18px;" clear ion-button (tap)="myAccount()"><ion-icon class="baricon" name="md-settings"></ion-icon></button>\n            </ion-col>\n      </ion-row>\n            <div class="server">{{user.email}}</div>\n            <div class="server">Server: {{backend.rooturl}}</div>\n            <div class="admin" *ngIf="user.role==\'tkdradmin\'">Accesso amministratore eseguito</div>\n\n      \n\n    </ion-card-content>\n    </ion-card>\n  \n<ion-list >\n  <ion-item  *ngFor="let m of displayedmenu" (tap)="gotoPage(m.page)">\n    <ion-row style="font-size: 16px" >\n      <ion-col col-2 class="fixedicon">\n    <ion-icon style="font-size: 22px !important" name="{{m.icon}}"></ion-icon>\n      </ion-col>\n      <ion-col style="font-size: 20px" >{{m.name}}</ion-col>\n      <ion-col col-1>\n        <ion-badge *ngIf="(backend.unread>0) && (m.name==\'ChatKwonDo\')" color="danger">{{backend.unread}}</ion-badge>\n        <ion-badge *ngIf="(backend.nextevents.length>0) && (m.name==\'Eventi\')" >{{backend.nextevents.length}}</ion-badge>\n      </ion-col>\n      </ion-row>\n  </ion-item>\n  </ion-list>\n  <!--<ion-card>\n    <ion-card-content>\n        <img *ngIf="backend.activesocieta==\'ASD TAEKWONDO ROZZANO\'" src="assets/img/logotkdrozzano_icon.png" style="height: 32px" />\n    </ion-card-content>\n  </ion-card>-->\n  <!--<div class="servizi">\n  <ion-card (tap)="gotoServiziSocieta()">\n    <ion-card-content>\n      <ion-row>\n          <ion-col col-3>\n              <img [src]="backend.settings.logourl" class="societalogosmall" />\n            </ion-col>\n        <ion-col>\n            Servizi {{backend.settings.mysocietaname}}\n        </ion-col>\n        \n      </ion-row>\n     \n    </ion-card-content>\n  </ion-card>\n</div>-->\n \n</ion-content>\n\n'/*ion-inline-end:"/Users/demetriomortelliti/Desktop/demy/PROJECTS/appkwondo/clients/ion2kwondo/src/pages/home/home.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["t" /* ToastController */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["i" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_app_availability__["a" /* AppAvailability */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["p" /* Platform */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_1__providers_socket_service_socket_service__["a" /* SocketService */], __WEBPACK_IMPORTED_MODULE_2__providers_backend_backend__["a" /* BackendProvider */]])
], HomePage);

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 142:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GaraPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_backend_backend__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_matchesforatleta_matchesforatleta__ = __webpack_require__(520);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_chat_chat__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_map_map__ = __webpack_require__(529);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_broadcast_broadcast__ = __webpack_require__(530);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_filters_filters__ = __webpack_require__(531);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_tkdtlive_tkdtlive__ = __webpack_require__(532);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_medagliereglobale_medagliereglobale__ = __webpack_require__(533);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_device_feedback__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_lodash_cloneDeep__ = __webpack_require__(671);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_lodash_cloneDeep___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12_lodash_cloneDeep__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};















/*
  Generated class for the GaraPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var GaraPage = (function () {
    function GaraPage(alertCtrl, loadingCtrl, modalCtrl, deviceFeedback, events, backend, navCtrl, navParams) {
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.modalCtrl = modalCtrl;
        this.deviceFeedback = deviceFeedback;
        this.events = events;
        this.backend = backend;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.gara = {
            gara: {
                rows: []
            },
            matchesbyprog: {
                rows: []
            },
            matchesbyatleta: {
                rows: []
            },
            cronaca: {
                rows: []
            }
        };
        this.displayedgara = {
            gara: {
                rows: []
            },
            matchesbyprog: {
                rows: []
            },
            matchesbyatleta: {
                rows: []
            },
            cronaca: {
                rows: []
            }
        };
        this.displayediscritti = [];
        this.view = "matchesbyprog";
        this.selectedtab = 0;
        this.realtimecount = 0;
        this.jgara = {};
        this.viewInfobar = false;
        this.loading = false;
        this.loading2 = true;
        this.iscritti = [];
        this.showIscritti = false;
        this.atletiiscritti = [];
        this.filters = {
            giornogara: "all",
            sesso: "",
            categoria: "",
            medaglie: "",
            quadrato: ""
        };
        this.filtersApplied = false;
        this.categoriecoperte = {};
        this.activegiorno = 0;
        this.info = {};
        this.totalepunti = 0;
        var questo = this;
        this.events.subscribe("updategara", function (msg, time) {
            console.log("refreshgara in gara.ts !!");
            questo.refreshCurrentGara(function (data) {
                questo.backend.syncConsoles(questo.gara.matchesbyprog);
                // questo.events.publish("realtimematches",questo.gara.matchesbyprog);
                questo.events.publish("consolessynced", questo.gara.matchesbyprog);
                questo.events.publish("updatematchesforatleta", questo.gara.matchesbyprog);
            });
        });
    }
    GaraPage.prototype.broadcastMatch = function (m) {
        if (true)
            return;
        var bid = m.garaid + "_" + m.id;
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__pages_broadcast_broadcast__["a" /* BroadcastPage */], {
            broadcastid: bid
        });
    };
    GaraPage.prototype.ionViewWillEnter = function () {
        var questo = this;
        this.events.subscribe("hwbackbutton", function (data) {
            console.log("hwbackbutton in gare.ts");
            questo.navCtrl.pop();
        });
    };
    GaraPage.prototype.ionViewWillLeave = function () {
        this.events.unsubscribe("hwbackbutton");
    };
    GaraPage.prototype.ionViewDidLoad = function () {
        var questo = this;
        questo.backend.setBackButtonAction(questo.navBar, questo.navCtrl);
        questo.backend.setupNavbarBack(questo.navBar, questo.navCtrl);
        questo.garaid = questo.navParams.get("id");
        console.log('ionViewDidLoad GaraPage', this.garaid);
        questo.refresh(function (data) {
            questo.content.resize();
        });
    };
    GaraPage.prototype.refresh = function (callback) {
        var questo = this;
        questo.loading = true;
        //questo.atletiiscritti = [];
        var atletiiscritti = [];
        questo.backend.getGara(questo.garaid, function (d) {
            var data = Object.assign({}, d);
            console.log("got gara in getgara", data, data.matchesbyprog.rows.length);
            // questo.gara = data;
            questo.gara = Object.assign({}, data);
            console.log("sono qui");
            questo.jgara = data.gara.rows[0].doc;
            console.log("e poi qui");
            var rtcount = 0;
            if (questo.gara.matchesbyprog.rows.length == 0)
                questo.showIscritti = true;
            questo.gara.matchesbyprog.rows.forEach(function (item, idx) {
                var doc = item.doc;
                var imgsrc = "matchtoplay.png";
                if (doc.disputato == "yes") {
                    imgsrc = "matchko.png";
                    if (doc.vinto == "yes")
                        imgsrc = "matchok.png";
                }
                doc.imgsrc = "assets/img/" + imgsrc;
                if (doc.realtime) {
                    if (String(doc.realtime) == "true")
                        rtcount++;
                }
                //doc.tkdtcategoria=questo.backend.getTkdtCategoria(doc.atletaid);
            });
            /*
            questo.gara.matchesbyatleta.rows.forEach(function (item, idx) {
              item.tkdtcategoria=questo.backend.getTkdtCategoria(item.id);
      
            });
            */
            console.log("gara", questo.gara);
            console.log("jgara", questo.jgara);
            questo.realtimecount = rtcount;
            questo.iscritti = questo.jgara.iscritti.split(",");
            if (questo.jgara.iscritti.trim() == "")
                questo.iscritti = [];
            console.log("QUESTO.ISCRITTI", questo.iscritti);
            if (questo.filtersApplied) {
                questo.iscritti = questo.filterIscritti(questo.iscritti);
            }
            questo.iscritti.forEach(function (item, idx) {
                var atl = questo.getAtletaIscritto(item);
                atl.tkdtcat = questo.getTkdtAtleta(atl);
                //atl.tkdtcategoria=questo.backend.getTkdtCategoria(atl.id);
                atletiiscritti.push(atl);
            });
            atletiiscritti.sort(function (a, b) {
                var a1 = a.cognome + a.nome;
                var b1 = b.cognome + b.nome;
                if (a1 > b1)
                    return 1;
                if (a1 < b1)
                    return -1;
                return 0;
            });
            if (true) {
                console.log("testpoint1, questo.gara", questo.gara.matchesbyprog.rows.length, questo.gara);
                //callback();
                //return;
            }
            if (questo.filtersApplied) {
                questo.displayedgara = questo.filterGara(questo.gara);
            }
            else {
                //questo.displayedgara = Object.assign({},questo.gara);
                questo.displayedgara = __WEBPACK_IMPORTED_MODULE_12_lodash_cloneDeep__(questo.gara);
                console.log("no filters to apply", questo.displayedgara, questo.gara);
            }
            console.log("questo.displayedgara", questo.displayedgara.matchesbyprog.rows.length, questo.displayedgara);
            var mbp = [];
            questo.displayedgara.matchesbyprog.rows.forEach(function (item, idx) {
                if (item.doc.dadisputare == "yes")
                    mbp.push(item);
            });
            console.log("mbp", mbp.length, mbp);
            questo.displayedgara.matchesbyprog.rows = mbp;
            console.log("displayedgara", questo.displayedgara);
            console.log("atletiiscritti", atletiiscritti);
            atletiiscritti.forEach(function (item, idx) {
                var nmatches = questo.getMatches(item);
                item.nmatches = nmatches;
            });
            questo.atletiiscritti = atletiiscritti;
            questo.loading = false;
            questo.info.dadisputare = questo.gara.matchesbyprog;
            questo.info.disputati = questo.backend.filterRows(questo.gara.matchesbyprog, { disputato: "yes" });
            questo.info.vinti = questo.backend.filterRows(questo.gara.matchesbyprog, { disputato: "yes", vinto: "yes" });
            questo.info.persi = questo.backend.filterRows(questo.gara.matchesbyprog, { disputato: "yes", vinto: "no" });
            console.log("questo.info", questo.info);
            questo.categoriecoperte = questo.getCategorieCoperte();
            console.log("categorie coperte", questo.categoriecoperte);
            questo.getPuntiTotali();
            if (callback)
                callback(data);
        });
    };
    GaraPage.prototype.refreshCurrentGara = function (callback) {
        var questo = this;
        questo.loading = true;
        var atletiiscritti = [];
        questo.showIscritti = false;
        questo.backend.getCurrentGara(function (data) {
            //let data= Object.assign({}, d);
            console.log("got gara", data, data.matchesbyprog.rows.length);
            questo.gara = data;
            console.log("sono qui");
            questo.jgara = data.gara.rows[0].doc;
            console.log("e poi qui");
            var rtcount = 0;
            if (questo.gara.matchesbyprog.rows.length == 0)
                questo.showIscritti = true;
            questo.gara.matchesbyprog.rows.forEach(function (item, idx) {
                var doc = item.doc;
                var imgsrc = "matchtoplay.png";
                if (doc.disputato == "yes") {
                    imgsrc = "matchko.png";
                    if (doc.vinto == "yes")
                        imgsrc = "matchok.png";
                }
                doc.imgsrc = "assets/img/" + imgsrc;
                if (doc.realtime) {
                    if (String(doc.realtime) == "true")
                        rtcount++;
                }
                //doc.tkdtcategoria=questo.backend.getTkdtCategoria(doc.atletaid);
            });
            /*
            questo.gara.matchesbyatleta.rows.forEach(function (item, idx) {
              item.tkdtcategoria=questo.backend.getTkdtCategoria(item.id);
      
            });
            */
            console.log("gara", questo.gara);
            console.log("jgara", questo.jgara);
            questo.realtimecount = rtcount;
            questo.iscritti = questo.jgara.iscritti.split(",");
            if (questo.jgara.iscritti.trim() == "")
                questo.iscritti = [];
            questo.iscritti.forEach(function (item, idx) {
                var atl = questo.getAtletaIscritto(item);
                //atl.tkdtcategoria=questo.backend.getTkdtCategoria(atl.id);
                atletiiscritti.push(atl);
            });
            atletiiscritti.sort(function (a, b) {
                var a1 = a.cognome + a.nome;
                var b1 = b.cognome + b.nome;
                if (a1 > b1)
                    return 1;
                if (a1 < b1)
                    return -1;
                return 0;
            });
            if (questo.filtersApplied) {
                questo.displayedgara = questo.filterGara(questo.gara);
            }
            else
                questo.displayedgara = questo.gara;
            console.log("displayedgara", questo.displayedgara);
            console.log("atletiiscritti", atletiiscritti);
            atletiiscritti.forEach(function (item, idx) {
                var nmatches = questo.getMatches(item);
                item.nmatches = nmatches;
            });
            questo.atletiiscritti = atletiiscritti;
            questo.loading = false;
            questo.info.dadisputare = questo.backend.filterRows(questo.gara.matchesbyprog, { dadisputare: "yes" });
            questo.info.disputati = questo.backend.filterRows(questo.gara.matchesbyprog, { disputato: "yes" });
            questo.info.vinti = questo.backend.filterRows(questo.gara.matchesbyprog, { disputato: "yes", vinto: "yes" });
            questo.info.persi = questo.backend.filterRows(questo.gara.matchesbyprog, { disputato: "yes", vinto: "no" });
            console.log("questo.info", questo.info);
            questo.categoriecoperte = questo.getCategorieCoperte();
            console.log("categorie coperte", questo.categoriecoperte);
            //questo.getPuntiTotali();
            questo.getPuntiTotali();
            if (callback)
                callback(data);
        });
    };
    GaraPage.prototype.doRefreshStandAlone = function () {
        var questo = this;
        questo.loading = true;
        questo.refresh(function (data) {
            questo.loading = false;
        });
    };
    GaraPage.prototype.doRefresh = function (refresher) {
        console.log('Begin async operation', refresher);
        var questo = this;
        questo.refresh(function (data) {
            //console.log("allnews", data);
            refresher.complete();
        });
    };
    GaraPage.prototype.getImg = function (m) {
        //console.log("getImg", m);
        var imgsrc = "matchtoplay.png";
        if (m.doc.disputato == "yes") {
            imgsrc = "matchko.png";
            if (m.doc.vinto == "yes")
                imgsrc = "matchok.png";
            if (m.doc.medagliamatch) {
                if (m.doc.medagliamatch != "none") {
                    imgsrc = "medaglia_" + m.doc.medagliamatch + ".png";
                }
            }
        }
        if (m.doc.realtime) {
            if (String(m.doc.realtime) == "true")
                imgsrc = "greenblink.gif";
        }
        imgsrc = "assets/img/" + imgsrc;
        //console.log("imgsrc", imgsrc);
        return imgsrc;
    };
    GaraPage.prototype.getImgPerAtleta = function (m) {
        //console.log("getImgPerAtleta", m);
        var imgsrc = "matchtoplay.png";
        var medaglia = "none";
        m.matchesarray.forEach(function (item, idx) {
            if (item.medagliamatch != "none") {
                medaglia = item.medagliamatch;
            }
        });
        if (medaglia != "none")
            imgsrc = "medaglia_" + medaglia + ".png";
        imgsrc = "assets/img/" + imgsrc;
        //console.log("imgsrc", imgsrc);
        return imgsrc;
    };
    GaraPage.prototype.getCategoria = function (dn) {
        return this.backend.getCategoria(dn, this.gara.gara.rows[0].doc.data);
    };
    GaraPage.prototype.getVintoText = function (m) {
        var text = "Non disputato";
        if (m.disputato == "yes") {
            if (m.vinto == "yes")
                text = "Vinto,";
            if (m.vinto == "no")
                text = "Perso,";
            text = text + " risultato: " + m.risultato;
        }
        return text;
    };
    GaraPage.prototype.getClass = function (m) {
        var cl = "nondisputato";
        if (m.disputato == "yes") {
            if (m.vinto == "yes")
                cl = "vinto";
            if (m.vinto == "no")
                cl = "perso";
        }
        if (m.dadisputare == "no")
            cl = "danondisputare";
        return cl;
    };
    GaraPage.prototype.showMatchesForAtleta = function (aid) {
        console.log("showmatchesforatleta", aid);
        //var atl=this.backend.getAtletaById(aid);
        //console.log("atl",atl);
        var mfa = [];
        this.gara.matchesbyprog.rows.forEach(function (item, idx) {
            if (item.doc.atletaid == aid)
                mfa.push(item);
        });
        console.log("mfa", mfa);
        var questo = this;
        questo.backend.playFeedback();
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__pages_matchesforatleta_matchesforatleta__["a" /* MatchesforatletaPage */], {
            gara: questo.gara,
            atletaid: aid,
            mfa: mfa
        }, questo.backend.navOptions);
    };
    GaraPage.prototype.getAtletaIscritto = function (i) {
        return this.backend.getAtletaById(i);
    };
    GaraPage.prototype.getArrLen = function (m) {
        if (!m)
            return 0;
        //console.log("m",m);
        var arr = m.split(",");
        var l = arr.length;
        if (m.trim() == "")
            l = 0;
        return l;
    };
    GaraPage.prototype.toggleInfobar = function () {
        this.viewInfobar = !this.viewInfobar;
        this.backend.playFeedback();
        //this.deviceFeedback.acoustic();
    };
    GaraPage.prototype.tapSegment = function () {
        console.log("tapSegment");
        this.backend.playFeedback();
        //this.deviceFeedback.acoustic();
    };
    GaraPage.prototype.getMedals = function () {
        var ret = {
            ori: 0,
            arg: 0,
            bro: 0
        };
        this.gara.matchesbyprog.rows.forEach(function (item, idx) {
            var doc = item.doc;
            if (doc.medagliamatch == "oro")
                ret.ori++;
            if (doc.medagliamatch == "bronzo")
                ret.bro++;
            if (doc.medagliamatch == "argento")
                ret.arg++;
        });
        return ret;
    };
    GaraPage.prototype.gotoChat = function () {
        var questo = this;
        //this.deviceFeedback.acoustic();
        questo.backend.playFeedback();
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__pages_chat_chat__["a" /* ChatPage */], {}, questo.backend.navOptions);
    };
    GaraPage.prototype.hasAvversario = function (m) {
        var retvalue = false;
        if (m.hasOwnProperty("avversario")) {
            if (m.avversario) {
                if (m.avversario.trim() != "")
                    retvalue = true;
            }
        }
        return retvalue;
    };
    GaraPage.prototype.hasMap = function () {
        var retvalue = false;
        if (this.jgara.maplocation) {
            if (this.jgara.maplocation.trim() != "")
                retvalue = true;
        }
        return retvalue;
    };
    GaraPage.prototype.hasTabulatoUrl = function () {
        var retvalue = false;
        if (this.jgara.tabulatourl) {
            if (this.jgara.tabulatourl.trim() != "")
                retvalue = true;
        }
        return retvalue;
    };
    GaraPage.prototype.showTabulatoUrl = function () {
        var questo = this;
        questo.backend.openUrlInBrowser(questo.jgara.tabulatourl);
    };
    GaraPage.prototype.showMap = function () {
        this.backend.playFeedback();
        //this.deviceFeedback.acoustic();
        var questo = this;
        //var url=questo.sanitizer.bypassSecurityTrustUrl(jgara.maplocation);
        //this.backend.openUrl(this.jgara.maplocation);
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__pages_map_map__["a" /* MapPage */], {
            mapsrc: questo.jgara.maplocation
        }, questo.backend.navOptions);
    };
    GaraPage.prototype.getMaschiFemmine = function (m, sucosa) {
        return this.backend.getMaschiFemmine(m, sucosa);
    };
    GaraPage.prototype.getCronacaTime = function (t) {
        var m = __WEBPACK_IMPORTED_MODULE_11_moment__(t, "YYYYMMDDHHmmSS").format("DD/MM/YYYY HH:mm:SS");
        return m;
    };
    GaraPage.prototype.getMatches = function (atl) {
        var questo = this;
        // var arr=this.backend.filterRows(questo.backend.activegara.matchesbyprog,{atletaid: atl.id},true);
        var arr = this.backend.filterRows(questo.gara.matchesbyprog, { atletaid: atl.id }, true);
        //console.log("getmatches",arr);
        return arr.rows.length;
    };
    GaraPage.prototype.getDerbyText = function (id) {
        var m = this.backend.getMatchById(id);
        console.log("getderbytext for", id, m);
        var atl = this.backend.getAtletaById(m.rows[0].doc.atletaid);
        var retvalue = "derby con " + atl.cognome + " " + atl.nome + " !!";
        retvalue = retvalue.toUpperCase();
        if (!id)
            retvalue = "";
        return retvalue;
    };
    /*
      getTkdtCategoria(atletaid){
    
        var atleta=this.backend.getAtletaById(atletaid);
        console.log("atleta",atleta);
        
      
        var tkdtatleta=this.backend.getTkdtAtleta(atleta);
        console.log("tkdtatleta",tkdtatleta);
     
        var cateta=atleta.sesso.toUpperCase()+" "+tkdtatleta.catpeso+"kg - "+tkdtatleta.catcintura;
        if (tkdtatleta.nome=="atleta non trovato") cateta="Categoria ufficiale non disponibile";
        return cateta;
        
      }
      */
    GaraPage.prototype.setFilters = function () {
        var questo = this;
        questo.backend.playFeedback();
        var giornogara = String(questo.activegiorno);
        var garadoc = questo.gara.gara.rows[0].doc;
        var giornigara = 1;
        console.log("garadoc", garadoc);
        if (garadoc.hasOwnProperty("ngiorni")) {
            console.log("c'è ngiorni in gara", garadoc.ngiorni);
            if (String(garadoc.ngiorni).trim() != "") {
                giornigara = parseInt(garadoc.ngiorni, 10);
            }
        }
        var params = __WEBPACK_IMPORTED_MODULE_12_lodash_cloneDeep__(questo.filters);
        params.giornigara = giornigara;
        params.datagara0 = garadoc.data;
        // params.giornogara=
        console.log("passing following params to moddal filers", params);
        var profileModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_7__pages_filters_filters__["a" /* FiltersPage */], params);
        profileModal.onDidDismiss(function (mdata) {
            console.log("modal return", mdata);
            if (mdata) {
                delete mdata.giornigara;
                questo.filters = mdata;
                questo.filtersApplied = false;
                for (var k in questo.filters) {
                    if (k == "giornogara") {
                        if (questo.filters[k].trim() != "all")
                            questo.filtersApplied = true;
                    }
                    else {
                        if (questo.filters[k].trim() != "")
                            questo.filtersApplied = true;
                    }
                }
                questo.refresh(function (data) {
                    console.log("refreshed");
                });
            }
        });
        profileModal.present();
    };
    GaraPage.prototype.getFiltersClass = function () {
        var retvalue = "filt";
        if (this.filtersApplied) {
            retvalue = "filt filtapplied";
        }
        else {
            retvalue = "filt";
        }
        return retvalue;
    };
    GaraPage.prototype.getFiltersText = function () {
        var retvalue = "Filtri";
        if (this.filtersApplied) {
            retvalue = "Filtri applicati";
        }
        else {
            retvalue = "Filtri";
        }
        return retvalue;
    };
    GaraPage.prototype.filterGara = function (data) {
        console.log("filterGara", data);
        var arrmpb = [];
        var arrmpa = [];
        var questo = this;
        data.matchesbyprog.rows.forEach(function (item, idx) {
            var match = item.doc;
            var atl = questo.backend.getAtletaById(match.atletaid);
            //console.log("atl",atl);
            //SESSO
            var doIt = true;
            if (questo.filters.sesso.trim() != "") {
                if (atl.sesso.toLowerCase() != questo.filters.sesso.toLowerCase()) {
                    doIt = doIt && false;
                    //console.log("aggiunto match mbp",item);
                }
            }
            //CATEGORIA
            if (questo.filters.categoria.trim() != "") {
                if (atl.categoria.toLowerCase() != questo.filters.categoria.toLowerCase()) {
                    doIt = doIt && false;
                    //console.log("aggiunto match mba",item);
                }
            }
            //MEDAGLIA
            if (questo.filters.medaglie.trim() != "") {
                if (match.medagliamatch.toLowerCase() != questo.filters.medaglie.toLowerCase()) {
                    doIt = doIt && false;
                    //console.log("aggiunto match mba",item);
                }
            }
            //QUADRATO
            if (questo.filters.quadrato.trim() != "") {
                var quad = match.matchid.substring(0, match.matchid.length - 2);
                //console.log("matchid",match.matchid,"quad",quad);
                if (quad.toLowerCase() != questo.filters.quadrato.toLowerCase()) {
                    doIt = doIt && false;
                    //console.log("aggiunto match mba",item);
                }
            }
            //GIORNO
            if ((questo.filters.giornogara.trim() != "") && (questo.filters.giornogara.trim() != "all")) {
                if (match.hasOwnProperty("giornogara")) {
                    if (match.giornogara.toLowerCase() != questo.filters.giornogara.toLowerCase()) {
                        doIt = doIt && false;
                        //console.log("aggiunto match mba",item);
                    }
                }
            }
            if (doIt)
                arrmpb.push(item);
        });
        data.matchesbyatleta.rows.forEach(function (item, idx) {
            var match = item;
            var atl = questo.backend.getAtletaById(match.id);
            //console.log("atl",atl);
            //SESSO
            var doIt = true;
            if (questo.filters.sesso.trim() != "") {
                if (atl.sesso.toLowerCase() != questo.filters.sesso.toLowerCase()) {
                    doIt = doIt && false;
                    //console.log("aggiunto match mba",item);
                }
            }
            //CATEGORIA
            if (questo.filters.categoria.trim() != "") {
                if (atl.categoria.toLowerCase() != questo.filters.categoria.toLowerCase()) {
                    doIt = doIt && false;
                    //console.log("aggiunto match mba",item);
                }
            }
            //MEDAGLIA
            if (questo.filters.medaglie.trim() != "") {
                var med = "";
                match.matchesarray.forEach(function (mitem, midx) {
                    if (mitem.medagliamatch != "none")
                        med = mitem.medagliamatch;
                });
                if (med.toLowerCase() != questo.filters.medaglie.toLowerCase()) {
                    doIt = doIt && false;
                    //console.log("aggiunto match mba",item);
                }
            }
            if (doIt)
                arrmpa.push(item);
        });
        //console.log("dopo filtermatches",data);
        data.matchesbyprog.rows = arrmpb;
        data.matchesbyatleta.rows = arrmpa;
        return data;
    };
    GaraPage.prototype.filterIscritti = function (data) {
        console.log("filterIscritti", data);
        var arr = [];
        var questo = this;
        data.forEach(function (item, idx) {
            var atl = questo.backend.getAtletaById(item);
            //console.log("atl",atl);
            //SESSO
            var doIt = true;
            if (questo.filters.sesso.trim() != "") {
                if (atl.sesso.toLowerCase() != questo.filters.sesso.toLowerCase()) {
                    doIt = doIt && false;
                    //console.log("aggiunto match mbp",item);
                }
            }
            //CATEGORIA
            if (questo.filters.categoria.trim() != "") {
                if (atl.categoria.toLowerCase() != questo.filters.categoria.toLowerCase()) {
                    doIt = doIt && false;
                    //console.log("aggiunto match mba",item);
                }
            }
            if (doIt)
                arr.push(item);
        });
        return arr;
    };
    GaraPage.prototype.getMedagliereGlobale = function () {
        var questo = this;
        questo.backend.playFeedback();
        console.log("tkdt_id", questo.jgara.tkdt_id);
        if (!questo.jgara.hasOwnProperty("tkdt_id")) {
            questo.backend.showAlert("Dati ufficiali di gara non disponibili per questa gara");
            return;
        }
        if (questo.jgara.tkdt_id.trim() == "") {
            questo.backend.showAlert("Dati ufficiali di gara non disponibili per questa gara");
            return;
        }
        var profileModal = questo.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_9__pages_medagliereglobale_medagliereglobale__["a" /* MedagliereglobalePage */], { gara: questo.gara.gara.rows[0].doc });
        profileModal.present();
        if (true)
            return;
        var tkdt_rooturl = "https://www.tkdtechnology.it/index.php/welcome/";
        var tkdt_garaid = questo.gara.gara.rows[0].doc.tkdt_id;
        var giornataid;
        if (!giornataid) {
            if (questo.jgara.tkdt) {
                if (questo.jgara.tkdt.giorni) {
                    if (questo.jgara.tkdt.giorni.length > 0) {
                        giornataid = questo.jgara.tkdt.giorni[0].id;
                        console.log("using giornataid from tkdt structure", giornataid);
                    }
                }
            }
        }
        var url = questo.backend.rooturl + "/tkdt/medagliereglobale/" + giornataid;
        //var caricamentotext = imgtext + "Caricamento in corso...."
        questo.loading = true;
        questo.backend.fetchText(url, function (data) {
            questo.loading = false;
            console.log("got medagliere globale", data);
            var profileModal = questo.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_9__pages_medagliereglobale_medagliereglobale__["a" /* MedagliereglobalePage */], { html: data });
            profileModal.present();
        });
    };
    GaraPage.prototype.hasTkdt = function () {
        var retvalue = true;
        var questo = this;
        if (!questo.jgara.hasOwnProperty("tkdt"))
            retvalue = false;
        return retvalue;
    };
    GaraPage.prototype.showTkdtLive = function () {
        var _this = this;
        var questo = this;
        console.log(questo.jgara.tkdt);
        var alrt = this.alertCtrl.create();
        alrt.setTitle('Giorno');
        var datagara = questo.jgara.data;
        questo.jgara.tkdt.giorni.forEach(function (item, idx) {
            var mdatagara = __WEBPACK_IMPORTED_MODULE_11_moment__(datagara, "DD/MM/YYYY");
            var tkdtdata = mdatagara.add(idx, 'days');
            var strtkdtdata = tkdtdata.format("DD/MM/YYYY");
            alrt.addInput({ type: 'radio', label: strtkdtdata, value: idx, checked: false });
        });
        alrt.addButton('Annulla');
        alrt.addButton({
            text: 'OK',
            handler: function (data) {
                console.log("data", data);
                //alrt.dismiss();
                var doIt = false;
                if (data == 0)
                    doIt = true;
                if (data == 1)
                    doIt = true;
                if (data == 2)
                    doIt = true;
                if (data == 3)
                    doIt = true;
                if (data == 4)
                    doIt = true;
                if (data == 5)
                    doIt = true;
                if (doIt) {
                    console.log("data ci sta", data);
                    alrt.dismiss();
                    var mdatagara = __WEBPACK_IMPORTED_MODULE_11_moment__(datagara, "DD/MM/YYYY");
                    var tkdtdata = mdatagara.add(data, 'days');
                    var strtkdtdata = tkdtdata.format("DD/MM/YYYY");
                    _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_8__pages_tkdtlive_tkdtlive__["a" /* TkdtlivePage */], {
                        giornoid: questo.jgara.tkdt.giorni[data].id,
                        data: strtkdtdata
                    });
                    return false;
                }
            }
        });
        alrt.present();
    };
    GaraPage.prototype.getPuntiTotali = function () {
        var questo = this;
        var ori = questo.getMedals().ori;
        var arg = questo.getMedals().arg;
        var bro = questo.getMedals().bro;
        var totpunti = ori * 7 + arg * 3 + bro;
        console.log("ori", ori, "arg", arg, "bro", "bro", "totpunti", totpunti);
        questo.totalepunti = totpunti;
        return totpunti;
    };
    GaraPage.prototype.getCategorieCoperte = function (societa) {
        var questo = this;
        if (!societa)
            societa = "A.S.D. TAEKWONDO ROZZANO";
        //if (questo.jgara.title=="Olympic Dream Cup") societa="Lombardia";
        console.log("getCategorieCoperte", societa, questo.jgara);
        var result = {
            cats: [],
            text: "Dati ufficiali categorie non disponibili"
        };
        if (!questo.jgara.hasOwnProperty("tkdt"))
            return result;
        if (questo.jgara) {
            var garadoc = questo.jgara;
            var tkdtiscritti = garadoc.tkdt.atleti;
            if (tkdtiscritti.length == 0)
                tkdtiscritti = garadoc.tkdt.atleti_iscritti;
            var roz_1 = questo.backend.filterArray(tkdtiscritti, {
                societa: societa
            }, true);
            //console.log($roz);
            //sort by categoria
            roz_1.sort(function (a, b) {
                var a1 = a.catcintura + a.cateta + a.catpeso + a.sesso;
                var b1 = b.catcintura + b.cateta + b.catpeso + b.sesso;
                if (a1 > b1)
                    return 1;
                if (a1 < b1)
                    return -1;
                return 0;
            });
            //scan categorie
            var cat = "";
            var catcount = 0;
            var res = [];
            roz_1.forEach(function (item, i) {
                var atl = roz_1[i];
                var cateta = atl.cateta;
                var catpeso = atl.catpeso;
                var catcintura = atl.catcintura;
                var sesso = atl.sesso;
                var catx = catcintura + cateta + catpeso + sesso;
                if (catx != cat) {
                    //count = 0;
                    var newcat = {
                        cateta: cateta,
                        catpeso: catpeso,
                        catcintura: catcintura,
                        sesso: sesso,
                        atleti: []
                    };
                    res.push(newcat);
                    catcount++;
                    cat = catx;
                }
                var lastres = res[res.length - 1];
                lastres.atleti.push(atl);
                //count++;
            });
            //console.log(res);
            var text = res.length + " categorie coperte con  " + roz_1.length + " atleti";
            console.log(text);
            res.forEach(function (ritem, ri) {
                var r = res[ri];
                //console.log(r.sesso+" - "+r.cateta+" - "+r.catcintura+" - "+r.catpeso+": "+r.atleti.length+" atleti");
            });
            result.cats = res;
            result.text = text;
        }
        return result;
    };
    GaraPage.prototype.getTkdtAtleta = function (atl) {
        var tkdtatl = this.backend.getTkdtAtleta(atl);
        //console.log("tkdtatl",tkdtatl);
        var ret = tkdtatl.sesso + " " + tkdtatl.catcintura + " " + tkdtatl.catpeso + " kg";
        if (ret.indexOf("-- -- --") > -1)
            ret = "";
        return ret;
    };
    GaraPage.prototype.selectIscritti = function () {
        var questo = this;
        var profileModal = this.modalCtrl.create('IscrittiPage', { gara: questo.gara });
        profileModal.onDidDismiss(function (data) {
            if (data) {
                var iscritti = data.iscr;
                if (data.count == 0)
                    iscritti = "";
                console.log("iscritti selezionati", data);
                var garabody = questo.gara.gara.rows[0].doc;
                garabody.iscritti = iscritti;
                var url = questo.backend.rooturl + "/gare/update";
                var loading_1 = questo.loadingCtrl.create({
                    spinner: 'dots',
                    content: "Salvataggio iscritti in corso...."
                });
                loading_1.onDidDismiss(function () {
                    console.log('Dismissed loading');
                });
                loading_1.present();
                questo.backend.postData(url, garabody, function (sdata) {
                    console.log(sdata);
                    loading_1.dismiss();
                    questo.refreshCurrentGara(function () { });
                });
            }
        });
        profileModal.present();
    };
    GaraPage.prototype.hasLinks = function () {
        var questo = this;
        var retvalue = false;
        if (questo.jgara.hasOwnProperty("links")) {
            if (questo.jgara.links.length > 0)
                retvalue = true;
        }
        return retvalue;
    };
    GaraPage.prototype.showLinks = function () {
        var questo = this;
        var inputs = [];
        if (!questo.hasLinks())
            return;
        var parola = "link associato";
        if (questo.jgara.links.length > 1)
            parola = "links associati";
        questo.jgara.links.forEach(function (item, idx) {
            var newinp = {
                type: "radio",
                label: item.title,
                value: item.url
            };
            inputs.push(newinp);
        });
        var alert = questo.alertCtrl.create({
            title: 'Links gara',
            subTitle: 'Questa gara ha ' + questo.jgara.links.length + ' ' + parola + '.<br>Seleziona il link da visualizzare e premi VISUALIZZA',
            inputs: inputs,
            buttons: [
                {
                    text: 'Chiudi',
                    handler: function (data) {
                        //alert.dismiss();
                    }
                },
                {
                    text: 'Visualizza',
                    handler: function (data) {
                        if (data) {
                            questo.backend.openUrlInBrowser(data);
                        }
                        //alert.dismiss();
                    }
                }
            ]
        });
        alert.present();
    };
    return GaraPage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* Navbar */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* Navbar */])
], GaraPage.prototype, "navBar", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Content */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Content */])
], GaraPage.prototype, "content", void 0);
GaraPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-gara',template:/*ion-inline-start:"/Users/demetriomortelliti/Desktop/demy/PROJECTS/appkwondo/clients/ion2kwondo/src/pages/gara/gara.html"*/'<!--\n  Generated template for the GaraPage page.\n\n  See http://ionicframework.com/docs/v2/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Gara</ion-title>\n    <ion-buttons end>\n        <button *ngIf="hasTkdt()" ion-button style="font-size: 18px" (tap)="showTkdtLive()">\n            <ion-icon name="pulse"></ion-icon>\n    \n          </button>\n        <button *ngIf="hasLinks()" ion-button style="font-size: 18px" (tap)="showLinks()">\n            <ion-icon name="ios-link"></ion-icon>\n    \n          </button>\n      <button *ngIf="hasMap()" ion-button style="font-size: 18px" (tap)="showMap()">\n        <ion-icon name="md-locate"></ion-icon>\n\n      </button>\n\n      <!--<button ion-button style="font-size: 18px" (tap)="gotoChat()">\n        <ion-icon name="md-chatbubbles">\n          <ion-badge *ngIf="backend.unread>0" color="danger">{{backend.unread}}</ion-badge>\n        </ion-icon>\n\n      </button>-->\n      <button ion-button style="font-size: 18px" (tap)="doRefreshStandAlone()">\n        <ion-icon name="md-refresh"></ion-icon>\n      </button>\n\n    </ion-buttons>\n  </ion-navbar>\n\n  <ion-toolbar class="stoolbar">\n    <div sstyle="background: #ddd; padding: 0px;">\n      <button class="incaston" full color="dark" sstyle="swidth:100%; sfont-size: 14px; stext-align: left; sbackground: #333; scolor: #eee; "\n        (tap)="toggleInfobar()">\n        <ion-row>\n          <ion-col col-1 fixed style="color: gray; ">\n            <ion-icon *ngIf="!viewInfobar" class="gray" name="md-arrow-dropright"></ion-icon>\n            <ion-icon *ngIf="viewInfobar" class="gray" name="md-arrow-dropdown"></ion-icon>\n          </ion-col>\n          <ion-col col-10 style="font-size: 13px;">\n            <b>{{jgara.title}}</b>\n            <!--<i>{{jgara.data}} - {{jgara.location}}</i>-->\n          </ion-col>\n          <ion-col col-1 style="text-align: right">\n            <ion-spinner name="dots" class="spinnerdots" *ngIf="loading"></ion-spinner>\n            <!--<img *ngIf="loading" width="18" height="18" src="assets/img/ajax-loader.gif" />-->\n          </ion-col>\n\n        </ion-row>\n      </button>\n\n      <ion-item *ngIf="viewInfobar" style="padding: 7px !important; background: #eee; font-size: 14px; ">\n\n        <div>\n          <ion-row>\n            <ion-col class="infobold">{{jgara.title}}</ion-col>\n          </ion-row>\n          <ion-row>\n            <ion-col class="infobold">{{jgara.location}} &nbsp;&nbsp;\n              <!--<a (tap)="showMap()" *ngIf="hasMap()">Visualizza mappa</a>-->\n            </ion-col>\n          </ion-row>\n          <ion-row>\n            <ion-col class="infobold">{{jgara.data}}</ion-col>\n          </ion-row>\n          <ion-row *ngIf="hasMap()">\n            <ion-col>\n              <button ion-button small (tap)="showMap()">Visualizza mappa</button>\n            </ion-col>\n          </ion-row>\n          <ion-row *ngIf="hasTabulatoUrl()">\n              <ion-col>\n                <button ion-button small (tap)="showTabulatoUrl()">Visualizza tabulato</button>\n              </ion-col>\n            </ion-row>\n          <ion-row>\n            <ion-col col-5>&nbsp;</ion-col>\n            <ion-col>&nbsp;</ion-col>\n          </ion-row>\n          <ion-row>\n            <ion-col col-5>Iscritti</ion-col>\n            <ion-col class="infobold">{{getArrLen(jgara.iscritti)}} (F: {{getMaschiFemmine(iscritti,\'iscritti\').femmine}}, M: {{getMaschiFemmine(iscritti,\'iscritti\').maschi}})\n              </ion-col>\n          </ion-row>\n          <ion-row>\n            <ion-col col-5>Match da disputare</ion-col>\n            <ion-col class="infobold">{{info.dadisputare.rows.length}} (F: {{getMaschiFemmine(info.dadisputare).femmine}}, M: {{getMaschiFemmine(info.dadisputare).maschi}})\n              </ion-col>\n          </ion-row>\n          <ion-row>\n            <ion-col col-5>Match disputati</ion-col>\n            <ion-col class="infobold">{{info.disputati.rows.length}} (F: {{getMaschiFemmine(info.disputati).femmine}}, M: {{getMaschiFemmine(info.disputati).maschi}})\n              </ion-col>\n          </ion-row>\n          <ion-row>\n            <ion-col col-5>Match vinti</ion-col>\n            <ion-col class="infobold">{{info.vinti.rows.length}} (F: {{getMaschiFemmine(info.vinti).femmine}}, M: {{getMaschiFemmine(info.vinti).maschi}})\n              </ion-col>\n          </ion-row>\n          <ion-row>\n            <ion-col col-5>Match persi</ion-col>\n            <ion-col class="infobold">{{info.persi.rows.length}} (F: {{getMaschiFemmine(info.persi).femmine}}, M: {{getMaschiFemmine(info.persi).maschi}})\n              </ion-col>\n          </ion-row>\n          <ion-row>\n            <ion-col col-12>&nbsp;</ion-col>\n          </ion-row>\n          <ion-row>\n            <ion-col class="infobold">{{categoriecoperte.text}}</ion-col>\n          </ion-row>\n          <ion-row>\n            <ion-col col-12>&nbsp;</ion-col>\n          </ion-row>\n          <ion-row>\n            <ion-col class="infobold">Punteggio totale medaglie: {{totalepunti}}</ion-col>\n          </ion-row>\n          <!--<div>Gara: {{jgara.title}}</div>\n          <div>Location: {{jgara.location}}</div>\n          <div>Data: {{jgara.data}}</div>\n          <div>Iscritti: {{getArrLen(jgara.iscritti)}}</div>-->\n        </div>\n\n      </ion-item>\n      <!--<ion-item style="background: #eee; height: 10px !important; margin: 0px !important; padding: 0px !important;">-->\n      <ion-row style="background: #333">\n        <ion-col col-3>\n          <button (tap)="setFilters()" [ngClass]="getFiltersClass()" ion-button dark small>{{getFiltersText()}}</button>\n        </ion-col>\n        <ion-col col-9 style="text-align: right;">\n          <button ion-button (tap)="getMedagliereGlobale()" small class="filt medals" style="height: 20px; font-size: 14px; margin-right: 7px; justify-content: center;">\n            <span class="ori">ORI: {{getMedals().ori}}</span>\n            <span class="argenti">ARG: {{getMedals().arg}}</span>\n            <span class="bronzi">BRO: {{getMedals().bro}}</span>\n          </button>\n        </ion-col>\n      </ion-row>\n      <!--</ion-item>-->\n      <!--<ion-item *ngIf="gara.gara.rows.length>0" >{{gara.gara.rows[0].doc.title}}</ion-item>-->\n      <ion-segment class="segment" (tap)="tapSegment()" [(ngModel)]="view">\n        <ion-segment-button value="matchesbyprog">\n          <!-- <ion-icon name="camera"></ion-icon>-->Per match\n        </ion-segment-button>\n        <ion-segment-button value="matchesbyatleta">\n          Per atleta\n        </ion-segment-button>\n        <ion-segment-button value="cronaca">\n          Cronaca\n        </ion-segment-button>\n        <ion-segment-button value="iscritti">\n          Iscritti\n        </ion-segment-button>\n        <!-- <ion-segment-button value="infogara">\n            Gara\n          </ion-segment-button>-->\n      </ion-segment>\n    </div>\n  </ion-toolbar>\n\n</ion-header>\n<!--\n<ion-tabs>\n  <ion-tab [root]="tab1Root"></ion-tab>\n  <ion-tab [root]="tab2Root"></ion-tab>\n  <ion-tab [root]="tab3Root"></ion-tab>\n</ion-tabs>\n-->\n\n<ion-content padding>\n\n  <!--<ion-refresher (ionRefresh)="doRefresh($event)">\n    <ion-refresher-content refreshingSpinner="ios">\n    </ion-refresher-content>\n  </ion-refresher>-->\n\n  <ion-card *ngIf="showIscritti">\n    <ion-card-content style="text-align: center">\n      <span style="color: red">Nessun incontro definito</span><br>\n      <div style="height: 105px; text-align: center">\n      <img style="width: 100px; height: 100px; margin: auto; " src="assets/img/fight.png" />\n    </div>\n    </ion-card-content>\n\n  </ion-card>\n  <section id="iscritti" *ngIf="showIscritti || (view==\'iscritti\')">\n    <div style="background: lightblue; padding: 8px;">\n\n      {{iscritti.length}} iscritti a questa gara\n \n    </div>\n    <button *ngIf="(backend.userIsAdmin()) && (gara.gara.rows[0].doc.stato!=\'disputata\') " ion-button block (tap)="selectIscritti()">Seleziona iscritti</button>\n\n    <ion-list *ngFor="let atl of atletiiscritti" class="list-iscritti" >\n    <ion-item class="iscrittiitem" >\n      <button ion-item (tap)="showMatchesForAtleta(atl.id)" detail-none >\n\n      <ion-row>\n        <ion-col>\n            <div class="iscrittonome">{{atl.cognome}} {{atl.nome}}</div>\n            <div class="iscritti">{{atl.sesso}} - {{atl.categoria.toUpperCase()}} </div>\n            <div class="tkdtiscritti">{{atl.tkdtcat}}</div>\n\n        </ion-col>\n        <ion-col col-1>\n            <ion-badge>{{atl.nmatches}}</ion-badge>\n        </ion-col>\n      </ion-row>\n\n      \n  \n        <!--<div class="iscritti">{{atl.tkdtcategoria}}</div>-->\n\n\n      </button>\n\n    </ion-item>\n  </ion-list>\n\n    <!--<ion-item-divider color="light"></ion-item-divider>-->\n\n\n  </section>\n\n\n  <section id="matchesbyprog" [hidden]="view!=\'matchesbyprog\'" sngIf="view==\'matchesbyprog\'">\n\n    <ion-list>\n      <div *ngFor="let m of displayedgara.matchesbyprog.rows">\n        <ion-item *ngIf="m.doc.dadisputare==\'yes\'"  (press)="broadcastMatch(m.doc)" (tap)="showMatchesForAtleta(m.doc.atletaid)">\n          <ion-row>\n            <ion-col col-2>\n              <img width="32" height="32" src="{{getImg(m)}}" />\n            </ion-col>\n            <ion-col>\n              <div class="{{getClass(m.doc)}}">{{m.doc.matchid}}</div>\n              <div class="atleta">{{m.doc.atletaname}}</div>\n              <div class="categoria">{{getCategoria(m.doc.datanascita).toUpperCase()}}</div>\n              <!--<div class="tkdtiscritti">{{getTkdtAtleta(getAtletaIscritto(m.doc.atletaid))}}</div>-->\n              <!--<div class="iscritti">{{m.doc.tkdtcategoria}}</div>-->\n              <div class="{{getClass(m.doc)}}" style="font-weight: normal">{{getVintoText(m.doc)}}</div>\n              <div *ngIf="m.doc.derby && (m.doc.derby!=null)" class="derby">{{backend.getDerbyText(m.doc.derby)}}</div>\n              <div *ngIf="hasAvversario(m.doc)" class="avversario">contro {{m.doc.avversario.split(\'|\')[0]}}<br>{{m.doc.avversario.split(\'|\')[1]}}</div>\n            </ion-col>\n          </ion-row>\n        </ion-item>\n      </div>\n    </ion-list>\n\n\n\n\n  </section>\n  <section id="matchesbyatleta" [hidden]="view!=\'matchesbyatleta\'" sngIf="view==\'matchesbyatleta\'">\n    <ion-list>\n      <ion-item *ngFor="let m of displayedgara.matchesbyatleta.rows" (tap)="showMatchesForAtleta(m.id)">\n        <ion-row>\n          <ion-col col-2>\n            <img width="32" height="32" src="{{getImgPerAtleta(m)}}" />\n          </ion-col>\n          <ion-col>\n\n            <div class="atleta">{{m.nome}}</div>\n            <div class="categoria">{{getCategoria(m.datanascita).toUpperCase()}}</div>\n            <!--<div class="iscritti">{{m.tkdtcategoria}}</div>-->\n            <div class="matches">\n              <span *ngFor="let x of m.matchesarray" class="{{getClass(x)}}">\n                {{x.matchid}}\n              </span>\n            </div>\n          </ion-col>\n        </ion-row>\n      </ion-item>\n    </ion-list>\n\n  </section>\n\n\n\n  <section id="cronaca" [hidden]="view!=\'cronaca\'" sngIf="view==\'cronaca\'">\n    <ion-list>\n      <ion-item *ngFor="let m of gara.cronaca.rows">\n        <ion-row>\n\n          <ion-col>\n\n            <div class="time">{{getCronacaTime(m.time)}}</div>\n            <div class="text">{{m.text}}</div>\n          </ion-col>\n        </ion-row>\n      </ion-item>\n    </ion-list>\n\n  </section>\n\n  <section id="infogara" [hidden]="view!=\'infogara\'" sngIf="view==\'infogara\'">\n    <ion-list style="font-size: 14px">\n\n      <div>Gara: {{jgara.title}}</div>\n      <div>Location: {{jgara.location}}</div>\n      <div>Data: {{jgara.data}}</div>\n      <div>Iscritti: {{getArrLen(jgara.iscritti)}}</div>\n      <br>\n      <div>{{categoriecoperte.text}}</div>\n\n    </ion-list>\n\n  </section>\n\n  <!--<ion-fab right bottom *ngIf="realtimecount>0">\n       <button ion-fab style="font-size: 11px">LIVE!</button>\n     </ion-fab>-->\n\n</ion-content>'/*ion-inline-end:"/Users/demetriomortelliti/Desktop/demy/PROJECTS/appkwondo/clients/ion2kwondo/src/pages/gara/gara.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ModalController */], __WEBPACK_IMPORTED_MODULE_10__ionic_native_device_feedback__["a" /* DeviceFeedback */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */], __WEBPACK_IMPORTED_MODULE_2__providers_backend_backend__["a" /* BackendProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */]])
], GaraPage);

//# sourceMappingURL=gara.js.map

/***/ }),

/***/ 153:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TournamentPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_backend_backend__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__matchconsolerr_matchconsolerr__ = __webpack_require__(552);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__scorekeeper_scorekeeper__ = __webpack_require__(154);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/**
 * Generated class for the TournamentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var TournamentPage = (function () {
    function TournamentPage(events, alertCtrl, backend, navCtrl, navParams) {
        this.events = events;
        this.alertCtrl = alertCtrl;
        this.backend = backend;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loading = false;
        this.garaid = "";
        this.gara = {};
        this.jgara = {};
        this.view = "classifica";
        this.torneo = {
            location: "Rozzano",
            title: "Torneo",
            data: "30/01/2016",
            stato: "nondisputata",
            iscritti: "",
            myiscritti: "",
            maplocation: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2793.9119518989137!2d10.179435214937483!3d45.55209673559614!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x478176e851ea8ee3%3A0x50ceeea9216e679c!2sVia+Luigi+Bazoli%2C+6%2C+25127+Brescia+BS!5e0!3m2!1sit!2sit!4v1453817738979",
            id: "20151019175533",
            ori: 0,
            argenti: 0,
            bronzi: 0,
            ngiorni: "1",
            tabulatourl: "",
            tipo: "combattimento",
            formula: "roundrobin_ar",
            regionalita: "interregionale",
            tkdt_id: "",
            gironi: []
            /*
            gironi: [{
              title: "Girone1",
              players: [{
                nome: "Alfonso",
                cognome: "Faloppi"
              }, {
                nome: "Giacobbe",
                cognome: "Mischioni"
              }, {
                nome: "Pirlone",
                cognome: "Franzers"
              }, {
                nome: "Testadegaz",
                cognome: "Mitropa"
              }]
            }, {
              title: "Girone2",
              players: [{
                nome: "Calippo",
                cognome: "Fallugi"
              }, {
                nome: "Francoccio",
                cognome: "Pitauners"
              }, {
                nome: "Castaldo",
                cognome: "Manghi"
              }, {
                nome: "Malese",
                cognome: "Gorgogli"
              }],
              incontri: []
            }]
             */
        };
        this.activegirone = this.torneo.gironi[0];
        this.activegironeindex = 0;
        this.viewInfobar = false;
        this.colors = ["green", "blue", "orange", "red", "pink", "brown", "purple", "lightblue"];
        console.log("torneo", this.torneo);
        var questo = this;
        this.activegirone = this.torneo.gironi[0];
        questo.torneo.gironi.forEach(function (item, idx) {
            var players = item.players;
            //questo.resetPunteggiGirone(item);
            players.forEach(function (pitem, pidx) {
                pitem.punti = 0;
                pitem.gf = 0;
                pitem.gs = 0;
            });
        });
    }
    TournamentPage.prototype.ionViewWillLeave = function () {
        this.events.unsubscribe("updategara");
    };
    TournamentPage.prototype.ionViewDidLoad = function () {
        var questo = this;
        //questo.backend.setBackButtonAction(questo.navBar, questo.navCtrl);
        //questo.backend.setupNavbarBack(questo.navBar, questo.navCtrl);
        questo.garaid = questo.navParams.get("id");
        console.log('ionViewDidLoad GaraPage', this.garaid);
        questo.events.subscribe("updategara", function (data) {
            console.log("refreshgara in gara.ts !!");
            if (data.garaid == questo.garaid) {
                questo.refresh(function (data) {
                });
            }
        });
        questo.refresh(function (data) {
            //questo.content.resize();
        });
    };
    TournamentPage.prototype.tapSegment = function (ev) {
    };
    TournamentPage.prototype.resetIncontriGirone = function (t) {
        var questo = this;
        questo.backend.showConfirm("Sicuro di voler resettare gli incontri di questo girone ?", function (yes) {
            if (yes) {
                t.incontri = [];
                questo.updateClassificaGirone(t);
            }
        });
    };
    TournamentPage.prototype.createIncontri = function (t, ar, rnd) {
        var questo = this;
        questo.backend.showConfirm("Sicuro di voler resettare gli incontri di questo girone ?", function (yes) {
            if (yes) {
                t.incontri = [];
                var result = [];
                t.incontri = [];
                var array = t.players;
                var count = -1;
                for (var i = 0; i < array.length - 1; i++) {
                    for (var j = i + 1; j < array.length; j++) {
                        count++;
                        var newincontro = {
                            player1: Object.assign({}, array[i]),
                            player2: Object.assign({}, array[j]),
                            punteggio1: "",
                            punteggio2: "",
                            order: count,
                            risultato: ""
                        };
                        //result.push(array[i].nome + " - " + array[j].nome);
                        result.push(newincontro);
                    }
                }
                if (ar) {
                    for (var i = 0; i < array.length - 1; i++) {
                        for (var j = i + 1; j < array.length; j++) {
                            count++;
                            var newincontro = {
                                player2: Object.assign({}, array[i]),
                                player1: Object.assign({}, array[j]),
                                punteggio1: "",
                                punteggio2: "",
                                order: count,
                                risultato: ""
                            };
                            //result.push(array[j].nome + " - " + array[i].nome);
                            result.push(newincontro);
                        }
                    }
                }
                result.sort(function (a, b) {
                    var a1 = a.player1.cognome.toLowerCase() + a.player1.nome.toLowerCase();
                    var b1 = b.player1.cognome.toLowerCase() + b.player1.nome.toLowerCase();
                    if (a1 > b1)
                        return 1;
                    if (a1 < b1)
                        return -1;
                    return 0;
                });
                t.incontri = result;
                questo.updateClassificaGirone(t);
                console.log(t);
            }
        });
    };
    TournamentPage.prototype.getGironePlayerById = function (g, id) {
        var retvalue = {};
        g.players.forEach(function (item, idx) {
            var gid = item.id;
            if (id == gid)
                retvalue = item;
        });
        return retvalue;
    };
    TournamentPage.prototype.updateClassificaGirone = function (g) {
        var questo = this;
        this.resetPunteggiGirone(g);
        g.incontri.forEach(function (item, idx) {
            var inc = item;
            //if (String(inc.punteggio1.trim()) == "") inc.player1.punti = 0;
            //if (String(inc.punteggio2.trim()) == "") inc.player1.punti = 0;
            console.log("incontro", inc);
            if ((String(inc.punteggio1.trim()) != "") && (String(inc.punteggio2.trim()) != "")) {
                var p1 = parseInt(inc.punteggio1, 10);
                var p2 = parseInt(inc.punteggio2, 10);
                var player1 = questo.getGironePlayerById(g, inc.player1.id);
                var player2 = questo.getGironePlayerById(g, inc.player2.id);
                if (p1 > p2)
                    player1.punti += 3;
                if (p1 < p2)
                    player2.punti += 3;
                if (p1 == p2) {
                    player1.punti += 1;
                    player2.punti += 1;
                }
                player1.gf += p1;
                player1.gs += p2;
                player2.gf += p2;
                player2.gs += p1;
            }
        });
        console.log("updateclassifica girone", g);
    };
    TournamentPage.prototype.resetPunteggiGirone = function (g) {
        g.players.forEach(function (item, idx) {
            var inc = item;
            inc.punti = 0;
            inc.gf = 0;
            inc.gs = 0;
        });
        g.incontri.forEach(function (item, idx) {
            var inc = item;
            inc.player1.punti = 0;
            inc.player1.gf = 0;
            inc.player1.gs = 0;
            inc.player2.punti = 0;
            inc.player2.gf = 0;
            inc.player2.gs = 0;
        });
    };
    TournamentPage.prototype.getSortedPlayers = function (p) {
        p.sort(function (a, b) {
            if (a.punti > b.punti)
                return -1;
            if (a.punti < b.punti)
                return 1;
            return 0;
        });
        return p;
    };
    TournamentPage.prototype.getDF = function (p) {
        var retvalue = p.gf - p.gs;
        return retvalue;
    };
    TournamentPage.prototype.addPlayerToGirone = function (g, opts) {
        var questo = this;
        var count = 0;
        questo.torneo.gironi.forEach(function (item, idx) {
            item.players.forEach(function (pitem, pidx) {
                count++;
            });
        });
        count++;
        var nome = String(count);
        var cognome = "player";
        if (opts) {
            nome = opts.nome;
            cognome = opts.cognome;
        }
        var d = new Date();
        var m = __WEBPACK_IMPORTED_MODULE_4_moment__(d).format("YYYYMMDDHHmmssSSS");
        var newplayer = {
            cognome: cognome,
            nome: nome,
            id: m,
            punti: 0,
            gf: 0,
            gs: 0
        };
        g.players.push(newplayer);
    };
    TournamentPage.prototype.getUpperCaseGirone = function (g) {
        return g.title.toUpperCase();
    };
    TournamentPage.prototype.getAtleta = function (p) {
        var retvalue = "";
        if (p.hasOwnProperty("cognome"))
            retvalue += p.cognome;
        if (p.hasOwnProperty("nome"))
            retvalue += " " + p.nome;
        return retvalue;
    };
    TournamentPage.prototype.getNomeAtleta = function (p) {
        var retvalue = "";
        if (p.hasOwnProperty("nome"))
            retvalue = p.nome;
        return retvalue;
    };
    TournamentPage.prototype.getCognomeAtleta = function (p) {
        var retvalue = "";
        if (p.hasOwnProperty("cognome"))
            retvalue = p.cognome;
        return retvalue;
    };
    TournamentPage.prototype.addGirone = function () {
        var questo = this;
        var newgirone = {
            title: "GIRONE" + parseInt(questo.torneo.gironi.length + 1, 10),
            players: [],
            incontri: []
        };
        questo.torneo.gironi.push(newgirone);
        questo.activegironeindex = questo.torneo.gironi.length - 1;
    };
    TournamentPage.prototype.refresh = function (callback) {
        var questo = this;
        questo.loading = true;
        //questo.atletiiscritti = [];
        var atletiiscritti = [];
        questo.backend.getGara(questo.garaid, function (d) {
            var data = Object.assign({}, d);
            console.log("got gara in getgara", data);
            // questo.gara = data;
            questo.gara = Object.assign({}, data);
            console.log("sono qui");
            questo.jgara = data.gara.rows[0].doc;
            questo.torneo = data.gara.rows[0].doc;
            if (!questo.torneo.hasOwnProperty("gironi"))
                questo.torneo.gironi = [];
            console.log("e poi qui");
            var rtcount = 0;
            //if (questo.gara.matchesbyprog.rows.length == 0) questo.showIscritti = true;
            /*
            questo.gara.matchesbyprog.rows.forEach(function (item, idx) {
              var doc = item.doc;
              var imgsrc = "matchtoplay.png";
              if (doc.disputato == "yes") {
                imgsrc = "matchko.png";
                if (doc.vinto == "yes") imgsrc = "matchok.png";
              }
              doc.imgsrc = "assets/img/" + imgsrc;
              if (doc.realtime) {
                if (String(doc.realtime) == "true") rtcount++;
              }
              //doc.tkdtcategoria=questo.backend.getTkdtCategoria(doc.atletaid);
      
      
            })*/
            /*
            questo.gara.matchesbyatleta.rows.forEach(function (item, idx) {
              item.tkdtcategoria=questo.backend.getTkdtCategoria(item.id);
      
            });
            */
            console.log("gara", questo.gara);
            console.log("jgara", questo.jgara);
            //questo.realtimecount = rtcount;
            //questo.iscritti = questo.jgara.iscritti.split(",");
            //if (questo.jgara.iscritti.trim() == "") questo.iscritti = [];
            //console.log("QUESTO.ISCRITTI", questo.iscritti);
            /*if (questo.filtersApplied) {
              questo.iscritti = questo.filterIscritti(questo.iscritti);
            }
      
      
            questo.iscritti.forEach(function (item, idx) {
              var atl = questo.getAtletaIscritto(item);
              atl.tkdtcat = questo.getTkdtAtleta(atl);
              //atl.tkdtcategoria=questo.backend.getTkdtCategoria(atl.id);
      
              atletiiscritti.push(atl);
      
            })
            atletiiscritti.sort(function (a, b) {
              var a1 = a.cognome + a.nome;
              var b1 = b.cognome + b.nome;
              if (a1 > b1) return 1;
              if (a1 < b1) return -1;
              return 0;
            })
      
            if (1 == 1) {
              console.log("testpoint1, questo.gara", questo.gara.matchesbyprog.rows.length, questo.gara);
              //callback();
              //return;
            }
      
            if (questo.filtersApplied) {
              questo.displayedgara = questo.filterGara(questo.gara);
      
      
            } else {
      
              //questo.displayedgara = Object.assign({},questo.gara);
              questo.displayedgara = cloneDeep(questo.gara);
              console.log("no filters to apply", questo.displayedgara, questo.gara);
            }
      
      
            console.log("questo.displayedgara", questo.displayedgara.matchesbyprog.rows.length, questo.displayedgara)
      
            var mbp = [];
            questo.displayedgara.matchesbyprog.rows.forEach(function (item, idx) {
              if (item.doc.dadisputare == "yes") mbp.push(item);
      
            })
            console.log("mbp", mbp.length, mbp);
            questo.displayedgara.matchesbyprog.rows = mbp;
      
      
            console.log("displayedgara", questo.displayedgara);
      
      
      
            console.log("atletiiscritti", atletiiscritti);
            atletiiscritti.forEach(function (item, idx) {
              var nmatches = questo.getMatches(item);
              item.nmatches = nmatches;
      
      
            })
      
      
      
      
      
            questo.atletiiscritti = atletiiscritti;
            
            questo.info.dadisputare = questo.gara.matchesbyprog;
            questo.info.disputati = questo.backend.filterRows(questo.gara.matchesbyprog, { disputato: "yes" });
            questo.info.vinti = questo.backend.filterRows(questo.gara.matchesbyprog, { disputato: "yes", vinto: "yes" });
            questo.info.persi = questo.backend.filterRows(questo.gara.matchesbyprog, { disputato: "yes", vinto: "no" });
            console.log("questo.info", questo.info);
            questo.categoriecoperte = questo.getCategorieCoperte();
            console.log("categorie coperte", questo.categoriecoperte);
      
            questo.getPuntiTotali();
            */
            questo.loading = false;
            if (callback)
                callback(data);
        });
    };
    TournamentPage.prototype.doRefresh = function () {
        var questo = this;
        questo.refresh(function () {
        });
    };
    TournamentPage.prototype.saveTorneo = function () {
        var questo = this;
        console.log(questo.torneo);
        questo.backend.showConfirm("Sei sicuro di voler salvare questo torneo ?", function (yes) {
            if (yes) {
                var isAdded = false;
                if (!questo.torneo.hasOwnProperty("id"))
                    isAdded = true;
                var txt = "salvata";
                if (isAdded)
                    txt = "aggiunta";
                var url = questo.backend.rooturl + "/gare/update";
                if (isAdded)
                    url = questo.backend.rooturl + "/gare/add";
                /* let loading = this.loadingCtrl.create({
                   spinner: 'dots',
                   content: 'Salvataggio gara in corso...'
                   
                 });*/
                questo.backend.postData(url, questo.torneo, function (data) {
                    console.log("Gara " + txt + " !", data);
                    var triggerurl = questo.backend.rooturl + "/triggerupdategara/" + questo.garaid;
                    questo.backend.fetchData(triggerurl, function () {
                        questo.backend.showToast("Torneo salvato !");
                    });
                });
            }
        });
    };
    TournamentPage.prototype.isAdmin = function () {
        var retvalue = false;
        if (this.backend.user.role == "tkdradmin")
            retvalue = true;
        return retvalue;
    };
    TournamentPage.prototype.toggleInfobar = function () {
        this.viewInfobar = !this.viewInfobar;
        this.backend.playFeedback();
        //this.deviceFeedback.acoustic();
    };
    TournamentPage.prototype.isSuperAdmin = function () {
        var retvalue = false;
        if (this.backend.user.role == "superadmin")
            retvalue = true;
        return retvalue;
    };
    TournamentPage.prototype.resetTorneo = function () {
        var questo = this;
        questo.backend.showConfirm("Vuoi davvero resettare questo torneo ?", function (yes) {
            if (yes)
                questo.torneo.gironi = [];
        });
    };
    TournamentPage.prototype.resultChanged = function (ev, inc, girone) {
        var questo = this;
        var value = ev.value;
        console.log("result changed", value);
        var arr = value.split("-");
        if (arr.length != 2)
            return;
        if (arr.length == 2) {
            var p1 = arr[0];
            var p2 = arr[1];
            if (!questo.isNumeric(p1))
                return;
            if (!questo.isNumeric(p2))
                return;
            inc.punteggio1 = parseInt(p1, 10);
            inc.punteggio2 = parseInt(p2, 10);
            questo.updateClassificaGirone(girone);
        }
    };
    TournamentPage.prototype.isNumeric = function (n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    };
    TournamentPage.prototype.getIncontriGiocatiNelGirone = function (playerid, girone) {
        var retvalue = 0;
        var count = 0;
        girone.incontri.forEach(function (item, idx) {
            if ((item.punteggio1.trim() !== "") && (item.punteggio2.trim() != "")) {
                if (item.player1.id == playerid)
                    count++;
                if (item.player2.id == playerid)
                    count++;
            }
        });
        return count;
    };
    TournamentPage.prototype.inputAtleta = function (girone) {
        var questo = this;
        var prompt = questo.alertCtrl.create({
            title: 'Atleta',
            message: "Inserisci un nuovo atleta",
            inputs: [
                {
                    name: 'cognome',
                    placeholder: 'Cognome'
                }, {
                    name: 'nome',
                    placeholder: 'Nome'
                },
            ],
            buttons: [
                {
                    text: 'Cancel',
                    handler: function (data) {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Save',
                    handler: function (data) {
                        console.log("atleta", data.cognome, data.nome);
                        console.log('Saved clicked');
                        questo.addPlayerToGirone(girone, {
                            cognome: data.cognome,
                            nome: data.nome
                        });
                    }
                }
            ]
        });
        prompt.present();
    };
    TournamentPage.prototype.inputResult = function (inc, girone) {
        var questo = this;
        console.log("inputresult");
        //questo.showMatchconsole(inc)
        //if (1==1) return;
        if (!questo.isAdmin())
            return;
        var prompt = questo.alertCtrl.create({
            title: 'Risultato',
            message: "Inserisci il risultato",
            inputs: [
                {
                    name: 'result',
                    placeholder: 'Risultato'
                },
            ],
            buttons: [
                {
                    text: 'Cancel',
                    handler: function (data) {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Save',
                    handler: function (data) {
                        questo.refresh(function () {
                            console.log("result", data, data.result);
                            if (data.result.trim() == "") {
                                inc.punteggio1 = "";
                                inc.punteggio2 = "";
                                questo.updateClassificaGirone(girone);
                                return;
                            }
                            console.log('Saved clicked');
                            var value = data.result;
                            console.log("result changed", value);
                            var arr = value.split("-");
                            if (arr.length != 2)
                                return;
                            if (arr.length == 2) {
                                var p1 = arr[0];
                                var p2 = arr[1];
                                if (!questo.isNumeric(p1))
                                    return;
                                if (!questo.isNumeric(p2))
                                    return;
                                inc.punteggio1 = p1;
                                inc.punteggio2 = p2;
                                questo.updateClassificaGirone(girone);
                                questo.sendChatResult(inc, girone);
                                questo.saveTorneo();
                            }
                        });
                    }
                }
            ]
        });
        prompt.present();
    };
    TournamentPage.prototype.getPosizioneInClassificaGirone = function (girone, player) {
        girone.players.sort(function (a, b) {
            var p1 = a.punti;
            var p2 = b.punti;
            if (p1 > p2)
                return -1;
            if (p1 < p2)
                return 1;
            if (p1 == p2) {
                var dr1 = a.gf - a.gs;
                var dr2 = b.gf - b.gs;
                if (dr1 > dr2)
                    return -1;
                if (dr1 < dr2)
                    return 1;
                return 0;
            }
            return 0;
        });
        console.log("classifica girone", girone.players);
        var pos = -1;
        girone.players.forEach(function (item, idx) {
            if (item.id == player.id)
                pos = idx;
        });
        console.log("posizione in classifca " + player.cognome, pos);
        var arrord = ["primo", "secondo", "terzo", "quarto", "quinto", "sesto", "settimo", "ottavo", "nono", "decimo", "undicesimo", "dodicesimo", "tredicesimo", "quattordicesimo"];
        var retvalue = {
            pos: pos,
            postext: arrord[pos]
        };
        return retvalue;
    };
    TournamentPage.prototype.sendChatResult = function (m, girone) {
        var questo = this;
        console.log("sendchatresult", m);
        var p1 = parseInt(m.punteggio1, 10);
        var p2 = parseInt(m.punteggio2, 10);
        var text = "";
        var societa = "ASD Taekwondo Rozzano";
        if (p1 > p2) {
            text = m.player1.cognome + " " + m.player1.nome + " (" + societa + ") vince contro " + m.player2.cognome + " " + m.player2.nome + " (" + societa + ") per " + m.punteggio1 + " a " + m.punteggio2;
        }
        if (p1 < p2) {
            text = m.player2.cognome + " " + m.player2.nome + " (" + societa + ") vince contro " + m.player1.cognome + " " + m.player1.nome + " (" + societa + ") per " + m.punteggio2 + " a " + m.punteggio1;
        }
        if (p1 == p2) {
            text = "L'incontro tra " + m.player1.cognome + " " + m.player1.nome + " (" + societa + ") e " + m.player2.cognome + " " + m.player2.nome + " (" + societa + ") finisce in parità con il risultato di  " + m.punteggio1 + " a " + m.punteggio2;
        }
        console.log("text", text);
        console.log("girone", girone);
        //var text = "Risultato incontro "+m.player1.cognome+" "+m.player1.nome+" contro ";
        //questo.msg = "";
        var classpos1 = questo.getPosizioneInClassificaGirone(girone, m.player1);
        var classpos2 = questo.getPosizioneInClassificaGirone(girone, m.player2);
        var classtext = ". La classifica del girone " + girone.title + " vede ora " + m.player1.cognome + " " + m.player1.nome + " al " + classpos1.postext + " posto in classifica, mentre " + m.player2.cognome + " " + m.player2.nome + " è ora al " + classpos2.postext + " posto";
        text += classtext;
        text = girone.title + ": " + text;
        var mm = {
            garaid: "",
            nickname: "SYSTEM",
            color: "yellow",
            sockid: questo.backend.user.sockid,
            //audio: data,
            text: text
        };
        questo.postLocalChat(mm);
        questo.backend.postChat(mm, function () {
            //questo.gotoBottom();
        });
    };
    TournamentPage.prototype.postLocalChat = function (msg) {
        var questo = this;
        var tim = __WEBPACK_IMPORTED_MODULE_4_moment__().format("YYYYMMDDHHmmSS");
        var sockid = questo.backend.user.sockid;
        var localmsg = Object.assign({}, msg);
        localmsg.time = tim;
        localmsg.sockid = sockid;
        questo.backend.chatmessages.push(localmsg);
        setTimeout(function () {
            //questo.gotoBottom();
        }, 300);
    };
    TournamentPage.prototype.deleteAtletaFromGirone = function (girone, playerid) {
        var questo = this;
        if (!questo.isAdmin())
            return;
        questo.backend.showConfirm("Sei sicuro di voler cancellare questo atleta dal girone ?", function (yes) {
            if (yes) {
                var arr = [];
                girone.players.forEach(function (item, idx) {
                    if (item.id != playerid)
                        arr.push(item);
                });
                girone.players = arr;
                questo.backend.showToast("Atleta eliminato !");
            }
        });
    };
    TournamentPage.prototype.showMatchconsole = function (m) {
        var questo = this;
        //this.backend.matchconsoles.push(m);
        if (!this.backend.userIsAdmin())
            return;
        //if (this.backend.user.role.toLowerCase() != "tkdradmin") return;
        m.id = "RR123456";
        m.garaid = questo.torneo.id;
        this.backend.playFeedback();
        console.log(this.backend.activegara);
        //if (this.backend.activegara.gara.rows[0].doc.stato != "incorso") return;
        //m.matchord=questo.getMatchOrd({doc: m});
        var matchord = "";
        console.log("matchord !", matchord);
        m.matchord = matchord;
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__matchconsolerr_matchconsolerr__["a" /* MatchconsolerrPage */], {
            match: m,
            avversari: []
        });
    };
    TournamentPage.prototype.gotoScoreKwondo = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__scorekeeper_scorekeeper__["a" /* ScorekeeperPage */]);
    };
    return TournamentPage;
}());
TournamentPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-tournament',template:/*ion-inline-start:"/Users/demetriomortelliti/Desktop/demy/PROJECTS/appkwondo/clients/ion2kwondo/src/pages/tournament/tournament.html"*/'<!--\n  Generated template for the TournamentPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar>\n    <ion-title>Gara</ion-title>\n    <ion-buttons end>\n        <button  ion-button (tap)="doRefresh()"><ion-icon class="baricon"  name="refresh"></ion-icon></button>\n     \n    </ion-buttons>\n \n  </ion-navbar>\n  <ion-toolbar class="stoolbar">\n  <div sstyle="background: #ddd; padding: 0px;">\n      <button class="incaston" full color="dark" sstyle="swidth:100%; sfont-size: 14px; stext-align: left; sbackground: #333; scolor: #eee; "\n        (tap)="toggleInfobar()">\n        <ion-row>\n          <ion-col col-1 fixed style="color: gray; ">\n            <ion-icon *ngIf="!viewInfobar" class="gray" name="md-arrow-dropright"></ion-icon>\n            <ion-icon *ngIf="viewInfobar" class="gray" name="md-arrow-dropdown"></ion-icon>\n          </ion-col>\n          <ion-col col-10 style="font-size: 13px;">\n            <b>{{jgara.title}}</b>\n            <!--<i>{{jgara.data}} - {{jgara.location}}</i>-->\n          </ion-col>\n          <ion-col col-1 style="text-align: right">\n            <ion-spinner name="dots" class="spinnerdots" *ngIf="loading"></ion-spinner>\n            <!--<img *ngIf="loading" width="18" height="18" src="assets/img/ajax-loader.gif" />-->\n          </ion-col>\n\n        </ion-row>\n      </button>\n\n      <ion-item *ngIf="viewInfobar" style="padding: 7px !important; background: #eee; font-size: 14px; ">\n\n        <div>\n          <ion-row>\n            <ion-col class="infobold">{{jgara.title}}</ion-col>\n          </ion-row>\n          <ion-row>\n            <ion-col class="infobold">{{jgara.location}} &nbsp;&nbsp;\n              <!--<a (tap)="showMap()" *ngIf="hasMap()">Visualizza mappa</a>-->\n            </ion-col>\n          </ion-row>\n          <ion-row>\n            <ion-col class="infobold">{{jgara.data}}</ion-col>\n          </ion-row>\n       \n     \n          <!--<div>Gara: {{jgara.title}}</div>\n          <div>Location: {{jgara.location}}</div>\n          <div>Data: {{jgara.data}}</div>\n          <div>Iscritti: {{getArrLen(jgara.iscritti)}}</div>-->\n        </div>\n\n      </ion-item>\n\n    </div>\n  </ion-toolbar>\n\n  <ion-row>\n    <ion-col col-8>\n        <ion-select  style="width:100%" [(ngModel)]="activegironeindex" *ngIf="torneo.gironi.length>0">\n            <ion-option  *ngFor="let g of torneo.gironi; let i=index" [value]="i"><b>{{getUpperCaseGirone(g)}}</b></ion-option>\n        </ion-select>\n    </ion-col>\n    <ion-col col-1 style="text-align: right">\n      <button ion-button style="font-size: 10px" small *ngIf="isSuperAdmin()" (tap)="addGirone()"><ion-icon name="add"></ion-icon></button>\n      <div style="height: 40px; width: 100%" *ngIf="!isAdmin()"></div>\n    </ion-col>\n  </ion-row>\n \n  <ion-segment class="segment" (tap)="tapSegment()" [(ngModel)]="view">\n      <ion-segment-button value="classifica">\n        <!-- <ion-icon name="camera"></ion-icon>-->Classifica\n      </ion-segment-button>\n      <ion-segment-button value="incontri">\n        Incontri\n      </ion-segment-button>\n    \n    </ion-segment>\n\n  \n</ion-header>\n\n<ion-content spadding class="ioncontent" style="background: #eee">\n    <div *ngIf="loading" style="width: 100%; text-align: center">\n        <ion-spinner name="dots"></ion-spinner>\n      </div>\n\n  <br>\n \n    <!--<ibmsection *ngFor="let g of torneo.gironi" [title]="g.title">-->\n      \n      <div style="padding: 3px; background:white" *ngIf="torneo.gironi.length>0">\n          <section *ngIf="view==\'classifica\'">\n       <!-- <ibmsection title="Classifica {{torneo.gironi[activegironeindex].title}}" style="background-color: \'{{colors[activegironeindex]}}\'" [visible]="true">-->\n            <button *ngIf="isSuperAdmin()" style="font-size: 11px"  small ion-button (tap)="inputAtleta(torneo.gironi[activegironeindex])">Aggiungi atleta</button>\n            <div class="pad5" style="background-color: cyan;" *ngIf="torneo.gironi[activegironeindex].players.length>0"><ion-row>\n                <ion-col col-8>ATLETA</ion-col>\n                <ion-col>P</ion-col>\n                <ion-col>G</ion-col>\n                <ion-col>PF</ion-col>\n                <ion-col>PS</ion-col>\n                <ion-col>DP</ion-col>\n              </ion-row></div>\n            <div class="pad5" *ngFor="let p of getSortedPlayers(torneo.gironi[activegironeindex].players)">\n              \n              <ion-row class="classificarow" (press)="deleteAtletaFromGirone(torneo.gironi[activegironeindex],p.id)">\n                <ion-col col-8 class="uc classificaatleta">{{getAtleta(p)}}</ion-col>\n               \n                <ion-col class="classificaatleta"><b>{{p.punti}}</b></ion-col>\n                <ion-col class="classificaatleta">{{getIncontriGiocatiNelGirone(p.id,torneo.gironi[activegironeindex])}}</ion-col>\n                <ion-col class="classificaatleta">{{p.gf}}</ion-col>\n                <ion-col class="classificaatleta">{{p.gs}}</ion-col>\n                <ion-col class="classificaatleta">{{getDF(p)}}</ion-col>\n              \n              </ion-row>\n                \n            </div>\n        <!--</ibmsection>   -->\n          </section>\n          <section *ngIf="view==\'incontri\'">\n        \n         <!-- <ibmsection title="Incontri">-->\n            <button *ngIf="isSuperAdmin()" small style="font-size: 11px" ion-button (tap)="createIncontri(torneo.gironi[activegironeindex],true)">Genera incontri</button>\n            <div class="incontro" *ngFor="let inc of torneo.gironi[activegironeindex].incontri">\n              <ion-row class="incontrirow" (tap)="inputResult(inc,torneo.gironi[activegironeindex])">\n                <ion-col col-3 class="uc small" style="text-align: center">\n                    {{getCognomeAtleta(inc.player1)}}<br>{{getNomeAtleta(inc.player1)}}\n                </ion-col>\n                <ion-col col-1 style="text-align: center">-</ion-col>\n                <ion-col col-3 class="uc small" style="text-align: center">\n                    {{getCognomeAtleta(inc.player2)}}<br>{{getNomeAtleta(inc.player2)}}\n                </ion-col>\n                <ion-col></ion-col>\n                <!--<ion-col col-2><ion-input type="number" class="punteggio" (ionChange)="resultChanged($event,inc,torneo.gironi[activegironeindex])" [(ngModel)]="inc.risultato"></ion-input></ion-col>-->\n                <!--<ion-col col-2><ion-input size="2" [readonly]="true" (ionChange)="updateClassificaGirone(torneo.gironi[activegironeindex])" class="punteggio" type="number" [(ngModel)]="inc.punteggio1"></ion-input></ion-col>\n                <ion-col col-2><ion-input size="2" [readonly]="true" (ionChange)="updateClassificaGirone(torneo.gironi[activegironeindex])" class="punteggio" type="number" [(ngModel)]="inc.punteggio2"></ion-input></ion-col>-->\n                <ion-col col-2><b>{{inc.punteggio1}}-{{inc.punteggio2}}</b></ion-col>\n              </ion-row>\n             \n            </div>\n         <!-- </ibmsection>-->\n         <button small *ngIf="isSuperAdmin()" ion-button (tap)="resetIncontriGirone(torneo.gironi[activegironeindex])">Reset incontri girone</button>\n          </section>\n        </div>\n     \n    <!--</ibmsection>-->\n\n\n\n    \n</ion-content>\n<ion-footer>\n    <button *ngIf="isAdmin() || isSuperAdmin()" ion-button  small (tap)="gotoScoreKwondo()">Scorekwondo</button>\n    <button *ngIf="isSuperAdmin()" small ion-button (tap)="resetTorneo()">Reset Torneo</button>\n    <button *ngIf="isAdmin() ||  isSuperAdmin()" small ion-button (tap)="saveTorneo()">Salva torneo</button>\n\n</ion-footer>'/*ion-inline-end:"/Users/demetriomortelliti/Desktop/demy/PROJECTS/appkwondo/clients/ion2kwondo/src/pages/tournament/tournament.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_2__providers_backend_backend__["a" /* BackendProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */]])
], TournamentPage);

//# sourceMappingURL=tournament.js.map

/***/ }),

/***/ 154:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ScorekeeperPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_backend_backend__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_socket_service_socket_service__ = __webpack_require__(21);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the ScorekeeperPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ScorekeeperPage = (function () {
    function ScorekeeperPage(events, socket, alertCtrl, backend, navCtrl, navParams) {
        this.events = events;
        this.socket = socket;
        this.alertCtrl = alertCtrl;
        this.backend = backend;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.mode = "master";
        this.punt1 = 0;
        this.punt2 = 0;
        this.timeLeft = 60;
        this.maxTime = 60;
        this.timertext = "AVVIO";
        this.timerstarted = false;
        this.timerpaused = false;
        this.player1 = {
            cognome: "Scevola",
            societa: "Scuola Taekwondo Pinerolo",
            nome: "Muzio",
            id: "xxxx"
        };
        this.player2 = {
            cognome: "Regolo",
            societa: "ASD Taekwondo Milazzo",
            nome: "Attilio",
            id: "xxxx"
        };
        this.socketTimerInterval = 5;
        this.socketTimerCount = 0;
        this.scoreboard = {
            clientid: "master",
            punt1: 0,
            punt2: 0,
            player1: {
                cognome: "Scevola",
                societa: "Scuola Taekwondo Pinerolo",
                nome: "Muzio",
                id: "xxxx"
            },
            player2: {
                cognome: "Regolo",
                societa: "ASD Taekwondo Milazzo",
                nome: "Attilio",
                id: "xxxx"
            },
            timeLeft: 60
        };
        var questo = this;
        questo.events.subscribe("scoreboardslave", function (data) {
            console.log("reeived scoreboardslave in scorekeeper.ts", data);
            if (questo.mode == "slave") {
                if (data) {
                    if (data.punt1)
                        questo.scoreboard.punt1 = data.punt1;
                    //questo.punt1=data.punt1;
                    if (data.punt2)
                        questo.scoreboard.punt2 = data.punt2;
                    if (data.timeLeft)
                        questo.scoreboard.timeLeft = data.timeLeft;
                }
            }
        });
    }
    ScorekeeperPage.prototype.ionViewDidLeave = function () {
        var questo = this;
        if (questo.mode == "master")
            clearInterval(questo.interval);
        questo.events.unsubscribe("scoreboards");
        if (questo.mode == "slave")
            questo.events.unsubscribe("scoreboard");
        if (questo.mode == "master")
            questo.backend.removeScoreboard(questo.socket.socket.id);
    };
    ScorekeeperPage.prototype.ionViewDidLoad = function () {
        var questo = this;
        console.log('ionViewDidLoad ScorekeeperPage');
        if (questo.navParams.get("mode"))
            questo.mode = questo.navParams.get("mode");
        if (questo.navParams.get("scoreboard"))
            questo.scoreboard = questo.navParams.get("scoreboard");
        //this.startTimer();
        console.log("questo.mode", questo.mode);
        if (questo.mode == "master")
            questo.timeLeft = questo.maxTime;
        questo.getScoreboards();
        /*questo.events.subscribe("scoreboards", function (data) {
          console.log("reeived scoreboards in scorekeeper.ts", data);
        })*/
        if (questo.mode == "master")
            questo.sendSocketScoreboard();
    };
    ScorekeeperPage.prototype.getScoreboards = function () {
        this.socket.sendCustomMessage("getscoreboards", {});
    };
    ScorekeeperPage.prototype.increase = function (x) {
        if (this.mode != "master")
            return;
        this.scoreboard[x]++;
        this.sendSocketScoreboard();
    };
    ScorekeeperPage.prototype.decrease = function (x) {
        if (this.mode != "master")
            return;
        this.scoreboard[x]--;
        this.sendSocketScoreboard();
    };
    ScorekeeperPage.prototype.resetPunti = function () {
        var questo = this;
        questo.backend.showConfirm("Vuoi davvero resettare il punteggio ?", function (yes) {
            questo.scoreboard.punt1 = 0;
            questo.scoreboard.punt2 = 0;
            questo.sendSocketScoreboard();
        });
    };
    ScorekeeperPage.prototype.tapTimer = function () {
        if (!this.timerstarted) {
            this.timertext = "PAUSA";
            this.timerstarted = true;
            this.timerpaused = false;
            this.startTimer();
            return;
        }
        if (this.timerstarted) {
            this.timerpaused = !this.timerpaused;
            if (this.timerpaused) {
                this.timertext = "RIAVVIO";
            }
            else
                this.timertext = "PAUSA";
        }
    };
    ScorekeeperPage.prototype.startTimer = function () {
        var _this = this;
        var questo = this;
        questo.interval = setInterval(function () {
            if (questo.scoreboard.timeLeft > 0) {
                if (!questo.timerpaused) {
                    questo.backend.playSoundDespiteAppSettings("img/tick");
                    questo.scoreboard.timeLeft--;
                    questo.timerstarted = true;
                    questo.timertext = "PAUSA";
                    questo.socketTimerCount++;
                    if (questo.socketTimerCount == questo.socketTimerInterval) {
                        _this.sendSocketScoreboard();
                        questo.socketTimerCount = 0;
                    }
                    if (questo.scoreboard.timeLeft == 0) {
                        questo.backend.playSoundDespiteAppSettings("img/endfight");
                        questo.timerstarted = false;
                        questo.timerpaused = false;
                        questo.timertext = "AVVIO";
                        clearInterval(questo.interval);
                        _this.sendSocketScoreboard();
                        questo.socketTimerCount = 0;
                    }
                }
            }
            else {
                /* clearInterval(questo.timer);
                 questo.backend.playSoundDespiteAppSettings("img/endfight")
                 questo.timeLeft = 0;
                 questo.timerstarted = false;
                 questo.timerpaused = false;
                 questo.timertext = "AVVIO";*/
            }
        }, 1000);
    };
    ScorekeeperPage.prototype.stopTimer = function () {
        clearInterval(this.interval);
        this.scoreboard.timeLeft = this.maxTime;
        this.timertext = "AVVIA";
        this.timerstarted = false;
        this.timerpaused = true;
        this.sendSocketScoreboard();
        this.socketTimerCount = 0;
    };
    ScorekeeperPage.prototype.pauseTimer = function () {
        this.timerpaused = true;
        this.timertext = "RIAVVIA";
        this.sendSocketScoreboard();
    };
    ScorekeeperPage.prototype.resetTimer = function () {
        var questo = this;
        questo.backend.showConfirm("Vuoi resettare il timer ?", function (yes) {
            if (yes) {
                questo.timerpaused = true;
                questo.timerstarted = false;
                clearInterval(questo.interval);
                questo.scoreboard.timeLeft = questo.maxTime;
                questo.timertext = "AVVIO";
                questo.socketTimerCount = 0;
            }
        });
    };
    ScorekeeperPage.prototype.setupTimer = function () {
        var questo = this;
        var alert = questo.alertCtrl.create({
            title: 'Imposta il tempo in secondi',
            inputs: [
                {
                    name: 'seconds',
                    placeholder: 'Secondi',
                    value: questo.maxTime
                }
            ],
            buttons: [
                {
                    text: 'Annulla',
                    role: 'cancel',
                    handler: function (data) {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'IMPOSTA',
                    handler: function (data) {
                        questo.maxTime = data.seconds;
                        questo.scoreboard.timeLeft = questo.maxTime;
                        questo.stopTimer();
                    }
                }
            ]
        });
        alert.present();
    };
    ScorekeeperPage.prototype.getTime = function (t) {
        var sec_num = parseInt(t, 10); // don't forget the second param
        var hours = Math.floor(sec_num / 3600);
        var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
        var seconds = sec_num - (hours * 3600) - (minutes * 60);
        var shours = String(hours);
        var sminutes = String(minutes);
        var sseconds = String(seconds);
        if (hours < 10) {
            shours = "0" + shours;
        }
        if (minutes < 10) {
            sminutes = "0" + sminutes;
        }
        if (seconds < 10) {
            sseconds = "0" + sseconds;
        }
        return sminutes + ':' + sseconds;
    };
    ScorekeeperPage.prototype.getTimerClass = function () {
        var retvalue = 'timer';
        if (this.timerstarted) {
            if (this.timerpaused)
                retvalue += " colorgray blink";
        }
        return retvalue;
    };
    ScorekeeperPage.prototype.getTimerButtonClass = function () {
        var retvalue = "";
        if (this.timerstarted) {
            if (this.timerpaused)
                retvalue = "backgray";
            if (!this.timerpaused)
                retvalue = "backorange";
        }
        return retvalue;
    };
    ScorekeeperPage.prototype.sendSocketScoreboard = function () {
        var questo = this;
        /*var data = {
          clientid: questo.socket.socket.id,
          punt1: questo.punt1,
          punt2: questo.punt2,
          timeleft: questo.timeLeft,
          player1: questo.player1,
          player2: questo.player2
    
        }*/
        questo.socket.sendCustomMessage("scoreboard", questo.scoreboard);
    };
    return ScorekeeperPage;
}());
ScorekeeperPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-scorekeeper',template:/*ion-inline-start:"/Users/demetriomortelliti/Desktop/demy/PROJECTS/appkwondo/clients/ion2kwondo/src/pages/scorekeeper/scorekeeper.html"*/'<!--\n  Generated template for the ScorekeeperPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar>\n    <ion-title>SCOREKWONDO</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content scroll="false" spadding>\n  <table border="1" height="100%" width="100%" cellpadding="2" cellpadding="2">\n    <tr height="10%" *ngIf="mode==\'master\'">\n      <td>\n        <button ion-button (tap)="resetPunti()">Reset punti</button>\n        <button ion-button (press)="resetTimer()" [ngClass]="getTimerButtonClass()"\n          (tap)="tapTimer()">{{timertext}}</button>\n        <button ion-button (tap)="setupTimer()">\n          <ion-icon name="settings"></ion-icon>\n        </button>\n      </td>\n    </tr>\n    <tr class="buttr  red" *ngIf="player1.cognome!=\'\'">\n      <td>\n        <div class="atleta">{{scoreboard.player1.cognome+\' \'+scoreboard.player1.nome}}</div>\n        <div class="societa">{{scoreboard.player1.societa}}</div>\n      </td>\n    </tr>\n    <tr height="25%" class="buttr">\n\n      <td>\n        <div (tap)="increase(\'punt2\')" (press)="decrease(\'punt2\')" class="puntbut red">{{scoreboard.punt2}}</div>\n      </td>\n    </tr>\n    <tr class="buttr  blue" *ngIf="player2.cognome!=\'\'">\n      <td>\n        <div class="atleta">{{scoreboard.player2.cognome+\' \'+scoreboard.player2.nome}}</div>\n        <div class="societa">{{scoreboard.player2.societa}}</div>\n\n      </td>\n    </tr>\n    <tr height="25%" class="buttr">\n\n      <td>\n        <div (tap)="increase(\'punt1\')" (press)="decrease(\'punt1\')" class="puntbut blue">{{scoreboard.punt1}}</div>\n      </td>\n    </tr>\n    <tr>\n      <td>\n        <div [ngClass]="getTimerClass()">{{getTime(scoreboard.timeLeft)}}</div>\n\n      </td>\n    </tr>\n  </table>\n\n\n  <!--<ion-grid>\n\n  <ion-row>\n    <button ion-button (tap)="resetPunti()">Reset punti</button>\n    <button ion-button (press)="resetTimer()" (tap)="tapTimer()">{{timertext}}</button>\n    <button ion-button (tap)="setupTimer()"><ion-icon name="settings"></ion-icon></button>\n   \n  </ion-row>\n\n  <ion-row>\n      <div class="timer">{{timeLeft}}</div>\n\n  </ion-row>\n\n<ion-row class="ionrow">\n    <ion-col align-self-stretch width-67 ><button (tap)="increase(\'punt2\')" (press)="decrease(\'punt2\')"  ion-button full class="puntbut" color="danger">{{punt2}}</button></ion-col>\n  \n  <ion-col width-33><ion-item text-wrap full>Un-aspirated p that sounds like a cross between a b and a p.  Make the <i>bp</i> sound by copying a p sound but not letting any air come out of your mouth.</ion-item></ion-col>\n</ion-row>\n\n<ion-row class="ionrow">\n <ion-col align-self-stretch width-67 ><button (tap)="increase(\'punt1\')" (press)="decrease(\'punt1\')" ion-button full class="puntbut" color="primary">{{punt1}}</button></ion-col>\n \n <ion-col width-33><ion-item text-wrap full>Un-aspirated p that sounds like a cross between a b and a p.  Make the <i>bp</i> sound by copying a p sound but not letting any air come out of your mouth.</ion-item></ion-col>\n </ion-row>\n\n\n <ion-row>\n   <ion-col>\n   \n   </ion-col>\n </ion-row>\n\n </ion-grid>-->\n\n  <!--<section class="home-container">\n\n    <ion-row class="first-row">\n      <ion-col>\n\n      </ion-col>\n\n    </ion-row>\n\n    <ion-row class="second-row">\n      <ion-col class="redbutton">\n          {{punt2}}\n      </ion-col>\n\n    </ion-row>\n    <ion-row class="third-row">\n      <ion-col class="bluebutton">\n       {{punt1}}\n      </ion-col>\n    </ion-row>\n  </section>-->\n\n\n</ion-content>'/*ion-inline-end:"/Users/demetriomortelliti/Desktop/demy/PROJECTS/appkwondo/clients/ion2kwondo/src/pages/scorekeeper/scorekeeper.html"*/,
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__providers_socket_service_socket_service__["a" /* SocketService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__providers_socket_service_socket_service__["a" /* SocketService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__providers_backend_backend__["a" /* BackendProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__providers_backend_backend__["a" /* BackendProvider */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */]) === "function" && _f || Object])
], ScorekeeperPage);

var _a, _b, _c, _d, _e, _f;
//# sourceMappingURL=scorekeeper.js.map

/***/ }),

/***/ 155:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AccountPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_backend_backend__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_utils_utils__ = __webpack_require__(44);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/*
  Generated class for the Account page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var AccountPage = (function () {
    function AccountPage(utils, alertCtrl, events, backend, navCtrl, navParams) {
        this.utils = utils;
        this.alertCtrl = alertCtrl;
        this.events = events;
        this.backend = backend;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.view = "";
        this.pswchange = {
            email: "",
            currentpsw: "",
            newpsw: "",
            verifynewpsw: ""
        };
    }
    AccountPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad AccountPage');
    };
    AccountPage.prototype.changePsw = function () {
        //alert("changepsw")
        var questo = this;
        questo.view = "changepsw";
    };
    AccountPage.prototype.ionViewWillEnter = function () {
        var questo = this;
        this.events.subscribe("hwbackbutton", function (data) {
            console.log("hwbackbutton in gare.ts");
            questo.navCtrl.pop();
        });
    };
    AccountPage.prototype.ionViewWillLeave = function () {
        this.events.unsubscribe("hwbackbutton");
    };
    AccountPage.prototype.isSubmitEnabled = function () {
        var questo = this;
        var enabled = true;
        if (questo.pswchange.currentpsw.trim() == "")
            enabled = false;
        if (questo.pswchange.newpsw.trim() == "")
            enabled = false;
        if (questo.pswchange.verifynewpsw.trim() == "")
            enabled = false;
        return enabled;
    };
    AccountPage.prototype.doChangePsw = function () {
        var questo = this;
        questo.pswchange.email = questo.backend.user.email;
        console.log(questo.pswchange, questo.backend.user);
        var url = questo.backend.rooturl + "/users/changepsw";
        var cdata = questo.pswchange;
        questo.backend.postData(url, cdata, function (data) {
            console.log(data);
            var text = "";
            if (data.error)
                text += "ATTENZIONE !<br><br>";
            text += data.msg;
            var alrt = questo.alertCtrl.create({
                title: 'Esito operazione',
                subTitle: text,
                buttons: ['Chiudi']
            });
            alrt.present();
            if (String(data.error) == "false") {
                questo.view = "";
                var creds = window.btoa(questo.backend.user.email + ":" + questo.pswchange.newpsw);
                questo.utils.setJsonStorage("ion2kwondo_creds", creds);
                questo.pswchange = {
                    email: "",
                    currentpsw: "",
                    newpsw: "",
                    verifynewpsw: ""
                };
            }
        });
        //if (questo.pswchange.currentpsw)
    };
    return AccountPage;
}());
AccountPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-account',template:/*ion-inline-start:"/Users/demetriomortelliti/Desktop/demy/PROJECTS/appkwondo/clients/ion2kwondo/src/pages/account/account.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Il mio account</ion-title>\n  </ion-navbar>\n</ion-header>\n<ion-content padding>\n<ion-item>\n  <b>{{backend.user.nickname}}</b><br>\n  {{backend.user.email}}<br>\n  {{backend.user.appversion}}<br>\n  <button ion-button (tap)="changePsw()">Modifica password</button>\n</ion-item>\n<section *ngIf="view==\'changepsw\'">\n\n  <ion-list>\n    <ion-item>\n      <ion-label floating color="primary">Password corrente</ion-label>\n      <ion-input [(ngModel)]="pswchange.currentpsw" type="password"></ion-input>\n    </ion-item>\n  \n    <ion-item>\n      <ion-label floating color="primary">Nuova password</ion-label>\n      <ion-input [(ngModel)]="pswchange.newpsw" type="password" ></ion-input>\n    </ion-item>\n\n    <ion-item>\n      <ion-label floating color="primary">Verifica nuova password</ion-label>\n      <ion-input [(ngModel)]="pswchange.verifynewpsw" type="password" ></ion-input>\n    </ion-item>\n\n      <br>\n    <button [disabled]="!isSubmitEnabled()" block ion-button (tap)="doChangePsw()">Modifica password</button>\n  \n    </ion-list>\n\n\n\n</section>\n</ion-content>\n'/*ion-inline-end:"/Users/demetriomortelliti/Desktop/demy/PROJECTS/appkwondo/clients/ion2kwondo/src/pages/account/account.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__providers_utils_utils__["a" /* UtilsProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */], __WEBPACK_IMPORTED_MODULE_2__providers_backend_backend__["a" /* BackendProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */]])
], AccountPage);

//# sourceMappingURL=account.js.map

/***/ }),

/***/ 156:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AboutPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_home_home__ = __webpack_require__(136);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_facebook_facebook__ = __webpack_require__(560);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_backend_backend__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var AboutPage = (function () {
    function AboutPage(events, backend, fb, navCtrl) {
        var _this = this;
        this.events = events;
        this.backend = backend;
        this.fb = fb;
        this.navCtrl = navCtrl;
        this.relationship = "friends";
        this.AboutRoot = __WEBPACK_IMPORTED_MODULE_2__pages_home_home__["a" /* HomePage */];
        this.CalendarRoot = __WEBPACK_IMPORTED_MODULE_2__pages_home_home__["a" /* HomePage */];
        this.CameraRoot = __WEBPACK_IMPORTED_MODULE_2__pages_home_home__["a" /* HomePage */];
        this.CloudRoot = __WEBPACK_IMPORTED_MODULE_2__pages_home_home__["a" /* HomePage */];
        this.ContactRoot = __WEBPACK_IMPORTED_MODULE_2__pages_home_home__["a" /* HomePage */];
        this.FolderRoot = __WEBPACK_IMPORTED_MODULE_2__pages_home_home__["a" /* HomePage */];
        this.HomeRoot = __WEBPACK_IMPORTED_MODULE_2__pages_home_home__["a" /* HomePage */];
        this.MapRoot = __WEBPACK_IMPORTED_MODULE_2__pages_home_home__["a" /* HomePage */];
        this.SettingsRoot = __WEBPACK_IMPORTED_MODULE_2__pages_home_home__["a" /* HomePage */];
        this.tabsColor = "default";
        this.tabsMode = "md";
        this.tabsPlacement = "top";
        this.tabToShow = [true, true, true, true, true, true, true, true, true];
        this.scrollableTabsopts = {};
        this.items = [];
        this.users = [];
        this.mapPosts = function (post) {
            return {
                from: post.from,
                time: post.created_time * 1000,
                message: post.message,
                photos: _this.getPhotos(post)
            };
        };
        this.getPhotos = function (post) {
            if (!post.attachments)
                return [];
            var attachments = post.attachments.data[0].subattachments ||
                post.attachments;
            return attachments.data
                .filter(function (x) { return x.type == "photo"; })
                .map(function (x) { return x.media.image; });
        };
        var questo = this;
        questo.users = [];
        questo.backend.getRandomUsers(function (data) {
            console.log("users", data);
            questo.users = data;
            questo.content.resize();
        });
        for (var i = 0; i < 1000; i++) {
            var newitem = {
                nome: i
            };
            this.items.push(newitem);
        }
    }
    AboutPage.prototype.selectedEnemies = function () {
        console.log(this.relationship);
    };
    AboutPage.prototype.goFB = function () {
        console.log("goFB!");
        this.fb.getPosts("demymortelliti", function (data) {
        });
    };
    AboutPage.prototype.gotoBottom = function () {
        if (this.content)
            this.content.scrollToBottom();
    };
    AboutPage.prototype.gotoTop = function () {
        if (this.content)
            this.content.scrollToTop();
    };
    AboutPage.prototype.ionViewWillEnter = function () {
        var questo = this;
        this.events.subscribe("hwbackbutton", function (data) {
            console.log("hwbackbutton in gare.ts");
            questo.navCtrl.pop();
        });
    };
    AboutPage.prototype.ionViewWillLeave = function () {
        this.events.unsubscribe("hwbackbutton");
    };
    return AboutPage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Content */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Content */])
], AboutPage.prototype, "content", void 0);
AboutPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-about',template:/*ion-inline-start:"/Users/demetriomortelliti/Desktop/demy/PROJECTS/appkwondo/clients/ion2kwondo/src/pages/about/about.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>\n      Informazioni\n    </ion-title>\n    <!--<ion-buttons end>\n      <button ion-button (tap)="gotoBottom()">GIU</button>\n      <button ion-button (tap)="gotoTop()">SU</button>\n    </ion-buttons>-->\n  </ion-navbar>\n</ion-header>\n<ion-content spadding class="ion-content">\n <!-- <p>\n    This is a combination of Ionic 2 Tabs and Sidemenu. For more info, see related <a href="https://blog.khophi.co/ionic-2-side-menu-tabs/">Ionic 2 Sidemenu and Tabs</a> article by <a href="https://blog.khophi.co">Khophi\'s Dev</a>\n  </p>\n  <button ion-button block (tap)="goFB()">GO FB</button>-->\n\n  <!--<ion-segment #ionSeg [scrollable-segments]="ionSeg" >\n    <ion-segment-button value="urzu">Urzu</ion-segment-button>\n    <ion-segment-button value="parzo">Parzo</ion-segment-button>\n    <ion-segment-button value="muzio">Muzio</ion-segment-button>\n  </ion-segment>-->\n\n\n <!-- <ion-scroll scrollX="true" style="width:100vw;height:350px" >\n      <ion-segment [(ngModel)]="relationship" color="primary">\n      \n      \n            <ion-segment-button value="friends" (ionSelect)="selectedEnemies()">\n              Friends\n            </ion-segment-button>\n            <ion-segment-button value="enemies" (ionSelect)="selectedEnemies()">\n              Enemies\n            </ion-segment-button>\n             <ion-segment-button value="enemies" (ionSelect)="selectedEnemies()">\n              Enemies\n            </ion-segment-button>\n            <ion-segment-button value="enemies" (ionSelect)="selectedEnemies()">\n              Enemies\n            </ion-segment-button>\n            <ion-segment-button value="enemies" (ionSelect)="selectedEnemies()">\n              Enemies\n            </ion-segment-button>\n            <ion-segment-button value="enemies" (ionSelect)="selectedEnemies()">\n              Enemies\n            </ion-segment-button>\n            <ion-segment-button value="enemies" (ionSelect)="selectedEnemies()">\n              Enemies\n            </ion-segment-button>\n            <ion-segment-button value="enemies" (ionSelect)="selectedEnemies()">\n              Enemies\n            </ion-segment-button>\n            <ion-segment-button value="enemies" (ionSelect)="selectedEnemies()">\n              Enemies\n            </ion-segment-button>\n            <ion-segment-button value="enemies" (ionSelect)="selectedEnemies()">\n              Enemies\n            </ion-segment-button>\n      \n          </ion-segment>\n            </ion-scroll>-->\n\n\n<!--\n  <ion-tabs #ionTabs [scrollable-tabs]="ionTabs" [opts]="scrollableTabsopts" selectedIndex=\'0\' color="{{tabsColor}}" mode=\'{{tabsMode}}\'\n	tabsHighlight="true" tabsPlacement="{{tabsPlacement}}">\n	<ion-tab [root]="HomeRoot" [show]=\'tabToShow[0]\' tabIcon="home" tabTitle="Home"></ion-tab>\n	<ion-tab [root]="CalendarRoot" [show]=\'tabToShow[1]\' tabIcon="calendar" tabTitle="Calendar"></ion-tab>\n	<ion-tab [root]="CameraRoot" [show]=\'tabToShow[2]\' tabIcon="camera" tabTitle="Camera"></ion-tab>\n	<ion-tab [root]="CloudRoot" [show]=\'tabToShow[3]\' tabIcon="cloud" tabTitle="Cloud"></ion-tab>\n	<ion-tab [root]="ContactRoot" [show]=\'tabToShow[4]\' tabIcon="contact" tabTitle="Contact"></ion-tab>\n	<ion-tab [root]="FolderRoot" [show]=\'tabToShow[5]\' tabIcon="folder" tabTitle="Folder"></ion-tab>\n	<ion-tab [root]="MapRoot" [show]=\'tabToShow[6]\' tabIcon="map" tabTitle="Map"></ion-tab>\n	<ion-tab [root]="SettingsRoot" [show]=\'tabToShow[7]\' tabIcon="settings" tabTitle="Settings"></ion-tab>\n	<ion-tab [root]="AboutRoot" [show]=\'tabToShow[8]\' tabIcon="information-circle" tabTitle="About"></ion-tab>\n  </ion-tabs>\n  \n-->\n\n\n<!--<ion-list [virtualScroll]="users">\n  \n    <ion-item *virtualItem="let item">\n      <div>{{ item.email }} </div>\n      <div>{{item.name.first}} {{item.name.last}}</div>\n     \n    </ion-item>\n  \n  </ion-list>-->\n  <ion-card>\n    <ion-card-content>\n       \n        <div style="text-align: center; padding: 8px">\n        <div style="font-size: 18px; font-weight: bold">AppKwonDoV2</div>\n        <div style="font-size: 16px; font-weight: bold; color: blue">v.{{backend.appVersion.version}}</div>\n        <div style="font-size: 14px; color: blue"> {{backend.appVersion.releasedate}} TowerApps</div>\n       \n        <div style="font-size: 16px">\n\n        <a href="http://tkdr.herokuapp.com/privacy_it.htm" target="_blank">Privacy Policy</a>\n\n\n\n\n        </div>\n\n        \n        <p style="font-style: italic">AppKwonDo © è proprietà esclusiva registrata di ASD Taekwondo Rozzano </p>\n        <div class="logodiv">\n        <img class="logo" src="assets/img/logotkdrozzano.png"  />\n      </div>\n      \n      </div>\n    </ion-card-content>\n  </ion-card>\n</ion-content>\n'/*ion-inline-end:"/Users/demetriomortelliti/Desktop/demy/PROJECTS/appkwondo/clients/ion2kwondo/src/pages/about/about.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */], __WEBPACK_IMPORTED_MODULE_4__providers_backend_backend__["a" /* BackendProvider */], __WEBPACK_IMPORTED_MODULE_3__providers_facebook_facebook__["a" /* FacebookProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */]])
], AboutPage);

//# sourceMappingURL=about.js.map

/***/ }),

/***/ 157:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ServizisocietaPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_products_products__ = __webpack_require__(561);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_orders_orders__ = __webpack_require__(564);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_backend_backend__ = __webpack_require__(6);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the ServizisocietaPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var ServizisocietaPage = (function () {
    function ServizisocietaPage(backend, events, navCtrl, navParams) {
        this.backend = backend;
        this.events = events;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    ServizisocietaPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ServizisocietaPage');
    };
    ServizisocietaPage.prototype.ionViewWillEnter = function () {
        var questo = this;
        this.events.subscribe("hwbackbutton", function (data) {
            console.log("hwbackbutton in servizisocieta.ts");
            questo.navCtrl.pop();
        });
    };
    ServizisocietaPage.prototype.ionViewWillLeave = function () {
        this.events.unsubscribe("hwbackbutton");
    };
    ServizisocietaPage.prototype.gotoProducts = function (cat) {
        var questo = this;
        questo.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__pages_products_products__["a" /* ProductsPage */], {
            categoria: cat
        });
    };
    ServizisocietaPage.prototype.isMarketAdmin = function () {
        var questo = this;
        var isadmin = false;
        if (questo.backend.user.role == 'tkdradmin')
            isadmin = true;
        if (questo.backend.user.role == 'marketadmin')
            isadmin = true;
        return isadmin;
    };
    ServizisocietaPage.prototype.viewOrders = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__pages_orders_orders__["a" /* OrdersPage */]);
    };
    return ServizisocietaPage;
}());
ServizisocietaPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-servizisocieta',template:/*ion-inline-start:"/Users/demetriomortelliti/Desktop/demy/PROJECTS/appkwondo/clients/ion2kwondo/src/pages/servizisocieta/servizisocieta.html"*/'<!--\n  Generated template for the ServizisocietaPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Servizi per i soci</ion-title>\n    <ion-buttons end>\n        \n              <button (tap)="viewOrders()" *ngIf="isMarketAdmin()" ion-button icon-only>\n                <ion-icon name="md-list-box"></ion-icon>\n              </button>\n    </ion-buttons>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content spadding class="ion-content">\n\n  <ion-card>\n    <ion-card-content>\n      <ion-row>\n        <ion-col col-2>\n          <img class="maximage" src="http://www.taekwondorozzano.it/wp-content/themes/Taekwondo/images/logo-tae-kwan-do-rozzano.png"/>\n        </ion-col>\n        <ion-col col-1></ion-col>\n        <ion-col>\n          I qui presenti servizi sono offerti in forma esclusiva ai soci di ASD Taekwondo Rozzano\n        </ion-col>\n      </ion-row>\n    </ion-card-content>\n  </ion-card>\n\n  <hr>\n\n  <ion-card (tap)="gotoProducts(\'tkdgear\')">\n\n\n          <ion-card-content>\n            <ion-row>\n              <ion-col col-3 align-self-start>\n                  <img class="sgear maximage" src="assets/img/taekwondogear.jpg" />\n              </ion-col>\n              <ion-col>\n    \n              </ion-col>\n              <ion-col  col-8 align-self-start>\n                <ion-row>\n                  <ion-col align-self-start>\n                      <b>Prenota equipaggiamento</b>\n    \n                  </ion-col>\n                </ion-row>\n                <ion-row>\n                    <ion-col align-self-start>\n                        Ti serve un accessorio da taekwondo per il tuo atleta ? Prenotalo qui\n      \n                    </ion-col>\n                  </ion-row>\n               \n              </ion-col>\n            </ion-row>\n         \n        \n          \n        </ion-card-content>\n        </ion-card>\n    \n   \n\n  <ion-card (tap)="gotoProducts(\'minimarket\')">\n                <ion-card-content>\n                  <ion-row align-items-start>\n                    <ion-col col-3 align-self-start>\n                        <img class="sgear maximage" src="assets/img/minimarket.jpg" />\n                    </ion-col>\n                    <ion-col>\n          \n                    </ion-col>\n                    <ion-col  col-8 align-self-start>\n                      <ion-row align-items-start>\n                        <ion-col align-self-start>\n                            <b>Prenotazione minimarket</b>\n          \n                        </ion-col>\n                      </ion-row>\n                      <ion-row align-items-start>\n                          <ion-col align-self-start>\n                              Puoi prenotare qui dal minimarket Sapori Del Sud\n             \n                          </ion-col>\n                        </ion-row>\n                     \n                    </ion-col>\n                  </ion-row>\n               \n              \n                \n              </ion-card-content>\n              </ion-card>\n\n              <!--\n\n              <ion-card (tap)="gotoProducts(\'gear\')">\n                  \n               \n                            <ion-card-content>\n                              <ion-row align-items-start>\n                                <ion-col col-3 align-self-start>\n                                    <img class="sgear" src="http://mammaoggi.it/wp-content/uploads/2013/09/mercatino_54_370.jpg" />\n                                </ion-col>\n                                <ion-col>\n                      \n                                </ion-col>\n                                <ion-col  col-8 align-self-start>\n                                  <ion-row align-items-start>\n                                    <ion-col align-self-start>\n                                        <b>Mercatino e scambio usato</b>\n                      \n                                    </ion-col>\n                                  </ion-row>\n                                  <ion-row>\n                                      <ion-col align-self-start>\n                                          Mercatino e scambio di accessori usati per taekwondo\n                        \n                                      </ion-col>\n                                    </ion-row>\n                                 \n                                </ion-col>\n                              </ion-row>\n                          </ion-card-content>\n              </ion-card>\n\n            -->\n\n\n      <!--<section *ngIf="isMarketAdmin()">\n        <ion-item (tap)="viewOrders()">\n          Visualizza ordini\n        </ion-item>\n      </section>-->\n         \n\n</ion-content>\n'/*ion-inline-end:"/Users/demetriomortelliti/Desktop/demy/PROJECTS/appkwondo/clients/ion2kwondo/src/pages/servizisocieta/servizisocieta.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__providers_backend_backend__["a" /* BackendProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */]])
], ServizisocietaPage);

//# sourceMappingURL=servizisocieta.js.map

/***/ }),

/***/ 167:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 167;

/***/ }),

/***/ 209:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/iscritti/iscritti.module": [
		768,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 209;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 21:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SocketService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_socket_io_client__ = __webpack_require__(648);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_socket_io_client___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_socket_io_client__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__backend_backend__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_badge__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ionic_angular__ = __webpack_require__(3);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








/*
  Generated class for the SocketService provider.
  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
var SocketService = (function () {
    function SocketService(events, backend, badge, platform) {
        var _this = this;
        this.events = events;
        this.backend = backend;
        this.badge = badge;
        this.platform = platform;
        this.data = null;
        this.socketHost = 'https://bpeitaly.mybluemix.net';
        this.msgs = [];
        this.contacts = [];
        this.totalunreadcount = 0;
        this.socketService = __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].create(function (observer) {
            _this.socketObserver = observer;
        });
        this.socketHost = backend.rooturl;
        this.initialize();
    }
    SocketService.prototype.initialize = function () {
        var _this = this;
        var questo = this;
        this.socket = __WEBPACK_IMPORTED_MODULE_3_socket_io_client__["connect"](this.socketHost);
        // this.refreshContacts(function () { });
        this.socket.on("connect", function (msg) {
            console.log('socket connect received');
            //this.socketObserver.next({ category: 'connect', message: 'user connected'});
        });
        this.socket.on("reconnecting", function (msg) {
            console.log('socket reconnecting received');
        });
        this.socket.on("getclientspecs", function (msg) {
            var questo = _this;
            console.log('socket getclientspecs received', msg);
            questo.backend.getUniqueDeviceID(function () {
                var connsock = {
                    useremail: questo.backend.user.email,
                    gcmtoken: questo.backend.user.gcmtoken,
                    deviceid: questo.backend.user.uniquedeviceid
                };
                questo.socket.emit('connected', connsock);
            });
        });
        this.socket.on("getnickname", function (msg) {
            console.log('socket getnickname received', msg);
            questo.backend.user.sockid = msg.sockid;
            var connsock = {
                useremail: _this.backend.user.email
            };
            questo.backend.getUniqueDeviceID(function () {
                var m = {
                    device: "browser",
                    type: "clientspecs",
                    nickname: questo.backend.user.nickname,
                    email: questo.backend.user.email,
                    gcmtoken: questo.backend.user.gcmtoken,
                    deviceid: questo.backend.user.uniquedeviceid,
                    appversion: questo.backend.appVersion.version
                };
                if (questo.platform.is("cordova")) {
                    m.device = "mobile";
                    if (questo.platform.is("ios"))
                        m.device = "ios";
                    if (questo.platform.is("android"))
                        m.device = "android";
                }
                //if (message) msg=message;
                //questo.socket.send(msg);
                questo.socket.emit('message', m);
            });
        });
        this.socket.on("broadcast", function (data) {
            console.log("socket broadcast received !!", data);
            var action = data.action;
            var bcast = data.broadcast;
            if (action == "add") {
                questo.backend.addFbLive(bcast);
            }
            if (action == "remove") {
                questo.backend.removeFbLive(bcast);
            }
            if (action == "reset") {
                questo.backend.fbLives = [];
            }
        });
        this.socket.on("realtime", function (data) {
            console.log("socket realtime received !!", data);
            questo.renderVoice(data);
            questo.events.publish('realtime', data, Date.now());
        });
        this.socket.on("scoreboard", function (data) {
            console.log("socket scoreboard received !!", data);
            //questo.renderVoice(data);
            questo.events.publish('scoreboard', data);
            questo.events.publish('scoreboardslave', data);
        });
        this.socket.on("scoreboards", function (data) {
            console.log("socket scoreboards received !!", data);
            //questo.renderVoice(data);
            questo.events.publish('scoreboards', data);
        });
        this.socket.on("realtimematches", function (rtmatches) {
            console.log("socket realtimematches received !!", rtmatches);
            questo.events.publish('realtimematches', rtmatches, Date.now());
        });
        this.socket.on("reconnect_error", function (msg) {
            console.log('on reconnect_error');
        });
        this.socket.on("reconnect_failed", function (msg) {
            console.log('on reconnect_failed');
        });
        this.socket.on("auserhasconnected", function (msg) {
            console.log('socket auserhasconnected in socket.ts', msg);
            /*questo.refreshContacts(function () {
              console.log("contacts refreshed", questo.contacts);
              questo.socketObserver.next({ category: 'auserhasconnected', message: msg });
            });*/
        });
        this.socket.on("auserhasdisconnected", function (msg) {
            console.log('socket auserhasdisconnected in socket.ts', msg);
            /*
            questo.refreshContacts(function () {
              console.log("contacts refreshed", questo.contacts);
              questo.socketObserver.next({ category: 'auserhasdisconnected', message: msg });
            });
            */
        });
        this.socket.on('disconnect', function () {
            console.log('user disconnected');
            // io.emit('user disconnected');
        });
        this.socket.on("updategara", function (msg) {
            console.log("received updategara!");
            questo.events.publish('updategara', msg, Date.now());
        });
        this.socket.on("fblive", function (msg) {
            console.log("received FBLIVE !!!", msg);
            //questo.backend.playSound("img/chatsend");
            var arr = msg.url.split("?");
            var arr2 = arr[0].split("rtmp/");
            var id = arr2[1];
            var status = msg.status;
            if (status == "on") {
                questo.backend.addFbLive(id);
            }
            if (status == "off") {
                questo.backend.removeFbLive(id);
            }
            console.log("FBvideo Id", id);
            //questo.backend.openUrl("https://www.facebook.com/demym/videos/"+id);
        });
        this.socket.on("chatmsg", function (msg) {
            console.log("chatmsg in socket.ts!", msg);
            questo.msgs.push(msg);
            var sockid = msg.sockid;
            var addit = false;
            if (msg.audio)
                addit = true;
            if (sockid != questo.backend.user.sockid)
                addit = true;
            if (addit) {
                questo.backend.chatmessages.push(msg);
                //questo.backend.playSound("img/chatsend");
                //questo.backend.playAudio("")
                //questo.backend.addChatUnread();
                questo.events.publish('chatmsg', msg);
                console.log("isChatView", questo.backend.isChatView);
                if (!questo.backend.isChatView) {
                    questo.backend.computeUnreadChats();
                    console.log("local notification emitted");
                    //questo.backend.localNotify(msg.nickname+" - "+msg.text);
                }
                if (msg.hasOwnProperty("nickname")) {
                    if (msg.nickname.toLowerCase() == "system") {
                        var txt = msg.text.replace("-", " a ");
                        txt = txt.replace("n.", " numero ");
                        questo.backend.playVoice(txt);
                    }
                }
            }
        });
        this.socket.on("message", function (msg) {
            console.log("socket message", msg);
            var tipo = msg.tipo;
            if (tipo == "msg") {
                //colog("received tipo msg ");
                //colog(msg);
                // var to_email = msg.to_email;
                var to_email2 = msg.to_email2;
                var from_email2 = msg.from_email2;
                //if (to_email==globals.socketid){
                if (to_email2 == _this.backend.user.email) {
                    console.log("SOCKET.JS - MESSAGE FOR ME !!", JSON.stringify(msg));
                    //msg.unread = true;
                }
                if (from_email2 == _this.backend.user.email) {
                    console.log("SOCKET.JS - MY OWN MESSAGE CALLBACK FOR ME !!", JSON.stringify(msg));
                    //msg.unread = true;
                    //msg.unread=false;
                }
                _this.msgs.push(msg);
                _this.computeUnread();
                console.log("messages in socket.js this.msgs", _this.msgs.length);
                console.log("contacts", _this.contacts);
                _this.socketObserver.next({ category: 'message', message: msg });
                questo.events.publish('updatetotalunreadcount', msg, Date.now());
                //this.requestBadgePermission();
                var bcount = _this.getAllUnreadMessages().length;
                //console.log("unreadmessages",bcount);
                //cordova.plugins.notification.badge.set(10);
            }
            //this.socketObserver.next({ category: 'message', message: msg });
        }); //end of socket.on('message')
        this.socket.on("rtcpeerconnected", function (id) {
            console.log("rtcpeerconnected in socket.ts", id);
            if (id == questo.backend.myPeerId)
                questo.backend.myPeerConnected = true;
            questo.backend.getPeers();
        });
        this.socket.on("rtcpeerdisconnected", function (id) {
            console.log("rtcpeerdisconnected in socket.ts", id);
            if (id == questo.backend.myPeerId)
                questo.backend.myPeerConnected = false;
            questo.backend.getPeers();
        });
        questo.syncChatMessages(function (data) {
            console.log("chatmessages synced in socket.ts");
        });
    };
    SocketService.prototype.renderVoice = function (data) {
        var questo = this;
        var text = data.match.atletaname;
        text += ", " + data.result;
        if (String(data.fineround) == "true") {
            text += ". Fine round " + data.round;
        }
        questo.backend.playVoice(text);
    };
    SocketService.prototype.resetUnreadMessagesFromEmail = function (email) {
        //console.log("resetunreadmessagesfromemail",email);
        var questo = this;
        this.msgs.forEach(function (item, idx) {
            /*console.log("my email",questo.backend.user.email);
            console.log("from",item.from_email2,"to",item.to_email2);
            console.log("item",item);*/
            if ((item.from_email2 == email) && (item.to_email2 == questo.backend.user.email)) {
                item.unread = false;
            }
        });
        var arr = this.getAllUnreadMessages();
        console.log("unread messages", arr.length);
    };
    SocketService.prototype.computeUnread = function () {
        var questo = this;
        var totunread = 0;
        this.contacts.forEach(function (item, idx) {
            var email = item.doc.email;
            var unread = 0;
            questo.msgs.forEach(function (mitem, midx) {
                if ((mitem.to_email2 == questo.backend.user.email) && (mitem.from_email2 == email)) {
                    if (mitem.hasOwnProperty("unread")) {
                        if (String(mitem.unread) == "true") {
                            unread++;
                            totunread++;
                        }
                    }
                }
            });
            item.doc.unreadcount = unread;
            console.log("computeunread, unread for " + item.doc.email, item.doc.unreadcount);
        });
        questo.totalunreadcount = totunread;
    };
    SocketService.prototype.getUnreadMessagesFromEmail = function (email) {
        var unread = [];
        var questo = this;
        this.msgs.forEach(function (item, idx) {
            var checkIt = false;
            /*console.log("my email",questo.backend.user.email);
            console.log("from",item.from_email2,"to",item.to_email2);
            console.log("item",item);*/
            if ((item.from_email2 == email) && (item.to_email2 == questo.backend.user.email)) {
                //console.log("eccone una !");
                checkIt = true;
            }
            if (checkIt) {
                if (item.hasOwnProperty("unread")) {
                    if (String(item.unread) == "true")
                        unread.push(item);
                }
            }
        });
        //console.log("getunreadmessagesfromemail",email,unread.length);
        return unread;
    };
    SocketService.prototype.getAllUnreadMessages = function () {
        var unread = [];
        var questo = this;
        this.msgs.forEach(function (item, idx) {
            var checkIt = false;
            /*console.log("my email",questo.backend.user.email);
            console.log("from",item.from_email2,"to",item.to_email2);
            console.log("item",item);*/
            if (item.to_email2 == questo.backend.user.email) {
                //console.log("eccone una !");
                checkIt = true;
            }
            if (checkIt) {
                if (item.hasOwnProperty("unread")) {
                    if (String(item.unread) == "true")
                        unread.push(item);
                }
            }
        });
        //console.log("getunreadmessagesfromemail",email,unread.length);
        console.log("setting badge to ", unread.length);
        //this.setBadges(bcount);
        if (this.platform.is('cordova')) {
            // (<any>window).plugins.notification.badge.set(bcount);
            console.log("platform is ready");
            questo.badge.hasPermission().then(function (a) {
                console.log("has permission", a);
                questo.badge.set(unread.length);
                console.log("badgenumber", questo.badge.get());
            });
        }
        ;
        return unread;
    };
    SocketService.prototype.syncChatMessages = function (callback) {
        var questo = this;
        this.backend.getChatMessages(function (data) {
            questo.msgs = data.rows;
            if (callback)
                callback(data);
        });
    };
    SocketService.prototype.clearUnreadForEmail = function (email) {
        var tag = "clearunreadforemail " + email;
        var questo = this;
        var total = 0;
        this.contacts.forEach(function (item, idx) {
            if (item.doc.email == email)
                item.doc.unreadcount = 0;
            var unr = item.doc.unreadcount;
            total += unr;
        });
        this.msgs.forEach(function (item, idx) {
            var doIt = false;
            if ((item.from_email2 == email) && (item.to_email2 == questo.backend.user.email))
                doIt = true;
            if (doIt)
                item.unread = false;
        });
        this.totalunreadcount = total;
        console.log(tag, "totalunreadcount", this.totalunreadcount, this.contacts);
        this.events.publish('updatetotalunreadcount', this.contacts, Date.now());
        var url = questo.backend.rooturl + "/chat/setmsgsread/" + email + "/" + questo.backend.user.email;
        questo.backend.fetchData(url, function (data) {
            console.log("setted msgs from " + email + " to " + questo.backend.user.email + " as read", data);
        });
    };
    SocketService.prototype.sendMessage = function (message) {
        console.log('socket sendMessage', message);
        this.socket.emit('message', message);
        //this.msgs.push(message);
        this.socketObserver.next({ category: 'sendMessage', message: message });
    };
    SocketService.prototype.sendCustomMessage = function (type, message) {
        console.log('socket sendCustomMessage ' + type, message);
        this.socket.emit(type, message);
        //this.socketObserver.next({ category: 'sendMessage', message: message });
        //this.msgs.push(message);
    };
    SocketService.prototype.getChatMessages = function (callback) {
        var questo = this;
        this.backend.getChatMessages(function (data) {
            console.log("getchatmessages in socket.ts", data);
            if (!data)
                data = [];
            data.rows.forEach(function (item, idx) {
                if (item.from_email2 == questo.backend.user.email)
                    item.unread = false;
            });
            questo.msgs = data.rows;
            if (callback)
                callback(data);
        });
    };
    SocketService.prototype.refreshContacts = function (callback) {
        var questo = this;
        questo.getChatMessages(function (mdata) {
            console.log("got chatmessages", mdata);
            questo.backend.getContacts(function (data) {
                data.forEach(function (item, idx) {
                    if (item.doc.email == questo.backend.user.email) {
                        data.splice(idx, 1);
                    }
                });
                var totalunreadcount = 0;
                data.forEach(function (item, idx) {
                    var unreadcount = questo.getUnreadMessagesFromEmail(item.doc.email).length;
                    item.doc.unreadcount = unreadcount;
                    totalunreadcount += unreadcount;
                });
                questo.contacts = data;
                questo.totalunreadcount = totalunreadcount;
                console.log("total unreadcount", questo.totalunreadcount);
                questo.events.publish('updatetotalunreadcount', {}, Date.now());
                if (callback)
                    callback(questo.contacts);
            });
        });
    };
    return SocketService;
}());
SocketService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_6_ionic_angular__["d" /* Events */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6_ionic_angular__["d" /* Events */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4__backend_backend__["a" /* BackendProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__backend_backend__["a" /* BackendProvider */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_5__ionic_native_badge__["a" /* Badge */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__ionic_native_badge__["a" /* Badge */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_6_ionic_angular__["p" /* Platform */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6_ionic_angular__["p" /* Platform */]) === "function" && _d || Object])
], SocketService);

var _a, _b, _c, _d;
//# sourceMappingURL=socket-service.js.map

/***/ }),

/***/ 33:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChatPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_socket_service_socket_service__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_backend_backend__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_tabs_tabs__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_chatfoto_chatfoto__ = __webpack_require__(522);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_chatlist_chatlist__ = __webpack_require__(523);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_popover_popover__ = __webpack_require__(524);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__angular_platform_browser__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_camera__ = __webpack_require__(525);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_social_sharing__ = __webpack_require__(526);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_file_transfer__ = __webpack_require__(527);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_native_file__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__ionic_native_media__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__ionic_native_streaming_media__ = __webpack_require__(113);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









//import { ChatpopoverPage } from '../../pages/chatpopover/chatpopover';










var ChatPage = (function () {
    function ChatPage(/*private _audioProvider: AudioProvider,*/ loadingCtrl, popoverCtrl, menuCtrl, alertCtrl, socialSharing, transfer, camera, file, domSanitizer, platform, nv, navparams, nav, modal, iapp, e, socket, mediaPlugin, streamingMedia, backend) {
        this.loadingCtrl = loadingCtrl;
        this.popoverCtrl = popoverCtrl;
        this.menuCtrl = menuCtrl;
        this.alertCtrl = alertCtrl;
        this.socialSharing = socialSharing;
        this.transfer = transfer;
        this.camera = camera;
        this.file = file;
        this.domSanitizer = domSanitizer;
        this.platform = platform;
        this.nv = nv;
        this.navparams = navparams;
        this.nav = nav;
        this.modal = modal;
        this.iapp = iapp;
        this.e = e;
        this.socket = socket;
        this.mediaPlugin = mediaPlugin;
        this.streamingMedia = streamingMedia;
        this.backend = backend;
        this.msg = "";
        this.msgs = [];
        this.friend = {};
        this.me = {};
        this.popped = false;
        this.overlay = false;
        this.chatButton = "audio";
        this.rtmatches = [];
        this.recording = false;
        this.loading = false;
        this.showCameraIcon = true;
        this.page = 0;
        this.totalPage = 100;
        this.recordsforpage = 40;
        this.buffer = 20;
        this.chatmessages = [];
        this.hasChip = false;
        this.pageframe = [];
        this.pages = [];
        this.pagefirst = 0;
        this.pagelast = 0;
        this.showprev = true;
        this.shownext = false;
        this.autoscroll = false;
        this.app = iapp;
        var questo = this;
        this.me = this.backend.user;
        /*this.myTracks = [{
          src: 'https://archive.org/download/JM2013-10-05.flac16/V0/jm2013-10-05-t12-MP3-V0.mp3',
          artist: 'John Mayer',
          title: 'Why Georgia',
          art: 'img/johnmayer.jpg',
          preload: 'metadata' // tell the plugin to preload metadata such as duration for this track, set to 'none' to turn off
        },
        {
          src: 'https://archive.org/download/JM2013-10-05.flac16/V0/jm2013-10-05-t30-MP3-V0.mp3',
          artist: 'John Mayer',
          title: 'Who Says',
          art: 'img/johnmayer.jpg',
          preload: 'metadata' // tell the plugin to preload metadata such as duration for this track,  set to 'none' to turn off
        }];
     
    
    
        */
        /*
            this.socket.socketService.subscribe(event => {
        
              console.log('event received in chat.ts', event);
              if (event.category === 'auserhasconnected') {
        
                console.log("auserhasconnected in chat.ts", event);
                console.log("this.friend", this.friend);
                if (event.message.user.email == this.friend.doc.email) {
                  console.log("it's him !!");
                  this.friend.connected = true;
                }
        
        
              }
        
        
              if (event.category === 'auserhasdisconnected') {
                // questo.refresh(function () {
                console.log("auserhasdisconnected in chat.ts", event);
                console.log("this.friend", this.friend);
                if (event.message.email == this.friend.doc.email) {
                  console.log("it's him !!");
                  this.friend.connected = false;
                }
        
        
              }
        
              if (event.category == 'chatmsg') {
                console.log("chatmsg received in chat.ts !!", event);
        
        
              }
              if (event.category === 'message') {
        
        
                console.log("new message in chat.ts", event);
        
                this.msgs = this.filterChatMessages2(questo.socket.msgs);
                let currentPage = this.nav.getActive().name;
                console.log('current page is: ', currentPage);
        
        
        
                if (currentPage == "ChatPage") {
                  questo.socket.clearUnreadForEmail(questo.friend.doc.email);
        
                  setTimeout(() => {
                    if (questo.content) questo.content.scrollToBottom();
        
                  });
                }
        
              }
        
            }); //end of subscribe
        */
    }
    ChatPage.prototype.goRefresh = function () {
        var questo = this;
        questo.loading = true;
        questo.refresh(function () {
            questo.loading = false;
        });
    };
    ChatPage.prototype.tapChip = function () {
        console.log("chip tapped");
        if (this.content)
            this.gotoBottom();
    };
    ChatPage.prototype.showPop = function (myEvent) {
        var questo = this;
        var chatsize = JSON.stringify(questo.backend.chatmessages).length;
        var popdata = [
            {
                cmd: "refresh",
                text: "Aggiorna",
                icon: "md-refresh"
            },
            {
                cmd: "list",
                text: "Lista chat",
                icon: "ios-list-box-outline"
            },
            {
                cmd: "reset",
                text: "Reset chat",
                icon: "ios-filing"
            },
            {
                cmd: "size",
                text: chatsize,
                icon: "ios-folder"
            }
        ];
        var popover = questo.popoverCtrl.create(__WEBPACK_IMPORTED_MODULE_8__pages_popover_popover__["a" /* PopoverPage */], popdata);
        popover.onDidDismiss(function (data, role) {
            console.log("data", data, "role", role);
            if (data == "list") {
                questo.selectChat();
                return;
            }
            if (data == "resize") {
                //questo.virtualScroll.resize();
                return;
            }
            if (data == "reset") {
                questo.resetChat();
                return;
            }
            if (data == "refresh") {
                questo.loading = true;
                questo.backend.getActiveChat(function () {
                    //questo.refresh(function () {
                    questo.loading = false;
                    questo.initView();
                    //if (questo.content) questo.content.resize();
                    //questo.virtualScroll.resize();
                });
                return;
            }
        });
        popover.present({
            ev: myEvent,
            animate: false
        });
    };
    /*
      showPop2(myEvent){
          var questo=this;
          let popover = questo.popoverCtrl.create(ChatpopoverPage);
          popover.onDidDismiss(function(data,role){
            console.log("data",data,"role",role);
            if (data=="chatlist") {
              questo.selectChat();
              return;
            }
            if (data=="chatreset") {
              questo.resetChat();
              return;
            }
            if (data=="chatrefresh") {
              questo.loading=true;
              questo.refresh(function(){
                questo.loading=false;
              })
              return;
            }
          })
          popover.present({
            ev: myEvent
          });
        
      }*/
    ChatPage.prototype.openMenu = function () {
    };
    ChatPage.prototype.ngOnInit = function () {
        console.log("ngoninit chat.ts");
        this.msg = '';
        var questo = this;
    };
    ChatPage.prototype.refresh = function (callback) {
        var questo = this;
        this.backend.getRtMatches(function (data) {
            questo.rtmatches = data;
            console.log("rtmatches", questo.rtmatches);
        });
        //this.loading=true;
        this.backend.getActiveChat(function (data) {
            console.log("got chat", data);
            console.log("questo.backend.activechatfilename", questo.backend.activechatfilename);
            questo.msgs = [];
            //questo.msgs = questo.backend.chatmessages;
            //questo.loading=false;
            setTimeout(function () {
                questo.initScroll();
                /*
                if (questo.content) {
                  console.log("scrollingtobottom")
                  questo.content.scrollToBottom();
                }
                */
                if (callback)
                    callback(data);
            }, 700);
        });
    };
    ChatPage.prototype.toggleVoice = function () {
        var questo = this;
        var retvalue = true;
        var text = "attivare";
        var text2 = "Attivazione";
        var text3 = "Attivandola sentirai pronunciare i punteggi del tempo reale e gli esiti degli incontri dall'assistente vocale";
        if (this.backend.appSettings.voice) {
            retvalue = false;
            text = "disattivare";
            text2 = "Disattivazione";
            text3 = "";
        }
        var alrt = questo.alertCtrl.create({
            title: "Conferma " + text2 + " funzione vocale",
            message: "Vuoi davvero " + text + " la funzione vocale del tempo reale ? " + text3,
            buttons: [
                {
                    text: 'Annulla',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Conferma',
                    handler: function () {
                        questo.backend.appSettings.voice = retvalue;
                    }
                }
            ]
        });
        alrt.present();
    };
    ChatPage.prototype.getVoiceIcon = function () {
        var questo = this;
        var retvalue = "md-mic";
        if (questo.backend.appSettings.voice) {
            retvalue = "md-mic";
        }
        else
            retvalue = "md-mic-off";
        return retvalue;
    };
    ChatPage.prototype.doRefresh = function (refresher) {
        console.log('Begin async operation', refresher);
        var questo = this;
        questo.refresh(function (data) {
            //console.log("allnews", data);
            refresher.complete();
        });
    };
    ChatPage.prototype.filterChatMessages = function () {
        var msgs = this.msgs;
        var questo = this;
        var ms = [];
        msgs.forEach(function (item, idx) {
            if ((item.to_email2 == questo.me.email) && (item.from_email2 == questo.friend.doc.email)) {
                //console.log("trovato msg");
                ms.push(item);
            }
            if ((item.to_email2 == questo.friend.doc.email) && (item.from_email2 == questo.me.email)) {
                //console.log("trovato msg");
                ms.push(item);
            }
        });
        this.msgs = ms;
    };
    ChatPage.prototype.filterChatMessages2 = function (msgs) {
        var questo = this;
        var ms = [];
        msgs.forEach(function (item, idx) {
            if ((item.to_email2 == questo.me.email) && (item.from_email2 == questo.friend.doc.email)) {
                //console.log("trovato msg");
                ms.push(item);
            }
            if ((item.to_email2 == questo.friend.doc.email) && (item.from_email2 == questo.me.email)) {
                //console.log("trovato msg");
                ms.push(item);
            }
        });
        return ms;
    };
    ChatPage.prototype.goBack = function () {
        this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_5__pages_tabs_tabs__["a" /* TabsPage */], { tab: 2 });
    };
    ChatPage.prototype.resetChat = function () {
        var questo = this;
        var alrt = questo.alertCtrl.create({
            title: 'Conferma archiviazione chat',
            message: "Vuoi davvero archiviare la chat attiva ?",
            buttons: [
                {
                    text: 'Annulla',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Conferma',
                    handler: function () {
                        var url = questo.backend.rooturl + "/chat/archive/";
                        questo.backend.fetchData(url, function (data) {
                            questo.refresh(function () {
                                alert("Chat resettata");
                            });
                        });
                    }
                }
            ]
        });
        alrt.present();
    };
    ChatPage.prototype.selectChat = function () {
        var questo = this;
        var cloading = questo.loadingCtrl.create({
            spinner: 'dots',
            content: "Caricamento lista chat in corso...."
        });
        cloading.onDidDismiss(function () {
            console.log('Dismissed loading');
        });
        cloading.present();
        var url = questo.backend.rooturl + "/chat/list";
        questo.backend.fetchData(url, function (data) {
            console.log("chats list", data);
            data.rows.sort(function (a, b) {
                var a1 = a.filename;
                var b1 = b.filename;
                if (a1 > b1)
                    return -1;
                if (a1 < b1)
                    return 1;
                return 0;
            });
            cloading.dismiss();
            var profileModal = questo.modal.create(__WEBPACK_IMPORTED_MODULE_7__pages_chatlist_chatlist__["a" /* ChatlistPage */], { data: data });
            profileModal.onDidDismiss(function (data) {
                console.log("chatlistdismissed", data);
                if (data) {
                    var loading_1 = questo.loadingCtrl.create({
                        spinner: 'dots',
                        content: "Caricamento chat in corso...."
                    });
                    loading_1.onDidDismiss(function () {
                        console.log('Dismissed loading');
                    });
                    loading_1.present();
                    var filename = data.filename;
                    questo.backend.activechatfilename = filename;
                    questo.refresh(function () {
                        console.log("caricata chat dal file " + filename);
                        questo.initView();
                        loading_1.dismiss();
                        /* setTimeout(() => {
                           
                             questo.initScroll();
                             /*questo.gotoTop();
                              questo.gotoBottom();*/
                        //if (questo.content) questo.content.scrollToBottom();
                        /* if (questo.content) {
                           console.log("scrolling to bottom");
                           questo.content.resize();
                           questo.content.scrollToBottom();
                           questo.content.resize();
                         }*/
                        // }, 700);*/
                    });
                }
            });
            profileModal.present();
        });
    };
    /*
    getPage(page) {
      var arr: any = [];
      var questo = this;
      if (page < 1) page = 1;
      if (page > questo.numPages()) page = questo.numPages();
      for (var i = (page - 1) * questo.recordsforpage; i < (page * questo.recordsforpage); i++) {
  
        arr.push(questo.backend.chatmessages[i]);
      }
      if (page == 1) {
        questo.showprev = false;
      } else {
        questo.showprev = true;
      }
  
      if (page == questo.numPages()) {
        questo.shownext = false;
      } else {
        questo.shownext = true;
      }
      questo.pageframe = arr;
      console.log("pageframe")
    }
    
  
    
    numPages() {
      var questo = this;
      return Math.ceil(questo.backend.chatmessages.length / questo.recordsforpage);
    }
  */
    ChatPage.prototype.initView = function () {
        var questo = this;
        questo.backend.setBackButtonAction(questo.navBar, questo.nav);
        console.log("initview chat.ts");
        var lastchatread = window.localStorage.getItem("ion2kwondo_lastchatread");
        if (questo.backend.chatmessages.length > 0) {
            var lasttime = questo.backend.chatmessages[questo.backend.chatmessages.length - 1].time;
            console.log("lastchatread", lastchatread, "lastchattime", lasttime);
            if (lastchatread != lasttime) {
                questo.hasChip = true;
            }
            else
                questo.hasChip = false;
        }
        questo.backend.resetChatUnread();
        questo.backend.isChatView = true;
        console.log("backend chat messages:", questo.backend.chatmessages);
        /*
        questo.pagelast = questo.backend.chatmessages.length - 1;
        questo.pagefirst = questo.pagelast - questo.recordsforpage;
        if (questo.pagefirst < 0) questo.pagefirst = 0;
    
        questo.pageframe = questo.getPageData(questo.pagefirst, questo.pagelast);
        console.log("first", questo.pagefirst, "last", questo.pagelast, questo.pageframe)
        */
        questo.gotoBottom();
        //questo.getLast(questo.recordsforpage);
        console.log("pageframe on load", questo.pageframe, "questo.pagefirst", questo.pagefirst, "questo.pagelast", questo.pagelast);
        //questo.getPage(questo.pages.length - 1);
        /*
            var bcmlast = questo.backend.chatmessages.length - 1;
            //questo.msgs=questo.backend.chatmessages;
            var bcmfirst = bcmlast - questo.recordsforpage;
            if (bcmfirst<0) bcmfirst=0;
            questo.pagefirst=bcmfirst;
            questo.pagelast=bcmlast;
            questo.pageframe=[];
        
        
            
            for (var i=bcmfirst; i<bcmlast; i++){
              
              questo.pageframe.push(questo.backend.chatmessages[i]);
            }
            if (bcmfirst==0) questo.showprev=false;
            if ((bcmfirst+questo.recordsforpage)>bcmlast) questo.shownext=false;
            console.log("questo.pageframe",questo.pageframe);
            */
        /*
            var count = -1;
            questo.chatmessages = [];
            var postdata = {
              garaid: "",
              nickname: "more_prev",
              sockid: questo.backend.user.sockid,
              text: ""
            }
            questo.chatmessages.push(postdata);
            for (var i = bcmfirst; i < bcmlast; i++) {
              count++;
              questo.chatmessages.push(questo.backend.chatmessages[i]);
        
            }
            */
        /*this.msgs=this.backend.chatmessages;
         setTimeout(() => {
            if (questo.content) {
              console.log("questo.content ce sta");
              questo.content.scrollToBottom();
            }
         
          }, 300);
    
    
    
       
    
        if (1==1) return;*/
        this.backend.getRtMatches(function (data) {
            questo.rtmatches = data;
            console.log("rtmatches", questo.rtmatches);
        });
        //questo.msgs=[];
        // questo.msgs = questo.backend.chatmessages;
        console.log("questo.backend.chatpageaccessed", questo.backend.chatpageaccessed);
        if ((!questo.backend.chatpageaccessed) || (questo.hasChip)) {
            setTimeout(function () {
                questo.gotoBottom();
                questo.backend.chatpageaccessed = true;
                questo.hasChip = false;
                //questo.virtualScroll.resize();
                //questo.initScroll();
                /*
                questo.gotoTop();
                questo.gotoBottom();
                */
                /*questo.content.resize();
          
                //if (questo.content) questo.content.scrollToBottom();
                if (questo.content) questo.content.scrollToBottom();*/
            }, 700);
        }
    };
    ChatPage.prototype.getFirst = function () {
        var questo = this;
        questo.pagelast = questo.recordsforpage - 1;
        questo.pagefirst = 0;
        if (questo.pagefirst < 0)
            questo.pagefirst = 0;
        var arr = [];
        for (var i = questo.pagefirst; i <= questo.pagelast; i++) {
            arr.push(questo.backend.chatmessages[i]);
        }
        questo.pageframe = arr;
        questo.showprev = true;
        //if (n<=questo.recordsforpage) questo.showprev=false;
        if (questo.recordsforpage > questo.backend.chatmessages.length) {
            questo.shownext = false;
            questo.showprev = false;
        }
    };
    ChatPage.prototype.getLast = function (n) {
        var questo = this;
        questo.pagelast = questo.backend.chatmessages.length - 1;
        questo.pagefirst = questo.pagelast + 1 - n;
        if (questo.pagefirst < 0)
            questo.pagefirst = 0;
        var arr = [];
        for (var i = questo.pagefirst; i <= questo.pagelast; i++) {
            arr.push(questo.backend.chatmessages[i]);
        }
        questo.pageframe = arr;
        questo.showprev = true;
        //if (n<=questo.recordsforpage) questo.showprev=false;
        if (questo.recordsforpage > questo.backend.chatmessages.length) {
            questo.shownext = false;
            questo.showprev = false;
        }
    };
    ChatPage.prototype.prevPage = function (n) {
        var questo = this;
        questo.shownext = true;
        var first = questo.pagefirst;
        for (var j = 0; j < n; j++) {
            first--;
            var doIt = true;
            if (first < 0) {
                first = 0;
                //questo.showprev=false;
            }
            else {
                for (var t = 0; t < 1000000; t++) { }
                ;
                questo.pageframe.unshift(questo.backend.chatmessages[first]);
                questo.pageframe.pop();
            }
        }
        questo.pagefirst = first;
        questo.pagelast = questo.pagefirst + questo.recordsforpage - 1;
        if (questo.pagelast == (questo.backend.chatmessages.length - 1))
            questo.shownext = false;
        if (questo.pagefirst == 0)
            questo.showprev = false;
        console.log("questo.pagefirst", questo.pagefirst, "questo.pagelast", questo.pagelast);
        questo.autoscroll = true;
        if (questo.content)
            questo.content.scrollTo(0, questo.buffer * 58, 300, function () {
                questo.autoscroll = false;
            });
    };
    ChatPage.prototype.nextPage = function (n) {
        var questo = this;
        questo.showprev = true;
        var last = questo.pagelast;
        for (var j = 0; j < n; j++) {
            last++;
            var doIt = true;
            if (last > (questo.backend.chatmessages.length - 1)) {
                last = questo.backend.chatmessages.length - 1;
            }
            else {
                questo.pageframe.shift();
                questo.pageframe.push(questo.backend.chatmessages[last]);
                ;
            }
        }
        questo.pagelast = last;
        questo.pagefirst = questo.pagelast - questo.recordsforpage + 1;
        if (questo.pagefirst == 0)
            questo.showprev = false;
        if (questo.pagelast == (questo.backend.chatmessages.length - 1))
            questo.shownext = false;
        //questo.pagelast=questo.pagefirst+questo.recordsforpage-1;
        console.log("questo.pagefirst", questo.pagefirst, "questo.pagelast", questo.pagelast);
        if (questo.content)
            questo.content.scrollToBottom(600);
    };
    ChatPage.prototype.onScroll = function (ev) {
        if (true)
            return;
        var questo = this;
        if (!ev)
            return;
        if (questo.autoscroll)
            return;
        console.log("onscroll", ev);
        if (ev.hasOwnProperty("scrollTop")) {
            var top = ev.scrollTop;
            var direction = ev.directionY;
            if (direction == "up") {
                if (top < 190) {
                    questo.prevPage(questo.buffer);
                }
            }
        }
    };
    ChatPage.prototype.getPageData = function (first, last) {
        console.log("getpagedata", first, last);
        var questo = this;
        var arr = [];
        for (var i = first; i <= last; i++) {
            arr.push(questo.backend.chatmessages[i]);
        }
        return arr;
    };
    ChatPage.prototype.dateChanged = function (m, i) {
        //if (i == 0) return true;
        //if (1 == 1) return false;
        var questo = this;
        var ii = questo.pagefirst + i;
        //console.log("datechanged i", i);
        if (ii > questo.backend.chatmessages.length)
            return false;
        if (ii == 0)
            return true;
        var retvalue = false;
        var mm = this.backend.chatmessages[ii - 1];
        if (mm.hasOwnProperty("time")) {
            if (m.hasOwnProperty("time")) {
                var t1 = mm.time.substring(0, 8);
                var t2 = m.time.substring(0, 8);
                //console.log(t2,t1);
                if (t1 != t2)
                    retvalue = true;
            }
        }
        return retvalue;
    };
    ChatPage.prototype.ionViewDidLoad = function () {
    };
    ChatPage.prototype.ionViewWillEnter = function () {
        console.log("ionviewwillenter chat.ts");
        var questo = this;
        if (!questo.isCordova()) {
            questo.chatButton = "text";
            this.showCameraIcon = false;
        }
        // this.initView();
        /////////////////
        this.e.subscribe("chatmsg", function (msg) {
            console.log("chatmsg in chat.ts !!", msg);
            questo.backend.resetChatUnread();
            //questo.backend.unread = 0;
            //questo.msgs.push(msg);
            if (questo.content) {
                console.log("content ce sta");
                setTimeout(function () {
                    //questo.content.scrollToBottom();
                    questo.gotoBottom();
                });
                //questo.getLast(questo.recordsforpage);
            }
            else {
                console.log("questo.content not found");
            }
        });
        this.e.subscribe("realtimematches", function (rtmatches, time) {
            console.log("realtimematches in chat.ts !!", rtmatches);
            questo.rtmatches = rtmatches.matches;
            console.log("rtmatches", questo.rtmatches);
        });
        this.e.subscribe("updategara", function (rtmatches, time) {
            //console.log("realtimematches in chat.ts !!", rtmatches);
            //questo.rtmatches = rtmatches.matches;
            //console.log("rtmatches", questo.rtmatches);
        });
        questo.initView();
        // if (questo.content) questo.gotoBottom();
    };
    ChatPage.prototype.ionViewDidLeave = function () {
        console.log("ionviewdidleave");
        //this.e.publish("exitedchat", "exitedchat");
        this.backend.isChatView = false;
        this.e.unsubscribe('chatmsg');
        this.e.unsubscribe("realtimematches");
    };
    ChatPage.prototype.ngAfterViewInit = function () {
        /*this.content=this.app.getgetComponent("chat");
        this.el = this.content.elementRef.nativeElement;*/
    };
    ChatPage.prototype.sendMessage = function () {
        var questo = this;
        var text = questo.msg;
        questo.msg = "";
        var m = {
            garaid: "",
            nickname: questo.backend.user.nickname,
            sockid: questo.backend.user.sockid,
            //audio: data,
            text: text
        };
        questo.postLocalChat(m);
        questo.backend.postChat(m, function () {
            questo.gotoBottom();
        });
    };
    ChatPage.prototype.close = function () {
        // this.modal.close();
    };
    ChatPage.prototype.back = function () {
        this.nav.pop();
        this.popped = false;
    };
    ChatPage.prototype.keyPress = function (event) {
        // console.log(event, event.keyCode, event.keyIdentifier);
        if (event.keyCode == 13)
            this.sendMessage();
    };
    ChatPage.prototype.getNormalDate = function (m) {
        //console.log("getnormaldate",m);
        //var mom = moment(m, "YYYYMMDDHHmmSS").format("DD/MM/YYYY HH:mm:SS");
        var mom = __WEBPACK_IMPORTED_MODULE_4_moment__(m, "YYYYMMDDHHmmSS").format("HH:mm:SS");
        return mom;
    };
    ChatPage.prototype.getOnlyDate = function (m) {
        //console.log("getnormaldate",m);
        __WEBPACK_IMPORTED_MODULE_4_moment__["locale"]('it');
        var mom = __WEBPACK_IMPORTED_MODULE_4_moment__(m, "YYYYMMDDHHmmSS").format("dddd DD MMMM YYYY");
        return mom;
    };
    ChatPage.prototype.openAudioUrl = function (url) {
        this.backend.openUrl(url);
    };
    ChatPage.prototype.mailTo = function (email) {
        window.open("mailto:" + email, '_system');
    };
    ChatPage.prototype.phoneTo = function (phone) {
        window.open("tel:" + phone, '_system');
    };
    ChatPage.prototype.focus = function () {
        console.log("focus");
        this.chatButton = "text";
        this.showCameraIcon = false;
    };
    ChatPage.prototype.blur = function (e) {
        var questo = this;
        console.log("blur", e);
        if (questo.isCordova()) {
            this.showCameraIcon = true;
            setTimeout(function () {
                questo.chatButton = "audio";
                console.log("timeout passed");
            }, 1000);
        }
    };
    ChatPage.prototype.play = function () {
        var questo = this;
        if (questo.platform.is("cordova")) {
            window['plugins'].audioRecorderAPI.playback(function (msg) {
                // complete
                console.log("play audio complete", msg);
            }, function (msg) {
                // failed
                console.log("error in play audio", msg);
            });
        }
    };
    ChatPage.prototype.toggleRecording = function () {
        var questo = this;
        this.recording = !this.recording;
        if (this.recording) {
            questo.record();
        }
        else
            questo.stop();
    };
    ChatPage.prototype.stop = function () {
        console.log("stop audio record");
        var questo = this;
        if (questo.platform.is("cordova")) {
            window['plugins'].audioRecorderAPI.stop(function (msg) {
                console.log("audio record stopped", msg);
                questo.play();
                var fname = msg.substring(1);
                var arr = msg.split("/");
                fname = 'file://' + msg;
                console.log("STOP, fname: " + fname);
                console.log("msg: " + msg);
                var alert = questo.alertCtrl.create({
                    title: 'Conferma invio audio',
                    message: "Il tuo messaggio audio è in riproduzione. Vuoi davvero inviarlo ?",
                    buttons: [
                        {
                            text: 'Annulla',
                            role: 'cancel',
                            handler: function () {
                                console.log('Cancel clicked');
                            }
                        },
                        {
                            text: 'OK',
                            handler: function () {
                                console.log('OK clicked');
                                questo.file.resolveLocalFilesystemUrl(fname).then(function (fileEntry) {
                                    console.log("fileEntry: ", fileEntry);
                                    fileEntry.file(function (file) {
                                        console.log("file: ", file);
                                        var reader = new FileReader();
                                        console.log("reader", reader);
                                        reader.onload = function () {
                                            console.log('onload readystate: ' + reader.readyState);
                                            var dataURL = reader.result;
                                            //console.log(dataURL);
                                            var sounddata = dataURL;
                                            console.log("sounddata", sounddata);
                                            var msg = {
                                                nickname: questo.backend.user.nickname,
                                                sockid: questo.backend.user.sockid,
                                                audio: sounddata,
                                                text: ""
                                            };
                                            //questo.postLocalChat(msg);
                                            questo.backend.postChat(msg, function () {
                                                console.log("audio posted !!");
                                                questo.gotoBottom();
                                            });
                                        };
                                        reader.onloadend = function (evt) {
                                            console.log("onloadend", evt);
                                        };
                                        reader.onloadstart = function () {
                                            console.log("onloadstart");
                                        };
                                        reader.onprogress = function () {
                                            console.log("onloadprogress");
                                        };
                                        reader.readAsDataURL(file);
                                        return true;
                                    }, function (err) {
                                        console.log("error in fileentry read ", err);
                                    });
                                    return true;
                                }, function (error) {
                                    console.log("error reading file", error);
                                    return false;
                                });
                            }
                        }
                    ]
                });
                alert.present();
            }, function (msg) {
                console.log("error in stop audio", msg);
            });
        }
    };
    ChatPage.prototype.record = function () {
        var questo = this;
        console.log("start audio record");
        questo.recording = true;
        if (questo.platform.is("cordova")) {
            window['plugins'].audioRecorderAPI.record(function (msg) {
                // complete
                console.log("success recording audio !", msg);
                questo.play();
            }, function (msg) {
                // failed
                console.log("error recording audio !", msg);
            }, 20); // record 30 seconds
        }
    };
    ChatPage.prototype.takeFoto = function () {
        var questo = this;
        console.log("takefoto");
        if (questo.platform.is("cordova")) {
            questo.getImageSource(function (data) {
                console.log("getimagesource dialog returns ", data);
                if (data == "cancel")
                    return;
                var sourcetype = questo.camera.PictureSourceType.CAMERA;
                if (data == "gallery")
                    sourcetype = questo.camera.PictureSourceType.PHOTOLIBRARY;
                var options = {
                    quality: 80,
                    targetWidth: 500,
                    targetHeight: 500,
                    destinationType: questo.camera.DestinationType.DATA_URL,
                    encodingType: questo.camera.EncodingType.JPEG,
                    mediaType: questo.camera.MediaType.PICTURE,
                    sourceType: sourcetype
                };
                questo.camera.getPicture(options).then(function (imageData) {
                    // imageData is either a base64 encoded string or a file URI
                    // If it's base64:
                    console.log("imagedata", imageData);
                    var base64Image = 'data:image/jpeg;base64,' + imageData;
                    console.log("base64image", base64Image);
                    var postdata = {
                        garaid: "",
                        nickname: questo.backend.user.nickname,
                        sockid: questo.backend.user.sockid,
                        foto: base64Image,
                        text: ""
                    };
                    questo.postLocalChat(postdata);
                    questo.backend.postChat(postdata, function (data) {
                        console.log("foto posted to chat !!");
                        questo.gotoBottom();
                    });
                }, function (err) {
                    console.log("error taking picture", err);
                });
            });
        }
    };
    ChatPage.prototype.getBase64 = function (m) {
        return m;
    };
    ChatPage.prototype.openFoto = function (url, m) {
        this.nav.push(__WEBPACK_IMPORTED_MODULE_6__pages_chatfoto_chatfoto__["a" /* ChatfotoPage */], {
            url: url,
            msg: m
        });
        /*
        let profileModal = this.modal.create(ChatfotoPage, {
          url: url,
          msg: m
        });
         profileModal.present();
         */
    };
    ChatPage.prototype.openFotoInGallery = function (url) {
        console.log("open foto", url);
        // window.open(url, '_system', 'width=310,height=30');
        //if (1==1) return;
        var questo = this;
        if (questo.platform.is("cordova")) {
            window['cordova'].plugins.FileOpener.openFile(url, function (data) {
                console.log("file " + url + " successfully opened");
            }, function (err) {
                console.log("error opening file", url, err);
            });
            /* questo.fileOpener.open(url, 'image/jpeg')
                  .then(() => console.log('File is opened', url))
                  .catch(e => console.log('Error openening file', e));*/
            if (true)
                return;
            /*
            const fileTransfer: TransferObject = questo.transfer.create();
            var d = new Date();
            var md = moment(d).format("YYYYMMDDHHmmSS");
            fileTransfer.download(url, this.file.dataDirectory + 'appkwondoimg_' + md + ".jpg").then((entry) => {
              var fname = entry.toURL();
              console.log('download complete: ' + entry.toURL());
              //var ffname=fname.replace("file:///","");
              var ffname=fname;
              
              questo.fileOpener.open(ffname, 'image/jpeg')
                .then(() => console.log('File is opened', ffname))
                .catch(e => console.log('Error openening file', e));
      
            }, (error) => {
              console.log("error transferring ", url);
            });
            */
        }
        else {
            window.open(url, '_system', 'width=310,height=30');
        }
    };
    ChatPage.prototype.shareItem = function (m) {
        console.log("shareItem", m);
        if (m.audiourl) {
            this.shareAudio(m);
            return;
        }
        if (m.fotourl) {
            this.shareFoto(m.fotourl);
            return;
        }
    };
    ChatPage.prototype.shareText = function (url) {
        console.log("shareText", url);
        this.socialSharing.share(url, null, null, null).then(function () {
            console.log("share successfull");
        }).catch(function () {
            // Sharing via email is not possible
            console.log("error in share");
        });
    };
    ChatPage.prototype.shareAudio = function (item) {
        this.backend.playFeedback();
        console.log("shareAudio", item);
        var url = item.audiourl;
        this.socialSharing.share(null, null, url, null).then(function () {
            console.log("share successfull");
        }).catch(function () {
            // Sharing via email is not possible
            console.log("error in share");
        });
    };
    ChatPage.prototype.share = function (item) {
        console.log("item", item);
        this.backend.playFeedback();
        var url = "";
        this.socialSharing.share(null, null, url, null).then(function () {
            console.log("share successfull");
        }).catch(function () {
            // Sharing via email is not possible
            console.log("error in share");
        });
    };
    ChatPage.prototype.shareFoto = function (url) {
        console.log("shareFoto", url);
        this.backend.playFeedback();
        this.socialSharing.share(null, null, url, null).then(function () {
            console.log("share successfull");
        }).catch(function () {
            // Sharing via email is not possible
            console.log("error in share");
        });
    };
    /*
  
    ngAfterContentInit() {
      // get all tracks managed by AudioProvider so we can control playback via the API
      this.allTracks = this._audioProvider.tracks;
    }
    
    playSelectedTrack() {
      // use AudioProvider to control selected track
      this._audioProvider.play(this.selectedTrack);
    }
    
    pauseSelectedTrack() {
       // use AudioProvider to control selected track
       this._audioProvider.pause(this.selectedTrack);
    }
           
    onTrackFinished(track: any) {
      console.log('Track finished', track)
    }
  
    getTrack(m){
      var tr={
        src: m.audio
      }
      return tr;
    }
  
    */
    ChatPage.prototype.gotoTop = function () {
        var questo = this;
        if (questo.content) {
            //questo.content.resize();
            console.log("questo.content ce sta");
            // questo.getFirst();
            setTimeout(function () {
                questo.content.scrollToTop(600);
                questo.content.resize();
                // questo.content.scrollToBottom();
                //questo.content.scrollTo(0, 400, 0); 
            }, 700);
        }
    };
    ChatPage.prototype.initScroll = function () {
        var questo = this;
        questo.content.resize();
        if (true)
            return;
        if (questo.content) {
            console.log("questo.content ce sta");
            questo.content.resize();
            questo.content.scrollToBottom().then(function () {
                console.log("scrolled to bottom");
                questo.content.resize();
            }, function (reason) {
                console.log("error scrolling to bottom", reason);
            });
            if (true)
                return;
            questo.content.scrollToTop().then(function (data) {
                console.log("scrolled to top");
                questo.content.resize();
                questo.content.scrollToBottom().then(function () {
                    console.log("scrolled to bottom");
                    questo.content.resize();
                }, function (reason) {
                    console.log("error scrolling to bottom", reason);
                });
            }, function (reason) {
                console.log("error scrolling to top", reason);
            });
            //questo.content.resize();
            /* setTimeout(()=>{
              
               
             },700);*/
            //questo.content.scrollTo(0, 400, 0); 
        }
    };
    ChatPage.prototype.gotoBottom = function () {
        var questo = this;
        questo.getLast(questo.recordsforpage);
        questo.shownext = false;
        if (questo.content) {
            console.log("gotobottom questo.content ce sta");
            //questo.content.resize();
            questo.autoscroll = true;
            setTimeout(function () {
                questo.content.scrollToBottom(600);
                var bottom = (questo.backend.chatmessages.length - 1) * 230;
                console.log("bottom", bottom);
                //questo.content.scrollTo(0,bottom, 300); 
                questo.content.resize();
                questo.autoscroll = false;
            }, 700);
            //questo.content.scrollTo(0, 400, 0);   // questo è lo scroll originale
            /*var element = document.querySelector('#content');
            console.log(element);
            element.scrollIntoView();*/
            //questo.content.scrollTo(0, 100*questo.backend.chatmessages.length)
            // questo.content.scrollTo(0, (questo.backend.chatmessages.length-1) * 100, 0);
            //questo.content.scrollToBottom();
            /*let dimensions = questo.content.getContentDimensions();
            console.log("dimensions",dimensions);
            questo.content.scrollTo(0, dimensions.scrollHeight + 100, 0);
            questo.content.resize();*/
            /*var myElement = document.getElementById('content');  // Container which has scrollable vertical contents
            console.log("scrolltop",myElement.scrollTop);  // Gives scrolled poins from top
            console.log("scrollheight",myElement.scrollHeight);  // Gives maximum scrollable vertical space
        
            myElement.scrollTop = myElement.scrollHeight;*/
            // questo.myScrollContainer.nativeElement.scrollTop = questo.myScrollContainer.nativeElement.scrollHeight;
        }
        else
            console.log("questo.content NON ce sta");
    };
    ChatPage.prototype.getImageSource = function (callback) {
        var questo = this;
        var alert = questo.alertCtrl.create({
            title: 'Seleziona sorgente',
            message: 'Select sorgente immagine',
            buttons: [
                {
                    text: 'Annulla',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                        callback("cancel");
                    }
                },
                {
                    text: 'FOTOCAMERA',
                    handler: function () {
                        console.log('CAMERA clicked');
                        callback("camera");
                    }
                },
                {
                    text: 'GALLERIA',
                    handler: function () {
                        console.log('GALLERY clicked');
                        callback("gallery");
                    }
                }
            ]
        });
        alert.present();
    };
    ChatPage.prototype.isCordova = function () {
        var isCordova = this.platform.is("cordova");
        return isCordova;
    };
    ChatPage.prototype.isCordovaIOS = function () {
        var questo = this;
        var retvalue = false;
        var isCordova = questo.platform.is("cordova");
        var isIOS = questo.platform.is("ios");
        //console.log("iscordova",isCordova,"isIOS",isIOS);
        if (isCordova && isIOS)
            retvalue = true;
        // console.log("retvalue",retvalue);
        return retvalue;
    };
    ChatPage.prototype.playAudioIos = function (m) {
        console.log(m);
        if (m.hasOwnProperty("audiourl"))
            window.open(m.audiourl);
    };
    ChatPage.prototype.downloadFileAndPlay = function (url) {
        console.log("dowloadandplay", url);
        var options = {
            successCallback: function () { console.log('Video played'); },
            errorCallback: function (e) { console.log('Error streaming'); },
            initFullscreen: false
        };
        this.streamingMedia.playAudio(url, options);
        if (true)
            return;
    };
    ChatPage.prototype.postLocalChat = function (msg) {
        var questo = this;
        var tim = __WEBPACK_IMPORTED_MODULE_4_moment__().format("YYYYMMDDHHmmSS");
        var sockid = questo.backend.user.sockid;
        var localmsg = Object.assign({}, msg);
        localmsg.time = tim;
        localmsg.sockid = sockid;
        questo.backend.chatmessages.push(localmsg);
        setTimeout(function () {
            questo.gotoBottom();
        }, 300);
    };
    ChatPage.prototype.doInfinite = function (infiniteScroll) {
        this.page = this.page + 1;
        console.log("page", this.page);
        setTimeout(function () {
            console.log('Async operation has ended');
            infiniteScroll.complete();
        }, 1000);
    };
    ChatPage.prototype.doPrevInfinite = function (infiniteScroll) {
        this.prevPage(this.buffer);
        setTimeout(function () {
            console.log('Async operation has ended');
            infiniteScroll.complete();
        }, 1000);
    };
    ChatPage.prototype.doNextInfinite = function (infiniteScroll) {
        this.nextPage(this.buffer);
        setTimeout(function () {
            console.log('Async operation has ended');
            infiniteScroll.complete();
        }, 1000);
    };
    ChatPage.prototype.showMatchOrd = function (m) {
        var retvalue = false;
        if (m.hasOwnProperty("matchord")) {
            if (m.matchord.trim() != "") {
                retvalue = true;
            }
        }
        return retvalue;
    };
    ChatPage.prototype.hasHTML = function (m) {
        var retvalue = false;
        if (m.hasOwnProperty("html")) {
            retvalue = true;
        }
        return retvalue;
    };
    ChatPage.prototype.getHTML = function (m) {
        var html = this.domSanitizer.bypassSecurityTrustHtml(m.html);
        return html;
    };
    ChatPage.prototype.getChatText = function (t) {
        var questo = this;
        var retvalue = t;
        var doSub = false;
        if (t.indexOf("http://") > -1)
            doSub = true;
        if (t.indexOf("https://") > -1)
            doSub = true;
        doSub = false;
        if (doSub) {
            var arr = t.split(" ");
            var foundHTML = false;
            arr.forEach(function (item, idx) {
                console.log("analizzo parola ", item);
                var isHTML = false;
                if (item.indexOf("http://") > -1)
                    isHTML = true;
                if (item.indexOf("https://") > -1)
                    isHTML = true;
                if (isHTML) {
                    var news = "<a href='" + item + "' target='_blank'>" + item + "</a>";
                    console.log("trovato, sostituisco con", news);
                    arr[idx] = news;
                    foundHTML = true;
                }
            });
            if (foundHTML) {
                retvalue = arr.join(" ");
                console.log("retvalue", retvalue);
            }
        }
        retvalue = questo.domSanitizer.bypassSecurityTrustHtml(retvalue);
        return retvalue;
    };
    return ChatPage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_0_ionic_angular__["o" /* Navbar */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["o" /* Navbar */])
], ChatPage.prototype, "navBar", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewChild"])('virtualScroll', { read: __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["v" /* VirtualScroll */] }),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["v" /* VirtualScroll */])
], ChatPage.prototype, "virtualScroll", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_0_ionic_angular__["c" /* Content */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["c" /* Content */])
], ChatPage.prototype, "content", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewChild"])('content'),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["c" /* Content */])
], ChatPage.prototype, "chatcontent", void 0);
ChatPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({template:/*ion-inline-start:"/Users/demetriomortelliti/Desktop/demy/PROJECTS/appkwondo/clients/ion2kwondo/src/pages/chat/chat_infinity.html"*/'<!--<ion-menu [content]="content" menuToggle="right" side="right">\n  <ion-header >\n    <ion-toolbar>\n      <ion-title>Menuright</ion-title>\n    </ion-toolbar>\n  </ion-header>\n\n  <ion-content class="menu" style="overflow-y: hidden">\n  </ion-content>\n</ion-menu>-->\n\n\n\n<ion-header>\n   \n  <ion-navbar>\n     \n  \n      <button ion-button menuToggle="left" start>\n          <ion-icon name="menu"></ion-icon>\n        </button>\n       <ion-title>ChatKwonDo</ion-title>\n       <ion-buttons end>\n          <button ion-button class="menubutton"  (tap)="gotoTop(); backend.playFeedback();"><ion-icon name="md-arrow-dropup-circle"></ion-icon></button>\n    <button ion-button class="menubutton" (click)="gotoBottom(); backend.playFeedback();"><ion-icon name="md-arrow-dropdown-circle"></ion-icon></button>\n    <button *ngIf="!backend.userIsAdmin()" ion-button class="menubutton" (click)="goRefresh(); backend.playFeedback();"><ion-icon name="md-refresh"></ion-icon></button>\n    <!--<button class="menubutton" *ngIf="backend.user.role==\'tkdradmin\'" ion-button  (click)="resetChat(); backend.playFeedback();"><ion-icon name="ios-filing"></ion-icon></button>\n    <button class="menubutton" *ngIf="backend.user.role==\'tkdradmin\'" ion-button  (click)="selectChat(); backend.playFeedback();"><ion-icon name="ios-list-box-outline"></ion-icon></button>\n    <button ion-button menuToggle="right">\n      <ion-icon name="menu"></ion-icon>\n    </button>-->\n    <button *ngIf="backend.userIsAdmin()" ion-button icon-only (click)="showPop($event)">\n      <ion-icon name="md-more"></ion-icon>\n    </button>\n    </ion-buttons>\n     <!--  <ion-buttons end>\n          <button ion-button class="menubutton"  (tap)="gotoTop(); backend.playFeedback();"><ion-icon name="md-arrow-up"></ion-icon></button>\n    <button ion-button class="menubutton" (click)="gotoBottom(); backend.playFeedback();"><ion-icon name="md-arrow-down"></ion-icon></button>\n    <button class="menubutton" *ngIf="backend.user.role==\'tkdradmin\'" ion-button  (click)="resetChat(); backend.playFeedback();"><ion-icon name="ios-filing"></ion-icon></button>\n    <button class="menubutton" *ngIf="backend.user.role==\'tkdradmin\'" ion-button  (click)="selectChat(); backend.playFeedback();"><ion-icon name="ios-list-box-outline"></ion-icon></button>\n    <button ion-button menuToggle="right">\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    </ion-buttons>-->\n        <!--<ion-grid class="no-padding">\n          <ion-row>\n            <ion-col width-20>\n             \n            </ion-col>\n            <ion-col>\n\n              <ion-row>\n                <ion-col>\n                  <span class="friendnick">{{friend.doc.firstname}} {{friend.doc.lastname}}</span>\n                </ion-col>\n              </ion-row>\n              <ion-row>\n\n                <ion-col>\n                  <span class="friendmail">{{friend.doc.email}}</span>\n                </ion-col>\n              </ion-row>\n\n\n            </ion-col>\n            <ion-col width-20>\n              <span class="status" [ngClass]="friend.connected ? \'onlinechat\' : \'offlinechat\'">{{friend.connected ? \'ONLINE\' : \'OFFLINE\'}}</span>\n            </ion-col>\n          </ion-row>\n        </ion-grid>-->\n        <!--</ion-title>-->\n      </ion-navbar>\n\n   <!-- <ion-card>-->\n\n      \n\n\n\n\n    <!--</ion-card>-->\n    <section sstyle="position: fixed; top: 65px; width: 100%; height: 40px; z-index: 9000;" id="realtime" *ngIf="rtmatches.length>0">\n      \n        <ion-item class="rtmatches" *ngFor="let rt of rtmatches">\n          <ion-row>\n            <ion-col col-2><img src="assets/img/greenblink.gif" /></ion-col>\n            <ion-col>\n            <ion-row><ion-col><div class="match">{{rt.match.matchid}} - {{rt.match.atletaname}}</div></ion-col></ion-row>\n            <ion-row *ngIf="showMatchOrd(rt.match)"><ion-col><div class="matchord">{{rt.match.matchord}}</div></ion-col></ion-row>\n            <ion-row><ion-col><div class="match" [innerHTML]="rt.text"></div></ion-col></ion-row>\n            </ion-col>\n          </ion-row>\n          <div *ngIf="rt.avversario" class="avversario">contro {{rt.avversario.split(\'|\')[0]}}<br>{{rt.avversario.split(\'|\')[1]}}</div>\n          </ion-item>\n      \n  \n    </section>  \n  \n    <div style="text-align: center; z-index: 9000">\n      <ion-chip  (tap)="tapChip()" *ngIf="false" color="secondary">\n        <ion-label color="dark">Nuovi messaggi non letti</ion-label>\n      </ion-chip>\n    </div>\n\n</ion-header>\n\n\n<ion-content id="chat" class="chat" (ionScroll)="onScroll($event)">\n    <ion-fab right>\n        <button color="light" (tap)="toggleVoice()" ion-fab><ion-icon [name]="getVoiceIcon()"></ion-icon></button>\n      </ion-fab>\n   <!--<ion-refresher (ionRefresh)="doRefresh($event)">\n    <ion-refresher-content refreshingSpinner="ios">\n        </ion-refresher-content>\n  </ion-refresher>  -->\n  \n  <!--<div [ngClass]="friend.connected ? \'\' : \'overlay\'"></div>-->\n  <div *ngIf="loading" style="text-align:center"><ion-spinner  text-center name="ios" *ngIf="loading"></ion-spinner></div>\n  \n  <div class="messages"> \n      <!--<ion-infinite-scroll position="top" (ionInfinite)="doPrevInfinite($event)" >\n          <ion-infinite-scroll-content loadingSpinner="bubbles" loadingText="Loading more data..."></ion-infinite-scroll-content>\n        </ion-infinite-scroll>-->\n    <button class="prevnext" (tap)="prevPage(buffer)" ion-button block color="light" *ngIf="showprev">Messaggi precedenti</button>\n    <!-- *ngFor="let m of msgs" -->\n\n  \n    <ion-list  *ngFor="let m of pageframe; let i=index;" > <!--*ngFor="let m of msgs"-->\n      <ion-item *ngIf="dateChanged(m,i)" class="datachange">{{getOnlyDate(m.time)}}</ion-item>\n\n      <!-- ex ion-item -->\n      <ion-item (press)="shareItem(m)" class="message"  [ngClass]="(m.nickname===me.nickname) ? \'message me\': (m.color==\'yellow\') ? \'message system\' : hasHTML(m) ? \'message htmldiv\' : \'message\'">\n       \n          <div class="msgemail">{{m.nickname}}    <span class="date">{{ getNormalDate(m.time) }}</span></div> \n       \n         <div  *ngIf="m.foto" class="divcont">  \n      <img class="ionimg" (press)="shareFoto(m.foto)" (tap)="openFoto(m.foto,m)" [src]="getBase64(m.foto)" />\n      </div><br *ngIf="m.foto">\n      <div  *ngIf="m.fotourl && !m.foto" class="divcont">  <!-- (press)="shareFoto(m.fotourl)" -->\n      <img class="ionimg"  (tap)="openFoto(m.fotourl,m)" [src]="m.fotourl" />\n      </div><br *ngIf="m.fotourl && !m.foto">\n\n      <!--<img-loader *ngIf="m.fotourl" [src]="m.fotourl"></img-loader>-->\n        <div  *ngIf="m.audio" class="divcont">  <!--(press)="shareAudio(m)"-->\n            <!--<audio-track #audio   [track]="getTrack(m)" (onFinish)="onTrackFinished($event)">\n            <audio-track-play dark [audioTrack]="audio"><ion-spinner></ion-spinner></audio-track-play>  \n            <audio-track-progress-bar dark duration progress [audioTrack]="audio" ></audio-track-progress-bar>\n            </audio-track>-->\n      <audio   style="width: 100%" *ngIf="m.audio && !isCordova()" [src]="domSanitizer.bypassSecurityTrustUrl(m.audio)" controls>\n    Your browser does not support the audio element.\n     </audio><br>\n     <button ion-button *ngIf="m.audiourl && !isCordova()" (tap)="openAudioUrl(m.audiourl)"><ion-icon name="md-play"></ion-icon>&nbsp;Messaggio vocale</button>\n     <button *ngIf="isCordova() || isCordovaIOS()" ion-button style="height: 40px;" (tap)="downloadFileAndPlay(m.audiourl)"><ion-icon name="md-play"></ion-icon>&nbsp;Messaggio vocale</button>\n    </div><br *ngIf="m.audio"> \n\n\n     \n\n    \n    \n\n      \n      <span  (press)="shareText(m.text)" *ngIf="m.text.trim()!=\'\'" class="msgtext" [innerHTML]="getChatText(m.text)"></span><br *ngIf="m.text.trim()!=\'\'" >\n      <div *ngIf="hasHTML(m)" class="htmldiv" [innerHTML]="getHTML(m)">\n       \n      </div>\n  </ion-item>  <!-- ex ion-item -->\n\n    </ion-list>\n    <button class="prevnext" (tap)="nextPage(buffer)" ion-button block color="light" *ngIf="shownext">Messaggi successivi</button>\n    <!--<ion-infinite-scroll position="bottom" (ionInfinite)="doNextInfinite($event)" >\n        <ion-infinite-scroll-content loadingSpinner="bubbles" loadingText="Loading more data..."></ion-infinite-scroll-content>\n      </ion-infinite-scroll>-->\n    \n    <!--<audio-track #audio *ngFor="let track of myTracks"  [track]="track" (onFinish)="onTrackFinished($event)">\n      <ion-item>  \n        <ion-thumbnail item-left>\n          <img src="{{audio.art}}">\n          <audio-track-play dark [audioTrack]="audio"><ion-spinner></ion-spinner></audio-track-play>  \n        </ion-thumbnail>\n        <div item-content style="width:100%">\n          <p><strong>{{audio.title}}</strong> ⚬ <em>{{audio.artist}}</em></p>\n          <audio-track-progress-bar dark duration progress [audioTrack]="audio" [ngStyle]="{visibility: audio.completed > 0 ? \'visible\' : \'hidden\'}"></audio-track-progress-bar>\n        </div>\n      </ion-item>    \n    </audio-track>-->\n    </div>\n  \n   \n \n\n\n\n\n</ion-content>\n<ion-footer>\n  <!--<div class="bottom_bar">-->\n \n    <ion-grid >\n      <ion-row >\n        <ion-col >\n          <ion-icon *ngIf="showCameraIcon" class="cameraicon" (tap)="takeFoto()" name="md-camera"></ion-icon>\n          <!--<ion-textarea (ionFocus)="focus()" (ionBlur)="blur($event)" class="inputtext" placeholder="Digita qui il tuo messaggio" [(ngModel)]="msg" (keypress)="keyPress($event)" style="height: 40px; font-size: 16px; margin: 0px 0px;" > </ion-textarea>-->\n          <ion-input (ionFocus)="focus()" (ionBlur)="blur($event)" type="text" class="inputtext" placeholder="Digita qui il tuo messaggio" [(ngModel)]="msg" (keypress)="keyPress($event)"></ion-input>\n        </ion-col>\n        <ion-col col-2 *ngIf="chatButton==\'audio\'">\n          <button style="height: 40px" block [ngClass]="recording ? \'chatbutton recording\' : \'chatbutton\'" ion-button (tap)="toggleRecording()"> <i style="font-size: 24px;" class="fa fa-microphone faBlue"></i><!-- <ion-icon name="md-microphone"></ion-icon>--></button> \n          </ion-col>\n               <ion-col *ngIf="chatButton==\'text\'" col-2>\n          <button  class="chatbutton" ion-button (click)="sendMessage()"><ion-icon name="md-send"></ion-icon></button> \n          </ion-col>\n      </ion-row>\n    </ion-grid>\n\n\n    <div *ngIf="recording" class="audiorecording">Registrazione in corso... premi il microfono per interrompere</div>\n  <!--</div>-->\n</ion-footer>'/*ion-inline-end:"/Users/demetriomortelliti/Desktop/demy/PROJECTS/appkwondo/clients/ion2kwondo/src/pages/chat/chat_infinity.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0_ionic_angular__["i" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["q" /* PopoverController */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["j" /* MenuController */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_11__ionic_native_social_sharing__["a" /* SocialSharing */], __WEBPACK_IMPORTED_MODULE_12__ionic_native_file_transfer__["a" /* FileTransfer */], __WEBPACK_IMPORTED_MODULE_10__ionic_native_camera__["a" /* Camera */], __WEBPACK_IMPORTED_MODULE_13__ionic_native_file__["a" /* File */], __WEBPACK_IMPORTED_MODULE_9__angular_platform_browser__["c" /* DomSanitizer */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["p" /* Platform */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["l" /* Nav */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["n" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["m" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["k" /* ModalController */],
        __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["e" /* IonicApp */],
        __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["d" /* Events */],
        __WEBPACK_IMPORTED_MODULE_2__providers_socket_service_socket_service__["a" /* SocketService */],
        __WEBPACK_IMPORTED_MODULE_14__ionic_native_media__["a" /* MediaPlugin */],
        __WEBPACK_IMPORTED_MODULE_15__ionic_native_streaming_media__["a" /* StreamingMedia */],
        __WEBPACK_IMPORTED_MODULE_3__providers_backend_backend__["a" /* BackendProvider */]])
], ChatPage);

//# sourceMappingURL=chat.js.map

/***/ }),

/***/ 44:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UtilsProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ionic_storage__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var UtilsProvider = (function () {
    function UtilsProvider(storage) {
        this.storage = storage;
        this.debugActive = true;
    }
    UtilsProvider.prototype.randomId = function () {
        return Math.random().toString(36).substring(7);
    };
    UtilsProvider.prototype.setStorage = function (key, value) {
        window.localStorage.setItem(key, value);
        this.storage.set(key, value);
    };
    UtilsProvider.prototype.setJsonStorage = function (key, obj) {
        window.localStorage.setItem(key, JSON.stringify(obj));
        //this.storage.set(key, JSON.stringify(obj));
    };
    UtilsProvider.prototype.getStorage = function (key, callback) {
        if (callback) {
            this.storage.get(key).then(function (val) {
                console.log(key + '=', val);
                callback(val);
            });
        }
        else {
            var val = window.localStorage.getItem(key);
            return val;
        }
    };
    UtilsProvider.prototype.getJsonStorage = function (key) {
        /* if (callback) {
     
            this.getStorage(key,function(value){
           if (callback) callback(JSON.parse(value));
         })
         }  else {*/
        var val = window.localStorage.getItem(key);
        return JSON.parse(val);
        //}
    };
    UtilsProvider.prototype.colog = function () {
        var dbg = this.debugActive;
        if (!dbg)
            return;
        console.log.apply(console, arguments);
    };
    UtilsProvider.prototype.conslog = function () {
        var dbg = this.debugActive;
        if (!dbg)
            return;
        console.log.apply(console, arguments);
    };
    return UtilsProvider;
}());
UtilsProvider = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__ionic_storage__["b" /* Storage */]])
], UtilsProvider);

//# sourceMappingURL=utils.js.map

/***/ }),

/***/ 507:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_backend_backend__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_utils_utils__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_tabs_tabs__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_register_register__ = __webpack_require__(565);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__tournament_tournament__ = __webpack_require__(153);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var LoginPage = (function () {
    function LoginPage(menuCtrl, utils, nav, backend, alertCtrl /*, private loadingCtrl: LoadingController*/) {
        this.menuCtrl = menuCtrl;
        this.utils = utils;
        this.nav = nav;
        this.backend = backend;
        this.alertCtrl = alertCtrl; /*, private loadingCtrl: LoadingController*/
        this.allnews = [];
        this.fbUserData = {};
        //loading: Loading;
        //registerCredentials= { email: 'demymortelliti@it.ibm.com', password: 'ser56glr' };
        this.registerCredentials = { email: '', password: '', gcmtoken: '' };
    }
    LoginPage.prototype.createAccount = function () {
        this.backend.playFeedback();
        this.nav.push(__WEBPACK_IMPORTED_MODULE_4__pages_register_register__["a" /* RegisterPage */]);
    };
    LoginPage.prototype.fbLogin = function () {
        this.backend.fbLogin();
    };
    LoginPage.prototype.gotoTorneo = function () {
        this.nav.push(__WEBPACK_IMPORTED_MODULE_7__tournament_tournament__["a" /* TournamentPage */]);
    };
    LoginPage.prototype.login = function () {
        var questo = this;
        questo.backend.playFeedback();
        //this.showLoading()
        var logindata = this.registerCredentials;
        if (this.backend.user.gcmtoken) {
            if (this.backend.user.gcmtoken != "") {
                logindata["gcmtoken"] = this.backend.user.gcmtoken;
            }
        }
        this.backend.blueLogin(logindata, function (data) {
            console.log("bluelogin result", data);
            if (data.loggedin) {
                if (String(data.loggedin) == "true") {
                    console.log("navigating to homepage");
                    questo.backend.getActiveChat(function (data) {
                        console.log("chatmessages have been loaded");
                        questo.backend.computeUnreadChats();
                    });
                    questo.backend.getGare(function (data) {
                        console.log("gare caricate");
                    });
                    questo.backend.getAtleti(function (data) {
                        console.log("atleti caricati");
                    });
                    questo.backend.getBroadcasts(function (data) {
                        console.log("broadcastes caricati", data);
                    });
                    /*var unread=window.localStorage.getItem("ion2kwondo_chatunread");
                    if (unread==null){
                      questo.backend.resetChatUnread();
                    } else {
                      questo.backend.setChatUnread(parseInt(unread,10));
                    }
                    console.log("chatunread set to "+questo.backend.unread+" by localstorage");
                    questo.backend.setBackgroundMode(true);*/
                    if (questo.backend.isCordovaIos()) {
                        if (questo.hasPaidIos()) {
                            console.log("L'utente " + questo.backend.user.email + " ha pagato per iOS, può continuare");
                            questo.nav.setRoot(__WEBPACK_IMPORTED_MODULE_3__pages_tabs_tabs__["a" /* TabsPage */]);
                        }
                        else {
                            console.log("L'utente " + questo.backend.user.email + " NON ha pagato per iOS, bloccato");
                            //questo.nav.push(IospaidPage);
                            questo.nav.push(__WEBPACK_IMPORTED_MODULE_3__pages_tabs_tabs__["a" /* TabsPage */]);
                        }
                    }
                    else
                        questo.nav.setRoot(__WEBPACK_IMPORTED_MODULE_3__pages_tabs_tabs__["a" /* TabsPage */]);
                }
                else {
                    //alert("login error");
                    console.log(data.error);
                    questo.showError("Login error");
                }
            }
            else {
                alert("Login fallito, controlla i tuoi dati di accesso");
            }
        });
    };
    LoginPage.prototype.hasPaidIos = function () {
        var questo = this;
        var retvalue = false;
        var user = questo.backend.user;
        if (user.hasOwnProperty("iospayment")) {
            var iospayment = user.iospayment;
            if (iospayment.hasOwnProperty("paid")) {
                if (String(iospayment.paid) == "true") {
                    if (iospayment.hasOwnProperty("expire")) {
                        var expire = iospayment.expire;
                        var date = __WEBPACK_IMPORTED_MODULE_5_moment__(expire, "YYYYMMDD");
                        var now = __WEBPACK_IMPORTED_MODULE_5_moment__();
                        if (now > date) {
                            // date is past, SCADUTA !!!
                        }
                        else {
                            // date is future, VALIDA
                            retvalue = true;
                        }
                    }
                    //retvalue = true;
                }
            }
        }
        return retvalue;
    };
    LoginPage.prototype.showLoading = function () {
        /*
        this.loading = this.loadingCtrl.create({
          content: 'Please wait...',
          dismissOnPageChange: false
        });
        this.loading.present();
        */
    };
    LoginPage.prototype.showError = function (text) {
        //this.loading.dismiss();
        /*
        let alrt = this.alertCtrl.create({
          title: 'Login fallito',
          subTitle: text,
          buttons: ['OK']
        });
        alrt.present(prompt);
        */
    };
    LoginPage.prototype.ionViewDidEnter = function () {
        console.log("ionViewDidEnter login.ts");
        var questo = this;
        questo.menuCtrl.enable(false);
        var json = this.utils.getJsonStorage("ion2kwondo_creds");
        //alert(json);
        console.log("JSONSTORAGE", json);
        if (!json) {
            console.log("regcreds are null");
        }
        else {
            var em = window.atob(json).split(":")[0];
            var pw = window.atob(json).split(":")[1];
            questo.registerCredentials.gcmtoken = questo.backend.user.gcmtoken;
            questo.registerCredentials.email = em;
            questo.registerCredentials.password = pw;
            console.log("regcreds", questo.registerCredentials);
            //questo.login();
        }
    };
    LoginPage.prototype.retrievePassword = function () {
        var questo = this;
        var alrt = questo.alertCtrl.create({
            title: 'Recupera password',
            subTitle: "Inserisci l'email per il recupero",
            inputs: [
                {
                    name: 'email',
                    placeholder: 'La tua e-mail',
                    value: questo.registerCredentials.email,
                }
            ],
            buttons: [
                {
                    text: 'Annulla',
                    role: 'cancel',
                    handler: function (data) {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Ok, inviami la password',
                    handler: function (data) {
                        var email = data.email;
                        console.log("OK, invio password a " + email);
                        questo.backend.retrieveUserPassword(email, function (rdata) {
                            console.log("retrievepsw response", rdata);
                            var error = false;
                            if (rdata.error) {
                                if (String(rdata.error) == "true")
                                    error = true;
                            }
                            if (error) {
                                alert("Error, e-mail " + email + " non riconosciuta");
                            }
                            else
                                alert("Dati utente inviati all'email " + email);
                        });
                    }
                }
            ]
        });
        alrt.present();
    };
    return LoginPage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('chat'),
    __metadata("design:type", Object)
], LoginPage.prototype, "chat", void 0);
LoginPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-login',template:/*ion-inline-start:"/Users/demetriomortelliti/Desktop/demy/PROJECTS/appkwondo/clients/ion2kwondo/src/pages/login/login.html"*/'<ion-content class="login-content" padding text-center>\n  <ion-row class="logo-row" sstyle="height: 200px;">\n    <ion-col></ion-col>\n    <ion-col style="padding: 4px !important; justify-content: center; text-align: center" >\n     <!--<img  src="assets/img/logotkdrozzano.png"/>-->\n     <img  class="loginlogo" src="assets/img/iconlogo3.png"/>\n    </ion-col>\n    <ion-col></ion-col>\n  </ion-row>\n  \n  <div class="login-box">\n    <p style="text-align:center; font-size: 14px; color: white;">Benvenuto in Appkwondo<br><span class="appversion">v.{{backend.appVersion.version}} - {{backend.appVersion.releasedate}}</span><br><br> Già registrato ? Inserisci user e password per accedere</p>\n    <form (ngSubmit)="login()" #registerForm="ngForm" >\n      <ion-row text-center> \n        <ion-col col-md-6 col-lg-4 col-xl-3 >\n          <ion-list inset>\n            \n            <ion-item>\n              <ion-input type="text" autocapitalize="none" placeholder="Email" name="email" [(ngModel)]="registerCredentials.email" required></ion-input>\n            </ion-item>\n            \n            <ion-item>\n              <ion-input type="password" autocapitalize="none" placeholder="Password" name="password" [(ngModel)]="registerCredentials.password" required></ion-input>\n            </ion-item>\n            \n          </ion-list>\n        </ion-col>\n      </ion-row>\n      \n      <ion-row>\n        <ion-col class="signup-col" col-md-6 col-lg-4 col-xl-3>\n          <button ion-button class="submit-btn" full type="submit" [disabled]="!registerForm.form.valid" icon-left style="height: 40px"><ion-icon name="md-key"></ion-icon>Accedi</button>\n          \n         \n        </ion-col>\n      </ion-row>\n      \n    </form>\n    <ion-row>\n      <ion-col col-md-6 col-lg-4 col-xl-3>\n          <p style="text-align:center; font-size: 14px; color: white;">Non ancora registrato ? Registrati</p>\n          <button ion-button class="register-btn" block  (click)="createAccount()">Registrati</button>\n\n      </ion-col>\n    </ion-row>\n    <ion-row>\n        <ion-col col-md-6 col-lg-4 col-xl-3>\n            <p style="text-align:center; font-size: 14px; color: white;">Password dimenticata ?</p>\n            <button ion-button small class="register-btn" block  (click)="retrievePassword()">Recupera password</button>\n  \n        </ion-col>\n      </ion-row>\n  </div>\n\n\n  <!--<ion-footer>\n      <ion-toolbar>\n          <ion-row>\n              <ion-col style="padding: 10px; color: white; font-size: 14px; text-align: center;">Powered by ASD Taekwondo Rozzano</ion-col>\n              <ion-col col-2 style="padding: 10px">\n                  <img  width="40" height="30" src="assets/img/logotkdrozzano.png"/>\n              </ion-col>\n            </ion-row>\n      </ion-toolbar>\n    </ion-footer>-->\n\n    <!--<button ion-button block (tap)="fbLogin()">FBLOGIN</button>\n\n    <ion-card *ngIf="backend.fbloggedin">\n      <ion-card-header>{{ backend.fbUserData.username }}</ion-card-header>\n      <img [src]="backend.fbUserData.picture" />\n      <ion-card-content>\n        <p>Email: {{ backend.fbUserData.email }}</p>\n        <p>First Name: {{ backend.fbUserData.first_name }}</p>\n      </ion-card-content>\n    </ion-card>-->\n  <!--<button ion-button block (tap)="gotoTorneo()">Torneo</button>-->\n</ion-content>'/*ion-inline-end:"/Users/demetriomortelliti/Desktop/demy/PROJECTS/appkwondo/clients/ion2kwondo/src/pages/login/login.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_6_ionic_angular__["j" /* MenuController */], __WEBPACK_IMPORTED_MODULE_2__providers_utils_utils__["a" /* UtilsProvider */], __WEBPACK_IMPORTED_MODULE_6_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_1__providers_backend_backend__["a" /* BackendProvider */], __WEBPACK_IMPORTED_MODULE_6_ionic_angular__["a" /* AlertController */] /*, private loadingCtrl: LoadingController*/])
], LoginPage);

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 519:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GarePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_backend_backend__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_gara_gara__ = __webpack_require__(142);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_editgara_editgara__ = __webpack_require__(551);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_device_feedback__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__tournament_tournament__ = __webpack_require__(153);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







//import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';
/*
  Generated class for the GarePage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var GarePage = (function () {
    function GarePage(modalCtrl, events, alertCtrl, deviceFeedback, app, backend, navCtrl, navParams) {
        this.modalCtrl = modalCtrl;
        this.events = events;
        this.alertCtrl = alertCtrl;
        this.deviceFeedback = deviceFeedback;
        this.app = app;
        this.backend = backend;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.gare = [];
        this.loading = false;
        this.totali = {
            ori: 0,
            argenti: 0,
            bronzi: 0,
            punti: 0
        };
    }
    GarePage.prototype.ionViewWillEnter = function () {
        var questo = this;
        this.calcolaTotali();
        this.events.subscribe("hwbackbutton", function (data) {
            console.log("hwbackbutton in gare.ts");
            questo.navCtrl.pop();
        });
    };
    GarePage.prototype.ionViewWillLeave = function () {
        this.events.unsubscribe("hwbackbutton");
    };
    GarePage.prototype.ionViewDidLoad = function () {
        //this.backend.setPushNativeTransition();
        console.log('ionViewDidLoad GarePagePage');
        this.gare = this.backend.gare;
        this.backend.setBackButtonAction(this.navBar, this.navCtrl);
        this.backend.setupNavbarBack(this.navBar, this.navCtrl);
        /*this.refresh(function(data){
         
        }) */
    };
    GarePage.prototype.refresh = function (callback) {
        var questo = this;
        this.backend.getGare(function (data) {
            questo.gare = data.rows;
            console.log("gare", questo.gare);
            if (callback)
                callback(data);
        });
    };
    GarePage.prototype.calcolaTotali = function () {
        var questo = this;
        var totori = 0;
        var totargenti = 0;
        var totbronzi = 0;
        var totpunti = 0;
        questo.backend.gare.forEach(function (item, idx) {
            // console.log(item);
            if (item.hasOwnProperty("doc")) {
                if (item.doc.hasOwnProperty("ori")) {
                    totori += parseInt(item.doc.ori, 10);
                }
                if (item.doc.hasOwnProperty("argenti")) {
                    totargenti += parseInt(item.doc.argenti, 10);
                }
                if (item.doc.hasOwnProperty("bronzi")) {
                    totbronzi += parseInt(item.doc.bronzi);
                }
            }
        });
        totpunti = totori * 7 + totargenti * 3 + totbronzi;
        questo.totali.ori = totori;
        questo.totali.argenti = totargenti;
        questo.totali.bronzi = totbronzi;
        questo.totali.punti = totpunti;
    };
    GarePage.prototype.doRefresh2 = function () {
        var questo = this;
        questo.loading = true;
        questo.refresh(function (data) {
            //console.log("allnews", data);
            questo.loading = false;
        });
    };
    GarePage.prototype.doRefresh = function (refresher) {
        console.log('Begin async operation', refresher);
        var questo = this;
        questo.refresh(function (data) {
            //console.log("allnews", data);
            refresher.complete();
        });
    };
    GarePage.prototype.gotoGara = function (g) {
        var questo = this;
        var id = g.doc.id;
        console.log("gotoGara", g);
        this.backend.playFeedback();
        //this.deviceFeedback.acoustic();
        //ios-transition
        if (g.doc.formula == "roundrobin_ar") {
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__tournament_tournament__["a" /* TournamentPage */], {
                id: id
            }, questo.backend.navOptions);
        }
        else {
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__pages_gara_gara__["a" /* GaraPage */], {
                id: id
            }, questo.backend.navOptions);
        }
    };
    GarePage.prototype.getLen = function (m) {
        var retvalue = 0;
        if (m.trim() != "") {
            var arr = m.split(",");
            retvalue = arr.length;
        }
        return retvalue;
    };
    GarePage.prototype.pressGara = function (g) {
        var _this = this;
        var questo = this;
        if (!questo.backend.userIsAdmin())
            return;
        //if (questo.backend.user.role.toLowerCase() != "tkdradmin") return;
        console.log("pressed gara", g);
        var alert = this.alertCtrl.create({
            title: 'Modifica gara',
            message: 'Vuoi modificare questa gara ?',
            buttons: [
                {
                    text: 'ANNULLA',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'SEGNA COME DISPUTATA',
                    handler: function () {
                        questo.loading = true;
                        questo.backend.markGara(g.doc.id, "disputata", function (data) {
                            console.log(data);
                            questo.refresh(function () {
                                console.log("gare refreshed");
                                questo.loading = false;
                            });
                        });
                    }
                },
                {
                    text: 'SEGNA COME NONDISPUTATA',
                    handler: function () {
                        questo.loading = true;
                        questo.backend.markGara(g.doc.id, "nondisputata", function (data) {
                            console.log(data);
                            questo.refresh(function () {
                                console.log("gare refreshed");
                                questo.loading = false;
                            });
                        });
                    }
                },
                {
                    text: 'SEGNA COME INCORSO',
                    handler: function () {
                        questo.loading = true;
                        questo.backend.markGara(g.doc.id, "incorso", function (data) {
                            console.log(data);
                            questo.refresh(function () {
                                console.log("gare refreshed");
                                questo.loading = false;
                            });
                        });
                    }
                },
                {
                    text: 'MODIFICA',
                    handler: function () {
                        console.log('Buy clicked');
                        var profileModal = _this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_4__pages_editgara_editgara__["a" /* EditgaraPage */], {
                            gara: g.doc
                        });
                        profileModal.onDidDismiss(function (data) {
                            console.log(data);
                            if (data == "saved") {
                                questo.doRefresh2();
                            }
                        });
                        profileModal.present();
                        /*
                        questo.navCtrl.push(EditgaraPage, {
                          gara: g.doc
                        }, questo.backend.navOptions)*/
                    }
                },
                {
                    text: 'ELIMINA',
                    handler: function () {
                        console.log('Buy clicked');
                        var alert2 = questo.alertCtrl.create({
                            title: 'Elimina gara',
                            message: 'Vuoi realmente eliminare questa gara ?',
                            buttons: [
                                {
                                    text: 'ANNULLA',
                                    role: 'cancel',
                                    handler: function () {
                                        console.log('Cancel clicked');
                                    }
                                },
                                {
                                    text: 'SI, ELIMINA LA GARA',
                                    handler: function () {
                                        console.log('eliminagara confirmed clicked');
                                        var url = questo.backend.rooturl + "/gare/delete";
                                        var postdata = {
                                            id: g.doc.id
                                        };
                                        questo.backend.postData(url, postdata, function (data) {
                                            console.log("deleted response", data);
                                            questo.backend.showAlert("Gara eliminata !!");
                                            questo.doRefresh2();
                                        });
                                        //delete code
                                    }
                                }
                            ]
                        });
                        alert2.present();
                    }
                }
            ]
        });
        alert.present();
    };
    GarePage.prototype.getClass = function (g) {
        var retvalue = "";
        if (g.doc.stato.toLowerCase() == "disputata")
            retvalue = "garadisputata";
        return retvalue;
    };
    GarePage.prototype.setBackButtonAction = function (nb, nc) {
        var questo = this;
        nb.backButtonClick = function () {
            //Write here wherever you wanna do
            var x = Object.assign({}, questo.backend.navOptions);
            x.direction = "back";
            nc.pop(x);
        };
    };
    GarePage.prototype.addGara = function () {
        var questo = this;
        console.log('add Gara');
        var newgara = {
            location: "",
            title: "",
            data: "",
            stato: "nondisputata",
            iscritti: "",
            myiscritti: "",
            maplocation: "",
            ori: 0,
            argenti: 0,
            bronzi: 0,
            ngiorni: "1"
        };
        questo.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__pages_editgara_editgara__["a" /* EditgaraPage */], {
            gara: newgara
        }, questo.backend.navOptions);
    };
    return GarePage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* Navbar */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* Navbar */])
], GarePage.prototype, "navBar", void 0);
GarePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-gare',template:/*ion-inline-start:"/Users/demetriomortelliti/Desktop/demy/PROJECTS/appkwondo/clients/ion2kwondo/src/pages/gare/gare.html"*/'<!--\n  Generated template for the GarePage page.\n\n  See http://ionicframework.com/docs/v2/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Gare</ion-title>\n    <ion-buttons end>\n      \n            <button *ngIf="backend.userIsAdmin()" (tap)="addGara()" ion-button icon-only>\n              <ion-icon name="ios-add-circle-outline"></ion-icon>\n            </button>\n            <button  (tap)="doRefresh2()" ion-button icon-only>\n              <ion-icon name="ios-refresh"></ion-icon>\n            </button>\n            </ion-buttons>\n\n  </ion-navbar>\n  <ion-item>\n    <span class="headpoints">Gare: <b>{{gare.length}}</b> - ORI: <b>{{totali.ori}}</b> - ARG: <b>{{totali.argenti}}</b> - BRO: <b>{{totali.bronzi}}</b> (P:<b>{{totali.punti}})</b></span>\n  </ion-item>\n\n</ion-header>\n\n\n<ion-content spadding style="background: #eee;">\n  <div *ngIf="backend.gare.length==0" style="text-align: center; width: 100%"><ion-spinner center name="dots" ></ion-spinner></div>\n  <ion-refresher (ionRefresh)="doRefresh($event)">\n    <ion-refresher-content refreshingSpinner="dots">\n        </ion-refresher-content>\n  </ion-refresher>  \n  <div *ngIf="loading" style="width: 100%; text-align: center">\n    <ion-spinner name="dots"></ion-spinner>\n  </div>\n\n<ion-list [virtualScroll]="backend.gare" [approxItemHeight]="\'80px\'" > <!--*ngIf="backend.gare.length>0"-->\n  \n  <ion-item  *virtualItem="let g" (press)="pressGara(g)" (tap)="gotoGara(g)" [ngClass]="g.doc.stato.toLowerCase()"> <!--*ngFor="let g of backend.gare" -->\n\n    \n    <span class="gara"><b>{{g.doc.title}}</b></span><br>\n    <span class="location">{{g.doc.location}} - {{g.doc.data}}</span><br>\n    <span class="medals">ORI: <b>{{g.doc.ori}}</b> - ARG: <b>{{g.doc.argenti}}</b> BRO: <b>{{g.doc.bronzi}}</b></span><br>\n    <span class="iscritti">ISCRITTI: {{getLen(g.doc.iscritti)}}</span><br>\n    \n    <span [ngClass]="\'span\'+g.doc.stato.toLowerCase()" style="font-size: 12px; font-weight: bold;">{{g.doc.stato.toUpperCase()}}</span> \n    <!--<span  *ngIf="g.doc.stato.toUpperCase()==\'INCORSO\'" style="margin-left: 5px"><img style="height: 16px; width: 16px;" src="assets/img/greenblink.gif" /></span>-->  \n\n    </ion-item>\n</ion-list>\n\n\n\n\n</ion-content>\n'/*ion-inline-end:"/Users/demetriomortelliti/Desktop/demy/PROJECTS/appkwondo/clients/ion2kwondo/src/pages/gare/gare.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ModalController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_5__ionic_native_device_feedback__["a" /* DeviceFeedback */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* App */], __WEBPACK_IMPORTED_MODULE_2__providers_backend_backend__["a" /* BackendProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */]])
], GarePage);

//# sourceMappingURL=gare.js.map

/***/ }),

/***/ 520:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MatchesforatletaPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_backend_backend__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_matchconsole_matchconsole__ = __webpack_require__(521);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_chat_chat__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_addmatches_addmatches__ = __webpack_require__(528);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/*
  Generated class for the MatchesforatletaPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var MatchesforatletaPage = (function () {
    function MatchesforatletaPage(modalCtrl, platform, toastCtrl, alertCtrl, events, backend, navCtrl, navParams) {
        this.modalCtrl = modalCtrl;
        this.platform = platform;
        this.toastCtrl = toastCtrl;
        this.alertCtrl = alertCtrl;
        this.events = events;
        this.backend = backend;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.mfa = [];
        this.atletaid = "";
        this.gara = {};
        this.atleta = {};
        this.history = [];
        this.viewAvversari = false;
        this.viewHistory = false;
        this.viewTkdt = false;
        this.viewTkdtCategoria = false;
        this.viewTabulato = false;
        this.tkdt = {};
        this.avversari = [];
        this.tkdtatleta = {};
        this.tkdtatletaarr = [];
        this.tabulato = {};
        this.tabulatoimg = "assets/img/boxbianco.jpg";
        this.activetab = "matches";
        this.loading = false;
        this.ordbinarr = new Array("finale", "semifinale", "quarto di finale", "ottavo di finale", "sedicesimo di finale", "trentaduesimo di finale");
        this.categoria = "";
        var questo = this;
    }
    MatchesforatletaPage.prototype.getMatchOrd = function (m) {
        var questo = this;
        var order = "";
        //console.log("mfa", questo.mfa);
        var l = questo.mfa.length;
        questo.mfa.forEach(function (item, idx) {
            if (m.doc.id == item.doc.id) {
                var ordidx = l - idx - 1;
                if (ordidx < questo.ordbinarr.length) {
                    if (ordidx < 2) {
                        order = questo.ordbinarr[ordidx].toUpperCase();
                    }
                }
            }
        });
        return order;
    };
    MatchesforatletaPage.prototype.ionViewWillEnter = function () {
        var questo = this;
        questo.initView();
        console.log("ionviewwillenter in matchesforatleta.ts");
        questo.events.subscribe("updatematchesforatleta", function (m) {
            console.log("updatematchesforatleta in matchesforatleta.ts !!");
            questo.mfa = questo.backend.filterRows(questo.backend.activegara.matchesbyprog, { atletaid: questo.atletaid }).rows;
            console.log("questo.mfa", questo.mfa);
        });
        this.events.subscribe("hwbackbutton", function (data) {
            console.log("hwbackbutton in gare.ts");
            questo.navCtrl.pop();
        });
    };
    MatchesforatletaPage.prototype.initView = function () {
        var questo = this;
        console.log("initView in matchesforatleta.ts");
        questo.mfa = questo.backend.filterRows(questo.backend.activegara.matchesbyprog, { atletaid: questo.atletaid }).rows;
    };
    MatchesforatletaPage.prototype.ionViewWillLeave = function () {
        var questo = this;
        console.log("ionviewwillleave in matchesforatleta.ts");
        questo.events.unsubscribe("updatematchesforatleta");
        questo.events.unsubscribe("hwbackbutton");
    };
    MatchesforatletaPage.prototype.ionViewDidLoad = function () {
        var questo = this;
        questo.backend.setBackButtonAction(questo.navBar, questo.navCtrl);
        questo.backend.setupNavbarBack(this.navBar, this.navCtrl);
        console.log('ionViewDidLoad MatchesforatletaPagePage');
        this.atletaid = this.navParams.get("atletaid");
        this.gara = this.navParams.get("gara");
        console.log("gara", this.gara);
        if (this.gara.gara.rows[0].doc.tkdt)
            this.tkdt = this.gara.gara.rows[0].doc.tkdt;
        questo.mfa = questo.backend.filterRows(questo.backend.activegara.matchesbyprog, { atletaid: questo.atletaid }).rows;
        //this.mfa=this.navParams.get("mfa");
        console.log("mfa", questo.mfa);
        console.log(JSON.stringify(questo.mfa));
        this.atleta = this.backend.getAtletaById(this.atletaid);
        console.log("this.atleta", this.atleta);
        var cat = this.getCategoria(this.atleta.datanascita);
        this.categoria = cat.toUpperCase();
        this.tkdtatleta = this.backend.getTkdtAtleta(this.atleta);
        var avversari = this.backend.getTkdtAtletiCategoria(this.tkdtatleta.cateta, this.tkdtatleta.catcintura, this.tkdtatleta.catpeso, this.tkdtatleta.sesso);
        avversari.forEach(function (item, idx) {
            if (item.nome.toLowerCase() != questo.tkdtatleta.nome.toLowerCase())
                questo.avversari.push(item);
        });
        for (var k in this.tkdtatleta) {
            if (this.tkdtatleta.hasOwnProperty(k)) {
                var newel = {
                    name: k,
                    value: this.tkdtatleta[k]
                };
                this.tkdtatletaarr.push(newel);
            }
        }
        console.log("tkdtatleta", this.tkdtatleta);
        console.log("avversari", this.avversari);
        this.tabulato = this.backend.getTkdtTabulatiCategoria(this.tkdtatleta.cateta, this.tkdtatleta.catcintura, this.tkdtatleta.catpeso, this.tkdtatleta.sesso);
        console.log("tabulato", this.tabulato);
        var hastabulato = true;
        for (var kk in questo.tabulato) {
            if (questo.tabulato.hasOwnProperty(kk)) {
                if (questo.tabulato[kk] == "--")
                    hastabulato = hastabulato && false;
            }
        }
        console.log("hastabulato", hastabulato);
        if (hastabulato) {
            //if (this.tabulato!={}){
            questo.backend.getTabulatoImg(questo.tabulato.oldhref, function (data) {
                console.log("tabulato image", data);
                questo.tabulatoimg = data;
            });
        }
        this.refresh(function () { });
    };
    MatchesforatletaPage.prototype.openTabulatoInBrowser = function (href) {
        var questo = this;
        window.open(href, "_system");
    };
    MatchesforatletaPage.prototype.getImg = function (m) {
        //console.log("getImg", m);
        var imgsrc = "matchtoplay.png";
        if (m.doc.disputato == "yes") {
            imgsrc = "matchko.png";
            if (m.doc.vinto == "yes")
                imgsrc = "matchok.png";
            if (m.doc.medagliamatch) {
                if (m.doc.medagliamatch != "none") {
                    imgsrc = "medaglia_" + m.doc.medagliamatch + ".png";
                }
            }
        }
        if (m.doc.realtime) {
            if (String(m.doc.realtime) == "true")
                imgsrc = "greenblink.gif";
        }
        imgsrc = "assets/img/" + imgsrc;
        //console.log("imgsrc", imgsrc);
        return imgsrc;
    };
    MatchesforatletaPage.prototype.getImgPerAtleta = function (m) {
        //console.log("getImgPerAtleta", m);
        var imgsrc = "matchtoplay.png";
        var medaglia = "none";
        m.matchesarray.forEach(function (item, idx) {
            if (item.medagliamatch != "none") {
                medaglia = item.medagliamatch;
            }
        });
        if (medaglia != "none")
            imgsrc = "medaglia_" + medaglia + ".png";
        imgsrc = "assets/img/" + imgsrc;
        //console.log("imgsrc", imgsrc);
        return imgsrc;
    };
    MatchesforatletaPage.prototype.getCategoria = function (dn) {
        return this.backend.getCategoria(dn, this.gara.gara.rows[0].doc.data);
    };
    MatchesforatletaPage.prototype.getVintoText = function (m) {
        var text = "Non disputato";
        if (m.disputato == "yes") {
            if (m.vinto == "yes")
                text = "Vinto,";
            if (m.vinto == "no")
                text = "Perso,";
            text = text + " risultato: " + m.risultato;
        }
        return text;
    };
    MatchesforatletaPage.prototype.getClass = function (m) {
        var cl = "nondisputato";
        if (m.disputato == "yes") {
            if (m.vinto == "yes")
                cl = "vinto";
            if (m.vinto == "no")
                cl = "perso";
        }
        if (m.dadisputare == "no")
            cl = "danondisputare";
        return cl;
    };
    MatchesforatletaPage.prototype.refresh = function (callback) {
        var questo = this;
        this.backend.getHistoryAtleta(this.atletaid, function (data) {
            questo.history = data.rows;
            console.log("got history", data);
            if (callback)
                callback(data);
        });
    };
    MatchesforatletaPage.prototype.getMedagliaHistory = function (m) {
        var ret = {
            medaglia: "--",
            color: "history black"
        };
        if (m.ori > 0) {
            ret.medaglia = "ORO";
            ret.color = "history yellow";
        }
        if (m.arg > 0) {
            ret.medaglia = "ARG";
            ret.color = "history silver";
        }
        if (m.bro > 0) {
            ret.medaglia = "BRO";
            ret.color = "history orange";
        }
        return ret;
    };
    MatchesforatletaPage.prototype.showMatchconsole = function (m) {
        var questo = this;
        //this.backend.matchconsoles.push(m);
        if (!this.backend.userIsAdmin())
            return;
        //if (this.backend.user.role.toLowerCase() != "tkdradmin") return;
        this.backend.playFeedback();
        console.log(this.backend.activegara);
        if (this.backend.activegara.gara.rows[0].doc.stato != "incorso")
            return;
        //m.matchord=questo.getMatchOrd({doc: m});
        var matchord = questo.getMatchOrd({ doc: m });
        console.log("matchord !", matchord);
        m.matchord = matchord;
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__pages_matchconsole_matchconsole__["a" /* MatchconsolePage */], {
            match: m,
            avversari: questo.avversari
        });
    };
    MatchesforatletaPage.prototype.getDerbyText = function (id) {
        var retvalue = "";
        var m = this.backend.getMatchById(id);
        //console.log("M",m);
        if (m) {
            if (m.hasOwnProperty("rows")) {
                if (m.rows[0].hasOwnProperty("doc")) {
                    var atl = this.backend.getAtletaById(m.rows[0].doc.atletaid);
                    retvalue = "derby con " + atl.cognome + " " + atl.nome + " !!";
                    retvalue = retvalue.toUpperCase();
                }
            }
        }
        if (!id)
            retvalue = "";
        return retvalue;
    };
    MatchesforatletaPage.prototype.tapSegment = function (item) {
        this.backend.playFeedback();
    };
    MatchesforatletaPage.prototype.addMatches = function () {
        var questo = this;
        questo.backend.playFeedback();
        var giornigara = 1;
        var gar = questo.gara.gara.rows[0].doc;
        if (gar.hasOwnProperty("ngiorni")) {
            if (gar.ngiorni.trim() != "")
                giornigara = parseInt(gar.ngiorni, 10);
        }
        var params = {
            giornigara: giornigara
        };
        var profileModal = questo.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_5__pages_addmatches_addmatches__["a" /* AddmatchesPage */], params);
        profileModal.onDidDismiss(function (data) {
            if (data) {
                console.log("dismissed addmatches", data);
                console.log("matches", data.matches);
                questo.backend.playFeedback();
                questo.performAddMatches(data.matches, data.giornogara);
            }
        });
        profileModal.present();
        if (true)
            return;
        //vecchia routine aggiunta incontri
        var alert = this.alertCtrl.create({
            title: 'Aggiungi match',
            inputs: [
                {
                    name: 'matches',
                    placeholder: 'Match separati da virgola',
                    value: "101"
                },
                {
                    name: 'giornogara',
                    placeholder: 'Giorno di gara',
                    value: "0"
                }
            ],
            buttons: [
                {
                    text: 'Annulla',
                    role: 'cancel',
                    handler: function (data) {
                        questo.backend.playFeedback();
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'OK, aggiungi',
                    handler: function (data) {
                        console.log("matches", data.matches);
                        questo.backend.playFeedback();
                        questo.performAddMatches(data.matches, data.giornogara);
                    }
                }
            ]
        });
        alert.present();
    };
    MatchesforatletaPage.prototype.performAddMatches = function (matches, garaday) {
        var questo = this;
        //var $mid = $("#popAddMatch #matchid");
        //var $color = $("#popAddMatch #color").val();
        matches = matches.replace(/\./g, ',');
        //alert(matches);
        //if (1==1) return;
        var color = "red";
        var matchid = matches;
        var selectedAtl = questo.backend.getAtletaById(questo.atletaid);
        var garaid = questo.backend.activegara.gara.rows[0].doc.id;
        var giornogara = "0";
        if (garaday) {
            giornogara = garaday;
        }
        //var progid=$mid.val().substring(1);
        var progid = matchid; //get last two characters for match progid- updated 25/01/2016
        //var datanascita=$atleta.find("datanascita").text();
        var datanascita = selectedAtl.datanascita;
        var atletaname = selectedAtl.cognome + " " + selectedAtl.nome;
        var atletaid = selectedAtl.id;
        //var atletaname=$atleta.find("cognome").text()+" "+$atleta.find("nome").text();
        //alert(datanascita);
        //return;
        var doc = {
            progid: progid,
            societaid: questo.backend.settings.mysocieta,
            societaname: questo.backend.settings.mysocietaname,
            garaid: garaid,
            atletaid: atletaid,
            atletaname: atletaname,
            risultato: "",
            ordine: "1",
            vinto: "no",
            disputato: "no",
            dadisputare: "yes",
            matchid: matches,
            color: color,
            lastupdate: "never",
            datanascita: datanascita,
            giornogara: giornogara
        };
        var url = questo.backend.rooturl + "/matches/add/" + garaid;
        questo.loading = true;
        questo.backend.postData(url, doc, function (data) {
            console.log("posted", data);
            questo.backend.getGara(garaid, function (gdata) {
                questo.refresh(function () {
                    questo.mfa = questo.backend.filterRows(questo.backend.activegara.matchesbyprog, { atletaid: questo.atletaid }).rows;
                    questo.loading = false;
                    var toast = questo.toastCtrl.create({
                        message: 'Match aggiunti',
                        duration: 3000,
                        position: 'top'
                    });
                    questo.events.publish("updategara", []);
                    toast.onDidDismiss(function () {
                        console.log('Dismissed toast');
                    });
                    toast.present();
                });
            });
        });
        //console.log(JSON.stringify(doc));
        /*
          $.ajax({
              url: rooturl + "/matches/add/" + garaid,
              type: "POST",
              data: doc
            })
            .done(function (data) {
           
              if (data.error) {
                console.log("error");
              } else {
                console.log("posted")
               
                $(data.addedmatches.rows).each(function (i) {
        
                  var row = data.addedmatches.rows[i];
                  var addedid = row.doc.id;
                  var cat = getCategoria(row.doc.datanascita);
                  colog("derbies");
                  colog("$allmatches")
                  var $allmatches = jGara.matchesbyprog;
                  colog($allmatches);
                  $allmatches.rows.push(row);
                  var derbies = getDerby(addedid, cat);
                  colog(derbies);
                  if (derbies.rows.length > 0) {
                    if ($allmatches.rows.length > 0) {
                      
                      var derbyid = derbies.rows[0].doc.id;
                    
                      var urld = "/matches/update/" + jcurrentgara.id + "/" + addedid;
        
                      $.ajax({
                        type: "POST",
                        url: rooturl + urld,
                        data: {
                          derby: derbyid
                        },
                        async: false
                      });
        
                      urld = "/matches/update/" + jcurrentgara.id + "/" + derbyid;
                      $.ajax({
                        type: "POST",
                        url: rooturl + urld,
                        data: {
                          derby: addedid
                        },
                        async: false
                      });
        
        
        
        
                    
                    }
                  }
        
                })
                toast("Match " + doc.matchid + " added for atleta " + selectedAtl.cognome + " " + selectedAtl.nome);
                openGara(jGara.gara.rows[0].doc.id, function () {
                 
                  refreshIscritti();
                  $("#popAddMatch").popup("close");
                  showMatchesForAtleta(selectedAtl.id)
        
                })
        
        
        
              }
        
             
            })
            .fail(function () {
              toast("Error posting", "long");
        
            });
        
        */
    };
    MatchesforatletaPage.prototype.gotoChat = function () {
        var questo = this;
        this.backend.playFeedback();
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__pages_chat_chat__["a" /* ChatPage */], {}, questo.backend.navOptions);
    };
    MatchesforatletaPage.prototype.openTabulato = function (url) {
        var questo = this;
        questo.backend.openUrl(url);
        if (true)
            return;
        if (questo.platform.is("cordova")) {
            if (questo.platform.is("ios")) {
                window.open(url, "_blank");
                return false;
            }
        }
        window.open(url, '_system');
    };
    MatchesforatletaPage.prototype.deleteMatch = function (m) {
        var questo = this;
        if (!questo.backend.userIsAdmin())
            return;
        var alrt = questo.alertCtrl.create({
            title: 'Conferma eliminazione match',
            message: "Vuoi davvero eliminare il match " + m.matchid + " ?",
            buttons: [
                {
                    text: 'Annulla',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Si, elimina',
                    handler: function () {
                        console.log('OK clicked');
                        console.log("attempting delete of match", m.matchid);
                        var url = questo.backend.rooturl + "/matches/deletenew/" + m.garaid + "/" + m.id + "/" + m.atletaid;
                        console.log("will call " + url);
                        questo.backend.fetchData(url, function (data) {
                            console.log("resulting matches", data);
                            questo.mfa = data;
                        });
                    }
                }
            ]
        });
        alrt.present();
        /*
          var id = delmatchid;
        
          gConfirm("Sei sicuro di voler cancellare l'incontro ?", "Conferma", function () {
        
            colog("deleting matchid " + id);
        
            var url = "updagent.php?action=delete&tag=match";
        
        
            //find and reset its derby counterpart, if there is one
            var $allmatches = jGara.matchesbyprog;
            $($allmatches.rows).each(function (i) {
              var meid = $allmatches.rows[i].doc.id;
              var doc = $allmatches.rows[i].doc;
              if (meid.trim() == id.trim()) {
                if (doc.derby) {
        
                  if (doc.derby.trim() != "") {
                    var did = doc.derby;
        
                    var urld = "/matches/update/" + jcurrentgara.id + "/" + did;
        
                    $.ajax({
                      type: "POST",
                      url: rooturl + urld,
                      data: {
                        derby: null
                      },
                      async: false
                    });
        
                    colog("resetted derby flag on matchid " + did);
        
        
                  }
        
        
                }
              }
        
            })
        
            url += "&id=" + id;
            url += "&garaid=" + garaid;
        
            url = "/matches/delete/" + jcurrentgara.id + "/" + id;
        
            $.post(rooturl + url, {
              a: '1'
            }, function () {
              delmatchid = "";
              openGara(jcurrentgara.id, function () {
        
                //refreshMatches(function() {
        
                var tipogara = "combattimento";
                if (jcurrentgara.tipo) {
                  if (jcurrentgara.tipo == "forme") tipogara = "forme";
        
                }
                $("#matchesatleta #popDelMatch").popup("close");
                if (tipogara == "combattimento") {
        
                  showMatchesForAtleta(selectedAtl.id);
        
                } else {
        
                  showMatchesForAtletaForme(selectedAtl.id);
        
                }
        
        
        
                // $.mobile.changePage("#matchesatleta");
        
              })
        
            });
        
          }, function () {
            cancelDelMatch()
        
          });
          */
    };
    return MatchesforatletaPage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* Navbar */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* Navbar */])
], MatchesforatletaPage.prototype, "navBar", void 0);
MatchesforatletaPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-matchesforatleta',template:/*ion-inline-start:"/Users/demetriomortelliti/Desktop/demy/PROJECTS/appkwondo/clients/ion2kwondo/src/pages/matchesforatleta/matchesforatleta.html"*/'<!--\n  Generated template for the MatchesforatletaPage page.\n\n  See http://ionicframework.com/docs/v2/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Match atleta</ion-title>\n    <ion-buttons end>\n    <!--<button ion-button style="font-size: 18px" (click)="gotoChat()"><ion-icon name="md-chatbubbles"><ion-badge *ngIf="backend.unread>0" color="danger">{{backend.unread}}</ion-badge></ion-icon>\n      \n      </button>-->\n      <button *ngIf="backend.userIsAdmin()" ion-button style="font-size: 18px" (click)="addMatches()"><ion-icon name="md-add-circle"></ion-icon>\n        \n        </button>\n        <button (tap)="initView(); backend.playFeedback();" ion-button style="font-size: 18px"><ion-icon name="md-refresh"></ion-icon></button>\n      </ion-buttons>\n  </ion-navbar>\n  <ion-segment (tap)="tapSegment()" [(ngModel)]="activetab">\n      <ion-segment-button  value="matches">\n       <!-- <ion-icon name="camera"></ion-icon>-->Match\n      </ion-segment-button>\n      <ion-segment-button  value="details">\n          <!-- <ion-icon name="camera"></ion-icon>-->Dettagli atleta\n         </ion-segment-button>\n  </ion-segment>\n\n</ion-header>\n\n\n<ion-content spadding>\n\n  <div *ngIf="loading" style="text-align:center">\n    <ion-spinner name="ios"></ion-spinner>\n  </div>\n\n  <section *ngIf="activetab==\'matches\'">\n\n  <section *ngIf="mfa.length==0">\n    <ion-card>\n      <ion-card-content>\n      Nessun match per {{atleta.cognome}} {{atleta.nome}}\n    </ion-card-content>\n    </ion-card>\n  </section>\n\n   <ion-list>\n      <ng-container *ngFor="let m of mfa">\n      <ion-item  (press)="deleteMatch(m.doc)" (tap)="showMatchconsole(m.doc)">\n        <ion-row >\n          <ion-col col-2><img width="32" height="32" src="{{getImg(m)}}" /></ion-col>\n          <ion-col>\n            <div class="{{getClass(m.doc)}}">{{m.doc.matchid}}</div>\n            <div class="matchord">{{getMatchOrd(m)}}</div>\n            <div class="atleta">{{m.doc.atletaname}}</div>\n            <div class="categoria">{{getCategoria(m.doc.datanascita).toUpperCase()}}</div>\n            <div class="{{getClass(m.doc)}}" style="font-weight: normal">{{getVintoText(m.doc)}}</div>\n       \n            <div *ngIf="m.doc.derby && (m.doc.derby!=null)" class="derby">{{backend.getDerbyText(m.doc.derby)}}</div>\n            <div *ngIf="m.doc.avversario" class="avversario">contro {{m.doc.avversario.split(\'|\')[0]}}<br>{{m.doc.avversario.split(\'|\')[1]}}</div>\n          </ion-col>\n        </ion-row>\n      </ion-item>\n      </ng-container>\n    </ion-list>\n\n  </section>\n  <section *ngIf="activetab==\'details\'">\n    <ion-grid class="griglia">  \n    <ion-row>\n      <ion-col class="nomeatleta">\n          {{atleta.cognome}} {{atleta.nome}}\n      </ion-col>\n    </ion-row>\n    <ion-row>\n      <ion-col class="categoriaatleta">\n          {{categoria}}\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n     \n      <button full ion-button sstyle="width: 100%; background: blue; color: white; font-size: 16px;" (tap)="viewTkdtCategoria=!viewTkdtCategoria; backend.playFeedback();">Dati ufficiali categoria</button>\n    <ion-list *ngIf="viewTkdtCategoria">\n      <ion-item  style="font-size:12px" *ngFor="let a of tkdtatletaarr"> \n        <ion-row>\n          <ion-col col-5>\n\n        {{a.name}}</ion-col><ion-col>{{a.value}}</ion-col>\n        </ion-row>\n      </ion-item>\n      </ion-list>\n\n\n     <button full ion-button sstyle="width: 100%; background: blue; color: white; font-size: 16px;" (tap)="viewAvversari=!viewAvversari; backend.playFeedback();">Avversari in categoria ({{avversari.length}})</button>\n    <ion-list *ngIf="viewAvversari">\n      <ion-item  style="font-size:12px" *ngFor="let avv of avversari"> \n        <ion-row>\n          <ion-col col-12 class="atleta wrap">\n\n        {{avv.nome}}</ion-col>\n        </ion-row>\n        <ion-row>\n        <ion-col class="wrap">{{avv.societa}}</ion-col>\n        </ion-row>\n      </ion-item>\n      </ion-list>\n       <button full ion-button sstyle="width: 100%; background: blue; color: white; font-size: 16px;" (tap)="viewTabulato=!viewTabulato; backend.playFeedback();">Tabulato</button>\n    <ion-item *ngIf="viewTabulato">\n      <button ion-button block (tap)="openTabulatoInBrowser(tabulato.oldhref)">Apri Tabulato</button>\n      <!--<iframe [src]="tabulato.oldhref"></iframe>-->\n      <!--<br>\n     \n      {{tabulato.tabname}}<br>-->\n      <p>\n          <i>Clicca sul tabulato per ingrandirlo</i>\n        </p><br>\n      <img (tap)="openTabulatoInBrowser(tabulatoimg)" [src]="tabulatoimg" />\n     <!-- <div (tap)="backend.getTabulatoImg(tabulato.oldhref)" >Tabulato</div>--> \n    </ion-item>\n    <button full ion-button sstyle="width: 100%; background: blue; color: white; font-size: 16px;" (tap)="viewHistory=!viewHistory; backend.playFeedback();">Storico Atleta</button>\n    <ion-list *ngIf="viewHistory">\n      <ion-item> \n          <ion-row style="padding: 2px !important; font-size: 12px; background: #eee;">\n         <ion-col col-8>Gara</ion-col>\n         <ion-col col-2>MED</ion-col>\n         <ion-col col-1>M</ion-col>\n         <ion-col col-1>MD</ion-col>\n         </ion-row>\n        </ion-item>\n     <ion-item *ngFor="let h of history" >\n       <ion-row style="padding: 2px !important; font-size: 12px;">\n         <ion-col col-8 style="white-space: normal">{{h.data}} {{h.location}}</ion-col>\n         <ion-col col-2><span [ngClass]="getMedagliaHistory(h).color"> {{getMedagliaHistory(h).medaglia}}</span></ion-col>\n         <ion-col col-1>{{h.matches}}</ion-col>\n         <ion-col col-1>{{h.matchesdisputati}}</ion-col>\n         </ion-row>\n        </ion-item>\n    </ion-list>  \n\n  </section>\n\n\n</ion-content>\n'/*ion-inline-end:"/Users/demetriomortelliti/Desktop/demy/PROJECTS/appkwondo/clients/ion2kwondo/src/pages/matchesforatleta/matchesforatleta.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ModalController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["t" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */], __WEBPACK_IMPORTED_MODULE_2__providers_backend_backend__["a" /* BackendProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */]])
], MatchesforatletaPage);

//# sourceMappingURL=matchesforatleta.js.map

/***/ }),

/***/ 521:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MatchconsolePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_backend_backend__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_socket_service_socket_service__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_chat_chat__ = __webpack_require__(33);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the MatchconsolePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var MatchconsolePage = (function () {
    function MatchconsolePage(loadingCtrl, socket, events, toastCtrl, alertCtrl, backend, navCtrl, navParams) {
        this.loadingCtrl = loadingCtrl;
        this.socket = socket;
        this.events = events;
        this.toastCtrl = toastCtrl;
        this.alertCtrl = alertCtrl;
        this.backend = backend;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.consoles = [];
        this.selectedMatchId = "";
        this.selectedMatch = {};
        this.selectedConsole = {};
        this.selectedAvversari = {};
        this.selConsoleIndex = -1;
        this.disabledcontrols = false;
        var questo = this;
    }
    MatchconsolePage.prototype.ionViewDidLoad = function () {
        this.backend.setBackButtonAction(this.navBar, this.navCtrl);
        this.backend.setupNavbarBack(this.navBar, this.navCtrl);
    };
    MatchconsolePage.prototype.ionViewWillLoad = function () {
        var questo = this;
        /*questo.events.subscribe("updategara",function(msg,time){
          console.log("refreshgara in matchconsole.ts !!");
          //questo.disabledcontrols=false;
          //questo.refresh(function(){
            //questo.backend.syncConsoles(questo.gara.matchesbyprog);
            //questo.events.publish("updatematchesforatleta",questo.gara.matchesbyprog);
          //});
        })*/
        var match = this.navParams.get("match");
        var avversari = this.navParams.get("avversari");
        var id = match.id;
        this.selectedMatchId = id;
        this.selectedMatch = match;
        //this.selectedMatch.avversari = avversari;
        this.backend.removeConsolesIfNotRealtime();
        this.backend.addConsoleIfNotExists(this.selectedMatch);
        this.consoles = this.backend.matchconsoles;
        this.consoles.forEach(function (item, idx) {
            if (item.match.id == questo.selectedMatchId) {
                questo.selectedConsole = item;
                if (avversari.length > 0)
                    questo.selectedConsole.avversari = avversari;
                questo.selConsoleIndex = idx;
            }
        });
        //this.selectedMatchId=this.selectedMatch.id;
        if (this.selectedMatch.hasOwnProperty("avversario")) {
            if (this.selectedMatch.avversario.trim() != "")
                this.selectedConsole.avversario = this.selectedMatch.avversario;
        }
        console.log('ionViewDidLoad MatchconsolePage, selectedconsole', questo.selectedConsole);
    };
    MatchconsolePage.prototype.tapSegment = function (c, i) {
        this.selectedMatchId = c.match.id;
        this.selectedMatch = c.match;
        this.selectedConsole = c;
        this.selConsoleIndex = i;
        console.log("tapSegment", c);
        this.backend.playFeedback();
    };
    MatchconsolePage.prototype.ionViewWillLeave = function () {
        console.log("Looks like I'm about to leave :(");
        //this.events.unsubscribe("updategara");
        this.events.unsubscribe("hwbackbutton");
    };
    MatchconsolePage.prototype.ionViewWillEnter = function () {
        var questo = this;
        this.events.subscribe("hwbackbutton", function (data) {
            console.log("hwbackbutton in gare.ts");
            questo.navCtrl.pop();
        });
    };
    MatchconsolePage.prototype.isRealTime = function (c) {
        var isrt = false;
        if (c.hasOwnProperty("realtime")) {
            if (String(c.realtime) == "true") {
                isrt = true;
            }
        }
        return isrt;
    };
    MatchconsolePage.prototype.toggleTempoReale = function () {
        var questo = this;
        questo.backend.playFeedback();
        //alert(this.selectedConsole.match.matchord);
        var active = true;
        var url = this.backend.rooturl + "/matches/update/" + this.selectedConsole.match.garaid + "/" + this.selectedConsole.match.id;
        var newvalue = "true";
        var newtesto = "attivato";
        if (String(this.selectedConsole.match.realtime) == "true") {
            newvalue = "false";
            newtesto = "disattivato";
            active = false;
        }
        var matchord = "";
        if (questo.selectedConsole.match.hasOwnProperty("matchord")) {
            if (questo.selectedConsole.match.matchord.trim() != "") {
                matchord = questo.selectedConsole.match.matchord;
            }
        }
        console.log("MATCHORD", matchord);
        var action = "realtime_off";
        if (active)
            action = "realtime_on";
        console.log("sending admin_action", action);
        //alert(action);
        var testo = "disattivato";
        if (active)
            testo = "attivato";
        var doc = {
            realtime: active,
            admin_action: action
        };
        if (active) {
            if (matchord.trim() != "") {
                doc.matchord = matchord;
            }
            console.log("selectedconsole", questo.selectedConsole);
            if (questo.selectedConsole.hasOwnProperty("avversario")) {
                //if (questo.selectedConsole.avversario.trim() != "") doc.avversario = questo.selectedConsole.avversario;
                doc.avversario = questo.selectedConsole.avversario;
            }
        }
        //sendRealtime(true);
        questo.disabledcontrols = true;
        console.log("posting doc", doc);
        questo.backend.postData(url, doc, function (data) {
            console.log("data", data);
            var toast = questo.toastCtrl.create({
                message: 'Tempo reale ' + newtesto + " per il match " + questo.selectedConsole.match.matchid,
                duration: 3000,
                position: 'top'
            });
            toast.onDidDismiss(function () {
                console.log('Dismissed toast');
                questo.disabledcontrols = false;
            });
            toast.present();
        });
        if (true)
            return;
        if (String(this.selectedConsole.match.realtime) == "true") {
            newvalue = "false";
            newtesto = "disattivato";
        }
        this.selectedConsole.match.realtime = newvalue;
        this.backend.matchconsoles.forEach(function (item, idx) {
            if (questo.selectedConsole.match.id == item.match.id) {
                questo.backend.matchconsoles[idx] = questo.selectedConsole;
            }
        });
        questo.consoles = questo.backend.matchconsoles;
        var toast = this.toastCtrl.create({
            message: 'Tempo reale ' + newtesto + " per il match " + questo.selectedConsole.match.matchid,
            duration: 3000,
            position: 'top'
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed toast');
        });
        toast.present();
    };
    MatchconsolePage.prototype.tapPlus = function (t) {
        var questo = this;
        var result = this.selectedConsole.result;
        var p1 = parseInt(result.split("-")[0]);
        var p2 = parseInt(result.split("-")[1]);
        var arr = t.split("_");
        var oper = arr[0];
        var side = arr[1];
        if (oper == 'plus') {
            if (side == '1') {
                p1++;
            }
            if (side == '2') {
                p2++;
            }
        }
        if (oper == 'minus') {
            if (side == '1') {
                p1--;
                if (p1 < 0)
                    p1 = 0;
            }
            if (side == '2') {
                p2--;
                if (p2 < 0)
                    p2 = 0;
            }
        }
        result = p1 + "-" + p2;
        this.selectedConsole.result = result;
        questo.sendRealtime();
        questo.backend.playFeedback();
        //prepare text
    };
    MatchconsolePage.prototype.sendRealtime = function () {
        var questo = this;
        var text = "TEMPO REALE !<br> ";
        var color = "black";
        var mtext = "in pausa";
        if (questo.selectedConsole.running) {
            mtext = "IN CORSO";
            color = "blue";
        }
        if (questo.selectedConsole.fineround) {
            mtext = "FINE ROUND " + questo.selectedConsole.round;
            color = "black";
        }
        var rtext = "<font color='" + color + "'>Round " + questo.selectedConsole.round;
        if (questo.selectedConsole.round == "GP")
            rtext = "<font color='" + color + "'>GoldenPoint";
        text += " " + rtext;
        text += ", " + mtext;
        text += ", " + questo.selectedConsole.result + "</font>";
        /*

        if (rta) {
            if (rta.foto) {

                text += "<br><img style='float: left' src='" + rta.foto + "' width='60px' height='60px' />";

            }
    }
    */
        //addMatchToRealtime(selectedid);
        color = "black";
        if (questo.selectedConsole.active)
            color = "blue";
        var htext = "<span style='color: " + color + "'>" + text + "</span>";
        //
        var rdata = {
            type: "realtime",
            to: "all",
            garaid: questo.selectedConsole.match.garaid,
            //matchid: selectedid,
            matchid: questo.selectedConsole.match.id,
            //matchnumber: selectedmatchid,
            matchnumber: questo.selectedConsole.match.matchid,
            result: questo.selectedConsole.result,
            round: questo.selectedConsole.round,
            fineround: questo.selectedConsole.fineround,
            running: questo.selectedConsole.running,
            paused: questo.selectedConsole.paused,
            ammoniz1: 0,
            ammoniz2: 0,
            event: "realtime",
            text: text,
            //match: getMatchById(selectedid),
            match: questo.selectedConsole.match,
            active: true //questo.selectedConsole.active
        };
        if (questo.selectedConsole.hasOwnProperty("avversario")) {
            if (questo.selectedConsole.avversario.trim() != "")
                rdata.avversario = questo.selectedConsole.avversario;
        }
        if (questo.selectedConsole.match.realtime) {
            console.log("è in realtime !!");
            if (String(questo.selectedConsole.match.realtime) == "true")
                questo.socket.sendMessage(rdata);
        }
    };
    MatchconsolePage.prototype.tapRound = function (n) {
        this.selectedConsole.round = n;
        this.selectedConsole.paused = false;
        this.selectedConsole.running = true;
        this.selectedConsole.fineround = false;
        this.selectedConsole.goldenpoint = false;
        if (this.selectedConsole.round == "GP")
            this.selectedConsole.goldenpoint = true;
        this.sendRealtime();
        this.backend.playFeedback();
    };
    MatchconsolePage.prototype.tapFineround = function () {
        this.selectedConsole.fineround = true;
        this.selectedConsole.paused = true;
        this.selectedConsole.running = false;
        this.sendRealtime();
        this.backend.playFeedback();
    };
    MatchconsolePage.prototype.getPauseText = function () {
        var text = "IN CORSO";
        if (this.selectedConsole.paused) {
            text = "IN PAUSA";
        }
        return text;
    };
    MatchconsolePage.prototype.tapPause = function () {
        if (!this.selectedConsole.fineround) {
            this.selectedConsole.paused = !this.selectedConsole.paused;
            this.selectedConsole.running = !this.selectedConsole.running;
        }
        this.sendRealtime();
        this.backend.playFeedback();
    };
    MatchconsolePage.prototype.getTemporealeText = function () {
        var text = "TEMPO REALE: NON ATTIVO";
        if (this.selectedConsole.match.realtime) {
            if (String(this.selectedConsole.match.realtime) == "true") {
                text = "TEMPO REALE: ATTIVO !";
            }
        }
        return text;
    };
    MatchconsolePage.prototype.setResult = function () {
        this.backend.playFeedback();
        console.log("setResult");
        var questo = this;
        var ris = questo.selectedConsole.result;
        var risarr = ris.split("-");
        if (ris.trim() != "0-0") {
            if (risarr[0] == risarr[1]) {
                var alrtx = questo.alertCtrl.create({
                    title: 'ATTENZIONE',
                    subTitle: 'Il risultato indicato indica un pareggio, incrementa uno dei due punteggi per indicare una vittoria o una sconfitta',
                    buttons: ['Chiudi']
                });
                alrtx.present();
                return;
            }
        }
        var msg = "Vuoi davvero convalidare il risultato di questo incontro (" + ris + ") ?";
        var gsmsg = "";
        if (questo.selectedConsole.goldenpoint)
            gsmsg = "(risultato conseguito dopo GoldenPoint)";
        if (questo.selectedConsole.squalifica)
            gsmsg = "(verrà registrata la sconfitta per squalifica)";
        msg += gsmsg;
        var title = "Conferma risultato " + ris;
        if ((ris.trim() == "0-0") || (ris.trim() == "")) {
            msg = "ATTENZIONE ! Il risultato impostato eseguirà il reset del match. Vuoi davvero resettare il match ?";
            title = "Conferma reset match";
        }
        var alrt = questo.alertCtrl.create({
            title: title,
            message: msg,
            buttons: [
                {
                    text: 'Annulla',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                        questo.backend.playFeedback();
                    }
                },
                {
                    text: 'OK',
                    handler: function () {
                        questo.backend.playFeedback();
                        var match = questo.selectedConsole.match;
                        var goldenpoint = false;
                        if (questo.selectedConsole.round.toLowerCase() == "gp")
                            goldenpoint = true;
                        if (questo.selectedConsole.goldenpoint)
                            goldenpoint = true;
                        match.goldenpoint = goldenpoint;
                        match.risultato = questo.selectedConsole.result;
                        if (match.hasOwnProperty("avversari")) {
                            delete match.avversari;
                        }
                        //alert(questo.selectedConsole.squalifica);
                        match.squalifica = questo.selectedConsole.squalifica;
                        var atl = questo.backend.getAtletaById(questo.selectedConsole.match.atletaid);
                        var mfa = questo.backend.filterRows(questo.backend.activegara.matchesbyprog, { atletaid: atl.id });
                        questo.backend.setResult(match, atl, mfa, function (data) {
                            console.log("setted result !!", data);
                            setTimeout(function () {
                                questo.navCtrl.pop();
                            }, 2000);
                        });
                        console.log('Buy clicked');
                    }
                }
            ]
        });
        alrt.present();
    };
    MatchconsolePage.prototype.gotoChat = function () {
        this.backend.playFeedback();
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__pages_chat_chat__["a" /* ChatPage */]);
    };
    MatchconsolePage.prototype.showMatchOrd = function (m) {
        var retvalue = false;
        if (m.hasOwnProperty("matchord")) {
            if (m.matchord.trim() != "") {
                retvalue = true;
            }
        }
        return retvalue;
    };
    MatchconsolePage.prototype.hasAvversari = function () {
        var questo = this;
        var retvalue = false;
        if (questo.selectedConsole.hasOwnProperty("avversari")) {
            if (questo.selectedConsole.avversari.length > 0)
                retvalue = true;
        }
        return retvalue;
    };
    MatchconsolePage.prototype.hasAvversario = function (m) {
        var retvalue = false;
        if (m.hasOwnProperty("avversario")) {
            if (m.avversario.trim() != "")
                retvalue = true;
        }
        return retvalue;
    };
    MatchconsolePage.prototype.getAvversario = function (m) {
        var retvalue = {
            nome: "",
            societa: ""
        };
        if (m.hasOwnProperty("avversario")) {
            retvalue.nome = m.avversario.split("|")[0];
            retvalue.societa = m.avversario.split("|")[1];
        }
        return retvalue;
    };
    MatchconsolePage.prototype.selectAvversario = function (c) {
        var _this = this;
        var questo = this;
        if (c.avversari.length == 0)
            return;
        var inputs = [];
        var ndchecked = true;
        var m = c.match;
        if (m.hasOwnProperty("avversario")) {
            if (m.avversario.trim() != "") {
                ndchecked = false;
            }
        }
        inputs.push({ type: 'radio', label: 'Non definito', value: '', checked: ndchecked });
        c.avversari.forEach(function (item, idx) {
            console.log("avversario", item);
            var lblnome = item.nome;
            var lblval = item.nome + "|" + item.societa;
            var checked = false;
            if (m.hasOwnProperty("avversario")) {
                if (m.avversario.trim() != "") {
                    var avv = m.avversario.split("|");
                    //console.log("avv",avv,"item",item);
                    if (avv[0].toLowerCase() == item.nome.toLowerCase())
                        checked = true;
                }
            }
            inputs.push({ type: 'radio', label: lblnome, value: lblval, checked: checked });
        });
        var alrt = questo.alertCtrl.create({
            title: 'Seleziona avversario',
            inputs: inputs,
            buttons: [
                {
                    text: 'Annulla',
                    role: 'cancel',
                    handler: function (data) {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'OK',
                    handler: function (data) {
                        console.log("OK", data);
                        if (data) {
                            console.log("data cè");
                            m.avversario = data;
                            questo.selectedConsole.avversario = data;
                            console.log("selectedConsole", questo.selectedConsole.avversario);
                        }
                        else {
                            console.log("data non cè");
                            m.avversario = "";
                            questo.selectedConsole.avversario = "";
                            //delete questo.selectedConsole.avversario;
                        }
                        if (questo.selectedConsole.active)
                            questo.sendRealtime();
                        var loading = _this.loadingCtrl.create({
                            spinner: 'dots',
                            content: 'Aggiornamento avversario...'
                        });
                        loading.onDidDismiss(function () {
                            console.log('Dismissed loading');
                        });
                        loading.present();
                        questo.backend.setAvversario(m.garaid, m.id, questo.selectedConsole.avversario, function (data) {
                            console.log("setAvversario done", data);
                            loading.dismiss();
                        });
                    }
                }
            ]
        });
        alrt.present();
    };
    return MatchconsolePage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* Navbar */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* Navbar */])
], MatchconsolePage.prototype, "navBar", void 0);
MatchconsolePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-matchconsole',template:/*ion-inline-start:"/Users/demetriomortelliti/Desktop/demy/PROJECTS/appkwondo/clients/ion2kwondo/src/pages/matchconsole/matchconsole.html"*/'<!--\n  Generated template for the MatchconsolePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Match console</ion-title>\n     <ion-buttons end>\n     \n<!--<button ion-button style="font-size: 18px" (click)="gotoChat()"><ion-icon name="md-chatbubbles"></ion-icon>\n\n</button>-->\n</ion-buttons>\n  </ion-navbar>\n  <ion-toolbar>\n    <ion-segment [(ngModel)]="selectedMatchId" >\n      <ion-segment-button *ngFor="let c of backend.matchconsoles; let i=index;" [value]="c.match.id" (tap)="tapSegment(c,i)" [ngClass]="c.realtime ? \'ssecondary\': \'sdark\'">\n        <span [ngClass]="(c.match.realtime==\'false\') || (c.match.realtime==false) ? \'tabnorealtime\': \'\'">{{c.match.matchid}} {{c.match.atletaname}}</span>\n      </ion-segment-button>\n      \n    </ion-segment>\n  </ion-toolbar>\n\n</ion-header>\n\n\n<ion-content padding>\n <div class="consoleinfo">{{selectedConsole.match.matchid}} {{selectedConsole.match.atletaname}}</div> \n <div class="consoleinfo" style="font-size: 13px; font-style: italic; height: 25px;" *ngIf="showMatchOrd(selectedConsole.match)">{{selectedConsole.match.matchord}}</div>\n <div class="avvinfo"  *ngIf="selectedConsole.avversario">{{selectedConsole.avversario.split(\'|\')[0]}}<br>{{selectedConsole.avversario.split(\'|\')[1]}}</div>\n <ion-row>\n   <ion-col col-12><button ion-button full [ngClass]="(selectedConsole.match.realtime==\'true\') || (selectedConsole.match.realtime==true) ? \'realtimebut\' : \'norealtimebut\'" (tap)="toggleTempoReale()">{{getTemporealeText()}}</button>\n   </ion-col>\n </ion-row>\n  <br>\n  <div *ngIf="(selectedConsole.match.realtime==\'true\') || (selectedConsole.match.realtime==true) ">\n  <ion-row>\n    <ion-col col-6>\n      <button [disabled]="disabledcontrols" ion-button full color="light" (tap)="tapPause()" [ngClass]="!selectedConsole.paused ? \'incorso\' : \'\'">{{getPauseText()}}</button>\n    </ion-col>\n    <ion-col col-6>\n      <button [disabled]="disabledcontrols" ion-button full color="light" (tap)="tapFineround()" [ngClass]="selectedConsole.fineround ? \'roundactive\' : \'\'">FINEROUND</button>\n    </ion-col>\n\n  </ion-row>\n  <ion-row>\n    <ion-col col-3><button [disabled]="disabledcontrols" ion-button full (tap)="tapRound(\'1\')" color="light" [ngClass]="(selectedConsole.round==\'1\') && (selectedConsole.fineround) ? \'roundactive fineround\' : selectedConsole.round==\'1\' ? \'roundactive\' : \'\'">1</button></ion-col>\n    <ion-col col-3><button [disabled]="disabledcontrols" ion-button full (tap)="tapRound(\'2\')" color="light" [ngClass]="(selectedConsole.round==\'2\') && (selectedConsole.fineround) ? \'roundactive fineround\' : selectedConsole.round==\'2\' ? \'roundactive\' : \'\'">2</button></ion-col>\n    <ion-col col-3><button [disabled]="disabledcontrols" ion-button full (tap)="tapRound(\'3\')" color="light" [ngClass]="(selectedConsole.round==\'3\') && (selectedConsole.fineround) ? \'roundactive fineround\' : selectedConsole.round==\'3\' ? \'roundactive\' : \'\'">3</button></ion-col>\n    <ion-col col-3><button [disabled]="disabledcontrols" ion-button full (tap)="tapRound(\'GP\')" color="light" [ngClass]="(selectedConsole.round==\'GP\') && (selectedConsole.fineround) ? \'roundactive fineround\' : selectedConsole.round==\'GP\' ? \'roundactive\' : \'\'">GP</button></ion-col>\n  </ion-row>\n  </div>\n  <br>\n  <ion-row>\n    \n    <ion-col col-2><button [disabled]="disabledcontrols" ion-button full color="light" (tap)="tapPlus(\'plus_1\')">+</button></ion-col>\n    <ion-col col-2><button [disabled]="disabledcontrols" ion-button full color="light" (tap)="tapPlus(\'minus_1\')">-</button></ion-col>\n    <ion-col col-1></ion-col>\n    <ion-col col-2><ion-input readonly [disabled]="disabledcontrols" [(ngModel)]="selectedConsole.result" ></ion-input></ion-col>\n    <ion-col col-1></ion-col>\n    <ion-col col-2><button [disabled]="disabledcontrols" ion-button full color="light" (tap)="tapPlus(\'plus_2\')">+</button></ion-col>\n    <ion-col col-2><button [disabled]="disabledcontrols" ion-button full color="light" (tap)="tapPlus(\'minus_2\')">-</button></ion-col>\n  </ion-row>\n  <ion-row>\n    <ion-col col-12>\n      <div style="font-size: 12px; padding: 4px; text-align: center">\n      <i>Il punteggio di <b>sinistra</b> indica il <b>nostro</b> atleta, quello di <b>destra</b> il suo <b>avversario</b></i>\n    </div>\n    </ion-col>\n  </ion-row>\n  <br>\n  <div class="checkboxes">\n  <ion-item>\n      <ion-label>GoldenPoint (il punteggio indica il vincitore)</ion-label>\n      <ion-checkbox [(ngModel)]="selectedConsole.goldenpoint"></ion-checkbox>\n    </ion-item>\n    <ion-item>\n        <ion-label>Sconfitta per squalifica</ion-label>\n        <ion-checkbox [(ngModel)]="selectedConsole.squalifica"></ion-checkbox>\n      </ion-item>\n    </div>\n\n\n  <br>\n  <div *ngIf="hasAvversari()"><!--*ngIf="selectedConsole.match.avversari.length>0"-->\n  <button ion-button color="light"  small block (tap)="selectAvversario(selectedConsole)">Seleziona avversario</button>\n  <br>\n</div>\n\n  <button [disabled]="disabledcontrols" ion-button full (tap)="setResult()">Convalida risultato</button>  \n\n</ion-content>\n'/*ion-inline-end:"/Users/demetriomortelliti/Desktop/demy/PROJECTS/appkwondo/clients/ion2kwondo/src/pages/matchconsole/matchconsole.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_3__providers_socket_service_socket_service__["a" /* SocketService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["t" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_2__providers_backend_backend__["a" /* BackendProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */]])
], MatchconsolePage);

//# sourceMappingURL=matchconsole.js.map

/***/ }),

/***/ 522:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChatfotoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_moment__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the ChatfotoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var ChatfotoPage = (function () {
    function ChatfotoPage(events, platform, viewCtrl, navCtrl, navParams) {
        this.events = events;
        this.platform = platform;
        this.viewCtrl = viewCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.imgsrc = "";
        this.title = "";
        this.data = "";
        this.url = "";
    }
    ChatfotoPage.prototype.ionViewDidLoad = function () {
        var url = this.navParams.get("url");
        var msg = this.navParams.get("msg");
        this.title = msg.nickname;
        this.url = url;
        this.data = __WEBPACK_IMPORTED_MODULE_2_moment__(msg.time, "YYYYMMDDHHmmSS").format("DD/MM/YYYY HH:mm:SS");
        console.log('ionViewDidLoad ChatfotoPage', url, msg);
        this.imgsrc = url;
    };
    ChatfotoPage.prototype.closeModal = function () {
        this.navCtrl.pop();
        //this.viewCtrl.dismiss();
    };
    ChatfotoPage.prototype.openFotoInGallery = function () {
        var url = this.url;
        console.log("open foto", url);
        // window.open(url, '_system', 'width=310,height=30');
        //if (1==1) return;
        var questo = this;
        if (questo.platform.is("cordova")) {
            window['cordova'].plugins.FileOpener.openFile(url, function (data) {
                console.log("file " + url + " successfully opened");
            }, function (err) {
                console.log("error opening file", url, err);
            });
            /* questo.fileOpener.open(url, 'image/jpeg')
                  .then(() => console.log('File is opened', url))
                  .catch(e => console.log('Error openening file', e));*/
            if (true)
                return;
            /*
            const fileTransfer: TransferObject = questo.transfer.create();
            var d = new Date();
            var md = moment(d).format("YYYYMMDDHHmmSS");
            fileTransfer.download(url, this.file.dataDirectory + 'appkwondoimg_' + md + ".jpg").then((entry) => {
              var fname = entry.toURL();
              console.log('download complete: ' + entry.toURL());
              //var ffname=fname.replace("file:///","");
              var ffname=fname;
              
              questo.fileOpener.open(ffname, 'image/jpeg')
                .then(() => console.log('File is opened', ffname))
                .catch(e => console.log('Error openening file', e));
      
            }, (error) => {
              console.log("error transferring ", url);
            });
            */
        }
        else {
            window.open(url, '_system', 'width=310,height=30');
        }
    };
    ChatfotoPage.prototype.ionViewWillEnter = function () {
        var questo = this;
        this.events.subscribe("hwbackbutton", function (data) {
            console.log("hwbackbutton in gare.ts");
            questo.navCtrl.pop();
        });
    };
    ChatfotoPage.prototype.ionViewWillLeave = function () {
        this.events.unsubscribe("hwbackbutton");
    };
    return ChatfotoPage;
}());
ChatfotoPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-chatfoto',template:/*ion-inline-start:"/Users/demetriomortelliti/Desktop/demy/PROJECTS/appkwondo/clients/ion2kwondo/src/pages/chatfoto/chatfoto.html"*/'<!--\n  Generated template for the ChatfotoPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-toolbar>\n    <ion-buttons end>\n                \n            </ion-buttons>\n    <ion-title><span class="title">{{title}}</span><br><span class="data">{{data}}</span></ion-title>\n    </ion-toolbar>\n    \n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content style="background: black" nopadding>\n  <button ion-button full (click)="openFotoInGallery()">\n                   Apri nella galleria\n                </button>\n  <div class="container">\n  <img style="width: 100%" [src]="imgsrc" />\n  </div>\n\n</ion-content>\n'/*ion-inline-end:"/Users/demetriomortelliti/Desktop/demy/PROJECTS/appkwondo/clients/ion2kwondo/src/pages/chatfoto/chatfoto.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["u" /* ViewController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */]])
], ChatfotoPage);

//# sourceMappingURL=chatfoto.js.map

/***/ }),

/***/ 523:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChatlistPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_backend_backend__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_moment__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the ChatlistPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var ChatlistPage = (function () {
    function ChatlistPage(backend, viewCtrl, navCtrl, navParams) {
        this.backend = backend;
        this.viewCtrl = viewCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.chatlist = [];
        var data = navParams.get('data');
        console.log('UserId', data);
        this.chatlist = data.rows;
    }
    ChatlistPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ChatlistPage');
    };
    ChatlistPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    ChatlistPage.prototype.selectChat = function (c) {
        var data = { 'foo': 'bar' };
        this.viewCtrl.dismiss(c);
    };
    ChatlistPage.prototype.formatBytes = function (bytes) {
        if (bytes < 1024)
            return bytes + " Bytes";
        else if (bytes < 1048576)
            return (bytes / 1024).toFixed(3) + " KB";
        else if (bytes < 1073741824)
            return (bytes / 1048576).toFixed(3) + " MB";
        else
            return (bytes / 1073741824).toFixed(3) + " GB";
    };
    ChatlistPage.prototype.formatData = function (fname) {
        if (fname.indexOf("_") == -1)
            return "";
        var data = fname.split("_")[1];
        data = data.split(".")[0];
        var d = __WEBPACK_IMPORTED_MODULE_3_moment__(data, "YYYYMMDDHHmmSS").toDate();
        var mdata = __WEBPACK_IMPORTED_MODULE_3_moment__(d).format("DD/MM/YYYY HH:mm");
        var rettext = "Archiviata in data " + mdata;
        return rettext;
    };
    return ChatlistPage;
}());
ChatlistPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-chatlist',template:/*ion-inline-start:"/Users/demetriomortelliti/Desktop/demy/PROJECTS/appkwondo/clients/ion2kwondo/src/pages/chatlist/chatlist.html"*/'<!--\n  Generated template for the ChatlistPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Lista chat</ion-title>\n    <ion-buttons start>\n    <button ion-button (tap)="dismiss()">Annulla</button>\n  </ion-buttons>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content spadding class="ion-content">\n \n\n  <button (tap)="selectChat(c)" ion-item *ngFor="let c of chatlist" style="padding: 3px !important;">\n    <div class="{{c.filename==backend.activechatfilename ? \'selected\' : \'\'}}">\n    <span >{{c.filename}}</span><br>\n    <span class="archiviata">{{formatData(c.filename)}}</span><br>\n    <span class="filesize">{{formatBytes(c.size)}}</span>\n  </div>\n  </button>\n\n</ion-content>\n'/*ion-inline-end:"/Users/demetriomortelliti/Desktop/demy/PROJECTS/appkwondo/clients/ion2kwondo/src/pages/chatlist/chatlist.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__providers_backend_backend__["a" /* BackendProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["u" /* ViewController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */]])
], ChatlistPage);

//# sourceMappingURL=chatlist.js.map

/***/ }),

/***/ 524:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PopoverPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_backend_backend__ = __webpack_require__(6);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the PopoverPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var PopoverPage = (function () {
    function PopoverPage(viewCtrl, backend, navCtrl, navParams) {
        this.viewCtrl = viewCtrl;
        this.backend = backend;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.popdata = [];
        var data = this.navParams.data;
        console.log("popover data", data);
        this.popdata = data;
    }
    PopoverPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad PopoverPage');
    };
    PopoverPage.prototype.doAction = function (cmd) {
        this.viewCtrl.dismiss(cmd);
    };
    return PopoverPage;
}());
PopoverPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-popover',template:/*ion-inline-start:"/Users/demetriomortelliti/Desktop/demy/PROJECTS/appkwondo/clients/ion2kwondo/src/pages/popover/popover.html"*/'<ion-list *ngFor="let p of popdata">\n  <button ion-item (tap)="doAction(p.cmd)"><ion-icon [name]="p.icon"></ion-icon> {{p.text}}</button>\n</ion-list>\n'/*ion-inline-end:"/Users/demetriomortelliti/Desktop/demy/PROJECTS/appkwondo/clients/ion2kwondo/src/pages/popover/popover.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["u" /* ViewController */], __WEBPACK_IMPORTED_MODULE_2__providers_backend_backend__["a" /* BackendProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */]])
], PopoverPage);

//# sourceMappingURL=popover.js.map

/***/ }),

/***/ 528:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddmatchesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the AddmatchesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var AddmatchesPage = (function () {
    function AddmatchesPage(viewCtrl, navCtrl, navParams) {
        this.viewCtrl = viewCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.model = {
            matches: "",
            giornogara: "0"
        };
        this.garadays = 1;
        this.giornigara = [];
        console.log("addmatches page constructor", navParams);
        this.garadays = navParams.get("giornigara");
        for (var i = 0; i < this.garadays; i++) {
            this.giornigara.push(String(i));
        }
    }
    AddmatchesPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad AddmatchesPage');
    };
    AddmatchesPage.prototype.cancel = function () {
        this.viewCtrl.dismiss();
    };
    AddmatchesPage.prototype.save = function () {
        this.viewCtrl.dismiss(this.model);
    };
    AddmatchesPage.prototype.isOkEnabled = function () {
        var retvalue = true;
        if (this.model.matches.trim() == "")
            retvalue = false;
        return retvalue;
    };
    return AddmatchesPage;
}());
AddmatchesPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-addmatches',template:/*ion-inline-start:"/Users/demetriomortelliti/Desktop/demy/PROJECTS/appkwondo/clients/ion2kwondo/src/pages/addmatches/addmatches.html"*/'<!--\n  Generated template for the AddmatchesPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Aggiungi match</ion-title>\n    <ion-buttons end>\n      <button ion-button clear (tap)="cancel()">Annulla</button>\n      <button ion-button clear color="danger" (tap)="save()" [disabled]="!isOkEnabled()">SALVA</button>\n    </ion-buttons>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <p style="text-align: center; font-style: italic">\n    Inserisci i matches separati da virgola (o punto) ed il giorno di gara\n  </p>\n  <ion-item>\n    <ion-label floating>Matches separati da virgola</ion-label>\n    <ion-input type="tel" [(ngModel)]="model.matches" name="matches"></ion-input>\n  </ion-item>\n  <ion-item>\n    <ion-label>Giorno di gara</ion-label>\n    <ion-select [(ngModel)]="model.giornogara">\n      <ion-option *ngFor="let g of giornigara" [value]="g">{{g}}</ion-option>\n     \n    </ion-select>  \n   \n  </ion-item>\n</ion-content>\n'/*ion-inline-end:"/Users/demetriomortelliti/Desktop/demy/PROJECTS/appkwondo/clients/ion2kwondo/src/pages/addmatches/addmatches.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["u" /* ViewController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */]])
], AddmatchesPage);

//# sourceMappingURL=addmatches.js.map

/***/ }),

/***/ 529:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MapPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__ = __webpack_require__(22);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/*
  Generated class for the MapPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var MapPage = (function () {
    function MapPage(events, sanitizer, navCtrl, navParams) {
        this.events = events;
        this.sanitizer = sanitizer;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    MapPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad MapPagePage');
        var mapsrc = this.navParams.get("mapsrc");
        this.mapsrc = this.sanitizer.bypassSecurityTrustResourceUrl(mapsrc);
    };
    MapPage.prototype.ionViewWillEnter = function () {
        var questo = this;
        this.events.subscribe("hwbackbutton", function (data) {
            console.log("hwbackbutton in gare.ts");
            questo.navCtrl.pop();
        });
    };
    MapPage.prototype.ionViewWillLeave = function () {
        this.events.unsubscribe("hwbackbutton");
    };
    return MapPage;
}());
MapPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-map',template:/*ion-inline-start:"/Users/demetriomortelliti/Desktop/demy/PROJECTS/appkwondo/clients/ion2kwondo/src/pages/map/map.html"*/'<!--\n  Generated template for the MapPage page.\n\n  See http://ionicframework.com/docs/v2/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Mappa</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content spadding>\n  <iframe [src]="mapsrc" height="100%" width="100%"></iframe>\n\n</ion-content>\n'/*ion-inline-end:"/Users/demetriomortelliti/Desktop/demy/PROJECTS/appkwondo/clients/ion2kwondo/src/pages/map/map.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */], __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__["c" /* DomSanitizer */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */]])
], MapPage);

//# sourceMappingURL=map.js.map

/***/ }),

/***/ 530:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BroadcastPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_backend_backend__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_android_permissions__ = __webpack_require__(74);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var BroadcastPage = (function () {
    function BroadcastPage(navParams, loadingCtrl, backend, platform, androidPermissions, navCtrl) {
        //this.initRTC();
        this.navParams = navParams;
        this.loadingCtrl = loadingCtrl;
        this.backend = backend;
        this.platform = platform;
        this.androidPermissions = androidPermissions;
        this.navCtrl = navCtrl;
        this.roomid = "cucuzza";
        this.broadcastid = "cucuzza";
        this.connectionlabel = "";
        //rtcurl="http://localhost:8000/";
        this.rtcurl = "https://rtc18.mybluemix.net/";
        //rtcurl="http://10.113.32.94:8000/";
        //rtcurl='https://rtcmulticonnection.herokuapp.com:443/';
        this.isInitiator = false;
        this.videoinputdevices = [];
        this.videooutputdevices = [];
        this.audioinputdevices = [];
        this.audiooutputdevices = [];
        this.videodevice = 0;
        this.preview = false;
        this.viewermode = false;
    }
    BroadcastPage.prototype.ionViewDidLoad = function () {
        var questo = this;
        this.initRTCSB();
        var bid = this.navParams.get("broadcastid");
        var mode = this.navParams.get("mode");
        if (mode) {
            if (mode == "viewer")
                this.viewermode = true;
        }
        console.log("ionviewdidload broadcast, viewmode", questo.viewermode);
        if (bid) {
            console.log("opened with broadcastid", bid);
            this.broadcastid = bid;
            setTimeout(function () {
                questo.openOrJoin();
            }, 1000);
        }
        else {
            console.log("opened without broadcastid");
        }
        console.log("broadcastid", this.broadcastid);
    };
    BroadcastPage.prototype.getBroadcastText = function (r) {
        var questo = this;
        if (r.indexOf("_") > -1) {
            var arr = r.split("_");
            var garaid = arr[0];
            var matchid = arr[1];
            var m = questo.backend.getMatchById(matchid);
            //console.log(m);
            if (m.rows.length > 0) {
                var retvalue = m.rows[0].doc.matchid + " - " + m.rows[0].doc.atletaname;
                return retvalue;
            }
            else
                return r;
        }
        else
            return r;
    };
    BroadcastPage.prototype.resetBroadcast = function () {
        var questo = this;
        /*if (questo.connection){
          questo.connection.getSocket().emit("close-entire-session");
        }*/
        var url = questo.backend.rooturl + "/broadcast/reset";
        var loading = questo.loadingCtrl.create({
            spinner: 'dots',
            content: 'Aggiornamento broadcast in corso...'
        });
        loading.present();
        questo.backend.fetchData(url, function (data) {
            console.log("broadcast refreshed");
            loading.dismiss();
        });
    };
    BroadcastPage.prototype.refreshBroadcast = function () {
        var questo = this;
        //var url = questo.backend.rooturl + "/broadcast/list";
        var loading = questo.loadingCtrl.create({
            spinner: 'dots',
            content: 'Aggiornamento broadcast in corso...'
        });
        loading.present();
        questo.backend.getBroadcasts(function (data) {
            console.log("broadcast refreshed", data);
            questo.backend.fbLives = data;
            loading.dismiss();
        });
        /*
        questo.backend.fetchData(url, function (data) {
          console.log("broadcast refreshed", data);
          questo.backend.fbLives = data;
          loading.dismiss();
        })*/
    };
    BroadcastPage.prototype.tapBroadcast = function (r) {
        this.broadcastid = r;
        this.openOrJoin();
    };
    /*
      initRTC() {
    
        console.log("initRTC")!!
    
        var questo = this;
    
        questo.connection = new RTCMultiConnection();
    
        console.log("connection", questo.connection)
    
        questo.connection.onMediaError = function (error, constraints) {
          alert("media error " + JSON.stringify(error, null, ' '));
        };
    
        // http://www.rtcmulticonnection.org/docs/socketURL/
        questo.connection.socketURL = questo.rtcurl;
    
        questo.connection.socketMessageEvent = 'video-conference-demo';
    
        questo.connection.session = {
          audio: true,
          video: true
        };
    
        questo.connection.mediaConstraints = {
          audio: false,
          video: {
            mandatory: {},
            optional: [{
              facingMode: 'user'
            }]
          }
        };
    
        questo.connection.sdpConstraints.mandatory = {
          OfferToReceiveAudio: true,
          OfferToReceiveVideo: true
        };
    
        questo.connection.videosContainer = document.getElementById('videos-container');
        //questo.connection.videosContainer=questo.videos.nativeElement;
        questo.connection.onstream = function (event) {
          console.log("streaming", event);
          var div = document.createElement('div');
          div = questo.videos.nativeElement;
          div.id = event.streamid || event.stream.id;
          
          
    
          div.appendChild(event.mediaElement);
    
          questo.connection.videosContainer.insertBefore(div, questo.connection.videosContainer.firstChild);
          questo.connection.fixAllVideos();
        };
    
        questo.connection.onstreamended = function (event) {
          questo.removeStreamById(event.streamid || event.stream.id);
        };
    
        questo.connection.fixAllVideos = function () {
          Object.keys(questo.connection.streamEvents).forEach(function (key) {
            var event = questo.connection.streamEvents[key];
            var div = document.getElementById(key);
            if (!div) return;
            var video = div.querySelector('video');
            if (!video) {
              console.log("no videos found, returning")
              return;
    
            }
            video.src = URL.createObjectURL(event.stream);
            
            video.play();
    
            setTimeout(function () {
              video.play();
            }, 2000);
          });
        };
    
      }
    */
    /*
      removeStreamById(key) {
        var questo = this;
        var event = questo.connection.streamEvents[key];
        var div = document.getElementById(key);
        if (!div) return;
        var video = div.querySelector('video');
        if (!video) return;
        video.src = null;
    
        div.parentNode.removeChild(div);
      }
    
    
    
      joinRoom() {
    
        var questo = this;
    
        if (questo.platform.is("cordova")) {
    
          questo.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.CAMERA, this.androidPermissions.PERMISSION.GET_ACCOUNTS]).then(function () {
            var roomid = questo.roomid;
    
            questo.connection.join(roomid, function () {
              console.log("sessionid", questo.connection.sessionid);
              //showRoomURL(connection.sessionid);
            });
    
          }).catch(function (e) {
            console.log("error asking permissions", e)
          });
    
        } else {
          var roomid = questo.roomid;
    
          questo.connection.join(roomid, function () {
            console.log("sessionid", questo.connection.sessionid);
            //showRoomURL(connection.sessionid);
          });
    
        }
    
    
    
      }
    
    
    
      openRoom() {
        var questo = this;
    
        if (questo.platform.is("cordova")) {
          questo.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.CAMERA, this.androidPermissions.PERMISSION.GET_ACCOUNTS]).then(function () {
            questo.connection.open(questo.roomid, function () {
              console.log("connection opened !");
              console.log(questo.connection.sessionid);
            });
          }).catch(function (e) {
            console.log("error asking permissions", e)
          });
    
        } else {
          questo.connection.open(questo.roomid, function () {
            console.log("connection opened !");
            console.log(questo.connection.sessionid);
          });
    
        }
    
      }
    */
    BroadcastPage.prototype.selectVideoOutputDevice = function () {
        var questo = this;
        console.log("videodevice", questo.videodevice);
        if (questo.connection) {
            console.log("abbiamo una connection");
            questo.connection.stopMediaAccess();
            //questo.connection.selectVideoOutputDevice(questo.videodevice);
            setTimeout(function () {
                questo.connection.mediaConstraints.video.optional = [{
                        sourceId: questo.videodevice //set here the new camera
                    }];
                questo.connection.addStream({ audio: true, video: true }); // add new stream with the new device
            }, 2000);
        }
    };
    BroadcastPage.prototype.initRTCSB = function () {
        var questo = this;
        console.log("initRTCSB", this.broadcastid);
        var devices;
        navigator.mediaDevices.enumerateDevices().then(function (devs) {
            devices = devs;
            console.log("devices", devices);
            devices.forEach(function (item, idx) {
                /*var option = document.createElement('option');
                option.innerHTML = item.label || (item.kind + ': ' + item.deviceId);
                option.value = item.deviceId;*/
                if (item.kind == 'audioinput' || item.kind == 'audio') {
                    questo.audioinputdevices.push(item);
                }
                else if (item.kind == 'audiooutput') {
                    questo.audiooutputdevices.push(item);
                }
                else
                    questo.videooutputdevices.push(item);
            });
        }).catch(function (e) {
            console.log("error enumerating devices");
        });
        questo.videodevice = questo.videoinputdevices[0];
        // recording is disabled because it is resulting for browser-crash
        // if you enable below line, please also uncomment above "RecordRTC.js"
        var enableRecordings = false;
        questo.connection = new RTCMultiConnection();
        // its mandatory in v3
        questo.connection.enableScalableBroadcast = true;
        questo.connection.mediaConstraints = {
            audio: true,
            video: {
                mandatory: {},
                optional: [{
                        facingMode: 'application'
                    }]
            }
        };
        // each relaying-user should serve only 1 users
        questo.connection.maxRelayLimitPerUser = 1;
        // we don't need to keep room-opened
        // scalable-broadcast.js will handle stuff itself.
        questo.connection.autoCloseEntireSession = true;
        // by default, socket.io server is assumed to be deployed on your own URL
        //connection.socketURL = '/';
        // comment-out below line if you do not have your own socket.io server
        //questo.connection.socketURL = 'https://rtcmulticonnection.herokuapp.com:443/';
        questo.connection.socketURL = questo.rtcurl;
        console.log("questo.rtcurl", questo.rtcurl);
        questo.connection.socketMessageEvent = 'scalable-media-broadcast-demo';
        // document.getElementById('broadcast-id').value = connection.userid;
        // user need to connect server, so that others can reach him.
        questo.connection.connectSocket(function (socket) {
            console.log("videosocket connected", socket);
            questo.connection.mediaConstraints = {
                audio: true,
                video: {
                    mandatory: {},
                    optional: [{
                            facingMode: 'application'
                        }]
                }
            };
            socket.on('logs', function (log) {
                //document.querySelector('h1').innerHTML = log.replace(/</g, '----').replace(/>/g, '___').replace(/----/g, '(<span style="color:red;">').replace(/___/g, '</span>)');
                var txt = log.replace(/</g, '----').replace(/>/g, '___').replace(/----/g, '(<span style="color:red;">').replace(/___/g, '</span>)');
                questo.connectionlabel = log;
            });
            // this event is emitted when a broadcast is already created.
            socket.on('join-broadcaster', function (hintsToJoinBroadcast) {
                console.log('join-broadcaster', hintsToJoinBroadcast);
                questo.connection.session = hintsToJoinBroadcast.typeOfStreams;
                questo.connection.sdpConstraints.mandatory = {
                    OfferToReceiveVideo: !!questo.connection.session.video,
                    OfferToReceiveAudio: !!questo.connection.session.audio
                };
                questo.connection.broadcastId = hintsToJoinBroadcast.broadcastId;
                questo.connection.join(hintsToJoinBroadcast.userid);
            });
            socket.on('rejoin-broadcast', function (broadcastId) {
                console.log('rejoin-broadcast', broadcastId);
                questo.connection.attachStreams = [];
                socket.emit('check-broadcast-presence', broadcastId, function (isBroadcastExists) {
                    if (!isBroadcastExists) {
                        // the first person (i.e. real-broadcaster) MUST set his user-id
                        questo.connection.userid = broadcastId;
                    }
                    socket.emit('join-broadcast', {
                        broadcastId: broadcastId,
                        userid: questo.connection.userid,
                        typeOfStreams: questo.connection.session
                    });
                });
            });
            socket.on('broadcast-stopped', function (broadcastId) {
                // alert('Broadcast has been stopped.');
                // location.reload();
                console.log('broadcast-stopped', broadcastId);
                //alert("Broadcast "+broadcastId+" has been stopped.");
            });
            // this event is emitted when a broadcast is absent.
            socket.on('start-broadcasting', function (typeOfStreams) {
                console.log('start-broadcasting', typeOfStreams);
                // host i.e. sender should always use this!
                questo.connection.sdpConstraints.mandatory = {
                    OfferToReceiveVideo: false,
                    OfferToReceiveAudio: false
                };
                questo.connection.session = typeOfStreams;
                // "open" method here will capture media-stream
                // we can skip this function always; it is totally optional here.
                // we can use "connection.getUserMediaHandler" instead
                questo.connection.open(questo.connection.userid, function () {
                    //showRoomURL(questo.connection.sessionid);
                });
            });
        });
        //var videoPreview = document.getElementById('video-preview');
        var videoPreview = questo.videoPreview.nativeElement;
        questo.connection.onstream = function (event) {
            questo.preview = true;
            console.log("streaming !! isInitiator", questo.connection.isInitiator);
            questo.isInitiator = questo.connection.isInitiator;
            if (questo.connection.isInitiator && event.type !== 'local') {
                return;
            }
            questo.connection.isUpperUserLeft = false;
            videoPreview.srcObject = event.stream;
            videoPreview.play();
            videoPreview.userid = event.userid;
            if (event.type === 'local') {
                videoPreview.muted = true;
            }
            if (questo.connection.isInitiator == false && event.type === 'remote') {
                // he is merely relaying the media
                questo.connection.dontCaptureUserMedia = true;
                questo.connection.attachStreams = [event.stream];
                questo.connection.sdpConstraints.mandatory = {
                    OfferToReceiveAudio: false,
                    OfferToReceiveVideo: false
                };
                var socket = questo.connection.getSocket();
                socket.emit('can-relay-broadcast');
                if (questo.connection.DetectRTC.browser.name === 'Chrome') {
                    questo.connection.getAllParticipants().forEach(function (p) {
                        if (p + '' != event.userid + '') {
                            var peer = questo.connection.peers[p].peer;
                            peer.getLocalStreams().forEach(function (localStream) {
                                peer.removeStream(localStream);
                            });
                            event.stream.getTracks().forEach(function (track) {
                                peer.addTrack(track, event.stream);
                            });
                            questo.connection.dontAttachStream = true;
                            questo.connection.renegotiate(p);
                            questo.connection.dontAttachStream = false;
                        }
                    });
                }
                if (questo.connection.DetectRTC.browser.name === 'Firefox') {
                    // Firefox is NOT supporting removeStream method
                    // that's why using alternative hack.
                    // NOTE: Firefox seems unable to replace-tracks of the remote-media-stream
                    // need to ask all deeper nodes to rejoin
                    questo.connection.getAllParticipants().forEach(function (p) {
                        if (p + '' != event.userid + '') {
                            questo.connection.replaceTrack(event.stream, p);
                        }
                    });
                }
            }
        };
        questo.connection.onNumberOfBroadcastViewersUpdated = function (event) {
            console.log("broadcastviewersupdated", event, questo.connection, questo.connection.getAllParticipants());
            if (!questo.connection.isInitiator)
                return;
            document.getElementById('broadcast-viewers-counter').innerHTML = 'Number of broadcast viewers: <b>' + event.numberOfBroadcastViewers + '</b>';
        };
        // ask node.js server to look for a broadcast
        // if broadcast is available, simply join it. i.e. "join-broadcaster" event should be emitted.
        // if broadcast is absent, simply create it. i.e. "start-broadcasting" event should be fired.
        questo.connection.onstreamended = function () {
            questo.preview = false;
            console.log("stream ended !!");
        };
        questo.connection.onleave = function (event) {
            if (event.userid !== videoPreview.userid)
                return;
            var socket = questo.connection.getSocket();
            socket.emit('can-not-relay-broadcast');
            questo.connection.isUpperUserLeft = true;
            if (allRecordedBlobs.length) {
                // playing lats recorded blob
                var lastBlob = allRecordedBlobs[allRecordedBlobs.length - 1];
                videoPreview.src = URL.createObjectURL(lastBlob);
                videoPreview.play();
                allRecordedBlobs = [];
            }
            else if (questo.connection.currentRecorder) {
                var recorder = questo.connection.currentRecorder;
                questo.connection.currentRecorder = null;
                recorder.stopRecording(function () {
                    if (!questo.connection.isUpperUserLeft)
                        return;
                    videoPreview.src = URL.createObjectURL(recorder.getBlob());
                    videoPreview.play();
                });
            }
            if (questo.connection.currentRecorder) {
                questo.connection.currentRecorder.stopRecording();
                questo.connection.currentRecorder = null;
            }
        };
        var allRecordedBlobs = [];
    };
    BroadcastPage.prototype.openOrJoin = function () {
        var questo = this;
        //var broadcastId = "broadcastid";
        if (questo.platform.is("cordova")) {
            questo.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.CAMERA, this.androidPermissions.PERMISSION.GET_ACCOUNTS]).then(function () {
                questo.goOpenOrJoin();
            }).catch(function (e) {
                console.log("error asking permissions", e);
            });
        }
        else
            questo.goOpenOrJoin();
    };
    BroadcastPage.prototype.goOpenOrJoin = function () {
        var questo = this;
        var broadcastId = questo.broadcastid;
        //questo.initRTCSB();
        console.log("broadcaastId", broadcastId);
        console.log("trying to open broadcastid ", broadcastId);
        questo.connection.session = {
            audio: true,
            video: true,
            oneway: true
        };
        console.log("mediaconstraints", questo.connection.mediaConstraints);
        var socket = questo.connection.getSocket();
        socket.emit('check-broadcast-presence', broadcastId, function (isBroadcastExists) {
            if (!isBroadcastExists) {
                // the first person (i.e. real-broadcaster) MUST set his user-id
                questo.connection.userid = broadcastId;
            }
            console.log('check-broadcast-presence', broadcastId, isBroadcastExists);
            socket.emit('join-broadcast', {
                broadcastId: broadcastId,
                userid: questo.connection.userid,
                typeOfStreams: questo.connection.session
            });
        });
    };
    BroadcastPage.prototype.closeBroadcast = function () {
        var questo = this;
        if (questo.connection) {
            questo.connection.getSocket().emit("close-entire-session");
            questo.connection.getAllParticipants().forEach(function (participant) {
                console.log("participant", participant);
                questo.connection.disconnectWith(participant);
            });
            questo.connection.attachStreams.forEach(function (stream) {
                stream.stop();
            });
            //questo.connection.streams.stop('local');
            questo.connection.removeStream({
                video: true,
                audio: true
            });
            //questo.connection.streams.stop();
            questo.connection.close();
            questo.connection.closeEntireSession();
            questo.connection.socket.disconnect();
            console.log("connection closed", questo.connection);
            questo.resetBroadcast();
            questo.initRTCSB();
            //questo.connection=null;
        }
    };
    BroadcastPage.prototype.getViewers = function () {
        var questo = this;
        if (questo.connection) {
            var socket = questo.connection.getSocket();
            socket.emit("check-broadcast-presence", function (data) {
                console.log("viewers", data);
            });
        }
    };
    return BroadcastPage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])("videos"),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"])
], BroadcastPage.prototype, "videos", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])("videoPreview"),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"])
], BroadcastPage.prototype, "videoPreview", void 0);
BroadcastPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-broadcast',template:/*ion-inline-start:"/Users/demetriomortelliti/Desktop/demy/PROJECTS/appkwondo/clients/ion2kwondo/src/pages/broadcast/broadcast.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>\n      Broadcast\n    </ion-title>\n    <ion-buttons end>\n      <button ion-button clear  (tap)="resetBroadcast()">Reset</button>\n      <button ion-button clear (tap)="refreshBroadcast()">Refresh</button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n\n  <div class="blist">\n    <div class="head">Trasmissioni attive: {{backend.fbLives.length}}</div>\n    <ion-list *ngFor="let r of backend.fbLives">\n        <ion-item class="broadcastlist" (tap)="tapBroadcast(r)">{{getBroadcastText(r)}}</ion-item>\n      </ion-list>\n    </div>\n \n\n  <div class="connlabel" [hidden]="!preview">{{connectionlabel}}</div>\n\n  \n    <section class="make-center">\n        <ion-input *ngIf="!viewermode" type="text" [(ngModel)]="broadcastid" id="room-id" autocorrect=off autocapitalize=off size=20></ion-input>\n        <!--<button ion-button id="open-room" (tap)="openRoom()">Open Room</button>\n        <button ion-button id="join-room" (tap)="joinRoom()">Join Room</button>-->\n        <button *ngIf="!viewermode" block ion-button id="open-or-join-room" (tap)="openOrJoin()">Auto Open Or Join Room</button>\n        <video #videoPreview [hidden]="!preview" id="video-preview" controls loop allowfullscreen></video>\n        <div [hidden]="!preview" id="broadcast-viewers-counter"></div>\n        <div id="room-urls" style="text-align: center;display: none;background: #F1EDED;margin: 15px -10px;border: 1px solid rgb(189, 189, 189);border-left: 0;border-right: 0;"></div>\n          \n        <div #videos id="videos-container" style="background: yellow;"></div>\n        <button ion-button block (tap)="closeBroadcast()" *ngIf="isInitiator">CHIUDI BROADCAST</button>\n        <ion-item *ngIf="!viewermode">\n          <ion-label>Video device</ion-label>\n          <ion-select (ionChange)="selectVideoOutputDevice()" [(ngModel)]="videodevice">\n            <ion-option *ngFor="let d of videooutputdevices" [value]="d.deviceId">{{d.deviceId}}</ion-option>\n          </ion-select>\n        </ion-item>\n        <video id="remotevideo"></video>\n        <video *ngIf="!viewermode" id="localvideo"></video>\n        </section>\n\n\n       \n        <button *ngIf="!viewermode" ion-button block (tap)="getViewers()" >getviewers</button>\n</ion-content>\n'/*ion-inline-end:"/Users/demetriomortelliti/Desktop/demy/PROJECTS/appkwondo/clients/ion2kwondo/src/pages/broadcast/broadcast.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_2__providers_backend_backend__["a" /* BackendProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* Platform */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_android_permissions__["a" /* AndroidPermissions */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */]])
], BroadcastPage);

//# sourceMappingURL=broadcast.js.map

/***/ }),

/***/ 531:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FiltersPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_backend_backend__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_moment__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the FiltersPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var FiltersPage = (function () {
    function FiltersPage(backend, viewCtrl, navCtrl, params) {
        this.backend = backend;
        this.viewCtrl = viewCtrl;
        this.navCtrl = navCtrl;
        this.params = params;
        this.filters = {
            giornogara: "all",
            sesso: "",
            categoria: "",
            medaglie: "",
            quadrato: ""
        };
        this.giornigara = [];
        this.datagara0 = "";
        var questo = this;
        this.datagara0 = params.get("datagara0");
        console.log("datagara0", this.datagara0);
        this.filters = {
            giornogara: params.get('giornogara'),
            giornigara: params.get('giornigara'),
            sesso: params.get('sesso'),
            categoria: params.get('categoria'),
            medaglie: params.get('medaglie'),
            quadrato: params.get('quadrato')
        };
        for (var i = 0; i < this.filters.giornigara; i++) {
            questo.giornigara.push(String(i));
        }
        console.log('filters', this.filters);
    }
    FiltersPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad FiltersPage');
    };
    FiltersPage.prototype.resetFilters = function () {
        this.backend.playFeedback();
        for (var k in this.filters) {
            this.filters[k] = "";
            if (k == "giornogara")
                this.filters[k] = "all";
            console.log("resetFilters done", this.filters);
        }
    };
    FiltersPage.prototype.applyFilters = function () {
        this.backend.playFeedback();
        this.viewCtrl.dismiss(this.filters);
    };
    FiltersPage.prototype.cancel = function () {
        this.backend.playFeedback();
        this.viewCtrl.dismiss();
    };
    FiltersPage.prototype.getDataGiorno = function (f) {
        var questo = this;
        var mstart = __WEBPACK_IMPORTED_MODULE_3_moment__(questo.datagara0, "DD/MM/YYYY");
        var m = mstart.add(f, 'days');
        var sm = m.locale("it").format("ddd DD/MM/YYYY");
        return sm;
    };
    return FiltersPage;
}());
FiltersPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-filters',template:/*ion-inline-start:"/Users/demetriomortelliti/Desktop/demy/PROJECTS/appkwondo/clients/ion2kwondo/src/pages/filters/filters.html"*/'<!--\n  Generated template for the FiltersPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Filtra dati di gara</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <button ion-button (tap)="resetFilters()">Reset filtri</button>\n    <ion-item>\n        <ion-label>Sesso</ion-label>\n        <ion-select [(ngModel)]="filters.sesso">\n            <ion-option value="">Qualsiasi</ion-option>\n          <ion-option value="f">Femmine</ion-option>\n          <ion-option value="m">Maschi</ion-option>\n        </ion-select>\n      </ion-item>\n\n      <ion-item>\n          <ion-label>Categoria</ion-label>\n          <ion-select [(ngModel)]="filters.categoria">\n            <ion-option value="">Qualsiasi</ion-option>\n            <ion-option value="esordienti">Esordienti</ion-option>\n            <ion-option value="cadetti b">Cadetti B</ion-option>\n            <ion-option value="cadetti a">Cadetti A</ion-option>\n            <ion-option value="junior">Junior</ion-option>\n            <ion-option value="senior">Senior</ion-option>\n          </ion-select>\n        </ion-item>\n\n        <ion-item>\n            <ion-label>Medaglie</ion-label>\n            <ion-select [(ngModel)]="filters.medaglie">\n              <ion-option value="">Qualsiasi</ion-option>\n              <ion-option value="oro">ORO</ion-option>\n              <ion-option value="argento">ARGENTO</ion-option>\n              <ion-option value="bronzo">BRONZO</ion-option>\n             \n            </ion-select>\n          </ion-item>\n\n          <ion-item>\n              <ion-label>Quadrato</ion-label>\n              <ion-select [(ngModel)]="filters.quadrato">\n                <ion-option value="">Qualsiasi</ion-option>\n                <ion-option value="1">1</ion-option>\n                <ion-option value="2">2</ion-option>\n                <ion-option value="3">3</ion-option>\n                <ion-option value="4">4</ion-option>\n                <ion-option value="5">5</ion-option>\n                <ion-option value="6">6</ion-option>\n                <ion-option value="7">7</ion-option>\n                <ion-option value="8">8</ion-option>\n                <ion-option value="9">9</ion-option>\n                <ion-option value="10">10</ion-option>\n                <ion-option value="11">11</ion-option>\n                <ion-option value="12">12</ion-option>\n                <ion-option value="13">13</ion-option>\n                <ion-option value="14">14</ion-option>\n                <ion-option value="15">15</ion-option>\n               \n              </ion-select>\n            </ion-item>\n\n\n            <ion-item>\n              <ion-label>Giorno di gara</ion-label>\n              <ion-select [(ngModel)]="filters.giornogara">\n                <ion-option value="all">Tutti</ion-option>\n                <ion-option *ngFor="let f of giornigara" [value]="f">{{getDataGiorno(f)}}</ion-option>\n                \n              </ion-select>\n            </ion-item>\n\n            <button ion-button (tap)="cancel()">Annulla</button>\n            <button ion-button (tap)="applyFilters()">Applica</button>\n\n</ion-content>\n'/*ion-inline-end:"/Users/demetriomortelliti/Desktop/demy/PROJECTS/appkwondo/clients/ion2kwondo/src/pages/filters/filters.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__providers_backend_backend__["a" /* BackendProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["u" /* ViewController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */]])
], FiltersPage);

//# sourceMappingURL=filters.js.map

/***/ }),

/***/ 532:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TkdtlivePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_backend_backend__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_moment__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the TdktlivePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var TkdtlivePage = (function () {
    function TkdtlivePage(events, backend, navCtrl, navParams) {
        this.events = events;
        this.backend = backend;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.livesample = [{ "id": "783", "prefisso_quadrato": "1", "id_incontro_corrente": "17710", "id_giornata": "148", "round": "R3", "time": "00:21.999", "punti_chong": "19", "punti_hong": "8", "amm_chong": "0", "amm_hong": "1", "nome_blu": "Aurora", "cognome_blu": "Catalano", "nome_rosso": "Elena", "cognome_rosso": "Roscioni", "societa_blu": "A.S.D. TAEKWONDO ROZZANO", "societa_rosso": "A.S.D. CENTRO TAEKWONDO CONERO" }, { "id": "784", "prefisso_quadrato": "2", "id_incontro_corrente": "17746", "id_giornata": "148", "round": "R1", "time": "01:30.000", "punti_chong": "0", "punti_hong": "0", "amm_chong": "0", "amm_hong": "0", "nome_blu": "Matteo", "cognome_blu": "Scacco", "nome_rosso": "Riccardo", "cognome_rosso": "Laghi", "societa_blu": "A.S.D. TEAM ELIOS ARTI MARZIALI", "societa_rosso": "ASD TAEKWONDO RAVENNA" }, { "id": "785", "prefisso_quadrato": "3", "id_incontro_corrente": "17786", "id_giornata": "148", "round": "R2", "time": "00:38.999", "punti_chong": "16", "punti_hong": "10", "amm_chong": "4", "amm_hong": "2", "nome_blu": "Emanuele", "cognome_blu": "Cricchio", "nome_rosso": "Giacomo Andrea", "cognome_rosso": "Di", "societa_blu": "ASD TAEKWONDO CITTA' DEL PIAVE", "societa_rosso": "TAEKWONDO OLIMPIC ACADEMY PESCARA" }, { "id": "786", "prefisso_quadrato": "4", "id_incontro_corrente": "17819", "id_giornata": "148", "round": "R1", "time": "01:25.999", "punti_chong": "0", "punti_hong": "0", "amm_chong": "0", "amm_hong": "0", "nome_blu": "Michel", "cognome_blu": "Vescovini", "nome_rosso": "Giada", "cognome_rosso": "Giunta", "societa_blu": "ASD TAEKWONDO TRICOLORE", "societa_rosso": "ACTIVA KOMBAT" }, { "id": "787", "prefisso_quadrato": "5", "id_incontro_corrente": "17851", "id_giornata": "148", "round": "R2", "time": "00:00.000", "punti_chong": "2", "punti_hong": "3", "amm_chong": "0", "amm_hong": "2", "nome_blu": "Giuseppe", "cognome_blu": "Parisi", "nome_rosso": "Francesco", "cognome_rosso": "Vangi", "societa_blu": "OLYMPIC TAEKWONDO FOGGIA", "societa_rosso": "OLYMPIC TAEKWONDO FOGGIA" }, { "id": "788", "prefisso_quadrato": "6", "id_incontro_corrente": "17878", "id_giornata": "148", "round": "R2", "time": "01:08.999", "punti_chong": "1", "punti_hong": "2", "amm_chong": "0", "amm_hong": "1", "nome_blu": "Indira", "cognome_blu": "Fischer", "nome_rosso": "Serena", "cognome_rosso": "Fiordelmondo", "societa_blu": "ASD TAEKWONDO TERLANO", "societa_rosso": "ASD TAEKWONDO CLUB ANCONA" }, { "id": "789", "prefisso_quadrato": "7", "id_incontro_corrente": "17906", "id_giornata": "148", "round": "R2", "time": "01:30.000", "punti_chong": "2", "punti_hong": "2", "amm_chong": "0", "amm_hong": "0", "nome_blu": "Alessio", "cognome_blu": "Gentile", "nome_rosso": "Yago", "cognome_rosso": "Campanella Alvarez", "societa_blu": "TAEKWONDO MEDICINA", "societa_rosso": "ASD SPORT VILLAGE TAEKWONDO" }, { "id": "790", "prefisso_quadrato": "8", "id_incontro_corrente": "17941", "id_giornata": "148", "round": "R1", "time": "01:30.000", "punti_chong": "0", "punti_hong": "0", "amm_chong": "0", "amm_hong": "0", "nome_blu": "Luca", "cognome_blu": "Lucerna", "nome_rosso": "Andrea", "cognome_rosso": "Fossa", "societa_blu": "A.S.D. TAEKWONDO SMILE", "societa_rosso": "SCUOLA TAEKWONDO GENOVA ASD" }, { "id": "791", "prefisso_quadrato": "9", "id_incontro_corrente": "17977", "id_giornata": "148", "round": "R0", "time": "01:30.000", "punti_chong": "0", "punti_hong": "0", "amm_chong": "0", "amm_hong": "0", "nome_blu": "Luca", "cognome_blu": "Pierdicca", "nome_rosso": "Moreno", "cognome_rosso": "Monticelli", "societa_blu": "ASD TAEKWONDO OLYMPIC ANCONA", "societa_rosso": "ASD SPORT VILLAGE TAEKWONDO" }, { "id": "792", "prefisso_quadrato": "10", "id_incontro_corrente": "18004", "id_giornata": "148", "round": "R1", "time": "01:30.000", "punti_chong": "0", "punti_hong": "0", "amm_chong": "0", "amm_hong": "0", "nome_blu": "Nora", "cognome_blu": "Adami", "nome_rosso": "Ghirardi", "cognome_rosso": "Giulia", "societa_blu": "ASD TAEKWONDO TERLANO", "societa_rosso": "ASD REAL TKD MILANO" }];
        this.livedate = "";
        this.loading = false;
        this.timeractive = false;
    }
    TkdtlivePage.prototype.getTkdtClass = function (l) {
        var retvalue = "";
        //if (1==1) return retvalue;
        var word = "rozzano";
        if (!(l.societa_blu && l.societa_rosso))
            return retvalue;
        if (l.societa_blu.toLowerCase().indexOf(word) > -1)
            retvalue = "hasrozzano";
        if (l.societa_rosso.toLowerCase().indexOf(word) > -1)
            retvalue = "hasrozzano";
        return retvalue;
    };
    TkdtlivePage.prototype.doRefresh = function () {
        this.refresh();
    };
    TkdtlivePage.prototype.ionViewWillEnter = function () {
        var questo = this;
        this.events.subscribe("hwbackbutton", function (data) {
            console.log("hwbackbutton in gare.ts");
            questo.navCtrl.pop();
        });
    };
    TkdtlivePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad TdktlivePage');
        var questo = this;
        /*questo.timeout=setInterval(function () {
          questo.refresh();
        }, 5000);*/
        questo.refresh();
    };
    TkdtlivePage.prototype.getTkdtCategoria = function (l) {
        var nome = l.nome_blu;
        var cognome = l.cognome_blu;
        if (!(nome && cognome))
            return;
        console.log("nome", nome, "cognome", cognome);
        var questo = this;
        var atl = {
            nome: nome,
            cognome: cognome
        };
        var a = questo.backend.getTkdtAtleta(atl);
        console.log("atl", a);
        var str = a.sesso + " " + a.cateta + " - " + a.catcintura + " " + a.catpeso + " kg";
        return a;
    };
    TkdtlivePage.prototype.getTkdtCategoriaAsString = function (l) {
        var nome = l.nome_blu;
        var cognome = l.cognome_blu;
        if (!(nome && cognome))
            return "";
        console.log("nome", nome, "cognome", cognome);
        var questo = this;
        var atl = {
            nome: nome,
            cognome: cognome
        };
        var a = questo.backend.getTkdtAtleta(atl);
        console.log("atl", a);
        var str = a.sesso + " " + a.cateta + " - " + a.catcintura + " " + a.catpeso + " kg";
        return str;
    };
    TkdtlivePage.prototype.ionViewWillLeave = function () {
        var questo = this;
        clearInterval(questo.timeout);
        questo.events.unsubscribe("hwbackbutton");
    };
    TkdtlivePage.prototype.viewTabulato = function (l) {
        var questo = this;
        console.log("l", l);
        var cat = questo.getTkdtCategoria(l);
        if (!cat)
            return;
        console.log("cat", cat);
        var tab = questo.backend.getTkdtTabulatiCategoria(cat.cateta, cat.catcintura, cat.catpeso, cat.sesso);
        alert("tabulato " + JSON.stringify(tab));
        window.open(tab.oldhref, "_system");
    };
    TkdtlivePage.prototype.refresh = function () {
        var questo = this;
        questo.loading = true;
        var gid = questo.navParams.get("giornoid");
        var did = questo.navParams.get("data");
        questo.livedate = did;
        console.log("getting tkdtlive for giornoid", gid);
        questo.backend.getTkdtLive(gid, function (data) {
            questo.live = data;
            console.log("questo.live", questo.live);
            questo.lastupdate = new Date();
            questo.loading = false;
            //console.log("questo.live", JSON.stringify(questo.live));
        });
    };
    TkdtlivePage.prototype.getMDate = function (d) {
        return __WEBPACK_IMPORTED_MODULE_3_moment__(d).format("DD/MM/YYYY HH:mm:ss");
    };
    TkdtlivePage.prototype.toggleTimer = function () {
        var questo = this;
        questo.timeractive = !questo.timeractive;
        if (questo.timeractive) {
            clearInterval(questo.timeout);
            questo.timeout = setInterval(function () {
                questo.refresh();
            }, 5000);
        }
        else {
            clearInterval(questo.timeout);
        }
    };
    return TkdtlivePage;
}());
TkdtlivePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-tkdtlive',template:/*ion-inline-start:"/Users/demetriomortelliti/Desktop/demy/PROJECTS/appkwondo/clients/ion2kwondo/src/pages/tkdtlive/tkdtlive.html"*/'<!--\n  Generated template for the TdktlivePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Tkdt Live {{livedate}}</ion-title>\n    <ion-buttons end>\n        <button ion-button clear (tap)="toggleTimer()"><ion-icon *ngIf="!timeractive" name="time" ></ion-icon><ion-icon *ngIf="timeractive" name="timer" ></ion-icon></button>\n        <button ion-button clear (tap)="doRefresh()"><ion-icon name="refresh"></ion-icon></button>\n      </ion-buttons>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content spadding>\n\n  <ion-list >\n    <ion-item *ngFor="let l of live" (tap)="viewTabulato(l)" [ngClass]="getTkdtClass(l)">\n    <!--<div class="nmatch">{{l.prefisso_quadrato}}</div>-->\n    <ion-row class="nmatch">\n      <ion-col>Quadrato: {{l.prefisso_quadrato}}</ion-col>\n      <ion-col col-5>\n          <div class="tempo">{{l.round}} {{l.time}}</div>\n      </ion-col>\n    </ion-row>\n    <ion-row class="chong">\n        <ion-col col-2>\n            <b>{{l.punti_chong}}</b>\n        </ion-col>\n      <ion-col col-8>\n          {{l.nome_blu}} {{l.cognome_blu}}<br><div class="societa">{{l.societa_blu}}</div>\n      </ion-col>\n      <ion-col col-2>\n          <div class="societa">{{l.amm_chong}}</div>\n      </ion-col>\n\n     \n     \n    </ion-row>\n    <ion-row class="hong">\n        <ion-col col-2>\n            <b>{{l.punti_hong}}</b>\n        </ion-col>\n        <ion-col col-8>\n            {{l.nome_rosso}} {{l.cognome_rosso}}<br><div class="societa">{{l.societa_rosso}}</div>\n        </ion-col>\n        <ion-col col-2>\n            <div class="societa">{{l.amm_hong}}</div>\n        </ion-col>\n        \n       \n      </ion-row>\n      <br>\n      <ion-row class="categ">\n        <ion-col >\n          {{getTkdtCategoriaAsString(l)}}\n        </ion-col>\n      </ion-row>\n   \n    \n  </ion-item>\n  </ion-list>\n\n</ion-content>\n<ion-footer>\n  <ion-row class="lastupdate">\n    <ion-col col-2>\n        <div *ngIf="loading" style="width: 100%; text-align: center; background: transparent;">\n            <ion-spinner name="dots" color="secondary"></ion-spinner>\n          </div>\n    </ion-col>\n    <ion-col>\n        <div >Aggiornamento: {{getMDate(lastupdate)}}</div>\n    </ion-col>\n  </ion-row>\n \n</ion-footer>\n'/*ion-inline-end:"/Users/demetriomortelliti/Desktop/demy/PROJECTS/appkwondo/clients/ion2kwondo/src/pages/tkdtlive/tkdtlive.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */], __WEBPACK_IMPORTED_MODULE_2__providers_backend_backend__["a" /* BackendProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */]])
], TkdtlivePage);

//# sourceMappingURL=tkdtlive.js.map

/***/ }),

/***/ 533:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MedagliereglobalePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_backend_backend__ = __webpack_require__(6);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the MedagliereglobalePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var MedagliereglobalePage = (function () {
    function MedagliereglobalePage(events, backend, viewCtrl, navCtrl, navParams) {
        this.events = events;
        this.backend = backend;
        this.viewCtrl = viewCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.html = "";
        this.gara = {};
        this.jgara = {};
        this.loading = false;
        this.toggles = {
            medagliereglobale: true,
            giornigara: false,
            societa: false
        };
        this.activetab = "medagliereglobale";
        this.activegiorno = 0;
        this.activegiornata = {};
        this.viewatletisocieta = false;
        this.viewsocieta = false;
        this.viewsocietaiscritte = false;
        this.viewmedagliere = false;
        this.viewmedagliereglobale = false;
        this.viewtabulati = false;
        this.activesocieta = "";
        this.medaglieregiornata = [];
        this.jgaratemplate = {
            atleti: [],
            atleti_iscritti: [],
            giorni: [],
            tabulati: []
        };
        this.hasGiornate = false;
        this.societaiscritte = [];
        //this.html=navParams.get('html');
        this.gara = navParams.get("gara");
    }
    MedagliereglobalePage.prototype.ionViewDidLoad = function () {
        var questo = this;
        console.log('ionViewDidLoad MedagliereglobalePage');
        questo.refresh();
    };
    MedagliereglobalePage.prototype.refresh = function () {
        var questo = this;
        questo.jgara = this.navParams.get("gara");
        console.log("JGARA", questo.jgara);
        if (questo.jgara.hasOwnProperty("tkdt")) {
            if (questo.jgara.tkdt.hasOwnProperty("giorni")) {
                if (questo.jgara.tkdt.giorni.length > 0) {
                    questo.jgara.tkdt.giorni.forEach(function (item, idx) {
                        var gid = item.id;
                        questo.getMedagliereGiornata(gid, function (gdata) {
                            console.log("got medagliere for giornata", gid);
                            questo.medaglieregiornata.push(gdata);
                        });
                    });
                }
            }
        }
        questo.getMedagliereGlobale(function (data) {
            console.log("got medagliere globale");
            if (questo.jgara.hasOwnProperty("tkdt")) {
                if (questo.jgara.tkdt.hasOwnProperty("giorni")) {
                    if (questo.jgara.tkdt.giorni.length > 0) {
                        questo.activegiornata = questo.jgara.tkdt.giorni[0];
                        questo.hasGiornate = true;
                    }
                }
            }
            else {
                questo.jgara.tkdt = Object.assign({}, questo.jgaratemplate);
                questo.activegiornata = {};
                questo.hasGiornate = false;
            }
        });
        questo.getSocieta();
        questo.societaiscritte = questo.getSocietaIscritte();
    };
    MedagliereglobalePage.prototype.close = function () {
        this.backend.playFeedback();
        this.viewCtrl.dismiss();
    };
    MedagliereglobalePage.prototype.getMedagliereGiornata = function (giornataid, callback) {
        var questo = this;
        var url = questo.backend.rooturl + "/tkdt/medagliere/" + giornataid;
        console.log("getting medagliere for giornataid", giornataid);
        questo.backend.fetchText(url, function (data) {
            if (callback)
                callback(data);
        });
    };
    MedagliereglobalePage.prototype.getMedagliereGlobale = function (callback) {
        var questo = this;
        var tkdt_rooturl = "https://www.tkdtechnology.it/index.php/welcome/";
        var tkdt_garaid = questo.jgara.tkdt_id;
        var giornataid;
        if (!giornataid) {
            if (questo.jgara.hasOwnProperty("tkdt")) {
                if (questo.jgara.tkdt.hasOwnProperty("giorni")) {
                    if (questo.jgara.tkdt.giorni.length > 0) {
                        giornataid = questo.jgara.tkdt.giorni[0].id;
                        console.log("using giornataid from tkdt structure", giornataid);
                    }
                }
            }
        }
        else {
            console.log("giornataid not found !!");
        }
        //var url = questo.backend.rooturl + "/tkdt/medagliereglobale/" + giornataid;
        var url = questo.backend.rooturl + "/tkdt/medaglierenew/" + tkdt_garaid;
        //var caricamentotext = imgtext + "Caricamento in corso...."
        questo.loading = true;
        questo.backend.fetchText(url, function (data) {
            questo.loading = false;
            //console.log("got medagliere globale", data);
            var pos = data.indexOf("<table class=");
            //var pos = data.indexOf('<div class="col-lg-8"');
            questo.html = data.slice(pos);
            //questo.html=data;
            setTimeout(function () {
                questo.domize();
                if (callback)
                    callback(data);
                /*
                let clarr: any = document.getElementsByClassName("link_w_tooltip_gold");
                questo.transform(clarr);
                clarr = document.getElementsByClassName("link_w_tooltip_silver");
                questo.transform(clarr);
                clarr = document.getElementsByClassName("link_w_tooltip_bronze");
                questo.transform(clarr);
                let table: any = document.getElementsByClassName("table-striped")[0];
                table.border = "1";
                table.width = "100%";
                */
                //console.log("clarr",clarr,clarr.length);
            }, 1000);
            /*let profileModal = questo.modalCtrl.create(MedagliereglobalePage, { html: data });
            profileModal.present();*/
        });
    };
    MedagliereglobalePage.prototype.replaceAll = function (input, search, replacement) {
        var target = input;
        return target.replace(new RegExp(search, 'g'), replacement);
    };
    MedagliereglobalePage.prototype.transform = function (clarr) {
        var questo = this;
        var _loop_1 = function () {
            // clarr[i].text="minchia";
            var atleti = clarr[i].title;
            atleti = questo.replaceAll(atleti, "<b>", "");
            atleti = questo.replaceAll(atleti, "</b>", "");
            var arratleti = atleti.split("<br>");
            arratleti.sort(function (a, b) {
                if (a > b)
                    return 1;
                if (a < b)
                    return -1;
                return 0;
            });
            atleti = arratleti.join("\n");
            // atleti=questo.replaceAll(atleti,"<br>","\n");
            //console.log("atleti", atleti);
            clarr[i].onclick = function () {
                alert(atleti);
            };
        };
        for (var i = 0; i < clarr.length; i++) {
            _loop_1();
        }
    };
    MedagliereglobalePage.prototype.toggle = function (what) {
        console.log("toggle", what);
        this.backend.playFeedback();
        this.toggles[what] = !this.toggles[what];
    };
    MedagliereglobalePage.prototype.getSocieta = function () {
        var tkdt = Object.assign({}, this.jgaratemplate);
        if (this.jgara.hasOwnProperty("tkdt"))
            tkdt = this.jgara.tkdt;
        console.log("tkdt", tkdt);
    };
    MedagliereglobalePage.prototype.getIndex = function (n) {
        var retvalue = parseInt(n, 10);
        return retvalue;
    };
    MedagliereglobalePage.prototype.giornoChanged = function (ev) {
        var questo = this;
        var n = parseInt(ev.value, 10);
        console.log("giornochanged", n);
        if (n != -1) {
            this.activegiornata = this.jgara.tkdt.giorni[n];
            this.activegiorno = n;
            console.log("activegiornata", this.activegiornata);
            /*questo.getMedagliereGiornata(questo.activegiornata.id,function(data){
              console.log("got medaglieregiornata",data);
            })*/
        }
        //console.log("activegiornata",this.activegiornata);
    };
    MedagliereglobalePage.prototype.toggleSocieta = function () {
        var questo = this;
        questo.backend.playFeedback();
        console.log("togglesocieta");
        questo.viewsocieta = !questo.viewsocieta;
    };
    MedagliereglobalePage.prototype.toggleSocietaIscritte = function () {
        var questo = this;
        questo.backend.playFeedback();
        console.log("togglesocieta");
        questo.viewsocietaiscritte = !questo.viewsocietaiscritte;
    };
    MedagliereglobalePage.prototype.viewTabulato = function (hr) {
        var newhr = hr.replace("vedi", "show");
        window.open(newhr, "_system");
    };
    MedagliereglobalePage.prototype.toggleMedagliere = function (activegiornata) {
        var questo = this;
        questo.backend.playFeedback();
        console.log("togglemedagliere");
        questo.viewmedagliere = !questo.viewmedagliere;
        if (questo.viewmedagliere) {
            console.log("activegiornata", activegiornata);
        }
    };
    MedagliereglobalePage.prototype.toggleMedagliereGlobale = function () {
        var questo = this;
        questo.backend.playFeedback();
        console.log("togglemedagliereglobale");
        questo.viewmedagliereglobale = !questo.viewmedagliereglobale;
        if (questo.viewmedagliereglobale)
            questo.domize();
    };
    MedagliereglobalePage.prototype.toggleTabulati = function () {
        var questo = this;
        questo.backend.playFeedback();
        console.log("toggletabulati");
        questo.viewtabulati = !questo.viewtabulati;
    };
    MedagliereglobalePage.prototype.toggleAtletiSocieta = function (p) {
        console.log("toggleatletisocieta", p);
        var questo = this;
        questo.backend.playFeedback();
        questo.viewatletisocieta = !questo.viewatletisocieta;
        questo.activesocieta = p.societaname;
        console.log(questo.activesocieta);
    };
    MedagliereglobalePage.prototype.sorted = function (a, campo) {
        a.sort(function (a, b) {
            var a1 = a[campo];
            var b1 = b[campo];
            if (a1 > b1)
                return 1;
            if (a1 < b1)
                return -1;
            return 0;
        });
        console.log("sorted", a);
        return a;
    };
    MedagliereglobalePage.prototype.getCategorieCoperte = function (societa) {
        var questo = this;
        if (!societa)
            societa = "A.S.D. TAEKWONDO ROZZANO";
        var result = {
            cats: [],
            text: "Dati ufficiali categorie non disponibili"
        };
        if (questo.jgara.tkdt)
            return result;
        if (questo.jgara) {
            var garadoc = questo.jgara;
            var tkdtiscritti = garadoc.tkdt.atleti;
            if (tkdtiscritti.length == 0)
                tkdtiscritti = garadoc.tkdt.atleti_iscritti;
            var roz_1 = questo.backend.filterArray(tkdtiscritti, {
                societa: societa
            }, true);
            //console.log($roz);
            //sort by categoria
            roz_1.sort(function (a, b) {
                var a1 = a.catcintura + a.cateta + a.catpeso + a.sesso;
                var b1 = b.catcintura + b.cateta + b.catpeso + b.sesso;
                if (a1 > b1)
                    return 1;
                if (a1 < b1)
                    return -1;
                return 0;
            });
            //scan categorie
            var cat = "";
            var catcount = 0;
            var res = [];
            roz_1.forEach(function (item, i) {
                var atl = roz_1[i];
                var cateta = atl.cateta;
                var catpeso = atl.catpeso;
                var catcintura = atl.catcintura;
                var sesso = atl.sesso;
                var catx = catcintura + cateta + catpeso + sesso;
                if (catx != cat) {
                    //count = 0;
                    var newcat = {
                        cateta: cateta,
                        catpeso: catpeso,
                        catcintura: catcintura,
                        sesso: sesso,
                        atleti: []
                    };
                    res.push(newcat);
                    catcount++;
                    cat = catx;
                }
                var lastres = res[res.length - 1];
                lastres.atleti.push(atl);
                //count++;
            });
            //console.log(res);
            var text = res.length + " categorie coperte con  " + roz_1.length + " atleti";
            console.log(text);
            res.forEach(function (ritem, ri) {
                var r = res[ri];
                //console.log(r.sesso+" - "+r.cateta+" - "+r.catcintura+" - "+r.catpeso+": "+r.atleti.length+" atleti");
            });
            result.cats = res;
            result.text = text;
        }
        return result;
    };
    MedagliereglobalePage.prototype.domize = function () {
        var questo = this;
        setTimeout(function () {
            var clarr = document.getElementsByClassName("link_w_tooltip_gold");
            questo.transform(clarr);
            clarr = document.getElementsByClassName("link_w_tooltip_silver");
            questo.transform(clarr);
            clarr = document.getElementsByClassName("link_w_tooltip_bronze");
            questo.transform(clarr);
            var table = document.getElementsByClassName("table-striped")[0];
            console.log("table", table);
            if (table) {
                table.border = "1";
                table.width = "100%";
            }
        }, 300);
    };
    MedagliereglobalePage.prototype.tabChanged = function (ev) {
        var questo = this;
        questo.backend.playFeedback();
        console.log("tabchanged", ev.value);
        if (ev.value == "medagliereglobale") {
            if (questo.hasGiornate)
                questo.domize();
        }
    };
    MedagliereglobalePage.prototype.getSocietaIscritte = function () {
        var questo = this;
        var tiscr = questo.jgara.tkdt.atleti_iscritti;
        var socs = [];
        var socindex = -1;
        tiscr.sort(function (a, b) {
            var a1 = questo.replaceAll(a.societa, ".", "").toLowerCase();
            var b1 = questo.replaceAll(b.societa, ".", "").toLowerCase();
            if (a1 > b1)
                return 1;
            if (a1 < b1)
                return -1;
            return 0;
        });
        var soc = "";
        for (var i = 0; i < tiscr.length; i++) {
            var iscr = tiscr[i];
            var cat = iscr.sesso + " " + iscr.cateta + " " + iscr.catcintura + " " + iscr.catpeso;
            //console.log(iscr);
            var style = "color: black;";
            if (iscr.societa == "A.S.D. TAEKWONDO ROZZANO")
                style = "color: blue; font-weight: bold;";
            if (iscr.societa != soc) {
                soc = iscr.societa;
                var iscrsoc = questo.backend.filterArray(tiscr, {
                    societa: soc
                }, true);
                var liscrsoc = iscrsoc.length;
                iscrsoc.sort(function (a, b) {
                    var a1 = a.nome.toLowerCase();
                    var b1 = b.nome.toLowerCase();
                    if (a1 > b1)
                        return 1;
                    if (a1 < b1)
                        return -1;
                    return 0;
                });
                //var soc2=questo.replaceAll(soc.toLowerCase(),"a.s.d.","ASD");
                var newsoc = {
                    societa: soc,
                    atleti: iscrsoc
                };
                socs.push(newsoc);
                //console.log("iscrsoc",iscrsoc);
                /*for (var j = 0; j < iscrsoc.length; j++) {
          
                  var siscr = iscrsoc[j];
          
                  var scat = siscr.sesso + " " + siscr.cateta + " " + siscr.catcintura + " " + siscr.catpeso;
          
                }*/
            }
        }
        console.log(socs);
        return socs;
    };
    MedagliereglobalePage.prototype.ionViewWillEnter = function () {
        var questo = this;
        this.events.subscribe("hwbackbutton", function (data) {
            console.log("hwbackbutton in gare.ts");
            //questo.navCtrl.pop();
            questo.viewCtrl.dismiss();
        });
    };
    MedagliereglobalePage.prototype.ionViewWillLeave = function () {
        this.events.unsubscribe("hwbackbutton");
    };
    MedagliereglobalePage.prototype.getCatCoperte = function (s) {
        var cc = this.backend.getCategorieCoperte(s);
        console.log(cc);
        alert(cc.text);
    };
    MedagliereglobalePage.prototype.getSenzaPunti = function (s) {
        var questo = this;
        console.log(s);
        var s2 = s.toUpperCase().replace("A.S.D.", "ASD");
        return s2;
    };
    MedagliereglobalePage.prototype.openMedagliereGlobaleInBrowser = function () {
        var questo = this;
        var url = "https://www.tkdtechnology.it/index.php/welcome/medagliere?id=" + questo.gara.tkdt_id;
        window.open(url);
    };
    return MedagliereglobalePage;
}());
MedagliereglobalePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-medagliereglobale',template:/*ion-inline-start:"/Users/demetriomortelliti/Desktop/demy/PROJECTS/appkwondo/clients/ion2kwondo/src/pages/medagliereglobale/medagliereglobale.html"*/'<!--\n  Generated template for the MedagliereglobalePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-buttons start>\n        <button ion-button (tap)="refresh()"><ion-icon name="refresh"></ion-icon></button>\n      <button ion-button (tap)="close()">Annulla</button>\n    </ion-buttons>\n\n    <ion-title>Medagliere Globale</ion-title>\n  </ion-navbar>\n  <ion-segment [(ngModel)]="activetab" (ionChange)="tabChanged($event)">\n\n\n    <ion-segment-button value="medagliereglobale">\n      <!--<ion-icon name="camera"></ion-icon>-->Globale\n    </ion-segment-button>\n    <ion-segment-button value="giornate">\n      <!--<ion-icon name="bookmark"></ion-icon>-->Giornate\n    </ion-segment-button>\n\n\n\n  </ion-segment>\n\n</ion-header>\n\n\n<ion-content padding>\n  <div *ngIf="loading" style="text-align: center; width: 100%">\n    <ion-spinner center name="dots"></ion-spinner>\n  </div>\n\n\n\n  <section *ngIf="activetab==\'medagliereglobale\'" id="medagliereglobale">\n    <button ion-button small clear (tap)="openMedagliereGlobaleInBrowser()">Apri medagliere nel browser</button>\n\n    <button ion-button block (tap)="toggleMedagliereGlobale()">Medagliere globale</button>\n    <div *ngIf="viewmedagliereglobale">\n      <div class="info" *ngIf="!loading">\n        <i>Clicca sui numeri per vedere i medagliati</i>\n      </div>\n      <div class="mg" [innerHTML]="html"></div>\n    </div>\n\n    <button ion-button block (tap)="toggleSocietaIscritte()">Società iscritte</button>\n    <div *ngIf="viewsocietaiscritte">\n      <ion-item *ngFor="let s of societaiscritte; let p=index;" (tap)="getCatCoperte(s.societa)">\n        <span style="word-wrap: break-word; white-space: normal;">{{getSenzaPunti(s.societa)}} ({{s.atleti.length}})</span><br>\n       \n\n      </ion-item>\n    </div>\n  </section>\n\n\n  <section *ngIf="activetab==\'giornate\'" id="giornate">\n\n\n\n    <ion-segment [(ngModel)]="activegiorno" color="primary" (ionChange)="giornoChanged($event)" *ngIf="jgara.hasOwnProperty(\'tkdt\')">\n\n      <ion-segment-button *ngFor="let g of jgara.tkdt.giorni; let i=index;" [value]="i">\n        {{g.titolo}}\n      </ion-segment-button>\n\n    </ion-segment>\n\n    <button ion-button block (tap)="toggleSocieta()">Società</button>\n    <div *ngIf="activegiornata.hasOwnProperty(\'elenco_societa\') && viewsocieta">\n      <ion-item *ngFor="let s of activegiornata.elenco_societa.rows; let p=index;" (tap)="toggleAtletiSocieta(s)">\n        <span style="word-wrap: break-word; white-space: normal;">{{s.societaname}} ({{s.atleti.length}})</span>\n        <div style="margin-top: 7px; border: 1px solid silver" *ngIf="viewatletisocieta && (activesocieta==s.societaname)">\n          <ion-item *ngFor="let a of sorted(s.atleti,\'nome\')">\n            <span style="font-size: 14px;">{{a.nome}}</span>\n            <br>\n            <span style="font-size: 12px; color: gray;">{{a.sesso}} {{a.catpeso}} {{a.catcintura}}</span>\n          </ion-item>\n        </div>\n      </ion-item>\n    </div>\n\n    <button ion-button block (tap)="toggleMedagliere(activegiornata)">Medagliere</button>\n    <div *ngIf="viewmedagliere" [innerHTML]="medaglieregiornata[activegiorno]">\n\n      <!--<div *ngIf="activegiornata.hasOwnProperty(\'elenco_societa\')">\n        <ion-item *ngFor="let s of activegiornata.elenco_societa.rows; let p=index;" (tap)="toggleAtletiSocieta(s)" >\n          <span style="word-wrap: break-word; white-space: normal;">{{s.societaname}} ({{s.atleti.length}})</span>\n          <div style="margin-top: 7px; border: 1px solid silver" *ngIf="viewatletisocieta && (activesocieta==s.societaname)">\n           <ion-item *ngFor="let a of sorted(s.atleti,\'nome\')">\n              <span style="font-size: 14px;">{{a.nome}}</span><br>\n              <span style="font-size: 12px; color: gray;">{{a.sesso}} {{a.catpeso}} {{a.catcintura}}</span> \n            </ion-item>\n           \n          </div>\n        </ion-item>\n      </div>-->\n    </div>\n\n    <button ion-button block (tap)="toggleTabulati()">Tabulati</button>\n    <div *ngIf="viewtabulati">\n      <div *ngIf="activegiornata.hasOwnProperty(\'tabulati\')">\n        <ion-item *ngFor="let s of activegiornata.tabulati.rows; let p=index;">\n          <button ion-button (tap)="viewTabulato(s.oldhref)">Vedi</button><span style="word-wrap: break-word; white-space: normal; padding: 2px; font-size: 13px;">{{s.categoria_eta}} {{s.categoria_peso}} {{s.cintura_da}} {{s.cintura_a}}</span>\n          <!--<div style="margin-top: 7px; border: 1px solid silver" *ngIf="viewatletisocieta && (activesocieta==s.societaname)">\n            <ion-item *ngFor="let a of sorted(s.atleti,\'nome\')">\n              <span style="font-size: 14px;">{{a.nome}}</span>\n              <br>\n              <span style="font-size: 12px; color: gray;">{{a.sesso}} {{a.catpeso}} {{a.catcintura}}</span>\n            </ion-item>\n          </div>-->\n        </ion-item>\n      </div>\n    </div>\n\n\n\n\n\n  </section>\n\n  <section *ngIf="activetab==\'societa\'" id="societa">\n    Societa\n  </section>\n\n\n\n</ion-content>'/*ion-inline-end:"/Users/demetriomortelliti/Desktop/demy/PROJECTS/appkwondo/clients/ion2kwondo/src/pages/medagliereglobale/medagliereglobale.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */], __WEBPACK_IMPORTED_MODULE_2__providers_backend_backend__["a" /* BackendProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["u" /* ViewController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */]])
], MedagliereglobalePage);

//# sourceMappingURL=medagliereglobale.js.map

/***/ }),

/***/ 551:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EditgaraPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_backend_backend__ = __webpack_require__(6);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the AtletaPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var EditgaraPage = (function () {
    function EditgaraPage(loadingCtrl, alertCtrl, viewCtrl, toastCtrl, events, backend, navCtrl, navParams) {
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.viewCtrl = viewCtrl;
        this.toastCtrl = toastCtrl;
        this.events = events;
        this.backend = backend;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.gara = {
            title: "",
            ngiorni: 1,
            iscritti: "",
            tabulatourl: "",
            links: []
        };
        this.mode = "view";
        this.tkdtjsonview = false;
        this.loadingtkdt = false;
        this.tkdtSave = false;
        this.iscrittiarr = [];
        this.iscrittitemp = "";
    }
    EditgaraPage.prototype.ionViewDidLoad = function () {
        var questo = this;
        var g = this.navParams.get("gara");
        console.log('ionViewDidLoad EditgaraPage', g);
        questo.gara = g;
        if (!questo.gara.hasOwnProperty("formula"))
            questo.gara.formula = "eliminazione";
        questo.iscrittiarr = questo.backend.atleti;
        if (!questo.gara.hasOwnProperty("ngiorni"))
            questo.gara.ngiorni = 1;
        // this.gara.datafull=moment(this.gara.data.trim(),"DD/MM/YYYY",true);
        // console.log("datafull",this.gara.datafull);
        if (questo.gara.hasOwnProperty("tkdt_id")) {
            if (questo.gara.tkdt_id.trim() != "") {
                var tkdtid = questo.gara.tkdt_id;
                console.log("this gara has a tkdt_id", tkdtid);
                var url = questo.backend.rooturl + "/tkdt/getfromfile/" + tkdtid + "?societaid=" + questo.backend.user.societaid;
                questo.backend.fetchData(url, function (data) {
                    console.log("dati ufficiali di gara " + tkdtid, data);
                    questo.tkdtgara = data;
                });
            }
        }
        if (!questo.gara.hasOwnProperty("tabulatourl"))
            questo.gara.tabulatourl = "";
        questo.iscrittitemp = questo.gara.iscritti;
        console.log("iscrittitemp", questo.iscrittitemp);
        /*
            $.ajax({
              url: rooturl + "/tkdt/getfromfile/" + gara.doc.tkdt_id + "?societaid=" + settings.mysocieta,
              dataType: "json",
              type: "GET"
            })
            .done(function (data) {
              */
    };
    EditgaraPage.prototype.getIscrittiLen = function () {
        //console.log("iscritti",this.gara.iscritti);
        var a = this.gara.iscritti.split(",");
        var retvalue = a.length;
        if (this.gara.iscritti.trim() == "")
            retvalue = 0;
        return retvalue;
    };
    EditgaraPage.prototype.selectIscritti = function () {
        var questo = this;
        console.log("iscrittitemp", questo.iscrittitemp);
        var myAlert = this.alertCtrl.create({
            title: 'Iscritti',
            buttons: [
                {
                    text: 'Seleziona tutti',
                    handler: function (data) {
                        var arr = [];
                        questo.backend.atleti.forEach(function (item, idx) {
                            var id = item.doc.id;
                            arr.push(id);
                        });
                        questo.iscrittitemp = arr.join(",");
                        questo.selectIscritti();
                    }
                },
                {
                    text: 'Deseleziona tutti',
                    handler: function (data) {
                        questo.iscrittitemp = "";
                        questo.selectIscritti();
                    }
                },
                {
                    text: 'Annulla',
                    role: 'cancel',
                    handler: function (data) {
                        console.log('Cancel clicked');
                        questo.iscrittitemp = questo.gara.iscritti;
                    }
                },
                {
                    text: 'OK',
                    handler: function (data) {
                        console.log("ok", data);
                        questo.gara.iscritti = data.join(",");
                        questo.gara.myiscritti = questo.gara.iscritti;
                    }
                }
            ]
        });
        console.log("selectIscrtti");
        console.log("atleti", questo.backend.atleti);
        console.log("icrittiarr", questo.iscrittiarr);
        questo.backend.atleti.forEach(function (item, idx) {
            var ck = false;
            if (questo.iscrittitemp.split(',').indexOf(item.doc.id) > -1)
                ck = true;
            myAlert.addInput({
                type: 'checkbox',
                label: item.doc.cognome + ' ' + item.doc.nome,
                value: item.doc.id,
                checked: ck
            });
        });
        myAlert.present();
    };
    EditgaraPage.prototype.getTkdtGara = function () {
        var questo = this;
        if (questo.tkdtgara) {
            return JSON.stringify(questo.tkdtgara);
        }
        else
            return "";
    };
    EditgaraPage.prototype.toggleTkdtJson = function () {
        this.tkdtjsonview = !this.tkdtjsonview;
    };
    EditgaraPage.prototype.changeInput = function (name, ev) {
        console.log("changeinput", name, ev);
    };
    EditgaraPage.prototype.getArrLength = function (arr) {
        console.log("arr", arr);
        var questo = this;
        var retvalue = 0;
        if (arr.trim() != "") {
            retvalue = arr.split(",").length;
        }
        return retvalue;
    };
    EditgaraPage.prototype.readTkdtGara = function () {
        var questo = this;
        var tkdtid = questo.gara.tkdt_id;
        console.log("this gara has a tkdt_id", tkdtid);
        var url = questo.backend.rooturl + "/tkdt/getfromfile/" + tkdtid + "?societaid=" + questo.backend.user.societaid;
        questo.backend.fetchData(url, function (data) {
            console.log("dati ufficiali di gara " + tkdtid, data);
            questo.tkdtgara = data;
        });
    };
    EditgaraPage.prototype.retrieveTkdtGara = function (save) {
        var tksave = false;
        if (save) {
            if (String(save) == "true")
                tksave = true;
        }
        var questo = this;
        var tkdtid = questo.gara.tkdt_id;
        console.log("this gara has a tkdt_id", tkdtid);
        var rtext = "";
        if (!tksave)
            rtext = "/nosave";
        var url = questo.backend.rooturl + "/tkdt/retrieve/" + tkdtid + rtext + "?societaid=" + questo.backend.settings.mysocieta;
        questo.loadingtkdt = true;
        questo.backend.fetchData(url, function (data) {
            console.log("retreive " + rtext + " dati ufficiali di gara  " + tkdtid, data);
            questo.tkdtgara = data;
            questo.loadingtkdt = false;
        });
    };
    EditgaraPage.prototype.saveGara = function () {
        var questo = this;
        console.log(questo.gara);
        var isAdded = false;
        if (!questo.gara.hasOwnProperty("id"))
            isAdded = true;
        var txt = "salvata";
        if (isAdded)
            txt = "aggiunta";
        console.log("tkdtSave", questo.tkdtSave);
        var url = questo.backend.rooturl + "/gare/update";
        if (isAdded)
            url = questo.backend.rooturl + "/gare/add";
        var loading = this.loadingCtrl.create({
            spinner: 'dots',
            content: 'Salvataggio gara in corso...'
        });
        loading.onDidDismiss(function () {
            console.log('Dismissed loading');
        });
        loading.present();
        questo.backend.postData(url, questo.gara, function (data) {
            console.log("Gara " + txt + " !", data);
            if (questo.tkdtSave) {
                if (questo.gara.hasOwnProperty("tkdt_id")) {
                    if (questo.gara.tkdt_id.trim() != "") {
                        var turl = questo.backend.rooturl + "/tkdt/retrieve/" + questo.gara.tkdt_id;
                        questo.backend.fetchData(turl, function (tkdata) {
                            console.log("saved tkdt gara " + questo.gara.tkdt_id + " !!");
                            loading.dismiss();
                            questo.showToast("Gara e TKDT " + questo.gara.tkdt_id + " " + txt + " !!");
                            setTimeout(function () {
                                questo.viewCtrl.dismiss("saved");
                            }, 3000);
                        });
                    }
                }
            }
            else {
                loading.dismiss();
                questo.showToast("Gara " + txt + " !!");
                setTimeout(function () {
                    questo.viewCtrl.dismiss("saved");
                }, 3000);
            }
        });
    };
    EditgaraPage.prototype.showToast = function (txt) {
        var toast = this.toastCtrl.create({
            message: txt,
            duration: 3000,
            position: 'top'
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed toast');
        });
        toast.present();
    };
    EditgaraPage.prototype.cancelGara = function () {
        this.viewCtrl.dismiss();
        //this.navCtrl.pop();
    };
    EditgaraPage.prototype.matchTkdtIscritti = function () {
        var questo = this;
        /*
            var cont = $(obj).closest("div[data-role=content]");
            var ta=cont.find("textarea");
            if (ta.length>0){
                var val=ta.val();
                var json=JSON.parse(val);
                console.log(json);
            }
            */
        var foundcount = 0;
        var notfoundcount = 0;
        var totali = 0;
        var iscrittistring = "";
        var notfound = [];
        var json = {
            atleti_iscritti: []
        };
        if (questo.tkdtgara.hasOwnProperty("atleti_iscritti"))
            json = questo.tkdtgara;
        json.atleti_iscritti.forEach(function (item, i) {
            var row = json.atleti_iscritti[i];
            var nome = row.nome.toLowerCase().trim();
            var soc = row.societa;
            if (soc == "A.S.D. TAEKWONDO ROZZANO") {
                totali++;
                var atls = questo.backend.getAtletaByCognoNome(nome);
                //console.log("ricerca "+nome+": "+atls.length);
                if (atls.length > 0) {
                    if (iscrittistring.trim() != "")
                        iscrittistring += ",";
                    iscrittistring += atls[0].id;
                    foundcount++;
                }
                else {
                    console.log("atleta non trovato: ", nome);
                    notfoundcount++;
                    notfound.push(nome);
                }
            }
        });
        console.log("trovati " + foundcount + " su " + totali + " (" + notfoundcount + " non trovati)");
        console.log("new iscritti string", iscrittistring);
        var r = confirm("trovati " + foundcount + " su " + totali + " (" + notfoundcount + " non trovati)\n\nVuoi sostituire il campo iscritti ?");
        if (r == true) {
            //var iscr = $("#page_editgara #iscritti");
            //iscr.val(iscrittistring);
            questo.gara.iscritti = iscrittistring;
        }
        else {
        }
        if (notfound.length > 0) {
            var al = "";
            for (var i = 0; i < notfound.length; i++) {
                //divnf.append("<span>" + notfound[i] + "</span><br>");
                al += notfound[i] + "/n";
            }
            alert(al);
        }
    };
    EditgaraPage.prototype.ionViewWillEnter = function () {
        var questo = this;
        this.events.subscribe("hwbackbutton", function (data) {
            console.log("hwbackbutton in gare.ts");
            questo.viewCtrl.dismiss();
        });
    };
    EditgaraPage.prototype.ionViewWillLeave = function () {
        this.events.unsubscribe("hwbackbutton");
    };
    EditgaraPage.prototype.syncGaraWithTkdt = function (callback) {
        var questo = this;
        if (!questo.gara.hasOwnProperty("tkdt_id")) {
            alert("TKDT_ID non definito per questa gara");
            return;
        }
        //var cont = $(obj).closest("div[data-role=content]");
        //var tid = cont.find("#tkdt_id").val();
        var tid = questo.gara.tkdt_id;
        //var div = cont.find("#tkdt");
        var tipo = "combattimento";
        if (questo.gara.hasOwnProperty("tipo"))
            tipo = questo.gara.tipo;
        //var tipo = cont.find("#tipo");
        var isForme = false;
        if (tipo.toLowerCase() == "forme")
            isForme = true;
        var gara = null;
        if (tid.trim() == "") {
            alert("Nessun tkdt_id, impossibile recuperare i dati ufficiali di gara");
            return;
        }
        if (!isForme) {
            var url = questo.backend.rooturl + "/tkdt/retrieve/" + tid;
            questo.loadingtkdt = true;
            questo.backend.fetchData(url, function (data) {
                console.log(data);
                questo.tkdtgara = data;
                //div.empty();
                questo.loadingtkdt = false;
                //progressStop();
                var toast = this.toastCtrl.create({
                    message: 'Dati ufficiali di gara garicati per gara tkdt_id ' + tid,
                    duration: 3000,
                    position: 'top'
                });
                toast.onDidDismiss(function () {
                    console.log('Dismissed toast');
                });
                toast.present();
                //questo.backend.toast("Dati ufficiali di gara garicati per gara tkdt_id " + tid);
                // console.log("Atleti iscritti: " + data.atleti_iscritti.length);
                // div.append("Atleti effettivi in gara: " + data.atleti.length + "<br>");
                //div.append("Tabulati trovati: " + data.tabulati.length + "<br>");
                //  var tk = data;
                //  editgaratkdt = tk;
                /*
                var tk = {
                    atleti: data.atleti,
                    tabulati: data.tabulati,
                    atleti_iscritti: data.atleti_iscritti
                }*/
                //    div.append('<br><label><input type="checkbox" name="ck_tkdt" id="ck_tkdt">&nbsp;Salva TKDT</label><br>');
                //div.append("<textarea id='tatkdt'>" + JSON.stringify(tk) + "</textarea><br>");
                if (callback)
                    callback(data);
            });
        }
        else {
            //è una gara di forme
            var urlf = questo.backend.rooturl + "/tkdt/retrieveforme/" + tid;
            questo.loadingtkdt = true;
            console.log("Recupero dati ufficiali di gara " + tid + " ....");
            questo.backend.fetchData(urlf, function (data) {
                console.log(data);
                questo.tkdtgara = data;
                //div.empty();
                questo.loadingtkdt = false;
                //progressStop();
                console.log("Dati ufficiali di gara garicati per gara tkdt_id " + tid);
                // div.append("Atleti iscritti: " + data.atleti_iscritti.length + "<br>");
                // div.append("Atleti effettivi in gara: " + data.atleti.length + "<br>");
                // var tk = data;
                // editgaratkdt = tk;
                /*
        div.append("Tabulati trovati: " + data.tabulati.length + "<br>");
         
        
        var tk=data;
        editgaratkdt=tk;
         
        
        div.append('<br><label><input type="checkbox" name="ck_tkdt" id="ck_tkdt">&nbsp;Salva TKDT</label><br>');
         
        */
                if (callback)
                    callback(data);
            });
        }
    };
    EditgaraPage.prototype.addLink = function () {
        var questo = this;
        if (!questo.gara.hasOwnProperty("links")) {
            questo.gara.links = [];
        }
        var newlink = {
            title: "",
            url: ""
        };
        questo.gara.links.push(newlink);
    };
    EditgaraPage.prototype.deleteLink = function (i) {
        var questo = this;
        var alert = questo.alertCtrl.create({
            title: 'Cancellazione link',
            message: 'Vuoi davvero cancellare questo link ?',
            buttons: [
                {
                    text: 'Annulla',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Si, cancella',
                    handler: function () {
                        console.log('Buy clicked');
                        questo.gara.links.splice(i, 1);
                    }
                }
            ]
        });
        alert.present();
    };
    EditgaraPage.prototype.getLinksCount = function () {
        var questo = this;
        var retvalue = 0;
        if (questo.gara.hasOwnProperty("links")) {
            if (questo.gara.links.length > 0)
                retvalue = questo.gara.links.length;
        }
        return retvalue;
    };
    return EditgaraPage;
}());
EditgaraPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-editgara',template:/*ion-inline-start:"/Users/demetriomortelliti/Desktop/demy/PROJECTS/appkwondo/clients/ion2kwondo/src/pages/editgara/editgara.html"*/'<!--\n  Generated template for the AtletaPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title style="font-size: 11px">{{gara.title}}</ion-title>\n    <ion-buttons end>\n        <button ion-button clear (tap)="cancelGara()">Annulla</button>\n        <button ion-button clear color="danger" (tap)="saveGara()">SALVA</button>\n      </ion-buttons>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n    <ion-item>\n        <ion-label >ID: {{gara.id}}</ion-label>\n  \n  \n    </ion-item>\n    <ion-item>\n        <ion-label floating>TKDT_ID: </ion-label>\n        <ion-input [(ngModel)]="gara.tkdt_id"></ion-input>\n  \n    </ion-item>\n  <ion-item>\n      <ion-label floating>Title</ion-label>\n      <ion-input [(ngModel)]="gara.title"></ion-input>\n\n  </ion-item>\n  <ion-item>\n      <ion-label floating>Location</ion-label>\n      <ion-input [(ngModel)]="gara.location"></ion-input>\n\n  </ion-item>\n  <ion-item>\n      <ion-label floating>Data</ion-label>\n      <ion-input [(ngModel)]="gara.data"></ion-input>\n      <!--<ion-datetime displayFormat="DD/MM/YYYY" [(ngModel)]="gara.datafull"></ion-datetime>-->\n\n  </ion-item>\n  <ion-item>\n    <ion-label>Giorni di gara</ion-label>\n    <ion-select [(ngModel)]="gara.ngiorni">\n      <ion-option value="1">1</ion-option>\n      <ion-option value="2">2</ion-option>\n      <ion-option value="3">3</ion-option>\n      <ion-option value="4">4</ion-option>\n      <ion-option value="5">5</ion-option>\n\n    </ion-select>\n  </ion-item>\n  <ion-item>\n      <ion-label >Stato</ion-label>\n      \n      <ion-select [(ngModel)]="gara.stato">\n          <ion-option value="disputata">DISPUTATA</ion-option>\n          <ion-option value="nondisputata">NONDISPUTATA</ion-option>\n          <ion-option value="incorso">INCORSO</ion-option>\n      </ion-select>\n         \n       \n\n  </ion-item>\n  <ion-item>\n      <ion-label >Tipo</ion-label>\n      <ion-select [(ngModel)]="gara.tipo">\n          <ion-option value="combattimento">Combattimento</ion-option>\n          <ion-option value="forme">Forme</ion-option>\n        </ion-select>\n\n  </ion-item>\n  <ion-item>\n      <ion-label >Formula gara</ion-label>\n      <ion-select [(ngModel)]="gara.formula">\n          <ion-option value="eliminazione">Eliminazione</ion-option>\n          <ion-option value="roundrobin_ar">Round robin A/R</ion-option>\n        </ion-select>\n\n  </ion-item>\n  <ion-item>\n    <ion-label>Regionalità gara</ion-label>\n    <ion-select [(ngModel)]="gara.regionalita">\n      <ion-option value="regionale">Regionale</ion-option>\n      <ion-option value="interregionale">Interregionale</ion-option>\n      <ion-option value="nazionale">Nazionale</ion-option>\n      <ion-option value="internazionale">Internazionale</ion-option>\n      \n\n    </ion-select>\n  </ion-item>\n  <ion-item>\n      <ion-label floating>Map location</ion-label>\n      <ion-input [(ngModel)]="gara.maplocation"></ion-input>\n\n  </ion-item>\n  <ion-item>\n        <ion-label floating>URL Tabulato</ion-label>\n        <ion-input [(ngModel)]="gara.tabulatourl"></ion-input>\n  \n    </ion-item>\n    \n  <!--<ion-item>\n    <ion-label >Iscritti</ion-label>\n    <ion-select multiple [(ngModel)]="iscrittiarr">\n        <ion-option *ngFor="let i of iscrittiarr" value="i">{{i.doc.cognome+\' \'+i.doc.nome}}</ion-option>\n        \n      </ion-select>\n\n</ion-item>-->\n<button ion-button block (tap)="selectIscritti()">Seleziona iscritti ({{getIscrittiLen()}})</button>\n  <ion-item>\n      <ion-label floating>Iscritti </ion-label>\n      <ion-textarea readonly [(ngModel)]="gara.iscritti"></ion-textarea>\n     \n\n  </ion-item> \n \n  <ion-item>\n      <ion-label floating>MyIscritti</ion-label>\n      <ion-input [(ngModel)]="gara.myiscritti"></ion-input>\n\n  </ion-item>\n\n  <!--<ion-item *ngFor="let m of backend.getObjectArray(gara)">\n  \n  <ion-label floating>{{m.name}}</ion-label>\n <input type="text" [value]="m.value"/>\n  \n    </ion-item>-->\n \n\n    <ion-card *ngIf="tkdtgara">\n      <ion-card-header>\n        <ion-row>\n          <ion-col>\n              Dati Tkdt\n            </ion-col>\n          <ion-col col-2><button *ngIf="!loadingtkdt" ion-button clear (tap)="retrieveTkdtGara(false)"><ion-icon name="md-refresh"></ion-icon></button><ion-spinner *ngIf="loadingtkdt" name="ios"></ion-spinner></ion-col></ion-row>\n      </ion-card-header>\n      <ion-card-content>\n        \n          <ion-row>\n              <ion-col col-6 class="label">Atleti iscritti</ion-col>\n              <ion-col >{{tkdtgara.atleti_iscritti.length}}</ion-col>\n          </ion-row>\n        \n\n          <ion-row>\n              <ion-col col-6 class="label">Atleti effettivi</ion-col>\n              <ion-col >{{tkdtgara.atleti.length}}</ion-col>\n          </ion-row>\n        \n\n          <ion-row>\n              <ion-col col-6 class="label">Tabulati</ion-col>\n              <ion-col >{{tkdtgara.tabulati.length}}</ion-col>\n          </ion-row>\n         \n\n          <ion-row>\n              <ion-col col-6 class="label">Giorni</ion-col>\n              <ion-col >{{tkdtgara.giorni.length}}</ion-col>\n          </ion-row>\n        \n\n          <button ion-button block (tap)="toggleTkdtJson()">Visualizza JSON</button>\n\n          <div *ngIf="tkdtjsonview" class="tkdt">{{getTkdtGara()}}</div>\n          <button ion-button block (tap)="matchTkdtIscritti()">Integra iscritti TKDT</button>\n          <ion-item>\n            <ion-label>Salva TKDT</ion-label>\n            <ion-checkbox [(ngModel)]="tkdtSave"></ion-checkbox>\n          </ion-item>\n      </ion-card-content>\n    </ion-card>\n\n\n    <ion-card>\n        <ion-card-header>\n            <ion-row>\n                    <ion-col col-2>\n                            <button ion-button mini clear (tap)="addLink()"><ion-icon name="ios-add-circle-outline"></ion-icon></button>\n                    </ion-col>\n                <ion-col>\n                        Links ({{getLinksCount()}})\n                </ion-col>\n                \n            </ion-row>\n        </ion-card-header>\n        <ion-card-content>\n            <div style="background: #eee; margin-bottom: 4px" *ngFor="let l of gara.links; let i=index">\n                <ion-grid>\n                    <ion-row>\n                        <ion-col col-2><button ion-button mini clear (tap)="deleteLink(i)"><ion-icon name="ios-trash-outline"></ion-icon></button></ion-col>\n                        <ion-col>\n                                <ion-row>\n                                        <ion-col>\n                                                <ion-input placeholder="Titolo" [(ngModel)]="l.title"></ion-input>\n                                        </ion-col>\n                                    </ion-row>\n                                   \n                                    <ion-row>\n                                            <ion-col>\n                                                    <ion-input placeholder="url" [(ngModel)]="l.url"></ion-input>\n                                            </ion-col>\n                                        </ion-row>\n\n                        </ion-col>\n                    </ion-row>\n               \n                </ion-grid>\n              \n            </div>\n        </ion-card-content>\n    </ion-card>\n   \n     \n      \n\n\n</ion-content>\n <!-- <ion-footer>\n    <ion-row class="footerrow">\n      <ion-col col-6><button color="secondary" ion-button full (tap)="saveGara()" >Salva</button></ion-col>\n      <ion-col col-6><button ion-button full (tap)="cancelGara()">Annulla</button></ion-col>\n    </ion-row>\n  </ion-footer>-->\n\n  <ion-fab right bottom>\n   <button ion-fab><ion-icon name="md-create"></ion-icon></button>\n    <ion-fab-list side="left">\n    <button ion-fab><ion-icon name="md-create"></ion-icon></button>\n    <button ion-fab><ion-icon name="md-add"></ion-icon></button>\n    \n  </ion-fab-list>\n </ion-fab>\n'/*ion-inline-end:"/Users/demetriomortelliti/Desktop/demy/PROJECTS/appkwondo/clients/ion2kwondo/src/pages/editgara/editgara.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["u" /* ViewController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["t" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */], __WEBPACK_IMPORTED_MODULE_2__providers_backend_backend__["a" /* BackendProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */]])
], EditgaraPage);

//# sourceMappingURL=editgara.js.map

/***/ }),

/***/ 552:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MatchconsolerrPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_backend_backend__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_socket_service_socket_service__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_chat_chat__ = __webpack_require__(33);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the MatchconsolePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var MatchconsolerrPage = (function () {
    function MatchconsolerrPage(loadingCtrl, socket, events, toastCtrl, alertCtrl, backend, navCtrl, navParams) {
        this.loadingCtrl = loadingCtrl;
        this.socket = socket;
        this.events = events;
        this.toastCtrl = toastCtrl;
        this.alertCtrl = alertCtrl;
        this.backend = backend;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.consoles = [];
        this.selectedMatchId = "";
        this.selectedMatch = {};
        this.selectedConsole = {};
        this.selectedAvversari = {};
        this.selConsoleIndex = -1;
        this.disabledcontrols = false;
        var questo = this;
    }
    MatchconsolerrPage.prototype.ionViewDidLoad = function () {
        this.backend.setBackButtonAction(this.navBar, this.navCtrl);
        this.backend.setupNavbarBack(this.navBar, this.navCtrl);
    };
    MatchconsolerrPage.prototype.ionViewWillLoad = function () {
        var questo = this;
        /*questo.events.subscribe("updategara",function(msg,time){
          console.log("refreshgara in matchconsole.ts !!");
          //questo.disabledcontrols=false;
          //questo.refresh(function(){
            //questo.backend.syncConsoles(questo.gara.matchesbyprog);
            //questo.events.publish("updatematchesforatleta",questo.gara.matchesbyprog);
          //});
        })*/
        var match = this.navParams.get("match");
        var avversari = this.navParams.get("avversari");
        var id = match.id;
        this.selectedMatchId = id;
        this.selectedMatch = match;
        //this.selectedMatch.avversari = avversari;
        this.backend.removeConsolesIfNotRealtime();
        this.backend.addConsoleIfNotExists(this.selectedMatch);
        this.consoles = this.backend.matchconsoles;
        this.consoles.forEach(function (item, idx) {
            if (item.match.id == questo.selectedMatchId) {
                questo.selectedConsole = item;
                if (avversari.length > 0)
                    questo.selectedConsole.avversari = avversari;
                questo.selConsoleIndex = idx;
            }
        });
        //this.selectedMatchId=this.selectedMatch.id;
        if (this.selectedMatch.hasOwnProperty("avversario")) {
            if (this.selectedMatch.avversario.trim() != "")
                this.selectedConsole.avversario = this.selectedMatch.avversario;
        }
        console.log('ionViewDidLoad MatchconsolePage, selectedconsole', questo.selectedConsole);
    };
    MatchconsolerrPage.prototype.tapSegment = function (c, i) {
        this.selectedMatchId = c.match.id;
        this.selectedMatch = c.match;
        this.selectedConsole = c;
        this.selConsoleIndex = i;
        console.log("tapSegment", c);
        this.backend.playFeedback();
    };
    MatchconsolerrPage.prototype.ionViewWillLeave = function () {
        console.log("Looks like I'm about to leave :(");
        //this.events.unsubscribe("updategara");
        this.events.unsubscribe("hwbackbutton");
    };
    MatchconsolerrPage.prototype.ionViewWillEnter = function () {
        var questo = this;
        this.events.subscribe("hwbackbutton", function (data) {
            console.log("hwbackbutton in gare.ts");
            questo.navCtrl.pop();
        });
    };
    MatchconsolerrPage.prototype.isRealTime = function (c) {
        var isrt = false;
        if (c.hasOwnProperty("realtime")) {
            if (String(c.realtime) == "true") {
                isrt = true;
            }
        }
        return isrt;
    };
    MatchconsolerrPage.prototype.toggleTempoReale = function () {
        var questo = this;
        console.log("toggletemporeale", this.selectedConsole);
        if (true)
            return;
        questo.backend.playFeedback();
        //alert(this.selectedConsole.match.matchord);
        var active = true;
        var url = this.backend.rooturl + "/matches/updaterr/" + this.selectedConsole.match.garaid + "/" + this.selectedConsole.match.id;
        var newvalue = "true";
        var newtesto = "attivato";
        if (String(this.selectedConsole.match.realtime) == "true") {
            newvalue = "false";
            newtesto = "disattivato";
            active = false;
        }
        var matchord = "";
        if (questo.selectedConsole.match.hasOwnProperty("matchord")) {
            if (questo.selectedConsole.match.matchord.trim() != "") {
                matchord = questo.selectedConsole.match.matchord;
            }
        }
        console.log("MATCHORD", matchord);
        var action = "realtime_off";
        if (active)
            action = "realtime_on";
        console.log("sending admin_action", action);
        //alert(action);
        var testo = "disattivato";
        if (active)
            testo = "attivato";
        var doc = {
            realtime: active,
            admin_action: action
        };
        if (active) {
            if (matchord.trim() != "") {
                doc.matchord = matchord;
            }
            console.log("selectedconsole", questo.selectedConsole);
            if (questo.selectedConsole.hasOwnProperty("avversario")) {
                //if (questo.selectedConsole.avversario.trim() != "") doc.avversario = questo.selectedConsole.avversario;
                doc.avversario = questo.selectedConsole.avversario;
            }
        }
        //sendRealtime(true);
        questo.disabledcontrols = true;
        console.log("posting doc", doc);
        questo.backend.postData(url, doc, function (data) {
            console.log("data", data);
            var toast = questo.toastCtrl.create({
                message: 'Tempo reale ' + newtesto + " per il match " + questo.selectedConsole.match.matchid,
                duration: 3000,
                position: 'top'
            });
            toast.onDidDismiss(function () {
                console.log('Dismissed toast');
                questo.disabledcontrols = false;
            });
            toast.present();
        });
        if (true)
            return;
    };
    MatchconsolerrPage.prototype.tapPlus = function (t) {
        var questo = this;
        var result = this.selectedConsole.result;
        var p1 = parseInt(result.split("-")[0]);
        var p2 = parseInt(result.split("-")[1]);
        var arr = t.split("_");
        var oper = arr[0];
        var side = arr[1];
        if (oper == 'plus') {
            if (side == '1') {
                p1++;
            }
            if (side == '2') {
                p2++;
            }
        }
        if (oper == 'minus') {
            if (side == '1') {
                p1--;
                if (p1 < 0)
                    p1 = 0;
            }
            if (side == '2') {
                p2--;
                if (p2 < 0)
                    p2 = 0;
            }
        }
        result = p1 + "-" + p2;
        this.selectedConsole.result = result;
        questo.sendRealtime();
        questo.backend.playFeedback();
        //prepare text
    };
    MatchconsolerrPage.prototype.sendRealtime = function () {
        var questo = this;
        var text = "TEMPO REALE !<br> ";
        var color = "black";
        var mtext = "in pausa";
        if (questo.selectedConsole.running) {
            mtext = "IN CORSO";
            color = "blue";
        }
        if (questo.selectedConsole.fineround) {
            mtext = "FINE ROUND " + questo.selectedConsole.round;
            color = "black";
        }
        var rtext = "<font color='" + color + "'>Round " + questo.selectedConsole.round;
        if (questo.selectedConsole.round == "GP")
            rtext = "<font color='" + color + "'>GoldenPoint";
        text += " " + rtext;
        text += ", " + mtext;
        text += ", " + questo.selectedConsole.result + "</font>";
        /*

        if (rta) {
            if (rta.foto) {

                text += "<br><img style='float: left' src='" + rta.foto + "' width='60px' height='60px' />";

            }
    }
    */
        //addMatchToRealtime(selectedid);
        color = "black";
        if (questo.selectedConsole.active)
            color = "blue";
        var htext = "<span style='color: " + color + "'>" + text + "</span>";
        //
        var rdata = {
            type: "realtime",
            to: "all",
            garaid: questo.selectedConsole.match.garaid,
            //matchid: selectedid,
            matchid: questo.selectedConsole.match.id,
            //matchnumber: selectedmatchid,
            matchnumber: questo.selectedConsole.match.matchid,
            result: questo.selectedConsole.result,
            round: questo.selectedConsole.round,
            fineround: questo.selectedConsole.fineround,
            running: questo.selectedConsole.running,
            paused: questo.selectedConsole.paused,
            ammoniz1: 0,
            ammoniz2: 0,
            event: "realtime",
            text: text,
            //match: getMatchById(selectedid),
            match: questo.selectedConsole.match,
            active: true //questo.selectedConsole.active
        };
        if (questo.selectedConsole.hasOwnProperty("avversario")) {
            if (questo.selectedConsole.avversario.trim() != "")
                rdata.avversario = questo.selectedConsole.avversario;
        }
        if (questo.selectedConsole.match.realtime) {
            console.log("è in realtime !!");
            if (String(questo.selectedConsole.match.realtime) == "true")
                questo.socket.sendMessage(rdata);
        }
    };
    MatchconsolerrPage.prototype.tapRound = function (n) {
        this.selectedConsole.round = n;
        this.selectedConsole.paused = false;
        this.selectedConsole.running = true;
        this.selectedConsole.fineround = false;
        this.selectedConsole.goldenpoint = false;
        if (this.selectedConsole.round == "GP")
            this.selectedConsole.goldenpoint = true;
        this.sendRealtime();
        this.backend.playFeedback();
    };
    MatchconsolerrPage.prototype.tapFineround = function () {
        this.selectedConsole.fineround = true;
        this.selectedConsole.paused = true;
        this.selectedConsole.running = false;
        this.sendRealtime();
        this.backend.playFeedback();
    };
    MatchconsolerrPage.prototype.getPauseText = function () {
        var text = "IN CORSO";
        if (this.selectedConsole.paused) {
            text = "IN PAUSA";
        }
        return text;
    };
    MatchconsolerrPage.prototype.tapPause = function () {
        if (!this.selectedConsole.fineround) {
            this.selectedConsole.paused = !this.selectedConsole.paused;
            this.selectedConsole.running = !this.selectedConsole.running;
        }
        this.sendRealtime();
        this.backend.playFeedback();
    };
    MatchconsolerrPage.prototype.getTemporealeText = function () {
        var text = "TEMPO REALE: NON ATTIVO";
        if (this.selectedConsole.match.realtime) {
            if (String(this.selectedConsole.match.realtime) == "true") {
                text = "TEMPO REALE: ATTIVO !";
            }
        }
        return text;
    };
    MatchconsolerrPage.prototype.setResult = function () {
        this.backend.playFeedback();
        console.log("setResult");
        var questo = this;
        var ris = questo.selectedConsole.result;
        var risarr = ris.split("-");
        if (ris.trim() != "0-0") {
            if (risarr[0] == risarr[1]) {
                var alrtx = questo.alertCtrl.create({
                    title: 'ATTENZIONE',
                    subTitle: 'Il risultato indicato indica un pareggio, incrementa uno dei due punteggi per indicare una vittoria o una sconfitta',
                    buttons: ['Chiudi']
                });
                alrtx.present();
                return;
            }
        }
        var msg = "Vuoi davvero convalidare il risultato di questo incontro (" + ris + ") ?";
        var gsmsg = "";
        if (questo.selectedConsole.goldenpoint)
            gsmsg = "(risultato conseguito dopo GoldenPoint)";
        if (questo.selectedConsole.squalifica)
            gsmsg = "(verrà registrata la sconfitta per squalifica)";
        msg += gsmsg;
        var title = "Conferma risultato " + ris;
        if ((ris.trim() == "0-0") || (ris.trim() == "")) {
            msg = "ATTENZIONE ! Il risultato impostato eseguirà il reset del match. Vuoi davvero resettare il match ?";
            title = "Conferma reset match";
        }
        var alrt = questo.alertCtrl.create({
            title: title,
            message: msg,
            buttons: [
                {
                    text: 'Annulla',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                        questo.backend.playFeedback();
                    }
                },
                {
                    text: 'OK',
                    handler: function () {
                        questo.backend.playFeedback();
                        var match = questo.selectedConsole.match;
                        var goldenpoint = false;
                        if (questo.selectedConsole.round.toLowerCase() == "gp")
                            goldenpoint = true;
                        if (questo.selectedConsole.goldenpoint)
                            goldenpoint = true;
                        match.goldenpoint = goldenpoint;
                        match.risultato = questo.selectedConsole.result;
                        if (match.hasOwnProperty("avversari")) {
                            delete match.avversari;
                        }
                        //alert(questo.selectedConsole.squalifica);
                        match.squalifica = questo.selectedConsole.squalifica;
                        var atl = questo.backend.getAtletaById(questo.selectedConsole.match.atletaid);
                        var mfa = questo.backend.filterRows(questo.backend.activegara.matchesbyprog, { atletaid: atl.id });
                        questo.backend.setResult(match, atl, mfa, function (data) {
                            console.log("setted result !!", data);
                            setTimeout(function () {
                                questo.navCtrl.pop();
                            }, 2000);
                        });
                        console.log('Buy clicked');
                    }
                }
            ]
        });
        alrt.present();
    };
    MatchconsolerrPage.prototype.gotoChat = function () {
        this.backend.playFeedback();
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__pages_chat_chat__["a" /* ChatPage */]);
    };
    MatchconsolerrPage.prototype.showMatchOrd = function (m) {
        var retvalue = false;
        if (m.hasOwnProperty("matchord")) {
            if (m.matchord.trim() != "") {
                retvalue = true;
            }
        }
        return retvalue;
    };
    MatchconsolerrPage.prototype.hasAvversari = function () {
        var questo = this;
        var retvalue = false;
        if (questo.selectedConsole.hasOwnProperty("avversari")) {
            if (questo.selectedConsole.avversari.length > 0)
                retvalue = true;
        }
        return retvalue;
    };
    MatchconsolerrPage.prototype.hasAvversario = function (m) {
        var retvalue = false;
        if (m.hasOwnProperty("avversario")) {
            if (m.avversario.trim() != "")
                retvalue = true;
        }
        return retvalue;
    };
    MatchconsolerrPage.prototype.getAvversario = function (m) {
        var retvalue = {
            nome: "",
            societa: ""
        };
        if (m.hasOwnProperty("avversario")) {
            retvalue.nome = m.avversario.split("|")[0];
            retvalue.societa = m.avversario.split("|")[1];
        }
        return retvalue;
    };
    MatchconsolerrPage.prototype.selectAvversario = function (c) {
        var _this = this;
        var questo = this;
        if (c.avversari.length == 0)
            return;
        var inputs = [];
        var ndchecked = true;
        var m = c.match;
        if (m.hasOwnProperty("avversario")) {
            if (m.avversario.trim() != "") {
                ndchecked = false;
            }
        }
        inputs.push({ type: 'radio', label: 'Non definito', value: '', checked: ndchecked });
        c.avversari.forEach(function (item, idx) {
            console.log("avversario", item);
            var lblnome = item.nome;
            var lblval = item.nome + "|" + item.societa;
            var checked = false;
            if (m.hasOwnProperty("avversario")) {
                if (m.avversario.trim() != "") {
                    var avv = m.avversario.split("|");
                    //console.log("avv",avv,"item",item);
                    if (avv[0].toLowerCase() == item.nome.toLowerCase())
                        checked = true;
                }
            }
            inputs.push({ type: 'radio', label: lblnome, value: lblval, checked: checked });
        });
        var alrt = questo.alertCtrl.create({
            title: 'Seleziona avversario',
            inputs: inputs,
            buttons: [
                {
                    text: 'Annulla',
                    role: 'cancel',
                    handler: function (data) {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'OK',
                    handler: function (data) {
                        console.log("OK", data);
                        if (data) {
                            console.log("data cè");
                            m.avversario = data;
                            questo.selectedConsole.avversario = data;
                            console.log("selectedConsole", questo.selectedConsole.avversario);
                        }
                        else {
                            console.log("data non cè");
                            m.avversario = "";
                            questo.selectedConsole.avversario = "";
                            //delete questo.selectedConsole.avversario;
                        }
                        if (questo.selectedConsole.active)
                            questo.sendRealtime();
                        var loading = _this.loadingCtrl.create({
                            spinner: 'dots',
                            content: 'Aggiornamento avversario...'
                        });
                        loading.onDidDismiss(function () {
                            console.log('Dismissed loading');
                        });
                        loading.present();
                        questo.backend.setAvversario(m.garaid, m.id, questo.selectedConsole.avversario, function (data) {
                            console.log("setAvversario done", data);
                            loading.dismiss();
                        });
                    }
                }
            ]
        });
        alrt.present();
    };
    return MatchconsolerrPage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* Navbar */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* Navbar */])
], MatchconsolerrPage.prototype, "navBar", void 0);
MatchconsolerrPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-matchconsolerr',template:/*ion-inline-start:"/Users/demetriomortelliti/Desktop/demy/PROJECTS/appkwondo/clients/ion2kwondo/src/pages/matchconsolerr/matchconsolerr.html"*/'<!--\n  Generated template for the MatchconsolePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Match console</ion-title>\n     <ion-buttons end>\n     \n<!--<button ion-button style="font-size: 18px" (click)="gotoChat()"><ion-icon name="md-chatbubbles"></ion-icon>\n\n</button>-->\n</ion-buttons>\n  </ion-navbar>\n  <ion-toolbar>\n    <ion-segment [(ngModel)]="selectedMatchId" >\n      <ion-segment-button *ngFor="let c of backend.matchconsoles; let i=index;" [value]="c.match.id" (tap)="tapSegment(c,i)" [ngClass]="c.realtime ? \'ssecondary\': \'sdark\'">\n        <span [ngClass]="(c.match.realtime==\'false\') || (c.match.realtime==false) ? \'tabnorealtime\': \'\'">{{c.match.matchid}} {{c.match.atletaname}}</span>\n      </ion-segment-button>\n      \n    </ion-segment>\n  </ion-toolbar>\n\n</ion-header>\n\n\n<ion-content padding>\n <div class="consoleinfo">{{selectedConsole.match.matchid}} {{selectedConsole.match.atletaname}}</div> \n <div class="consoleinfo" style="font-size: 13px; font-style: italic; height: 25px;" *ngIf="showMatchOrd(selectedConsole.match)">{{selectedConsole.match.matchord}}</div>\n <div class="avvinfo"  *ngIf="selectedConsole.avversario">{{selectedConsole.avversario.split(\'|\')[0]}}<br>{{selectedConsole.avversario.split(\'|\')[1]}}</div>\n <ion-row>\n   <ion-col col-12><button ion-button full [ngClass]="(selectedConsole.match.realtime==\'true\') || (selectedConsole.match.realtime==true) ? \'realtimebut\' : \'norealtimebut\'" (tap)="toggleTempoReale()">{{getTemporealeText()}}</button>\n   </ion-col>\n </ion-row>\n  <br>\n  <div *ngIf="(selectedConsole.match.realtime==\'true\') || (selectedConsole.match.realtime==true) ">\n  <ion-row>\n    <ion-col col-6>\n      <button [disabled]="disabledcontrols" ion-button full color="light" (tap)="tapPause()" [ngClass]="!selectedConsole.paused ? \'incorso\' : \'\'">{{getPauseText()}}</button>\n    </ion-col>\n    <ion-col col-6>\n      <button [disabled]="disabledcontrols" ion-button full color="light" (tap)="tapFineround()" [ngClass]="selectedConsole.fineround ? \'roundactive\' : \'\'">FINEROUND</button>\n    </ion-col>\n\n  </ion-row>\n  <ion-row>\n    <ion-col col-3><button [disabled]="disabledcontrols" ion-button full (tap)="tapRound(\'1\')" color="light" [ngClass]="(selectedConsole.round==\'1\') && (selectedConsole.fineround) ? \'roundactive fineround\' : selectedConsole.round==\'1\' ? \'roundactive\' : \'\'">1</button></ion-col>\n    <ion-col col-3><button [disabled]="disabledcontrols" ion-button full (tap)="tapRound(\'2\')" color="light" [ngClass]="(selectedConsole.round==\'2\') && (selectedConsole.fineround) ? \'roundactive fineround\' : selectedConsole.round==\'2\' ? \'roundactive\' : \'\'">2</button></ion-col>\n    <ion-col col-3><button [disabled]="disabledcontrols" ion-button full (tap)="tapRound(\'3\')" color="light" [ngClass]="(selectedConsole.round==\'3\') && (selectedConsole.fineround) ? \'roundactive fineround\' : selectedConsole.round==\'3\' ? \'roundactive\' : \'\'">3</button></ion-col>\n    <ion-col col-3><button [disabled]="disabledcontrols" ion-button full (tap)="tapRound(\'GP\')" color="light" [ngClass]="(selectedConsole.round==\'GP\') && (selectedConsole.fineround) ? \'roundactive fineround\' : selectedConsole.round==\'GP\' ? \'roundactive\' : \'\'">GP</button></ion-col>\n  </ion-row>\n  </div>\n  <br>\n  <ion-row>\n    <ion-col col-4>{{selectedConsole.match.player1.cognome}} {{selectedConsole.match.player1.nome}} </ion-col>\n    <ion-col></ion-col>\n    <ion-col col-4>{{selectedConsole.match.player2.cognome}} {{selectedConsole.match.player2.nome}}</ion-col>\n  </ion-row>\n  <ion-row>\n    \n    <ion-col col-2><button [disabled]="disabledcontrols" ion-button full color="light" (tap)="tapPlus(\'plus_1\')">+</button></ion-col>\n    <ion-col col-2><button [disabled]="disabledcontrols" ion-button full color="light" (tap)="tapPlus(\'minus_1\')">-</button></ion-col>\n    <ion-col col-1></ion-col>\n    <ion-col col-2><ion-input readonly [disabled]="disabledcontrols" [(ngModel)]="selectedConsole.result" ></ion-input></ion-col>\n    <ion-col col-1></ion-col>\n    <ion-col col-2><button [disabled]="disabledcontrols" ion-button full color="light" (tap)="tapPlus(\'plus_2\')">+</button></ion-col>\n    <ion-col col-2><button [disabled]="disabledcontrols" ion-button full color="light" (tap)="tapPlus(\'minus_2\')">-</button></ion-col>\n  </ion-row>\n  <ion-row>\n    <ion-col col-12>\n      <div style="font-size: 12px; padding: 4px; text-align: center">\n      \n    </div>\n    </ion-col>\n  </ion-row>\n  <br>\n  <div class="checkboxes">\n  <ion-item>\n      <ion-label>GoldenPoint (il punteggio indica il vincitore)</ion-label>\n      <ion-checkbox [(ngModel)]="selectedConsole.goldenpoint"></ion-checkbox>\n    </ion-item>\n    <ion-item>\n        <ion-label>Sconfitta per squalifica</ion-label>\n        <ion-checkbox [(ngModel)]="selectedConsole.squalifica"></ion-checkbox>\n      </ion-item>\n    </div>\n\n\n  <br>\n  <div *ngIf="hasAvversari()"><!--*ngIf="selectedConsole.match.avversari.length>0"-->\n  <button ion-button color="light"  small block (tap)="selectAvversario(selectedConsole)">Seleziona avversario</button>\n  <br>\n</div>\n\n  <button [disabled]="disabledcontrols" ion-button full (tap)="setResult()">Convalida risultato</button>  \n\n</ion-content>\n'/*ion-inline-end:"/Users/demetriomortelliti/Desktop/demy/PROJECTS/appkwondo/clients/ion2kwondo/src/pages/matchconsolerr/matchconsolerr.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_3__providers_socket_service_socket_service__["a" /* SocketService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["t" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_2__providers_backend_backend__["a" /* BackendProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */]])
], MatchconsolerrPage);

//# sourceMappingURL=matchconsolerr.js.map

/***/ }),

/***/ 553:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AtletiPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_backend_backend__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_atleta_atleta__ = __webpack_require__(554);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_editatleta_editatleta__ = __webpack_require__(556);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/*
  Generated class for the GarePage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var AtletiPage = (function () {
    function AtletiPage(alertCtrl, toastCtrl, modalCtrl, events, backend, navCtrl, navParams) {
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
        this.modalCtrl = modalCtrl;
        this.events = events;
        this.backend = backend;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.atleti = [];
        this.newAtleta = {
            cognome: "",
            nome: "",
            datanascita: "01.01.2005",
            sesso: "M",
            squadra: "",
            categoriapeso: "",
            palestra: "",
            cintura: "",
            punticlass: "",
            societaid: "20160217220400"
        };
        this.displayedatleti = [];
        this.filter = "";
        this.loading = false;
    }
    AtletiPage.prototype.ionViewWillEnter = function () {
        var questo = this;
        this.events.subscribe("hwbackbutton", function (data) {
            console.log("hwbackbutton in gare.ts");
            questo.navCtrl.pop();
        });
        questo.refresh(function (data) { });
    };
    AtletiPage.prototype.ionViewWillLeave = function () {
        this.events.unsubscribe("hwbackbutton");
    };
    AtletiPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad AtletiPage');
        this.atleti = this.backend.atleti;
        this.backend.setBackButtonAction(this.navBar, this.navCtrl);
        this.backend.setupNavbarBack(this.navBar, this.navCtrl);
        /*this.refresh(function(data){
         
        })  */
    };
    AtletiPage.prototype.refresh = function (callback) {
        var questo = this;
        questo.loading = true;
        questo.backend.getAtleti(function (data) {
            questo.atleti = data.rows;
            questo.filterAtleti();
            console.log("atleti", questo.displayedatleti);
            questo.loading = false;
            if (callback)
                callback(data);
        });
    };
    AtletiPage.prototype.filterAtleti = function () {
        var questo = this;
        var atleti = [];
        if (questo.filter.trim() == "") {
            atleti = questo.atleti;
        }
        else {
            questo.atleti.forEach(function (item, idx) {
                var doIt = false;
                if (item.doc.cognome.toLowerCase().indexOf(questo.filter.toLowerCase()) > -1)
                    doIt = true;
                if (item.doc.nome.toLowerCase().indexOf(questo.filter.toLowerCase()) > -1)
                    doIt = true;
                if (doIt)
                    atleti.push(item);
            });
        }
        questo.displayedatleti = atleti;
    };
    AtletiPage.prototype.doRefresh = function (refresher) {
        console.log('Begin async operation', refresher);
        var questo = this;
        questo.refresh(function (data) {
            //console.log("allnews", data);
            refresher.complete();
        });
    };
    AtletiPage.prototype.getCategoria = function (m) {
        return this.backend.getCategoria(m.doc.datanascita, null);
    };
    AtletiPage.prototype.gotoAtleta = function (atl) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__pages_atleta_atleta__["a" /* AtletaPage */], { atleta: atl });
    };
    AtletiPage.prototype.editAtleta = function (a) {
        console.log("editatleta", a);
        var questo = this;
        var profileModal = questo.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_4__pages_editatleta_editatleta__["a" /* EditatletaPage */], { atleta: a.doc });
        profileModal.onDidDismiss(function (data) {
            console.log(data);
            if (data) {
                if (data.hasOwnProperty("action")) {
                    var text = data.text;
                    questo.refresh(function () {
                        var toast = questo.toastCtrl.create({
                            message: 'Atleta ' + a.doc.cognome + " " + a.doc.nome + " " + text,
                            duration: 3000,
                            position: 'top'
                        });
                        toast.onDidDismiss(function () {
                            console.log('Dismissed toast');
                        });
                        toast.present();
                    });
                }
            }
        });
        profileModal.present();
    };
    AtletiPage.prototype.addAtleta = function () {
        var questo = this;
        var profileModal = questo.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_4__pages_editatleta_editatleta__["a" /* EditatletaPage */], { atleta: questo.newAtleta });
        profileModal.onDidDismiss(function (data) {
            console.log(data);
            if (data) {
                if (data.hasOwnProperty("action")) {
                    var text = data.text;
                    questo.refresh(function () {
                        var toast = questo.toastCtrl.create({
                            message: 'Atleta ' + data.atleta.cognome + " " + data.atleta.nome + " " + text,
                            duration: 3000,
                            position: 'top'
                        });
                        toast.onDidDismiss(function () {
                            console.log('Dismissed toast');
                        });
                        toast.present();
                    });
                }
            }
        });
        profileModal.present();
        //this.navCtrl.push(EditatletaPage,{atleta: questo.newAtleta}, questo.backend.navOptions)
    };
    AtletiPage.prototype.deleteAtleta = function (a) {
        var questo = this;
        var url = questo.backend.rooturl + "/atleti/delete";
        var postdata = {
            id: a.doc.id,
            rev: a.doc.id
        };
        questo.backend.postData(url, postdata, function (data) {
            console.log("atleta deleted", data);
            questo.refresh(function () {
                var toast = questo.toastCtrl.create({
                    message: 'Atleta ' + a.doc.cognome + " " + a.doc.nome + " eliminato",
                    duration: 3000,
                    position: 'top'
                });
                toast.onDidDismiss(function () {
                    console.log('Dismissed toast');
                });
                toast.present();
            });
        });
    };
    AtletiPage.prototype.pressAtleta = function (a) {
        var questo = this;
        if (!questo.backend.userIsAdmin())
            return;
        //if (questo.backend.user.role != "tkdradmin") return;
        var alrt = questo.alertCtrl.create({
            title: 'Seleziona una scelta',
            message: 'Esegui una tra le azioni elencate',
            buttons: [
                {
                    text: 'ANNULLA',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Modifica atleta',
                    handler: function () {
                        questo.editAtleta(a);
                    }
                },
                {
                    text: 'Elimina atleta',
                    handler: function () {
                        console.log('Buy clicked');
                        var alert2 = questo.alertCtrl.create({
                            title: 'Elimina atleta',
                            message: 'Vuoi realmente eliminare ' + a.doc.cognome + ' ' + a.doc.nome + ' ?',
                            buttons: [
                                {
                                    text: 'ANNULLA',
                                    role: 'cancel',
                                    handler: function () {
                                        console.log('Cancel clicked');
                                    }
                                },
                                {
                                    text: 'SI, ELIMINA ' + a.doc.cognome + ' ' + a.doc.nome,
                                    handler: function () {
                                        questo.deleteAtleta(a);
                                        console.log('eliminaatleta confirmed clicked');
                                        //delete code
                                    }
                                }
                            ]
                        });
                        alert2.present();
                    }
                }
            ]
        });
        alrt.present();
    };
    AtletiPage.prototype.onInput = function (ev) {
        var questo = this;
        console.log("onInput", ev);
        console.log("filter", questo.filter);
        //questo.filter=ev.data;
        questo.filterAtleti();
    };
    AtletiPage.prototype.onCancel = function (ev) {
        var questo = this;
        console.log("onCancel", ev);
        //questo.filter="";
    };
    return AtletiPage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* Navbar */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* Navbar */])
], AtletiPage.prototype, "navBar", void 0);
AtletiPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-atleti',template:/*ion-inline-start:"/Users/demetriomortelliti/Desktop/demy/PROJECTS/appkwondo/clients/ion2kwondo/src/pages/atleti/atleti.html"*/'<!--\n  Generated template for the GarePage page.\n\n  See http://ionicframework.com/docs/v2/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Atleti</ion-title>\n    <ion-buttons end>\n      <button *ngIf="backend.userIsAdmin()" ion-button class="menubutton"  (tap)="addAtleta()"><ion-icon name="ios-add-circle-outline"></ion-icon></button>\n    </ion-buttons>\n  </ion-navbar>\n  <ion-searchbar placeholder="Filtra atleti"\n  [(ngModel)]="filter"\n  [showCancelButton]="true"\n  (ionInput)="onInput($event)"\n  (ionCancel)="onCancel($event)">\n</ion-searchbar>\n<div class="reccount">{{displayedatleti.length}} atleti</div>\n\n</ion-header>\n\n\n<ion-content spadding style="background: #eee;">\n\n  <ion-refresher (ionRefresh)="doRefresh($event)">\n    <ion-refresher-content refreshingSpinner="dots">\n        </ion-refresher-content>\n  </ion-refresher>  \n  <div *ngIf="loading" style="width: 100%; text-align: center">\n    <ion-spinner name="dots"></ion-spinner>\n  </div>\n\n  <ion-list [virtualScroll]="displayedatleti" approxItemHeight="40px">\n  <ion-item *virtualItem="let a"  (press)="pressAtleta(a)" (tap)="gotoAtleta(a)">  <!-- *ngFor="let a of atleti"  -->\n    \n    <span class="atleta">{{a.doc.cognome}} {{a.doc.nome}}</span><br>\n    <span class="categoria">{{getCategoria(a).toUpperCase()}}</span>\n   \n    </ion-item>\n  </ion-list>\n\n</ion-content>\n'/*ion-inline-end:"/Users/demetriomortelliti/Desktop/demy/PROJECTS/appkwondo/clients/ion2kwondo/src/pages/atleti/atleti.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["t" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ModalController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */], __WEBPACK_IMPORTED_MODULE_2__providers_backend_backend__["a" /* BackendProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */]])
], AtletiPage);

//# sourceMappingURL=atleti.js.map

/***/ }),

/***/ 554:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AtletaPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_backend_backend__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_google_google__ = __webpack_require__(555);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the AtletaPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var AtletaPage = (function () {
    function AtletaPage(google, events, backend, navCtrl, navParams) {
        this.google = google;
        this.events = events;
        this.backend = backend;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.atleta = {
            cognome: "",
            nome: ""
        };
        this.mode = "view";
    }
    AtletaPage.prototype.ionViewDidLoad = function () {
        var atl = this.navParams.get("atleta");
        console.log('ionViewDidLoad AtletaPage', atl);
        this.atleta = atl.doc;
        var gid = "1-B1k4i03XPkuvGKP7ILgsQ8-EbeYFNo6tKjZXvxBRp0";
        var fullurl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSS_MWmRxn4pi1D8XJxcIGUEjlmZ-BuH0Wo7Lw1QdUfYyKefCUzwJQPfuxmoRgQqRMXVBFwjj_DghlC/pubhtml";
        /*this.google.load(gid).then(function(data){
          console.log("googledata",data)}
        );*/
    };
    AtletaPage.prototype.ionViewWillEnter = function () {
        var questo = this;
        this.events.subscribe("hwbackbutton", function (data) {
            console.log("hwbackbutton in gare.ts");
            questo.navCtrl.pop();
        });
    };
    AtletaPage.prototype.ionViewWillLeave = function () {
        this.events.unsubscribe("hwbackbutton");
    };
    return AtletaPage;
}());
AtletaPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-atleta',template:/*ion-inline-start:"/Users/demetriomortelliti/Desktop/demy/PROJECTS/appkwondo/clients/ion2kwondo/src/pages/atleta/atleta.html"*/'<!--\n  Generated template for the AtletaPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>{{atleta.cognome}} {{atleta.nome}}</ion-title>\n   \n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n  <ion-item *ngFor="let m of backend.getObjectArray(atleta)">\n    <ion-row>\n    <ion-col class="label">{{m.name}}</ion-col>\n    </ion-row>\n  <ion-row>\n     <ion-col class="value">{{m.value}}</ion-col>\n    </ion-row>\n    </ion-item>\n\n</ion-content>\n  <ion-footer>\n    <ion-row class="footerrow">\n      <ion-col col-6><button color="secondary" ion-button full>Salva</button></ion-col>\n      <ion-col col-6><button ion-button full>Annulla</button></ion-col>\n    </ion-row>\n  </ion-footer>\n\n  <ion-fab right bottom>\n   <button ion-fab><ion-icon name="md-create"></ion-icon></button>\n    <ion-fab-list side="left">\n    <button ion-fab><ion-icon name="md-create"></ion-icon></button>\n    <button ion-fab><ion-icon name="md-add"></ion-icon></button>\n    \n  </ion-fab-list>\n </ion-fab>\n'/*ion-inline-end:"/Users/demetriomortelliti/Desktop/demy/PROJECTS/appkwondo/clients/ion2kwondo/src/pages/atleta/atleta.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__providers_google_google__["a" /* GoogleDriveProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */], __WEBPACK_IMPORTED_MODULE_2__providers_backend_backend__["a" /* BackendProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */]])
], AtletaPage);

//# sourceMappingURL=atleta.js.map

/***/ }),

/***/ 555:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GoogleDriveProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/*
  Generated class for the GoogleDrive provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
var GoogleDriveProvider = (function () {
    function GoogleDriveProvider(http) {
        this.http = http;
        this.data = null;
    }
    GoogleDriveProvider.prototype.load = function (id) {
        var _this = this;
        if (this.data) {
            // already loaded data
            return Promise.resolve(this.data);
        }
        var url = 'https://spreadsheets.google.com/feeds/list/' + id + '/od6/public/values?alt=json';
        // don't have the data yet
        return new Promise(function (resolve) {
            // We're using Angular Http provider to request the data,
            // then on the response it'll map the JSON data to a parsed JS object.
            // Next we process the data and resolve the promise with the new data.
            _this.http.get(url)
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                console.log('Raw Data', data);
                _this.data = data.feed.entry;
                var returnArray = [];
                if (_this.data && _this.data.length > 0) {
                    _this.data.forEach(function (entry, index) {
                        var obj = {};
                        for (var x in entry) {
                            if (x.includes('gsx$') && entry[x].$t) {
                                obj[x.split('$')[1]] = entry[x]['$t'];
                                // console.log( x.split('$')[1] + ': ' + entry[x]['$t'] );
                            }
                        }
                        returnArray.push(obj);
                    });
                }
                resolve(returnArray);
            });
        });
    };
    return GoogleDriveProvider;
}());
GoogleDriveProvider = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */]])
], GoogleDriveProvider);

//# sourceMappingURL=google.js.map

/***/ }),

/***/ 556:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EditatletaPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_backend_backend__ = __webpack_require__(6);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the EditatletaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var EditatletaPage = (function () {
    function EditatletaPage(viewCtrl, backend, events, navCtrl, navParams) {
        this.viewCtrl = viewCtrl;
        this.backend = backend;
        this.events = events;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.mode = "edit";
        this.atleta = {};
        this.title = "";
        this.societa = [];
        this.bonusmalus = 0;
    }
    EditatletaPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad EditatletaPage');
    };
    EditatletaPage.prototype.addBonus = function (n) {
        this.bonusmalus += n;
    };
    EditatletaPage.prototype.ionViewWillEnter = function () {
        var questo = this;
        questo.atleta = questo.navParams.get("atleta");
        questo.title = "Modifica";
        if (questo.atleta.hasOwnProperty("bonusmalus")) {
            questo.bonusmalus = questo.atleta.bonusmalus;
        }
        if (!questo.atleta.hasOwnProperty("id")) {
            questo.mode = "insert";
            questo.mode = "Aggiungi";
        }
        questo.backend.getSocieta(function (data) {
            questo.societa = data.rows;
            console.log("loaded societa in editatleta.ts", questo.societa);
        });
        questo.events.subscribe("hwbackbutton", function (data) {
            console.log("hwbackbutton in gare.ts");
            questo.navCtrl.pop();
        });
    };
    EditatletaPage.prototype.ionViewWillLeave = function () {
        this.events.unsubscribe("hwbackbutton");
    };
    EditatletaPage.prototype.saveAtleta = function () {
        var questo = this;
        var url = questo.backend.rooturl + "/atleti/add";
        var text = "aggiunto";
        if (questo.mode == "edit") {
            url = questo.backend.rooturl + "/atleti/update/" + questo.atleta.id;
            text = "salvato";
        }
        questo.atleta.atletaid = questo.atleta.id;
        questo.atleta.bonusmalus = questo.bonusmalus;
        var postdata = questo.atleta;
        questo.backend.postData(url, postdata, function (data) {
            console.log("done " + url, data);
            questo.viewCtrl.dismiss({ text: text, action: "saved", atleta: questo.atleta });
        });
    };
    EditatletaPage.prototype.cancelAtleta = function () {
        this.viewCtrl.dismiss();
    };
    return EditatletaPage;
}());
EditatletaPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-editatleta',template:/*ion-inline-start:"/Users/demetriomortelliti/Desktop/demy/PROJECTS/appkwondo/clients/ion2kwondo/src/pages/editatleta/editatleta.html"*/'<!--\n  Generated template for the EditatletaPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>{{title}}&nbsp;atleta</ion-title>\n    <ion-buttons end>\n            <button ion-button (tap)="addBonus(-1)">-</button>\n            <label>{{bonusmalus}}</label>\n        <button ion-button (tap)="addBonus(1)">+</button>\n    </ion-buttons>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content spadding class="ion-content">\n    <ion-item *ngIf="mode==\'edit\'">\n        <ion-label floating>ID</ion-label>\n        <ion-input readonly [(ngModel)]="atleta.id"></ion-input>\n       \n    </ion-item>\n    <ion-item *ngIf="mode==\'edit\'">\n        <ion-label floating>AtletaID</ion-label>\n        <ion-input readonly [(ngModel)]="atleta.atletaid"></ion-input>\n       \n    </ion-item>\n\n    <ion-item>\n       <ion-label floating>Cognome</ion-label>\n       <ion-input [(ngModel)]="atleta.cognome"></ion-input>\n      \n   </ion-item>\n   <ion-item>\n      <ion-label floating>Nome</ion-label>\n      <ion-input [(ngModel)]="atleta.nome"></ion-input>\n     \n  </ion-item>\n  <ion-item>\n      <ion-label floating>Data di nascita</ion-label>\n      <ion-input [(ngModel)]="atleta.datanascita"></ion-input>\n     \n  </ion-item>\n  <ion-item>\n      <ion-label floating>Sesso</ion-label>\n      <ion-select [(ngModel)]="atleta.sesso">\n          <ion-option value="F">F</ion-option>\n          <ion-option value="M">M</ion-option>\n        </ion-select>\n     \n  </ion-item>\n  <ion-item>\n      <ion-label floating>Squadra</ion-label>\n      <ion-input [(ngModel)]="atleta.squadra"></ion-input>\n     \n  </ion-item>\n  <ion-item>\n      <ion-label floating>Categoria peso</ion-label>\n      <ion-input [(ngModel)]="atleta.categoriapeso"></ion-input>\n     \n  </ion-item>\n  <ion-item>\n      <ion-label floating>Cintura</ion-label>\n\n      <!--<ion-input [(ngModel)]="atleta.cintura"></ion-input>-->\n      <ion-select [(ngModel)]="atleta.cintura">\n          <ion-option value="bianca">bianca</ion-option>\n          <ion-option value="bianca-gialla">bianca-gialla</ion-option>\n          <ion-option value="gialla">gialla</ion-option>\n          <ion-option value="gialla-verde">gialla-verde</ion-option>\n          <ion-option value="verde">verde</ion-option>\n          <ion-option value="verde-blu">verde-blu</ion-option>\n          <ion-option value="blu">blu</ion-option>\n          <ion-option value="blu-rossa">blu-rossa</ion-option>\n          <ion-option value="rossa">rossa</ion-option>\n          <ion-option value="rossa-nera">rossa-nera</ion-option>\n          <ion-option value="nera">nera</ion-option>\n        </ion-select>\n\n  </ion-item>\n  <ion-item>\n      <ion-label floating>Palestra</ion-label>\n      <ion-input [(ngModel)]="atleta.palestra"></ion-input>\n     \n  </ion-item>\n  <ion-item>\n      <ion-label floating>Punti classifica</ion-label>\n      <ion-input [(ngModel)]="atleta.punticlass"></ion-input>\n     \n  </ion-item>\n  <ion-item>\n      <ion-label floating>Societa</ion-label>\n      <ion-select [(ngModel)]="atleta.societaid">\n          <ion-option *ngFor="let s of societa" [value]="s.doc.id">{{s.doc.nome}}</ion-option>\n          \n        </ion-select>\n      <!--<ion-input [(ngModel)]="atleta.societaid"></ion-input>-->\n     \n  </ion-item>\n  <ion-item>\n        <ion-label floating>Dismissed</ion-label>\n        <ion-select [(ngModel)]="atleta.dismissed">\n            <ion-option value="false">false</ion-option>\n            <ion-option value="true">true</ion-option>\n          </ion-select>\n       \n    </ion-item>\n\n</ion-content>\n<ion-footer>\n    <ion-row class="footerrow">\n      <ion-col col-6><button color="secondary" ion-button full (tap)="saveAtleta()" >Salva</button></ion-col>\n      <ion-col col-6><button ion-button full (tap)="cancelAtleta()">Annulla</button></ion-col>\n    </ion-row>\n  </ion-footer>\n\n'/*ion-inline-end:"/Users/demetriomortelliti/Desktop/demy/PROJECTS/appkwondo/clients/ion2kwondo/src/pages/editatleta/editatleta.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["u" /* ViewController */], __WEBPACK_IMPORTED_MODULE_2__providers_backend_backend__["a" /* BackendProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */]])
], EditatletaPage);

//# sourceMappingURL=editatleta.js.map

/***/ }),

/***/ 557:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EventiPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_backend_backend__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_gara_gara__ = __webpack_require__(142);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/*
  Generated class for the GarePage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var EventiPage = (function () {
    function EventiPage(events, backend, navCtrl, navParams) {
        this.events = events;
        this.backend = backend;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.gare = [];
        this.nextevents = [];
        this.view = "nextevents";
        this.detailview = "";
        this.loading = false;
    }
    EventiPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad EventiPage');
        this.backend.setBackButtonAction(this.navBar, this.navCtrl);
        this.backend.setupNavbarBack(this.navBar, this.navCtrl);
        this.refresh(function (data) {
        });
    };
    EventiPage.prototype.refresh = function (callback) {
        var questo = this;
        questo.backend.getNextEvents(function () {
            questo.backend.getEventi(function (data) {
                questo.gare = data.rows;
                console.log("gare", questo.gare);
                if (callback)
                    callback(data);
            });
        });
    };
    EventiPage.prototype.doRefresh2 = function () {
        var questo = this;
        questo.loading = true;
        questo.refresh(function () {
            questo.loading = false;
        });
    };
    EventiPage.prototype.doRefresh = function (refresher) {
        console.log('Begin async operation', refresher);
        var questo = this;
        questo.refresh(function (data) {
            //console.log("allnews", data);
            refresher.complete();
        });
    };
    EventiPage.prototype.ionViewWillEnter = function () {
        var questo = this;
        this.events.subscribe("hwbackbutton", function (data) {
            console.log("hwbackbutton in gare.ts");
            questo.navCtrl.pop();
        });
        /*
        questo.backend.getNextEvents(function(data){
          console.log("fatto nextevents");
          questo.nextevents=data;
        });*/
    };
    EventiPage.prototype.ionViewWillLeave = function () {
        this.events.unsubscribe("hwbackbutton");
    };
    EventiPage.prototype.getAbs = function (n) {
        return Math.abs(n);
    };
    EventiPage.prototype.showDetails = function (g) {
        var questo = this;
        var newdetailview = g.gara.id;
        if (questo.detailview == g.gara.id)
            newdetailview = "";
        questo.detailview = newdetailview;
    };
    EventiPage.prototype.getDescr = function (g) {
        var retvalue = "";
        if (g.gara.hasOwnProperty("descr"))
            retvalue = g.gara.descr;
        return retvalue;
    };
    EventiPage.prototype.openGara = function (g) {
        var id = g.gara.id;
        var questo = this;
        console.log("openGara", id);
        questo.backend.playFeedback();
        //this.deviceFeedback.acoustic();
        //ios-transition
        questo.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__pages_gara_gara__["a" /* GaraPage */], {
            id: id
        }, questo.backend.navOptions);
    };
    return EventiPage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* Navbar */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* Navbar */])
], EventiPage.prototype, "navBar", void 0);
EventiPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-eventi',template:/*ion-inline-start:"/Users/demetriomortelliti/Desktop/demy/PROJECTS/appkwondo/clients/ion2kwondo/src/pages/eventi/eventi.html"*/'<!--\n  Generated template for the GarePage page.\n\n  See http://ionicframework.com/docs/v2/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Eventi</ion-title>\n    <ion-buttons end>\n      <button style="font-size: 18px" ion-button clear (tap)="doRefresh2()"><ion-icon name="md-refresh"></ion-icon></button>\n    </ion-buttons>\n  </ion-navbar>\n\n  <ion-segment *ngIf="backend.userIsAdmin()" class="segment" [(ngModel)]="view">\n    <ion-segment-button value="nextevents">\n      <!-- <ion-icon name="camera"></ion-icon>-->Prossimi\n    </ion-segment-button>\n    <ion-segment-button value="allevents">\n      <!-- <ion-icon name="camera"></ion-icon>-->Tutti\n    </ion-segment-button>\n  </ion-segment>\n\n</ion-header>\n\n\n<ion-content spadding style="background: #eee;">\n  \n  <ion-refresher (ionRefresh)="doRefresh($event)">\n    <ion-refresher-content refreshingSpinner="dots">\n        </ion-refresher-content>\n  </ion-refresher>\n  <div *ngIf="loading" style="width: 100%; text-align: center">\n      <ion-spinner name="dots"></ion-spinner>\n    </div>  \n\n  <section *ngIf="view==\'nextevents\'">\n\n  <ion-card *ngFor="let g of backend.nextevents">\n\n    <ion-card-content>\n        <span class="tipoevento">{{g.tipo.toUpperCase()}}</span><br>\n        <span class="title">{{g.gara.title}}</span><br>\n    <span class="locationdata">{{g.gara.location}} - {{g.gara.data}}</span><br>\n    <hr>\n      \n    <ion-row>\n      <ion-col>\n          <ion-chip color="primary">\n              <ion-label><b>Tra {{getAbs(g.diff)}} giorni</b></ion-label>\n            </ion-chip>\n\n      </ion-col>\n      <ion-col col-2>\n        <button (tap)="showDetails(g)" ion-button clear small icon-only><ion-icon *ngIf="detailview!=g.gara.id" name="ios-arrow-down-outline"></ion-icon><ion-icon *ngIf="detailview==g.gara.id" name="ios-arrow-up-outline"></ion-icon></button>\n      </ion-col>\n    </ion-row>\n    <section *ngIf="detailview==g.gara.id">\n      <div *ngIf="g.tipo==\'gara\'">\n        <ion-row>\n          <ion-col>\n\n          </ion-col>\n          <ion-col col-5>\n              <button small block ion-button (tap)="openGara(g)">Apri Gara</button>\n          </ion-col>\n        </ion-row>\n       \n      </div>\n\n      <div *ngIf="g.tipo==\'evento\'">\n      <hr>\n      <div class="descr" [innerHtml]="getDescr(g)">\n       \n      </div>\n    </div>\n\n    </section>\n       \n      \n   \n   \n    </ion-card-content>\n    </ion-card>\n\n  </section>\n\n  <section *ngIf="view==\'allevents\'">\n      <ion-card *ngFor="let g of gare">\n      <ion-card-content>\n          <span class="tipoevento">{{g.tipo}}</span><br>\n          \n          <b>{{g.doc.title}}</b><br>\n          {{g.doc.location}} - {{g.doc.data}}<br>\n          \n          </ion-card-content>\n          </ion-card>\n      \n       \n  </section>\n\n\n\n</ion-content>\n'/*ion-inline-end:"/Users/demetriomortelliti/Desktop/demy/PROJECTS/appkwondo/clients/ion2kwondo/src/pages/eventi/eventi.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */], __WEBPACK_IMPORTED_MODULE_2__providers_backend_backend__["a" /* BackendProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */]])
], EventiPage);

//# sourceMappingURL=eventi.js.map

/***/ }),

/***/ 558:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SocietaPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_backend_backend__ = __webpack_require__(6);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/*
  Generated class for the GarePage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var SocietaPage = (function () {
    function SocietaPage(events, backend, navCtrl, navParams) {
        this.events = events;
        this.backend = backend;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.societa = [];
    }
    SocietaPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SocietaPage');
        this.refresh(function (data) {
        });
    };
    SocietaPage.prototype.refresh = function (callback) {
        var questo = this;
        this.backend.getSocieta(function (data) {
            questo.societa = data.rows;
            console.log("societa", questo.societa);
            if (callback)
                callback(data);
        });
    };
    SocietaPage.prototype.doRefresh = function (refresher) {
        console.log('Begin async operation', refresher);
        var questo = this;
        questo.refresh(function (data) {
            //console.log("allnews", data);
            refresher.complete();
        });
    };
    SocietaPage.prototype.ionViewWillEnter = function () {
        var questo = this;
        this.events.subscribe("hwbackbutton", function (data) {
            console.log("hwbackbutton in gare.ts");
            questo.navCtrl.pop();
        });
    };
    SocietaPage.prototype.ionViewWillLeave = function () {
        this.events.unsubscribe("hwbackbutton");
    };
    return SocietaPage;
}());
SocietaPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-societa',template:/*ion-inline-start:"/Users/demetriomortelliti/Desktop/demy/PROJECTS/appkwondo/clients/ion2kwondo/src/pages/societa/societa.html"*/'<!--\n  Generated template for the GarePage page.\n\n  See http://ionicframework.com/docs/v2/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Società</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content spadding style="background: #eee;">\n  \n  <ion-refresher (ionRefresh)="doRefresh($event)">\n    <ion-refresher-content refreshingSpinner="dots">\n        </ion-refresher-content>\n  </ion-refresher>  \n\n  <ion-item *ngFor="let g of societa">\n\n    \n    \n    <b>{{g.doc.nome}}</b>\n   \n    </ion-item>\n\n</ion-content>\n'/*ion-inline-end:"/Users/demetriomortelliti/Desktop/demy/PROJECTS/appkwondo/clients/ion2kwondo/src/pages/societa/societa.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */], __WEBPACK_IMPORTED_MODULE_2__providers_backend_backend__["a" /* BackendProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */]])
], SocietaPage);

//# sourceMappingURL=societa.js.map

/***/ }),

/***/ 559:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StatsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_backend_backend__ = __webpack_require__(6);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the StatsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var StatsPage = (function () {
    function StatsPage(events, alertCtrl, backend, navCtrl, navParams) {
        this.events = events;
        this.alertCtrl = alertCtrl;
        this.backend = backend;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.sortranking = "ptb";
        this.ranking = [];
        this.loading = false;
        this.tipostat = "ranking";
        this.displayedranking = [];
        this.filter = "";
        this.stagione = "2017";
    }
    StatsPage.prototype.getCategoria = function (a) {
        var atl = this.backend.getAtletaById(a.atletaid);
        var cat = this.backend.getCategoria(atl.datanascita);
        return cat.toUpperCase();
    };
    StatsPage.prototype.getPos = function (i) {
        var x = parseInt(i, 10) + 1;
        return x;
    };
    StatsPage.prototype.changeFilter = function (ev) {
        var questo = this;
        questo.loading = true;
        questo.refresh(function () {
            questo.loading = false;
        });
    };
    StatsPage.prototype.refresh = function (callback) {
        var questo = this;
        var stagione = questo.stagione;
        this.backend.getRankingNew(stagione, function (data) {
            console.log("got ranking", data);
            data.sort(function (a, b) {
                //var a1=a.doc[questo.sortranking];
                //var b1=b.doc[questo.sortranking];
                var a1 = a.pt;
                var b1 = b.pt;
                //var b1=b.doc[questo.sortranking];
                if (a1 > b1)
                    return -1;
                if (a1 < b1)
                    return 1;
                return 0;
            });
            data.forEach(function (item, idx) {
                var atl = questo.backend.getAtletaById(item.atletaid);
                var cat = questo.backend.getCategoria(atl.datanascita);
                item.categoria = cat;
            });
            questo.ranking = data;
            var rank = [];
            if (questo.filter.trim() == "") {
                rank = data;
            }
            else {
                data.forEach(function (item, idx) {
                    if (item.categoria.toLowerCase() == questo.filter.toLowerCase())
                        rank.push(item);
                });
            }
            questo.displayedranking = rank;
            console.log("displayedranking", questo.displayedranking);
            if (callback)
                callback(data);
        });
    };
    StatsPage.prototype.doRefresh = function (refresher) {
        console.log('Begin async operation', refresher);
        var questo = this;
        questo.refresh(function (data) {
            //console.log("allnews", data);
            refresher.complete();
        });
    };
    StatsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad StatsPage');
        var questo = this;
        questo.loading = true;
        var d = new Date();
        var y = d.getFullYear();
        this.stagione = String(y);
        this.refresh(function (data) {
            questo.loading = false;
        });
    };
    StatsPage.prototype.sortStats = function () {
        var questo = this;
        var prompt = this.alertCtrl.create({
            title: 'Ordina per',
            message: 'Scegli tipo di ordinamento',
            inputs: [
                {
                    type: 'radio',
                    label: 'Classifica generale (con bonusmalus)',
                    value: 'ptb'
                },
                {
                    type: 'radio',
                    label: 'Classifica generale (senza bonusmalus)',
                    value: 'pt'
                },
                {
                    type: 'radio',
                    label: 'ORI',
                    value: 'oro'
                },
                {
                    type: 'radio',
                    label: 'ARGENTI',
                    value: 'arg'
                },
                {
                    type: 'radio',
                    label: 'BRONZI',
                    value: 'bro'
                },
                {
                    type: 'radio',
                    label: 'GARE DISPUTATE',
                    value: 'garedisputate'
                },
                {
                    type: 'radio',
                    label: 'MATCH DISPUTATI',
                    value: 'disputati'
                },
                {
                    type: 'radio',
                    label: 'MATCH VINTI',
                    value: 'vinti'
                }
            ],
            buttons: [
                {
                    text: "Annulla",
                    handler: function (data) {
                        console.log("cancel clicked");
                    }
                },
                {
                    text: "OK",
                    handler: function (data) {
                        console.log("search clicked", data);
                        questo.sortranking = data;
                        questo.loading = true;
                        questo.refresh(function (data) {
                            questo.loading = false;
                        });
                    }
                }
            ]
        });
        prompt.present(questo.backend.alertAnimationOptions);
    };
    StatsPage.prototype.ionViewWillEnter = function () {
        var questo = this;
        this.events.subscribe("hwbackbutton", function (data) {
            console.log("hwbackbutton in gare.ts");
            questo.navCtrl.pop();
        });
    };
    StatsPage.prototype.ionViewWillLeave = function () {
        this.events.unsubscribe("hwbackbutton");
    };
    StatsPage.prototype.getGareDisputate = function (r) {
        var retvalue = r.gare.length;
        return retvalue;
    };
    return StatsPage;
}());
StatsPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-stats',template:/*ion-inline-start:"/Users/demetriomortelliti/Desktop/demy/PROJECTS/appkwondo/clients/ion2kwondo/src/pages/stats/stats.html"*/'<!--\n  Generated template for the StatsPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Statistiche</ion-title>\n    <ion-buttons end>\n      <button  ion-button style="font-size: 18px" (tap)="sortStats()">\n          <ion-icon name="md-funnel"></ion-icon>\n  \n        </button>\n    </ion-buttons>\n   \n  </ion-navbar>\n  <!--<ion-toolbar>\n    <ion-segment [(ngModel)]="tipostat">\n      <ion-segment-button value="ranking">\n        Ranking\n      </ion-segment-button>\n      <ion-segment-button value="altro">\n        Altro\n      </ion-segment-button>\n    </ion-segment>\n  </ion-toolbar>-->\n  <ion-grid>\n    <ion-row class="filters">\n      <ion-col>\n        <ion-item>\n          <ion-label>Categoria</ion-label>\n          <ion-select (ionChange)="changeFilter($event)" [(ngModel)]="filter">\n            <ion-option value="">Tutte</ion-option>\n            <ion-option value="esordienti">Esordienti</ion-option>\n            <ion-option value="cadetti b">Cadetti B</ion-option>\n            <ion-option value="cadetti a">Cadetti A</ion-option>\n            <ion-option value="junior">Junior</ion-option>\n            <ion-option value="senior">Senior</ion-option>\n          </ion-select>\n        </ion-item>\n      </ion-col>\n      <ion-col>\n        <ion-item>\n          <ion-label>Stagione</ion-label>\n          <ion-select  (ionChange)="changeFilter($event)" [(ngModel)]="stagione">\n            <ion-option value="2015">2015/2016</ion-option>\n            <ion-option value="2016">2016/2017</ion-option>\n            <ion-option value="2017">2017/2018</ion-option>\n            <ion-option value="2018">2018/2019</ion-option>\n            <ion-option value="2019">2019/2020</ion-option>\n            <ion-option value="2020">2020/2021</ion-option>\n          </ion-select>\n        </ion-item>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n  \n   \n\n</ion-header>\n\n\n<ion-content nopadding>\n   <ion-refresher (ionRefresh)="doRefresh($event)">\n    <ion-refresher-content refreshingSpinner="dots">\n        </ion-refresher-content>\n  </ion-refresher>  \n      <div *ngIf="loading" style="text-align: center"><ion-spinner name="dots"></ion-spinner></div>\n\n\n  <section *ngIf="tipostat==\'ranking\'">    \n  <div style="text-align: center; font-style: italic" >Ordinamento: {{sortranking.toUpperCase()}}</div>\n  <ion-item *ngFor="let r of displayedranking; let i=index;">\n<ion-row [ngClass]="i<3 ? \'top3\' : \'\'">\n  <ion-col col-2>\n    {{getPos(i)}}\n    </ion-col>\n    <ion-col>\n      {{r.cognome}} {{r.nome}}\n    </ion-col>\n    <ion-col col-2>\n      {{r.ptb}}\n      </ion-col>\n      </ion-row>\n      <ion-row>\n        <ion-col col-2></ion-col>\n        <ion-col col-10>\n          <span class="categoria">{{getCategoria(r)}}</span>\n        </ion-col>\n      </ion-row>\n    <ion-row>\n      <ion-col col-2></ion-col>\n      <ion-col class="subriga" col-10>ORI: {{r.oro}} ARG: {{r.arg}} BRO: {{r.bro}}</ion-col>\n    </ion-row>\n    <ion-row>\n      <ion-col col-2></ion-col>\n      <ion-col class="subriga" col-10>Gare: {{getGareDisputate(r)}} (R:{{r.gare_regionali}}, IR:{{r.gare_interregionali}}, N:{{r.gare_nazionali}}, IN:{{r.gare_internazionali}}) </ion-col>\n    </ion-row>\n    <ion-row>\n      <ion-col col-2></ion-col>\n      <ion-col class="subriga" col-10>\n          match: {{r.disputati}} vinti: {{r.vinti}} punti: {{r.pt}} bm: {{r.bonusmalus}}\n      </ion-col>\n    </ion-row>\n    </ion-item>\n  </section>\n\n</ion-content>\n  <ion-footer>\n    <!--<button ion-button full icon-start (tap)="sortStats()"><ion-icon name="md-funnel"></ion-icon>Ordina</button>-->\n\n\n\n  </ion-footer>\n'/*ion-inline-end:"/Users/demetriomortelliti/Desktop/demy/PROJECTS/appkwondo/clients/ion2kwondo/src/pages/stats/stats.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_2__providers_backend_backend__["a" /* BackendProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */]])
], StatsPage);

//# sourceMappingURL=stats.js.map

/***/ }),

/***/ 56:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_home__ = __webpack_require__(136);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__chat_chat__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_socket_service_socket_service__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_backend_backend__ = __webpack_require__(6);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/*import { ContactPage } from '../contact/contact';
import { ContactsPage } from '../contacts/contacts';
import { TwitterPage } from '../twitter/twitter';
import { BpPage } from '../bp/bp';
import { PartnerworldPage } from '../partnerworld/partnerworld';
import { LinkedinPage } from '../linkedin/linkedin';*/


//import { ScrollableTabs } from '../../components/scrollable-tabs/scrollable-tabs';
var TabsPage = (function () {
    function TabsPage(menuCtrl, navCtrl, backend, socket, events, nav, platform) {
        var _this = this;
        this.menuCtrl = menuCtrl;
        this.navCtrl = navCtrl;
        this.backend = backend;
        this.socket = socket;
        this.events = events;
        this.nav = nav;
        this.platform = platform;
        this.homepage = __WEBPACK_IMPORTED_MODULE_2__home_home__["a" /* HomePage */];
        this.chatpage = __WEBPACK_IMPORTED_MODULE_3__chat_chat__["a" /* ChatPage */];
        this.unread = this.socket.totalunreadcount;
        this.activeTab = 0;
        this.realtimeEvents = false;
        this.showrtbutton = false;
        var questo = this;
        //this.socket.socketService.subscribe(event => {
        events.subscribe("switchtocontacts", function (t) {
            questo.activeTab = 2;
        });
        events.subscribe('updatetotalunreadcount', function (msg, time) {
            console.log('message updatetotalunreadcount received from server in tab.ts... ');
            console.log("habemus messaggio in tabs.ts");
            var unr = _this.socket.getAllUnreadMessages().length;
            _this.unread = _this.socket.totalunreadcount;
            //this.unread = unr;
            //this.unread
        });
        events.subscribe('realtimematches', function (rtmatches) {
            console.log("realtimematches event", rtmatches);
            if (rtmatches.matches.length > 0) {
                questo.realtimeEvents = true;
                questo.showrtbutton = true;
            }
            else {
                questo.realtimeEvents = false;
                questo.showrtbutton = false;
            }
            //this.isChatPage = false;
        });
        events.subscribe("updategara", function (msg, time) {
            console.log("refreshgara in tabs.ts !!");
            questo.backend.getRtMatches(function (data) {
                if (data.length > 0) {
                    questo.realtimeEvents = true;
                    questo.showrtbutton = true;
                }
                else {
                    questo.realtimeEvents = false;
                    questo.showrtbutton = false;
                }
            });
        });
        questo.backend.getRtMatches(function (data) {
            console.log("got rtmatches in tabs.ts", data);
            if (data.length > 0) {
                questo.realtimeEvents = true;
            }
            else {
                questo.realtimeEvents = false;
            }
        });
    }
    TabsPage.prototype.setUnread = function (n) {
        this.unread = n;
    };
    TabsPage.prototype.ionViewWillEnter = function () {
        var questo = this;
        console.log("entering tabs.ts");
        this.menuCtrl.enable(true);
        //questo.backend.setBackButtonAction(questo.navBar, questo.nav);
    };
    TabsPage.prototype.tappedTab = function () {
        //console.log("tappedTab");
        this.backend.playFeedback();
    };
    TabsPage.prototype.gotoChat = function () {
        console.log("gotochat");
        var questo = this;
        questo.mytabs.select(1);
    };
    return TabsPage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* Navbar */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* Navbar */])
], TabsPage.prototype, "navBar", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])("mytabs"),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* Tabs */])
], TabsPage.prototype, "mytabs", void 0);
TabsPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"/Users/demetriomortelliti/Desktop/demy/PROJECTS/appkwondo/clients/ion2kwondo/src/pages/tabs/tabs.html"*/'<ion-tabs #mytabs   (tap)="tappedTab()" [selectedIndex]="activeTab" tabsPlacement="bottom"   >\n  <ion-tab [root]="homepage" tabTitle="AppKwonDo" tabIcon="home"></ion-tab>\n  <!--<ion-tab [root]="partnerworld" tabTitle="PartnerWorld" tabIcon="md-globe" ></ion-tab>\n  <ion-tab [root]="linkedin" tabTitle="LinkedIn" tabIcon="logo-linkedin" ></ion-tab>-->\n  <!--<ion-tab tabBadge="{{backend.unread>0 ? backend.unread : \'\'}}" tabBadgeStyle="{{backend.unread>0 ? \'danger\' : \'\'}}"  [root]="chatvspage" tabTitle="ChatVSKwonDo" tabIcon="md-chatboxes" ></ion-tab>-->\n  <ion-tab tabBadge="{{backend.unread>0 ? backend.unread : \'\'}}" tabBadgeStyle="{{backend.unread>0 ? \'danger\' : \'\'}}"  [root]="chatpage" tabTitle="ChatKwonDo" tabIcon="md-chatboxes" ></ion-tab>\n<!-- <ion-tab [root]="bppage" tabTitle="BP" tabIcon="md-contacts"></ion-tab>\n\n  <ion-tab [root]="twitter" tabTitle="Twitter" tabIcon="logo-twitter" ></ion-tab>\n  <ion-tab [root]="contacts" tabTitle="Contacts" tabIcon="md-chatboxes" ></ion-tab>\n <!-- <ion-tab [root]="tab2Root" tabTitle="About" tabIcon="information-circle"></ion-tab>\n  <ion-tab [root]="tab3Root" tabTitle="Contact" tabIcon="contacts"></ion-tab>\n  <ion-tab [root]="tab4Root" tabTitle="Logout" tabIcon="ios-exit-outline"></ion-tab>-->\n</ion-tabs>\n\n<!--\n<ion-fab right bottom *ngIf="realtimeEvents" (tap)="gotoChat()">\n    <button color="primary" ion-fab style="font-size: 11px; background: transparent;"><img src="assets/img/greenblink.gif"/></button>\n  </ion-fab>\n-->\n\n  <img *ngIf="realtimeEvents"  (tap)="gotoChat()" class="realtimeimg" src="assets/img/greenblink.gif"/>'/*ion-inline-end:"/Users/demetriomortelliti/Desktop/demy/PROJECTS/appkwondo/clients/ion2kwondo/src/pages/tabs/tabs.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* MenuController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_5__providers_backend_backend__["a" /* BackendProvider */], __WEBPACK_IMPORTED_MODULE_4__providers_socket_service_socket_service__["a" /* SocketService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Nav */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* Platform */]])
], TabsPage);

//# sourceMappingURL=tabs.js.map

/***/ }),

/***/ 560:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FacebookProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_backend_backend__ = __webpack_require__(6);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/*
  Generated class for the FacebookProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
var FacebookProvider = (function () {
    function FacebookProvider(backend, http) {
        this.backend = backend;
        this.http = http;
        this.accessToken = '529fcc9e16343c272347f83c8d6a9cf4';
        this.graphUrl = 'https://graph.facebook.com/';
        this.graphQuery = "?access_token=" + this.accessToken + "&date_format=U&fields=posts{from,created_time,message,attachments}";
    }
    FacebookProvider.prototype.getPosts = function (pageName, callback) {
        var url = this.graphUrl + pageName + this.graphQuery;
        this.backend.fetchData(url, function (data) {
            callback(data);
        });
    };
    return FacebookProvider;
}());
FacebookProvider = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__providers_backend_backend__["a" /* BackendProvider */], __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */]])
], FacebookProvider);

//# sourceMappingURL=facebook.js.map

/***/ }),

/***/ 561:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProductsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_backend_backend__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_utils_utils__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_cart_cart__ = __webpack_require__(562);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__editproduct_editproduct__ = __webpack_require__(563);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/**
 * Generated class for the ProductsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var ProductsPage = (function () {
    function ProductsPage(utils, modalCtrl, toastCtrl, alertCtrl, backend, events, navCtrl, navParams) {
        this.utils = utils;
        this.modalCtrl = modalCtrl;
        this.toastCtrl = toastCtrl;
        this.alertCtrl = alertCtrl;
        this.backend = backend;
        this.events = events;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.categoria = "";
        this.numero = "4";
        this.loading = false;
        this.filter = "";
        this.displayedproducts = [];
        this.products = [];
        this.products_old = [
            {
                id: "001",
                categoria: "minimarket",
                price: "50",
                nome: "Pelle di leopardo",
                descr: "Eccezionale pelle di leopardo, per far ruggire i tuoi momenti di relax !",
                imageurl: "https://www.strangethings.it/wp-content/uploads/2016/08/Tappeto-di-pelo-di-leopardo-200-cm-x-120-cm-Tappetino-scendi-letto-di-BRUBAKER-0-420x268.jpg"
            },
            {
                id: "002",
                categoria: "minimarket",
                price: "25",
                nome: "Clava in osso",
                descr: "Vuoi rivivere le gesta degli uomini primitivi ? Questa favolosa clava in osso di mammuth fa al caso tuo !",
                imageurl: "https://images-na.ssl-images-amazon.com/images/I/41E7kZM1n-L.jpg"
            },
            {
                id: "003",
                categoria: "minimarket",
                price: "18",
                nome: "Canna da pesca per sgombri",
                descr: "Frustrato perchè peschi di tutto ma gli sgombri sono territorio vietato per te ? Riprova con la canna da pesca per sgombri, e vedrai che la vita tornerà a sorriderti",
                imageurl: "https://www.decathlon.it/media/835/8350211/big_7990b70ebaba45cd8b6ab7b022df7b12.jpg"
            },
            {
                id: "004",
                categoria: "minimarket",
                nome: "Sapone per brufoli",
                price: "4",
                descr: "Quel brufolo stamani ti ha rabbuiato la giornata ? Spazzalo via con l'apposito sapone, che restituisce alla tua pelle il color del sole, cioè giallo !",
                imageurl: "http://brufoli.biz/images/sampledata/topexan%20detergente.jpg"
            }
        ];
        this.categoria = this.navParams.get("categoria");
        console.log("SHOWING categoria", this.categoria);
    }
    ProductsPage.prototype.onInput = function (ev) {
        console.log("onInput", ev);
        this.filterProducts();
    };
    ProductsPage.prototype.onCancel = function (ev) {
        console.log("onCancel", ev);
        this.filterProducts();
    };
    ProductsPage.prototype.filterProducts = function () {
        var questo = this;
        if (questo.filter.trim() == "") {
            questo.displayedproducts = questo.products;
        }
        else {
            var prods = [];
            questo.products.forEach(function (item, idx) {
                if (item.nome.toLowerCase().indexOf(questo.filter.toLowerCase()) > -1)
                    prods.push(item);
            });
            questo.displayedproducts = prods;
        }
    };
    ProductsPage.prototype.ionViewDidLoad = function () {
        var questo = this;
        console.log('ionViewDidLoad ProductsPage');
        questo.refresh(function () {
        });
    };
    ProductsPage.prototype.refresh = function (callback) {
        var questo = this;
        var url = questo.backend.rooturl + "/minimarket/list";
        questo.loading = true;
        questo.backend.fetchData(url, function (data) {
            var products = [];
            data.rows.forEach(function (item, idx) {
                if (item.categoria == questo.categoria)
                    products.push(item);
            });
            questo.products = products;
            console.log("questo.products", questo.products);
            questo.filterProducts();
            questo.loading = false;
            if (callback)
                callback();
        });
    };
    ProductsPage.prototype.ionViewWillEnter = function () {
        var questo = this;
        this.events.subscribe("hwbackbutton", function (data) {
            console.log("hwbackbutton in servizisocieta.ts");
            questo.navCtrl.pop();
        });
    };
    ProductsPage.prototype.ionViewWillLeave = function () {
        this.events.unsubscribe("hwbackbutton");
    };
    ProductsPage.prototype.viewCart = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__pages_cart_cart__["a" /* CartPage */]);
    };
    ProductsPage.prototype.addToCart = function (p) {
        var questo = this;
        console.log("addtocart", p);
        var elid = p.id + "_qty";
        //var n=document.getElementById(elid).getElementsByTagName('input')[0];
        var n = document.getElementById(elid);
        //console.log(n);
        var qty = parseInt(n.value, 10);
        //console.log("qty",n.value);
        //search for product in cart to see if it already exists
        var found = false;
        questo.backend.cart.forEach(function (item, idx) {
            if (item.product.id == p.id) {
                found = true;
                var q = parseInt(item.qty, 10);
                q += qty;
                item.qty = q;
            }
        });
        //add it if not found in cart
        if (!found) {
            var newcartprod = {
                product: p,
                qty: qty
            };
            questo.backend.cart.push(newcartprod);
        }
        var toast = questo.toastCtrl.create({
            message: "Hai aggiunto " + qty + " " + p.nome + " al tuo carrello prenotazioni",
            position: "top",
            duration: 2200
        });
        toast.present();
        n.value = "1";
        questo.utils.setJsonStorage("ion2kwondo_" + questo.backend.user.id + "_mcrt", questo.backend.cart);
        if (true)
            return;
        var alrt = questo.alertCtrl.create({
            title: 'Aggiunto con successo !',
            subTitle: "Hai aggiunto " + qty + " " + p.nome + " al tuo carrello prenotazioni",
            buttons: ['Chiudi']
        });
        alrt.present();
    };
    ProductsPage.prototype.getCartTotal = function () {
        var total = 0;
        var questo = this;
        questo.backend.cart.forEach(function (item, idx) {
            total += parseInt(item.qty, 10);
        });
        return total;
    };
    ProductsPage.prototype.changeQty = function (ev) {
        console.log("changeQty", ev.value);
        if (ev.value.trim() == "")
            ev.value = "1";
    };
    ProductsPage.prototype.qtyMinus = function (p) {
        var questo = this;
        var elid = p.id + "_qty";
        //var n=document.getElementById(elid).getElementsByTagName('input')[0];
        var n = document.getElementById(elid);
        //console.log(n);
        var qty = parseInt(n.value, 10);
        qty--;
        if (qty < 1)
            qty = 1;
        //document.getElementById(elid).getElementsByTagName('input')[0].value=String(qty);
        n.value = String(qty);
    };
    ProductsPage.prototype.qtyPlus = function (p) {
        var questo = this;
        var elid = p.id + "_qty";
        //var n=document.getElementById(elid).getElementsByTagName('input')[0];
        var n = document.getElementById(elid);
        //console.log(n);
        var qty = parseInt(n.value, 10);
        qty++;
        //document.getElementById(elid).getElementsByTagName('input')[0].value=String(qty);
        n.value = String(qty);
    };
    ProductsPage.prototype.isMarketAdmin = function () {
        var questo = this;
        var isadmin = false;
        if (questo.backend.user.role == 'tkdradmin')
            isadmin = true;
        if (questo.backend.user.role == 'marketadmin')
            isadmin = true;
        return isadmin;
    };
    ProductsPage.prototype.addProduct = function () {
        var questo = this;
        var profileModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_5__editproduct_editproduct__["a" /* EditproductPage */], { mode: "insert" });
        profileModal.onDidDismiss(function (data) {
            console.log(data);
            if (data == "saved") {
                var toast = questo.toastCtrl.create({
                    message: "Prodotto aggiunto !",
                    position: "top",
                    duration: 2200
                });
                toast.present();
                questo.refresh();
            }
        });
        profileModal.present();
    };
    ProductsPage.prototype.getUpperCase = function (f) {
        return f.toUpperCase();
    };
    ProductsPage.prototype.editProduct = function (item) {
        var questo = this;
        if (!this.isMarketAdmin())
            return;
        var profileModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_5__editproduct_editproduct__["a" /* EditproductPage */], { mode: "edit", product: item });
        profileModal.onDidDismiss(function (data) {
            console.log(data);
            if ((data == "saved") || (data == "deleted")) {
                var msg = "aggiornato";
                if (data == "deleted")
                    msg = "eliminato";
                var toast = questo.toastCtrl.create({
                    message: "Prodotto " + msg + " !",
                    position: "top",
                    duration: 2200
                });
                toast.present();
                questo.refresh();
            }
        });
        profileModal.present();
    };
    return ProductsPage;
}());
ProductsPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-products',template:/*ion-inline-start:"/Users/demetriomortelliti/Desktop/demy/PROJECTS/appkwondo/clients/ion2kwondo/src/pages/products/products.html"*/'<!--\n  Generated template for the ProductsPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Prenota {{categoria}}</ion-title>\n    <ion-buttons end>\n        <button *ngIf="isMarketAdmin()" (tap)="addProduct()" ion-button icon-only>\n            <ion-icon name="ios-add-circle-outline"></ion-icon>\n          </button>\n      <button ion-button (tap)="viewCart()" clear><ion-icon name="md-cart" class="baricon"></ion-icon><ion-badge *ngIf="getCartTotal()>0" color="danger">{{getCartTotal()}}</ion-badge></button>\n    </ion-buttons>\n  </ion-navbar>\n <ion-searchbar\n  placeholder="Filtra prodotti"\n  [(ngModel)]="filter"\n  [showCancelButton]="true"\n  (ionInput)="onInput($event)"\n  (ionCancel)="onCancel($event)">\n</ion-searchbar>\n\n</ion-header>\n\n\n<ion-content padding class="ion-content">\n    <div *ngIf="loading" style="width: 100%; text-align: center">\n        <ion-spinner name="ios"></ion-spinner>\n      </div>\n      <ion-card *ngIf="displayedproducts.length==0">\n        <ion-card-content>\n          Non sono stati trovati prodotti per la categoria {{getUpperCase(categoria)}}\n        </ion-card-content>\n      </ion-card>\n <div style="height:100%;">\n  <ion-list [virtualScroll]="displayedproducts" approxItemHeight="50px">\n    <ion-item *virtualItem="let item" (press)="editProduct(item)" >\n        <ion-row>\n            <!--<ion-col col-3>\n           <img class="productimage" [src]="p.imgurl" />\n            </ion-col>\n            <ion-col>\n  \n            </ion-col>-->\n            <ion-col >\n              <ion-row>\n                <ion-col align-self-start>\n                    <span class="nome">{{item.nome}}</span>\n  \n                </ion-col>\n              </ion-row>\n              <ion-row>\n                  <ion-col align-self-start>\n                     <span class="descr">{{item.descr}}</span>\n    \n                  </ion-col>\n                </ion-row>\n             \n            </ion-col>\n          </ion-row>\n       \n       <hr>\n          <ion-row>\n            <ion-col col-5>\n              <span class="price">{{item.price}}€</span>\n  \n            </ion-col>\n            \n            <ion-col col-1>\n             \n              <ion-icon class="bariconbig" (tap)="qtyMinus(item)" small name="md-arrow-dropleft"></ion-icon>\n              </ion-col>\n              <ion-col col-2>\n                <input type="number" class="inp" size="3" readonly [id]="item.id+\'_qty\'"  value="1"/>\n               \n              <!--<ion-input readonly (ionChange)=\'changeQty($event)\' [id]="item.id+\'_qty\'" type="number" min="1" max="100" step="1" value="1"></ion-input>-->\n            </ion-col>\n            <ion-col col-1>\n              <ion-icon class="bariconbig" (tap)="qtyPlus(item)" small name="md-arrow-dropright"></ion-icon>\n  \n            </ion-col>\n            <ion-col col-3>\n              <button (tap)="addToCart(item)" ion-button small>Prenota</button>\n            </ion-col>\n          </ion-row>\n        \n    </ion-item>\n  </ion-list>\n</div>\n\n<!--\n  <ion-list *ngFor="let p of displayedproducts"> \n\n    <ion-card >\n      <ion-card-content>\n        <ion-row>\n        <ion-col col-3>\n            <img class="productimage" [src]="p.imageurl" />\n          </ion-col>-->\n          <!--<ion-col>\n\n          </ion-col>\n          <ion-col  >\n            <ion-row>\n              <ion-col align-self-start>\n                  <b>{{p.nome}}</b>\n\n              </ion-col>\n            </ion-row>\n            <ion-row>\n                <ion-col align-self-start>\n                    {{p.descr}}\n  \n                </ion-col>\n              </ion-row>\n           \n          </ion-col>\n        </ion-row>\n     \n     <hr>\n        <ion-row>\n          <ion-col>\n            <span class="price">{{p.price}}€</span>\n\n          </ion-col>\n          \n          <ion-col col-1>\n           \n            <ion-icon class="bariconbig" (tap)="qtyMinus(p)" small name="md-arrow-dropleft"></ion-icon>\n            </ion-col>\n            <ion-col col-2>\n            <ion-input readonly (ionChange)=\'changeQty($event)\' [id]="p.id+\'_qty\'" type="number" min="1" max="100" step="1" value="1"></ion-input>\n          </ion-col>\n          <ion-col col-1>\n            <ion-icon class="bariconbig" (tap)="qtyPlus(p)" small name="md-arrow-dropright"></ion-icon>\n\n          </ion-col>\n          <ion-col col-3>\n            <button (tap)="addToCart(p)" ion-button small>Prenota</button>\n          </ion-col>\n        </ion-row>\n      \n    </ion-card-content>\n    </ion-card>\n\n\n  </ion-list>-->\n\n</ion-content>\n'/*ion-inline-end:"/Users/demetriomortelliti/Desktop/demy/PROJECTS/appkwondo/clients/ion2kwondo/src/pages/products/products.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__providers_utils_utils__["a" /* UtilsProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ModalController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["t" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_2__providers_backend_backend__["a" /* BackendProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */]])
], ProductsPage);

//# sourceMappingURL=products.js.map

/***/ }),

/***/ 562:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CartPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_backend_backend__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_utils_utils__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_moment__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the CartPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var CartPage = (function () {
    function CartPage(utils, toastCtrl, alertCtrl, events, backend, navCtrl, navParams) {
        this.utils = utils;
        this.toastCtrl = toastCtrl;
        this.alertCtrl = alertCtrl;
        this.events = events;
        this.backend = backend;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    CartPage.prototype.ionViewWillEnter = function () {
        var questo = this;
        this.events.subscribe("hwbackbutton", function (data) {
            console.log("hwbackbutton in servizisocieta.ts");
            questo.navCtrl.pop();
        });
    };
    CartPage.prototype.ionViewWillLeave = function () {
        this.events.unsubscribe("hwbackbutton");
    };
    CartPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CartPage');
    };
    CartPage.prototype.confirmOrder = function () {
        var questo = this;
        var confirm = this.alertCtrl.create({
            title: 'Vuoi confermare la tua prenotazione ?',
            message: 'Potrai passare in società per il pagamento ed il ritiro',
            buttons: [
                {
                    text: 'Conferma',
                    handler: function () {
                        console.log('Disagree clicked');
                        var d = new Date();
                        var mom = __WEBPACK_IMPORTED_MODULE_4_moment__(d).format("YYYYMMDDHHmmssSSS");
                        var cart = {
                            email: questo.backend.user.email,
                            nick: questo.backend.user.nickname,
                            cart: questo.backend.cart,
                            stato: "inoltrato",
                            id: ""
                        };
                        cart.id = mom;
                        var url = questo.backend.rooturl + "/minimarket/addorder";
                        var postdata = cart;
                        questo.backend.postData(url, postdata, function (pdata) {
                            var toast = questo.toastCtrl.create({
                                message: "Hai inoltrato correttamente la tua prenotazione. Puoi passare in società per il pagamento e ritiro",
                                position: "top",
                                duration: 2200
                            });
                            toast.present();
                            questo.backend.cart = [];
                            questo.utils.setJsonStorage("ion2kwondo_" + questo.backend.user.id + "_mcrt", questo.backend.cart);
                        });
                    }
                },
                {
                    text: 'Annulla',
                    handler: function () {
                        console.log('Agree clicked');
                    }
                }
            ]
        });
        confirm.present();
    };
    CartPage.prototype.getTotalPrice = function () {
        console.log("cart", this.backend.cart);
        var questo = this;
        var tot = 0;
        questo.backend.cart.forEach(function (item, idx) {
            tot += parseFloat(item.product.price) * item.qty;
        });
        var ttot = tot.toFixed(2);
        return ttot;
    };
    CartPage.prototype.getTotaleRiga = function (c) {
        console.log("cart", this.backend.cart);
        var questo = this;
        var tot = 0;
        tot = parseFloat(c.product.price) * c.qty;
        var ttot = tot.toFixed(2);
        return ttot;
    };
    CartPage.prototype.qtyMinus = function (p) {
        var questo = this;
        var qty = p.qty;
        qty--;
        if (qty < 0)
            qty = 0;
        p.qty = qty;
        if (qty == 0) {
            var alrt = questo.alertCtrl.create({
                title: 'Conferma eliminazione prodotto',
                message: "Impostando una quantità uguale a 0 eliminerà il prodotto dal tuo carrello. E' questo quello che realmente vuoi fare ?",
                buttons: [
                    {
                        text: 'Annulla',
                        role: 'cancel',
                        handler: function () {
                            console.log('Cancel clicked');
                            p.qty = 1;
                        }
                    },
                    {
                        text: 'Si, elimina il prodotto',
                        handler: function () {
                            console.log('Buy clicked');
                            p.qty = 0;
                            questo.backend.cart.forEach(function (item, idx) {
                                console.log(item);
                                if (item.qty == 0)
                                    questo.backend.cart.splice(idx, 1);
                            });
                            questo.utils.setJsonStorage("ion2kwondo_" + questo.backend.user.id + "_mcrt", questo.backend.cart);
                        }
                    }
                ]
            });
            alrt.present();
        }
        else {
            p.qty = qty;
            questo.utils.setJsonStorage("ion2kwondo_" + questo.backend.user.id + "_mcrt", questo.backend.cart);
        }
        //document.getElementById(elid).getElementsByTagName('input')[0].value=String(qty);
    };
    CartPage.prototype.qtyPlus = function (p) {
        var questo = this;
        var qty = p.qty;
        qty++;
        //document.getElementById(elid).getElementsByTagName('input')[0].value=String(qty);
        p.qty = qty;
        questo.utils.setJsonStorage("ion2kwondo_" + questo.backend.user.id + "_mcrt", questo.backend.cart);
    };
    return CartPage;
}());
CartPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-cart',template:/*ion-inline-start:"/Users/demetriomortelliti/Desktop/demy/PROJECTS/appkwondo/clients/ion2kwondo/src/pages/cart/cart2.html"*/'<!--\n  Generated template for the CartPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Prenotazioni</ion-title>\n  </ion-navbar>\n\n\n</ion-header>\n\n\n<ion-content spadding class="ion-content">\n  <section *ngIf="backend.cart.length>0">\n  <ion-card>\n    <ion-card-content>\n      Il contenuto del tuo carrello prenotazioni. Per inoltrare la prenotazione premi il tasto <b>Inoltra prenotazione</b>.<br>\n      Potrai pagare comodamente in società.\n    </ion-card-content>\n  </ion-card>\n\n\n  <ion-list *ngFor="let c of backend.cart" style="margin: 2px">\n   <ion-item>\n          <ion-row>\n           <!-- <ion-col col-3>\n              <img class="productimage" [src]="c.product.imageurl" />\n            </ion-col>-->\n            <ion-col align-self-start>\n              <ion-row>\n                <ion-col align-self-start>\n                    <b>{{c.product.nome}}</b>\n                </ion-col>\n              </ion-row>\n              <ion-row style="margin: 7px">\n                <ion-col col-2>\n                  {{c.product.price}}€\n                  </ion-col>\n                  <ion-col col-7>\n                  <ion-row>\n                  <ion-col col-1>\n                    \n                     <ion-icon class="bariconbig" (tap)="qtyMinus(c)" small name="md-arrow-dropleft"></ion-icon>\n                     </ion-col>\n                     <ion-col col-2>\n                       <input type="number" [(ngModel)]="c.qty" class="inp" size="3" readonly [id]="c.product.id+\'_qty\'"  value="1"/>\n                      \n                     <!--<ion-input readonly (ionChange)=\'changeQty($event)\' [id]="item.id+\'_qty\'" type="number" min="1" max="100" step="1" value="1"></ion-input>-->\n                   </ion-col>\n                   <ion-col col-1>\n                     <ion-icon class="bariconbig" (tap)="qtyPlus(c)" small name="md-arrow-dropright"></ion-icon>\n         \n                   </ion-col>\n                   <ion-col col-8></ion-col>\n                  </ion-row>\n                </ion-col>\n                <ion-col col-3>\n                  <b>{{getTotaleRiga(c)}}€</b>\n                </ion-col>\n              </ion-row>\n               \n  \n            </ion-col>\n          \n              \n          </ion-row>\n       \n        </ion-item>\n    </ion-list>\n    <hr>\n   <ion-item>\n        <ion-row>\n          <ion-col col-3></ion-col>\n          <ion-col>\n              <span class="totale">Totale prenotazione:    </span>\n          </ion-col>\n          <ion-col col-3>\n            <span class="totale"><b>{{getTotalPrice()}}€</b></span>\n          </ion-col>\n        </ion-row>\n   </ion-item>\n   <hr>\n    <button ion-button block (tap)="confirmOrder()">Inoltra prenotazione</button>\n  </section>\n  <section *ngIf="backend.cart.length==0">\n    <ion-card>\n      <ion-card-content>\n        Il tuo carrello prenotazioni è vuoto\n      </ion-card-content>\n    </ion-card>\n  </section>\n</ion-content>\n'/*ion-inline-end:"/Users/demetriomortelliti/Desktop/demy/PROJECTS/appkwondo/clients/ion2kwondo/src/pages/cart/cart2.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__providers_utils_utils__["a" /* UtilsProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["t" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */], __WEBPACK_IMPORTED_MODULE_2__providers_backend_backend__["a" /* BackendProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */]])
], CartPage);

//# sourceMappingURL=cart.js.map

/***/ }),

/***/ 563:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EditproductPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_backend_backend__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_moment__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the EditproductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var EditproductPage = (function () {
    function EditproductPage(alertCtrl, viewCtrl, backend, events, navCtrl, navParams) {
        this.alertCtrl = alertCtrl;
        this.viewCtrl = viewCtrl;
        this.backend = backend;
        this.events = events;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.title = "Modifica prodotto";
        this.mode = "edit";
        this.product = {
            nome: "",
            price: "",
            descr: "",
            imgurl: "",
            id: "",
            categoria: ""
        };
        this.mode = navParams.get("mode");
        if (this.mode == "insert") {
            this.title = "Aggiungi prodotto";
            var d = new Date();
            var mom = __WEBPACK_IMPORTED_MODULE_3_moment__(d).format("YYYYMMDDHHmmssSSS");
            this.product.id = mom;
        }
        if (this.mode == "edit") {
            this.title = "Modifica prodotto";
            this.product = navParams.get("product");
        }
    }
    EditproductPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad EditproductPage');
    };
    EditproductPage.prototype.ionViewWillEnter = function () {
        var questo = this;
        this.events.subscribe("hwbackbutton", function (data) {
            console.log("hwbackbutton in servizisocieta.ts");
            questo.cancel();
        });
    };
    EditproductPage.prototype.ionViewWillLeave = function () {
        this.events.unsubscribe("hwbackbutton");
    };
    EditproductPage.prototype.cancel = function () {
        this.viewCtrl.dismiss();
    };
    EditproductPage.prototype.save = function () {
        var questo = this;
        var url = questo.backend.rooturl + "/minimarket/editproduct";
        if (questo.mode == "insert") {
            url = questo.backend.rooturl + "/minimarket/addproduct";
        }
        var postdata = {
            product: questo.product
        };
        console.log("postdata", postdata);
        questo.backend.postData(url, postdata, function (data) {
            console.log("save operation result", data);
            questo.viewCtrl.dismiss("saved");
        });
    };
    EditproductPage.prototype.delete = function () {
        var questo = this;
        var alrt = questo.alertCtrl.create({
            title: 'Conferma',
            message: 'Vuoi davvero eliminare questo prodotto ?',
            buttons: [
                {
                    text: 'Annulla',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Conferma eliminazione',
                    handler: function () {
                        var url = questo.backend.rooturl + "/minimarket/deleteproduct";
                        var postdata = {
                            product: questo.product
                        };
                        console.log("postdata", postdata);
                        questo.backend.postData(url, postdata, function (data) {
                            console.log("delete operation result", data);
                            questo.viewCtrl.dismiss("deleted");
                        });
                    }
                }
            ]
        });
        alrt.present();
    };
    return EditproductPage;
}());
EditproductPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-editproduct',template:/*ion-inline-start:"/Users/demetriomortelliti/Desktop/demy/PROJECTS/appkwondo/clients/ion2kwondo/src/pages/editproduct/editproduct.html"*/'<!--\n  Generated template for the EditproductPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>{{title}}</ion-title>\n    <ion-buttons end>\n\n      <button ion-button clear (tap)="cancel()">Chiudi</button>\n    </ion-buttons>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content spadding class="ion-content">\n    <ion-item>\n        <ion-label floating>ID prodotto</ion-label>\n        <ion-input type="text" style="font-size: 12px" readonly [(ngModel)]="product.id" name="id"></ion-input>\n      </ion-item>\n      <ion-item>\n          <ion-label>Categoria</ion-label>\n          <ion-select [(ngModel)]="product.categoria">\n            <ion-option value="minimarket">minimarket</ion-option>\n            <ion-option value="tkdgear">tkdgear</ion-option>\n          </ion-select>\n        </ion-item>\n     \n    <ion-item>\n        <ion-label floating>Nome</ion-label>\n        <ion-input type="text" [(ngModel)]="product.nome" name="nome"></ion-input>\n      </ion-item>\n      <ion-item>\n        <ion-label floating>Descrizione</ion-label>\n        <ion-textarea [(ngModel)]="product.descr" name="descr"></ion-textarea>\n      </ion-item>\n      <ion-item>\n          <ion-label floating>Prezzo</ion-label>\n          <ion-input type="number" [(ngModel)]="product.price" name="price"></ion-input>\n        </ion-item>\n        <ion-item>\n            <ion-label floating>Immagine</ion-label>\n            <ion-input [(ngModel)]="product.imgurl" name="imgurl"></ion-input>\n          </ion-item>\n\n          <br><br>\n          <button ion-button block (tap)="save()">Salva</button>\n          <button ion-button block color="danger" (tap)="delete()"><ion-icon name="md-trash"></ion-icon>&nbsp;Elimina</button>\n\n</ion-content>\n'/*ion-inline-end:"/Users/demetriomortelliti/Desktop/demy/PROJECTS/appkwondo/clients/ion2kwondo/src/pages/editproduct/editproduct.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["u" /* ViewController */], __WEBPACK_IMPORTED_MODULE_2__providers_backend_backend__["a" /* BackendProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */]])
], EditproductPage);

//# sourceMappingURL=editproduct.js.map

/***/ }),

/***/ 564:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OrdersPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_backend_backend__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_moment__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the OrdersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var OrdersPage = (function () {
    function OrdersPage(toastCtrl, alertCtrl, events, backend, navCtrl, navParams) {
        this.toastCtrl = toastCtrl;
        this.alertCtrl = alertCtrl;
        this.events = events;
        this.backend = backend;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loading = false;
        this.orders = [];
        this.displayedorders = [];
        this.vieworder = "";
        this.statusfilter = "inoltrato";
    }
    OrdersPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad OrdersPage');
        this.refresh(function () { });
    };
    OrdersPage.prototype.ionViewWillEnter = function () {
        var questo = this;
        this.events.subscribe("hwbackbutton", function (data) {
            console.log("hwbackbutton in servizisocieta.ts");
            questo.navCtrl.pop();
        });
    };
    OrdersPage.prototype.ionViewWillLeave = function () {
        this.events.unsubscribe("hwbackbutton");
    };
    OrdersPage.prototype.changeFilter = function (ev) {
        console.log("changefilter", ev);
        this.refresh(function () { });
    };
    OrdersPage.prototype.refresh = function (callback) {
        var questo = this;
        var url = questo.backend.rooturl + "/minimarket/listorders";
        questo.loading = true;
        questo.backend.fetchData(url, function (data) {
            questo.orders = data.rows;
            var orders = [];
            if (questo.statusfilter == "") {
                questo.displayedorders = data.rows;
            }
            else {
                data.rows.forEach(function (item, idx) {
                    if (item.stato == questo.statusfilter)
                        orders.push(item);
                });
                questo.displayedorders = orders;
            }
            console.log("questo.orders", questo.orders);
            //questo.filterProducts();
            questo.loading = false;
            if (callback)
                callback();
        });
    };
    OrdersPage.prototype.getOrderTotal = function () {
        return 0;
    };
    OrdersPage.prototype.getDataOrdine = function (o) {
        var m = __WEBPACK_IMPORTED_MODULE_3_moment__(o.id, "YYYYMMDDHHmmssSSS").format("DD/MM/YYYY HH:mm");
        return m;
    };
    OrdersPage.prototype.getTotalPrice = function (o) {
        var questo = this;
        var tot = 0;
        o.cart.forEach(function (item, idx) {
            tot += parseFloat(item.product.price) * item.qty;
        });
        var ttot = tot.toFixed(2);
        return ttot;
    };
    OrdersPage.prototype.deleteOrder = function (o) {
        var questo = this;
        var alrt = questo.alertCtrl.create({
            title: 'Conferma eliminazione ordine',
            message: 'Vuoi davvero eliminare questo ordine ?',
            buttons: [
                {
                    text: 'Annulla',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Conferma',
                    handler: function () {
                        console.log('Buy clicked');
                        var url = questo.backend.rooturl + "/minimarket/deleteorder/" + o.id;
                        questo.backend.fetchData(url, function (data) {
                            var toast = questo.toastCtrl.create({
                                message: "Hai eliminato l'ordine",
                                position: "top",
                                duration: 2200
                            });
                            toast.present();
                            questo.refresh(function () { });
                        });
                    }
                }
            ]
        });
        alrt.present();
    };
    OrdersPage.prototype.completeOrder = function (o) {
        var questo = this;
        var alrt = questo.alertCtrl.create({
            title: 'Conferma completamento ordine',
            message: 'Vuoi davvero completare questo ordine ?',
            buttons: [
                {
                    text: 'Annulla',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Conferma',
                    handler: function () {
                        console.log('Buy clicked');
                        var url = questo.backend.rooturl + "/minimarket/changeorderstatus/" + o.id + "/completato";
                        questo.backend.fetchData(url, function (data) {
                            var toast = questo.toastCtrl.create({
                                message: "Hai completato questo ordine",
                                position: "top",
                                duration: 2200
                            });
                            toast.present();
                            questo.refresh(function () { });
                        });
                    }
                }
            ]
        });
        alrt.present();
    };
    OrdersPage.prototype.getTotaleRiga = function (c) {
        //console.log("cart",this.backend.cart);
        var questo = this;
        var tot = 0;
        tot = parseFloat(c.product.price) * c.qty;
        var ttot = tot.toFixed(2);
        return ttot;
    };
    OrdersPage.prototype.viewOrder = function (o) {
        var neworderid = o.id;
        if (this.vieworder == neworderid)
            neworderid = "";
        this.vieworder = neworderid;
    };
    return OrdersPage;
}());
OrdersPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-orders',template:/*ion-inline-start:"/Users/demetriomortelliti/Desktop/demy/PROJECTS/appkwondo/clients/ion2kwondo/src/pages/orders/orders.html"*/'<!--\n  Generated template for the OrdersPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Ordini prenotazioni</ion-title>\n  </ion-navbar>\n  <ion-item>\n      <ion-label>Stato</ion-label>\n      <ion-select [(ngModel)]="statusfilter" (ionChange)="changeFilter($event)">\n        <ion-option value="inoltrato">Inoltrati</ion-option>\n        <ion-option value="completato">Completati</ion-option>\n      </ion-select>\n    </ion-item>\n\n</ion-header>\n\n\n<ion-content spadding class="ion-content">\n    <div *ngIf="loading" style="width: 100%; text-align: center">\n        <ion-spinner name="ios"></ion-spinner>\n      </div>\n\n  <ion-list *ngFor="let o of displayedorders">\n    <ion-card >\n      <ion-card-content>\n        <section (tap)="viewOrder(o)">\n          <div class="id">ID:&nbsp;{{o.id}}</div>\n      <div class="orderid">DATA: &nbsp;{{getDataOrdine(o)}}</div>\n      <div class="frm">DA:&nbsp;{{o.nick}} ({{o.email}})</div>\n      <div class="totalprice">TOTALE:&nbsp;{{getTotalPrice(o)}}€</div>\n      <div class="status">STATO:&nbsp;{{o.stato}}</div>\n    </section>\n      \n      <section *ngIf="vieworder==o.id">\n        <hr>\n        <div *ngFor="let c of o.cart">\n        \n              <ion-row>\n                <ion-col>\n                    {{c.product.nome}}\n                </ion-col>\n              </ion-row>\n              <ion-row>\n                \n        \n                  \n                <ion-col col-4>\n                  Qta: {{c.qty}}\n                </ion-col>\n                <ion-col col-4>\n                  {{c.product.price}}€\n                </ion-col>\n                <ion-col col-4>\n                  {{getTotaleRiga(c)}}€\n                </ion-col>\n              </ion-row>\n             \n              \n\n\n         \n        </div>\n        <hr>\n        <ion-row>\n            <ion-col col-8>\n              Totale ordine\n            </ion-col>\n            <ion-col col-4>\n              <b>{{getTotalPrice(o)}}€</b>\n            </ion-col>\n          </ion-row>\n          <hr>\n          <ion-row>\n            <ion-col>\n                <button  ion-button small (tap)="deleteOrder(o)">Elimina ordine</button>\n            \n            </ion-col>\n            <ion-col>\n                <button *ngIf="o.stato==\'inoltrato\'" ion-button small (tap)="completeOrder(o)">Completa ordine</button>  \n            </ion-col>\n          </ion-row>\n    \n      </section>\n    </ion-card-content>\n  </ion-card>\n\n  </ion-list>\n\n</ion-content>\n'/*ion-inline-end:"/Users/demetriomortelliti/Desktop/demy/PROJECTS/appkwondo/clients/ion2kwondo/src/pages/orders/orders.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["t" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */], __WEBPACK_IMPORTED_MODULE_2__providers_backend_backend__["a" /* BackendProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */]])
], OrdersPage);

//# sourceMappingURL=orders.js.map

/***/ }),

/***/ 565:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegisterPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_backend_backend__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__tabs_tabs__ = __webpack_require__(56);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the RegisterPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var RegisterPage = (function () {
    function RegisterPage(menuCtrl, backend, navCtrl, navParams) {
        this.menuCtrl = menuCtrl;
        this.backend = backend;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.registerCredentials = {
            email: "",
            nickname: "",
            psw: ""
        };
    }
    RegisterPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad RegisterPage');
        this.menuCtrl.enable(false);
    };
    RegisterPage.prototype.register = function () {
        var questo = this;
        console.log(questo.registerCredentials);
        questo.backend.playFeedback();
        var url = questo.backend.rooturl + "/users/register";
        questo.backend.postData(url, questo.registerCredentials, function (data) {
            console.log(data);
            var error = false;
            if (data.hasOwnProperty("error")) {
                if (String(data.error) == "true")
                    error = true;
            }
            if (!error) {
                var text = "Grazie ! Registrazione completata ! Riceverai a breve una email all'indirizzo " + questo.registerCredentials.email + " con i dettagli per l'attivazione della tua userid su AppKwonDo";
                alert(text);
                questo.login();
                //questo.navCtrl.pop();
            }
            else {
                alert(data.msg);
            }
        });
    };
    RegisterPage.prototype.isSubmitEnabled = function () {
        var retvalue = true;
        for (var k in this.registerCredentials) {
            if (this.registerCredentials[k].trim() == "")
                retvalue = false;
            if (k == "email") {
                if (!this.isValidEmail(this.registerCredentials[k].trim()))
                    retvalue = false;
            }
        }
        return retvalue;
    };
    RegisterPage.prototype.isValidEmail = function (email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };
    RegisterPage.prototype.login = function () {
        var questo = this;
        questo.backend.playFeedback();
        //this.showLoading()
        var logindata = this.registerCredentials;
        if (this.backend.user.gcmtoken) {
            if (this.backend.user.gcmtoken != "") {
                logindata["gcmtoken"] = this.backend.user.gcmtoken;
            }
        }
        this.backend.blueLogin(logindata, function (data) {
            console.log("bluelogin result", data);
            if (data.loggedin) {
                if (String(data.loggedin) == "true") {
                    console.log("navigating to homepage");
                    questo.backend.getActiveChat(function (data) {
                        console.log("chatmessages have been loaded");
                        questo.backend.computeUnreadChats();
                    });
                    questo.backend.getGare(function (data) {
                        console.log("gare caricate");
                    });
                    questo.backend.getAtleti(function (data) {
                        console.log("atleti caricati");
                    });
                    questo.backend.getBroadcasts(function (data) {
                        console.log("broadcastes caricati", data);
                    });
                    if (questo.backend.isCordovaIos()) {
                        if (questo.hasPaidIos()) {
                            console.log("L'utente " + questo.backend.user.email + " ha pagato per iOS, può continuare");
                            questo.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__tabs_tabs__["a" /* TabsPage */]);
                        }
                        else {
                            console.log("L'utente " + questo.backend.user.email + " NON ha pagato per iOS, bloccato");
                            //questo.nav.push(IospaidPage);
                            questo.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__tabs_tabs__["a" /* TabsPage */]);
                        }
                    }
                    else
                        questo.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__tabs_tabs__["a" /* TabsPage */]);
                }
                else {
                    //alert("login error");
                    console.log(data.error);
                    questo.showError("Login error");
                }
            }
            else {
                alert("Login fallito, controlla i tuoi dati di accesso");
            }
        });
    };
    RegisterPage.prototype.hasPaidIos = function () {
        var questo = this;
        var retvalue = false;
        var user = questo.backend.user;
        if (user.hasOwnProperty("iospayment")) {
            var iospayment = user.iospayment;
            if (iospayment.hasOwnProperty("paid")) {
                if (String(iospayment.paid) == "true") {
                    if (iospayment.hasOwnProperty("expire")) {
                        var expire = iospayment.expire;
                        var date = __WEBPACK_IMPORTED_MODULE_3_moment__(expire, "YYYYMMDD");
                        var now = __WEBPACK_IMPORTED_MODULE_3_moment__();
                        if (now > date) {
                            // date is past, SCADUTA !!!
                        }
                        else {
                            // date is future, VALIDA
                            retvalue = true;
                        }
                    }
                    //retvalue = true;
                }
            }
        }
        return retvalue;
    };
    RegisterPage.prototype.showError = function (text) {
        //this.loading.dismiss();
        /*
        let alrt = this.alertCtrl.create({
          title: 'Login fallito',
          subTitle: text,
          buttons: ['OK']
        });
        alrt.present(prompt);
        */
    };
    return RegisterPage;
}());
RegisterPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-register',template:/*ion-inline-start:"/Users/demetriomortelliti/Desktop/demy/PROJECTS/appkwondo/clients/ion2kwondo/src/pages/register/register.html"*/'<!--\n  Generated template for the RegisterPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Registrazione ad Appkwondo</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <p class="testo">\n    Inserisci <b>l\'email</b> con la quale accederai ad Appkwondo, il <b>nickname</b> che userai nella ChatKwonDo ed una <b>password</b> per l\'accesso.\n  </p>\n\n    <ion-row>\n        <ion-col>\n          <ion-list inset>\n            \n            <ion-item>\n              <ion-label floating>Inserisci la tua email</ion-label>\n              <ion-input type="text"  name="email" [(ngModel)]="registerCredentials.email" required></ion-input>\n            </ion-item>\n            <ion-item>\n                <ion-label floating>Inserisci il tuo nickname (lo userai nella Chatkwondo e nelle altre sezioni dell\'app)</ion-label>\n                <ion-input type="text"  name="nickname" [(ngModel)]="registerCredentials.nickname" required></ion-input>\n              </ion-item>\n            \n            <ion-item>\n                <ion-label floating>Scegli la tua password</ion-label>\n              <ion-input type="password"  name="password" [(ngModel)]="registerCredentials.psw" required></ion-input>\n            </ion-item>\n            \n          </ion-list>\n        </ion-col>\n      </ion-row>\n\n\n      <button ion-button block [disabled]="!isSubmitEnabled()" (tap)="register()">Registrati</button>\n\n</ion-content>\n'/*ion-inline-end:"/Users/demetriomortelliti/Desktop/demy/PROJECTS/appkwondo/clients/ion2kwondo/src/pages/register/register.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* MenuController */], __WEBPACK_IMPORTED_MODULE_2__providers_backend_backend__["a" /* BackendProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */]])
], RegisterPage);

//# sourceMappingURL=register.js.map

/***/ }),

/***/ 566:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UsersPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_backend_backend__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_useredit_useredit__ = __webpack_require__(567);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the UsersPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var UsersPage = (function () {
    function UsersPage(modalCtrl, alertCtrl, backend, navCtrl, navParams) {
        this.modalCtrl = modalCtrl;
        this.alertCtrl = alertCtrl;
        this.backend = backend;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.users = [];
        this.loading = false;
        this.sortfield = "email";
        this.filter = "";
        this.potentialiosusers = [];
    }
    UsersPage.prototype.ionViewDidLoad = function () {
        var questo = this;
        console.log('ionViewDidLoad UsersPage');
        questo.loading = true;
        this.refresh(function () {
            questo.loading = false;
        });
    };
    UsersPage.prototype.refresh = function (callback) {
        var questo = this;
        var iosurl = questo.backend.rooturl + "/users/potentialios";
        var arrios = [];
        questo.backend.fetchData(iosurl, function (idata) {
            idata.rows.forEach(function (iitem, iidx) {
                arrios.push(iitem.doc.email);
            });
            var url = questo.backend.rooturl + "/users/list";
            questo.backend.fetchData(url, function (data) {
                console.log("users", data);
                data.rows.forEach(function (item, idx) {
                    item.doc.potentialios = false;
                    if (arrios.indexOf(item.doc.email) > -1)
                        item.doc.potentialios = true;
                });
                console.log("DATA", data);
                var users = [];
                if (questo.filter.trim() == "") {
                    users = data.rows;
                }
                else {
                    data.rows.forEach(function (item, idx) {
                        var addIt = false;
                        if (questo.filter == "approvati") {
                            if (item.doc.hasOwnProperty("active")) {
                                if (String(item.doc.active) == "true")
                                    addIt = true;
                            }
                        }
                        if (questo.filter == "nonapprovati") {
                            if (!item.doc.hasOwnProperty("active")) {
                                addIt = true;
                            }
                            else {
                                if (String(item.doc.active) != "true")
                                    addIt = true;
                            }
                        }
                        if (questo.filter == "potentialios") {
                            if (item.doc.potentialios) {
                                addIt = true;
                            }
                        }
                        if (addIt)
                            users.push(item);
                    });
                }
                questo.users = users;
                questo.users.sort(function (a, b) {
                    var a1 = a.doc[questo.sortfield].toLowerCase();
                    var b1 = b.doc[questo.sortfield].toLowerCase();
                    if (a1 > b1)
                        return 1;
                    if (a1 < b1)
                        return -1;
                    return 0;
                });
                if (callback)
                    callback(data);
            });
        });
    };
    UsersPage.prototype.needsApprove = function (u) {
        var active = true;
        if (u.doc.hasOwnProperty("active")) {
            if (String(u.doc.active) != "true")
                active = false;
        }
        return !active;
    };
    UsersPage.prototype.approveUser = function (u) {
        var questo = this;
        var alert = questo.alertCtrl.create({
            title: 'Conferma approvazione',
            message: "Vuoi davvero approvare l'utente " + u.doc.email + " ?",
            buttons: [
                {
                    text: 'Annulla',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Si, approva',
                    handler: function () {
                        console.log('OK clicked');
                        var url = questo.backend.rooturl + "/users/approve/" + u.doc.email;
                        questo.backend.fetchData(url, function (data) {
                            console.log("approve result", data);
                            questo.refresh(function () { });
                        });
                    }
                }
            ]
        });
        alert.present();
    };
    UsersPage.prototype.deleteUser = function (u) {
        var questo = this;
        var alert = questo.alertCtrl.create({
            title: 'Conferma eliminazione',
            message: "Vuoi davvero eliminare l'utente " + u.doc.email + " ?",
            buttons: [
                {
                    text: 'Annulla',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Si, elimina',
                    handler: function () {
                        console.log('OK clicked');
                        var url = questo.backend.rooturl + "/users/delete";
                        var doc = {
                            email: u.doc.email
                        };
                        questo.backend.postData(url, doc, function (data) {
                            console.log("delete result", data);
                            questo.refresh(function () { });
                        });
                    }
                }
            ]
        });
        alert.present();
    };
    UsersPage.prototype.doRefresh = function () {
        var questo = this;
        questo.loading = true;
        questo.refresh(function () {
            questo.loading = false;
        });
    };
    UsersPage.prototype.sortUsers = function () {
        var questo = this;
        var inps = [
            {
                type: 'radio',
                label: 'Email',
                value: 'email'
            },
            {
                type: 'radio',
                label: 'Nickname',
                value: 'nickname'
            }
        ];
        inps.forEach(function (item, idx) {
            var ck = false;
            if (item.value == questo.sortfield)
                ck = true;
            item.checked = ck;
        });
        var prompt = this.alertCtrl.create({
            title: 'Ordinamento per',
            message: 'Seleziona un campo',
            inputs: inps,
            buttons: [
                {
                    text: "Cancel",
                    handler: function (data) {
                        console.log("cancel clicked");
                    }
                },
                {
                    text: "Ordina",
                    handler: function (data) {
                        console.log("ordina clicked", data);
                        questo.sortfield = data;
                        questo.doRefresh();
                    }
                }
            ]
        });
        prompt.present();
    };
    UsersPage.prototype.showUser = function (u) {
        var questo = this;
        var profileModal = questo.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_3__pages_useredit_useredit__["a" /* UsereditPage */], { user: u });
        profileModal.onDidDismiss(function (data) {
            console.log(data);
            if (data == "saved")
                questo.doRefresh();
        });
        profileModal.present();
        //alert(u.doc.password);
    };
    UsersPage.prototype.changeFilter = function (ev) {
        var questo = this;
        console.log("changeFilter", ev);
        questo.filter = ev;
        questo.doRefresh();
    };
    return UsersPage;
}());
UsersPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-users',template:/*ion-inline-start:"/Users/demetriomortelliti/Desktop/demy/PROJECTS/appkwondo/clients/ion2kwondo/src/pages/users/users.html"*/'<!--\n  Generated template for the UsersPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n      <button ion-button menuToggle>\n          <ion-icon name="menu"></ion-icon>\n        </button>\n    <ion-title>Utenti</ion-title>\n    <ion-buttons end>\n        <button ion-button clear (tap)="sortUsers()"><ion-icon name="md-funnel"></ion-icon></button>\n        <button ion-button clear (tap)="doRefresh()"><ion-icon name="refresh"></ion-icon></button>\n      </ion-buttons>\n  </ion-navbar>\n  <ion-item>\n        <ion-label>{{users.length}} utenti</ion-label>\n        <ion-select [(ngModel)]="filter" multiple="false" (ionChange)=\'changeFilter($event)\' >\n          <ion-option selected value="">Tutti</ion-option>\n          <ion-option value="nonapprovati">Non approvati</ion-option>\n          <ion-option value="approvati">Approvati</ion-option>\n          <ion-option value="potentialios">Potenziali iOS</ion-option>\n          \n        </ion-select>\n      </ion-item>\n  <!--<ion-item>{{users.length}} utenti definiti</ion-item>-->\n</ion-header>\n\n\n<ion-content spadding class="ion-content">\n    <div *ngIf="loading" style="width: 100%; text-align: center">\n        <ion-spinner name="dots"></ion-spinner>\n      </div>\n\n \n  <br>\n\n    <ion-item *ngFor="let u of users" >\n     \n\n          <div class="usernick" (tap)="showUser(u)">{{u.doc.nickname}}</div>\n          <div class="useremail">{{u.doc.email}}</div>\n          \n          <div>\n          \n        \n          <button ion-button small (tap)="deleteUser(u)">Elimina</button>\n          <button *ngIf="needsApprove(u)" ion-button small (tap)="approveUser(u)">Approva</button>\n        </div>\n       \n    </ion-item>\n\n\n</ion-content>\n'/*ion-inline-end:"/Users/demetriomortelliti/Desktop/demy/PROJECTS/appkwondo/clients/ion2kwondo/src/pages/users/users.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* ModalController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_2__providers_backend_backend__["a" /* BackendProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */]])
], UsersPage);

//# sourceMappingURL=users.js.map

/***/ }),

/***/ 567:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UsereditPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_backend_backend__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_moment__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the UsereditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var UsereditPage = (function () {
    function UsereditPage(loadingCtrl, backend, viewCtrl, navCtrl, navParams) {
        this.loadingCtrl = loadingCtrl;
        this.backend = backend;
        this.viewCtrl = viewCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.user = {
            token: "",
            email: "",
            gcmtoken: "",
            twitter: {
                oauth_token: "",
                oauth_verifier: ""
            },
            role: "BP_GUEST",
            sockid: "unknown",
            uniquedeviceid: "",
            societaid: "20160217220400",
            id: "",
            iospayment: {
                paid: false,
                expire: ""
            }
        };
        var user = this.navParams.get("user");
        this.user = user.doc;
        if (!this.user.hasOwnProperty("iospayment")) {
            var now = __WEBPACK_IMPORTED_MODULE_3_moment__();
            var newmom = now.add('years', 1);
            var snewmom = newmom.format("YYYYDDMM");
            this.user.iospayment = {
                paid: false,
                expire: snewmom
            };
        }
        console.log("showing user", this.user);
    }
    UsereditPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad UsereditPage');
    };
    UsereditPage.prototype.cancel = function () {
        this.viewCtrl.dismiss();
    };
    UsereditPage.prototype.save = function () {
        var questo = this;
        var url = questo.backend.rooturl + "/users/update";
        var doc = questo.user;
        console.log("preparing to save user", doc);
        var loading = questo.loadingCtrl.create({
            spinner: 'dots',
            content: 'Salvataggio user in corso...'
        });
        loading.present();
        questo.backend.postData(url, doc, function (data) {
            console.log("saved user", data);
            loading.dismiss();
            questo.viewCtrl.dismiss("saved");
        });
    };
    return UsereditPage;
}());
UsereditPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-useredit',template:/*ion-inline-start:"/Users/demetriomortelliti/Desktop/demy/PROJECTS/appkwondo/clients/ion2kwondo/src/pages/useredit/useredit.html"*/'<!--\n  Generated template for the UsereditPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Modifica user</ion-title>\n    <ion-buttons end>\n        <button ion-button clear (tap)="cancel()">Annulla</button>\n        <button ion-button clear color="danger" (tap)="save()">SALVA</button>\n      </ion-buttons>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n    <ion-item>\n        <ion-label floating>Userid</ion-label>\n        <ion-input type="text" [(ngModel)]="user.email" name="email"></ion-input>\n      </ion-item>\n      <ion-item>\n        <ion-label floating>Password</ion-label>\n        <ion-input [(ngModel)]="user.password" name="password"></ion-input>\n      </ion-item>\n      <ion-item>\n          <ion-label>Ruolo</ion-label>\n          <ion-select [(ngModel)]="user.role">\n            <ion-option value="tkdruser">tkdruser</ion-option>\n            <ion-option value="tkdradmin">tkdradmin</ion-option>\n            <ion-option value="superadmin">superadmin</ion-option>\n          </ion-select>\n        </ion-item>\n        <ion-item>\n            <ion-label>Attivo</ion-label>\n            <ion-checkbox [(ngModel)]="user.active"></ion-checkbox>\n          </ion-item>\n      <ion-item>\n          <ion-label>Abbonato iOS</ion-label>\n          <ion-checkbox [(ngModel)]="user.iospayment.paid"></ion-checkbox>\n        </ion-item>\n        <ion-item>\n            <ion-label floating>Scadenza iOS</ion-label>\n            <ion-input [(ngModel)]="user.iospayment.expire" name="iosexpire"></ion-input>\n          </ion-item>\n\n</ion-content>\n'/*ion-inline-end:"/Users/demetriomortelliti/Desktop/demy/PROJECTS/appkwondo/clients/ion2kwondo/src/pages/useredit/useredit.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_2__providers_backend_backend__["a" /* BackendProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["u" /* ViewController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */]])
], UsereditPage);

//# sourceMappingURL=useredit.js.map

/***/ }),

/***/ 568:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConnectionsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_backend_backend__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_sendpush_sendpush__ = __webpack_require__(569);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the ConnectionsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var ConnectionsPage = (function () {
    function ConnectionsPage(backend, navCtrl, navParams) {
        this.backend = backend;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.sockusers = [];
        this.loading = false;
        this.gcmtokens = [];
        this.view = "sockets";
    }
    ConnectionsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ConnectionsPage');
        this.doRefresh();
    };
    ConnectionsPage.prototype.refresh = function (callback) {
        var questo = this;
        var url = questo.backend.rooturl + "/socketusers";
        questo.backend.fetchData(url, function (data) {
            console.log(data);
            questo.sockusers = data;
            if (callback)
                callback(data);
        });
    };
    ConnectionsPage.prototype.refreshgcm = function (callback) {
        var questo = this;
        var url = questo.backend.rooturl + "/gcm/viewtokens";
        questo.backend.fetchData(url, function (data) {
            console.log(data);
            questo.gcmtokens = data;
            if (callback)
                callback(data);
        });
    };
    ConnectionsPage.prototype.doRefresh = function () {
        var questo = this;
        questo.loading = true;
        questo.refresh(function () {
            questo.refreshgcm(function () {
                questo.loading = false;
            });
        });
    };
    ConnectionsPage.prototype.hasGCM = function (s) {
        var retvalue = false;
        if (s.hasOwnProperty("gcmtoken")) {
            if (s.gcmtoken.trim() != "")
                retvalue = true;
        }
        return retvalue;
    };
    ConnectionsPage.prototype.getEmail = function (token) {
        var questo = this;
        var retvalue = "";
        questo.sockusers.forEach(function (item, idx) {
            if (item.gcmtoken == token)
                retvalue = item.email;
        });
        return retvalue;
    };
    ConnectionsPage.prototype.sendPush = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__pages_sendpush_sendpush__["a" /* SendpushPage */]);
    };
    return ConnectionsPage;
}());
ConnectionsPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-connections',template:/*ion-inline-start:"/Users/demetriomortelliti/Desktop/demy/PROJECTS/appkwondo/clients/ion2kwondo/src/pages/connections/connections.html"*/'<!--\n  Generated template for the ConnectionsPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n      <button ion-button menuToggle>\n          <ion-icon name="menu"></ion-icon>\n        </button>\n    <ion-title>Connessioni</ion-title>\n    <ion-buttons end>\n        <button ion-button clear (tap)="sendPush()"><ion-icon name="send"></ion-icon></button>\n      <button ion-button clear (tap)="doRefresh()"><ion-icon name="refresh"></ion-icon></button>\n    </ion-buttons>\n  </ion-navbar>\n  <ion-segment class="segment" [(ngModel)]="view">\n      <ion-segment-button value="sockets">\n        SOCKET\n      </ion-segment-button>\n      <ion-segment-button value="gcm">\n       GCM\n      </ion-segment-button>\n\n    </ion-segment>\n\n</ion-header>\n\n\n<ion-content spadding class="ion-content">\n    <div *ngIf="loading" style="width: 100%; text-align: center">\n        <ion-spinner name="dots"></ion-spinner>\n      </div>\n\n      <section *ngIf="view==\'sockets\'">\n  <ion-item>\n\n    {{sockusers.length}} utenti connessi ad Appkwondo\n  </ion-item>\n\n    <ion-item *ngFor="let s of sockusers">\n      <div class="riga nickname">{{s.nickname}}</div>\n      <div class="riga email">{{s.email}}</div>\n      <div class="riga sockid">{{s.id}}</div>\n      \n      <div class="riga device">{{s.device}}</div>\n      <div class="riga appversion">{{s.appversion}}</div>\n\n      <div class="riga gcm" *ngIf="hasGCM(s)"><b>GCM</b> {{s.gcmtoken}}</div>\n       <!-- <b>{{s.nickname}}</b><br>{{s.email}}<br>{{s.id}}<br>{{s.device}}<br>{{s.appversion}}-->\n\n    </ion-item>\n  </section>\n\n\n  <section *ngIf="view==\'gcm\'">\n      <ion-item>\n    \n        {{gcmtokens.length}} device in GCM\n      </ion-item>\n    \n        <ion-item *ngFor="let s of gcmtokens">\n          <div class="riga nickname">{{s.deviceid}}</div>\n          <div class="riga email">{{getEmail(s.token)}}</div>\n          <div class="riga email">{{s.token}}</div>\n          <div class="riga sockid">{{s.count}}</div>\n         \n           <!-- <b>{{s.nickname}}</b><br>{{s.email}}<br>{{s.id}}<br>{{s.device}}<br>{{s.appversion}}-->\n    \n        </ion-item>\n      </section>\n\n\n\n\n</ion-content>\n'/*ion-inline-end:"/Users/demetriomortelliti/Desktop/demy/PROJECTS/appkwondo/clients/ion2kwondo/src/pages/connections/connections.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__providers_backend_backend__["a" /* BackendProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */]])
], ConnectionsPage);

//# sourceMappingURL=connections.js.map

/***/ }),

/***/ 569:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SendpushPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_backend_backend__ = __webpack_require__(6);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the SendpushPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var SendpushPage = (function () {
    function SendpushPage(alertCtrl, backend, navCtrl, navParams) {
        this.alertCtrl = alertCtrl;
        this.backend = backend;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.titolo = "";
        this.text = "";
    }
    SendpushPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SendpushPage');
    };
    SendpushPage.prototype.sendPush = function () {
        var questo = this;
        var alert = questo.alertCtrl.create({
            title: 'Conferma invio notifica',
            message: 'Vuoi davvero inviare la notifica push ?',
            buttons: [
                {
                    text: 'Annulla',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'OK',
                    handler: function () {
                        console.log('Buy clicked');
                        var url = questo.backend.rooturl + "/fcm/send?title=" + questo.titolo + "&text=" + questo.text;
                        questo.backend.fetchData(url, function (data) {
                            console.log("push sent", data);
                            questo.backend.showAlert("Messaggio push inviato !!");
                        });
                    }
                }
            ]
        });
        alert.present();
    };
    return SendpushPage;
}());
SendpushPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-sendpush',template:/*ion-inline-start:"/Users/demetriomortelliti/Desktop/demy/PROJECTS/appkwondo/clients/ion2kwondo/src/pages/sendpush/sendpush.html"*/'<!--\n  Generated template for the SendpushPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar>\n    <ion-title>Manda push</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n\n  <ion-item>\n    <ion-label floating>Titolo</ion-label>\n    <ion-input type="text" [(ngModel)]="titolo"></ion-input>\n  </ion-item>\n\n  <ion-item>\n      <ion-label floating>Testo</ion-label>\n      <ion-input type="text" [(ngModel)]="text"></ion-input>\n    </ion-item>\n\n    <button ion-button block (tap)="sendPush()">INVIA</button>\n  \n\n</ion-content>\n'/*ion-inline-end:"/Users/demetriomortelliti/Desktop/demy/PROJECTS/appkwondo/clients/ion2kwondo/src/pages/sendpush/sendpush.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_2__providers_backend_backend__["a" /* BackendProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */]])
], SendpushPage);

//# sourceMappingURL=sendpush.js.map

/***/ }),

/***/ 570:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BroadcastviewPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_backend_backend__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_android_permissions__ = __webpack_require__(74);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var BroadcastviewPage = (function () {
    function BroadcastviewPage(navParams, loadingCtrl, backend, platform, androidPermissions, navCtrl) {
        //this.initRTC();
        this.navParams = navParams;
        this.loadingCtrl = loadingCtrl;
        this.backend = backend;
        this.platform = platform;
        this.androidPermissions = androidPermissions;
        this.navCtrl = navCtrl;
        this.roomid = "cucuzza";
        this.broadcastid = "cucuzza";
        this.connectionlabel = "";
        //rtcurl="http://localhost:8000/";
        this.rtcurl = "https://rtc18.mybluemix.net/";
        //rtcurl="http://10.113.32.94:8000/";
        //rtcurl='https://rtcmulticonnection.herokuapp.com:443/';
        this.isInitiator = false;
        this.videoinputdevices = [];
        this.videooutputdevices = [];
        this.audioinputdevices = [];
        this.audiooutputdevices = [];
        this.videodevice = 0;
        this.preview = false;
        this.viewermode = false;
    }
    BroadcastviewPage.prototype.ionViewWillLeave = function () {
        this.connection.socket.disconnect();
    };
    BroadcastviewPage.prototype.ionViewDidLoad = function () {
        var questo = this;
        this.initRTCSB();
        var bid = this.navParams.get("broadcastid");
        var mode = this.navParams.get("mode");
        if (mode) {
            if (mode == "viewer")
                this.viewermode = true;
        }
        console.log("ionviewdidload broadcast, viewmode", questo.viewermode);
        if (bid) {
            console.log("opened with broadcastid", bid);
            this.broadcastid = bid;
            setTimeout(function () {
                questo.openOrJoin();
            }, 1000);
        }
        else {
            console.log("opened without broadcastid");
        }
        console.log("broadcastid", this.broadcastid);
    };
    BroadcastviewPage.prototype.getBroadcastText = function (r) {
        var questo = this;
        if (r.indexOf("_") > -1) {
            var arr = r.split("_");
            var garaid = arr[0];
            var matchid = arr[1];
            var m = questo.backend.getMatchById(matchid);
            //console.log(m);
            if (m.rows.length > 0) {
                var retvalue = m.rows[0].doc.matchid + " - " + m.rows[0].doc.atletaname;
                return retvalue;
            }
            else
                return r;
        }
        else
            return r;
    };
    BroadcastviewPage.prototype.resetBroadcast = function () {
        var questo = this;
        /*if (questo.connection){
          questo.connection.getSocket().emit("close-entire-session");
        }*/
        var url = questo.backend.rooturl + "/broadcast/reset";
        var loading = questo.loadingCtrl.create({
            spinner: 'dots',
            content: 'Aggiornamento broadcast in corso...'
        });
        loading.present();
        questo.backend.fetchData(url, function (data) {
            console.log("broadcast refreshed");
            loading.dismiss();
        });
    };
    BroadcastviewPage.prototype.refreshBroadcast = function () {
        var questo = this;
        //var url = questo.backend.rooturl + "/broadcast/list";
        var loading = questo.loadingCtrl.create({
            spinner: 'dots',
            content: 'Aggiornamento broadcast in corso...'
        });
        loading.present();
        questo.backend.getBroadcasts(function (data) {
            console.log("broadcast refreshed", data);
            questo.backend.fbLives = data;
            loading.dismiss();
        });
        /*
        questo.backend.fetchData(url, function (data) {
          console.log("broadcast refreshed", data);
          questo.backend.fbLives = data;
          loading.dismiss();
        })*/
    };
    BroadcastviewPage.prototype.tapBroadcast = function (r) {
        this.broadcastid = r;
        this.openOrJoin();
    };
    /*
      initRTC() {
    
        console.log("initRTC")!!
    
        var questo = this;
    
        questo.connection = new RTCMultiConnection();
    
        console.log("connection", questo.connection)
    
        questo.connection.onMediaError = function (error, constraints) {
          alert("media error " + JSON.stringify(error, null, ' '));
        };
    
        // http://www.rtcmulticonnection.org/docs/socketURL/
        questo.connection.socketURL = questo.rtcurl;
    
        questo.connection.socketMessageEvent = 'video-conference-demo';
    
        questo.connection.session = {
          audio: true,
          video: true
        };
    
        questo.connection.mediaConstraints = {
          audio: false,
          video: {
            mandatory: {},
            optional: [{
              facingMode: 'user'
            }]
          }
        };
    
        questo.connection.sdpConstraints.mandatory = {
          OfferToReceiveAudio: true,
          OfferToReceiveVideo: true
        };
    
        questo.connection.videosContainer = document.getElementById('videos-container');
        //questo.connection.videosContainer=questo.videos.nativeElement;
        questo.connection.onstream = function (event) {
          console.log("streaming", event);
          var div = document.createElement('div');
          div = questo.videos.nativeElement;
          div.id = event.streamid || event.stream.id;
          
          
    
          div.appendChild(event.mediaElement);
    
          questo.connection.videosContainer.insertBefore(div, questo.connection.videosContainer.firstChild);
          questo.connection.fixAllVideos();
        };
    
        questo.connection.onstreamended = function (event) {
          questo.removeStreamById(event.streamid || event.stream.id);
        };
    
        questo.connection.fixAllVideos = function () {
          Object.keys(questo.connection.streamEvents).forEach(function (key) {
            var event = questo.connection.streamEvents[key];
            var div = document.getElementById(key);
            if (!div) return;
            var video = div.querySelector('video');
            if (!video) {
              console.log("no videos found, returning")
              return;
    
            }
            video.src = URL.createObjectURL(event.stream);
            
            video.play();
    
            setTimeout(function () {
              video.play();
            }, 2000);
          });
        };
    
      }
    */
    /*
      removeStreamById(key) {
        var questo = this;
        var event = questo.connection.streamEvents[key];
        var div = document.getElementById(key);
        if (!div) return;
        var video = div.querySelector('video');
        if (!video) return;
        video.src = null;
    
        div.parentNode.removeChild(div);
      }
    
    
    
      joinRoom() {
    
        var questo = this;
    
        if (questo.platform.is("cordova")) {
    
          questo.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.CAMERA, this.androidPermissions.PERMISSION.GET_ACCOUNTS]).then(function () {
            var roomid = questo.roomid;
    
            questo.connection.join(roomid, function () {
              console.log("sessionid", questo.connection.sessionid);
              //showRoomURL(connection.sessionid);
            });
    
          }).catch(function (e) {
            console.log("error asking permissions", e)
          });
    
        } else {
          var roomid = questo.roomid;
    
          questo.connection.join(roomid, function () {
            console.log("sessionid", questo.connection.sessionid);
            //showRoomURL(connection.sessionid);
          });
    
        }
    
    
    
      }
    
    
    
      openRoom() {
        var questo = this;
    
        if (questo.platform.is("cordova")) {
          questo.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.CAMERA, this.androidPermissions.PERMISSION.GET_ACCOUNTS]).then(function () {
            questo.connection.open(questo.roomid, function () {
              console.log("connection opened !");
              console.log(questo.connection.sessionid);
            });
          }).catch(function (e) {
            console.log("error asking permissions", e)
          });
    
        } else {
          questo.connection.open(questo.roomid, function () {
            console.log("connection opened !");
            console.log(questo.connection.sessionid);
          });
    
        }
    
      }
    */
    BroadcastviewPage.prototype.selectVideoOutputDevice = function () {
        var questo = this;
        console.log("videodevice", questo.videodevice);
        if (questo.connection) {
            console.log("abbiamo una connection");
            questo.connection.stopMediaAccess();
            //questo.connection.selectVideoOutputDevice(questo.videodevice);
            setTimeout(function () {
                questo.connection.mediaConstraints.video.optional = [{
                        sourceId: questo.videodevice //set here the new camera
                    }];
                questo.connection.addStream({ audio: true, video: true }); // add new stream with the new device
            }, 2000);
        }
    };
    BroadcastviewPage.prototype.initRTCSB = function () {
        var questo = this;
        console.log("initRTCSB", this.broadcastid);
        var devices;
        navigator.mediaDevices.enumerateDevices().then(function (devs) {
            devices = devs;
            console.log("devices", devices);
            devices.forEach(function (item, idx) {
                /*var option = document.createElement('option');
                option.innerHTML = item.label || (item.kind + ': ' + item.deviceId);
                option.value = item.deviceId;*/
                if (item.kind == 'audioinput' || item.kind == 'audio') {
                    questo.audioinputdevices.push(item);
                }
                else if (item.kind == 'audiooutput') {
                    questo.audiooutputdevices.push(item);
                }
                else
                    questo.videooutputdevices.push(item);
            });
        }).catch(function (e) {
            console.log("error enumerating devices");
        });
        questo.videodevice = questo.videoinputdevices[0];
        // recording is disabled because it is resulting for browser-crash
        // if you enable below line, please also uncomment above "RecordRTC.js"
        var enableRecordings = false;
        questo.connection = new RTCMultiConnection();
        // its mandatory in v3
        questo.connection.enableScalableBroadcast = true;
        questo.connection.mediaConstraints = {
            audio: true,
            video: {
                mandatory: {},
                optional: [{
                        facingMode: 'application'
                    }]
            }
        };
        // each relaying-user should serve only 1 users
        questo.connection.maxRelayLimitPerUser = 1;
        // we don't need to keep room-opened
        // scalable-broadcast.js will handle stuff itself.
        questo.connection.autoCloseEntireSession = true;
        // by default, socket.io server is assumed to be deployed on your own URL
        //connection.socketURL = '/';
        // comment-out below line if you do not have your own socket.io server
        //questo.connection.socketURL = 'https://rtcmulticonnection.herokuapp.com:443/';
        questo.connection.socketURL = questo.rtcurl;
        console.log("questo.rtcurl", questo.rtcurl);
        questo.connection.socketMessageEvent = 'scalable-media-broadcast-demo';
        // document.getElementById('broadcast-id').value = connection.userid;
        // user need to connect server, so that others can reach him.
        questo.connection.connectSocket(function (socket) {
            console.log("videosocket connected", socket);
            questo.connection.mediaConstraints = {
                audio: true,
                video: {
                    mandatory: {},
                    optional: [{
                            facingMode: 'application'
                        }]
                }
            };
            socket.on('logs', function (log) {
                //document.querySelector('h1').innerHTML = log.replace(/</g, '----').replace(/>/g, '___').replace(/----/g, '(<span style="color:red;">').replace(/___/g, '</span>)');
                var txt = log.replace(/</g, '----').replace(/>/g, '___').replace(/----/g, '(<span style="color:red;">').replace(/___/g, '</span>)');
                questo.connectionlabel = log;
            });
            // this event is emitted when a broadcast is already created.
            socket.on('join-broadcaster', function (hintsToJoinBroadcast) {
                console.log('join-broadcaster', hintsToJoinBroadcast);
                questo.connection.session = hintsToJoinBroadcast.typeOfStreams;
                questo.connection.sdpConstraints.mandatory = {
                    OfferToReceiveVideo: !!questo.connection.session.video,
                    OfferToReceiveAudio: !!questo.connection.session.audio
                };
                questo.connection.broadcastId = hintsToJoinBroadcast.broadcastId;
                questo.connection.join(hintsToJoinBroadcast.userid);
            });
            socket.on('rejoin-broadcast', function (broadcastId) {
                console.log('rejoin-broadcast', broadcastId);
                questo.connection.attachStreams = [];
                socket.emit('check-broadcast-presence', broadcastId, function (isBroadcastExists) {
                    if (!isBroadcastExists) {
                        // the first person (i.e. real-broadcaster) MUST set his user-id
                        questo.connection.userid = broadcastId;
                    }
                    socket.emit('join-broadcast', {
                        broadcastId: broadcastId,
                        userid: questo.connection.userid,
                        typeOfStreams: questo.connection.session
                    });
                });
            });
            socket.on('broadcast-stopped', function (broadcastId) {
                // alert('Broadcast has been stopped.');
                // location.reload();
                console.log('broadcast-stopped', broadcastId);
                //alert("Broadcast "+broadcastId+" has been stopped.");
            });
            // this event is emitted when a broadcast is absent.
            socket.on('start-broadcasting', function (typeOfStreams) {
                console.log('start-broadcasting', typeOfStreams);
                // host i.e. sender should always use this!
                questo.connection.sdpConstraints.mandatory = {
                    OfferToReceiveVideo: false,
                    OfferToReceiveAudio: false
                };
                questo.connection.session = typeOfStreams;
                // "open" method here will capture media-stream
                // we can skip this function always; it is totally optional here.
                // we can use "connection.getUserMediaHandler" instead
                questo.connection.open(questo.connection.userid, function () {
                    //showRoomURL(questo.connection.sessionid);
                });
            });
        });
        //var videoPreview = document.getElementById('video-preview');
        var videoPreview = questo.videoPreview.nativeElement;
        questo.connection.onstream = function (event) {
            questo.preview = true;
            console.log("streaming !! isInitiator", questo.connection.isInitiator);
            questo.isInitiator = questo.connection.isInitiator;
            if (questo.connection.isInitiator && event.type !== 'local') {
                return;
            }
            questo.connection.isUpperUserLeft = false;
            videoPreview.srcObject = event.stream;
            videoPreview.play();
            videoPreview.userid = event.userid;
            if (event.type === 'local') {
                videoPreview.muted = true;
            }
            if (questo.connection.isInitiator == false && event.type === 'remote') {
                // he is merely relaying the media
                questo.connection.dontCaptureUserMedia = true;
                questo.connection.attachStreams = [event.stream];
                questo.connection.sdpConstraints.mandatory = {
                    OfferToReceiveAudio: false,
                    OfferToReceiveVideo: false
                };
                var socket = questo.connection.getSocket();
                socket.emit('can-relay-broadcast');
                if (questo.connection.DetectRTC.browser.name === 'Chrome') {
                    questo.connection.getAllParticipants().forEach(function (p) {
                        if (p + '' != event.userid + '') {
                            var peer = questo.connection.peers[p].peer;
                            peer.getLocalStreams().forEach(function (localStream) {
                                peer.removeStream(localStream);
                            });
                            event.stream.getTracks().forEach(function (track) {
                                peer.addTrack(track, event.stream);
                            });
                            questo.connection.dontAttachStream = true;
                            questo.connection.renegotiate(p);
                            questo.connection.dontAttachStream = false;
                        }
                    });
                }
                if (questo.connection.DetectRTC.browser.name === 'Firefox') {
                    // Firefox is NOT supporting removeStream method
                    // that's why using alternative hack.
                    // NOTE: Firefox seems unable to replace-tracks of the remote-media-stream
                    // need to ask all deeper nodes to rejoin
                    questo.connection.getAllParticipants().forEach(function (p) {
                        if (p + '' != event.userid + '') {
                            questo.connection.replaceTrack(event.stream, p);
                        }
                    });
                }
            }
        };
        questo.connection.onNumberOfBroadcastViewersUpdated = function (event) {
            console.log("broadcastviewersupdated", event, questo.connection, questo.connection.getAllParticipants());
            if (!questo.connection.isInitiator)
                return;
            document.getElementById('broadcast-viewers-counter').innerHTML = 'Number of broadcast viewers: <b>' + event.numberOfBroadcastViewers + '</b>';
        };
        // ask node.js server to look for a broadcast
        // if broadcast is available, simply join it. i.e. "join-broadcaster" event should be emitted.
        // if broadcast is absent, simply create it. i.e. "start-broadcasting" event should be fired.
        questo.connection.onstreamended = function () {
            questo.preview = false;
            console.log("stream ended !!");
        };
        questo.connection.onleave = function (event) {
            if (event.userid !== videoPreview.userid)
                return;
            var socket = questo.connection.getSocket();
            socket.emit('can-not-relay-broadcast');
            questo.connection.isUpperUserLeft = true;
            if (allRecordedBlobs.length) {
                // playing lats recorded blob
                var lastBlob = allRecordedBlobs[allRecordedBlobs.length - 1];
                videoPreview.src = URL.createObjectURL(lastBlob);
                videoPreview.play();
                allRecordedBlobs = [];
            }
            else if (questo.connection.currentRecorder) {
                var recorder = questo.connection.currentRecorder;
                questo.connection.currentRecorder = null;
                recorder.stopRecording(function () {
                    if (!questo.connection.isUpperUserLeft)
                        return;
                    videoPreview.src = URL.createObjectURL(recorder.getBlob());
                    videoPreview.play();
                });
            }
            if (questo.connection.currentRecorder) {
                questo.connection.currentRecorder.stopRecording();
                questo.connection.currentRecorder = null;
            }
        };
        var allRecordedBlobs = [];
    };
    BroadcastviewPage.prototype.openOrJoin = function () {
        var questo = this;
        //var broadcastId = "broadcastid";
        if (questo.platform.is("cordova")) {
            questo.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.CAMERA, this.androidPermissions.PERMISSION.GET_ACCOUNTS]).then(function () {
                questo.goOpenOrJoin();
            }).catch(function (e) {
                console.log("error asking permissions", e);
            });
        }
        else
            questo.goOpenOrJoin();
    };
    BroadcastviewPage.prototype.goOpenOrJoin = function () {
        var questo = this;
        var broadcastId = questo.broadcastid;
        //questo.initRTCSB();
        console.log("broadcaastId", broadcastId);
        console.log("trying to open broadcastid ", broadcastId);
        questo.connection.session = {
            audio: true,
            video: true,
            oneway: true
        };
        console.log("mediaconstraints", questo.connection.mediaConstraints);
        var socket = questo.connection.getSocket();
        socket.emit('check-broadcast-presence', broadcastId, function (isBroadcastExists) {
            if (!isBroadcastExists) {
                // the first person (i.e. real-broadcaster) MUST set his user-id
                questo.connection.userid = broadcastId;
            }
            console.log('check-broadcast-presence', broadcastId, isBroadcastExists);
            socket.emit('join-broadcast', {
                broadcastId: broadcastId,
                userid: questo.connection.userid,
                typeOfStreams: questo.connection.session
            });
        });
    };
    BroadcastviewPage.prototype.closeBroadcast = function () {
        var questo = this;
        if (questo.connection) {
            questo.connection.getSocket().emit("close-entire-session");
            questo.connection.getAllParticipants().forEach(function (participant) {
                console.log("participant", participant);
                questo.connection.disconnectWith(participant);
            });
            questo.connection.attachStreams.forEach(function (stream) {
                stream.stop();
            });
            //questo.connection.streams.stop('local');
            questo.connection.removeStream({
                video: true,
                audio: true
            });
            //questo.connection.streams.stop();
            questo.connection.close();
            questo.connection.closeEntireSession();
            questo.connection.socket.disconnect();
            console.log("connection closed", questo.connection);
            questo.resetBroadcast();
            questo.initRTCSB();
            //questo.connection=null;
        }
    };
    BroadcastviewPage.prototype.getViewers = function () {
        var questo = this;
        if (questo.connection) {
            var socket = questo.connection.getSocket();
            socket.emit("check-broadcast-presence", function (data) {
                console.log("viewers", data);
            });
        }
    };
    return BroadcastviewPage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])("videos"),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"])
], BroadcastviewPage.prototype, "videos", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])("videoPreview"),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"])
], BroadcastviewPage.prototype, "videoPreview", void 0);
BroadcastviewPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-broadcastview',template:/*ion-inline-start:"/Users/demetriomortelliti/Desktop/demy/PROJECTS/appkwondo/clients/ion2kwondo/src/pages/broadcastview/broadcastview.html"*/'<ion-header>\n    <ion-navbar>\n      <ion-title>\n        Broadcast\n      </ion-title>\n      <ion-buttons end>\n        <button ion-button clear  (tap)="resetBroadcast()">Reset</button>\n        <button ion-button clear (tap)="refreshBroadcast()">Refresh</button>\n      </ion-buttons>\n    </ion-navbar>\n  </ion-header>\n  \n  <ion-content padding>\n  \n    <div class="blist">\n      <div class="head">Trasmissioni attive: {{backend.fbLives.length}}</div>\n      <ion-list *ngFor="let r of backend.fbLives">\n          <ion-item class="broadcastlist" (tap)="tapBroadcast(r)">{{getBroadcastText(r)}}</ion-item>\n        </ion-list>\n      </div>\n   \n  \n    <div class="connlabel" [hidden]="!preview">{{connectionlabel}}</div>\n  \n    \n      <section class="make-center">\n         \n\n\n          <div #videos id="videos-container" style="background: yellow;"></div>\n          <video #videoPreview [hidden]="!preview" id="video-preview" controls loop allowfullscreen></video>\n         \n          <video id="remotevideo"></video>\n      \n          </section>\n  \n  \n\n  </ion-content>\n  '/*ion-inline-end:"/Users/demetriomortelliti/Desktop/demy/PROJECTS/appkwondo/clients/ion2kwondo/src/pages/broadcastview/broadcastview.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_2__providers_backend_backend__["a" /* BackendProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* Platform */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_android_permissions__["a" /* AndroidPermissions */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */]])
], BroadcastviewPage);

//# sourceMappingURL=broadcastview.js.map

/***/ }),

/***/ 571:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_backend_backend__ = __webpack_require__(6);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/*
  Generated class for the Settings page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var SettingsPage = (function () {
    function SettingsPage(backend, navCtrl, navParams) {
        this.backend = backend;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.deviceid = "none";
        //this.settings = this.backend.appSettings;
    }
    SettingsPage.prototype.ionViewDidLoad = function () {
        var questo = this;
        console.log('ionViewDidLoad SettingsPage');
        questo.deviceid = questo.backend.user.uniquedeviceid;
        console.log("deviceid", questo.deviceid, questo.backend.user);
    };
    SettingsPage.prototype.ionViewWillLeave = function () {
        console.log("ionViewWillLeave SettingsPage");
        window.localStorage.setItem("ion2kwondo_settings", JSON.stringify(this.backend.appSettings));
    };
    SettingsPage.prototype.onServerChange = function (ev) {
        console.log("onserverchange", ev);
        this.backend.rooturl = ev;
    };
    SettingsPage.prototype.updateNotifications = function () {
        var questo = this;
        var notifications = questo.backend.appSettings.notifications;
        if (notifications) {
            questo.backend.enableNotifications(function (data) {
                console.log(data);
            });
        }
        else {
            questo.backend.disableNotifications(function (data) {
                console.log(data);
            });
        }
    };
    return SettingsPage;
}());
SettingsPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-settings',template:/*ion-inline-start:"/Users/demetriomortelliti/Desktop/demy/PROJECTS/appkwondo/clients/ion2kwondo/src/pages/settings/settings.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Impostazioni</ion-title>\n  </ion-navbar>\n</ion-header>\n<ion-content padding>\n  \n\n  <ion-list>\n      \n    <ion-item *ngIf="backend.user.role==\'superadmin\'">\n      <ion-label>Server</ion-label>\n      <ion-select  [(ngModel)]="backend.appSettings.server" (ionChange)="onServerChange($event)">\n        <ion-option value="http://tkdr.herokuapp.com">Heroku</ion-option>\n        <ion-option value="http://appkwondo.mybluemix.net">Bluemix</ion-option>\n        <ion-option value="http://192.168.1.106:3000">Local</ion-option>\n      </ion-select>\n    </ion-item>\n    <ion-item>\n      <ion-label>Animation</ion-label>\n      <ion-checkbox [(ngModel)]="backend.navOptions.animate"></ion-checkbox>\n    </ion-item>\n    <ion-item>\n      <ion-label>Animation type</ion-label>\n      <ion-select  [disabled]="!backend.navOptions.animate" [(ngModel)]="backend.navOptions.animation">\n        <ion-option value="md-transition">Android</ion-option>\n        <ion-option value="ios-transition">iOS</ion-option>\n        <ion-option value="wp-transition">Windows Phone</ion-option>\n        \n      </ion-select>\n    </ion-item>\n    <!--<ion-item>\n      <ion-label>Notifiche</ion-label>\n      <ion-checkbox [(ngModel)]="backend.appSettings.notifications" (ionChange)="updateNotifications()"></ion-checkbox>\n    </ion-item>-->\n    <ion-item>\n      <ion-label>Sound</ion-label>\n      <ion-checkbox [(ngModel)]="backend.appSettings.sound"></ion-checkbox>\n    </ion-item>\n    <ion-item>\n      <ion-label>Voice</ion-label>\n      <ion-checkbox [(ngModel)]="backend.appSettings.voice"></ion-checkbox>\n    </ion-item>\n    <ion-item>\n      <ion-label>Feedback</ion-label>\n      <ion-checkbox [(ngModel)]="backend.appSettings.feedback"></ion-checkbox>\n    </ion-item>\n    <ion-item>\n        <ion-label>Notifiche chat</ion-label>\n        <ion-checkbox [(ngModel)]="backend.appSettings.chatnotify"></ion-checkbox>\n      </ion-item>\n\n  </ion-list>\n\n  <br><br>\n  <div>DeviceID: <b>{{backend.user.uniquedeviceid}}</b></div>\n</ion-content>\n'/*ion-inline-end:"/Users/demetriomortelliti/Desktop/demy/PROJECTS/appkwondo/clients/ion2kwondo/src/pages/settings/settings.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__providers_backend_backend__["a" /* BackendProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */]])
], SettingsPage);

//# sourceMappingURL=settings.js.map

/***/ }),

/***/ 572:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ScoreboardsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_backend_backend__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_socket_service_socket_service__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__scorekeeper_scorekeeper__ = __webpack_require__(154);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the ScoreboardsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ScoreboardsPage = (function () {
    function ScoreboardsPage(socket, events, backend, navCtrl, navParams) {
        this.socket = socket;
        this.events = events;
        this.backend = backend;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.scoreboards = [];
    }
    ScoreboardsPage.prototype.ionViewDidLoad = function () {
        var questo = this;
        console.log('ionViewDidLoad ScoreboardsPage');
        //questo.socket.sendCustomMessage("scoreboards",{});
        /*questo.events.subscribe("scoreboards",function(data){
          console.log("received scoreboards in scoreboards.ts")
          questo.scoreboards=data.scoreboards
        })*/
        questo.events.subscribe("scoreboard", function (data) {
            questo.refresh(function () { });
        });
        questo.refresh(function () { });
    };
    ScoreboardsPage.prototype.refresh = function (callback) {
        var questo = this;
        questo.backend.getScoreboards(function (data) {
            questo.scoreboards = data;
            callback();
        });
    };
    ScoreboardsPage.prototype.ionViewDidLeave = function () {
        this.events.unsubscribe("scoreboard");
    };
    ScoreboardsPage.prototype.gotoScorekeeper = function (s) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__scorekeeper_scorekeeper__["a" /* ScorekeeperPage */], {
            mode: "slave",
            scoreboard: s
        });
    };
    return ScoreboardsPage;
}());
ScoreboardsPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-scoreboards',template:/*ion-inline-start:"/Users/demetriomortelliti/Desktop/demy/PROJECTS/appkwondo/clients/ion2kwondo/src/pages/scoreboards/scoreboards.html"*/'<!--\n  Generated template for the ScoreboardsPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar>\n    <ion-title>scoreboards</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n\n  <ion-list>\n    <ion-item style="display:none" *ngFor="let s of scoreboards">\n      <ion-row class="riga">\n        <ion-col col-5 class="atleta">{{s.player1.cognome+\' \'+s.player1.nome}}<br><span\n            class="societa">{{s.player1.societa}}</span> - </ion-col>\n\n        <ion-col col-5 class="atleta">{{s.player2.cognome+\' \'+s.player2.nome}}<br><span\n            class="societa">{{s.player2.societa}}</span></ion-col>\n        <ion-col col-1 class="punteggio">{{s.punt1}}-{{s.punt2}}</ion-col>\n        <ion-col col-1 class="timeleft">{{s.timeleft}}</ion-col>\n      </ion-row>\n\n\n    </ion-item>\n\n    <div *ngFor="let s of scoreboards" class="scoreitem" tappable (tap)="gotoScorekeeper(s)">\n      <table width="100%">\n        <tr>\n          <td width="10%" rowspan="2" class="timeleft">{{s.timeLeft}}</td>\n          <td width="80%" class="left">\n            <div class="atleta">{{s.player1.cognome+\' \'+s.player1.nome}}</div>\n            <div class="societa">{{s.player1.societa}}</div>\n          </td>\n          <td class="punt1" width="10%">\n            {{s.punt1}}\n          </td>\n        </tr>\n        <tr>\n          <td width="80%" class="left">\n            <div class="atleta">{{s.player2.cognome+\' \'+s.player2.nome}}</div>\n            <div class="societa">{{s.player2.societa}}</div>\n          </td>\n          <td class="punt2" width="10%">\n            {{s.punt2}}\n          </td>\n\n        </tr>\n      </table>\n\n    </div>\n\n\n  </ion-list>\n\n</ion-content>'/*ion-inline-end:"/Users/demetriomortelliti/Desktop/demy/PROJECTS/appkwondo/clients/ion2kwondo/src/pages/scoreboards/scoreboards.html"*/,
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__providers_socket_service_socket_service__["a" /* SocketService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__providers_socket_service_socket_service__["a" /* SocketService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__providers_backend_backend__["a" /* BackendProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__providers_backend_backend__["a" /* BackendProvider */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */]) === "function" && _e || Object])
], ScoreboardsPage);

var _a, _b, _c, _d, _e;
//# sourceMappingURL=scoreboards.js.map

/***/ }),

/***/ 575:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(576);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(594);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);


//import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["enableProdMode"])();
Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 594:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_component__ = __webpack_require__(645);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_about_about__ = __webpack_require__(156);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_contact_contact__ = __webpack_require__(742);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_chat_chat__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_sendpush_sendpush__ = __webpack_require__(569);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_chatlist_chatlist__ = __webpack_require__(523);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_chatpopover_chatpopover__ = __webpack_require__(743);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_popover_popover__ = __webpack_require__(524);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_chatfoto_chatfoto__ = __webpack_require__(522);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_home_home__ = __webpack_require__(136);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_twitter_twitter__ = __webpack_require__(744);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_partnerworld_partnerworld__ = __webpack_require__(745);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_linkedin_linkedin__ = __webpack_require__(746);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_contacts_contacts__ = __webpack_require__(747);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_login_login__ = __webpack_require__(507);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_browser_browser__ = __webpack_require__(748);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_tournament_tournament__ = __webpack_require__(153);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__pages_tabs_tabs__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__pages_settings_settings__ = __webpack_require__(571);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__pages_account_account__ = __webpack_require__(155);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__pages_bp_bp__ = __webpack_require__(749);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__pages_gare_gare__ = __webpack_require__(519);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__pages_gara_gara__ = __webpack_require__(142);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__pages_editgara_editgara__ = __webpack_require__(551);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__pages_atleti_atleti__ = __webpack_require__(553);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__pages_atleta_atleta__ = __webpack_require__(554);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__pages_matchconsole_matchconsole__ = __webpack_require__(521);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__pages_matchconsolerr_matchconsolerr__ = __webpack_require__(552);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__pages_eventi_eventi__ = __webpack_require__(557);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__pages_societa_societa__ = __webpack_require__(558);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__pages_stats_stats__ = __webpack_require__(559);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__pages_iospaid_iospaid__ = __webpack_require__(750);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__pages_filters_filters__ = __webpack_require__(531);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__pages_matchesforatleta_matchesforatleta__ = __webpack_require__(520);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__pages_medagliereglobale_medagliereglobale__ = __webpack_require__(533);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37__pages_map_map__ = __webpack_require__(529);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38__pages_register_register__ = __webpack_require__(565);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_39__pages_users_users__ = __webpack_require__(566);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_40__pages_connections_connections__ = __webpack_require__(568);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_41__pages_servizisocieta_servizisocieta__ = __webpack_require__(157);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_42__pages_products_products__ = __webpack_require__(561);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_43__pages_cart_cart__ = __webpack_require__(562);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_44__pages_rtc_rtc__ = __webpack_require__(751);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_45__pages_editproduct_editproduct__ = __webpack_require__(563);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_46__pages_editatleta_editatleta__ = __webpack_require__(556);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_47__pages_orders_orders__ = __webpack_require__(564);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_48__pages_addmatches_addmatches__ = __webpack_require__(528);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_49__pages_useredit_useredit__ = __webpack_require__(567);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_50__pages_broadcast_broadcast__ = __webpack_require__(530);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_51__pages_broadcastview_broadcastview__ = __webpack_require__(570);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_52__pages_tkdtlive_tkdtlive__ = __webpack_require__(532);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_53__pages_fblive_fblive__ = __webpack_require__(752);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_54__pages_scorekeeper_scorekeeper__ = __webpack_require__(154);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_55__pages_scoreboards_scoreboards__ = __webpack_require__(572);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_56__components_section_section__ = __webpack_require__(753);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_57__providers_socket_service_socket_service__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_58__providers_backend_backend__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_59__providers_google_google__ = __webpack_require__(555);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_60__components_scrollable_tabs_scrollable_tabs__ = __webpack_require__(754);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_61__components_scrollable_segments_scrollable_segments__ = __webpack_require__(755);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_62__providers_utils_utils__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_63__ionic_native_badge__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_64__ionic_storage__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_65__ionic_native_app_availability__ = __webpack_require__(141);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_66__ionic_native_splash_screen__ = __webpack_require__(506);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_67__ionic_native_device_feedback__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_68__angular_platform_browser__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_69__angular_http__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_70__ionic_native_file__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_71__ionic_native_camera__ = __webpack_require__(525);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_72__ionic_native_transfer__ = __webpack_require__(158);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_73__ionic_native_social_sharing__ = __webpack_require__(526);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_74_ionic_image_loader__ = __webpack_require__(756);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_75__ionic_native_local_notifications__ = __webpack_require__(339);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_76__ionic_native_text_to_speech__ = __webpack_require__(340);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_77__ionic_native_background_mode__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_78__providers_facebook_facebook__ = __webpack_require__(560);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_79__ionic_native_media__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_80__ionic_native_file_transfer__ = __webpack_require__(527);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_81__ionic_native_streaming_media__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_82__ionic_native_android_permissions__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_83__ionic_native_in_app_browser__ = __webpack_require__(342);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_84__ionic_native_facebook__ = __webpack_require__(343);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_85_ng_elastic__ = __webpack_require__(759);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_85_ng_elastic___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_85_ng_elastic__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_86__angular_forms__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_87__ionic_native_unique_device_id__ = __webpack_require__(341);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_88__ionic_native_fcm__ = __webpack_require__(344);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};











































































//import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';














//import { IonicAudioModule, WebAudioProvider, CordovaMediaProvider, defaultAudioProviderFactory } from 'ionic-audio';
/*
export function myCustomAudioProviderFactory() {
  return (window.hasOwnProperty('cordova')) ? new CordovaMediaProvider() : new WebAudioProvider();
}
*/
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_3__pages_about_about__["a" /* AboutPage */],
            __WEBPACK_IMPORTED_MODULE_4__pages_contact_contact__["a" /* ContactPage */],
            __WEBPACK_IMPORTED_MODULE_11__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_13__pages_partnerworld_partnerworld__["a" /* PartnerworldPage */],
            __WEBPACK_IMPORTED_MODULE_14__pages_linkedin_linkedin__["a" /* LinkedinPage */],
            __WEBPACK_IMPORTED_MODULE_15__pages_contacts_contacts__["a" /* ContactsPage */],
            __WEBPACK_IMPORTED_MODULE_5__pages_chat_chat__["a" /* ChatPage */],
            __WEBPACK_IMPORTED_MODULE_53__pages_fblive_fblive__["a" /* FblivePage */],
            __WEBPACK_IMPORTED_MODULE_7__pages_chatlist_chatlist__["a" /* ChatlistPage */],
            __WEBPACK_IMPORTED_MODULE_10__pages_chatfoto_chatfoto__["a" /* ChatfotoPage */],
            __WEBPACK_IMPORTED_MODULE_8__pages_chatpopover_chatpopover__["a" /* ChatpopoverPage */],
            __WEBPACK_IMPORTED_MODULE_48__pages_addmatches_addmatches__["a" /* AddmatchesPage */],
            __WEBPACK_IMPORTED_MODULE_16__pages_login_login__["a" /* LoginPage */],
            __WEBPACK_IMPORTED_MODULE_19__pages_tabs_tabs__["a" /* TabsPage */],
            __WEBPACK_IMPORTED_MODULE_20__pages_settings_settings__["a" /* SettingsPage */],
            __WEBPACK_IMPORTED_MODULE_21__pages_account_account__["a" /* AccountPage */],
            __WEBPACK_IMPORTED_MODULE_12__pages_twitter_twitter__["a" /* TwitterPage */],
            __WEBPACK_IMPORTED_MODULE_17__pages_browser_browser__["a" /* BrowserPage */],
            __WEBPACK_IMPORTED_MODULE_22__pages_bp_bp__["a" /* BpPage */],
            __WEBPACK_IMPORTED_MODULE_23__pages_gare_gare__["a" /* GarePage */],
            __WEBPACK_IMPORTED_MODULE_26__pages_atleti_atleti__["a" /* AtletiPage */],
            __WEBPACK_IMPORTED_MODULE_27__pages_atleta_atleta__["a" /* AtletaPage */],
            __WEBPACK_IMPORTED_MODULE_30__pages_eventi_eventi__["a" /* EventiPage */],
            __WEBPACK_IMPORTED_MODULE_24__pages_gara_gara__["a" /* GaraPage */],
            __WEBPACK_IMPORTED_MODULE_25__pages_editgara_editgara__["a" /* EditgaraPage */],
            __WEBPACK_IMPORTED_MODULE_31__pages_societa_societa__["a" /* SocietaPage */],
            __WEBPACK_IMPORTED_MODULE_35__pages_matchesforatleta_matchesforatleta__["a" /* MatchesforatletaPage */],
            __WEBPACK_IMPORTED_MODULE_28__pages_matchconsole_matchconsole__["a" /* MatchconsolePage */],
            __WEBPACK_IMPORTED_MODULE_29__pages_matchconsolerr_matchconsolerr__["a" /* MatchconsolerrPage */],
            __WEBPACK_IMPORTED_MODULE_37__pages_map_map__["a" /* MapPage */],
            __WEBPACK_IMPORTED_MODULE_32__pages_stats_stats__["a" /* StatsPage */],
            __WEBPACK_IMPORTED_MODULE_34__pages_filters_filters__["a" /* FiltersPage */],
            __WEBPACK_IMPORTED_MODULE_60__components_scrollable_tabs_scrollable_tabs__["a" /* ScrollableTabs */],
            __WEBPACK_IMPORTED_MODULE_61__components_scrollable_segments_scrollable_segments__["a" /* ScrollableSegments */],
            __WEBPACK_IMPORTED_MODULE_36__pages_medagliereglobale_medagliereglobale__["a" /* MedagliereglobalePage */],
            __WEBPACK_IMPORTED_MODULE_38__pages_register_register__["a" /* RegisterPage */],
            __WEBPACK_IMPORTED_MODULE_39__pages_users_users__["a" /* UsersPage */],
            __WEBPACK_IMPORTED_MODULE_40__pages_connections_connections__["a" /* ConnectionsPage */],
            __WEBPACK_IMPORTED_MODULE_9__pages_popover_popover__["a" /* PopoverPage */],
            __WEBPACK_IMPORTED_MODULE_41__pages_servizisocieta_servizisocieta__["a" /* ServizisocietaPage */],
            __WEBPACK_IMPORTED_MODULE_42__pages_products_products__["a" /* ProductsPage */],
            __WEBPACK_IMPORTED_MODULE_43__pages_cart_cart__["a" /* CartPage */],
            __WEBPACK_IMPORTED_MODULE_44__pages_rtc_rtc__["a" /* RtcPage */],
            __WEBPACK_IMPORTED_MODULE_45__pages_editproduct_editproduct__["a" /* EditproductPage */],
            __WEBPACK_IMPORTED_MODULE_47__pages_orders_orders__["a" /* OrdersPage */],
            __WEBPACK_IMPORTED_MODULE_46__pages_editatleta_editatleta__["a" /* EditatletaPage */],
            __WEBPACK_IMPORTED_MODULE_33__pages_iospaid_iospaid__["a" /* IospaidPage */],
            __WEBPACK_IMPORTED_MODULE_49__pages_useredit_useredit__["a" /* UsereditPage */],
            __WEBPACK_IMPORTED_MODULE_50__pages_broadcast_broadcast__["a" /* BroadcastPage */],
            __WEBPACK_IMPORTED_MODULE_51__pages_broadcastview_broadcastview__["a" /* BroadcastviewPage */],
            __WEBPACK_IMPORTED_MODULE_52__pages_tkdtlive_tkdtlive__["a" /* TkdtlivePage */],
            __WEBPACK_IMPORTED_MODULE_6__pages_sendpush_sendpush__["a" /* SendpushPage */],
            __WEBPACK_IMPORTED_MODULE_18__pages_tournament_tournament__["a" /* TournamentPage */],
            __WEBPACK_IMPORTED_MODULE_56__components_section_section__["a" /* SectionComponent */],
            __WEBPACK_IMPORTED_MODULE_54__pages_scorekeeper_scorekeeper__["a" /* ScorekeeperPage */],
            __WEBPACK_IMPORTED_MODULE_55__pages_scoreboards_scoreboards__["a" /* ScoreboardsPage */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_68__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_69__angular_http__["b" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_2__app_component__["a" /* MyApp */], {
                backButtonText: '',
                activator: 'ripple',
                backButtonIcon: 'ios-arrow-back',
                animate: true
            }, {
                links: [
                    { loadChildren: '../pages/iscritti/iscritti.module#IscrittiPageModule', name: 'IscrittiPage', segment: 'iscritti', priority: 'low', defaultHistory: [] }
                ]
            }),
            __WEBPACK_IMPORTED_MODULE_64__ionic_storage__["a" /* IonicStorageModule */].forRoot(),
            __WEBPACK_IMPORTED_MODULE_74_ionic_image_loader__["a" /* IonicImageLoader */].forRoot(),
            __WEBPACK_IMPORTED_MODULE_85_ng_elastic__["ElasticModule"],
            __WEBPACK_IMPORTED_MODULE_86__angular_forms__["FormsModule"]
            //Facebook
            //IonicAudioModule.forRoot(defaultAudioProviderFactory)
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicApp */]],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_2__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_3__pages_about_about__["a" /* AboutPage */],
            __WEBPACK_IMPORTED_MODULE_4__pages_contact_contact__["a" /* ContactPage */],
            __WEBPACK_IMPORTED_MODULE_5__pages_chat_chat__["a" /* ChatPage */],
            __WEBPACK_IMPORTED_MODULE_7__pages_chatlist_chatlist__["a" /* ChatlistPage */],
            __WEBPACK_IMPORTED_MODULE_10__pages_chatfoto_chatfoto__["a" /* ChatfotoPage */],
            __WEBPACK_IMPORTED_MODULE_8__pages_chatpopover_chatpopover__["a" /* ChatpopoverPage */],
            __WEBPACK_IMPORTED_MODULE_48__pages_addmatches_addmatches__["a" /* AddmatchesPage */],
            __WEBPACK_IMPORTED_MODULE_11__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_13__pages_partnerworld_partnerworld__["a" /* PartnerworldPage */],
            __WEBPACK_IMPORTED_MODULE_14__pages_linkedin_linkedin__["a" /* LinkedinPage */],
            __WEBPACK_IMPORTED_MODULE_15__pages_contacts_contacts__["a" /* ContactsPage */],
            __WEBPACK_IMPORTED_MODULE_16__pages_login_login__["a" /* LoginPage */],
            __WEBPACK_IMPORTED_MODULE_19__pages_tabs_tabs__["a" /* TabsPage */],
            __WEBPACK_IMPORTED_MODULE_21__pages_account_account__["a" /* AccountPage */],
            __WEBPACK_IMPORTED_MODULE_20__pages_settings_settings__["a" /* SettingsPage */],
            __WEBPACK_IMPORTED_MODULE_12__pages_twitter_twitter__["a" /* TwitterPage */],
            __WEBPACK_IMPORTED_MODULE_17__pages_browser_browser__["a" /* BrowserPage */],
            __WEBPACK_IMPORTED_MODULE_22__pages_bp_bp__["a" /* BpPage */],
            __WEBPACK_IMPORTED_MODULE_53__pages_fblive_fblive__["a" /* FblivePage */],
            __WEBPACK_IMPORTED_MODULE_23__pages_gare_gare__["a" /* GarePage */],
            __WEBPACK_IMPORTED_MODULE_26__pages_atleti_atleti__["a" /* AtletiPage */],
            __WEBPACK_IMPORTED_MODULE_27__pages_atleta_atleta__["a" /* AtletaPage */],
            __WEBPACK_IMPORTED_MODULE_30__pages_eventi_eventi__["a" /* EventiPage */],
            __WEBPACK_IMPORTED_MODULE_24__pages_gara_gara__["a" /* GaraPage */],
            __WEBPACK_IMPORTED_MODULE_25__pages_editgara_editgara__["a" /* EditgaraPage */],
            __WEBPACK_IMPORTED_MODULE_31__pages_societa_societa__["a" /* SocietaPage */],
            __WEBPACK_IMPORTED_MODULE_32__pages_stats_stats__["a" /* StatsPage */],
            __WEBPACK_IMPORTED_MODULE_34__pages_filters_filters__["a" /* FiltersPage */],
            __WEBPACK_IMPORTED_MODULE_35__pages_matchesforatleta_matchesforatleta__["a" /* MatchesforatletaPage */],
            __WEBPACK_IMPORTED_MODULE_28__pages_matchconsole_matchconsole__["a" /* MatchconsolePage */],
            __WEBPACK_IMPORTED_MODULE_29__pages_matchconsolerr_matchconsolerr__["a" /* MatchconsolerrPage */],
            __WEBPACK_IMPORTED_MODULE_37__pages_map_map__["a" /* MapPage */],
            __WEBPACK_IMPORTED_MODULE_36__pages_medagliereglobale_medagliereglobale__["a" /* MedagliereglobalePage */],
            __WEBPACK_IMPORTED_MODULE_38__pages_register_register__["a" /* RegisterPage */],
            __WEBPACK_IMPORTED_MODULE_39__pages_users_users__["a" /* UsersPage */],
            __WEBPACK_IMPORTED_MODULE_40__pages_connections_connections__["a" /* ConnectionsPage */],
            __WEBPACK_IMPORTED_MODULE_9__pages_popover_popover__["a" /* PopoverPage */],
            __WEBPACK_IMPORTED_MODULE_41__pages_servizisocieta_servizisocieta__["a" /* ServizisocietaPage */],
            __WEBPACK_IMPORTED_MODULE_42__pages_products_products__["a" /* ProductsPage */],
            __WEBPACK_IMPORTED_MODULE_43__pages_cart_cart__["a" /* CartPage */],
            __WEBPACK_IMPORTED_MODULE_44__pages_rtc_rtc__["a" /* RtcPage */],
            __WEBPACK_IMPORTED_MODULE_45__pages_editproduct_editproduct__["a" /* EditproductPage */],
            __WEBPACK_IMPORTED_MODULE_47__pages_orders_orders__["a" /* OrdersPage */],
            __WEBPACK_IMPORTED_MODULE_46__pages_editatleta_editatleta__["a" /* EditatletaPage */],
            __WEBPACK_IMPORTED_MODULE_33__pages_iospaid_iospaid__["a" /* IospaidPage */],
            __WEBPACK_IMPORTED_MODULE_49__pages_useredit_useredit__["a" /* UsereditPage */],
            __WEBPACK_IMPORTED_MODULE_50__pages_broadcast_broadcast__["a" /* BroadcastPage */],
            __WEBPACK_IMPORTED_MODULE_51__pages_broadcastview_broadcastview__["a" /* BroadcastviewPage */],
            __WEBPACK_IMPORTED_MODULE_52__pages_tkdtlive_tkdtlive__["a" /* TkdtlivePage */],
            __WEBPACK_IMPORTED_MODULE_6__pages_sendpush_sendpush__["a" /* SendpushPage */],
            __WEBPACK_IMPORTED_MODULE_18__pages_tournament_tournament__["a" /* TournamentPage */],
            __WEBPACK_IMPORTED_MODULE_54__pages_scorekeeper_scorekeeper__["a" /* ScorekeeperPage */],
            __WEBPACK_IMPORTED_MODULE_55__pages_scoreboards_scoreboards__["a" /* ScoreboardsPage */]
        ],
        providers: [{ provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ErrorHandler"], useClass: __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicErrorHandler */] },
            __WEBPACK_IMPORTED_MODULE_57__providers_socket_service_socket_service__["a" /* SocketService */],
            __WEBPACK_IMPORTED_MODULE_58__providers_backend_backend__["a" /* BackendProvider */],
            __WEBPACK_IMPORTED_MODULE_62__providers_utils_utils__["a" /* UtilsProvider */],
            __WEBPACK_IMPORTED_MODULE_59__providers_google_google__["a" /* GoogleDriveProvider */],
            /* Storage,*/
            __WEBPACK_IMPORTED_MODULE_66__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_65__ionic_native_app_availability__["a" /* AppAvailability */],
            __WEBPACK_IMPORTED_MODULE_67__ionic_native_device_feedback__["a" /* DeviceFeedback */],
            __WEBPACK_IMPORTED_MODULE_70__ionic_native_file__["a" /* File */],
            __WEBPACK_IMPORTED_MODULE_71__ionic_native_camera__["a" /* Camera */],
            __WEBPACK_IMPORTED_MODULE_72__ionic_native_transfer__["a" /* Transfer */],
            __WEBPACK_IMPORTED_MODULE_73__ionic_native_social_sharing__["a" /* SocialSharing */],
            __WEBPACK_IMPORTED_MODULE_75__ionic_native_local_notifications__["a" /* LocalNotifications */],
            __WEBPACK_IMPORTED_MODULE_77__ionic_native_background_mode__["a" /* BackgroundMode */],
            __WEBPACK_IMPORTED_MODULE_76__ionic_native_text_to_speech__["a" /* TextToSpeech */],
            __WEBPACK_IMPORTED_MODULE_79__ionic_native_media__["a" /* MediaPlugin */],
            __WEBPACK_IMPORTED_MODULE_81__ionic_native_streaming_media__["a" /* StreamingMedia */],
            __WEBPACK_IMPORTED_MODULE_80__ionic_native_file_transfer__["a" /* FileTransfer */],
            __WEBPACK_IMPORTED_MODULE_63__ionic_native_badge__["a" /* Badge */],
            __WEBPACK_IMPORTED_MODULE_87__ionic_native_unique_device_id__["a" /* UniqueDeviceID */],
            __WEBPACK_IMPORTED_MODULE_82__ionic_native_android_permissions__["a" /* AndroidPermissions */],
            __WEBPACK_IMPORTED_MODULE_83__ionic_native_in_app_browser__["a" /* InAppBrowser */],
            __WEBPACK_IMPORTED_MODULE_84__ionic_native_facebook__["a" /* Facebook */],
            __WEBPACK_IMPORTED_MODULE_88__ionic_native_fcm__["a" /* FCM */],
            __WEBPACK_IMPORTED_MODULE_78__providers_facebook_facebook__["a" /* FacebookProvider */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 6:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BackendProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_utils__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_storage__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_device_feedback__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_badge__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_local_notifications__ = __webpack_require__(339);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_background_mode__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_text_to_speech__ = __webpack_require__(340);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_unique_device_id__ = __webpack_require__(341);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_native_in_app_browser__ = __webpack_require__(342);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__ionic_native_facebook__ = __webpack_require__(343);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__ionic_native_fcm__ = __webpack_require__(344);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__ionic_native_streaming_media__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__ionic_native_media__ = __webpack_require__(114);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









//import * as xml2js from "xml2js";
//import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';










//import { Push } from 'ionic-native';
/*
  Generated class for the BackendProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
var BackendProvider = (function () {
    function BackendProvider(media, toastCtrl, loadingCtrl, streamingMedia, fcm, fb, iab, alertCtrl, uniqueDeviceID, tts, backgroundMode, localNotifications, badge, feedback, storage, events, platform, http, utils) {
        this.media = media;
        this.toastCtrl = toastCtrl;
        this.loadingCtrl = loadingCtrl;
        this.streamingMedia = streamingMedia;
        this.fcm = fcm;
        this.fb = fb;
        this.iab = iab;
        this.alertCtrl = alertCtrl;
        this.uniqueDeviceID = uniqueDeviceID;
        this.tts = tts;
        this.backgroundMode = backgroundMode;
        this.localNotifications = localNotifications;
        this.badge = badge;
        this.feedback = feedback;
        this.storage = storage;
        this.events = events;
        this.platform = platform;
        this.http = http;
        this.utils = utils;
        this.isProduction = true;
        this.appVersion = {
            name: "appkwondov2",
            version: "2.1.8",
            releasedate: "15/04/2019"
        };
        //@ViewChild(Navbar) navBar: Navbar;
        this.rooturl = "http://tkdr.herokuapp.com";
        //public rooturl = "http://localhost:3000";  
        //public rooturl="http://appkwondo.mybluemix.net"; 
        //9.71.212.38
        //public rooturl="http://10.113.32.153:3000"
        //public rooturl = "http://9.71.213.40:3000";
        //public rooturl = "http://192.168.1.196:3000";
        this.token = "eyJhbGciOiJIUzI1NiJ9.ZGVteW1vcnRlbGxpdGlAaXQuaWJtLmNvbQ.mA3t-fOoUDsugN-kWblqO0ueVFSXya2W6hs5fa5sddQ";
        this.user = {
            token: "",
            email: "",
            gcmtoken: "",
            twitter: {
                oauth_token: "",
                oauth_verifier: ""
            },
            role: "BP_GUEST",
            sockid: "unknown",
            uniquedeviceid: "",
            societaid: "20160217220400",
            id: ""
        };
        this.fbUserData = {};
        this.fbloggedin = false;
        this.activesocieta = "ASD TAEKWONDO ROZZANO";
        this.debugActive = true;
        this.oldConsoleLog = null;
        this.isIbmAdmin = false;
        this.unreadposts = 0;
        this.lastunreadpost = "";
        this.bpfilters = {};
        this.atleti = [];
        this.rtmatches = [];
        this.chatmessages = [];
        this.gare = [];
        this.soundTime = 1500;
        this.appSettings = {
            notifications: true,
            sound: false,
            voice: false,
            feedback: true,
            server: "http://tkdr.herokuapp.com",
            chatnotify: false
        };
        this.activegara = {
            gara: {
                rows: []
            },
            cronaca: {
                rows: []
            },
            matchesbyatleta: {
                rows: []
            },
            matchesbyprog: {
                rows: []
            },
            realtime: {
                rows: []
            }
        };
        this.matchconsoles = [];
        this.navOptions = {
            animate: false,
            animation: 'md-transition'
        };
        this.unread = 0;
        this.isChatView = false;
        this.voicetime = 1500;
        this.soundtime = 1000;
        this.cart = [];
        this.settings = {
            mysocieta: "20160217220400",
            mysocietaname: "ASD Taekwondo Rozzano",
            logourl: "http://www.taekwondorozzano.it/wp-content/themes/Taekwondo/images/logo-tae-kwan-do-rozzano.png"
        };
        this.chatpageaccessed = false;
        this.activechatfilename = "chatno64.json";
        this.nextevents = [];
        this.isIosWeb = false;
        this.rtcpeers = [];
        this.myPeerId = "";
        this.myPeerConnected = false;
        this.fbLives = [];
        this.alertAnimationOptions = {
            animate: false
        };
        this.clientuuid = "";
        this.getMaschiFemmine = function ($mr, su_cosa) {
            //colog("getmaschifemmine");
            //colog(jcurrentgara.iscritti)
            var $m = $mr;
            if ($mr.rows)
                $m = $mr.rows;
            //var iscritti = jcurrentgara.iscritti.split(",");
            var maschi = 0;
            var femmine = 0;
            for (var i = 0; i < $m.length; i++) {
                //$($m).each(function (i) {
                //console.log("$M: "+JSON.stringify($m[i]))
                var $a;
                if (su_cosa == "iscritti") {
                    $a = this.getAtletaById($m[i]);
                }
                else
                    $a = this.getAtletaById($m[i].doc.atletaid);
                var sesso = "M";
                if ($a.sesso)
                    sesso = $a.sesso.toUpperCase();
                if (sesso == "M")
                    maschi++;
                if (sesso == "F")
                    femmine++;
                //console.log($a.cognome+" "+$a.nome+" - "+sesso);
            }
            var retvalue = {
                maschi: maschi,
                femmine: femmine
            };
            return retvalue;
        };
        this.filterRows = function ($m, filt, exact) {
            if (!exact)
                exact = false;
            //console.log("filterrows: ")
            //console.log($m)
            var $retrows = {
                rows: []
            };
            var rows = $m;
            if ($m.rows)
                rows = $m.rows;
            //var rows = $m.rows; //[{person:"me", age :"30"},{person:"you",age:"25"}];
            for (var i = 0; i < rows.length; i++) {
                var row = rows[i];
                var eligible = true;
                for (var key in row.doc) {
                    //console.log("key: "+key + " . "+ row.doc[key]);
                    //console.log(filt);
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
                                    }
                                    else {
                                        eligible = eligible && false;
                                    }
                                }
                                else {
                                    if (v2.indexOf(v1) > -1) {
                                        // console.log("found !: "+v2);
                                    }
                                    else {
                                        eligible = eligible && false;
                                    }
                                }
                            }
                        }
                    }
                }
                if (eligible)
                    $retrows.rows.push(row);
            }
            return $retrows;
        };
        this.replaceAll = function (string, search, replacement) {
            var target = string;
            return target.split(search).join(replacement);
        };
        this.clientuuid = this.createGuid();
        console.log('Hello BackendProvider Provider, clientuuid', this.clientuuid);
        var a = window.localStorage.getItem("ion2kwondo_settings");
        if (a) {
            var ja = JSON.parse(a);
            this.appSettings = ja;
            //this.rooturl = this.appSettings.server;
            console.log("found settings cookie, using it", ja);
        }
        //this.browser=
        /*this.refreshContacts(function(data){
    
        });*/
    }
    BackendProvider.prototype.createGuid = function () {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    };
    BackendProvider.prototype.getFbLoginStatus = function (callback) {
        var questo = this;
        questo.fb.getLoginStatus()
            .then(function (res) {
            console.log("fbloginstatus", res.authResponse);
            if (callback)
                callback(res);
        })
            .catch(function (err) {
            console.log("error in getfbloginstatus", err);
            if (callback)
                callback(err);
        });
    };
    BackendProvider.prototype.fbLogin = function (callback) {
        var questo = this;
        questo.fb.login(['public_profile', 'user_friends', 'email'])
            .then(function (res) {
            console.log('Logged into Facebook!', res);
            questo.fbloggedin = true;
            questo.fb.api('me?fields=id,name,email,first_name,picture.width(720).height(720).as(picture_large)', []).then(function (profile) {
                questo.fbUserData = { email: profile['email'], first_name: profile['first_name'], picture: profile['picture_large']['data']['url'], username: profile['name'] };
                console.log("fbuserdata", questo.fbUserData);
                questo.fb.api("10216205161668483?fields=permalink_url", []).then(function (result) {
                    //questo.fb.api('/' + res.authResponse.userID + '?fields=id,name,gender', []).then(result => {
                    console.log("result", result);
                }).catch(function (error) {
                    console.log("error in graph", error);
                });
            });
        })
            .catch(function (e) { return console.log('Error logging into Facebook', e); });
    };
    BackendProvider.prototype.setupNavbarBack = function (nb, nc) {
        if (true)
            return;
        var questo = this;
        nb.backButtonClick = function (e) {
            // todo something
            console.log("navbar back clicked");
            //questo.playFeedback();
            //if (nc.canGoBack()) nc.pop();
        };
    };
    BackendProvider.prototype.enableLogger = function () {
        if (this.oldConsoleLog == null) {
            return;
        }
        window['console']['log'] = this.oldConsoleLog;
    };
    BackendProvider.prototype.disableLogger = function () {
        this.oldConsoleLog = console.log;
        window['console']['log'] = function () { };
    };
    ;
    BackendProvider.prototype.playFeedback = function () {
        var questo = this;
        if (questo.platform.is("cordova")) {
            if (!questo.platform.is("ios")) {
                //if (questo.appSettings.feedback) questo.feedback.acoustic();
            }
        }
    };
    BackendProvider.prototype.playVoice = function (text) {
        var questo = this;
        clearTimeout(questo.voicetimer);
        if (this.appSettings.voice) {
            questo.voicetimer = setTimeout(function () {
                console.log("playing tts", text);
                var pl = questo.platform.is("cordova");
                if (pl) {
                    console.log("playvoice for cordova platform");
                    var rate = 1;
                    if (questo.platform.is("ios"))
                        rate = 1.5;
                    var parms = {
                        text: text.replace("-", " a "),
                        locale: 'it-IT',
                        rate: rate
                    };
                    questo.tts.speak(parms)
                        .then(function () { return console.log('Success speaking ' + text); })
                        .catch(function (reason) { return console.log("TTS Error", reason); });
                }
                else {
                    if (window.speechSynthesis) {
                        console.log("non cordova app, speechsythesis found !");
                        var msg = new SpeechSynthesisUtterance();
                        //var msg = new SpeechSynthesisUtterance(data.text);
                        msg.lang = 'it-IT';
                        //msg.voice = voices[1];
                        msg.text = text.replace("-", " a ");
                        window.speechSynthesis.speak(msg);
                    }
                    else
                        console.log("speec synthesis not found on this browser");
                }
                clearTimeout(questo.voicetimer);
            }, questo.voicetime);
        }
    };
    BackendProvider.prototype.colog = function () {
        var dbg = this.debugActive;
        if (!dbg)
            return;
        console.log.apply(console, arguments);
    };
    BackendProvider.prototype.conslog = function () {
        var dbg = this.debugActive;
        if (!dbg)
            return;
        console.log.apply(console, arguments);
    };
    BackendProvider.prototype.getRandomNumber = function (n) {
        return Math.floor((Math.random() * n) + 1);
    };
    BackendProvider.prototype.getDerbyText = function (id) {
        var questo = this;
        var retvalue = "";
        var m = questo.getMatchById(id);
        //console.log("M",m);
        if (m) {
            if (m.hasOwnProperty("rows")) {
                if (m.rows.length > 0) {
                    if (m.rows[0].hasOwnProperty("doc")) {
                        var atl = questo.getAtletaById(m.rows[0].doc.atletaid);
                        retvalue = "derby con " + atl.cognome + " " + atl.nome + " !!";
                        retvalue = retvalue.toUpperCase();
                    }
                }
            }
        }
        if (!id)
            retvalue = "";
        return retvalue;
    };
    BackendProvider.prototype.getAllNews = function (callback) {
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
        }
        else
            lastunread = stordata;
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
                titem.jdate = __WEBPACK_IMPORTED_MODULE_7_moment__(ndate).format("YYYYMMDDHHmmSS");
                titem.jdate = "20170601000000";
                titem.data = __WEBPACK_IMPORTED_MODULE_7_moment__(ndate).format("DD/MM/YYYY HH:mm:SS");
                titem.link = titem.link_social;
                allnews.push(titem);
            });
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
                    };
                    allnews.push(newitem);
                });
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
                        };
                        allnews.push(newitem);
                    });
                    allnews.sort(function (a, b) {
                        var a1 = a.jdate;
                        var b1 = b.jdate;
                        if (a1 > b1)
                            return -1;
                        if (a1 < b1)
                            return 1;
                        return 0;
                    });
                    var maxunread = "";
                    allnews.forEach(function (aitm, aidx) {
                        var jdate = aitm.jdate;
                        console.log("jdate", jdate, aitm.infosource, jdate.length);
                        if (jdate.length == 14) {
                            if (jdate > lastunread) {
                                aitm.isnew = true;
                                unreadposts++;
                                if (jdate > maxunread)
                                    maxunread = jdate;
                                //console.log(jdate, lastunread, maxunread);
                            }
                            else
                                aitm.isnew = false;
                        }
                    });
                    questo.unreadposts = unreadposts;
                    console.log("unreadposts", unreadposts, "maxunread", maxunread);
                    if (maxunread != "") {
                        questo.lastunreadpost = maxunread;
                        window.localStorage.setItem('lastreadpost', maxunread);
                        //questo.utils.setStorage("lastreadpost",maxunread);
                        //questo.storage.set('lastreadpost', maxunread).then(() => {
                        console.log('lastunread has been set');
                    }
                    if (callback)
                        callback(allnews);
                    //});
                    //  questo.utils.setStorage("bpei_lastreadpost", maxunread)
                });
            });
        });
    };
    BackendProvider.prototype.clearUnreadPosts = function () {
        this.unreadposts = 0;
    };
    BackendProvider.prototype.getLinkedin = function (callback) {
        var url = this.rooturl + "/linkedin/feeds";
        this.fetchData(url, function (data) {
            console.log("got linkedin");
            if (callback)
                callback(data);
        });
    };
    BackendProvider.prototype.getBp = function (filters, callback) {
        var url = this.rooturl + "/bp/filteredlist";
        this.postData(url, filters, function (data) {
            console.log("got bps");
            if (callback)
                callback(data);
        });
    };
    BackendProvider.prototype.getBpFilters = function (callback) {
        var questo = this;
        var url = this.rooturl + "/bp/getfilters";
        this.fetchData(url, function (data) {
            console.log("got bps filters");
            questo.bpfilters = data;
            if (callback)
                callback(data);
        });
    };
    BackendProvider.prototype.getPartnerworld = function (callback) {
        var url = this.rooturl + "/partnerworld/rss";
        this.fetchData(url, function (data) {
            console.log("got partnerworld");
            if (callback)
                callback(data);
        });
    };
    BackendProvider.prototype.getContacts = function (callback) {
        var more = "";
        var url = this.rooturl + "/reachme/all/" + more;
        console.log(url);
        //var url=global.rooturl+"/reachme/all/"+global.user.role+"/"+global.user.email+"?token="+global.user.token;
        //console.log("url",url)
        this.fetchData(url, function (data) {
            console.log("got contacts");
            if (callback)
                callback(data);
        });
    };
    BackendProvider.prototype.getThinkMagazine = function (callback) {
        var url = this.rooturl + "/thinkmagazine";
        this.fetchData(url, function (data) {
            console.log("got thinkmagazine", data.articles.article.length);
            data.articles.article.forEach(function (item, idx) {
                item.autore = item.author;
                item.imgurl = "https://www-01.ibm.com/easytools/runtime/hspx/prod/public/X0028/PortalX/file/RESOURCE/*/*/*" + item.image;
                item.description = item.summary;
            });
            if (callback)
                callback(data.articles.article);
            //callback(data);
        });
    };
    BackendProvider.prototype.getGare = function (callback) {
        var questo = this;
        var url = this.rooturl + "/gare/findall?societa=20160217220400";
        this.fetchData(url, function (data) {
            questo.gare = data.rows;
            if (callback)
                callback(data);
        });
    };
    BackendProvider.prototype.getGara = function (id, callback) {
        console.log("getGara", id);
        var questo = this;
        var url = this.rooturl + "/gare/fullgarabyid/" + id + "?societaid=20160217220400";
        this.fetchData(url, function (d) {
            console.log("fetched getGara in backend.ts", d);
            questo.rtmatches = d.realtime;
            //let activegara= Object.assign({}, d);
            questo.activegara = d;
            //questo.activegara = activegara;
            console.log("activegara mbp", questo.activegara.matchesbyprog.rows.length, questo.activegara);
            /*questo.events.publish('updatertmatches', data, Date.now());*/
            if (callback)
                callback(d);
        });
    };
    BackendProvider.prototype.getCurrentGara = function (callback) {
        var questo = this;
        var id = questo.activegara.gara.rows[0].doc.id;
        console.log("getCurrentGara", id);
        var url = this.rooturl + "/gare/fullgarabyid/" + id + "?societaid=20160217220400";
        this.fetchData(url, function (data) {
            console.log("fetched getCurrentGara in backend.ts", data);
            questo.rtmatches = data.realtime;
            //let activegara= Object.assign({}, data);
            questo.activegara = data;
            /*questo.events.publish('updatertmatches', data, Date.now());*/
            if (callback)
                callback(data);
        });
    };
    BackendProvider.prototype.getSocieta = function (callback) {
        var url = this.rooturl + "/societa/findall?societaid=20160217220400";
        this.fetchData(url, function (data) {
            if (callback)
                callback(data);
        });
    };
    BackendProvider.prototype.getAtleti = function (callback) {
        var questo = this;
        var url = this.rooturl + "/atleti/findall?societa=20160217220400";
        this.fetchData(url, function (data) {
            questo.atleti = data.rows;
            if (callback)
                callback(data);
        });
    };
    BackendProvider.prototype.getRanking = function (callback) {
        var questo = this;
        var url = this.rooturl + "/atleti/ranking/save?societa=20160217220400";
        this.fetchData(url, function (data) {
            var rank = [];
            data.rows.forEach(function (item, idx) {
                var doIt = true;
                if (item.doc.hasOwnProperty("dismissed")) {
                    if (String(item.doc.dismissed) == "true")
                        doIt = false;
                }
                if (doIt)
                    rank.push(item);
            });
            if (callback)
                callback(rank);
        });
    };
    BackendProvider.prototype.getRankingNew = function (stagione, callback) {
        var questo = this;
        //var url = this.rooturl + "/atleti/ranking/save?societa=20160217220400";
        var url = this.rooturl + "/atleti/rankingnew/" + stagione;
        this.fetchData(url, function (data) {
            console.log("backend got rankingnew data", data);
            var rank = [];
            data.forEach(function (item, idx) {
                var doIt = true;
                if (item.hasOwnProperty("dismissed")) {
                    if (String(item.dismissed) == "true")
                        doIt = false;
                }
                if (doIt)
                    rank.push(item);
            });
            if (callback)
                callback(rank);
        });
    };
    BackendProvider.prototype.getEventi = function (callback) {
        var url = this.rooturl + "/eventi/findall?societa=20160217220400";
        this.fetchData(url, function (data) {
            if (callback)
                callback(data);
        });
    };
    BackendProvider.prototype.getChatMessages = function (callback) {
        //var url = this.rooturl + "/chat/getmessages";
        var url = this.rooturl + "/chat/getno64";
        this.fetchData(url, function (data) {
            console.log("got chatmessages", data, data.length);
            if (callback)
                callback(data);
        });
    };
    BackendProvider.prototype.fetchText = function (url, callback) {
        //("fetchdata");
        if (url.indexOf("token") == -1) {
            if (url.indexOf("?") > -1) {
                url += "&token=" + this.user.token;
            }
            else
                url += "?token=" + this.user.token;
        }
        this.http.get(url).map(function (res) { return res.text(); }).subscribe(function (data) {
            //console.log("fetchText data",data);
            if (callback)
                callback(data);
        });
    };
    BackendProvider.prototype.fetchData = function (url, callback) {
        //("fetchdata");
        if (url.indexOf("token") == -1) {
            if (url.indexOf("?") > -1) {
                url += "&token=" + this.user.token;
            }
            else
                url += "?token=" + this.user.token;
        }
        //utils.colog("calling url ", url);
        this.http.get(url).map(function (res) { return res.json(); }).subscribe(function (data) {
            if (callback)
                callback(data);
        });
    };
    BackendProvider.prototype.blueLogin = function (user, callback) {
        console.log("bluelogin", user);
        var email = user.email;
        var psw = user.password;
        var url = this.rooturl + "/users/login";
        var questo = this;
        var authorization = "Basic " + window.btoa(email + ":" + psw);
        console.log("authorization", authorization);
        var gcmtoken = this.user.gcmtoken;
        var logindata = {
            authorization: authorization,
            gcmtoken: gcmtoken,
            gcmenabled: true,
            deviceid: questo.user.uniquedeviceid
        };
        if (user.gcmtoken) {
            console.log("this user has gcmtoken", user.gcmtoken);
            logindata["gcmtoken"] = user.gcmtoken;
            var gcmenabled = questo.appSettings.notifications;
            logindata["gcmenabled"] = gcmenabled;
        }
        console.log("trying to login at", url);
        questo.postData(url, logindata, function (data) {
            console.log("data", data);
            var uniquedeviceid = questo.user.uniquedeviceid;
            if (String(data.loggedin) == "true") {
                console.log("login successfull");
                questo.user = data;
                if (questo.isIosWeb) {
                    var url = questo.rooturl + "/users/registerios/" + email;
                    questo.fetchData(url, function (data) {
                        console.log("censored up " + email + " as potential ios user");
                    });
                }
                if (!data.email)
                    questo.user.email = email;
                if (!data.nickname)
                    questo.user.nickname = email;
                questo.user.uniquedeviceid = uniquedeviceid;
                console.log("USER", questo.user);
                //questo.events.publish('username:changed', questo.user);
                console.log("user token", questo.user.token);
                if (questo.user.role == "IBM_ADMIN")
                    questo.isIbmAdmin = true;
                var creds = window.btoa(user.email + ":" + user.password);
                questo.utils.setJsonStorage("ion2kwondo_creds", creds);
                var json = questo.utils.getJsonStorage("ion2kwondo_" + questo.user.id + "_mcrt");
                if (!json) {
                    console.log("mcrt is null for " + user.email);
                }
                else {
                    questo.cart = json;
                }
                questo.getAtleti(function () { });
                questo.getNextEvents(function () { });
                if (callback)
                    callback(data);
            }
            else {
                console.log("login was not successfull");
                if (callback)
                    callback(data);
            }
        });
    };
    BackendProvider.prototype.twitterSearch = function (query, callback) {
        var url = this.rooturl + "/twitter/search?query=" + query + "&src=typd";
        this.fetchData(url, function (data) {
            if (callback)
                callback(data);
        });
    };
    BackendProvider.prototype.postData = function (url, data, callback) {
        if (url.indexOf("token") == -1) {
            if (url.indexOf("?") > -1) {
                url += "&token=" + this.user.token;
            }
            else
                url += "?token=" + this.user.token;
        }
        this.http.post(url, data)
            .subscribe(function (data) {
            var result = data.json();
            callback(result);
        }, function (error) {
            console.log(error.json());
            callback(error.json());
        });
    };
    BackendProvider.prototype.openUrlInBrowser = function (href) {
        var questo = this;
        window.open(href, "_system");
    };
    BackendProvider.prototype.openUrl = function (url, target) {
        var questo = this;
        this.platform.ready().then(function () {
            /*var options = {
              location: 'yes',
              clearcache: 'yes',
              toolbar: 'yes',
              closebuttoncaption: 'DONE?'
            };*/
            var m = "_blank";
            if (target)
                m = target;
            var browser = questo.iab.create(url);
            //var opts = "location=no,clearcache=no,clearsessioncache=no,toolbar=yes,closebuttoncaption=Done,toolbarposition=top";
            /*let browser = new ThemeableBrowser(url, m, {
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
              },
              backButtonCanClose: true
            });*/
            /*if (!this.browser) {
                this.browser = new InAppBrowser(url, '_system', opts);
            } else {
                this.browser.open(url, '_system', opts);
            }*/
            //let browser = new InAppBrowser(url, '_blank', options);
        });
    };
    BackendProvider.prototype.getCategoria = function (dn, referralDate) {
        var cat = "senior a";
        var curyear = new Date().getFullYear();
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
        if ((eta >= 18) && (eta <= 35))
            cat = "senior a";
        if ((eta >= 15) && (eta <= 17))
            cat = "junior";
        if ((eta >= 12) && (eta <= 14))
            cat = "cadetti a";
        if ((eta >= 10) && (eta <= 11))
            cat = "cadetti b";
        if (eta > 35)
            cat = "senior b";
        if (eta < 10)
            cat = "esordienti";
        return cat;
    };
    BackendProvider.prototype.getAtletaById = function (id) {
        var questo = this;
        var atl = {};
        //console.log("atleti",this.atleti);
        this.atleti.forEach(function (item, idx) {
            //console.log(item);
            if (item.doc.id == id) {
                //console.log("trovato !!");
                atl = item.doc;
                atl.categoria = questo.getCategoria(atl.datanascita, null);
            }
        });
        return atl;
    };
    BackendProvider.prototype.getActiveChat = function (callback) {
        var questo = this;
        var url = questo.rooturl + "/chat/getno64";
        if (questo.activechatfilename != "chatno64.json")
            url = questo.rooturl + "/chat/getfile/" + questo.activechatfilename;
        //questo.chatmessages = [];
        this.fetchData(url, function (data) {
            var jsonlength = JSON.stringify(data).length;
            questo.chatmessages = data.rows;
            console.log("got active chatmessages from file " + questo.activechatfilename, questo.chatmessages, "size", jsonlength);
            if (callback)
                callback(data);
        });
    };
    BackendProvider.prototype.getHistoryAtleta = function (aid, callback) {
        var url = this.rooturl + "/gare/history/" + aid;
        this.fetchData(url, function (data) {
            if (callback)
                callback(data);
        });
    };
    BackendProvider.prototype.getMatchById = function (id) {
        //console.log("backend activegara",this.activegara);
        var matches = this.activegara.matchesbyprog;
        //console.log("getmatchesbyid "+id,matches);
        var m = this.filterRows(matches, { id: id }, true);
        return m;
    };
    BackendProvider.prototype.filterArray = function ($m, filt, exact) {
        if (!exact)
            exact = false;
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
                                }
                                else {
                                    eligible = eligible && false;
                                }
                            }
                            else {
                                if (v2.indexOf(v1) > -1) {
                                    // console.log("found !: "+v2);
                                }
                                else {
                                    eligible = eligible && false;
                                }
                            }
                        }
                    }
                }
            }
            if (eligible)
                $retrows.push(row);
        });
        return $retrows;
    };
    BackendProvider.prototype.addFbLive = function (id) {
        var questo = this;
        var found = false;
        questo.fbLives.forEach(function (item, idx) {
            if (item == id)
                found = true;
        });
        if (!found)
            questo.fbLives.push(id);
    };
    BackendProvider.prototype.removeFbLive = function (id) {
        var questo = this;
        var found = false;
        var arr = [];
        questo.fbLives.forEach(function (item, idx) {
            if (item != id)
                arr.push(id);
        });
        questo.fbLives = arr;
    };
    BackendProvider.prototype.getRtMatches = function (callback) {
        var url = this.rooturl + "/realtime";
        if (url.indexOf("token") == -1) {
            if (url.indexOf("?") > -1) {
                url += "&token=" + this.user.token;
            }
            else
                url += "?token=" + this.user.token;
        }
        this.fetchData(url, function (data) {
            if (callback)
                callback(data);
        });
    };
    BackendProvider.prototype.postChat = function (msg, callback) {
        var questo = this;
        var chatmultiroom = false;
        console.log("postchat", msg);
        var notify = false;
        if (questo.appSettings.hasOwnProperty("chatnotify")) {
            if (String(questo.appSettings.chatnotify) == "true")
                notify = true;
        }
        var obj = {
            sockid: questo.user.sockid,
            nickname: questo.user.nickname,
            garaid: "",
            text: "prova"
        };
        if (!msg)
            msg = obj;
        msg.notify = notify;
        var doReturn = false;
        var hasFoto = false;
        var hasAudio = false;
        if (msg.foto) {
            if (msg.foto.trim() != "")
                hasFoto = true;
        }
        if (msg.audio) {
            if (msg.audio.trim() != "")
                hasAudio = true;
        }
        var hasMedia = hasFoto || hasAudio;
        if ((msg.text.trim() == "") && !hasMedia)
            doReturn = true;
        if (doReturn)
            return;
        var url = questo.rooturl + "/chat/put";
        //var url = questo.rooturl + "/chat/put/" + jcurrentgara.id;
        //if (!chatmultiroom) url = 
        //playSound("img/chatsend");
        //$("#page_chat #chatmsg").val("");
        console.log("posting chat message", msg);
        questo.postData(url, msg, function (data) {
            console.log("chatmsg sent");
            if (callback)
                callback();
        });
    };
    BackendProvider.prototype.playSoundDespiteAppSettings = function (filename) {
        var questo = this;
        if (questo.platform.is("cordova")) {
            if (questo.platform.is("ios")) {
                //if (questo.platform.is("ios")) return;
                var file = this.media.create('assets/' + filename + '.mp3');
                file.play();
                return;
            }
        }
        //clearTimeout(this.soundTimer);
        //console.log(settings)
        //questo.soundTimer = setTimeout(function () {
        document.getElementById("sound").innerHTML = '<audio autoplay="autoplay"><source src="assets/' + filename + '.mp3" type="audio/mpeg" /><source src="assets/' + filename + '.ogg" type="audio/ogg" /><embed hidden="true" autostart="true" loop="false" src="' + filename + '.mp3" /></audio>';
        // clearTimeout(questo.soundTimer);
        //}, questo.soundTime);
    };
    BackendProvider.prototype.playSound = function (filename) {
        var questo = this;
        if (questo.platform.is("cordova")) {
            if (questo.platform.is("ios"))
                return;
        }
        clearTimeout(this.soundTimer);
        //console.log(settings)
        if (!questo.appSettings)
            return;
        if (!questo.appSettings.sound)
            return;
        if (String(questo.appSettings.sound) != "true")
            return;
        questo.soundTimer = setTimeout(function () {
            document.getElementById("sound").innerHTML = '<audio autoplay="autoplay"><source src="assets/' + filename + '.mp3" type="audio/mpeg" /><source src="assets/' + filename + '.ogg" type="audio/ogg" /><embed hidden="true" autostart="true" loop="false" src="' + filename + '.mp3" /></audio>';
            clearTimeout(questo.soundTimer);
        }, questo.soundTime);
    };
    BackendProvider.prototype.getObjectArray = function (o) {
        var arr = [];
        for (var k in o) {
            //console.log("found key",k);
            if (o.hasOwnProperty(k)) {
                var newProp = {
                    name: k,
                    value: o[k]
                };
                arr.push(newProp);
            }
        }
        return arr;
    };
    BackendProvider.prototype.userIsAdmin = function () {
        var ret = false;
        if (this.user.role == "tkdradmin")
            ret = true;
        if (this.user.role == "superadmin")
            ret = true;
        return ret;
    };
    BackendProvider.prototype.addConsoleIfNotExists = function (m) {
        console.log("addconsoleifnotexists", m);
        var found = false;
        var foundidx = -1;
        this.matchconsoles.forEach(function (item, idx) {
            console.log("item", item.match.id, "m", m.id);
            if (item.match.id == m.id) {
                found = true;
                foundidx = idx;
            }
        });
        if (!found) {
            var newrta = {
                active: false,
                match: m,
                result: "0-0",
                round: "0",
                paused: true,
                running: false,
                goldenpoint: false,
                squalifica: false
            };
            this.matchconsoles.push(newrta);
            console.log("console was not found for match, added it", this.matchconsoles);
        }
        else {
            console.log("console was already there for match", m);
            this.matchconsoles[foundidx].match = m;
        }
    };
    BackendProvider.prototype.removeConsolesIfNotRealtime = function () {
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
        });
        console.log("matchconsoles", this.matchconsoles);
    };
    BackendProvider.prototype.syncConsoles = function (matches) {
        var questo = this;
        console.log("syncConsoles", matches);
        matches.rows.forEach(function (item, idx) {
            var doc = item.doc;
            questo.matchconsoles.forEach(function (citem, cidx) {
                if ((doc.id == citem.match.id) && (doc.garaid == citem.match.garaid)) {
                    citem.match = doc;
                }
            });
        });
    };
    BackendProvider.prototype.setResult = function (match, atl, mfa, callback) {
        var questo = this;
        var doc = {
            match: match,
            atl: atl,
            mfa: mfa
        };
        var url = questo.rooturl + "/matches/setresultok";
        console.log("posting result, match", match);
        questo.postData(url, doc, function (data) {
            if (callback)
                callback(data);
        });
    };
    BackendProvider.prototype.getTkdtAtleta = function (atleta) {
        var questo = this;
        console.log("getTkdtAtleta searching this atleta", atleta);
        var retvalue = {
            nome: "atleta non trovato",
            catcintura: "--",
            catpeso: "--",
            cateta: "--",
            societa: "--",
            sesso: "--",
            giorno: "--"
        };
        var anome = "";
        if (atleta.hasOwnProperty("nome"))
            anome = atleta.nome.toLowerCase();
        var acnome = "";
        if (atleta.hasOwnProperty("cognome"))
            acnome = atleta.cognome.toLowerCase();
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
        var found = false;
        if (!this.activegara.gara.rows[0].doc.hasOwnProperty("tkdt"))
            return retvalue;
        if (this.activegara.gara.rows[0].doc.tkdt.atleti)
            source = this.activegara.gara.rows[0].doc.tkdt.atleti;
        console.log("source", source.length);
        if (source.length == 0)
            source = this.activegara.gara.rows[0].doc.tkdt.atleti_iscritti;
        source.forEach(function (item, i) {
            var nome = anome + " " + acnome;
            var nomex = acnome + " " + anome;
            var atl = source[i];
            var atlnome = atl.nome.toLowerCase().trim();
            atlnome = questo.normalizeAccento(atlnome);
            //console.log(atlnome);
            //console.log(atlnome, nome);
            if (atlnome.indexOf("colangel") > -1)
                console.log(atlnome, nome);
            if ((atlnome == nome.trim()) || (atlnome == nomex.trim())) {
                console.log("TROVATO !!");
                found = true;
                retvalue = atl;
            }
        });
        if (!found) {
            source = this.activegara.gara.rows[0].doc.tkdt.atleti_iscritti;
            source.forEach(function (item, i) {
                var nome = anome + " " + acnome;
                var nomex = acnome + " " + anome;
                var atl = source[i];
                var atlnome = atl.nome.toLowerCase().trim();
                atlnome = questo.normalizeAccento(atlnome);
                //console.log(atlnome);
                //console.log(atlnome, nome);
                if (atlnome.indexOf("colangel") > -1)
                    console.log(atlnome, nome);
                if ((atlnome == nome.trim()) || (atlnome == nomex.trim())) {
                    console.log("TROVATO !!");
                    found = true;
                    retvalue = atl;
                }
            });
        }
        return retvalue;
    };
    BackendProvider.prototype.getTkdtAtletiCategoria = function (cateta, catcintura, catpeso, sesso) {
        var questo = this;
        console.log("getTkdtAtletiCategoria searching atleti in categoria", cateta + " " + catcintura + " " + catpeso + " " + sesso);
        var retvalue = "notfound";
        var avversari = [];
        var source = [];
        if (!this.activegara.gara.rows[0].doc.hasOwnProperty("tkdt"))
            return avversari;
        if (this.activegara.gara.rows[0].doc.tkdt.atleti)
            source = this.activegara.gara.rows[0].doc.tkdt.atleti;
        if (source.length == 0)
            source = questo.activegara.gara.rows[0].doc.tkdt.atleti_iscritti;
        var found = false;
        source.forEach(function (item, i) {
            var atl = source[i];
            var cpeso = "";
            if (atl.catpeso)
                cpeso = atl.catpeso.toLowerCase();
            var ccint = atl.catcintura.toLowerCase();
            var ceta = atl.cateta.toLowerCase();
            var csesso = atl.sesso.toLowerCase();
            var doIt = true;
            if (cpeso != catpeso.toLowerCase())
                doIt = doIt && false;
            if (ccint != catcintura.toLowerCase())
                doIt = doIt && false;
            if (ceta != cateta.toLowerCase())
                doIt = doIt && false;
            if (csesso != sesso.toLowerCase())
                doIt = doIt && false;
            if (doIt) {
                found = true;
                avversari.push(atl);
            }
            //console.log(atlnome);
            //console.log(atlnome,nome);
        });
        if (!found) {
            source = questo.activegara.gara.rows[0].doc.tkdt.atleti_iscritti;
            source.forEach(function (item, i) {
                var atl = source[i];
                var cpeso = "";
                if (atl.catpeso)
                    cpeso = atl.catpeso.toLowerCase();
                var ccint = atl.catcintura.toLowerCase();
                var ceta = atl.cateta.toLowerCase();
                var csesso = atl.sesso.toLowerCase();
                var doIt = true;
                if (cpeso != catpeso.toLowerCase())
                    doIt = doIt && false;
                if (ccint != catcintura.toLowerCase())
                    doIt = doIt && false;
                if (ceta != cateta.toLowerCase())
                    doIt = doIt && false;
                if (csesso != sesso.toLowerCase())
                    doIt = doIt && false;
                if (doIt) {
                    found = true;
                    avversari.push(atl);
                }
                //console.log(atlnome);
                //console.log(atlnome,nome);
            });
        }
        return avversari;
    };
    BackendProvider.prototype.getTkdtTabulatiCategoria = function (cateta, catcintura, catpeso, sesso) {
        var retvalue = {
            categoria_peso: "--",
            categoria_eta: "--",
            cintura_da: "--",
            cintura_a: "--",
            sesso: "--"
        };
        if (!this.activegara.gara.rows[0].doc.hasOwnProperty("tkdt"))
            return retvalue;
        var tkdt_tabulati = [];
        if (this.activegara.gara.rows[0].doc.tkdt.hasOwnProperty("tabulati"))
            tkdt_tabulati = this.activegara.gara.rows[0].doc.tkdt.tabulati;
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
            if (cpeso != catpeso.toLowerCase())
                doIt = doIt && false;
            if (ccint != catcintura.toLowerCase())
                doIt = doIt && false;
            if (ceta != cateta.toLowerCase())
                doIt = doIt && false;
            if (csesso != sesso.toLowerCase())
                doIt = doIt && false;
            if (doIt) {
                console.log("TROVATO TABULATO !!");
                tab.tabname = tabname;
                retvalue = tab;
            }
            //console.log(atlnome);
            //console.log(atlnome,nome);
        });
        return retvalue;
    };
    BackendProvider.prototype.getTabulatoImg = function (h, callback) {
        //window.open(h);
        //return;d
        var arr = h.split("id=");
        var tabid = arr[1];
        var url = this.rooturl + "/tkdt/tabulatoimage/" + tabid;
        if (url.indexOf("token") == -1) {
            if (url.indexOf("?") > -1) {
                url += "&token=" + this.user.token;
            }
            else
                url += "?token=" + this.user.token;
        }
        console.log("getting tabulato at", url);
        this.http.get(url).map(function (res) { return res.text(); }).subscribe(function (data) {
            console.log("data", data);
            callback(data);
        }, function (err) {
            console.log(err);
            callback("");
        });
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
    };
    BackendProvider.prototype.normalizeAccento = function (txt) {
        txt = this.replaceAll(txt, "à", "a'");
        txt = this.replaceAll(txt, "è", "e'");
        txt = this.replaceAll(txt, "ì", "i'");
        txt = this.replaceAll(txt, "ò", "o'");
        txt = this.replaceAll(txt, "ù", "u'");
        return txt;
    };
    BackendProvider.prototype.markGara = function (id, stato, callback) {
        console.log("markgara", id, stato);
        var questo = this;
        var postdata = {
            stato: stato,
            id: id
        };
        var url = questo.rooturl + "/gare/update";
        questo.postData(url, postdata, function (data) {
            console.log("gara marked", postdata, data);
            if (callback)
                callback(data);
        });
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
    };
    BackendProvider.prototype.getAtletaByCognoNome = function (cercanome) {
        var questo = this;
        //return "mango";
        //debug("getAtletaNameById("+id+")");
        var retvalue = [];
        cercanome = cercanome.toLowerCase().trim();
        cercanome = cercanome.replace("à", "a");
        cercanome = cercanome.replace("è", "e");
        cercanome = cercanome.replace("ì", "i");
        cercanome = cercanome.replace("ò", "o");
        cercanome = cercanome.replace("ù", "u");
        cercanome = cercanome.replace("a'", "a");
        cercanome = cercanome.replace("e'", "e");
        cercanome = cercanome.replace("i'", "i");
        cercanome = cercanome.replace("o'", "o");
        cercanome = cercanome.replace("u'", "u");
        questo.atleti.forEach(function (item, i) {
            var atl = questo.atleti[i].doc;
            var aid = atl.id;
            var acnome = atl.cognome.toLowerCase().trim();
            var anome = atl.nome.toLowerCase().trim();
            anome = anome.replace("à", "a");
            anome = anome.replace("è", "e");
            anome = anome.replace("ì", "i");
            anome = anome.replace("ò", "o");
            anome = anome.replace("ù", "u");
            anome = anome.replace("a'", "a");
            anome = anome.replace("e'", "e");
            anome = anome.replace("i'", "i");
            anome = anome.replace("o'", "o");
            anome = anome.replace("u'", "u");
            acnome = acnome.replace("à", "a");
            acnome = acnome.replace("è", "e");
            acnome = acnome.replace("ì", "i");
            acnome = acnome.replace("ò", "o");
            acnome = acnome.replace("ù", "u");
            acnome = acnome.replace("a'", "a");
            acnome = acnome.replace("e'", "e");
            acnome = acnome.replace("i'", "i");
            acnome = acnome.replace("o'", "o");
            acnome = acnome.replace("u'", "u");
            var cognonome = acnome + " " + anome;
            var nomecogno = anome + " " + acnome;
            //if ((cercanome.indexOf("nicol")>-1) && (cognonome.indexOf("nicol")>-1)) console.log("cognonome",cognonome,"cercanome",cercanome);
            var doIt = false;
            if (cognonome == cercanome)
                doIt = true;
            if (nomecogno == cercanome)
                doIt = true;
            //debug(aid+" "+cognome+" "+nome);
            if (doIt) {
                //console.log("trovato "+cercanome)
                retvalue.push(atl);
                return retvalue;
            }
        });
        return retvalue;
    };
    BackendProvider.prototype.setBackButtonAction = function (nb, nc) {
        if (true)
            return;
        var questo = this;
        nb.backButtonClick = function () {
            //Write here wherever you wanna do
            var x = Object.assign({}, questo.navOptions);
            x.direction = "back";
            console.log(x);
            nc.pop(x);
            questo.events.publish("hwbackbutton", {});
        };
    };
    /*
      setPushNativeTransition() {
        var questo = this;
    
    
        let options: NativeTransitionOptions = {
          direction: 'left',
          duration: 100,
        
          iosdelay: 100,
          androiddelay: 150,
    
        };
    
        this.nativePageTransitions.slide(options)
          .then(function () {
            console.log("nativetransition ok")
          })
          .catch(function () {
            console.log("nativetransition error")
          });
    
    
      }
      */
    /*
    setPopNativeTransition() {
      var questo = this;
  
      let options: NativeTransitionOptions = {
        direction: 'right',
        duration: 300,
      
        iosdelay: 100,
        androiddelay: 150,
    
      };
  
      this.nativePageTransitions.slide(options)
        .then(function () {
          console.log("nativetransition ok")
        })
        .catch(function () {
          console.log("nativetransition error")
        });
  
  
    }
  */
    BackendProvider.prototype.isCordova = function () {
        var retvalue = true;
        if (this.platform.is("mobileweb"))
            retvalue = false;
        return retvalue;
    };
    BackendProvider.prototype.isCordovaAndroid = function () {
        var questo = this;
        var retvalue = false;
        if (questo.isCordova()) {
            if (questo.platform.is("android"))
                retvalue = true;
        }
        return retvalue;
    };
    BackendProvider.prototype.isCordovaIos = function () {
        var questo = this;
        var retvalue = false;
        if (questo.isCordova()) {
            if (questo.platform.is("ios"))
                retvalue = true;
        }
        return retvalue;
        //return true;
    };
    BackendProvider.prototype.addChatUnread = function () {
        var questo = this;
        this.unread++;
        var unread = window.localStorage.getItem('ion2kwondo_chatunread');
        window.localStorage.setItem('ion2kwondo_chatunread', String(questo.unread));
        console.log("badge permissions", questo.badge.hasPermission());
        //questo.badge.set(questo.unread);
    };
    BackendProvider.prototype.computeUnreadChats = function () {
        var questo = this;
        var last = window.localStorage.getItem("ion2kwondo_lastchatread");
        console.log("last chat unread", last);
        var unread = 0;
        if (!last)
            last = "00000000000000";
        console.log("counting unread messages, starting from last ", last, questo.chatmessages);
        questo.chatmessages.forEach(function (item, idx) {
            if (item.time > last) {
                //console.log("questo è non letto",item.time);
                unread++;
            }
        });
        questo.unread = unread;
        console.log("setted backend.unread to " + unread);
        //questo.badge.set(questo.unread);
        questo.setBadge(questo.unread);
    };
    BackendProvider.prototype.setBadge = function (n) {
        var questo = this;
        if (questo.platform.is("cordova")) {
            questo.badge.set(n);
            if (questo.user.uniquedeviceid != "") {
                questo.setPushCount(n, function () {
                    console.log("gcm counter for deviceid " + questo.user.uniquedeviceid + " setted to " + n);
                });
            }
        }
    };
    BackendProvider.prototype.resetChatUnread = function () {
        var questo = this;
        questo.unread = 0;
        window.localStorage.setItem('ion2kwondo_chatunread', String(questo.unread));
        if (questo.chatmessages.length > 0) {
            window.localStorage.setItem("ion2kwondo_lastchatread", questo.chatmessages[questo.chatmessages.length - 1].time);
        }
        console.log("resetchatunread, unread:", questo.unread);
        questo.setBadge(questo.unread);
        /*
        questo.badge.set(questo.unread);
        if (questo.user.gcmtoken != "") {
          var url = questo.rooturl + "/gcm/resetcount/" + questo.user.gcmtoken;
          console.log("sending gcm reset");
          questo.fetchData(url, function (data) {
            console.log("resetted count on gcm")
          })
        }
        */
    };
    BackendProvider.prototype.setChatUnread = function (n) {
        var questo = this;
        this.unread = n;
        window.localStorage.setItem('ion2kwondo_chatunread', String(questo.unread));
        questo.badge.set(questo.unread);
    };
    BackendProvider.prototype.localNotify = function (text) {
        this.localNotifications.schedule({
            id: 1,
            text: text,
            icon: "res://icon.png",
            smallIcon: "res://icon.png"
            //sound: isAndroid? 'file://sound.mp3': 'file://beep.caf',
            //data: { secret: key }
        });
    };
    BackendProvider.prototype.setBackgroundMode = function (v) {
        this.backgroundMode.setDefaults({
            title: "AppKwonDoV2",
            text: "Tocca per passare ad AppKwonDoV2",
            icon: "icon"
            //color: "000000"
        });
        if (v) {
            this.backgroundMode.enable();
        }
        else
            this.backgroundMode.disable();
    };
    BackendProvider.prototype.getTkdtCategoria = function (atletaid) {
        var questo = this;
        var atleta = questo.getAtletaById(atletaid);
        console.log("atleta", atleta);
        var tkdtatleta = questo.getTkdtAtleta(atleta);
        console.log("tkdtatleta", tkdtatleta);
        var cateta = atleta.sesso.toUpperCase() + " " + tkdtatleta.catpeso + "kg - " + tkdtatleta.catcintura;
        if (tkdtatleta.nome == "atleta non trovato")
            cateta = "Categoria ufficiale non disponibile";
        return cateta;
    };
    BackendProvider.prototype.getRandomUsers = function (callback) {
        var url = "https://randomuser.me/api/?results=5000";
        this.fetchData(url, function (data) {
            console.log("got users", data);
            if (callback)
                callback(data.results);
        });
    };
    BackendProvider.prototype.getUniqueDeviceID = function (callback) {
        var questo = this;
        if (questo.platform.is("cordova")) {
            questo.uniqueDeviceID.get()
                .then(function (uuid) {
                console.log("uniquedeviceID", uuid);
                questo.user.uniquedeviceid = uuid;
                if (callback)
                    callback();
            })
                .catch(function (error) {
                console.log("error retrieving uniquedeviceid", error);
                if (callback)
                    callback();
            });
        }
        else {
            if (callback)
                callback();
        }
    };
    BackendProvider.prototype.getEvents = function (callback) {
        var questo = this;
        var url = questo.rooturl + "/eventi/findall";
        questo.fetchData(url, function (data) {
            if (callback)
                callback(data);
        });
    };
    BackendProvider.prototype.getNextEvents = function (callback) {
        var questo = this;
        var dataoggi = new Date();
        questo.getGare(function (data) {
            //app.loadAllGare(function (data) {
            questo.getEvents(function (edata) {
                //refreshEventiServer(function (edata) {
                var events = {
                    rows: []
                };
                data.rows.forEach(function (item, idx) {
                    item.tipo = "gara";
                    events.rows.push(item);
                });
                edata.rows.forEach(function (item, idx) {
                    item.tipo = "evento";
                    events.rows.push(item);
                });
                var nextevents = [];
                events.rows.forEach(function (item, idx) {
                    var gara = item.doc;
                    var tipo = item.tipo;
                    //console.log("evento",gara);
                    var doIt = false;
                    if (gara.stato) {
                        if (gara.stato == "nondisputata")
                            doIt = true;
                    }
                    if (doIt) {
                        var data = gara.data;
                        var parts = data.split('/');
                        var datagara = new Date(parts[2], parseInt(parts[1], 10) - 1, parts[0]);
                        var datediff = dataoggi - datagara;
                        var datediffgg = Math.round((dataoggi - datagara) / (1000 * 60 * 60 * 24)) - 1;
                        //console.log(datediffgg);
                        if (datediffgg < 0) {
                            //conslog("gara ", data, datagara, datediffgg);
                            nextevents.push({
                                tipo: tipo,
                                gara: gara,
                                diff: datediffgg
                            });
                        }
                    }
                });
                console.log("nextevents", nextevents);
                nextevents.sort(function (a, b) {
                    var a1 = a.gara.data;
                    var b1 = b.gara.data;
                    var a2 = a1.substring(6, 10) + a1.substring(3, 5) + a1.substring(0, 2);
                    var b2 = b1.substring(6, 10) + b1.substring(3, 5) + b1.substring(0, 2);
                    //conslog(a2,b2);
                    if (a2 > b2)
                        return 1;
                    if (a2 < b2)
                        return -1;
                    return 0;
                });
                console.log(nextevents);
                var nexteventscount = nextevents.length;
                //nexteventscount=0;
                //$("#index #nexteventsbubble").html(nexteventscount);
                if (nexteventscount > 0) {
                    //$("#index #nexteventsbubble").show();
                }
                else {
                    //$("#index #lista #nexteventsbubble").hide();
                }
                questo.nextevents = nextevents;
                if (callback)
                    callback(nextevents);
            });
        });
    };
    BackendProvider.prototype.resetPushCount = function (callback) {
        var questo = this;
        if (questo.user.uniquedeviceid == "")
            return;
        var url = questo.rooturl + "/gcm/resetcount/" + questo.user.uniquedeviceid;
        console.log("calling resetPushCount on server at url", url);
        questo.fetchData(url, function (data) {
            console.log("pushcount resetted on server");
            if (callback)
                callback();
        });
    };
    BackendProvider.prototype.setPushCount = function (n, callback) {
        var questo = this;
        if (questo.user.uniquedeviceid == "")
            return;
        var url = questo.rooturl + "/gcm/setcount/" + questo.user.uniquedeviceid + "/" + n;
        questo.fetchData(url, function (data) {
            console.log("pushcount setted to " + n + " on server");
            if (callback)
                callback();
        });
    };
    BackendProvider.prototype.retrieveUserPassword = function (email, callback) {
        var questo = this;
        var url = questo.rooturl + "/users/retrievepsw/" + email;
        questo.fetchData(url, function (data) {
            if (callback)
                callback(data);
        });
    };
    BackendProvider.prototype.getPeers = function () {
        var questo = this;
        var url = questo.rooturl + "/peerjs/peerjs/peers";
        questo.fetchData(url, function (data) {
            var arr = [];
            data.forEach(function (item, idx) {
                if (item != questo.myPeerId)
                    arr.push(item);
            });
            console.log("peers", arr);
            questo.rtcpeers = arr;
        });
    };
    BackendProvider.prototype.showConfirm = function (text, callback) {
        var questo = this;
        var alert = questo.alertCtrl.create({
            title: 'Conferma',
            message: text,
            buttons: [
                {
                    text: 'Annulla',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                        callback(false);
                    }
                },
                {
                    text: 'OK',
                    handler: function () {
                        callback(true);
                    }
                }
            ]
        });
        alert.present();
    };
    BackendProvider.prototype.showToast = function (text, duration, position) {
        if (duration === void 0) { duration = 3000; }
        if (position === void 0) { position = 'bottom'; }
        var questo = this;
        var toast = questo.toastCtrl.create({
            message: text,
            duration: duration,
            position: position
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed toast');
        });
        toast.present();
    };
    BackendProvider.prototype.showAlert = function (text) {
        var questo = this;
        var alrt = questo.alertCtrl.create({
            title: "",
            subTitle: text,
            buttons: ['OK']
        });
        alrt.present();
    };
    BackendProvider.prototype.initializeFCM = function () {
        var questo = this;
        console.log("initialize FCM !!");
        var fcm = questo.fcm;
        fcm.subscribeToTopic('chatkwondo').then(function () {
            console.log("FCM subscribed to chatkwondo !!");
        })
            .catch(function () {
            console.log("FCM error subscribing to chatkwondo");
        });
        fcm.getToken().then(function (token) {
            console.log("FCM gettoken", token);
            questo.user.gcmtoken = token;
        });
        fcm.onNotification().subscribe(function (data) {
            console.log("fcm notification !!", data);
            var background = false;
            if (data.hasOwnProperty("google.message_id")) {
                if (data.wasTapped) {
                    background = true;
                }
                else {
                    background = false;
                }
                ;
            }
            else {
                background = true;
            }
            if (background) {
                if (questo.platform.is("cordova")) {
                    if (data.hasOwnProperty("badge")) {
                        var b = parseInt(data.badge, 10);
                        questo.setBadge(b);
                    }
                }
            }
            console.log("FCM Received in background", background);
        });
        fcm.onTokenRefresh().subscribe(function (token) {
            //backend.registerToken(token);
            console.log("refreshed fcm token", token);
            questo.user.gcmtoken = token;
        });
        //fcm.unsubscribeFromTopic('marketing');
    };
    BackendProvider.prototype.initializePush = function () {
        var questo = this;
        questo.initializeFCM();
        if (true)
            return;
        /*
        var push = Push.init({
          android: {
            senderID: "1034396645917"
          },
          ios: {
            alert: "true",
            badge: true,
            sound: 'true'
          },
          windows: {}
        });
    
    
    
    
        push.on('registration', (data) => {
          console.log("registration!!!")
          console.log("push notification registrationId !!", data.registrationId);
          //alert(data.registrationId.toString());
          questo.user.gcmtoken = data.registrationId.toString();
    
        });
        push.on('notification', (data) => {
          console.log("push notification!", data);
          //alert("Hi, Am a push notification");
          var isforeground = data.additionalData.foreground;
          if (isforeground) {
            if (!questo.isChatView) {
              console.log("local notification emitted");
              //questo.backend.localNotify(data.message);
            } else {
    
              questo.resetChatUnread();
            }
    
          } else {
            //questo.backend.computeUnreadChats();
            //questo.backend.addChatUnread();
    
    
          }
        });
        push.on('error', (e) => {
          console.log("PUSH ERROR", e.message);
        });
    
    
    
    
    */
    };
    BackendProvider.prototype.setAvversario = function (garaid, matchid, avversario, callback) {
        var questo = this;
        //var nome=avversario.split("|")[0];
        //var societa=avversario.split("|")[1];
        if (avversario.trim() == "")
            avversario = "0|0";
        var url = questo.rooturl + "/matches/updateavversario/" + garaid + "/" + matchid + "/" + encodeURI(avversario);
        questo.fetchData(url, function (data) {
            console.log("setAvversario result", data);
            if (callback)
                callback();
        });
    };
    BackendProvider.prototype.getCategorieCoperte = function (societa) {
        var questo = this;
        if (!societa)
            societa = "A.S.D. TAEKWONDO ROZZANO";
        var result = {
            cats: [],
            text: "Dati ufficiali categorie non disponibili"
        };
        var jGara = questo.activegara;
        if (!jGara.gara.rows[0].doc.tkdt)
            return result;
        if (jGara) {
            if (jGara.gara) {
                var garadoc = jGara.gara.rows[0].doc;
                var tkdtiscritti = garadoc.tkdt.atleti;
                if (tkdtiscritti.length == 0)
                    tkdtiscritti = garadoc.tkdt.atleti_iscritti;
                var $roz = questo.filterArray(tkdtiscritti, {
                    societa: societa
                }, true);
                //console.log($roz);
                //sort by categoria
                $roz.sort(function (a, b) {
                    var a1 = a.catcintura + a.cateta + a.catpeso + a.sesso;
                    var b1 = b.catcintura + b.cateta + b.catpeso + b.sesso;
                    if (a1 > b1)
                        return 1;
                    if (a1 < b1)
                        return -1;
                    return 0;
                });
                //scan categorie
                var cat = "";
                var catcount = 0;
                var res = [];
                $roz.forEach(function (item, i) {
                    var atl = $roz[i];
                    var cateta = atl.cateta;
                    var catpeso = atl.catpeso;
                    var catcintura = atl.catcintura;
                    var sesso = atl.sesso;
                    var catx = catcintura + cateta + catpeso + sesso;
                    if (catx != cat) {
                        //count = 0;
                        var newcat = {
                            cateta: cateta,
                            catpeso: catpeso,
                            catcintura: catcintura,
                            sesso: sesso,
                            atleti: []
                        };
                        res.push(newcat);
                        catcount++;
                        cat = catx;
                    }
                    var lastres = res[res.length - 1];
                    lastres.atleti.push(atl);
                    //count++;
                });
                //console.log(res);
                var text = res.length + " categorie coperte con  " + $roz.length + " atleti";
                console.log("getategoriecoperte", societa, text);
                res.forEach(function (item, i) {
                    var r = res[i];
                    //console.log(r.sesso+" - "+r.cateta+" - "+r.catcintura+" - "+r.catpeso+": "+r.atleti.length+" atleti");
                });
                result.cats = res;
                result.text = text;
            }
        }
        return result;
    };
    BackendProvider.prototype.enableNotifications = function (callback) {
        var questo = this;
        questo.appSettings.notifications = true;
        var url = questo.rooturl + "/gcm/enablenotifications/" + questo.user.uniquedeviceid + "/" + questo.user.gcmtoken;
        if (questo.user.uniquedeviceid.trim() == "") {
            console.log("this device does not have an uniquedeviceid");
            callback({ success: false, text: "no deviceid found" });
            return;
        }
        questo.fetchData(url, function (data) {
            console.log("enablenotifications", data);
            if (callback)
                callback(data);
        });
    };
    BackendProvider.prototype.disableNotifications = function (callback) {
        var questo = this;
        questo.appSettings.notifications = false;
        var url = questo.rooturl + "/gcm/disablenotifications/" + questo.user.uniquedeviceid + "/" + questo.user.gcmtoken;
        if (questo.user.uniquedeviceid.trim() == "") {
            console.log("this device does not have an uniquedeviceid");
            callback({ success: false, text: "no deviceid found" });
            return;
        }
        questo.fetchData(url, function (data) {
            console.log("disablenotifications", data);
            if (callback)
                callback(data);
        });
    };
    BackendProvider.prototype.playStream = function (url) {
        var questo = this;
        var options = {
            successCallback: function () { console.log('Video played'); },
            errorCallback: function (e) { console.log('Error streaming', e); },
            orientation: 'landscape'
        };
        //var url="rtmp://54.173.34.172:1937/publish_demo/";
        questo.streamingMedia.playVideo(url, options);
    };
    BackendProvider.prototype.getBroadcasts = function (callback) {
        var questo = this;
        var url = questo.rooturl + "/broadcast/list";
        /*let loading = questo.loadingCtrl.create({
          spinner: 'dots',
          content: 'Aggiornamento broadcast in corso...'
        });
    
        loading.present();*/
        questo.fetchData(url, function (data) {
            console.log("broadcast refreshed", data);
            questo.fbLives = data;
            if (callback)
                callback(data);
            //loading.dismiss();
        });
    };
    BackendProvider.prototype.getTkdtLive = function (giornoid, callback) {
        var questo = this;
        var url = questo.rooturl + "/tkdt/live/" + giornoid;
        questo.fetchData(url, function (data) {
            callback(data);
        });
    };
    BackendProvider.prototype.getScoreboards = function (callback) {
        var questo = this;
        var url = questo.rooturl + "/scoreboards";
        questo.fetchData(url, function (data) {
            callback(data);
        });
    };
    BackendProvider.prototype.removeScoreboard = function (sockid) {
        var questo = this;
        var url = questo.rooturl + "/scoreboards/remove/" + sockid;
        questo.fetchData(url, function (data) {
            console.log("scoreboards", data);
        });
    };
    return BackendProvider;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('content'),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["m" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["m" /* NavController */]) === "function" && _a || Object)
], BackendProvider.prototype, "nav", void 0);
BackendProvider = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_17__ionic_native_media__["a" /* MediaPlugin */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_17__ionic_native_media__["a" /* MediaPlugin */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["t" /* ToastController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["t" /* ToastController */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["i" /* LoadingController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["i" /* LoadingController */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_16__ionic_native_streaming_media__["a" /* StreamingMedia */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_16__ionic_native_streaming_media__["a" /* StreamingMedia */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_15__ionic_native_fcm__["a" /* FCM */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_15__ionic_native_fcm__["a" /* FCM */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_14__ionic_native_facebook__["a" /* Facebook */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_14__ionic_native_facebook__["a" /* Facebook */]) === "function" && _g || Object, typeof (_h = typeof __WEBPACK_IMPORTED_MODULE_13__ionic_native_in_app_browser__["a" /* InAppBrowser */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_13__ionic_native_in_app_browser__["a" /* InAppBrowser */]) === "function" && _h || Object, typeof (_j = typeof __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["a" /* AlertController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["a" /* AlertController */]) === "function" && _j || Object, typeof (_k = typeof __WEBPACK_IMPORTED_MODULE_12__ionic_native_unique_device_id__["a" /* UniqueDeviceID */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_12__ionic_native_unique_device_id__["a" /* UniqueDeviceID */]) === "function" && _k || Object, typeof (_l = typeof __WEBPACK_IMPORTED_MODULE_11__ionic_native_text_to_speech__["a" /* TextToSpeech */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_11__ionic_native_text_to_speech__["a" /* TextToSpeech */]) === "function" && _l || Object, typeof (_m = typeof __WEBPACK_IMPORTED_MODULE_10__ionic_native_background_mode__["a" /* BackgroundMode */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_10__ionic_native_background_mode__["a" /* BackgroundMode */]) === "function" && _m || Object, typeof (_o = typeof __WEBPACK_IMPORTED_MODULE_9__ionic_native_local_notifications__["a" /* LocalNotifications */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_9__ionic_native_local_notifications__["a" /* LocalNotifications */]) === "function" && _o || Object, typeof (_p = typeof __WEBPACK_IMPORTED_MODULE_8__ionic_native_badge__["a" /* Badge */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_8__ionic_native_badge__["a" /* Badge */]) === "function" && _p || Object, typeof (_q = typeof __WEBPACK_IMPORTED_MODULE_6__ionic_native_device_feedback__["a" /* DeviceFeedback */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__ionic_native_device_feedback__["a" /* DeviceFeedback */]) === "function" && _q || Object, typeof (_r = typeof __WEBPACK_IMPORTED_MODULE_5__ionic_storage__["b" /* Storage */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__ionic_storage__["b" /* Storage */]) === "function" && _r || Object, typeof (_s = typeof __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["d" /* Events */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["d" /* Events */]) === "function" && _s || Object, typeof (_t = typeof __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["p" /* Platform */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["p" /* Platform */]) === "function" && _t || Object, typeof (_u = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */]) === "function" && _u || Object, typeof (_v = typeof __WEBPACK_IMPORTED_MODULE_3__utils_utils__["a" /* UtilsProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__utils_utils__["a" /* UtilsProvider */]) === "function" && _v || Object])
], BackendProvider);

var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v;
//# sourceMappingURL=backend.js.map

/***/ }),

/***/ 627:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 212,
	"./af.js": 212,
	"./ar": 213,
	"./ar-dz": 214,
	"./ar-dz.js": 214,
	"./ar-kw": 215,
	"./ar-kw.js": 215,
	"./ar-ly": 216,
	"./ar-ly.js": 216,
	"./ar-ma": 217,
	"./ar-ma.js": 217,
	"./ar-sa": 218,
	"./ar-sa.js": 218,
	"./ar-tn": 219,
	"./ar-tn.js": 219,
	"./ar.js": 213,
	"./az": 220,
	"./az.js": 220,
	"./be": 221,
	"./be.js": 221,
	"./bg": 222,
	"./bg.js": 222,
	"./bm": 223,
	"./bm.js": 223,
	"./bn": 224,
	"./bn.js": 224,
	"./bo": 225,
	"./bo.js": 225,
	"./br": 226,
	"./br.js": 226,
	"./bs": 227,
	"./bs.js": 227,
	"./ca": 228,
	"./ca.js": 228,
	"./cs": 229,
	"./cs.js": 229,
	"./cv": 230,
	"./cv.js": 230,
	"./cy": 231,
	"./cy.js": 231,
	"./da": 232,
	"./da.js": 232,
	"./de": 233,
	"./de-at": 234,
	"./de-at.js": 234,
	"./de-ch": 235,
	"./de-ch.js": 235,
	"./de.js": 233,
	"./dv": 236,
	"./dv.js": 236,
	"./el": 237,
	"./el.js": 237,
	"./en-SG": 238,
	"./en-SG.js": 238,
	"./en-au": 239,
	"./en-au.js": 239,
	"./en-ca": 240,
	"./en-ca.js": 240,
	"./en-gb": 241,
	"./en-gb.js": 241,
	"./en-ie": 242,
	"./en-ie.js": 242,
	"./en-il": 243,
	"./en-il.js": 243,
	"./en-nz": 244,
	"./en-nz.js": 244,
	"./eo": 245,
	"./eo.js": 245,
	"./es": 246,
	"./es-do": 247,
	"./es-do.js": 247,
	"./es-us": 248,
	"./es-us.js": 248,
	"./es.js": 246,
	"./et": 249,
	"./et.js": 249,
	"./eu": 250,
	"./eu.js": 250,
	"./fa": 251,
	"./fa.js": 251,
	"./fi": 252,
	"./fi.js": 252,
	"./fo": 253,
	"./fo.js": 253,
	"./fr": 254,
	"./fr-ca": 255,
	"./fr-ca.js": 255,
	"./fr-ch": 256,
	"./fr-ch.js": 256,
	"./fr.js": 254,
	"./fy": 257,
	"./fy.js": 257,
	"./ga": 258,
	"./ga.js": 258,
	"./gd": 259,
	"./gd.js": 259,
	"./gl": 260,
	"./gl.js": 260,
	"./gom-latn": 261,
	"./gom-latn.js": 261,
	"./gu": 262,
	"./gu.js": 262,
	"./he": 263,
	"./he.js": 263,
	"./hi": 264,
	"./hi.js": 264,
	"./hr": 265,
	"./hr.js": 265,
	"./hu": 266,
	"./hu.js": 266,
	"./hy-am": 267,
	"./hy-am.js": 267,
	"./id": 268,
	"./id.js": 268,
	"./is": 269,
	"./is.js": 269,
	"./it": 270,
	"./it-ch": 271,
	"./it-ch.js": 271,
	"./it.js": 270,
	"./ja": 272,
	"./ja.js": 272,
	"./jv": 273,
	"./jv.js": 273,
	"./ka": 274,
	"./ka.js": 274,
	"./kk": 275,
	"./kk.js": 275,
	"./km": 276,
	"./km.js": 276,
	"./kn": 277,
	"./kn.js": 277,
	"./ko": 278,
	"./ko.js": 278,
	"./ku": 279,
	"./ku.js": 279,
	"./ky": 280,
	"./ky.js": 280,
	"./lb": 281,
	"./lb.js": 281,
	"./lo": 282,
	"./lo.js": 282,
	"./lt": 283,
	"./lt.js": 283,
	"./lv": 284,
	"./lv.js": 284,
	"./me": 285,
	"./me.js": 285,
	"./mi": 286,
	"./mi.js": 286,
	"./mk": 287,
	"./mk.js": 287,
	"./ml": 288,
	"./ml.js": 288,
	"./mn": 289,
	"./mn.js": 289,
	"./mr": 290,
	"./mr.js": 290,
	"./ms": 291,
	"./ms-my": 292,
	"./ms-my.js": 292,
	"./ms.js": 291,
	"./mt": 293,
	"./mt.js": 293,
	"./my": 294,
	"./my.js": 294,
	"./nb": 295,
	"./nb.js": 295,
	"./ne": 296,
	"./ne.js": 296,
	"./nl": 297,
	"./nl-be": 298,
	"./nl-be.js": 298,
	"./nl.js": 297,
	"./nn": 299,
	"./nn.js": 299,
	"./pa-in": 300,
	"./pa-in.js": 300,
	"./pl": 301,
	"./pl.js": 301,
	"./pt": 302,
	"./pt-br": 303,
	"./pt-br.js": 303,
	"./pt.js": 302,
	"./ro": 304,
	"./ro.js": 304,
	"./ru": 305,
	"./ru.js": 305,
	"./sd": 306,
	"./sd.js": 306,
	"./se": 307,
	"./se.js": 307,
	"./si": 308,
	"./si.js": 308,
	"./sk": 309,
	"./sk.js": 309,
	"./sl": 310,
	"./sl.js": 310,
	"./sq": 311,
	"./sq.js": 311,
	"./sr": 312,
	"./sr-cyrl": 313,
	"./sr-cyrl.js": 313,
	"./sr.js": 312,
	"./ss": 314,
	"./ss.js": 314,
	"./sv": 315,
	"./sv.js": 315,
	"./sw": 316,
	"./sw.js": 316,
	"./ta": 317,
	"./ta.js": 317,
	"./te": 318,
	"./te.js": 318,
	"./tet": 319,
	"./tet.js": 319,
	"./tg": 320,
	"./tg.js": 320,
	"./th": 321,
	"./th.js": 321,
	"./tl-ph": 322,
	"./tl-ph.js": 322,
	"./tlh": 323,
	"./tlh.js": 323,
	"./tr": 324,
	"./tr.js": 324,
	"./tzl": 325,
	"./tzl.js": 325,
	"./tzm": 326,
	"./tzm-latn": 327,
	"./tzm-latn.js": 327,
	"./tzm.js": 326,
	"./ug-cn": 328,
	"./ug-cn.js": 328,
	"./uk": 329,
	"./uk.js": 329,
	"./ur": 330,
	"./ur.js": 330,
	"./uz": 331,
	"./uz-latn": 332,
	"./uz-latn.js": 332,
	"./uz.js": 331,
	"./vi": 333,
	"./vi.js": 333,
	"./x-pseudo": 334,
	"./x-pseudo.js": 334,
	"./yo": 335,
	"./yo.js": 335,
	"./zh-cn": 336,
	"./zh-cn.js": 336,
	"./zh-hk": 337,
	"./zh-hk.js": 337,
	"./zh-tw": 338,
	"./zh-tw.js": 338
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 627;

/***/ }),

/***/ 645:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_native__ = __webpack_require__(384);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(506);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_login_login__ = __webpack_require__(507);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_users_users__ = __webpack_require__(566);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_connections_connections__ = __webpack_require__(568);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_broadcastview_broadcastview__ = __webpack_require__(570);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_device_feedback__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_android_permissions__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_settings_settings__ = __webpack_require__(571);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_account_account__ = __webpack_require__(155);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_about_about__ = __webpack_require__(156);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_chat_chat__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__providers_backend_backend__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_servizisocieta_servizisocieta__ = __webpack_require__(157);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__ionic_native_background_mode__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_scorekeeper_scorekeeper__ = __webpack_require__(154);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_scoreboards_scoreboards__ = __webpack_require__(572);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
















//import { Push, PushObject, PushOptions } from '@ionic-native/push';





var MyApp = (function () {
    function MyApp(backgroundMode, androidPermissions, toastCtrl, deviceFeedback, app, _SplashScreen, events, alertCtrl, platform, backend) {
        var _this = this;
        this.backgroundMode = backgroundMode;
        this.androidPermissions = androidPermissions;
        this.toastCtrl = toastCtrl;
        this.deviceFeedback = deviceFeedback;
        this.app = app;
        this._SplashScreen = _SplashScreen;
        this.events = events;
        this.alertCtrl = alertCtrl;
        this.platform = platform;
        this.backend = backend;
        this.user = {
            firstname: "Demosio",
            lastname: "Cioc",
            email: "demymortelliti@it.ibm.com",
            role: "IBM BP",
            userphoto: ""
        };
        this.icons = [
            "md-settings",
            "md-person",
            "md-timer",
            "md-information-circle",
            "ios-people",
            "md-wifi",
            "md-git-network",
            "md-exit",
            "md-close-circle"
        ];
        this.isChatPage = false;
        this.realtimeEvents = false;
        this.showrtbutton = false;
        this.chatunread = 0;
        //rootPage = TabsPage;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_login_login__["a" /* LoginPage */];
        var questo = this;
        questo.detectEnvironment();
        var IS_PRODUCTION = questo.backend.isProduction;
        if (IS_PRODUCTION) {
            console.log("LOGGER IS DISABBLED!!!");
            backend.disableLogger();
        }
        if (!platform.is("cordova")) {
            console.log("NOT cordova !");
            if (platform.is("ios"))
                console.log("IOS in webbrowser !!");
        }
        this.initializeApp();
        // used for an example of ngFor and navigation
        this.pages = [
            /*{ title: 'Homepage', component: HomePage },*/
            { title: 'Impostazioni', component: __WEBPACK_IMPORTED_MODULE_10__pages_settings_settings__["a" /* SettingsPage */] },
            { title: 'Account', component: __WEBPACK_IMPORTED_MODULE_11__pages_account_account__["a" /* AccountPage */] },
            { title: 'ScoreKwondo', component: __WEBPACK_IMPORTED_MODULE_17__pages_scorekeeper_scorekeeper__["a" /* ScorekeeperPage */] },
            { title: 'Scoreboards', component: __WEBPACK_IMPORTED_MODULE_18__pages_scoreboards_scoreboards__["a" /* ScoreboardsPage */] },
            { title: 'Informazioni', component: __WEBPACK_IMPORTED_MODULE_12__pages_about_about__["a" /* AboutPage */] },
            { title: 'Users', component: __WEBPACK_IMPORTED_MODULE_5__pages_users_users__["a" /* UsersPage */] },
            { title: 'Connessioni', component: __WEBPACK_IMPORTED_MODULE_6__pages_connections_connections__["a" /* ConnectionsPage */] },
            // { title: 'RTC', component: BroadcastPage  },
            { title: 'Servizi soci', component: __WEBPACK_IMPORTED_MODULE_15__pages_servizisocieta_servizisocieta__["a" /* ServizisocietaPage */] },
            // { title: 'FBLIVE', component: FblivePage },
            { title: 'Logout', component: __WEBPACK_IMPORTED_MODULE_4__pages_login_login__["a" /* LoginPage */] },
            { title: 'Chiudi Appkwondo', component: __WEBPACK_IMPORTED_MODULE_4__pages_login_login__["a" /* LoginPage */] }
        ];
        events.subscribe('username:changed', function (user) {
            console.log("user changed !!!", user);
            _this.user = user;
        });
        events.subscribe('enteredchat', function (user) {
            console.log("enteredchat !!!", user);
            _this.isChatPage = true;
        });
        events.subscribe('exitedchat', function (user) {
            console.log("exitedchat !!!", user);
            _this.isChatPage = false;
        });
        events.subscribe('realtimematches', function (rtmatches) {
            console.log("realtimematches event", rtmatches);
            if (rtmatches.matches.length > 0) {
                questo.realtimeEvents = true;
                questo.showrtbutton = true;
            }
            else {
                questo.realtimeEvents = false;
                questo.showrtbutton = false;
            }
            //this.isChatPage = false;
        });
        events.subscribe("updategara", function (msg, time) {
            console.log("refreshgara in app.component.ts !!");
            questo.backend.getRtMatches(function (data) {
                if (data.length > 0) {
                    questo.realtimeEvents = true;
                    questo.showrtbutton = true;
                }
                else {
                    questo.realtimeEvents = false;
                    questo.showrtbutton = false;
                }
            });
        });
        events.subscribe("chatmsg", function (msg) {
            console.log("chatmsg in app.component.ts!", msg);
            /*
            let toast = questo.toastCtrl.create({
              message: msg.nickname + " - " + msg.text,
              duration: 2000,
              position: "top"
            });
            toast.present();
            questo.chatunread++;
            */
        });
        this.onResumeSubscription = platform.resume.subscribe(function () {
            console.log("APPRESUME event !!");
            if (questo.backend.isChatView) {
                console.log("resuming app, app was on chatview");
                console.log("resuming chat messages");
                questo.backend.getActiveChat(function (data) {
                    console.log("resumed chat");
                });
                questo.backend.resetChatUnread();
                //questo.backend.localNotify(data.message);
            }
            else {
                console.log("resuming app, app was NOT on chatview");
                questo.backend.computeUnreadChats();
            }
            console.log("resuming current gara", questo.backend.activegara);
            if (questo.backend.activegara.gara.rows.length > 0) {
                questo.backend.getCurrentGara(function (gdata) {
                    console.log("current gara resumed");
                });
            }
            else
                console.log("no active gara yet");
            console.log("resuming realtime matches", questo.backend.user);
            if (questo.backend.user.email.trim() != "") {
                questo.backend.getRtMatches(function (rdata) {
                    console.log("realtimematches resumed");
                });
            }
            else
                console.log("no user yet");
        });
    }
    MyApp.prototype.detectEnvironment = function () {
        var questo = this;
        var OSName = "Unknown OS";
        if (navigator.userAgent.indexOf("Win") != -1)
            OSName = "Windows";
        if (navigator.userAgent.indexOf("Mac") != -1)
            OSName = "Macintosh";
        if (navigator.userAgent.indexOf("Linux") != -1)
            OSName = "Linux";
        if (navigator.userAgent.indexOf("Android") != -1)
            OSName = "Android";
        if (navigator.userAgent.indexOf("like Mac") != -1)
            OSName = "iOS";
        console.log('Your OS: ' + OSName);
        var isIosWeb = false;
        if (!questo.platform.is("cordova")) {
            if (OSName == "iOS") {
                console.log("running on IOS web browser !!!!");
                questo.backend.isIosWeb = true;
            }
        }
    };
    MyApp.prototype.ngOnDestroy = function () {
        // always unsubscribe your subscriptions to prevent leaks
        this.onResumeSubscription.unsubscribe();
    };
    MyApp.prototype.openPage = function (page) {
        var _this = this;
        var questo = this;
        questo.backend.playFeedback();
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        if (page.title == "Logout") {
            var alert_1 = this.alertCtrl.create({
                title: 'Confirm',
                subTitle: 'Do you really want to logout',
                buttons: [
                    {
                        text: 'Cancel',
                        role: 'cancel',
                        handler: function () {
                            console.log('Cancel clicked');
                        }
                    },
                    {
                        text: 'OK',
                        handler: function () {
                            console.log('OK clicked');
                            _this.nav.setRoot(page.component);
                        }
                    }
                ]
            });
            alert_1.present();
        }
        else {
            if (page.title == "Chiudi Appkwondo") {
                var alert_2 = questo.alertCtrl.create({
                    title: 'Chiudi Appkwondo',
                    message: 'Vuoi veramente chiudere Appkwondo V2 ?',
                    buttons: [
                        {
                            text: 'Annulla',
                            role: 'cancel',
                            handler: function () {
                                console.log('Cancel clicked');
                            }
                        },
                        {
                            text: 'OK',
                            handler: function () {
                                console.log('OK clicked');
                                questo.platform.exitApp();
                            }
                        }
                    ]
                });
                alert_2.present();
            }
            else {
                var pushpages = ["Scoreboards", "Impostazioni", "ScoreKwondo", "TkdtLive", "Users", "Connessioni", "Informazioni", "Account", "RTC", "Servizi soci"];
                if (pushpages.indexOf(page.title) > -1) {
                    this.nav.push(page.component);
                }
                else
                    this.nav.setRoot(page.component);
            }
        }
    };
    MyApp.prototype.openPageWithParams = function (page, params) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.backend.playFeedback();
        this.nav.setRoot(page.component, params);
    };
    MyApp.prototype.ionViewDidLoad = function () {
        console.log("ROLE", this.backend.user.role);
        this.user = this.backend.user;
        console.log("USER", this.user);
    };
    MyApp.prototype.setUser = function (user) {
        this.user = user;
    };
    MyApp.prototype.getUserImage = function () {
        var img = "assets/img/person-icon.png";
        if (this.user.userphoto) {
            if (this.user.userphoto.trim() != "") {
                //console.log("user has userphoto");
                img = "data:image/jpeg;base64," + this.user.userphoto;
            }
        }
        return img;
    };
    MyApp.prototype.initializeApp = function () {
        var questo = this;
        questo.platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            __WEBPACK_IMPORTED_MODULE_2_ionic_native__["b" /* StatusBar */].styleDefault();
            setTimeout(function () {
                questo._SplashScreen.hide();
            }, 0);
            if (questo.platform.is("android")) {
                __WEBPACK_IMPORTED_MODULE_2_ionic_native__["b" /* StatusBar */].styleLightContent();
            }
            //Splashscreen.hide();
            if (questo.platform.is('cordova')) {
                if (questo.backend.isCordovaAndroid()) {
                    questo.backgroundMode.setDefaults({
                        title: "AppkwondoV2",
                        text: "Tocca per passare ad Appkwondo"
                    });
                    questo.backgroundMode.enable();
                }
                if (questo.backend.isCordovaIos()) {
                    questo.backgroundMode.setDefaults({
                        title: "AppkwondoV2",
                        text: "Tocca per passare ad Appkwondo"
                    });
                    questo.backgroundMode.enable();
                }
                window["plugins"].audioRecorderAPI.dopermissions(function (msg) {
                    // success
                    console.log('Audio Recorder API permissions ok: ', msg);
                }, function (msg) {
                    // failed
                    console.error("audioRecorderAPI: permission not granted", msg);
                    console.log("The app needs access to your microphone to function.");
                });
                var permissions = ['CAMERA', 'MICROPHONE', 'MODIFY_AUDIO_SETTINGS', 'RECORD_AUDIO'];
                permissions.forEach(function (p) {
                    var pms = questo.androidPermissions[p];
                    questo.androidPermissions.checkPermission(pms).then(function (success) { return console.log('Android Camera Permission granted'); }, function (err) {
                        console.log("Android Camera permissions not found !, requesting");
                        questo.androidPermissions.requestPermission(pms);
                    });
                });
                // questo.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.CAMERA, this.androidPermissions.PERMISSION.GET_ACCOUNTS]);
                questo.backend.getUniqueDeviceID();
                questo.backend.initializePush();
                //questo.deviceFeedback.acoustic();
                /*
                questo.deviceFeedback.isFeedbackEnabled()
                  .then((feedback) => {
                    console.log("deviceFeedback", feedback);
                    // {
                    //   acoustic: true,
                    //   haptic: true
                    // }
                    // questo.deviceFeedback.acoustic();
        
                    //this.deviceFeedback.haptic(0);
                  });
                  */
            }
            questo.platform.registerBackButtonAction(function () {
                if (questo.nav.canGoBack()) {
                    console.log("hw back nutton pressed, going back");
                    questo.backend.playFeedback();
                    var x = Object.assign({}, questo.backend.navOptions);
                    x.direction = "back";
                    questo.nav.pop(x);
                }
                else {
                    console.log("nav cannot go back");
                }
                questo.events.publish("hwbackbutton", {});
            });
            /*
                  this.platform.registerBackButtonAction(() => {
                   
                    console.log("hardwarebackbutton pressed, page", questo.isChatPage);
            
                    if (questo.isChatPage) this.events.publish('goback', "hwbackbutton");
               
                  });
                  */
            if (questo.platform.is('cordova')) {
                questo.deviceFeedback.isFeedbackEnabled()
                    .then(function (feedback) {
                    console.log("feedback", feedback);
                    // {
                    //   acoustic: true,
                    //   haptic: true
                    // }
                });
            }
            if (questo.platform.is('ios')) {
                questo.backend.navOptions = {
                    animate: true,
                    animation: 'ios-transition'
                };
            }
        });
        /*
        questo.backend.getRtMatches(function (data) {
          console.log("got rtmatches in app.component.ts", data);
          if (data.length > 0) {
            questo.realtimeEvents = true
          } else {
            questo.realtimeEvents = false;
          }
        })
        */
    };
    MyApp.prototype.gotoChat = function () {
        console.log("app this", this);
        this.nav.push(__WEBPACK_IMPORTED_MODULE_13__pages_chat_chat__["a" /* ChatPage */]);
    };
    /*
    setRtbutton(value){
  
      var page=this.app.getActiveNav().getActive().instance;
      console.log("page",page);
      var isvalid=true;
      if (page==ChatPage) isvalid=false;
      if (page==LoginPage) isvalid=false;
      return isvalid;
      
    }*/
    MyApp.prototype.isVisibleMenu = function (text) {
        var questo = this;
        var retvalue = true;
        var t = text.toLowerCase();
        var adminpages = ["users", "connessioni", "rtc"];
        if (adminpages.indexOf(t) > -1) {
            //console.log("this is an admin page !",questo.backend.user.role);
            if (questo.backend.user.role != 'superadmin')
                retvalue = false;
        }
        // console.log("isVisibleMenu",text,retvalue);
        return retvalue;
    };
    MyApp.prototype.showFbLives = function () {
        var questo = this;
        console.log("fblives:", questo.backend.fbLives.join(","));
        questo.backend.getFbLoginStatus(function (data) {
            console.log("getloginstatus", data);
            questo.nav.push(__WEBPACK_IMPORTED_MODULE_7__pages_broadcastview_broadcastview__["a" /* BroadcastviewPage */], {
                mode: "viewer"
            });
        });
    };
    return MyApp;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Nav */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Nav */])
], MyApp.prototype, "nav", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])("mytabs"),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* Tabs */])
], MyApp.prototype, "mytabs", void 0);
MyApp = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"/Users/demetriomortelliti/Desktop/demy/PROJECTS/appkwondo/clients/ion2kwondo/src/app/app.html"*/'<ion-menu [content]="content" side="left">\n  <ion-header >\n    <ion-toolbar>\n      <ion-title>Menu</ion-title>\n    </ion-toolbar>\n  </ion-header>\n\n  <ion-content class="menu" style="overflow-y: hidden">\n    <ion-grid style="sbackground: #049a55; background: blue; color: white; padding: 4px !important;">\n    <ion-row>\n      <ion-col col-3 style="padding: 5px !important;">\n       \n        <img src="{{getUserImage()}}" class="roundimg"/>\n        \n      </ion-col>\n      \n      <ion-col style="padding: 8px !important;">\n        <span class="username">{{backend.user.nickname}}</span><br>\n        <span class="email">{{backend.user.email}}</span><br>\n      <!--<span class="useremail">{{user.email}}</span><br>-->\n      <span class="userrole">{{backend.user.role}}</span>\n    \n      </ion-col>\n    </ion-row>  \n    </ion-grid>    \n    <ion-list>\n      \n          \n      \n     <section *ngFor="let p of pages; let i=index;">\n      <button menuClose ion-item  (click)="openPage(p)" icon-left *ngIf="isVisibleMenu(p.title)">\n        <ion-icon name="{{icons[i]}}"></ion-icon>{{p.title}}\n      </button>\n      </section>\n      \n       \n    </ion-list>\n\n\n  </ion-content>\n\n</ion-menu>\n\n\n<!--\n<ion-menu [content]="content" side="right">\n  <ion-header >\n    <ion-toolbar>\n      <ion-title>Menuright</ion-title>\n    </ion-toolbar>\n  </ion-header>\n\n  <ion-content class="menu" style="overflow-y: hidden">\n  </ion-content>\n</ion-menu>\n-->\n\n<!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>\n\n\n\n  <ion-fab style="bottom: 30px" left bottom *ngIf="backend.fbLives.length>0" (tap)="showFbLives()" >\n   <button color="primary" ion-fab style="font-size: 11px"><ion-icon name="ios-videocam"></ion-icon></button>\n </ion-fab>\n\n\n<div id="sound"></div>\n\n'/*ion-inline-end:"/Users/demetriomortelliti/Desktop/demy/PROJECTS/appkwondo/clients/ion2kwondo/src/app/app.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_16__ionic_native_background_mode__["a" /* BackgroundMode */], __WEBPACK_IMPORTED_MODULE_9__ionic_native_android_permissions__["a" /* AndroidPermissions */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["t" /* ToastController */], __WEBPACK_IMPORTED_MODULE_8__ionic_native_device_feedback__["a" /* DeviceFeedback */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* App */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* Platform */], __WEBPACK_IMPORTED_MODULE_14__providers_backend_backend__["a" /* BackendProvider */]])
], MyApp);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 668:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 742:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContactPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ContactPage = (function () {
    function ContactPage(navCtrl) {
        this.navCtrl = navCtrl;
    }
    return ContactPage;
}());
ContactPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-contact',template:/*ion-inline-start:"/Users/demetriomortelliti/Desktop/demy/PROJECTS/appkwondo/clients/ion2kwondo/src/pages/contact/contact.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>\n      Contact\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n<ion-content>\n  <ion-list>\n    <ion-list-header>Follow me on Twitter</ion-list-header>\n    <ion-item>\n      <ion-icon name="ionic" item-left></ion-icon>\n      @nkansahrexford\n    </ion-item>\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"/Users/demetriomortelliti/Desktop/demy/PROJECTS/appkwondo/clients/ion2kwondo/src/pages/contact/contact.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */]])
], ContactPage);

//# sourceMappingURL=contact.js.map

/***/ }),

/***/ 743:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChatpopoverPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_backend_backend__ = __webpack_require__(6);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the ChatpopoverPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var ChatpopoverPage = (function () {
    function ChatpopoverPage(backend, navCtrl, navParams, viewCtrl) {
        this.backend = backend;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
    }
    ChatpopoverPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ChatpopoverPage');
    };
    ChatpopoverPage.prototype.chatlist = function () {
        this.viewCtrl.dismiss("chatlist");
    };
    ChatpopoverPage.prototype.chatreset = function () {
        this.viewCtrl.dismiss("chatreset");
    };
    return ChatpopoverPage;
}());
ChatpopoverPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-chatpopover',template:/*ion-inline-start:"/Users/demetriomortelliti/Desktop/demy/PROJECTS/appkwondo/clients/ion2kwondo/src/pages/chatpopover/chatpopover.html"*/'<ion-list>\n\n  <button ion-item (tap)="chatrefresh()"><ion-icon name="md-refresh"></ion-icon> Aggiorna</button>\n  <button ion-item  (tap)="chatlist()"><ion-icon name="ios-list-box-outline"></ion-icon> Lista chat</button>\n  <button ion-item *ngIf="backend.user.role==\'tkdradmin\'" (tap)="chatreset()"><ion-icon name="ios-filing"></ion-icon> Reset chat</button>\n  \n\n</ion-list>\n'/*ion-inline-end:"/Users/demetriomortelliti/Desktop/demy/PROJECTS/appkwondo/clients/ion2kwondo/src/pages/chatpopover/chatpopover.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__providers_backend_backend__["a" /* BackendProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["u" /* ViewController */]])
], ChatpopoverPage);

//# sourceMappingURL=chatpopover.js.map

/***/ }),

/***/ 744:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TwitterPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_backend_backend__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_native__ = __webpack_require__(384);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_app_availability__ = __webpack_require__(141);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_moment__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




//import {Facebook} from "ng2-cordova-oauth/core";
//import {OauthCordova} from 'ng2-cordova-oauth/platform/cordova';


/*
  Generated class for the TwitterPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var TwitterPage = (function () {
    function TwitterPage(appAvailability, platform, loadingCtrl, backend, navCtrl, navParams) {
        this.appAvailability = appAvailability;
        this.platform = platform;
        this.loadingCtrl = loadingCtrl;
        this.backend = backend;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.tweets = [];
        this.searchtext = "ibmpartners";
        var questo = this;
        this.search(function (data) {
            questo.tweets = data.data.statuses;
            console.log("data", data, "tweets", questo.tweets);
        });
    }
    //private oauth: OauthCordova = new OauthCordova();
    /*private facebookProvider: Facebook = new Facebook({
      clientId: "587829961354143",
      appScope: ["email"]
    })*/
    /*private linkedinProvider: LinkedIn = new LinkedIn({
      clientId: "77m4gl9l7fgf9m",
      //clientSecret: "lhuq3lTGd7dOUWhZ",
      appScope: ["r_basicprofile","r_emailaddress"]
    })*/
    TwitterPage.prototype.facebook = function () {
        /*
          this.platform.ready().then(() => {
              this.oauth.logInVia(this.facebookProvider).then(success => {
                  console.log("RESULT: " + JSON.stringify(success));
              }, error => {
                  console.log("ERROR: ", error);
              });
          });
          */
    };
    TwitterPage.prototype.linkedin = function () {
        var url = this.backend.rooturl + "/linkedin/authorize";
        this.backend.openUrl(url);
        return;
        /*
        this.platform.ready().then(() => {
            this.oauth.logInVia(this.linkedinProvider).then(success => {
                console.log("RESULT: " + JSON.stringify(success));
            }, error => {
                console.log("ERROR: ", error);
            });
        });
        */
    };
    TwitterPage.prototype.ionViewDidEnter = function () {
        console.log('ionViewDidLoad TwitterPagePage');
        var questo = this;
        /*this.search(function (data) {
    
          questo.tweets = data.data.statuses;
          console.log("data", data, "tweets", questo.tweets);
    
        });*/
        /*
        var questo=this;
        this.backend.twitterSearch("IBM",function(data){
         console.log("data",data);
          questo.tweets=data.data.statuses;
           console.log("tweets",questo.tweets);
        })
        */
    };
    TwitterPage.prototype.doRefresh = function (refresher) {
        console.log('Begin async operation', refresher);
        var questo = this;
        this.search(function (data) {
            questo.tweets = data.data.statuses;
            console.log("data", data, "tweets", questo.tweets);
            refresher.complete();
        });
        /*
       this.backend.twitterSearch("IBM",function(data){
            console.log("search",data);
            questo.tweets=data.data.status;
         
            
          })*/
    };
    TwitterPage.prototype.search = function (callback) {
        var questo = this;
        this.backend.twitterSearch(questo.searchtext, function (data) {
            console.log("search", data);
            //questo.tweets=data.data.status;
            if (callback)
                callback(data);
        });
    };
    TwitterPage.prototype.onSearchChange = function (searchValue) {
        var questo = this;
        console.log(searchValue);
        this.searchtext = searchValue;
        this.search(function (data) {
            questo.tweets = data.data.status;
        });
    };
    TwitterPage.prototype.onSearchInput = function (ev) {
        console.log("onsearchinput", ev);
        var questo = this;
        this.searchtext = ev.target.value;
        this.search(function (data) {
            questo.tweets = data.data.statuses;
        });
    };
    TwitterPage.prototype.onSearchCancel = function (ev) {
        console.log("onsearchcancel", ev);
    };
    TwitterPage.prototype.getNormalDate = function (m) {
        //console.log("getnormaldate",m);
        var mom = __WEBPACK_IMPORTED_MODULE_5_moment__(m).format("DD/MM/YYYY HH:mm:SS");
        return mom;
    };
    TwitterPage.prototype.twitterLogin = function () {
        //var opts = "location=no,clearcache=yes,toolbar=yes,closebuttoncaption=Back,toobarposition=top";
        var url = this.backend.rooturl + "/twitter/login/twitter?callback=" + this.backend.rooturl;
        var browser = new __WEBPACK_IMPORTED_MODULE_3_ionic_native__["c" /* ThemeableBrowser */](url, '_blank', {
            statusbar: {
                color: '#4178be'
            },
            toolbar: {
                height: 44,
                color: '#4178be'
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
            },
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
            },
            backButtonCanClose: true
        });
        browser.on('loadstop').subscribe(function (res) {
            console.log("loadstop", res);
            var url = res.url;
            if (url.indexOf("return") > -1) {
                var p = url.split("?")[1];
                var params = p.split("&");
                params.forEach(function (item, idx) {
                    console.log("param", item);
                    //var arr=item.split("=");
                    //questo.backend.user.twitter[arr[0]]=arr[1];
                    browser.close();
                });
            }
        }, function (error) {
            // Handle error here
            console.log("loadstop error", error);
        });
    };
    TwitterPage.prototype.doTwLogin = function () {
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        //Request for login
        __WEBPACK_IMPORTED_MODULE_3_ionic_native__["d" /* TwitterConnect */].login().then(function (result) {
            //Get user data
            __WEBPACK_IMPORTED_MODULE_3_ionic_native__["d" /* TwitterConnect */].showUser().then(function (user) {
                //Save the user data in NativeStorage
                __WEBPACK_IMPORTED_MODULE_3_ionic_native__["a" /* NativeStorage */].setItem('twitter_user', {
                    name: user.name,
                    userName: user.screen_name,
                    followers: user.followers_count,
                    picture: user.profile_image_url_https
                }).then(function () {
                    alert("successfulll loggedin twitter");
                    //nav.push(UserPage);
                });
            }, function (error) {
                loading.dismiss();
            });
        });
    };
    TwitterPage.prototype.tapCard = function (item) {
        console.log("tapcard", item);
        //var infosource = item.infosource.toLowerCase();
        var link = item.user.url;
        if (item.entities.urls) {
            if (item.entities.urls.length > 0) {
                link = item.entities.urls[0].url;
            }
        }
        this.launch(link, "_blank");
        return;
        /*
           let app;
     
     
     
           if (this.platform.is('ios')) {
             app = 'twitter://';
           } else if (this.platform.is('android')) {
             app = 'com.twitter.android';
           }
     
           this.appAvailability.check(app)
             .then(
             (yes) => {
               //var opts = "location=no,clearcache=no,clearsessioncache=no,toolbar=yes,closebuttoncaption=Done,toolbarposition=top";
               this.backend.openUrl(link, "_system");
               
     
               console.log(app + ' is available')
             },
             (no) => {
               this.launch(link, "_blank");
               console.log(app + ' is NOT available')
             }
             );
     
         
     
     
     
     */
        /*
         this.navCtrl.push(ChatPage, {
          user: user
        }
        );
        */
    };
    TwitterPage.prototype.launch = function (url, mode) {
        this.openUrl(url, mode);
        /*
            this.platform.ready().then(() => {
               // cordova.InAppBrowser.open(url, "_system", "location=true");
            });
            */
    };
    TwitterPage.prototype.openUrl = function (url, mode) {
        var _this = this;
        this.platform.ready().then(function () {
            _this.backend.openUrl(url);
        });
    };
    return TwitterPage;
}());
TwitterPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-twitter',template:/*ion-inline-start:"/Users/demetriomortelliti/Desktop/demy/PROJECTS/appkwondo/clients/ion2kwondo/src/pages/twitter/twitter.html"*/'<!--\n  Generated template for the TwitterPage page.\n\n  See http://ionicframework.com/docs/v2/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n\n<!--\n<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Twitter</ion-title>\n    <button (tap)="linkedin()" ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n  </ion-navbar>\n</ion-header>\n-->\n<ion-header>\n<ion-navbar> \n\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n\n<ion-title>\nTwitter\n</ion-title>\n<!--<ion-buttons end>\n\n<button (click)="linkedin()">Linkedin</button>\n</ion-buttons>-->\n</ion-navbar>\n</ion-header>\n\n<ion-content spadding>\n\n <ion-refresher (ionRefresh)="doRefresh($event)">\n    <ion-refresher-content>\n        </ion-refresher-content>\n  </ion-refresher>\n  <ion-searchbar [(ngModel)]="searchtext" [showCancelButton]="shouldShowCancel" (ionInput)="onSearchInput($event)" (ionCancel)="onSearchCancel($event)">\n</ion-searchbar>\n\n  <!--<ion-input type="text" (input)="onSearchChange($event.target.value)"></ion-input>-->\n\n<ion-card *ngFor="let item of tweets" (tap)="tapCard(item)">\n \n      <ion-item>\n        <ion-avatar item-left>\n          <img src="{{item.user.profile_image_url}}" />\n        </ion-avatar>\n        <h2>{{item.user.name}}</h2>\n        <p>{{getNormalDate(item.created_at)}}</p>\n      </ion-item>\n \n      <!--<img src="http://placehold.it/500x200" />-->\n \n      <ion-card-content>\n        <div>{{item.text}}</div>\n       <!--  <div [innerHTML] = "item.doc.description"></div>-->\n        \n      </ion-card-content>\n \n      <ion-row>\n        <ion-col>\n          <button ion-button icon-left clear small>\n            <ion-icon class="bpgreen" name="thumbs-up"></ion-icon>\n            <div class="bpgreen">12 Likes</div>\n          </button>\n        </ion-col>\n        <ion-col>\n          <button ion-button icon-left clear small>\n            <ion-icon class="bpgreen" name="text"></ion-icon>\n            <div class="bpgreen">4 Comments</div>\n          </button>\n        </ion-col>\n        <ion-col center text-center>\n          <ion-note>\n           \n          </ion-note>\n        </ion-col>\n      </ion-row>\n \n    </ion-card>\n\n<!--\n<ion-row>\n  <ion-col>\n  <ion-card class="card" *ngFor="let item of tweets">\n    <div class="card-image">\n      <img style={width:10px,height:10px;} src={{item.user.profile_image_url}}>\n    </div>\n    <div class="right-content">\n      <span class="card-title">{{item.user.name}}</span>\n      <div class="card-content">\n        <p>{{item.text}}</p>\n      </div>\n      <div class="card-action">\n        <a href="#">This is a link</a>\n      </div>\n    </div>\n  </ion-card>\n  </ion-col>\n  </ion-row>-->\n\n</ion-content>'/*ion-inline-end:"/Users/demetriomortelliti/Desktop/demy/PROJECTS/appkwondo/clients/ion2kwondo/src/pages/twitter/twitter.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__ionic_native_app_availability__["a" /* AppAvailability */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_2__providers_backend_backend__["a" /* BackendProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */]])
], TwitterPage);

//# sourceMappingURL=twitter.js.map

/***/ }),

/***/ 745:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PartnerworldPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_socket_service_socket_service__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_backend_backend__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(3);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var PartnerworldPage = (function () {
    function PartnerworldPage(navCtrl, socket, backend) {
        this.navCtrl = navCtrl;
        this.socket = socket;
        this.backend = backend;
        this.allnews = [];
        var questo = this;
        this.socket.socketService.subscribe(function (event) {
            console.log('message received from server... ', event);
            if (event.category === 'message') {
            }
        }); //end of subscribe
        backend.getPartnerworld(function (data) {
            console.log("partnerworld", data);
            var imgurl = data.rss.channel.image.url;
            questo.allnews = data.rss.channel.item;
            questo.allnews.forEach(function (item, idx) {
                item.likes = questo.backend.getRandomNumber(20);
                item.comments = questo.backend.getRandomNumber(10);
                item.foto = imgurl;
            });
        });
    }
    PartnerworldPage.prototype.doRefresh = function (refresher) {
        console.log('Begin async operation', refresher);
        var questo = this;
        questo.backend.getPartnerworld(function (data) {
            console.log("partnerworld", data);
            questo.allnews = data.rss.channel.item;
            var imgurl = data.rss.channel.image.url;
            questo.allnews.forEach(function (item, idx) {
                item.likes = questo.backend.getRandomNumber(20);
                item.comments = questo.backend.getRandomNumber(10);
                item.foto = imgurl;
            });
            refresher.complete();
        });
    };
    PartnerworldPage.prototype.openUrl = function (url) {
        this.backend.openUrl(url);
    };
    return PartnerworldPage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('chat'),
    __metadata("design:type", Object)
], PartnerworldPage.prototype, "chat", void 0);
PartnerworldPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-partnerworld',template:/*ion-inline-start:"/Users/demetriomortelliti/Desktop/demy/PROJECTS/appkwondo/clients/ion2kwondo/src/pages/partnerworld/partnerworld.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>PartnerWorld</ion-title>\n  </ion-navbar>\n</ion-header>\n<ion-content spadding class="ion-content">\n\n  <ion-refresher (ionRefresh)="doRefresh($event)">\n    <ion-refresher-content>\n        </ion-refresher-content>\n  </ion-refresher>\n\n<ion-card *ngFor="let item of allnews" (tap)="openUrl(item.link)">\n \n      <ion-item>\n        <ion-avatar item-left>\n           <img src="assets/img/globe.png" />\n      </ion-avatar>\n        <h2 class="h2wrap">{{item.title}}</h2>\n        <p>{{item.pubDate}}</p>\n      </ion-item>\n \n      <!--<img src="http://placehold.it/500x200" />-->\n \n      <ion-card-content>\n        {{item.description}}\n      </ion-card-content>\n \n      <ion-row>\n        <ion-col>\n          <button ion-button icon-left clear small>\n            <ion-icon class="bpgreen" name="thumbs-up"></ion-icon>\n            <div class="bpgreen">{{item.likes}} Likes</div>\n          </button>\n        </ion-col>\n        <ion-col>\n          <button ion-button icon-left clear small>\n            <ion-icon class="bpgreen" name="text"></ion-icon>\n            <div class="bpgreen">{{item.comments}} Comments</div>\n          </button>\n        </ion-col>\n        <ion-col center text-center>\n          <ion-note>\n            \n          </ion-note>\n        </ion-col>\n      </ion-row>\n \n    </ion-card>\n \n</ion-content>\n'/*ion-inline-end:"/Users/demetriomortelliti/Desktop/demy/PROJECTS/appkwondo/clients/ion2kwondo/src/pages/partnerworld/partnerworld.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_1__providers_socket_service_socket_service__["a" /* SocketService */], __WEBPACK_IMPORTED_MODULE_2__providers_backend_backend__["a" /* BackendProvider */]])
], PartnerworldPage);

//# sourceMappingURL=partnerworld.js.map

/***/ }),

/***/ 746:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LinkedinPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_socket_service_socket_service__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_backend_backend__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(3);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var LinkedinPage = (function () {
    function LinkedinPage(navCtrl, socket, backend) {
        this.navCtrl = navCtrl;
        this.socket = socket;
        this.backend = backend;
        this.allnews = [];
        var questo = this;
        this.socket.socketService.subscribe(function (event) {
            console.log('message received from server... ', event);
            if (event.category === 'message') {
            }
        }); //end of subscribe
        backend.getLinkedin(function (data) {
            console.log("linkedin", data);
            questo.allnews = data.rows;
            questo.allnews.forEach(function (item, idx) {
                item.likes = questo.backend.getRandomNumber(20);
                item.comments = questo.backend.getRandomNumber(10);
            });
        });
    }
    LinkedinPage.prototype.doRefresh = function (refresher) {
        console.log('Begin async operation', refresher);
        var questo = this;
        questo.backend.getLinkedin(function (data) {
            console.log("linkedin", data);
            questo.allnews = data.rows;
            questo.allnews.forEach(function (item, idx) {
                item.likes = questo.backend.getRandomNumber(20);
                item.comments = questo.backend.getRandomNumber(10);
            });
            refresher.complete();
        });
    };
    LinkedinPage.prototype.openUrl = function (url) {
        this.backend.openUrl(url);
    };
    return LinkedinPage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('chat'),
    __metadata("design:type", Object)
], LinkedinPage.prototype, "chat", void 0);
LinkedinPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-linkedin',template:/*ion-inline-start:"/Users/demetriomortelliti/Desktop/demy/PROJECTS/appkwondo/clients/ion2kwondo/src/pages/linkedin/linkedin.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Linkedin</ion-title>\n  </ion-navbar>\n</ion-header>\n<ion-content spadding class="ion-content">\n\n    <ion-refresher (ionRefresh)="doRefresh($event)">\n    <ion-refresher-content>\n        </ion-refresher-content>\n  </ion-refresher>\n\n<ion-card *ngFor="let item of allnews" (tap)="openUrl(item.doc.link)">\n \n      <ion-item>\n        <ion-avatar item-left>\n          <img src="{{item.doc.foto}}" />\n        </ion-avatar>\n        <h2 class="h2wrap">{{item.doc.title}}</h2>\n        <p class="autore">{{item.doc.autore}}</p>\n        <p>{{item.doc.data}}</p>\n      </ion-item>\n \n      <!--<img src="http://placehold.it/500x200" />-->\n \n      <ion-card-content>\n         <div [innerHTML] = "item.doc.description"></div>\n        \n      </ion-card-content>\n \n      <ion-row>\n        <ion-col>\n          <button ion-button icon-left clear small>\n            <ion-icon class="bpgreen" name="thumbs-up"></ion-icon>\n            <div class="bpgreen">{{item.likes}} Likes</div>\n          </button>\n        </ion-col>\n        <ion-col>\n          <button ion-button icon-left clear small>\n            <ion-icon class="bpgreen" name="text"></ion-icon>\n            <div class="bpgreen">{{item.comments}} Comments</div>\n          </button>\n        </ion-col>\n        <ion-col center text-center>\n          <ion-note>\n            \n          </ion-note>\n        </ion-col>\n      </ion-row>\n \n    </ion-card>\n\n\n    <ion-card *ngIf="allnews.length==0">\n      \n      <ion-card-content>No data was returned from the backend system</ion-card-content>\n\n      </ion-card>\n</ion-content>\n'/*ion-inline-end:"/Users/demetriomortelliti/Desktop/demy/PROJECTS/appkwondo/clients/ion2kwondo/src/pages/linkedin/linkedin.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_1__providers_socket_service_socket_service__["a" /* SocketService */], __WEBPACK_IMPORTED_MODULE_2__providers_backend_backend__["a" /* BackendProvider */]])
], LinkedinPage);

//# sourceMappingURL=linkedin.js.map

/***/ }),

/***/ 747:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContactsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_socket_service_socket_service__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_backend_backend__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_chat_chat__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(3);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





//import { MyApp } from '../../app/app.component'

var ContactsPage = (function () {
    function ContactsPage(alert, app, events, nav, socket, backend) {
        this.alert = alert;
        this.app = app;
        this.events = events;
        this.nav = nav;
        this.socket = socket;
        this.backend = backend;
        this.allnews = [];
        this.isIbmAdmin = false;
        this.user = {
            email: ""
        };
        var questo = this;
        this.user.email = backend.user.email;
        questo.isIbmAdmin = questo.backend.isIbmAdmin;
    }
    ContactsPage.prototype.ngOnInit = function () {
        var _this = this;
        console.log("ngoninit contact.ts");
        var questo = this;
        this.events.subscribe('updatetotalunreadcount', function (msg, time) {
            console.log("updatetotalunreadcount ! in contacts.ts");
            _this.allnews = _this.socket.contacts;
            console.log(_this.allnews);
        });
        this.socket.socketService.subscribe(function (event) {
            console.log('message received from server in contacts.ts... ', event);
            if (event.category === 'auserhasdisconnected') {
                _this.allnews = _this.socket.contacts;
                console.log(_this.allnews);
            }
            if (event.category === 'auserhasconnected') {
                _this.allnews = _this.socket.contacts;
                console.log(_this.allnews);
            }
            if (event.category === 'message') {
                _this.allnews = _this.socket.contacts;
                console.log(_this.allnews);
            }
        });
        questo.refresh(function () {
        });
    };
    ContactsPage.prototype.doRefresh = function (refresher) {
        this.refresh(function () {
            refresher.complete();
        });
    };
    ContactsPage.prototype.refresh = function (callback) {
        this.allnews = this.socket.contacts;
        callback();
    };
    ContactsPage.prototype.tapChatUser = function (user) {
        console.log("tapped", user);
        /*this.myapp.openPageWithParams(ChatPage,{
          user: user
        })*/
        var nav = this.app.getRootNav();
        /*
        nav.setRoot(ChatPage, {
          user: user
        });
        */
        this.nav.push(__WEBPACK_IMPORTED_MODULE_3__pages_chat_chat__["a" /* ChatPage */], {
            user: user
        });
    };
    ContactsPage.prototype.ionViewWillEnter = function () {
        var tag = "ionviewwillenter contacts.ts";
        var questo = this;
        questo.isIbmAdmin = questo.backend.isIbmAdmin;
        this.refresh(function () {
            console.log(tag, "refresh completed", questo.allnews);
            //refresher.complete();
        }); // THERE IT IS!!!
        /*
        var questo = this;
        this.socket.socketService.subscribe(event => {
    
          console.log('message received from server... ', event);
          if (event.category === 'auserhasconnected') {
            questo.refresh(function () {
    
            });
          }
    
          if (event.category === 'auserhasdisconnected') {
    
            questo.refresh(function () {
    
            });
          }
          if (event.category === 'message') {
            console.log("habemus messaggio")
            questo.refresh(function () {
    
            });
          }
        }); //end of subscribe
         questo.refresh(function () {
    
            });
        //return this.service.getComments().then(data => this.comments = data);
        */
    };
    ContactsPage.prototype.broadcast = function () {
        var _this = this;
        var alert = this.alert.create({
            title: 'Broadcast a message',
            inputs: [
                {
                    name: 'message',
                    placeholder: 'Write your broadcast message here'
                } /*,
              {
                name: 'password',
                placeholder: 'Password',
                type: 'password'
              }*/
            ],
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function (data) {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Send broadcast',
                    handler: function (data) {
                        _this.socket.sendCustomMessage("broadcast", data.message);
                    }
                }
            ]
        });
        alert.present();
    };
    return ContactsPage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('chat'),
    __metadata("design:type", Object)
], ContactsPage.prototype, "chat", void 0);
ContactsPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-contacts',template:/*ion-inline-start:"/Users/demetriomortelliti/Desktop/demy/PROJECTS/appkwondo/clients/ion2kwondo/src/pages/contacts/contacts.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Contacts</ion-title>\n    <ion-buttons end>\n  <button ion-button icon-right (tap)="broadcast()"><!--*ngIf="isIbmAdmin" -->\n \n  <ion-icon name="ios-radio-outline"></ion-icon>\n</button>\n</ion-buttons>\n\n  </ion-navbar>\n</ion-header>\n<ion-content spadding class="ion-content">\n\n    <ion-refresher (ionRefresh)="doRefresh($event)">\n    <ion-refresher-content>\n        </ion-refresher-content>\n  </ion-refresher>\n\n<ion-card>\n  <ion-item>\n    <p>Contacts for {{user.email}}</p>\n  </ion-item>\n  </ion-card>\n\n<ion-card (tap)="tapChatUser(item)" *ngFor="let item of allnews">\n \n      <ion-item  >\n        <ion-avatar item-left>\n          <img src="data:image/jpeg;base64,{{item.doc.userphoto}}" />\n          <span [ngClass]="item.connected  ? \'online\' : \'offline\'" >{{item.connected  ? \'ONLINE\' : \'OFFLINE\'}}</span>\n        </ion-avatar>\n        <h2>{{item.doc.firstname + \' \' +item.doc.lastname}}</h2>\n        <p>{{item.doc.email}}</p><ion-badge *ngIf="item.doc.unreadcount>0" color="danger" item-right>{{item.doc.unreadcount}}</ion-badge>\n        <p>{{item.doc.role}}</p>\n      </ion-item>\n \n\n \n    </ion-card>\n\n</ion-content>\n<ion-footer>\n \n\n</ion-footer>\n'/*ion-inline-end:"/Users/demetriomortelliti/Desktop/demy/PROJECTS/appkwondo/clients/ion2kwondo/src/pages/contacts/contacts.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["b" /* App */], __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["d" /* Events */], __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_1__providers_socket_service_socket_service__["a" /* SocketService */], __WEBPACK_IMPORTED_MODULE_2__providers_backend_backend__["a" /* BackendProvider */]])
], ContactsPage);

//# sourceMappingURL=contacts.js.map

/***/ }),

/***/ 748:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BrowserPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/*
  Generated class for the BrowserPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var BrowserPage = (function () {
    function BrowserPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    BrowserPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad BrowserPagePage');
    };
    return BrowserPage;
}());
BrowserPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-browser',template:/*ion-inline-start:"/Users/demetriomortelliti/Desktop/demy/PROJECTS/appkwondo/clients/ion2kwondo/src/pages/browser/browser.html"*/'<!--\n  Generated template for the BrowserPage page.\n\n  See http://ionicframework.com/docs/v2/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>browser</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <iframe \n             name="iframe_a"  \n             id="iframea"  \n             src="http://twitter.com" \n             frameborder="0" \n             style=" overflow:hidden;\n                     overflow-x:hidden;\n                     overflow-y:hidden;\n                     height:100%;\n                     width:100%;\n                     position:absolute;\n                     top:14px;left:0px;right:0px;bottom:0px;\n                     -ms-touch-action: none;" \n                     height="100%" width="100%"\n    ></iframe>\n\n</ion-content>\n'/*ion-inline-end:"/Users/demetriomortelliti/Desktop/demy/PROJECTS/appkwondo/clients/ion2kwondo/src/pages/browser/browser.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */]])
], BrowserPage);

//# sourceMappingURL=browser.js.map

/***/ }),

/***/ 749:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BpPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_backend_backend__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(3);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var BpPage = (function () {
    function BpPage(loadingCtrl, alertCtrl, backend, navCtrl) {
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.backend = backend;
        this.navCtrl = navCtrl;
        /*
        displayednews = [{
          title: "BP01",
          description: "Best BP in Lumbardia",
          imgurl: "https://www.medipta.com/pic/business_partner.jpg",
          autore: "",
          likes: 2,
          comments: 8
      
      
        },
        {
          title: "BP02",
          description: "Best BP in Piemontis",
          imgurl: "https://www.medipta.com/pic/business_partner.jpg",
          autore: "",
          likes: 2,
          comments: 8
      
      
        },
        {
          title: "BP03",
          description: "Best BP in Liguria",
          imgurl: "https://www.medipta.com/pic/business_partner.jpg",
          autore: "",
          likes: 2,
          comments: 8
      
      
        }
      
        ]*/
        this.displayednews = [];
        this.bpfilters = {};
        this.bpfiltersarray = [];
        this.filters = {};
        this.filtersShown = false;
        /*this.refresh(function(data){
    
        })*/
    }
    BpPage.prototype.showFilterMsg = function () {
        var retvalue = true;
        console.log(this.filters);
        var count = 0;
        for (var k in this.filters) {
            console.log("k", k);
            count++;
        }
        if (count > 0)
            retvalue = false;
        //if ((this.filters==={}) && !this.filtersShown) retvalue=true;
        console.log("showFilterMsg", retvalue);
        return retvalue;
    };
    BpPage.prototype.toggleFilters = function () {
        this.filtersShown = !this.filtersShown;
    };
    BpPage.prototype.tapCard = function (item) {
        console.log("tapcard", item);
    };
    BpPage.prototype.doRefresh = function (refresher) {
        if (this.hasFilters()) {
            console.log('Begin async operation', refresher);
            var questo = this;
            questo.refresh(function (data) {
                //console.log("allnews", data);
                refresher.complete();
            });
        }
        else
            refresher.complete();
    };
    BpPage.prototype.refresh = function (callback) {
        var questo = this;
        questo.backend.getBp(questo.filters, function (data) {
            questo.displayednews = data.rows;
            console.log(data);
            if (callback)
                callback(data);
        });
    };
    BpPage.prototype.ionViewWillEnter = function () {
        this.bpfilters = this.backend.bpfilters;
        var keys = [];
        for (var key in this.bpfilters) {
            keys.push(key);
        }
        this.bpfiltersarray = keys;
        console.log("bpfilters", this.bpfilters, "bpfiltersarray", this.bpfiltersarray);
    };
    BpPage.prototype.onFilterChange = function (ev) {
        console.log("filterchange", ev);
    };
    BpPage.prototype.getFilter = function (key) {
        var retvalue = "ANY";
        if (this.filters.hasOwnProperty(key))
            retvalue = this.filters[key];
        return retvalue;
    };
    BpPage.prototype.getFilters = function (key) {
        console.log("getfilters(" + key + ")", this.bpfilters[key]);
        return this.bpfilters[key];
    };
    BpPage.prototype.selectFilter = function (key) {
        var _this = this;
        var questo = this;
        var alert = this.alertCtrl.create();
        alert.setTitle(key);
        var anychecked = false;
        if (!questo.filters.hasOwnProperty(key))
            anychecked = true;
        alert.addInput({
            type: 'radio',
            label: "ANY",
            value: "ANY",
            checked: anychecked
        });
        this.bpfilters[key].forEach(function (filtitem, filtidx) {
            var checked = false;
            if (questo.filters.hasOwnProperty(key)) {
                if (questo.filters[key].toLowerCase() == filtitem.toLowerCase())
                    checked = true;
            }
            alert.addInput({
                type: 'radio',
                label: filtitem,
                value: filtitem,
                checked: checked
            });
        });
        alert.addButton('Cancel');
        alert.addButton({
            text: 'OK',
            handler: function (data) {
                console.log("pressed ok,selected ", data, "for filter named ", key);
                questo.filters[key] = data;
                if (data == "ANY")
                    delete questo.filters[key];
                console.log("filters", questo.filters);
                questo.filtersShown = false;
                if (questo.hasFilters()) {
                    var loader_1 = _this.loadingCtrl.create({
                        content: "Please wait..."
                    });
                    loader_1.present();
                    questo.refresh(function () {
                        loader_1.dismiss();
                    });
                }
                else {
                    questo.displayednews = [];
                }
            }
        });
        alert.present();
    };
    BpPage.prototype.hasFilters = function () {
        var retvalue = false;
        var count = 0;
        for (var k in this.filters) {
            count++;
        }
        if (count > 0)
            retvalue = true;
        return retvalue;
    };
    return BpPage;
}());
BpPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-bp',template:/*ion-inline-start:"/Users/demetriomortelliti/Desktop/demy/PROJECTS/appkwondo/clients/ion2kwondo/src/pages/bp/bp.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>\n      BP\n    </ion-title>\n     <ion-buttons end>\n  <button ion-button icon-right (tap)="toggleFilters()"><!--*ngIf="isIbmAdmin" -->\n \n  <ion-icon name="ios-search"></ion-icon>\n</button>\n</ion-buttons>\n  </ion-navbar>\n</ion-header>\n<ion-content spadding class="ion-content">\n    <ion-refresher (ionRefresh)="doRefresh($event)">\n    <ion-refresher-content>\n        </ion-refresher-content>\n  </ion-refresher>\n  <!--<ion-list>\n  <ion-item ion-item  *ngFor="let key of bpfiltersarray" >\n    {{ key }}\n    <ion-list>\n  <ion-item ion-item  *ngFor="let item of bpfilters[key]" >{{item}}</ion-item>\n    </ion-list>\n  </ion-item>  \n</ion-list>-->\n  <ion-card *ngIf="filtersShown" style="padding: 4px !important;">\n    <ion-card-header>\n      Search filters\n    </ion-card-header>\n    <ion-row *ngFor="let key of bpfiltersarray" >\n      <ion-col>\n    <button ion-button (tap)="selectFilter(key)" style="min-width: 200px">{{key}}</button>\n      </ion-col>\n      <ion-col><ion-item>{{getFilter(key)}}</ion-item></ion-col>\n      </ion-row>\n   <!-- <span *ngFor="let muschio of bpfilters[key]" value="muschio">{{muschio}}</span>-->\n  <!--<ion-select (ionChange)="onFilterChange($event)" id="{{key}}" >\n      <ion-option *ngFor=" let muschio of getFilters(key)" value="{{muschio}}">{{muschio}}</ion-option>\n      \n    </ion-select>-->\n    </ion-card>\n    <ion-card style="padding: 4px !important;" *ngIf="showFilterMsg()" >\n      <ion-item>\n    Specify some filters to search for BPs\n    </ion-item>\n    </ion-card>\n    <ion-card style="padding: 4px !important;" *ngIf="displayednews.length>0" >\n      <ion-item>\n    {{displayednews.length}} BP found for the specified filters\n    </ion-item>\n    </ion-card>\n   <ion-card *ngFor="let item of displayednews" (tap)="tapCard(item)">\n \n      <ion-item>\n        <h2 class="h2wrap">{{item.doc.Company}}</h2>\n        <p class="autore">{{item.doc.Competency}}</p>\n        <div>{{item.doc.PreferredVAD}}</div>\n        <div>{{item.doc.BU}}</div>\n        <div>{{item.doc.TaxonomyCategory}}</div>\n          <div>{{item.doc.TerritoryCity}}</div>\n        \n      </ion-item>\n \n    </ion-card>\n</ion-content>\n'/*ion-inline-end:"/Users/demetriomortelliti/Desktop/demy/PROJECTS/appkwondo/clients/ion2kwondo/src/pages/bp/bp.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1__providers_backend_backend__["a" /* BackendProvider */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["m" /* NavController */]])
], BpPage);

//# sourceMappingURL=bp.js.map

/***/ }),

/***/ 750:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return IospaidPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_tabs_tabs__ = __webpack_require__(56);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



//import { InAppPurchase } from '@ionic-native/in-app-purchase';
/**
 * Generated class for the IospaidPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var IospaidPage = (function () {
    function IospaidPage(menuCtrl, navCtrl, navParams) {
        this.menuCtrl = menuCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.contributo = "2€";
    }
    IospaidPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad IospaidPage');
        this.menuCtrl.enable(false);
        /*this.iap
          .getProducts(['abb365'])
          .then((products) => {
            console.log("inapppurchases",products);
            //  [{ productId: 'com.yourapp.prod1', 'title': '...', description: '...', price: '...' }, ...]
          })
          .catch((err) => {
            console.log(err);
          });*/
    };
    IospaidPage.prototype.sblocca = function () {
        var questo = this;
        //prima fa login, verifica pagamento ecc....
        questo.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__pages_tabs_tabs__["a" /* TabsPage */]);
    };
    return IospaidPage;
}());
IospaidPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-iospaid',template:/*ion-inline-start:"/Users/demetriomortelliti/Desktop/demy/PROJECTS/appkwondo/clients/ion2kwondo/src/pages/iospaid/iospaid.html"*/'<!--\n  Generated template for the IospaidPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Avviso iOS</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n  <ion-row>\n    <ion-col style="text-align: center">\n        <img class="mela" src="assets/img/mela.png"/>\n    </ion-col>\n    </ion-row>\n    <ion-row>\n    <ion-col>\n      <p class="testo">\n        Per sostenere l\'elevato costo della licenza di sviluppo di Apple (99€ per anno), viene richiesto agli utenti iOS un piccolo contributo ({{contributo}}) da versare direttamente in società. A seguito di tale versamento, Appkwondo verrà sbloccata e potrà essere utilizzata integralmente su questo device.\n      </p>\n      <br><br>\n      <!--<p class="testo">\n        Nel caso tale contributo sia già stato versato, premi il pulsante SBLOCCA sottostante\n      </p>-->\n    </ion-col>\n  </ion-row>\n  <br><br>\n  <!--<button ion-button block (tap)="sblocca()">SBLOCCA</button>-->\n  \n\n</ion-content>\n'/*ion-inline-end:"/Users/demetriomortelliti/Desktop/demy/PROJECTS/appkwondo/clients/ion2kwondo/src/pages/iospaid/iospaid.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* MenuController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */]])
], IospaidPage);

//# sourceMappingURL=iospaid.js.map

/***/ }),

/***/ 751:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RtcPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_backend_backend__ = __webpack_require__(6);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the RtcPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var RtcPage = (function () {
    function RtcPage(events, backend, navCtrl, navParams) {
        this.events = events;
        this.backend = backend;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.SERVER_IP = "";
        this.SERVER_PORT = 80;
        this.callerId = null;
        // PeerJS object, instantiated when this client connects with its
        // caller ID
        this.peer = null;
        // the local video stream captured with getUserMedia()
        this.localStream = null;
        this.interlocutor = "";
        this.peers = [];
        //streamurl="rtmp://54.173.34.172:1937/publish_demo/";
        //streamurl="http://192.168.1.126:8080/playlist.m3u"; 
        this.streamurl = "rtsp://192.168.1.87:5554/playlist.m3u";
        this.getLocalStream = function (successCb) {
            var questo = this;
            if (questo.localStream && successCb) {
                successCb(questo.localStream);
            }
            else {
                navigator.mediaDevices.getUserMedia({
                    audio: true,
                    video: true
                }).then(function (stream) {
                    questo.localStream = stream;
                    questo.localVideo.src = window.URL.createObjectURL(stream);
                    if (successCb) {
                        successCb(stream);
                    }
                }).catch(function (err) {
                    questo.logError('failed to access local camera');
                    questo.logError(err.message);
                });
            }
        };
    }
    RtcPage.prototype.playStream = function () {
        this.backend.playStream(this.streamurl);
    };
    RtcPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad RtcPage');
        var servip = this.backend.rooturl.replace("http://", "");
        this.SERVER_IP = servip;
        if (servip.indexOf(":") > -1) {
            var ip = servip.split(":")[0];
            var port = servip.split(":")[1];
            this.SERVER_IP = ip;
            this.SERVER_PORT = parseInt(port, 10);
        }
        this.localVideo = document.querySelector('#local-video');
        this.remoteVideo = document.querySelector('#remote-video');
        this.callerIdEntry = document.querySelector('#caller-id');
        this.recipientIdEntry = document.querySelector('#recipient-id');
    };
    RtcPage.prototype.logError = function (text) {
        /*
        var p = makePara('ERROR: ' + text);
        p.style.color = 'red';
        addMessage(p);*/
        console.log(text);
    };
    ;
    RtcPage.prototype.showRemoteStream = function (stream) {
        var remotevideo = document.getElementById("remote-video");
        remotevideo["src"] = window.URL.createObjectURL(stream);
    };
    ;
    RtcPage.prototype.connect = function () {
        var questo = this;
        questo.callerId = questo.callerIdEntry.value;
        if (!questo.callerId) {
            questo.logError('please set caller ID first');
            return;
        }
        console.log("callerId", questo.callerId);
        try {
            // create connection to the ID server
            console.log("trying connection to rtc server using id", questo.callerId, questo.SERVER_IP, questo.SERVER_PORT);
            questo.peer = new Peer(questo.callerId, { host: questo.SERVER_IP, port: questo.SERVER_PORT, path: "/peerjs" });
            console.log("peer", questo.peer);
            questo.backend.myPeerId = questo.callerId;
            // hack to get around the fact that if a server connection cannot
            // be established, the peer and its socket property both still have
            // open === true; instead, listen to the wrapped WebSocket
            // and show an error if its readyState becomes CLOSED
            questo.peer.socket._socket.onclose = function () {
                console.log('no connection to server');
                //questo.peer = null;
            };
            // get local stream ready for incoming calls once the wrapped
            // WebSocket is open
            questo.peer.socket._socket.onopen = function () {
                console.log("socket opened !");
                questo.getLocalStream();
            };
            // handle events representing incoming calls
            questo.peer.on('call', function (call) {
                questo.answer(call);
            });
        }
        catch (e) {
            //questo.peer = null;
            console.log('error while connecting to server', e);
        }
    };
    ;
    RtcPage.prototype.answer = function (call) {
        var questo = this;
        console.log("ANSWER", call, questo.peer);
        questo.interlocutor = call.peer;
        if (!questo.peer) {
            console.log('cannot answer a call without a connection');
            //return;
        }
        if (!questo.localStream) {
            console.log('could not answer call as there is no localStream ready');
            return;
        }
        console.log('incoming call answered');
        //call.on('stream', questo.showRemoteStream);
        call.on('stream', function (stream) {
            questo.showRemoteStream(stream);
        });
        call.answer(questo.localStream);
    };
    ;
    RtcPage.prototype.dial = function () {
        var questo = this;
        if (!questo.peer) {
            questo.logError('please connect first');
            return;
        }
        if (!questo.localStream) {
            questo.logError('could not start call as there is no local camera');
            return;
        }
        //var recipientId = questo.recipientIdEntry.value;
        var recipientId = questo.interlocutor;
        if (!recipientId) {
            questo.logError('could not start call as no recipient ID is set');
            return;
        }
        questo.getLocalStream(function (stream) {
            console.log('outgoing call initiated');
            //var call = questo.peer.call(recipientId, stream);
            var call = questo.peer.call(questo.interlocutor, stream);
            //call.on('stream', questo.showRemoteStream);
            call.on('stream', function (stream) {
                questo.showRemoteStream(stream);
            });
            call.on('error', function (e) {
                console.log('error with call', e.message);
            });
        });
    };
    ;
    RtcPage.prototype.ionViewWillEnter = function () {
        var questo = this;
        this.events.subscribe("hwbackbutton", function (data) {
            console.log("hwbackbutton in servizisocieta.ts");
            questo.navCtrl.pop();
        });
    };
    RtcPage.prototype.ionViewWillLeave = function () {
        this.events.unsubscribe("hwbackbutton");
    };
    RtcPage.prototype.showPeer = function () {
        console.log("PEER", this.peer);
    };
    RtcPage.prototype.showPeers = function () {
        var questo = this;
        var url = questo.backend.rooturl + "/peerjs/peerjs/peers";
        questo.backend.fetchData(url, function (data) {
            console.log("peers", data);
            questo.peers = data;
        });
    };
    RtcPage.prototype.dial2 = function (p) {
        var questo = this;
        if (!questo.peer) {
            questo.logError('please connect first');
            return;
        }
        if (!questo.localStream) {
            questo.logError('could not start call as there is no local camera');
            return;
        }
        //var recipientId = questo.recipientIdEntry.value;
        var recipientId = p;
        questo.interlocutor = p;
        if (!recipientId) {
            questo.logError('could not start call as no recipient ID is set');
            return;
        }
        questo.getLocalStream(function (stream) {
            console.log('outgoing call initiated');
            //var call = questo.peer.call(recipientId, stream);
            var call = questo.peer.call(questo.interlocutor, stream);
            //call.on('stream', questo.showRemoteStream);
            call.on('stream', function (stream) {
                questo.showRemoteStream(stream);
            });
            call.on('error', function (e) {
                console.log('error with call', e.message);
            });
        });
    };
    ;
    return RtcPage;
}());
RtcPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-rtc',template:/*ion-inline-start:"/Users/demetriomortelliti/Desktop/demy/PROJECTS/appkwondo/clients/ion2kwondo/src/pages/rtc/rtc.html"*/'<!--\n  Generated template for the RtcPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>rtc</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content spadding class="ion-content">\n    <ion-list *ngFor="let r of backend.fbLives">\n        <ion-item>{{r}}</ion-item>\n      </ion-list>\n  <ion-input [(ngModel)]="streamurl"></ion-input>\n  <button ion-button block (tap)="playStream()">PLAY STREAM</button>\n  <!--<button ion-button (tap)="showPeers()">Show Peers</button>-->\n\n\n\n  <ion-row *ngIf="!backend.myPeerConnected">\n    <ion-col col-8>\n        <input type="text" id="caller-id"/>\n        <ion-input type="text" [(ngModel)]="callerId"></ion-input>\n    </ion-col>\n    <ion-col col-4>\n        <button ion-button (tap)="connect()">CONNECT</button>\n    </ion-col>\n  </ion-row>\n  <ion-row>\n    <ion-col>\n      <ion-list *ngFor="let p of backend.rtcpeers">\n        <ion-item (tap)="dial2(p)">\n          {{p}}\n        </ion-item>\n      </ion-list>\n    </ion-col>\n  </ion-row>\n <!-- <ion-row>\n    <ion-col col-8>\n        <ion-item>\n            <ion-label>Peers</ion-label>\n            <ion-select [(ngModel)]="interlocutor">\n              <ion-option *ngFor="let p of backend.rtcpeers" [value]="p">{{p}}</ion-option>\n              \n            </ion-select>\n          </ion-item>\n    </ion-col>\n    <ion-col col-4>\n        <button ion-button (tap)="dial()">CALL</button>\n    </ion-col>\n  </ion-row>-->\n  \n  \n  <!--<input type="text" id="recipient-id"/>-->\n  \n<div>\n  <p><strong>REMOTE: {{interlocutor}}:</strong></p>\n  <video id="remote-video" class="remotevideo" autoplay></video>\n</div>\n  <hr>\n<div>\n  <p><strong>LOCAL: {{callerId}}</strong></p>\n  <video id="local-video" class="localvideo" autoplay muted></video>\n</div>\n\n\n\n</ion-content>\n'/*ion-inline-end:"/Users/demetriomortelliti/Desktop/demy/PROJECTS/appkwondo/clients/ion2kwondo/src/pages/rtc/rtc.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */], __WEBPACK_IMPORTED_MODULE_2__providers_backend_backend__["a" /* BackendProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */]])
], RtcPage);

//# sourceMappingURL=rtc.js.map

/***/ }),

/***/ 752:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FblivePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__ = __webpack_require__(22);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the FblivePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var FblivePage = (function () {
    function FblivePage(domsanitizer, navCtrl, navParams) {
        this.domsanitizer = domsanitizer;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.liveurl = "rtmp://live-api.facebook.com:80/rtmp/10217101858005331";
        this.framesrc = "";
    }
    FblivePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad FblivePage');
    };
    FblivePage.prototype.changeUrl = function (ev) {
        console.log("changeUrl", ev.value);
        this.liveurl = ev.value;
    };
    FblivePage.prototype.go = function () {
        var encurl = encodeURI(this.liveurl);
        var url = "https://www.facebook.com/plugins/video.php?href=" + encurl + "&width=500&show_text=true&appId=2034574830091019&height=0";
        //rtmp://live-api.facebook.com:80/rtmp/10217101858005331
        this.framesrc = this.domsanitizer.bypassSecurityTrustResourceUrl(url);
    };
    return FblivePage;
}());
FblivePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-fblive',template:/*ion-inline-start:"/Users/demetriomortelliti/Desktop/demy/PROJECTS/appkwondo/clients/ion2kwondo/src/pages/fblive/fblive.html"*/'<!--\n  Generated template for the FblivePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>fblive</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content spadding class="ioncontent">\n    <ion-item>\n        <ion-label floating color="primary">Inline Label</ion-label>\n        <ion-input type="text" (ionChange)="changeUrl($event)" [(ngModel)]="liveurl"></ion-input>\n      </ion-item>\n \n      <button ion-button (tap)="go()">GO</button>\n      <iframe src="https://www.facebook.com/plugins/video.php?href=rtmp%3A%2F%2Flive-api.facebook.com%3A80%2Frtmp%2F10217109156227782&width=500&show_text=false&appId=2034574830091019&height=200" width="500" height="200" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowTransparency="true" allow="encrypted-media" allowFullScreen="true"></iframe>\n</ion-content>\n'/*ion-inline-end:"/Users/demetriomortelliti/Desktop/demy/PROJECTS/appkwondo/clients/ion2kwondo/src/pages/fblive/fblive.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__["c" /* DomSanitizer */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */]])
], FblivePage);

//# sourceMappingURL=fblive.js.map

/***/ }),

/***/ 753:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SectionComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

/**
 * Generated class for the SectionComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var SectionComponent = (function () {
    function SectionComponent() {
        this.visibility = 'hidden';
        this.title = "titolo";
        this.showDelete = false;
        this.showCopy = false;
        this.showAdd = false;
        this.showAlert = false;
        this.background = "red";
        this.color = "yellow";
        this.visible = false;
        this.onDeleteButton = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.onAddButton = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.onCopyButton = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.headerclass = "arrheader";
        this.headercolor = "yellow";
        this.animationclass = "";
        this.text = 'Hello World';
        if (this.showDelete)
            this.headerclass = "arrheader";
    }
    SectionComponent.prototype.toggleSection = function () {
        console.log("togglesection");
        this.visible = !this.visible;
        //if (this.content) this.animationclass="animated cucuzza";
    };
    SectionComponent.prototype.getStyle = function () {
        var retvalue = "background: red !important";
        return retvalue;
    };
    SectionComponent.prototype.addItem = function () {
        this.onAddButton.emit("add!!");
        this.visible = true;
    };
    SectionComponent.prototype.copyItem = function () {
        this.onCopyButton.emit("add!!");
    };
    SectionComponent.prototype.deleteItem = function () {
        this.onDeleteButton.emit("delete!!");
    };
    return SectionComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])("content"),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"])
], SectionComponent.prototype, "content", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], SectionComponent.prototype, "title", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean)
], SectionComponent.prototype, "showDelete", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean)
], SectionComponent.prototype, "showCopy", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean)
], SectionComponent.prototype, "showAdd", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean)
], SectionComponent.prototype, "showAlert", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], SectionComponent.prototype, "background", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", String)
], SectionComponent.prototype, "color", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean)
], SectionComponent.prototype, "visible", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], SectionComponent.prototype, "onDeleteButton", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], SectionComponent.prototype, "onAddButton", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], SectionComponent.prototype, "onCopyButton", void 0);
SectionComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'ibmsection',template:/*ion-inline-start:"/Users/demetriomortelliti/Desktop/demy/PROJECTS/appkwondo/clients/ion2kwondo/src/components/section/section.html"*/'<!-- Generated template for the SectionComponent component -->\n\n<div class="section">\n    <div [style]="getStyle()" class="header">\n        <ion-row>\n            <ion-col col-1 (tap)="toggleSection()">\n                <ion-icon *ngIf="!visible" name="ios-arrow-dropright"></ion-icon>\n                <ion-icon *ngIf="visible" name="ios-arrow-dropdown"></ion-icon>\n            </ion-col>\n           \n            <ion-col class="headertitle" *ngIf="!showDelete" (tap)="toggleSection()">\n                {{title}}\n            </ion-col>\n            <ion-col class="headertitle" *ngIf="showDelete" (tap)="toggleSection()">\n                {{title}}\n            </ion-col>\n            <ion-col col-1 >\n                    <button class="itembut"  float-right ion-button clear  *ngIf="showCopy" (tap)="copyItem()">\n                        <ion-icon name="copy"></ion-icon>\n                    </button>\n                    <button class="itembut" float-right ion-button clear  *ngIf="showDelete" (tap)="deleteItem()">\n                        <ion-icon name="trash"></ion-icon>\n                    </button>\n                    <button class="itembut" float-right ion-button clear  *ngIf="showAdd" (tap)="addItem()">\n                        <ion-icon name="add"></ion-icon>\n                    </button>\n                    <!--<button class="itembut" float-right ion-button clear  *ngIf="showAdd" (tap)="addItem()">-->\n                            <ion-icon *ngIf="showAlert" name="alert"></ion-icon>\n                        <!--</button>-->\n                </ion-col>\n           \n\n        </ion-row>\n\n    </div>\n\n    <div  #content [ngClass]="animationclass" *ngIf="visible">\n        <ng-content></ng-content>\n    </div>\n</div>'/*ion-inline-end:"/Users/demetriomortelliti/Desktop/demy/PROJECTS/appkwondo/clients/ion2kwondo/src/components/section/section.html"*/
    }),
    __metadata("design:paramtypes", [])
], SectionComponent);

//# sourceMappingURL=section.js.map

/***/ }),

/***/ 754:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ScrollableTabs; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ScrollableTabs = (function () {
    function ScrollableTabs(elemRef, renderer) {
        this.elemRef = elemRef;
        this.renderer = renderer;
        this.opts = {};
        this.tabs = [];
    }
    ScrollableTabs.prototype.ngOnChanges = function (changes) {
        var _this = this;
        if (changes.hasOwnProperty('opts')) {
            if (changes['opts'].currentValue.refresh) {
                setTimeout(function () {
                    _this.setAnchorStyles();
                    _this.scrollToselectedTab();
                }, 300);
            }
        }
    };
    ScrollableTabs.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.nativeTabbar = this.ionTabs._tabbar.nativeElement;
        this.tabs = this.ionTabs._tabs;
        this.currentTabIndex = typeof (this.ionTabs.selectedIndex) == "undefined" ? 0 : this.ionTabs.selectedIndex;
        this.ionTabs.ionChange.subscribe(function () {
            _this.scrollToselectedTab();
        });
        var _loop_1 = function (i) {
            this_1.tabs[i].ionSelect.subscribe(function () {
                _this.currentTabIndex = i;
            });
        };
        var this_1 = this;
        for (var i = 0; i < this.tabs.length; i++) {
            _loop_1(i);
        }
        // set tabbar overflow-x: scroll
        this.renderer.setElementStyle(this.nativeTabbar, "overflow-x", "scroll");
        // set tabbar overflow-y: hidden
        this.renderer.setElementStyle(this.nativeTabbar, "overflow-y", "hidden");
        this.setAnchorStyles();
        this.scrollToselectedTab();
    };
    ScrollableTabs.prototype.onResize = function (event) {
        var _this = this;
        this.setAnchorStyles();
        setTimeout(function () {
            _this.scrollToselectedTab();
        }, 300);
    };
    ScrollableTabs.prototype.setAnchorStyles = function () {
        if (typeof (this.nativeTabbar) != "undefined") {
            var tabBar_width = this.nativeTabbar.clientWidth;
            var numOfTabs = this.tabs.length;
            var numOfVisibleAnchors = 0;
            var sumOfVisibleAnchorWidth = 0;
            // loop through tab elements in tabs
            for (var i = 0; i < numOfTabs; i++) {
                var element = this.nativeTabbar.children[i];
                // when Tab visible (effecting show property)
                if (this.tabs[i]._isShown) {
                    numOfVisibleAnchors++;
                    // set <a> display: inline-table
                    this.renderer.setElementStyle(element, 'display', 'inline-table');
                    // set <a> width: 6rem
                    this.renderer.setElementStyle(element, 'width', '6rem');
                    // extra padding for title-only tags only
                    if (element.classList.contains("has-title-only")) {
                        // set <a> padding-top: 1.5rem
                        this.renderer.setElementStyle(element, 'padding-top', '1.5rem');
                    }
                    sumOfVisibleAnchorWidth += element.clientWidth;
                }
                else {
                    // set <a> display: none
                    this.renderer.setElementStyle(element, 'display', 'none');
                }
            }
            // to prevent extra space at end
            if (sumOfVisibleAnchorWidth < tabBar_width) {
                var anchorWidth = tabBar_width / numOfVisibleAnchors;
                for (var i = 0; i < numOfTabs; i++) {
                    var element = this.nativeTabbar.children[i];
                    // when Tab not not visible effecting show property
                    if (!element.classList.contains("tab-hidden")) {
                        this.renderer.setElementStyle(element, 'width', anchorWidth + 'px');
                    }
                }
            }
        }
    };
    ScrollableTabs.prototype.scrollToselectedTab = function () {
        if (typeof this.nativeTabbar != 'undefined') {
            var tabBar_width = this.nativeTabbar.clientWidth;
            var selectedTab = this.nativeTabbar.children[this.currentTabIndex];
            var selectedTab_Width = selectedTab.clientWidth;
            var selectedTab_LeftOffset = document.getElementById(selectedTab.id).offsetLeft;
            var selectedTab_mid = selectedTab_LeftOffset + (selectedTab_Width / 2);
            var newScrollLeft = selectedTab_mid - (tabBar_width / 2);
            this.scrollXTo(newScrollLeft, 300).then(function () { });
        }
    };
    ScrollableTabs.prototype.scrollXTo = function (x, duration) {
        if (duration === void 0) { duration = 300; }
        // scroll animation loop w/ easing
        var tabbar = this.nativeTabbar;
        if (!tabbar) {
            // invalid element
            return Promise.resolve();
        }
        x = x || 0;
        var originalRaf = (window[window['Zone']['__symbol__']('requestAnimationFrame')] || window[window['Zone']['__symbol__']('webkitRequestAnimationFrame')]);
        var nativeRaf = originalRaf !== undefined ? originalRaf['bind'](window) : window.requestAnimationFrame.bind(window);
        var fromX = tabbar.scrollLeft;
        var maxAttempts = (duration / 16) + 100;
        return new Promise(function (resolve) {
            var startTime;
            var attempts = 0;
            var isPlaying;
            // scroll loop
            function step() {
                attempts++;
                if (!tabbar || !isPlaying || attempts > maxAttempts) {
                    isPlaying = false;
                    resolve();
                    return;
                }
                var time = Math.min(1, ((Date.now() - startTime) / duration));
                // where .5 would be 50% of time on a linear scale easedT gives a
                // fraction based on the easing method
                var easedT = (--time) * time * time + 1;
                if (fromX !== x) {
                    tabbar.scrollLeft = Math.floor((easedT * (x - fromX)) + fromX);
                }
                if (easedT < 1) {
                    nativeRaf(step);
                }
                else {
                    // done
                    resolve();
                }
            }
            // start scroll loop
            isPlaying = true;
            // chill out for a frame first
            nativeRaf(function () {
                startTime = Date.now();
                nativeRaf(step);
            });
        });
    };
    return ScrollableTabs;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('scrollable-tabs'),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* Tabs */])
], ScrollableTabs.prototype, "ionTabs", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('opts'),
    __metadata("design:type", Object)
], ScrollableTabs.prototype, "opts", void 0);
ScrollableTabs = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
        selector: '[scrollable-tabs]',
        host: {
            '(window:resize)': 'onResize($event)'
        }
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["Renderer"]])
], ScrollableTabs);

//# sourceMappingURL=scrollable-tabs.js.map

/***/ }),

/***/ 755:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ScrollableSegments; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ScrollableSegments = (function () {
    function ScrollableSegments(elemRef, renderer) {
        this.elemRef = elemRef;
        this.renderer = renderer;
        this.opts = {};
        this.tabs = [];
    }
    ScrollableSegments.prototype.ngOnChanges = function (changes) {
        var _this = this;
        if (changes.hasOwnProperty('opts')) {
            if (changes['opts'].currentValue.refresh) {
                setTimeout(function () {
                    _this.setAnchorStyles();
                    _this.scrollToselectedTab();
                }, 300);
            }
        }
    };
    ScrollableSegments.prototype.ngAfterViewInit = function () {
        var _this = this;
        console.log("ionseg", this.ionSeg);
        var nativeSeg = this.ionSeg._elementRef.nativeElement;
        console.log("nativeseg", nativeSeg);
        if (true)
            return;
        // this.nativeTabbar = this.ionSeg.nativeElement;
        //this.tabs = this.ionSeg._buttons;
        this.currentSegment = typeof (this.ionSeg.value) == "undefined" ? "0" : this.ionSeg.value;
        this.ionSeg.ionChange.subscribe(function () {
            console.log("cucuzza");
            _this.scrollToselectedTab();
        });
        var _loop_1 = function (i) {
            this_1.tabs[i].ionSelect.subscribe(function () {
                _this.currentTabIndex = i;
            });
        };
        var this_1 = this;
        for (var i = 0; i < this.tabs.length; i++) {
            _loop_1(i);
        }
        // set tabbar overflow-x: scroll
        this.renderer.setElementStyle(this.nativeTabbar, "overflow-x", "scroll");
        // set tabbar overflow-y: hidden
        this.renderer.setElementStyle(this.nativeTabbar, "overflow-y", "hidden");
        this.setAnchorStyles();
        this.scrollToselectedTab();
    };
    ScrollableSegments.prototype.onResize = function (event) {
        var _this = this;
        this.setAnchorStyles();
        setTimeout(function () {
            _this.scrollToselectedTab();
        }, 300);
    };
    ScrollableSegments.prototype.setAnchorStyles = function () {
        if (typeof (this.nativeTabbar) != "undefined") {
            var tabBar_width = this.nativeTabbar.clientWidth;
            var numOfTabs = this.tabs.length;
            var numOfVisibleAnchors = 0;
            var sumOfVisibleAnchorWidth = 0;
            // loop through tab elements in tabs
            for (var i = 0; i < numOfTabs; i++) {
                var element = this.nativeTabbar.children[i];
                // when Tab visible (effecting show property)
                if (this.tabs[i].isActive) {
                    numOfVisibleAnchors++;
                    // set <a> display: inline-table
                    this.renderer.setElementStyle(element, 'display', 'inline-table');
                    // set <a> width: 6rem
                    this.renderer.setElementStyle(element, 'width', '6rem');
                    // extra padding for title-only tags only
                    if (element.classList.contains("has-title-only")) {
                        // set <a> padding-top: 1.5rem
                        this.renderer.setElementStyle(element, 'padding-top', '1.5rem');
                    }
                    sumOfVisibleAnchorWidth += element.clientWidth;
                }
                else {
                    // set <a> display: none
                    this.renderer.setElementStyle(element, 'display', 'none');
                }
            }
            // to prevent extra space at end
            if (sumOfVisibleAnchorWidth < tabBar_width) {
                var anchorWidth = tabBar_width / numOfVisibleAnchors;
                for (var i = 0; i < numOfTabs; i++) {
                    var element = this.nativeTabbar.children[i];
                    // when Tab not not visible effecting show property
                    if (!element.classList.contains("tab-hidden")) {
                        this.renderer.setElementStyle(element, 'width', anchorWidth + 'px');
                    }
                }
            }
        }
    };
    ScrollableSegments.prototype.scrollToselectedTab = function () {
        if (typeof this.nativeTabbar != 'undefined') {
            var tabBar_width = this.nativeTabbar.clientWidth;
            var selectedTab = this.nativeTabbar.children[this.currentTabIndex];
            var selectedTab_Width = selectedTab.clientWidth;
            var selectedTab_LeftOffset = document.getElementById(selectedTab.id).offsetLeft;
            var selectedTab_mid = selectedTab_LeftOffset + (selectedTab_Width / 2);
            var newScrollLeft = selectedTab_mid - (tabBar_width / 2);
            this.scrollXTo(newScrollLeft, 300).then(function () { });
        }
    };
    ScrollableSegments.prototype.scrollXTo = function (x, duration) {
        if (duration === void 0) { duration = 300; }
        // scroll animation loop w/ easing
        var tabbar = this.nativeTabbar;
        if (!tabbar) {
            // invalid element
            return Promise.resolve();
        }
        x = x || 0;
        var originalRaf = (window[window['Zone']['__symbol__']('requestAnimationFrame')] || window[window['Zone']['__symbol__']('webkitRequestAnimationFrame')]);
        var nativeRaf = originalRaf !== undefined ? originalRaf['bind'](window) : window.requestAnimationFrame.bind(window);
        var fromX = tabbar.scrollLeft;
        var maxAttempts = (duration / 16) + 100;
        return new Promise(function (resolve) {
            var startTime;
            var attempts = 0;
            var isPlaying;
            // scroll loop
            function step() {
                attempts++;
                if (!tabbar || !isPlaying || attempts > maxAttempts) {
                    isPlaying = false;
                    resolve();
                    return;
                }
                var time = Math.min(1, ((Date.now() - startTime) / duration));
                // where .5 would be 50% of time on a linear scale easedT gives a
                // fraction based on the easing method
                var easedT = (--time) * time * time + 1;
                if (fromX !== x) {
                    tabbar.scrollLeft = Math.floor((easedT * (x - fromX)) + fromX);
                }
                if (easedT < 1) {
                    nativeRaf(step);
                }
                else {
                    // done
                    resolve();
                }
            }
            // start scroll loop
            isPlaying = true;
            // chill out for a frame first
            nativeRaf(function () {
                startTime = Date.now();
                nativeRaf(step);
            });
        });
    };
    return ScrollableSegments;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('scrollable-segments'),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* Segment */])
], ScrollableSegments.prototype, "ionSeg", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('opts'),
    __metadata("design:type", Object)
], ScrollableSegments.prototype, "opts", void 0);
ScrollableSegments = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
        selector: '[scrollable-segments]',
        host: {
            '(window:resize)': 'onResize($event)'
        }
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["Renderer"]])
], ScrollableSegments);

//# sourceMappingURL=scrollable-segments.js.map

/***/ })

},[575]);
//# sourceMappingURL=main.js.map