import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";

import { SharedModule } from "../shared/shared.module";
import { GaraRoutingModule } from "./gara-routing.module";
import { GaraComponent } from "./gara.component";

@NgModule({
    imports: [
        NativeScriptModule,
        GaraRoutingModule,
        SharedModule
    ],
    declarations: [
        GaraComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class GaraModule { }
