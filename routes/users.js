var express = require('express');
var router = express.Router();
var request = require('request');
var mongo = require('../routes/mongo');
var utils = require("../routes/utils");
var mail = require("../routes/mail");
var gcm = require("../routes/gcm");
var moment = require("moment");
var uuid = require('node-uuid');
var jwt = require('jsonwebtoken');
var superSecret = "inespugnabile"
var tokenExpireMinutes = 60;



router.get("/list", function (req, res) {
    mongo.getfile("users.json", function (data) {
        res.send(data);
    })
})


router.get("/add", function (req, res) {
    var doc = {
        doc: {

            email: "tkdruser@yahoo.it",
            nickname: "TkdrUser",
            password: "stevevai",
            role: "tkdruser",
            active: "true"



        }

    }

    var mom = moment().format("YYYYMMDDHHmmSS");
    doc.doc.id = mom;

    mongo.getfile("users.json", function (data) {
        var found = false;
        data.rows.forEach(function (item, idx) {
            if (item.doc.email == doc.doc.email) found = true;
        })

        if (!found) {
            mongo.addRecord("users.json", "", doc, function (ddata) {

                res.send(ddata);
            })

        } else {
            var retvalue = {
                error: true,
                msg: "User " + doc.doc.email + " already existing"
            }
            res.send(retvalue);
        }
    })


})


router.get("/delete", function (req, res) {
    var email = "demym@yahoo.it";
    var id = "";
    mongo.getfile("users.json", function (data) {
        data.rows.forEach(function (item, idx) {
            if (item.doc.email == email) {
                if (item.doc.hasOwnProperty("id")) {
                    id = item.doc.id;
                }

            }

        })

        mongo.deleteRecord("users.json", id, function (ddata) {
            res.send(ddata);
        })
    })


});

router.post("/delete", function (req, res) {
    var email = req.body.email;
    var id = "";
    mongo.getfile("users.json", function (data) {
        data.rows.forEach(function (item, idx) {
            if (item.doc.email == email) {
                if (item.doc.hasOwnProperty("id")) {
                    id = item.doc.id;
                }

            }

        })

        mongo.deleteRecord("users.json", id, function (ddata) {
            res.send(ddata);
        })
    })


});


router.get("/register/:email/:nickname", function (req, res) {
    var email = req.params.email;
    var nickname = req.params.nickname;
    var randomstring = Math.random().toString(36).slice(-8);
    var doc = {
        doc: {

            email: email,
            nickname: nickname,
            password: randomstring,
            role: "tkdruser",
            active: "false"



        }

    }

    var mom = moment().format("YYYYMMDDHHmmSS");
    doc.doc.id = mom;
    mongo.getfile("users.json", function (data) {
        var found = false;
        data.rows.forEach(function (item, idx) {
            if (item.doc.email == doc.doc.email) found = true;
        })

        if (!found) {
            mongo.addRecord("users.json", "", doc, function (ddata) {

                res.send(ddata);
            })

        } else {
            var retvalue = {
                error: true,
                msg: "User " + doc.doc.email + " already existing"
            }
            res.send(retvalue);

        }



    })

})


router.get("/retrievepsw/:email", function (req, res) {
    var email = req.params.email;
    var user = {};
    var retvalue = {
        error: false
    };

    mongo.getfile("users.json", function (data) {
        var found = false;
        data.rows.forEach(function (item, idx) {
            if (item.doc.email == email) {
                id = item.doc.id;
                user = item.doc;
                found = true;
            }
        })
        if (found) {

            var html = "La tua userid su Appkwondo è:<br><br>";

            html += "E-mail: <b>" + user.email + "</b><br>";
            html += "Password: <b>" + user.password + "</b>";



            var mailobj = {
                from: "AppKwonDo <appkwondo@tkdr.org>", // sender address
                to: user.email, // list of receivers
                subject: "La tua userid Appkwondo", // Subject line
                text: html, // plaintext body
                html: html // html body
            }

            mail.sendMail(mailobj, function (mdata) {
                retvalue.error = false;
                retvalue.mailresponse = mdata;
                res.send(retvalue);

            })


        } else {
            retvalue.error = true;
            res.send(retvalue);
        }
    });





})


