var express = require('express');
var router = express.Router();
var request = require('request');
var utils = require("../routes/utils");
var uuid = require('node-uuid');
var jwt = require('jsonwebtoken');
var superSecret = "inespugnabile"
var tokenExpireMinutes = 60;



var fs = require('fs');
var xml2js = require('xml2js');
var mongo = require('../routes/mongo');
var usemongo = true;
var usealtervista = false;
var altervistaurl = "http://demym.altervista.org/";
var altervistadataurl = "http://demym.altervista.org/herokudata/";


var atleti;

var parser = new xml2js.Parser();
var fname = "atleti.xml";
var jfname = "atleti.json";
//var altervistaurl="http://localhost:90/tkdr";



//var atleti = loadJSONfile(__dirname + '/atleti.json');
//console.log(atleti.length);


function readAtletiMongo(callback) {
	mongo.getfile(jfname, function (data) {
		//console.log(data.rows.length);
		atleti = data;
		console.log("read atleti from mongo " + jfname + " :   " + atleti.rows.length);
		callback();

	})


}

function readAtletiAltervista(callback) {

	console.log("readAtletiAltervista")
	var fname = "atleti.json";
	request.get(altervistadataurl + fname, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			var data = JSON.parse(body);
			atleti = data;
			console.log("read atleti from altervista " + fname + " :   " + atleti.rows.length);
			callback(atleti);

		}
		if (error) {
			//callback({});
			return console.error("error: " + error.message)
		}
	});

	/*
	mongo.getfile(jfname,function(data){
		//console.log(data.rows.length);
		atleti=data;
		console.log("read atleti from mongo "+jfname+" :   "+atleti.rows.length);
        callback(); 
		
	})
 */

}

function readAtletiJson(callback) {
	if (usemongo) {
		readAtletiMongo(callback);
	} else if (usealtervista) {
		readAtletiAltervista(callback);
	} else {
		//console.log("readGareJson")
		var fname = "data/atleti.json";
		fs.readFile(fname, "utf-8", function (err, data) {
			//console.log("Read file "+fname);
			atleti = JSON.parse(data);
			//atleti=xmlToJson(data);
			//console.log(atleti);
			//atleti =  JSON.parse(data, 'utf8');
			//console.log('Read file atleti.json: '+atleti.length);
			console.log("read atleti from file " + fname + " :   " + atleti.rows.length);
			callback();
			//console.log(data);
		});
	}




}


function readAtleti(callback) {
	console.log("readAtleti")


	readAtletiJson(function () {
		findAll("", function (obj) {
			//console.log("###### users ( /getAllAssets route ) -->  " + JSON.stringify(obj));
			if (callback) {
				callback(obj);
				return;
			}



		});
	});

	return;

	request.get('http://demym.altervista.org/' + fname, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			var xml = body;
			//console.log(xml);
			fs.writeFile(fname, xml, function (err) {
				if (err) {
					return console.log(err, message);

				}

				console.log("Remote file " + fname + " was saved!");


				fs.readFile(fname, "utf-8", function (err, data) {
					//console.log("Read file "+fname);
					//atleti=xmlToJson(data);
					//console.log(atleti);
					//atleti =  JSON.parse(data, 'utf8');
					//console.log('Read file atleti.json: '+atleti.length);

					//console.log(data);
					//console.log(data);


					parser.parseString(data, function (err, result) {
						//console.log(JSON.stringify(result));
						if (err) console.log("Error parsing XML: " + err);
						//console.log(result);

						atleti = result;
						//console.log(JSON.stringify(atleti));
						atleti = xform(atleti);
						atleti.rows.sort(function (a, b) {
							var a1 = a.doc.cognome.trim();
							var b1 = b.doc.cognome.trim();
							if (a1 > b1) return 1;
							if (a1 < b1) return -1;
							return 0;
						})
						fs.writeFile('data/atleti.json', JSON.stringify(atleti), function (err) {
							if (err) return console.log(err);
							console.log('File atleti.json saved on server');
							var dat = require('../data/atleti.json');
							console.log(dat.rows.length);
						});
						console.log("Loaded " + result.atleti.atleta.length + " atleti");
						callback();
						//atleti=result;
						//console.log(employees);
						//console.log('Read file atleti.xml: '+atleti.length);
					});
				});


			});
		}
	});
}

router.get("/prova", function (req, res) {
	//saveToAltervista();
	var filter = {
		//'filename': 'atleti.json',
		'cognome': 'Mort',
		'nome': 'e'





	}
	mongo.findRecords("atleti.json", filter, function (data) {
		res.send(data);

	})


})

//readAtleti(function() {});

router.get('/findall', function (req, res) {
	var societa = "";
	if (req.query) {
		if (req.query.societaid) societa = req.query.societaid;

	}
	console.log("called atleti findall for societa " + societa);
	readAtleti(function () {
		findAll(societa, function (obj) {
			//console.log("###### users ( /getAllAssets route ) -->  " + JSON.stringify(obj));
			res.send(obj);
		});

	});

});

