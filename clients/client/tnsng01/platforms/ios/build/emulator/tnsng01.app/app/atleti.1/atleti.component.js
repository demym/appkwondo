"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var sidedrawer_1 = require("nativescript-telerik-ui/sidedrawer");
var angular_1 = require("nativescript-telerik-ui/sidedrawer/angular");
var backend_1 = require("../providers/backend/backend");
var AtletiComponent = /** @class */ (function () {
    function AtletiComponent(backend) {
        this.backend = backend;
        this.atleti = [];
        this.refresh(function (data) { });
    }
    AtletiComponent.prototype.refresh = function (callback) {
        var questo = this;
        var url = questo.backend.rooturl + "/atleti/findall?societa=20160217220400";
        console.log("calling url", url);
        questo.backend.fetchData(url, function (data) {
            questo.backend.atleti = data.rows;
            console.log("atleti", questo.atleti.length);
        });
    };
    AtletiComponent.prototype.itemTap = function (item) {
        console.log("item", JSON.stringify(item));
    };
    /* ***********************************************************
    * Use the sideDrawerTransition property to change the open/close animation of the drawer.
    *************************************************************/
    AtletiComponent.prototype.ngOnInit = function () {
        this._sideDrawerTransition = new sidedrawer_1.SlideInOnTopTransition();
    };
    Object.defineProperty(AtletiComponent.prototype, "sideDrawerTransition", {
        get: function () {
            return this._sideDrawerTransition;
        },
        enumerable: true,
        configurable: true
    });
    /* ***********************************************************
    * According to guidelines, if you have a drawer on your page, you should always
    * have a button that opens it. Use the showDrawer() function to open the app drawer section.
    *************************************************************/
    AtletiComponent.prototype.onDrawerButtonTap = function () {
        this.drawerComponent.sideDrawer.showDrawer();
    };
    __decorate([
        core_1.ViewChild("drawer"),
        __metadata("design:type", angular_1.RadSideDrawerComponent)
    ], AtletiComponent.prototype, "drawerComponent", void 0);
    AtletiComponent = __decorate([
        core_1.Component({
            selector: "Atleti",
            moduleId: module.id,
            templateUrl: "./atleti.component.html",
            styleUrls: ["./atleti.component.css"]
        }),
        __metadata("design:paramtypes", [backend_1.Backend])
    ], AtletiComponent);
    return AtletiComponent;
}());
exports.AtletiComponent = AtletiComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXRsZXRpLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImF0bGV0aS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBNkQ7QUFDN0QsaUVBQWtHO0FBQ2xHLHNFQUFvRjtBQUNwRix3REFBdUQ7QUFPdkQ7SUFVSSx5QkFBbUIsT0FBZ0I7UUFBaEIsWUFBTyxHQUFQLE9BQU8sQ0FBUztRQUpuQyxXQUFNLEdBQU8sRUFBRSxDQUFBO1FBS1gsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFTLElBQUksSUFBRSxDQUFDLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBR0QsaUNBQU8sR0FBUCxVQUFRLFFBQVE7UUFDWixJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDbEIsSUFBSSxHQUFHLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEdBQUcsd0NBQXdDLENBQUM7UUFDNUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUMsR0FBRyxDQUFDLENBQUM7UUFDL0IsTUFBTSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFDLFVBQVMsSUFBSTtZQUN0QyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQ2hDLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDL0MsQ0FBQyxDQUFDLENBQUE7SUFFTixDQUFDO0lBRUQsaUNBQU8sR0FBUCxVQUFRLElBQUk7UUFDUixPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDN0MsQ0FBQztJQUVEOztrRUFFOEQ7SUFDOUQsa0NBQVEsR0FBUjtRQUNJLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxJQUFJLG1DQUFzQixFQUFFLENBQUM7SUFDOUQsQ0FBQztJQUVELHNCQUFJLGlEQUFvQjthQUF4QjtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUM7UUFDdEMsQ0FBQzs7O09BQUE7SUFFRDs7O2tFQUc4RDtJQUM5RCwyQ0FBaUIsR0FBakI7UUFDSSxJQUFJLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUNqRCxDQUFDO0lBMUNvQjtRQUFwQixnQkFBUyxDQUFDLFFBQVEsQ0FBQztrQ0FBa0IsZ0NBQXNCOzREQUFDO0lBTHBELGVBQWU7UUFOM0IsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxRQUFRO1lBQ2xCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixXQUFXLEVBQUUseUJBQXlCO1lBQ3RDLFNBQVMsRUFBRSxDQUFDLHdCQUF3QixDQUFDO1NBQ3hDLENBQUM7eUNBVzhCLGlCQUFPO09BVjFCLGVBQWUsQ0FnRDNCO0lBQUQsc0JBQUM7Q0FBQSxBQWhERCxJQWdEQztBQWhEWSwwQ0FBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBWaWV3Q2hpbGQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBEcmF3ZXJUcmFuc2l0aW9uQmFzZSwgU2xpZGVJbk9uVG9wVHJhbnNpdGlvbiB9IGZyb20gXCJuYXRpdmVzY3JpcHQtdGVsZXJpay11aS9zaWRlZHJhd2VyXCI7XHJcbmltcG9ydCB7IFJhZFNpZGVEcmF3ZXJDb21wb25lbnQgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXRlbGVyaWstdWkvc2lkZWRyYXdlci9hbmd1bGFyXCI7XHJcbmltcG9ydCB7IEJhY2tlbmQgfSBmcm9tIFwiLi4vcHJvdmlkZXJzL2JhY2tlbmQvYmFja2VuZFwiO1xyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiBcIkF0bGV0aVwiLFxyXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuICAgIHRlbXBsYXRlVXJsOiBcIi4vYXRsZXRpLmNvbXBvbmVudC5odG1sXCIsXHJcbiAgICBzdHlsZVVybHM6IFtcIi4vYXRsZXRpLmNvbXBvbmVudC5jc3NcIl1cclxufSlcclxuZXhwb3J0IGNsYXNzIEF0bGV0aUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgICAvKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gICAgKiBVc2UgdGhlIEBWaWV3Q2hpbGQgZGVjb3JhdG9yIHRvIGdldCBhIHJlZmVyZW5jZSB0byB0aGUgZHJhd2VyIGNvbXBvbmVudC5cclxuICAgICogSXQgaXMgdXNlZCBpbiB0aGUgXCJvbkRyYXdlckJ1dHRvblRhcFwiIGZ1bmN0aW9uIGJlbG93IHRvIG1hbmlwdWxhdGUgdGhlIGRyYXdlci5cclxuICAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcbiAgICBAVmlld0NoaWxkKFwiZHJhd2VyXCIpIGRyYXdlckNvbXBvbmVudDogUmFkU2lkZURyYXdlckNvbXBvbmVudDtcclxuICAgIGF0bGV0aTogYW55ID1bXVxyXG5cclxuICAgIHByaXZhdGUgX3NpZGVEcmF3ZXJUcmFuc2l0aW9uOiBEcmF3ZXJUcmFuc2l0aW9uQmFzZTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgYmFja2VuZDogQmFja2VuZCkge1xyXG4gICAgICAgIHRoaXMucmVmcmVzaChmdW5jdGlvbihkYXRhKXt9KTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgcmVmcmVzaChjYWxsYmFjaykge1xyXG4gICAgICAgIHZhciBxdWVzdG8gPSB0aGlzO1xyXG4gICAgICAgIHZhciB1cmwgPSBxdWVzdG8uYmFja2VuZC5yb290dXJsICsgXCIvYXRsZXRpL2ZpbmRhbGw/c29jaWV0YT0yMDE2MDIxNzIyMDQwMFwiO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiY2FsbGluZyB1cmxcIix1cmwpO1xyXG4gICAgICAgIHF1ZXN0by5iYWNrZW5kLmZldGNoRGF0YSh1cmwsZnVuY3Rpb24oZGF0YSl7XHJcbiAgICAgICAgICAgIHF1ZXN0by5iYWNrZW5kLmF0bGV0aT1kYXRhLnJvd3M7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiYXRsZXRpXCIscXVlc3RvLmF0bGV0aS5sZW5ndGgpO1xyXG4gICAgICAgIH0pXHJcblxyXG4gICAgfVxyXG5cclxuICAgIGl0ZW1UYXAoaXRlbSl7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJpdGVtXCIsSlNPTi5zdHJpbmdpZnkoaXRlbSkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAgICAqIFVzZSB0aGUgc2lkZURyYXdlclRyYW5zaXRpb24gcHJvcGVydHkgdG8gY2hhbmdlIHRoZSBvcGVuL2Nsb3NlIGFuaW1hdGlvbiBvZiB0aGUgZHJhd2VyLlxyXG4gICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX3NpZGVEcmF3ZXJUcmFuc2l0aW9uID0gbmV3IFNsaWRlSW5PblRvcFRyYW5zaXRpb24oKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgc2lkZURyYXdlclRyYW5zaXRpb24oKTogRHJhd2VyVHJhbnNpdGlvbkJhc2Uge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zaWRlRHJhd2VyVHJhbnNpdGlvbjtcclxuICAgIH1cclxuXHJcbiAgICAvKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gICAgKiBBY2NvcmRpbmcgdG8gZ3VpZGVsaW5lcywgaWYgeW91IGhhdmUgYSBkcmF3ZXIgb24geW91ciBwYWdlLCB5b3Ugc2hvdWxkIGFsd2F5c1xyXG4gICAgKiBoYXZlIGEgYnV0dG9uIHRoYXQgb3BlbnMgaXQuIFVzZSB0aGUgc2hvd0RyYXdlcigpIGZ1bmN0aW9uIHRvIG9wZW4gdGhlIGFwcCBkcmF3ZXIgc2VjdGlvbi5cclxuICAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcbiAgICBvbkRyYXdlckJ1dHRvblRhcCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmRyYXdlckNvbXBvbmVudC5zaWRlRHJhd2VyLnNob3dEcmF3ZXIoKTtcclxuICAgIH1cclxufVxyXG4iXX0=