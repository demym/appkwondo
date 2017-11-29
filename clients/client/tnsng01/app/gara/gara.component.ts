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
    templateUrl: "./gara.component_new2.html",
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
    viewinfo = false;
    info: any = {

    }
    categoriecoperte:any={};


    private _sideDrawerTransition: DrawerTransitionBase;

    constructor(public route: ActivatedRoute, public router: Router, public backend: Backend) {
        var questo=this;
        this.route.queryParams.subscribe(params => {
            console.log("params", JSON.stringify(params));
            this.garaid = params.id;
            console.log("garaid", this.garaid);
            questo.loading=true;
            this.refresh(function (data) { 
                questo.loading=false;
            });

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
            questo.jgara = questo.backend.activegara.gara.rows[0].doc;
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


            questo.info.dadisputare=questo.backend.filterRows(questo.gara.matchesbyprog,{ dadisputare: "yes"});
            questo.info.disputati=questo.backend.filterRows(questo.gara.matchesbyprog,{ disputato: "yes"});
            questo.info.vinti=questo.backend.filterRows(questo.gara.matchesbyprog,{ disputato: "yes", vinto: "yes"});
            questo.info.persi=questo.backend.filterRows(questo.gara.matchesbyprog,{ disputato: "yes", vinto: "no"});
            questo.categoriecoperte=questo.getCategorieCoperte();
            console.log("questo.info",JSON.stringify(questo.info));
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

    navBack(){
        this.router.navigate(["/gara"]);
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

    viewInfo() {
        console.log("viewInfo tap");
        this.viewinfo = !this.viewinfo;
    }

    getArrLen(m) {

        if (!m) return 0;

        //console.log("m",m);

        var arr = m.split(",");
        var l = arr.length;
        if (m.trim() == "") l = 0;
        return l;

    }


    getMaschiFemmine(m, sucosa?: any) {
        return this.backend.getMaschiFemmine(m, sucosa);
    }



  getCategorieCoperte(societa?: any) {
    var questo=this;
    
        if (!societa) societa = "A.S.D. TAEKWONDO ROZZANO";
        console.log("getCategorieCoperte",societa,questo.jgara);
    
        var result = {
            cats: [],
            text: "Dati ufficiali categorie non disponibili"
        }
        if (!questo.jgara.hasOwnProperty("tkdt")) return result;
        if (questo.jgara) {
           
                var garadoc = questo.jgara;
                var tkdtiscritti = garadoc.tkdt.atleti;
                if (tkdtiscritti.length == 0) tkdtiscritti = garadoc.tkdt.atleti_iscritti;
    
                let roz:any = questo.backend.filterArray(tkdtiscritti, {
                    societa: societa
                }, true);
                //console.log($roz);
    
                //sort by categoria
    
                roz.sort(function (a, b) {
                    var a1 = a.catcintura + a.cateta + a.catpeso + a.sesso;
                    var b1 = b.catcintura + b.cateta + b.catpeso + b.sesso;
                    if (a1 > b1) return 1;
                    if (a1 < b1) return -1;
                    return 0;
    
    
                })
    
                //scan categorie
                var cat = "";
                var catcount = 0;
                var res:any = [];
                roz.forEach(function (item,i) {
                    var atl = roz[i];
                    var cateta = atl.cateta;
                    var catpeso = atl.catpeso;
                    var catcintura = atl.catcintura;
                    var sesso = atl.sesso;
                    var catx = catcintura + cateta + catpeso + sesso;
    
                    if (catx != cat) {
                        //count = 0;
    
                        var newcat = {
                            cateta: cateta,
                            catpeso: catpeso,
                            catcintura: catcintura,
                            sesso: sesso,
                            atleti: []
                        }
    
                        res.push(newcat);
                        catcount++;
                        cat = catx;
    
    
                    }
                    var lastres = res[res.length - 1];
                    lastres.atleti.push(atl)
                    //count++;
    
                })
    
                //console.log(res);
    
                var text = res.length + " categorie coperte con  " + roz.length + " atleti"
                console.log(text);
                res.forEach(function (ritem,ri) {
                    var r = res[ri];
                    //console.log(r.sesso+" - "+r.cateta+" - "+r.catcintura+" - "+r.catpeso+": "+r.atleti.length+" atleti");
    
                })
    
                result.cats = res;
                result.text = text;
    
           
    
        }
        return result;
    
    }
}
