import { Component, OnInit, ViewChild } from "@angular/core";
import { DrawerTransitionBase, SlideInOnTopTransition } from "nativescript-telerik-ui/sidedrawer";
import { RadSideDrawerComponent } from "nativescript-telerik-ui/sidedrawer/angular";
import { Backend } from "../providers/backend/backend";
import { ActivatedRoute, Router, NavigationExtras } from "@angular/router";
import { SegmentedBar, SegmentedBarItem } from "ui/segmented-bar";
import frameModule = require("ui/frame");
@Component({
    selector: "Gara",
    moduleId: module.id,
    templateUrl: "./gara.component.html",
    styleUrls: ["./gara.component.css"]
})
export class GaraComponent implements OnInit {
    /* ***********************************************************
    * Use the @ViewChild decorator to get a reference to the drawer component.
    * It is used in the "onDrawerButtonTap" function below to manipulate the drawer.
    *************************************************************/
    @ViewChild("drawer") drawerComponent: RadSideDrawerComponent;
    mysegments: Array<SegmentedBarItem>;
    segmentsarr = ["Per Match", "Per Atleta", "Cronaca", "Iscritti"];
    jgara: any = {
        id: "",
        title: "",
        location: "",
        data: ""
    };
    gara: any = {
        matchesbyprog: {
            rows: []
        },
        matchesbyatleta: {
            rows: []
        },
        cronaca: {
            rows: []
        }
    };
    displayedmbp = [];
    iscritti = [];
    atletiiscritti = [];
    garaid = "";
    activesegment = "Per Match";
    topmost = frameModule.topmost();
    loading = false;

    private _sideDrawerTransition: DrawerTransitionBase;

    constructor(public route: ActivatedRoute, public router: Router, public backend: Backend) {
        this.route.queryParams.subscribe(params => {
            console.log("params", JSON.stringify(params));
            this.garaid = params.id;
            console.log("garaid", this.garaid);
            this.refresh(function (data) { });

        });

        this.mysegments = [];

        for (let i = 0; i < this.segmentsarr.length; i++) {
            const item = new SegmentedBarItem();
            item.title = this.segmentsarr[i];
            this.mysegments.push(item);
        }




    }

    onSelectedSegmentChange(ev) {
        let sbar = <SegmentedBar>ev.object;
        this.activesegment = this.segmentsarr[sbar.selectedIndex];
        console.log("activesegment", this.activesegment);
    }

    pullRefresh() {
        console.log("pullrefresh");
        var questo = this;
        questo.loading = true;
        questo.refresh(function () {
            console.log("refreshed");
            questo.loading = false;
        })
    }


    refresh(callback) {
        var questo = this;
        var url = questo.backend.rooturl + "/gare/fullgarabyid/" + this.garaid + "?societaid=20160217220400";
        console.log("calling url", url);
        questo.backend.fetchData(url, function (data) {
            questo.gara = data;
            questo.backend.activegara = data;
            questo.jgara = questo.gara.gara.rows[0].doc;
            questo.displayedmbp = [];
            questo.gara.matchesbyprog.rows.forEach(function (item, idx) {
                if (item.doc.dadisputare == 'yes') questo.displayedmbp.push(item);
            })
            console.log("displayedmbp", questo.displayedmbp.length);

            questo.iscritti = questo.gara.gara.rows[0].doc.iscritti.split(",");

            questo.iscritti.forEach(function (item, idx) {
                var atl = questo.getAtletaIscritto(item);
                questo.atletiiscritti.push(atl);

            })
            questo.atletiiscritti.sort(function (a, b) {
                var a1 = a.cognome + a.nome;
                var b1 = b.cognome + b.nome;
                if (a1 > b1) return 1;
                if (a1 < b1) return -1;
                return 0;
            })

            console.log("gara", questo.gara.matchesbyprog.rows.length);
            if (callback) callback();
        })

    }

    itemTap(item) {
        console.log("item", JSON.stringify(item));
    }

    /* ***********************************************************
    * Use the sideDrawerTransition property to change the open/close animation of the drawer.
    *************************************************************/
    ngOnInit(): void {
        this._sideDrawerTransition = new SlideInOnTopTransition();
        console.log("ngonoinit")

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


    getImg(m) {
        //console.log("getImg", m);
        var imgsrc: String = "matchtoplay.png";
        if (m.doc.disputato == "yes") {

            imgsrc = "matchko.png";
            if (m.doc.vinto == "yes") imgsrc = "matchok.png";
            if (m.doc.medagliamatch) {
                if (m.doc.medagliamatch != "none") {
                    imgsrc = "medaglia_" + m.doc.medagliamatch + ".png";
                }
            }

        }
        if (m.doc.realtime) {
            if (String(m.doc.realtime) == "true") imgsrc = "greenblink.gif";
        }

        imgsrc = "~/images/" + imgsrc;
        //console.log("imgsrc", imgsrc);
        return imgsrc;



    }


    getImgPerAtleta(m) {
        //console.log("getImgPerAtleta", m);
        var imgsrc: String = "matchtoplay.png";
        var medaglia = "none";
        m.matchesarray.forEach(function (item, idx) {

            if (item.medagliamatch != "none") {
                medaglia = item.medagliamatch;
            }
        });
        if (medaglia != "none") imgsrc = "medaglia_" + medaglia + ".png";


        imgsrc = "~/images/" + imgsrc;
        //console.log("imgsrc", imgsrc);
        return imgsrc;



    }

    getAtletaIscritto(i) {
        return this.backend.getAtletaById(i);
    }

    gotoChat() {



        this.router.navigate(["/chat"]);
    }

    getVintoPersoClass(item) {
        var retclass = "";
        var doc = item;
        if (item.hasOwnProperty("doc")) doc = item.doc;
        if (doc.dadisputare == "yes") {
            if (doc.disputato == "yes") {
                if (doc.vinto == "yes") {
                    retclass = "greenbold";
                } else retclass = "redbold";
            } else retclass = "nondisputato";
        } else retclass = "danondisputare";
        return retclass + ' matchnum';
    }

    getRisultatoText(item) {
        var retclass = "";
        if (item.doc.disputato == "yes") {
            if (item.doc.vinto == "yes") {
                retclass = "Vinto, risultato " + item.doc.risultato;
            } else retclass = "Perso, risultato " + item.doc.risultato;
        } else retclass = "Non disputato";
        return retclass;
    }

    getRisultatoClass(item) {
        var retclass = "";
        if (item.doc.disputato == "yes") {
            if (item.doc.vinto == "yes") {
                retclass = "greenbold";
            } else retclass = "redbold";
        } else retclass = "nondisputato";
        return retclass;
    }


    showMatchesForAtleta(garaid, atletaid) {
        var questo = this;

        var mpa = [];

        questo.gara.matchesbyprog.rows.forEach(function (item, idx) {
            if (item.doc.atletaid == atletaid) mpa.push(item);
        })

        var pars = {
            atletaid: atletaid

        }

        let navigationExtras: NavigationExtras = {
            queryParams: {
                parms: JSON.stringify(pars)
            }

        };

        //console.log("queryParams",navigationExtras.queryParams.parms);
        this.router.navigate(["/matchesforatleta"], navigationExtras);
    }
}
