var express = require('express');
var router = express.Router();
var request = require('request');
var utils = require("../routes/utils");
var usemongo = true;
var usealtervista = false;
var altervistadataurl = "http://demym.altervista.org/herokudata/";
var fs = require('fs'),
	xml2js = require('xml2js');

var mongo = require('../routes/mongo');
var matches = require('../routes/matches');
var debug = false;


var gare;
var alterbridge = false;

var parser = new xml2js.Parser();
var fname = "gare.xml";
var jfname = "gare.json";
//var altervistaurl="http://localhost:90/tkdr";
var altervistaurl = "http://demym.altervista.org";
//var atleti = loadJSONfile(__dirname + '/atleti.json');
//console.log(atleti.length);



function colog(txt) {
	if (debug) console.log(txt);

}

function getAtletaById(id, atleti) {
	var ret = {};
	for (var i = 0; i < atleti.rows.length; i++) {

		if (atleti.rows[i].doc.id == id) {
			ret = atleti.rows[i].doc;
			return ret;
		}

	}
	return ret;


}


function readGareMongo(callback) {
	mongo.getfile(jfname, function (data) {
		//console.log(data.rows.length);
		gare = data;
		utils.colog("read gare from mongo " + jfname + " :   " + gare.rows.length);
		callback();

	})


}

