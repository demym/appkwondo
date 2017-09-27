var express = require('express');
var router = express.Router();
var request = require('request');
var syncrequest = require('sync-request');
var cheerio = require('cheerio');
var mongo = require('../routes/mongo');
var utils = require("../routes/utils");


var tkdt_rooturl = "https://www.tkdtechnology.it/index.php/welcome/";


router.get("/tabulatoimage/:tabulatoid", function (req, res) {

    var tabulatoid = req.params.tabulatoid;

    var url = "https://www.tkdtechnology.it/index.php/welcome/vedi_tabulato?id=" + tabulatoid;
    //url=pageurl;
    request(url, function (error, response, html) {
        if (!error && response.statusCode == 200) {

            var $ = cheerio.load(html);
            var banner = $("#banner");
            var img = banner.find("img");
            var src = img.attr("src");
            res.send(src);



        }

    });


})

router.get("/medagliere/:giornoid", function (req, res) {
    var giornoid = req.params.giornoid;
    getMedagliere(giornoid, function (data) {
        res.send(data);

    })
    //var tabulatigiorni_url = tkdt_rooturl + "tabulati_giorni?id=" + garaid;

})

router.get("/medagliereglobale/:giornoid", function (req, res) {
    var giornoid = req.params.giornoid;
    getMedagliereGlobale(giornoid, function (data) {
        res.send(data);

    })
    //var tabulatigiorni_url = tkdt_rooturl + "tabulati_giorni?id=" + garaid;

})



router.get("/exporttkdt", function (req, res) {


    var ret = "";
    mongo.getfile("gare.json", function (gare) {


        //console.log(JSON.stringify(gare));
        //console.log("gare totali: "+gare.rows.length);
        var found = false;
        var data = {
            "rows": []
        }

        for (var i = 0; i < gare.rows.length; i++) {
            var doc = gare.rows[i].doc;
            ret += "analyzing garaid " + doc.id + "<br>";
            if (doc.tkdt) {
                ret += "-- this has tkdt, tkdt_id " + doc.tkdt_id;
            }

        }

        res.send(ret);
    });

})


router.get("/get/:garaid", function (req, res) {

    var tkdt_garaid = req.params.garaid;
    utils.colog("get TKDT gara " + tkdt_garaid);
    getTkdtGara(tkdt_garaid, function (data) {
        res.send(data);
    })

})

router.get("/retrieve/:garaid", function (req, res) {

    var tkdt_garaid = req.params.garaid;
   
    getTkdtGara(tkdt_garaid, function (data) {
        console.log("retrieved gara "+tkdt_garaid+" !");


        var rows = [];
        rows.push(data);
        var newfname = "tkdt_" + tkdt_garaid + ".json";
        
        mongo.updatefile(newfname, rows, function (mdata) {
            console.log(newfname+" updated on mongo !!");
            //console.log(mdata);
            res.send(data);

        });
       
        //res.send(data);

    })

})

router.get("/retrieveforme/:garaid", function (req, res) {

    var tkdt_garaid = req.params.garaid;
    utils.colog("get TKDT gara di forme " + tkdt_garaid);
    getTkdtGaraForme(tkdt_garaid, function (data) {
        var rows = [];
        rows.push(data);
        var newfname = "tkdt_" + tkdt_garaid + ".json";
        mongo.updatefile(newfname, rows, function (mdata) {

            console.log(mdata);
            res.send(data);

        });

    })

})

router.get("/getfromfile/:garaid", function (req, res) {
    var garaid = req.params.garaid;
    mongo.getfile("tkdt_" + garaid + ".json", function (tkdata) {
        console.log(tkdata);
        var retvalue = {
            error: true
        };
        if (tkdata.hasOwnProperty("error")) {
            console.log("error c'è");
            if (String(tkdata.error) != "true") {
                console.log("ed è diverso da true");
                var tkdt = tkdata.rows[0];
                retvalue = tkdt;
            }

        }

        res.send(retvalue);



    })
})