router.get('/updatesocietarozzano', function (req, res) {
	console.log("called atleti findall");
	res.send("funzione disattivata");
	/*
	 mongo.updateAll("atleti.json",{ doc: {societaid: "20160217220400"}},function(data){
			  console.log("atleta updated");
			  //ressent=true;
			  //row.doc.action="updated";
			  res.send(data);
		
	})*/

});

router.get('/findByName/:nome', function (req, res) {
	console.log("called atleti findByName");
	var nome = req.params.nome;
	//res.send(risp);
	findByName(nome, function (obj) {
		res.send(obj);
	});


});

router.get('/findById/:id', function (req, res) {
	console.log("called atleti findById");
	var id = req.params.id;
	//res.send(risp);
	findById(id, function (obj) {
		console.log("got data " + JSON.stringify(obj));
		res.send(obj);
	});


});


router.post('/add', function (req, res) {
	var body = req.body;
	var row = {};
	row.doc = body;

	var today = new Date();
	var id = today.julian();
	console.log("adding new atleta id: " + id);
	row.doc.id = id;

	if (usemongo) {
		mongo.addRecord("atleti.json", id, row, function (data) {

			row.doc.action = "added";
			console.log("added atleta ");
			res.send(row);

		})
	}

	return;

	//console.log("adding following gara: "+JSON.stringify(doc));

	//console.log("adding new gara with id="+id);

	//console.log("called gare findall");
	atleti.rows.push(row);
	//console.log("********gare after add: "+JSON.stringify(gare));

	fs.writeFile('data/atleti.json', JSON.stringify(atleti), function (err) {
		if (err) return console.log(err);
		console.log('File atleti.json saved on server');
		var dat = require('../data/atleti.json');
		console.log(dat.rows.length);
		var fullUrl = req.protocol + '://' + req.get('host');
		saveToAltervista(fullUrl + "/atleti/findall", "atleti.json");
		// saveToAltervista2("atleti.json");

	});

	/*
	var mfname="matches_"+id+".json";
	var m={rows:[]};	
	
	fs.writeFile(mfname, JSON.stringify(m), function (err) {
          if (err) return console.log(err);
          console.log('File '+mfname+' saved on server');
		  var dat = require('../'+mfname);
		  console.log(dat.rows.length);
		  
		  
        });
		
	var cfname="cronaca_"+id+".json";
	
	
	fs.writeFile(cfname, JSON.stringify(m), function (err) {
          if (err) return console.log(err);
          console.log('File '+cfname+' saved on server');
		  var dat = require('../'+cfname);
		  console.log(dat.rows.length);
		  
		  
        });
	
	*/

	row.doc.action = "added";


	// res.send(row)	


});



router.post('/update/:id', function (req, res) {
	var body = req.body;
	console.log(body)
	var id = req.params.id;
	var row = {};
	row.doc = body;

	if (usemongo) {
		mongo.updateRecord("atleti.json", id, row, function (data) {
			console.log("atleta updated");
			//ressent=true;
			row.doc.action = "updated";
			res.send(row);

		})

	}

	return;

	var today = new Date();
	//var id=today.julian();

	for (var i = 0; i < atleti.rows.length; i++) {
		var row = atleti.rows[i];
		var doc = row.doc;
		var aid = doc.id;
		console.log(aid + " - " + id)
		if (aid == id) {
			body.id = id;
			atleti.rows[i].doc = body;
			console.log("Updated atletaid " + aid)
			console.log(doc)
		}



	}
	//console.log("adding new atleta id: "+id);
	//row.doc.id=id;

	//console.log("adding following gara: "+JSON.stringify(doc));

	//console.log("adding new gara with id="+id);

	//console.log("called gare findall");
	//atleti.rows.push(row);
	//console.log("********gare after add: "+JSON.stringify(gare));

	fs.writeFile('data/atleti.json', JSON.stringify(atleti), function (err) {
		if (err) return console.log(err);
		console.log('File atleti.json saved on server');
		var dat = require('../data/atleti.json');
		console.log(dat.rows.length);
		var fullUrl = req.protocol + '://' + req.get('host');
		saveToAltervista(fullUrl + "/atleti/findall", "atleti.json");


	});

	/*
	var mfname="matches_"+id+".json";
	var m={rows:[]};	
	
	fs.writeFile(mfname, JSON.stringify(m), function (err) {
          if (err) return console.log(err);
          console.log('File '+mfname+' saved on server');
		  var dat = require('../'+mfname);
		  console.log(dat.rows.length);
		  
		  
        });
		
	var cfname="cronaca_"+id+".json";
	
	
	fs.writeFile(cfname, JSON.stringify(m), function (err) {
          if (err) return console.log(err);
          console.log('File '+cfname+' saved on server');
		  var dat = require('../'+cfname);
		  console.log(dat.rows.length);
		  
		  
        });
	
	*/

	row.doc.action = "added";


	//res.send(row)	


});