function readGareAltervista(callback) {

	utils.colog("readGareAltervista")
	var fname = "gare.json";
	request.get(altervistadataurl + fname, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			var data = JSON.parse(body);

			gare = data;
			utils.colog("read gare from altervista " + fname + " :   " + gare.rows.length);
			callback(gare);

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


function readGareJson(callback) {
	if (usemongo) {
		readGareMongo(callback);
	} else if (usealtervista) {
		readGareAltervista(callback);
	} else {

		//console.log("readGareJson")
		var fname = "data/gare.json";
		fs.readFile(fname, "utf-8", function (err, data) {
			//console.log("Read file "+fname);
			gare = JSON.parse(data);
			//atleti=xmlToJson(data);
			//console.log(atleti);
			//atleti =  JSON.parse(data, 'utf8');
			//console.log('Read file atleti.json: '+atleti.length);
			utils.colog("read gare from file " + fname + " :   " + gare.rows.length);
			callback();
			//console.log(data);
		});

	}


}

function readGare(callback) {

	request.get('http://demym.altervista.org/' + fname, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			var xml = body;
			//console.log(xml);
			fs.writeFile(fname, xml, function (err) {
				if (err) {
					return console.log(err);

				}

				utils.colog("Remote file " + fname + " was saved!");


				fs.readFile(fname, "utf-8", function (err, data) {
					utils.colog("Read file " + fname);
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

						//atleti=result.gare.gara;
						gare = result;
						//console.log(JSON.stringify(gare));
						gare = xform(gare);
						fs.writeFile('data/gare.json', JSON.stringify(gare), function (err) {
							if (err) return console.log(err);
							utils.colog('File gare.json saved on server');
							var dat = require('../data/gare.json');
							utils.colog(dat.rows.length);
						});

						//console.log('Require:', dat);
						//var dat=JSON.parse(loadJSONfile("gare.json"));
						//console.log(dat.rows.length)
						/*)
						fs.readFile("gare.json","utf-8",function(err,data){
							if (err) return console.log(err);
							console.log(data.length);
							console.log(JSON.stringify(data));
						})
						*/
						utils.colog("Loaded " + result.gare.gara.length + " gare");
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

if (alterbridge) {
	readGare(function () {});
} else {
	readGareJson(function () {});
}


function getmatchescombo(garaid, arr) {
	for (var i = 0; i < arr.length; i++) {

		var fname = "matches_" + garaid + ".json";
		if (arr[i].filename == fname) {

			return arr[i].filecontent
		}


	}



}

function getfilecombo(filename, arr) {
	for (var i = 0; i < arr.length; i++) {

		var fname = filename + ".json";
		if (arr[i].filename == fname) {

			return arr[i].filecontent
		}


	}



}



router.get('/history/:atletaid', function (req, res) {

	var ori = 0;
	var arg = 0;
	var bro = 0;
	//var atletaid="000000000000050";	
	//var atletaid="000000000000062";
	var atletaid = req.params.atletaid;

	var retarr = {
		rows: []
	}




	mongo.getallfiles(function (allmongo) {

		var atleti = getfilecombo("atleti", allmongo);
		var atl = getAtletaById(atletaid, atleti);

		//console.log("calcolo per " + atl.nome + " " + atl.cognome);

		//db.tkdr.find().toArray(function(err, items) {


		//console.log("items length",items.length)

		//mongofiles=items;

		var gare = getfilecombo("gare", allmongo);
		//console.log(gare)



		var grows = gare.rows;
		//console.log("gare", grows.length)

		//sort gare per data
		grows.sort(function (a, b) {
			var data1 = a.doc.data;
			var sdata1 = data1.substring(6, 10) + data1.substring(3, 5) + data1.substring(0, 2);
			var data2 = b.doc.data;
			var sdata2 = data2.substring(6, 10) + data2.substring(3, 5) + data2.substring(0, 2);

			if (sdata1 > sdata2) return -1;
			if (sdata2 > sdata1) return 1;
			return 0;
		});

		for (var i = 0; i < grows.length; i++) {

			var row = grows[i];
			var garaid = row.doc.id;
			var loc = row.doc.location;
			var data = row.doc.data;



			var mfname = "matches_" + garaid;
			//var matches=getMongoFile(mongofiles,mfname);
			var matches = getfilecombo(mfname, allmongo);
			if (matches) {
				var mrows = [];
				if (matches.rows) mrows = matches.rows;
				//console.log("matches",mrows.length);

				var gori = 0;
				var garg = 0;
				var gbro = 0;
				var nmatches = 0;
				var ndmatches = 0;
				for (var j = 0; j < mrows.length; j++) {
					var mrow = mrows[j];
					var aid = mrow.doc.atletaid;

					if (aid == atletaid) {
						nmatches++;
						var medmatch = mrow.doc.medagliamatch;
						if (mrow.doc.disputato == "yes") ndmatches++;
						//console.log(medmatch);
						if (medmatch == "oro") {
							gori++;
							ori++;
						}
						if (medmatch == "argento") {
							garg++;
							arg++;
						}
						if (medmatch == "bronzo") {
							gbro++;
							bro++;
						}



					}






				}

				var gp = {
					location: loc,
					data: data,
					garaid: garaid,
					ori: gori,
					arg: garg,
					bro: gbro,
					matches: nmatches,
					matchesdisputati: ndmatches
				}
				retarr.rows.push(gp);
				//console.log(garaid + " - " + loc + " - " + data + " - ori: " + gori + " - arg: " + garg + " - bro: " + gbro);

			} else console.log("matches for garaid " + garaid + " not found");


		}

		//console.log("----------------------------------")
		//console.log("TOTALE -- ori: " + ori + " - arg: " + arg + " - bro: " + bro);
		//db.close();

		retarr.ori = ori;
		retarr.arg = arg;
		retarr.bro = bro;
		retarr.atletaid = atletaid;
		retarr.atletaname = atl.nome + " " + atl.cognome;
		res.send(retarr);
	});


	//});  
});

function getMongoFile(mfiles, fname) {

	var retvalue = {
		rows: []
	};
	for (var i = 0; i < mfiles.length; i++) {

		var filename = mfiles[i].filename;

		if (filename == fname) {
			//console.log("got filename "+filename);

			return mfiles[i].filecontent;
		}
	}

	return retvalue;
}
/*

for (var i=0; i<gare.length; i++) {
	
	var garaid=gare[i];
	var mfname="matches_"+garaid+".json";
	db.tkdr.find({ filename: mfname}).toArray(function(merr, mitems){
			
			var mrows=mitems[0].filecontent.rows;
			console.log("matches",mrows.length)
			
			
			
		});
}

		
	*/








router.get('/findall', function (req, res) {
	var societa = "";
	if (req.query) {

		if (req.query.societa) societa = req.query.societa;

	}

	utils.colog("called gare findall for societa " + societa);
	//readGareJson(function(){
	mongo.getallfiles(function (allmongo) {
		utils.colog("got all files from mongo");

		for (var i = 0; i < allmongo.length; i++) {
			//console.log(allmongo[i].filename);

		}

		var atleti = getfilecombo("atleti", allmongo);
		findAll(function (obj) {
			//console.log("###### users ( /getAllAssets route ) -->  " + JSON.stringify(obj));
			var resp = {
				rows: []
			}
			var k = 0;
			for (var i = 0; i < obj.rows.length; i++) {
				k++;
				var row = obj.rows[i].doc;
				var garaid = row.id;
				var ori = 0;
				var arg = 0;
				var bro = 0;
				var fname = './data/matches_' + garaid + '.json';
				try {

					//var buf = fs.readFileSync(fname, "utf8");	

					//var j=JSON.parse(buf);

					var j = getmatchescombo(garaid, allmongo);

					//mongo.getfile("matches_"+garaid,function(j){

					for (var ii = 0; ii < j.rows.length; ii++) {
						var mrow = j.rows[ii].doc;

						var atl = getAtletaById(mrow.atletaid, atleti);


						if (societa.trim() != "") {
							if (!atl.societaid) atl.societaid = "20160217220400";
							if (atl.societaid == societa) {

								if (mrow.medagliamatch == "oro") ori++;
								if (mrow.medagliamatch == "argento") arg++;
								if (mrow.medagliamatch == "bronzo") bro++;

							}
						} else {
							if (mrow.medagliamatch == "oro") ori++;
							if (mrow.medagliamatch == "argento") arg++;
							if (mrow.medagliamatch == "bronzo") bro++;

						}
					}
					row.ori = ori;
					row.argenti = arg;
					row.bronzi = bro;


					if (societa.trim() != "") {
						var arr2 = [];
						var arriscritti = row.iscritti.split(",");
						for (var x = 0; x < arriscritti.length; x++) {
							var atlx = getAtletaById(arriscritti[x], atleti);
							if (societa == atlx.societaid) {

								arr2.push(arriscritti[x]);
							}

						}
						var newiscritti = arr2.join(",");
						row.myiscritti = newiscritti;


					}

					var hasTkdt = false;
					if (row.tkdt) hasTkdt = true;

					utils.colog("gara id " + garaid + " - ori: " + ori + " arg " + arg + " bro " + bro + " hasTkdt " + hasTkdt);
					// })
				} catch (e) {
					console.log("error")
					row.ori = ori;
					row.argenti = arg;
					row.bronzi = bro;

				}




			}
			res.send(obj);
		});


	});

});

router.get('/findall/xml', function (req, res) {
	console.log("called gare findallxml");
	var xml = "";
	fs.readFile(fname, "utf-8", function (err, data) {
		if (err) {
			xml = "<error>error</error>"
		} else xml = data;
		console.log("Read file " + fname);
		res.send(xml);
	});
	/*
	findAll(function(obj) {
		//console.log("###### users ( /getAllAssets route ) -->  " + JSON.stringify(obj));
		res.send(obj);
	});
	*/
});

router.get('/findByName/:nome', function (req, res) {
	console.log("called gare findByName");
	var nome = req.params.nome;
	//res.send(risp);
	findByName(nome, function (obj) {
		res.send(obj);
	});


});


router.get("/fullgarabyid/:id", function (req, res) {

	var id = req.params.id;
	var garaid = id;

	var societaid = "";
	if (req.query) {

		if (req.query.societaid) societaid = req.query.societaid;

	}
	utils.colog("called  fullGaraById for gara " + id + " and societa " + societaid);

	var ret = {
		gara: {},
		matchesbyprog: {},
		matchesbyatleta: {},
		cronaca: {},
		realtime: {}
	}


	//res.send(risp);
	mongo.getfile("atleti.json", function (atleti) {

		findById(id, function (obj) {


			utils.colog("got gara " + id + ": rows: " + obj.rows.length);
			ret.gara = obj;


			if (societaid.trim() != "") {
				var arr2 = [];
				if (ret.gara.rows.length > 0) {
					var arriscritti = ret.gara.rows[0].doc.iscritti.split(",");
					for (var x = 0; x < arriscritti.length; x++) {
						var atlx = getAtletaById(arriscritti[x], atleti);
						if (societaid == atlx.societaid) {

							arr2.push(arriscritti[x]);
						}

					}
					var newiscritti = arr2.join(",");
					ret.gara.rows[0].doc.myiscritti = newiscritti;
				} else {
					console.log("ATTENZIONE no rows !");

				}

			}





			getmatchesbyprog(garaid, function (data) {
				//console.log(data);
				utils.colog("--- got matches byprog");
				var mprog = {
					rows: []
				}
				var rtmatches = {
					rows: []
				}

				if (societaid != "") { // se filtro su società


					colog("filtro societa impostato")
					for (var i = 0; i < data.rows.length; i++) {
						var row = data.rows[i];
						var doc = row.doc;
						var aid = doc.atletaid;
						var atl = getAtletaById(aid, atleti);

						var rt = false;
						if (doc.realtime) {

							if (String(doc.realtime) == "true") rt = true;

						}

						//console.log("matchid: "+doc.matchid+" - "+atl.cognome+" "+atl.nome+" - "+atl.societaid)
						var socid = "";
						if (doc.societaid) socid = doc.societaid;



						if (!atl.societaid) atl.societaid = "20160217220400";
						colog("---" + atl.societaid + " - societaid: " + societaid)
						if (atl.societaid.trim() == societaid.trim()) {
							colog("pusho");
							mprog.rows.push(row);
							colog("realtime match: " + rt);
							if (rt == true) rtmatches.rows.push(row);
						} else {
							colog("not eligibile")

						}





					}
				} else {
					colog("pusho comunque");
					mprog = data;
				}

				//ret.matchesbyprog=data;
				ret.matchesbyprog = mprog;
				ret.realtime = rtmatches;


				var tipogara = "combattimento";
				if (ret.gara.rows[0].doc.tipo) {
					if (ret.gara.rows[0].doc.tipo.toLowerCase() == "forme") tipogara = "forme";
				}

				if (tipogara == "forme") {
					ret.formebyatleta = {
						rows: []
					}
					var arr = ret.gara.rows[0].doc.iscritti.split(",");
					arr.forEach(function (item, idx) {
						var atl = getAtletaById(item,atleti);
						var fpa = {
							atleta: atl,
							esecuzioni: [],
							medaglia: "none"
						}
						ret.formebyatleta.rows.push(fpa);


					})
				}


				//var societaid="";
				//if (ret.matchesbyprog.societaid) societaid=ret.matchesbyprog.societaid;
				/*if (societaid.trim()!="") {
					
					console.log(filterRows(ret.matchesbyprog))
					
				}*/
				getmatchesbyatleta(garaid, function (mbadata) {
					colog("got matchesbyatleta")

					var mbaprog = {
						rows: []
					}

					if (societaid != "") { // se filtro su società


						colog("filtro societa impostato")
						for (var i = 0; i < mbadata.length; i++) {
							var row = mbadata[i];
							var doc = row;
							var aid = doc.id;
							var atl = getAtletaById(aid, atleti);


							if (!atl.societaid) atl.societaid = "20160217220400"; //rozzano	
							//console.log("matchid: "+doc.matchid+" - "+atl.cognome+" "+atl.nome+" - "+atl.societaid)



							colog("---" + atl.id + " - societaid: " + societaid)
							if (atl.societaid.trim() == societaid.trim()) {
								colog("pusho");
								mbaprog.rows.push(row);
							} else {
								colog("not eligibile")

							}





						}
					} else {
						colog("pusho comunque");
						mbaprog = data;
					}






					ret.matchesbyatleta = mbaprog;
					getcronaca(garaid, function (data) {
						ret.cronaca = data;


						//NEW GET TKDT
						var hastkdt = false;
						var tkdt_id = "";
						if (ret.gara.rows[0].doc.tkdt_id) {
							var tkdtid = ret.gara.rows[0].doc.tkdt_id;
							if (tkdtid.trim() != "") {
								hastkdt = true;
								tkdt_id = tkdtid;

							}


						}


						if (hastkdt) {
							mongo.getfile("tkdt_" + tkdt_id + ".json", function (tkdata) {
								console.log("tkdata",tkdata);
								ret.gara.rows[0].doc.tkdt = tkdata.rows[0];
								console.log("tkdata0",tkdata.rows[0])
								console.log("ret",ret.giorni);
								res.send(ret);

							})

						} else res.send(ret);



					})
				});


			})


		});

	});

})

router.get('/findById/:id', function (req, res) {

	var societa = "";
	if (req.query) {

		if (req.query.societa) societa = req.query.societa;

	}



	utils.colog("called gare findById for societa " + societa);
	var id = req.params.id;
	//res.send(risp);
	mongo.getfile("atleti.json", function (atleti) {

		findById(id, function (obj) {
			colog("got data " + JSON.stringify(obj));

			if (societa.trim() !== "") {
				for (var i = 0; i < obj.rows.length; i++) {

					var iscritti = obj.rows[i].doc.iscritti;

					var arr = iscritti.split(",");
					var newarr = [];
					for (var j = 0; j < arr.length; j++) {

						var atl = getAtletaById(arr[j], atleti);
						if (!atl.societaid) atl.societaid = "20160217220400";
						if (atl.societaid == societa) newarr.push(atl.id);


					}
					var newiscritti = newarr.join(",");
					obj.rows[i].doc.myiscritti = newiscritti;
					res.send(obj);

				}
			} else res.send(obj);
		});
	});


});

router.post('/add', function (req, res) {
	var ressent = false;
	var body = req.body;
	var row = {};
	row.doc = body;

	var today = new Date();
	var id = today.julian();
	colog("adding id: " + id);
	row.doc.id = id;

	if (usemongo) {
		mongo.addRecord("gare.json", id, row, function (data) {
			utils.colog("gara " + id + "added");
			ressent = true;
			res.send(data);

		})

	}

	return;

});

router.get('/resetcronaca/:garaid', function (req, res) {
	var body = req.body;
	var garaid = req.params.garaid;
	var row = {};


	var cfname = "data/cronaca_" + garaid + ".json";
	var fname = "cronaca_" + garaid + ".json";
	var today = new Date();
	var jul = today.julian();

	var m = {
		rows: [{
			time: jul,
			text: "Cronaca resettata"
		}]
	};
	mongo.resetfile(fname, m, function () {

		utils.colog("cronaca resetted for file " + fname + " on mongodb")

	})

	//console.log("saving following in file: "+JSON.stringify(m))

	fs.writeFile(cfname, JSON.stringify(m), function (err) {
		if (err) return console.log(err);
		utils.colog('File ' + cfname + ' saved on server');
		var dat = require('../' + cfname);
		utils.colog(dat.rows.length);
		m.action = "cronaca resetted for gara " + garaid;
		var fullUrl = req.protocol + '://' + req.get('host');
		saveToAltervista(fullUrl + "/matches/getcronaca/" + garaid, "cronaca_" + garaid + ".json");

		res.send(m)

	});






});

router.post('/delete', function (req, res) {
	var body = req.body;
	var id = body.id;
	var rev = body.id;

	utils.colog(JSON.stringify(gare));

	if (usemongo) {
		mongo.deleteRecord("gare.json", id, function (data) {
			utils.colog("deleted");
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


router.get("/updategarafromfile", function (req, res) {
	var gara = require("./gara_20160831090455.json");
	console.log("garaid", gara.id);
	console.log("atleti", gara.tkdt.atleti.length);
	console.log("giorni", gara.giorni.length);
	res.send("ok");

})

router.post('/update', function (req, res) {
	var body = req.body;

	console.log("body",body);

	if (!req.body.id) body = JSON.parse(req.body); //check if JSON or stringified JSON

	var id = body.id;

	var row = {};
	row.doc = body;

	utils.colog("trying to update gara id " + id);


	if (usemongo) {
		mongo.updateRecord("gare.json", id, row, function (data) {
			utils.colog("updated");
			//ressent=true;
			res.send(data);

		})

	}

	return;

	var jfname = "gare.json";
	for (var i = 0; i < gare.rows.length; i++) {
		var gid = gare.rows[i].doc.id;
		if (gid == id) {

			for (var prop in body) {
				if (body.hasOwnProperty(prop) && (prop != "id")) {

					gare.rows[i].doc[prop] = body[prop];
				}
			}
			fs.writeFile('data/gare.json', JSON.stringify(gare), function (err) {
				if (err) return console.log(err);
				utils.colog('File gare.json updated on server');
				var fullUrl = req.protocol + '://' + req.get('host');
				saveToAltervista(fullUrl + "/gare/findall", "gare.json");

			});

			if (usemongo) {
				mongo.updateRecord(jfname, id, gare, function (data) {
					utils.colog("updated");

				})

			}

			var ret = {};
			ret.action = "updated";
			ret.id = id;



			res.send(ret)
		}


	}




});


function findByName(nome, callback) {

	utils.colog('gare findByName=' + nome);

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
			utils.colog(a1);
			var b1 = b.cognome;
			if (a1 > b1) return 1;
			if (a1 < b1) return -1;
			return 0;
		});
		utils.colog("found " + results.length + " results");
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

	mongo.getfile("gare.json", function (gare) {

		colog('findGaById: ' + id);
		//console.log(JSON.stringify(gare));
		//console.log("gare totali: "+gare.rows.length);
		var found = false;
		var data = {
			"rows": []
		}
		if (id) {
			for (var i = 0; i < gare.rows.length; i++) {
				var doc = gare.rows[i].doc;
				colog(id + " - " + doc.id)
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
	});

};


function findAll(callback) {
	utils.colog('gare findAll');
	mongo.getfile("gare.json", function (gare) {

		/*atleti.sort(function(a,b) {
			    var a1=a.cognome[0];
				//console.log(a1);
				var b1=b.cognome[0];
				if (a1>b1) return 1;
				if (a1<b1) return -1;
				return 0;
			});
			*/

		var data = gare;
		//console.log(data.rows.length);


		data.rows.sort(function (a, b) {

			//console.log(JSON.stringify(a.doc));

			var a1 = a.doc.data;
			var b1 = b.doc.data;
			//console.log(a1+" - "+b1);
			var a2 = getNormalDate(a1);
			var b2 = getNormalDate(b1);
			if (a2 > b2) return -1;
			if (a2 < b2) return 1;
			return 0;
		})



		callback(data);
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

		utils.colog(contents);

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

	for (var i = 0; i < d.gare.gara.length; i++) {
		var doc = {};
		var p = d.gare.gara[i];
		var element = {}
		for (var key in p) {
			if (p.hasOwnProperty(key)) {
				// console.log("key: "+key+"   value: "+p[key]);
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

Date.prototype.julian = function () {
	var yyyy = this.getFullYear().toString();
	var MM = (this.getMonth() + 1).toString(); // getMonth() is zero-based
	var dd = this.getDate().toString();
	var hh = this.getHours();
	var mm = this.getMinutes();
	var ss = this.getSeconds();

	var n = 2;
	var jdate = yyyy + padZeros(MM, n) + padZeros(dd, n) + padZeros(hh, n) + padZeros(mm, n) + padZeros(ss, n);
	utils.colog("jdate: " + jdate);

	//var jdate=yyyy+(MM[1]?MM:"0"+MM[0]) + (dd[1]?dd:"0"+dd[0]) + (hh[1]?hh:"0"+hh[0]) + (mm[1]?mm:"0"+mm[0]) + (ss[1]?ss:"0"+ss[0]);
	return jdate; // padding
};

function padZeros(theNumber, max) {
	var numStr = String(theNumber);

	while (numStr.length < max) {
		numStr = '0' + numStr;
	}

	return numStr;
}

function getNormalDate(data) {
	//data=data.substring(0,8);
	//console.log("getNormalDate "+data);
	var retvalue = data.substring(6) + data.substring(3, 5) + data.substring(0, 2);

	return retvalue;

}


function saveToAltervista_old(path, fname) {
	var url = altervistaurl + "/savefile.php?url=" + path + "&filename=" + fname;

	utils.colog("saving to altervista at url: " + url);
	request.get(url, function (error, response, body) {
		utils.colog(body);

	});


}


function saveToAltervista(finto, filename) {
	var dat; // = require('../data/'+filename);

	fs.readFile('./data/' + filename, 'utf8', function (err, data) {
		if (err) throw err;
		utils.colog(data)
		dat = JSON.parse(data);

		utils.colog("savetoaltervista filename: " + filename);
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
	    utils.colog(options.url)
		// Start the request
		request(options, function (error, response, body) {
			if (!error && response.statusCode == 200) {
				// Print out the response body
				utils.colog(body)
				utils.colog("file " + filename + " saved on altervista");
			}
			if (error) {
				console.log(error);
			}

		})
	});

}



function findAllMatchesByAtleta(garaid, callback) {

	refreshMode = "byatleta";
	var aid = garaid;
	var matches;
	mongo.getfile("matches_" + aid + ".json", function (matches) {





		//readMatchesJson(aid,function(matches){		

		//console.log("matches:");
		//console.log(JSON.stringify(matches.rows))
		//var allmatches=$(xml).find("match");
		var allmatches = [];

		if (matches.rows.length > 0) allmatches = matches.rows;

		//var allmatches=matches.rows;
		//sdebug("Estrazione match per questa gara da "+allmatches.length+" matches");




		allmatches.sort(function (a, b) {
			var progid_a = a.doc.atletaid;
			var progid_b = b.doc.atletaid;

			if (progid_a < progid_b) return -1;
			if (progid_a > progid_b) return 1;
			return 0;
		});

		var curratleta = "";
		var curratletaname = "";
		var currmatches = "";
		var currmatchesarray = [];

		var currcategoria = "";
		var currdatanasc = "";
		var count = 0;
		//var lista=$("<lista></lista>");
		var lista = []

		var ca = "";
		var atleticount = 0;
		for (var ii = 0; ii < allmatches.length; ii++) {
			var match = allmatches[ii].doc;
			var aid = match.atletaid;
			if (aid != ca) {
				atleticount++;
				ca = aid;
			}
		}

		utils.colog(atleticount + " unique atleti");

		var mtext = "";
		//if ($.trim(viewcat)!="") mtext=" in cat. "+viewcat.toUpperCase();


		for (var ii = 0; ii < allmatches.length; ii++) {
			var match = allmatches[ii].doc;
			count++;
			//sdebug(count);
			var progid = match.progid;
			var aid = match.atletaid;
			var aname = match.atletaname;
			var matchid = match.matchid;
			var vinto = match.vinto;
			var disputato = match.disputato;
			var dadisputare = match.dadisputare;
			var medaglia = match.medagliamatch;
			var risultato = match.risultato;
			var datanasc = match.datanascita;
			//var categoria=getCategoria(datanasc);
			var categoria = "";

			//console.log("matchid: "+matchid+" - atleta: "+aname);
			//era qui




			if (aid != curratleta) {
				if (count == 1)

				{

					curratleta = aid;
					currmatches = matchid;
					currmatchesarray.push(match);
					curratletaname = aname;
					currcategoria = categoria;
					currdatanasc = datanasc;
					//anome=aname;
					//console.log("primo atleta");

				} else {

					//var anome=sgetAtletaNameById(curratleta);
					//var anome=aname;
					var anome = curratletaname;
					var atl = {};
					atl.nome = anome;
					atl.id = curratleta;
					atl.datanascita = currdatanasc;
					atl.categoria = currcategoria;
					atl.matches = currmatches;
					//var atget=getAtletaById(atl.id);
					//atl.societaid=atget.societaid;
					atl.matchesarray = currmatchesarray;
					atl.matchesarray.sort(function (a, b) {
						var a1 = a.progid;
						var b1 = b.progid;
						if (a1 > b1) return 1;
						if (a1 < b1) return -1;
						return 0;

					})
					//atl.matches

					lista.push(atl);

					//lista.append("<atleta><nome>"+anome+"</nome><id>"+curratleta+"</id><datanascita>"+currdatanasc+"</datanascita><categoria>"+currcategoria+"</categoria><matches>"+currmatches+"</matches></atleta>");

					/*htm+="<li><img src='images/matchtoplay.png' alt='France' class='ui-li-icon ui-corner-none'><div>"+getAtletaNameById(curratleta)+" "+currmatches+"</div></li>";*/
					//  console.log("depositato "+anome+" - "+currmatches);
					//  console.log("cambiato atleta: "+curratleta+" "+anome+" "+currmatches);
					curratleta = aid;
					curratletaname = aname;
					currcategoria = categoria;
					currdatanasc = datanasc;
					currmatches = "";
					currmatchesarray = [];
					currmatches += matchid;
					currmatchesarray.push(match);
				}


			} else {
				if (currmatches != "") currmatches += ",";
				currmatches += matchid;
				currmatchesarray.push(match);

			}

			if (count == allmatches.length) {
				// sdebug("count = matches.length ");
				//if ($.trim(currmatches)!="") currmatches+=",";
				//currmatches+=matchid;

				//var anome=sgetAtletaNameById(curratleta);
				var anome = curratletaname;
				if (matches.length == 1) {
					//anome=sgetAtletaNameById(aid);
					anome = aname;
					currmatches = matchid;
					currmatchesarray = [];
					currmatchesarray.push(match);
					curratleta = aid;
					curratletaname = aname;
					currcategoria = categoria;
					currdatanasc = datanasc;
					//  console.log("matches.length = 1 ");
				}

				var atl = {};
				atl.nome = anome;
				atl.id = curratleta;
				atl.datanascita = currdatanasc;
				atl.categoria = currcategoria;
				atl.matches = currmatches;
				atl.matchesarray = currmatchesarray;
				atl.matchesarray.sort(function (a, b) {
					var a1 = a.progid;
					var b1 = b.progid;
					if (a1 > b1) return 1;
					if (a1 < b1) return -1;
					return 0;

				})

				for (var i = 0; i < atl.matchesarray.length; i++) {
					//console.log(atl.matchesarray[i].matchid) ; 

				}


				lista.push(atl);

				//lista.append("<atleta><nome>"+anome+"</nome><id>"+curratleta+"</id><datanascita>"+currdatanasc+"</datanascita><categoria>"+currcategoria+"</categoria><matches>"+currmatches+"</matches></atleta>");

			}





		}
		//htm+="</ul>";

		// var list=lista.find("atleta");
		var list = lista;
		list.sort(function (a, b) {
			var nome_a = a.nome;
			var nome_b = b.nome;

			if (nome_a < nome_b) return -1;
			if (nome_a > nome_b) return 1;
			return 0;
		});

		//sdebug(list.html());
		for (var jj = 0; jj < list.length; jj++) {
			var lst = list[jj];
			var nome = lst.nome;
			var categ = lst.categoria; //.toUpperCase();
			var datan = lst.datanascita; //.toUpperCase();
			//alert(nome);
			var incontri = lst.matches;
			var aid = lst.id;

			if (incontri) {
				var arr = incontri.split(",");
				arr.sort(function (a, b) {
					//var nome_a = $(a).find('progid').text();
					//var nome_b = $(b).find('progid').text();



					var proga = a.substring(1);
					var progb = b.substring(1);
					/* 
		     	var nome_a = $(a).find('progid').text();
				var nome_b = $(b).find('progid').text();
				
				if ( nome_a< nome_b )  return 1;
                if ( nome_a> nome_b  ) return -1;
				*/
					if (proga < progb) return -1;
					if (proga > progb) return 1;
					return 0;
				});
				var incontri2 = "";

				for (var xx = 0; xx < arr.length; xx++) {
					// sdebug("incontro "+arr[i]);
					//sdebug(matches.length);



					//incontri2+=getMatchString(arr[i],aid);



				}
			}


			/*
			var med=getMedaglieGaraAtleta(matches,garaid,aid);
			var medarr=med.split(",");
			//sdebug(med);
			var imgsrc="images/matchtoplay.png";
			if (medarr[0]>0) imgsrc="images/medaglia_oro.png";
			if (medarr[1]>0) imgsrc="images/medaglia_argento.png";
			if (medarr[2]>0) imgsrc="images/medaglia_bronzo.png";
			*/
			// sdebug("creating li with "+nome);
			//htm+="<li data-icon='false'><a data-ajax='false' shref='#matchesatleta' data-rel='popup' shref='gareatleta.html?atletaid="+aid+"&garaid="+garaid+"' shref=javascript:matchAtletaDetail('"+aid+"')  href=\"javascript:matchesPerAtleta('"+aid+"','"+nome+"','"+datan+"')\" id='atleta"+aid+"'><img src='"+imgsrc+"' class='imgicon sui-li-icon sui-corner-none' /><span class='categoria'>"+categ+"</span><br><span class='atleta'>"+nome+"</span><br><span class='match'>"+incontri2+"</span></a></li>";
		}

		/* $("#lista").empty();
		 $("#lista").append(htm);
		 $("#lista").listview();
		 $("#lista").listview("refresh");
		 */
		callback(list);

	});

}


function readCronacaMongo(garaid, callback) {
	var jfname = "cronaca_" + garaid + ".json";
	mongo.getfile(jfname, function (data) {
		//

		//console.log(data);
		gare = data;
		utils.colog("read cronaca from mongo " + jfname + " :   " + gare.rows.length);
		callback(data);

	})


}





function filterRows(rows, filter) {

	var ret = {
		rows: []
	}

	for (var i = 0; i < rows.length; i++) {

		var rowdoc = rows[i].doc;

		var eligible = true;
		for (x in filter) {

			if (rowdoc.hasOwnProperty(x)) {



				if (rowdoc[x].toLowerCase().indexOf(filter[x].toLowerCase()) == -1) eligible = eligible && false;

			}

		}

		if (eligible) ret.rows.push(fc.rows[i])



	}


	return ret;

}











function getmatchesbyprog(garaid, callback) {
	var id = garaid;
	utils.colog("called getmatchesbyprog for gara " + id);
	mongo.getfile("matches_" + id + ".json", function (data) {

		if (!data) data = {
			rows: []
		};
		data.rows.sort(function (a, b) {
			var a1 = a.doc.progid;
			var b1 = b.doc.progid;
			if (a1 > b1) return 1;
			if (a1 < b1) return -1;
			return 0;
		})
		fs.writeFile("data/matches_" + id + ".json", JSON.stringify(data), function (err) {
			if (err) {
				return console.log(err);

			}
			utils.colog("file matches_" + id + ".json retrieved from db and saved in local data folder")
		});
		callback(data);
	});


}

function getmatchesbyatleta(garaid, callback) {
	var id = garaid;
	utils.colog("called  getmatchesbyatleta for gara " + id);
	findAllMatchesByAtleta(id, function (dat) {

		callback(dat);
	})

}

function getcronaca(garaid, callback) {
	var id = garaid;
	var fname = "data/cronaca_" + id + ".txt";
	var jfname = "data/cronaca_" + id + ".json";
	var cronaca = {
		rows: []
	};

	readCronacaMongo(id, function (data) {
		data.rows.sort(function (a, b) {
			var a1 = a.time;
			var b1 = b.time;
			if (a1 < b1) return 1;
			if (a1 > b1) return -1;
			return 0;

		})
		cronaca = data;

		callback(cronaca);
	})






}



module.exports = router;