router.get("/potentialios", function (req, res) {
    mongo.getfile("iosusers.json", function (data) {
        var ddata = data;
        ddata.potentialcount = data.rows.length;
        res.send(ddata);
    })
})


router.post("/changepsw", function (req, res) {

    var body = req.body;
    var retvalue = {
        error: false,
        msg: ""
    }
    utils.colog(body);

    var currentpsw = body.currentpsw;
    var newpsw = body.newpsw;
    var verifynewpsw = body.verifynewpsw;
    var email = body.email;

    mongo.getfile("users.json", function (data) {
        var found = false;
        data.rows.forEach(function (item, idx) {
            var doc = item.doc;
            if (doc.email == email) {
                found = true;
                if (doc.password != currentpsw) {
                    retvalue.error = true;
                    retvalue.msg = "La password inserita non corrisponde alla tua password corrente";
                } else {
                    if (verifynewpsw != newpsw) {
                        retvalue.error = true;
                        retvalue.msg = "La nuova password e la password di verifica non coincidono";
                    } else {   //OK can change password
                        doc.password = newpsw;
                        retvalue.error = false;
                        retvalue.msg = "Password modificata con successo !";



                    }
                }
            }

        })


        if (!found) {
            retvalue.error = true;
            retvalue.msg = "Utente con email " + email + " non trovato";
            res.send(retvalue);

        } else {

            if (retvalue.error) {
                res.send(retvalue);
            } else {

                mongo.updatefile("users.json", data.rows, function (udata) {

                    var html = "La tua userid su Appkwondo è stata modificata, i tuoi nuovi dati:<br><br>";

                    html += "E-mail: <b>" + email + "</b><br>";
                    html += "Password: <b>" + newpsw + "</b>";

                    var mailobj = {
                        from: "AppKwonDo <appkwondo@tkdr.org>", // sender address
                        to: email, // list of receivers
                        subject: "La tua userid Appkwondo è stata aggiornata con successo ",
                        text: html, // plaintext body
                        html: html // html body
                    }



                    mail.sendMail(mailobj, function (mdata) {
                        res.send(retvalue);

                    })



                })



            }

        }

    })

    //res.send(retvalue);
})




router.post("/update", function (req, res) {

    var body = req.body;
    var retvalue = {
        error: false,
        msg: ""
    }
    utils.colog(body);

    var currentpsw = body.currentpsw;
    var newpsw = body.newpsw;
    var verifynewpsw = body.verifynewpsw;
    var email = body.email;

    var userdoc=body;

    mongo.getfile("users.json", function (data) {
        var found = false;
        data.rows.forEach(function (item, idx) {
            var doc = item.doc;
            if (doc.email == userdoc.email) {
                found = true;
                item.doc=userdoc;
                mongo.updatefile("users.json", data.rows, function (udata) {

                    /*
                    var html = "La tua userid su Appkwondo è stata modificata, i tuoi nuovi dati:<br><br>";

                    html += "E-mail: <b>" + email + "</b><br>";
                    html += "Password: <b>" + newpsw + "</b>";

                    var mailobj = {
                        from: "AppKwonDo <appkwondo@tkdr.org>", // sender address
                        to: email, // list of receivers
                        subject: "La tua userid Appkwondo è stata aggiornata con successo ",
                        text: html, // plaintext body
                        html: html // html body
                    }



                    mail.sendMail(mailobj, function (mdata) {
                        res.send(retvalue);

                    })
                    */

                    res.send(udata);



                })
               
            }

        })


        if (!found) {
            retvalue.error = true;
            retvalue.msg = "Utente con email " + email + " non trovato";
            res.send(retvalue);

        } 

    })

    
})



