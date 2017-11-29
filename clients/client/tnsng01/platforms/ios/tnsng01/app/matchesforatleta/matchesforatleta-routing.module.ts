import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { MatchesforatletaComponent } from "./matchesforatleta.component";

const routes: Routes = [
    { path: "", component: MatchesforatletaComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class MatchesforatletaRoutingModule { }
