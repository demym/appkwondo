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
            setTimeout(function () {
                questo.chatview.nativeElement.scrollToIndex(questo.backend.chat.length + 1);
                console.log("scroll done");
            }, 300);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjaGF0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUF5RTtBQUN6RSxpRUFBa0c7QUFDbEcsc0VBQW9GO0FBQ3BGLHdEQUF1RDtBQUV2RCxnQ0FBK0I7QUFRL0I7SUFXSSx1QkFBb0IsSUFBUyxFQUFTLE9BQWdCO1FBQWxDLFNBQUksR0FBSixJQUFJLENBQUs7UUFBUyxZQUFPLEdBQVAsT0FBTyxDQUFTO1FBSnRELFNBQUksR0FBTyxFQUFFLENBQUE7UUFLVCxJQUFJLENBQUMsZUFBZSxHQUFHLHVCQUF1QixDQUFDO0lBRW5ELENBQUM7SUFHRCwrQkFBTyxHQUFQLFVBQVEsUUFBUTtRQUNaLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQztRQUNsQixJQUFJLEdBQUcsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sR0FBRyxzQ0FBc0MsQ0FBQztRQUMxRSxPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBQyxHQUFHLENBQUMsQ0FBQztRQUMvQixNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUMsVUFBUyxJQUFJO1lBQ3RDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVMsSUFBSSxFQUFDLEdBQUc7Z0JBQy9CLElBQUksQ0FBQyxJQUFJLEdBQUMsTUFBTSxDQUFDO2dCQUNqQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxJQUFFLE1BQU0sQ0FBQztvQkFBQyxJQUFJLENBQUMsSUFBSSxHQUFDLE9BQU8sQ0FBQztZQUNqRCxDQUFDLENBQUMsQ0FBQTtZQUNGLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxHQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFFOUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDL0MsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDO2dCQUFDLFFBQVEsRUFBRSxDQUFDO1FBRzdCLENBQUMsQ0FBQyxDQUFBO0lBRU4sQ0FBQztJQUVELCtCQUFPLEdBQVAsVUFBUSxJQUFJO1FBQ1IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQzdDLENBQUM7SUFLRCxnQ0FBUSxHQUFSO1FBQ0ksSUFBSSxDQUFDLHFCQUFxQixHQUFHLElBQUksbUNBQXNCLEVBQUUsQ0FBQztJQUM5RCxDQUFDO0lBRUQsdUNBQWUsR0FBZjtRQUNJLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUUvQixJQUFJLE1BQU0sR0FBQyxJQUFJLENBQUM7UUFDaEIsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUNULFVBQVUsQ0FBQztnQkFDUCxNQUFNLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUUxRSxPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBRS9CLENBQUMsRUFBQyxHQUFHLENBQUMsQ0FBQztRQUlYLENBQUMsQ0FBQyxDQUFDO0lBR1AsQ0FBQztJQUVELHNCQUFJLCtDQUFvQjthQUF4QjtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUM7UUFDdEMsQ0FBQzs7O09BQUE7SUFNRCx5Q0FBaUIsR0FBakI7UUFDSSxJQUFJLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUNqRCxDQUFDO0lBRUQsOEJBQU0sR0FBTjtJQUVBLENBQUM7SUEzRW9CO1FBQXBCLGdCQUFTLENBQUMsUUFBUSxDQUFDO2tDQUFrQixnQ0FBc0I7MERBQUM7SUFDdEM7UUFBdEIsZ0JBQVMsQ0FBQyxVQUFVLENBQUM7a0NBQVcsaUJBQVU7bURBQUM7SUFObkMsYUFBYTtRQU56QixnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLE1BQU07WUFDaEIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBRSx1QkFBdUI7WUFDcEMsU0FBUyxFQUFFLENBQUMscUJBQXFCLENBQUM7U0FDckMsQ0FBQzs2REFZMkIsV0FBSSxvQkFBSixXQUFJLGtDQUFrQixpQkFBTztPQVg3QyxhQUFhLENBa0Z6QjtJQUFELG9CQUFDOztDQUFBLEFBbEZELElBa0ZDO0FBbEZZLHNDQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIFZpZXdDaGlsZCwgRWxlbWVudFJlZiB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IERyYXdlclRyYW5zaXRpb25CYXNlLCBTbGlkZUluT25Ub3BUcmFuc2l0aW9uIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC10ZWxlcmlrLXVpL3NpZGVkcmF3ZXJcIjtcclxuaW1wb3J0IHsgUmFkU2lkZURyYXdlckNvbXBvbmVudCB9IGZyb20gXCJuYXRpdmVzY3JpcHQtdGVsZXJpay11aS9zaWRlZHJhd2VyL2FuZ3VsYXJcIjtcclxuaW1wb3J0IHsgQmFja2VuZCB9IGZyb20gXCIuLi9wcm92aWRlcnMvYmFja2VuZC9iYWNrZW5kXCI7XHJcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlLFJvdXRlcn0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xyXG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInVpL3BhZ2VcIjtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6IFwiQ2hhdFwiLFxyXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcclxuICAgIHRlbXBsYXRlVXJsOiBcIi4vY2hhdC5jb21wb25lbnQuaHRtbFwiLFxyXG4gICAgc3R5bGVVcmxzOiBbXCIvY2hhdC5jb21wb25lbnQuY3NzXCJdIFxyXG59KVxyXG5leHBvcnQgY2xhc3MgQ2hhdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgICAvKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gICAgKiBVc2UgdGhlIEBWaWV3Q2hpbGQgZGVjb3JhdG9yIHRvIGdldCBhIHJlZmVyZW5jZSB0byB0aGUgZHJhd2VyIGNvbXBvbmVudC5cclxuICAgICogSXQgaXMgdXNlZCBpbiB0aGUgXCJvbkRyYXdlckJ1dHRvblRhcFwiIGZ1bmN0aW9uIGJlbG93IHRvIG1hbmlwdWxhdGUgdGhlIGRyYXdlci5cclxuICAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcbiAgICBAVmlld0NoaWxkKFwiZHJhd2VyXCIpIGRyYXdlckNvbXBvbmVudDogUmFkU2lkZURyYXdlckNvbXBvbmVudDtcclxuICAgIEBWaWV3Q2hpbGQoXCJjaGF0dmlld1wiKSBjaGF0dmlldzogRWxlbWVudFJlZjtcclxuICAgIGNoYXQ6IGFueSA9W11cclxuXHJcbiAgICBwcml2YXRlIF9zaWRlRHJhd2VyVHJhbnNpdGlvbjogRHJhd2VyVHJhbnNpdGlvbkJhc2U7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBwYWdlOlBhZ2UsIHB1YmxpYyBiYWNrZW5kOiBCYWNrZW5kKSB7XHJcbiAgICAgICAgcGFnZS5iYWNrZ3JvdW5kSW1hZ2UgPSAnfi9pbWFnZXMvY2hhdGJhY2suanBnJztcclxuICAgICAgICBcclxuICAgIH1cclxuXHJcblxyXG4gICAgcmVmcmVzaChjYWxsYmFjaykge1xyXG4gICAgICAgIHZhciBxdWVzdG8gPSB0aGlzO1xyXG4gICAgICAgIHZhciB1cmwgPSBxdWVzdG8uYmFja2VuZC5yb290dXJsICsgXCIvY2hhdC9nZXRubzY0P3NvY2lldGE9MjAxNjAyMTcyMjA0MDBcIjtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImNhbGxpbmcgdXJsXCIsdXJsKTtcclxuICAgICAgICBxdWVzdG8uYmFja2VuZC5mZXRjaERhdGEodXJsLGZ1bmN0aW9uKGRhdGEpe1xyXG4gICAgICAgICAgICBkYXRhLnJvd3MuZm9yRWFjaChmdW5jdGlvbihpdGVtLGlkeCl7XHJcbiAgICAgICAgICAgICAgICBpdGVtLnNpZGU9XCJsZWZ0XCI7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXRlbS5uaWNrbmFtZT09XCJkZW15XCIpIGl0ZW0uc2lkZT1cInJpZ2h0XCI7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIHF1ZXN0by5iYWNrZW5kLmNoYXQ9ZGF0YS5yb3dzO1xyXG4gICAgICAgICAgIFxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImNoYXRcIixxdWVzdG8uYmFja2VuZC5jaGF0Lmxlbmd0aCk7XHJcbiAgICAgICAgICAgIGlmIChjYWxsYmFjaykgY2FsbGJhY2soKTtcclxuICAgICAgICAgICAgLy9saXN0Vmlldy5zY3JvbGxUb0luZGV4KG1lc3NhZ2VzLmxlbmd0aC0xKTtcclxuICAgICAgICAgICAgLy9saXN0Vmlldy5yZWZyZXNoKCk7XHJcbiAgICAgICAgfSlcclxuXHJcbiAgICB9XHJcblxyXG4gICAgaXRlbVRhcChpdGVtKXtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIml0ZW1cIixKU09OLnN0cmluZ2lmeShpdGVtKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICAgICogVXNlIHRoZSBzaWRlRHJhd2VyVHJhbnNpdGlvbiBwcm9wZXJ0eSB0byBjaGFuZ2UgdGhlIG9wZW4vY2xvc2UgYW5pbWF0aW9uIG9mIHRoZSBkcmF3ZXIuXHJcbiAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fc2lkZURyYXdlclRyYW5zaXRpb24gPSBuZXcgU2xpZGVJbk9uVG9wVHJhbnNpdGlvbigpO1xyXG4gICAgfVxyXG5cclxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwibmdhZnRlcnZpZXdpbml0XCIpO1xyXG4gICAgICBcclxuICAgICAgICB2YXIgcXVlc3RvPXRoaXM7XHJcbiAgICAgICAgdGhpcy5yZWZyZXNoKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIHF1ZXN0by5jaGF0dmlldy5uYXRpdmVFbGVtZW50LnNjcm9sbFRvSW5kZXgocXVlc3RvLmJhY2tlbmQuY2hhdC5sZW5ndGgrMSk7XHJcbiAgICAgICAgICAgICAgICAvL3F1ZXN0by5jaGF0dmlldy5uYXRpdmVFbGVtZW50LnJlZnJlc2goKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwic2Nyb2xsIGRvbmVcIik7XHJcblxyXG4gICAgICAgICAgICB9LDMwMCk7XHJcbiAgICAgIFxyXG5cclxuXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICBcclxuXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHNpZGVEcmF3ZXJUcmFuc2l0aW9uKCk6IERyYXdlclRyYW5zaXRpb25CYXNlIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc2lkZURyYXdlclRyYW5zaXRpb247XHJcbiAgICB9XHJcblxyXG4gICAgLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICAgICogQWNjb3JkaW5nIHRvIGd1aWRlbGluZXMsIGlmIHlvdSBoYXZlIGEgZHJhd2VyIG9uIHlvdXIgcGFnZSwgeW91IHNob3VsZCBhbHdheXNcclxuICAgICogaGF2ZSBhIGJ1dHRvbiB0aGF0IG9wZW5zIGl0LiBVc2UgdGhlIHNob3dEcmF3ZXIoKSBmdW5jdGlvbiB0byBvcGVuIHRoZSBhcHAgZHJhd2VyIHNlY3Rpb24uXHJcbiAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG4gICAgb25EcmF3ZXJCdXR0b25UYXAoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5kcmF3ZXJDb21wb25lbnQuc2lkZURyYXdlci5zaG93RHJhd2VyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZ29CYWNrKCl7XHJcbiAgICAgICBcclxuICAgIH1cclxuXHJcbn1cclxuIl19