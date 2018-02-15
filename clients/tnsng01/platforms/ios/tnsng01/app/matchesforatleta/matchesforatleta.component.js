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
var frameModule = require("ui/frame");
var MatchesforatletaComponent = (function () {
    function MatchesforatletaComponent(route, router, backend) {
        this.route = route;
        this.router = router;
        this.backend = backend;
        this.pagetitle = "";
        this.jgara = {
            title: "",
            location: ""
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
        this.mpa = [];
        this.displayedmbp = [];
        this.iscritti = [];
        this.atletiiscritti = [];
        this.garaid = "";
        this.activesegment = "Per Match";
        this.topmost = frameModule.topmost();
        this.atl = {};
        this.atletaid = "";
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
        this.atleta = {};
        var questo = this;
        this.route.queryParams.subscribe(function (params) {
            var parms = params.parms;
            var jparms = JSON.parse(parms);
            questo.atletaid = jparms.atletaid;
            questo.atl = questo.backend.getAtletaById(questo.atletaid);
            questo.pagetitle = "Incontri per " + questo.atl.cognome + " " + questo.atl.nome;
        });
    }
    MatchesforatletaComponent.prototype.refresh = function (callback) {
        var questo = this;
        var url = questo.backend.rooturl + "/gare/fullgarabyid/" + this.garaid + "?societaid=20160217220400";
        console.log("calling url", url);
        questo.backend.fetchData(url, function (data) {
            questo.backend.activegara = data;
            questo.jgara = questo.backend.activegara.gara.rows[0].doc;
            questo.displayedmbp = [];
            questo.backend.activegara.matchesbyprog.rows.forEach(function (item, idx) {
                if (item.doc.dadisputare == 'yes')
                    questo.displayedmbp.push(item);
            });
            console.log("displayedmbp", questo.displayedmbp.length);
            questo.iscritti = questo.backend.activegara.gara.rows[0].doc.iscritti.split(",");
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
            console.log("gara", questo.backend.activegara.matchesbyprog.rows.length);
            questo.atleta = questo.backend.getAtletaById(questo.atletaid);
            var cat = questo.getCategoria(questo.atleta.datanascita);
            questo.tkdtatleta = questo.backend.getTkdtAtleta(questo.atleta);
            questo.avversari = questo.backend.getTkdtAtletiCategoria(questo.tkdtatleta.cateta, questo.tkdtatleta.catcintura, questo.tkdtatleta.catpeso, questo.tkdtatleta.sesso);
            for (var k in questo.tkdtatleta) {
                if (questo.tkdtatleta.hasOwnProperty(k)) {
                    var newel = {
                        name: k,
                        value: questo.tkdtatleta[k]
                    };
                    questo.tkdtatletaarr.push(newel);
                }
            }
            console.log("tkdtatleta", questo.tkdtatleta);
            console.log("avversari", questo.avversari);
        });
    };
    MatchesforatletaComponent.prototype.itemTap = function (item) {
        console.log("item", JSON.stringify(item));
    };
    MatchesforatletaComponent.prototype.getCategoria = function (dn) {
        var questo = this;
        return this.backend.getCategoria(dn, questo.backend.activegara.gara.rows[0].doc.data);
    };
    MatchesforatletaComponent.prototype.ngOnInit = function () {
        var questo = this;
        this._sideDrawerTransition = new sidedrawer_1.SlideInOnTopTransition();
        console.log("ngonoinit");
        questo.displayedmbp = [];
        questo.backend.activegara.matchesbyprog.rows.forEach(function (item, idx) {
            if (item.doc.dadisputare == 'yes')
                questo.displayedmbp.push(item);
        });
        console.log("displayedmbp", questo.displayedmbp.length);
        questo.iscritti = questo.backend.activegara.gara.rows[0].doc.iscritti.split(",");
        console.log("iscritti", questo.iscritti);
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
        questo.mpa = [];
        questo.backend.activegara.matchesbyprog.rows.forEach(function (item, idx) {
            var atlid = item.doc.atletaid;
            if (atlid == questo.atletaid)
                questo.mpa.push(item);
        });
        console.log("gara", questo.backend.activegara.matchesbyprog.rows.length);
        questo.atleta = questo.backend.getAtletaById(questo.atletaid);
        var cat = questo.getCategoria(questo.atleta.datanascita);
        questo.tkdtatleta = questo.backend.getTkdtAtleta(questo.atleta);
        questo.avversari = questo.backend.getTkdtAtletiCategoria(questo.tkdtatleta.cateta, questo.tkdtatleta.catcintura, questo.tkdtatleta.catpeso, questo.tkdtatleta.sesso);
        questo.tabulato = questo.backend.getTkdtTabulatiCategoria(questo.tkdtatleta.cateta, questo.tkdtatleta.catcintura, questo.tkdtatleta.catpeso, questo.tkdtatleta.sesso);
        console.log("tabulato", JSON.stringify(questo.tabulato));
        for (var k in questo.tkdtatleta) {
            if (questo.tkdtatleta.hasOwnProperty(k)) {
                var newel = {
                    name: k,
                    value: questo.tkdtatleta[k]
                };
                questo.tkdtatletaarr.push(newel);
            }
        }
        var hastabulato = true;
        for (var kk in questo.tabulato) {
            if (questo.tabulato.hasOwnProperty(kk)) {
                if (questo.tabulato[kk] == "--")
                    hastabulato = hastabulato && false;
            }
        }
        console.log("hastabulato", hastabulato);
        if (hastabulato) {
            questo.backend.getTabulatoImg(questo.tabulato.oldhref, function (data) {
                console.log("tabulato image", data);
                questo.tabulatoimg = data;
            });
        }
        console.log("tkdtatleta", JSON.stringify(questo.tkdtatleta));
        console.log("tkdtatletaarr", JSON.stringify(questo.tkdtatletaarr));
        console.log("avversari", questo.avversari.length);
    };
    Object.defineProperty(MatchesforatletaComponent.prototype, "sideDrawerTransition", {
        get: function () {
            return this._sideDrawerTransition;
        },
        enumerable: true,
        configurable: true
    });
    MatchesforatletaComponent.prototype.onDrawerButtonTap = function () {
        this.drawerComponent.sideDrawer.showDrawer();
    };
    MatchesforatletaComponent.prototype.getImg = function (m) {
        var doc = m;
        if (m.hasOwnProperty("doc"))
            doc = m.doc;
        var imgsrc = "matchtoplay.png";
        if (doc.disputato == "yes") {
            imgsrc = "matchko.png";
            if (doc.vinto == "yes")
                imgsrc = "matchok.png";
            if (doc.medagliamatch) {
                if (doc.medagliamatch != "none") {
                    imgsrc = "medaglia_" + doc.medagliamatch + ".png";
                }
            }
        }
        if (doc.realtime) {
            if (String(doc.realtime) == "true")
                imgsrc = "greenblink.gif";
        }
        imgsrc = "~/images/" + imgsrc;
        return imgsrc;
    };
    MatchesforatletaComponent.prototype.getImgPerAtleta = function (m) {
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
    MatchesforatletaComponent.prototype.getAtletaIscritto = function (i) {
        return this.backend.getAtletaById(i);
    };
    MatchesforatletaComponent.prototype.gotoChat = function () {
        this.router.navigate(["/chat"]);
    };
    MatchesforatletaComponent.prototype.getVintoPersoClass = function (item) {
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
    MatchesforatletaComponent.prototype.getRisultatoText = function (item) {
        var retclass = "";
        var doc = item;
        if (item.hasOwnProperty("doc"))
            doc = item.doc;
        if (doc.disputato == "yes") {
            if (doc.vinto == "yes") {
                retclass = "Vinto, risultato " + item.doc.risultato;
            }
            else
                retclass = "Perso, risultato " + item.doc.risultato;
        }
        else
            retclass = "Non disputato";
        return retclass;
    };
    MatchesforatletaComponent.prototype.getRisultatoClass = function (item) {
        var retclass = "";
        var doc = item;
        if (item.hasOwnProperty("doc"))
            doc = item.doc;
        if (doc.disputato == "yes") {
            if (doc.vinto == "yes") {
                retclass = "greenbold";
            }
            else
                retclass = "redbold";
        }
        else
            retclass = "nondisputato";
        return retclass;
    };
    MatchesforatletaComponent.prototype.navBack = function () {
        this.router.navigate("/gara");
    };
    __decorate([
        core_1.ViewChild("drawer"),
        __metadata("design:type", angular_1.RadSideDrawerComponent)
    ], MatchesforatletaComponent.prototype, "drawerComponent", void 0);
    MatchesforatletaComponent = __decorate([
        core_1.Component({
            selector: "Matchesforatleta",
            moduleId: module.id,
            templateUrl: "./matchesforatleta.component.html",
            styleUrls: ["./matchesforatleta.component.css"]
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute, router_1.Router, backend_1.Backend])
    ], MatchesforatletaComponent);
    return MatchesforatletaComponent;
}());
exports.MatchesforatletaComponent = MatchesforatletaComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0Y2hlc2ZvcmF0bGV0YS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJtYXRjaGVzZm9yYXRsZXRhLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUE2RDtBQUM3RCxpRUFBa0c7QUFDbEcsc0VBQW9GO0FBQ3BGLHdEQUF1RDtBQUN2RCwwQ0FBeUQ7QUFFekQsc0NBQXlDO0FBT3pDO0lBa0RJLG1DQUFvQixLQUFxQixFQUFTLE1BQWMsRUFBUyxPQUFnQjtRQUFyRSxVQUFLLEdBQUwsS0FBSyxDQUFnQjtRQUFTLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBUyxZQUFPLEdBQVAsT0FBTyxDQUFTO1FBNUN6RixjQUFTLEdBQUcsRUFBRSxDQUFDO1FBQ2YsVUFBSyxHQUFRO1lBQ1QsS0FBSyxFQUFFLEVBQUU7WUFDVCxRQUFRLEVBQUUsRUFBRTtTQUNmLENBQUM7UUFDRixTQUFJLEdBQVE7WUFDUixhQUFhLEVBQUU7Z0JBQ1gsSUFBSSxFQUFFLEVBQUU7YUFDWDtZQUNELGVBQWUsRUFBRTtnQkFDYixJQUFJLEVBQUUsRUFBRTthQUNYO1lBQ0QsT0FBTyxFQUFFO2dCQUNMLElBQUksRUFBRSxFQUFFO2FBQ1g7U0FDSixDQUFDO1FBQ0YsUUFBRyxHQUFRLEVBQUUsQ0FBQztRQUNkLGlCQUFZLEdBQVEsRUFBRSxDQUFDO1FBQ3ZCLGFBQVEsR0FBUSxFQUFFLENBQUM7UUFDbkIsbUJBQWMsR0FBUSxFQUFFLENBQUM7UUFDekIsV0FBTSxHQUFHLEVBQUUsQ0FBQztRQUNaLGtCQUFhLEdBQUcsV0FBVyxDQUFDO1FBQzVCLFlBQU8sR0FBRyxXQUFXLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDaEMsUUFBRyxHQUFRLEVBRVYsQ0FBQTtRQUNELGFBQVEsR0FBRyxFQUFFLENBQUM7UUFDZCxZQUFPLEdBQVEsRUFBRSxDQUFDO1FBQ2xCLGtCQUFhLEdBQVEsS0FBSyxDQUFDO1FBQzNCLGdCQUFXLEdB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Q0FBQztZQUFDLElBQUk7Z0JBQUMsUUFBUSxHQUFHLFNBQVMsQ0FBQztRQUNoQyxDQUFDO1FBQUMsSUFBSTtZQUFDLFFBQVEsR0FBRyxjQUFjLENBQUM7UUFDakMsTUFBTSxDQUFDLFFBQVEsQ0FBQztJQUNwQixDQUFDO0lBRUQsMkNBQU8sR0FBUDtRQUNJLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ2xDLENBQUM7SUF0VW9CO1FBQXBCLGdCQUFTLENBQUMsUUFBUSxDQUFDO2tDQUFrQixnQ0FBc0I7c0VBQUM7SUFMcEQseUJBQXlCO1FBTnJDLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsa0JBQWtCO1lBQzVCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixXQUFXLEVBQUUsbUNBQW1DO1lBQ2hELFNBQVMsRUFBRSxDQUFDLGtDQUFrQyxDQUFDO1NBQ2xELENBQUM7eUNBbUQ2Qix1QkFBYyxFQUFpQixlQUFNLEVBQWtCLGlCQUFPO09BbERoRix5QkFBeUIsQ0E0VXJDO0lBQUQsZ0NBQUM7Q0FBQSxBQTVVRCxJQTRVQztBQTVVWSw4REFBeUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgVmlld0NoaWxkIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgRHJhd2VyVHJhbnNpdGlvbkJhc2UsIFNsaWRlSW5PblRvcFRyYW5zaXRpb24gfSBmcm9tIFwibmF0aXZlc2NyaXB0LXRlbGVyaWstdWkvc2lkZWRyYXdlclwiO1xyXG5pbXBvcnQgeyBSYWRTaWRlRHJhd2VyQ29tcG9uZW50IH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC10ZWxlcmlrLXVpL3NpZGVkcmF3ZXIvYW5ndWxhclwiO1xyXG5pbXBvcnQgeyBCYWNrZW5kIH0gZnJvbSBcIi4uL3Byb3ZpZGVycy9iYWNrZW5kL2JhY2tlbmRcIjtcclxuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUsIFJvdXRlciB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcclxuXHJcbmltcG9ydCBmcmFtZU1vZHVsZSA9IHJlcXVpcmUoXCJ1aS9mcmFtZVwiKTtcclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogXCJNYXRjaGVzZm9yYXRsZXRhXCIsXHJcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxyXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9tYXRjaGVzZm9yYXRsZXRhLmNvbXBvbmVudC5odG1sXCIsXHJcbiAgICBzdHlsZVVybHM6IFtcIi4vbWF0Y2hlc2ZvcmF0bGV0YS5jb21wb25lbnQuY3NzXCJdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBNYXRjaGVzZm9yYXRsZXRhQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICAgIC8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAgICAqIFVzZSB0aGUgQFZpZXdDaGlsZCBkZWNvcmF0b3IgdG8gZ2V0IGEgcmVmZXJlbmNlIHRvIHRoZSBkcmF3ZXIgY29tcG9uZW50LlxyXG4gICAgKiBJdCBpcyB1c2VkIGluIHRoZSBcIm9uRHJhd2VyQnV0dG9uVGFwXCIgZnVuY3Rpb24gYmVsb3cgdG8gbWFuaXB1bGF0ZSB0aGUgZHJhd2VyLlxyXG4gICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuICAgIEBWaWV3Q2hpbGQoXCJkcmF3ZXJcIikgZHJhd2VyQ29tcG9uZW50OiBSYWRTaWRlRHJhd2VyQ29tcG9uZW50O1xyXG4gICAgcGFnZXRpdGxlID0gXCJcIjtcclxuICAgIGpnYXJhOiBhbnkgPSB7XHJcbiAgICAgICAgdGl0bGU6IFwiXCIsXHJcbiAgICAgICAgbG9jYXRpb246IFwiXCJcclxuICAgIH07XHJcbiAgICBnYXJhOiBhbnkgPSB7XHJcbiAgICAgICAgbWF0Y2hlc2J5cHJvZzoge1xyXG4gICAgICAgICAgICByb3dzOiBbXVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbWF0Y2hlc2J5YXRsZXRhOiB7XHJcbiAgICAgICAgICAgIHJvd3M6IFtdXHJcbiAgICAgICAgfSxcclxuICAgICAgICBjcm9uYWNhOiB7XHJcbiAgICAgICAgICAgIHJvd3M6IFtdXHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIG1wYTogYW55ID0gW107XHJcbiAgICBkaXNwbGF5ZWRtYnA6IGFueSA9IFtdO1xyXG4gICAgaXNjcml0dGk6IGFueSA9IFtdO1xyXG4gICAgYXRsZXRpaXNjcml0dGk6IGFueSA9IFtdO1xyXG4gICAgZ2FyYWlkID0gXCJcIjtcclxuICAgIGFjdGl2ZXNlZ21lbnQgPSBcIlBlciBNYXRjaFwiO1xyXG4gICAgdG9wbW9zdCA9IGZyYW1lTW9kdWxlLnRvcG1vc3QoKTtcclxuICAgIGF0bDogYW55ID0ge1xyXG5cclxuICAgIH1cclxuICAgIGF0bGV0YWlkID0gXCJcIjtcclxuICAgIGhpc3Rvcnk6IGFueSA9IFtdO1xyXG4gICAgdmlld0F2dmVyc2FyaTogYW55ID0gZmFsc2U7XHJcbiAgICB2aWV3SGlzdG9yeTogYW55ID0gZmFsc2U7XHJcbiAgICB2aWV3VGtkdDogYW55ID0gZmFsc2U7XHJcbiAgICB2aWV3VGtkdENhdGVnb3JpYTogYW55ID0gZmFsc2U7XHJcbiAgICB2aWV3VGFidWxhdG86IGFueSA9IGZhbHNlO1xyXG4gICAgdGtkdDogYW55ID0ge307XHJcbiAgICBhdnZlcnNhcmk6IGFueSA9IFtdO1xyXG4gICAgdGtkdGF0bGV0YTogYW55ID0ge307XHJcbiAgICB0a2R0YXRsZXRhYXJyOiBhbnkgPSBbXTtcclxuICAgIHRhYnVsYXRvOiBhbnkgPSB7fTtcclxuICAgIHRhYnVsYXRvaW1nOiBhbnkgPSBcImFzc2V0cy9pbWcvYm94YmlhbmNvLmpwZ1wiO1xyXG4gICAgYXRsZXRhOiBhbnk9e307XHJcblxyXG5cclxuICAgIHByaXZhdGUgX3NpZGVEcmF3ZXJUcmFuc2l0aW9uOiBEcmF3ZXJUcmFuc2l0aW9uQmFzZTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvciggcHVibGljIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSwgcHVibGljIHJvdXRlcjogUm91dGVyLCBwdWJsaWMgYmFja2VuZDogQmFja2VuZCkge1xyXG4gICAgICAgIHZhciBxdWVzdG8gPSB0aGlzO1xyXG4gICAgICAgIHRoaXMucm91dGUucXVlcnlQYXJhbXMuc3Vic2NyaWJlKHBhcmFtcyA9PiB7XHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJwYXJtc1wiLCBKU09OLnN0cmluZ2lmeShwYXJhbXMpKTtcclxuICAgICAgICAgICAgdmFyIHBhcm1zID0gcGFyYW1zLnBhcm1zO1xyXG4gICAgICAgICAgICB2YXIganBhcm1zID0gSlNPTi5wYXJzZShwYXJtcyk7XHJcbiAgICAgICAgICAgIHF1ZXN0by5hdGxldGFpZCA9IGpwYXJtcy5hdGxldGFpZDtcclxuICAgICAgICAgICAgcXVlc3RvLmF0bCA9IHF1ZXN0by5iYWNrZW5kLmdldEF0bGV0YUJ5SWQocXVlc3RvLmF0bGV0YWlkKTtcclxuICAgICAgICAgICAgcXVlc3RvLnBhZ2V0aXRsZSA9IFwiSW5jb250cmkgcGVyIFwiICsgcXVlc3RvLmF0bC5jb2dub21lICsgXCIgXCIgKyBxdWVzdG8uYXRsLm5vbWU7XHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJtYXRjaCBwZXIgYXRsZXRhXCIsIEpTT04uc3RyaW5naWZ5KHF1ZXN0by5tcGEpKTtcclxuICAgICAgICAgICAgLy8gcXVlc3RvLnJlZnJlc2goZnVuY3Rpb24gKGRhdGEpIHsgfSk7XHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG5cclxuICAgIH1cclxuXHJcblxyXG5cclxuXHJcbiAgICByZWZyZXNoKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgdmFyIHF1ZXN0byA9IHRoaXM7XHJcbiAgICAgICAgdmFyIHVybCA9IHF1ZXN0by5iYWNrZW5kLnJvb3R1cmwgKyBcIi9nYXJlL2Z1bGxnYXJhYnlpZC9cIiArIHRoaXMuZ2FyYWlkICsgXCI/c29jaWV0YWlkPTIwMTYwMjE3MjIwNDAwXCI7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJjYWxsaW5nIHVybFwiLCB1cmwpO1xyXG4gICAgICAgIHF1ZXN0by5iYWNrZW5kLmZldGNoRGF0YSh1cmwsIGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgIHF1ZXN0by5iYWNrZW5kLmFjdGl2ZWdhcmEgPSBkYXRhO1xyXG4gICAgICAgICAgICBxdWVzdG8uamdhcmEgPSBxdWVzdG8uYmFja2VuZC5hY3RpdmVnYXJhLmdhcmEucm93c1swXS5kb2M7XHJcbiAgICAgICAgICAgIHF1ZXN0by5kaXNwbGF5ZWRtYnAgPSBbXTtcclxuXHJcbiAgICAgICAgICAgIHF1ZXN0by5iYWNrZW5kLmFjdGl2ZWdhcmEubWF0Y2hlc2J5cHJvZy5yb3dzLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0sIGlkeCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0uZG9jLmRhZGlzcHV0YXJlID09ICd5ZXMnKSBxdWVzdG8uZGlzcGxheWVkbWJwLnB1c2goaXRlbSk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZGlzcGxheWVkbWJwXCIsIHF1ZXN0by5kaXNwbGF5ZWRtYnAubGVuZ3RoKTtcclxuXHJcbiAgICAgICAgICAgIHF1ZXN0by5pc2NyaXR0aSA9IHF1ZXN0by5iYWNrZW5kLmFjdGl2ZWdhcmEuZ2FyYS5yb3dzWzBdLmRvYy5pc2NyaXR0aS5zcGxpdChcIixcIik7XHJcblxyXG4gICAgICAgICAgICBxdWVzdG8uaXNjcml0dGkuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSwgaWR4KSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgYXRsID0gcXVlc3RvLmdldEF0bGV0YUlzY3JpdHRvKGl0ZW0pO1xyXG4gICAgICAgICAgICAgICAgcXVlc3RvLmF0bGV0aWlzY3JpdHRpLnB1c2goYXRsKTtcclxuXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIHF1ZXN0by5hdGxldGlpc2NyaXR0aS5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgYTEgPSBhLmNvZ25vbWUgKyBhLm5vbWU7XHJcbiAgICAgICAgICAgICAgICB2YXIgYjEgPSBiLmNvZ25vbWUgKyBiLm5vbWU7XHJcbiAgICAgICAgICAgICAgICBpZiAoYTEgPiBiMSkgcmV0dXJuIDE7XHJcbiAgICAgICAgICAgICAgICBpZiAoYTEgPCBiMSkgcmV0dXJuIC0xO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImdhcmFcIiwgcXVlc3RvLmJhY2tlbmQuYWN0aXZlZ2FyYS5tYXRjaGVzYnlwcm9nLnJvd3MubGVuZ3RoKTtcclxuICAgICAgICAgICAgcXVlc3RvLmF0bGV0YT1xdWVzdG8uYmFja2VuZC5nZXRBdGxldGFCeUlkKHF1ZXN0by5hdGxldGFpZCk7XHJcbiAgICAgICAgICAgIHZhciBjYXQ9cXVlc3RvLmdldENhdGVnb3JpYShxdWVzdG8uYXRsZXRhLmRhdGFuYXNjaXRhKTtcclxuICAgICAgICAgICAgcXVlc3RvLnRrZHRhdGxldGE9cXVlc3RvLmJhY2tlbmQuZ2V0VGtkdEF0bGV0YShxdWVzdG8uYXRsZXRhKTtcclxuICAgICAgICAgICAgcXVlc3RvLmF2dmVyc2FyaT1xdWVzdG8uYmFja2VuZC5nZXRUa2R0QXRsZXRpQ2F0ZWdvcmlhKHF1ZXN0by50a2R0YXRsZXRhLmNhdGV0YSxxdWVzdG8udGtkdGF0bGV0YS5jYXRjaW50dXJhLHF1ZXN0by50a2R0YXRsZXRhLmNhdHBlc28scXVlc3RvLnRrZHRhdGxldGEuc2Vzc28pO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICBcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgXHJcbiAgICAgICAgXHJcbiAgICAgICAgICAgIGZvciAodmFyIGsgaW4gcXVlc3RvLnRrZHRhdGxldGEpe1xyXG4gICAgICAgICAgICAgIGlmIChxdWVzdG8udGtkdGF0bGV0YS5oYXNPd25Qcm9wZXJ0eShrKSl7XHJcbiAgICAgICAgICAgICAgICB2YXIgbmV3ZWw9e1xyXG4gICAgICAgICAgICAgICAgICBuYW1lOiBrLFxyXG4gICAgICAgICAgICAgICAgICB2YWx1ZTogcXVlc3RvLnRrZHRhdGxldGFba11cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHF1ZXN0by50a2R0YXRsZXRhYXJyLnB1c2gobmV3ZWwpO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInRrZHRhdGxldGFcIixxdWVzdG8udGtkdGF0bGV0YSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiYXZ2ZXJzYXJpXCIscXVlc3RvLmF2dmVyc2FyaSk7XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICB9XHJcblxyXG4gICAgaXRlbVRhcChpdGVtKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJpdGVtXCIsIEpTT04uc3RyaW5naWZ5KGl0ZW0pKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRDYXRlZ29yaWEoZG4pe1xyXG4gICAgICAgIHZhciBxdWVzdG89dGhpcztcclxuICAgICAgICByZXR1cm4gdGhpcy5iYWNrZW5kLmdldENhdGVnb3JpYShkbixxdWVzdG8uYmFja2VuZC5hY3RpdmVnYXJhLmdhcmEucm93c1swXS5kb2MuZGF0YSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAvKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gICAgKiBVc2UgdGhlIHNpZGVEcmF3ZXJUcmFuc2l0aW9uIHByb3BlcnR5IHRvIGNoYW5nZSB0aGUgb3Blbi9jbG9zZSBhbmltYXRpb24gb2YgdGhlIGRyYXdlci5cclxuICAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgICAgICB2YXIgcXVlc3RvID0gdGhpcztcclxuICAgICAgICB0aGlzLl9zaWRlRHJhd2VyVHJhbnNpdGlvbiA9IG5ldyBTbGlkZUluT25Ub3BUcmFuc2l0aW9uKCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJuZ29ub2luaXRcIik7XHJcbiAgICAgICAgcXVlc3RvLmRpc3BsYXllZG1icCA9IFtdO1xyXG4gICAgICAgIHF1ZXN0by5iYWNrZW5kLmFjdGl2ZWdhcmEubWF0Y2hlc2J5cHJvZy5yb3dzLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0sIGlkeCkge1xyXG4gICAgICAgICAgICBpZiAoaXRlbS5kb2MuZGFkaXNwdXRhcmUgPT0gJ3llcycpIHF1ZXN0by5kaXNwbGF5ZWRtYnAucHVzaChpdGVtKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiZGlzcGxheWVkbWJwXCIsIHF1ZXN0by5kaXNwbGF5ZWRtYnAubGVuZ3RoKTtcclxuXHJcbiAgICAgICAgcXVlc3RvLmlzY3JpdHRpID0gcXVlc3RvLmJhY2tlbmQuYWN0aXZlZ2FyYS5nYXJhLnJvd3NbMF0uZG9jLmlzY3JpdHRpLnNwbGl0KFwiLFwiKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImlzY3JpdHRpXCIscXVlc3RvLmlzY3JpdHRpKTtcclxuICAgICAgICBxdWVzdG8uaXNjcml0dGkuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSwgaWR4KSB7XHJcbiAgICAgICAgICAgIHZhciBhdGwgPSBxdWVzdG8uZ2V0QXRsZXRhSXNjcml0dG8oaXRlbSk7XHJcbiAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJhdGxcIixKU09OLnN0cmluZ2lmeShhdGwpKTtcclxuICAgICAgICAgICAgcXVlc3RvLmF0bGV0aWlzY3JpdHRpLnB1c2goYXRsKTtcclxuXHJcbiAgICAgICAgfSlcclxuICAgICAgICBxdWVzdG8uYXRsZXRpaXNjcml0dGkuc29ydChmdW5jdGlvbiAoYSwgYikge1xyXG4gICAgICAgICAgICB2YXIgYTEgPSBhLmNvZ25vbWUgKyBhLm5vbWU7XHJcbiAgICAgICAgICAgIHZhciBiMSA9IGIuY29nbm9tZSArIGIubm9tZTtcclxuICAgICAgICAgICAgaWYgKGExID4gYjEpIHJldHVybiAxO1xyXG4gICAgICAgICAgICBpZiAoYTEgPCBiMSkgcmV0dXJuIC0xO1xyXG4gICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICB9KVxyXG5cclxuXHJcbiAgICAgICAgcXVlc3RvLm1wYSA9IFtdO1xyXG4gICAgICAgIHF1ZXN0by5iYWNrZW5kLmFjdGl2ZWdhcmEubWF0Y2hlc2J5cHJvZy5yb3dzLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0sIGlkeCkge1xyXG4gICAgICAgICAgICB2YXIgYXRsaWQgPSBpdGVtLmRvYy5hdGxldGFpZDtcclxuICAgICAgICAgICAgaWYgKGF0bGlkID09IHF1ZXN0by5hdGxldGFpZCkgcXVlc3RvLm1wYS5wdXNoKGl0ZW0pO1xyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiZ2FyYVwiLCBxdWVzdG8uYmFja2VuZC5hY3RpdmVnYXJhLm1hdGNoZXNieXByb2cucm93cy5sZW5ndGgpO1xyXG4gICAgICAgIHF1ZXN0by5hdGxldGE9cXVlc3RvLmJhY2tlbmQuZ2V0QXRsZXRhQnlJZChxdWVzdG8uYXRsZXRhaWQpO1xyXG4gICAgICAgIHZhciBjYXQ9cXVlc3RvLmdldENhdGVnb3JpYShxdWVzdG8uYXRsZXRhLmRhdGFuYXNjaXRhKTtcclxuICAgICAgICBxdWVzdG8udGtkdGF0bGV0YT1xdWVzdG8uYmFja2VuZC5nZXRUa2R0QXRsZXRhKHF1ZXN0by5hdGxldGEpO1xyXG4gICAgXHJcbiAgICAgICAgcXVlc3RvLmF2dmVyc2FyaT1xdWVzdG8uYmFja2VuZC5nZXRUa2R0QXRsZXRpQ2F0ZWdvcmlhKHF1ZXN0by50a2R0YXRsZXRhLmNhdGV0YSxxdWVzdG8udGtkdGF0bGV0YS5jYXRjaW50dXJhLHF1ZXN0by50a2R0YXRsZXRhLmNhdHBlc28scXVlc3RvLnRrZHRhdGxldGEuc2Vzc28pO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHF1ZXN0by50YWJ1bGF0bz1xdWVzdG8uYmFja2VuZC5nZXRUa2R0VGFidWxhdGlDYXRlZ29yaWEocXVlc3RvLnRrZHRhdGxldGEuY2F0ZXRhLHF1ZXN0by50a2R0YXRsZXRhLmNhdGNpbnR1cmEscXVlc3RvLnRrZHRhdGxldGEuY2F0cGVzbyxxdWVzdG8udGtkdGF0bGV0YS5zZXNzbykgIDtcclxuICAgICAgICBjb25zb2xlLmxvZyhcInRhYnVsYXRvXCIsSlNPTi5zdHJpbmdpZnkocXVlc3RvLnRhYnVsYXRvKSk7XHJcbiAgICAgICAgXHJcbiAgICBcclxuICAgIFxyXG4gICAgICAgIGZvciAodmFyIGsgaW4gcXVlc3RvLnRrZHRhdGxldGEpe1xyXG4gICAgICAgICAgaWYgKHF1ZXN0by50a2R0YXRsZXRhLmhhc093blByb3BlcnR5KGspKXtcclxuICAgICAgICAgICAgdmFyIG5ld2VsPXtcclxuICAgICAgICAgICAgICBuYW1lOiBrLFxyXG4gICAgICAgICAgICAgIHZhbHVlOiBxdWVzdG8udGtkdGF0bGV0YVtrXVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHF1ZXN0by50a2R0YXRsZXRhYXJyLnB1c2gobmV3ZWwpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gXHJcblxyXG4gICAgICAgICAgICBcclxuICAgICAgICB2YXIgaGFzdGFidWxhdG89dHJ1ZTtcclxuICAgICAgICBmb3IgKHZhciBrayBpbiBxdWVzdG8udGFidWxhdG8pe1xyXG4gICAgICAgICAgaWYgKHF1ZXN0by50YWJ1bGF0by5oYXNPd25Qcm9wZXJ0eShraykpe1xyXG4gICAgICAgICAgICBpZiAocXVlc3RvLnRhYnVsYXRvW2trXT09XCItLVwiKSBoYXN0YWJ1bGF0bz1oYXN0YWJ1bGF0byAmJiBmYWxzZTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9ICBcclxuICAgICAgICBjb25zb2xlLmxvZyhcImhhc3RhYnVsYXRvXCIsaGFzdGFidWxhdG8pXHJcbiAgICAgICAgaWYgKGhhc3RhYnVsYXRvKSB7XHJcbiAgICAgICAgLy9pZiAodGhpcy50YWJ1bGF0byE9e30pe1xyXG4gICAgICAgICAgcXVlc3RvLmJhY2tlbmQuZ2V0VGFidWxhdG9JbWcocXVlc3RvLnRhYnVsYXRvLm9sZGhyZWYsZnVuY3Rpb24oZGF0YSl7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwidGFidWxhdG8gaW1hZ2VcIixkYXRhKTtcclxuICAgICAgICAgICAgcXVlc3RvLnRhYnVsYXRvaW1nPWRhdGE7XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwidGtkdGF0bGV0YVwiLEpTT04uc3RyaW5naWZ5KHF1ZXN0by50a2R0YXRsZXRhKSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJ0a2R0YXRsZXRhYXJyXCIsSlNPTi5zdHJpbmdpZnkocXVlc3RvLnRrZHRhdGxldGFhcnIpKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImF2dmVyc2FyaVwiLHF1ZXN0by5hdnZlcnNhcmkubGVuZ3RoKTtcclxuXHJcblxyXG4gICAgfVxyXG5cclxuICAgIGdldCBzaWRlRHJhd2VyVHJhbnNpdGlvbigpOiBEcmF3ZXJUcmFuc2l0aW9uQmFzZSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NpZGVEcmF3ZXJUcmFuc2l0aW9uO1xyXG4gICAgfVxyXG5cclxuICAgIC8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAgICAqIEFjY29yZGluZyB0byBndWlkZWxpbmVzLCBpZiB5b3UgaGF2ZSBhIGRyYXdlciBvbiB5b3VyIHBhZ2UsIHlvdSBzaG91bGQgYWx3YXlzXHJcbiAgICAqIGhhdmUgYSBidXR0b24gdGhhdCBvcGVucyBpdC4gVXNlIHRoZSBzaG93RHJhd2VyKCkgZnVuY3Rpb24gdG8gb3BlbiB0aGUgYXBwIGRyYXdlciBzZWN0aW9uLlxyXG4gICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuICAgIG9uRHJhd2VyQnV0dG9uVGFwKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuZHJhd2VyQ29tcG9uZW50LnNpZGVEcmF3ZXIuc2hvd0RyYXdlcigpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBnZXRJbWcobSkge1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coXCJnZXRJbWdcIiwgbSk7XHJcbiAgICAgICAgdmFyIGRvYyA9IG07XHJcbiAgICAgICAgaWYgKG0uaGFzT3duUHJvcGVydHkoXCJkb2NcIikpIGRvYyA9IG0uZG9jO1xyXG4gICAgICAgIHZhciBpbWdzcmM6IFN0cmluZyA9IFwibWF0Y2h0b3BsYXkucG5nXCI7XHJcbiAgICAgICAgaWYgKGRvYy5kaXNwdXRhdG8gPT0gXCJ5ZXNcIikge1xyXG5cclxuICAgICAgICAgICAgaW1nc3JjID0gXCJtYXRjaGtvLnBuZ1wiO1xyXG4gICAgICAgICAgICBpZiAoZG9jLnZpbnRvID09IFwieWVzXCIpIGltZ3NyYyA9IFwibWF0Y2hvay5wbmdcIjtcclxuICAgICAgICAgICAgaWYgKGRvYy5tZWRhZ2xpYW1hdGNoKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZG9jLm1lZGFnbGlhbWF0Y2ggIT0gXCJub25lXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBpbWdzcmMgPSBcIm1lZGFnbGlhX1wiICsgZG9jLm1lZGFnbGlhbWF0Y2ggKyBcIi5wbmdcIjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGRvYy5yZWFsdGltZSkge1xyXG4gICAgICAgICAgICBpZiAoU3RyaW5nKGRvYy5yZWFsdGltZSkgPT0gXCJ0cnVlXCIpIGltZ3NyYyA9IFwiZ3JlZW5ibGluay5naWZcIjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGltZ3NyYyA9IFwifi9pbWFnZXMvXCIgKyBpbWdzcmM7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcImltZ3NyY1wiLCBpbWdzcmMpO1xyXG4gICAgICAgIHJldHVybiBpbWdzcmM7XHJcblxyXG5cclxuXHJcbiAgICB9XHJcblxyXG5cclxuICAgIGdldEltZ1BlckF0bGV0YShtKSB7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcImdldEltZ1BlckF0bGV0YVwiLCBtKTtcclxuICAgICAgICB2YXIgaW1nc3JjOiBTdHJpbmcgPSBcIm1hdGNodG9wbGF5LnBuZ1wiO1xyXG4gICAgICAgIHZhciBtZWRhZ2xpYSA9IFwibm9uZVwiO1xyXG4gICAgICAgIG0ubWF0Y2hlc2FycmF5LmZvckVhY2goZnVuY3Rpb24gKGl0ZW0sIGlkeCkge1xyXG5cclxuICAgICAgICAgICAgaWYgKGl0ZW0ubWVkYWdsaWFtYXRjaCAhPSBcIm5vbmVcIikge1xyXG4gICAgICAgICAgICAgICAgbWVkYWdsaWEgPSBpdGVtLm1lZGFnbGlhbWF0Y2g7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAobWVkYWdsaWEgIT0gXCJub25lXCIpIGltZ3NyYyA9IFwibWVkYWdsaWFfXCIgKyBtZWRhZ2xpYSArIFwiLnBuZ1wiO1xyXG5cclxuXHJcbiAgICAgICAgaW1nc3JjID0gXCJ+L2ltYWdlcy9cIiArIGltZ3NyYztcclxuICAgICAgICAvL2NvbnNvbGUubG9nKFwiaW1nc3JjXCIsIGltZ3NyYyk7XHJcbiAgICAgICAgcmV0dXJuIGltZ3NyYztcclxuXHJcblxyXG5cclxuICAgIH1cclxuXHJcbiAgICBnZXRBdGxldGFJc2NyaXR0byhpKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYmFja2VuZC5nZXRBdGxldGFCeUlkKGkpO1xyXG4gICAgfVxyXG5cclxuICAgIGdvdG9DaGF0KCkge1xyXG5cclxuXHJcblxyXG4gICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFtcIi9jaGF0XCJdKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRWaW50b1BlcnNvQ2xhc3MoaXRlbSkge1xyXG4gICAgICAgIHZhciByZXRjbGFzcyA9IFwiXCI7XHJcbiAgICAgICAgdmFyIGRvYyA9IGl0ZW07XHJcbiAgICAgICAgaWYgKGl0ZW0uaGFzT3duUHJvcGVydHkoXCJkb2NcIikpIGRvYyA9IGl0ZW0uZG9jO1xyXG4gICAgICAgIGlmIChkb2MuZGFkaXNwdXRhcmUgPT0gXCJ5ZXNcIikge1xyXG4gICAgICAgICAgICBpZiAoZG9jLmRpc3B1dGF0byA9PSBcInllc1wiKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZG9jLnZpbnRvID09IFwieWVzXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXRjbGFzcyA9IFwiZ3JlZW5ib2xkXCI7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgcmV0Y2xhc3MgPSBcInJlZGJvbGRcIjtcclxuICAgICAgICAgICAgfSBlbHNlIHJldGNsYXNzID0gXCJub25kaXNwdXRhdG9cIjtcclxuICAgICAgICB9IGVsc2UgcmV0Y2xhc3MgPSBcImRhbm9uZGlzcHV0YXJlXCI7XHJcbiAgICAgICAgcmV0dXJuIHJldGNsYXNzICsgJyBtYXRjaG51bSc7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0UmlzdWx0YXRvVGV4dChpdGVtKSB7XHJcbiAgICAgICAgdmFyIHJldGNsYXNzID0gXCJcIjtcclxuICAgICAgICB2YXIgZG9jID0gaXRlbTtcclxuICAgICAgICBpZiAoaXRlbS5oYXNPd25Qcm9wZXJ0eShcImRvY1wiKSkgZG9jID0gaXRlbS5kb2M7XHJcbiAgICAgICAgaWYgKGRvYy5kaXNwdXRhdG8gPT0gXCJ5ZXNcIikge1xyXG4gICAgICAgICAgICBpZiAoZG9jLnZpbnRvID09IFwieWVzXCIpIHtcclxuICAgICAgICAgICAgICAgIHJldGNsYXNzID0gXCJWaW50bywgcmlzdWx0YXRvIFwiICsgaXRlbS5kb2MucmlzdWx0YXRvO1xyXG4gICAgICAgICAgICB9IGVsc2UgcmV0Y2xhc3MgPSBcIlBlcnNvLCByaXN1bHRhdG8gXCIgKyBpdGVtLmRvYy5yaXN1bHRhdG87XHJcbiAgICAgICAgfSBlbHNlIHJldGNsYXNzID0gXCJOb24gZGlzcHV0YXRvXCI7XHJcbiAgICAgICAgcmV0dXJuIHJldGNsYXNzO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFJpc3VsdGF0b0NsYXNzKGl0ZW0pIHtcclxuICAgICAgICB2YXIgcmV0Y2xhc3MgPSBcIlwiO1xyXG4gICAgICAgIHZhciBkb2MgPSBpdGVtO1xyXG4gICAgICAgIGlmIChpdGVtLmhhc093blByb3BlcnR5KFwiZG9jXCIpKSBkb2MgPSBpdGVtLmRvYztcclxuICAgICAgICBpZiAoZG9jLmRpc3B1dGF0byA9PSBcInllc1wiKSB7XHJcbiAgICAgICAgICAgIGlmIChkb2MudmludG8gPT0gXCJ5ZXNcIikge1xyXG4gICAgICAgICAgICAgICAgcmV0Y2xhc3MgPSBcImdyZWVuYm9sZFwiO1xyXG4gICAgICAgICAgICB9IGVsc2UgcmV0Y2xhc3MgPSBcInJlZGJvbGRcIjtcclxuICAgICAgICB9IGVsc2UgcmV0Y2xhc3MgPSBcIm5vbmRpc3B1dGF0b1wiO1xyXG4gICAgICAgIHJldHVybiByZXRjbGFzcztcclxuICAgIH1cclxuXHJcbiAgICBuYXZCYWNrKCl7XHJcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoXCIvZ2FyYVwiKTtcclxuICAgIH1cclxufVxyXG4iXX0=