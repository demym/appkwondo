"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var sidedrawer_1 = require("nativescript-telerik-ui/sidedrawer");
var angular_1 = require("nativescript-telerik-ui/sidedrawer/angular");
var backend_1 = require("../providers/backend/backend");
var router_1 = require("@angular/router");
var segmented_bar_1 = require("ui/segmented-bar");
var frameModule = require("ui/frame");
var GaraComponent = (function () {
    function GaraComponent(route, router, backend) {
        var _this = this;
        this.route = route;
        this.router = router;
        this.backend = backend;
        this.segmentsarr = ["Per Match", "Per Atleta", "Cronaca", "Iscritti"];
        this.jgara = {
            id: "",
            title: "",
            location: "",
            data: ""
        };
        this.gara = {
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
        this.displayedmbp = [];
        this.iscritti = [];
        this.atletiiscritti = [];
        this.garaid = "";
        this.activesegment = "Per Match";
        this.topmost = frameModule.topmost();
        this.loading = false;
        this.viewinfo = false;
        this.info = {};
        this.categoriecoperte = {};
        var questo = this;
        this.route.queryParams.subscribe(function (params) {
            console.log("params", JSON.stringify(params));
            _this.garaid = params.id;
            console.log("garaid", _this.garaid);
            questo.loading = true;
            _this.refresh(function (data) {
                questo.loading = false;
            });
        });
        this.mysegments = [];
        for (var i = 0; i < this.segmentsarr.length; i++) {
            var item = new segmented_bar_1.SegmentedBarItem();
            item.title = this.segmentsarr[i];
            this.mysegments.push(item);
        }
    }
    GaraComponent.prototype.onSelectedSegmentChange = function (ev) {
        var sbar = ev.object;
        this.activesegment = this.segmentsarr[sbar.selectedIndex];
        console.log("activesegment", this.activesegment);
    };
    GaraComponent.prototype.pullRefresh = function () {
        console.log("pullrefresh");
        var questo = this;
        questo.loading = true;
        questo.refresh(function () {
            console.log("refreshed");
            questo.loading = false;
        });
    };
    GaraComponent.prototype.refresh = function (callback) {
        var questo = this;
        var url = questo.backend.rooturl + "/gare/fullgarabyid/" + this.garaid + "?societaid=20160217220400";
        console.log("calling url", url);
        questo.backend.fetchData(url, function (data) {
            questo.gara = data;
            questo.backend.activegara = data;
            questo.jgara = questo.backend.activegara.gara.rows[0].doc;
            questo.displayedmbp = [];
            questo.gara.matchesbyprog.rows.forEach(function (item, idx) {
                if (item.doc.dadisputare == 'yes')
                    questo.displayedmbp.push(item);
            });
            console.log("displayedmbp", questo.displayedmbp.length);
            questo.iscritti = questo.gara.gara.rows[0].doc.iscritti.split(",");
            questo.iscritti.forEach(function (item, idx) {
                var atl = questo.getAtletaIscritto(item);
                questo.atletiiscritti.push(atl);
            });
            questo.atletiiscritti.sort(function (a, b) {
                var a1 = a.cognome + a.nome;
                var b1 = b.cognome + b.nome;
                if (a1 > b1)
                    return 1;
                if (a1 < b1)
                    return -1;
                return 0;
            });
            console.log("gara", questo.gara.matchesbyprog.rows.length);
            questo.info.dadisputare = questo.backend.filterRows(questo.gara.matchesbyprog, { dadisputare: "yes" });
            questo.info.disputati = questo.backend.filterRows(questo.gara.matchesbyprog, { disputato: "yes" });
            questo.info.vinti = questo.backend.filterRows(questo.gara.matchesbyprog, { disputato: "yes", vinto: "yes" });
            questo.info.persi = questo.backend.filterRows(questo.gara.matchesbyprog, { disputato: "yes", vinto: "no" });
            questo.categoriecoperte = questo.getCategorieCoperte();
            console.log("questo.info", JSON.stringify(questo.info));
            if (callback)
                callback();
        });
    };
    GaraComponent.prototype.itemTap = function (item) {
        console.log("item", JSON.stringify(item));
    };
    GaraComponent.prototype.ngOnInit = function () {
        this._sideDrawerTransition = new sidedrawer_1.SlideInOnTopTransition();
        console.log("ngonoinit");
    };
    Object.defineProperty(GaraComponent.prototype, "sideDrawerTransition", {
        get: function () {
            return this._sideDrawerTransition;
        },
        enumerable: true,
        configurable: true
    });
    GaraComponent.prototype.onDrawerButtonTap = function () {
        this.drawerComponent.sideDrawer.showDrawer();
    };
    GaraComponent.prototype.getImg = function (m) {
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
        imgsrc = "~/images/" + imgsrc;
        return imgsrc;
    };
    GaraComponent.prototype.getImgPerAtleta = function (m) {
        var imgsrc = "matchtoplay.png";
        var medaglia = "none";
        m.matchesarray.forEach(function (item, idx) {
            if (item.medagliamatch != "none") {
                medaglia = item.medagliamatch;
            }
        });
        if (medaglia != "none")
            imgsrc = "medaglia_" + medaglia + ".png";
        imgsrc = "~/images/" + imgsrc;
        return imgsrc;
    };
    GaraComponent.prototype.getAtletaIscritto = function (i) {
        return this.backend.getAtletaById(i);
    };
    GaraComponent.prototype.gotoChat = function () {
        this.router.navigate(["/chat"]);
    };
    GaraComponent.prototype.navBack = function () {
        this.router.navigate(["/gara"]);
    };
    GaraComponent.prototype.getVintoPersoClass = function (item) {
        var retclass = "";
        var doc = item;
        if (item.hasOwnProperty("doc"))
            doc = item.doc;
        if (doc.dadisputare == "yes") {
            if (doc.disputato == "yes") {
                if (doc.vinto == "yes") {
                    retclass = "greenbold";
                }
                else
                    retclass = "redbold";
            }
            else
                retclass = "nondisputato";
        }
        else
            retclass = "danondisputare";
        return retclass + ' matchnum';
    };
    GaraComponent.prototype.getRisultatoText = function (item) {
        var retclass = "";
        if (item.doc.disputato == "yes") {
            if (item.doc.vinto == "yes") {
                retclass = "Vinto, risultato " + item.doc.risultato;
            }
            else
                retclass = "Perso, risultato " + item.doc.risultato;
        }
        else
            retclass = "Non disputato";
        return retclass;
    };
    GaraComponent.prototype.getRisultatoClass = function (item) {
        var retclass = "";
        if (item.doc.disputato == "yes") {
            if (item.doc.vinto == "yes") {
                retclass = "greenbold";
            }
            else
                retclass = "redbold";
        }
        else
            retclass = "nondisputato";
        return retclass;
    };
    GaraComponent.prototype.showMatchesForAtleta = function (garaid, atletaid) {
        var questo = this;
        var mpa = [];
        questo.gara.matchesbyprog.rows.forEach(function (item, idx) {
            if (item.doc.atletaid == atletaid)
                mpa.push(item);
        });
        var pars = {
            atletaid: atletaid
        };
        var navigationExtras = {
            queryParams: {
                parms: JSON.stringify(pars)
            }
        };
        this.router.navigate(["/matchesforatleta"], navigationExtras);
    };
    GaraComponent.prototype.viewInfo = function () {
        console.log("viewInfo tap");
        this.viewinfo = !this.viewinfo;
    };
    GaraComponent.prototype.getArrLen = function (m) {
        if (!m)
            return 0;
        var arr = m.split(",");
        var l = arr.length;
        if (m.trim() == "")
            l = 0;
        return l;
    };
    GaraComponent.prototype.getMaschiFemmine = function (m, sucosa) {
        return this.backend.getMaschiFemmine(m, sucosa);
    };
    GaraComponent.prototype.getCategorieCoperte = function (societa) {
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
            roz_1.sort(function (a, b) {
                var a1 = a.catcintura + a.cateta + a.catpeso + a.sesso;
                var b1 = b.catcintura + b.cateta + b.catpeso + b.sesso;
                if (a1 > b1)
                    return 1;
                if (a1 < b1)
                    return -1;
                return 0;
            });
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
            });
            var text = res.length + " categorie coperte con  " + roz_1.length + " atleti";
            console.log(text);
            res.forEach(function (ritem, ri) {
                var r = res[ri];
            });
            result.cats = res;
            result.text = text;
        }
        return result;
    };
    __decorate([
        core_1.ViewChild("drawer"),
        __metadata("design:type", angular_1.RadSideDrawerComponent)
    ], GaraComponent.prototype, "drawerComponent", void 0);
    GaraComponent = __decorate([
        core_1.Component({
            selector: "Gara",
            moduleId: module.id,
            templateUrl: "./gara.component_new2.html",
            styleUrls: ["./gara.component.css"]
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute, router_1.Router, backend_1.Backend])
    ], GaraComponent);
    return GaraComponent;
}());
exports.GaraComponent = GaraComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FyYS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJnYXJhLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUE2RDtBQUM3RCxpRUFBa0c7QUFDbEcsc0VBQW9GO0FBQ3BGLHdEQUF1RDtBQUN2RCwwQ0FBMkU7QUFDM0Usa0RBQWtFO0FBQ2xFLHNDQUF5QztBQU96QztJQXlDSSx1QkFBbUIsS0FBcUIsRUFBUyxNQUFjLEVBQVMsT0FBZ0I7UUFBeEYsaUJBd0JDO1FBeEJrQixVQUFLLEdBQUwsS0FBSyxDQUFnQjtRQUFTLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBUyxZQUFPLEdBQVAsT0FBTyxDQUFTO1FBbEN4RixnQkFBVyxHQUFHLENBQUMsV0FBVyxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDakUsVUFBSyxHQUFRO1lBQ1QsRUFBRSxFQUFFLEVBQUU7WUFDTixLQUFLLEVBQUUsRUFBRTtZQUNULFFBQVEsRUFBRSxFQUFFO1lBQ1osSUFBSSxFQUFFLEVBQUU7U0FDWCxDQUFDO1FBQ0YsU0FBSSxHQUFRO1lBQ1IsYUFBYSxFQUFFO2dCQUNYLElBQUksRUFBRSxFQUFFO2FBQ1g7WUFDRCxlQUFlLEVBQUU7Z0JBQ2IsSUFBSSxFQUFFLEVBQUU7YUFDWDtZQUNELE9BQU8sRUFBRTtnQkFDTCxJQUFJLEVBQUUsRUFBRTthQUNYO1NBQ0osQ0FBQztRQUNGLGlCQUFZLEdBQUcsRUFBRSxDQUFDO1FBQ2xCLGFBQVEsR0FBRyxFQUFFLENBQUM7UUFDZCxtQkFBYyxHQUFHLEVBQUUsQ0FBQztRQUNwQixXQUFNLEdBQUcsRUFBRSxDQUFDO1FBQ1osa0JBQWEsR0FBRyxXQUFXLENBQUM7UUFDNUIsWUFBTyxHQUFHLFdBQVcsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNoQyxZQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ2hCLGFBQVEsR0FBRyxLQUFLLENBQUM7UUFDakIs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QTtZQUMzRSxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2xCLEdBQUcsQ0FBQyxPQUFPLENBQUMsVUFBVSxLQUFLLEVBQUMsRUFBRTtnQkFDMUIsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBR3BCLENBQUMsQ0FBQyxDQUFBO1lBRUYsTUFBTSxDQUFDLElBQUksR0FBRyxHQUFHLENBQUM7WUFDbEIsTUFBTSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFJM0IsQ0FBQztRQUNELE1BQU0sQ0FBQyxNQUFNLENBQUM7SUFFbEIsQ0FBQztJQS9Yb0I7UUFBcEIsZ0JBQVMsQ0FBQyxRQUFRLENBQUM7a0NBQWtCLGdDQUFzQjswREFBQztJQUxwRCxhQUFhO1FBTnpCLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsTUFBTTtZQUNoQixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsV0FBVyxFQUFFLDRCQUE0QjtZQUN6QyxTQUFTLEVBQUUsQ0FBQyxzQkFBc0IsQ0FBQztTQUN0QyxDQUFDO3lDQTBDNEIsdUJBQWMsRUFBaUIsZUFBTSxFQUFrQixpQkFBTztPQXpDL0UsYUFBYSxDQXFZekI7SUFBRCxvQkFBQztDQUFBLEFBcllELElBcVlDO0FBcllZLHNDQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIFZpZXdDaGlsZCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IERyYXdlclRyYW5zaXRpb25CYXNlLCBTbGlkZUluT25Ub3BUcmFuc2l0aW9uIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC10ZWxlcmlrLXVpL3NpZGVkcmF3ZXJcIjtcclxuaW1wb3J0IHsgUmFkU2lkZURyYXdlckNvbXBvbmVudCB9IGZyb20gXCJuYXRpdmVzY3JpcHQtdGVsZXJpay11aS9zaWRlZHJhd2VyL2FuZ3VsYXJcIjtcclxuaW1wb3J0IHsgQmFja2VuZCB9IGZyb20gXCIuLi9wcm92aWRlcnMvYmFja2VuZC9iYWNrZW5kXCI7XHJcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlLCBSb3V0ZXIsIE5hdmlnYXRpb25FeHRyYXMgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XHJcbmltcG9ydCB7IFNlZ21lbnRlZEJhciwgU2VnbWVudGVkQmFySXRlbSB9IGZyb20gXCJ1aS9zZWdtZW50ZWQtYmFyXCI7XHJcbmltcG9ydCBmcmFtZU1vZHVsZSA9IHJlcXVpcmUoXCJ1aS9mcmFtZVwiKTtcclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogXCJHYXJhXCIsXHJcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxyXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9nYXJhLmNvbXBvbmVudF9uZXcyLmh0bWxcIixcclxuICAgIHN0eWxlVXJsczogW1wiLi9nYXJhLmNvbXBvbmVudC5jc3NcIl1cclxufSlcclxuZXhwb3J0IGNsYXNzIEdhcmFDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gICAgLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICAgICogVXNlIHRoZSBAVmlld0NoaWxkIGRlY29yYXRvciB0byBnZXQgYSByZWZlcmVuY2UgdG8gdGhlIGRyYXdlciBjb21wb25lbnQuXHJcbiAgICAqIEl0IGlzIHVzZWQgaW4gdGhlIFwib25EcmF3ZXJCdXR0b25UYXBcIiBmdW5jdGlvbiBiZWxvdyB0byBtYW5pcHVsYXRlIHRoZSBkcmF3ZXIuXHJcbiAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG4gICAgQFZpZXdDaGlsZChcImRyYXdlclwiKSBkcmF3ZXJDb21wb25lbnQ6IFJhZFNpZGVEcmF3ZXJDb21wb25lbnQ7XHJcbiAgICBteXNlZ21lbnRzOiBBcnJheTxTZWdtZW50ZWRCYXJJdGVtPjtcclxuICAgIHNlZ21lbnRzYXJyID0gW1wiUGVyIE1hdGNoXCIsIFwiUGVyIEF0bGV0YVwiLCBcIkNyb25hY2FcIiwgXCJJc2NyaXR0aVwiXTtcclxuICAgIGpnYXJhOiBhbnkgPSB7XHJcbiAgICAgICAgaWQ6IFwiXCIsXHJcbiAgICAgICAgdGl0bGU6IFwiXCIsXHJcbiAgICAgICAgbG9jYXRpb246IFwiXCIsXHJcbiAgICAgICAgZGF0YTogXCJcIlxyXG4gICAgfTtcclxuICAgIGdhcmE6IGFueSA9IHtcclxuICAgICAgICBtYXRjaGVzYnlwcm9nOiB7XHJcbiAgICAgICAgICAgIHJvd3M6IFtdXHJcbiAgICAgICAgfSxcclxuICAgICAgICBtYXRjaGVzYnlhdGxldGE6IHtcclxuICAgICAgICAgICAgcm93czogW11cclxuICAgICAgICB9LFxyXG4gICAgICAgIGNyb25hY2E6IHtcclxuICAgICAgICAgICAgcm93czogW11cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgZGlzcGxheWVkbWJwID0gW107XHJcbiAgICBpc2NyaXR0aSA9IFtdO1xyXG4gICAgYXRsZXRpaXNjcml0dGkgPSBbXTtcclxuICAgIGdhcmFpZCA9IFwiXCI7XHJcbiAgICBhY3RpdmVzZWdtZW50ID0gXCJQZXIgTWF0Y2hcIjtcclxuICAgIHRvcG1vc3QgPSBmcmFtZU1vZHVsZS50b3Btb3N0KCk7XHJcbiAgICBsb2FkaW5nID0gZmFsc2U7XHJcbiAgICB2aWV3aW5mbyA9IGZhbHNlO1xyXG4gICAgaW5mbzogYW55ID0ge1xyXG5cclxuICAgIH1cclxuICAgIGNhdGVnb3JpZWNvcGVydGU6YW55PXt9O1xyXG5cclxuXHJcbiAgICBwcml2YXRlIF9zaWRlRHJhd2VyVHJhbnNpdGlvbjogRHJhd2VyVHJhbnNpdGlvbkJhc2U7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHVibGljIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSwgcHVibGljIHJvdXRlcjogUm91dGVyLCBwdWJsaWMgYmFja2VuZDogQmFja2VuZCkge1xyXG4gICAgICAgIHZhciBxdWVzdG89dGhpcztcclxuICAgICAgICB0aGlzLnJvdXRlLnF1ZXJ5UGFyYW1zLnN1YnNjcmliZShwYXJhbXMgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInBhcmFtc1wiLCBKU09OLnN0cmluZ2lmeShwYXJhbXMpKTtcclxuICAgICAgICAgICAgdGhpcy5nYXJhaWQgPSBwYXJhbXMuaWQ7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZ2FyYWlkXCIsIHRoaXMuZ2FyYWlkKTtcclxuICAgICAgICAgICAgcXVlc3RvLmxvYWRpbmc9dHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5yZWZyZXNoKGZ1bmN0aW9uIChkYXRhKSB7IFxyXG4gICAgICAgICAgICAgICAgcXVlc3RvLmxvYWRpbmc9ZmFsc2U7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5teXNlZ21lbnRzID0gW107XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5zZWdtZW50c2Fyci5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBjb25zdCBpdGVtID0gbmV3IFNlZ21lbnRlZEJhckl0ZW0oKTtcclxuICAgICAgICAgICAgaXRlbS50aXRsZSA9IHRoaXMuc2VnbWVudHNhcnJbaV07XHJcbiAgICAgICAgICAgIHRoaXMubXlzZWdtZW50cy5wdXNoKGl0ZW0pO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG5cclxuXHJcbiAgICB9XHJcblxyXG4gICAgb25TZWxlY3RlZFNlZ21lbnRDaGFuZ2UoZXYpIHtcclxuICAgICAgICBsZXQgc2JhciA9IDxTZWdtZW50ZWRCYXI+ZXYub2JqZWN0O1xyXG4gICAgICAgIHRoaXMuYWN0aXZlc2VnbWVudCA9IHRoaXMuc2VnbWVudHNhcnJbc2Jhci5zZWxlY3RlZEluZGV4XTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImFjdGl2ZXNlZ21lbnRcIiwgdGhpcy5hY3RpdmVzZWdtZW50KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWxsUmVmcmVzaCgpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcInB1bGxyZWZyZXNoXCIpO1xyXG4gICAgICAgIHZhciBxdWVzdG8gPSB0aGlzO1xyXG4gICAgICAgIHF1ZXN0by5sb2FkaW5nID0gdHJ1ZTtcclxuICAgICAgICBxdWVzdG8ucmVmcmVzaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicmVmcmVzaGVkXCIpO1xyXG4gICAgICAgICAgICBxdWVzdG8ubG9hZGluZyA9IGZhbHNlO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG5cclxuICAgIHJlZnJlc2goY2FsbGJhY2spIHtcclxuICAgICAgICB2YXIgcXVlc3RvID0gdGhpcztcclxuICAgICAgICB2YXIgdXJsID0gcXVlc3RvLmJhY2tlbmQucm9vdHVybCArIFwiL2dhcmUvZnVsbGdhcmFieWlkL1wiICsgdGhpcy5nYXJhaWQgKyBcIj9zb2NpZXRhaWQ9MjAxNjAyMTcyMjA0MDBcIjtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImNhbGxpbmcgdXJsXCIsIHVybCk7XHJcbiAgICAgICAgcXVlc3RvLmJhY2tlbmQuZmV0Y2hEYXRhKHVybCwgZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgcXVlc3RvLmdhcmEgPSBkYXRhO1xyXG4gICAgICAgICAgICBxdWVzdG8uYmFja2VuZC5hY3RpdmVnYXJhID0gZGF0YTtcclxuICAgICAgICAgICAgcXVlc3RvLmpnYXJhID0gcXVlc3RvLmJhY2tlbmQuYWN0aXZlZ2FyYS5nYXJhLnJvd3NbMF0uZG9jO1xyXG4gICAgICAgICAgICBxdWVzdG8uZGlzcGxheWVkbWJwID0gW107XHJcbiAgICAgICAgICAgIHF1ZXN0by5nYXJhLm1hdGNoZXNieXByb2cucm93cy5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtLCBpZHgpIHtcclxuICAgICAgICAgICAgICAgIGlmIChpdGVtLmRvYy5kYWRpc3B1dGFyZSA9PSAneWVzJykgcXVlc3RvLmRpc3BsYXllZG1icC5wdXNoKGl0ZW0pO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImRpc3BsYXllZG1icFwiLCBxdWVzdG8uZGlzcGxheWVkbWJwLmxlbmd0aCk7XHJcblxyXG4gICAgICAgICAgICBxdWVzdG8uaXNjcml0dGkgPSBxdWVzdG8uZ2FyYS5nYXJhLnJvd3NbMF0uZG9jLmlzY3JpdHRpLnNwbGl0KFwiLFwiKTtcclxuXHJcbiAgICAgICAgICAgIHF1ZXN0by5pc2NyaXR0aS5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtLCBpZHgpIHtcclxuICAgICAgICAgICAgICAgIHZhciBhdGwgPSBxdWVzdG8uZ2V0QXRsZXRhSXNjcml0dG8oaXRlbSk7XHJcbiAgICAgICAgICAgICAgICBxdWVzdG8uYXRsZXRpaXNjcml0dGkucHVzaChhdGwpO1xyXG5cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgcXVlc3RvLmF0bGV0aWlzY3JpdHRpLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHtcclxuICAgICAgICAgICAgICAgIHZhciBhMSA9IGEuY29nbm9tZSArIGEubm9tZTtcclxuICAgICAgICAgICAgICAgIHZhciBiMSA9IGIuY29nbm9tZSArIGIubm9tZTtcclxuICAgICAgICAgICAgICAgIGlmIChhMSA+IGIxKSByZXR1cm4gMTtcclxuICAgICAgICAgICAgICAgIGlmIChhMSA8IGIxKSByZXR1cm4gLTE7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZ2FyYVwiLCBxdWVzdG8uZ2FyYS5tYXRjaGVzYnlwcm9nLnJvd3MubGVuZ3RoKTtcclxuXHJcblxyXG4gICAgICAgICAgICBxdWVzdG8uaW5mby5kYWRpc3B1dGFyZT1xdWVzdG8uYmFja2VuZC5maWx0ZXJSb3dzKHF1ZXN0by5nYXJhLm1hdGNoZXNieXByb2cseyBkYWRpc3B1dGFyZTogXCJ5ZXNcIn0pO1xyXG4gICAgICAgICAgICBxdWVzdG8uaW5mby5kaXNwdXRhdGk9cXVlc3RvLmJhY2tlbmQuZmlsdGVyUm93cyhxdWVzdG8uZ2FyYS5tYXRjaGVzYnlwcm9nLHsgZGlzcHV0YXRvOiBcInllc1wifSk7XHJcbiAgICAgICAgICAgIHF1ZXN0by5pbmZvLnZpbnRpPXF1ZXN0by5iYWNrZW5kLmZpbHRlclJvd3MocXVlc3RvLmdhcmEubWF0Y2hlc2J5cHJvZyx7IGRpc3B1dGF0bzogXCJ5ZXNcIiwgdmludG86IFwieWVzXCJ9KTtcclxuICAgICAgICAgICAgcXVlc3RvLmluZm8ucGVyc2k9cXVlc3RvLmJhY2tlbmQuZmlsdGVyUm93cyhxdWVzdG8uZ2FyYS5tYXRjaGVzYnlwcm9nLHsgZGlzcHV0YXRvOiBcInllc1wiLCB2aW50bzogXCJub1wifSk7XHJcbiAgICAgICAgICAgIHF1ZXN0by5jYXRlZ29yaWVjb3BlcnRlPXF1ZXN0by5nZXRDYXRlZ29yaWVDb3BlcnRlKCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicXVlc3RvLmluZm9cIixKU09OLnN0cmluZ2lmeShxdWVzdG8uaW5mbykpO1xyXG4gICAgICAgICAgICBpZiAoY2FsbGJhY2spIGNhbGxiYWNrKCk7XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICB9XHJcblxyXG4gICAgaXRlbVRhcChpdGVtKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJpdGVtXCIsIEpTT04uc3RyaW5naWZ5KGl0ZW0pKTtcclxuICAgIH1cclxuXHJcbiAgICAvKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gICAgKiBVc2UgdGhlIHNpZGVEcmF3ZXJUcmFuc2l0aW9uIHByb3BlcnR5IHRvIGNoYW5nZSB0aGUgb3Blbi9jbG9zZSBhbmltYXRpb24gb2YgdGhlIGRyYXdlci5cclxuICAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9zaWRlRHJhd2VyVHJhbnNpdGlvbiA9IG5ldyBTbGlkZUluT25Ub3BUcmFuc2l0aW9uKCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJuZ29ub2luaXRcIilcclxuXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHNpZGVEcmF3ZXJUcmFuc2l0aW9uKCk6IERyYXdlclRyYW5zaXRpb25CYXNlIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc2lkZURyYXdlclRyYW5zaXRpb247XHJcbiAgICB9XHJcblxyXG4gICAgLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICAgICogQWNjb3JkaW5nIHRvIGd1aWRlbGluZXMsIGlmIHlvdSBoYXZlIGEgZHJhd2VyIG9uIHlvdXIgcGFnZSwgeW91IHNob3VsZCBhbHdheXNcclxuICAgICogaGF2ZSBhIGJ1dHRvbiB0aGF0IG9wZW5zIGl0LiBVc2UgdGhlIHNob3dEcmF3ZXIoKSBmdW5jdGlvbiB0byBvcGVuIHRoZSBhcHAgZHJhd2VyIHNlY3Rpb24uXHJcbiAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG4gICAgb25EcmF3ZXJCdXR0b25UYXAoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5kcmF3ZXJDb21wb25lbnQuc2lkZURyYXdlci5zaG93RHJhd2VyKCk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGdldEltZyhtKSB7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcImdldEltZ1wiLCBtKTtcclxuICAgICAgICB2YXIgaW1nc3JjOiBTdHJpbmcgPSBcIm1hdGNodG9wbGF5LnBuZ1wiO1xyXG4gICAgICAgIGlmIChtLmRvYy5kaXNwdXRhdG8gPT0gXCJ5ZXNcIikge1xyXG5cclxuICAgICAgICAgICAgaW1nc3JjID0gXCJtYXRjaGtvLnBuZ1wiO1xyXG4gICAgICAgICAgICBpZiAobS5kb2MudmludG8gPT0gXCJ5ZXNcIikgaW1nc3JjID0gXCJtYXRjaG9rLnBuZ1wiO1xyXG4gICAgICAgICAgICBpZiAobS5kb2MubWVkYWdsaWFtYXRjaCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKG0uZG9jLm1lZGFnbGlhbWF0Y2ggIT0gXCJub25lXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBpbWdzcmMgPSBcIm1lZGFnbGlhX1wiICsgbS5kb2MubWVkYWdsaWFtYXRjaCArIFwiLnBuZ1wiO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAobS5kb2MucmVhbHRpbWUpIHtcclxuICAgICAgICAgICAgaWYgKFN0cmluZyhtLmRvYy5yZWFsdGltZSkgPT0gXCJ0cnVlXCIpIGltZ3NyYyA9IFwiZ3JlZW5ibGluay5naWZcIjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGltZ3NyYyA9IFwifi9pbWFnZXMvXCIgKyBpbWdzcmM7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcImltZ3NyY1wiLCBpbWdzcmMpO1xyXG4gICAgICAgIHJldHVybiBpbWdzcmM7XHJcblxyXG5cclxuXHJcbiAgICB9XHJcblxyXG5cclxuICAgIGdldEltZ1BlckF0bGV0YShtKSB7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcImdldEltZ1BlckF0bGV0YVwiLCBtKTtcclxuICAgICAgICB2YXIgaW1nc3JjOiBTdHJpbmcgPSBcIm1hdGNodG9wbGF5LnBuZ1wiO1xyXG4gICAgICAgIHZhciBtZWRhZ2xpYSA9IFwibm9uZVwiO1xyXG4gICAgICAgIG0ubWF0Y2hlc2FycmF5LmZvckVhY2goZnVuY3Rpb24gKGl0ZW0sIGlkeCkge1xyXG5cclxuICAgICAgICAgICAgaWYgKGl0ZW0ubWVkYWdsaWFtYXRjaCAhPSBcIm5vbmVcIikge1xyXG4gICAgICAgICAgICAgICAgbWVkYWdsaWEgPSBpdGVtLm1lZGFnbGlhbWF0Y2g7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAobWVkYWdsaWEgIT0gXCJub25lXCIpIGltZ3NyYyA9IFwibWVkYWdsaWFfXCIgKyBtZWRhZ2xpYSArIFwiLnBuZ1wiO1xyXG5cclxuXHJcbiAgICAgICAgaW1nc3JjID0gXCJ+L2ltYWdlcy9cIiArIGltZ3NyYztcclxuICAgICAgICAvL2NvbnNvbGUubG9nKFwiaW1nc3JjXCIsIGltZ3NyYyk7XHJcbiAgICAgICAgcmV0dXJuIGltZ3NyYztcclxuXHJcblxyXG5cclxuICAgIH1cclxuXHJcbiAgICBnZXRBdGxldGFJc2NyaXR0byhpKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYmFja2VuZC5nZXRBdGxldGFCeUlkKGkpO1xyXG4gICAgfVxyXG5cclxuICAgIGdvdG9DaGF0KCkge1xyXG5cclxuXHJcblxyXG4gICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcIi9jaGF0XCJdKTtcclxuICAgIH1cclxuXHJcbiAgICBuYXZCYWNrKCl7XHJcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1wiL2dhcmFcIl0pO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFZpbnRvUGVyc29DbGFzcyhpdGVtKSB7XHJcbiAgICAgICAgdmFyIHJldGNsYXNzID0gXCJcIjtcclxuICAgICAgICB2YXIgZG9jID0gaXRlbTtcclxuICAgICAgICBpZiAoaXRlbS5oYXNPd25Qcm9wZXJ0eShcImRvY1wiKSkgZG9jID0gaXRlbS5kb2M7XHJcbiAgICAgICAgaWYgKGRvYy5kYWRpc3B1dGFyZSA9PSBcInllc1wiKSB7XHJcbiAgICAgICAgICAgIGlmIChkb2MuZGlzcHV0YXRvID09IFwieWVzXCIpIHtcclxuICAgICAgICAgICAgICAgIGlmIChkb2MudmludG8gPT0gXCJ5ZXNcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldGNsYXNzID0gXCJncmVlbmJvbGRcIjtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSByZXRjbGFzcyA9IFwicmVkYm9sZFwiO1xyXG4gICAgICAgICAgICB9IGVsc2UgcmV0Y2xhc3MgPSBcIm5vbmRpc3B1dGF0b1wiO1xyXG4gICAgICAgIH0gZWxzZSByZXRjbGFzcyA9IFwiZGFub25kaXNwdXRhcmVcIjtcclxuICAgICAgICByZXR1cm4gcmV0Y2xhc3MgKyAnIG1hdGNobnVtJztcclxuICAgIH1cclxuXHJcbiAgICBnZXRSaXN1bHRhdG9UZXh0KGl0ZW0pIHtcclxuICAgICAgICB2YXIgcmV0Y2xhc3MgPSBcIlwiO1xyXG4gICAgICAgIGlmIChpdGVtLmRvYy5kaXNwdXRhdG8gPT0gXCJ5ZXNcIikge1xyXG4gICAgICAgICAgICBpZiAoaXRlbS5kb2MudmludG8gPT0gXCJ5ZXNcIikge1xyXG4gICAgICAgICAgICAgICAgcmV0Y2xhc3MgPSBcIlZpbnRvLCByaXN1bHRhdG8gXCIgKyBpdGVtLmRvYy5yaXN1bHRhdG87XHJcbiAgICAgICAgICAgIH0gZWxzZSByZXRjbGFzcyA9IFwiUGVyc28sIHJpc3VsdGF0byBcIiArIGl0ZW0uZG9jLnJpc3VsdGF0bztcclxuICAgICAgICB9IGVsc2UgcmV0Y2xhc3MgPSBcIk5vbiBkaXNwdXRhdG9cIjtcclxuICAgICAgICByZXR1cm4gcmV0Y2xhc3M7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0UmlzdWx0YXRvQ2xhc3MoaXRlbSkge1xyXG4gICAgICAgIHZhciByZXRjbGFzcyA9IFwiXCI7XHJcbiAgICAgICAgaWYgKGl0ZW0uZG9jLmRpc3B1dGF0byA9PSBcInllc1wiKSB7XHJcbiAgICAgICAgICAgIGlmIChpdGVtLmRvYy52aW50byA9PSBcInllc1wiKSB7XHJcbiAgICAgICAgICAgICAgICByZXRjbGFzcyA9IFwiZ3JlZW5ib2xkXCI7XHJcbiAgICAgICAgICAgIH0gZWxzZSByZXRjbGFzcyA9IFwicmVkYm9sZFwiO1xyXG4gICAgICAgIH0gZWxzZSByZXRjbGFzcyA9IFwibm9uZGlzcHV0YXRvXCI7XHJcbiAgICAgICAgcmV0dXJuIHJldGNsYXNzO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBzaG93TWF0Y2hlc0ZvckF0bGV0YShnYXJhaWQsIGF0bGV0YWlkKSB7XHJcbiAgICAgICAgdmFyIHF1ZXN0byA9IHRoaXM7XHJcblxyXG4gICAgICAgIHZhciBtcGEgPSBbXTtcclxuXHJcbiAgICAgICAgcXVlc3RvLmdhcmEubWF0Y2hlc2J5cHJvZy5yb3dzLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0sIGlkeCkge1xyXG4gICAgICAgICAgICBpZiAoaXRlbS5kb2MuYXRsZXRhaWQgPT0gYXRsZXRhaWQpIG1wYS5wdXNoKGl0ZW0pO1xyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIHZhciBwYXJzID0ge1xyXG4gICAgICAgICAgICBhdGxldGFpZDogYXRsZXRhaWRcclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgbmF2aWdhdGlvbkV4dHJhczogTmF2aWdhdGlvbkV4dHJhcyA9IHtcclxuICAgICAgICAgICAgcXVlcnlQYXJhbXM6IHtcclxuICAgICAgICAgICAgICAgIHBhcm1zOiBKU09OLnN0cmluZ2lmeShwYXJzKVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vY29uc29sZS5sb2coXCJxdWVyeVBhcmFtc1wiLG5hdmlnYXRpb25FeHRyYXMucXVlcnlQYXJhbXMucGFybXMpO1xyXG4gICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcIi9tYXRjaGVzZm9yYXRsZXRhXCJdLCBuYXZpZ2F0aW9uRXh0cmFzKTtcclxuICAgIH1cclxuXHJcbiAgICB2aWV3SW5mbygpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcInZpZXdJbmZvIHRhcFwiKTtcclxuICAgICAgICB0aGlzLnZpZXdpbmZvID0gIXRoaXMudmlld2luZm87XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0QXJyTGVuKG0pIHtcclxuXHJcbiAgICAgICAgaWYgKCFtKSByZXR1cm4gMDtcclxuXHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcIm1cIixtKTtcclxuXHJcbiAgICAgICAgdmFyIGFyciA9IG0uc3BsaXQoXCIsXCIpO1xyXG4gICAgICAgIHZhciBsID0gYXJyLmxlbmd0aDtcclxuICAgICAgICBpZiAobS50cmltKCkgPT0gXCJcIikgbCA9IDA7XHJcbiAgICAgICAgcmV0dXJuIGw7XHJcblxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBnZXRNYXNjaGlGZW1taW5lKG0sIHN1Y29zYT86IGFueSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmJhY2tlbmQuZ2V0TWFzY2hpRmVtbWluZShtLCBzdWNvc2EpO1xyXG4gICAgfVxyXG5cclxuXHJcblxyXG4gIGdldENhdGVnb3JpZUNvcGVydGUoc29jaWV0YT86IGFueSkge1xyXG4gICAgdmFyIHF1ZXN0bz10aGlzO1xyXG4gICAgXHJcbiAgICAgICAgaWYgKCFzb2NpZXRhKSBzb2NpZXRhID0gXCJBLlMuRC4gVEFFS1dPTkRPIFJPWlpBTk9cIjtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImdldENhdGVnb3JpZUNvcGVydGVcIixzb2NpZXRhLHF1ZXN0by5qZ2FyYSk7XHJcbiAgICBcclxuICAgICAgICB2YXIgcmVzdWx0ID0ge1xyXG4gICAgICAgICAgICBjYXRzOiBbXSxcclxuICAgICAgICAgICAgdGV4dDogXCJEYXRpIHVmZmljaWFsaSBjYXRlZ29yaWUgbm9uIGRpc3BvbmliaWxpXCJcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFxdWVzdG8uamdhcmEuaGFzT3duUHJvcGVydHkoXCJ0a2R0XCIpKSByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgIGlmIChxdWVzdG8uamdhcmEpIHtcclxuICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgIHZhciBnYXJhZG9jID0gcXVlc3RvLmpnYXJhO1xyXG4gICAgICAgICAgICAgICAgdmFyIHRrZHRpc2NyaXR0aSA9IGdhcmFkb2MudGtkdC5hdGxldGk7XHJcbiAgICAgICAgICAgICAgICBpZiAodGtkdGlzY3JpdHRpLmxlbmd0aCA9PSAwKSB0a2R0aXNjcml0dGkgPSBnYXJhZG9jLnRrZHQuYXRsZXRpX2lzY3JpdHRpO1xyXG4gICAgXHJcbiAgICAgICAgICAgICAgICBsZXQgcm96OmFueSA9IHF1ZXN0by5iYWNrZW5kLmZpbHRlckFycmF5KHRrZHRpc2NyaXR0aSwge1xyXG4gICAgICAgICAgICAgICAgICAgIHNvY2lldGE6IHNvY2lldGFcclxuICAgICAgICAgICAgICAgIH0sIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZygkcm96KTtcclxuICAgIFxyXG4gICAgICAgICAgICAgICAgLy9zb3J0IGJ5IGNhdGVnb3JpYVxyXG4gICAgXHJcbiAgICAgICAgICAgICAgICByb3ouc29ydChmdW5jdGlvbiAoYSwgYikge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBhMSA9IGEuY2F0Y2ludHVyYSArIGEuY2F0ZXRhICsgYS5jYXRwZXNvICsgYS5zZXNzbztcclxuICAgICAgICAgICAgICAgICAgICB2YXIgYjEgPSBiLmNhdGNpbnR1cmEgKyBiLmNhdGV0YSArIGIuY2F0cGVzbyArIGIuc2Vzc287XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGExID4gYjEpIHJldHVybiAxO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChhMSA8IGIxKSByZXR1cm4gLTE7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICBcclxuICAgIFxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgIFxyXG4gICAgICAgICAgICAgICAgLy9zY2FuIGNhdGVnb3JpZVxyXG4gICAgICAgICAgICAgICAgdmFyIGNhdCA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICB2YXIgY2F0Y291bnQgPSAwO1xyXG4gICAgICAgICAgICAgICAgdmFyIHJlczphbnkgPSBbXTtcclxuICAgICAgICAgICAgICAgIHJvei5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtLGkpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgYXRsID0gcm96W2ldO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBjYXRldGEgPSBhdGwuY2F0ZXRhO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBjYXRwZXNvID0gYXRsLmNhdHBlc287XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNhdGNpbnR1cmEgPSBhdGwuY2F0Y2ludHVyYTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgc2Vzc28gPSBhdGwuc2Vzc287XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNhdHggPSBjYXRjaW50dXJhICsgY2F0ZXRhICsgY2F0cGVzbyArIHNlc3NvO1xyXG4gICAgXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNhdHggIT0gY2F0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vY291bnQgPSAwO1xyXG4gICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBuZXdjYXQgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXRldGE6IGNhdGV0YSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhdHBlc286IGNhdHBlc28sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXRjaW50dXJhOiBjYXRjaW50dXJhLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2Vzc286IHNlc3NvLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXRsZXRpOiBbXVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzLnB1c2gobmV3Y2F0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2F0Y291bnQrKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2F0ID0gY2F0eDtcclxuICAgIFxyXG4gICAgXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBsYXN0cmVzID0gcmVzW3Jlcy5sZW5ndGggLSAxXTtcclxuICAgICAgICAgICAgICAgICAgICBsYXN0cmVzLmF0bGV0aS5wdXNoKGF0bClcclxuICAgICAgICAgICAgICAgICAgICAvL2NvdW50Kys7XHJcbiAgICBcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICBcclxuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2cocmVzKTtcclxuICAgIFxyXG4gICAgICAgICAgICAgICAgdmFyIHRleHQgPSByZXMubGVuZ3RoICsgXCIgY2F0ZWdvcmllIGNvcGVydGUgY29uICBcIiArIHJvei5sZW5ndGggKyBcIiBhdGxldGlcIlxyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codGV4dCk7XHJcbiAgICAgICAgICAgICAgICByZXMuZm9yRWFjaChmdW5jdGlvbiAocml0ZW0scmkpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgciA9IHJlc1tyaV07XHJcbiAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhyLnNlc3NvK1wiIC0gXCIrci5jYXRldGErXCIgLSBcIityLmNhdGNpbnR1cmErXCIgLSBcIityLmNhdHBlc28rXCI6IFwiK3IuYXRsZXRpLmxlbmd0aCtcIiBhdGxldGlcIik7XHJcbiAgICBcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICBcclxuICAgICAgICAgICAgICAgIHJlc3VsdC5jYXRzID0gcmVzO1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0LnRleHQgPSB0ZXh0O1xyXG4gICAgXHJcbiAgICAgICAgICAgXHJcbiAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIFxyXG4gICAgfVxyXG59XHJcbiJdfQ==