router.get("/registerios/:email", function (req, res) {
    var email = req.params.email;
    mongo.getfile("iosusers.json", function (data) {
        var found = false;
        data.rows.forEach(function (item, idx) {
            if (item.doc.email == email) found = true;

        });

        if (!found) {
            var doc = {
                doc: {

                    email: email

                }

            }
            mongo.addRecord("iosusers.json", "", doc, function (ddata) {

                res.send(ddata);
            })

        } else {
            var retvalue = {
                error: true,
                msg: "user " + email + " already censored up as ios potential user"
            }
            res.send(retvalue)
        }

    })
})

router.post("/register", function (req, res) {

    var email = req.body.email;
    var nickname = req.body.nickname;
    var password = req.body.psw;

    var randomstring = Math.random().toString(36).slice(-8);
    var doc = {
        doc: {

            email: email,
            nickname: nickname,
            password: password,
            role: "tkdruser",
            active: "false"



        }

    }

    var mom = moment().format("YYYYMMDDHHmmSS");
    doc.doc.id = mom;
    mongo.getfile("users.json", function (data) {
        var found = false;
        data.rows.forEach(function (item, idx) {
            if (item.doc.email == doc.doc.email) found = true;
        })

        if (!found) {
            mongo.addRecord("users.json", "", doc, function (ddata) {


                var html = "<b>" + nickname + " (" + email + ")</b> ha inviato una richiesta di registrazione ad Appkwondo<br><br><a href='#'>Approva</a><br><a href='#'>Rifiuta</a>"


                var mailobj = {
                    from: "AppKwonDo <appkwondo@tkdr.org>", // sender address
                    to: "demym@yahoo.it", // list of receivers
                    subject: "Richiesta di registrazione ad Appkwondo da " + email, // Subject line
                    text: html, // plaintext body
                    html: html // html body
                }

                mail.sendMail(mailobj, function (mdata) {
                    res.send(ddata);

                })



            })

        } else {
            var retvalue = {
                error: true,
                msg: "User " + doc.doc.email + " already existing"
            }
            res.send(retvalue);

        }



    })

})


router.get("/approve/:email", function (req, res) {
    var email = req.params.email;
    var id = "";
    var user = {};
    mongo.getfile("users.json", function (data) {
        var found = false;
        data.rows.forEach(function (item, idx) {
            if (item.doc.email == email) {
                id = item.doc.id;
                user = item.doc;
                found = true;
            }
        })

        if (found) {

            var doc = {
                doc: user
            };

            doc.doc.active = true;
            mongo.updateRecord("users.json", id, doc, function (udata) {

                var html = "La tua registrazione su Appkwondo è stata completata con successo<br><br>";
                html += "I tuoi dati di accesso saranno i seguenti<br><br>";
                html += "E-mail: <b>" + doc.doc.email + "</b><br>";
                html += "Password: <b>" + doc.doc.password + "</b> (potrai cambiarla in ogni momento dall'app stessa)";



                var mailobj = {
                    from: "AppKwonDo <appkwondo@tkdr.org>", // sender address
                    to: doc.doc.email, // list of receivers
                    subject: "La tua registrazione Appkwondo", // Subject line
                    text: html, // plaintext body
                    html: html // html body
                }

                mail.sendMail(mailobj, function (mdata) {
                    res.send(mdata);

                })





            })

        } else {
            var retvalue = {
                error: true,
                msg: "User " + email + " not found"
            }
            res.send(ret)
        }


    })

})



