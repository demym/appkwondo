import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";

import { SharedModule } from "../shared/shared.module";
import { AtletiRoutingModule } from "./atleti-routing.module";
import { AtletiComponent } from "./atleti.component";

@NgModule({
    imports: [
        NativeScriptModule,
        AtletiRoutingModule,
        SharedModule
    ],
    declarations: [
        AtletiComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AtletiModule { }
