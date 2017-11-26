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