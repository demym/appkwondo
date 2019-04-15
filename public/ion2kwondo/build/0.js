webpackJsonp([0],{

/***/ 768:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IscrittiPageModule", function() { return IscrittiPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__iscritti__ = __webpack_require__(769);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var IscrittiPageModule = (function () {
    function IscrittiPageModule() {
    }
    return IscrittiPageModule;
}());
IscrittiPageModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__iscritti__["a" /* IscrittiPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__iscritti__["a" /* IscrittiPage */]),
        ],
    })
], IscrittiPageModule);

//# sourceMappingURL=iscritti.module.js.map

/***/ }),

/***/ 769:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return IscrittiPage; });
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
 * Generated class for the IscrittiPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var IscrittiPage = (function () {
    function IscrittiPage(backend, viewCtrl, navCtrl, navParams) {
        this.backend = backend;
        this.viewCtrl = viewCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.gara = {};
        this.iscrittiarr = [];
        this.atletiarr = [];
        var questo = this;
        this.gara = navParams.get("gara");
        //console.log("gara",this.gara);
        var iscrittiarr = this.gara.gara.rows[0].doc.iscritti.split(",");
        console.log("iscrittiarr", iscrittiarr);
        questo.backend.atleti.forEach(function (item, idx) {
            var selected = false;
            if (iscrittiarr.indexOf(item.doc.id) > -1)
                selected = true;
            console.log(selected, item);
            var atl = {
                atl: questo.backend.getAtletaById(item.doc.id),
                selected: selected
            };
            questo.atletiarr.push(atl);
        });
        questo.atletiarr.sort(function (a, b) {
            var a1 = a.atl.cognome + a.atl.nome;
            var b1 = b.atl.cognome + b.atl.nome;
            if (a1 > b1)
                return 1;
            if (a1 < b1)
                return -1;
            return 0;
        });
    }
    IscrittiPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad IscrittiPage');
    };
    IscrittiPage.prototype.cancel = function () {
        this.viewCtrl.dismiss();
    };
    IscrittiPage.prototype.ok = function () {
        var questo = this;
        var iarr = [];
        questo.atletiarr.forEach(function (item, idx) {
            if (item.selected) {
                iarr.push(item.atl.id);
            }
        });
        var iscr = iarr.join(",");
        console.log(iscr);
        var struct = {
            count: questo.getNSelezionati(),
            iscr: iscr
        };
        this.viewCtrl.dismiss(struct);
    };
    IscrittiPage.prototype.selectAll = function () {
        this.atletiarr.forEach(function (item, idx) {
            item.selected = true;
        });
    };
    IscrittiPage.prototype.selectNone = function () {
        this.atletiarr.forEach(function (item, idx) {
            item.selected = false;
        });
    };
    IscrittiPage.prototype.getNSelezionati = function () {
        var retvalue = 0;
        this.atletiarr.forEach(function (item, idx) {
            if (item.selected)
                retvalue++;
        });
        return retvalue;
    };
    return IscrittiPage;
}());
IscrittiPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-iscritti',template:/*ion-inline-start:"/Users/demetriomortelliti/Desktop/demy/PROJECTS/appkwondo/clients/ion2kwondo/src/pages/iscritti/iscritti.html"*/'<!--\n  Generated template for the IscrittiPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Seleziona iscritti</ion-title>\n    <ion-buttons end>\n      <button ion-button style="font-size: 18px" (tap)="cancel()">\n        Annulla\n\n      </button>\n     \n      <button ion-button style="font-size: 18px" (tap)="ok()">\n        OK\n      </button>\n\n    </ion-buttons>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n    <ion-item>Selezionati: {{getNSelezionati()}}</ion-item>\n  <button ion-button (tap)="selectAll()">Seleziona tutti</button>\n  <button ion-button (tap)="selectNone()">Deseleziona tutti</button>\n\n  <ion-list *ngFor="let a of atletiarr">\n    <ion-item>\n      <ion-label>{{a.atl.cognome+\' \'+a.atl.nome}}</ion-label>\n      <ion-checkbox [(ngModel)]="a.selected"></ion-checkbox>\n    </ion-item>\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"/Users/demetriomortelliti/Desktop/demy/PROJECTS/appkwondo/clients/ion2kwondo/src/pages/iscritti/iscritti.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__providers_backend_backend__["a" /* BackendProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["u" /* ViewController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* NavParams */]])
], IscrittiPage);

//# sourceMappingURL=iscritti.js.map

/***/ })

});
//# sourceMappingURL=0.js.map