function getTkdtGara(tkdt_garaid, callback) {

    console.log("gettkdtgara", tkdt_garaid);
    var dettagli_url = tkdt_rooturl + "dettagli_gara?id=" + tkdt_garaid;
    var tabulatigiorni_url = tkdt_rooturl + "tabulati_giorni?id=" + tkdt_garaid;
    var iscritti_url = tkdt_rooturl + "elenco_iscritti?id=" + tkdt_garaid;

    var tkdtnew = {
        atleti: [],
        atleti_iscritti: [],
        giorni: [],
        tabulati: []

    }

    console.log("reading iscritti_url",iscritti_url);    
    request.get(iscritti_url, function (e, r, h) {

        tkdtnew.atleti_iscritti = getIscritti(h);
        //console.log("tkdtnew.atleti_iscritti",tkdtnew.atleti_iscritti);

        console.log("reading tabulatigiorni_url",tabulatigiorni_url);
        request(tabulatigiorni_url, function (error, response, html) {
            if (!error && response.statusCode == 200) {

                var $ = cheerio.load(html);

                var banner = $("#banner");
                var bscomponent = banner.find(".bs-component");

                console.log("bscomponent", bscomponent.length);
                var htm = "";

                bscomponent.each(function (i, element) {
                    //console.log("bscomponent "+i+": ",element);
                    var giorno = {
                        titolo: "",
                        tabulati: [],
                        medagliere: [],
                        atleti: [],
                        enabled: false,
                        hasContent: false
                    }
                    //var a_arr = $(this).find($("a"));
                    var a_arr = $(element).find("a");
                    console.log("a_arr",a_arr.length);
                    var a=a_arr;
                    var txt = a.attr("href");
                    //var txt = a.attributes.href;
                    console.log("a attr href",txt);
                    console.log("a attr disabled",a.attr("disabled"));
                    if (a.attr("disabled") == "disabled") {
                        txt = a.text();
                        txt = txt.replace("I tabulati per questa giornata non sono ancora stati pubblicati", "");
                        giorno.enabled = false;
                        giorno.titolo = txt.trim();
                        giorno.hasContent = false;
                    } else {
                        var giornatagara = getQsFromUrl(txt, "id_giornata");
                        console.log("giornatagara", giornatagara);
                        giorno.id_giornata = giornatagara;
                        giorno.enabled = true;
                        giorno.titolo = a.text().trim();
                        giorno.hasContent = true;

                    }
                    tkdtnew.giorni.push(giorno);
                });

                for (var i = 0; i < tkdtnew.giorni.length; i++) {
                    //$(tkdtnew.giorni).each(function (i) {

                    var giorno = tkdtnew.giorni[i];
                    var ena = giorno.enabled;

                    console.log("retrieving giorno " + giorno.id_giornata);


                    var data=getTkdtGiorno(giorno.id_giornata, giorno.titolo);
                    //console.log("giorno",data);

                    //getTkdtGiorno(giorno.id_giornata, giorno.titolo, function (data) {

                        //utils.colog(data);

                        tkdtnew.giorni[i] = data;
                        tkdtnew.giorni[i].enabled = ena;

                        console.log("got giorno " + giorno.id_giornata, "enabled", ena);

                        /*tkdtnew.giorni[i].elenco_societa= data.elenco_societa;
                        tkdtnew.giorni[i].medagliere= data.medagliere;
                        tkdtnew.giorni[i].tabulati= data.tabulati;*/


                        //tkdtnew.giorni[i].body = data;
                   // });






                }


                //MERGE ATLETI
                for (var i = 0; i < tkdtnew.giorni.length; i++) {
                    //$(tkdtnew.giorni).each(function (i) {
                    var giorno = tkdtnew.giorni[i];
                    for (var j = 0; j < giorno.elenco_societa.rows.length; j++) {
                        //$(giorno.elenco_societa.rows).each(function (j) {
                        var soc = giorno.elenco_societa.rows[j];
                        var atleti = soc.atleti;
                        for (var x = 0; x < atleti.length; x++) {
                            // $(atleti).each(function (x) {
                            var atl = atleti[x];
                            tkdtnew.atleti.push(atl);

                            // })
                        }

                        //})
                    }

                    //})
                }

                //MERGE TABULATI
                for (var i = 0; i < tkdtnew.giorni.length; i++) {
                    //$(tkdtnew.giorni).each(function (i) {
                    var giorno = tkdtnew.giorni[i];
                    for (var j = 0; j < giorno.tabulati.rows.length; j++) {
                        //$(giorno.tabulati.rows).each(function (j) {
                        var tab = giorno.tabulati.rows[j];
                        tkdtnew.tabulati.push(tab);


                        //})
                    }
                    // });
                }

                //res.send(tkdtnew);
                callback(tkdtnew);
            }
        });

    })



}



