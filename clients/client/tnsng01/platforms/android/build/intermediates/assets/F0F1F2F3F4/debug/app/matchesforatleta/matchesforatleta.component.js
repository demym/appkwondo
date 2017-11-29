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
            console.log("gara", questo.backend.activegara.matchesbyprog.rows.length);
        });
    };
    MatchesforatletaComponent.prototype.itemTap = function (item) {
        console.log("item", JSON.stringify(item));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0Y2hlc2ZvcmF0bGV0YS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJtYXRjaGVzZm9yYXRsZXRhLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUE2RDtBQUM3RCxpRUFBa0c7QUFDbEcsc0VBQW9GO0FBQ3BGLHdEQUF1RDtBQUN2RCwwQ0FBeUQ7QUFFekQsc0NBQXlDO0FBT3pDO0lBb0NJLG1DQUFtQixLQUFxQixFQUFTLE1BQWMsRUFBUyxPQUFnQjtRQUFyRSxVQUFLLEdBQUwsS0FBSyxDQUFnQjtRQUFTLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBUyxZQUFPLEdBQVAsT0FBTyxDQUFTO1FBOUJ4RixjQUFTLEdBQUMsRUFBRSxDQUFDO1FBQ2IsVUFBSyxHQUFDO1lBQ0YsS0FBSyxFQUFFLEVBQUU7WUFDVCxRQUFRLEVBQUUsRUFBRTtTQUNmLENBQUM7UUFDRixTQUFJLEdBQVE7WUFDUixhQUFhLEVBQUU7Z0JBQ1gsSUFBSSxFQUFFLEVBQUU7YUFDWDtZQUNELGVBQWUsRUFBRTtnQkFDYixJQUFJLEVBQUUsRUFBRTthQUNYO1lBQ0QsT0FBTyxFQUFFO2dCQUNMLElBQUksRUFBRSxFQUFFO2FBQ1g7U0FDSixDQUFDO1FBQ0YsUUFBRyxHQUFDLEVBQUUsQ0FBQztRQUNQLGlCQUFZLEdBQUcsRUFBRSxDQUFDO1FBQ2xCLGFBQVEsR0FBRyxFQUFFLENBQUM7UUFDZCxtQkFBYyxHQUFHLEVBQUUsQ0FBQztRQUNwQixXQUFNLEdBQUcsRUFBRSxDQUFDO1FBQ1osa0JBQWEsR0FBRyxXQUFXLENBQUM7UUFDNUIsWUFBTyxHQUFHLFdBQVcsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNoQyxRQUFHLEdBQU0sRUFFUixDQUFBO1FBQ0QsYUFBUSxHQUFDLEVBQUUsQ0FBQztRQUtSLElBQUksTUFBTSxHQUFDLElBQUksQ0FBQztRQUNoQixJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxT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RyxJQUFJLENBQUMsR0FBRyxDQUFDO1FBQy9DLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxTQUFTLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQztZQUN6QixFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ3JCLFFBQVEsR0FBRyxXQUFXLENBQUM7WUFDM0IsQ0FBQztZQUFDLElBQUk7Z0JBQUMsUUFBUSxHQUFHLFNBQVMsQ0FBQztRQUNoQyxDQUFDO1FBQUMsSUFBSTtZQUFDLFFBQVEsR0FBRyxjQUFjLENBQUM7UUFDakMsTUFBTSxDQUFDLFFBQVEsQ0FBQztJQUNwQixDQUFDO0lBL09vQjtRQUFwQixnQkFBUyxDQUFDLFFBQVEsQ0FBQztrQ0FBa0IsZ0NBQXNCO3NFQUFDO0lBTHBELHlCQUF5QjtRQU5yQyxnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLGtCQUFrQjtZQUM1QixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsV0FBVyxFQUFFLG1DQUFtQztZQUNoRCxTQUFTLEVBQUUsQ0FBQyxrQ0FBa0MsQ0FBQztTQUNsRCxDQUFDO3lDQXFDNEIsdUJBQWMsRUFBaUIsZUFBTSxFQUFrQixpQkFBTztPQXBDL0UseUJBQXlCLENBcVByQztJQUFELGdDQUFDO0NBQUEsQUFyUEQsSUFxUEM7QUFyUFksOERBQXlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIFZpZXdDaGlsZCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IERyYXdlclRyYW5zaXRpb25CYXNlLCBTbGlkZUluT25Ub3BUcmFuc2l0aW9uIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC10ZWxlcmlrLXVpL3NpZGVkcmF3ZXJcIjtcclxuaW1wb3J0IHsgUmFkU2lkZURyYXdlckNvbXBvbmVudCB9IGZyb20gXCJuYXRpdmVzY3JpcHQtdGVsZXJpay11aS9zaWRlZHJhd2VyL2FuZ3VsYXJcIjtcclxuaW1wb3J0IHsgQmFja2VuZCB9IGZyb20gXCIuLi9wcm92aWRlcnMvYmFja2VuZC9iYWNrZW5kXCI7XHJcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlLCBSb3V0ZXIgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XHJcbmltcG9ydCB7IFNlZ21lbnRlZEJhciwgU2VnbWVudGVkQmFySXRlbSB9IGZyb20gXCJ1aS9zZWdtZW50ZWQtYmFyXCI7XHJcbmltcG9ydCBmcmFtZU1vZHVsZSA9IHJlcXVpcmUoXCJ1aS9mcmFtZVwiKTtcclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogXCJNYXRjaGVzZm9yYXRsZXRhXCIsXHJcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxyXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9tYXRjaGVzZm9yYXRsZXRhLmNvbXBvbmVudC5odG1sXCIsXHJcbiAgICBzdHlsZVVybHM6IFtcIi4vbWF0Y2hlc2ZvcmF0bGV0YS5jb21wb25lbnQuY3NzXCJdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBNYXRjaGVzZm9yYXRsZXRhQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICAgIC8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAgICAqIFVzZSB0aGUgQFZpZXdDaGlsZCBkZWNvcmF0b3IgdG8gZ2V0IGEgcmVmZXJlbmNlIHRvIHRoZSBkcmF3ZXIgY29tcG9uZW50LlxyXG4gICAgKiBJdCBpcyB1c2VkIGluIHRoZSBcIm9uRHJhd2VyQnV0dG9uVGFwXCIgZnVuY3Rpb24gYmVsb3cgdG8gbWFuaXB1bGF0ZSB0aGUgZHJhd2VyLlxyXG4gICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuICAgIEBWaWV3Q2hpbGQoXCJkcmF3ZXJcIikgZHJhd2VyQ29tcG9uZW50OiBSYWRTaWRlRHJhd2VyQ29tcG9uZW50O1xyXG4gICAgcGFnZXRpdGxlPVwiXCI7XHJcbiAgICBqZ2FyYT17XHJcbiAgICAgICAgdGl0bGU6IFwiXCIsXHJcbiAgICAgICAgbG9jYXRpb246IFwiXCJcclxuICAgIH07XHJcbiAgICBnYXJhOiBhbnkgPSB7XHJcbiAgICAgICAgbWF0Y2hlc2J5cHJvZzoge1xyXG4gICAgICAgICAgICByb3dzOiBbXVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbWF0Y2hlc2J5YXRsZXRhOiB7XHJcbiAgICAgICAgICAgIHJvd3M6IFtdXHJcbiAgICAgICAgfSxcclxuICAgICAgICBjcm9uYWNhOiB7XHJcbiAgICAgICAgICAgIHJvd3M6IFtdXHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIG1wYT1bXTtcclxuICAgIGRpc3BsYXllZG1icCA9IFtdO1xyXG4gICAgaXNjcml0dGkgPSBbXTtcclxuICAgIGF0bGV0aWlzY3JpdHRpID0gW107XHJcbiAgICBnYXJhaWQgPSBcIlwiO1xyXG4gICAgYWN0aXZlc2VnbWVudCA9IFwiUGVyIE1hdGNoXCI7XHJcbiAgICB0b3Btb3N0ID0gZnJhbWVNb2R1bGUudG9wbW9zdCgpO1xyXG4gICAgYXRsOiBhbnk9e1xyXG5cclxuICAgIH1cclxuICAgIGF0bGV0YWlkPVwiXCI7XHJcblxyXG4gICAgcHJpdmF0ZSBfc2lkZURyYXdlclRyYW5zaXRpb246IERyYXdlclRyYW5zaXRpb25CYXNlO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyByb3V0ZTogQWN0aXZhdGVkUm91dGUsIHB1YmxpYyByb3V0ZXI6IFJvdXRlciwgcHVibGljIGJhY2tlbmQ6IEJhY2tlbmQpIHtcclxuICAgICAgICB2YXIgcXVlc3RvPXRoaXM7XHJcbiAgICAgICAgdGhpcy5yb3V0ZS5xdWVyeVBhcmFtcy5zdWJzY3JpYmUocGFyYW1zID0+IHtcclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcInBhcm1zXCIsIEpTT04uc3RyaW5naWZ5KHBhcmFtcykpO1xyXG4gICAgICAgICAgICB2YXIgcGFybXM9IHBhcmFtcy5wYXJtcztcclxuICAgICAgICAgICAgdmFyIGpwYXJtcz1KU09OLnBhcnNlKHBhcm1zKTtcclxuICAgICAgICAgICAgcXVlc3RvLmF0bGV0YWlkPWpwYXJtcy5hdGxldGFpZDtcclxuICAgICAgICAgICAgcXVlc3RvLmF0bD1xdWVzdG8uYmFja2VuZC5nZXRBdGxldGFCeUlkKHF1ZXN0by5hdGxldGFpZCk7XHJcbiAgICAgICAgICAgIHF1ZXN0by5wYWdldGl0bGU9XCJJbmNvbnRyaSBwZXIgXCIrcXVlc3RvLmF0bC5jb2dub21lK1wiIFwiK3F1ZXN0by5hdGwubm9tZTsgXHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJtYXRjaCBwZXIgYXRsZXRhXCIsIEpTT04uc3RyaW5naWZ5KHF1ZXN0by5tcGEpKTtcclxuICAgICAgICAgICAvLyBxdWVzdG8ucmVmcmVzaChmdW5jdGlvbiAoZGF0YSkgeyB9KTtcclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgIFxyXG5cclxuXHJcbiAgICB9XHJcblxyXG4gICBcclxuXHJcblxyXG4gICAgcmVmcmVzaChjYWxsYmFjaykge1xyXG4gICAgICAgIHZhciBxdWVzdG8gPSB0aGlzO1xyXG4gICAgICAgIHZhciB1cmwgPSBxdWVzdG8uYmFja2VuZC5yb290dXJsICsgXCIvZ2FyZS9mdWxsZ2FyYWJ5aWQvXCIgKyB0aGlzLmdhcmFpZCArIFwiP3NvY2lldGFpZD0yMDE2MDIxNzIyMDQwMFwiO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiY2FsbGluZyB1cmxcIiwgdXJsKTtcclxuICAgICAgICBxdWVzdG8uYmFja2VuZC5mZXRjaERhdGEodXJsLCBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICBxdWVzdG8uYmFja2VuZC5hY3RpdmVnYXJhPSBkYXRhO1xyXG4gICAgICAgICAgICBxdWVzdG8uamdhcmE9cXVlc3RvLmJhY2tlbmQuYWN0aXZlZ2FyYS5nYXJhLnJvd3NbMF0uZG9jO1xyXG4gICAgICAgICAgICBxdWVzdG8uZGlzcGxheWVkbWJwID0gW107XHJcbiAgICAgICAgIFxyXG4gICAgICAgICAgICBxdWVzdG8uYmFja2VuZC5hY3RpdmVnYXJhLm1hdGNoZXNieXByb2cucm93cy5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtLCBpZHgpIHtcclxuICAgICAgICAgICAgICAgIGlmIChpdGVtLmRvYy5kYWRpc3B1dGFyZSA9PSAneWVzJykgcXVlc3RvLmRpc3BsYXllZG1icC5wdXNoKGl0ZW0pO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImRpc3BsYXllZG1icFwiLCBxdWVzdG8uZGlzcGxheWVkbWJwLmxlbmd0aCk7XHJcblxyXG4gICAgICAgICAgICBxdWVzdG8uaXNjcml0dGkgPSBxdWVzdG8uZ2FyYS5nYXJhLnJvd3NbMF0uZG9jLmlzY3JpdHRpLnNwbGl0KFwiLFwiKTtcclxuXHJcbiAgICAgICAgICAgIHF1ZXN0by5pc2NyaXR0aS5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtLCBpZHgpIHtcclxuICAgICAgICAgICAgICAgIHZhciBhdGwgPSBxdWVzdG8uZ2V0QXRsZXRhSXNjcml0dG8oaXRlbSk7XHJcbiAgICAgICAgICAgICAgICBxdWVzdG8uYXRsZXRpaXNjcml0dGkucHVzaChhdGwpO1xyXG5cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgcXVlc3RvLmF0bGV0aWlzY3JpdHRpLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHtcclxuICAgICAgICAgICAgICAgIHZhciBhMSA9IGEuY29nbm9tZSArIGEubm9tZTtcclxuICAgICAgICAgICAgICAgIHZhciBiMSA9IGIuY29nbm9tZSArIGIubm9tZTtcclxuICAgICAgICAgICAgICAgIGlmIChhMSA+IGIxKSByZXR1cm4gMTtcclxuICAgICAgICAgICAgICAgIGlmIChhMSA8IGIxKSByZXR1cm4gLTE7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZ2FyYVwiLCBxdWVzdG8uYmFja2VuZC5hY3RpdmVnYXJhLm1hdGNoZXNieXByb2cucm93cy5sZW5ndGgpO1xyXG4gICAgICAgIH0pXHJcblxyXG4gICAgfVxyXG5cclxuICAgIGl0ZW1UYXAoaXRlbSkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiaXRlbVwiLCBKU09OLnN0cmluZ2lmeShpdGVtKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICAgICogVXNlIHRoZSBzaWRlRHJhd2VyVHJhbnNpdGlvbiBwcm9wZXJ0eSB0byBjaGFuZ2UgdGhlIG9wZW4vY2xvc2UgYW5pbWF0aW9uIG9mIHRoZSBkcmF3ZXIuXHJcbiAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICAgICAgdmFyIHF1ZXN0bz10aGlzO1xyXG4gICAgICAgIHRoaXMuX3NpZGVEcmF3ZXJUcmFuc2l0aW9uID0gbmV3IFNsaWRlSW5PblRvcFRyYW5zaXRpb24oKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIm5nb25vaW5pdFwiKTtcclxuICAgICAgICBxdWVzdG8uZGlzcGxheWVkbWJwID0gW107XHJcbiAgICAgICAgcXVlc3RvLmJhY2tlbmQuYWN0aXZlZ2FyYS5tYXRjaGVzYnlwcm9nLnJvd3MuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSwgaWR4KSB7XHJcbiAgICAgICAgICAgIGlmIChpdGVtLmRvYy5kYWRpc3B1dGFyZSA9PSAneWVzJykgcXVlc3RvLmRpc3BsYXllZG1icC5wdXNoKGl0ZW0pO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgY29uc29sZS5sb2coXCJkaXNwbGF5ZWRtYnBcIiwgcXVlc3RvLmRpc3BsYXllZG1icC5sZW5ndGgpO1xyXG5cclxuICAgICAgICBxdWVzdG8uaXNjcml0dGkgPSBxdWVzdG8uYmFja2VuZC5hY3RpdmVnYXJhLmdhcmEucm93c1swXS5kb2MuaXNjcml0dGkuc3BsaXQoXCIsXCIpO1xyXG5cclxuICAgICAgICBxdWVzdG8uaXNjcml0dGkuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSwgaWR4KSB7XHJcbiAgICAgICAgICAgIHZhciBhdGwgPSBxdWVzdG8uZ2V0QXRsZXRhSXNjcml0dG8oaXRlbSk7XHJcbiAgICAgICAgICAgIHF1ZXN0by5hdGxldGlpc2NyaXR0aS5wdXNoKGF0bCk7XHJcblxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgcXVlc3RvLmF0bGV0aWlzY3JpdHRpLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHtcclxuICAgICAgICAgICAgdmFyIGExID0gYS5jb2dub21lICsgYS5ub21lO1xyXG4gICAgICAgICAgICB2YXIgYjEgPSBiLmNvZ25vbWUgKyBiLm5vbWU7XHJcbiAgICAgICAgICAgIGlmIChhMSA+IGIxKSByZXR1cm4gMTtcclxuICAgICAgICAgICAgaWYgKGExIDwgYjEpIHJldHVybiAtMTtcclxuICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgfSlcclxuXHJcblxyXG4gICAgICAgIHF1ZXN0by5tcGE9W107XHJcbiAgICAgICAgcXVlc3RvLmJhY2tlbmQuYWN0aXZlZ2FyYS5tYXRjaGVzYnlwcm9nLnJvd3MuZm9yRWFjaChmdW5jdGlvbihpdGVtLGlkeCl7XHJcbiAgICAgICAgICAgIHZhciBhdGxpZD1pdGVtLmRvYy5hdGxldGFpZDtcclxuICAgICAgICAgICAgaWYgKGF0bGlkPT1xdWVzdG8uYXRsZXRhaWQpIHF1ZXN0by5tcGEucHVzaChpdGVtKTtcclxuICAgICAgICB9KVxyXG5cclxuXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHNpZGVEcmF3ZXJUcmFuc2l0aW9uKCk6IERyYXdlclRyYW5zaXRpb25CYXNlIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc2lkZURyYXdlclRyYW5zaXRpb247XHJcbiAgICB9XHJcblxyXG4gICAgLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICAgICogQWNjb3JkaW5nIHRvIGd1aWRlbGluZXMsIGlmIHlvdSBoYXZlIGEgZHJhd2VyIG9uIHlvdXIgcGFnZSwgeW91IHNob3VsZCBhbHdheXNcclxuICAgICogaGF2ZSBhIGJ1dHRvbiB0aGF0IG9wZW5zIGl0LiBVc2UgdGhlIHNob3dEcmF3ZXIoKSBmdW5jdGlvbiB0byBvcGVuIHRoZSBhcHAgZHJhd2VyIHNlY3Rpb24uXHJcbiAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG4gICAgb25EcmF3ZXJCdXR0b25UYXAoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5kcmF3ZXJDb21wb25lbnQuc2lkZURyYXdlci5zaG93RHJhd2VyKCk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGdldEltZyhtKSB7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcImdldEltZ1wiLCBtKTtcclxuICAgICAgICB2YXIgZG9jPW07XHJcbiAgICAgICAgaWYgKG0uaGFzT3duUHJvcGVydHkoXCJkb2NcIikpIGRvYz1tLmRvYztcclxuICAgICAgICB2YXIgaW1nc3JjOiBTdHJpbmcgPSBcIm1hdGNodG9wbGF5LnBuZ1wiO1xyXG4gICAgICAgIGlmIChkb2MuZGlzcHV0YXRvID09IFwieWVzXCIpIHtcclxuXHJcbiAgICAgICAgICAgIGltZ3NyYyA9IFwibWF0Y2hrby5wbmdcIjtcclxuICAgICAgICAgICAgaWYgKGRvYy52aW50byA9PSBcInllc1wiKSBpbWdzcmMgPSBcIm1hdGNob2sucG5nXCI7XHJcbiAgICAgICAgICAgIGlmIChkb2MubWVkYWdsaWFtYXRjaCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGRvYy5tZWRhZ2xpYW1hdGNoICE9IFwibm9uZVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW1nc3JjID0gXCJtZWRhZ2xpYV9cIiArIGRvYy5tZWRhZ2xpYW1hdGNoICsgXCIucG5nXCI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChkb2MucmVhbHRpbWUpIHtcclxuICAgICAgICAgICAgaWYgKFN0cmluZyhkb2MucmVhbHRpbWUpID09IFwidHJ1ZVwiKSBpbWdzcmMgPSBcImdyZWVuYmxpbmsuZ2lmXCI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbWdzcmMgPSBcIn4vaW1hZ2VzL1wiICsgaW1nc3JjO1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coXCJpbWdzcmNcIiwgaW1nc3JjKTtcclxuICAgICAgICByZXR1cm4gaW1nc3JjO1xyXG5cclxuXHJcblxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBnZXRJbWdQZXJBdGxldGEobSkge1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coXCJnZXRJbWdQZXJBdGxldGFcIiwgbSk7XHJcbiAgICAgICAgdmFyIGltZ3NyYzogU3RyaW5nID0gXCJtYXRjaHRvcGxheS5wbmdcIjtcclxuICAgICAgICB2YXIgbWVkYWdsaWEgPSBcIm5vbmVcIjtcclxuICAgICAgICBtLm1hdGNoZXNhcnJheS5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtLCBpZHgpIHtcclxuXHJcbiAgICAgICAgICAgIGlmIChpdGVtLm1lZGFnbGlhbWF0Y2ggIT0gXCJub25lXCIpIHtcclxuICAgICAgICAgICAgICAgIG1lZGFnbGlhID0gaXRlbS5tZWRhZ2xpYW1hdGNoO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKG1lZGFnbGlhICE9IFwibm9uZVwiKSBpbWdzcmMgPSBcIm1lZGFnbGlhX1wiICsgbWVkYWdsaWEgKyBcIi5wbmdcIjtcclxuXHJcblxyXG4gICAgICAgIGltZ3NyYyA9IFwifi9pbWFnZXMvXCIgKyBpbWdzcmM7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcImltZ3NyY1wiLCBpbWdzcmMpO1xyXG4gICAgICAgIHJldHVybiBpbWdzcmM7XHJcblxyXG5cclxuXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0QXRsZXRhSXNjcml0dG8oaSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmJhY2tlbmQuZ2V0QXRsZXRhQnlJZChpKTtcclxuICAgIH1cclxuXHJcbiAgICBnb3RvQ2hhdCgpIHtcclxuXHJcblxyXG5cclxuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCIvY2hhdFwiXSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0VmludG9QZXJzb0NsYXNzKGl0ZW0pIHtcclxuICAgICAgICB2YXIgcmV0Y2xhc3MgPSBcIlwiO1xyXG4gICAgICAgIHZhciBkb2MgPSBpdGVtO1xyXG4gICAgICAgIGlmIChpdGVtLmhhc093blByb3BlcnR5KFwiZG9jXCIpKSBkb2MgPSBpdGVtLmRvYztcclxuICAgICAgICBpZiAoZG9jLmRhZGlzcHV0YXJlID09IFwieWVzXCIpIHtcclxuICAgICAgICAgICAgaWYgKGRvYy5kaXNwdXRhdG8gPT0gXCJ5ZXNcIikge1xyXG4gICAgICAgICAgICAgICAgaWYgKGRvYy52aW50byA9PSBcInllc1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0Y2xhc3MgPSBcImdyZWVuYm9sZFwiO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHJldGNsYXNzID0gXCJyZWRib2xkXCI7XHJcbiAgICAgICAgICAgIH0gZWxzZSByZXRjbGFzcyA9IFwibm9uZGlzcHV0YXRvXCI7XHJcbiAgICAgICAgfSBlbHNlIHJldGNsYXNzID0gXCJkYW5vbmRpc3B1dGFyZVwiO1xyXG4gICAgICAgIHJldHVybiByZXRjbGFzcyArICcgbWF0Y2hudW0nO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFJpc3VsdGF0b1RleHQoaXRlbSkge1xyXG4gICAgICAgIHZhciByZXRjbGFzcyA9IFwiXCI7XHJcbiAgICAgICAgdmFyIGRvYz1pdGVtO1xyXG4gICAgICAgIGlmIChpdGVtLmhhc093blByb3BlcnR5KFwiZG9jXCIpKSBkb2MgPSBpdGVtLmRvYztcclxuICAgICAgICBpZiAoZG9jLmRpc3B1dGF0byA9PSBcInllc1wiKSB7XHJcbiAgICAgICAgICAgIGlmIChkb2MudmludG8gPT0gXCJ5ZXNcIikge1xyXG4gICAgICAgICAgICAgICAgcmV0Y2xhc3MgPSBcIlZpbnRvLCByaXN1bHRhdG8gXCIgKyBpdGVtLmRvYy5yaXN1bHRhdG87XHJcbiAgICAgICAgICAgIH0gZWxzZSByZXRjbGFzcyA9IFwiUGVyc28sIHJpc3VsdGF0byBcIiArIGl0ZW0uZG9jLnJpc3VsdGF0bztcclxuICAgICAgICB9IGVsc2UgcmV0Y2xhc3MgPSBcIk5vbiBkaXNwdXRhdG9cIjtcclxuICAgICAgICByZXR1cm4gcmV0Y2xhc3M7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0UmlzdWx0YXRvQ2xhc3MoaXRlbSkge1xyXG4gICAgICAgIHZhciByZXRjbGFzcyA9IFwiXCI7XHJcbiAgICAgICAgdmFyIGRvYz1pdGVtO1xyXG4gICAgICAgIGlmIChpdGVtLmhhc093blByb3BlcnR5KFwiZG9jXCIpKSBkb2MgPSBpdGVtLmRvYztcclxuICAgICAgICBpZiAoZG9jLmRpc3B1dGF0byA9PSBcInllc1wiKSB7XHJcbiAgICAgICAgICAgIGlmIChkb2MudmludG8gPT0gXCJ5ZXNcIikge1xyXG4gICAgICAgICAgICAgICAgcmV0Y2xhc3MgPSBcImdyZWVuYm9sZFwiO1xyXG4gICAgICAgICAgICB9IGVsc2UgcmV0Y2xhc3MgPSBcInJlZGJvbGRcIjtcclxuICAgICAgICB9IGVsc2UgcmV0Y2xhc3MgPSBcIm5vbmRpc3B1dGF0b1wiO1xyXG4gICAgICAgIHJldHVybiByZXRjbGFzcztcclxuICAgIH1cclxufVxyXG4iXX0=