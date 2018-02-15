"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
require("rxjs/add/operator/do");
var Backend = (function () {
    function Backend(http) {
        this.http = http;
        this.rooturl = "http://tkdr.herokuapp.com";
        this.token = "token";
        this.atleti = [];
        this.chat = [];
        this.activegara = {};
        this.user = {
            token: "",
            email: "",
            nickname: ""
        };
        this.getMaschiFemmine = function ($mr, su_cosa) {
            var $m = $mr;
            if ($mr.rows)
                $m = $mr.rows;
            var maschi = 0;
            var femmine = 0;
            for (var i = 0; i < $m.length; i++) {
                var $a;
                if (su_cosa == "iscritti") {
                    $a = this.getAtletaById($m[i]);
                }
                else
                    $a = this.getAtletaById($m[i].doc.atletaid);
                var sesso = "M";
                if ($a.sesso)
                    sesso = $a.sesso.toUpperCase();
                if (sesso == "M")
                    maschi++;
                if (sesso == "F")
                    femmine++;
            }
            var retvalue = {
                maschi: maschi,
                femmine: femmine
            };
            return retvalue;
        };
        this.filterRows = function ($m, filt, exact) {
            if (!exact)
                exact = false;
            var $retrows = {
                rows: []
            };
            var rows = $m;
            if ($m.rows)
                rows = $m.rows;
            for (var i = 0; i < rows.length; i++) {
                var row = rows[i];
                var eligible = true;
                for (var key in row.doc) {
                    for (var fkey in filt) {
                        if (fkey == key) {
                            var v1 = filt[fkey].toLowerCase();
                            if (v1.trim() != "") {
                                var v2 = row.doc[key].toLowerCase();
                                if (exact) {
                                    if (v2.trim() == v1.trim()) {
                                    }
                                    else {
                                        eligible = eligible && false;
                                    }
                                }
                                else {
                                    if (v2.indexOf(v1) > -1) {
                                    }
                                    else {
                                        eligible = eligible && false;
                                    }
                                }
                            }
                        }
                    }
                }
                if (eligible)
                    $retrows.rows.push(row);
            }
            return $retrows;
        };
        this.replaceAll = function (string, search, replacement) {
            var target = string;
            return target.split(search).join(replacement);
        };
    }
    Backend.prototype.blueLogin = function (user, callback) {
        var questo = this;
        console.log("bluelogin", user);
        var email = user.email;
        var psw = user.password;
        var url = this.rooturl + "/users/login";
        var questo = this;
        var auth2 = "Basic " + questo.b64encode(email + ":" + psw);
        console.log("authorization", auth2);
        var data = {
            authorization: auth2
        };
        if (user.gcmtoken) {
            console.log("this user has gcmtoken", user.gcmtoken);
            data["gcmtoken"] = user.gcmtoken;
        }
        console.log("trying to login at", url);
        this.postData(url, data, function (data) {
            console.log("data", data);
            if (String(data.loggedin) == "true") {
                console.log("login successfull");
                questo.user = data;
                if (!data.email)
                    questo.user.email = email;
                if (!data.nickname)
                    questo.user.nickname = email;
                console.log("USER", questo.user);
                console.log("user token", questo.user.token);
                if (questo.user.role == "IBM_ADMIN")
                    questo.isIbmAdmin = true;
                if (callback)
                    callback(data);
            }
            else {
                console.log("login was not successfull");
                if (callback)
                    callback(data);
            }
        });
    };
    Backend.prototype.fetchData = function (url, callback) {
        if (url.indexOf("token") == -1) {
            if (url.indexOf("?") > -1) {
                url += "&token=" + this.user.token;
            }
            else
                url += "?token=" + this.user.token;
        }
        this.http.get(url).map(function (res) { return res.json(); }).subscribe(function (data) {
            console.log("got data", data);
            if (callback)
                callback(data);
        });
    };
    Backend.prototype.fetchText = function (url, callback) {
        if (url.indexOf("token") == -1) {
            if (url.indexOf("?") > -1) {
                url += "&token=" + this.user.token;
            }
            else
                url += "?token=" + this.user.token;
        }
        this.http.get(url).map(function (res) { return res.text(); }).subscribe(function (data) {
            console.log("got data", data);
            if (callback)
                callback(data);
        });
    };
    Backend.prototype.postData = function (url, data, callback) {
        if (url.indexOf("token") == -1) {
            if (url.indexOf("?") > -1) {
                url += "&token=" + this.user.token;
            }
            else
                url += "?token=" + this.user.token;
        }
        this.http.post(url, data)
            .subscribe(function (data) {
            var result = data.json();
            callback(result);
        }, function (error) {
            console.log(error.json());
            callback(error.json());
        });
    };
    Backend.prototype.getCategoria = function (dn, referralDate) {
        var cat = "senior a";
        var curyear = new Date().getFullYear();
        if (referralDate) {
            var arrd = referralDate.split("/");
            var annogara = arrd[2];
            curyear = annogara;
        }
        if (dn.trim() == "") {
            return "senior b";
        }
        var ar = dn.split(".");
        var byear = ar[2];
        var eta = parseInt(curyear, 10) - parseInt(byear, 10);
        if ((eta >= 18) && (eta <= 35))
            cat = "senior a";
        if ((eta >= 15) && (eta <= 17))
            cat = "junior";
        if ((eta >= 12) && (eta <= 14))
            cat = "cadetti a";
        if ((eta >= 10) && (eta <= 11))
            cat = "cadetti b";
        if (eta > 35)
            cat = "senior b";
        if (eta < 10)
            cat = "esordienti";
        return cat;
    };
    Backend.prototype.getAtletaById = function (id) {
        var questo = this;
        var atl = {};
        this.atleti.forEach(function (item, idx) {
            if (item.doc.id == id) {
                atl = item.doc;
                atl.categoria = questo.getCategoria(atl.datanascita, null);
            }
        });
        return atl;
    };
    Backend.prototype.filterArray = function ($m, filt, exact) {
        if (!exact)
            exact = false;
        var $retrows = [];
        var rows = $m;
        rows.forEach(function (item, i) {
            var row = rows[i];
            var eligible = true;
            for (var key in row) {
                for (var fkey in filt) {
                    if (fkey == key) {
                        var v1 = filt[fkey].toLowerCase();
                        if (v1.trim() != "") {
                            var v2 = row[key].toLowerCase();
                            if (exact) {
                                if (v2.trim() == v1.trim()) {
                                }
                                else {
                                    eligible = eligible && false;
                                }
                            }
                            else {
                                if (v2.indexOf(v1) > -1) {
                                }
                                else {
                                    eligible = eligible && false;
                                }
                            }
                        }
                    }
                }
            }
            if (eligible)
                $retrows.push(row);
        });
        return $retrows;
    };
    Backend.prototype.getTkdtAtleta = function (atleta) {
        var questo = this;
        console.log("getTkdtAtleta searching this atleta", atleta);
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
        console.log("activegara", this.activegara);
        var source = [];
        if (!questo.activegara.gara.rows[0].doc.hasOwnProperty("tkdt"))
            return retvalue;
        if (questo.activegara.gara.rows[0].doc.tkdt.atleti)
            source = this.activegara.gara.rows[0].doc.tkdt.atleti;
        console.log("source", source.length);
        if (source.length == 0)
            source = this.activegara.gara.rows[0].doc.tkdt.atleti_iscritti;
        source.forEach(function (item, i) {
            var nome = anome + " " + acnome;
            var nomex = acnome + " " + anome;
            var atl = source[i];
            var atlnome = atl.nome.toLowerCase().trim();
            atlnome = questo.normalizeAccento(atlnome);
            if (atlnome.indexOf("colangel") > -1)
                console.log(atlnome, nome);
            if ((atlnome == nome.trim()) || (atlnome == nomex.trim())) {
                console.log("TROVATO !!");
                retvalue = atl;
            }
        });
        return retvalue;
    };
    Backend.prototype.normalizeAccento = function (txt) {
        txt = this.replaceAll(txt, "à", "a'");
        txt = this.replaceAll(txt, "è", "e'");
        txt = this.replaceAll(txt, "ì", "i'");
        txt = this.replaceAll(txt, "ò", "o'");
        txt = this.replaceAll(txt, "ù", "u'");
        return txt;
    };
    Backend.prototype.getTkdtAtletiCategoria = function (cateta, catcintura, catpeso, sesso) {
        var questo = this;
        console.log("getTkdtAtletiCategoria searching atleti in categoria", cateta + " " + catcintura + " " + catpeso + " " + sesso);
        var retvalue = "notfound";
        var avversari = [];
        var source = [];
        if (!this.activegara.gara.rows[0].doc.hasOwnProperty("tkdt"))
            return avversari;
        if (this.activegara.gara.rows[0].doc.tkdt.atleti)
            source = this.activegara.gara.rows[0].doc.tkdt.atleti;
        if (source.length == 0)
            source = questo.activegara.gara.rows[0].doc.tkdt.atleti_iscritti;
        source.forEach(function (item, i) {
            var atl = source[i];
            var cpeso = "";
            if (atl.catpeso)
                cpeso = atl.catpeso.toLowerCase();
            var ccint = atl.catcintura.toLowerCase();
            var ceta = atl.cateta.toLowerCase();
            var csesso = atl.sesso.toLowerCase();
            var doIt = true;
            if (cpeso != catpeso.toLowerCase())
                doIt = doIt && false;
            if (ccint != catcintura.toLowerCase())
                doIt = doIt && false;
            if (ceta != cateta.toLowerCase())
                doIt = doIt && false;
            if (csesso != sesso.toLowerCase())
                doIt = doIt && false;
            if (doIt) {
                avversari.push(atl);
            }
        });
        return avversari;
    };
    Backend.prototype.getTkdtTabulatiCategoria = function (cateta, catcintura, catpeso, sesso) {
        var retvalue = {
            categoria_peso: "--",
            categoria_eta: "--",
            cintura_da: "--",
            cintura_a: "--",
            sesso: "--"
        };
        if (!this.activegara.gara.rows[0].doc.hasOwnProperty("tkdt"))
            return retvalue;
        var tkdt_tabulati = [];
        if (this.activegara.gara.rows[0].doc.tkdt.hasOwnProperty("tabulati"))
            tkdt_tabulati = this.activegara.gara.rows[0].doc.tkdt.tabulati;
        console.log("getTkdtTabulatiCategoria searching tabulato in categoria", cateta + " " + catcintura + " " + catpeso + " " + sesso);
        var tabname = sesso + " - " + cateta + " - " + catcintura + " - " + catpeso + " kg";
        tkdt_tabulati.forEach(function (item, i) {
            var tab = tkdt_tabulati[i];
            var cpeso = tab.categoria_peso.replace("kg", "").trim().toLowerCase();
            var ccint = tab.cintura_da.toLowerCase() + " -> " + tab.cintura_a.toLowerCase();
            var ceta = tab.categoria_eta.toLowerCase();
            var csesso = tab.sesso.toLowerCase();
            var doIt = true;
            if (cpeso != catpeso.toLowerCase())
                doIt = doIt && false;
            if (ccint != catcintura.toLowerCase())
                doIt = doIt && false;
            if (ceta != cateta.toLowerCase())
                doIt = doIt && false;
            if (csesso != sesso.toLowerCase())
                doIt = doIt && false;
            if (doIt) {
                console.log("TROVATO TABULATO !!");
                tab.tabname = tabname;
                retvalue = tab;
            }
        });
        return retvalue;
    };
    Backend.prototype.getTabulatoImg = function (h, callback) {
        var questo = this;
        var arr = h.split("id=");
        var tabid = arr[1];
        var url = this.rooturl + "/tkdt/tabulatoimage/" + tabid;
        questo.fetchText(url, function (data) {
            if (callback)
                callback(data);
        });
    };
    Backend.prototype.b64encode = function (input) {
        var questo = this;
        var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;
        input = questo._utf8_encode(input);
        while (i < input.length) {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);
            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;
            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            }
            else if (isNaN(chr3)) {
                enc4 = 64;
            }
            output = output +
                _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
                _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
        }
        return output;
    };
    Backend.prototype._utf8_encode = function (string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";
        for (var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n);
            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }
        }
        return utftext;
    };
    Backend = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], Backend);
    return Backend;
}());
exports.Backend = Backend;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFja2VuZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImJhY2tlbmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxzQ0FBMkM7QUFDM0Msc0NBQXdEO0FBR3hELGlDQUErQjtBQUMvQixnQ0FBOEI7QUFHOUI7SUFjRSxpQkFBbUIsSUFBVTtRQUFWLFNBQUksR0FBSixJQUFJLENBQU07UUFaN0IsWUFBTyxHQUFHLDJCQUEyQixDQUFDO1FBQ3RDLFVBQUssR0FBRyxPQUFPLENBQUM7UUFDaEIsV0FBTSxHQUFHLEVBQUUsQ0FBQztRQUNaLFNBQUksR0FBRyxFQUFFLENBQUM7UUFDVixlQUFVLEdBQVEsRUFBRSxDQUFDO1FBQ3JCLFNBQUksR0FBSztZQUNQLEtBQUssRUFBRSxFQUFFO1lBQ1QsS0FBSyxFQUFFLEVBQUU7WUFDVCxRQUFRLEVBQUUsRUFBRTtTQUNiLENBQUE7UUF5TEQscUJBQWdCLEdBQUcsVUFBVSxHQUFHLEVBQUUsT0FBYTtZQUc3QyxJQUFJLEVBQUUsR0FBRyxHQUFHLENBQUM7WUFDYixFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDO2dCQUFDLEVBQUUsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDO1lBRTVCLElBQUksTUFBTSxHQUFHLENBQUMsQ0FBQztZQUNmLElBQUksT0FBTyxHQUFHLENBQUMsQ0FBQztZQUNoQixHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztnQkFHbkMsSUFBSSxFQUFFLENBQUM7Z0JBQ1AsRUFBRSxDQUFDLENBQUMsT0FBTyxJQUFJLFVBQVUsQ0FBQyxDQUFDLENBQUM7b0JBQzFCLEVBQUUsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNqQyxDQUFDO2dCQUFDLElBQUk7b0JBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFFbkQsSUFBSSxLQUFLLEdBQUcsR0FBRyxDQUFDO2dCQUNoQixFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDO29CQUFDLEtBQUssR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRSxDQUFDO2dCQUU3QyxFQUFFLENBQUMsQ0FBQyxLQUFLLElBQUksR0FBRyxDQUFDO29CQUFDLE1BQU0sRUFBRSxDQUFDO2dCQUMzQixFQUFFLENBQUMsQ0FBQyxLQUFLLElBQUksR0FBRyxDQUFDO29CQUFDLE9BQU8sRUFBRSxDQUFDO1lBRzlCLENBQUM7WUFFRCxJQUFJLFFBQVEsR0FBRztnQkFDYixNQUFNLEVBQUUsTUFBTTtnQkFDZCxPQUFPLEVBQUUsT0FBTzthQUNqQixDQUFBO1lBRUQsTUFBTSxDQUFDLFFBQVEsQ0FBQztRQU1sQixDQUFDLENBQUE7UUFHRCxlQUFVLEdBQUcsVUFBVSxFQUFFLEVBQUUsSUFBSSxFQUFFLEtBQVc7WUFDMUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7Z0JBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztZQUcxQixJQUFJLFFBQVEsR0FBRztnQkFDYixJQUFJLEVBQUUsRUFBRTthQUNULENBQUM7WUFFRixJQUFJLElBQUksR0FBRyxFQUFFLENBQUM7WUFDZCxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDO2dCQUFDLElBQUksR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDO1lBRzVCLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO2dCQUVyQyxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2xCLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQztnQkFFcEIsR0FBRyxDQUFDLENBQUMsSUFBSSxHQUFHLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7b0JBRXhCLEdBQUcsQ0FBQyxDQUFDLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7d0JBQ3RCLEVBQUUsQ0FBQyxDQUFDLElBQUksSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDOzRCQUVoQixJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7NEJBRWxDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO2dDQUNwQixJQUFJLEVBQUUsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO2dDQUVwQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO29DQUNWLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO29DQUc3QixDQUFDO29DQUFDLElBQUksQ0FBQyxDQUFDO3dDQUNOLFFBQVEsR0FBRyxRQUFRLElBQUksS0FBSyxDQUFDO29DQUMvQixDQUFDO2dDQUNILENBQUM7Z0NBQUMsSUFBSSxDQUFDLENBQUM7b0NBQ04sRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7b0NBRzFCLENBQUM7b0NBQUMsSUFBSSxDQUFDLENBQUM7d0NBQ04sUUFBUSxHQUFHLFFBQVEsSUFBSSxLQUFLLENBQUM7b0NBQy9CLENBQUM7Z0NBR0gsQ0FBQzs0QkFFSCxDQUFDO3dCQUVILENBQUM7b0JBQ0gsQ0FBQztnQkFDSCxDQUFDO2dCQUVELEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQztvQkFBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUN4QyxDQUFDO1lBRUQsTUFBTSxDQUFDLFFBQVEsQ0FBQztRQUNsQixDQUFDLENBQUE7UUFzSUgsZUFBVSxHQUFHLFVBQVUsTUFBTSxFQUFFLE1BQU0sRUFBRSxXQUFXO1lBQ2hELElBQUksTUFBTSxHQUFHLE1BQU0sQ0FBQztZQUNwQixNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDaEQsQ0FBQyxDQUFDO0lBM1pBLENBQUM7SUFHSCwyQkFBUyxHQUFULFVBQVUsSUFBSSxFQUFFLFFBQVE7UUFDdEIsSUFBSSxNQUFNLEdBQUMsSUFBSSxDQUFDO1FBQ2hCLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQy9CLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDdkIsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUN4QixJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxHQUFHLGNBQWMsQ0FBQztRQUN4QyxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFFbEIsSUFBSSxLQUFLLEdBQUcsUUFBUSxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsS0FBSyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUMzRCxPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNwQyxJQUFJLElBQUksR0FBRztZQUNULGFBQWEsRUFBRSxLQUFLO1NBRXJCLENBQUE7UUFDRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUVsQixPQUFPLENBQUMsR0FBRyxDQUFDLHdCQUF3QixFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNyRCxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUduQyxDQUFDO1FBRUQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUN2QyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsVUFBVSxJQUFJO1lBQ3JDLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQzFCLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDcEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO2dCQUNqQyxNQUFNLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztnQkFDbkIsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO29CQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztnQkFDM0MsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO29CQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztnQkFFakQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUdqQyxPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUU3QyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxXQUFXLENBQUM7b0JBQUMsTUFBTSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7Z0JBSzlELEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQztvQkFBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7WUFNL0IsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNOLE9BQU8sQ0FBQyxHQUFHLENBQUMsMkJBQTJCLENBQUMsQ0FBQztnQkFDekMsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDO29CQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUMvQixDQUFDO1FBRUgsQ0FBQyxDQUFDLENBQUM7SUFXTCxDQUFDO0lBR0MsMkJBQVMsR0FBVCxVQUFVLEdBQUcsRUFBRSxRQUFRO1FBRXJCLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQy9CLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMxQixHQUFHLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBRXJDLENBQUM7WUFBQyxJQUFJO2dCQUFDLEdBQUcsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7UUFFNUMsQ0FBQztRQUdELElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFDLEdBQUcsSUFBSyxPQUFBLEdBQUcsQ0FBQyxJQUFJLEVBQUUsRUFBVixDQUFVLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBQyxJQUFJO1lBQ3pELE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQzlCLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQztnQkFBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDL0IsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsMkJBQVMsR0FBVCxVQUFVLEdBQUcsRUFBRSxRQUFRO1FBRXJCLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQy9CLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMxQixHQUFHLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBRXJDLENBQUM7WUFBQyxJQUFJO2dCQUFDLEdBQUcsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7UUFFNUMsQ0FBQztRQUdELElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFDLEdBQUcsSUFBSyxPQUFBLEdBQUcsQ0FBQyxJQUFJLEVBQUUsRUFBVixDQUFVLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBQyxJQUFJO1lBQ3pELE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQzlCLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQztnQkFBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDL0IsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBR0gsMEJBQVEsR0FBUixVQUFTLEdBQUcsRUFBRSxJQUFJLEVBQUUsUUFBUTtRQUV4QixFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMvQixFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDMUIsR0FBRyxJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUVyQyxDQUFDO1lBQUMsSUFBSTtnQkFBQyxHQUFHLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBRTVDLENBQUM7UUFFRCxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDO2FBQ3RCLFNBQVMsQ0FBQyxVQUFBLElBQUk7WUFDYixJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDekIsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ25CLENBQUMsRUFBRSxVQUFBLEtBQUs7WUFDTixPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO1lBQzFCLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUN6QixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFLRCw4QkFBWSxHQUFaLFVBQWEsRUFBRSxFQUFFLFlBQVk7UUFFM0IsSUFBSSxHQUFHLEdBQUcsVUFBVSxDQUFDO1FBQ3JCLElBQUksT0FBTyxHQUFRLElBQUksSUFBSSxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUM7UUFHNUMsRUFBRSxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztZQUNqQixJQUFJLElBQUksR0FBRyxZQUFZLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ25DLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN2QixPQUFPLEdBQUcsUUFBUSxDQUFDO1FBQ3JCLENBQUM7UUFHRCxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNwQixNQUFNLENBQUMsVUFBVSxDQUFDO1FBQ3BCLENBQUM7UUFDRCxJQUFJLEVBQUUsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3ZCLElBQUksS0FBSyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVsQixJQUFJLEdBQUcsR0FBRyxRQUFRLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFHdEQsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksRUFBRSxDQUFDLENBQUM7WUFBQyxHQUFHLEdBQUcsVUFBVSxDQUFDO1FBQ2pELEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLEVBQUUsQ0FBQyxDQUFDO1lBQUMsR0FBRyxHQUFHLFFBQVEsQ0FBQztRQUMvQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUMsQ0FBQztZQUFDLEdBQUcsR0FBRyxXQUFXLENBQUM7UUFDbEQsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksRUFBRSxDQUFDLENBQUM7WUFBQyxHQUFHLEdBQUcsV0FBVyxDQUFDO1FBQ2xELEVBQUUsQ0FBQyxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUM7WUFBQyxHQUFHLEdBQUcsVUFBVSxDQUFDO1FBQy9CLEVBQUUsQ0FBQyxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUM7WUFBQyxHQUFHLEdBQUcsWUFBWSxDQUFDO1FBR2pDLE1BQU0sQ0FBQyxHQUFHLENBQUE7SUFFWixDQUFDO0lBS0QsK0JBQWEsR0FBYixVQUFjLEVBQUU7UUFDZCxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDbEIsSUFBSSxHQUFHLEdBQVEsRUFBRSxDQUFDO1FBRWxCLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQVUsSUFBSSxFQUFFLEdBQUc7WUFFckMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFFdEIsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7Z0JBQ2YsR0FBRyxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDN0QsQ0FBQztRQUNILENBQUMsQ0FBQyxDQUFBO1FBQ0YsTUFBTSxDQUFDLEdBQUcsQ0FBQztJQUNiLENBQUM7SUFtR0QsNkJBQVcsR0FBWCxVQUFZLEVBQUUsRUFBRSxJQUFJLEVBQUUsS0FBSztRQUN6QixFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztZQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFHMUIsSUFBSSxRQUFRLEdBQUcsRUFBRSxDQUFDO1FBQ2xCLElBQUksSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUVkLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxJQUFJLEVBQUUsQ0FBQztZQUU1QixJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbEIsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDO1lBRXBCLEdBQUcsQ0FBQyxDQUFDLElBQUksR0FBRyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBRXBCLEdBQUcsQ0FBQyxDQUFDLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7b0JBQ3RCLEVBQUUsQ0FBQyxDQUFDLElBQUksSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDO3dCQUVoQixJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7d0JBQ2xDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDOzRCQUNwQixJQUFJLEVBQUUsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7NEJBQ2hDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0NBQ1YsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0NBRzdCLENBQUM7Z0NBQUMsSUFBSSxDQUFDLENBQUM7b0NBQ04sUUFBUSxHQUFHLFFBQVEsSUFBSSxLQUFLLENBQUM7Z0NBQy9CLENBQUM7NEJBQ0gsQ0FBQzs0QkFBQyxJQUFJLENBQUMsQ0FBQztnQ0FDTixFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQ0FHMUIsQ0FBQztnQ0FBQyxJQUFJLENBQUMsQ0FBQztvQ0FDTixRQUFRLEdBQUcsUUFBUSxJQUFJLEtBQUssQ0FBQztnQ0FDL0IsQ0FBQzs0QkFHSCxDQUFDO3dCQUVILENBQUM7b0JBRUgsQ0FBQztnQkFDSCxDQUFDO1lBQ0gsQ0FBQztZQUNELEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQztnQkFBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ25DLENBQUMsQ0FBQyxDQUFDO1FBRUgsTUFBTSxDQUFDLFFBQVEsQ0FBQztJQUNsQixDQUFDO0lBR0gsK0JBQWEsR0FBYixVQUFjLE1BQU07UUFDbEIsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLE9BQU8sQ0FBQyxHQUFHLENBQUMscUNBQXFDLEVBQUUsTUFBTSxDQUFDLENBQUE7UUFDMUQsSUFBSSxRQUFRLEdBQUc7WUFDYixJQUFJLEVBQUUsb0JBQW9CO1lBQzFCLFVBQVUsRUFBRSxJQUFJO1lBQ2hCLE9BQU8sRUFBRSxJQUFJO1lBQ2IsTUFBTSxFQUFFLElBQUk7WUFDWixPQUFPLEVBQUUsSUFBSTtZQUNiLEtBQUssRUFBRSxJQUFJO1lBQ1gsTUFBTSxFQUFFLElBQUk7U0FDYixDQUFDO1FBR0YsSUFBSSxLQUFLLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUN0QyxJQUFJLE1BQU0sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBRTFDLEtBQUssR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNqQyxLQUFLLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDakMsS0FBSyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ2pDLEtBQUssR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNqQyxLQUFLLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFFakMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ25DLE1BQU0sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNuQyxNQUFNLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDbkMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ25DLE1BQU0sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUVuQyxPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFJM0MsSUFBSSxNQUFNLEdBQVEsRUFBRSxDQUFDO1FBQ3JCLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUM7WUFBQyxNQUFNLENBQUMsUUFBUSxDQUFDO1FBQ2hGLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztZQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDMUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRXJDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDO1lBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQztRQUl2RixNQUFNLENBQUMsT0FBTyxDQUFDLFVBQVUsSUFBSSxFQUFFLENBQUM7WUFHOUIsSUFBSSxJQUFJLEdBQUcsS0FBSyxHQUFHLEdBQUcsR0FBRyxNQUFNLENBQUM7WUFDaEMsSUFBSSxLQUFLLEdBQUcsTUFBTSxHQUFHLEdBQUcsR0FBRyxLQUFLLENBQUM7WUFFakMsSUFBSSxHQUFHLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3BCLElBQUksT0FBTyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDNUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUszQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ2pFLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxJQUFJLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDMUQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQztnQkFDMUIsUUFBUSxHQUFHLEdBQUcsQ0FBQztZQUNqQixDQUFDO1FBS0gsQ0FBQyxDQUFDLENBQUE7UUFFRixNQUFNLENBQUMsUUFBUSxDQUFDO0lBSWxCLENBQUM7SUFFRCxrQ0FBZ0IsR0FBaEIsVUFBaUIsR0FBRztRQUNsQixHQUFHLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3RDLEdBQUcsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDdEMsR0FBRyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUN0QyxHQUFHLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3RDLEdBQUcsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDdEMsTUFBTSxDQUFDLEdBQUcsQ0FBQTtJQUNaLENBQUM7SUFVRCx3Q0FBc0IsR0FBdEIsVUFBdUIsTUFBTSxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsS0FBSztRQUN2RCxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFFbEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxzREFBc0QsRUFBRSxNQUFNLEdBQUcsR0FBRyxHQUFHLFVBQVUsR0FBRyxHQUFHLEdBQUcsT0FBTyxHQUFHLEdBQUcsR0FBRyxLQUFLLENBQUMsQ0FBQTtRQUM1SCxJQUFJLFFBQVEsR0FBRyxVQUFVLENBQUM7UUFDMUIsSUFBSSxTQUFTLEdBQVEsRUFBRSxDQUFDO1FBRXhCLElBQUksTUFBTSxHQUFRLEVBQUUsQ0FBQztRQUdyQixFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQztRQUUvRSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7WUFBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBRXhHLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDO1lBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQztRQUV6RixNQUFNLENBQUMsT0FBTyxDQUFDLFVBQVUsSUFBSSxFQUFFLENBQUM7WUFFOUIsSUFBSSxHQUFHLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRXBCLElBQUksS0FBSyxHQUFHLEVBQUUsQ0FBQztZQUNmLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUM7Z0JBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDbkQsSUFBSSxLQUFLLEdBQUcsR0FBRyxDQUFDLFVBQVUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUN6QyxJQUFJLElBQUksR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ3BDLElBQUksTUFBTSxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFLENBQUM7WUFHckMsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO1lBQ2hCLEVBQUUsQ0FBQyxDQUFDLEtBQUssSUFBSSxPQUFPLENBQUMsV0FBVyxFQUFFLENBQUM7Z0JBQUMsSUFBSSxHQUFHLElBQUksSUFBSSxLQUFLLENBQUM7WUFDekQsRUFBRSxDQUFDLENBQUMsS0FBSyxJQUFJLFVBQVUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztnQkFBQyxJQUFJLEdBQUcsSUFBSSxJQUFJLEtBQUssQ0FBQztZQUM1RCxFQUFFLENBQUMsQ0FBQyxJQUFJLElBQUksTUFBTSxDQUFDLFdBQVcsRUFBRSxDQUFDO2dCQUFDLElBQUksR0FBRyxJQUFJLElBQUksS0FBSyxDQUFDO1lBQ3ZELEVBQUUsQ0FBQyxDQUFDLE1BQU0sSUFBSSxLQUFLLENBQUMsV0FBVyxFQUFFLENBQUM7Z0JBQUMsSUFBSSxHQUFHLElBQUksSUFBSSxLQUFLLENBQUM7WUFFeEQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDVCxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3RCLENBQUM7UUFRSCxDQUFDLENBQUMsQ0FBQTtRQUVGLE1BQU0sQ0FBQyxTQUFTLENBQUM7SUFFbkIsQ0FBQztJQUdELDBDQUF3QixHQUF4QixVQUF5QixNQUFNLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxLQUFLO1FBQ3pELElBQUksUUFBUSxHQUFHO1lBQ2IsY0FBYyxFQUFFLElBQUk7WUFDcEIsYUFBYSxFQUFFLElBQUk7WUFDbkIsVUFBVSxFQUFFLElBQUk7WUFDaEIsU0FBUyxFQUFFLElBQUk7WUFDZixLQUFLLEVBQUUsSUFBSTtTQUNaLENBQUM7UUFFRixFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQztRQUM5RSxJQUFJLGFBQWEsR0FBUSxFQUFFLENBQUM7UUFHNUIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUVySSxPQUFPLENBQUMsR0FBRyxDQUFDLDBEQUEwRCxFQUFFLE1BQU0sR0FBRyxHQUFHLEdBQUcsVUFBVSxHQUFHLEdBQUcsR0FBRyxPQUFPLEdBQUcsR0FBRyxHQUFHLEtBQUssQ0FBQyxDQUFDO1FBQ2pJLElBQUksT0FBTyxHQUFHLEtBQUssR0FBRyxLQUFLLEdBQUcsTUFBTSxHQUFHLEtBQUssR0FBRyxVQUFVLEdBQUcsS0FBSyxHQUFHLE9BQU8sR0FBRyxLQUFLLENBQUM7UUFHcEYsYUFBYSxDQUFDLE9BQU8sQ0FBQyxVQUFVLElBQUksRUFBRSxDQUFDO1lBRXJDLElBQUksR0FBRyxHQUFHLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUUzQixJQUFJLEtBQUssR0FBRyxHQUFHLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDdEUsSUFBSSxLQUFLLEdBQUcsR0FBRyxDQUFDLFVBQVUsQ0FBQyxXQUFXLEVBQUUsR0FBRyxNQUFNLEdBQUcsR0FBRyxDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUNoRixJQUFJLElBQUksR0FBRyxHQUFHLENBQUMsYUFBYSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQzNDLElBQUksTUFBTSxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFLENBQUM7WUFHckMsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO1lBQ2hCLEVBQUUsQ0FBQyxDQUFDLEtBQUssSUFBSSxPQUFPLENBQUMsV0FBVyxFQUFFLENBQUM7Z0JBQUMsSUFBSSxHQUFHLElBQUksSUFBSSxLQUFLLENBQUM7WUFDekQsRUFBRSxDQUFDLENBQUMsS0FBSyxJQUFJLFVBQVUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztnQkFBQyxJQUFJLEdBQUcsSUFBSSxJQUFJLEtBQUssQ0FBQztZQUM1RCxFQUFFLENBQUMsQ0FBQyxJQUFJLElBQUksTUFBTSxDQUFDLFdBQVcsRUFBRSxDQUFDO2dCQUFDLElBQUksR0FBRyxJQUFJLElBQUksS0FBSyxDQUFDO1lBQ3ZELEVBQUUsQ0FBQyxDQUFDLE1BQU0sSUFBSSxLQUFLLENBQUMsV0FBVyxFQUFFLENBQUM7Z0JBQUMsSUFBSSxHQUFHLElBQUksSUFBSSxLQUFLLENBQUM7WUFFeEQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDVCxPQUFPLENBQUMsR0FBRyxDQUFDLHFCQUFxQixDQUFDLENBQUE7Z0JBQ2xDLEdBQUcsQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO2dCQUN0QixRQUFRLEdBQUcsR0FBRyxDQUFDO1lBQ2pCLENBQUM7UUFRSCxDQUFDLENBQUMsQ0FBQTtRQUVGLE1BQU0sQ0FBQyxRQUFRLENBQUM7SUFFbEIsQ0FBQztJQUdELGdDQUFjLEdBQWQsVUFBZSxDQUFDLEVBQUUsUUFBUTtRQUd4QixJQUFJLE1BQU0sR0FBQyxJQUFJLENBQUM7UUFDaEIsSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN6QixJQUFJLEtBQUssR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbkIsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sR0FBRyxzQkFBc0IsR0FBRyxLQUFLLENBQUM7UUFDeEQsTUFBTSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUMsVUFBUyxJQUFJO1lBQ2hDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQztnQkFBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDL0IsQ0FBQyxDQUFDLENBQUE7SUErQkosQ0FBQztJQUVELDJCQUFTLEdBQVQsVUFBVSxLQUFLO1FBQ2IsSUFBSSxNQUFNLEdBQUMsSUFBSSxDQUFDO1FBRVosSUFBSSxPQUFPLEdBQUcsbUVBQW1FLENBQUM7UUFFbEYsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBR2hCLElBQUksSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDO1FBRzdDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUtWLEtBQUssR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBS25DLE9BQU8sQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUt0QixJQUFJLEdBQUcsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBRzdCLElBQUksR0FBRyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7WUFHN0IsSUFBSSxHQUFHLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUs3QixJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsQ0FBQztZQUdqQixJQUFJLEdBQUcsQ0FBQyxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztZQUd2QyxJQUFJLEdBQUcsQ0FBQyxDQUFDLElBQUksR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztZQUd4QyxJQUFJLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQztZQUtqQixFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUdkLElBQUksR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFDO1lBR3JCLENBQUM7WUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFHckIsSUFBSSxHQUFHLEVBQUUsQ0FBQztZQUdkLENBQUM7WUFLRCxNQUFNLEdBQUcsTUFBTTtnQkFHWCxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO2dCQUczQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7UUFLcEQsQ0FBQztRQUtELE1BQU0sQ0FBQyxNQUFNLENBQUM7SUFHbEIsQ0FBQztJQUdELDhCQUFZLEdBQVosVUFBYSxNQUFNO1FBR2YsTUFBTSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBR3ZDLElBQUksT0FBTyxHQUFHLEVBQUUsQ0FBQztRQUtqQixHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUtyQyxJQUFJLENBQUMsR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBSzdCLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUdWLE9BQU8sSUFBSSxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBR3RDLENBQUM7WUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUdqQyxPQUFPLElBQUksTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztnQkFHL0MsT0FBTyxJQUFJLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7WUFHbkQsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUdKLE9BQU8sSUFBSSxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO2dCQUdoRCxPQUFPLElBQUksTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO2dCQUd0RCxPQUFPLElBQUksTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztZQUduRCxDQUFDO1FBS0wsQ0FBQztRQUtELE1BQU0sQ0FBQyxPQUFPLENBQUM7SUFHbkIsQ0FBQztJQXh0QlUsT0FBTztRQURuQixpQkFBVSxFQUFFO3lDQWVjLFdBQUk7T0FkbEIsT0FBTyxDQTZ0Qm5CO0lBQUQsY0FBQztDQUFBLEFBN3RCRCxJQTZ0QkM7QUE3dEJZLDBCQUFPIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBIdHRwLCBIZWFkZXJzLCBSZXNwb25zZSB9IGZyb20gXCJAYW5ndWxhci9odHRwXCI7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIGFzIFJ4T2JzZXJ2YWJsZSB9IGZyb20gXCJyeGpzL09ic2VydmFibGVcIjtcblxuaW1wb3J0IFwicnhqcy9hZGQvb3BlcmF0b3IvbWFwXCI7XG5pbXBvcnQgXCJyeGpzL2FkZC9vcGVyYXRvci9kb1wiO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQmFja2VuZCB7XG4gIC8vcm9vdHVybD1cImh0dHBzOi8vYnBlaXRhbHkubXlibHVlbWl4Lm5ldFwiO1xuICByb290dXJsID0gXCJodHRwOi8vdGtkci5oZXJva3VhcHAuY29tXCI7XG4gIHRva2VuID0gXCJ0b2tlblwiO1xuICBhdGxldGkgPSBbXTtcbiAgY2hhdCA9IFtdO1xuICBhY3RpdmVnYXJhOiBhbnkgPSB7fTtcbiAgdXNlcjphbnk9e1xuICAgIHRva2VuOiBcIlwiLFxuICAgIGVtYWlsOiBcIlwiLFxuICAgIG5pY2tuYW1lOiBcIlwiXG4gIH1cblxuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBodHRwOiBIdHRwKSB7XG5cbiAgfVxuXG5cbmJsdWVMb2dpbih1c2VyLCBjYWxsYmFjaykge1xuICB2YXIgcXVlc3RvPXRoaXM7XG4gIGNvbnNvbGUubG9nKFwiYmx1ZWxvZ2luXCIsIHVzZXIpO1xuICB2YXIgZW1haWwgPSB1c2VyLmVtYWlsO1xuICB2YXIgcHN3ID0gdXNlci5wYXNzd29yZDtcbiAgdmFyIHVybCA9IHRoaXMucm9vdHVybCArIFwiL3VzZXJzL2xvZ2luXCI7XG4gIHZhciBxdWVzdG8gPSB0aGlzO1xuICAvL3ZhciBhdXRob3JpemF0aW9uID0gXCJCYXNpYyBcIiArIHdpbmRvdy5idG9hKGVtYWlsICsgXCI6XCIgKyBwc3cpO1xuICB2YXIgYXV0aDIgPSBcIkJhc2ljIFwiICsgcXVlc3RvLmI2NGVuY29kZShlbWFpbCArIFwiOlwiICsgcHN3KTtcbiAgY29uc29sZS5sb2coXCJhdXRob3JpemF0aW9uXCIsIGF1dGgyKTtcbiAgdmFyIGRhdGEgPSB7XG4gICAgYXV0aG9yaXphdGlvbjogYXV0aDJcblxuICB9XG4gIGlmICh1c2VyLmdjbXRva2VuKSB7XG5cbiAgICBjb25zb2xlLmxvZyhcInRoaXMgdXNlciBoYXMgZ2NtdG9rZW5cIiwgdXNlci5nY210b2tlbik7XG4gICAgZGF0YVtcImdjbXRva2VuXCJdID0gdXNlci5nY210b2tlbjtcblxuXG4gIH1cblxuICBjb25zb2xlLmxvZyhcInRyeWluZyB0byBsb2dpbiBhdFwiLCB1cmwpO1xuICB0aGlzLnBvc3REYXRhKHVybCwgZGF0YSwgZnVuY3Rpb24gKGRhdGEpIHtcbiAgICBjb25zb2xlLmxvZyhcImRhdGFcIiwgZGF0YSk7XG4gICAgaWYgKFN0cmluZyhkYXRhLmxvZ2dlZGluKSA9PSBcInRydWVcIikge1xuICAgICAgY29uc29sZS5sb2coXCJsb2dpbiBzdWNjZXNzZnVsbFwiKTtcbiAgICAgIHF1ZXN0by51c2VyID0gZGF0YTtcbiAgICAgIGlmICghZGF0YS5lbWFpbCkgcXVlc3RvLnVzZXIuZW1haWwgPSBlbWFpbDtcbiAgICAgIGlmICghZGF0YS5uaWNrbmFtZSkgcXVlc3RvLnVzZXIubmlja25hbWUgPSBlbWFpbDtcblxuICAgICAgY29uc29sZS5sb2coXCJVU0VSXCIsIHF1ZXN0by51c2VyKTtcblxuICAgICAgLy9xdWVzdG8uZXZlbnRzLnB1Ymxpc2goJ3VzZXJuYW1lOmNoYW5nZWQnLCBxdWVzdG8udXNlcik7XG4gICAgICBjb25zb2xlLmxvZyhcInVzZXIgdG9rZW5cIiwgcXVlc3RvLnVzZXIudG9rZW4pO1xuXG4gICAgICBpZiAocXVlc3RvLnVzZXIucm9sZSA9PSBcIklCTV9BRE1JTlwiKSBxdWVzdG8uaXNJYm1BZG1pbiA9IHRydWU7XG5cbiAgICAgIC8vcXVlc3RvLnV0aWxzLnNldEpzb25TdG9yYWdlKFwiY3JlZHNcIiwgdXNlcik7XG4gICAgICAvL3F1ZXN0by5nZXRBdGxldGkoZnVuY3Rpb24gKCkgeyB9KTtcblxuICAgICAgaWYgKGNhbGxiYWNrKSBjYWxsYmFjayhkYXRhKTtcblxuXG5cblxuXG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUubG9nKFwibG9naW4gd2FzIG5vdCBzdWNjZXNzZnVsbFwiKTtcbiAgICAgIGlmIChjYWxsYmFjaykgY2FsbGJhY2soZGF0YSk7XG4gICAgfVxuXG4gIH0pO1xuXG5cblxuXG5cblxuXG5cblxuXG59XG5cblxuICBmZXRjaERhdGEodXJsLCBjYWxsYmFjaykge1xuICAgIC8vKFwiZmV0Y2hkYXRhXCIpO1xuICAgIGlmICh1cmwuaW5kZXhPZihcInRva2VuXCIpID09IC0xKSB7XG4gICAgICBpZiAodXJsLmluZGV4T2YoXCI/XCIpID4gLTEpIHtcbiAgICAgICAgdXJsICs9IFwiJnRva2VuPVwiICsgdGhpcy51c2VyLnRva2VuO1xuXG4gICAgICB9IGVsc2UgdXJsICs9IFwiP3Rva2VuPVwiICsgdGhpcy51c2VyLnRva2VuO1xuXG4gICAgfVxuICAgIC8vdXRpbHMuY29sb2coXCJjYWxsaW5nIHVybCBcIiwgdXJsKTtcblxuICAgIHRoaXMuaHR0cC5nZXQodXJsKS5tYXAoKHJlcykgPT4gcmVzLmpzb24oKSkuc3Vic2NyaWJlKChkYXRhKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhcImdvdCBkYXRhXCIsIGRhdGEpO1xuICAgICAgaWYgKGNhbGxiYWNrKSBjYWxsYmFjayhkYXRhKTtcbiAgICB9KTtcbiAgfVxuXG4gIGZldGNoVGV4dCh1cmwsIGNhbGxiYWNrKSB7XG4gICAgLy8oXCJmZXRjaGRhdGFcIik7XG4gICAgaWYgKHVybC5pbmRleE9mKFwidG9rZW5cIikgPT0gLTEpIHtcbiAgICAgIGlmICh1cmwuaW5kZXhPZihcIj9cIikgPiAtMSkge1xuICAgICAgICB1cmwgKz0gXCImdG9rZW49XCIgKyB0aGlzLnVzZXIudG9rZW47XG5cbiAgICAgIH0gZWxzZSB1cmwgKz0gXCI/dG9rZW49XCIgKyB0aGlzLnVzZXIudG9rZW47XG5cbiAgICB9XG4gICAgLy91dGlscy5jb2xvZyhcImNhbGxpbmcgdXJsIFwiLCB1cmwpO1xuXG4gICAgdGhpcy5odHRwLmdldCh1cmwpLm1hcCgocmVzKSA9PiByZXMudGV4dCgpKS5zdWJzY3JpYmUoKGRhdGEpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKFwiZ290IGRhdGFcIiwgZGF0YSk7XG4gICAgICBpZiAoY2FsbGJhY2spIGNhbGxiYWNrKGRhdGEpO1xuICAgIH0pO1xuICB9XG5cblxucG9zdERhdGEodXJsLCBkYXRhLCBjYWxsYmFjaykge1xuICBcbiAgICBpZiAodXJsLmluZGV4T2YoXCJ0b2tlblwiKSA9PSAtMSkge1xuICAgICAgaWYgKHVybC5pbmRleE9mKFwiP1wiKSA+IC0xKSB7XG4gICAgICAgIHVybCArPSBcIiZ0b2tlbj1cIiArIHRoaXMudXNlci50b2tlbjtcbiAgXG4gICAgICB9IGVsc2UgdXJsICs9IFwiP3Rva2VuPVwiICsgdGhpcy51c2VyLnRva2VuO1xuICBcbiAgICB9XG4gIFxuICAgIHRoaXMuaHR0cC5wb3N0KHVybCwgZGF0YSlcbiAgICAgIC5zdWJzY3JpYmUoZGF0YSA9PiB7XG4gICAgICAgIHZhciByZXN1bHQgPSBkYXRhLmpzb24oKTtcbiAgICAgICAgY2FsbGJhY2socmVzdWx0KTtcbiAgICAgIH0sIGVycm9yID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coZXJyb3IuanNvbigpKTtcbiAgICAgICAgY2FsbGJhY2soZXJyb3IuanNvbigpKTtcbiAgICAgIH0pO1xuICB9XG4gIFxuXG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1jb25zZWN1dGl2ZS1ibGFuay1saW5lc1xuXG4gIGdldENhdGVnb3JpYShkbiwgcmVmZXJyYWxEYXRlKSB7XG5cbiAgICB2YXIgY2F0ID0gXCJzZW5pb3IgYVwiO1xuICAgIHZhciBjdXJ5ZWFyOiBhbnkgPSBuZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKCk7XG4gICAgLy9jb25zb2xlLmxvZyhcImN1cnllYXIgXCIrY3VyeWVhcilcbiAgICAvL2lmICghamN1cnJlbnRnYXJhLmRhdGEpIHVzZUN1cnJlbnREYXRlID0gdHJ1ZTtcbiAgICBpZiAocmVmZXJyYWxEYXRlKSB7XG4gICAgICB2YXIgYXJyZCA9IHJlZmVycmFsRGF0ZS5zcGxpdChcIi9cIik7XG4gICAgICB2YXIgYW5ub2dhcmEgPSBhcnJkWzJdO1xuICAgICAgY3VyeWVhciA9IGFubm9nYXJhO1xuICAgIH1cbiAgICAvL3NkZWJ1ZyhcImN1cnllYXI6IFwiK2N1cnllYXIpO1xuXG4gICAgaWYgKGRuLnRyaW0oKSA9PSBcIlwiKSB7XG4gICAgICByZXR1cm4gXCJzZW5pb3IgYlwiO1xuICAgIH1cbiAgICB2YXIgYXIgPSBkbi5zcGxpdChcIi5cIik7XG4gICAgdmFyIGJ5ZWFyID0gYXJbMl07XG5cbiAgICB2YXIgZXRhID0gcGFyc2VJbnQoY3VyeWVhciwgMTApIC0gcGFyc2VJbnQoYnllYXIsIDEwKTtcbiAgICAvL3NkZWJ1ZyhcImNhbGNvbG8gZXTDoDogXCIrZXRhKTtcblxuICAgIGlmICgoZXRhID49IDE4KSAmJiAoZXRhIDw9IDM1KSkgY2F0ID0gXCJzZW5pb3IgYVwiO1xuICAgIGlmICgoZXRhID49IDE1KSAmJiAoZXRhIDw9IDE3KSkgY2F0ID0gXCJqdW5pb3JcIjtcbiAgICBpZiAoKGV0YSA+PSAxMikgJiYgKGV0YSA8PSAxNCkpIGNhdCA9IFwiY2FkZXR0aSBhXCI7XG4gICAgaWYgKChldGEgPj0gMTApICYmIChldGEgPD0gMTEpKSBjYXQgPSBcImNhZGV0dGkgYlwiO1xuICAgIGlmIChldGEgPiAzNSkgY2F0ID0gXCJzZW5pb3IgYlwiO1xuICAgIGlmIChldGEgPCAxMCkgY2F0ID0gXCJlc29yZGllbnRpXCI7XG5cblxuICAgIHJldHVybiBjYXRcblxuICB9XG5cblxuXG5cbiAgZ2V0QXRsZXRhQnlJZChpZCkge1xuICAgIHZhciBxdWVzdG8gPSB0aGlzO1xuICAgIHZhciBhdGw6IGFueSA9IHt9O1xuICAgIC8vY29uc29sZS5sb2coXCJhdGxldGlcIix0aGlzLmF0bGV0aSk7XG4gICAgdGhpcy5hdGxldGkuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSwgaWR4KSB7XG4gICAgICAvL2NvbnNvbGUubG9nKGl0ZW0pO1xuICAgICAgaWYgKGl0ZW0uZG9jLmlkID09IGlkKSB7XG4gICAgICAgIC8vY29uc29sZS5sb2coXCJ0cm92YXRvICEhXCIpO1xuICAgICAgICBhdGwgPSBpdGVtLmRvYztcbiAgICAgICAgYXRsLmNhdGVnb3JpYSA9IHF1ZXN0by5nZXRDYXRlZ29yaWEoYXRsLmRhdGFuYXNjaXRhLCBudWxsKTtcbiAgICAgIH1cbiAgICB9KVxuICAgIHJldHVybiBhdGw7XG4gIH1cblxuXG4gIGdldE1hc2NoaUZlbW1pbmUgPSBmdW5jdGlvbiAoJG1yLCBzdV9jb3NhPzogYW55KSB7XG4gICAgLy9jb2xvZyhcImdldG1hc2NoaWZlbW1pbmVcIik7XG4gICAgLy9jb2xvZyhqY3VycmVudGdhcmEuaXNjcml0dGkpXG4gICAgdmFyICRtID0gJG1yO1xuICAgIGlmICgkbXIucm93cykgJG0gPSAkbXIucm93cztcbiAgICAvL3ZhciBpc2NyaXR0aSA9IGpjdXJyZW50Z2FyYS5pc2NyaXR0aS5zcGxpdChcIixcIik7XG4gICAgdmFyIG1hc2NoaSA9IDA7XG4gICAgdmFyIGZlbW1pbmUgPSAwO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgJG0ubGVuZ3RoOyBpKyspIHtcbiAgICAgIC8vJCgkbSkuZWFjaChmdW5jdGlvbiAoaSkge1xuICAgICAgLy9jb25zb2xlLmxvZyhcIiRNOiBcIitKU09OLnN0cmluZ2lmeSgkbVtpXSkpXG4gICAgICB2YXIgJGE7XG4gICAgICBpZiAoc3VfY29zYSA9PSBcImlzY3JpdHRpXCIpIHtcbiAgICAgICAgJGEgPSB0aGlzLmdldEF0bGV0YUJ5SWQoJG1baV0pO1xuICAgICAgfSBlbHNlICRhID0gdGhpcy5nZXRBdGxldGFCeUlkKCRtW2ldLmRvYy5hdGxldGFpZCk7XG5cbiAgICAgIHZhciBzZXNzbyA9IFwiTVwiO1xuICAgICAgaWYgKCRhLnNlc3NvKSBzZXNzbyA9ICRhLnNlc3NvLnRvVXBwZXJDYXNlKCk7XG5cbiAgICAgIGlmIChzZXNzbyA9PSBcIk1cIikgbWFzY2hpKys7XG4gICAgICBpZiAoc2Vzc28gPT0gXCJGXCIpIGZlbW1pbmUrKztcbiAgICAgIC8vY29uc29sZS5sb2coJGEuY29nbm9tZStcIiBcIiskYS5ub21lK1wiIC0gXCIrc2Vzc28pO1xuXG4gICAgfVxuXG4gICAgdmFyIHJldHZhbHVlID0ge1xuICAgICAgbWFzY2hpOiBtYXNjaGksXG4gICAgICBmZW1taW5lOiBmZW1taW5lXG4gICAgfVxuXG4gICAgcmV0dXJuIHJldHZhbHVlO1xuXG5cblxuXG5cbiAgfVxuXG5cbiAgZmlsdGVyUm93cyA9IGZ1bmN0aW9uICgkbSwgZmlsdCwgZXhhY3Q/OiBhbnkpIHtcbiAgICBpZiAoIWV4YWN0KSBleGFjdCA9IGZhbHNlO1xuICAgIC8vY29uc29sZS5sb2coXCJmaWx0ZXJyb3dzOiBcIilcbiAgICAvL2NvbnNvbGUubG9nKCRtKVxuICAgIHZhciAkcmV0cm93cyA9IHtcbiAgICAgIHJvd3M6IFtdXG4gICAgfTtcblxuICAgIHZhciByb3dzID0gJG07XG4gICAgaWYgKCRtLnJvd3MpIHJvd3MgPSAkbS5yb3dzO1xuICAgIC8vdmFyIHJvd3MgPSAkbS5yb3dzOyAvL1t7cGVyc29uOlwibWVcIiwgYWdlIDpcIjMwXCJ9LHtwZXJzb246XCJ5b3VcIixhZ2U6XCIyNVwifV07XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJvd3MubGVuZ3RoOyBpKyspIHtcblxuICAgICAgdmFyIHJvdyA9IHJvd3NbaV07XG4gICAgICB2YXIgZWxpZ2libGUgPSB0cnVlO1xuXG4gICAgICBmb3IgKHZhciBrZXkgaW4gcm93LmRvYykge1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhcImtleTogXCIra2V5ICsgXCIgLiBcIisgcm93LmRvY1trZXldKTtcbiAgICAgICAgZm9yICh2YXIgZmtleSBpbiBmaWx0KSB7XG4gICAgICAgICAgaWYgKGZrZXkgPT0ga2V5KSB7XG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiZm91bmQga2V5IC0tLS0+XCIrZmtleSk7XG4gICAgICAgICAgICB2YXIgdjEgPSBmaWx0W2ZrZXldLnRvTG93ZXJDYXNlKCk7XG5cbiAgICAgICAgICAgIGlmICh2MS50cmltKCkgIT0gXCJcIikge1xuICAgICAgICAgICAgICB2YXIgdjIgPSByb3cuZG9jW2tleV0udG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyh2Mik7XG4gICAgICAgICAgICAgIGlmIChleGFjdCkge1xuICAgICAgICAgICAgICAgIGlmICh2Mi50cmltKCkgPT0gdjEudHJpbSgpKSB7XG4gICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcImZvdW5kICE6IFwiK3YyKTtcblxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICBlbGlnaWJsZSA9IGVsaWdpYmxlICYmIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAodjIuaW5kZXhPZih2MSkgPiAtMSkge1xuICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJmb3VuZCAhOiBcIit2Mik7XG5cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgZWxpZ2libGUgPSBlbGlnaWJsZSAmJiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoZWxpZ2libGUpICRyZXRyb3dzLnJvd3MucHVzaChyb3cpO1xuICAgIH1cblxuICAgIHJldHVybiAkcmV0cm93cztcbiAgfVxuXG4gIGZpbHRlckFycmF5KCRtLCBmaWx0LCBleGFjdCkge1xuICAgIGlmICghZXhhY3QpIGV4YWN0ID0gZmFsc2U7XG4gICAgLy9jb2xvZyhcImZpbHRlcnJvd3M6IFwiKVxuICAgIC8vY29uc29sZS5sb2coJG0pXG4gICAgdmFyICRyZXRyb3dzID0gW107XG4gICAgdmFyIHJvd3MgPSAkbTsgLy9be3BlcnNvbjpcIm1lXCIsIGFnZSA6XCIzMFwifSx7cGVyc29uOlwieW91XCIsYWdlOlwiMjVcIn1dO1xuXG4gICAgcm93cy5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtLCBpKSB7XG5cbiAgICAgIHZhciByb3cgPSByb3dzW2ldO1xuICAgICAgdmFyIGVsaWdpYmxlID0gdHJ1ZTtcblxuICAgICAgZm9yICh2YXIga2V5IGluIHJvdykge1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhcImtleTogXCIra2V5ICsgXCIgLiBcIisgcm93LmRvY1trZXldKTtcbiAgICAgICAgZm9yICh2YXIgZmtleSBpbiBmaWx0KSB7XG4gICAgICAgICAgaWYgKGZrZXkgPT0ga2V5KSB7XG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiZm91bmQga2V5IC0tLS0+XCIrZmtleSk7XG4gICAgICAgICAgICB2YXIgdjEgPSBmaWx0W2ZrZXldLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICBpZiAodjEudHJpbSgpICE9IFwiXCIpIHtcbiAgICAgICAgICAgICAgdmFyIHYyID0gcm93W2tleV0udG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgICAgaWYgKGV4YWN0KSB7XG4gICAgICAgICAgICAgICAgaWYgKHYyLnRyaW0oKSA9PSB2MS50cmltKCkpIHtcbiAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiZm91bmQgITogXCIrdjIpO1xuXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIGVsaWdpYmxlID0gZWxpZ2libGUgJiYgZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmICh2Mi5pbmRleE9mKHYxKSA+IC0xKSB7XG4gICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcImZvdW5kICE6IFwiK3YyKTtcblxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICBlbGlnaWJsZSA9IGVsaWdpYmxlICYmIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoZWxpZ2libGUpICRyZXRyb3dzLnB1c2gocm93KTtcbiAgICB9KTtcblxuICAgIHJldHVybiAkcmV0cm93cztcbiAgfVxuXG5cbmdldFRrZHRBdGxldGEoYXRsZXRhKSB7XG4gIHZhciBxdWVzdG8gPSB0aGlzO1xuICBjb25zb2xlLmxvZyhcImdldFRrZHRBdGxldGEgc2VhcmNoaW5nIHRoaXMgYXRsZXRhXCIsIGF0bGV0YSlcbiAgdmFyIHJldHZhbHVlID0ge1xuICAgIG5vbWU6IFwiYXRsZXRhIG5vbiB0cm92YXRvXCIsXG4gICAgY2F0Y2ludHVyYTogXCItLVwiLFxuICAgIGNhdHBlc286IFwiLS1cIixcbiAgICBjYXRldGE6IFwiLS1cIixcbiAgICBzb2NpZXRhOiBcIi0tXCIsXG4gICAgc2Vzc286IFwiLS1cIixcbiAgICBnaW9ybm86IFwiLS1cIlxuICB9O1xuXG5cbiAgdmFyIGFub21lID0gYXRsZXRhLm5vbWUudG9Mb3dlckNhc2UoKTtcbiAgdmFyIGFjbm9tZSA9IGF0bGV0YS5jb2dub21lLnRvTG93ZXJDYXNlKCk7XG5cbiAgYW5vbWUgPSBhbm9tZS5yZXBsYWNlKFwiw6BcIiwgXCJhJ1wiKTtcbiAgYW5vbWUgPSBhbm9tZS5yZXBsYWNlKFwiw6hcIiwgXCJlJ1wiKTtcbiAgYW5vbWUgPSBhbm9tZS5yZXBsYWNlKFwiw6xcIiwgXCJpJ1wiKTtcbiAgYW5vbWUgPSBhbm9tZS5yZXBsYWNlKFwiw7JcIiwgXCJvJ1wiKTtcbiAgYW5vbWUgPSBhbm9tZS5yZXBsYWNlKFwiw7lcIiwgXCJ1J1wiKTtcblxuICBhY25vbWUgPSBhY25vbWUucmVwbGFjZShcIsOgXCIsIFwiYSdcIik7XG4gIGFjbm9tZSA9IGFjbm9tZS5yZXBsYWNlKFwiw6hcIiwgXCJlJ1wiKTtcbiAgYWNub21lID0gYWNub21lLnJlcGxhY2UoXCLDrFwiLCBcImknXCIpO1xuICBhY25vbWUgPSBhY25vbWUucmVwbGFjZShcIsOyXCIsIFwibydcIik7XG4gIGFjbm9tZSA9IGFjbm9tZS5yZXBsYWNlKFwiw7lcIiwgXCJ1J1wiKTtcblxuICBjb25zb2xlLmxvZyhcImFjdGl2ZWdhcmFcIiwgdGhpcy5hY3RpdmVnYXJhKTtcblxuXG5cbiAgdmFyIHNvdXJjZTogYW55ID0gW107XG4gIGlmICghcXVlc3RvLmFjdGl2ZWdhcmEuZ2FyYS5yb3dzWzBdLmRvYy5oYXNPd25Qcm9wZXJ0eShcInRrZHRcIikpIHJldHVybiByZXR2YWx1ZTtcbiAgaWYgKHF1ZXN0by5hY3RpdmVnYXJhLmdhcmEucm93c1swXS5kb2MudGtkdC5hdGxldGkpIHNvdXJjZSA9IHRoaXMuYWN0aXZlZ2FyYS5nYXJhLnJvd3NbMF0uZG9jLnRrZHQuYXRsZXRpO1xuICBjb25zb2xlLmxvZyhcInNvdXJjZVwiLCBzb3VyY2UubGVuZ3RoKTtcblxuICBpZiAoc291cmNlLmxlbmd0aCA9PSAwKSBzb3VyY2UgPSB0aGlzLmFjdGl2ZWdhcmEuZ2FyYS5yb3dzWzBdLmRvYy50a2R0LmF0bGV0aV9pc2NyaXR0aTtcblxuXG5cbiAgc291cmNlLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0sIGkpIHtcblxuXG4gICAgdmFyIG5vbWUgPSBhbm9tZSArIFwiIFwiICsgYWNub21lO1xuICAgIHZhciBub21leCA9IGFjbm9tZSArIFwiIFwiICsgYW5vbWU7XG5cbiAgICB2YXIgYXRsID0gc291cmNlW2ldO1xuICAgIHZhciBhdGxub21lID0gYXRsLm5vbWUudG9Mb3dlckNhc2UoKS50cmltKCk7XG4gICAgYXRsbm9tZSA9IHF1ZXN0by5ub3JtYWxpemVBY2NlbnRvKGF0bG5vbWUpO1xuXG5cbiAgICAvL2NvbnNvbGUubG9nKGF0bG5vbWUpO1xuICAgIC8vY29uc29sZS5sb2coYXRsbm9tZSwgbm9tZSk7XG4gICAgaWYgKGF0bG5vbWUuaW5kZXhPZihcImNvbGFuZ2VsXCIpID4gLTEpIGNvbnNvbGUubG9nKGF0bG5vbWUsIG5vbWUpO1xuICAgIGlmICgoYXRsbm9tZSA9PSBub21lLnRyaW0oKSkgfHwgKGF0bG5vbWUgPT0gbm9tZXgudHJpbSgpKSkge1xuICAgICAgY29uc29sZS5sb2coXCJUUk9WQVRPICEhXCIpO1xuICAgICAgcmV0dmFsdWUgPSBhdGw7XG4gICAgfVxuXG5cblxuXG4gIH0pXG5cbiAgcmV0dXJuIHJldHZhbHVlO1xuXG5cblxufVxuXG5ub3JtYWxpemVBY2NlbnRvKHR4dCkge1xuICB0eHQgPSB0aGlzLnJlcGxhY2VBbGwodHh0LCBcIsOgXCIsIFwiYSdcIik7XG4gIHR4dCA9IHRoaXMucmVwbGFjZUFsbCh0eHQsIFwiw6hcIiwgXCJlJ1wiKTtcbiAgdHh0ID0gdGhpcy5yZXBsYWNlQWxsKHR4dCwgXCLDrFwiLCBcImknXCIpO1xuICB0eHQgPSB0aGlzLnJlcGxhY2VBbGwodHh0LCBcIsOyXCIsIFwibydcIik7XG4gIHR4dCA9IHRoaXMucmVwbGFjZUFsbCh0eHQsIFwiw7lcIiwgXCJ1J1wiKTtcbiAgcmV0dXJuIHR4dFxufVxuXG5cbnJlcGxhY2VBbGwgPSBmdW5jdGlvbiAoc3RyaW5nLCBzZWFyY2gsIHJlcGxhY2VtZW50KSB7XG4gIHZhciB0YXJnZXQgPSBzdHJpbmc7XG4gIHJldHVybiB0YXJnZXQuc3BsaXQoc2VhcmNoKS5qb2luKHJlcGxhY2VtZW50KTtcbn07XG5cblxuXG5nZXRUa2R0QXRsZXRpQ2F0ZWdvcmlhKGNhdGV0YSwgY2F0Y2ludHVyYSwgY2F0cGVzbywgc2Vzc28pIHtcbiAgdmFyIHF1ZXN0byA9IHRoaXM7XG5cbiAgY29uc29sZS5sb2coXCJnZXRUa2R0QXRsZXRpQ2F0ZWdvcmlhIHNlYXJjaGluZyBhdGxldGkgaW4gY2F0ZWdvcmlhXCIsIGNhdGV0YSArIFwiIFwiICsgY2F0Y2ludHVyYSArIFwiIFwiICsgY2F0cGVzbyArIFwiIFwiICsgc2Vzc28pXG4gIHZhciByZXR2YWx1ZSA9IFwibm90Zm91bmRcIjtcbiAgdmFyIGF2dmVyc2FyaTogYW55ID0gW107XG5cbiAgdmFyIHNvdXJjZTogYW55ID0gW107XG5cblxuICBpZiAoIXRoaXMuYWN0aXZlZ2FyYS5nYXJhLnJvd3NbMF0uZG9jLmhhc093blByb3BlcnR5KFwidGtkdFwiKSkgcmV0dXJuIGF2dmVyc2FyaTtcblxuICBpZiAodGhpcy5hY3RpdmVnYXJhLmdhcmEucm93c1swXS5kb2MudGtkdC5hdGxldGkpIHNvdXJjZSA9IHRoaXMuYWN0aXZlZ2FyYS5nYXJhLnJvd3NbMF0uZG9jLnRrZHQuYXRsZXRpO1xuXG4gIGlmIChzb3VyY2UubGVuZ3RoID09IDApIHNvdXJjZSA9IHF1ZXN0by5hY3RpdmVnYXJhLmdhcmEucm93c1swXS5kb2MudGtkdC5hdGxldGlfaXNjcml0dGk7XG5cbiAgc291cmNlLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0sIGkpIHtcblxuICAgIHZhciBhdGwgPSBzb3VyY2VbaV07XG5cbiAgICB2YXIgY3Blc28gPSBcIlwiO1xuICAgIGlmIChhdGwuY2F0cGVzbykgY3Blc28gPSBhdGwuY2F0cGVzby50b0xvd2VyQ2FzZSgpO1xuICAgIHZhciBjY2ludCA9IGF0bC5jYXRjaW50dXJhLnRvTG93ZXJDYXNlKCk7XG4gICAgdmFyIGNldGEgPSBhdGwuY2F0ZXRhLnRvTG93ZXJDYXNlKCk7XG4gICAgdmFyIGNzZXNzbyA9IGF0bC5zZXNzby50b0xvd2VyQ2FzZSgpO1xuXG5cbiAgICB2YXIgZG9JdCA9IHRydWU7XG4gICAgaWYgKGNwZXNvICE9IGNhdHBlc28udG9Mb3dlckNhc2UoKSkgZG9JdCA9IGRvSXQgJiYgZmFsc2U7XG4gICAgaWYgKGNjaW50ICE9IGNhdGNpbnR1cmEudG9Mb3dlckNhc2UoKSkgZG9JdCA9IGRvSXQgJiYgZmFsc2U7XG4gICAgaWYgKGNldGEgIT0gY2F0ZXRhLnRvTG93ZXJDYXNlKCkpIGRvSXQgPSBkb0l0ICYmIGZhbHNlO1xuICAgIGlmIChjc2Vzc28gIT0gc2Vzc28udG9Mb3dlckNhc2UoKSkgZG9JdCA9IGRvSXQgJiYgZmFsc2U7XG5cbiAgICBpZiAoZG9JdCkge1xuICAgICAgYXZ2ZXJzYXJpLnB1c2goYXRsKTtcbiAgICB9XG4gICAgLy9jb25zb2xlLmxvZyhhdGxub21lKTtcbiAgICAvL2NvbnNvbGUubG9nKGF0bG5vbWUsbm9tZSk7XG5cblxuXG5cblxuICB9KVxuXG4gIHJldHVybiBhdnZlcnNhcmk7XG5cbn1cblxuXG5nZXRUa2R0VGFidWxhdGlDYXRlZ29yaWEoY2F0ZXRhLCBjYXRjaW50dXJhLCBjYXRwZXNvLCBzZXNzbykge1xuICB2YXIgcmV0dmFsdWUgPSB7XG4gICAgY2F0ZWdvcmlhX3Blc286IFwiLS1cIixcbiAgICBjYXRlZ29yaWFfZXRhOiBcIi0tXCIsXG4gICAgY2ludHVyYV9kYTogXCItLVwiLFxuICAgIGNpbnR1cmFfYTogXCItLVwiLFxuICAgIHNlc3NvOiBcIi0tXCJcbiAgfTtcblxuICBpZiAoIXRoaXMuYWN0aXZlZ2FyYS5nYXJhLnJvd3NbMF0uZG9jLmhhc093blByb3BlcnR5KFwidGtkdFwiKSkgcmV0dXJuIHJldHZhbHVlO1xuICB2YXIgdGtkdF90YWJ1bGF0aTogYW55ID0gW107XG5cblxuICBpZiAodGhpcy5hY3RpdmVnYXJhLmdhcmEucm93c1swXS5kb2MudGtkdC5oYXNPd25Qcm9wZXJ0eShcInRhYnVsYXRpXCIpKSB0a2R0X3RhYnVsYXRpID0gdGhpcy5hY3RpdmVnYXJhLmdhcmEucm93c1swXS5kb2MudGtkdC50YWJ1bGF0aTtcblxuICBjb25zb2xlLmxvZyhcImdldFRrZHRUYWJ1bGF0aUNhdGVnb3JpYSBzZWFyY2hpbmcgdGFidWxhdG8gaW4gY2F0ZWdvcmlhXCIsIGNhdGV0YSArIFwiIFwiICsgY2F0Y2ludHVyYSArIFwiIFwiICsgY2F0cGVzbyArIFwiIFwiICsgc2Vzc28pO1xuICB2YXIgdGFibmFtZSA9IHNlc3NvICsgXCIgLSBcIiArIGNhdGV0YSArIFwiIC0gXCIgKyBjYXRjaW50dXJhICsgXCIgLSBcIiArIGNhdHBlc28gKyBcIiBrZ1wiO1xuXG5cbiAgdGtkdF90YWJ1bGF0aS5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtLCBpKSB7XG5cbiAgICB2YXIgdGFiID0gdGtkdF90YWJ1bGF0aVtpXTtcblxuICAgIHZhciBjcGVzbyA9IHRhYi5jYXRlZ29yaWFfcGVzby5yZXBsYWNlKFwia2dcIiwgXCJcIikudHJpbSgpLnRvTG93ZXJDYXNlKCk7XG4gICAgdmFyIGNjaW50ID0gdGFiLmNpbnR1cmFfZGEudG9Mb3dlckNhc2UoKSArIFwiIC0+IFwiICsgdGFiLmNpbnR1cmFfYS50b0xvd2VyQ2FzZSgpO1xuICAgIHZhciBjZXRhID0gdGFiLmNhdGVnb3JpYV9ldGEudG9Mb3dlckNhc2UoKTtcbiAgICB2YXIgY3Nlc3NvID0gdGFiLnNlc3NvLnRvTG93ZXJDYXNlKCk7XG5cbiAgICAvL2NvbnNvbGUubG9nKGNwZXNvK1wiIC0gXCIrY2NpbnQrXCIgLSBcIitjZXRhK1wiIC0gXCIrY3Nlc3NvKTtcbiAgICB2YXIgZG9JdCA9IHRydWU7XG4gICAgaWYgKGNwZXNvICE9IGNhdHBlc28udG9Mb3dlckNhc2UoKSkgZG9JdCA9IGRvSXQgJiYgZmFsc2U7XG4gICAgaWYgKGNjaW50ICE9IGNhdGNpbnR1cmEudG9Mb3dlckNhc2UoKSkgZG9JdCA9IGRvSXQgJiYgZmFsc2U7XG4gICAgaWYgKGNldGEgIT0gY2F0ZXRhLnRvTG93ZXJDYXNlKCkpIGRvSXQgPSBkb0l0ICYmIGZhbHNlO1xuICAgIGlmIChjc2Vzc28gIT0gc2Vzc28udG9Mb3dlckNhc2UoKSkgZG9JdCA9IGRvSXQgJiYgZmFsc2U7XG5cbiAgICBpZiAoZG9JdCkge1xuICAgICAgY29uc29sZS5sb2coXCJUUk9WQVRPIFRBQlVMQVRPICEhXCIpXG4gICAgICB0YWIudGFibmFtZSA9IHRhYm5hbWU7XG4gICAgICByZXR2YWx1ZSA9IHRhYjtcbiAgICB9XG4gICAgLy9jb25zb2xlLmxvZyhhdGxub21lKTtcbiAgICAvL2NvbnNvbGUubG9nKGF0bG5vbWUsbm9tZSk7XG5cblxuXG5cblxuICB9KVxuXG4gIHJldHVybiByZXR2YWx1ZTtcblxufVxuXG5cbmdldFRhYnVsYXRvSW1nKGgsIGNhbGxiYWNrKSB7XG4gIC8vd2luZG93Lm9wZW4oaCk7XG4gIC8vcmV0dXJuO1xuICB2YXIgcXVlc3RvPXRoaXM7XG4gIHZhciBhcnIgPSBoLnNwbGl0KFwiaWQ9XCIpO1xuICB2YXIgdGFiaWQgPSBhcnJbMV07XG4gIHZhciB1cmwgPSB0aGlzLnJvb3R1cmwgKyBcIi90a2R0L3RhYnVsYXRvaW1hZ2UvXCIgKyB0YWJpZDtcbiAgcXVlc3RvLmZldGNoVGV4dCh1cmwsZnVuY3Rpb24oZGF0YSl7XG4gICAgaWYgKGNhbGxiYWNrKSBjYWxsYmFjayhkYXRhKTtcbiAgfSlcblxuICAvKlxuICB0aGlzLmh0dHAuZ2V0KHVybCkubWFwKHJlcyA9PiByZXMudGV4dCgpKS5zdWJzY3JpYmUoXG4gICAgKGRhdGEpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKFwiZGF0YVwiLCBkYXRhKVxuICAgICAgY2FsbGJhY2soZGF0YSk7XG4gICAgfSxcbiAgICAoZXJyKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhlcnIpXG4gICAgICBjYWxsYmFjayhcIlwiKTtcbiAgICB9XG4gICk7XG4gICovXG4gIC8qXG4gICQuYWpheCh7XG4gICAgdXJsOiBoLFxuICAgIHR5cGU6IFwiR0VUXCIsXG4gICAgZGF0YVR5cGU6IFwiaHRtbFwiXG4gIH0pXG4gICAgLmRvbmUoZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgIGNvbG9nKGRhdGEpO1xuICAgICAgdmFyIGltZyA9ICQoZGF0YSkuZmluZChcImltZ1thbHQ9ZHJhd2luZ19sb2FkX2Vycm9yXVwiKTtcbiAgICAgIHZhciBzcmMgPSBpbWcuYXR0cihcInNyY1wiKS5yZXBsYWNlKFwiLi9cIiwgXCJcIik7XG4gICAgICBjb2xvZyhzcmMpO1xuICAgICAgdmFyIGltID0gXCI8aW1nIHN0eWxlPSd3aWR0aDogNTAwcHg7IGhlaWdodDogNjAwcHg7JyBzcmM9J2h0dHA6Ly9kZW1vLnRrZHRlY2hub2xvZ3kuaXQvXCIgKyBzcmMgKyBcIicgLz5cIjtcbiAgICAgIGNhbGxiYWNrKGltKTtcbiAgICAgIHByb2dyZXNzU3RvcCgpO1xuICAgIH0pO1xuICAgICovXG5cbn1cblxuYjY0ZW5jb2RlKGlucHV0KSB7XG4gIHZhciBxdWVzdG89dGhpcztcbiAgXG4gICAgICB2YXIgX2tleVN0ciA9IFwiQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODkrLz1cIjtcbiAgXG4gICAgICB2YXIgb3V0cHV0ID0gXCJcIjtcbiAgXG4gIFxuICAgICAgdmFyIGNocjEsIGNocjIsIGNocjMsIGVuYzEsIGVuYzIsIGVuYzMsIGVuYzQ7XG4gIFxuICBcbiAgICAgIHZhciBpID0gMDtcbiAgXG4gIFxuICBcbiAgXG4gICAgICBpbnB1dCA9IHF1ZXN0by5fdXRmOF9lbmNvZGUoaW5wdXQpO1xuICBcbiAgXG4gIFxuICBcbiAgICAgIHdoaWxlIChpIDwgaW5wdXQubGVuZ3RoKSB7XG4gIFxuICBcbiAgXG4gIFxuICAgICAgICAgIGNocjEgPSBpbnB1dC5jaGFyQ29kZUF0KGkrKyk7XG4gIFxuICBcbiAgICAgICAgICBjaHIyID0gaW5wdXQuY2hhckNvZGVBdChpKyspO1xuICBcbiAgXG4gICAgICAgICAgY2hyMyA9IGlucHV0LmNoYXJDb2RlQXQoaSsrKTtcbiAgXG4gIFxuICBcbiAgXG4gICAgICAgICAgZW5jMSA9IGNocjEgPj4gMjtcbiAgXG4gIFxuICAgICAgICAgIGVuYzIgPSAoKGNocjEgJiAzKSA8PCA0KSB8IChjaHIyID4+IDQpO1xuICBcbiAgXG4gICAgICAgICAgZW5jMyA9ICgoY2hyMiAmIDE1KSA8PCAyKSB8IChjaHIzID4+IDYpO1xuICBcbiAgXG4gICAgICAgICAgZW5jNCA9IGNocjMgJiA2MztcbiAgXG4gIFxuICBcbiAgXG4gICAgICAgICAgaWYgKGlzTmFOKGNocjIpKSB7XG4gIFxuICBcbiAgICAgICAgICAgICAgZW5jMyA9IGVuYzQgPSA2NDtcbiAgXG4gIFxuICAgICAgICAgIH0gZWxzZSBpZiAoaXNOYU4oY2hyMykpIHtcbiAgXG4gIFxuICAgICAgICAgICAgICBlbmM0ID0gNjQ7XG4gIFxuICBcbiAgICAgICAgICB9XG4gIFxuICBcbiAgXG4gIFxuICAgICAgICAgIG91dHB1dCA9IG91dHB1dCArXG4gIFxuICBcbiAgICAgICAgICAgICAgX2tleVN0ci5jaGFyQXQoZW5jMSkgKyBfa2V5U3RyLmNoYXJBdChlbmMyKSArXG4gIFxuICBcbiAgICAgICAgICAgICAgX2tleVN0ci5jaGFyQXQoZW5jMykgKyBfa2V5U3RyLmNoYXJBdChlbmM0KTtcbiAgXG4gIFxuICBcbiAgXG4gICAgICB9XG4gIFxuICBcbiAgXG4gIFxuICAgICAgcmV0dXJuIG91dHB1dDtcbiAgXG4gIFxuICB9XG4gIFxuICBcbiAgX3V0ZjhfZW5jb2RlKHN0cmluZykge1xuICBcbiAgXG4gICAgICBzdHJpbmcgPSBzdHJpbmcucmVwbGFjZSgvXFxyXFxuL2csIFwiXFxuXCIpO1xuICBcbiAgXG4gICAgICB2YXIgdXRmdGV4dCA9IFwiXCI7XG4gIFxuICBcbiAgXG4gIFxuICAgICAgZm9yICh2YXIgbiA9IDA7IG4gPCBzdHJpbmcubGVuZ3RoOyBuKyspIHtcbiAgXG4gIFxuICBcbiAgXG4gICAgICAgICAgdmFyIGMgPSBzdHJpbmcuY2hhckNvZGVBdChuKTtcbiAgXG4gIFxuICBcbiAgXG4gICAgICAgICAgaWYgKGMgPCAxMjgpIHtcbiAgXG4gIFxuICAgICAgICAgICAgICB1dGZ0ZXh0ICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoYyk7XG4gIFxuICBcbiAgICAgICAgICB9IGVsc2UgaWYgKChjID4gMTI3KSAmJiAoYyA8IDIwNDgpKSB7XG4gIFxuICBcbiAgICAgICAgICAgICAgdXRmdGV4dCArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKChjID4+IDYpIHwgMTkyKTtcbiAgXG4gIFxuICAgICAgICAgICAgICB1dGZ0ZXh0ICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoKGMgJiA2MykgfCAxMjgpO1xuICBcbiAgXG4gICAgICAgICAgfSBlbHNlIHtcbiAgXG4gIFxuICAgICAgICAgICAgICB1dGZ0ZXh0ICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoKGMgPj4gMTIpIHwgMjI0KTtcbiAgXG4gIFxuICAgICAgICAgICAgICB1dGZ0ZXh0ICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoKChjID4+IDYpICYgNjMpIHwgMTI4KTtcbiAgXG4gIFxuICAgICAgICAgICAgICB1dGZ0ZXh0ICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoKGMgJiA2MykgfCAxMjgpO1xuICBcbiAgXG4gICAgICAgICAgfVxuICBcbiAgXG4gIFxuICBcbiAgICAgIH1cbiAgXG4gIFxuICBcbiAgXG4gICAgICByZXR1cm4gdXRmdGV4dDtcbiAgXG4gIFxuICB9XG4gIFxuXG5cblxufVxuIl19