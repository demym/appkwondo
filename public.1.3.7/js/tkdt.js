//var rooturl="http://localhost:3000";
//var rooturl = "http://appkwondo.mybluemix.net";
//var rooturl = "http://tkdr.herokuapp.com";

var tkdt_atleti = [];
var tkdt_atleti_iscritti = [];
var tkdt_tabulati = [];
var tkdtnew = {
    giorni: []
};

function getDataGiornata(titolo){
    colog("getDataGiornata",titolo);
    var arr=titolo.trim().split(" ");
					var gg=arr[1];
					var smm=arr[2];
					var yy=arr[3];
					colog("gg",gg,"smm",smm,"yy",yy)
					var mesi=["gennaio","febbraio","marzo","aprile","maggio","giugno","luglio","agosto","settembre","ottobre","novembre","dicembre"];
					var mm="01";
					for (var i=0; i<mesi.length; i++){
						var cercamese=smm.toLowerCase().trim();
                        var ii=parseInt(i,10)+1;
						if (cercamese==mesi[i]) mm=Right("0000"+ii,2);
					}

					colog("mm",mm);
                    var retdata=gg+"-"+mm+"-"+yy;
                    return retdata;
}


function syncGaraWithTkdt(obj, callback) {
     var cont = $(obj).closest("div[data-role=content]");
      var tid = cont.find("#tkdt_id").val();
    var div = cont.find("#tkdt");
    var gara = null;
/*
    if (tkdt_garaid.trim() == "") {

        if (jGara) {
            if (jGara.gara) {
                gara = jGara.gara.rows[0].doc;
            }

        }

        //console.log("jGara",jGara);
        if (gara) {
            if (gara.tkdt_id) {
                console.log("found tkdt_id for this gara", gara.tkdt_id)
                tkdt_garaid = gara.tkdt_id;
            } else {
                tkdt_garaid = prompt("Inserisci id gara TKDT", "44");
                console.log("tkdt_garaid", tkdt_garaid);
                if (!tkdt_garaid) return;

            }
        } else {
            tkdt_garaid = prompt("Inserisci id gara TKDT", "44");
            console.log("tkdt_garaid", tkdt_garaid);
            if (!tkdt_garaid) return;

        }

    }


    console.log("tkdt_garaid", tkdt_garaid);

 */
    //if (!tkdt_garaid) tkdt_garaid="51";
    //var url = "https://tkdr.herokuapp.com/tkdt/get/"+tid;
    var url = rooturl+"/tkdt/get/"+tid;
     progressStart("Recupero dati ufficiali di gara " + tid + " ....")
     $.ajax({
        type: "GET",
        url: url
      
    })
    .done(function (data) {
        console.log(data);


        div.empty();
        progressStop();
        toast("Dati ufficiali di gara garicati per gara tkdt_id " + tid);

       
        div.append("Atleti iscritti: " + data.atleti_iscritti.length + "<br>");
        div.append("Atleti effettivi in gara: " + data.atleti.length + "<br>");
        div.append("Tabulati trovati: " + data.tabulati.length + "<br>");
        

        var tk=data;

        /*
        var tk = {
            atleti: data.atleti,
            tabulati: data.tabulati,
            atleti_iscritti: data.atleti_iscritti
        }*/


        div.append('<br><label><input type="checkbox" name="ck_tkdt" id="ck_tkdt">&nbsp;Salva TKDT</label><br>');
        div.append("<textarea id='tatkdt'>" + JSON.stringify(tk) + "</textarea><br>");
        
        if (callback) callback(data);

    });

}

