webpackJsonp([0],{

/***/ 121:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_home__ = __webpack_require__(122);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__chat_chat__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_socket_service_socket_service__ = __webpack_require__(32);
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
    function TabsPage(navCtrl, backend, socket, events, nav, platform) {
        var _this = this;
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
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Navbar */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Navbar */])
], TabsPage.prototype, "navBar", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])("mytabs"),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* Tabs */])
], TabsPage.prototype, "mytabs", void 0);
TabsPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"/Users/pietroturati/Desktop/demy/PROJECTS/appkwondo/clients/client/ion2kwondo/src/pages/tabs/tabs.html"*/'<ion-tabs #mytabs   (tap)="tappedTab()" [selectedIndex]="activeTab" tabsPlacement="bottom"   >\n  <ion-tab [root]="homepage" tabTitle="AppKwonDo" tabIcon="home"></ion-tab>\n  <!--<ion-tab [root]="partnerworld" tabTitle="PartnerWorld" tabIcon="md-globe" ></ion-tab>\n  <ion-tab [root]="linkedin" tabTitle="LinkedIn" tabIcon="logo-linkedin" ></ion-tab>-->\n  <ion-tab tabBadge="{{backend.unread>0 ? backend.unread : \'\'}}" tabBadgeStyle="{{backend.unread>0 ? \'danger\' : \'\'}}"  [root]="chatpage" tabTitle="ChatKwonDo" tabIcon="md-chatboxes" ></ion-tab>\n<!-- <ion-tab [root]="bppage" tabTitle="BP" tabIcon="md-contacts"></ion-tab>\n\n  <ion-tab [root]="twitter" tabTitle="Twitter" tabIcon="logo-twitter" ></ion-tab>\n  <ion-tab [root]="contacts" tabTitle="Contacts" tabIcon="md-chatboxes" ></ion-tab>\n <!-- <ion-tab [root]="tab2Root" tabTitle="About" tabIcon="information-circle"></ion-tab>\n  <ion-tab [root]="tab3Root" tabTitle="Contact" tabIcon="contacts"></ion-tab>\n  <ion-tab [root]="tab4Root" tabTitle="Logout" tabIcon="ios-exit-outline"></ion-tab>-->\n</ion-tabs>\n\n<!--\n<ion-fab right bottom *ngIf="realtimeEvents" (tap)="gotoChat()">\n    <button color="primary" ion-fab style="font-size: 11px; background: transparent;"><img src="assets/img/greenblink.gif"/></button>\n  </ion-fab>\n-->\n\n  <img *ngIf="realtimeEvents"  (tap)="gotoChat()" class="realtimeimg" src="assets/img/greenblink.gif"/>'/*ion-inline-end:"/Users/pietroturati/Desktop/demy/PROJECTS/appkwondo/clients/client/ion2kwondo/src/pages/tabs/tabs.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_5__providers_backend_backend__["a" /* BackendProvider */], __WEBPACK_IMPORTED_MODULE_4__providers_socket_service_socket_service__["a" /* SocketService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Nav */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* Platform */]])
], TabsPage);

//# sourceMappingURL=tabs.js.map

/***/ }),

/***/ 122:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_socket_service_socket_service__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_backend_backend__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_app_availability__ = __webpack_require__(126);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_gare_gare__ = __webpack_require__(481);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_atleti_atleti__ = __webpack_require__(496);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_eventi_eventi__ = __webpack_require__(498);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_societa_societa__ = __webpack_require__(499);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_stats_stats__ = __webpack_require__(500);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_account_account__ = __webpack_require__(128);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_about_about__ = __webpack_require__(129);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_servizisocieta_servizisocieta__ = __webpack_require__(130);
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
        var role = this.backend.user.role;
        console.log("role", role);
        var retvalue = true;
        if (m.authrequired) {
            if (this.backend.user.role.toLowerCase() != "tkdradmin")
                retvalue = false;
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
        selector: 'page-home',template:/*ion-inline-start:"/Users/pietroturati/Desktop/demy/PROJECTS/appkwondo/clients/client/ion2kwondo/src/pages/home/home.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle="left" start>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>AppKwonDoV2</ion-title>\n    <!--<button ion-button menuToggle="right" end>\n        <ion-icon name="menu"></ion-icon>\n      </button>-->\n    <ion-buttons end>\n\n      <button (tap)="showAbout()" ion-button icon-only>\n        <ion-icon name="ios-information-circle"></ion-icon>\n      </button>\n\n\n<button (tap)="broadcast()" ion-button icon-only>\n  <ion-icon *ngIf="isIbmAdmin" name="ios-radio-outline"></ion-icon>\n</button>\n\n\n</ion-buttons>\n  </ion-navbar>\n  \n    \n</ion-header>\n\n<ion-content spadding class="ion-content">\n\n   \n  <ion-card>\n    <ion-card-content style="padding: 7px;">\n      <ion-row>\n        <ion-col col-9>\n            <div class="benvenuto">Benvenuto <b>{{user.nickname}}</b></div>\n            </ion-col>\n            <ion-col col-3 style="text-align: right">\n                <button style="height: 18px;" clear ion-button (tap)="myAccount()"><ion-icon class="baricon" name="md-settings"></ion-icon></button>\n            </ion-col>\n      </ion-row>\n            <div class="server">{{user.email}}</div>\n            <div class="server">Server: {{backend.rooturl}}</div>\n            <div class="admin" *ngIf="user.role==\'tkdradmin\'">Accesso amministratore eseguito</div>\n\n      \n\n    </ion-card-content>\n    </ion-card>\n  \n<ion-list >\n  <ion-item  *ngFor="let m of displayedmenu" (tap)="gotoPage(m.page)">\n    <ion-row style="font-size: 16px" >\n      <ion-col col-2 class="fixedicon">\n    <ion-icon style="font-size: 22px !important" name="{{m.icon}}"></ion-icon>\n      </ion-col>\n      <ion-col style="font-size: 20px" >{{m.name}}</ion-col>\n      <ion-col col-1>\n        <ion-badge *ngIf="(backend.unread>0) && (m.name==\'ChatKwonDo\')" color="danger">{{backend.unread}}</ion-badge>\n        <ion-badge *ngIf="(backend.nextevents.length>0) && (m.name==\'Eventi\')" >{{backend.nextevents.length}}</ion-badge>\n      </ion-col>\n      </ion-row>\n  </ion-item>\n  </ion-list>\n  <!--<ion-card>\n    <ion-card-content>\n        <img *ngIf="backend.activesocieta==\'ASD TAEKWONDO ROZZANO\'" src="assets/img/logotkdrozzano_icon.png" style="height: 32px" />\n    </ion-card-content>\n  </ion-card>-->\n  <!--<div class="servizi">\n  <ion-card (tap)="gotoServiziSocieta()">\n    <ion-card-content>\n      <ion-row>\n          <ion-col col-3>\n              <img [src]="backend.settings.logourl" class="societalogosmall" />\n            </ion-col>\n        <ion-col>\n            Servizi {{backend.settings.mysocietaname}}\n        </ion-col>\n        \n      </ion-row>\n     \n    </ion-card-content>\n  </ion-card>\n</div>-->\n \n</ion-content>\n\n'/*ion-inline-end:"/Users/pietroturati/Desktop/demy/PROJECTS/appkwondo/clients/client/ion2kwondo/src/pages/home/home.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["s" /* ToastController */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["h" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_app_availability__["a" /* AppAvailability */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["o" /* Platform */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1__providers_socket_service_socket_service__["a" /* SocketService */], __WEBPACK_IMPORTED_MODULE_2__providers_backend_backend__["a" /* BackendProvider */]])
], HomePage);

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 127:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GaraPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_backend_backend__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_matchesforatleta_matchesforatleta__ = __webpack_require__(482);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_chat_chat__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_map_map__ = __webpack_require__(492);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_filters_filters__ = __webpack_require__(493);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_medagliereglobale_medagliereglobale__ = __webpack_require__(494);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_device_feedback__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_moment__);
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
    function GaraPage(modalCtrl, deviceFeedback, events, backend, navCtrl, navParams) {
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
        this.view = "matchesbyprog";
        this.selectedtab = 0;
        this.realtimecount = 0;
        this.jgara = {};
        this.viewInfobar = false;
        this.loading = false;
        this.iscritti = [];
        this.showIscritti = false;
        this.atletiiscritti = [];
        this.filters = {
            sesso: "",
            categoria: "",
            medaglie: "",
            quadrato: ""
        };
        this.filtersApplied = false;
        this.categoriecoperte = {};
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
        questo.backend.getGara(questo.garaid, function (data) {
            //let data= Object.assign({}, d);
            console.log("got gara", data, data.matchesbyatleta.rows.length);
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
            questo.getPuntiTotali();
            if (callback)
                callback(data);
        });
    };
    GaraPage.prototype.refreshCurrentGara = function (callback) {
        var questo = this;
        questo.loading = true;
        var atletiiscritti = [];
        questo.backend.getCurrentGara(function (data) {
            //let data= Object.assign({}, d);
            console.log("got gara", data, data.matchesbyatleta.rows.length);
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
        console.log(mfa);
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
    GaraPage.prototype.hasMap = function () {
        var retvalue = false;
        if (this.jgara.maplocation) {
            if (this.jgara.maplocation.trim() != "")
                retvalue = true;
        }
        return retvalue;
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
        var m = __WEBPACK_IMPORTED_MODULE_9_moment__(t, "YYYYMMDDHHmmSS").format("DD/MM/YYYY HH:mm:SS");
        return m;
    };
    GaraPage.prototype.getMatches = function (atl) {
        var questo = this;
        var arr = this.backend.filterRows(questo.backend.activegara.matchesbyprog, { atletaid: atl.id }, true);
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
        var profileModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_6__pages_filters_filters__["a" /* FiltersPage */], questo.filters);
        profileModal.onDidDismiss(function (data) {
            console.log("modal return", data);
            if (data) {
                questo.filters = data;
                questo.filtersApplied = false;
                for (var k in questo.filters) {
                    if (questo.filters[k].trim() != "")
                        questo.filtersApplied = true;
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
    GaraPage.prototype.getMedagliereGlobale = function () {
        var questo = this;
        questo.backend.playFeedback();
        console.log("tkdt_id", questo.jgara.tkdt_id);
        if (questo.jgara.tkdt_id.trim() == "") {
            alert("Dati ufficiali di gara non disponibili per questa gara");
            return;
        }
        var profileModal = questo.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_7__pages_medagliereglobale_medagliereglobale__["a" /* MedagliereglobalePage */], { gara: questo.gara.gara.rows[0].doc });
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
            var profileModal = questo.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_7__pages_medagliereglobale_medagliereglobale__["a" /* MedagliereglobalePage */], { html: data });
            profileModal.present();
        });
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
    return GaraPage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Navbar */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Navbar */])
], GaraPage.prototype, "navBar", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Content */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Content */])
], GaraPage.prototype, "content", void 0);
GaraPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-gara',template:/*ion-inline-start:"/Users/pietroturati/Desktop/demy/PROJECTS/appkwondo/clients/client/ion2kwondo/src/pages/gara/gara.html"*/'<!--\n  Generated template for the GaraPage page.\n\n  See http://ionicframework.com/docs/v2/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Gara</ion-title>\n    <ion-buttons end>\n      <button *ngIf="hasMap()" ion-button style="font-size: 18px" (tap)="showMap()">\n        <ion-icon name="md-locate"></ion-icon>\n\n      </button>\n      <!--<button ion-button style="font-size: 18px" (tap)="gotoChat()">\n        <ion-icon name="md-chatbubbles">\n          <ion-badge *ngIf="backend.unread>0" color="danger">{{backend.unread}}</ion-badge>\n        </ion-icon>\n\n      </button>-->\n      <button ion-button style="font-size: 18px" (tap)="doRefreshStandAlone()">\n        <ion-icon name="md-refresh"></ion-icon>\n      </button>\n\n    </ion-buttons>\n  </ion-navbar>\n\n  <ion-toolbar class="stoolbar">\n    <div sstyle="background: #ddd; padding: 0px;">\n      <button class="incaston" full color="dark" sstyle="swidth:100%; sfont-size: 14px; stext-align: left; sbackground: #333; scolor: #eee; "\n        (tap)="toggleInfobar()">\n        <ion-row>\n          <ion-col col-1 fixed style="color: gray; ">\n            <ion-icon *ngIf="!viewInfobar" class="gray" name="md-arrow-dropright"></ion-icon>\n            <ion-icon *ngIf="viewInfobar" class="gray" name="md-arrow-dropdown"></ion-icon>\n          </ion-col>\n          <ion-col col-10 style="font-size: 13px;">\n            <b>{{jgara.title}}</b>\n            <!--<i>{{jgara.data}} - {{jgara.location}}</i>-->\n          </ion-col>\n          <ion-col col-1 style="text-align: right">\n            <img *ngIf="loading" width="18" height="18" src="assets/img/ajax-loader.gif" />\n          </ion-col>\n\n        </ion-row>\n      </button>\n\n      <ion-item *ngIf="viewInfobar" style="padding: 7px !important; background: #eee; font-size: 14px; ">\n\n        <div>\n          <ion-row>\n            <ion-col class="infobold">{{jgara.title}}</ion-col>\n          </ion-row>\n          <ion-row>\n            <ion-col class="infobold">{{jgara.location}} &nbsp;&nbsp;\n              <!--<a (tap)="showMap()" *ngIf="hasMap()">Visualizza mappa</a>-->\n            </ion-col>\n          </ion-row>\n          <ion-row>\n            <ion-col class="infobold">{{jgara.data}}</ion-col>\n          </ion-row>\n          <ion-row *ngIf="hasMap()">\n            <ion-col>\n              <button ion-button small (tap)="showMap()">Visualizza mappa</button>\n            </ion-col>\n          </ion-row>\n          <ion-row>\n            <ion-col col-5>&nbsp;</ion-col>\n            <ion-col>&nbsp;</ion-col>\n          </ion-row>\n          <ion-row>\n            <ion-col col-5>Iscritti</ion-col>\n            <ion-col class="infobold">{{getArrLen(jgara.iscritti)}} (F: {{getMaschiFemmine(iscritti,\'iscritti\').femmine}}, M: {{getMaschiFemmine(iscritti,\'iscritti\').maschi}})\n              </ion-col>\n          </ion-row>\n          <ion-row>\n            <ion-col col-5>Match disputati</ion-col>\n            <ion-col class="infobold">{{info.disputati.rows.length}} (F: {{getMaschiFemmine(info.disputati).femmine}}, M: {{getMaschiFemmine(info.disputati).maschi}})\n              </ion-col>\n          </ion-row>\n          <ion-row>\n            <ion-col col-5>Match vinti</ion-col>\n            <ion-col class="infobold">{{info.vinti.rows.length}} (F: {{getMaschiFemmine(info.vinti).femmine}}, M: {{getMaschiFemmine(info.vinti).maschi}})\n              </ion-col>\n          </ion-row>\n          <ion-row>\n            <ion-col col-5>Match persi</ion-col>\n            <ion-col class="infobold">{{info.persi.rows.length}} (F: {{getMaschiFemmine(info.persi).femmine}}, M: {{getMaschiFemmine(info.persi).maschi}})\n              </ion-col>\n          </ion-row>\n          <ion-row>\n            <ion-col col-12>&nbsp;</ion-col>\n          </ion-row>\n          <ion-row>\n            <ion-col class="infobold">{{categoriecoperte.text}}</ion-col>\n          </ion-row>\n          <ion-row>\n            <ion-col col-12>&nbsp;</ion-col>\n          </ion-row>\n          <ion-row>\n            <ion-col class="infobold">Punteggio totale medaglie: {{totalepunti}}</ion-col>\n          </ion-row>\n          <!--<div>Gara: {{jgara.title}}</div>\n          <div>Location: {{jgara.location}}</div>\n          <div>Data: {{jgara.data}}</div>\n          <div>Iscritti: {{getArrLen(jgara.iscritti)}}</div>-->\n        </div>\n\n      </ion-item>\n      <!--<ion-item style="background: #eee; height: 10px !important; margin: 0px !important; padding: 0px !important;">-->\n      <ion-row style="background: #333">\n        <ion-col col-3>\n          <button (tap)="setFilters()" [ngClass]="getFiltersClass()" ion-button dark small>{{getFiltersText()}}</button>\n        </ion-col>\n        <ion-col col-9 style="text-align: right;">\n          <button ion-button (tap)="getMedagliereGlobale()" small class="filt medals" style="height: 20px; font-size: 14px; margin-right: 7px; justify-content: center;">\n            <span class="ori">ORI: {{getMedals().ori}}</span>\n            <span class="argenti">ARG: {{getMedals().arg}}</span>\n            <span class="bronzi">BRO: {{getMedals().bro}}</span>\n          </button>\n        </ion-col>\n      </ion-row>\n      <!--</ion-item>-->\n      <!--<ion-item *ngIf="gara.gara.rows.length>0" >{{gara.gara.rows[0].doc.title}}</ion-item>-->\n      <ion-segment class="segment" (tap)="tapSegment()" [(ngModel)]="view">\n        <ion-segment-button value="matchesbyprog">\n          <!-- <ion-icon name="camera"></ion-icon>-->Per match\n        </ion-segment-button>\n        <ion-segment-button value="matchesbyatleta">\n          Per atleta\n        </ion-segment-button>\n        <ion-segment-button value="cronaca">\n          Cronaca\n        </ion-segment-button>\n        <ion-segment-button value="iscritti">\n          Iscritti\n        </ion-segment-button>\n        <!-- <ion-segment-button value="infogara">\n            Gara\n          </ion-segment-button>-->\n      </ion-segment>\n    </div>\n  </ion-toolbar>\n\n</ion-header>\n<!--\n<ion-tabs>\n  <ion-tab [root]="tab1Root"></ion-tab>\n  <ion-tab [root]="tab2Root"></ion-tab>\n  <ion-tab [root]="tab3Root"></ion-tab>\n</ion-tabs>\n-->\n\n<ion-content padding>\n\n  <!--<ion-refresher (ionRefresh)="doRefresh($event)">\n    <ion-refresher-content refreshingSpinner="ios">\n    </ion-refresher-content>\n  </ion-refresher>-->\n\n  <ion-card *ngIf="showIscritti">\n    <ion-card-content style="text-align: center">\n      <span style="color: red">Nessun incontro trovato</span><br>\n      <div style="height: 105px; text-align: center">\n      <img style="width: 100px; height: 100px; margin: auto; " src="assets/img/fight.png" />\n    </div>\n    </ion-card-content>\n\n  </ion-card>\n  <section id="iscritti" *ngIf="showIscritti || (view==\'iscritti\')">\n    <div style="background: lightblue; padding: 8px;">\n\n      {{iscritti.length}} iscritti a questa gara\n\n    </div>\n\n    <ion-list *ngFor="let atl of atletiiscritti">\n    <ion-item no-lines class="iscrittiitem" >\n      <button ion-item (tap)="showMatchesForAtleta(atl.id)">\n\n      <ion-row>\n        <ion-col>\n            <div class="iscrittonome">{{atl.cognome}} {{atl.nome}}</div>\n            <div class="iscritti">{{atl.sesso}} - {{atl.categoria.toUpperCase()}} </div>\n\n        </ion-col>\n        <ion-col col-1>\n            <ion-badge>{{atl.nmatches}}</ion-badge>\n        </ion-col>\n      </ion-row>\n\n      \n  \n        <!--<div class="iscritti">{{atl.tkdtcategoria}}</div>-->\n\n\n      </button>\n\n    </ion-item>\n  </ion-list>\n\n    <!--<ion-item-divider color="light"></ion-item-divider>-->\n\n\n  </section>\n\n\n  <section id="matchesbyprog" [hidden]="view!=\'matchesbyprog\'" sngIf="view==\'matchesbyprog\'">\n\n    <ion-list>\n      <div *ngFor="let m of displayedgara.matchesbyprog.rows">\n        <ion-item *ngIf="m.doc.dadisputare==\'yes\'" (tap)="showMatchesForAtleta(m.doc.atletaid)">\n          <ion-row>\n            <ion-col col-2>\n              <img width="32" height="32" src="{{getImg(m)}}" />\n            </ion-col>\n            <ion-col>\n              <div class="{{getClass(m.doc)}}">{{m.doc.matchid}}</div>\n              <div class="atleta">{{m.doc.atletaname}}</div>\n              <div class="categoria">{{getCategoria(m.doc.datanascita).toUpperCase()}}</div>\n              <!--<div class="iscritti">{{m.doc.tkdtcategoria}}</div>-->\n              <div class="{{getClass(m.doc)}}" style="font-weight: normal">{{getVintoText(m.doc)}}</div>\n              <div *ngIf="m.doc.derby && (m.doc.derby!=null)" class="derby">{{backend.getDerbyText(m.doc.derby)}}</div>\n            </ion-col>\n          </ion-row>\n        </ion-item>\n      </div>\n    </ion-list>\n\n\n\n\n  </section>\n  <section id="matchesbyatleta" [hidden]="view!=\'matchesbyatleta\'" sngIf="view==\'matchesbyatleta\'">\n    <ion-list>\n      <ion-item *ngFor="let m of displayedgara.matchesbyatleta.rows" (tap)="showMatchesForAtleta(m.id)">\n        <ion-row>\n          <ion-col col-2>\n            <img width="32" height="32" src="{{getImgPerAtleta(m)}}" />\n          </ion-col>\n          <ion-col>\n\n            <div class="atleta">{{m.nome}}</div>\n            <div class="categoria">{{getCategoria(m.datanascita).toUpperCase()}}</div>\n            <!--<div class="iscritti">{{m.tkdtcategoria}}</div>-->\n            <div class="matches">\n              <span *ngFor="let x of m.matchesarray" class="{{getClass(x)}}">\n                {{x.matchid}}\n              </span>\n            </div>\n          </ion-col>\n        </ion-row>\n      </ion-item>\n    </ion-list>\n\n  </section>\n\n\n\n  <section id="cronaca" [hidden]="view!=\'cronaca\'" sngIf="view==\'cronaca\'">\n    <ion-list>\n      <ion-item *ngFor="let m of gara.cronaca.rows">\n        <ion-row>\n\n          <ion-col>\n\n            <div class="time">{{getCronacaTime(m.time)}}</div>\n            <div class="text">{{m.text}}</div>\n          </ion-col>\n        </ion-row>\n      </ion-item>\n    </ion-list>\n\n  </section>\n\n  <section id="infogara" [hidden]="view!=\'infogara\'" sngIf="view==\'infogara\'">\n    <ion-list style="font-size: 14px">\n\n      <div>Gara: {{jgara.title}}</div>\n      <div>Location: {{jgara.location}}</div>\n      <div>Data: {{jgara.data}}</div>\n      <div>Iscritti: {{getArrLen(jgara.iscritti)}}</div>\n      <br>\n      <div>{{categoriecoperte.text}}</div>\n\n    </ion-list>\n\n  </section>\n\n  <!--<ion-fab right bottom *ngIf="realtimecount>0">\n       <button ion-fab style="font-size: 11px">LIVE!</button>\n     </ion-fab>-->\n\n</ion-content>'/*ion-inline-end:"/Users/pietroturati/Desktop/demy/PROJECTS/appkwondo/clients/client/ion2kwondo/src/pages/gara/gara.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ModalController */], __WEBPACK_IMPORTED_MODULE_8__ionic_native_device_feedback__["a" /* DeviceFeedback */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */], __WEBPACK_IMPORTED_MODULE_2__providers_backend_backend__["a" /* BackendProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */]])
], GaraPage);

//# sourceMappingURL=gara.js.map

/***/ }),