router.post('/delete', function (req, res) {
	var body = req.body;
	var id = body.id;
	var rev = body.id;

	console.log("trying to delete atletaid ", id);


	if (usemongo) {
		mongo.deleteRecord("atleti.json", id, function (data) {
			console.log("deleted");
			//ressent=true;
			res.send(data);

		})

	}

	return;
	/*
	for (var i=0; i<gare.rows.length; i++)
	{
	 var gid=gare.rows[i].doc.id;
     if (gid==id) {
		 gare.rows.splice(i, 1);
	 }	 
		
		
	}
	
	fs.writeFile('data/gare.json', JSON.stringify(gare), function (err) {
          if (err) return console.log(err);
          console.log('File gare.json saved on server');
		  var dat = require('../data/gare.json');
		  console.log(dat.rows.length);
		  var fullUrl = req.protocol + '://' + req.get('host');
		  saveToAltervista(fullUrl+"/gare/findall","gare.json");
        });
	
	
	var ret={};
	ret.action="deleted";
	ret.id=id;
	
	
	
    res.send(ret)	
		*/

});


router.get("/history/:atletaid", function (req, res) {
	var atletaid = req.params.atletaid;

	getAtletaHistory(atletaid, function (data) {

		res.send(data);

	})


})


//get plain ranking
router.get("/ranking", function (req, res) {
	getRanking(function (data) {
		res.send(data)
	});

})

router.get("/rankingnew/:stagione", function (req, res) {
	var stagione = req.params.stagione;
	var format = "";
	if (req.query.format) format = req.query.format;
	var retarr = [];
	var pos=0;
	getRankingNew(stagione, function (data) {
		data.rows.forEach(function (item, idx) {
			var doc = item.doc;
			var rs = doc.ranking[stagione];
			
			var newr = {
				pos: idx+1,
				atleta: doc.cognome + " " + doc.nome,
				atletaid: doc.id,
				cognome: doc.cognome,
				nome: doc.nome,
				pt: rs.pt,
				oro: rs.oro,
				arg: rs.arg,
				bro: rs.bro,
				disputati: rs.disputati,
				gare_regionali: rs.gare_regionali,
				gare_interregionali: rs.gare_interregionali,
				gare_nazionali: rs.gare_nazionali,
				gare_internazionali: rs.gare_internazionali,
				gare: rs.gare,
				vinti: rs.vinti,
				bonusmalus: rs.bonusmalus,
				ptb: rs.ptb
			}
			retarr.push(newr);

		})
		if (format == "html") {
			var nextstagione = String(parseInt(stagione, 10) + 1);
			var html = "<div style='font-style: bold'>RANKING STAGIONE " + stagione + "/" + nextstagione + "</div><table style='font-size: 13px;' border=1 width=100%><tr><th>&nbsp;</th><th>Atleta</th><th>Punti</th><th>ORO</th><th>ARG</th><th>BRO</th><th>M.disputati</th><th>M.vinti</th><th>Regionali</th><th>Interregionali</th><th>Nazionali</th><th>Internazionali</th><th>Gare</th></tr>"
			retarr.forEach(function (item, idx) {
				html += "<tr><td>"+item.pos+"</td><td>" + item.atleta + "</td><td>" + item.pt + "</td><td>" + item.oro + "</td><td>" + item.arg + "</td><td>" + item.bro + "</td><td>" + item.disputati + "</td><td>" + item.vinti + "</td><td>"+item.gare_regionali+"</td><td>"+item.gare_interregionali+"</td><td>"+item.gare_nazionali+"</td><td>"+item.gare_internazionali+"</td><td style='font-size:11px'>"+item.gare.join(", ")+"</td></tr>"
			})
			html += "</table>"
			res.send(html);
			return;
		} else res.send(retarr)
	});

})