function getTkdtGaraForme(tkdt_garaid, callback) {

    console.log("gettkdtgara", tkdt_garaid);
    var dettagli_url = tkdt_rooturl + "dettagli_gara?id=" + tkdt_garaid;
    var tabulatigiorni_url = tkdt_rooturl + "tabulati_giorni?id=" + tkdt_garaid;
    var iscritti_url = tkdt_rooturl + "elenco_iscritti_forme?id=" + tkdt_garaid;

    var tkdtnew = {
        atleti: [],
        atleti_iscritti: [],
        giorni: [],
        tabulati: []

    }

    request.get(iscritti_url, function (e, r, h) {

        tkdtnew.atleti_iscritti = getIscrittiForme(h);
        callback(tkdtnew);
        return;


        request(tabulatigiorni_url, function (error, response, html) {
            if (!error && response.statusCode == 200) {

                var $ = cheerio.load(html);

                var banner = $("#banner");
                var bscomponent = banner.find(".bs-component");

                console.log("bscomponent", bscomponent.length);
                var htm = "";

                bscomponent.each(function (i, element) {
                    var giorno = {
                        titolo: "",
                        tabulati: [],
                        medagliere: [],
                        atleti: [],
                        enabled: false,
                        hasContent: false
                    }
                    var a = $(this).find("a");
                    console.log("a", a);
                    var txt = a.attr("href");
                    if (a.attr("disabled") == "disabled") {
                        txt = a.text();
                        txt = txt.replace("I tabulati per questa giornata non sono ancora stati pubblicati", "");
                        giorno.enabled = false;
                        giorno.titolo = txt.trim();
                        giorno.hasContent = false;
                    } else {
                        var giornatagara = getQsFromUrl(txt, "id_giornata");
                        console.log("giornatagara", giornatagara);
                        giorno.id_giornata = giornatagara;
                        giorno.enabled = true;
                        giorno.titolo = a.text().trim();
                        giorno.hasContent = true;

                    }
                    tkdtnew.giorni.push(giorno);
                });

                for (var i = 0; i < tkdtnew.giorni.length; i++) {
                    //$(tkdtnew.giorni).each(function (i) {

                    var giorno = tkdtnew.giorni[i];
                    var ena = giorno.enabled;

                    console.log("retrieving giorno " + giorno.id_giornata);

                    getTkdtGiorno(giorno.id_giornata, giorno.titolo, function (data) {

                        //utils.colog(data);

                        tkdtnew.giorni[i] = data;
                        tkdtnew.giorni[i].enabled = ena;

                        console.log("got giorno " + giorno.id_giornata, "enabled", ena);

                        /*tkdtnew.giorni[i].elenco_societa= data.elenco_societa;
                        tkdtnew.giorni[i].medagliere= data.medagliere;
                        tkdtnew.giorni[i].tabulati= data.tabulati;*/


                        //tkdtnew.giorni[i].body = data;
                    });






                }


                //MERGE ATLETI
                for (var i = 0; i < tkdtnew.giorni.length; i++) {
                    //$(tkdtnew.giorni).each(function (i) {
                    var giorno = tkdtnew.giorni[i];
                    for (var j = 0; j < giorno.elenco_societa.rows.length; j++) {
                        //$(giorno.elenco_societa.rows).each(function (j) {
                        var soc = giorno.elenco_societa.rows[j];
                        var atleti = soc.atleti;
                        for (var x = 0; x < atleti.length; x++) {
                            // $(atleti).each(function (x) {
                            var atl = atleti[x];
                            tkdtnew.atleti.push(atl);

                            // })
                        }

                        //})
                    }

                    //})
                }

                //MERGE TABULATI
                for (var i = 0; i < tkdtnew.giorni.length; i++) {
                    //$(tkdtnew.giorni).each(function (i) {
                    var giorno = tkdtnew.giorni[i];
                    for (var j = 0; j < giorno.tabulati.rows.length; j++) {
                        //$(giorno.tabulati.rows).each(function (j) {
                        var tab = giorno.tabulati.rows[j];
                        tkdtnew.tabulati.push(tab);


                        //})
                    }
                    // });
                }

                //res.send(tkdtnew);
                callback(tkdtnew);
            }
        });

    })



}


