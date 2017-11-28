var express = require('express');
var router = express.Router();
var request = require('request');
var utils = require("../routes/utils");
var usemongo = true;
var usealtervista = false;
var altervistadataurl = "http://demym.altervista.org/herokudata/";
var fs = require('fs');

var mongo = require('../routes/mongo');
var matches = require('../routes/matches');
var mail = require("../routes/mail");
var debug = false;




function colog(txt) {
	if (debug) console.log(txt);

}


router.get("/list",function(req,res){
    mongo.getfile("minim.json",function(data){
        data.rows.sort(function(a,b){
            var a1=a.nome.toLowerCase();
            var b1=b.nome.toLowerCase();
            if (a1>b1) return 1;
            if (a1<b1) return -1;
            return 0;
            
        });
        res.send(data);
    })
})


router.get("/changeorderstatus/:id/:newstatus",function(req,res){
    var id=req.params.id;
    var newstatus=req.params.newstatus;
    mongo.getfile("minimord.json",function(data){
        data.rows.forEach(function(item,idx){
            if (item.id==id){
                data.rows[idx].stato=newstatus;
            }

        });
        mongo.updatefile("minimord.json",data.rows,function(udata){
            res.send(udata);
        })
    })
})

router.get("/deleteorders/:stato",function(req,res){
    
    var stato=req.params.stato;
    mongo.getfile("minimord.json",function(data){
        data.rows.forEach(function(item,idx){
            if (item.stato==stato){
                data.rows.splice(idx,1);
            }

        });
        mongo.updatefile("minimord.json",data.rows,function(udata){
            res.send(udata);
        })
    })


})


router.get("/deleteorder/:id",function(req,res){
    var id=req.params.id;
    var newstatus=req.params.newstatus;
    mongo.getfile("minimord.json",function(data){
        data.rows.forEach(function(item,idx){
            if (item.id==id){
                data.rows.splice(idx,1);
            }

        });
        mongo.updatefile("minimord.json",data.rows,function(udata){
            res.send(udata);
        })
    })
})



router.get("/listorders",function(req,res){
    mongo.getfile("minimord.json",function(data){
        data.rows.sort(function(a,b){
            var a1=a.id.toLowerCase();
            var b1=b.id.toLowerCase();
            if (a1>b1) return -1;
            if (a1<b1) return 1;
            return 0;
            
        });
        res.send(data);
    })
})



router.post("/addproduct",function(req,res){
    var body=req.body;
    var product=body.product;
    
    mongo.getfile("minim.json",function(data){
        data.rows.push(product);
        mongo.updatefile("minim.json",data.rows,function(udata){
            console.log(udata);
            res.send(udata);
        })

    })
})

router.post("/editproduct",function(req,res){
    var body=req.body;
    var product=body.product;
    console.log("product",product);
    mongo.getfile("minim.json",function(data){
        
        data.rows.forEach(function(item,idx){
            if (item.id==product.id){
                console.log("trovato prodotto !");
                data.rows[idx]=product;
            }
        })
        mongo.updatefile("minim.json",data.rows,function(udata){
            console.log(udata);
            res.send(udata);
        })

    })
})


router.post("/addorder",function(req,res){
    var cart=req.body;

    console.log("cart",cart);
    mongo.getfile("minimord.json",function(data){
        data.rows.push(cart);
        mongo.updatefile("minimord.json",data.rows,function(udata){
            res.send(udata);
        })
    })
})

router.post("/order",function(req,res){
    var body=req.body;
    var cart=body;

    console.log("cart",cart);

    var minimarketmail="marika.montemurro@live.it";

    var html = "Hai ricevuto la seguente prenotazione da "+cart.email+" ("+cart.nick+") <br><br>";
    
    html+="<table width='100%' border='1'>";
    html+="<tr><th>codice</th><th>categoria</th><th>prodotto</th><th>qta</th><th>prezzo unitario</th><th>totale prodotto</th></tr>";
    cart.cart.forEach(function(item,idx){


    })
                html += "E-mail: <b>" + user.email + "</b><br>";
                html += "Password: <b>" + user.password + "</b>";

    var mailobj = {
        from: "AppKwonDo <appkwondo@tkdr.org>", // sender address
        to: minimarketmail, // list of receivers
        subject: "Hai ricevuto un nuovo ordine prenotazioni da "+cart.email +" ("+cart.nick+")", // Subject line
        text: html, // plaintext body
        html: html // html body
    }

    mail.sendMail(mailobj, function (mdata) {
        retvalue.error = false;
        retvalue.mailresponse = mdata;
        res.send(retvalue);

    })

})

router.get("/updcat",function(req,res){
    mongo.getfile("minim.json",function(data){
        data.rows.forEach(function(item,idx){
            data.rows[idx].categoria="minimarket";
        })
        mongo.updatefile("minim.json",data.rows,function(udata){
            res.send(udata);
        })
    })
})

router.post("/deleteproduct",function(req,res){
    var body=req.body;
    var product=body.product;
    mongo.getfile("minim.json",function(data){
        
        data.rows.forEach(function(item,idx){
            if (item.id==product.id){
               data.rows.splice(idx,1);
            }
        })
        mongo.updatefile("minim.json",data.rows,function(udata){
            console.log(udata);
            res.send(udata);
        })

    })
})


module.exports = router;