//get ranking calculating plus,minus and equals
router.get("/ranking/save", function (req, res) {

	mongo.getfile("ranking.json", function (rdata) {

		//console.log("ranking.json data", rdata);


		rdata.rows.sort(function (a, b) {
			var a1 = a.date;
			var b1 = b.date;
			if (a1 > b1) return -1;
			if (a1 < b1) return 1;
			return 0;
		})

		getRanking(function (data) {

			var today = new Date();
			var id = today.julian();

			var lastrows = [];

			if (rdata.rows.length > 0) { //aggiunge ranking
				lastrows = rdata.rows[0].ranking.rows;


				var rankconfr = rdata.rows[0].ranking.rows;

				console.log("rankconfr", rankconfr.length);
				console.log("data", data.rows.length);


				var rkchanged = false;
				data.rows.forEach(function (item, idx) {
					var rtkdr = parseInt(item.doc.ranking_tkdr, 10);
					var aid = item.doc.id;
					rankconfr.forEach(function (ritem, ridx) {
						var raid = ritem.doc.id;
						var atletachanged = false;
						if (raid == aid) {
							var rrtkdr = parseInt(ritem.doc.ranking_tkdr, 10);
							item.doc.segno = "equal";
							if (rrtkdr < rtkdr) {
								item.doc.segno = "plus";
								rkchanged = true;
								atletachanged = true;
							}
							if (rrtkdr > rtkdr) {
								item.doc.segno = "minus";
								rkchanged = true;
								atletachanged = true;
							}
							if (atletachanged) console.log("rankchange for atleta !", item.doc.nome, item.doc.cognome, item.doc.ranking_tkdr, rrtkdr, item.doc.segno);

						}

					})




				})

				if (rkchanged) {
					console.log("rankings found, and it is different from current, adding last one");
					var newranking = {
						date: id,
						ranking: data
					}

					mongo.addRecord("ranking.json", id, newranking, function (rr) {
						console.log("new ranking added to ranking.json ")
						res.send(data);
					})


				} else {
					console.log("no changes found with last ranking ")

					res.send(data);
				}

				//data.lastrows=lastrows;
				//res.send(data);



			} else {


				console.log("no rankings found, adding last one");


				var newranking = {
					date: id,
					ranking: data
				}

				mongo.addRecord("ranking.json", id, newranking, function (rr) {
					console.log("new ranking added to ranking.json ")
					//data.lastrows=lastrows;
					res.send(data);
				})


			}






		})



	})




})

router.get("/ranking/html", function (req, res) {

	getRanking(function (data) {

		res.send(renderRanking(data));

	})


})

router.post("/login", function (req, res) {
	var ret = {
		"loggedin": "false"
	};

	res.send(ret);
})


router.post('/loginold', function (req, res) {
	//var em=req.body.email;
	//var pw=req.body.password;
	var role = "tkdruser";

	var ret = {
		"loggedin": "false"
	};

	var adminpsw = "Ser07glr,Taeguk,Masterkwondo";


	var auth = req.body.authorization;
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
	/*
	if  ((em=="demykwondo") && (pw=="Ser07glr"))
	{
	 ret={"loggedin": "true", role:"tkdradmin"};	
	 role="tkdradmin";	
	}
	if  ((em=="tempioadmin") && (pw=="taeguk"))
	{
	 ret={"loggedin": "true", role:"tkdradmin"};	
	 role="tkdradmin";	
	}*/


	var arrpsw = adminpsw.split(",");



	if (arrpsw.indexOf(pw) > -1) {
		ret = {
			"loggedin": "true",
			role: "tkdradmin",
			"email": em,
			"nickname": em
		};
		role = "tkdradmin";

	}


	if (pw == "ondablu") {
		ret = {
			"loggedin": "true",
			"email": em,
			"nickname": em,
			role: "tkdruser"
		};
		role = "tkdruser";
	}

	utils.colog("user " + em + " trying to login");
	utils.colog(ret);


	if (ret.loggedin) {

		var tokenv4 = uuid.v4();
		var token = jwt.sign(em, superSecret
			/*,{
			                  expiresIn: "1 days" 
			       }*/
		);
		ret.token = token;

	}

	res.send(ret);

});


function findByName(nome, callback) {

	console.log('atleti findByName=' + nome);
	if (nome) {
		var results = atleti.filter(function (element) {
			var fullName = element.cognome + " " + element.nome;
			//console.log(fullName);
			var retval = (fullName.toLowerCase().indexOf(nome.toLowerCase()) > -1);
			if (retval) console.log("--- " + fullName);
			return retval;
		});
		results.sort(function (a, b) {
			var a1 = a.cognome;
			console.log(a1);
			var b1 = b.cognome;
			if (a1 > b1) return 1;
			if (a1 < b1) return -1;
			return 0;
		});
		console.log("found " + results.length + " results");
		callback(results);
		//res.send(results);
	} else {
		callback({
			error: "not found nome " + nome
		});
	}
};


function findById(id, callback) {
	//var id = req.params.id;

	console.log('findAtletaById: ' + id);
	mongo.getfile("atleti.json", function (atleti) {
		//console.log(JSON.stringify(atleti));
		console.log("atleti totali: " + atleti.rows.length);
		var found = false;
		var data = {
			"rows": []
		}
		if (id) {
			for (var i = 0; i < atleti.rows.length; i++) {
				var doc = atleti.rows[i].doc;
				//console.log(id+" - "+doc.id)
				if (id == doc.id) {
					var docu = {
						"doc": doc
					};
					data.rows.push(docu);
					callback(data);
					found = true;
					return;
				}

			}
			if (!found) {
				data.error = true;
				data.errormessage = "id " + id + " not found";
				callback(data)
				return;
			}
		}
		data.error = true;
		data.errormessage = "id not specified";
		callback(data)
		return;
	})

};