router.get("/getgiorno/:giornoid", function (req, res) {
    var giornoid = req.params.giornoid;
    getTkdtGiorno(giornoid, "Domenica 29 Gennaio 2017", function (data) {
        res.send(data);
    })

})


function getTkdtGiorno(giornataid, titolo, callback) {

    console.log("gettkdtgiorno ", giornataid);
    var giornata = {
        id: giornataid,
        titolo: titolo,
        enabled: false,
        tabulati: {
            html: "",
            rows: []
        },
        medagliere: {
            rows: [],
            html: ""
        },
        elenco_societa: {
            rows: [],
            html: ""
        }
    }

    var giornodata = "03-12-2016";

    var url = tkdt_rooturl + "dettaglio_tabulati?id_giornata=" + giornataid;
    console.log("calling in sync mode url ",url);
    var res = syncrequest('GET', url);
    var body = res.getBody("utf-8");
    //console.log(res.getBody());
    //callback(body);
    var $ = cheerio.load(body);


    var divs = ["tabulati", giornodata, "elenco_societa"];
    var html = "";
    for (var i = 0; i < divs.length; i++) {
        var divname = divs[i];
        var divcontent = $("#" + divs[i]);
        console.log("divname",divname);

        if (divname == "tabulati") {

            var tr = divcontent.find("table").find("tbody").find("tr");
            //var th = divcontent.find("table").find("thead").find("tr").find("th:eq(3)");
            //th.remove();
            //console.log("tr inside div tabulati", tr.length);
            tr.each(function (x) {
                //var td = $(this).find("td:eq(5)");
                //var td0 = $(this).find("td:eq(0)");

                //td0.attr("onclick", "greenifyMe(this,false)");

                //td.html(td.html().replace("Vedi", ""));
                //td.find("span").remove();
                //td.find("a").addClass("ui-btn");
                //td.find("a").attr("onclick", "greenifyMe(this,true)");

                var td;
                var sesso = "";
                var categoria_eta = "";
                var cintura_da = "";
                var cintura_a = "";
                var categoria_peso = "";
                $(this).find("td").each(function (j) {
                    if (j == 0) sesso = $(this).text();
                    if (j == 1) categoria_eta = $(this).text();
                    if (j == 2) cintura_da = $(this).text();
                    if (j == 3) cintura_a = $(this).text();
                    if (j == 4) categoria_peso = $(this).text();
                    if (j == 5) td = $(this);
                })

                /*var sesso = $(this).find("td:eq(0)").text();
                var categoria_eta = $(this).find("td:eq(1)").text();
                var cintura_da = $(this).find("td:eq(2)").text();
                var cintura_a = $(this).find("td:eq(3)").text();
                var categoria_peso = $(this).find("td:eq(4)").text();*/

                //$(this).find("td:eq(2)").html(cintura_da + "<br>" + cintura_a);

                //console.log(td.html());
                var a = td.find("a");
                //a.removeAttr("target");
                var hr = a.attr("href");
                //console.log("HR", hr);
                var newhref = "javascript:openTabulatoPageNew('" + hr + "')";
                a.attr("href", newhref);
                var newtabulato = {
                    href: newhref,
                    oldhref: hr,
                    sesso: sesso,
                    categoria_eta: categoria_eta,
                    cintura_da: cintura_da,
                    cintura_a: cintura_a,
                    categoria_peso: categoria_peso

                }
                //console.log("newtabulato "+x,newtabulato);
                //$(this).find("td:eq(3)").remove();
                
                giornata.tabulati.rows.push(newtabulato);

            });


            
           // giornata.tabulati.html = divcontent.html({ decodeEntities: false });
           giornata.tabulati.html = "";

            console.log("sono qui 2 !!");

        }

        if (divname == "elenco_societa") {

            //rdivs.each(function () {
            var rdivs = divcontent.find("div[style='border:solid; border-radius:40px; text-align: center']");
            //var rdivs = divcontent.find("div");
            rdivs.each(function () {
                var rdiv = $(this);
                //rdiv.attr("style", "width: 100%; font-size: 12px;");
                var societa = rdiv.find("h3").text();
                console.log("societa", societa);




                //check if societa already there

                var found = false;
                for (var j = 0; j < giornata[divname].rows.length; j++) {
                    //$(giornata[divname].rows).each(function (j) {
                    var socrow = giornata[divname].rows[j];

                    var socname = socrow.societaname;

                    if (socname.trim().toLowerCase() == societa.trim().toLowerCase()) found = true;

                    // })
                }



                if (!found) { //add societa
                    var newsoc = {
                        societaname: societa,
                        atleti: []
                    }


                    var atletidiv = rdiv.find("div");
                    //console.log("atletidic length:", atletidiv.length);
                    //for (var x=0; x<atletidiv.length; x++){
                    atletidiv.each(function (x) {
                        var adiv = $(this);
                        var rigaatleta = adiv.find("a").text().trim();
                        var propatleta = adiv.text();
                        //console.log("propatleta",propatleta);
                        propatleta = propatleta.replace("kg", "").trim();
                        //console.log(rigaatleta);
                        var arr = propatleta.split(" - ");


                        var sesso = arr[1];
                        var cateta = arr[2];
                        var peso = arr[3];

                        var arr2 = peso.split(" ");
                        var catpeso = arr2[arr2.length - 1].trim();
                        var catcint = peso.replace(catpeso, "").trim();




                        var newatl = {
                            nome: rigaatleta,
                            sesso: sesso,
                            cateta: cateta,
                            catpeso: catpeso,
                            catcintura: catcint,
                            societa: societa
                        }
                        //console.log(rigaatleta);
                        newsoc.atleti.push(newatl);
                    })
                    // }

                    giornata[divname].rows.push(newsoc);




                }

                //giornata.elenco_societa.html = divcontent.html({ decodeEntities: true });
                giornata.elenco_societa.html = "";





            });
            st = " style='display: none;' ";

        }




        //html += divcontent.html({ decodeEntities: true });
    }


 

    giornata.elenco_societa.rows.sort(function (a, b) {
        var a1 = a.societaname;
        var b1 = b.societaname;
        if (a1 > b1) return 1;
        if (a1 < b1) return -1;
        return 0;

    })

    //console.dir(giornata);
    if (callback) callback(giornata);
    return giornata;

}