/***/ 128:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AccountPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_backend_backend__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_utils_utils__ = __webpack_require__(41);
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
        selector: 'page-account',template:/*ion-inline-start:"/Users/pietroturati/Desktop/demy/PROJECTS/appkwondo/clients/client/ion2kwondo/src/pages/account/account.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Il mio account</ion-title>\n  </ion-navbar>\n</ion-header>\n<ion-content padding>\n<ion-item>\n  <b>{{backend.user.nickname}}</b><br>\n  {{backend.user.email}}<br>\n  {{backend.user.appversion}}<br>\n  <button ion-button (tap)="changePsw()">Modifica password</button>\n</ion-item>\n<section *ngIf="view==\'changepsw\'">\n\n  <ion-list>\n    <ion-item>\n      <ion-label floating color="primary">Password corrente</ion-label>\n      <ion-input [(ngModel)]="pswchange.currentpsw" type="password"></ion-input>\n    </ion-item>\n  \n    <ion-item>\n      <ion-label floating color="primary">Nuova password</ion-label>\n      <ion-input [(ngModel)]="pswchange.newpsw" type="password" ></ion-input>\n    </ion-item>\n\n    <ion-item>\n      <ion-label floating color="primary">Verifica nuova password</ion-label>\n      <ion-input [(ngModel)]="pswchange.verifynewpsw" type="password" ></ion-input>\n    </ion-item>\n\n      <br>\n    <button [disabled]="!isSubmitEnabled()" block ion-button (tap)="doChangePsw()">Modifica password</button>\n  \n    </ion-list>\n\n\n\n</section>\n</ion-content>\n'/*ion-inline-end:"/Users/pietroturati/Desktop/demy/PROJECTS/appkwondo/clients/client/ion2kwondo/src/pages/account/account.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__providers_utils_utils__["a" /* UtilsProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */], __WEBPACK_IMPORTED_MODULE_2__providers_backend_backend__["a" /* BackendProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */]])
], AccountPage);

//# sourceMappingURL=account.js.map

/***/ }),

/***/ 129:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AboutPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_home_home__ = __webpack_require__(122);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_facebook_facebook__ = __webpack_require__(501);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_backend_backend__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map__ = __webpack_require__(51);
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
        selector: 'page-about',template:/*ion-inline-start:"/Users/pietroturati/Desktop/demy/PROJECTS/appkwondo/clients/client/ion2kwondo/src/pages/about/about.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>\n      Informazioni\n    </ion-title>\n    <!--<ion-buttons end>\n      <button ion-button (tap)="gotoBottom()">GIU</button>\n      <button ion-button (tap)="gotoTop()">SU</button>\n    </ion-buttons>-->\n  </ion-navbar>\n</ion-header>\n<ion-content spadding class="ion-content">\n <!-- <p>\n    This is a combination of Ionic 2 Tabs and Sidemenu. For more info, see related <a href="https://blog.khophi.co/ionic-2-side-menu-tabs/">Ionic 2 Sidemenu and Tabs</a> article by <a href="https://blog.khophi.co">Khophi\'s Dev</a>\n  </p>\n  <button ion-button block (tap)="goFB()">GO FB</button>-->\n\n  <!--<ion-segment #ionSeg [scrollable-segments]="ionSeg" >\n    <ion-segment-button value="urzu">Urzu</ion-segment-button>\n    <ion-segment-button value="parzo">Parzo</ion-segment-button>\n    <ion-segment-button value="muzio">Muzio</ion-segment-button>\n  </ion-segment>-->\n\n\n <!-- <ion-scroll scrollX="true" style="width:100vw;height:350px" >\n      <ion-segment [(ngModel)]="relationship" color="primary">\n      \n      \n            <ion-segment-button value="friends" (ionSelect)="selectedEnemies()">\n              Friends\n            </ion-segment-button>\n            <ion-segment-button value="enemies" (ionSelect)="selectedEnemies()">\n              Enemies\n            </ion-segment-button>\n             <ion-segment-button value="enemies" (ionSelect)="selectedEnemies()">\n              Enemies\n            </ion-segment-button>\n            <ion-segment-button value="enemies" (ionSelect)="selectedEnemies()">\n              Enemies\n            </ion-segment-button>\n            <ion-segment-button value="enemies" (ionSelect)="selectedEnemies()">\n              Enemies\n            </ion-segment-button>\n            <ion-segment-button value="enemies" (ionSelect)="selectedEnemies()">\n              Enemies\n            </ion-segment-button>\n            <ion-segment-button value="enemies" (ionSelect)="selectedEnemies()">\n              Enemies\n            </ion-segment-button>\n            <ion-segment-button value="enemies" (ionSelect)="selectedEnemies()">\n              Enemies\n            </ion-segment-button>\n            <ion-segment-button value="enemies" (ionSelect)="selectedEnemies()">\n              Enemies\n            </ion-segment-button>\n            <ion-segment-button value="enemies" (ionSelect)="selectedEnemies()">\n              Enemies\n            </ion-segment-button>\n      \n          </ion-segment>\n            </ion-scroll>-->\n\n\n<!--\n  <ion-tabs #ionTabs [scrollable-tabs]="ionTabs" [opts]="scrollableTabsopts" selectedIndex=\'0\' color="{{tabsColor}}" mode=\'{{tabsMode}}\'\n	tabsHighlight="true" tabsPlacement="{{tabsPlacement}}">\n	<ion-tab [root]="HomeRoot" [show]=\'tabToShow[0]\' tabIcon="home" tabTitle="Home"></ion-tab>\n	<ion-tab [root]="CalendarRoot" [show]=\'tabToShow[1]\' tabIcon="calendar" tabTitle="Calendar"></ion-tab>\n	<ion-tab [root]="CameraRoot" [show]=\'tabToShow[2]\' tabIcon="camera" tabTitle="Camera"></ion-tab>\n	<ion-tab [root]="CloudRoot" [show]=\'tabToShow[3]\' tabIcon="cloud" tabTitle="Cloud"></ion-tab>\n	<ion-tab [root]="ContactRoot" [show]=\'tabToShow[4]\' tabIcon="contact" tabTitle="Contact"></ion-tab>\n	<ion-tab [root]="FolderRoot" [show]=\'tabToShow[5]\' tabIcon="folder" tabTitle="Folder"></ion-tab>\n	<ion-tab [root]="MapRoot" [show]=\'tabToShow[6]\' tabIcon="map" tabTitle="Map"></ion-tab>\n	<ion-tab [root]="SettingsRoot" [show]=\'tabToShow[7]\' tabIcon="settings" tabTitle="Settings"></ion-tab>\n	<ion-tab [root]="AboutRoot" [show]=\'tabToShow[8]\' tabIcon="information-circle" tabTitle="About"></ion-tab>\n  </ion-tabs>\n  \n-->\n\n\n<!--<ion-list [virtualScroll]="users">\n  \n    <ion-item *virtualItem="let item">\n      <div>{{ item.email }} </div>\n      <div>{{item.name.first}} {{item.name.last}}</div>\n     \n    </ion-item>\n  \n  </ion-list>-->\n  <ion-card>\n    <ion-card-content>\n       \n        <div style="text-align: center; padding: 8px">\n        <div style="font-size: 18px; font-weight: bold">AppKwonDoV2</div>\n        <div style="font-size: 16px; font-weight: bold; color: blue">v.{{backend.appVersion.version}}</div>\n        <div style="font-size: 14px; color: blue"> {{backend.appVersion.releasedate}} TowerApps</div>\n       \n        <div style="font-size: 16px">\n\n        <a href="http://tkdr.herokuapp.com/privacy_it.htm" target="_blank">Privacy Policy</a>\n\n\n\n\n        </div>\n\n        \n        <p style="font-style: italic">AppKwonDo © è proprietà esclusiva registrata di ASD Taekwondo Rozzano </p>\n        <div class="logodiv">\n        <img class="logo" src="assets/img/logotkdrozzano.png"  />\n      </div>\n      \n      </div>\n    </ion-card-content>\n  </ion-card>\n</ion-content>\n'/*ion-inline-end:"/Users/pietroturati/Desktop/demy/PROJECTS/appkwondo/clients/client/ion2kwondo/src/pages/about/about.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */], __WEBPACK_IMPORTED_MODULE_4__providers_backend_backend__["a" /* BackendProvider */], __WEBPACK_IMPORTED_MODULE_3__providers_facebook_facebook__["a" /* FacebookProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */]])
], AboutPage);

//# sourceMappingURL=about.js.map

/***/ }),

/***/ 130:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ServizisocietaPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_products_products__ = __webpack_require__(502);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_orders_orders__ = __webpack_require__(505);
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
        selector: 'page-servizisocieta',template:/*ion-inline-start:"/Users/pietroturati/Desktop/demy/PROJECTS/appkwondo/clients/client/ion2kwondo/src/pages/servizisocieta/servizisocieta.html"*/'<!--\n  Generated template for the ServizisocietaPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Servizi per i soci</ion-title>\n    <ion-buttons end>\n        \n              <button (tap)="viewOrders()" *ngIf="isMarketAdmin()" ion-button icon-only>\n                <ion-icon name="md-list-box"></ion-icon>\n              </button>\n    </ion-buttons>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content spadding class="ion-content">\n\n  <ion-card>\n    <ion-card-content>\n      <ion-row>\n        <ion-col col-2>\n          <img class="maximage" src="http://www.taekwondorozzano.it/wp-content/themes/Taekwondo/images/logo-tae-kwan-do-rozzano.png"/>\n        </ion-col>\n        <ion-col col-1></ion-col>\n        <ion-col>\n          I qui presenti servizi sono offerti in forma esclusiva ai soci di ASD Taekwondo Rozzano\n        </ion-col>\n      </ion-row>\n    </ion-card-content>\n  </ion-card>\n\n  <hr>\n\n  <ion-card (tap)="gotoProducts(\'tkdgear\')">\n\n\n          <ion-card-content>\n            <ion-row>\n              <ion-col col-3 align-self-start>\n                  <img class="sgear maximage" src="assets/img/taekwondogear.jpg" />\n              </ion-col>\n              <ion-col>\n    \n              </ion-col>\n              <ion-col  col-8 align-self-start>\n                <ion-row>\n                  <ion-col align-self-start>\n                      <b>Prenota equipaggiamento</b>\n    \n                  </ion-col>\n                </ion-row>\n                <ion-row>\n                    <ion-col align-self-start>\n                        Ti serve un accessorio da taekwondo per il tuo atleta ? Prenotalo qui\n      \n                    </ion-col>\n                  </ion-row>\n               \n              </ion-col>\n            </ion-row>\n         \n        \n          \n        </ion-card-content>\n        </ion-card>\n    \n   \n\n  <ion-card (tap)="gotoProducts(\'minimarket\')">\n                <ion-card-content>\n                  <ion-row align-items-start>\n                    <ion-col col-3 align-self-start>\n                        <img class="sgear maximage" src="assets/img/minimarket.jpg" />\n                    </ion-col>\n                    <ion-col>\n          \n                    </ion-col>\n                    <ion-col  col-8 align-self-start>\n                      <ion-row align-items-start>\n                        <ion-col align-self-start>\n                            <b>Prenotazione minimarket</b>\n          \n                        </ion-col>\n                      </ion-row>\n                      <ion-row align-items-start>\n                          <ion-col align-self-start>\n                              Puoi prenotare qui dal minimarket Sapori Del Sud\n            \n                          </ion-col>\n                        </ion-row>\n                     \n                    </ion-col>\n                  </ion-row>\n               \n              \n                \n              </ion-card-content>\n              </ion-card>\n\n              <!--\n\n              <ion-card (tap)="gotoProducts(\'gear\')">\n                  \n               \n                            <ion-card-content>\n                              <ion-row align-items-start>\n                                <ion-col col-3 align-self-start>\n                                    <img class="sgear" src="http://mammaoggi.it/wp-content/uploads/2013/09/mercatino_54_370.jpg" />\n                                </ion-col>\n                                <ion-col>\n                      \n                                </ion-col>\n                                <ion-col  col-8 align-self-start>\n                                  <ion-row align-items-start>\n                                    <ion-col align-self-start>\n                                        <b>Mercatino e scambio usato</b>\n                      \n                                    </ion-col>\n                                  </ion-row>\n                                  <ion-row>\n                                      <ion-col align-self-start>\n                                          Mercatino e scambio di accessori usati per taekwondo\n                        \n                                      </ion-col>\n                                    </ion-row>\n                                 \n                                </ion-col>\n                              </ion-row>\n                          </ion-card-content>\n              </ion-card>\n\n            -->\n\n\n      <!--<section *ngIf="isMarketAdmin()">\n        <ion-item (tap)="viewOrders()">\n          Visualizza ordini\n        </ion-item>\n      </section>-->\n         \n\n</ion-content>\n'/*ion-inline-end:"/Users/pietroturati/Desktop/demy/PROJECTS/appkwondo/clients/client/ion2kwondo/src/pages/servizisocieta/servizisocieta.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__providers_backend_backend__["a" /* BackendProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */]])
], ServizisocietaPage);

//# sourceMappingURL=servizisocieta.js.map

/***/ }),

/***/ 140:
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
webpackEmptyAsyncContext.id = 140;

/***/ }),

/***/ 182:
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
webpackEmptyAsyncContext.id = 182;

/***/ }),

/***/ 32:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SocketService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_socket_io_client__ = __webpack_require__(587);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_socket_io_client___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_socket_io_client__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__backend_backend__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_badge__ = __webpack_require__(120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ionic_angular__ = __webpack_require__(5);
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
                if (questo.platform.is("cordova"))
                    m.device = "mobile";
                //if (message) msg=message;
                //questo.socket.send(msg);
                questo.socket.emit('message', m);
            });
        });
        this.socket.on("realtime", function (data) {
            console.log("socket realtime received !!", data);
            questo.renderVoice(data);
            questo.events.publish('realtime', data, Date.now());
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
            console.log("received refreshgara!");
            questo.events.publish('updategara', msg, Date.now());
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
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_6_ionic_angular__["d" /* Events */], __WEBPACK_IMPORTED_MODULE_4__backend_backend__["a" /* BackendProvider */], __WEBPACK_IMPORTED_MODULE_5__ionic_native_badge__["a" /* Badge */], __WEBPACK_IMPORTED_MODULE_6_ionic_angular__["o" /* Platform */]])
], SocketService);

//# sourceMappingURL=socket-service.js.map

/***/ }),

/***/ 346:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_backend_backend__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_utils_utils__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_tabs_tabs__ = __webpack_require__(121);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_register_register__ = __webpack_require__(506);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_angular__ = __webpack_require__(5);
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
    function LoginPage(utils, nav, backend, alertCtrl /*, private loadingCtrl: LoadingController*/) {
        this.utils = utils;
        this.nav = nav;
        this.backend = backend;
        this.alertCtrl = alertCtrl; /*, private loadingCtrl: LoadingController*/
        this.allnews = [];
        //loading: Loading;
        //registerCredentials= { email: 'demymortelliti@it.ibm.com', password: 'ser56glr' };
        this.registerCredentials = { email: '', password: '', gcmtoken: '' };
    }
    LoginPage.prototype.createAccount = function () {
        this.backend.playFeedback();
        this.nav.push(__WEBPACK_IMPORTED_MODULE_4__pages_register_register__["a" /* RegisterPage */]);
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
                    /*var unread=window.localStorage.getItem("ion2kwondo_chatunread");
                    if (unread==null){
                      questo.backend.resetChatUnread();
                    } else {
                      questo.backend.setChatUnread(parseInt(unread,10));
                    }
                    console.log("chatunread set to "+questo.backend.unread+" by localstorage");
                    questo.backend.setBackgroundMode(true);*/
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
        selector: 'page-login',template:/*ion-inline-start:"/Users/pietroturati/Desktop/demy/PROJECTS/appkwondo/clients/client/ion2kwondo/src/pages/login/login.html"*/'<ion-content class="login-content" padding text-center>\n  <ion-row class="logo-row" sstyle="height: 200px;">\n    <ion-col></ion-col>\n    <ion-col style="padding: 4px !important; justify-content: center; text-align: center" >\n     <!--<img  src="assets/img/logotkdrozzano.png"/>-->\n     <img  class="loginlogo" src="assets/img/iconlogo3.png"/>\n    </ion-col>\n    <ion-col></ion-col>\n  </ion-row>\n  \n  <div class="login-box">\n    <p style="text-align:center; font-size: 14px; color: white;">Benvenuto in Appkwondo<br><span class="appversion">v.{{backend.appVersion.version}} - {{backend.appVersion.releasedate}}</span><br><br> Già registrato ? Inserisci user e password per accedere</p>\n    <form (ngSubmit)="login()" #registerForm="ngForm" >\n      <ion-row text-center> \n        <ion-col col-md-6 col-lg-4 col-xl-3 >\n          <ion-list inset>\n            \n            <ion-item>\n              <ion-input type="text" autocapitalize="none" placeholder="Email" name="email" [(ngModel)]="registerCredentials.email" required></ion-input>\n            </ion-item>\n            \n            <ion-item>\n              <ion-input type="password" autocapitalize="none" placeholder="Password" name="password" [(ngModel)]="registerCredentials.password" required></ion-input>\n            </ion-item>\n            \n          </ion-list>\n        </ion-col>\n      </ion-row>\n      \n      <ion-row>\n        <ion-col class="signup-col" col-md-6 col-lg-4 col-xl-3>\n          <button ion-button class="submit-btn" full type="submit" [disabled]="!registerForm.form.valid" icon-left style="height: 40px"><ion-icon name="md-key"></ion-icon>Accedi</button>\n          \n         \n        </ion-col>\n      </ion-row>\n      \n    </form>\n    <ion-row>\n      <ion-col col-md-6 col-lg-4 col-xl-3>\n          <p style="text-align:center; font-size: 14px; color: white;">Non ancora registrato ? Registrati</p>\n          <button ion-button class="register-btn" block  (click)="createAccount()">Registrati</button>\n\n      </ion-col>\n    </ion-row>\n    <ion-row>\n        <ion-col col-md-6 col-lg-4 col-xl-3>\n            <p style="text-align:center; font-size: 14px; color: white;">Password dimenticata ?</p>\n            <button ion-button small class="register-btn" block  (click)="retrievePassword()">Recupera password</button>\n  \n        </ion-col>\n      </ion-row>\n  </div>\n\n\n  <!--<ion-footer>\n      <ion-toolbar>\n          <ion-row>\n              <ion-col style="padding: 10px; color: white; font-size: 14px; text-align: center;">Powered by ASD Taekwondo Rozzano</ion-col>\n              <ion-col col-2 style="padding: 10px">\n                  <img  width="40" height="30" src="assets/img/logotkdrozzano.png"/>\n              </ion-col>\n            </ion-row>\n      </ion-toolbar>\n    </ion-footer>-->\n  \n</ion-content>'/*ion-inline-end:"/Users/pietroturati/Desktop/demy/PROJECTS/appkwondo/clients/client/ion2kwondo/src/pages/login/login.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__providers_utils_utils__["a" /* UtilsProvider */], __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1__providers_backend_backend__["a" /* BackendProvider */], __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["a" /* AlertController */] /*, private loadingCtrl: LoadingController*/])
], LoginPage);

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 38:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChatPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_socket_service_socket_service__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_backend_backend__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_tabs_tabs__ = __webpack_require__(121);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_chatfoto_chatfoto__ = __webpack_require__(484);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_chatlist_chatlist__ = __webpack_require__(485);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_popover_popover__ = __webpack_require__(486);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__angular_platform_browser__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_camera__ = __webpack_require__(487);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_social_sharing__ = __webpack_require__(488);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_file_transfer__ = __webpack_require__(489);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_native_file__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__ionic_native_media__ = __webpack_require__(490);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__ionic_native_streaming_media__ = __webpack_require__(491);
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










