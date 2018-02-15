import { Component, OnInit, ViewChild } from "@angular/core";
import { DrawerTransitionBase, SlideInOnTopTransition } from "nativescript-telerik-ui/sidedrawer";
import { RadSideDrawerComponent } from "nativescript-telerik-ui/sidedrawer/angular";

import { SpeechRecognition, SpeechRecognitionTranscription } from "nativescript-speech-recognition";

@Component({
    selector: "Settings",
    moduleId: module.id,
    templateUrl: "./settings.component.html"
})
export class SettingsComponent implements OnInit {
    listening = false;
    buttontext = "START";
    speechtext = "Dimmi qualcosa";
    /* ***********************************************************
    * Use the @ViewChild decorator to get a reference to the drawer component.
    * It is used in the "onDrawerButtonTap" function below to manipulate the drawer.
    *************************************************************/
    @ViewChild("drawer") drawerComponent: RadSideDrawerComponent;

    private _sideDrawerTransition: DrawerTransitionBase;
    private speechRecognition = new SpeechRecognition();

    constructor() {
        this.checkAvailability();
    }



    checkAvailability(): void {
        this.speechRecognition.available().then(
            (available: boolean) => console.log(available ? "YES!" : "NO"),
            (err: string) => console.log(err)
        );
    }

    startListening(): void {
        let questo = this;
        let sptext = "";
        this.speechRecognition.startListening({
            // optional, uses the device locale by default
            //locale: "en-US",
            locale: "it-IT",
            // this callback will be invoked repeatedly during recognition
            onResult: (transcription: SpeechRecognitionTranscription) => {
                console.log(`User said: ${transcription.text}`);
                sptext = `${transcription.text}`;
                console.log("speechtext", sptext);
                console.log(`User finished?: ${transcription.finished}`);
               // questo.setListening(false);
                //questo.renderListening();
                questo.speechtext = sptext;
            },
        }).then(
            (started: boolean) => { console.log(`started listening`) },
            (errorMessage: string) => { console.log(`Error: ${errorMessage}`); }
            );
    }

    stopListening(): void {
        this.speechRecognition.stopListening().then(
            () => { console.log(`stopped listening`) },
            (errorMessage: string) => { console.log(`Stop error: ${errorMessage}`); }
        );
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


    setListening(v) {
        this.listening = v;
        this.renderListening();
    }

    renderListening() {
        let questo= this;



        let text = "START";
        if (questo.listening) text = "STOP";
        questo.buttontext = text;
        if (questo.listening) {
            questo.startListening();
        } else {
            questo.stopListening();
        }
    }



}
