import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";

import { SharedModule } from "../shared/shared.module";
import { ChatRoutingModule } from "./chat-routing.module";
import { ChatComponent } from "./chat.component";

@NgModule({
    imports: [
        NativeScriptModule,
        ChatRoutingModule,
        SharedModule
    ],
    declarations: [
        ChatComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class ChatModule { }