//import { AudioProvider } from 'ionic-audio';
var ChatPage = (function () {
    function ChatPage(/*private _audioProvider: AudioProvider,*/ popoverCtrl, menuCtrl, alertCtrl, socialSharing, transfer, camera, file, domSanitizer, platform, nv, navparams, nav, modal, iapp, e, socket, mediaPlugin, streamingMedia, backend) {
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
        this.page = 1;
        this.recordsforpage = 20;
        this.chatmessages = [];
        this.hasChip = false;
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
            }
        ];
        var popover = questo.popoverCtrl.create(__WEBPACK_IMPORTED_MODULE_8__pages_popover_popover__["a" /* PopoverPage */], popdata);
        popover.onDidDismiss(function (data, role) {
            console.log("data", data, "role", role);
            if (data == "list") {
                questo.selectChat();
                return;
            }
            if (data == "reset") {
                questo.resetChat();
                return;
            }
            if (data == "refresh") {
                questo.loading = true;
                questo.refresh(function () {
                    questo.loading = false;
                    if (questo.content)
                        questo.content.resize();
                });
                return;
            }
        });
        popover.present({
            ev: myEvent
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
            var profileModal = questo.modal.create(__WEBPACK_IMPORTED_MODULE_7__pages_chatlist_chatlist__["a" /* ChatlistPage */], { data: data });
            profileModal.onDidDismiss(function (data) {
                console.log("chatlistdismissed", data);
                if (data) {
                    var filename = data.filename;
                    questo.backend.activechatfilename = filename;
                    questo.refresh(function () {
                        console.log("caricata chat dal file " + filename);
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
        var bcmlast = questo.backend.chatmessages.length - 1;
        var bcmfirst = bcmlast - questo.recordsforpage;
        var count = -1;
        questo.chatmessages = [];
        var postdata = {
            garaid: "",
            nickname: "more_prev",
            sockid: questo.backend.user.sockid,
            text: ""
        };
        questo.chatmessages.push(postdata);
        for (var i = bcmfirst; i < bcmlast; i++) {
            count++;
            questo.chatmessages.push(questo.backend.chatmessages[i]);
        }
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
    ChatPage.prototype.dateChanged = function (m, i) {
        if (i == 0)
            return true;
        var retvalue = false;
        var mm = this.backend.chatmessages[i - 1];
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
        var questo = this;
        //this.initView();
        if (true)
            return;
        this.loading = true;
        this.backend.getActiveChat(function (data) {
            console.log("got chat", data);
            questo.msgs = questo.backend.chatmessages;
            questo.loading = false;
            setTimeout(function () {
                if (questo.content)
                    questo.content.scrollToBottom();
            }, 500);
        });
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
            questo.backend.unread = 0;
            //questo.msgs.push(msg);
            if (questo.content) {
                console.log("content ce sta");
                setTimeout(function () {
                    questo.content.scrollToBottom();
                });
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
        if (questo.content) {
            console.log("gotobottom questo.content ce sta");
            //questo.content.resize();
            setTimeout(function () {
                questo.content.scrollToBottom(600);
                var bottom = (questo.backend.chatmessages.length - 1) * 230;
                console.log("bottom", bottom);
                //questo.content.scrollTo(0,bottom, 300); 
                questo.content.resize();
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
    return ChatPage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_0_ionic_angular__["n" /* Navbar */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["n" /* Navbar */])
], ChatPage.prototype, "navBar", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_0_ionic_angular__["c" /* Content */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["c" /* Content */])
], ChatPage.prototype, "content", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewChild"])('content'),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["c" /* Content */])
], ChatPage.prototype, "chatcontent", void 0);
ChatPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({template:/*ion-inline-start:"/Users/pietroturati/Desktop/demy/PROJECTS/appkwondo/clients/client/ion2kwondo/src/pages/chat/chat.html"*/'<!--<ion-menu [content]="content" menuToggle="right" side="right">\n  <ion-header >\n    <ion-toolbar>\n      <ion-title>Menuright</ion-title>\n    </ion-toolbar>\n  </ion-header>\n\n  <ion-content class="menu" style="overflow-y: hidden">\n  </ion-content>\n</ion-menu>-->\n\n\n\n<ion-header>\n   \n  <ion-navbar>\n     \n  \n      <button ion-button menuToggle="left" start>\n          <ion-icon name="menu"></ion-icon>\n        </button>\n       <ion-title>ChatKwonDo</ion-title>\n       <ion-buttons end>\n          <button ion-button class="menubutton"  (tap)="gotoTop(); backend.playFeedback();"><ion-icon name="md-arrow-dropup-circle"></ion-icon></button>\n    <button ion-button class="menubutton" (click)="gotoBottom(); backend.playFeedback();"><ion-icon name="md-arrow-dropdown-circle"></ion-icon></button>\n    <button *ngIf="backend.user.role!=\'tkdradmin\'" ion-button class="menubutton" (click)="goRefresh(); backend.playFeedback();"><ion-icon name="md-refresh"></ion-icon></button>\n    <!--<button class="menubutton" *ngIf="backend.user.role==\'tkdradmin\'" ion-button  (click)="resetChat(); backend.playFeedback();"><ion-icon name="ios-filing"></ion-icon></button>\n    <button class="menubutton" *ngIf="backend.user.role==\'tkdradmin\'" ion-button  (click)="selectChat(); backend.playFeedback();"><ion-icon name="ios-list-box-outline"></ion-icon></button>\n    <button ion-button menuToggle="right">\n      <ion-icon name="menu"></ion-icon>\n    </button>-->\n    <button *ngIf="backend.user.role==\'tkdradmin\'" ion-button icon-only (click)="showPop($event)">\n      <ion-icon name="md-more"></ion-icon>\n    </button>\n    </ion-buttons>\n     <!--  <ion-buttons end>\n          <button ion-button class="menubutton"  (tap)="gotoTop(); backend.playFeedback();"><ion-icon name="md-arrow-up"></ion-icon></button>\n    <button ion-button class="menubutton" (click)="gotoBottom(); backend.playFeedback();"><ion-icon name="md-arrow-down"></ion-icon></button>\n    <button class="menubutton" *ngIf="backend.user.role==\'tkdradmin\'" ion-button  (click)="resetChat(); backend.playFeedback();"><ion-icon name="ios-filing"></ion-icon></button>\n    <button class="menubutton" *ngIf="backend.user.role==\'tkdradmin\'" ion-button  (click)="selectChat(); backend.playFeedback();"><ion-icon name="ios-list-box-outline"></ion-icon></button>\n    <button ion-button menuToggle="right">\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    </ion-buttons>-->\n        <!--<ion-grid class="no-padding">\n          <ion-row>\n            <ion-col width-20>\n             \n            </ion-col>\n            <ion-col>\n\n              <ion-row>\n                <ion-col>\n                  <span class="friendnick">{{friend.doc.firstname}} {{friend.doc.lastname}}</span>\n                </ion-col>\n              </ion-row>\n              <ion-row>\n\n                <ion-col>\n                  <span class="friendmail">{{friend.doc.email}}</span>\n                </ion-col>\n              </ion-row>\n\n\n            </ion-col>\n            <ion-col width-20>\n              <span class="status" [ngClass]="friend.connected ? \'onlinechat\' : \'offlinechat\'">{{friend.connected ? \'ONLINE\' : \'OFFLINE\'}}</span>\n            </ion-col>\n          </ion-row>\n        </ion-grid>-->\n        <!--</ion-title>-->\n      </ion-navbar>\n\n   <!-- <ion-card>-->\n\n      \n\n\n\n\n    <!--</ion-card>-->\n    <section sstyle="position: fixed; top: 65px; width: 100%; height: 40px; z-index: 9000;" id="realtime" *ngIf="rtmatches.length>0">\n      \n        <ion-item class="rtmatches" *ngFor="let rt of rtmatches">\n          <ion-row>\n            <ion-col col-2><img src="assets/img/greenblink.gif" /></ion-col>\n            <ion-col>\n            <ion-row><ion-col><div class="match">{{rt.match.matchid}} - {{rt.match.atletaname}}</div></ion-col></ion-row>\n            <ion-row><ion-col><div class="match" [innerHTML]="rt.text"></div></ion-col></ion-row>\n            </ion-col>\n          </ion-row>\n          </ion-item>\n      \n  \n    </section>  \n  \n    <div style="text-align: center; z-index: 9000">\n      <ion-chip  (tap)="tapChip()" *ngIf="false" color="secondary">\n        <ion-label color="dark">Nuovi messaggi non letti</ion-label>\n      </ion-chip>\n    </div>\n\n</ion-header>\n\n\n<ion-content id="chat" class="chat">\n   <!--<ion-refresher (ionRefresh)="doRefresh($event)">\n    <ion-refresher-content refreshingSpinner="ios">\n        </ion-refresher-content>\n  </ion-refresher>  -->\n  \n  <!--<div [ngClass]="friend.connected ? \'\' : \'overlay\'"></div>-->\n  <div *ngIf="loading" style="text-align:center"><ion-spinner  text-center name="ios" *ngIf="loading"></ion-spinner></div>\n  \n  <div class="messages"> \n    <!-- *ngFor="let m of msgs" -->\n\n  \n    <ion-list  *ngFor="let m of backend.chatmessages; let i=index;" > <!--*ngFor="let m of msgs"-->\n      <ion-item *ngIf="dateChanged(m,i)" class="datachange">{{getOnlyDate(m.time)}}</ion-item>\n\n      <!-- ex ion-item -->\n      <ion-item (press)="shareItem(m)" class="message"  [ngClass]="(m.nickname===me.nickname) ? \'message me\': (m.color==\'yellow\') ? \'message system\' : \'message\'">\n       \n          <div class="msgemail">{{m.nickname}}    <span class="date">{{ getNormalDate(m.time) }}</span></div> \n       \n         <div  *ngIf="m.foto" class="divcont">  \n      <img class="ionimg" (press)="shareFoto(m.foto)" (tap)="openFoto(m.foto,m)" [src]="getBase64(m.foto)" />\n      </div><br *ngIf="m.foto">\n      <div  *ngIf="m.fotourl && !m.foto" class="divcont">  <!-- (press)="shareFoto(m.fotourl)" -->\n      <img class="ionimg"  (tap)="openFoto(m.fotourl,m)" [src]="m.fotourl" />\n      </div><br *ngIf="m.fotourl && !m.foto">\n\n      <!--<img-loader *ngIf="m.fotourl" [src]="m.fotourl"></img-loader>-->\n        <div  *ngIf="m.audio" class="divcont">  <!--(press)="shareAudio(m)"-->\n            <!--<audio-track #audio   [track]="getTrack(m)" (onFinish)="onTrackFinished($event)">\n            <audio-track-play dark [audioTrack]="audio"><ion-spinner></ion-spinner></audio-track-play>  \n            <audio-track-progress-bar dark duration progress [audioTrack]="audio" ></audio-track-progress-bar>\n            </audio-track>-->\n      <audio   style="width: 100%" *ngIf="m.audio && !isCordova()" [src]="domSanitizer.bypassSecurityTrustUrl(m.audio)" controls>\n    Your browser does not support the audio element.\n     </audio><br>\n     <button ion-button *ngIf="m.audiourl && !isCordova()" (tap)="openAudioUrl(m.audiourl)"><ion-icon name="md-play"></ion-icon>&nbsp;Messaggio vocale</button>\n     <button *ngIf="isCordova() || isCordovaIOS()" ion-button style="height: 40px;" (tap)="downloadFileAndPlay(m.audiourl)"><ion-icon name="md-play"></ion-icon>&nbsp;Messaggio vocale</button>\n    </div><br *ngIf="m.audio"> \n\n\n     \n\n    \n    \n\n      \n      <span  (press)="shareText(m.text)" *ngIf="m.text.trim()!=\'\'" class="msgtext">{{ m.text }}</span><br *ngIf="m.text.trim()!=\'\'" >\n     \n  </ion-item>  <!-- ex ion-item -->\n    </ion-list>\n    <!--<audio-track #audio *ngFor="let track of myTracks"  [track]="track" (onFinish)="onTrackFinished($event)">\n      <ion-item>  \n        <ion-thumbnail item-left>\n          <img src="{{audio.art}}">\n          <audio-track-play dark [audioTrack]="audio"><ion-spinner></ion-spinner></audio-track-play>  \n        </ion-thumbnail>\n        <div item-content style="width:100%">\n          <p><strong>{{audio.title}}</strong> ⚬ <em>{{audio.artist}}</em></p>\n          <audio-track-progress-bar dark duration progress [audioTrack]="audio" [ngStyle]="{visibility: audio.completed > 0 ? \'visible\' : \'hidden\'}"></audio-track-progress-bar>\n        </div>\n      </ion-item>    \n    </audio-track>-->\n    </div>\n   \n \n\n\n\n\n</ion-content>\n<ion-footer>\n  <!--<div class="bottom_bar">-->\n \n    <ion-grid >\n      <ion-row >\n        <ion-col >\n          <ion-icon *ngIf="showCameraIcon" class="cameraicon" (tap)="takeFoto()" name="md-camera"></ion-icon>\n          <!--<ion-textarea (ionFocus)="focus()" (ionBlur)="blur($event)" class="inputtext" placeholder="Digita qui il tuo messaggio" [(ngModel)]="msg" (keypress)="keyPress($event)" style="height: 40px; font-size: 16px; margin: 0px 0px;" > </ion-textarea>-->\n          <ion-input (ionFocus)="focus()" (ionBlur)="blur($event)" type="text" class="inputtext" placeholder="Digita qui il tuo messaggio" [(ngModel)]="msg" (keypress)="keyPress($event)"></ion-input>\n        </ion-col>\n        <ion-col col-2 *ngIf="chatButton==\'audio\'">\n          <button style="height: 40px" block [ngClass]="recording ? \'chatbutton recording\' : \'chatbutton\'" ion-button (tap)="toggleRecording()"> <i style="font-size: 24px;" class="fa fa-microphone faBlue"></i><!-- <ion-icon name="md-microphone"></ion-icon>--></button> \n          </ion-col>\n               <ion-col *ngIf="chatButton==\'text\'" col-2>\n          <button  class="chatbutton" ion-button (click)="sendMessage()"><ion-icon name="md-send"></ion-icon></button> \n          </ion-col>\n      </ion-row>\n    </ion-grid>\n\n\n    <div *ngIf="recording" class="audiorecording">Registrazione in corso... premi il microfono per interrompere</div>\n  <!--</div>-->\n</ion-footer>'/*ion-inline-end:"/Users/pietroturati/Desktop/demy/PROJECTS/appkwondo/clients/client/ion2kwondo/src/pages/chat/chat.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0_ionic_angular__["p" /* PopoverController */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["i" /* MenuController */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_11__ionic_native_social_sharing__["a" /* SocialSharing */], __WEBPACK_IMPORTED_MODULE_12__ionic_native_file_transfer__["a" /* FileTransfer */], __WEBPACK_IMPORTED_MODULE_10__ionic_native_camera__["a" /* Camera */], __WEBPACK_IMPORTED_MODULE_13__ionic_native_file__["a" /* File */], __WEBPACK_IMPORTED_MODULE_9__angular_platform_browser__["c" /* DomSanitizer */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["o" /* Platform */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["k" /* Nav */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["m" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["l" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["j" /* ModalController */],
        __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["e" /* IonicApp */],
        __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["d" /* Events */],
        __WEBPACK_IMPORTED_MODULE_2__providers_socket_service_socket_service__["a" /* SocketService */],
        __WEBPACK_IMPORTED_MODULE_14__ionic_native_media__["a" /* MediaPlugin */],
        __WEBPACK_IMPORTED_MODULE_15__ionic_native_streaming_media__["a" /* StreamingMedia */],
        __WEBPACK_IMPORTED_MODULE_3__providers_backend_backend__["a" /* BackendProvider */]])
], ChatPage);

//# sourceMappingURL=chat.js.map

/***/ }),

/***/ 41:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UtilsProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ionic_storage__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(51);
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

/***/ 481:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GarePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_backend_backend__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_gara_gara__ = __webpack_require__(127);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_editgara_editgara__ = __webpack_require__(495);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_device_feedback__ = __webpack_require__(52);
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
    GarePage.prototype.gotoGara = function (id) {
        var questo = this;
        console.log("gotoGara", id);
        this.backend.playFeedback();
        //this.deviceFeedback.acoustic();
        //ios-transition
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__pages_gara_gara__["a" /* GaraPage */], {
            id: id
        }, questo.backend.navOptions);
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
        if (questo.backend.user.role.toLowerCase() != "tkdradmin")
            return;
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
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Navbar */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Navbar */])
], GarePage.prototype, "navBar", void 0);
GarePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-gare',template:/*ion-inline-start:"/Users/pietroturati/Desktop/demy/PROJECTS/appkwondo/clients/client/ion2kwondo/src/pages/gare/gare.html"*/'<!--\n  Generated template for the GarePage page.\n\n  See http://ionicframework.com/docs/v2/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Gare</ion-title>\n    <ion-buttons end>\n      \n            <button *ngIf="backend.user.role==\'tkdradmin\'" (tap)="addGara()" ion-button icon-only>\n              <ion-icon name="ios-add-circle-outline"></ion-icon>\n            </button>\n            </ion-buttons>\n\n  </ion-navbar>\n  <ion-item>\n    <span class="headpoints">Gare: <b>{{gare.length}}</b> - ORI: <b>{{totali.ori}}</b> - ARG: <b>{{totali.argenti}}</b> - BRO: <b>{{totali.bronzi}}</b> (P:<b>{{totali.punti}})</b></span>\n  </ion-item>\n\n</ion-header>\n\n\n<ion-content spadding style="background: #eee;">\n  <div *ngIf="backend.gare.length==0" style="text-align: center; width: 100%"><ion-spinner center name="ios" ></ion-spinner></div>\n  <ion-refresher (ionRefresh)="doRefresh($event)">\n    <ion-refresher-content refreshingSpinner="ios">\n        </ion-refresher-content>\n  </ion-refresher>  \n  <div *ngIf="loading" style="width: 100%; text-align: center">\n    <ion-spinner name="ios"></ion-spinner>\n  </div>\n\n<ion-list *ngIf="backend.gare.length>0">\n  <ion-item *ngFor="let g of backend.gare" (press)="pressGara(g)" (tap)="gotoGara(g.doc.id)" [ngClass]="g.doc.stato.toLowerCase()">\n\n    \n    <span class="gara"><b>{{g.doc.title}}</b></span><br>\n    <span class="location">{{g.doc.location}} - {{g.doc.data}}</span><br>\n    <span class="medals">ORI: <b>{{g.doc.ori}}</b> - ARG: <b>{{g.doc.argenti}}</b> BRO: <b>{{g.doc.bronzi}}</b></span><br>\n    <span class="iscritti">ISCRITTI: {{getLen(g.doc.iscritti)}}</span><br>\n    \n    <span [ngClass]="\'span\'+g.doc.stato.toLowerCase()" style="font-size: 12px; font-weight: bold;">{{g.doc.stato.toUpperCase()}}</span> \n    <!--<span  *ngIf="g.doc.stato.toUpperCase()==\'INCORSO\'" style="margin-left: 5px"><img style="height: 16px; width: 16px;" src="assets/img/greenblink.gif" /></span>-->  \n\n    </ion-item>\n</ion-list>\n\n</ion-content>\n'/*ion-inline-end:"/Users/pietroturati/Desktop/demy/PROJECTS/appkwondo/clients/client/ion2kwondo/src/pages/gare/gare.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ModalController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_5__ionic_native_device_feedback__["a" /* DeviceFeedback */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* App */], __WEBPACK_IMPORTED_MODULE_2__providers_backend_backend__["a" /* BackendProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */]])
], GarePage);

//# sourceMappingURL=gare.js.map

/***/ }),

/***/ 482:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MatchesforatletaPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_backend_backend__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_matchconsole_matchconsole__ = __webpack_require__(483);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_chat_chat__ = __webpack_require__(38);
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
    function MatchesforatletaPage(toastCtrl, alertCtrl, events, backend, navCtrl, navParams) {
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
        var questo = this;
    }
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
        //this.backend.matchconsoles.push(m);
        if (this.backend.user.role.toLowerCase() != "tkdradmin")
            return;
        this.backend.playFeedback();
        console.log(this.backend.activegara);
        if (this.backend.activegara.gara.rows[0].doc.stato != "incorso")
            return;
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__pages_matchconsole_matchconsole__["a" /* MatchconsolePage */], {
            match: m
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
        var alert = this.alertCtrl.create({
            title: 'Aggiungi match',
            inputs: [
                {
                    name: 'matches',
                    placeholder: 'Match separati da virgola',
                    value: "101"
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
                        questo.performAddMatches(data.matches);
                    }
                }
            ]
        });
        alert.present();
    };
    MatchesforatletaPage.prototype.performAddMatches = function (matches) {
        var questo = this;
        //var $mid = $("#popAddMatch #matchid");
        //var $color = $("#popAddMatch #color").val();
        var color = "red";
        var matchid = matches;
        var selectedAtl = questo.backend.getAtletaById(questo.atletaid);
        var garaid = questo.backend.activegara.gara.rows[0].doc.id;
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
            datanascita: datanascita
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
        window.open(url, '_system');
    };
    MatchesforatletaPage.prototype.deleteMatch = function (m) {
        var questo = this;
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
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Navbar */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Navbar */])
], MatchesforatletaPage.prototype, "navBar", void 0);
MatchesforatletaPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-matchesforatleta',template:/*ion-inline-start:"/Users/pietroturati/Desktop/demy/PROJECTS/appkwondo/clients/client/ion2kwondo/src/pages/matchesforatleta/matchesforatleta.html"*/'<!--\n  Generated template for the MatchesforatletaPage page.\n\n  See http://ionicframework.com/docs/v2/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Match atleta</ion-title>\n    <ion-buttons end>\n    <!--<button ion-button style="font-size: 18px" (click)="gotoChat()"><ion-icon name="md-chatbubbles"><ion-badge *ngIf="backend.unread>0" color="danger">{{backend.unread}}</ion-badge></ion-icon>\n      \n      </button>-->\n      <button *ngIf="backend.user.role==\'tkdradmin\'" ion-button style="font-size: 18px" (click)="addMatches()"><ion-icon name="md-add-circle"></ion-icon>\n        \n        </button>\n        <button (tap)="initView(); backend.playFeedback();" ion-button style="font-size: 18px"><ion-icon name="md-refresh"></ion-icon></button>\n      </ion-buttons>\n  </ion-navbar>\n  <ion-segment (tap)="tapSegment()" [(ngModel)]="activetab">\n      <ion-segment-button  value="matches">\n       <!-- <ion-icon name="camera"></ion-icon>-->Match\n      </ion-segment-button>\n      <ion-segment-button  value="details">\n          <!-- <ion-icon name="camera"></ion-icon>-->Dettagli atleta\n         </ion-segment-button>\n  </ion-segment>\n\n</ion-header>\n\n\n<ion-content spadding>\n\n  <div *ngIf="loading" style="text-align:center">\n    <ion-spinner name="ios"></ion-spinner>\n  </div>\n\n  <section *ngIf="activetab==\'matches\'">\n\n  <section *ngIf="mfa.length==0">\n    <ion-card>\n      <ion-card-content>\n      Nessun match per {{atleta.cognome}} {{atleta.nome}}\n    </ion-card-content>\n    </ion-card>\n  </section>\n\n   <ion-list>\n      <ng-container *ngFor="let m of mfa">\n      <ion-item  (press)="deleteMatch(m.doc)" (tap)="showMatchconsole(m.doc)">\n        <ion-row >\n          <ion-col col-2><img width="32" height="32" src="{{getImg(m)}}" /></ion-col>\n          <ion-col>\n            <div class="{{getClass(m.doc)}}">{{m.doc.matchid}}</div>\n            <div class="atleta">{{m.doc.atletaname}}</div>\n            <div class="categoria">{{getCategoria(m.doc.datanascita).toUpperCase()}}</div>\n            <div class="{{getClass(m.doc)}}" style="font-weight: normal">{{getVintoText(m.doc)}}</div>\n            <div *ngIf="m.doc.derby && (m.doc.derby!=null)" class="derby">{{backend.getDerbyText(m.doc.derby)}}</div>\n          </ion-col>\n        </ion-row>\n      </ion-item>\n      </ng-container>\n    </ion-list>\n\n  </section>\n  <section *ngIf="activetab==\'details\'">\n      <button full ion-button sstyle="width: 100%; background: blue; color: white; font-size: 16px;" (tap)="viewTkdtCategoria=!viewTkdtCategoria; backend.playFeedback();">Dati ufficiali categoria</button>\n    <ion-list *ngIf="viewTkdtCategoria">\n      <ion-item  style="font-size:12px" *ngFor="let a of tkdtatletaarr"> \n        <ion-row>\n          <ion-col col-5>\n\n        {{a.name}}</ion-col><ion-col>{{a.value}}</ion-col>\n        </ion-row>\n      </ion-item>\n      </ion-list>\n\n\n     <button full ion-button sstyle="width: 100%; background: blue; color: white; font-size: 16px;" (tap)="viewAvversari=!viewAvversari; backend.playFeedback();">Avversari in categoria ({{avversari.length}})</button>\n    <ion-list *ngIf="viewAvversari">\n      <ion-item  style="font-size:12px" *ngFor="let avv of avversari"> \n        <ion-row>\n          <ion-col col-5 class="atleta wrap">\n\n        {{avv.nome}}</ion-col>\n        </ion-row>\n        <ion-row>\n        <ion-col class="wrap">{{avv.societa}}</ion-col>\n        </ion-row>\n      </ion-item>\n      </ion-list>\n       <button full ion-button sstyle="width: 100%; background: blue; color: white; font-size: 16px;" (tap)="viewTabulato=!viewTabulato; backend.playFeedback();">Tabulato</button>\n    <ion-item *ngIf="viewTabulato">\n     \n      {{tabulato.tabname}}<br>\n      <p>\n          <i>Clicca sul tabulato per ingrandirlo</i>\n        </p><br>\n      <img (tap)="openTabulato(tabulatoimg)" [src]="tabulatoimg" />\n     <!-- <div (tap)="backend.getTabulatoImg(tabulato.oldhref)" >Tabulato</div>--> \n    </ion-item>\n    <button full ion-button sstyle="width: 100%; background: blue; color: white; font-size: 16px;" (tap)="viewHistory=!viewHistory; backend.playFeedback();">Storico Atleta</button>\n    <ion-list *ngIf="viewHistory">\n      <ion-item> \n          <ion-row style="padding: 2px !important; font-size: 12px; background: #eee;">\n         <ion-col col-8>Gara</ion-col>\n         <ion-col col-2>MED</ion-col>\n         <ion-col col-1>M</ion-col>\n         <ion-col col-1>MD</ion-col>\n         </ion-row>\n        </ion-item>\n     <ion-item *ngFor="let h of history" >\n       <ion-row style="padding: 2px !important; font-size: 12px;">\n         <ion-col col-8 style="white-space: normal">{{h.data}} {{h.location}}</ion-col>\n         <ion-col col-2><span [ngClass]="getMedagliaHistory(h).color"> {{getMedagliaHistory(h).medaglia}}</span></ion-col>\n         <ion-col col-1>{{h.matches}}</ion-col>\n         <ion-col col-1>{{h.matchesdisputati}}</ion-col>\n         </ion-row>\n        </ion-item>\n    </ion-list>  \n\n  </section>\n\n\n</ion-content>\n'/*ion-inline-end:"/Users/pietroturati/Desktop/demy/PROJECTS/appkwondo/clients/client/ion2kwondo/src/pages/matchesforatleta/matchesforatleta.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */], __WEBPACK_IMPORTED_MODULE_2__providers_backend_backend__["a" /* BackendProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */]])
], MatchesforatletaPage);

//# sourceMappingURL=matchesforatleta.js.map

/***/ }),

