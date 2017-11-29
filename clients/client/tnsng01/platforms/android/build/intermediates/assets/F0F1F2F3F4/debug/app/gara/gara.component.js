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
        this.route.queryParams.subscribe(function (params) {
            console.log("params", JSON.stringify(params));
            _this.garaid = params.id;
            console.log("garaid", _this.garaid);
            _this.refresh(function (data) { });
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
            questo.jgara = questo.gara.gara.rows[0].doc;
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
    __decorate([
        core_1.ViewChild("drawer"),
        __metadata("design:type", angular_1.RadSideDrawerComponent)
    ], GaraComponent.prototype, "drawerComponent", void 0);
    GaraComponent = __decorate([
        core_1.Component({
            selector: "Gara",
            moduleId: module.id,
            templateUrl: "./gara.component.html",
            styleUrls: ["./gara.component.css"]
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute, router_1.Router, backend_1.Backend])
    ], GaraComponent);
    return GaraComponent;
}());
exports.GaraComponent = GaraComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FyYS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJnYXJhLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUE2RDtBQUM3RCxpRUFBa0c7QUFDbEcsc0VBQW9GO0FBQ3BGLHdEQUF1RDtBQUN2RCwwQ0FBMkU7QUFDM0Usa0RBQWtFO0FBQ2xFLHNDQUF5QztBQU96QztJQW1DSSx1QkFBbUIsS0FBcUIsRUFBUyxNQUFjLEVBQVMsT0FBZ0I7UUFBeEYsaUJBb0JDO1FBcEJrQixVQUFLLEdBQUwsS0FBSyxDQUFnQjtRQUFTLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBUyxZQUFPLEdBQVAsT0FBTyxDQUFTO1FBNUJ4RixnQkFBVyxHQUFHLENBQUMsV0FBVyxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDakUsVUFBSyxHQUFRO1lBQ1QsRUFBRSxFQUFFLEVBQUU7WUFDTixLQUFLLEVBQUUsRUFBRTtZQUNULFFBQVEsRUFBRSxFQUFFO1lBQ1osSUFBSSxFQUFFLEVBQUU7U0FDWCxDQUFDO1FBQ0YsU0FBSSxHQUFRO1lBQ1IsYUFBYSxFQUFFO2dCQUNYLElBQUksRUFBRSxFQUFFO2FBQ1g7WUFDRCxlQUFlLEVBQUU7Z0JBQ2IsSUFBSSxFQUFFLEVBQUU7YUFDWDtZQUNELE9BQU8sRUFBRTtnQkFDTCxJQUFJLEVBQUUsRUFBRTthQUNYO1NBQ0osQ0FBQztRQUNGLGlCQUFZLEdBQUcsRUFBRSxDQUFDO1FBQ2xCLGFBQVEsR0FBRyxFQUFFLENBQUM7UUFDZCxtQkFBYyxHQUFHLEVBQUUsQ0FBQztRQUNwQixXQUFNLEdBQUcsRUFBRSxDQUFDO1FBQ1osa0JBQWEsR0FBRyxXQUFXLENBQUM7UUFDNUIsWUFBTyxHQUFHLFdBQVcsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNoQyxZQUFPLEdBQUcsS0FBSyxDQUFDO1FBS1osSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENB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SUF2UG9CO1FBQXBCLGdCQUFTLENBQUMsUUFBUSxDQUFDO2tDQUFrQixnQ0FBc0I7MERBQUM7SUFMcEQsYUFBYTtRQU56QixnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLE1BQU07WUFDaEIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBRSx1QkFBdUI7WUFDcEMsU0FBUyxFQUFFLENBQUMsc0JBQXNCLENBQUM7U0FDdEMsQ0FBQzt5Q0FvQzRCLHVCQUFjLEVBQWlCLGVBQU0sRUFBa0IsaUJBQU87T0FuQy9FLGFBQWEsQ0E2UHpCO0lBQUQsb0JBQUM7Q0FBQSxBQTdQRCxJQTZQQztBQTdQWSxzQ0FBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBWaWV3Q2hpbGQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBEcmF3ZXJUcmFuc2l0aW9uQmFzZSwgU2xpZGVJbk9uVG9wVHJhbnNpdGlvbiB9IGZyb20gXCJuYXRpdmVzY3JpcHQtdGVsZXJpay11aS9zaWRlZHJhd2VyXCI7XHJcbmltcG9ydCB7IFJhZFNpZGVEcmF3ZXJDb21wb25lbnQgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXRlbGVyaWstdWkvc2lkZWRyYXdlci9hbmd1bGFyXCI7XHJcbmltcG9ydCB7IEJhY2tlbmQgfSBmcm9tIFwiLi4vcHJvdmlkZXJzL2JhY2tlbmQvYmFja2VuZFwiO1xyXG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSwgUm91dGVyLCBOYXZpZ2F0aW9uRXh0cmFzIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xyXG5pbXBvcnQgeyBTZWdtZW50ZWRCYXIsIFNlZ21lbnRlZEJhckl0ZW0gfSBmcm9tIFwidWkvc2VnbWVudGVkLWJhclwiO1xyXG5pbXBvcnQgZnJhbWVNb2R1bGUgPSByZXF1aXJlKFwidWkvZnJhbWVcIik7XHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6IFwiR2FyYVwiLFxyXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuICAgIHRlbXBsYXRlVXJsOiBcIi4vZ2FyYS5jb21wb25lbnQuaHRtbFwiLFxyXG4gICAgc3R5bGVVcmxzOiBbXCIuL2dhcmEuY29tcG9uZW50LmNzc1wiXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgR2FyYUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgICAvKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gICAgKiBVc2UgdGhlIEBWaWV3Q2hpbGQgZGVjb3JhdG9yIHRvIGdldCBhIHJlZmVyZW5jZSB0byB0aGUgZHJhd2VyIGNvbXBvbmVudC5cclxuICAgICogSXQgaXMgdXNlZCBpbiB0aGUgXCJvbkRyYXdlckJ1dHRvblRhcFwiIGZ1bmN0aW9uIGJlbG93IHRvIG1hbmlwdWxhdGUgdGhlIGRyYXdlci5cclxuICAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcbiAgICBAVmlld0NoaWxkKFwiZHJhd2VyXCIpIGRyYXdlckNvbXBvbmVudDogUmFkU2lkZURyYXdlckNvbXBvbmVudDtcclxuICAgIG15c2VnbWVudHM6IEFycmF5PFNlZ21lbnRlZEJhckl0ZW0+O1xyXG4gICAgc2VnbWVudHNhcnIgPSBbXCJQZXIgTWF0Y2hcIiwgXCJQZXIgQXRsZXRhXCIsIFwiQ3JvbmFjYVwiLCBcIklzY3JpdHRpXCJdO1xyXG4gICAgamdhcmE6IGFueSA9IHtcclxuICAgICAgICBpZDogXCJcIixcclxuICAgICAgICB0aXRsZTogXCJcIixcclxuICAgICAgICBsb2NhdGlvbjogXCJcIixcclxuICAgICAgICBkYXRhOiBcIlwiXHJcbiAgICB9O1xyXG4gICAgZ2FyYTogYW55ID0ge1xyXG4gICAgICAgIG1hdGNoZXNieXByb2c6IHtcclxuICAgICAgICAgICAgcm93czogW11cclxuICAgICAgICB9LFxyXG4gICAgICAgIG1hdGNoZXNieWF0bGV0YToge1xyXG4gICAgICAgICAgICByb3dzOiBbXVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY3JvbmFjYToge1xyXG4gICAgICAgICAgICByb3dzOiBbXVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICBkaXNwbGF5ZWRtYnAgPSBbXTtcclxuICAgIGlzY3JpdHRpID0gW107XHJcbiAgICBhdGxldGlpc2NyaXR0aSA9IFtdO1xyXG4gICAgZ2FyYWlkID0gXCJcIjtcclxuICAgIGFjdGl2ZXNlZ21lbnQgPSBcIlBlciBNYXRjaFwiO1xyXG4gICAgdG9wbW9zdCA9IGZyYW1lTW9kdWxlLnRvcG1vc3QoKTtcclxuICAgIGxvYWRpbmcgPSBmYWxzZTtcclxuXHJcbiAgICBwcml2YXRlIF9zaWRlRHJhd2VyVHJhbnNpdGlvbjogRHJhd2VyVHJhbnNpdGlvbkJhc2U7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHVibGljIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSwgcHVibGljIHJvdXRlcjogUm91dGVyLCBwdWJsaWMgYmFja2VuZDogQmFja2VuZCkge1xyXG4gICAgICAgIHRoaXMucm91dGUucXVlcnlQYXJhbXMuc3Vic2NyaWJlKHBhcmFtcyA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicGFyYW1zXCIsIEpTT04uc3RyaW5naWZ5KHBhcmFtcykpO1xyXG4gICAgICAgICAgICB0aGlzLmdhcmFpZCA9IHBhcmFtcy5pZDtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJnYXJhaWRcIiwgdGhpcy5nYXJhaWQpO1xyXG4gICAgICAgICAgICB0aGlzLnJlZnJlc2goZnVuY3Rpb24gKGRhdGEpIHsgfSk7XHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLm15c2VnbWVudHMgPSBbXTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnNlZ21lbnRzYXJyLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGl0ZW0gPSBuZXcgU2VnbWVudGVkQmFySXRlbSgpO1xyXG4gICAgICAgICAgICBpdGVtLnRpdGxlID0gdGhpcy5zZWdtZW50c2FycltpXTtcclxuICAgICAgICAgICAgdGhpcy5teXNlZ21lbnRzLnB1c2goaXRlbSk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcblxyXG5cclxuICAgIH1cclxuXHJcbiAgICBvblNlbGVjdGVkU2VnbWVudENoYW5nZShldikge1xyXG4gICAgICAgIGxldCBzYmFyID0gPFNlZ21lbnRlZEJhcj5ldi5vYmplY3Q7XHJcbiAgICAgICAgdGhpcy5hY3RpdmVzZWdtZW50ID0gdGhpcy5zZWdtZW50c2FycltzYmFyLnNlbGVjdGVkSW5kZXhdO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiYWN0aXZlc2VnbWVudFwiLCB0aGlzLmFjdGl2ZXNlZ21lbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1bGxSZWZyZXNoKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwicHVsbHJlZnJlc2hcIik7XHJcbiAgICAgICAgdmFyIHF1ZXN0byA9IHRoaXM7XHJcbiAgICAgICAgcXVlc3RvLmxvYWRpbmcgPSB0cnVlO1xyXG4gICAgICAgIHF1ZXN0by5yZWZyZXNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJyZWZyZXNoZWRcIik7XHJcbiAgICAgICAgICAgIHF1ZXN0by5sb2FkaW5nID0gZmFsc2U7XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcblxyXG4gICAgcmVmcmVzaChjYWxsYmFjaykge1xyXG4gICAgICAgIHZhciBxdWVzdG8gPSB0aGlzO1xyXG4gICAgICAgIHZhciB1cmwgPSBxdWVzdG8uYmFja2VuZC5yb290dXJsICsgXCIvZ2FyZS9mdWxsZ2FyYWJ5aWQvXCIgKyB0aGlzLmdhcmFpZCArIFwiP3NvY2lldGFpZD0yMDE2MDIxNzIyMDQwMFwiO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiY2FsbGluZyB1cmxcIiwgdXJsKTtcclxuICAgICAgICBxdWVzdG8uYmFja2VuZC5mZXRjaERhdGEodXJsLCBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICBxdWVzdG8uZ2FyYSA9IGRhdGE7XHJcbiAgICAgICAgICAgIHF1ZXN0by5iYWNrZW5kLmFjdGl2ZWdhcmEgPSBkYXRhO1xyXG4gICAgICAgICAgICBxdWVzdG8uamdhcmEgPSBxdWVzdG8uZ2FyYS5nYXJhLnJvd3NbMF0uZG9jO1xyXG4gICAgICAgICAgICBxdWVzdG8uZGlzcGxheWVkbWJwID0gW107XHJcbiAgICAgICAgICAgIHF1ZXN0by5nYXJhLm1hdGNoZXNieXByb2cucm93cy5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtLCBpZHgpIHtcclxuICAgICAgICAgICAgICAgIGlmIChpdGVtLmRvYy5kYWRpc3B1dGFyZSA9PSAneWVzJykgcXVlc3RvLmRpc3BsYXllZG1icC5wdXNoKGl0ZW0pO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImRpc3BsYXllZG1icFwiLCBxdWVzdG8uZGlzcGxheWVkbWJwLmxlbmd0aCk7XHJcblxyXG4gICAgICAgICAgICBxdWVzdG8uaXNjcml0dGkgPSBxdWVzdG8uZ2FyYS5nYXJhLnJvd3NbMF0uZG9jLmlzY3JpdHRpLnNwbGl0KFwiLFwiKTtcclxuXHJcbiAgICAgICAgICAgIHF1ZXN0by5pc2NyaXR0aS5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtLCBpZHgpIHtcclxuICAgICAgICAgICAgICAgIHZhciBhdGwgPSBxdWVzdG8uZ2V0QXRsZXRhSXNjcml0dG8oaXRlbSk7XHJcbiAgICAgICAgICAgICAgICBxdWVzdG8uYXRsZXRpaXNjcml0dGkucHVzaChhdGwpO1xyXG5cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgcXVlc3RvLmF0bGV0aWlzY3JpdHRpLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHtcclxuICAgICAgICAgICAgICAgIHZhciBhMSA9IGEuY29nbm9tZSArIGEubm9tZTtcclxuICAgICAgICAgICAgICAgIHZhciBiMSA9IGIuY29nbm9tZSArIGIubm9tZTtcclxuICAgICAgICAgICAgICAgIGlmIChhMSA+IGIxKSByZXR1cm4gMTtcclxuICAgICAgICAgICAgICAgIGlmIChhMSA8IGIxKSByZXR1cm4gLTE7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZ2FyYVwiLCBxdWVzdG8uZ2FyYS5tYXRjaGVzYnlwcm9nLnJvd3MubGVuZ3RoKTtcclxuICAgICAgICAgICAgaWYgKGNhbGxiYWNrKSBjYWxsYmFjaygpO1xyXG4gICAgICAgIH0pXHJcblxyXG4gICAgfVxyXG5cclxuICAgIGl0ZW1UYXAoaXRlbSkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiaXRlbVwiLCBKU09OLnN0cmluZ2lmeShpdGVtKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICAgICogVXNlIHRoZSBzaWRlRHJhd2VyVHJhbnNpdGlvbiBwcm9wZXJ0eSB0byBjaGFuZ2UgdGhlIG9wZW4vY2xvc2UgYW5pbWF0aW9uIG9mIHRoZSBkcmF3ZXIuXHJcbiAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fc2lkZURyYXdlclRyYW5zaXRpb24gPSBuZXcgU2xpZGVJbk9uVG9wVHJhbnNpdGlvbigpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwibmdvbm9pbml0XCIpXHJcblxyXG4gICAgfVxyXG5cclxuICAgIGdldCBzaWRlRHJhd2VyVHJhbnNpdGlvbigpOiBEcmF3ZXJUcmFuc2l0aW9uQmFzZSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NpZGVEcmF3ZXJUcmFuc2l0aW9uO1xyXG4gICAgfVxyXG5cclxuICAgIC8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAgICAqIEFjY29yZGluZyB0byBndWlkZWxpbmVzLCBpZiB5b3UgaGF2ZSBhIGRyYXdlciBvbiB5b3VyIHBhZ2UsIHlvdSBzaG91bGQgYWx3YXlzXHJcbiAgICAqIGhhdmUgYSBidXR0b24gdGhhdCBvcGVucyBpdC4gVXNlIHRoZSBzaG93RHJhd2VyKCkgZnVuY3Rpb24gdG8gb3BlbiB0aGUgYXBwIGRyYXdlciBzZWN0aW9uLlxyXG4gICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuICAgIG9uRHJhd2VyQnV0dG9uVGFwKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuZHJhd2VyQ29tcG9uZW50LnNpZGVEcmF3ZXIuc2hvd0RyYXdlcigpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBnZXRJbWcobSkge1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coXCJnZXRJbWdcIiwgbSk7XHJcbiAgICAgICAgdmFyIGltZ3NyYzogU3RyaW5nID0gXCJtYXRjaHRvcGxheS5wbmdcIjtcclxuICAgICAgICBpZiAobS5kb2MuZGlzcHV0YXRvID09IFwieWVzXCIpIHtcclxuXHJcbiAgICAgICAgICAgIGltZ3NyYyA9IFwibWF0Y2hrby5wbmdcIjtcclxuICAgICAgICAgICAgaWYgKG0uZG9jLnZpbnRvID09IFwieWVzXCIpIGltZ3NyYyA9IFwibWF0Y2hvay5wbmdcIjtcclxuICAgICAgICAgICAgaWYgKG0uZG9jLm1lZGFnbGlhbWF0Y2gpIHtcclxuICAgICAgICAgICAgICAgIGlmIChtLmRvYy5tZWRhZ2xpYW1hdGNoICE9IFwibm9uZVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW1nc3JjID0gXCJtZWRhZ2xpYV9cIiArIG0uZG9jLm1lZGFnbGlhbWF0Y2ggKyBcIi5wbmdcIjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG0uZG9jLnJlYWx0aW1lKSB7XHJcbiAgICAgICAgICAgIGlmIChTdHJpbmcobS5kb2MucmVhbHRpbWUpID09IFwidHJ1ZVwiKSBpbWdzcmMgPSBcImdyZWVuYmxpbmsuZ2lmXCI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbWdzcmMgPSBcIn4vaW1hZ2VzL1wiICsgaW1nc3JjO1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coXCJpbWdzcmNcIiwgaW1nc3JjKTtcclxuICAgICAgICByZXR1cm4gaW1nc3JjO1xyXG5cclxuXHJcblxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBnZXRJbWdQZXJBdGxldGEobSkge1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coXCJnZXRJbWdQZXJBdGxldGFcIiwgbSk7XHJcbiAgICAgICAgdmFyIGltZ3NyYzogU3RyaW5nID0gXCJtYXRjaHRvcGxheS5wbmdcIjtcclxuICAgICAgICB2YXIgbWVkYWdsaWEgPSBcIm5vbmVcIjtcclxuICAgICAgICBtLm1hdGNoZXNhcnJheS5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtLCBpZHgpIHtcclxuXHJcbiAgICAgICAgICAgIGlmIChpdGVtLm1lZGFnbGlhbWF0Y2ggIT0gXCJub25lXCIpIHtcclxuICAgICAgICAgICAgICAgIG1lZGFnbGlhID0gaXRlbS5tZWRhZ2xpYW1hdGNoO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKG1lZGFnbGlhICE9IFwibm9uZVwiKSBpbWdzcmMgPSBcIm1lZGFnbGlhX1wiICsgbWVkYWdsaWEgKyBcIi5wbmdcIjtcclxuXHJcblxyXG4gICAgICAgIGltZ3NyYyA9IFwifi9pbWFnZXMvXCIgKyBpbWdzcmM7XHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcImltZ3NyY1wiLCBpbWdzcmMpO1xyXG4gICAgICAgIHJldHVybiBpbWdzcmM7XHJcblxyXG5cclxuXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0QXRsZXRhSXNjcml0dG8oaSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmJhY2tlbmQuZ2V0QXRsZXRhQnlJZChpKTtcclxuICAgIH1cclxuXHJcbiAgICBnb3RvQ2hhdCgpIHtcclxuXHJcblxyXG5cclxuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCIvY2hhdFwiXSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0VmludG9QZXJzb0NsYXNzKGl0ZW0pIHtcclxuICAgICAgICB2YXIgcmV0Y2xhc3MgPSBcIlwiO1xyXG4gICAgICAgIHZhciBkb2MgPSBpdGVtO1xyXG4gICAgICAgIGlmIChpdGVtLmhhc093blByb3BlcnR5KFwiZG9jXCIpKSBkb2MgPSBpdGVtLmRvYztcclxuICAgICAgICBpZiAoZG9jLmRhZGlzcHV0YXJlID09IFwieWVzXCIpIHtcclxuICAgICAgICAgICAgaWYgKGRvYy5kaXNwdXRhdG8gPT0gXCJ5ZXNcIikge1xyXG4gICAgICAgICAgICAgICAgaWYgKGRvYy52aW50byA9PSBcInllc1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0Y2xhc3MgPSBcImdyZWVuYm9sZFwiO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHJldGNsYXNzID0gXCJyZWRib2xkXCI7XHJcbiAgICAgICAgICAgIH0gZWxzZSByZXRjbGFzcyA9IFwibm9uZGlzcHV0YXRvXCI7XHJcbiAgICAgICAgfSBlbHNlIHJldGNsYXNzID0gXCJkYW5vbmRpc3B1dGFyZVwiO1xyXG4gICAgICAgIHJldHVybiByZXRjbGFzcyArICcgbWF0Y2hudW0nO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFJpc3VsdGF0b1RleHQoaXRlbSkge1xyXG4gICAgICAgIHZhciByZXRjbGFzcyA9IFwiXCI7XHJcbiAgICAgICAgaWYgKGl0ZW0uZG9jLmRpc3B1dGF0byA9PSBcInllc1wiKSB7XHJcbiAgICAgICAgICAgIGlmIChpdGVtLmRvYy52aW50byA9PSBcInllc1wiKSB7XHJcbiAgICAgICAgICAgICAgICByZXRjbGFzcyA9IFwiVmludG8sIHJpc3VsdGF0byBcIiArIGl0ZW0uZG9jLnJpc3VsdGF0bztcclxuICAgICAgICAgICAgfSBlbHNlIHJldGNsYXNzID0gXCJQZXJzbywgcmlzdWx0YXRvIFwiICsgaXRlbS5kb2MucmlzdWx0YXRvO1xyXG4gICAgICAgIH0gZWxzZSByZXRjbGFzcyA9IFwiTm9uIGRpc3B1dGF0b1wiO1xyXG4gICAgICAgIHJldHVybiByZXRjbGFzcztcclxuICAgIH1cclxuXHJcbiAgICBnZXRSaXN1bHRhdG9DbGFzcyhpdGVtKSB7XHJcbiAgICAgICAgdmFyIHJldGNsYXNzID0gXCJcIjtcclxuICAgICAgICBpZiAoaXRlbS5kb2MuZGlzcHV0YXRvID09IFwieWVzXCIpIHtcclxuICAgICAgICAgICAgaWYgKGl0ZW0uZG9jLnZpbnRvID09IFwieWVzXCIpIHtcclxuICAgICAgICAgICAgICAgIHJldGNsYXNzID0gXCJncmVlbmJvbGRcIjtcclxuICAgICAgICAgICAgfSBlbHNlIHJldGNsYXNzID0gXCJyZWRib2xkXCI7XHJcbiAgICAgICAgfSBlbHNlIHJldGNsYXNzID0gXCJub25kaXNwdXRhdG9cIjtcclxuICAgICAgICByZXR1cm4gcmV0Y2xhc3M7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHNob3dNYXRjaGVzRm9yQXRsZXRhKGdhcmFpZCwgYXRsZXRhaWQpIHtcclxuICAgICAgICB2YXIgcXVlc3RvID0gdGhpcztcclxuXHJcbiAgICAgICAgdmFyIG1wYSA9IFtdO1xyXG5cclxuICAgICAgICBxdWVzdG8uZ2FyYS5tYXRjaGVzYnlwcm9nLnJvd3MuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSwgaWR4KSB7XHJcbiAgICAgICAgICAgIGlmIChpdGVtLmRvYy5hdGxldGFpZCA9PSBhdGxldGFpZCkgbXBhLnB1c2goaXRlbSk7XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgdmFyIHBhcnMgPSB7XHJcbiAgICAgICAgICAgIGF0bGV0YWlkOiBhdGxldGFpZFxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBuYXZpZ2F0aW9uRXh0cmFzOiBOYXZpZ2F0aW9uRXh0cmFzID0ge1xyXG4gICAgICAgICAgICBxdWVyeVBhcmFtczoge1xyXG4gICAgICAgICAgICAgICAgcGFybXM6IEpTT04uc3RyaW5naWZ5KHBhcnMpXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcInF1ZXJ5UGFyYW1zXCIsbmF2aWdhdGlvbkV4dHJhcy5xdWVyeVBhcmFtcy5wYXJtcyk7XHJcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW1wiL21hdGNoZXNmb3JhdGxldGFcIl0sIG5hdmlnYXRpb25FeHRyYXMpO1xyXG4gICAgfVxyXG59XHJcbiJdfQ==