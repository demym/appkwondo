var express = require('express');
var router = express.Router();
//var contactsService = require("../services/contactsService");

var fs = require('fs'),
    xml2js = require('xml2js');

var contacts;
var risp={'risposta':'standard'};
	
var parser = new xml2js.Parser();
var fname="a_contacts.xml";

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
		
		contacts=result.NewDataSet.record;
		console.log("Loaded "+contacts.length+" contacts");
		//atleti=result;
		//console.log(employees);
        //console.log('Read file atleti.xml: '+atleti.length);
    });
});


/* GET users root resource. */
router.get('/', function(req, res) {
	//res.send('respond with a resource');
	console.log("called contacts root");
    //res.send(risp);
	
	findAll(function(obj) {
		//console.log("###### users ( /getAllUsers route ) -->  " + JSON.stringify(obj));
		res.send(obj);
	});
	
});

/* GET all users. */
// ############################## UNCOMMENT FOR DEMO
router.get('/findall', function(req, res) {
	console.log("called contacts findall");
	//res.send(risp);
	findAll(function(obj) {
		//console.log("###### users ( /getAllUsers route ) -->  " + JSON.stringify(obj));
		res.send(obj);
	});
	
	/*
	contactsServices.findAll(function(obj) {
		console.log("###### users ( /getAllUsers route ) -->  " + JSON.stringify(obj));
		res.send(obj);
	});
	*/
});

router.get('/nome/:nome', function(req, res) {
	console.log("called contacts findall");
	var nome=req.params.nome;
	//res.send(risp);
	findByName(nome,function(obj) {
		//console.log("###### users ( /getAllUsers route ) -->  " + JSON.stringify(obj));
		res.send(obj);
	});
	

});


//CONTACTS FUNCTIONS


function findAll(callback)
{
  console.log('contacts findAll');
 console.log("global loggedin: "+global.loggedin);
	if (!global.loggedin) {
	 callback({"error":"User not logged in"});	
	  return;	
	}
	//callback({'errore':'non funziono'});
	//eturn;
    //var id = req.params.id;
	/*
	contacts.sort(function(a,b) {
		    var a1=a.LAST_NAME[0];
			//console.log(a1);
			var b1=b.LAST_NAME[0];
			if (a1>b1) return 1;
			if (a1<b1) return -1;
			return 0;
		});
		*/
		//res.render('lv_atleti.ejs',{ posts: atleti});
       callback(contacts);	
	
}


function findByName(nome,callback) {
    
	if (!global.loggedin) {
	  res.send("User not logged in");	
	  return;	
	}
    console.log('contacts findByName=' + nome);
    if (nome) {
        var results = contacts.filter(function(element) {
            var fullName = element.LAST_NAME[0];
			//console.log(fullName);
			var retval=(fullName.toLowerCase().indexOf(nome.toLowerCase()) > -1);
			if (retval) console.log("--- "+fullName);
            return retval;
        });
		results.sort(function(a,b) {
		    var a1=a.LAST_NAME[0];
			console.log(a1);
			var b1=b.LAST_NAME[0];
			if (a1>b1) return 1;
			if (a1<b1) return -1;
			return 0;
		});
		console.log("found "+results.length+" results"); 
		//res.render('lv_atleti.ejs',{ posts: results});
        callback(results);
    } else {
        callback(contacts);
    }
};





module.exports = router;