/***/ 483:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MatchconsolePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_backend_backend__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_socket_service_socket_service__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_chat_chat__ = __webpack_require__(38);
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
    function MatchconsolePage(socket, events, toastCtrl, alertCtrl, backend, navCtrl, navParams) {
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
        var id = match.id;
        this.selectedMatchId = id;
        this.selectedMatch = match;
        this.backend.removeConsolesIfNotRealtime();
        this.backend.addConsoleIfNotExists(this.selectedMatch);
        this.consoles = this.backend.matchconsoles;
        this.consoles.forEach(function (item, idx) {
            if (item.match.id == questo.selectedMatchId) {
                questo.selectedConsole = item;
                questo.selConsoleIndex = idx;
            }
        });
        //this.selectedMatchId=this.selectedMatch.id;
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
        var active = true;
        var url = this.backend.rooturl + "/matches/update/" + this.selectedConsole.match.garaid + "/" + this.selectedConsole.match.id;
        var newvalue = "true";
        var newtesto = "attivato";
        if (String(this.selectedConsole.match.realtime) == "true") {
            newvalue = "false";
            newtesto = "disattivato";
            active = false;
        }
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
        //sendRealtime(true);
        questo.disabledcontrols = true;
        questo.backend.postData(url, doc, function (data) {
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
        if (questo.selectedConsole.match.realtime) {
            if (String(questo.selectedConsole.match.realtime) == "true")
                questo.socket.sendMessage(rdata);
        }
    };
    MatchconsolePage.prototype.tapRound = function (n) {
        this.selectedConsole.round = n;
        this.selectedConsole.paused = false;
        this.selectedConsole.running = true;
        this.selectedConsole.fineround = false;
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
        var msg = "Vuoi davvero convalidare il risultato di questo incontro (" + ris + ") ?";
        var title = "Conferma risultato " + ris;
        if ((ris.trim() == "0-0") || (ris.trim() == "")) {
            msg = "Il risultato impostato eseguirà il reset del match. Vuoi davvero resettare il match ?";
            title = "Conferma reset match";
        }
        var alert = questo.alertCtrl.create({
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
                        match.goldenpoint = goldenpoint;
                        match.risultato = questo.selectedConsole.result;
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
        alert.present();
    };
    MatchconsolePage.prototype.gotoChat = function () {
        this.backend.playFeedback();
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__pages_chat_chat__["a" /* ChatPage */]);
    };
    return MatchconsolePage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Navbar */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Navbar */])
], MatchconsolePage.prototype, "navBar", void 0);
MatchconsolePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-matchconsole',template:/*ion-inline-start:"/Users/pietroturati/Desktop/demy/PROJECTS/appkwondo/clients/client/ion2kwondo/src/pages/matchconsole/matchconsole.html"*/'<!--\n  Generated template for the MatchconsolePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Match console</ion-title>\n     <ion-buttons end>\n     \n<!--<button ion-button style="font-size: 18px" (click)="gotoChat()"><ion-icon name="md-chatbubbles"></ion-icon>\n\n</button>-->\n</ion-buttons>\n  </ion-navbar>\n  <ion-toolbar>\n    <ion-segment [(ngModel)]="selectedMatchId" >\n      <ion-segment-button *ngFor="let c of backend.matchconsoles; let i=index;" [value]="c.match.id" (tap)="tapSegment(c,i)" [ngClass]="c.realtime ? \'ssecondary\': \'sdark\'">\n        <span [ngClass]="(c.match.realtime==\'false\') || (c.match.realtime==false) ? \'tabnorealtime\': \'\'">{{c.match.matchid}} {{c.match.atletaname}}</span>\n      </ion-segment-button>\n      \n    </ion-segment>\n  </ion-toolbar>\n\n</ion-header>\n\n\n<ion-content padding>\n <div class="consoleinfo">{{selectedConsole.match.matchid}} {{selectedConsole.match.atletaname}}</div> \n \n <ion-row>\n   <ion-col col-12><button ion-button full [ngClass]="(selectedConsole.match.realtime==\'true\') || (selectedConsole.match.realtime==true) ? \'realtimebut\' : \'norealtimebut\'" (tap)="toggleTempoReale()">{{getTemporealeText()}}</button>\n   </ion-col>\n </ion-row>\n  <br>\n  <div *ngIf="(selectedConsole.match.realtime==\'true\') || (selectedConsole.match.realtime==true) ">\n  <ion-row>\n    <ion-col col-6>\n      <button [disabled]="disabledcontrols" ion-button full color="light" (tap)="tapPause()" [ngClass]="!selectedConsole.paused ? \'incorso\' : \'\'">{{getPauseText()}}</button>\n    </ion-col>\n    <ion-col col-6>\n      <button [disabled]="disabledcontrols" ion-button full color="light" (tap)="tapFineround()" [ngClass]="selectedConsole.fineround ? \'roundactive\' : \'\'">FINEROUND</button>\n    </ion-col>\n\n  </ion-row>\n  <ion-row>\n    <ion-col col-3><button [disabled]="disabledcontrols" ion-button full (tap)="tapRound(\'1\')" color="light" [ngClass]="(selectedConsole.round==\'1\') && (selectedConsole.fineround) ? \'roundactive fineround\' : selectedConsole.round==\'1\' ? \'roundactive\' : \'\'">1</button></ion-col>\n    <ion-col col-3><button [disabled]="disabledcontrols" ion-button full (tap)="tapRound(\'2\')" color="light" [ngClass]="(selectedConsole.round==\'2\') && (selectedConsole.fineround) ? \'roundactive fineround\' : selectedConsole.round==\'2\' ? \'roundactive\' : \'\'">2</button></ion-col>\n    <ion-col col-3><button [disabled]="disabledcontrols" ion-button full (tap)="tapRound(\'3\')" color="light" [ngClass]="(selectedConsole.round==\'3\') && (selectedConsole.fineround) ? \'roundactive fineround\' : selectedConsole.round==\'3\' ? \'roundactive\' : \'\'">3</button></ion-col>\n    <ion-col col-3><button [disabled]="disabledcontrols" ion-button full (tap)="tapRound(\'GP\')" color="light" [ngClass]="(selectedConsole.round==\'GP\') && (selectedConsole.fineround) ? \'roundactive fineround\' : selectedConsole.round==\'GP\' ? \'roundactive\' : \'\'">GP</button></ion-col>\n  </ion-row>\n  </div>\n  <br>\n  <ion-row>\n    \n    <ion-col col-2><button [disabled]="disabledcontrols" ion-button full color="light" (tap)="tapPlus(\'plus_1\')">+</button></ion-col>\n    <ion-col col-2><button [disabled]="disabledcontrols" ion-button full color="light" (tap)="tapPlus(\'minus_1\')">-</button></ion-col>\n    <ion-col col-1></ion-col>\n    <ion-col col-2><ion-input [disabled]="disabledcontrols" [(ngModel)]="selectedConsole.result" ></ion-input></ion-col>\n    <ion-col col-1></ion-col>\n    <ion-col col-2><button [disabled]="disabledcontrols" ion-button full color="light" (tap)="tapPlus(\'plus_2\')">+</button></ion-col>\n    <ion-col col-2><button [disabled]="disabledcontrols" ion-button full color="light" (tap)="tapPlus(\'minus_2\')">-</button></ion-col>\n  </ion-row>\n  <br>\n  <button [disabled]="disabledcontrols" ion-button full (tap)="setResult()">Convalida risultato</button>  \n\n</ion-content>\n'/*ion-inline-end:"/Users/pietroturati/Desktop/demy/PROJECTS/appkwondo/clients/client/ion2kwondo/src/pages/matchconsole/matchconsole.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__providers_socket_service_socket_service__["a" /* SocketService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_2__providers_backend_backend__["a" /* BackendProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */]])
], MatchconsolePage);

//# sourceMappingURL=matchconsole.js.map

/***/ }),

/***/ 484:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChatfotoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
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
        selector: 'page-chatfoto',template:/*ion-inline-start:"/Users/pietroturati/Desktop/demy/PROJECTS/appkwondo/clients/client/ion2kwondo/src/pages/chatfoto/chatfoto.html"*/'<!--\n  Generated template for the ChatfotoPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-toolbar>\n    <ion-buttons end>\n                \n            </ion-buttons>\n    <ion-title><span class="title">{{title}}</span><br><span class="data">{{data}}</span></ion-title>\n    </ion-toolbar>\n    \n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content style="background: black" nopadding>\n  <button ion-button full (click)="openFotoInGallery()">\n                   Apri nella galleria\n                </button>\n  <div class="container">\n  <img style="width: 100%" [src]="imgsrc" />\n  </div>\n\n</ion-content>\n'/*ion-inline-end:"/Users/pietroturati/Desktop/demy/PROJECTS/appkwondo/clients/client/ion2kwondo/src/pages/chatfoto/chatfoto.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["t" /* ViewController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */]])
], ChatfotoPage);

//# sourceMappingURL=chatfoto.js.map

/***/ }),

/***/ 485:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChatlistPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
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
        selector: 'page-chatlist',template:/*ion-inline-start:"/Users/pietroturati/Desktop/demy/PROJECTS/appkwondo/clients/client/ion2kwondo/src/pages/chatlist/chatlist.html"*/'<!--\n  Generated template for the ChatlistPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Lista chat</ion-title>\n    <ion-buttons start>\n    <button ion-button (tap)="dismiss()">Annulla</button>\n  </ion-buttons>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content spadding class="ion-content">\n \n\n  <button (tap)="selectChat(c)" ion-item *ngFor="let c of chatlist" style="padding: 3px !important;">\n    <div class="{{c.filename==backend.activechatfilename ? \'selected\' : \'\'}}">\n    <span >{{c.filename}}</span><br>\n    <span class="archiviata">{{formatData(c.filename)}}</span><br>\n    <span class="filesize">{{formatBytes(c.size)}}</span>\n  </div>\n  </button>\n\n</ion-content>\n'/*ion-inline-end:"/Users/pietroturati/Desktop/demy/PROJECTS/appkwondo/clients/client/ion2kwondo/src/pages/chatlist/chatlist.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__providers_backend_backend__["a" /* BackendProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["t" /* ViewController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */]])
], ChatlistPage);

//# sourceMappingURL=chatlist.js.map

/***/ }),

/***/ 486:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PopoverPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
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
        selector: 'page-popover',template:/*ion-inline-start:"/Users/pietroturati/Desktop/demy/PROJECTS/appkwondo/clients/client/ion2kwondo/src/pages/popover/popover.html"*/'<ion-list *ngFor="let p of popdata">\n  <button ion-item (tap)="doAction(p.cmd)"><ion-icon [name]="p.icon"></ion-icon> {{p.text}}</button>\n</ion-list>\n'/*ion-inline-end:"/Users/pietroturati/Desktop/demy/PROJECTS/appkwondo/clients/client/ion2kwondo/src/pages/popover/popover.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["t" /* ViewController */], __WEBPACK_IMPORTED_MODULE_2__providers_backend_backend__["a" /* BackendProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */]])
], PopoverPage);

//# sourceMappingURL=popover.js.map

/***/ }),

/***/ 492:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MapPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__ = __webpack_require__(24);
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
        selector: 'page-map',template:/*ion-inline-start:"/Users/pietroturati/Desktop/demy/PROJECTS/appkwondo/clients/client/ion2kwondo/src/pages/map/map.html"*/'<!--\n  Generated template for the MapPage page.\n\n  See http://ionicframework.com/docs/v2/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Mappa</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content spadding>\n  <iframe [src]="mapsrc" height="100%" width="100%"></iframe>\n\n</ion-content>\n'/*ion-inline-end:"/Users/pietroturati/Desktop/demy/PROJECTS/appkwondo/clients/client/ion2kwondo/src/pages/map/map.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */], __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__["c" /* DomSanitizer */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */]])
], MapPage);

//# sourceMappingURL=map.js.map

/***/ }),

/***/ 493:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FiltersPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
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
            sesso: "",
            categoria: "",
            medaglie: "",
            quadrato: ""
        };
        this.filters = {
            sesso: params.get('sesso'),
            categoria: params.get('categoria'),
            medaglie: params.get('medaglie'),
            quadrato: params.get('quadrato')
        };
        console.log('filters', this.filters);
    }
    FiltersPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad FiltersPage');
    };
    FiltersPage.prototype.resetFilters = function () {
        this.backend.playFeedback();
        for (var k in this.filters) {
            this.filters[k] = "";
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
    return FiltersPage;
}());
FiltersPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-filters',template:/*ion-inline-start:"/Users/pietroturati/Desktop/demy/PROJECTS/appkwondo/clients/client/ion2kwondo/src/pages/filters/filters.html"*/'<!--\n  Generated template for the FiltersPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Filtra dati di gara</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <button ion-button (tap)="resetFilters()">Reset filtri</button>\n    <ion-item>\n        <ion-label>Sesso</ion-label>\n        <ion-select [(ngModel)]="filters.sesso">\n            <ion-option value="">Qualsiasi</ion-option>\n          <ion-option value="f">Femmine</ion-option>\n          <ion-option value="m">Maschi</ion-option>\n        </ion-select>\n      </ion-item>\n\n      <ion-item>\n          <ion-label>Categoria</ion-label>\n          <ion-select [(ngModel)]="filters.categoria">\n            <ion-option value="">Qualsiasi</ion-option>\n            <ion-option value="esordienti">Esordienti</ion-option>\n            <ion-option value="cadetti b">Cadetti B</ion-option>\n            <ion-option value="cadetti a">Cadetti A</ion-option>\n            <ion-option value="junior">Junior</ion-option>\n            <ion-option value="senior">Senior</ion-option>\n          </ion-select>\n        </ion-item>\n\n        <ion-item>\n            <ion-label>Medaglie</ion-label>\n            <ion-select [(ngModel)]="filters.medaglie">\n              <ion-option value="">Qualsiasi</ion-option>\n              <ion-option value="oro">ORO</ion-option>\n              <ion-option value="argento">ARGENTO</ion-option>\n              <ion-option value="bronzo">BRONZO</ion-option>\n             \n            </ion-select>\n          </ion-item>\n\n          <ion-item>\n              <ion-label>Quadrato</ion-label>\n              <ion-select [(ngModel)]="filters.quadrato">\n                <ion-option value="">Qualsiasi</ion-option>\n                <ion-option value="1">1</ion-option>\n                <ion-option value="2">2</ion-option>\n                <ion-option value="3">3</ion-option>\n                <ion-option value="4">4</ion-option>\n                <ion-option value="5">5</ion-option>\n                <ion-option value="6">6</ion-option>\n                <ion-option value="7">7</ion-option>\n                <ion-option value="8">8</ion-option>\n                <ion-option value="9">9</ion-option>\n                <ion-option value="10">10</ion-option>\n                <ion-option value="11">11</ion-option>\n                <ion-option value="12">12</ion-option>\n                <ion-option value="13">13</ion-option>\n                <ion-option value="14">14</ion-option>\n                <ion-option value="15">15</ion-option>\n               \n              </ion-select>\n            </ion-item>\n            <button ion-button (tap)="cancel()">Annulla</button>\n            <button ion-button (tap)="applyFilters()">Applica</button>\n\n</ion-content>\n'/*ion-inline-end:"/Users/pietroturati/Desktop/demy/PROJECTS/appkwondo/clients/client/ion2kwondo/src/pages/filters/filters.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__providers_backend_backend__["a" /* BackendProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["t" /* ViewController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */]])
], FiltersPage);

//# sourceMappingURL=filters.js.map

/***/ }),

/***/ 494:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MedagliereglobalePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
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
        questo.jgara = this.navParams.get("gara");
        console.log("JGARA", questo.jgara);
        questo.getMedagliereGlobale(function (data) {
            console.log("got medagliere globale", data);
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
        var url = questo.backend.rooturl + "/tkdt/medagliereglobale/" + giornataid;
        //var caricamentotext = imgtext + "Caricamento in corso...."
        questo.loading = true;
        questo.backend.fetchText(url, function (data) {
            questo.loading = false;
            //console.log("got medagliere globale", data);
            var pos = data.indexOf("<table class=");
            questo.html = data.slice(pos);
            setTimeout(function () {
                questo.domize();
                if (callback)
                    callback();
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
        var n = parseInt(ev.value, 10);
        console.log("giornochanged", n);
        if (n != -1) {
            this.activegiornata = this.jgara.tkdt.giorni[n];
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
    MedagliereglobalePage.prototype.toggleMedagliere = function () {
        var questo = this;
        questo.backend.playFeedback();
        console.log("togglemedagliere");
        questo.viewmedagliere = !questo.viewmedagliere;
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
            var a1 = questo.replaceAll(a.societa, ".", "");
            var b1 = questo.replaceAll(b.societa, ".", "");
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
                    var a1 = a.nome;
                    var b1 = b.nome;
                    if (a1 > b1)
                        return 1;
                    if (a1 < b1)
                        return -1;
                    return 0;
                });
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
    return MedagliereglobalePage;
}());
MedagliereglobalePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-medagliereglobale',template:/*ion-inline-start:"/Users/pietroturati/Desktop/demy/PROJECTS/appkwondo/clients/client/ion2kwondo/src/pages/medagliereglobale/medagliereglobale.html"*/'<!--\n  Generated template for the MedagliereglobalePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n      <ion-buttons start>\n        <button ion-button (tap)="close()">Annulla</button>\n        </ion-buttons>\n\n    <ion-title>Medagliere Globale</ion-title>\n  </ion-navbar>\n  <ion-segment [(ngModel)]="activetab" (ionChange)="tabChanged($event)">\n    \n      \n      <ion-segment-button value="medagliereglobale">\n        <!--<ion-icon name="camera"></ion-icon>-->Globale\n      </ion-segment-button>\n      <ion-segment-button value="giornate" >\n          <!--<ion-icon name="bookmark"></ion-icon>-->Giornate\n      </ion-segment-button>\n\n    \n     \n    </ion-segment>\n\n</ion-header>\n\n\n<ion-content padding>\n    <div *ngIf="loading" style="text-align: center; width: 100%"><ion-spinner center name="ios" ></ion-spinner></div>\n    \n    \n   \n    <section *ngIf="activetab==\'medagliereglobale\'" id="medagliereglobale">\n    \n  <button ion-button block (tap)="toggleMedagliereGlobale()">Medagliere globale</button>\n  <div *ngIf="viewmedagliereglobale">\n  <div class="info" *ngIf="!loading">\n      <i>Clicca sui numeri per vedere i medagliati</i>\n    </div>\n    <div class="mg" [innerHTML]="html"></div>\n  </div>  \n\n  <button ion-button block (tap)="toggleSocietaIscritte()">Società iscritte</button>\n  <div *ngIf="viewsocietaiscritte">\n<ion-item  *ngFor="let s of societaiscritte; let p=index;">\n<span style="word-wrap: break-word; white-space: normal;">{{s.societa}} ({{s.atleti.length}})</span> \n\n</ion-item>\n</div>\n  </section>\n\n\n  <section *ngIf="activetab==\'giornate\'" id="giornate">\n\n   \n      \n      <ion-segment [(ngModel)]="activegiorno" color="primary" (ionChange)="giornoChanged($event)" *ngIf="jgara.hasOwnProperty(\'tkdt\')">\n         \n          <ion-segment-button *ngFor="let g of jgara.tkdt.giorni; let i=index;" [value]="i">\n            {{g.titolo}}\n          </ion-segment-button>\n         \n            </ion-segment>\n\n        <button ion-button block (tap)="toggleSocieta()">Società</button>\n            <div *ngIf="activegiornata.hasOwnProperty(\'elenco_societa\') && viewsocieta">\n        <ion-item *ngFor="let s of activegiornata.elenco_societa.rows; let p=index;" (tap)="toggleAtletiSocieta(s)">\n          <span style="word-wrap: break-word; white-space: normal;">{{s.societaname}} ({{s.atleti.length}})</span>\n          <div style="margin-top: 7px; border: 1px solid silver" *ngIf="viewatletisocieta && (activesocieta==s.societaname)">\n            <ion-item *ngFor="let a of sorted(s.atleti,\'nome\')">\n              <span style="font-size: 14px;">{{a.nome}}</span><br>\n              <span style="font-size: 12px; color: gray;">{{a.sesso}} {{a.catpeso}} {{a.catcintura}}</span> \n            </ion-item>\n          </div>\n        </ion-item>\n      </div>\n\n      <button ion-button block (tap)="toggleMedagliere()">Medagliere</button>\n      <div *ngIf="viewmedagliere">\n      <div *ngIf="activegiornata.hasOwnProperty(\'elenco_societa\')">\n        <ion-item *ngFor="let s of activegiornata.elenco_societa.rows; let p=index;" (tap)="toggleAtletiSocieta(s)" >\n          <span style="word-wrap: break-word; white-space: normal;">{{s.societaname}} ({{s.atleti.length}})</span>\n          <div style="margin-top: 7px; border: 1px solid silver" *ngIf="viewatletisocieta && (activesocieta==s.societaname)">\n            <ion-item *ngFor="let a of sorted(s.atleti,\'nome\')">\n              <span style="font-size: 14px;">{{a.nome}}</span><br>\n              <span style="font-size: 12px; color: gray;">{{a.sesso}} {{a.catpeso}} {{a.catcintura}}</span> \n            </ion-item>\n          </div>\n        </ion-item>\n      </div>\n</div>\n\n<button ion-button block (tap)="toggleTabulati()">Tabulati</button>\n<div *ngIf="viewtabulati">\n<div *ngIf="activegiornata.hasOwnProperty(\'tabulati\')">\n  <ion-item *ngFor="let s of activegiornata.tabulati.rows; let p=index;" >\n      <button ion-button (tap)="viewTabulato(s.oldhref)">Vedi</button> {{s.categoria_eta}} {{s.categoria_peso}} {{s.cintura_da}} {{s.cintura_a}}  \n    <div style="margin-top: 7px; border: 1px solid silver" *ngIf="viewatletisocieta && (activesocieta==s.societaname)">\n      <ion-item *ngFor="let a of sorted(s.atleti,\'nome\')">\n        <span style="font-size: 14px;">{{a.nome}}</span><br>\n        <span style="font-size: 12px; color: gray;">{{a.sesso}} {{a.catpeso}} {{a.catcintura}}</span> \n      </ion-item>\n    </div>\n  </ion-item>\n</div>\n</div>\n\n\n\n\n  \n    </section>\n\n  <section *ngIf="activetab==\'societa\'" id="societa">\n    Societa\n  </section>\n\n  \n \n</ion-content>\n'/*ion-inline-end:"/Users/pietroturati/Desktop/demy/PROJECTS/appkwondo/clients/client/ion2kwondo/src/pages/medagliereglobale/medagliereglobale.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */], __WEBPACK_IMPORTED_MODULE_2__providers_backend_backend__["a" /* BackendProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["t" /* ViewController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */]])
], MedagliereglobalePage);

//# sourceMappingURL=medagliereglobale.js.map

/***/ }),

