import { Component, OnInit, ViewChild } from "@angular/core";
import { DrawerTransitionBase, SlideInOnTopTransition } from "nativescript-telerik-ui/sidedrawer";
import { RadSideDrawerComponent } from "nativescript-telerik-ui/sidedrawer/angular";
import {Router,NavigationExtras} from "@angular/router";

import { Backend } from "../providers/backend/backend";
@Component({
    selector: "Gare",
    moduleId: module.id,
    templateUrl: "./gare.component.html",
    styleUrls: ["./gare.component.css"]
})
export class GareComponent implements OnInit {
    /* ***********************************************************
    * Use the @ViewChild decorator to get a reference to the drawer component.
    * It is used in the "onDrawerButtonTap" function below to manipulate the drawer.
    *************************************************************/
    @ViewChild("drawer") drawerComponent: RadSideDrawerComponent;
    gare: any =[]

    private _sideDrawerTransition: DrawerTransitionBase;

    constructor(public router: Router, public backend: Backend) {
        this.refresh(function(data){});
    }


    refresh(callback) {
        var questo = this;
        var url = questo.backend.rooturl + "/gare/findall?societa=20160217220400";
        console.log("calling url",url);
        questo.backend.fetchData(url,function(data){
            questo.gare=data.rows;
            console.log("gare",questo.gare.length);
        })

    }

    itemTap(item) {
        console.log("item",JSON.stringify(item));
        console.log("tapped id ",item.doc.id);
        let navigationExtras: NavigationExtras = {
            queryParams: {
                "id": item.doc.id
            }
           
        };
       // console.log("queryParams",navigationExtras.queryParams.id);
        this.router.navigate(["/gara"], navigationExtras);
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

    getGaraClass(item){
        var retclass="gararow gara"+item.doc.stato;
        return retclass;
    }

}