function getQsFromUrl(url, name) {

    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}


function getIscritti(h) {
    //utils.colog("getiscritti");
    var iscritti = [];

    h = h.replAll("<br>", "");
    var $ = cheerio.load(h);
    var elcat = $("#elenco-societa");
    //utils.colog("iscritti tkdt",elcat.html());
    var spans = elcat.find("span,h4");
    //utils.colog("spans", spans.length);

    var squadra = "";
    for (var i = 0; i < spans.length; i++) {
        //spans.each(function (i) {

        var el = spans[i];
        //var tag = el.get(0).tagName;

        var tag = el.name.toUpperCase();
        //utils.colog("tag", tag);
        //utils.colog(el);

        if (tag == "H4") {
            //squadra = el.text().trim();
            squadra = el.children[0].data.trim();
            //utils.colog("h4 squadra", squadra)
        }

        if (tag == "SPAN") {

            var aname = $(el).find("a").text().trim();
            //utils.colog("aname", aname)
            //utils.colog(el);
            var cat = el.children[2].data.trim();
            //utils.colog("cat", cat);
            cat = cat.replace(aname, "").replace("|", "").trim();
            // utils.colog("span atleta", aname, "cat", cat);


            var arrx = cat.replace("kg", "").trim().split(")");
            //colog(arrx.length);
            if (arrx.length < 3) arrx = cat.replace("kg", "").trim().split("Dan");
            var catpeso = arrx[arrx.length - 1].trim();
            //colog("catpeso",catpeso);

            cat = cat.replace("kg", "")

            //colog("cat",cat);
            cat = cat.replace(catpeso, "").trim();

            var arr = cat.split(" - ");


            var sesso = arr[0].trim();
            var cateta = arr[1].trim();
            var arrc = arr[2].replace("kg", "").split("->");

            var cintura_da = arrc[0].trim();


            var cintura_a = arrc[1].trim();
            var catcintura = cintura_da.trim() + " -> " + cintura_a.trim();


            var atl = {
                sesso: sesso,
                cateta: cateta,
                cintura_da: cintura_da,
                cintura_a: cintura_a,
                catcintura: catcintura,
                catpeso: catpeso,
                nome: aname,
                societa: squadra
            }

            iscritti.push(atl);

        }




        // })
    }

    return iscritti;
    //console.log("tkdtnew",tkdtnew);
    //if (callback) callback(tkdtnew.atleti_iscritti);



}


