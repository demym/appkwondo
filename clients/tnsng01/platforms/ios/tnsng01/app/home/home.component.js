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
var router_1 = require("@angular/router");
var sidedrawer_1 = require("nativescript-telerik-ui/sidedrawer");
var angular_1 = require("nativescript-telerik-ui/sidedrawer/angular");
var backend_1 = require("../providers/backend/backend");
var HomeComponent = (function () {
    function HomeComponent(backend, router) {
        this.backend = backend;
        this.router = router;
        this.menu = [{
                name: "chat",
                title: "Chat",
                route: "/chat",
                icon: "\uf0e6",
                imgicon: "~/img/chaticon03.png",
                haswebview: true,
                realtime: false
            }, {
                name: "atleti",
                title: "Atleti",
                route: "/atleti",
                icon: "\uf007",
                imgicon: "~/img/fight.png"
            }, {
                name: "gare",
                title: "Gare",
                route: "/gare",
                icon: "\uf091"
            }, {
                name: "societa",
                title: "Societa",
                route: "/societa",
                icon: "\uf201"
            }, {
                name: "impostazioni",
                title: "Impostazioni",
                route: "/impostazioni",
                icon: "\uf013"
            }, {
                name: "connessioni",
                title: "Connessioni",
                route: "/connessioni",
                icon: "\uf1e6"
            },
            {
                name: "ranking",
                title: "Ranking",
                route: "/ranking",
                icon: "\uf080"
            }, {
                name: "logout",
                title: "Logout",
                route: "/logout",
                icon: "\uf08b"
            }, {
                name: "news",
                title: "News",
                route: "/news",
                icon: "\uf1ea"
            }
        ];
        this.menuold = [
            {
                title: "Gare",
                name: "gare",
                route: "/gare",
                icon: "\uf002"
            },
            {
                title: "Atleti",
                name: "atleti",
                route: "/atleti",
                icon: "\uf002"
            },
            {
                title: "Chat",
                name: "chat",
                route: "/chat",
                icon: "\uf002"
            }
        ];
    }
    HomeComponent.prototype.ngOnInit = function () {
        this._sideDrawerTransition = new sidedrawer_1.SlideInOnTopTransition();
        var questo = this;
        var url = questo.backend.rooturl + "/atleti/findall?societa=20160217220400";
        console.log("calling url", url);
        questo.backend.blueLogin({
            email: "demym@yahoo.it",
            password: "stevevai"
        }, function (ldata) {
            questo.backend.user = ldata;
            questo.backend.fetchData(url, function (data) {
                questo.backend.atleti = data.rows;
                console.log("atleti", questo.backend.atleti.length);
            });
        });
    };
    Object.defineProperty(HomeComponent.prototype, "sideDrawerTransition", {
        get: function () {
            return this._sideDrawerTransition;
        },
        enumerable: true,
        configurable: true
    });
    HomeComponent.prototype.onDrawerButtonTap = function () {
        this.drawerComponent.sideDrawer.showDrawer();
    };
    HomeComponent.prototype.itemTap = function (ev) {
        console.log("itemtap", JSON.stringify(ev));
        this.router.navigate([ev.route]);
    };
    __decorate([
        core_1.ViewChild("drawer"),
        __metadata("design:type", angular_1.RadSideDrawerComponent)
    ], HomeComponent.prototype, "drawerComponent", void 0);
    HomeComponent = __decorate([
        core_1.Component({
            selector: "Home",
            moduleId: module.id,
            templateUrl: "./home.component.html",
            styleUrls: ["./home.component.css"]
        }),
        __metadata("design:paramtypes", [backend_1.Backend, router_1.Router])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJob21lLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHNDQUE2RDtBQUM3RCwwQ0FBdUM7QUFDdkMsaUVBQWtHO0FBQ2xHLHNFQUFvRjtBQUNwRix3REFBdUQ7QUFXdkQ7SUF1R0ksdUJBQW1CLE9BQWdCLEVBQVMsTUFBYztRQUF2QyxZQUFPLEdBQVAsT0FBTyxDQUFTO1FBQVMsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQS9GM0QsU0FBSSxHQUFHLENBQUM7Z0JBQ1AsSUFBSSxFQUFFLE1BQU07Z0JBQ1osS0FBSyxFQUFFLE1BQU07Z0JBQ2IsS0FBSyxFQUFFLE9BQU87Z0JBQ2QsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLHNCQUFzQjtnQkFDL0IsVUFBVSxFQUFFLElBQUk7Z0JBQ2hCLFFBQVEsRUFBRSxLQUFLO2FBQ2xCLEVBQUU7Z0JBQ0MsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsS0FBSyxFQUFFLFFBQVE7Z0JBQ2YsS0FBSyxFQUFFLFNBQVM7Z0JBQ2hCLElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxpQkFBaUI7YUFDN0IsRUFBRTtnQkFDQyxJQUFJLEVBQUUsTUFBTTtnQkFDWixLQUFLLEVBQUUsTUFBTTtnQkFDYixLQUFLLEVBQUUsT0FBTztnQkFDZCxJQUFJLEVBQUUsUUFBUTthQUNqQixFQUFFO2dCQUNDLElBQUksRUFBRSxTQUFTO2dCQUNmLEtBQUssRUFBRSxTQUFTO2dCQUNoQixLQUFLLEVBQUUsVUFBVTtnQkFDakIsSUFBSSxFQUFFLFFBQVE7YUFDakIsRUFBRTtnQkFDQyxJQUFJLEVBQUUsY0FBYztnQkFDcEIsS0FBSyxFQUFFLGNBQWM7Z0JBQ3JCLEtBQUssRUFBRSxlQUFlO2dCQUN0QixJQUFJLEVBQUUsUUFBUTthQUNqQixFQUFFO2dCQUNDLElBQUksRUFBRSxhQUFhO2dCQUNuQixLQUFLLEVB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QUFzQixDQUFDO1NBRXRDLENBQUM7eUNBd0c4QixpQkFBTyxFQUFpQixlQUFNO09BdkdqRCxhQUFhLENBc0p6QjtJQUFELG9CQUFDO0NBQUEsQUF0SkQsSUFzSkM7QUF0Slksc0NBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgVmlld0NoaWxkIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcclxuaW1wb3J0IHtSb3V0ZXJ9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcclxuaW1wb3J0IHsgRHJhd2VyVHJhbnNpdGlvbkJhc2UsIFNsaWRlSW5PblRvcFRyYW5zaXRpb24gfSBmcm9tIFwibmF0aXZlc2NyaXB0LXRlbGVyaWstdWkvc2lkZWRyYXdlclwiO1xyXG5pbXBvcnQgeyBSYWRTaWRlRHJhd2VyQ29tcG9uZW50IH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC10ZWxlcmlrLXVpL3NpZGVkcmF3ZXIvYW5ndWxhclwiO1xyXG5pbXBvcnQgeyBCYWNrZW5kIH0gZnJvbSBcIi4uL3Byb3ZpZGVycy9iYWNrZW5kL2JhY2tlbmRcIjtcclxuaW1wb3J0IHsgR2FyZUNvbXBvbmVudCB9IGZyb20gXCIuLi9nYXJlL2dhcmUuY29tcG9uZW50XCI7XHJcbmltcG9ydCB7IEF0bGV0aUNvbXBvbmVudCB9IGZyb20gXCIuLi9hdGxldGkvYXRsZXRpLmNvbXBvbmVudFwiO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogXCJIb21lXCIsXHJcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxyXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9ob21lLmNvbXBvbmVudC5odG1sXCIsXHJcbiAgICBzdHlsZVVybHM6IFtcIi4vaG9tZS5jb21wb25lbnQuY3NzXCJdXHJcblxyXG59KVxyXG5leHBvcnQgY2xhc3MgSG9tZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgICAvKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG4gICAgKiBVc2UgdGhlIEBWaWV3Q2hpbGQgZGVjb3JhdG9yIHRvIGdldCBhIHJlZmVyZW5jZSB0byB0aGUgZHJhd2VyIGNvbXBvbmVudC5cclxuICAgICogSXQgaXMgdXNlZCBpbiB0aGUgXCJvbkRyYXdlckJ1dHRvblRhcFwiIGZ1bmN0aW9uIGJlbG93IHRvIG1hbmlwdWxhdGUgdGhlIGRyYXdlci5cclxuICAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcbiAgICBAVmlld0NoaWxkKFwiZHJhd2VyXCIpIGRyYXdlckNvbXBvbmVudDogUmFkU2lkZURyYXdlckNvbXBvbmVudDtcclxuXHJcblxyXG4gICBtZW51ID0gW3tcclxuICAgIG5hbWU6IFwiY2hhdFwiLFxyXG4gICAgdGl0bGU6IFwiQ2hhdFwiLFxyXG4gICAgcm91dGU6IFwiL2NoYXRcIixcclxuICAgIGljb246IFwiXFx1ZjBlNlwiLFxyXG4gICAgaW1naWNvbjogXCJ+L2ltZy9jaGF0aWNvbjAzLnBuZ1wiLFxyXG4gICAgaGFzd2VidmlldzogdHJ1ZSxcclxuICAgIHJlYWx0aW1lOiBmYWxzZVxyXG59LCB7XHJcbiAgICBuYW1lOiBcImF0bGV0aVwiLFxyXG4gICAgdGl0bGU6IFwiQXRsZXRpXCIsXHJcbiAgICByb3V0ZTogXCIvYXRsZXRpXCIsXHJcbiAgICBpY29uOiBcIlxcdWYwMDdcIixcclxuICAgIGltZ2ljb246IFwifi9pbWcvZmlnaHQucG5nXCJcclxufSwge1xyXG4gICAgbmFtZTogXCJnYXJlXCIsXHJcbiAgICB0aXRsZTogXCJHYXJlXCIsXHJcbiAgICByb3V0ZTogXCIvZ2FyZVwiLFxyXG4gICAgaWNvbjogXCJcXHVmMDkxXCJcclxufSwge1xyXG4gICAgbmFtZTogXCJzb2NpZXRhXCIsXHJcbiAgICB0aXRsZTogXCJTb2NpZXRhXCIsXHJcbiAgICByb3V0ZTogXCIvc29jaWV0YVwiLFxyXG4gICAgaWNvbjogXCJcXHVmMjAxXCJcclxufSwge1xyXG4gICAgbmFtZTogXCJpbXBvc3RhemlvbmlcIixcclxuICAgIHRpdGxlOiBcIkltcG9zdGF6aW9uaVwiLFxyXG4gICAgcm91dGU6IFwiL2ltcG9zdGF6aW9uaVwiLFxyXG4gICAgaWNvbjogXCJcXHVmMDEzXCJcclxufSwge1xyXG4gICAgbmFtZTogXCJjb25uZXNzaW9uaVwiLFxyXG4gICAgdGl0bGU6IFwiQ29ubmVzc2lvbmlcIixcclxuICAgIHJvdXRlOiBcIi9jb25uZXNzaW9uaVwiLFxyXG4gICAgaWNvbjogXCJcXHVmMWU2XCJcclxufSxcclxue1xyXG4gICAgbmFtZTogXCJyYW5raW5nXCIsXHJcbiAgICB0aXRsZTogXCJSYW5raW5nXCIsXHJcbiAgICByb3V0ZTogXCIvcmFua2luZ1wiLFxyXG4gICAgaWNvbjogXCJcXHVmMDgwXCJcclxufSwge1xyXG4gICAgbmFtZTogXCJsb2dvdXRcIixcclxuICAgIHRpdGxlOiBcIkxvZ291dFwiLFxyXG4gICAgcm91dGU6IFwiL2xvZ291dFwiLFxyXG4gICAgaWNvbjogXCJcXHVmMDhiXCJcclxufSwge1xyXG4gICAgbmFtZTogXCJuZXdzXCIsXHJcbiAgICB0aXRsZTogXCJOZXdzXCIsXHJcbiAgICByb3V0ZTogXCIvbmV3c1wiLFxyXG4gICAgaWNvbjogXCJcXHVmMWVhXCJcclxufSAvKix7bmFtZTpcIkNoaXVkaSBBcHBLd29uRG9cIn0se25hbWU6XCJDaGF0MlwifSovXHJcbl07XHJcblxyXG5cclxuICAgIG1lbnVvbGQ9W1xyXG4gICAge1xyXG4gICAgICAgIHRpdGxlOiBcIkdhcmVcIixcclxuICAgICAgICBuYW1lOiBcImdhcmVcIixcclxuICAgICAgICByb3V0ZTogXCIvZ2FyZVwiLFxyXG4gICAgICAgIGljb246IFwiXFx1ZjAwMlwiXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIHRpdGxlOiBcIkF0bGV0aVwiLFxyXG4gICAgICAgIG5hbWU6IFwiYXRsZXRpXCIsXHJcbiAgICAgICAgcm91dGU6IFwiL2F0bGV0aVwiLFxyXG4gICAgICAgIGljb246IFwiXFx1ZjAwMlwiXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIHRpdGxlOiBcIkNoYXRcIixcclxuICAgICAgICBuYW1lOiBcImNoYXRcIixcclxuICAgICAgICByb3V0ZTogXCIvY2hhdFwiLFxyXG4gICAgICAgIGljb246IFwiXFx1ZjAwMlwiXHJcbiAgICB9XVxyXG5cclxuICAgIC8qICAgIFxyXG4gICAgbWVudSA9IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG5hbWU6IFwiSG9tZVwiLFxyXG4gICAgICAgICAgICBwYXRoOiBcImhvbWVcIixcclxuICAgICAgICAgICAgY29tcG9uZW50OiBIb21lQ29tcG9uZW50XHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG5hbWU6IFwiR2FyZVwiLFxyXG4gICAgICAgICAgICBwYXRoOiBcImdhcmVcIixcclxuICAgICAgICAgICAgY29tcG9uZW50OiBHYXJlQ29tcG9uZW50XHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG5hbWU6IFwiQXRsZXRpXCIsXHJcbiAgICAgICAgICAgIHBhdGg6IFwiYXRsZXRpXCIsXHJcbiAgICAgICAgICAgIGNvbXBvbmVudDogQXRsZXRpQ29tcG9uZW50XHJcbiAgICAgICAgfVxyXG4gICAgXSovXHJcblxyXG4gICAgcHJpdmF0ZSBfc2lkZURyYXdlclRyYW5zaXRpb246IERyYXdlclRyYW5zaXRpb25CYXNlO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBiYWNrZW5kOiBCYWNrZW5kLCBwdWJsaWMgcm91dGVyOiBSb3V0ZXIpe1xyXG5cclxuICAgIH1cclxuICAgXHJcblxyXG4gICAgLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICAgICogVXNlIHRoZSBzaWRlRHJhd2VyVHJhbnNpdGlvbiBwcm9wZXJ0eSB0byBjaGFuZ2UgdGhlIG9wZW4vY2xvc2UgYW5pbWF0aW9uIG9mIHRoZSBkcmF3ZXIuXHJcbiAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fc2lkZURyYXdlclRyYW5zaXRpb24gPSBuZXcgU2xpZGVJbk9uVG9wVHJhbnNpdGlvbigpO1xyXG4gICAgICAgXHJcbiAgICAgICAgICAgIHZhciBxdWVzdG8gPSB0aGlzO1xyXG4gICAgICAgICAgICB2YXIgdXJsID0gcXVlc3RvLmJhY2tlbmQucm9vdHVybCArIFwiL2F0bGV0aS9maW5kYWxsP3NvY2lldGE9MjAxNjAyMTcyMjA0MDBcIjtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJjYWxsaW5nIHVybFwiLHVybCk7XHJcbiAgICAgICAgICAgIHF1ZXN0by5iYWNrZW5kLmJsdWVMb2dpbih7XHJcbiAgICAgICAgICAgICAgICBlbWFpbDogXCJkZW15bUB5YWhvby5pdFwiLFxyXG4gICAgICAgICAgICAgICAgcGFzc3dvcmQ6IFwic3RldmV2YWlcIlxyXG5cclxuICAgICAgICAgICAgfSxmdW5jdGlvbihsZGF0YSl7XHJcbiAgICAgICAgICAgICAgICBxdWVzdG8uYmFja2VuZC51c2VyPWxkYXRhO1xyXG4gICAgICAgICAgICAgICAgcXVlc3RvLmJhY2tlbmQuZmV0Y2hEYXRhKHVybCxmdW5jdGlvbihkYXRhKXtcclxuICAgICAgICAgICAgICAgICAgICBxdWVzdG8uYmFja2VuZC5hdGxldGk9ZGF0YS5yb3dzO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiYXRsZXRpXCIscXVlc3RvLmJhY2tlbmQuYXRsZXRpLmxlbmd0aCk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBcclxuICAgIFxyXG4gICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHNpZGVEcmF3ZXJUcmFuc2l0aW9uKCk6IERyYXdlclRyYW5zaXRpb25CYXNlIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc2lkZURyYXdlclRyYW5zaXRpb247XHJcbiAgICB9XHJcblxyXG4gICAgLyogKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuICAgICogQWNjb3JkaW5nIHRvIGd1aWRlbGluZXMsIGlmIHlvdSBoYXZlIGEgZHJhd2VyIG9uIHlvdXIgcGFnZSwgeW91IHNob3VsZCBhbHdheXNcclxuICAgICogaGF2ZSBhIGJ1dHRvbiB0aGF0IG9wZW5zIGl0LiBVc2UgdGhlIHNob3dEcmF3ZXIoKSBmdW5jdGlvbiB0byBvcGVuIHRoZSBhcHAgZHJhd2VyIHNlY3Rpb24uXHJcbiAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG4gICAgb25EcmF3ZXJCdXR0b25UYXAoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5kcmF3ZXJDb21wb25lbnQuc2lkZURyYXdlci5zaG93RHJhd2VyKCk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGl0ZW1UYXAoZXYpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiaXRlbXRhcFwiLEpTT04uc3RyaW5naWZ5KGV2KSk7XHJcbiAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoW2V2LnJvdXRlXSk7XHJcbiAgICB9XHJcbn1cclxuIl19