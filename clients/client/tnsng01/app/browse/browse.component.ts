
import { Component, OnInit, ViewChild } from "@angular/core";
import { DrawerTransitionBase, SlideInOnTopTransition } from "nativescript-telerik-ui/sidedrawer";
import { RadSideDrawerComponent } from "nativescript-telerik-ui/sidedrawer/angular";
import { Backend } from "../providers/backend/backend";
import { SegmentedBar, SegmentedBarItem } from "ui/segmented-bar";

import * as elementRegistryModule from 'nativescript-angular/element-registry';
elementRegistryModule.registerElement("CardView", () => require("nativescript-cardview").CardView);

@Component({
    selector: "Browse",
    moduleId: module.id,
    templateUrl: "./browse.component.html"
})
export class BrowseComponent implements OnInit {
    galli: any = [];
    news: any = [];
    segments: Array<SegmentedBarItem>;
    loading=false;
    activetab=-1;
    /* ***********************************************************
    * Use the @ViewChild decorator to get a reference to the drawer component.
    * It is used in the "onDrawerButtonTap" function below to manipulate the drawer.
    *************************************************************/
    @ViewChild("drawer") drawerComponent: RadSideDrawerComponent;

    private _sideDrawerTransition: DrawerTransitionBase;

    constructor(public backend: Backend) {
        let questo = this;


        for (let i = 0; i < 100; i++) {
            const newgallo: any = {};
            newgallo.num = i;
            //questo.galli.push(newgallo);
        }
        console.log("galli", JSON.stringify(questo.galli));
        this.loading=true;
        var url=this.backend.rooturl+"/allnews";
        /*
        this.backend.fetchData(url,).subscribe((result) => {
            console.log("got backend data", JSON.stringify(result));
            this.galli = result;
            this.loading=false;
        }, (error) => {
            console.log("error", error);
            this.loading=false;
        });
        */

        this.segments = [];
        for (let i = 1; i < 4; i++) {
            const item = new SegmentedBarItem();
            item.title = "Tab " + i;
            this.segments.push(item);
        }
        this.activetab=0;
    }
    /* ***********************************************************
    * Use the sideDrawerTransition property to change the open/close animation of the drawer.
    *************************************************************/
    ngOnInit(): void {
        let questo = this;
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

    onItemTap(ev) {
        console.log(ev.index);
        console.log(ev);
    }

    onSelectedIndexChange(args) {
        let segmetedBar = <SegmentedBar>args.object;
        console.log(this.segments[segmetedBar.selectedIndex + 1].title);
        this.activetab=segmetedBar.selectedIndex;

    }
}