function getIscrittiForme(h) {
    //utils.colog("getiscritti");
    var iscritti = [];

    h = h.replAll("<br>", "");
    var $ = cheerio.load(h);
    var elcat = $("#elenco-societa");
    //utils.colog("iscritti tkdt",elcat.html());
    var spans = elcat.find("span,h4");
    //utils.colog("spans", spans.length);

    var squadra = "";
    for (var i = 0; i < spans.length; i++) {
        //spans.each(function (i) {

        var el = spans[i];
        //var tag = el.get(0).tagName;

        var tag = el.name.toUpperCase();
        //utils.colog("tag", tag);
        //utils.colog(el);

        if (tag == "H4") {
            //squadra = el.text().trim();
            squadra = el.children[0].data.trim();
            //utils.colog("h4 squadra", squadra)
        }

        if (tag == "SPAN") {
            var todo = el.children[0].data.trim();
            console.log("todo", todo);

            var arr = todo.split(" - ");

            var aname = arr[0].trim();
            var cattipo = arr[1].trim();

            var sesso;
            var cateta;
            var catcintura;

            var isIndividual = true;

            if (cattipo.indexOf("MF") > -1) isIndividual = false;
            if (cattipo.indexOf("FFM") > -1) isIndividual = false;

            if (isIndividual) {
                sesso = arr[2].trim();
                cateta = arr[3].trim();
                catcintura = arr[4].trim();

            } else {
                sesso = "MF";
                cateta = arr[2].trim();
                catcintura = arr[3].trim();

            }



            var atl = {
                sesso: sesso,
                cateta: cateta,
                cattipo: cattipo,
                catcintura: catcintura,
                nome: aname,
                societa: squadra
            }

            iscritti.push(atl);


            /*
            var aname = $(el).find("a").text().trim();
          
            var cat = el.children[2].data.trim();
            
            cat = cat.replace(aname, "").replace("|", "").trim();
          


            var arrx = cat.replace("kg", "").trim().split(")");
        
            if (arrx.length < 3) arrx = cat.replace("kg", "").trim().split("Dan");
            var catpeso = arrx[arrx.length - 1].trim();
            

            cat = cat.replace("kg", "")

          
            cat = cat.replace(catpeso, "").trim();

            var arr = cat.split(" - ");


            var sesso = arr[0].trim();
            var cateta = arr[1].trim();
            var arrc = arr[2].replace("kg", "").split("->");

            var cintura_da = arrc[0].trim();


            var cintura_a = arrc[1].trim();
            var catcintura = cintura_da.trim() + " -> " + cintura_a.trim();


            var atl = {
                sesso: sesso,
                cateta: cateta,
                cintura_da: cintura_da,
                cintura_a: cintura_a,
                catcintura: catcintura,
                catpeso: catpeso,
                nome: aname,
                societa: squadra
            }

            iscritti.push(atl);
            */

        }




        // })
    }

    return iscritti;
    //console.log("tkdtnew",tkdtnew);
    //if (callback) callback(tkdtnew.atleti_iscritti);



}


String.prototype.replAll = function (search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};



function getDataGiornata(titolo) {
    //utils.colog("getDataGiornata",titolo);
    var arr = titolo.trim().split(" ");
    var gg = arr[1];
    var smm = arr[2];
    var yy = arr[3];
    //utils.colog("gg",gg,"smm",smm,"yy",yy)
    var mesi = ["gennaio", "febbraio", "marzo", "aprile", "maggio", "giugno", "luglio", "agosto", "settembre", "ottobre", "novembre", "dicembre"];
    var mm = "01";
    for (var i = 0; i < mesi.length; i++) {
        var cercamese = smm.toLowerCase().trim();
        var ii = parseInt(i, 10) + 1;
        if (cercamese == mesi[i]) mm = utils.Right("0000" + ii, 2);
    }

    //utils.colog("mm",mm);
    var retdata = gg + "-" + mm + "-" + yy;
    return retdata;
}