/***/ 495:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EditgaraPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
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
    function EditgaraPage(viewCtrl, toastCtrl, events, backend, navCtrl, navParams) {
        this.viewCtrl = viewCtrl;
        this.toastCtrl = toastCtrl;
        this.events = events;
        this.backend = backend;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.gara = {
            title: "",
            ngiorni: 1
        };
        this.mode = "view";
        this.tkdtjsonview = false;
        this.loadingtkdt = false;
        this.tkdtSave = false;
    }
    EditgaraPage.prototype.ionViewDidLoad = function () {
        var questo = this;
        var g = this.navParams.get("gara");
        console.log('ionViewDidLoad EditgaraPage', g);
        questo.gara = g;
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
        /*
            $.ajax({
              url: rooturl + "/tkdt/getfromfile/" + gara.doc.tkdt_id + "?societaid=" + settings.mysocieta,
              dataType: "json",
              type: "GET"
            })
            .done(function (data) {
              */
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
        questo.backend.postData(url, questo.gara, function (data) {
            console.log("Gara " + txt + " !", data);
            if (questo.tkdtSave) {
                if (questo.gara.hasOwnProperty("tkdt_id")) {
                    if (questo.gara.tkdt_id.trim() != "") {
                        var turl = questo.backend.rooturl + "/tkdt/retrieve/" + questo.gara.tkdt_id;
                        questo.backend.fetchData(turl, function (tkdata) {
                            console.log("saved tkdt gara " + questo.gara.tkdt_id + " !!");
                            questo.showToast("Gara e TKDT " + questo.gara.tkdt_id + " " + txt + " !!");
                            setTimeout(function () {
                                questo.viewCtrl.dismiss("saved");
                            }, 3000);
                        });
                    }
                }
            }
            else {
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
    return EditgaraPage;
}());
EditgaraPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-editgara',template:/*ion-inline-start:"/Users/pietroturati/Desktop/demy/PROJECTS/appkwondo/clients/client/ion2kwondo/src/pages/editgara/editgara.html"*/'<!--\n  Generated template for the AtletaPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>{{gara.title}}</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n    <ion-item>\n        <ion-label >ID: {{gara.id}}</ion-label>\n  \n  \n    </ion-item>\n    <ion-item>\n        <ion-label floating>TKDT_ID: </ion-label>\n        <ion-input [(ngModel)]="gara.tkdt_id"></ion-input>\n  \n    </ion-item>\n  <ion-item>\n      <ion-label floating>Title</ion-label>\n      <ion-input [(ngModel)]="gara.title"></ion-input>\n\n  </ion-item>\n  <ion-item>\n      <ion-label floating>Location</ion-label>\n      <ion-input [(ngModel)]="gara.location"></ion-input>\n\n  </ion-item>\n  <ion-item>\n      <ion-label floating>Data</ion-label>\n      <ion-input [(ngModel)]="gara.data"></ion-input>\n      <!--<ion-datetime displayFormat="DD/MM/YYYY" [(ngModel)]="gara.datafull"></ion-datetime>-->\n\n  </ion-item>\n  <ion-item>\n    <ion-label>Giorni di gara</ion-label>\n    <ion-select [(ngModel)]="gara.ngiorni">\n      <ion-option value="1">1</ion-option>\n      <ion-option value="2">2</ion-option>\n      <ion-option value="3">3</ion-option>\n      <ion-option value="4">4</ion-option>\n      <ion-option value="5">5</ion-option>\n\n    </ion-select>\n  </ion-item>\n  <ion-item>\n      <ion-label >Stato</ion-label>\n      \n      <ion-select [(ngModel)]="gara.stato">\n          <ion-option value="disputata">DISPUTATA</ion-option>\n          <ion-option value="nondisputata">NONDISPUTATA</ion-option>\n          <ion-option value="incorso">INCORSO</ion-option>\n      </ion-select>\n         \n       \n\n  </ion-item>\n  <ion-item>\n      <ion-label >Tipo</ion-label>\n      <ion-select [(ngModel)]="gara.tipo">\n          <ion-option value="combattimento">Combattimento</ion-option>\n          <ion-option value="forme">Forme</ion-option>\n        </ion-select>\n\n  </ion-item>\n  <ion-item>\n      <ion-label floating>Map location</ion-label>\n      <ion-input [(ngModel)]="gara.maplocation"></ion-input>\n\n  </ion-item>\n  <ion-item>\n      <ion-label floating>Iscritti </ion-label>\n      <ion-textarea [(ngModel)]="gara.iscritti"></ion-textarea>\n\n  </ion-item> \n  <ion-item>\n      <ion-label floating>MyIscritti</ion-label>\n      <ion-input [(ngModel)]="gara.myiscritti"></ion-input>\n\n  </ion-item>\n\n  <!--<ion-item *ngFor="let m of backend.getObjectArray(gara)">\n  \n  <ion-label floating>{{m.name}}</ion-label>\n <input type="text" [value]="m.value"/>\n  \n    </ion-item>-->\n \n\n    <ion-card *ngIf="tkdtgara">\n      <ion-card-header>\n        <ion-row>\n          <ion-col>\n              Dati Tkdt\n            </ion-col>\n          <ion-col col-2><button *ngIf="!loadingtkdt" ion-button clear (tap)="retrieveTkdtGara(false)"><ion-icon name="md-refresh"></ion-icon></button><ion-spinner *ngIf="loadingtkdt" name="ios"></ion-spinner></ion-col></ion-row>\n      </ion-card-header>\n      <ion-card-content>\n        \n          <ion-row>\n              <ion-col col-6 class="label">Atleti iscritti</ion-col>\n              <ion-col >{{tkdtgara.atleti_iscritti.length}}</ion-col>\n          </ion-row>\n        \n\n          <ion-row>\n              <ion-col col-6 class="label">Atleti effettivi</ion-col>\n              <ion-col >{{tkdtgara.atleti.length}}</ion-col>\n          </ion-row>\n        \n\n          <ion-row>\n              <ion-col col-6 class="label">Tabulati</ion-col>\n              <ion-col >{{tkdtgara.tabulati.length}}</ion-col>\n          </ion-row>\n         \n\n          <ion-row>\n              <ion-col col-6 class="label">Giorni</ion-col>\n              <ion-col >{{tkdtgara.giorni.length}}</ion-col>\n          </ion-row>\n        \n\n          <button ion-button block (tap)="toggleTkdtJson()">Visualizza JSON</button>\n\n          <div *ngIf="tkdtjsonview" class="tkdt">{{getTkdtGara()}}</div>\n          <button ion-button block (tap)="matchTkdtIscritti()">Integra iscritti TKDT</button>\n          <ion-item>\n            <ion-label>Salva TKDT</ion-label>\n            <ion-checkbox [(ngModel)]="tkdtSave"></ion-checkbox>\n          </ion-item>\n      </ion-card-content>\n    </ion-card>\n   \n     \n      \n\n\n</ion-content>\n  <ion-footer>\n    <ion-row class="footerrow">\n      <ion-col col-6><button color="secondary" ion-button full (tap)="saveGara()" >Salva</button></ion-col>\n      <ion-col col-6><button ion-button full (tap)="cancelGara()">Annulla</button></ion-col>\n    </ion-row>\n  </ion-footer>\n\n  <ion-fab right bottom>\n   <button ion-fab><ion-icon name="md-create"></ion-icon></button>\n    <ion-fab-list side="left">\n    <button ion-fab><ion-icon name="md-create"></ion-icon></button>\n    <button ion-fab><ion-icon name="md-add"></ion-icon></button>\n    \n  </ion-fab-list>\n </ion-fab>\n'/*ion-inline-end:"/Users/pietroturati/Desktop/demy/PROJECTS/appkwondo/clients/client/ion2kwondo/src/pages/editgara/editgara.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["t" /* ViewController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */], __WEBPACK_IMPORTED_MODULE_2__providers_backend_backend__["a" /* BackendProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */]])
], EditgaraPage);

//# sourceMappingURL=editgara.js.map

/***/ }),

/***/ 496:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AtletiPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_backend_backend__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_atleta_atleta__ = __webpack_require__(497);
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
    function AtletiPage(events, backend, navCtrl, navParams) {
        this.events = events;
        this.backend = backend;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.atleti = [];
    }
    AtletiPage.prototype.ionViewWillEnter = function () {
        var questo = this;
        this.events.subscribe("hwbackbutton", function (data) {
            console.log("hwbackbutton in gare.ts");
            questo.navCtrl.pop();
        });
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
        this.backend.getAtleti(function (data) {
            questo.atleti = data.rows;
            console.log("atleti", questo.atleti);
            if (callback)
                callback(data);
        });
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
    return AtletiPage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Navbar */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Navbar */])
], AtletiPage.prototype, "navBar", void 0);
AtletiPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-atleti',template:/*ion-inline-start:"/Users/pietroturati/Desktop/demy/PROJECTS/appkwondo/clients/client/ion2kwondo/src/pages/atleti/atleti.html"*/'<!--\n  Generated template for the GarePage page.\n\n  See http://ionicframework.com/docs/v2/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Atleti</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content spadding style="background: #eee;">\n\n  <ion-refresher (ionRefresh)="doRefresh($event)">\n    <ion-refresher-content refreshingSpinner="ios">\n        </ion-refresher-content>\n  </ion-refresher>  \n\n  <ion-item *ngFor="let a of atleti" (tap)="gotoAtleta(a)">\n    \n    <span class="atleta">{{a.doc.cognome}} {{a.doc.nome}}</span><br>\n    <span class="categoria">{{getCategoria(a).toUpperCase()}}</span>\n   \n    </ion-item>\n\n</ion-content>\n'/*ion-inline-end:"/Users/pietroturati/Desktop/demy/PROJECTS/appkwondo/clients/client/ion2kwondo/src/pages/atleti/atleti.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */], __WEBPACK_IMPORTED_MODULE_2__providers_backend_backend__["a" /* BackendProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */]])
], AtletiPage);

//# sourceMappingURL=atleti.js.map

/***/ }),

/***/ 497:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AtletaPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
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
var AtletaPage = (function () {
    function AtletaPage(events, backend, navCtrl, navParams) {
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
        selector: 'page-atleta',template:/*ion-inline-start:"/Users/pietroturati/Desktop/demy/PROJECTS/appkwondo/clients/client/ion2kwondo/src/pages/atleta/atleta.html"*/'<!--\n  Generated template for the AtletaPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>{{atleta.cognome}} {{atleta.nome}}</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n  <ion-item *ngFor="let m of backend.getObjectArray(atleta)">\n    <ion-row>\n    <ion-col class="label">{{m.name}}</ion-col>\n    </ion-row>\n  <ion-row>\n     <ion-col class="value">{{m.value}}</ion-col>\n    </ion-row>\n    </ion-item>\n\n</ion-content>\n  <ion-footer>\n    <ion-row class="footerrow">\n      <ion-col col-6><button color="secondary" ion-button full>Salva</button></ion-col>\n      <ion-col col-6><button ion-button full>Annulla</button></ion-col>\n    </ion-row>\n  </ion-footer>\n\n  <ion-fab right bottom>\n   <button ion-fab><ion-icon name="md-create"></ion-icon></button>\n    <ion-fab-list side="left">\n    <button ion-fab><ion-icon name="md-create"></ion-icon></button>\n    <button ion-fab><ion-icon name="md-add"></ion-icon></button>\n    \n  </ion-fab-list>\n </ion-fab>\n'/*ion-inline-end:"/Users/pietroturati/Desktop/demy/PROJECTS/appkwondo/clients/client/ion2kwondo/src/pages/atleta/atleta.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */], __WEBPACK_IMPORTED_MODULE_2__providers_backend_backend__["a" /* BackendProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */]])
], AtletaPage);

//# sourceMappingURL=atleta.js.map

/***/ }),

/***/ 498:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EventiPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_backend_backend__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_gara_gara__ = __webpack_require__(127);
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
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Navbar */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Navbar */])
], EventiPage.prototype, "navBar", void 0);
EventiPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-eventi',template:/*ion-inline-start:"/Users/pietroturati/Desktop/demy/PROJECTS/appkwondo/clients/client/ion2kwondo/src/pages/eventi/eventi.html"*/'<!--\n  Generated template for the GarePage page.\n\n  See http://ionicframework.com/docs/v2/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Eventi</ion-title>\n    <ion-buttons end>\n      <button style="font-size: 18px" ion-button clear (tap)="doRefresh2()"><ion-icon name="md-refresh"></ion-icon></button>\n    </ion-buttons>\n  </ion-navbar>\n\n  <ion-segment *ngIf="backend.user.role==\'tkdradmin\'" class="segment" [(ngModel)]="view">\n    <ion-segment-button value="nextevents">\n      <!-- <ion-icon name="camera"></ion-icon>-->Prossimi\n    </ion-segment-button>\n    <ion-segment-button value="allevents">\n      <!-- <ion-icon name="camera"></ion-icon>-->Tutti\n    </ion-segment-button>\n  </ion-segment>\n\n</ion-header>\n\n\n<ion-content spadding style="background: #eee;">\n  \n  <ion-refresher (ionRefresh)="doRefresh($event)">\n    <ion-refresher-content refreshingSpinner="ios">\n        </ion-refresher-content>\n  </ion-refresher>\n  <div *ngIf="loading" style="width: 100%; text-align: center">\n      <ion-spinner name="ios"></ion-spinner>\n    </div>  \n\n  <section *ngIf="view==\'nextevents\'">\n\n  <ion-card *ngFor="let g of backend.nextevents">\n\n    <ion-card-content>\n        <span class="tipoevento">{{g.tipo.toUpperCase()}}</span><br>\n        <span class="title">{{g.gara.title}}</span><br>\n    <span class="locationdata">{{g.gara.location}} - {{g.gara.data}}</span><br>\n    <hr>\n      \n    <ion-row>\n      <ion-col>\n          <ion-chip color="primary">\n              <ion-label><b>Tra {{getAbs(g.diff)}} giorni</b></ion-label>\n            </ion-chip>\n\n      </ion-col>\n      <ion-col col-2>\n        <button (tap)="showDetails(g)" ion-button clear small icon-only><ion-icon *ngIf="detailview!=g.gara.id" name="ios-arrow-down-outline"></ion-icon><ion-icon *ngIf="detailview==g.gara.id" name="ios-arrow-up-outline"></ion-icon></button>\n      </ion-col>\n    </ion-row>\n    <section *ngIf="detailview==g.gara.id">\n      <div *ngIf="g.tipo==\'gara\'">\n        <ion-row>\n          <ion-col>\n\n          </ion-col>\n          <ion-col col-5>\n              <button small block ion-button (tap)="openGara(g)">Apri Gara</button>\n          </ion-col>\n        </ion-row>\n       \n      </div>\n\n      <div *ngIf="g.tipo==\'evento\'">\n      <hr>\n      <div class="descr" [innerHtml]="getDescr(g)">\n       \n      </div>\n    </div>\n\n    </section>\n       \n      \n   \n   \n    </ion-card-content>\n    </ion-card>\n\n  </section>\n\n  <section *ngIf="view==\'allevents\'">\n      <ion-card *ngFor="let g of gare">\n      <ion-card-content>\n          <span class="tipoevento">{{g.tipo}}</span><br>\n          \n          <b>{{g.doc.title}}</b><br>\n          {{g.doc.location}} - {{g.doc.data}}<br>\n          \n          </ion-card-content>\n          </ion-card>\n      \n       \n  </section>\n\n\n\n</ion-content>\n'/*ion-inline-end:"/Users/pietroturati/Desktop/demy/PROJECTS/appkwondo/clients/client/ion2kwondo/src/pages/eventi/eventi.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */], __WEBPACK_IMPORTED_MODULE_2__providers_backend_backend__["a" /* BackendProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */]])
], EventiPage);

//# sourceMappingURL=eventi.js.map

/***/ }),

/***/ 499:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SocietaPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
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
        selector: 'page-societa',template:/*ion-inline-start:"/Users/pietroturati/Desktop/demy/PROJECTS/appkwondo/clients/client/ion2kwondo/src/pages/societa/societa.html"*/'<!--\n  Generated template for the GarePage page.\n\n  See http://ionicframework.com/docs/v2/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Società</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content spadding style="background: #eee;">\n  \n  <ion-refresher (ionRefresh)="doRefresh($event)">\n    <ion-refresher-content refreshingSpinner="ios">\n        </ion-refresher-content>\n  </ion-refresher>  \n\n  <ion-item *ngFor="let g of societa">\n\n    \n    \n    <b>{{g.doc.nome}}</b>\n   \n    </ion-item>\n\n</ion-content>\n'/*ion-inline-end:"/Users/pietroturati/Desktop/demy/PROJECTS/appkwondo/clients/client/ion2kwondo/src/pages/societa/societa.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */], __WEBPACK_IMPORTED_MODULE_2__providers_backend_backend__["a" /* BackendProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */]])
], SocietaPage);

//# sourceMappingURL=societa.js.map

/***/ }),

/***/ 500:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StatsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
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
        this.sortranking = "ranking_tkdr";
        this.ranking = [];
        this.loading = false;
        this.tipostat = "ranking";
    }
    StatsPage.prototype.getPos = function (i) {
        var x = parseInt(i, 10) + 1;
        return x;
    };
    StatsPage.prototype.refresh = function (callback) {
        var questo = this;
        this.backend.getRanking(function (data) {
            console.log("got ranking", data);
            data.rows.sort(function (a, b) {
                var a1 = a.doc[questo.sortranking];
                var b1 = b.doc[questo.sortranking];
                if (a1 > b1)
                    return -1;
                if (a1 < b1)
                    return 1;
                return 0;
            });
            questo.ranking = data.rows;
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
                    label: 'Classifica generale',
                    value: 'ranking_tkdr'
                },
                {
                    type: 'radio',
                    label: 'ORI',
                    value: 'ori'
                },
                {
                    type: 'radio',
                    label: 'ARGENTI',
                    value: 'argenti'
                },
                {
                    type: 'radio',
                    label: 'BRONZI',
                    value: 'bronzi'
                },
                {
                    type: 'radio',
                    label: 'GARE DISPUTATE',
                    value: 'garedisputate'
                },
                {
                    type: 'radio',
                    label: 'MATCH DISPUTATI',
                    value: 'matchdisputati'
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
        prompt.present();
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
    return StatsPage;
}());
StatsPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-stats',template:/*ion-inline-start:"/Users/pietroturati/Desktop/demy/PROJECTS/appkwondo/clients/client/ion2kwondo/src/pages/stats/stats.html"*/'<!--\n  Generated template for the StatsPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Statistiche</ion-title>\n  </ion-navbar>\n  <ion-toolbar>\n    <ion-segment [(ngModel)]="tipostat">\n      <ion-segment-button value="ranking">\n        Ranking\n      </ion-segment-button>\n      <ion-segment-button value="altro">\n        Altro\n      </ion-segment-button>\n    </ion-segment>\n  </ion-toolbar>\n\n</ion-header>\n\n\n<ion-content nopadding>\n   <ion-refresher (ionRefresh)="doRefresh($event)">\n    <ion-refresher-content refreshingSpinner="ios">\n        </ion-refresher-content>\n  </ion-refresher>  \n      <div *ngIf="loading" style="text-align: center"><ion-spinner name="ios"></ion-spinner></div>\n\n\n  <section *ngIf="tipostat==\'ranking\'">    \n  <div style="text-align: center; font-style: italic" >Ordinamento: {{sortranking.toUpperCase()}}</div>\n  <ion-item *ngFor="let r of ranking; let i=index;">\n<ion-row [ngClass]="i<3 ? \'top3\' : \'\'">\n  <ion-col col-2>\n    {{getPos(i)}}\n    </ion-col>\n    <ion-col>\n      {{r.doc.cognome}} {{r.doc.nome}}\n    </ion-col>\n    <ion-col col-2>\n      {{r.doc.ranking_tkdr}}\n      </ion-col>\n      </ion-row>\n    <ion-row>\n      <ion-col col-2></ion-col>\n      <ion-col class="subriga" col-10>ORI: {{r.doc.ori}} ARG: {{r.doc.argenti}} BRO: {{r.doc.bronzi}}  &nbsp;&nbsp;gare: {{r.doc.garedisputate}} match: {{r.doc.matchdisputati}}</ion-col>\n    </ion-row>\n    </ion-item>\n  </section>\n\n</ion-content>\n  <ion-footer>\n    <button ion-button full icon-start (tap)="sortStats()"><ion-icon name="md-funnel"></ion-icon>Ordina</button>\n\n\n\n  </ion-footer>\n'/*ion-inline-end:"/Users/pietroturati/Desktop/demy/PROJECTS/appkwondo/clients/client/ion2kwondo/src/pages/stats/stats.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_2__providers_backend_backend__["a" /* BackendProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */]])
], StatsPage);

//# sourceMappingURL=stats.js.map

/***/ }),

/***/ 501:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FacebookProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(117);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(51);
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

/***/ 502:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProductsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_backend_backend__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_utils_utils__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_cart_cart__ = __webpack_require__(503);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__editproduct_editproduct__ = __webpack_require__(504);
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
        selector: 'page-products',template:/*ion-inline-start:"/Users/pietroturati/Desktop/demy/PROJECTS/appkwondo/clients/client/ion2kwondo/src/pages/products/products.html"*/'<!--\n  Generated template for the ProductsPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Prenota {{categoria}}</ion-title>\n    <ion-buttons end>\n        <button *ngIf="isMarketAdmin()" (tap)="addProduct()" ion-button icon-only>\n            <ion-icon name="ios-add-circle-outline"></ion-icon>\n          </button>\n      <button ion-button (tap)="viewCart()" clear><ion-icon name="md-cart" class="baricon"></ion-icon><ion-badge *ngIf="getCartTotal()>0" color="danger">{{getCartTotal()}}</ion-badge></button>\n    </ion-buttons>\n  </ion-navbar>\n <ion-searchbar\n  placeholder="Filtra prodotti"\n  [(ngModel)]="filter"\n  [showCancelButton]="true"\n  (ionInput)="onInput($event)"\n  (ionCancel)="onCancel($event)">\n</ion-searchbar>\n\n</ion-header>\n\n\n<ion-content padding class="ion-content">\n    <div *ngIf="loading" style="width: 100%; text-align: center">\n        <ion-spinner name="ios"></ion-spinner>\n      </div>\n      <ion-card *ngIf="displayedproducts.length==0">\n        <ion-card-content>\n          Non sono stati trovati prodotti per la categoria {{getUpperCase(categoria)}}\n        </ion-card-content>\n      </ion-card>\n <div style="height:100%;">\n  <ion-list [virtualScroll]="displayedproducts" approxItemHeight="50px">\n    <ion-item *virtualItem="let item" (press)="editProduct(item)" >\n        <ion-row>\n            <!--<ion-col col-3>\n           <img class="productimage" [src]="p.imgurl" />\n            </ion-col>\n            <ion-col>\n  \n            </ion-col>-->\n            <ion-col >\n              <ion-row>\n                <ion-col align-self-start>\n                    <span class="nome">{{item.nome}}</span>\n  \n                </ion-col>\n              </ion-row>\n              <ion-row>\n                  <ion-col align-self-start>\n                     <span class="descr">{{item.descr}}</span>\n    \n                  </ion-col>\n                </ion-row>\n             \n            </ion-col>\n          </ion-row>\n       \n       <hr>\n          <ion-row>\n            <ion-col col-5>\n              <span class="price">{{item.price}}€</span>\n  \n            </ion-col>\n            \n            <ion-col col-1>\n             \n              <ion-icon class="bariconbig" (tap)="qtyMinus(item)" small name="md-arrow-dropleft"></ion-icon>\n              </ion-col>\n              <ion-col col-2>\n                <input type="number" class="inp" size="3" readonly [id]="item.id+\'_qty\'"  value="1"/>\n               \n              <!--<ion-input readonly (ionChange)=\'changeQty($event)\' [id]="item.id+\'_qty\'" type="number" min="1" max="100" step="1" value="1"></ion-input>-->\n            </ion-col>\n            <ion-col col-1>\n              <ion-icon class="bariconbig" (tap)="qtyPlus(item)" small name="md-arrow-dropright"></ion-icon>\n  \n            </ion-col>\n            <ion-col col-3>\n              <button (tap)="addToCart(item)" ion-button small>Prenota</button>\n            </ion-col>\n          </ion-row>\n        \n    </ion-item>\n  </ion-list>\n</div>\n\n<!--\n  <ion-list *ngFor="let p of displayedproducts"> \n\n    <ion-card >\n      <ion-card-content>\n        <ion-row>\n        <ion-col col-3>\n            <img class="productimage" [src]="p.imageurl" />\n          </ion-col>-->\n          <!--<ion-col>\n\n          </ion-col>\n          <ion-col  >\n            <ion-row>\n              <ion-col align-self-start>\n                  <b>{{p.nome}}</b>\n\n              </ion-col>\n            </ion-row>\n            <ion-row>\n                <ion-col align-self-start>\n                    {{p.descr}}\n  \n                </ion-col>\n              </ion-row>\n           \n          </ion-col>\n        </ion-row>\n     \n     <hr>\n        <ion-row>\n          <ion-col>\n            <span class="price">{{p.price}}€</span>\n\n          </ion-col>\n          \n          <ion-col col-1>\n           \n            <ion-icon class="bariconbig" (tap)="qtyMinus(p)" small name="md-arrow-dropleft"></ion-icon>\n            </ion-col>\n            <ion-col col-2>\n            <ion-input readonly (ionChange)=\'changeQty($event)\' [id]="p.id+\'_qty\'" type="number" min="1" max="100" step="1" value="1"></ion-input>\n          </ion-col>\n          <ion-col col-1>\n            <ion-icon class="bariconbig" (tap)="qtyPlus(p)" small name="md-arrow-dropright"></ion-icon>\n\n          </ion-col>\n          <ion-col col-3>\n            <button (tap)="addToCart(p)" ion-button small>Prenota</button>\n          </ion-col>\n        </ion-row>\n      \n    </ion-card-content>\n    </ion-card>\n\n\n  </ion-list>-->\n\n</ion-content>\n'/*ion-inline-end:"/Users/pietroturati/Desktop/demy/PROJECTS/appkwondo/clients/client/ion2kwondo/src/pages/products/products.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__providers_utils_utils__["a" /* UtilsProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ModalController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_2__providers_backend_backend__["a" /* BackendProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */]])
], ProductsPage);

//# sourceMappingURL=products.js.map

/***/ }),

