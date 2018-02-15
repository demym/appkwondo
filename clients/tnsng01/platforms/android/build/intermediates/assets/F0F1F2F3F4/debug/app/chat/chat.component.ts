import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { DrawerTransitionBase, SlideInOnTopTransition } from "nativescript-telerik-ui/sidedrawer";
import { RadSideDrawerComponent } from "nativescript-telerik-ui/sidedrawer/angular";
import { Backend } from "../providers/backend/backend";
import { ActivatedRoute,Router} from "@angular/router";
import { Page } from "ui/page";

@Component({
    selector: "Chat",
    moduleId: module.id,
    templateUrl: "./chat.component.html",
    styleUrls: ["/chat.component.css"] 
})
export class ChatComponent implements OnInit {
    /* ***********************************************************
    * Use the @ViewChild decorator to get a reference to the drawer component.
    * It is used in the "onDrawerButtonTap" function below to manipulate the drawer.
    *************************************************************/
    @ViewChild("drawer") drawerComponent: RadSideDrawerComponent;
    @ViewChild("chatview") chatview: ElementRef;
    chat: any =[]

    private _sideDrawerTransition: DrawerTransitionBase;

    constructor(private page:Page, public backend: Backend) {
        page.backgroundImage = '~/images/chatback.jpg';
        
    }


    refresh(callback) {
        var questo = this;
        var url = questo.backend.rooturl + "/chat/getno64?societa=20160217220400";
        console.log("calling url",url);
        questo.backend.fetchData(url,function(data){
            data.rows.forEach(function(item,idx){
                item.side="left";
                if (item.nickname=="demy") item.side="right";
            })
            questo.backend.chat=data.rows;
           
            console.log("chat",questo.backend.chat.length);
            if (callback) callback();
            //listView.scrollToIndex(messages.length-1);
            //listView.refresh();
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

    ngAfterViewInit(){
        console.log("ngafterviewinit");
      
        var questo=this;
        this.refresh(function(){
            setTimeout(function(){
                questo.chatview.nativeElement.scrollToIndex(questo.backend.chat.length+1);
                //questo.chatview.nativeElement.refresh();
                console.log("scroll done");

            },300);
      


        });
       

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

    goBack(){
       
    }

}