function getMedagliere(giornoid, callback) {
    var url = tkdt_rooturl + "dettaglio_tabulati?id_giornata=" + giornoid;
    console.log("requesting tkdt url", url);
    request(url, function (error, response, html) {
        if (!error && response.statusCode == 200) {
            var $ = cheerio.load(html);

            var banner = $("#banner");
            var titoloh3 = banner.find("h3");
            //console.log(titoloh3[0]);

            var titolo = titoloh3[0].children[0].data.trim();

            //console.log(titolo);
            var datagiornata = getDataGiornata(titolo);
            console.log(datagiornata);


            var pos0 = html.indexOf('<div class="tab-pane fade" id="'+datagiornata+'">');
            var htm = html.substring(pos0);

            var pos1 = htm.indexOf("</table>");
            htm = htm.substring(0, pos1)+"</table></div>";
            htm = "<h1>" + titolo + "</h1><br>" + htm;
            callback(htm);
            return;
        }
    });
}


function getMedagliere_old(giornoid, callback) {
    var url = tkdt_rooturl + "dettaglio_tabulati?id_giornata=" + giornoid;
    console.log("requesting tkdt url", url);
    request(url, function (error, response, html) {
        if (!error && response.statusCode == 200) {
            var $ = cheerio.load(html);

            var banner = $("#banner");
            var titoloh3 = banner.find("h3");
            //console.log(titoloh3[0]);

            var titolo = titoloh3[0].children[0].data.trim();

            //console.log(titolo);
            var datagiornata = getDataGiornata(titolo);
            console.log(datagiornata);

            var divcontent = $("#" + datagiornata);

            var htm = divcontent.html();

            /*

            var tbody=divcontent.find("tbody");

            var tr=tbody.find("tr");
            console.log("tr",tr.length);

            for (var i=0; i<tr.length; i++){

                var td=$(tr[i]).find("td");
                console.log("tdlength",td.length)
                for (var j=0; j<td.length; j++){
                    console.log(td[j].children[0].data.trim());


                }




            }*/

            callback(htm);
        }
    });



}


function getMedagliereGlobale_Old(giornoid, callback) {
    var url = tkdt_rooturl + "dettaglio_tabulati?id_giornata=" + giornoid;
    console.log("requesting tkdt url ", url);
    request(url, function (error, response, html) {
        if (!error && response.statusCode == 200) {
            var $ = cheerio.load(html);


            var banner = $("#banner");
            var titoloh3 = banner.find("h3");
            //console.log(titoloh3[0]);

            var titolo = titoloh3[0].children[0].data.trim();

            //console.log(titolo);
            //var datagiornata=getDataGiornata(titolo);
            // console.log(datagiornata);
            var htm = "<p>Medagliere globale non disponibile</p>"
            var divcontent = $("#medagliere_globale");

            callback(htm);
            return;

            //console.log("medagliereglobale divcontent",divcontent);



            try {
                htm = divcontent.html();
                console.log("medagliereglobale html", htm);
            } catch (e) {
                console.log("error!", e);

            }
            callback(htm);




            /*

            var tbody=divcontent.find("tbody");

            var tr=tbody.find("tr");
            console.log("tr",tr.length);

            for (var i=0; i<tr.length; i++){

                var td=$(tr[i]).find("td");
                console.log("tdlength",td.length)
                for (var j=0; j<td.length; j++){
                    console.log(td[j].children[0].data.trim());


                }




            }*/


        }
    });



}

function getMedagliereGlobale(giornoid, callback) {
    var url = tkdt_rooturl + "dettaglio_tabulati?id_giornata=" + giornoid;
    console.log("requesting tkdt url ", url);
    request(url, function (error, response, html) {
        if (!error && response.statusCode == 200) {
            var $ = cheerio.load(html, {
                normalizeWhitespace: true,
                xmlMode: false
            });
            var banner = $("#banner");
            var titoloh3 = banner.find("h3");
            //console.log(titoloh3[0]);

            var titolo = titoloh3[0].children[0].data.trim();

            var pos0 = html.indexOf('<div class="tab-pane fade" id="medagliere_globale">');
            var htm = html.substring(pos0);

            var pos1 = htm.indexOf("</table>");
            htm = htm.substring(0, pos1) + "</div>";
            htm = "<h1>" + titolo + "</h1><br>" + htm;
            callback(htm);
            return;
        } else {
            callback("<p>Error in connection</p>");
        }
    });



}




module.exports = router;