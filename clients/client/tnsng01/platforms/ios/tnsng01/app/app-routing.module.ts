import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

const routes: Routes = [
    { path: "", redirectTo: "/home", pathMatch: "full" },
    { path: "home", loadChildren: "./home/home.module#HomeModule" },
    { path: "browse", loadChildren: "./browse/browse.module#BrowseModule" },
    { path: "atleti", loadChildren: "./atleti/atleti.module#AtletiModule" },
    { path: "gare", loadChildren: "./gare/gare.module#GareModule" },
    { path: "gara", loadChildren: "./gara/gara.module#GaraModule" },
    { path: "featured", loadChildren: "./featured/featured.module#FeaturedModule" },
    { path: "settings", loadChildren: "./settings/settings.module#SettingsModule" },
    { path: "matchesforatleta", loadChildren: "./matchesforatleta/matchesforatleta.module#MatchesforatletaModule" },
    { path: "chat", loadChildren: "./chat/chat.module#ChatModule" }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
