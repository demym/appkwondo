var express = require('express');
var router = express.Router();
//var assetServices = require("../services/assetsService");

var fs = require('fs'),
    xml2js = require('xml2js');

	
var assets;	
	
var parser = new xml2js.Parser();
var fname="a_assets.xml";

//var atleti = loadJSONfile(__dirname + '/atleti.json');
//console.log(atleti.length);


fs.readFile(fname, "utf-8",function(err, data) {
   console.log("Read file "+fname);
   //atleti=xmlToJson(data);
   //console.log(atleti);
   //atleti =  JSON.parse(data, 'utf8');
   //console.log('Read file atleti.json: '+atleti.length);
   
   //console.log(data);
   //console.log(data);

   
    parser.parseString(data, function (err, result) {
        //console.log(JSON.stringify(result));
		if (err) console.log("Error parsing XML: "+err);
		//console.log(result);
		
		assets=result.NewDataSet.record;
		console.log("Loaded "+assets.length+" locations");
		//atleti=result;
		//console.log(employees);
        //console.log('Read file atleti.xml: '+atleti.length);
    });
});


/* GET users root resource. */
router.get('/', function(req, res) {
//res.send('respond with a resource');
 console.log("called assets");
	 findAll(function(obj) {
		//console.log("###### users ( /getAllAssets route ) -->  " + JSON.stringify(obj));
		res.send(obj);
	});

	
});

/* GET all users. */
// ############################## UNCOMMENT FOR DEMO
router.get('/findall', function(req, res) {
	console.log("called assets findall");
	findAll(function(obj) {
		//console.log("###### users ( /getAllAssets route ) -->  " + JSON.stringify(obj));
		res.send(obj);
	});
});


router.get('/nome/:nome', function(req, res) {
	console.log("called locations findByName");
	var nome=req.params.nome;
	//res.send(risp);
	findByName(nome,function(obj) {
		//console.log("###### users ( /getAllUsers route ) -->  " + JSON.stringify(obj));
		res.send(obj);
	});
	

});


function findByName(nome,callback) {

	 if (!global.loggedin) {
	  res.send("User not logged in");	
	  return;	
	}
    console.log('assets findByName=' + nome);
    if (nome) {
        var results = assets.filter(function(element) {
			
			if (element.ASSET_SN)
			{	
            var fullName = element.ASSET_SN[0];
			//console.log(fullName);
			var retval=(fullName.toLowerCase().indexOf(nome.toLowerCase()) > -1);
			if (retval) console.log("--- "+fullName);
            return retval;
			} else return false;
        });
		results.sort(function(a,b) {
			if (a.ASSET_SN)
			{	
		    var a1=a.ASSET_SN[0];
			console.log(a1);
			var b1=b.ASSET_SN[0];
			if (a1>b1) return 1;
			if (a1<b1) return -1;
			return 0;
			} else return 0;
		});
		console.log("found "+results.length+" results"); 
		//res.render('lv_atleti.ejs',{ posts: results});
        callback(results);
    } else {
        callback(assets);
    }
};

function findById(id,callback) {

	if (!global.loggedin) {
	  res.send("User not logged in");	
	  return;	
	}
    console.log('findAssetsById: ' + id);
	console.log("assets totali: "+locations.length);
    if (id) {
        var results = assets.filter(function(element) {
            var aid = element.ASSET_SN[0];
			//console.log(aid);
			
			if (id==aid) {
			 //console.log("--- "+fullName);
			return true;
			 
			}
            return false;
        });
		console.log("Found "+results.length+" results");
		
        callback(results);
    } else {
        callback(assets);
    }
};


function findAll(callback) {
    console.log('assets findAll');
	console.log("global loggedin: "+global.loggedin);
	if (!global.loggedin) {
	  callback("User not logged in");	
	  return;	
	}
	assets.sort(function(a,b) {
		    var a1=a.ASSET_SN;
			//console.log(a1);
			var b1=b.ASSET_SN;
			if (a1>b1) return 1;
			if (a1<b1) return -1;
			return 0;
		});
		//res.render('lv_atleti.ejs',{ posts: atleti});
       callback(assets);
};



function renderHtm(res)
{
 var htm="<ul data-role='listview' />";
 var results = res.filter(function(element) {
   htm+="<li>"+element.cognome+" "+element.nome+"</li>";
 });
 htm+="</ul>";
 return htm;
}


module.exports = router;

