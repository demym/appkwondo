import { Component, OnInit, ViewChild } from "@angular/core";
import { DrawerTransitionBase, SlideInOnTopTransition } from "nativescript-telerik-ui/sidedrawer";
import { RadSideDrawerComponent } from "nativescript-telerik-ui/sidedrawer/angular";
import { Backend } from "../providers/backend/backend";
import { ActivatedRoute, Router } from "@angular/router";

import frameModule = require("ui/frame");
@Component({
    selector: "Matchesforatleta",
    moduleId: module.id,
    templateUrl: "./matchesforatleta.component.html",
    styleUrls: ["./matchesforatleta.component.css"]
})
export class MatchesforatletaComponent implements OnInit {
    /* ***********************************************************
    * Use the @ViewChild decorator to get a reference to the drawer component.
    * It is used in the "onDrawerButtonTap" function below to manipulate the drawer.
    *************************************************************/
    @ViewChild("drawer") drawerComponent: RadSideDrawerComponent;
    pagetitle = "";
    jgara: any = {
        title: "",
        location: ""
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
    mpa: any = [];
    displayedmbp: any = [];
    iscritti: any = [];
    atletiiscritti: any = [];
    garaid = "";
    activesegment = "Per Match";
    topmost = frameModule.topmost();
    atl: any = {

    }
    atletaid = "";
    history: any = [];
    viewAvversari: any = false;
    viewHistory: any = false;
    viewTkdt: any = false;
    viewTkdtCategoria: any = false;
    viewTabulato: any = false;
    tkdt: any = {};
    avversari: any = [];
    tkdtatleta: any = {};
    tkdtatletaarr: any = [];
    tabulato: any = {};
    tabulatoimg: any = "assets/img/boxbianco.jpg";
    atleta: any={};


    private _sideDrawerTransition: DrawerTransitionBase;

    constructor( public route: ActivatedRoute, public router: Router, public backend: Backend) {
        var questo = this;
        this.route.queryParams.subscribe(params => {
            //console.log("parms", JSON.stringify(params));
            var parms = params.parms;
            var jparms = JSON.parse(parms);
            questo.atletaid = jparms.atletaid;
            questo.atl = questo.backend.getAtletaById(questo.atletaid);
            questo.pagetitle = "Incontri per " + questo.atl.cognome + " " + questo.atl.nome;
            //console.log("match per atleta", JSON.stringify(questo.mpa));
            // questo.refresh(function (data) { });

        });




    }




    refresh(callback) {
        var questo = this;
        var url = questo.backend.rooturl + "/gare/fullgarabyid/" + this.garaid + "?societaid=20160217220400";
        console.log("calling url", url);
        questo.backend.fetchData(url, function (data) {
            questo.backend.activegara = data;
            questo.jgara = questo.backend.activegara.gara.rows[0].doc;
            questo.displayedmbp = [];

            questo.backend.activegara.matchesbyprog.rows.forEach(function (item, idx) {
                if (item.doc.dadisputare == 'yes') questo.displayedmbp.push(item);
            })
            console.log("displayedmbp", questo.displayedmbp.length);

            questo.iscritti = questo.backend.activegara.gara.rows[0].doc.iscritti.split(",");

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

            console.log("gara", questo.backend.activegara.matchesbyprog.rows.length);
            questo.atleta=questo.backend.getAtletaById(questo.atletaid);
            var cat=questo.getCategoria(questo.atleta.datanascita);
            questo.tkdtatleta=questo.backend.getTkdtAtleta(questo.atleta);
            questo.avversari=questo.backend.getTkdtAtletiCategoria(questo.tkdtatleta.cateta,questo.tkdtatleta.catcintura,questo.tkdtatleta.catpeso,questo.tkdtatleta.sesso);
            
        
            
        
        
            for (var k in questo.tkdtatleta){
              if (questo.tkdtatleta.hasOwnProperty(k)){
                var newel={
                  name: k,
                  value: questo.tkdtatleta[k]
                }
                questo.tkdtatletaarr.push(newel);
              }
            }
        
            console.log("tkdtatleta",questo.tkdtatleta);
            console.log("avversari",questo.avversari);
        })

    }

    itemTap(item) {
        console.log("item", JSON.stringify(item));
    }

    getCategoria(dn){
        var questo=this;
        return this.backend.getCategoria(dn,questo.backend.activegara.gara.rows[0].doc.data);
      }

    /* ***********************************************************
    * Use the sideDrawerTransition property to change the open/close animation of the drawer.
    *************************************************************/
    ngOnInit(): void {
        var questo = this;
        this._sideDrawerTransition = new SlideInOnTopTransition();
        console.log("ngonoinit");
        questo.displayedmbp = [];
        questo.backend.activegara.matchesbyprog.rows.forEach(function (item, idx) {
            if (item.doc.dadisputare == 'yes') questo.displayedmbp.push(item);
        })
        console.log("displayedmbp", questo.displayedmbp.length);

        questo.iscritti = questo.backend.activegara.gara.rows[0].doc.iscritti.split(",");
        console.log("iscritti",questo.iscritti);
        questo.iscritti.forEach(function (item, idx) {
            var atl = questo.getAtletaIscritto(item);
           // console.log("atl",JSON.stringify(atl));
            questo.atletiiscritti.push(atl);

        })
        questo.atletiiscritti.sort(function (a, b) {
            var a1 = a.cognome + a.nome;
            var b1 = b.cognome + b.nome;
            if (a1 > b1) return 1;
            if (a1 < b1) return -1;
            return 0;
        })


        questo.mpa = [];
        questo.backend.activegara.matchesbyprog.rows.forEach(function (item, idx) {
            var atlid = item.doc.atletaid;
            if (atlid == questo.atletaid) questo.mpa.push(item);
        })

        console.log("gara", questo.backend.activegara.matchesbyprog.rows.length);
        questo.atleta=questo.backend.getAtletaById(questo.atletaid);
        var cat=questo.getCategoria(questo.atleta.datanascita);
        questo.tkdtatleta=questo.backend.getTkdtAtleta(questo.atleta);
    
        questo.avversari=questo.backend.getTkdtAtletiCategoria(questo.tkdtatleta.cateta,questo.tkdtatleta.catcintura,questo.tkdtatleta.catpeso,questo.tkdtatleta.sesso);
        
        questo.tabulato=questo.backend.getTkdtTabulatiCategoria(questo.tkdtatleta.cateta,questo.tkdtatleta.catcintura,questo.tkdtatleta.catpeso,questo.tkdtatleta.sesso)  ;
        console.log("tabulato",JSON.stringify(questo.tabulato));
        
    
    
        for (var k in questo.tkdtatleta){
          if (questo.tkdtatleta.hasOwnProperty(k)){
            var newel={
              name: k,
              value: questo.tkdtatleta[k]
            }
            questo.tkdtatletaarr.push(newel);
          }
        } 

            
        var hastabulato=true;
        for (var kk in questo.tabulato){
          if (questo.tabulato.hasOwnProperty(kk)){
            if (questo.tabulato[kk]=="--") hastabulato=hastabulato && false;
          }
        }  
        console.log("hastabulato",hastabulato)
        if (hastabulato) {
        //if (this.tabulato!={}){
          questo.backend.getTabulatoImg(questo.tabulato.oldhref,function(data){
            console.log("tabulato image",data);
            questo.tabulatoimg=data;
          })
        }
    
        console.log("tkdtatleta",JSON.stringify(questo.tkdtatleta));
        console.log("tkdtatletaarr",JSON.stringify(questo.tkdtatletaarr));
        console.log("avversari",questo.avversari.length);


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
        var doc = m;
        if (m.hasOwnProperty("doc")) doc = m.doc;
        var imgsrc: String = "matchtoplay.png";
        if (doc.disputato == "yes") {

            imgsrc = "matchko.png";
            if (doc.vinto == "yes") imgsrc = "matchok.png";
            if (doc.medagliamatch) {
                if (doc.medagliamatch != "none") {
                    imgsrc = "medaglia_" + doc.medagliamatch + ".png";
                }
            }

        }
        if (doc.realtime) {
            if (String(doc.realtime) == "true") imgsrc = "greenblink.gif";
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
        var doc = item;
        if (item.hasOwnProperty("doc")) doc = item.doc;
        if (doc.disputato == "yes") {
            if (doc.vinto == "yes") {
                retclass = "Vinto, risultato " + item.doc.risultato;
            } else retclass = "Perso, risultato " + item.doc.risultato;
        } else retclass = "Non disputato";
        return retclass;
    }

    getRisultatoClass(item) {
        var retclass = "";
        var doc = item;
        if (item.hasOwnProperty("doc")) doc = item.doc;
        if (doc.disputato == "yes") {
            if (doc.vinto == "yes") {
                retclass = "greenbold";
            } else retclass = "redbold";
        } else retclass = "nondisputato";
        return retclass;
    }

    navBack(){
        this.router.navigate("/gara");
    }
}