/***/ 503:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CartPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_backend_backend__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_utils_utils__ = __webpack_require__(41);
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
    return CartPage;
}());
CartPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-cart',template:/*ion-inline-start:"/Users/pietroturati/Desktop/demy/PROJECTS/appkwondo/clients/client/ion2kwondo/src/pages/cart/cart.html"*/'<!--\n  Generated template for the CartPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Prenotazioni</ion-title>\n  </ion-navbar>\n\n\n</ion-header>\n\n\n<ion-content spadding class="ion-content">\n  <section *ngIf="backend.cart.length>0">\n  <ion-card>\n    <ion-card-content>\n      Il contenuto del tuo carrello prenotazioni. Per inoltrare la prenotazione premi il tasto <b>Inoltra prenotazione</b>.<br>\n      Potrai pagare comodamente in società.\n    </ion-card-content>\n  </ion-card>\n\n\n  <ion-list *ngFor="let c of backend.cart" style="margin: 2px">\n   <ion-item>\n          <ion-row>\n           <!-- <ion-col col-3>\n              <img class="productimage" [src]="c.product.imageurl" />\n            </ion-col>-->\n            <ion-col align-self-start>\n              <ion-row>\n                <ion-col align-self-start>\n                    <b>{{c.product.nome}}</b>\n                </ion-col>\n              </ion-row>\n              <ion-row style="margin: 7px">\n                <ion-col>\n                  {{c.product.price}}€ - Qtà: {{c.qty}}\n                </ion-col>\n                <ion-col col-3>\n                  <b>{{getTotaleRiga(c)}}€</b>\n                </ion-col>\n              </ion-row>\n               \n  \n            </ion-col>\n          \n              \n          </ion-row>\n       \n        </ion-item>\n    </ion-list>\n    <hr>\n   <ion-item>\n        <ion-row>\n          <ion-col col-3></ion-col>\n          <ion-col>\n              <span class="totale">Totale prenotazione:    </span>\n          </ion-col>\n          <ion-col col-3>\n            <span class="totale"><b>{{getTotalPrice()}}€</b></span>\n          </ion-col>\n        </ion-row>\n   </ion-item>\n   <hr>\n    <button ion-button block (tap)="confirmOrder()">Inoltra prenotazione</button>\n  </section>\n  <section *ngIf="backend.cart.length==0">\n    <ion-card>\n      <ion-card-content>\n        Il tuo carrello prenotazioni è vuoto\n      </ion-card-content>\n    </ion-card>\n  </section>\n</ion-content>\n'/*ion-inline-end:"/Users/pietroturati/Desktop/demy/PROJECTS/appkwondo/clients/client/ion2kwondo/src/pages/cart/cart.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__providers_utils_utils__["a" /* UtilsProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */], __WEBPACK_IMPORTED_MODULE_2__providers_backend_backend__["a" /* BackendProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */]])
], CartPage);

//# sourceMappingURL=cart.js.map

/***/ }),

/***/ 504:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EditproductPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
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
        selector: 'page-editproduct',template:/*ion-inline-start:"/Users/pietroturati/Desktop/demy/PROJECTS/appkwondo/clients/client/ion2kwondo/src/pages/editproduct/editproduct.html"*/'<!--\n  Generated template for the EditproductPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>{{title}}</ion-title>\n    <ion-buttons end>\n\n      <button ion-button clear (tap)="cancel()">Chiudi</button>\n    </ion-buttons>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content spadding class="ion-content">\n    <ion-item>\n        <ion-label floating>ID prodotto</ion-label>\n        <ion-input type="text" style="font-size: 12px" readonly [(ngModel)]="product.id" name="id"></ion-input>\n      </ion-item>\n      <ion-item>\n          <ion-label>Categoria</ion-label>\n          <ion-select [(ngModel)]="product.categoria">\n            <ion-option value="minimarket">minimarket</ion-option>\n            <ion-option value="tkdgear">tkdgear</ion-option>\n          </ion-select>\n        </ion-item>\n     \n    <ion-item>\n        <ion-label floating>Nome</ion-label>\n        <ion-input type="text" [(ngModel)]="product.nome" name="nome"></ion-input>\n      </ion-item>\n      <ion-item>\n        <ion-label floating>Descrizione</ion-label>\n        <ion-textarea [(ngModel)]="product.descr" name="descr"></ion-textarea>\n      </ion-item>\n      <ion-item>\n          <ion-label floating>Prezzo</ion-label>\n          <ion-input type="number" [(ngModel)]="product.price" name="price"></ion-input>\n        </ion-item>\n        <ion-item>\n            <ion-label floating>Immagine</ion-label>\n            <ion-input [(ngModel)]="product.imgurl" name="imgurl"></ion-input>\n          </ion-item>\n\n          <br><br>\n          <button ion-button block (tap)="save()">Salva</button>\n          <button ion-button block color="danger" (tap)="delete()"><ion-icon name="md-trash"></ion-icon>&nbsp;Elimina</button>\n\n</ion-content>\n'/*ion-inline-end:"/Users/pietroturati/Desktop/demy/PROJECTS/appkwondo/clients/client/ion2kwondo/src/pages/editproduct/editproduct.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["t" /* ViewController */], __WEBPACK_IMPORTED_MODULE_2__providers_backend_backend__["a" /* BackendProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */]])
], EditproductPage);

//# sourceMappingURL=editproduct.js.map

/***/ }),

/***/ 505:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OrdersPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
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
        selector: 'page-orders',template:/*ion-inline-start:"/Users/pietroturati/Desktop/demy/PROJECTS/appkwondo/clients/client/ion2kwondo/src/pages/orders/orders.html"*/'<!--\n  Generated template for the OrdersPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Ordini prenotazioni</ion-title>\n  </ion-navbar>\n  <ion-item>\n      <ion-label>Stato</ion-label>\n      <ion-select [(ngModel)]="statusfilter" (ionChange)="changeFilter($event)">\n        <ion-option value="inoltrato">Inoltrati</ion-option>\n        <ion-option value="completato">Completati</ion-option>\n      </ion-select>\n    </ion-item>\n\n</ion-header>\n\n\n<ion-content spadding class="ion-content">\n    <div *ngIf="loading" style="width: 100%; text-align: center">\n        <ion-spinner name="ios"></ion-spinner>\n      </div>\n\n  <ion-list *ngFor="let o of displayedorders">\n    <ion-card >\n      <ion-card-content>\n        <section (tap)="viewOrder(o)">\n          <div class="id">ID:&nbsp;{{o.id}}</div>\n      <div class="orderid">DATA: &nbsp;{{getDataOrdine(o)}}</div>\n      <div class="frm">DA:&nbsp;{{o.nick}} ({{o.email}})</div>\n      <div class="totalprice">TOTALE:&nbsp;{{getTotalPrice(o)}}€</div>\n      <div class="status">STATO:&nbsp;{{o.stato}}</div>\n    </section>\n      \n      <section *ngIf="vieworder==o.id">\n        <hr>\n        <div *ngFor="let c of o.cart">\n        \n              <ion-row>\n                <ion-col>\n                    {{c.product.nome}}\n                </ion-col>\n              </ion-row>\n              <ion-row>\n                \n        \n                  \n                <ion-col col-4>\n                  Qta: {{c.qty}}\n                </ion-col>\n                <ion-col col-4>\n                  {{c.product.price}}€\n                </ion-col>\n                <ion-col col-4>\n                  {{getTotaleRiga(c)}}€\n                </ion-col>\n              </ion-row>\n             \n              \n\n\n         \n        </div>\n        <hr>\n        <ion-row>\n            <ion-col col-8>\n              Totale ordine\n            </ion-col>\n            <ion-col col-4>\n              <b>{{getTotalPrice(o)}}€</b>\n            </ion-col>\n          </ion-row>\n          <hr>\n          <ion-row>\n            <ion-col>\n                <button  ion-button small (tap)="deleteOrder(o)">Elimina ordine</button>\n            \n            </ion-col>\n            <ion-col>\n                <button *ngIf="o.stato==\'inoltrato\'" ion-button small (tap)="completeOrder(o)">Completa ordine</button>  \n            </ion-col>\n          </ion-row>\n    \n      </section>\n    </ion-card-content>\n  </ion-card>\n\n  </ion-list>\n\n</ion-content>\n'/*ion-inline-end:"/Users/pietroturati/Desktop/demy/PROJECTS/appkwondo/clients/client/ion2kwondo/src/pages/orders/orders.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */], __WEBPACK_IMPORTED_MODULE_2__providers_backend_backend__["a" /* BackendProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */]])
], OrdersPage);

//# sourceMappingURL=orders.js.map

/***/ }),

/***/ 506:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegisterPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
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
 * Generated class for the RegisterPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var RegisterPage = (function () {
    function RegisterPage(backend, navCtrl, navParams) {
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
                questo.navCtrl.pop();
            }
            else {
                alert(data.msg);
            }
        });
    };
    return RegisterPage;
}());
RegisterPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-register',template:/*ion-inline-start:"/Users/pietroturati/Desktop/demy/PROJECTS/appkwondo/clients/client/ion2kwondo/src/pages/register/register.html"*/'<!--\n  Generated template for the RegisterPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Registrazione ad Appkwondo</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n    <ion-row>\n        <ion-col>\n          <ion-list inset>\n            \n            <ion-item>\n              <ion-label floating>Inserisci la tua email</ion-label>\n              <ion-input type="text"  name="email" [(ngModel)]="registerCredentials.email" required></ion-input>\n            </ion-item>\n            <ion-item>\n                <ion-label floating>Inserisci il tuo nickname (lo userai nella Chatkwondo e nelle altre sezioni dell\'app)</ion-label>\n                <ion-input type="text"  name="nickname" [(ngModel)]="registerCredentials.nickname" required></ion-input>\n              </ion-item>\n            \n            <ion-item>\n                <ion-label floating>Scegli la tua password</ion-label>\n              <ion-input type="password"  name="password" [(ngModel)]="registerCredentials.psw" required></ion-input>\n            </ion-item>\n            \n          </ion-list>\n        </ion-col>\n      </ion-row>\n\n\n      <button ion-button block (tap)="register()">Registrati</button>\n\n</ion-content>\n'/*ion-inline-end:"/Users/pietroturati/Desktop/demy/PROJECTS/appkwondo/clients/client/ion2kwondo/src/pages/register/register.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__providers_backend_backend__["a" /* BackendProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */]])
], RegisterPage);

//# sourceMappingURL=register.js.map

/***/ }),

/***/ 507:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UsersPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
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
 * Generated class for the UsersPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var UsersPage = (function () {
    function UsersPage(alertCtrl, backend, navCtrl, navParams) {
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
        alert(u.doc.password);
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
        selector: 'page-users',template:/*ion-inline-start:"/Users/pietroturati/Desktop/demy/PROJECTS/appkwondo/clients/client/ion2kwondo/src/pages/users/users.html"*/'<!--\n  Generated template for the UsersPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n      <button ion-button menuToggle>\n          <ion-icon name="menu"></ion-icon>\n        </button>\n    <ion-title>Utenti</ion-title>\n    <ion-buttons end>\n        <button ion-button clear (tap)="sortUsers()"><ion-icon name="md-funnel"></ion-icon></button>\n        <button ion-button clear (tap)="doRefresh()"><ion-icon name="refresh"></ion-icon></button>\n      </ion-buttons>\n  </ion-navbar>\n  <ion-item>\n        <ion-label>{{users.length}} utenti</ion-label>\n        <ion-select [(ngModel)]="filter" multiple="false" (ionChange)=\'changeFilter($event)\' >\n          <ion-option selected value="">Tutti</ion-option>\n          <ion-option value="nonapprovati">Non approvati</ion-option>\n          <ion-option value="approvati">Approvati</ion-option>\n          <ion-option value="potentialios">Potenziali iOS</ion-option>\n          \n        </ion-select>\n      </ion-item>\n  <!--<ion-item>{{users.length}} utenti definiti</ion-item>-->\n</ion-header>\n\n\n<ion-content spadding class="ion-content">\n    <div *ngIf="loading" style="width: 100%; text-align: center">\n        <ion-spinner name="ios"></ion-spinner>\n      </div>\n\n \n  <br>\n\n    <ion-item *ngFor="let u of users" (tap)="showUser(u)">\n     \n\n          <div class="usernick">{{u.doc.nickname}}</div>\n          <div class="useremail">{{u.doc.email}}</div>\n          \n          <div>\n          \n          <button ion-button small (tap)="deleteUser(u)">Elimina</button>\n          <button *ngIf="needsApprove(u)" ion-button small (tap)="approveUser(u)">Approva</button>\n        </div>\n       \n    </ion-item>\n\n\n</ion-content>\n'/*ion-inline-end:"/Users/pietroturati/Desktop/demy/PROJECTS/appkwondo/clients/client/ion2kwondo/src/pages/users/users.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_2__providers_backend_backend__["a" /* BackendProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */]])
], UsersPage);

//# sourceMappingURL=users.js.map

/***/ }),

/***/ 508:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConnectionsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
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
    ConnectionsPage.prototype.doRefresh = function () {
        var questo = this;
        questo.loading = true;
        questo.refresh(function () {
            questo.loading = false;
        });
    };
    return ConnectionsPage;
}());
ConnectionsPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-connections',template:/*ion-inline-start:"/Users/pietroturati/Desktop/demy/PROJECTS/appkwondo/clients/client/ion2kwondo/src/pages/connections/connections.html"*/'<!--\n  Generated template for the ConnectionsPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n      <button ion-button menuToggle>\n          <ion-icon name="menu"></ion-icon>\n        </button>\n    <ion-title>Connessioni</ion-title>\n    <ion-buttons end>\n      <button ion-button clear (tap)="doRefresh()"><ion-icon name="refresh"></ion-icon></button>\n    </ion-buttons>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content spadding class="ion-content">\n    <div *ngIf="loading" style="width: 100%; text-align: center">\n        <ion-spinner name="ios"></ion-spinner>\n      </div>\n  <ion-item>\n    {{sockusers.length}} utenti connessi ad Appkwondo\n  </ion-item>\n\n    <ion-item *ngFor="let s of sockusers">\n        <b>{{s.nickname}}</b><br>{{s.email}}<br>{{s.id}}<br>{{s.device}}<br>{{s.appversion}}\n\n    </ion-item>\n\n</ion-content>\n'/*ion-inline-end:"/Users/pietroturati/Desktop/demy/PROJECTS/appkwondo/clients/client/ion2kwondo/src/pages/connections/connections.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__providers_backend_backend__["a" /* BackendProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */]])
], ConnectionsPage);

//# sourceMappingURL=connections.js.map

/***/ }),

/***/ 510:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
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
        //this.settings = this.backend.appSettings;
    }
    SettingsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SettingsPage');
    };
    SettingsPage.prototype.ionViewWillLeave = function () {
        console.log("ionViewWillLeave SettingsPage");
        window.localStorage.setItem("ion2kwondo_settings", JSON.stringify(this.backend.appSettings));
    };
    SettingsPage.prototype.onServerChange = function (ev) {
        console.log("onserverchange", ev);
        this.backend.rooturl = ev;
    };
    return SettingsPage;
}());
SettingsPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-settings',template:/*ion-inline-start:"/Users/pietroturati/Desktop/demy/PROJECTS/appkwondo/clients/client/ion2kwondo/src/pages/settings/settings.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Impostazioni</ion-title>\n  </ion-navbar>\n</ion-header>\n<ion-content padding>\n  \n\n  <ion-list>\n    <ion-item *ngIf="backend.user.role==\'tkdradmin\'">\n      <ion-label>Server</ion-label>\n      <ion-select  [(ngModel)]="backend.appSettings.server" (ionChange)="onServerChange($event)">\n        <ion-option value="http://tkdr.herokuapp.com">Heroku</ion-option>\n        <ion-option value="http://appkwondo.mybluemix.net">Bluemix</ion-option>\n        <ion-option value="http://192.168.1.106:3000">Local</ion-option>\n      </ion-select>\n    </ion-item>\n    <ion-item>\n      <ion-label>Animation</ion-label>\n      <ion-checkbox [(ngModel)]="backend.navOptions.animate"></ion-checkbox>\n    </ion-item>\n    <ion-item>\n      <ion-label>Animation type</ion-label>\n      <ion-select  [disabled]="!backend.navOptions.animate" [(ngModel)]="backend.navOptions.animation">\n        <ion-option value="md-transition">Android</ion-option>\n        <ion-option value="ios-transition">iOS</ion-option>\n        <ion-option value="wp-transition">Windows Phone</ion-option>\n        \n      </ion-select>\n    </ion-item>\n    <ion-item>\n      <ion-label>Sound</ion-label>\n      <ion-checkbox [(ngModel)]="backend.appSettings.sound"></ion-checkbox>\n    </ion-item>\n    <ion-item>\n      <ion-label>Voice</ion-label>\n      <ion-checkbox [(ngModel)]="backend.appSettings.voice"></ion-checkbox>\n    </ion-item>\n    <ion-item>\n      <ion-label>Feedback</ion-label>\n      <ion-checkbox [(ngModel)]="backend.appSettings.feedback"></ion-checkbox>\n    </ion-item>\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"/Users/pietroturati/Desktop/demy/PROJECTS/appkwondo/clients/client/ion2kwondo/src/pages/settings/settings.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__providers_backend_backend__["a" /* BackendProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */]])
], SettingsPage);

//# sourceMappingURL=settings.js.map

/***/ }),

/***/ 511:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RtcPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
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
        selector: 'page-rtc',template:/*ion-inline-start:"/Users/pietroturati/Desktop/demy/PROJECTS/appkwondo/clients/client/ion2kwondo/src/pages/rtc/rtc.html"*/'<!--\n  Generated template for the RtcPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>rtc</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content spadding class="ion-content">\n  <!--<button ion-button (tap)="showPeers()">Show Peers</button>-->\n\n  <ion-row *ngIf="!backend.myPeerConnected">\n    <ion-col col-8>\n        <input type="text" id="caller-id"/>\n        <ion-input type="text" [(ngModel)]="callerId"></ion-input>\n    </ion-col>\n    <ion-col col-4>\n        <button ion-button (tap)="connect()">CONNECT</button>\n    </ion-col>\n  </ion-row>\n  <ion-row>\n    <ion-col>\n      <ion-list *ngFor="let p of backend.rtcpeers">\n        <ion-item (tap)="dial2(p)">\n          {{p}}\n        </ion-item>\n      </ion-list>\n    </ion-col>\n  </ion-row>\n <!-- <ion-row>\n    <ion-col col-8>\n        <ion-item>\n            <ion-label>Peers</ion-label>\n            <ion-select [(ngModel)]="interlocutor">\n              <ion-option *ngFor="let p of backend.rtcpeers" [value]="p">{{p}}</ion-option>\n              \n            </ion-select>\n          </ion-item>\n    </ion-col>\n    <ion-col col-4>\n        <button ion-button (tap)="dial()">CALL</button>\n    </ion-col>\n  </ion-row>-->\n  \n  \n  <!--<input type="text" id="recipient-id"/>-->\n  \n<div>\n  <p><strong>REMOTE: {{interlocutor}}:</strong></p>\n  <video id="remote-video" class="remotevideo" autoplay></video>\n</div>\n  <hr>\n<div>\n  <p><strong>LOCAL: {{callerId}}</strong></p>\n  <video id="local-video" class="localvideo" autoplay muted></video>\n</div>\n</ion-content>\n'/*ion-inline-end:"/Users/pietroturati/Desktop/demy/PROJECTS/appkwondo/clients/client/ion2kwondo/src/pages/rtc/rtc.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */], __WEBPACK_IMPORTED_MODULE_2__providers_backend_backend__["a" /* BackendProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */]])
], RtcPage);

//# sourceMappingURL=rtc.js.map

/***/ }),

/***/ 514:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(515);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(533);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);


