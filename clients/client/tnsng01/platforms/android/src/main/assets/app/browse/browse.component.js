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
var segmented_bar_1 = require("ui/segmented-bar");
var elementRegistryModule = require("nativescript-angular/element-registry");
elementRegistryModule.registerElement("CardView", function () { return require("nativescript-cardview").CardView; });
var BrowseComponent = (function () {
    function BrowseComponent(backend) {
        this.backend = backend;
        this.galli = [];
        this.news = [];
        this.loading = false;
        this.activetab = -1;
        var questo = this;
        for (var i = 0; i < 100; i++) {
            var newgallo = {};
            newgallo.num = i;
        }
        console.log("galli", JSON.stringify(questo.galli));
        this.loading = true;
        var url = this.backend.rooturl + "/allnews";
        this.segments = [];
        for (var i = 1; i < 4; i++) {
            var item = new segmented_bar_1.SegmentedBarItem();
            item.title = "Tab " + i;
            this.segments.push(item);
        }
        this.activetab = 0;
    }
    BrowseComponent.prototype.ngOnInit = function () {
        var questo = this;
        this._sideDrawerTransition = new sidedrawer_1.SlideInOnTopTransition();
    };
    Object.defineProperty(BrowseComponent.prototype, "sideDrawerTransition", {
        get: function () {
            return this._sideDrawerTransition;
        },
        enumerable: true,
        configurable: true
    });
    BrowseComponent.prototype.onDrawerButtonTap = function () {
        this.drawerComponent.sideDrawer.showDrawer();
    };
    BrowseComponent.prototype.onItemTap = function (ev) {
        console.log(ev.index);
        console.log(ev);
    };
    BrowseComponent.prototype.onSelectedIndexChange = function (args) {
        var segmetedBar = args.object;
        console.log(this.segments[segmetedBar.selectedIndex + 1].title);
        this.activetab = segmetedBar.selectedIndex;
    };
    __decorate([
        core_1.ViewChild("drawer"),
        __metadata("design:type", angular_1.RadSideDrawerComponent)
    ], BrowseComponent.prototype, "drawerComponent", void 0);
    BrowseComponent = __decorate([
        core_1.Component({
            selector: "Browse",
            moduleId: module.id,
            templateUrl: "./browse.component.html"
        }),
        __metadata("design:paramtypes", [backend_1.Backend])
    ], BrowseComponent);
    return BrowseComponent;
}());
exports.BrowseComponent = BrowseComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJvd3NlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImJyb3dzZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFDQSxzQ0FBNkQ7QUFDN0QsaUVBQWtHO0FBQ2xHLHNFQUFvRjtBQUNwRix3REFBdUQ7QUFDdkQsa0RBQWtFO0FBRWxFLDZFQUErRTtBQUMvRSxxQkFBcUIsQ0FBQyxlQUFlLENBQUMsVUFBVSxFQUFFLGNBQU0sT0FBQSxPQUFPLENBQUMsdUJBQXVCLENBQUMsQ0FBQyxRQUFRLEVBQXpDLENBQXlDLENBQUMsQ0FBQztBQU9uRztJQWNJLHlCQUFtQixPQUFnQjtRQUFoQixZQUFPLEdBQVAsT0FBTyxDQUFTO1FBYm5DLFVBQUssR0FBUSxFQUFFLENBQUM7UUFDaEIsU0FBSSxHQUFRLEVBQUUsQ0FBQztRQUVmLFlBQU8sR0FBQyxLQUFLLENBQUM7UUFDZCxjQUFTLEdBQUMsQ0FBQyxDQUFDLENBQUM7UUFVVCxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFHbEIsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUMzQixJQUFNLFFBQVEsR0FBUSxFQUFFLENBQUM7WUFDekIsUUFBUSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFFckIsQ0FBQztRQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDbkQsSUFBSSxDQUFDLE9BQU8sR0FBQyxJQUFJLENBQUM7UUFDbEIsSUFBSSxHQUFHLEdBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEdBQUMsVUFBVSxDQUFDO1FBWXhDLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO1FBQ25CLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDekIsSUFBTSxJQUFJLEdBQUcsSUFBSSxnQ0FBZ0IsRUFBRSxDQUFDO1lBQ3BDLElBQUksQ0FBQyxLQUFLLEdBQUcsTUFBTSxHQUFHLENBQUMsQ0FBQztZQUN4QixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM3QixDQUFDO1FBQ0QsSUFBSSxDQUFDLFNBQVMsR0FBQyxDQUFDLENBQUM7SUFDckIsQ0FBQztJQUlELGtDQUFRLEdBQVI7UUFDSSxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDbEIsSUFBSSxDQUFDLHFCQUFxQixHQUFHLElBQUksbUNBQXNCLEVBQUUsQ0FBQztJQUU5RCxDQUFDO0lBRUQsc0JBQUksaURBQW9CO2FBQXhCO1lBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQztRQUN0QyxDQUFDOzs7T0FBQTtJQU1ELDJDQUFpQixHQUFqQjtRQUNJLElBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ2pELENBQUM7SUFFRCxtQ0FBUyxHQUFULFVBQVUsRUFBRTtRQUNSLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3RCLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDcEIsQ0FBQztJQUVELCtDQUFxQixHQUFyQixVQUFzQixJQUFJO1FBQ3RCLElBQUksV0FBVyxHQUFpQixJQUFJLENBQUMsTUFBTSxDQUFDO1FBQzVDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsYUFBYSxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2hFLElBQUksQ0FBQyxTQUFTLEdBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQztJQUU3QyxDQUFDO0lBbEVvQjtRQUFwQixnQkFBUyxDQUFDLFFBQVEsQ0FBQztrQ0FBa0IsZ0NBQXNCOzREQUFDO0lBVnBELGVBQWU7UUFMM0IsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxRQUFRO1lBQ2xCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixXQUFXLEVBQUUseUJBQXlCO1NBQ3pDLENBQUM7eUNBZThCLGlCQUFPO09BZDFCLGVBQWUsQ0E2RTNCO0lBQUQsc0JBQUM7Q0FBQSxBQTdFRCxJQTZFQztBQTdFWSwwQ0FBZSIsInNvdXJjZXNDb250ZW50IjpbIlxyXG5pbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgVmlld0NoaWxkIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHsgRHJhd2VyVHJhbnNpdGlvbkJhc2UsIFNsaWRlSW5PblRvcFRyYW5zaXRpb24gfSBmcm9tIFwibmF0aXZlc2NyaXB0LXRlbGVyaWstdWkvc2lkZWRyYXdlclwiO1xyXG5pbXBvcnQgeyBSYWRTaWRlRHJhd2VyQ29tcG9uZW50IH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC10ZWxlcmlrLXVpL3NpZGVkcmF3ZXIvYW5ndWxhclwiO1xyXG5pbXBvcnQgeyBCYWNrZW5kIH0gZnJvbSBcIi4uL3Byb3ZpZGVycy9iYWNrZW5kL2JhY2tlbmRcIjtcclxuaW1wb3J0IHsgU2VnbWVudGVkQmFyLCBTZWdtZW50ZWRCYXJJdGVtIH0gZnJvbSBcInVpL3NlZ21lbnRlZC1iYXJcIjtcclxuXHJcbmltcG9ydCAqIGFzIGVsZW1lbnRSZWdpc3RyeU1vZHVsZSBmcm9tICduYXRpdmVzY3JpcHQtYW5ndWxhci9lbGVtZW50LXJlZ2lzdHJ5JztcclxuZWxlbWVudFJlZ2lzdHJ5TW9kdWxlLnJlZ2lzdGVyRWxlbWVudChcIkNhcmRWaWV3XCIsICgpID0+IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtY2FyZHZpZXdcIikuQ2FyZFZpZXcpO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogXCJCcm93c2VcIixcclxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXHJcbiAgICB0ZW1wbGF0ZVVybDogXCIuL2Jyb3dzZS5jb21wb25lbnQuaHRtbFwiXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBCcm93c2VDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gICAgZ2FsbGk6IGFueSA9IFtdO1xyXG4gICAgbmV3czogYW55ID0gW107XHJcbiAgICBzZWdtZW50czogQXJyYXk8U2VnbWVudGVkQmFySXRlbT47XHJcbiAgICBsb2FkaW5nPWZhbHNlO1xyXG4gICAgYWN0aXZldGFiPS0xO1xyXG4gICAgLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICAgICogVXNlIHRoZSBAVmlld0NoaWxkIGRlY29yYXRvciB0byBnZXQgYSByZWZlcmVuY2UgdG8gdGhlIGRyYXdlciBjb21wb25lbnQuXHJcbiAgICAqIEl0IGlzIHVzZWQgaW4gdGhlIFwib25EcmF3ZXJCdXR0b25UYXBcIiBmdW5jdGlvbiBiZWxvdyB0byBtYW5pcHVsYXRlIHRoZSBkcmF3ZXIuXHJcbiAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG4gICAgQFZpZXdDaGlsZChcImRyYXdlclwiKSBkcmF3ZXJDb21wb25lbnQ6IFJhZFNpZGVEcmF3ZXJDb21wb25lbnQ7XHJcblxyXG4gICAgcHJpdmF0ZSBfc2lkZURyYXdlclRyYW5zaXRpb246IERyYXdlclRyYW5zaXRpb25CYXNlO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBiYWNrZW5kOiBCYWNrZW5kKSB7XHJcbiAgICAgICAgbGV0IHF1ZXN0byA9IHRoaXM7XHJcblxyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwMDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG5ld2dhbGxvOiBhbnkgPSB7fTtcclxuICAgICAgICAgICAgbmV3Z2FsbG8ubnVtID0gaTtcclxuICAgICAgICAgICAgLy9xdWVzdG8uZ2FsbGkucHVzaChuZXdnYWxsbyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiZ2FsbGlcIiwgSlNPTi5zdHJpbmdpZnkocXVlc3RvLmdhbGxpKSk7XHJcbiAgICAgICAgdGhpcy5sb2FkaW5nPXRydWU7XHJcbiAgICAgICAgdmFyIHVybD10aGlzLmJhY2tlbmQucm9vdHVybCtcIi9hbGxuZXdzXCI7XHJcbiAgICAgICAgLypcclxuICAgICAgICB0aGlzLmJhY2tlbmQuZmV0Y2hEYXRhKHVybCwpLnN1YnNjcmliZSgocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZ290IGJhY2tlbmQgZGF0YVwiLCBKU09OLnN0cmluZ2lmeShyZXN1bHQpKTtcclxuICAgICAgICAgICAgdGhpcy5nYWxsaSA9IHJlc3VsdDtcclxuICAgICAgICAgICAgdGhpcy5sb2FkaW5nPWZhbHNlO1xyXG4gICAgICAgIH0sIChlcnJvcikgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImVycm9yXCIsIGVycm9yKTtcclxuICAgICAgICAgICAgdGhpcy5sb2FkaW5nPWZhbHNlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgICovXHJcblxyXG4gICAgICAgIHRoaXMuc2VnbWVudHMgPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8IDQ7IGkrKykge1xyXG4gICAgICAgICAgICBjb25zdCBpdGVtID0gbmV3IFNlZ21lbnRlZEJhckl0ZW0oKTtcclxuICAgICAgICAgICAgaXRlbS50aXRsZSA9IFwiVGFiIFwiICsgaTtcclxuICAgICAgICAgICAgdGhpcy5zZWdtZW50cy5wdXNoKGl0ZW0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmFjdGl2ZXRhYj0wO1xyXG4gICAgfVxyXG4gICAgLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICAgICogVXNlIHRoZSBzaWRlRHJhd2VyVHJhbnNpdGlvbiBwcm9wZXJ0eSB0byBjaGFuZ2UgdGhlIG9wZW4vY2xvc2UgYW5pbWF0aW9uIG9mIHRoZSBkcmF3ZXIuXHJcbiAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IHF1ZXN0byA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5fc2lkZURyYXdlclRyYW5zaXRpb24gPSBuZXcgU2xpZGVJbk9uVG9wVHJhbnNpdGlvbigpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBnZXQgc2lkZURyYXdlclRyYW5zaXRpb24oKTogRHJhd2VyVHJhbnNpdGlvbkJhc2Uge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zaWRlRHJhd2VyVHJhbnNpdGlvbjtcclxuICAgIH1cclxuXHJcbiAgICAvKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gICAgKiBBY2NvcmRpbmcgdG8gZ3VpZGVsaW5lcywgaWYgeW91IGhhdmUgYSBkcmF3ZXIgb24geW91ciBwYWdlLCB5b3Ugc2hvdWxkIGFsd2F5c1xyXG4gICAgKiBoYXZlIGEgYnV0dG9uIHRoYXQgb3BlbnMgaXQuIFVzZSB0aGUgc2hvd0RyYXdlcigpIGZ1bmN0aW9uIHRvIG9wZW4gdGhlIGFwcCBkcmF3ZXIgc2VjdGlvbi5cclxuICAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcbiAgICBvbkRyYXdlckJ1dHRvblRhcCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmRyYXdlckNvbXBvbmVudC5zaWRlRHJhd2VyLnNob3dEcmF3ZXIoKTtcclxuICAgIH1cclxuXHJcbiAgICBvbkl0ZW1UYXAoZXYpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhldi5pbmRleCk7XHJcbiAgICAgICAgY29uc29sZS5sb2coZXYpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uU2VsZWN0ZWRJbmRleENoYW5nZShhcmdzKSB7XHJcbiAgICAgICAgbGV0IHNlZ21ldGVkQmFyID0gPFNlZ21lbnRlZEJhcj5hcmdzLm9iamVjdDtcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnNlZ21lbnRzW3NlZ21ldGVkQmFyLnNlbGVjdGVkSW5kZXggKyAxXS50aXRsZSk7XHJcbiAgICAgICAgdGhpcy5hY3RpdmV0YWI9c2VnbWV0ZWRCYXIuc2VsZWN0ZWRJbmRleDtcclxuXHJcbiAgICB9XHJcbn1cclxuIl19