function findById_old(id, callback) {
	//var id = req.params.id;

	console.log('findAtletaById: ' + id);
	console.log("atleti totali: " + atleti.length);
	if (id) {
		var results = atleti.filter(function (element) {
			var aid = element.id;
			//console.log(aid);
			var fullName = element.cognome + " " + element.nome;
			if (id == aid) {
				console.log("--- " + fullName);
				return true;

			}
			return false;
		});
		console.log("Found " + results.length + " results");
		var data = xform(results);
		callback(data);
	} else {
		callback({
			error: "not found id " + id
		});
	}
};


function findAll(societa, callback) {
	console.log('atleti findAll for societa ' + societa);

	/*atleti.sort(function(a,b) {
		    var a1=a.cognome[0];
			//console.log(a1);
			var b1=b.cognome[0];
			if (a1>b1) return 1;
			if (a1<b1) return -1;
			return 0;
		});
		*/
	//console.log(JSON.stringify(atleti))

	//var data=xform(atleti);
	mongo.getfile("atleti.json", function (atleti) {
		var data = atleti;
		var data2 = {
			rows: []
		}

		if (societa.trim() != "") {
			for (var i = 0; i < data.rows.length; i++) {

				var doc = data.rows[i].doc;

				if (doc.societaid) {
					var soc = doc.societaid;
					if (soc.trim() == societa.trim()) data2.rows.push(data.rows[i])


				}



			}


		} else data2 = data;

		data2.rows.sort(function (a, b) {

			var a1 = a.doc.cognome;
			var b1 = b.doc.cognome;
			if (a1 > b1) return 1;
			if (a1 < b1) return -1;
			return 0;
		})



		callback(data2);
	});
	//res.render('lv_atleti.ejs',{ posts: atleti});
	// res.send(atleti);
};

function loadJSONfile(filename, encoding) {
	try {
		// default encoding is utf8
		if (typeof (encoding) == 'undefined') encoding = 'utf8';

		// read file synchroneously
		var contents = fs.readFileSync(filename, encoding);

		console.log(contents);

		// parse contents as JSON
		//return JSON.parse(contents);
		return contents

	} catch (err) {
		// an error occurred
		throw err;
	}
} // loadJSONfile


// Changes XML to JSON
function xmlToJson(xml) {

	// Create the return object
	var obj = {};

	if (xml.nodeType == 1) { // element
		// do attributes
		if (xml.attributes.length > 0) {
			obj["@attributes"] = {};
			for (var j = 0; j < xml.attributes.length; j++) {
				var attribute = xml.attributes.item(j);
				obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
			}
		}
	} else if (xml.nodeType == 3) { // text
		obj = xml.nodeValue;
	}

	// do children
	if (xml.hasChildNodes()) {
		for (var i = 0; i < xml.childNodes.length; i++) {
			var item = xml.childNodes.item(i);
			var nodeName = item.nodeName;
			if (typeof (obj[nodeName]) == "undefined") {
				obj[nodeName] = xmlToJson(item);
			} else {
				if (typeof (obj[nodeName].push) == "undefined") {
					var old = obj[nodeName];
					obj[nodeName] = [];
					obj[nodeName].push(old);
				}
				obj[nodeName].push(xmlToJson(item));
			}
		}
	}
	return obj;
}


function renderHtm(res) {
	var htm = "<ul data-role='listview' />";
	var results = res.filter(function (element) {
		htm += "<li>" + element.cognome + " " + element.nome + "</li>";
	});
	htm += "</ul>";
	return htm;
}


function xform(d) {
	var data = {
		rows: []
	};

	for (var i = 0; i < d.atleti.atleta.length; i++) {
		var doc = {};
		var p = d.atleti.atleta[i];
		var element = {}
		for (var key in p) {
			if (p.hasOwnProperty(key)) {
				//console.log("key: "+key+"   value: "+p[key]);
				element[key] = p[key][0];
			}
		}
		doc = {
			doc: element
		};
		data.rows[i] = doc;

	}

	return data;

}



function saveToAltervista(finto, filename) {
	var dat; // = require('../data/'+filename);

	fs.readFile('./data/' + filename, 'utf8', function (err, data) {
		if (err) throw err;
		console.log(data)
		dat = JSON.parse(data);

		console.log("savetoaltervista filename: " + filename);
		var headers = {
			'User-Agent': 'Super Agent/0.0.1',
			'Content-Type': 'application/jsonrequest'
		}

		// Configure the request
		var options = {
			url: altervistaurl + '/savefile2.php',
			method: 'POST',
			headers: headers,
			dataType: "json",
			form: {
				'filename': filename,
				'fdata': JSON.stringify(dat)
			}
		}
		console.log(options.url)
		// Start the request
		request(options, function (error, response, body) {
			if (!error && response.statusCode == 200) {
				// Print out the response body
				console.log(body)
				console.log("file " + filename + " saved on altervista");
			}
			if (error) {
				console.log(error);
			}

		})
	});

}

function saveToAltervistaold(path, fname) {
	var url = altervistaurl + "/savefile.php?url=" + path + "&filename=" + fname;

	console.log("saving to altervista at url: " + url);
	request.get(url, function (error, response, body) {
		console.log(body);

	});


	//new try




}