//import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["enableProdMode"])();
Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 533:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_component__ = __webpack_require__(573);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_about_about__ = __webpack_require__(129);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_contact_contact__ = __webpack_require__(608);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_chat_chat__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_chatlist_chatlist__ = __webpack_require__(485);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_chatpopover_chatpopover__ = __webpack_require__(609);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_popover_popover__ = __webpack_require__(486);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_chatfoto_chatfoto__ = __webpack_require__(484);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_home_home__ = __webpack_require__(122);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_twitter_twitter__ = __webpack_require__(610);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_partnerworld_partnerworld__ = __webpack_require__(611);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_linkedin_linkedin__ = __webpack_require__(612);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_contacts_contacts__ = __webpack_require__(613);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_login_login__ = __webpack_require__(346);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_browser_browser__ = __webpack_require__(614);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_tabs_tabs__ = __webpack_require__(121);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_settings_settings__ = __webpack_require__(510);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__pages_account_account__ = __webpack_require__(128);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__pages_bp_bp__ = __webpack_require__(615);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__pages_gare_gare__ = __webpack_require__(481);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__pages_gara_gara__ = __webpack_require__(127);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__pages_editgara_editgara__ = __webpack_require__(495);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__pages_atleti_atleti__ = __webpack_require__(496);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__pages_atleta_atleta__ = __webpack_require__(497);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__pages_matchconsole_matchconsole__ = __webpack_require__(483);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__pages_eventi_eventi__ = __webpack_require__(498);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__pages_societa_societa__ = __webpack_require__(499);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__pages_stats_stats__ = __webpack_require__(500);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__pages_filters_filters__ = __webpack_require__(493);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__pages_matchesforatleta_matchesforatleta__ = __webpack_require__(482);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__pages_medagliereglobale_medagliereglobale__ = __webpack_require__(494);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__pages_map_map__ = __webpack_require__(492);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__pages_register_register__ = __webpack_require__(506);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__pages_users_users__ = __webpack_require__(507);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__pages_connections_connections__ = __webpack_require__(508);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37__pages_servizisocieta_servizisocieta__ = __webpack_require__(130);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38__pages_products_products__ = __webpack_require__(502);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_39__pages_cart_cart__ = __webpack_require__(503);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_40__pages_rtc_rtc__ = __webpack_require__(511);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_41__pages_editproduct_editproduct__ = __webpack_require__(504);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_42__pages_orders_orders__ = __webpack_require__(505);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_43__providers_socket_service_socket_service__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_44__providers_backend_backend__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_45__components_scrollable_tabs_scrollable_tabs__ = __webpack_require__(616);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_46__components_scrollable_segments_scrollable_segments__ = __webpack_require__(617);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_47__providers_utils_utils__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_48__ionic_native_badge__ = __webpack_require__(120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_49__ionic_storage__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_50__ionic_native_app_availability__ = __webpack_require__(126);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_51__ionic_native_splash_screen__ = __webpack_require__(343);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_52__ionic_native_device_feedback__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_53__angular_platform_browser__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_54__angular_http__ = __webpack_require__(117);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_55__ionic_native_file__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_56__ionic_native_camera__ = __webpack_require__(487);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_57__ionic_native_transfer__ = __webpack_require__(131);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_58__ionic_native_social_sharing__ = __webpack_require__(488);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_59_ionic_image_loader__ = __webpack_require__(618);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_60__ionic_native_local_notifications__ = __webpack_require__(465);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_61__ionic_native_text_to_speech__ = __webpack_require__(467);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_62__ionic_native_background_mode__ = __webpack_require__(466);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_63__providers_facebook_facebook__ = __webpack_require__(501);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_64__ionic_native_media__ = __webpack_require__(490);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_65__ionic_native_file_transfer__ = __webpack_require__(489);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_66__ionic_native_streaming_media__ = __webpack_require__(491);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_67__ionic_native_android_permissions__ = __webpack_require__(509);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_68_ng_elastic__ = __webpack_require__(621);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_68_ng_elastic___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_68_ng_elastic__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_69__angular_forms__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_70__ionic_native_unique_device_id__ = __webpack_require__(468);
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
            __WEBPACK_IMPORTED_MODULE_10__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_12__pages_partnerworld_partnerworld__["a" /* PartnerworldPage */],
            __WEBPACK_IMPORTED_MODULE_13__pages_linkedin_linkedin__["a" /* LinkedinPage */],
            __WEBPACK_IMPORTED_MODULE_14__pages_contacts_contacts__["a" /* ContactsPage */],
            __WEBPACK_IMPORTED_MODULE_5__pages_chat_chat__["a" /* ChatPage */],
            __WEBPACK_IMPORTED_MODULE_6__pages_chatlist_chatlist__["a" /* ChatlistPage */],
            __WEBPACK_IMPORTED_MODULE_9__pages_chatfoto_chatfoto__["a" /* ChatfotoPage */],
            __WEBPACK_IMPORTED_MODULE_7__pages_chatpopover_chatpopover__["a" /* ChatpopoverPage */],
            __WEBPACK_IMPORTED_MODULE_15__pages_login_login__["a" /* LoginPage */],
            __WEBPACK_IMPORTED_MODULE_17__pages_tabs_tabs__["a" /* TabsPage */],
            __WEBPACK_IMPORTED_MODULE_18__pages_settings_settings__["a" /* SettingsPage */],
            __WEBPACK_IMPORTED_MODULE_19__pages_account_account__["a" /* AccountPage */],
            __WEBPACK_IMPORTED_MODULE_11__pages_twitter_twitter__["a" /* TwitterPage */],
            __WEBPACK_IMPORTED_MODULE_16__pages_browser_browser__["a" /* BrowserPage */],
            __WEBPACK_IMPORTED_MODULE_20__pages_bp_bp__["a" /* BpPage */],
            __WEBPACK_IMPORTED_MODULE_21__pages_gare_gare__["a" /* GarePage */],
            __WEBPACK_IMPORTED_MODULE_24__pages_atleti_atleti__["a" /* AtletiPage */],
            __WEBPACK_IMPORTED_MODULE_25__pages_atleta_atleta__["a" /* AtletaPage */],
            __WEBPACK_IMPORTED_MODULE_27__pages_eventi_eventi__["a" /* EventiPage */],
            __WEBPACK_IMPORTED_MODULE_22__pages_gara_gara__["a" /* GaraPage */],
            __WEBPACK_IMPORTED_MODULE_23__pages_editgara_editgara__["a" /* EditgaraPage */],
            __WEBPACK_IMPORTED_MODULE_28__pages_societa_societa__["a" /* SocietaPage */],
            __WEBPACK_IMPORTED_MODULE_31__pages_matchesforatleta_matchesforatleta__["a" /* MatchesforatletaPage */],
            __WEBPACK_IMPORTED_MODULE_26__pages_matchconsole_matchconsole__["a" /* MatchconsolePage */],
            __WEBPACK_IMPORTED_MODULE_33__pages_map_map__["a" /* MapPage */],
            __WEBPACK_IMPORTED_MODULE_29__pages_stats_stats__["a" /* StatsPage */],
            __WEBPACK_IMPORTED_MODULE_30__pages_filters_filters__["a" /* FiltersPage */],
            __WEBPACK_IMPORTED_MODULE_45__components_scrollable_tabs_scrollable_tabs__["a" /* ScrollableTabs */],
            __WEBPACK_IMPORTED_MODULE_46__components_scrollable_segments_scrollable_segments__["a" /* ScrollableSegments */],
            __WEBPACK_IMPORTED_MODULE_32__pages_medagliereglobale_medagliereglobale__["a" /* MedagliereglobalePage */],
            __WEBPACK_IMPORTED_MODULE_34__pages_register_register__["a" /* RegisterPage */],
            __WEBPACK_IMPORTED_MODULE_35__pages_users_users__["a" /* UsersPage */],
            __WEBPACK_IMPORTED_MODULE_36__pages_connections_connections__["a" /* ConnectionsPage */],
            __WEBPACK_IMPORTED_MODULE_8__pages_popover_popover__["a" /* PopoverPage */],
            __WEBPACK_IMPORTED_MODULE_37__pages_servizisocieta_servizisocieta__["a" /* ServizisocietaPage */],
            __WEBPACK_IMPORTED_MODULE_38__pages_products_products__["a" /* ProductsPage */],
            __WEBPACK_IMPORTED_MODULE_39__pages_cart_cart__["a" /* CartPage */],
            __WEBPACK_IMPORTED_MODULE_40__pages_rtc_rtc__["a" /* RtcPage */],
            __WEBPACK_IMPORTED_MODULE_41__pages_editproduct_editproduct__["a" /* EditproductPage */],
            __WEBPACK_IMPORTED_MODULE_42__pages_orders_orders__["a" /* OrdersPage */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_53__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_54__angular_http__["b" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_2__app_component__["a" /* MyApp */], {
                backButtonText: '',
                activator: 'ripple',
                backButtonIcon: 'ios-arrow-back',
                animate: true
            }, {
                links: []
            }),
            __WEBPACK_IMPORTED_MODULE_49__ionic_storage__["a" /* IonicStorageModule */].forRoot(),
            __WEBPACK_IMPORTED_MODULE_59_ionic_image_loader__["a" /* IonicImageLoader */].forRoot(),
            __WEBPACK_IMPORTED_MODULE_68_ng_elastic__["ElasticModule"],
            __WEBPACK_IMPORTED_MODULE_69__angular_forms__["FormsModule"]
            //IonicAudioModule.forRoot(defaultAudioProviderFactory)
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicApp */]],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_2__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_3__pages_about_about__["a" /* AboutPage */],
            __WEBPACK_IMPORTED_MODULE_4__pages_contact_contact__["a" /* ContactPage */],
            __WEBPACK_IMPORTED_MODULE_5__pages_chat_chat__["a" /* ChatPage */],
            __WEBPACK_IMPORTED_MODULE_6__pages_chatlist_chatlist__["a" /* ChatlistPage */],
            __WEBPACK_IMPORTED_MODULE_9__pages_chatfoto_chatfoto__["a" /* ChatfotoPage */],
            __WEBPACK_IMPORTED_MODULE_7__pages_chatpopover_chatpopover__["a" /* ChatpopoverPage */],
            __WEBPACK_IMPORTED_MODULE_10__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_12__pages_partnerworld_partnerworld__["a" /* PartnerworldPage */],
            __WEBPACK_IMPORTED_MODULE_13__pages_linkedin_linkedin__["a" /* LinkedinPage */],
            __WEBPACK_IMPORTED_MODULE_14__pages_contacts_contacts__["a" /* ContactsPage */],
            __WEBPACK_IMPORTED_MODULE_15__pages_login_login__["a" /* LoginPage */],
            __WEBPACK_IMPORTED_MODULE_17__pages_tabs_tabs__["a" /* TabsPage */],
            __WEBPACK_IMPORTED_MODULE_19__pages_account_account__["a" /* AccountPage */],
            __WEBPACK_IMPORTED_MODULE_18__pages_settings_settings__["a" /* SettingsPage */],
            __WEBPACK_IMPORTED_MODULE_11__pages_twitter_twitter__["a" /* TwitterPage */],
            __WEBPACK_IMPORTED_MODULE_16__pages_browser_browser__["a" /* BrowserPage */],
            __WEBPACK_IMPORTED_MODULE_20__pages_bp_bp__["a" /* BpPage */],
            __WEBPACK_IMPORTED_MODULE_21__pages_gare_gare__["a" /* GarePage */],
            __WEBPACK_IMPORTED_MODULE_24__pages_atleti_atleti__["a" /* AtletiPage */],
            __WEBPACK_IMPORTED_MODULE_25__pages_atleta_atleta__["a" /* AtletaPage */],
            __WEBPACK_IMPORTED_MODULE_27__pages_eventi_eventi__["a" /* EventiPage */],
            __WEBPACK_IMPORTED_MODULE_22__pages_gara_gara__["a" /* GaraPage */],
            __WEBPACK_IMPORTED_MODULE_23__pages_editgara_editgara__["a" /* EditgaraPage */],
            __WEBPACK_IMPORTED_MODULE_28__pages_societa_societa__["a" /* SocietaPage */],
            __WEBPACK_IMPORTED_MODULE_29__pages_stats_stats__["a" /* StatsPage */],
            __WEBPACK_IMPORTED_MODULE_30__pages_filters_filters__["a" /* FiltersPage */],
            __WEBPACK_IMPORTED_MODULE_31__pages_matchesforatleta_matchesforatleta__["a" /* MatchesforatletaPage */],
            __WEBPACK_IMPORTED_MODULE_26__pages_matchconsole_matchconsole__["a" /* MatchconsolePage */],
            __WEBPACK_IMPORTED_MODULE_33__pages_map_map__["a" /* MapPage */],
            __WEBPACK_IMPORTED_MODULE_32__pages_medagliereglobale_medagliereglobale__["a" /* MedagliereglobalePage */],
            __WEBPACK_IMPORTED_MODULE_34__pages_register_register__["a" /* RegisterPage */],
            __WEBPACK_IMPORTED_MODULE_35__pages_users_users__["a" /* UsersPage */],
            __WEBPACK_IMPORTED_MODULE_36__pages_connections_connections__["a" /* ConnectionsPage */],
            __WEBPACK_IMPORTED_MODULE_8__pages_popover_popover__["a" /* PopoverPage */],
            __WEBPACK_IMPORTED_MODULE_37__pages_servizisocieta_servizisocieta__["a" /* ServizisocietaPage */],
            __WEBPACK_IMPORTED_MODULE_38__pages_products_products__["a" /* ProductsPage */],
            __WEBPACK_IMPORTED_MODULE_39__pages_cart_cart__["a" /* CartPage */],
            __WEBPACK_IMPORTED_MODULE_40__pages_rtc_rtc__["a" /* RtcPage */],
            __WEBPACK_IMPORTED_MODULE_41__pages_editproduct_editproduct__["a" /* EditproductPage */],
            __WEBPACK_IMPORTED_MODULE_42__pages_orders_orders__["a" /* OrdersPage */]
        ],
        providers: [{ provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ErrorHandler"], useClass: __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicErrorHandler */] },
            __WEBPACK_IMPORTED_MODULE_43__providers_socket_service_socket_service__["a" /* SocketService */],
            __WEBPACK_IMPORTED_MODULE_44__providers_backend_backend__["a" /* BackendProvider */],
            __WEBPACK_IMPORTED_MODULE_47__providers_utils_utils__["a" /* UtilsProvider */],
            /* Storage,*/
            __WEBPACK_IMPORTED_MODULE_51__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_50__ionic_native_app_availability__["a" /* AppAvailability */],
            __WEBPACK_IMPORTED_MODULE_52__ionic_native_device_feedback__["a" /* DeviceFeedback */],
            __WEBPACK_IMPORTED_MODULE_55__ionic_native_file__["a" /* File */],
            __WEBPACK_IMPORTED_MODULE_56__ionic_native_camera__["a" /* Camera */],
            __WEBPACK_IMPORTED_MODULE_57__ionic_native_transfer__["a" /* Transfer */],
            __WEBPACK_IMPORTED_MODULE_58__ionic_native_social_sharing__["a" /* SocialSharing */],
            __WEBPACK_IMPORTED_MODULE_60__ionic_native_local_notifications__["a" /* LocalNotifications */],
            __WEBPACK_IMPORTED_MODULE_62__ionic_native_background_mode__["a" /* BackgroundMode */],
            __WEBPACK_IMPORTED_MODULE_61__ionic_native_text_to_speech__["a" /* TextToSpeech */],
            __WEBPACK_IMPORTED_MODULE_64__ionic_native_media__["a" /* MediaPlugin */],
            __WEBPACK_IMPORTED_MODULE_66__ionic_native_streaming_media__["a" /* StreamingMedia */],
            __WEBPACK_IMPORTED_MODULE_65__ionic_native_file_transfer__["a" /* FileTransfer */],
            __WEBPACK_IMPORTED_MODULE_48__ionic_native_badge__["a" /* Badge */],
            __WEBPACK_IMPORTED_MODULE_70__ionic_native_unique_device_id__["a" /* UniqueDeviceID */],
            __WEBPACK_IMPORTED_MODULE_67__ionic_native_android_permissions__["a" /* AndroidPermissions */],
            __WEBPACK_IMPORTED_MODULE_63__providers_facebook_facebook__["a" /* FacebookProvider */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 573:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_native__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(343);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_login_login__ = __webpack_require__(346);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_users_users__ = __webpack_require__(507);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_connections_connections__ = __webpack_require__(508);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_device_feedback__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_android_permissions__ = __webpack_require__(509);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_settings_settings__ = __webpack_require__(510);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_account_account__ = __webpack_require__(128);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_about_about__ = __webpack_require__(129);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_chat_chat__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__providers_backend_backend__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_rtc_rtc__ = __webpack_require__(511);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_servizisocieta_servizisocieta__ = __webpack_require__(130);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



















var MyApp = (function () {
    function MyApp(androidPermissions, toastCtrl, deviceFeedback, app, _SplashScreen, events, alertCtrl, platform, backend) {
        var _this = this;
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
            "md-information-circle",
            "ios-people",
            "md-wifi",
            "md-videocam",
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
            { title: 'Impostazioni', component: __WEBPACK_IMPORTED_MODULE_9__pages_settings_settings__["a" /* SettingsPage */] },
            { title: 'Account', component: __WEBPACK_IMPORTED_MODULE_10__pages_account_account__["a" /* AccountPage */] },
            { title: 'Informazioni', component: __WEBPACK_IMPORTED_MODULE_11__pages_about_about__["a" /* AboutPage */] },
            { title: 'Users', component: __WEBPACK_IMPORTED_MODULE_5__pages_users_users__["a" /* UsersPage */] },
            { title: 'Connessioni', component: __WEBPACK_IMPORTED_MODULE_6__pages_connections_connections__["a" /* ConnectionsPage */] },
            { title: 'RTC', component: __WEBPACK_IMPORTED_MODULE_14__pages_rtc_rtc__["a" /* RtcPage */] },
            { title: 'Servizi soci', component: __WEBPACK_IMPORTED_MODULE_15__pages_servizisocieta_servizisocieta__["a" /* ServizisocietaPage */] },
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
            if (questo.backend.isChatView) {
                console.log("resuming app, app was on chatview");
                questo.backend.resetChatUnread();
                //questo.backend.localNotify(data.message);
            }
            else {
                console.log("resuming app, app was NOT on chatview");
                questo.backend.computeUnreadChats();
            }
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
                var pushpages = ["Impostazioni", "Users", "Connessioni", "Informazioni", "Account", "RTC", "Servizi soci"];
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
        var _this = this;
        var questo = this;
        this.platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            __WEBPACK_IMPORTED_MODULE_2_ionic_native__["c" /* StatusBar */].styleDefault();
            setTimeout(function () {
                _this._SplashScreen.hide();
            }, 0);
            //Splashscreen.hide();
            if (_this.platform.is('cordova')) {
                questo.androidPermissions.checkPermission(questo.androidPermissions.PERMISSION.CAMERA).then(function (success) { return console.log('Android Camera Permission granted'); }, function (err) {
                    console.log("Android Camera permissions not found !, requesting");
                    questo.androidPermissions.requestPermission(questo.androidPermissions.PERMISSION.CAMERA);
                });
                // questo.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.CAMERA, this.androidPermissions.PERMISSION.GET_ACCOUNTS]);
                questo.backend.getUniqueDeviceID();
                var push = __WEBPACK_IMPORTED_MODULE_2_ionic_native__["b" /* Push */].init({
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
                push.on('registration', function (data) {
                    console.log("registration!!!");
                    console.log("push notification registrationId !!", data.registrationId);
                    //alert(data.registrationId.toString());
                    _this.backend.user.gcmtoken = data.registrationId.toString();
                });
                push.on('notification', function (data) {
                    console.log("push notification!", data);
                    //alert("Hi, Am a push notification");
                    var isforeground = data.additionalData.foreground;
                    if (isforeground) {
                        if (!questo.backend.isChatView) {
                            console.log("local notification emitted");
                            //questo.backend.localNotify(data.message);
                        }
                        else {
                            questo.backend.resetChatUnread();
                        }
                    }
                    else {
                        //questo.backend.computeUnreadChats();
                        //questo.backend.addChatUnread();
                    }
                });
                push.on('error', function (e) {
                    console.log("PUSH ERROR", e.message);
                });
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
        this.nav.push(__WEBPACK_IMPORTED_MODULE_12__pages_chat_chat__["a" /* ChatPage */]);
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
            if (questo.backend.user.role != 'tkdradmin')
                retvalue = false;
        }
        // console.log("isVisibleMenu",text,retvalue);
        return retvalue;
    };
    return MyApp;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Nav */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Nav */])
], MyApp.prototype, "nav", void 0);
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])("mytabs"),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* Tabs */])
], MyApp.prototype, "mytabs", void 0);
MyApp = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"/Users/pietroturati/Desktop/demy/PROJECTS/appkwondo/clients/client/ion2kwondo/src/app/app.html"*/'<ion-menu [content]="content" side="left">\n  <ion-header >\n    <ion-toolbar>\n      <ion-title>Menu</ion-title>\n    </ion-toolbar>\n  </ion-header>\n\n  <ion-content class="menu" style="overflow-y: hidden">\n    <ion-grid style="sbackground: #049a55; background: blue; color: white; padding: 4px !important;">\n    <ion-row>\n      <ion-col col-3 style="padding: 5px !important;">\n       \n        <img src="{{getUserImage()}}" class="roundimg"/>\n        \n      </ion-col>\n      \n      <ion-col style="padding: 8px !important;">\n        <span class="username">{{backend.user.nickname}}</span><br>\n        <span class="email">{{backend.user.email}}</span><br>\n      <!--<span class="useremail">{{user.email}}</span><br>-->\n      <span class="userrole">{{backend.user.role}}</span>\n    \n      </ion-col>\n    </ion-row>  \n    </ion-grid>    \n    <ion-list>\n      \n          \n      \n     <section *ngFor="let p of pages; let i=index;">\n      <button menuClose ion-item  (click)="openPage(p)" icon-left *ngIf="isVisibleMenu(p.title)">\n        <ion-icon name="{{icons[i]}}"></ion-icon>{{p.title}}\n      </button>\n      </section>\n      \n       \n    </ion-list>\n\n\n  </ion-content>\n\n</ion-menu>\n\n\n<!--\n<ion-menu [content]="content" side="right">\n  <ion-header >\n    <ion-toolbar>\n      <ion-title>Menuright</ion-title>\n    </ion-toolbar>\n  </ion-header>\n\n  <ion-content class="menu" style="overflow-y: hidden">\n  </ion-content>\n</ion-menu>\n-->\n\n<!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>\n\n\n<!--\n  <ion-fab right bottom *ngIf="realtimeEvents" (tap)="gotoChat()">\n   <button color="primary" ion-fab style="font-size: 11px"><img src="assets/img/greenblink.gif"></button>\n </ion-fab>-->'/*ion-inline-end:"/Users/pietroturati/Desktop/demy/PROJECTS/appkwondo/clients/client/ion2kwondo/src/app/app.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_8__ionic_native_android_permissions__["a" /* AndroidPermissions */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["s" /* ToastController */], __WEBPACK_IMPORTED_MODULE_7__ionic_native_device_feedback__["a" /* DeviceFeedback */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* App */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* Platform */], __WEBPACK_IMPORTED_MODULE_13__providers_backend_backend__["a" /* BackendProvider */]])
], MyApp);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 586:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 347,
	"./af.js": 347,
	"./ar": 348,
	"./ar-dz": 349,
	"./ar-dz.js": 349,
	"./ar-kw": 350,
	"./ar-kw.js": 350,
	"./ar-ly": 351,
	"./ar-ly.js": 351,
	"./ar-ma": 352,
	"./ar-ma.js": 352,
	"./ar-sa": 353,
	"./ar-sa.js": 353,
	"./ar-tn": 354,
	"./ar-tn.js": 354,
	"./ar.js": 348,
	"./az": 355,
	"./az.js": 355,
	"./be": 356,
	"./be.js": 356,
	"./bg": 357,
	"./bg.js": 357,
	"./bm": 358,
	"./bm.js": 358,
	"./bn": 359,
	"./bn.js": 359,
	"./bo": 360,
	"./bo.js": 360,
	"./br": 361,
	"./br.js": 361,
	"./bs": 362,
	"./bs.js": 362,
	"./ca": 363,
	"./ca.js": 363,
	"./cs": 364,
	"./cs.js": 364,
	"./cv": 365,
	"./cv.js": 365,
	"./cy": 366,
	"./cy.js": 366,
	"./da": 367,
	"./da.js": 367,
	"./de": 368,
	"./de-at": 369,
	"./de-at.js": 369,
	"./de-ch": 370,
	"./de-ch.js": 370,
	"./de.js": 368,
	"./dv": 371,
	"./dv.js": 371,
	"./el": 372,
	"./el.js": 372,
	"./en-au": 373,
	"./en-au.js": 373,
	"./en-ca": 374,
	"./en-ca.js": 374,
	"./en-gb": 375,
	"./en-gb.js": 375,
	"./en-ie": 376,
	"./en-ie.js": 376,
	"./en-nz": 377,
	"./en-nz.js": 377,
	"./eo": 378,
	"./eo.js": 378,
	"./es": 379,
	"./es-do": 380,
	"./es-do.js": 380,
	"./es-us": 381,
	"./es-us.js": 381,
	"./es.js": 379,
	"./et": 382,
	"./et.js": 382,
	"./eu": 383,
	"./eu.js": 383,
	"./fa": 384,
	"./fa.js": 384,
	"./fi": 385,
	"./fi.js": 385,
	"./fo": 386,
	"./fo.js": 386,
	"./fr": 387,
	"./fr-ca": 388,
	"./fr-ca.js": 388,
	"./fr-ch": 389,
	"./fr-ch.js": 389,
	"./fr.js": 387,
	"./fy": 390,
	"./fy.js": 390,
	"./gd": 391,
	"./gd.js": 391,
	"./gl": 392,
	"./gl.js": 392,
	"./gom-latn": 393,
	"./gom-latn.js": 393,
	"./gu": 394,
	"./gu.js": 394,
	"./he": 395,
	"./he.js": 395,
	"./hi": 396,
	"./hi.js": 396,
	"./hr": 397,
	"./hr.js": 397,
	"./hu": 398,
	"./hu.js": 398,
	"./hy-am": 399,
	"./hy-am.js": 399,
	"./id": 400,
	"./id.js": 400,
	"./is": 401,
	"./is.js": 401,
	"./it": 402,
	"./it.js": 402,
	"./ja": 403,
	"./ja.js": 403,
	"./jv": 404,
	"./jv.js": 404,
	"./ka": 405,
	"./ka.js": 405,
	"./kk": 406,
	"./kk.js": 406,
	"./km": 407,
	"./km.js": 407,
	"./kn": 408,
	"./kn.js": 408,
	"./ko": 409,
	"./ko.js": 409,
	"./ky": 410,
	"./ky.js": 410,
	"./lb": 411,
	"./lb.js": 411,
	"./lo": 412,
	"./lo.js": 412,
	"./lt": 413,
	"./lt.js": 413,
	"./lv": 414,
	"./lv.js": 414,
	"./me": 415,
	"./me.js": 415,
	"./mi": 416,
	"./mi.js": 416,
	"./mk": 417,
	"./mk.js": 417,
	"./ml": 418,
	"./ml.js": 418,
	"./mr": 419,
	"./mr.js": 419,
	"./ms": 420,
	"./ms-my": 421,
	"./ms-my.js": 421,
	"./ms.js": 420,
	"./my": 422,
	"./my.js": 422,
	"./nb": 423,
	"./nb.js": 423,
	"./ne": 424,
	"./ne.js": 424,
	"./nl": 425,
	"./nl-be": 426,
	"./nl-be.js": 426,
	"./nl.js": 425,
	"./nn": 427,
	"./nn.js": 427,
	"./pa-in": 428,
	"./pa-in.js": 428,
	"./pl": 429,
	"./pl.js": 429,
	"./pt": 430,
	"./pt-br": 431,
	"./pt-br.js": 431,
	"./pt.js": 430,
	"./ro": 432,
	"./ro.js": 432,
	"./ru": 433,
	"./ru.js": 433,
	"./sd": 434,
	"./sd.js": 434,
	"./se": 435,
	"./se.js": 435,
	"./si": 436,
	"./si.js": 436,
	"./sk": 437,
	"./sk.js": 437,
	"./sl": 438,
	"./sl.js": 438,
	"./sq": 439,
	"./sq.js": 439,
	"./sr": 440,
	"./sr-cyrl": 441,
	"./sr-cyrl.js": 441,
	"./sr.js": 440,
	"./ss": 442,
	"./ss.js": 442,
	"./sv": 443,
	"./sv.js": 443,
	"./sw": 444,
	"./sw.js": 444,
	"./ta": 445,
	"./ta.js": 445,
	"./te": 446,
	"./te.js": 446,
	"./tet": 447,
	"./tet.js": 447,
	"./th": 448,
	"./th.js": 448,
	"./tl-ph": 449,
	"./tl-ph.js": 449,
	"./tlh": 450,
	"./tlh.js": 450,
	"./tr": 451,
	"./tr.js": 451,
	"./tzl": 452,
	"./tzl.js": 452,
	"./tzm": 453,
	"./tzm-latn": 454,
	"./tzm-latn.js": 454,
	"./tzm.js": 453,
	"./uk": 455,
	"./uk.js": 455,
	"./ur": 456,
	"./ur.js": 456,
	"./uz": 457,
	"./uz-latn": 458,
	"./uz-latn.js": 458,
	"./uz.js": 457,
	"./vi": 459,
	"./vi.js": 459,
	"./x-pseudo": 460,
	"./x-pseudo.js": 460,
	"./yo": 461,
	"./yo.js": 461,
	"./zh-cn": 462,
	"./zh-cn.js": 462,
	"./zh-hk": 463,
	"./zh-hk.js": 463,
	"./zh-tw": 464,
	"./zh-tw.js": 464
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
webpackContext.id = 586;