router.post('/login', function (req, res) {
    //var em=req.body.email;
    //var pw=req.body.password;
    var role = "tkdruser";

    var ret = {
        "loggedin": "false"
    };

    var adminpsw = "Ser07glr,Taeguk,Masterkwondo";


    var auth = req.body.authorization;
    var gcmtoken = "";
    var deviceid = "";
    if (req.body.gcmtoken) gcmtoken = req.body.gcmtoken;
    if (req.body.deviceid) deviceid = req.body.deviceid;
    console.log("Loggin in, gcmtoken", gcmtoken, "deviceid", deviceid);
    //console.log("auth: "+auth);

    var tmp = auth.split(' '); // Split on a space, the original auth looks like  "Basic Y2hhcmxlczoxMjM0NQ==" and we need the 2nd part
    var buf = new Buffer(tmp[1], 'base64'); // create a buffer and tell it the data coming in is base64
    var plain_auth = buf.toString(); // read it back out as a string
    //console.log("Decoded Authorization ", plain_auth);

    // At this point plain_auth = "username:password"
    var creds = plain_auth.split(':'); // split on a ':'
    var username = creds[0];
    var password = creds[1];

    //console.log(username+" - "+password);

    var em = username;
    var pw = password;

    var loggedin = false;
    var user = {};

    mongo.getfile("users.json", function (data) {
        console.log("got users", data.rows.length)
        data.rows.forEach(function (item, idx) {
            if ((item.doc.email == em) && (item.doc.password == pw)) {
                loggedin = true;
                user = item.doc;
                item.doc.gcmtoken = gcmtoken;
                var gcmtokens = [];
                if (item.doc.hasOwnProperty("gcmtokens")) gcmtokens = item.doc.gcmtokens;

                if ((deviceid != "") && (gcmtoken != "")) {
                    gcm.addToken(deviceid, gcmtoken);
                    if (gcmtokens.indexOf(gcmtoken) == -1) {
                        gcmtokens.push(gcmtoken);

                        //tokens.push(gcmtoken);

                    }
                }
                item.doc.gcmtokens = gcmtokens;
                console.log("item.doc.gcmtoken", item.doc.gcmtoken);
                console.log("item.doc.gcmtokens", item.doc.gcmtokens);
            }
        })

        if (loggedin) {
            user.loggedin = loggedin;
            var tokenv4 = uuid.v4();
            var token = jwt.sign(em, superSecret
                /*,{
                                  expiresIn: "1 days" 
                       }*/
            );
            user.token = token;

            //save users with updated gcmtoken;
            delete user.password;
            res.send(user);
            /* mongo.updatefile("users.json",data.rows,function(mdata){
                 console.log("updated users with gcmtokens",mdata);
                
             })*/


        } else {
            user.loggedin = false;
            res.send(user);
        }
    })



});


router.get("/regpending/html", function (req, res) {

    var htm = "<style>table td { font-size: 22px}</style><table width='100%' border=1>";


    mongo.getfile("users.json", function (data) {
        data.rows.forEach(function (item, idx) {
            var active = false;
            if (item.doc.hasOwnProperty("active")) {
                if (String(item.doc.active) == "true") {
                    active = true;
                }
            }

            if (!active) {
                htm += "<tr><td>" + item.doc.email + "</td><td>" + item.doc.nickname + "</td><td><a href='/users/approve/" + item.doc.email + "'>APPROVA</a></td></tr>";


            }


        })
        htm += "</tr></table>";
        res.send(htm);
    })

});


router.get("/regpending", function (req, res) {



    var ret = {
        rows: []
    }

    mongo.getfile("users.json", function (data) {
        data.rows.forEach(function (item, idx) {
            var active = false;
            if (item.doc.hasOwnProperty("active")) {
                if (String(item.doc.active) == "true") {
                    active = true;
                }
            }

            if (!active) {
                ret.rows.push(item);



            }


        })

        res.send(ret);
    })

});







router.get("/testmail", function (req, res) {
    var html = "test mail from appkwondo";
    var mailobj = {
        from: "AppKwonDo <appkwondo@tkdr.org>", // sender address
        to: "demym@yahoo.it", // list of receivers
        subject: html, // Subject line
        text: html, // plaintext body
        html: html // html body
    }

    mail.sendMail(mailobj, function (mdata) {
        res.send(mdata);

    })


});


module.exports = router;