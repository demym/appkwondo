import { Component, OnInit, ViewChild } from "@angular/core";
import {Router} from "@angular/router";
import { DrawerTransitionBase, SlideInOnTopTransition } from "nativescript-telerik-ui/sidedrawer";
import { RadSideDrawerComponent } from "nativescript-telerik-ui/sidedrawer/angular";
import { Backend } from "../providers/backend/backend";
import { GareComponent } from "../gare/gare.component";
import { AtletiComponent } from "../atleti/atleti.component";

@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.css"]

})
export class HomeComponent implements OnInit {
    /* ***********************************************************
    * Use the @ViewChild decorator to get a reference to the drawer component.
    * It is used in the "onDrawerButtonTap" function below to manipulate the drawer.
    *************************************************************/
    @ViewChild("drawer") drawerComponent: RadSideDrawerComponent;


   menu = [{
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
} /*,{name:"Chiudi AppKwonDo"},{name:"Chat2"}*/
];


    menuold=[
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
    }]

    /*    
    menu = [
        {
            name: "Home",
            path: "home",
            component: HomeComponent
        },
        {
            name: "Gare",
            path: "gare",
            component: GareComponent
        },
        {
            name: "Atleti",
            path: "atleti",
            component: AtletiComponent
        }
    ]*/

    private _sideDrawerTransition: DrawerTransitionBase;

    constructor(public backend: Backend, public router: Router){

    }
   

    /* ***********************************************************
    * Use the sideDrawerTransition property to change the open/close animation of the drawer.
    *************************************************************/
    ngOnInit(): void {
        this._sideDrawerTransition = new SlideInOnTopTransition();
       
            var questo = this;
            var url = questo.backend.rooturl + "/atleti/findall?societa=20160217220400";
            console.log("calling url",url);
            questo.backend.fetchData(url,function(data){
                questo.backend.atleti=data.rows;
                console.log("atleti",questo.backend.atleti.length);
            })
    
       
    }

    get sideDrawerTransition(): DrawerTransitionBase {
        return this._sideDrawerTransition;
    }

    /* ***********************************************************
    * According to guidelines, if you have a drawer on your page, you should always
    * have a button that opens it. Use the showDrawer() function to open the app drawer section.
    *************************************************************/
    onDrawerButtonTap(): void {
        this.drawerComponent.sideDrawer.showDrawer();
    }


    itemTap(ev){
        console.log("itemtap",JSON.stringify(ev));
        this.router.navigate([ev.route]);
    }
}
