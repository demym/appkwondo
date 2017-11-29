"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var nativescript_module_1 = require("nativescript-angular/nativescript.module");
var shared_module_1 = require("../shared/shared.module");
var matchesforatleta_routing_module_1 = require("./matchesforatleta-routing.module");
var matchesforatleta_component_1 = require("./matchesforatleta.component");
var MatchesforatletaModule = (function () {
    function MatchesforatletaModule() {
    }
    MatchesforatletaModule = __decorate([
        core_1.NgModule({
            imports: [
                nativescript_module_1.NativeScriptModule,
                matchesforatleta_routing_module_1.MatchesforatletaRoutingModule,
                shared_module_1.SharedModule
            ],
            declarations: [
                matchesforatleta_component_1.MatchesforatletaComponent
            ],
            schemas: [
                core_1.NO_ERRORS_SCHEMA
            ]
        })
    ], MatchesforatletaModule);
    return MatchesforatletaModule;
}());
exports.MatchesforatletaModule = MatchesforatletaModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0Y2hlc2ZvcmF0bGV0YS5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJtYXRjaGVzZm9yYXRsZXRhLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBLHNDQUEyRDtBQUMzRCxnRkFBOEU7QUFFOUUseURBQXVEO0FBQ3ZELHFGQUFrRjtBQUNsRiwyRUFBeUU7QUFlekU7SUFBQTtJQUFzQyxDQUFDO0lBQTFCLHNCQUFzQjtRQWJsQyxlQUFRLENBQUM7WUFDTixPQUFPLEVBQUU7Z0JBQ0wsd0NBQWtCO2dCQUNsQiwrREFBNkI7Z0JBQzdCLDRCQUFZO2FBQ2Y7WUFDRCxZQUFZLEVBQUU7Z0JBQ1Ysc0RBQXlCO2FBQzVCO1lBQ0QsT0FBTyxFQUFFO2dCQUNMLHVCQUFnQjthQUNuQjtTQUNKLENBQUM7T0FDVyxzQkFBc0IsQ0FBSTtJQUFELDZCQUFDO0NBQUEsQUFBdkMsSUFBdUM7QUFBMUIsd0RBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE5PX0VSUk9SU19TQ0hFTUEgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xyXG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvbmF0aXZlc2NyaXB0Lm1vZHVsZVwiO1xyXG5cclxuaW1wb3J0IHsgU2hhcmVkTW9kdWxlIH0gZnJvbSBcIi4uL3NoYXJlZC9zaGFyZWQubW9kdWxlXCI7XHJcbmltcG9ydCB7IE1hdGNoZXNmb3JhdGxldGFSb3V0aW5nTW9kdWxlIH0gZnJvbSBcIi4vbWF0Y2hlc2ZvcmF0bGV0YS1yb3V0aW5nLm1vZHVsZVwiO1xyXG5pbXBvcnQgeyBNYXRjaGVzZm9yYXRsZXRhQ29tcG9uZW50IH0gZnJvbSBcIi4vbWF0Y2hlc2ZvcmF0bGV0YS5jb21wb25lbnRcIjtcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgICBpbXBvcnRzOiBbXHJcbiAgICAgICAgTmF0aXZlU2NyaXB0TW9kdWxlLFxyXG4gICAgICAgIE1hdGNoZXNmb3JhdGxldGFSb3V0aW5nTW9kdWxlLFxyXG4gICAgICAgIFNoYXJlZE1vZHVsZVxyXG4gICAgXSxcclxuICAgIGRlY2xhcmF0aW9uczogW1xyXG4gICAgICAgIE1hdGNoZXNmb3JhdGxldGFDb21wb25lbnRcclxuICAgIF0sXHJcbiAgICBzY2hlbWFzOiBbXHJcbiAgICAgICAgTk9fRVJST1JTX1NDSEVNQVxyXG4gICAgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTWF0Y2hlc2ZvcmF0bGV0YU1vZHVsZSB7IH1cclxuIl19