function refreshTkdtNewOld(tkdt_garaid, callback) {



    var gara = null;

    if (tkdt_garaid.trim() == "") {

        if (jGara) {
            if (jGara.gara) {
                gara = jGara.gara.rows[0].doc;
            }

        }

        //console.log("jGara",jGara);
        if (gara) {
            if (gara.tkdt_id) {
                console.log("found tkdt_id for this gara", gara.tkdt_id)
                tkdt_garaid = gara.tkdt_id;
            } else {
                tkdt_garaid = prompt("Inserisci id gara TKDT", "44");
                console.log("tkdt_garaid", tkdt_garaid);
                if (!tkdt_garaid) return;

            }
        } else {
            tkdt_garaid = prompt("Inserisci id gara TKDT", "44");
            console.log("tkdt_garaid", tkdt_garaid);
            if (!tkdt_garaid) return;

        }

    }


    console.log("tkdt_garaid", tkdt_garaid);


    //if (!tkdt_garaid) tkdt_garaid="51";
    var tkdt_rooturl = "https://www.tkdtechnology.it/index.php/welcome/";
    var dettagli_url = tkdt_rooturl + "dettagli_gara?id=" + tkdt_garaid;
    var tabulatigiorni_url = tkdt_rooturl + "tabulati_giorni?id=" + tkdt_garaid;
    var iscritti_url = tkdt_rooturl + "elenco_iscritti?id=" + tkdt_garaid;

    tkdtnew = {
        atleti_iscritti: [],
        giorni: []

    }

    var urlx = rooturl + "/crossd";
  

    urlx = rooturl + "/crossd";
    $.ajax({
        type: "POST",
        url: urlx,
        data: {
            url: tabulatigiorni_url,
            format: ""
        }
    })


        /* $.ajax({
             url: tabulatigiorni_url,
             type: "GET"
         })*/
        .done(function (data) {

            var banner = $(data).find("#banner");
            //console.log(banner.html());

            var bscomponent = banner.find(".bs-component");

            //console.log(bscomponent.length);
            $(bscomponent).each(function (i) {

                var giorno = {
                    titolo: "",
                    tabulati: [],
                    medagliere: [],
                    atleti: [],
                    enabled: true,
                    hasContent: false
                }
                var a = $(this).find("a");
                var txt = a.attr("href");
                
                if (a.attr("disabled") == "disabled") {
                    console.log("link tabulati disabled");
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
                //	console.log(txt);


            })

            console.log("tkdtnew2",tkdtnew);


            $(tkdtnew.giorni).each(function (i) {

                var giorno = tkdtnew.giorni[i];
                if (giorno.id_giornata){
                console.log("getTkdtGiorno for giorno",giorno);
                getTkdtGiorno(giorno.id_giornata, giorno.titolo, function (data) {

                    colog(data);
                    tkdtnew.giorni[i] = data;
                });
                }




            })

            console.log("tkdtnew3",tkdtnew);


            //MERGE ATLETI TKDT
            tkdt_atleti = [];
            $(tkdtnew.giorni).each(function (i) {
                var giorno = tkdtnew.giorni[i];
                $(giorno.elenco_societa.rows).each(function (j) {
                    var soc = giorno.elenco_societa.rows[j];
                    var atleti = soc.atleti;
                    $(atleti).each(function (x) {
                        var atl = atleti[x];
                        tkdt_atleti.push(atl);

                    })

                })

            })


            //MERGE TABULATI TKDT
            tkdt_tabulati = [];
            $(tkdtnew.giorni).each(function (i) {
                var giorno = tkdtnew.giorni[i];
                $(giorno.tabulati.rows).each(function (j) {
                    var tab = giorno.tabulati.rows[j];
                    tkdt_tabulati.push(tab);


                })

            });





            


            //console.log("tkdt_tabulati", tkdt_tabulati);
            console.log("Iscritti Tkdt", tkdt_atleti.length);
            getTkdtIscritti(tkdt_garaid,function(data){

                var rettkdt=tkdtnew;

                rettkdt.tabulati=tkdt_tabulati;
                rettkdt.atleti=tkdt_atleti;
                //rettkdt.iscritti=data;

                if (callback) callback(tkdtnew);


            })
            
        });

}



function getTkdtIscritti(tkdt_garaid,callback){
        var tkdt_rooturl = "https://www.tkdtechnology.it/index.php/welcome/";
        var iscritti_url = tkdt_rooturl + "elenco_iscritti?id=" + tkdt_garaid;
      var urlx = rooturl + "/crossd";
    $.ajax({
        type: "POST",
        url: urlx,
        data: {
            url: iscritti_url,
            format: ""
        }
    })
        .done(function (data) {

            data = data.replAll("<br>", "");
            var elcat = $(data).find("#elenco-societa");
            //colog("iscritti tkdt",elcat.html());
            var spans = elcat.find("span,h4");
            //colog("spans",spans.length);

            var squadra = "";
            $(spans).each(function (i) {

                var el = $(this);
                var tag = el.get(0).tagName;


                if (tag == "H4") {
                    squadra = el.text().trim();
                    colog("h4 squadra", squadra)
                }

                if (tag == "SPAN") {

                    var aname = el.find("a").text().trim();
                    var cat = el.text().trim();
                    cat = cat.replace(aname, "").replace("|", "").trim();
                    colog("span atleta", aname, "cat", cat);


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
                    var catcintura=cintura_da.trim()+" -> "+cintura_a.trim();


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

                    tkdtnew.atleti_iscritti.push(atl);

                }


                tkdt_atleti_iscritti=tkdtnew.atleti_iscritti;

            })


            console.log("tkdtnew",tkdtnew);
            if (callback) callback(tkdtnew.atleti_iscritti);



        });



}



function getTkdtGiorno(giornataid, titolo, callback) {

    console.log("GETTKDTGIORNO",giornataid);
    if (!giornataid) {
        //console.log("refreshing giornata");
        var page = $("#page_tkdtnew_giorno");
        giornataid = page.find("input:hidden#idgiornata").val();
        titolo = page.find("input:hidden#titolo").val();


    }


    var tkdt_rooturl = "https://www.tkdtechnology.it/index.php/welcome/";
    //alert(giornataid);
    var url = tkdt_rooturl + "dettaglio_tabulati?id_giornata=" + giornataid;
    if (!titolo) {
        titolo = "Giornata";
    }
    var giornata = {
        id: giornataid,
        titolo: titolo,
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

    var urlx = rooturl + "/crossd";
    $.ajax({
        type: "POST",
        url: urlx,
        data: {
            url: url,
            format: ""
        },
        async: false
    })

        /*  $.ajax({
              url: url,
              type: "GET",
              async: false
          })*/
        .done(function (data) {

            var page = $("#page_tkdtnew_giorno");
		    var giornodata = page.find("input:hidden#data").val();
   
            var divs = ["tabulati", "medagliere", "elenco_societa"];
            var html = "";
            for (var i = 0; i < divs.length; i++) {
                var divname = divs[i];
                var divcontent = $(data).find("#" + divs[i]);
                divcontent.find("table").attr("table-layout", "fixed");
                divcontent.find("table").attr("width", "100%").attr("border", "1");
                divcontent.find("table").find("th").css("font-size", "10px");
                divcontent.find("table").find("td").css("font-size", "10px");

                var st = "";


                if (divname == "medagliere") {
                    //giornata.medagliere.html=divcontent.html();
                    var w = "40px";
                    var th = divcontent.find("table").find("thead").find("tr").find("th:eq(1)");
                    th.attr("width", w);
                    var tr = divcontent.find("table").find("tbody").find("tr");
                    colog("tr", tr.length);

                    tr.each(function () {

                        var row = {
                            posizione: $(this).find("td:eq(0)"),
                            societa: $(this).find("td:eq(1)"),
                            ori: $(this).find("td:eq(2)"),
                            argenti: $(this).find("td:eq(3)"),
                            bronzi: $(this).find("td:eq(4)")

                        }

                        var td = $(this).find("td:eq(1)");
                        var txt = td.text();

                        var txt2 = txt.substring(0, 30) + "...";
                        td.text(txt2);
                        td.attr("width", w).css("word-wrap", "break-word").css("max-width", "20%");
                    });

                }

                if (divname == "tabulati") {

                    var tr = divcontent.find("table").find("tbody").find("tr");
                    var th = divcontent.find("table").find("thead").find("tr").find("th:eq(3)");
                    th.remove();
                    //console.log("tr", tr.length);
                    tr.each(function () {
                        var td = $(this).find("td:eq(5)");
                        var td0 = $(this).find("td:eq(0)");

                        td0.attr("onclick", "greenifyMe(this,false)");

                        td.html(td.html().replace("Vedi", ""));
                        //td.find("span").remove();
                        td.find("a").addClass("ui-btn");
                        td.find("a").attr("onclick", "greenifyMe(this,true)");



                        var sesso = $(this).find("td:eq(0)").text();
                        var categoria_eta = $(this).find("td:eq(1)").text();
                        var cintura_da = $(this).find("td:eq(2)").text();
                        var cintura_a = $(this).find("td:eq(3)").text();
                        var categoria_peso = $(this).find("td:eq(4)").text();

                        $(this).find("td:eq(2)").html(cintura_da + "<br>" + cintura_a);

                        //console.log(td.html());
                        var a = td.find("a");
                        a.removeAttr("target");
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
                        $(this).find("td:eq(3)").remove();
                        giornata.tabulati.rows.push(newtabulato);

                    });



                }


                if (divname == "elenco_societa") {

                    //rdivs.each(function () {
                    var rdivs = divcontent.find("div[style='border:solid; border-radius:40px; text-align: center']");
                    //var rdivs = divcontent.find("div");
                    rdivs.each(function () {
                        var rdiv = $(this);
                        rdiv.attr("style", "width: 100%; font-size: 12px;");
                        var societa = rdiv.find("h3").text();
                        //console.log("societa", societa);




                        //check if societa already there

                        var found = false;
                        $(giornata[divname].rows).each(function (j) {
                            var socrow = giornata[divname].rows[j];

                            var socname = socrow.societaname;

                            if (socname.trim().toLowerCase() == societa.trim().toLowerCase()) found = true;

                        })



                        if (!found) {   //add societa
                            var newsoc = {
                                societaname: societa,
                                atleti: []
                            }


                            var atletidiv = rdiv.find("div");
                            //console.log("atletidic length:", atletidiv.length);
                            atletidiv.each(function (x) {
                                var adiv = $(this);
                                var rigaatleta = adiv.find("a").text().trim();
                                var propatleta = adiv.text();
                                propatleta = propatleta.replace("kg", "").trim();
                                //console.log(rigaatleta);
                                var arr = propatleta.split(" - ");
                                $(arr).each(function (xx) {
                                    //console.log(xx, arr[xx]);

                                })

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

                            giornata[divname].rows.push(newsoc);




                        }




                    });
                    st = " style='display: none;' ";

                }


                //var htm = "<div style='padding: 4px;text-align: left; font-weight: bold; border: 1px solid black; background: cyan; width: 100%; height: 30px;' onclick='toggleMe(this," + i + ")'>" + divs[i].toUpperCase() + "</div><div class='xxx' " + st + ">" + divcontent.html() + "</div><br>";
                //html += htm;
                var htm2 = "<div class='xxx'>" + divcontent.html() + "</div>";
                giornata[divname].html = htm2;


            }





            //var html= new EJS({url: 'tpl/tkdtgiornata.ejs'}).render(tabulati_div.html());

            html = "<div>" + html + "</div>";


            giornata.elenco_societa.rows.sort(function (a, b) {
                var a1 = a.societaname;
                var b1 = b.societaname;
                if (a1 > b1) return 1;
                if (a1 < b1) return -1;
                return 0;

            })

            if (callback) callback(giornata);

        });
    return;


}


function normalizeAccento(txt){
     txt = txt.replaceAll("à", "a'");
    txt = txt.replaceAll("è", "e'");
    txt = txt.replaceAll("ì", "i'");
    txt = txt.replaceAll("ò", "o'");
    txt = txt.replaceAll("ù", "u'");
    return txt
}


function getTkdtAtleta(atleta) {
    colog("getTkdtAtleta searching this atleta", atleta)
    var retvalue = {
        nome: "atleta non trovato",
        catcintura: "--",
        catpeso: "--",
        cateta: "--",
        societa: "--",
        sesso: "--",
        giorno: "--"
    };


    var anome = atleta.nome.toLowerCase();
    var acnome = atleta.cognome.toLowerCase();

    anome = anome.replace("à", "a'");
    anome = anome.replace("è", "e'");
    anome = anome.replace("ì", "i'");
    anome = anome.replace("ò", "o'");
    anome = anome.replace("ù", "u'");

    acnome = acnome.replace("à", "a'");
    acnome = acnome.replace("è", "e'");
    acnome = acnome.replace("ì", "i'");
    acnome = acnome.replace("ò", "o'");
    acnome = acnome.replace("ù", "u'");

     var source=tkdt_atleti;

    if (tkdt_atleti.length==0) source=tkdt_atleti_iscritti;

    $(source).each(function (i) {


        var nome = anome + " " + acnome;
        var nomex = acnome + " " + anome;

        var atl = source[i];
        var atlnome = atl.nome.toLowerCase().trim();
        atlnome=normalizeAccento(atlnome);


        //console.log(atlnome);
        //console.log(atlnome, nome);
        if (atlnome.indexOf("colangel")>-1) console.log(atlnome,nome);
        if ((atlnome == nome.trim()) || (atlnome == nomex.trim())) {
            colog("TROVATO !!");
            retvalue = atl;
        }




    })

    return retvalue;



}


function getTkdtAtletiCategoria(cateta, catcintura, catpeso, sesso) {


    colog("getTkdtAtletiCategoria searching atleti in categoria", cateta + " " + catcintura + " " + catpeso + " " + sesso)
    var retvalue = "notfound";
    var avversari = [];

    var source=tkdt_atleti;

    if (tkdt_atleti.length==0) source=tkdt_atleti_iscritti;

    $(source).each(function (i) {

        var atl = source[i];

        var cpeso = atl.catpeso.toLowerCase();
        var ccint = atl.catcintura.toLowerCase();
        var ceta = atl.cateta.toLowerCase();
        var csesso = atl.sesso.toLowerCase();


        var doIt = true;
        if (cpeso != catpeso.toLowerCase()) doIt = doIt && false;
        if (ccint != catcintura.toLowerCase()) doIt = doIt && false;
        if (ceta != cateta.toLowerCase()) doIt = doIt && false;
        if (csesso != sesso.toLowerCase()) doIt = doIt && false;

        if (doIt) {
            avversari.push(atl);
        }
        //console.log(atlnome);
        //console.log(atlnome,nome);





    })

    return avversari;

}

function getTkdtTabulatiCategoria(cateta, catcintura, catpeso, sesso) {


    colog("getTkdtTabulatiCategoria searching tabulato in categoria", cateta + " " + catcintura + " " + catpeso + " " + sesso);
    var tabname = sesso + " - " + cateta + " - " + catcintura + " - " + catpeso + " kg";
    var retvalue = {
        categoria_peso: "--",
        categoria_eta: "--",
        cintura_da: "--",
        cintura_a: "--",
        sesso: "--"
    };

    $(tkdt_tabulati).each(function (i) {

        var tab = tkdt_tabulati[i];

        var cpeso = tab.categoria_peso.replace("kg", "").trim().toLowerCase();
        var ccint = tab.cintura_da.toLowerCase() + " -> " + tab.cintura_a.toLowerCase();
        var ceta = tab.categoria_eta.toLowerCase();
        var csesso = tab.sesso.toLowerCase();

        //console.log(cpeso+" - "+ccint+" - "+ceta+" - "+csesso);
        var doIt = true;
        if (cpeso != catpeso.toLowerCase()) doIt = doIt && false;
        if (ccint != catcintura.toLowerCase()) doIt = doIt && false;
        if (ceta != cateta.toLowerCase()) doIt = doIt && false;
        if (csesso != sesso.toLowerCase()) doIt = doIt && false;

        if (doIt) {
            colog("TROVATO TABULATO !!")
            tab.tabname = tabname;
            retvalue = tab;
        }
        //console.log(atlnome);
        //console.log(atlnome,nome);





    })

    return retvalue;

}

function retrieveTkdt(obj) {
    var cont = $(obj).closest("div[data-role=content]");
    var tid = cont.find("#tkdt_id").val();
    var div = cont.find("#tkdt");
    //toast(tid);
    progressStart("Recupero dati ufficiali di gara " + tid + " ....")
      refreshTkdtNew(tid, function (data) {
        div.empty();
        progressStop();
        toast("Dati ufficiali di gara garicati per gara tkdt_id " + tid);

        console.log(data);

        div.append("Atleti iscritti: " + tkdt_atleti_iscritti.length + "<br>");
        div.append("Atleti effettivi in gara: " + tkdt_atleti.length + "<br>");
        div.append("Tabulati trovati: " + tkdt_tabulati.length + "<br>");
        
        var tk = {
            atleti: tkdt_atleti,
            tabulati: tkdt_tabulati,
            atleti_iscritti: tkdt_atleti_iscritti
        }
        div.append('<br><label><input type="checkbox" name="ck_tkdt" id="ck_tkdt">&nbsp;Salva TKDT</label><br>');
        div.append("<textarea id='tatkdt'>" + JSON.stringify(tk) + "</textarea><br>");

    })

}


function retrieveTkdt_old(obj) {
    var cont = $(obj).closest("div[data-role=content]");
    var tid = cont.find("#tkdt_id").val();
    var div = cont.find("#tkdt");
    //toast(tid);
    progressStart("Recupero dati ufficiali di gara " + tid + " ....")
    refreshTkdtNew(tid, function () {
        div.empty();
        progressStop();
        toast("Dati ufficiali di gara garicati per gara tkdt_id " + tid);
        div.append("Atleti iscritti: " + tkdt_atleti_iscritti.length + "<br>");
        div.append("Atleti effettivi in gara: " + tkdt_atleti.length + "<br>");
        div.append("Tabulati trovati: " + tkdt_tabulati.length + "<br>");
        
        var tk = {
            atleti: tkdt_atleti,
            tabulati: tkdt_tabulati,
            atleti_iscritti: tkdt_atleti_iscritti
        }
        div.append('<br><label><input type="checkbox" name="ck_tkdt" id="ck_tkdt">&nbsp;Salva TKDT</label><br>');
        div.append("<textarea id='tatkdt'>" + JSON.stringify(tk) + "</textarea><br>");

    })

}

function matchTkdtIscritti(obj){

    var cont = $(obj).closest("div[data-role=content]");
    var ta=cont.find("textarea");
    if (ta.length>0){
        var val=ta.val();
        var json=JSON.parse(val);
        console.log(json);
    }

    var foundcount=0;
    var notfoundcount=0;
    var totali=0;
    var iscrittistring="";
    var notfound=[];

    $(json.atleti_iscritti).each(function(i){

        

        var row=json.atleti_iscritti[i];
        var nome=row.nome.toLowerCase().trim();
        var soc=row.societa;


        if (soc=="A.S.D. TAEKWONDO ROZZANO"){

                totali++;
                var atls=getAtletaByCognoNome(nome); 
                //console.log("ricerca "+nome+": "+atls.length);
                if (atls.length>0) {
                    if (iscrittistring.trim()!="") iscrittistring+=",";
                    iscrittistring+=atls[0].id;
                    foundcount++;
                } else {
                    console.log("atleta non trovato: ",nome);
                    notfoundcount++;
                    notfound.push(nome);
                }
        }

    })

    console.log("trovati "+foundcount+" su "+totali+" ("+notfoundcount+" non trovati)");
    console.log("new iscritti string",iscrittistring);

     var r = confirm("trovati "+foundcount+" su "+totali+" ("+notfoundcount+" non trovati)\n\nVuoi sostituire il campo iscritti ?");
    if (r == true) {
        var iscr=$("#page_editgara #iscritti");
        iscr.val(iscrittistring);





    } else {
        
    }

    var divnf=$("#page_editgara #tkdtmatchnotfound");

        if (notfound.length>0){
            divnf.empty();
            divnf.append("<h3>Atleti TKDT non trovati</h3><br><br>");
            for (var i=0; i<notfound.length; i++){
                divnf.append("<span>"+notfound[i]+"</span><br>");

            }

        }

}



function getAtletaByCognoNome(cercanome) {
    //return "mango";
    //debug("getAtletaNameById("+id+")");
    var retvalue = [];
    cercanome=cercanome.toLowerCase().trim();

    cercanome = cercanome.replace("à", "a");
    cercanome = cercanome.replace("è", "e");
    cercanome = cercanome.replace("ì", "i");
    cercanome = cercanome.replace("ò", "o");
    cercanome = cercanome.replace("ù", "u");

     cercanome = cercanome.replace("a'", "a");
    cercanome = cercanome.replace("e'", "e");
    cercanome = cercanome.replace("i'", "i");
    cercanome = cercanome.replace("o'", "o");
    cercanome = cercanome.replace("u'", "u");


    $($atleti.rows).each(function (i) {
        var atl = $atleti.rows[i].doc;
        var aid = atl.id;
        var acnome = atl.cognome.toLowerCase().trim();
        var anome = atl.nome.toLowerCase().trim();

        anome = anome.replace("à", "a");
    anome = anome.replace("è", "e");
    anome = anome.replace("ì", "i");
    anome = anome.replace("ò", "o");
    anome = anome.replace("ù", "u");

    anome = anome.replace("a'", "a");
    anome = anome.replace("e'", "e");
    anome = anome.replace("i'", "i");
    anome = anome.replace("o'", "o");
    anome = anome.replace("u'", "u");

    acnome = acnome.replace("à", "a");
    acnome = acnome.replace("è", "e");
    acnome = acnome.replace("ì", "i");
    acnome = acnome.replace("ò", "o");
    acnome = acnome.replace("ù", "u");

    acnome = acnome.replace("a'", "a");
    acnome = acnome.replace("e'", "e");
    acnome = acnome.replace("i'", "i");
    acnome = acnome.replace("o'", "o");
    acnome = acnome.replace("u'", "u");


        var cognonome=acnome+" "+anome;
        var nomecogno=anome+" "+acnome;

        //if ((cercanome.indexOf("nicol")>-1) && (cognonome.indexOf("nicol")>-1)) console.log("cognonome",cognonome,"cercanome",cercanome);
        var doIt=false;

        if (cognonome==cercanome) doIt=true;
        if (nomecogno==cercanome) doIt=true;

        //debug(aid+" "+cognome+" "+nome);
        if (doIt) {
            //console.log("trovato "+cercanome)
            retvalue.push(atl);
            return retvalue;
        }

    });


    return retvalue;
}


function loadInlineTabulato(hr) {

    colog("loadInlineTabulato " + hr);
    var urlx = rooturl + "/crossd";
    $.ajax({
        type: "POST",
        url: urlx,
        data: {
            url: hr,
            format: ""
        },
        dataType: "html"
    })


        /*$.ajax({
            url: url,
            type: "GET"
        })*/


        /*$.ajax({
            url: url,
            type: "GET",
            dataType: "html"
        })*/
        .done(function (data) {

            var img = $(data).find("#banner").find("img");
            colog(img.attr("src"));
            var $a = "<a href='" + img.attr("src") + "' target='_blank' >Apri nel browser</a><br><br>";
            $("#matchesatleta #inlinetabulato").empty().append(img).css("border", "1px solid silver");



            //$.mobile.changePage("#page_tabulato");



        });




}


function getTkdTechnologyGiornata(giornataid, titolo, callback) {

    if (!giornataid){
        giornataid=$("#page_tkdtnew_giorno #idgiornata").val();
        titolo=$("#page_tkdtnew_giorno #titolo").val();
    }
    console.log("giornataid",giornataid,"titolo",titolo);

    var tkdt=jGara.gara.rows[0].doc.tkdt;

    var giornata={};
    for (var i=0; i<tkdt.giorni.length; i++){
        var g=tkdt.giorni[i];
        if (g.id==giornataid) giornata=tkdt.giorni[i];

    }
    var url=rooturl+"/tkdt/medagliere/"+giornataid;
    $.mobile.changePage("#page_tkdtnew_giorno");
	var caricamentotext = imgtext + "Caricamento in corso...."

	$("#page_tkdtnew_giorno #cat").html(caricamentotext);

	$.ajax({
		type: "GET",
		url: url
	})
	.done(function (data) {
            console.log("giornata",giornata);
            giornata.medagliere.html=data;
            var thtml = new EJS({ url: 'tpl/tkdtnew_giorno.ejs' }).render(giornata);

			var page = $("#page_tkdtnew_giorno");
			page.find("#cont").html(thtml);
            page.find("#medagliere table").attr("width","100%").attr("border","1");
            page.find("#tabulati table").attr("width","100%").attr("border","1");

			//$("#page_tkdtnew_giorno").find("#cont").html(html);
			//$.mobile.changePage("#page_tkdtnew_giorno");
			page.find("h5").html("Giornata di gara");
			page.trigger("create");
			page.find("div.ui-collapsible-content").css("padding", "0px");
			var today = new Date();
			var formattedToday = today.toLocaleDateString() + " " + today.toLocaleTimeString();
			$("#page_tkdtnew_giorno #cat").html("Ultimo agg.: " + formattedToday);
			progressStop();


    });

}



String.prototype.replAll = function (search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};