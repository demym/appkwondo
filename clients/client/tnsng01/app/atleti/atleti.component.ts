import { Component, OnInit, ViewChild } from "@angular/core";
import { DrawerTransitionBase, SlideInOnTopTransition } from "nativescript-telerik-ui/sidedrawer";
import { RadSideDrawerComponent } from "nativescript-telerik-ui/sidedrawer/angular";
import { Backend } from "../providers/backend/backend";
@Component({
    selector: "Atleti",
    moduleId: module.id,
    templateUrl: "./atleti.component.html",
    styleUrls: ["./atleti.component.css"]
})
export class AtletiComponent implements OnInit {
    /* ***********************************************************
    * Use the @ViewChild decorator to get a reference to the drawer component.
    * It is used in the "onDrawerButtonTap" function below to manipulate the drawer.
    *************************************************************/
    @ViewChild("drawer") drawerComponent: RadSideDrawerComponent;
    atleti: any =[]

    private _sideDrawerTransition: DrawerTransitionBase;

    constructor(public backend: Backend) {
        this.refresh(function(data){});
    }


    refresh(callback) {
        var questo = this;
        var url = questo.backend.rooturl + "/atleti/findall?societa=20160217220400";
        console.log("calling url",url);
        questo.backend.fetchData(url,function(data){
            questo.backend.atleti=data.rows;
            console.log("atleti",questo.atleti.length);
        })

    }

    itemTap(item){
        console.log("item",JSON.stringify(item));
    }

    /* ***********************************************************
    * Use the sideDrawerTransition property to change the open/close animation of the drawer.
    *************************************************************/
    ngOnInit(): void {
        this._sideDrawerTransition = new SlideInOnTopTransition();
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
}
