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
var page_1 = require("ui/page");
var ChatComponent = (function () {
    function ChatComponent(page, backend) {
        this.page = page;
        this.backend = backend;
        this.isIOS = false;
        this.chat = [];
        page.backgroundImage = '~/images/chatback.jpg';
    }
    ChatComponent.prototype.refresh = function (callback) {
        var questo = this;
        var url = questo.backend.rooturl + "/chat/getno64?societa=20160217220400";
        console.log("calling url", url);
        questo.backend.fetchData(url, function (data) {
            data.rows.forEach(function (item, idx) {
                item.side = "left";
                if (item.nickname == "demy")
                    item.side = "right";
            });
            questo.backend.chat = data.rows;
            console.log("chat", questo.backend.chat.length);
            if (callback)
                callback();
        });
    };
    ChatComponent.prototype.itemTap = function (item) {
        console.log("item", JSON.stringify(item));
    };
    ChatComponent.prototype.ngOnInit = function () {
        this._sideDrawerTransition = new sidedrawer_1.SlideInOnTopTransition();
    };
    ChatComponent.prototype.ngAfterViewInit = function () {
        console.log("ngafterviewinit");
        var questo = this;
        this.refresh(function () {
        });
    };
    Object.defineProperty(ChatComponent.prototype, "sideDrawerTransition", {
        get: function () {
            return this._sideDrawerTransition;
        },
        enumerable: true,
        configurable: true
    });
    ChatComponent.prototype.onDrawerButtonTap = function () {
        this.drawerComponent.sideDrawer.showDrawer();
    };
    ChatComponent.prototype.goBack = function () {
    };
    __decorate([
        core_1.ViewChild("drawer"),
        __metadata("design:type", angular_1.RadSideDrawerComponent)
    ], ChatComponent.prototype, "drawerComponent", void 0);
    __decorate([
        core_1.ViewChild("chatview"),
        __metadata("design:type", core_1.ElementRef)
    ], ChatComponent.prototype, "chatview", void 0);
    ChatComponent = __decorate([
        core_1.Component({
            selector: "Chat",
            moduleId: module.id,
            templateUrl: "./chat.component.html",
            styleUrls: ["/chat.component.css"]
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof page_1.Page !== "undefined" && page_1.Page) === "function" && _a || Object, backend_1.Backend])
    ], ChatComponent);
    return ChatComponent;
    var _a;
}());
exports.ChatComponent = ChatComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjaGF0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUF5RTtBQUN6RSxpRUFBa0c7QUFDbEcsc0VBQW9GO0FBQ3BGLHdEQUF1RDtBQUd2RCxnQ0FBK0I7QUFRL0I7SUFZSSx1QkFBb0IsSUFBUyxFQUFTLE9BQWdCO1FBQWxDLFNBQUksR0FBSixJQUFJLENBQUs7UUFBUyxZQUFPLEdBQVAsT0FBTyxDQUFTO1FBWHRELFVBQUssR0FBQyxLQUFLLENBQUM7UUFPWixTQUFJLEdBQU8sRUFBRSxDQUFBO1FBS1QsSUFBSSxDQUFDLGVBQWUsR0FBRyx1QkFBdUIsQ0FBQztJQUVuRCxDQUFDO0lBR0QsK0JBQU8sR0FBUCxVQUFRLFFBQVE7UUFDWixJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDbEIsSUFBSSxHQUFHLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEdBQUcsc0NBQXNDLENBQUM7UUFDMUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUMsR0FBRyxDQUFDLENBQUM7UUFDL0IsTUFBTSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFDLFVBQVMsSUFBSTtZQUN0QyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFTLElBQUksRUFBQyxHQUFHO2dCQUMvQixJQUFJLENBQUMsSUFBSSxHQUFDLE1BQU0sQ0FBQztnQkFDakIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBRSxNQUFNLENBQUM7b0JBQUMsSUFBSSxDQUFDLElBQUksR0FBQyxPQUFPLENBQUM7WUFDakQsQ0FBQyxDQUFDLENBQUE7WUFDRixNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksR0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBRTlCLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQy9DLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQztnQkFBQyxRQUFRLEVBQUUsQ0FBQztRQUc3QixDQUFDLENBQUMsQ0FBQTtJQUVOLENBQUM7SUFFRCwrQkFBTyxHQUFQLFVBQVEsSUFBSTtRQUNSLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUM3QyxDQUFDO0lBS0QsZ0NBQVEsR0FBUjtRQUNJLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxJQUFJLG1DQUFzQixFQUFFLENBQUM7SUFDOUQsQ0FBQztJQUVELHVDQUFlLEdBQWY7UUFDSSxPQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFHL0IsSUFBSSxNQUFNLEdBQUMsSUFBSSxDQUFDO1FBQ2hCLElBQUksQ0FBQyxPQUFPLENBQUM7UUFJYixDQUFDLENBQUMsQ0FBQztJQUdQLENBQUM7SUFFRCxzQkFBSSwrQ0FBb0I7YUFBeEI7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDO1FBQ3RDLENBQUM7OztPQUFBO0lBTUQseUNBQWlCLEdBQWpCO1FBQ0ksSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDakQsQ0FBQztJQUVELDhCQUFNLEdBQU47SUFFQSxDQUFDO0lBdEVvQjtRQUFwQixnQkFBUyxDQUFDLFFBQVEsQ0FBQztrQ0FBa0IsZ0NBQXNCOzBEQUFDO0lBQ3RDO1FBQXRCLGdCQUFTLENBQUMsVUFBVSxDQUFDO2tDQUFXLGlCQUFVO21EQUFDO0lBUG5DLGFBQWE7UUFOekIsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxNQUFNO1lBQ2hCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixXQUFXLEVBQUUsdUJBQXVCO1lBQ3BDLFNBQVMsRUFBRSxDQUFDLHFCQUFxQixDQUFDO1NBQ3JDLENBQUM7NkRBYTJCLFdBQUksb0JBQUosV0FBSSxrQ0FBa0IsaUJBQU87T0FaN0MsYUFBYSxDQThFekI7SUFBRCxvQkFBQzs7Q0FBQSxBQTlFRCxJQThFQztBQTlFWSxzQ0FBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBWaWV3Q2hpbGQsIEVsZW1lbnRSZWYgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBEcmF3ZXJUcmFuc2l0aW9uQmFzZSwgU2xpZGVJbk9uVG9wVHJhbnNpdGlvbiB9IGZyb20gXCJuYXRpdmVzY3JpcHQtdGVsZXJpay11aS9zaWRlZHJhd2VyXCI7XHJcbmltcG9ydCB7IFJhZFNpZGVEcmF3ZXJDb21wb25lbnQgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXRlbGVyaWstdWkvc2lkZWRyYXdlci9hbmd1bGFyXCI7XHJcbmltcG9ydCB7IEJhY2tlbmQgfSBmcm9tIFwiLi4vcHJvdmlkZXJzL2JhY2tlbmQvYmFja2VuZFwiO1xyXG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSxSb3V0ZXJ9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcclxuXHJcbmltcG9ydCB7IFBhZ2UgfSBmcm9tIFwidWkvcGFnZVwiO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogXCJDaGF0XCIsXHJcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxyXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9jaGF0LmNvbXBvbmVudC5odG1sXCIsXHJcbiAgICBzdHlsZVVybHM6IFtcIi9jaGF0LmNvbXBvbmVudC5jc3NcIl0gXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBDaGF0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcclxuICAgIGlzSU9TPWZhbHNlO1xyXG4gICAgLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICAgICogVXNlIHRoZSBAVmlld0NoaWxkIGRlY29yYXRvciB0byBnZXQgYSByZWZlcmVuY2UgdG8gdGhlIGRyYXdlciBjb21wb25lbnQuXHJcbiAgICAqIEl0IGlzIHVzZWQgaW4gdGhlIFwib25EcmF3ZXJCdXR0b25UYXBcIiBmdW5jdGlvbiBiZWxvdyB0byBtYW5pcHVsYXRlIHRoZSBkcmF3ZXIuXHJcbiAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG4gICAgQFZpZXdDaGlsZChcImRyYXdlclwiKSBkcmF3ZXJDb21wb25lbnQ6IFJhZFNpZGVEcmF3ZXJDb21wb25lbnQ7XHJcbiAgICBAVmlld0NoaWxkKFwiY2hhdHZpZXdcIikgY2hhdHZpZXc6IEVsZW1lbnRSZWY7XHJcbiAgICBjaGF0OiBhbnkgPVtdXHJcblxyXG4gICAgcHJpdmF0ZSBfc2lkZURyYXdlclRyYW5zaXRpb246IERyYXdlclRyYW5zaXRpb25CYXNlO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcGFnZTpQYWdlLCBwdWJsaWMgYmFja2VuZDogQmFja2VuZCkge1xyXG4gICAgICAgIHBhZ2UuYmFja2dyb3VuZEltYWdlID0gJ34vaW1hZ2VzL2NoYXRiYWNrLmpwZyc7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG5cclxuICAgIHJlZnJlc2goY2FsbGJhY2spIHtcclxuICAgICAgICB2YXIgcXVlc3RvID0gdGhpcztcclxuICAgICAgICB2YXIgdXJsID0gcXVlc3RvLmJhY2tlbmQucm9vdHVybCArIFwiL2NoYXQvZ2V0bm82ND9zb2NpZXRhPTIwMTYwMjE3MjIwNDAwXCI7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJjYWxsaW5nIHVybFwiLHVybCk7XHJcbiAgICAgICAgcXVlc3RvLmJhY2tlbmQuZmV0Y2hEYXRhKHVybCxmdW5jdGlvbihkYXRhKXtcclxuICAgICAgICAgICAgZGF0YS5yb3dzLmZvckVhY2goZnVuY3Rpb24oaXRlbSxpZHgpe1xyXG4gICAgICAgICAgICAgICAgaXRlbS5zaWRlPVwibGVmdFwiO1xyXG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0ubmlja25hbWU9PVwiZGVteVwiKSBpdGVtLnNpZGU9XCJyaWdodFwiO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBxdWVzdG8uYmFja2VuZC5jaGF0PWRhdGEucm93cztcclxuICAgICAgICAgICBcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJjaGF0XCIscXVlc3RvLmJhY2tlbmQuY2hhdC5sZW5ndGgpO1xyXG4gICAgICAgICAgICBpZiAoY2FsbGJhY2spIGNhbGxiYWNrKCk7XHJcbiAgICAgICAgICAgIC8vbGlzdFZpZXcuc2Nyb2xsVG9JbmRleChtZXNzYWdlcy5sZW5ndGgtMSk7XHJcbiAgICAgICAgICAgIC8vbGlzdFZpZXcucmVmcmVzaCgpO1xyXG4gICAgICAgIH0pXHJcblxyXG4gICAgfVxyXG5cclxuICAgIGl0ZW1UYXAoaXRlbSl7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJpdGVtXCIsSlNPTi5zdHJpbmdpZnkoaXRlbSkpO1xyXG4gICAgfVxyXG5cclxuICAgIC8qICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbiAgICAqIFVzZSB0aGUgc2lkZURyYXdlclRyYW5zaXRpb24gcHJvcGVydHkgdG8gY2hhbmdlIHRoZSBvcGVuL2Nsb3NlIGFuaW1hdGlvbiBvZiB0aGUgZHJhd2VyLlxyXG4gICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX3NpZGVEcmF3ZXJUcmFuc2l0aW9uID0gbmV3IFNsaWRlSW5PblRvcFRyYW5zaXRpb24oKTtcclxuICAgIH1cclxuXHJcbiAgICBuZ0FmdGVyVmlld0luaXQoKXtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIm5nYWZ0ZXJ2aWV3aW5pdFwiKTtcclxuICAgICAgICBcclxuICAgICAgXHJcbiAgICAgICAgdmFyIHF1ZXN0bz10aGlzO1xyXG4gICAgICAgIHRoaXMucmVmcmVzaChmdW5jdGlvbigpe1xyXG4gICAgICAgICAgIFxyXG5cclxuXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICBcclxuXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHNpZGVEcmF3ZXJUcmFuc2l0aW9uKCk6IERyYXdlclRyYW5zaXRpb25CYXNlIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc2lkZURyYXdlclRyYW5zaXRpb247XHJcbiAgICB9XHJcblxyXG4gICAgLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICAgICogQWNjb3JkaW5nIHRvIGd1aWRlbGluZXMsIGlmIHlvdSBoYXZlIGEgZHJhd2VyIG9uIHlvdXIgcGFnZSwgeW91IHNob3VsZCBhbHdheXNcclxuICAgICogaGF2ZSBhIGJ1dHRvbiB0aGF0IG9wZW5zIGl0LiBVc2UgdGhlIHNob3dEcmF3ZXIoKSBmdW5jdGlvbiB0byBvcGVuIHRoZSBhcHAgZHJhd2VyIHNlY3Rpb24uXHJcbiAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG4gICAgb25EcmF3ZXJCdXR0b25UYXAoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5kcmF3ZXJDb21wb25lbnQuc2lkZURyYXdlci5zaG93RHJhd2VyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ29CYWNrKCl7XHJcbiAgICAgICBcclxuICAgIH1cclxuXHJcbn1cclxuIl19