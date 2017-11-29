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
var router_1 = require("@angular/router");
var backend_1 = require("../providers/backend/backend");
var GareComponent = (function () {
    function GareComponent(router, backend) {
        this.router = router;
        this.backend = backend;
        this.gare = [];
        this.refresh(function (data) { });
    }
    GareComponent.prototype.refresh = function (callback) {
        var questo = this;
        var url = questo.backend.rooturl + "/gare/findall?societa=20160217220400";
        console.log("calling url", url);
        questo.backend.fetchData(url, function (data) {
            questo.gare = data.rows;
            console.log("gare", questo.gare.length);
        });
    };
    GareComponent.prototype.itemTap = function (item) {
        console.log("item", JSON.stringify(item));
        console.log("tapped id ", item.doc.id);
        var navigationExtras = {
            queryParams: {
                "id": item.doc.id
            }
        };
        this.router.navigate(["/gara"], navigationExtras);
    };
    GareComponent.prototype.ngOnInit = function () {
        this._sideDrawerTransition = new sidedrawer_1.SlideInOnTopTransition();
    };
    Object.defineProperty(GareComponent.prototype, "sideDrawerTransition", {
        get: function () {
            return this._sideDrawerTransition;
        },
        enumerable: true,
        configurable: true
    });
    GareComponent.prototype.onDrawerButtonTap = function () {
        this.drawerComponent.sideDrawer.showDrawer();
    };
    GareComponent.prototype.getGaraClass = function (item) {
        var retclass = "gararow gara" + item.doc.stato;
        return retclass;
    };
    __decorate([
        core_1.ViewChild("drawer"),
        __metadata("design:type", angular_1.RadSideDrawerComponent)
    ], GareComponent.prototype, "drawerComponent", void 0);
    GareComponent = __decorate([
        core_1.Component({
            selector: "Gare",
            moduleId: module.id,
            templateUrl: "./gare.component.html",
            styleUrls: ["./gare.component.css"]
        }),
        __metadata("design:paramtypes", [router_1.Router, backend_1.Backend])
    ], GareComponent);
    return GareComponent;
}());
exports.GareComponent = GareComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FyZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJnYXJlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUE2RDtBQUM3RCxpRUFBa0c7QUFDbEcsc0VBQW9GO0FBQ3BGLDBDQUF3RDtBQUV4RCx3REFBdUQ7QUFPdkQ7SUFVSSx1QkFBbUIsTUFBYyxFQUFTLE9BQWdCO1FBQXZDLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBUyxZQUFPLEdBQVAsT0FBTyxDQUFTO1FBSjFELFNBQUksR0FBTyxFQUFFLENBQUE7UUFLVCxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVMsSUFBSSxJQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFHRCwrQkFBTyxHQUFQLFVBQVEsUUFBUTtRQUNaLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQztRQUNsQixJQUFJLEdBQUcsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sR0FBRyxzQ0FBc0MsQ0FBQztRQUMxRSxPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBQyxHQUFHLENBQUMsQ0FBQztRQUMvQixNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUMsVUFBUyxJQUFJO1lBQ3RDLE1BQU0sQ0FBQyxJQUFJLEdBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUN0QixPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzNDLENBQUMsQ0FBQyxDQUFBO0lBRU4sQ0FBQztJQUVELCtCQUFPLEdBQVAsVUFBUSxJQUFJO1FBQ1IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ3pDLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDdEMsSUFBSSxnQkFBZ0IsR0FBcUI7WUFDckMsV0FBVyxFQUFFO2dCQUNULElBQUksRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUU7YUFDcEI7U0FFSixDQUFDO1FBRUYsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO0lBQ3RELENBQUM7SUFLRCxnQ0FBUSxHQUFSO1FBQ0ksSUFBSSxDQUFDLHFCQUFxQixHQUFHLElBQUksbUNBQXNCLEVBQUUsQ0FBQztJQUM5RCxDQUFDO0lBRUQsc0JBQUksK0NBQW9CO2FBQXhCO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQztRQUN0QyxDQUFDOzs7T0FBQTtJQU1ELHlDQUFpQixHQUFqQjtRQUNJLElBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBRWpELENBQUM7SUFFRCxvQ0FBWSxHQUFaLFVBQWEsSUFBSTtRQUNiLElBQUksUUFBUSxHQUFDLGNBQWMsR0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQztRQUMzQyxNQUFNLENBQUMsUUFBUSxDQUFDO0lBQ3BCLENBQUM7SUF6RG9CO1FBQXBCLGdCQUFTLENBQUMsUUFBUSxDQUFDO2tDQUFrQixnQ0FBc0I7MERBQUM7SUFMcEQsYUFBYTtRQU56QixnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLE1BQU07WUFDaEIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBRSx1QkFBdUI7WUFDcEMsU0FBUyxFQUFFLENBQUMsc0JBQXNCLENBQUM7U0FDdEMsQ0FBQzt5Q0FXNkIsZUFBTSxFQUFrQixpQkFBTztPQVZqRCxhQUFhLENBZ0V6QjtJQUFELG9CQUFDO0NBQUEsQUFoRUQsSUFnRUM7QUFoRVksc0NBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgVmlld0NoaWxkIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgRHJhd2VyVHJhbnNpdGlvbkJhc2UsIFNsaWRlSW5PblRvcFRyYW5zaXRpb24gfSBmcm9tIFwibmF0aXZlc2NyaXB0LXRlbGVyaWstdWkvc2lkZWRyYXdlclwiO1xyXG5pbXBvcnQgeyBSYWRTaWRlRHJhd2VyQ29tcG9uZW50IH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC10ZWxlcmlrLXVpL3NpZGVkcmF3ZXIvYW5ndWxhclwiO1xyXG5pbXBvcnQge1JvdXRlcixOYXZpZ2F0aW9uRXh0cmFzfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XHJcblxyXG5pbXBvcnQgeyBCYWNrZW5kIH0gZnJvbSBcIi4uL3Byb3ZpZGVycy9iYWNrZW5kL2JhY2tlbmRcIjtcclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogXCJHYXJlXCIsXHJcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxyXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9nYXJlLmNvbXBvbmVudC5odG1sXCIsXHJcbiAgICBzdHlsZVVybHM6IFtcIi4vZ2FyZS5jb21wb25lbnQuY3NzXCJdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBHYXJlQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICAgIC8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAgICAqIFVzZSB0aGUgQFZpZXdDaGlsZCBkZWNvcmF0b3IgdG8gZ2V0IGEgcmVmZXJlbmNlIHRvIHRoZSBkcmF3ZXIgY29tcG9uZW50LlxyXG4gICAgKiBJdCBpcyB1c2VkIGluIHRoZSBcIm9uRHJhd2VyQnV0dG9uVGFwXCIgZnVuY3Rpb24gYmVsb3cgdG8gbWFuaXB1bGF0ZSB0aGUgZHJhd2VyLlxyXG4gICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuICAgIEBWaWV3Q2hpbGQoXCJkcmF3ZXJcIikgZHJhd2VyQ29tcG9uZW50OiBSYWRTaWRlRHJhd2VyQ29tcG9uZW50O1xyXG4gICAgZ2FyZTogYW55ID1bXVxyXG5cclxuICAgIHByaXZhdGUgX3NpZGVEcmF3ZXJUcmFuc2l0aW9uOiBEcmF3ZXJUcmFuc2l0aW9uQmFzZTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgcm91dGVyOiBSb3V0ZXIsIHB1YmxpYyBiYWNrZW5kOiBCYWNrZW5kKSB7XHJcbiAgICAgICAgdGhpcy5yZWZyZXNoKGZ1bmN0aW9uKGRhdGEpe30pO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICByZWZyZXNoKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgdmFyIHF1ZXN0byA9IHRoaXM7XHJcbiAgICAgICAgdmFyIHVybCA9IHF1ZXN0by5iYWNrZW5kLnJvb3R1cmwgKyBcIi9nYXJlL2ZpbmRhbGw/c29jaWV0YT0yMDE2MDIxNzIyMDQwMFwiO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiY2FsbGluZyB1cmxcIix1cmwpO1xyXG4gICAgICAgIHF1ZXN0by5iYWNrZW5kLmZldGNoRGF0YSh1cmwsZnVuY3Rpb24oZGF0YSl7XHJcbiAgICAgICAgICAgIHF1ZXN0by5nYXJlPWRhdGEucm93cztcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJnYXJlXCIscXVlc3RvLmdhcmUubGVuZ3RoKTtcclxuICAgICAgICB9KVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBpdGVtVGFwKGl0ZW0pIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIml0ZW1cIixKU09OLnN0cmluZ2lmeShpdGVtKSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJ0YXBwZWQgaWQgXCIsaXRlbS5kb2MuaWQpO1xyXG4gICAgICAgIGxldCBuYXZpZ2F0aW9uRXh0cmFzOiBOYXZpZ2F0aW9uRXh0cmFzID0ge1xyXG4gICAgICAgICAgICBxdWVyeVBhcmFtczoge1xyXG4gICAgICAgICAgICAgICAgXCJpZFwiOiBpdGVtLmRvYy5pZFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgXHJcbiAgICAgICAgfTtcclxuICAgICAgIC8vIGNvbnNvbGUubG9nKFwicXVlcnlQYXJhbXNcIixuYXZpZ2F0aW9uRXh0cmFzLnF1ZXJ5UGFyYW1zLmlkKTtcclxuICAgICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbXCIvZ2FyYVwiXSwgbmF2aWdhdGlvbkV4dHJhcyk7XHJcbiAgICB9XHJcblxyXG4gICAgLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICAgICogVXNlIHRoZSBzaWRlRHJhd2VyVHJhbnNpdGlvbiBwcm9wZXJ0eSB0byBjaGFuZ2UgdGhlIG9wZW4vY2xvc2UgYW5pbWF0aW9uIG9mIHRoZSBkcmF3ZXIuXHJcbiAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fc2lkZURyYXdlclRyYW5zaXRpb24gPSBuZXcgU2xpZGVJbk9uVG9wVHJhbnNpdGlvbigpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCBzaWRlRHJhd2VyVHJhbnNpdGlvbigpOiBEcmF3ZXJUcmFuc2l0aW9uQmFzZSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NpZGVEcmF3ZXJUcmFuc2l0aW9uO1xyXG4gICAgfVxyXG5cclxuICAgIC8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAgICAqIEFjY29yZGluZyB0byBndWlkZWxpbmVzLCBpZiB5b3UgaGF2ZSBhIGRyYXdlciBvbiB5b3VyIHBhZ2UsIHlvdSBzaG91bGQgYWx3YXlzXHJcbiAgICAqIGhhdmUgYSBidXR0b24gdGhhdCBvcGVucyBpdC4gVXNlIHRoZSBzaG93RHJhd2VyKCkgZnVuY3Rpb24gdG8gb3BlbiB0aGUgYXBwIGRyYXdlciBzZWN0aW9uLlxyXG4gICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuICAgIG9uRHJhd2VyQnV0dG9uVGFwKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuZHJhd2VyQ29tcG9uZW50LnNpZGVEcmF3ZXIuc2hvd0RyYXdlcigpO1xyXG4gICAgXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0R2FyYUNsYXNzKGl0ZW0pe1xyXG4gICAgICAgIHZhciByZXRjbGFzcz1cImdhcmFyb3cgZ2FyYVwiK2l0ZW0uZG9jLnN0YXRvO1xyXG4gICAgICAgIHJldHVybiByZXRjbGFzcztcclxuICAgIH1cclxuXHJcbn1cclxuIl19