function getLocalMongo(struct, fname) {

	var retvalue = {};
	for (var i = 0; i < struct.length; i++) {

		var s = struct[i];
		var fn = s.filename;
		if (fn.toLowerCase() == fname.toLowerCase()) {
			retvalue = s.filecontent;
			return retvalue;
		}

	}

	return retvalue;
}


function getAtletaHistory(atletaid, callback) {

	var allfiles;
	mongo.getallfiles(function (alldata) {
		allfiles = alldata;
		var atleti_json = getLocalMongo(allfiles, "atleti.json");
		var gare_json = getLocalMongo(allfiles, "gare.json");

		for (var i = 0; i < atleti_json.rows.length; i++) {
			var atl = atleti_json.rows[i].doc;
			if (atl.id == atletaid) {
				console.log("Found atletaid " + atletaid);
				callback(atl);
			}
		}

	});

}

function getRanking(callback) {

	var allfiles;
	mongo.getallfiles(function (alldata) {
		allfiles = alldata;







		var atleti_json;
		var gare_json;
		//var anno=$("#page_ranking #selanno").val();

		var annotext = "";

		//if (anno.trim()!="") annotext=" per l'anno "+anno;



		var txt = "Calcolo ranking TKDR " + annotext + " in corso....";
		//$("#page_ranking #ranking").html(txt);
		//progressStart(txt);

		atleti_json = getLocalMongo(allfiles, "atleti.json");
		gare_json = getLocalMongo(allfiles, "gare.json");

		console.log("atleti:" + atleti_json.rows.length)
		console.log("gare:" + gare_json.rows.length)

		for (var y = 0; y < gare_json.rows.length; y++) {
			//$(gare_json.rows).each(function(y){	

			var gara = gare_json.rows[y].doc;
			var gid = gara.id;
			var fname = "matches_" + gid + ".json";
			//console.log("extrating matches from gara "+gid)
			var mdata = getLocalMongo(allfiles, fname);

			if (!mdata.rows) mdata.rows = [];
			console.log("matches for gara " + gid + ": " + mdata.rows.length);

			gare_json.rows[y].doc.matches = mdata;
		}



		for (var i = 0; i < atleti_json.rows.length; i++) {

			var atleta = atleti_json.rows[i].doc;
			var dn = atleta.datanascita;
			//var categoria=getCategoria(dn,true);

			var doItCateg = true;



			if (doItCateg) {

				atleti_json.rows[i].doc.ranking_tkdr = 0;
				atleti_json.rows[i].doc.ori = 0;
				atleti_json.rows[i].doc.argenti = 0;
				atleti_json.rows[i].doc.bronzi = 0;
				atleti_json.rows[i].doc.garedisputate = 0;
				atleti_json.rows[i].doc.matchdisputati = 0;
				atleti_json.rows[i].doc.matchvinti = 0;

				//console.log("calcolo ranking per "+atleta.cognome+" "+atleta.nome);

				if (gare_json.rows) {

					for (var j = 0; j < gare_json.rows.length; j++) {
						//$(gare_json.rows).each(function(j){

						//console.log("examination of gara n. "+j)


						var gara = gare_json.rows[j].doc;
						//console.log("gara ", gara);
						var garaid = gara.id;
						var data = gara.data;

						var doItAnno = true;

						/*
						if (anno=="") {
							doItAnno=true; 
						} else {
							if (data.indexOf("/"+anno)>-1) doItAnno=true;
							
						}	*/

						if (doItAnno) {

							var matches_json = gare_json.rows[j].doc.matches;
							var found = false;

							for (var x = 0; x < matches_json.rows.length; x++) {
								//$(matches_json.rows).each(function(x){
								// console.log("match n. "+x);
								if (matches_json.rows[x]) {
									var match = matches_json.rows[x].doc;

									var aid = match.atletaid;



									if (aid == atleta.id) {

										if (match.disputato) {
											if (match.disputato == "yes") {
												atleti_json.rows[i].doc.matchdisputati++;
												atleti_json.rows[i].doc.ranking_tkdr += 1;
												if (match.vinto) {
													if (match.vinto == "yes") {
														atleti_json.rows[i].doc.ranking_tkdr += 1;
														atleti_json.rows[i].doc.matchvinti++;
													}
												}
											}
										}


										found = true;
										if (match.medagliamatch) {
											var medaglia = match.medagliamatch.toLowerCase();

											if (medaglia == "oro") {
												atleti_json.rows[i].doc.ranking_tkdr += 7;
												atleti_json.rows[i].doc.ori++;
											}

											if (medaglia == "argento") {
												atleti_json.rows[i].doc.ranking_tkdr += 3;
												atleti_json.rows[i].doc.argenti++;
											}

											if (medaglia == "bronzo") {
												atleti_json.rows[i].doc.ranking_tkdr += 1;
												atleti_json.rows[i].doc.bronzi++;

											}
										}

									}



								}
							}





							if (found == true) atleti_json.rows[i].doc.garedisputate++;
						}


					}



				}

			}
		}

		//console.log(atleti_json);


		atleti_json.rows.sort(function (a, b) {

			var a1 = a.doc.ranking_tkdr;
			var b1 = b.doc.ranking_tkdr;
			if (a1 > b1) return -1;
			if (a1 < b1) return 1;
			return 0;


		})

		atleti_json.rows.forEach(function (item, idx) {
			item.doc.segno = "equal";
		})

		//callback(atleti_json)
		callback(atleti_json);
		//var html= new EJS({url: 'tpl/ranking.ejs'}).render(atleti_json.rows); 

		//$("#page_ranking #ranking").html(html);
		//progressStop();






	});


}

