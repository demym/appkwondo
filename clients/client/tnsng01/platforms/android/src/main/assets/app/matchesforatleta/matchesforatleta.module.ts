import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";

import { SharedModule } from "../shared/shared.module";
import { MatchesforatletaRoutingModule } from "./matchesforatleta-routing.module";
import { MatchesforatletaComponent } from "./matchesforatleta.component";

@NgModule({
    imports: [
        NativeScriptModule,
        MatchesforatletaRoutingModule,
        SharedModule
    ],
    declarations: [
        MatchesforatletaComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class MatchesforatletaModule { }