/***/ }),

/***/ 6:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BackendProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(117);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_utils__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_native__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_storage__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_device_feedback__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_badge__ = __webpack_require__(120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_local_notifications__ = __webpack_require__(465);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_background_mode__ = __webpack_require__(466);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_text_to_speech__ = __webpack_require__(467);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_native_unique_device_id__ = __webpack_require__(468);
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





/*
  Generated class for the BackendProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
var BackendProvider = (function () {
    function BackendProvider(uniqueDeviceID, tts, backgroundMode, localNotifications, badge, feedback, storage, events, platform, http, utils) {
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
        //@ViewChild(Navbar) navBar: Navbar;
        this.rooturl = "http://tkdr.herokuapp.com";
        //public rooturl = "http://localhost:3000"; 
        //public rooturl="http://appkwondo.mybluemix.net"; 
        //9.71.212.38
        //public rooturl="http://10.113.32.153:3000"
        //public rooturl = "http://9.71.213.40:3000";
        //public rooturl = "http://192.168.1.106:3000";
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
            sound: false,
            voice: false,
            feedback: true,
            server: "http://tkdr.herokuapp.com",
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
        this.voicetime = 1000;
        this.soundtime = 1000;
        this.cart = [];
        this.settings = {
            mysocieta: "20160217220400",
            mysocietaname: "ASD Taekwondo Rozzano",
            logourl: "http://www.taekwondorozzano.it/wp-content/themes/Taekwondo/images/logo-tae-kwan-do-rozzano.png"
        };
        this.chatpageaccessed = false;
        this.activechatfilename = "chatno64.json";
        this.appVersion = {
            name: "appkwondov2",
            version: "2.0.3",
            releasedate: "28/11/2017"
        };
        this.nextevents = [];
        this.isIosWeb = false;
        this.rtcpeers = [];
        this.myPeerId = "";
        this.myPeerConnected = false;
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
        console.log('Hello BackendProvider Provider');
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
                titem.jdate = __WEBPACK_IMPORTED_MODULE_8_moment__(ndate).format("YYYYMMDDHHmmSS");
                titem.jdate = "20170601000000";
                titem.data = __WEBPACK_IMPORTED_MODULE_8_moment__(ndate).format("DD/MM/YYYY HH:mm:SS");
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
        this.fetchData(url, function (data) {
            console.log("fetched getGara in backend.ts", data);
            questo.rtmatches = data.realtime;
            //let activegara= Object.assign({}, data);
            questo.activegara = data;
            /*questo.events.publish('updatertmatches', data, Date.now());*/
            if (callback)
                callback(data);
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
            if (callback)
                callback(data);
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
            deviceid: questo.user.uniquedeviceid
        };
        if (user.gcmtoken) {
            console.log("this user has gcmtoken", user.gcmtoken);
            logindata["gcmtoken"] = user.gcmtoken;
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
    BackendProvider.prototype.openUrl = function (url, target) {
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
            //var opts = "location=no,clearcache=no,clearsessioncache=no,toolbar=yes,closebuttoncaption=Done,toolbarposition=top";
            var browser = new __WEBPACK_IMPORTED_MODULE_5_ionic_native__["d" /* ThemeableBrowser */](url, m, {
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
                } /*,
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
        questo.chatmessages = [];
        this.fetchData(url, function (data) {
            questo.chatmessages = data.rows;
            console.log("got active chatmessages from file " + questo.activechatfilename, questo.chatmessages);
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
        var obj = {
            sockid: questo.user.sockid,
            nickname: questo.user.nickname,
            garaid: "",
            text: "prova"
        };
        if (!msg)
            msg = obj;
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
    BackendProvider.prototype.playSound = function (filename) {
        var questo = this;
        clearTimeout(this.soundTimer);
        //console.log(settings)
        if (!questo.appSettings)
            return;
        if (!questo.appSettings.sound)
            return;
        if (String(questo.appSettings.sound) != "true")
            return;
        questo.soundTimer = setTimeout(function () {
            document.getElementById("sound").innerHTML = '<audio autoplay="autoplay"><source src="' + filename + '.mp3" type="audio/mpeg" /><source src="' + filename + '.ogg" type="audio/ogg" /><embed hidden="true" autostart="true" loop="false" src="' + filename + '.mp3" /></audio>';
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
                running: false
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
        this.unread = 0;
        window.localStorage.setItem('ion2kwondo_chatunread', String(questo.unread));
        if (questo.chatmessages.length > 0) {
            window.localStorage.setItem("ion2kwondo_lastchatread", questo.chatmessages[questo.chatmessages.length - 1].time);
        }
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
    return BackendProvider;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('content'),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["l" /* NavController */])
], BackendProvider.prototype, "nav", void 0);
BackendProvider = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_13__ionic_native_unique_device_id__["a" /* UniqueDeviceID */], __WEBPACK_IMPORTED_MODULE_12__ionic_native_text_to_speech__["a" /* TextToSpeech */], __WEBPACK_IMPORTED_MODULE_11__ionic_native_background_mode__["a" /* BackgroundMode */], __WEBPACK_IMPORTED_MODULE_10__ionic_native_local_notifications__["a" /* LocalNotifications */], __WEBPACK_IMPORTED_MODULE_9__ionic_native_badge__["a" /* Badge */], __WEBPACK_IMPORTED_MODULE_7__ionic_native_device_feedback__["a" /* DeviceFeedback */], __WEBPACK_IMPORTED_MODULE_6__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["d" /* Events */], __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["o" /* Platform */], __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */], __WEBPACK_IMPORTED_MODULE_3__utils_utils__["a" /* UtilsProvider */]])
], BackendProvider);

//# sourceMappingURL=backend.js.map

/***/ }),

/***/ 605:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 608:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContactPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
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
        selector: 'page-contact',template:/*ion-inline-start:"/Users/pietroturati/Desktop/demy/PROJECTS/appkwondo/clients/client/ion2kwondo/src/pages/contact/contact.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>\n      Contact\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n<ion-content>\n  <ion-list>\n    <ion-list-header>Follow me on Twitter</ion-list-header>\n    <ion-item>\n      <ion-icon name="ionic" item-left></ion-icon>\n      @nkansahrexford\n    </ion-item>\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"/Users/pietroturati/Desktop/demy/PROJECTS/appkwondo/clients/client/ion2kwondo/src/pages/contact/contact.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */]])
], ContactPage);

//# sourceMappingURL=contact.js.map

/***/ }),

/***/ 609:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChatpopoverPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
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
        selector: 'page-chatpopover',template:/*ion-inline-start:"/Users/pietroturati/Desktop/demy/PROJECTS/appkwondo/clients/client/ion2kwondo/src/pages/chatpopover/chatpopover.html"*/'<ion-list>\n\n  <button ion-item (tap)="chatrefresh()"><ion-icon name="md-refresh"></ion-icon> Aggiorna</button>\n  <button ion-item  (tap)="chatlist()"><ion-icon name="ios-list-box-outline"></ion-icon> Lista chat</button>\n  <button ion-item *ngIf="backend.user.role==\'tkdradmin\'" (tap)="chatreset()"><ion-icon name="ios-filing"></ion-icon> Reset chat</button>\n  \n\n</ion-list>\n'/*ion-inline-end:"/Users/pietroturati/Desktop/demy/PROJECTS/appkwondo/clients/client/ion2kwondo/src/pages/chatpopover/chatpopover.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__providers_backend_backend__["a" /* BackendProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["t" /* ViewController */]])
], ChatpopoverPage);

//# sourceMappingURL=chatpopover.js.map

/***/ }),

/***/ 610:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TwitterPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_backend_backend__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_native__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_app_availability__ = __webpack_require__(126);
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
        var browser = new __WEBPACK_IMPORTED_MODULE_3_ionic_native__["d" /* ThemeableBrowser */](url, '_blank', {
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
        __WEBPACK_IMPORTED_MODULE_3_ionic_native__["e" /* TwitterConnect */].login().then(function (result) {
            //Get user data
            __WEBPACK_IMPORTED_MODULE_3_ionic_native__["e" /* TwitterConnect */].showUser().then(function (user) {
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
        selector: 'page-twitter',template:/*ion-inline-start:"/Users/pietroturati/Desktop/demy/PROJECTS/appkwondo/clients/client/ion2kwondo/src/pages/twitter/twitter.html"*/'<!--\n  Generated template for the TwitterPage page.\n\n  See http://ionicframework.com/docs/v2/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n\n<!--\n<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Twitter</ion-title>\n    <button (tap)="linkedin()" ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n  </ion-navbar>\n</ion-header>\n-->\n<ion-header>\n<ion-navbar> \n\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n\n<ion-title>\nTwitter\n</ion-title>\n<!--<ion-buttons end>\n\n<button (click)="linkedin()">Linkedin</button>\n</ion-buttons>-->\n</ion-navbar>\n</ion-header>\n\n<ion-content spadding>\n\n <ion-refresher (ionRefresh)="doRefresh($event)">\n    <ion-refresher-content>\n        </ion-refresher-content>\n  </ion-refresher>\n  <ion-searchbar [(ngModel)]="searchtext" [showCancelButton]="shouldShowCancel" (ionInput)="onSearchInput($event)" (ionCancel)="onSearchCancel($event)">\n</ion-searchbar>\n\n  <!--<ion-input type="text" (input)="onSearchChange($event.target.value)"></ion-input>-->\n\n<ion-card *ngFor="let item of tweets" (tap)="tapCard(item)">\n \n      <ion-item>\n        <ion-avatar item-left>\n          <img src="{{item.user.profile_image_url}}" />\n        </ion-avatar>\n        <h2>{{item.user.name}}</h2>\n        <p>{{getNormalDate(item.created_at)}}</p>\n      </ion-item>\n \n      <!--<img src="http://placehold.it/500x200" />-->\n \n      <ion-card-content>\n        <div>{{item.text}}</div>\n       <!--  <div [innerHTML] = "item.doc.description"></div>-->\n        \n      </ion-card-content>\n \n      <ion-row>\n        <ion-col>\n          <button ion-button icon-left clear small>\n            <ion-icon class="bpgreen" name="thumbs-up"></ion-icon>\n            <div class="bpgreen">12 Likes</div>\n          </button>\n        </ion-col>\n        <ion-col>\n          <button ion-button icon-left clear small>\n            <ion-icon class="bpgreen" name="text"></ion-icon>\n            <div class="bpgreen">4 Comments</div>\n          </button>\n        </ion-col>\n        <ion-col center text-center>\n          <ion-note>\n           \n          </ion-note>\n        </ion-col>\n      </ion-row>\n \n    </ion-card>\n\n<!--\n<ion-row>\n  <ion-col>\n  <ion-card class="card" *ngFor="let item of tweets">\n    <div class="card-image">\n      <img style={width:10px,height:10px;} src={{item.user.profile_image_url}}>\n    </div>\n    <div class="right-content">\n      <span class="card-title">{{item.user.name}}</span>\n      <div class="card-content">\n        <p>{{item.text}}</p>\n      </div>\n      <div class="card-action">\n        <a href="#">This is a link</a>\n      </div>\n    </div>\n  </ion-card>\n  </ion-col>\n  </ion-row>-->\n\n</ion-content>'/*ion-inline-end:"/Users/pietroturati/Desktop/demy/PROJECTS/appkwondo/clients/client/ion2kwondo/src/pages/twitter/twitter.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__ionic_native_app_availability__["a" /* AppAvailability */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_2__providers_backend_backend__["a" /* BackendProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */]])
], TwitterPage);

//# sourceMappingURL=twitter.js.map

/***/ }),

/***/ 611:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PartnerworldPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_socket_service_socket_service__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_backend_backend__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(5);
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
        selector: 'page-partnerworld',template:/*ion-inline-start:"/Users/pietroturati/Desktop/demy/PROJECTS/appkwondo/clients/client/ion2kwondo/src/pages/partnerworld/partnerworld.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>PartnerWorld</ion-title>\n  </ion-navbar>\n</ion-header>\n<ion-content spadding class="ion-content">\n\n  <ion-refresher (ionRefresh)="doRefresh($event)">\n    <ion-refresher-content>\n        </ion-refresher-content>\n  </ion-refresher>\n\n<ion-card *ngFor="let item of allnews" (tap)="openUrl(item.link)">\n \n      <ion-item>\n        <ion-avatar item-left>\n           <img src="assets/img/globe.png" />\n      </ion-avatar>\n        <h2 class="h2wrap">{{item.title}}</h2>\n        <p>{{item.pubDate}}</p>\n      </ion-item>\n \n      <!--<img src="http://placehold.it/500x200" />-->\n \n      <ion-card-content>\n        {{item.description}}\n      </ion-card-content>\n \n      <ion-row>\n        <ion-col>\n          <button ion-button icon-left clear small>\n            <ion-icon class="bpgreen" name="thumbs-up"></ion-icon>\n            <div class="bpgreen">{{item.likes}} Likes</div>\n          </button>\n        </ion-col>\n        <ion-col>\n          <button ion-button icon-left clear small>\n            <ion-icon class="bpgreen" name="text"></ion-icon>\n            <div class="bpgreen">{{item.comments}} Comments</div>\n          </button>\n        </ion-col>\n        <ion-col center text-center>\n          <ion-note>\n            \n          </ion-note>\n        </ion-col>\n      </ion-row>\n \n    </ion-card>\n \n</ion-content>\n'/*ion-inline-end:"/Users/pietroturati/Desktop/demy/PROJECTS/appkwondo/clients/client/ion2kwondo/src/pages/partnerworld/partnerworld.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1__providers_socket_service_socket_service__["a" /* SocketService */], __WEBPACK_IMPORTED_MODULE_2__providers_backend_backend__["a" /* BackendProvider */]])
], PartnerworldPage);

//# sourceMappingURL=partnerworld.js.map

/***/ }),

/***/ 612:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LinkedinPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_socket_service_socket_service__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_backend_backend__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(5);
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
        selector: 'page-linkedin',template:/*ion-inline-start:"/Users/pietroturati/Desktop/demy/PROJECTS/appkwondo/clients/client/ion2kwondo/src/pages/linkedin/linkedin.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Linkedin</ion-title>\n  </ion-navbar>\n</ion-header>\n<ion-content spadding class="ion-content">\n\n    <ion-refresher (ionRefresh)="doRefresh($event)">\n    <ion-refresher-content>\n        </ion-refresher-content>\n  </ion-refresher>\n\n<ion-card *ngFor="let item of allnews" (tap)="openUrl(item.doc.link)">\n \n      <ion-item>\n        <ion-avatar item-left>\n          <img src="{{item.doc.foto}}" />\n        </ion-avatar>\n        <h2 class="h2wrap">{{item.doc.title}}</h2>\n        <p class="autore">{{item.doc.autore}}</p>\n        <p>{{item.doc.data}}</p>\n      </ion-item>\n \n      <!--<img src="http://placehold.it/500x200" />-->\n \n      <ion-card-content>\n         <div [innerHTML] = "item.doc.description"></div>\n        \n      </ion-card-content>\n \n      <ion-row>\n        <ion-col>\n          <button ion-button icon-left clear small>\n            <ion-icon class="bpgreen" name="thumbs-up"></ion-icon>\n            <div class="bpgreen">{{item.likes}} Likes</div>\n          </button>\n        </ion-col>\n        <ion-col>\n          <button ion-button icon-left clear small>\n            <ion-icon class="bpgreen" name="text"></ion-icon>\n            <div class="bpgreen">{{item.comments}} Comments</div>\n          </button>\n        </ion-col>\n        <ion-col center text-center>\n          <ion-note>\n            \n          </ion-note>\n        </ion-col>\n      </ion-row>\n \n    </ion-card>\n\n\n    <ion-card *ngIf="allnews.length==0">\n      \n      <ion-card-content>No data was returned from the backend system</ion-card-content>\n\n      </ion-card>\n</ion-content>\n'/*ion-inline-end:"/Users/pietroturati/Desktop/demy/PROJECTS/appkwondo/clients/client/ion2kwondo/src/pages/linkedin/linkedin.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1__providers_socket_service_socket_service__["a" /* SocketService */], __WEBPACK_IMPORTED_MODULE_2__providers_backend_backend__["a" /* BackendProvider */]])
], LinkedinPage);

//# sourceMappingURL=linkedin.js.map

/***/ }),

/***/ 613:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContactsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_socket_service_socket_service__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_backend_backend__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_chat_chat__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(5);
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
        selector: 'page-contacts',template:/*ion-inline-start:"/Users/pietroturati/Desktop/demy/PROJECTS/appkwondo/clients/client/ion2kwondo/src/pages/contacts/contacts.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Contacts</ion-title>\n    <ion-buttons end>\n  <button ion-button icon-right (tap)="broadcast()"><!--*ngIf="isIbmAdmin" -->\n \n  <ion-icon name="ios-radio-outline"></ion-icon>\n</button>\n</ion-buttons>\n\n  </ion-navbar>\n</ion-header>\n<ion-content spadding class="ion-content">\n\n    <ion-refresher (ionRefresh)="doRefresh($event)">\n    <ion-refresher-content>\n        </ion-refresher-content>\n  </ion-refresher>\n\n<ion-card>\n  <ion-item>\n    <p>Contacts for {{user.email}}</p>\n  </ion-item>\n  </ion-card>\n\n<ion-card (tap)="tapChatUser(item)" *ngFor="let item of allnews">\n \n      <ion-item  >\n        <ion-avatar item-left>\n          <img src="data:image/jpeg;base64,{{item.doc.userphoto}}" />\n          <span [ngClass]="item.connected  ? \'online\' : \'offline\'" >{{item.connected  ? \'ONLINE\' : \'OFFLINE\'}}</span>\n        </ion-avatar>\n        <h2>{{item.doc.firstname + \' \' +item.doc.lastname}}</h2>\n        <p>{{item.doc.email}}</p><ion-badge *ngIf="item.doc.unreadcount>0" color="danger" item-right>{{item.doc.unreadcount}}</ion-badge>\n        <p>{{item.doc.role}}</p>\n      </ion-item>\n \n\n \n    </ion-card>\n\n</ion-content>\n<ion-footer>\n \n\n</ion-footer>\n'/*ion-inline-end:"/Users/pietroturati/Desktop/demy/PROJECTS/appkwondo/clients/client/ion2kwondo/src/pages/contacts/contacts.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["b" /* App */], __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["d" /* Events */], __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1__providers_socket_service_socket_service__["a" /* SocketService */], __WEBPACK_IMPORTED_MODULE_2__providers_backend_backend__["a" /* BackendProvider */]])
], ContactsPage);

//# sourceMappingURL=contacts.js.map

/***/ }),

/***/ 614:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BrowserPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
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
        selector: 'page-browser',template:/*ion-inline-start:"/Users/pietroturati/Desktop/demy/PROJECTS/appkwondo/clients/client/ion2kwondo/src/pages/browser/browser.html"*/'<!--\n  Generated template for the BrowserPage page.\n\n  See http://ionicframework.com/docs/v2/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>browser</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <iframe \n             name="iframe_a"  \n             id="iframea"  \n             src="http://twitter.com" \n             frameborder="0" \n             style=" overflow:hidden;\n                     overflow-x:hidden;\n                     overflow-y:hidden;\n                     height:100%;\n                     width:100%;\n                     position:absolute;\n                     top:14px;left:0px;right:0px;bottom:0px;\n                     -ms-touch-action: none;" \n                     height="100%" width="100%"\n    ></iframe>\n\n</ion-content>\n'/*ion-inline-end:"/Users/pietroturati/Desktop/demy/PROJECTS/appkwondo/clients/client/ion2kwondo/src/pages/browser/browser.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */]])
], BrowserPage);

//# sourceMappingURL=browser.js.map

/***/ }),

/***/ 615:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BpPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_backend_backend__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(5);
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
        selector: 'page-bp',template:/*ion-inline-start:"/Users/pietroturati/Desktop/demy/PROJECTS/appkwondo/clients/client/ion2kwondo/src/pages/bp/bp.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>\n      BP\n    </ion-title>\n     <ion-buttons end>\n  <button ion-button icon-right (tap)="toggleFilters()"><!--*ngIf="isIbmAdmin" -->\n \n  <ion-icon name="ios-search"></ion-icon>\n</button>\n</ion-buttons>\n  </ion-navbar>\n</ion-header>\n<ion-content spadding class="ion-content">\n    <ion-refresher (ionRefresh)="doRefresh($event)">\n    <ion-refresher-content>\n        </ion-refresher-content>\n  </ion-refresher>\n  <!--<ion-list>\n  <ion-item ion-item  *ngFor="let key of bpfiltersarray" >\n    {{ key }}\n    <ion-list>\n  <ion-item ion-item  *ngFor="let item of bpfilters[key]" >{{item}}</ion-item>\n    </ion-list>\n  </ion-item>  \n</ion-list>-->\n  <ion-card *ngIf="filtersShown" style="padding: 4px !important;">\n    <ion-card-header>\n      Search filters\n    </ion-card-header>\n    <ion-row *ngFor="let key of bpfiltersarray" >\n      <ion-col>\n    <button ion-button (tap)="selectFilter(key)" style="min-width: 200px">{{key}}</button>\n      </ion-col>\n      <ion-col><ion-item>{{getFilter(key)}}</ion-item></ion-col>\n      </ion-row>\n   <!-- <span *ngFor="let muschio of bpfilters[key]" value="muschio">{{muschio}}</span>-->\n  <!--<ion-select (ionChange)="onFilterChange($event)" id="{{key}}" >\n      <ion-option *ngFor=" let muschio of getFilters(key)" value="{{muschio}}">{{muschio}}</ion-option>\n      \n    </ion-select>-->\n    </ion-card>\n    <ion-card style="padding: 4px !important;" *ngIf="showFilterMsg()" >\n      <ion-item>\n    Specify some filters to search for BPs\n    </ion-item>\n    </ion-card>\n    <ion-card style="padding: 4px !important;" *ngIf="displayednews.length>0" >\n      <ion-item>\n    {{displayednews.length}} BP found for the specified filters\n    </ion-item>\n    </ion-card>\n   <ion-card *ngFor="let item of displayednews" (tap)="tapCard(item)">\n \n      <ion-item>\n        <h2 class="h2wrap">{{item.doc.Company}}</h2>\n        <p class="autore">{{item.doc.Competency}}</p>\n        <div>{{item.doc.PreferredVAD}}</div>\n        <div>{{item.doc.BU}}</div>\n        <div>{{item.doc.TaxonomyCategory}}</div>\n          <div>{{item.doc.TerritoryCity}}</div>\n        \n      </ion-item>\n \n    </ion-card>\n</ion-content>\n'/*ion-inline-end:"/Users/pietroturati/Desktop/demy/PROJECTS/appkwondo/clients/client/ion2kwondo/src/pages/bp/bp.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1__providers_backend_backend__["a" /* BackendProvider */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["l" /* NavController */]])
], BpPage);

//# sourceMappingURL=bp.js.map

/***/ }),

/***/ 616:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ScrollableTabs; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
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
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["r" /* Tabs */])
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

/***/ 617:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ScrollableSegments; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
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
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["q" /* Segment */])
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

},[514]);
//# sourceMappingURL=main.js.map