function renderRanking(json) {
	var htm = "<table border=1 width=98%>";
	for (var i = 0; i < json.rows.length; i++) {
		var row = json.rows[i].doc;
		var n = parseInt(i, 10) + 1;
		htm += "<tr><td width=1%>" + n + "</td><td>" + row.cognome + " " + row.nome + "</td><td>" + row.ranking_tkdr + "</td></tr>";


	}
	htm += "</table>"
	return htm;



}

function getRankingNew(stagione, callback) {

	var allfiles;
	mongo.getallfiles(function (alldata) {
		allfiles = alldata;







		var atleti_json;
		var gare_json;
		//var anno=$("#page_ranking #selanno").val();

		var annotext = "";

		//if (anno.trim()!="") annotext=" per l'anno "+anno;



		var txt = "Calcolo ranking TKDR " + annotext + " in corso....";
		//$("#page_ranking #ranking").html(txt);
		//progressStart(txt);

		atleti_json = getLocalMongo(allfiles, "atleti.json");
		gare_json = getLocalMongo(allfiles, "gare.json");

		console.log("atleti:" + atleti_json.rows.length)
		console.log("gare:" + gare_json.rows.length)

		for (var y = 0; y < gare_json.rows.length; y++) {
			//$(gare_json.rows).each(function(y){	

			var gara = gare_json.rows[y].doc;
			var gid = gara.id;
			var regionegara = "regionale";
			if (gara.hasOwnProperty("regionalita")) regionegara = gara.regionalita;
			var fname = "matches_" + gid + ".json";
			//console.log("extrating matches from gara "+gid)
			var mdata = getLocalMongo(allfiles, fname);

			if (!mdata.rows) mdata.rows = [];
			console.log("matches for gara " + gid + ": " + mdata.rows.length);

			gare_json.rows[y].doc.matches = mdata;
		}



		for (var i = 0; i < atleti_json.rows.length; i++) {

			var atleta = atleti_json.rows[i].doc;
			var dn = atleta.datanascita;
			//var categoria=getCategoria(dn,true);

			var doItCateg = true;



			if (doItCateg) {

				atleti_json.rows[i].doc.ranking_tkdr = 0;
				atleti_json.rows[i].doc.ori = 0;
				atleti_json.rows[i].doc.argenti = 0;
				atleti_json.rows[i].doc.bronzi = 0;
				atleti_json.rows[i].doc.garedisputate = 0;
				atleti_json.rows[i].doc.matchdisputati = 0;
				atleti_json.rows[i].doc.matchvinti = 0;
				atleti_json.rows[i].doc.ranking = {};
				var bonusmalus=0;
				if (atleti_json.rows[i].doc.hasOwnProperty("bonusmalus")) bonusmalus=atleti_json.rows[i].doc.bonusmalus;
				atleti_json.rows[i].doc.ranking[stagione] = {
					pt: 0,
					oro: 0,
					arg: 0,
					bro: 0,
					disputati: 0,
					vinti: 0,
					gare_regionali: 0,
					gare_interregionali: 0,
					gare_nazionali: 0,
					gare_internazionali: 0,
					gare: [],
					bonusmalus:  bonusmalus,
					ptb: 0

				};

				//console.log("calcolo ranking per "+atleta.cognome+" "+atleta.nome);

				if (gare_json.rows) {

					for (var j = 0; j < gare_json.rows.length; j++) {
						//$(gare_json.rows).each(function(j){

						//console.log("examination of gara n. "+j)


						var gara = gare_json.rows[j].doc;
						//console.log("gara ", gara);
						var garaid = gara.id;
						var data = gara.data;

						var doItAnno = true;

						/*
						if (anno=="") {
							doItAnno=true; 
						} else {
							if (data.indexOf("/"+anno)>-1) doItAnno=true;
							
						}	*/



						if (doItAnno) {

							var matches_json = gare_json.rows[j].doc.matches;
							var found = false;



							var isInGara = false;

							for (var x = 0; x < matches_json.rows.length; x++) {
								//$(matches_json.rows).each(function(x){
								// console.log("match n. "+x);
								if (matches_json.rows[x]) {
									var match = matches_json.rows[x].doc;
									var garaid = match.garaid;
									var refdate = garaid.substring(0, 6);

									var stagioneend = String(parseInt(stagione, 10) + 1);
									if ((refdate >= (stagione + "09")) && (refdate <= (stagioneend + "08"))) {
										var aid = match.atletaid;



										if (aid == atleta.id) {

											if (match.disputato) {
												if (match.disputato == "yes") {

													isInGara = true;
													atleti_json.rows[i].doc.ranking[stagione].disputati++;
													atleti_json.rows[i].doc.ranking[stagione].pt += 1;
													if (match.vinto) {
														if (match.vinto == "yes") {
															atleti_json.rows[i].doc.ranking[stagione].pt += 1;
															atleti_json.rows[i].doc.ranking[stagione].vinti++;
														}
													}
												}
											}


											found = true;
											if (match.medagliamatch) {
												var medaglia = match.medagliamatch.toLowerCase();


												if (medaglia == "oro") {
													if (regionegara == "regionale") atleti_json.rows[i].doc.ranking[stagione].pt += 5;
													if (regionegara == "interregionale") atleti_json.rows[i].doc.ranking[stagione].pt += 10;
													if (regionegara == "nazionale") atleti_json.rows[i].doc.ranking[stagione].pt += 15;
													if (regionegara == "internazionale") atleti_json.rows[i].doc.ranking[stagione].pt += 20;
													atleti_json.rows[i].doc.ranking[stagione].oro++;

												}

												if (medaglia == "argento") {
													if (regionegara == "regionale") atleti_json.rows[i].doc.ranking[stagione].pt += 3;
													if (regionegara == "interregionale") atleti_json.rows[i].doc.ranking[stagione].pt += 6;
													if (regionegara == "nazionale") atleti_json.rows[i].doc.ranking[stagione].pt += 12;
													if (regionegara == "internazionale") atleti_json.rows[i].doc.ranking[stagione].pt += 15;
													atleti_json.rows[i].doc.ranking[stagione].arg++;

												}

												if (medaglia == "bronzo") {
													if (regionegara == "regionale") atleti_json.rows[i].doc.ranking[stagione].pt += 1;
													if (regionegara == "interregionale") atleti_json.rows[i].doc.ranking[stagione].pt += 2;
													if (regionegara == "nazionale") atleti_json.rows[i].doc.ranking[stagione].pt += 6;
													if (regionegara == "internazionale") atleti_json.rows[i].doc.ranking[stagione].pt += 8;
													atleti_json.rows[i].doc.ranking[stagione].bro++;

												}
											}

										}
									}



								}
							}





							if (found == true) {
								atleti_json.rows[i].doc.garedisputate++;
								atleti_json.rows[i].doc.ranking[stagione].ptb=atleti_json.rows[i].doc.ranking[stagione].pt+atleti_json.rows[i].doc.ranking[stagione].bonusmalus
								var rgara = "regionale";
								if (gare_json.rows[j].doc.regionalita) {
									if (gare_json.rows[j].doc.regionalita == "regionale") atleti_json.rows[i].doc.ranking[stagione].gare_regionali++
									if (gare_json.rows[j].doc.regionalita == "interregionale") atleti_json.rows[i].doc.ranking[stagione].gare_interregionali++
									if (gare_json.rows[j].doc.regionalita == "nazionale") atleti_json.rows[i].doc.ranking[stagione].gare_nazionali++
									if (gare_json.rows[j].doc.regionalita == "internazionale") atleti_json.rows[i].doc.ranking[stagione].gare_internazionali++
								}
								atleti_json.rows[i].doc.ranking[stagione].gare.push(gare_json.rows[j].doc.title+ " "+gare_json.rows[j].doc.data+" "+gare_json.rows[j].doc.regionalita)
							}
						}


					}



				}

			}
		}

		//console.log(atleti_json);


		atleti_json.rows.sort(function (a, b) {

			var a1 = a.doc.ranking[stagione].pt;
			var b1 = b.doc.ranking[stagione].pt;
			if (a1 > b1) return -1;
			if (a1 < b1) return 1;
			return 0;


		})

		atleti_json.rows.forEach(function (item, idx) {
			item.doc.segno = "equal";
		})

		//callback(atleti_json)
		callback(atleti_json);
		//var html= new EJS({url: 'tpl/ranking.ejs'}).render(atleti_json.rows); 

		//$("#page_ranking #ranking").html(html);
		//progressStop();






	});


}


Object.prototype.equals = function (b) {
	var a = this;
	for (i in a) {
		if (typeof b[i] == 'undefined') {
			return false;
		}
		if (typeof b[i] == 'object') {
			if (!b[i].equals(a[i])) {
				return false;
			}
		}
		if (b[i] != a[i]) {
			return false;
		}
	}
	for (i in b) {
		if (typeof a[i] == 'undefined') {
			return false;
		}
		if (typeof a[i] == 'object') {
			if (!a[i].equals(b[i])) {
				return false;
			}
		}
		if (a[i] != b[i]) {
			return false;
		}
	}
	return true;
}


module.exports = router;