import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";

import { SharedModule } from "../shared/shared.module";
import { GareRoutingModule } from "./gare-routing.module";
import { GareComponent } from "./gare.component";

@NgModule({
    imports: [
        NativeScriptModule,
        GareRoutingModule,
        SharedModule
    ],
    declarations: [
        GareComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class GareModule { }
