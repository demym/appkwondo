var express = require('express');
var router = express.Router();
var gcm = require('node-gcm');
var request = require('request');
var mongo = require('../routes/mongo');
var base64 = require('node-base64-image');
var utils = require("../routes/utils");
var realtime = require("../routes/realtime");
var fcm=require("../routes/gcm");

var path = require('path');
var util = require("util");
var mime = require("mime");
var fs = require("fs");
var Jimp = require("jimp");
var usemongo = true;
var debug = false;





var message = new gcm.Message();
var alterbridge = false;
//var altervistaurl="http://localhost:90/tkdr";
var altervistaurl = "http://demym.altervista.org";

var fs = require('fs'),
	xml2js = require('xml2js');


var matches;


var parser = new xml2js.Parser();


function colog(txt) {
	if (debug) console.log(txt);

}


function readMatchesMongo(garaid, callback) {
	var jfname = "matches_" + garaid + ".json";
	colog("readMatchesMongo " + jfname);
	mongo.getfile(jfname, function (data) {
		//console.log(data.rows.length);
		utils.colog(JSON.stringify(data));
		matches = data;
		utils.colog("read matches from mongo " + jfname + " :   " + matches.rows.length);
		callback(matches);

	})


}


function readMatchesJson(garaid, callback) {

	if (usemongo) {
		readMatchesMongo(garaid, callback);
	} else {



		utils.colog("readMatchesJson garaid=" + garaid)
		var fname = "data/matches_" + garaid + ".json";
		utils.colog("readMatchesJson file " + fname);
		fs.readFile(fname, "utf-8", function (err, data) {

			if (err) {
				var data = {};
				data.msg = "Error " + err.message;
				data.rows = [];
				callback(data);

				// if not found init matches_xxx.json file


				return;


			}
			data = data.trim();
			utils.colog("Read file " + fname);
			var matches = {};
			if (!data) {
				data = {
					rows: []
				}
				matches = data;
			} else matches = JSON.parse(data);
			//atleti=xmlToJson(data);
			//console.log(atleti);
			//atleti =  JSON.parse(data, 'utf8');
			//console.log('Read file atleti.json: '+atleti.length);
			// console.log("read from file "+fname+" :   "+JSON.stringify(matches));
			callback(matches);
			//console.log(data);
		});

	}


}

function readMatches(callback) {



	var fname = "matches.xml";
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

			matches = result.matches.match;
			matches = result;
			matches = xform(matches);
			fs.writeFile('data/matches.json', JSON.stringify(matches), function (err) {
				if (err) return console.log(err);
				utils.colog('File matches.json saved on server');
				//var dat = require('../data/matches.json');
				var dat = JSON.parse(fs.readFileSync('../data/matches.json', 'utf8'));
				utils.colog(dat.rows.length);
			});
			utils.colog("Loaded " + result.matches.match.length + " matches");
			callback();
			//atleti=result;
			//console.log(employees);
			//console.log('Read file atleti.xml: '+atleti.length);
		});
	});

}

/*
if (alterbridge){
 readMatches(function() {});	
} else readMatchesJson(function() {});
*/



function getAltervistaFile(fname, callback) {


	var request = require('request');
	request.get('http://demym.altervista.org/' + fname, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			var xml = body;
			//console.log(xml);
			fs.writeFile(fname, xml, function (err) {
				if (err) {
					return console.log(err);

				}

				utils.colog("Remote file " + fname + " was saved on server !");
				callback(xml);
			});
		}
		if (error) {
			console.log("error reading remote file: " + error.message);

			callback("")
			return;
		}
	});

}




router.get('/', function (req, res) {
	utils.colog("called matches findall");
	utils.colog(generateId());
	findAll(function (obj) {
		//console.log("###### users ( /getAllAssets route ) -->  " + JSON.stringify(obj));
		res.send(obj);
	});
});

router.get("/notify", function (req, res) {
	//notify();
	notify(null, function (data) {
		res.send(data);

	});
	//res.send({"error":false,"msg":"push notification sent"});


})

router.post("/notify", function (req, res) {
	var obj = req.body;
	notify(obj, function (data) {
		res.send(data);

	});



})


//SET RESULT API POINT
router.get("/setresult", function (req, res) {

	var obj = {
		id: "xxxxxx",
		atletaid: "20150211120920",
		result: "2-0",
		garaid: "20160610185130"

	}

	setResultNew(obj, function (data) {

		res.send(data);
	})


})


function setResultNew(obj, callback) {

	var atleti, gara, matches;

	mongo.findRecords("atleti.json", {}, function (adata) {
		atleti = adata;
		mongo.findRecords("gare.json", {
			id: obj.garaid
		}, function (gdata) {
			gara = gdata;
			var atl = utils.getAtletaById(obj.atletaid, atleti);
			utils.colog(atl);
			callback(gara)

		});

	})


}

function notify(obj, callback) {

	if (!obj) {
		obj = {};
		obj.message = "\u270C Peace, Love \u2764 and AppKwonDo \u2706!";
		obj.title = "AppKwonDo";
		obj.msgcnt = "3";
		obj.soundname = "beep.wav";
	}

	utils.colog("notifying GCM")
	//var sender = new gcm.Sender('AIzaSyBDU5stA6tX1IWaKJjGgC976dViNq4uk0Y');
	//var senderid="403763864066";
	//var senderid="1097775509323";
	//var senderid="866111544630"
	var senderid = "AIzaSyD_UQyfMWazlY5g7MKXJ1OOCrehnk9bkuo";
	var sender = new gcm.Sender(senderid);
	var registrationIds = [];

	//api key  AIzaSyBDU5stA6tX1IWaKJjGgC976dViNq4uk0Y
	//senderid 1097775509323

	// Value the payload data to send...
	message.addData('message', obj.message);
	message.addData('title', obj.title);
	message.addData('msgcnt', obj.msgcnt); // Shows up in the notification in the status bar
	message.addData('soundname', obj.soundname); //Sound to play upon notification receipt - put in the www folder in app
	//message.collapseKey = 'demo';
	//message.delayWhileIdle = true; //Default is false
	message.timeToLive = 3000; // Duration in seconds to hold in GCM and retry before timing out. Default 4 weeks (2,419,200 seconds) if not specified.

	// At least one reg id required
	//registrationIds.push('tkdrgcm');
	registrationIds.push("866111544630")
	//AIzaSyBDU5stA6tX1IWaKJjGgC976dViNq4uk0Y
	/**
	 * Parameters: message-literal, registrationIds-array, No. of retries, callback-function
	 */
	sender.send(message, registrationIds, 4, function (err, result) {
		if (err) console.log("error: " + JSON.stringify(err))
		console.log("notify send result: " + JSON.stringify(result));
		var cb = {
			error: err,
			result: result
		}
		if (callback) callback(cb);
	});

}



router.get('/findall', function (req, res) {
	utils.colog("called matches findall");
	findAll(function (obj) {
		//console.log("###### users ( /getAllAssets route ) -->  " + JSON.stringify(obj));
		res.send(obj);
	});
});


router.get('/findByName/:nome', function (req, res) {
	utils.colog("called matches findByName");
	var nome = req.params.nome;
	//res.send(risp);
	findByName(nome, function (obj) {
		res.send(obj);
	});


});


router.post('/addcronaca/:garaid', function (req, res) {
	var id = req.params.garaid;
	var fname = "data/cronaca_" + id + ".txt";
	var jfname = "data/cronaca_" + id + ".json";
	var dat = {
		rows: []
	}
	if (!fs.existsSync(jfname)) { //file cronaca_garaid.json exists


	} else {

		// Do something
		utils.colog(jfname + " file exists");
		//dat = require('../'+jfname);
		dat = JSON.parse(fs.readFileSync(jfname, 'utf8'));


	}
	var date = new Date();
	dat.rows.push({
		"time": date.juliandateshort(),
		"text": req.body.text
	});
	mongo.addRecord("cronaca_" + id + ".json", "", {
		"time": date.juliandateshort(),
		"text": req.body.text
	}, function (data) {
		res.send({
			"error": "false",
			"msg": "cronaca added " + req.body.text
		});

	})

	fs.writeFile(jfname, JSON.stringify(dat), function (err) {
		if (err) return console.log(err);
		utils.colog("File " + jfname + " saved on server");
		// var dat = require('../'+jfname);
		var dat = JSON.parse(fs.readFileSync(jfname, 'utf8'));
		utils.colog(dat.rows.length);
		var fullUrl = req.protocol + '://' + req.get('host');
		saveToAltervista(fullUrl + "/matches/getcronaca/" + id, "cronaca_" + id + ".json");

		//notify()
	});
	//res.send({"error":"false","msg":"cronaca added "+req.body.text});
})


router.get('/viewcronacaelements/:garaid', function (req, res) {

	var fname = "cronacaelements_" + req.params.garaid + ".json";

	mongo.getfile(fname, function (data) {


		res.render('cronacaelements', {
			data: data
		});
	});


});

router.post('/addcronacaelement/:garaid', function (req, res) {

	var usemongo = true;
	var avmediaurl = "http://demym.altervista.org/herokudata/cronacamedia/"

	var id = req.params.garaid;
	var fname = "data/cronaca_" + id + ".txt";
	var jfname = "data/cronaca_" + id + ".json";

	var text = "";
	var image = "";
	var sound = "";



	if (req.body.text) text = req.body.text;
	if (req.body.image) image = req.body.image;
	if (req.body.sound) sound = req.body.sound;

	var dat = {
		rows: []
	}
	var date = new Date();
	var saveobj = {
		"time": date.juliandateshort(),
		"text": text,
		"image": image,
		"sound": sound

	}


	//dat.rows.push(saveobj);
	var ffname = jfname.replace("data\\", "")
	ffname = ffname.replace("data/", "");

	if (usemongo) {

		mongo.checkCreateFile(ffname, function (data) {
			//
			utils.colog("checkCreateFile  " + ffname + ": ")
			utils.colog(data);

			var pth = "./public/data/media";



			utils.colog("pth: " + pth);

			if (fs.existsSync(pth)) {
				utils.colog("folder " + pth + " exists")
				// Do something
			} else {
				utils.colog("folder " + pth + " does not exists")
				fs.mkdirSync(pth);


			}

			//if there is a Sound
			if (saveobj.sound.trim() != "") {

				//var pth="./public/data/cronaca_"+id;	



				var format = "m4a";
				var base64Data;
				//if (saveobj.sound.indexOf('mp3')>-1) format="png";		  
				//var base64Data = saveobj.image.replace(/^data:image\/png;base64,/,"");
				//base64Data = saveobj.image.replace(/^data:image\/jpg;base64,/,"");
				base64Data = saveobj.sound.replace('data:audio/mpeg;base64,', '');
				//base64Data=base64Data.replace('data:image/jpg;base64,','');
				//.replace(/^data:image\/(png|gif|jpeg);base64,/,'')
				//base64Data=saveobj.image;
				//console.log(base64Data.substring(20));
				var binaryData = new Buffer(base64Data, 'base64'); //;
				var bdata = decodeBase64Image(saveobj.sound);
				var outfname = pth + "/" + id + "_" + saveobj.time + "." + format;
				var thumbfname = pth + "/thumb_" + id + "_" + saveobj.time + "." + format;
				var avfname = id + "_" + saveobj.time + "." + format;
				var avthumbfname = id + "_" + saveobj.time + "_thumb." + format;
				//outfname=path+"/out."+format;
				var options = {
					string: true
				};

				utils.colog(bdata)


				//var thumbfname=path+"/thumb_"+outfname;

				fs.writeFileSync(outfname, bdata.data);
				sendMediaFileToAltervista(avfname, saveobj.sound);
				saveobj.soundlocal = outfname.replace("./public/", "");
				saveobj.sounddata = saveobj.sound;
				saveobj.sound = avmediaurl + avfname;


			}



			// IF THERE IS AN Image
			if (saveobj.image.trim() != "") {

				//var path="./public/data/cronaca_"+id;	
				/* if (fs.existsSync(path)) {
		 console.log("folder "+path+" exists")
    // Do something
} else {
		 console.log("folder "+path+" does not exists")
		 fs.mkdirSync(path);
		 
		
	
}	*/


				var format = "jpg";
				var base64Data;
				if (saveobj.image.indexOf('png') > -1) format = "png";
				//var base64Data = saveobj.image.replace(/^data:image\/png;base64,/,"");
				//base64Data = saveobj.image.replace(/^data:image\/jpg;base64,/,"");
				base64Data = saveobj.image.replace('data:image/png;base64,', '');
				base64Data = base64Data.replace('data:image/jpg;base64,', '');
				//.replace(/^data:image\/(png|gif|jpeg);base64,/,'')
				//base64Data=saveobj.image;
				//console.log(base64Data.substring(20));
				var binaryData = new Buffer(base64Data, 'base64'); //;
				var bdata = decodeBase64Image(saveobj.image);
				var outfname = pth + "/" + id + "_" + saveobj.time + "." + format;
				var thumbfname = pth + "/thumb_" + id + "_" + saveobj.time + "." + format;
				var avfname = id + "_" + saveobj.time + "." + format;
				var avthumbfname = "thumb_" + id + "_" + saveobj.time + "." + format;
				//outfname=path+"/out."+format;
				var options = {
					string: true
				};

				utils.colog(bdata)


				//var thumbfname=path+"/thumb_"+outfname;

				//fs.writeFileSync(outfname, bdata.data);


				fs.writeFile(outfname, bdata.data, function (err) {
					console.log(err); // writes out file without error, but it's not a valid image
					//console.log("trying to resize image")

					/*
           resizeImage(outfname,function(){
			   
			    sendMediaFileToAltervista(avfname,saveobj.image);
		// sendMediaFileToAltervista(avthumbfname,saveobj.image);
		 //saveobj.image=thumbfname.replace("./public/","");
		 saveobj.image=avmediaurl+avthumbfname;
		 //console.log(saveobj.image);
		  mongo.addRecord("cronaca_"+id+".json","",saveobj,function(data){
		         console.log("add cronacaelements result");
		         console.log(data);
		         //res.send({"error":"false","msg":"cronaca element added "+saveobj});
				 res.send(data);
		
	    }) 
			   
		   }); 		*/


					Jimp.read(outfname, function (err, lenna) {
						if (err) {
							console.log("error in creating thumbnail:", err);
						}
						//console.log("lenna",lenna)
						lenna.resize(50, 50); // resize
						//console.log("lenna after resize",lenna)
						lenna.write(thumbfname); // save

						utils.colog("saved thumb in " + thumbfname);
						utils.colog("thumbfname: ", thumbfname)
						//var sdata=encodeBase64Image(thumbfname);

						var pth2 = thumbfname,
							options = {
								localFile: true,
								string: true
							};



						base64.base64encoder(pth2, options, function (err64, img64) {
							if (err64) {
								console.log("error in thumbnail encoding: ", err64);
							}
							//console.log("img64",img64);  


							var bs = "data:image/jpg;base64,";
							if (format == "png") bs = "data:image/png;base64,";
							var sdata = bs + img64;

							//console.log("sdata",sdata);

							sendMediaFileToAltervista(avfname, saveobj.image);
							//sendMediaFileToAltervista(avthumbfname,sdata);
							utils.colog("image and thumbnail sent to altervista")

							saveobj.imagelocal = thumbfname.replace("./public/", "");
							saveobj.image = avmediaurl + avthumbfname;

							//console.log(saveobj.image);
							mongo.addRecord("cronaca_" + id + ".json", "", saveobj, function (data) {
								utils.colog("add cronacaelements result");
								utils.colog(data);
								//res.send({"error":"false","msg":"cronaca element added "+saveobj});
								res.send(data);

							})
						});
					});

				});





				/*easyimg.resize({src:outfname, dst:'thumb_'+outfname, width:50, height:50}, function(err, stdout, stderr) {
				if (err) throw err;
				console.log('Resized to 50x50');
		  });*/
			}


			//if there is NOT and image	
			if (saveobj.image.trim() == "") {
				delete saveobj.image;
				mongo.addRecord("cronaca_" + id + ".json", "", saveobj, function (data) {
					utils.colog("add cronacaelements result");
					utils.colog(data);
					//res.send({"error":"false","msg":"cronaca element added "+saveobj});
					res.send(data);

				})

			}

			return;
			//console.log(data);






			//res.send(data);
		})

	} else //save multimedia to files

	{
		var path = "./public/data/cronaca_" + id;
		if (fs.existsSync(path)) {
			console.log("folder " + path + " exists")
			// Do something
		} else {
			console.log("folder " + path + " does not exists")
			fs.mkdirSync(path);



		}

		if (saveobj.image.trim() != "") {
			var format = "jpg";
			var base64Data;
			if (saveobj.image.indexOf('png') > -1) format = "png";
			//var base64Data = saveobj.image.replace(/^data:image\/png;base64,/,"");
			//base64Data = saveobj.image.replace(/^data:image\/jpg;base64,/,"");
			base64Data = saveobj.image.replace('data:image/png;base64,', '');
			base64Data = base64Data.replace('data:image/jpg;base64,', '');
			//.replace(/^data:image\/(png|gif|jpeg);base64,/,'')
			//base64Data=saveobj.image;
			//console.log(base64Data.substring(20));
			var binaryData = new Buffer(base64Data, 'base64'); //;
			var bdata = decodeBase64Image(saveobj.image);
			var outfname = path + "/" + saveobj.time + "." + format;
			//outfname=path+"/out."+format;
			var options = {
				string: true
			};
			/*
		  base64.base64decoder(binaryData, options, function (err, saved) {
				if (err) { console.log("error",err); }  
				console.log("saved ",saved);    
		  });*/
			console.log(bdata)
			fs.writeFile(outfname, bdata.data, function (err) {
				console.log(err); // writes out file without error, but it's not a valid image

			});
		}

		res.send("<img src='" + saveobj.image + "'  />");
	}

})


function resizeImage(fullpath, callback) {

	var lwip = require('lwip');
	var arr = fullpath.split("/");
	var fname = arr[arr.length - 1];
	var tfname = "thumb_" + fname;
	var fulltfname = fullpath.replace(fname, tfname);

	// obtain an image object:
	lwip.open(fullpath, function (err, image) {

		// check err...
		// manipulate image:
		image.resize(50, 50, function (err, image) {
			image.writeFile(fulltfname, function (err) {
				// check err...
				// done.
				console.log("thumbnail created for " + fullpath)
				callback();
			});
		});
	});

}


function decodeBase64Image(dataString) {
	var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
		response = {};

	if (matches.length !== 3) {
		return new Error('Invalid input string');
	}

	response.type = matches[1];
	response.data = new Buffer(matches[2], 'base64');

	return response;
}


function readCronacaMongo(garaid, callback) {
	var jfname = "cronaca_" + garaid + ".json";
	mongo.getfile(jfname, function (data) {
		//

		//console.log(data);
		gare = data;
		console.log("read cronaca from mongo " + jfname + " :   " + gare.rows.length);
		callback(data);

	})


}

router.get('/getcronaca/:garaid', function (req, res) {
	var id = req.params.garaid;
	var fname = "data/cronaca_" + id + ".txt";
	var jfname = "data/cronaca_" + id + ".json";
	var cronaca = {
		rows: []
	};

	if (usemongo) {
		readCronacaMongo(id, function (data) {
			data.rows.sort(function (a, b) {
				var a1 = a.time;
				var b1 = b.time;
				if (a1 < b1) return 1;
				if (a1 > b1) return -1;
				return 0;

			})
			cronaca = data;

			res.send(cronaca);
		})




	} else {

		if (fs.existsSync(jfname)) { //file cronaca_garaid.json exists
			// Do something
			console.log(jfname + " file exists");
			var dat = JSON.parse(fs.readFileSync(jfname, 'utf8'));

			//var dat = require('../'+jfname);
			console.log("rows in " + jfname + ": " + dat.rows.length);
			dat.rows.sort(function (a, b) {
				var a1 = a.time;
				var b1 = b.time;
				if (a1 < b1) return 1;
				if (a1 > b1) return -1;
				return 0;

			})
			dat.msg = "read locally"
			res.send(dat);
			return;
		} else {
			console.log("Cronaca file " + jfname + " not found on server");
			if (!fs.existsSync(jfname)) { //if not existing check for .txt, if not existing pull it from altervista
				console.log("Trying to retrieve " + jfname + " from altervista ");
				var request = require('request');
				request.get('http://demym.altervista.org/' + fname, function (error, response, body) {
					console.log("got response from altervista");
					console.log(error)
					console.log(response.statusCode)
					if (!error && response.statusCode == 200) {
						var xml = body;
						console.log("altervista cronaca content: " + xml);
						var array = body.split("\n");
						console.log("found " + array.length + " lines of cronaca")
						for (i in array) {
							console.log(array[i])
							var ts = array[i].substring(0, 14).trim();
							var text = array[i].substring(16);
							var row = {

								time: ts,
								text: text
							}
							cronaca.rows.push(row);
							//console.log(ts+" - "+text);
						}

						cronaca.rows.sort(function (a, b) {
							var a1 = a.time;
							var b1 = b.time;
							if (a1 < b1) return 1;
							if (a1 > b1) return -1;
							return 0;

						})

						fs.writeFile(jfname, JSON.stringify(cronaca), function (err) {
							if (err) return console.log(err);
							console.log("File " + jfname + " saved on server");
							//var dat = require('../'+jfname);
							var dat = JSON.parse(fs.readFileSync(jfname, 'utf8'));
							console.log(dat.rows.length);
						});
						cronaca.msg = "retrieved from altervista";
						res.send(cronaca);
						return;

					}


					if (!error && response.statusCode == 404) {
						console.log("File " + fname + " not found on altervista");
						console.log("initializing new file " + jfname);
						fs.writeFile(jfname, JSON.stringify(cronaca), function (err) {
							if (err) return console.log(err);
							console.log("File " + jfname + " saved on server");
							//var dat = require('../'+jfname);
							var dat = JSON.parse(fs.readFileSync(jfname, 'utf8'));
							console.log(dat.rows.length);
						});
						cronaca.msg = "Not found on altervista, initialized";
						res.send(cronaca);
						return;
					}

					if (error) {
						console.log("error reading remote file: " + error.message);
						fs.writeFile(jfname, JSON.stringify(cronaca), function (err) {
							if (err) return console.log(err);
							console.log("File " + jfname + " saved on server");
							//var dat = require('../'+jfname);
							var dat = JSON.parse(fs.readFileSync(jfname, 'utf8'));
							console.log(dat.rows.length);
						});
						cronaca.msg = "Not found on altervista, initialized";
						res.send(cronaca);
						return;
					}
				});

			}
		}

	}
})



router.post('/delcronaca/:garaid/:timeid', function (req, res) {
	var id = req.params.garaid;
	var timeid = req.params.timeid;
	var fname = "cronaca_" + id + ".json";
	var cronaca = {
		rows: []
	};

	if (usemongo) {
		readCronacaMongo(id, function (data) {




			if (data.rows.length > 0) {


				for (var i = 0; i < data.rows.length; i++) {

					var t = data.rows[i].time;
					if (t != timeid) {
						cronaca.rows.push(data.rows[i]);


					}


				}
				mongo.resetfile(fname, cronaca, function () {

					console.log("cronaca resetted for file " + fname + " on mongodb")
					res.send(cronaca);
				})


			} else res.send(cronaca)




		})
	}
});



router.post('setrealtime/:realtime/:garaid/:matchid', function (req, res) {

	var body = req.body;
	var garaid = req.params.garaid;
	var matchid = req.params.matchid;
	var rt = req.params.realtime;
	var realtime = false;
	if (rt == true) realtime = true;
	var newrt = {};
	console.log("**************");
	console.log("Match setrealtime id=" + matchid + ": " + JSON.stringify(body));
	console.log("**************");

	var doc = {
		doc: body
	}


	if (usemongo) {
		mongo.updateRecord("matches_" + garaid + ".json", matchid, doc, function (data) {
			utils.colog("match " + matchid + " updated on mongo");
			//ressent=true;
			//console.log(data);
			res.send(data);
		});
	}


});

router.post('/update/:garaid/:matchid', function (req, res) {
	var body = req.body;
	var garaid = req.params.garaid;
	var matchid = req.params.matchid;
	var sresult = "false";
	var savedmatch = false;
	var action = "";
	console.log("*****************************************************************************************");
	console.log("Update match id=" + matchid + ": " + JSON.stringify(body));
	console.log("*****************************************************************************************");
	if (body.admin_action) {

		action = body.admin_action;
		delete body.admin_action;
	}
	if (body.savedmatch) {
		if (String(body.savedmatch) == "true") savedmatch = true;
	}
	if (req.query.setresult) sresult = req.query.setresult;
	var setresult = false;
	if (sresult == "true") setresult = true;

	var newrt = {};


	var doc = {
		doc: body
	}

	doc.doc.admin_action = "";
	var io = global.io;

	if (usemongo) {
		mongo.updateRecord("matches_" + garaid + ".json", matchid, doc, function (data) {
			console.log("match " + matchid + " updated on mongo, action", action);

			//console.log(data);
			/*var temporeale = false;
			if (body.hasOwnProperty("realtime")) {
				if (String(body.realtime) == "true") temporeale = true;
			}*/


			//if (savedmatch || temporeale) {
			if ((action == "realtime_on") || (action == "realtime_off") || (action = "setresult")) {
				if (io) {
					io.emit("updategara", {
						garaid: garaid
					});

				} else {
					console.log("socket not connected")
				}
			}



			//var disputato = false;
			//if (body.disputato) {
			//	if (body.disputato == "yes") {
			if (action == "realtime_off") {
				realtime.remove(garaid, matchid);
				disputato = true;
				/*var sock = global.socket;
				console.log("sending refreshrealtime");
				sock.broadcast.emit("realtimematches", {
					matches: realtime.getRealtimeMatches()
				});*/



			}
			//}




			//if (!disputato) {
			/*	if (body.hasOwnProperty("realtime")) {

					console.log("this call has realtime parameter !", body.realtime);

*()
					/*	if (String(body.realtime) == "false") {
							realtime.remove(garaid, matchid);
					*/
			//	}

			//if (String(body.realtime) == "true") {
			if (action == "realtime_on") {
				newrt = {
					"type": "realtime",
					"to": "all",
					"garaid": garaid,
					"matchid": matchid,
					"result": "0-0",
					"round": "1",
					"fineround": false,
					"running": true,
					"paused": false,
					"ammoniz1": 0,
					"ammoniz2": 0,
					"event": "realtime",
					"text": "TEMPO REALE !",
					"active": true
				}

				newrt.match = data;

				/*if (newrt.match.hasOwnProperty("avversario")){
					if (newrt.match.avversario.trim()!="") newrt.avversario=newrt.match.avversario;
				}*/
				console.log("newrt data", data);

				realtime.syncRealtimeMatches(newrt);

				

				/*var obj={
					text: chatobj.nickname+" ha postato un'immagine",
					title: "ChatKwonDo",
					icon: "ic_launcher",
					color: "#000000",
					tag: "appkwondov2",
					badge: "1",
					topic: "appkwondov2",
					token: ""
				
				}
				gcm2.sendToAll(obj,function(data){
					console.log("gcmsendtoall done",data);
				})*/
				/*	console.log("sending realtimematches");
					io.emit("realtimematches", {
						matches: realtime.getRealtimeMatches()
					});*/
					var nottitle="TEMPO REALE !";

					if (newrt.match.hasOwnProperty("matchord")){
						if (newrt.match.matchord.trim()!=""){
							nottitle+=" "+newrt.match.matchord;
						}
					}

					var obj={
						title: nottitle,
						text: newrt.match.matchid+" - "+newrt.match.atletaname
						
					}
					/*fcm.send.fcmSend(obj,function(fcmdata){
						console.log("fcm sent",fcmdata)
					})*/
					fcm.sendToAll(obj,function(data){
						console.log("gcmsendtoall done",data);
					})

				



			}

			console.log("sending realtimematches");
			io.emit("realtimematches", {
				matches: realtime.getRealtimeMatches()
			});






			//	}




			res.send(data);
			//console.log("res sent");
			return;
		})

	}






	readMatchesJson(garaid, function (data) {
		if (!data) data = {
			rows: []
		};
		//console.log("matches rows: " + data.rows.length);
		for (var i = 0; i < data.rows.length; i++) {

			var row = data.rows[i].doc;
			//console.log(row.id);
			if (row.id.trim() == matchid.trim()) {
				//colog("found match " + row.id + " to update");
				for (var key in body) {
					// console.log("key: "+key);
					//if (p.hasOwnProperty(key)) {
					//console.log("key: "+key+"   value: "+p[key]);
					row[key] = body[key];
					//}
				}
			}

		}
		var fname = "data/matches_" + garaid + ".json";
		fs.writeFile(fname, JSON.stringify(data), function (err) {
			if (err) return console.log(err);
			colog('File ' + fname + ' updated on server');
			var fullUrl = req.protocol + '://' + req.get('host');
			saveToAltervista(fullUrl + "/matches/findbygaraid/" + garaid, "matches_" + garaid + ".json");
			//res.send({"error":false,"msg":"Delete match "+matchid+" for gara "+garaid});
		});
		//res.send(data);
	});


});




router.post('/delete/:garaid/:matchid', function (req, res) {
	var garaid = req.params.garaid;
	var matchid = req.params.matchid;
	console.log("Delete match id=" + matchid);
	mongo.deleteRecord("matches_" + garaid + ".json", matchid, function (data) {

		res.send({
			"error": false,
			"msg": "Deleted match " + matchid + " for gara " + garaid
		});
	});


	//return;
	readMatchesJson(garaid, function (data) {
		if (!data) data = {
			rows: []
		};
		console.log("matches rows: " + data.rows.length);
		for (var i = 0; i < data.rows.length; i++) {

			var row = data.rows[i].doc;
			console.log(row.id);
			if (row.id.trim() == matchid.trim()) {
				data.rows.splice(i, 1);
				console.log("match " + matchid + " deleted");
			}

		}



		console.log("matches rows: " + data.rows.length);
		var fname = "data/matches_" + garaid + ".json";
		fs.writeFile(fname, JSON.stringify(data), function (err) {
			if (err) return console.log(err);
			console.log('File ' + fname + ' updated on server');
			var fullUrl = req.protocol + '://' + req.get('host');
			saveToAltervista(fullUrl + "/matches/findbygaraid/" + garaid, "matches_" + garaid + ".json");
			//res.send({"error":false,"msg":"Delete match "+matchid+" for gara "+garaid});
		});
	});


});


router.post('/add/:garaid', function (req, res) {
	var body = req.body;
	var garaid = req.params.garaid;

	var doc = {
		doc: body
	}



	var rows = [];
	mongo.getfile("matches_" + garaid + ".json", function (data) {
		//readMatchesJson(garaid,function(data) {

		console.log(data);

		if (data.error) {

			if (String(data.error) == "true") {

				console.log("errore ! " + data.errormsg);
				if (data.errormsg.toLowerCase().indexOf("not found in mongodb collection") > -1) {

					//!!! filename not found in mongo !!
					var fn = "matches_" + garaid + ".json";
					mongo.checkCreateFile(fn, function (data) {


					});
					var fc = "cronaca_" + garaid + ".json";
					mongo.checkCreateFile(fc, function (data) {


					});
					res.send(data)
					return;
				}

			}


		}

		if (!data) data = {
			rows: []
		};

		var arr = doc.doc.matchid.split(",");

		var added = {
			rows: []
		}


		for (var i = 0; i < arr.length; i++) {

			var sdoc = JSON.parse(JSON.stringify(body));


			//sdoc=body;
			delete sdoc.id;
			delete sdoc.matchid;
			delete sdoc.progid;
			sdoc.id = generateId() + i;
			sdoc.matchid = arr[i];
			//sdoc.progid=arr[i].substring(1);
			sdoc.progid = Right(arr[i].trim(), 2); // updated 25/01/2016
			sdoc.garaid = garaid;
			sdoc.medagliamatch = "none";
			sdoc.risultato = "";
			sdoc.dadisputare = "yes";
			sdoc.disputato = "no";



			console.log("added match " + arr[i] + "  - " + JSON.stringify(sdoc));
			data.rows.push({
				doc: sdoc
			});
			added.rows.push({
				doc: sdoc
			});


		}

		mongo.addRecords("matches_" + garaid + ".json", sdoc.id, added.rows, function (data) {
			console.log("added matches rows: " + JSON.stringify(added.rows));
			if (io) {
				io.emit("updategara", {
					garaid: garaid
				});
			}
		});


		//res.send(rows);
		//return;

		//data.rows = data.rows.concat(rows);

		//console.log(JSON.stringify(data));

		var fname = "data/matches_" + garaid + ".json";
		fs.writeFile(fname, JSON.stringify(data), function (err) {
			if (err) return console.log(err);
			console.log('File ' + fname + ' updated on server');
			var fullUrl = req.protocol + '://' + req.get('host');
			saveToAltervista(fullUrl + "/matches/findbygaraid/" + garaid, "matches_" + garaid + ".json");
			//res.send({"error":false,"msg":"Added match "+doc.doc.matchid+" for atleta "+doc.doc.atletaname,"addedmatches": added, "match":data});
		});
		res.send({
			"error": false,
			"msg": "Added match " + doc.doc.matchid + " for atleta " + doc.doc.atletaname,
			"addedmatches": added,
			"match": data
		});


	})



})


router.post('/addforme/:garaid', function (req, res) {
	var body = req.body;
	var garaid = req.params.garaid;

	var doc = {
		doc: body
	}



	var rows = [];
	mongo.getfile("matches_" + garaid + ".json", function (data) {
		//readMatchesJson(garaid,function(data) {

		console.log(data);

		if (data.error) {

			if (String(data.error) == "true") {

				console.log("errore ! " + data.errormsg);
				if (data.errormsg.toLowerCase().indexOf("not found in mongodb collection") > -1) {

					//!!! filename not found in mongo !!
					var fn = "matches_" + garaid + ".json";
					mongo.checkCreateFile(fn, function (data) {


					});
					var fc = "cronaca_" + garaid + ".json";
					mongo.checkCreateFile(fc, function (data) {


					});
					res.send(data)
					return;
				}

			}


		}

		if (!data) data = {
			rows: []
		};

		var arr = doc.doc.matchid.split(",");

		var added = {
			rows: []
		}


		for (var i = 0; i < arr.length; i++) {

			var sdoc = JSON.parse(JSON.stringify(body));


			//sdoc=body;
			delete sdoc.id;
			delete sdoc.matchid;
			delete sdoc.progid;
			sdoc.id = generateId() + i;
			sdoc.votazione = arr[i];
			//sdoc.progid=arr[i].substring(1);
			//sdoc.progid=Right(arr[i].trim(),2);   // updated 25/01/2016
			sdoc.garaid = garaid;
			//sdoc.medagliamatch="none";
			//sdoc.votazione="";
			//sdoc.dadisputare="yes";
			//sdoc.disputato="no";



			console.log("added match forme " + arr[i] + "  - " + JSON.stringify(sdoc));
			data.rows.push({
				doc: sdoc
			});
			added.rows.push({
				doc: sdoc
			});


		}

		mongo.addRecords("matches_" + garaid + ".json", sdoc.id, added.rows, function (data) {
			console.log("added matches rows: " + JSON.stringify(added.rows));
		});


		//res.send(rows);
		//return;

		//data.rows = data.rows.concat(rows);

		//console.log(JSON.stringify(data));

		var fname = "data/matches_" + garaid + ".json";
		fs.writeFile(fname, JSON.stringify(data), function (err) {
			if (err) return console.log(err);
			console.log('File ' + fname + ' updated on server');
			var fullUrl = req.protocol + '://' + req.get('host');
			saveToAltervista(fullUrl + "/matches/findbygaraid/" + garaid, "matches_" + garaid + ".json");
			//res.send({"error":false,"msg":"Added match "+doc.doc.matchid+" for atleta "+doc.doc.atletaname,"addedmatches": added, "match":data});
		});
		res.send({
			"error": false,
			"msg": "Added match " + doc.doc.matchid + " for atleta " + doc.doc.atletaname,
			"addedmatches": added,
			"match": data
		});


	})



})


router.get('/findallbygaraid/:garaid', function (req, res) {
	var id = req.params.garaid;
	console.log("called  findAllByGaraId for gara " + id);
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
			console.log("file matches_" + id + ".json retrieved from db and saved in local data folder")
		});
		res.send(data);
	});

});

router.get('/findbygaraid/:garaid', function (req, res) {
	var id = req.params.garaid;
	var societa = "";
	if (req.query) {

		if (req.query.societa) societa = req.query.societa;

	}
	console.log("called  findByGaraId for gara " + id + " and societa " + societa);
	mongo.getfile("matches_" + id + ".json", function (data) {

		var data2 = {
			rows: []
		};

		if (societa.trim() != "") {
			for (var i = 0; i < data.rows.length; i++) {

				var soc = "20160217220400"; //rozzano
				if (data.rows[i].doc.societaid) soc = data.rows[i].doc.societaid;

				if (soc == societa) data2.rows.push(data.rows[i]);

			}
		} else data2 = data;



		if (!data2) data2 = {
			rows: []
		};
		data2.rows.sort(function (a, b) {
			var a1 = a.doc.progid;
			var b1 = b.doc.progid;
			if (a1 > b1) return 1;
			if (a1 < b1) return -1;
			return 0;
		})
		fs.writeFile("data/matches_" + id + ".json", JSON.stringify(data2), function (err) {
			if (err) {
				return console.log(err);

			}
			console.log("file matches_" + id + ".json retrieved from db and saved in local data folder")
		});
		res.send(data2);
	});

})

router.get('/findbygaraidold/:garaid', function (req, res) {

	var id = req.params.garaid;
	console.log("called  findByGaraId for gara " + id);
	var fname = "matches_" + id + ".xml";
	console.log("fname: " + fname)

	//var atleti = loadJSONfile(__dirname + '/atleti.json');
	//console.log(atleti.length);
	var cronfname = "cronaca_" + id + ".txt";
	getAltervistaFile(cronfname, function (data) {

		console.log("got " + cronfname + " from altervista");
	})


	if (alterbridge) {

		var request = require('request');
		request.get('http://demym.altervista.org/' + fname, function (error, response, body) {
			if (!error && response.statusCode == 200) {
				var xml = body;
				//console.log(xml);
				fs.writeFile(fname, xml, function (err) {
					if (err) {
						return console.log(err);

					}

					console.log("Remote file " + fname + " was saved!");

					fs.readFile(fname, "utf-8", function (err, data) {
						if (err) {
							console.log("error reading " + fname + ": " + err.message);
							res.send({
								"error": true,
								"message": err.message,
								"rows": []
							});
							return;
						}
						console.log("Read file " + fname);
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

							matches = result;
							//console.log(JSON.stringify(result));

							if (Array.isArray(result.matches.match)) {
								console.log("Loaded " + result.matches.match.length + " matches for gara " + id);
								matches = xform(matches);
								matches.rows.sort(function (a, b) {

									var a1 = a.doc.progid;
									var b1 = b.doc.progid;
									if (a1 > b1) return 1;
									if (a1 < b1) return -1;
									return 0;

								})
								console.log("Loaded " + matches.rows.length + " matches for gara " + id);
								//atleti=result;
								//console.log(JSON.stringify(xform(result)));
								res.send(matches);
							} else {
								console.log("No matches found for gara " + id)
								res.send({
									rows: []
								});
							}
							//console.log('Read file atleti.xml: '+atleti.length);
						});
					});


				});
				// Continue with your processing here.
			}
			if (error) {
				console.log("error reading remote file: " + error.message);
				res.send({
					"error": true,
					"message": error.message,
					"rows": []
				});
				return;
			}
		});

	} else {
		readMatchesJson(id, function (data) {
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
			res.send(data);


		})

	}

});



router.get('/getmedaglie/:garaid', function (req, res) {


	var id = req.params.garaid;
	var medaglie = {
		ori: 0,
		argenti: 0,
		bronzi: 0
	}
	console.log("called  getmedaglie for gara " + id);
	var fname = "matches_" + id + ".xml";
	console.log("fname: " + fname)

	//var atleti = loadJSONfile(__dirname + '/atleti.json');
	//console.log(atleti.length);
	var cronfname = "cronaca_" + id + ".txt";

	/*getAltervistaFile(cronfname,function(data) {
	  
	  console.log("got "+cronfname+" from altervista"); 
  })*/


	if (alterbridge) {

		var request = require('request');
		request.get('http://demym.altervista.org/' + fname, function (error, response, body) {
			if (!error && response.statusCode == 200) {
				var xml = body;
				//console.log(xml);
				fs.writeFile(fname, xml, function (err) {
					if (err) {
						res.send(err)
						return console.log(err);

					}

					console.log("Remote file " + fname + " was saved!");

					fs.readFile(fname, "utf-8", function (err, data) {
						if (err) {
							console.log("error reading " + fname + ": " + err.message);
							res.send({
								"error": true,
								"message": err.message,
								"rows": []
							});
							return;
						}
						console.log("Read file " + fname);
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

							matches = result;
							//console.log(JSON.stringify(result));

							if (Array.isArray(result.matches.match)) {
								console.log("Loaded " + result.matches.match.length + " matches for gara " + id);
								matches = xform(matches);

								for (var i = 0; i < matches.rows.length; i++) {

									var m = matches.rows[i].doc;

									if (m.medagliamatch) {

										if (m.medagliamatch.toLowerCase() == "oro") medaglie.ori++;
										if (m.medagliamatch.toLowerCase() == "argento") medaglie.argenti++;
										if (m.medagliamatch.toLowerCase() == "bronzo") medaglie.bronzi++;
									}

								}


								console.log("Medaglie: " + JSON.stringify(medaglie));
								//atleti=result;
								//console.log(JSON.stringify(xform(result)));
								res.send(medaglie);
							} else {
								console.log("No matches found for gara " + id)
								res.send(medaglie);
							}
							//console.log('Read file atleti.xml: '+atleti.length);
						});
					});


				});
				// Continue with your processing here.
			}
			if (error) {
				console.log("error reading remote file: " + error.message);
				res.send({
					"error": true,
					"message": error.message,
					"rows": []
				});
				return;
			}
		});

	} else {
		readMatchesJson(id, function (data) {
			// if (!data) data={rows: []};
			console.log("read " + data.rows.length + " matches for garaid=" + id);

			if (data.rows.length > 0) {

				for (var i = 0; i < data.rows.length; i++) {

					var m = data.rows[i].doc;

					if (m.medagliamatch.toLowerCase() == "oro") medaglie.ori++;
					if (m.medagliamatch.toLowerCase() == "argento") medaglie.argenti++;
					if (m.medagliamatch.toLowerCase() == "bronzo") medaglie.bronzi++;


				}

			}

			res.send(medaglie);


		})

	}

});


router.get('/findbygaraid/byatleta/:garaid', function (req, res) {
	var id = req.params.garaid;

	var societa = "";
	if (req.query) {

		if (req.query.societa) societa = req.query.societa;

	}

	console.log("called  findByGaraId/byatleta for gara " + id + " e societa " + societa);

	mongo.getfile("atleti.json", function (atleti) {

		findAllByAtleta(id, function (dat) {
			console.log(dat)
			if (societa.trim() !== "") {
				var dat2 = [];
				for (var i = 0; i < dat.length; i++) {

					var atl = getAtletaById(dat[i].id, atleti);
					var s = atl.societaid;
					if (s == societa) dat2.push(dat[i]);

				}
				res.send(dat2);



			} else res.send(dat);
		})
	});

});


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


router.get('/findbygaraidold/byatleta/:garaid', function (req, res) {

	var id = req.params.garaid;
	console.log("called  findByGaraId for gara " + id);
	var fname = "matches_" + id + ".xml";
	var jfname = "data/matches_" + id + ".json";
	console.log("fname: " + fname)

	//var atleti = loadJSONfile(__dirname + '/atleti.json');
	//console.log(atleti.length);

	if (alterbridge) {

		var request = require('request');
		request.get('http://demym.altervista.org/' + fname, function (error, response, body) {
			if (!error && response.statusCode == 200) {
				var xml = body;
				//console.log(xml);
				fs.writeFile(fname, xml, function (err) {
					if (err) {
						return console.log(err);

					}

					console.log("Remote file " + fname + " was saved!");

					fs.readFile(fname, "utf-8", function (err, data) {
						if (err) {
							console.log("error reading " + fname + ": " + err.message);
							res.send({
								"error": true,
								"message": err.message,
								"rows": []
							});
							return;
						}
						console.log("Read file " + fname);
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

							matches = result;
							if (Array.isArray(result.matches.match)) {
								matches = xform(matches);
								matches.rows.sort(function (a, b) {

									var a1 = a.doc.progid;
									var b1 = b.doc.progid;
									if (a1 > b1) return 1;
									if (a1 < b1) return -1;
									return 0;

								})
								fs.writeFile(jfname, JSON.stringify(matches), function (err) {
									if (err) return console.log(err);
									console.log('File ' + jfname + ' saved on server');
									//var dat = require('../'+jfname);
									var dat = JSON.parse(fs.readFileSync(jfname, 'utf8'));
									console.log(dat.rows.length);
								});
								console.log("Loaded " + result.matches.match.length + " matches for gara " + id);
								//atleti=result;
								//console.log(JSON.stringify(xform(result)));
								findAllByAtleta(id, function (data) {

									res.send(data);
								})
							} else {
								console.log("No matches found for gara " + id)
								res.send([]);

							}

							//console.log('Read file atleti.xml: '+atleti.length);
						});
					});


				});
				// Continue with your processing here.
			}
			if (error) {
				console.log("error reading remote file: " + error.message);
				res.send({
					"error": true,
					"message": error.message,
					"rows": []
				});
				return;
			}
		});

	} else {

		findAllByAtleta(id, function (dat) {

			res.send(dat);
		})




	}

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

	console.log('findMatchById: ' + id);
	console.log("matches totali: " + atleti.length);
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


function findAll(callback) {



	console.log('matches findAll');



	var data = xform(matches);

	data.rows.sort(function (a, b) {

		var a1 = a.doc.cognome;
		var b1 = b.doc.cognome;
		if (a1 > b1) return 1;
		if (a1 < b1) return -1;
		return 0;
	})



	callback(data);
	//res.render('lv_atleti.ejs',{ posts: atleti});
	// res.send(atleti);
};


function findAllCronaca(garaid, callback) {
	var id = garaid;
	readCronacaMongo(id, function (data) {
		data.rows.sort(function (a, b) {
			var a1 = a.time;
			var b1 = b.time;
			if (a1 < b1) return 1;
			if (a1 > b1) return -1;
			return 0;

		})
		cronaca = data;

		//res.send(cronaca);
		if (callback) callback(cronaca);
	})


}

function findAllByMatch(garaid, callback) {
	var id = garaid;
	console.log("called  findByGaraId for gara " + id);
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
			console.log("file matches_" + id + ".json retrieved from db and saved in local data folder")
		});
		if (callback) callback(data);
	});


}

function findAllByAtleta(garaid, callback) {

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

		console.log(atleticount + " unique atleti");

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
				if (count == 1) {

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

	for (var i = 0; i < d.matches.match.length; i++) {
		// console.log(i);	 
		var doc = {};
		var p = d.matches.match[i];
		var element = {}
		for (var key in p) {
			// console.log("key: "+key);
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

function sdebug(txt) {
	console.log(txt);

}


function generateId() {
	var today = new Date();
	var id = today.juliandate();
	return id;
}

Date.prototype.juliandate = function () {
	var yyyy = this.getFullYear().toString();
	var MM = (this.getMonth() + 1).toString(); // getMonth() is zero-based
	var dd = this.getDate().toString();
	var hh = this.getHours();
	var mm = this.getMinutes();
	var ss = this.getSeconds();
	var ms = this.getMilliseconds();
	utils.colog("milliseconds: " + ms)

	var n = 2;
	var jdate = yyyy + padZeros(MM, n) + padZeros(dd, n) + padZeros(hh, n) + padZeros(mm, n) + padZeros(ss, n) + padZeros(ms, 3);
	utils.colog("jdate: " + jdate);

	//var jdate  =yyyy+(MM[1]?MM:"0"+MM[0]) + (dd[1]?dd:"0"+dd[0]) + (hh[1]?hh:"0"+hh[0]) + (mm[1]?mm:"0"+mm[0]) + (ss[1]?ss:"0"+ss[0]);
	return jdate; // padding
};

Date.prototype.juliandateshort = function () {
	var yyyy = this.getFullYear().toString();
	var MM = (this.getMonth() + 1).toString(); // getMonth() is zero-based
	var dd = this.getDate().toString();
	var hh = this.getHours();
	var mm = this.getMinutes();
	var ss = this.getSeconds();
	//var ms = this.getMilliseconds();
	//console.log("milliseconds: "+ms)

	var n = 2;
	var jdate = yyyy + padZeros(MM, n) + padZeros(dd, n) + padZeros(hh, n) + padZeros(mm, n) + padZeros(ss, n);
	utils.colog("jdate: " + jdate);

	//var jdate  =yyyy+(MM[1]?MM:"0"+MM[0]) + (dd[1]?dd:"0"+dd[0]) + (hh[1]?hh:"0"+hh[0]) + (mm[1]?mm:"0"+mm[0]) + (ss[1]?ss:"0"+ss[0]);
	return jdate; // padding
};




function padZeros(theNumber, max) {
	var numStr = String(theNumber);

	while (numStr.length < max) {
		numStr = '0' + numStr;
	}

	return numStr;
}

function saveToAltervista_old(path, fname) {
	var url = altervistaurl + "/savefile.php?url=" + path + "&filename=" + fname;

	utils.colog("saving to altervista at url: " + url);
	request.get(url, function (error, response, body) {
		utils.colog(body);

	});


}

function sendMediaFileToAltervista(filename, content) {
	var dat = content;
	//dat = data;

	utils.colog("sendtoaltervsita filename: " + filename);
	var headers = {
		'User-Agent': 'Super Agent/0.0.1',
		'Content-Type': 'application/jsonrequest'
	}


	// Configure the request
	var options = {
		url: altervistaurl + '/savemedia.php?encode=yes',
		method: 'POST',
		headers: headers,
		dataType: "json",
		form: {
			'filename': filename,
			'fdata': dat
		}
	}
	utils.colog(options.url)
	// Start the request
	request(options, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			// Print out the response body
			//utils.colog(body)
			utils.colog("file " + filename + " saved on altervista");
		}
		if (error) {
			console.log(error);
		}

	})


}

function saveFileToAltervista(fullpath) {
	var dat; // = require('../data/'+filename);
	utils.colog("saving " + fullpath + " to altervista");

	var arr = fullpath.split("/");
	var filename = arr[arr.length - 1];
	utils.colog("filename: " + filename)

	fs.readFile(fullpath, function (err, data) {
		if (err) {

			console.log("error!", err);
			return;
		}
		//console.log(data)

		dat = data;

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
				'fdata': dat
			}
		}
		utils.colog(options.url)
		// Start the request
		request(options, function (error, response, body) {
			if (!error && response.statusCode == 200) {
				// Print out the response body
				//utils.colog(body)
				utils.colog("file " + filename + " saved on altervista");
			}
			if (error) {
				console.log(error);
			}

		})
	});


}

function saveToAltervista(finto, filename) {
	var dat; // = require('../data/'+filename);

	fs.readFile('./data/' + filename, 'utf8', function (err, data) {
		if (err) throw err;
		//console.log(data)
		dat = JSON.parse(data);

		//console.log("savetoaltervista filename: " + filename);
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
		//console.log(options.url)
		// Start the request
		request(options, function (error, response, body) {
			if (!error && response.statusCode == 200) {
				// Print out the response body
				//console.log(body)
				console.log("file " + filename + " saved on altervista");
			}
			if (error) {
				console.log(error);
			}

		})
	});

}


function Right(str, n) {
	if (n <= 0)
		return "";
	else if (n > String(str).length)
		return str;
	else {
		var iLen = String(str).length;
		return String(str).substring(iLen, iLen - n);
	}
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
	findAllByAtleta(id, function (dat) {

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


router.get("/byprog/:id", function (req, res) {
	var id = req.params.id;
	getmatchesbyprog(id, function (data) {
		res.send(data);
	})

})


router.get("/byatleta/:id", function (req, res) {
	var id = req.params.id;
	getmatchesbyatleta(id, function (data) {
		res.send(data);
	})

})


router.get("/cronaca/:id", function (req, res) {
	var id = req.params.id;
	getcronaca(id, function (data) {
		res.send(data);
	})

})

function base64_encode(fname) {
	// read binary data
	var bitmap = fs.readFileSync(fname);
	console.log("bitmap", bitmap)
	// convert binary data to base64 encoded string
	var b64 = bitmap.toString("base64");
	console.log(b64);
	var base64Image = new Buffer(bitmap, 'binary').toString('base64');
	//return new Buffer(bitmap).toString('base64');
	return b64;
}

function encodeBase64Image(src, format) {
	var data = fs.readFileSync(src);
	console.log(data);
	var b64 = data.toString("base64");
	console.log("base64: ", b64);
	return b64;

	return;
	console.log("trying to base64decode " + src)
	var data = fs.readFileSync(src).toString("base64");
	return util.format("data:%s;base64,%s", mime.lookup(src), data);
}


router.post("/setresultok", function (req, res) {

	var body = req.body;
	var match = body.match;
	var atl = body.atl;
	var mfa = body.mfa.rows;
	setResultOk(match, atl, mfa, function (data) {
		realtime.remove(match.garaid, match.id);
		console.log("sending realtimematches");
		io.emit("realtimematches", {
			matches: realtime.getRealtimeMatches()
		});
		res.send(data);
	});

})

function setResultOk(match, atl, mfa, callback) {

	var retmatches = [];
	if (!match) {
		match = {
			garaid: "20160610185130",
			id: "201606101852231011",
			matchid: "104",
			risultato: "2-0"
		}
	}
	if (!atl) {
		atl = {

			atletaid: "20150211120920",
			categoriapeso: "-79",
			cintura: "Verde",
			cognome: "Agrillo",
			datanascita: "01.01.2005",
			id: "20150211120920",
			nome: "Simone",
			palestra: "via Cervi - Rozzano",
			punticlass: "0",
			sesso: "M",
			societaid: "20160217220400",
			squadra: "Serie B"
		}
	}

	if (!mfa) {
		mfa = [{
			"doc": {
				"societaid": "20160217220400",
				"societaname": "ASD TAEKWONDO ROZZANO",
				"garaid": "20160610185130",
				"atletaid": "20150211120920",
				"atletaname": "Agrillo Simone",
				"risultato": "11-7",
				"ordine": "1",
				"vinto": "yes",
				"disputato": "yes",
				"dadisputare": "yes",
				"color": "blue",
				"lastupdate": "never",
				"datanascita": "01.01.2005",
				"id": "201606101852231000",
				"matchid": "101",
				"progid": "01",
				"medagliamatch": "none",
				"realtime": false,
				"goldenpoint": "false",
				"admin_action": "",
				"imgsrc": "assets/img/matchok.png"
			}
		}, {
			"doc": {
				"societaid": "20160217220400",
				"societaname": "ASD TAEKWONDO ROZZANO",
				"garaid": "20160610185130",
				"atletaid": "20150211120920",
				"atletaname": "Agrillo Simone",
				"risultato": "5-0",
				"ordine": "1",
				"vinto": "no",
				"disputato": "no",
				"dadisputare": "yes",
				"color": "blue",
				"lastupdate": "never",
				"datanascita": "01.01.2005",
				"id": "201606101852231011",
				"matchid": "104",
				"progid": "04",
				"medagliamatch": "none",
				"realtime": "false",
				"goldenpoint": "false",
				"savedmatch": "true",
				"admin_action": "",
				"imgsrc": "assets/img/matchtoplay.png"
			}
		}, {
			"doc": {
				"societaid": "20160217220400",
				"societaname": "ASD TAEKWONDO ROZZANO",
				"garaid": "20160610185130",
				"atletaid": "20150211120920",
				"atletaname": "Agrillo Simone",
				"risultato": "3-0",
				"ordine": "1",
				"vinto": "no",
				"disputato": "no",
				"dadisputare": "yes",
				"color": "blue",
				"lastupdate": "never",
				"datanascita": "01.01.2005",
				"id": "201609151233125320",
				"matchid": "109",
				"progid": "09",
				"medagliamatch": "none",
				"realtime": "false",
				"goldenpoint": "false",
				"savedmatch": "true",
				"admin_action": "",
				"imgsrc": "assets/img/matchtoplay.png"
			}
		}, {
			"doc": {
				"societaid": "20160217220400",
				"societaname": "ASD TAEKWONDO ROZZANO",
				"garaid": "20160610185130",
				"atletaid": "20150211120920",
				"atletaname": "Agrillo Simone",
				"risultato": "",
				"ordine": "1",
				"vinto": "no",
				"disputato": "no",
				"dadisputare": "yes",
				"color": "blue",
				"lastupdate": "never",
				"datanascita": "01.01.2005",
				"id": "201705240731153460",
				"matchid": "125",
				"progid": "25",
				"medagliamatch": "none",
				"savedmatch": "true",
				"realtime": "false",
				"admin_action": "",
				"imgsrc": "assets/img/matchtoplay.png"
			}
		}]
	}

	mongo.getfile("matches_" + match.garaid + ".json", function (allmatches) {
		mongo.getfile("atleti.json", function (atleti) {
			var doposts = false;
			var notifica = true;

			var cronacatxt = "";
			var derbytext = "";
			var ordarr = new Array("primo", "secondo", "terzo", "quarto", "quinto", "sesto", "settimo", "ottavo", "nono", "decimo");
			var ordbinarr = new Array("finale", "semifinale", "quarto di finale", "ottavo di finale", "sedicesimo di finale", "trentaduesimo di finale");
			var result = match.risultato;
			var goldenpoint = false;
			var avversario = "";
			if (match.hasOwnProperty("goldenpoint")) {
				if (String(match.goldenpoint) == 'true') goldenpoint = true;
			}
			if (match.hasOwnProperty("avversario")) {
				if (match.avversario.trim() != "") {
					avversario = match.avversario;
				}
			}
			console.log("goldenpoint: " + goldenpoint);
			//return;
			//return;

			//alert($("ul#lista li.liselected").length);

			var id = match.id;

			//id = $("#popResult #matchid").val();
			var matchnumber = match.matchid;
			console.log("setting result for match " + id);






			utils.colog("atleta: ", atl);
			utils.colog("mfa", mfa);
			//return;


			var selectedatletaname = atl.cognome + " " + atl.nome;
			//var selectedcat = getCategoria(atl.datanascita);
			var name = atl.cognome + " " + atl.nome;
			//alert(id);

			//var valore=$("input:checkbox[name=radio-choice-0]:checked").val();

			var valore = "nondisputato";

			var arrvinto = result.split("-");
			var r1 = parseInt(arrvinto[0], 10);
			var r2 = parseInt(arrvinto[1], 10);


			if (r1 > r2) valore = "vinto";
			if (r2 > r1) valore = "perso";
			var isSqualifica = false;
			if (match.hasOwnProperty("squalifica")) {
				if (String(match.squalifica) == "true") {
					valore = "perso";
					isSqualifica = true;
				}
			}
			if (result == "0-0") valore = "nondisputato";
			//alert(valore);

			var doc = {};


			var url = "updagent.php?action=edit&tag=match";

			var urln = "/matches/update/" + match.garaid + "/" + match.id;

			var ln = mfa.length;

			//getMatchesForAtleta(jcurrentgara.matchesbyprog);
			var ordidx = 0;
			mfa.forEach(function (item, i) {
				var row = mfa[i];
				var rdoc = row.doc;
				if (rdoc.id == id) {
					ordidx = i;
					doc = rdoc;
				}

			})

			utils.colog("ord1", ordidx);
			//var ord = $("#matchesatleta ul#listampa li#match_" + id).index();
			ord = ordidx;
			ln = mfa.length;
			var ordbin = ln - ord - 1;
			var nextordbin = ordbin - 1;
			//alert(ordbinarr[ordbin])
			//if (nextordbin>-1) alert(ordbinarr[nextordbin])


			var v = "";
			var d = "";
			var dd = "";
			var ris = "";
			var med = "none";

			var vintotxt = "vince";

			if (valore == "nondisputato") {
				v = "no";
				dd = "yes";
				d = "no";
				med = "none";
				notifica = false;

				doc.vinto = v;
				doc.disputato = d;
				doc.dadisputare = dd;
				doc.realtime = false;


			} else {
				if (valore == "vinto") {
					v = "yes";
					vintotxt = "vince";

				}
				if (valore == "perso") {
					v = "no";
					vintotxt = "perde";
				}
				d = "yes";
				dd = "yes";
				//var nincontro=selectedmatchid;
				var nincontro = matchnumber;
				var eunico = "";
				if (ln == 1) eunico = " e unico ";

				var thisincontro = "";
				if (ordbin < 4) thisincontro = ", " + ordbinarr[ordbin];
				utils.colog("ordarr", ordarr[ord], ord);
				cronacatxt += selectedatletaname + " " + vintotxt + " il suo " + ordarr[ord] + " " + eunico + "incontro (n." + nincontro + thisincontro + ") ";
				if (isSqualifica) {
					if (result.trim() != "") cronacatxt += " per squalifica, sul punteggio di " + result;
				} else {

					if (result.trim() != "") cronacatxt += " per " + result;
				}



				doc.vinto = v;
				doc.disputato = d;
				doc.dadisputare = dd;
				doc.realtime = false;

				utils.colog("docvintoperso", doc);

				doc.goldenpoint = goldenpoint;
				if (goldenpoint) {
					if (String(goldenpoint) == "true") {
						cronacatxt += " al golden point "

					}


				}

				if (avversario.trim() != "") {
					var avvnome = avversario.split("|")[0];
					var avvsoc = avversario.split("|")[1];
					cronacatxt += " contro " + avvnome + " di " + avvsoc;
				}

				var escl = "";
				if (nextordbin < 2) escl = " !!";
				if ((nextordbin > -1) && (v == "yes")) cronacatxt += " e va in " + ordbinarr[nextordbin] + escl + ". ";


			}





			url += "&id=" + id;
			url += "&garaid=" + match.garaid;
			url += "&vinto=" + v;
			url += "&disputato=" + d;
			url += "&dadisputare=" + dd;
			if (result.trim() != "") {
				url += "&risultato=" + result;
				doc.risultato = result;

			}



			utils.colog("ln: " + ln);
			utils.colog("ord: " + ord);

			if (parseInt(ord, 10) == (parseInt(ln, 10) - 1)) {
				if (d == "yes") {
					if (v == "no") med = "argento";
					if (v == "yes") med = "oro";
				} else med = "none";
			}

			if (parseInt(ord, 10) == (parseInt(ln, 10) - 2)) {
				if (d == "yes") {
					if (v == "no") med = "bronzo";
				} else med = "none";


			}

			if (med != "none") cronacatxt += ". E' " + med.toUpperCase() + " !";

			url += "&medagliamatch=" + med;
			doc.medagliamatch = med;

			utils.colog(doc);
			utils.colog(cronacatxt);

			retmatches.push(doc);
			//update match successivi e precedenti

			var nextgarecount = 0;
			//$("#matchesatleta ul#listampa li").each(function(i) {
			mfa.forEach(function (item, i) {
				var row = mfa[i];
				var rowdoc = row.doc;
				//var id=$(this).attr("id").replace("match_","");
				var id = rowdoc.id;
				var urlx = "updagent.php?action=edit&tag=match&garaid=" + match.garaid + "&id=" + id;
				var pdoc = rowdoc;


				if (i < ord) {
					utils.colog("gara precedente " + i);
					if (d == "yes") {
						urlx += "&disputato=yes&vinto=yes&dadisputare=yes&medagliamatch=none";
						pdoc.disputato = "yes";
						pdoc.vinto = "yes";
						pdoc.dadisputare = "yes";
						pdoc.medagliamatch = "none";

					}

					//sdebug(urlx);


					urlx = "/matches/update/" + match.garaid + "/" + id;

					retmatches.push(pdoc);
					/*$.ajax({
						type: "POST",
						url: rooturl + urlx,
						data: pdoc,
						async: false
					});*/

					/*$.post(urlx,{ a: '1'},function() {
					});*/

				}

				if (i > ord) {
					utils.colog("gara successiva " + i);
					nextgarecount++;
					if (nextgarecount == 1) {

						// alert("prossima gara: "+id);

						var derbies = getDerby(rowdoc, allmatches, atleti);
						utils.colog("derbies !!", derbies);



						derbies.rows.forEach(function (ditem, i) {
							utils.colog("derby con " + derbies.rows[i].doc.atletaname);
							derbytext = " Sarà derby con " + derbies.rows[i].doc.atletaname + " al " + derbies.rows[i].doc.matchid + " ! "
							var did = derbies.rows[i].doc.id;
							//var urld = "/matches/update/" + jcurrentgara.id + "/" + did;

							if (v == "yes") {
								cronacatxt += derbytext;
								derbies.rows[i].doc.derby = match.id;
								retmatches.push(derbies.rows[i].doc);
								/*$.ajax({
									type: "POST",
									url: rooturl + urld,
									data: {
										derby: id
									},
									async: false
								});*/

								//urld = "/matches/update/" + jcurrentgara.id + "/" + id;
								/*$.ajax({
									type: "POST",
									url: rooturl + urld,
									data: {
										derby: did
									},
									async: false
								});*/
								pdoc.derby = did;

							} else {
								derbies.rows[i].doc.derby = null;
								retmatches.push(derbies.rows[i].doc);
								derbytext = "";

								/*$.ajax({
									type: "POST",
									url: rooturl + urld,
									data: {
										derby: null
									},
									async: false
								});*/
								pdoc.derby = null;

								/*urld = "/matches/update/" + jcurrentgara.id + "/" + id;
								$.ajax({
									type: "POST",
									url: rooturl + urld,
									data: {
										derby: null
									},
									async: false
								});*/


							}

						})




						nextgarecount = 0;
					}



					if (d == "yes") {
						if (v == "yes") {
							urlx += "&disputato=no&vinto=no&dadisputare=yes&medagliamatch=none";
							pdoc.disputato = "no";
							pdoc.vinto = "no";
							pdoc.dadisputare = "yes";
							pdoc.medagliamatch = "none";
						}
						if (v == "no") {
							urlx += "&disputato=no&vinto=no&dadisputare=no&medagliamatch=none";
							pdoc.disputato = "no";
							pdoc.vinto = "no";
							pdoc.dadisputare = "no";
							pdoc.medagliamatch = "none";
						}
					}

					if (d == "no") {
						urlx += "&disputato=no&vinto=no&dadisputare=yes&medagliamatch=none";
						pdoc.disputato = "no";
						pdoc.vinto = "no";
						pdoc.dadisputare = "yes";
						pdoc.medagliamatch = "none";
					}


					urlx = "/matches/update/" + match.garaid + "/" + id;
					pdoc.savedmatch = true;
					pdoc.realtime = false;

					retmatches.push(pdoc);
					//sdebug(urlx);
					/*$.ajax({
						type: "POST",
						url: rooturl + urlx,
						data: pdoc,
						async: false
					});*/

					/*$.post(urlx,{ a: '1'},function() {
					});*/

				}


			});

			var fname = "matches_" + match.garaid + ".json";
			mongo.updateRecords(fname, retmatches, function (data) {
				utils.colog(data);
				var ret = {
					updatedmatches: data,
					matches: retmatches,
					cronacatxt: cronacatxt
				}
				var dataoggi = new Date();
				var tempo = dataoggi.juliandate();

				var chat = {
					garaid: match.garaid,
					nickname: "SYSTEM",
					sockid: "SYSTEM",
					color: "yellow",
					text: cronacatxt,
					time: tempo
				}

				var cron = {
					text: cronacatxt,
					time: tempo
				}


				if ((result.trim() == "0-0") || (result.trim() == "")) { //If result=0-0 no chat msg !!!

					if (io) {
						io.emit("updategara", {
							garaid: match.garaid
						});


					} else {
						console.log("socket not connected")
					}
					if (callback) callback(ret);

				} else {


					var cronfname = "cronaca_" + match.garaid + ".json";
					mongo.addRecord(cronfname, "", cron, function (crdata) {
						utils.colog("cronaca record inserted in " + cronfname, crdata);


						//and finally add chat

						var mfname = "chatno64.json";
						mongo.addRecord(mfname, "", chat, function (cdata) {
							utils.colog("chat record inserted", cdata);
							if (io) {
								io.emit("updategara", {
									garaid: match.garaid
								});
								if (cronacatxt.trim() != "") io.emit("chatmsg", chat);

							} else {
								console.log("socket not connected")
							}
							if (callback) callback(ret);




						});



					})

				}








			})
			/*
			massUpdate(retmatches,function(err,data){
				console.log
				var ret={
					updatedmatches: data,
					matches: retmatches,
					cronacatxt: cronacatxt
				}
				if (callback) callback(ret);
			
			})
			
			
			/*
			if (callback) callback({
				matches: retmatches,
				cronacatxt: cronacatxt
			})
			*/
		})
	})

}



function setResult(match) {

	var mdoc = match;

	var doposts = false;
	var notifica = true;

	var cronacatxt = "";
	var derbytext = "";
	var ordarr = new Array("primo", "secondo", "terzo", "quarto", "quinto", "sesto", "settimo", "ottavo", "nono", "decimo");
	var ordbinarr = new Array("finale", "semifinale", "quarto di finale", "ottavo di finale", "sedicesimo di finale", "trentaduesimo di finale");
	//var result=$("#popResult #risult").val();
	var result = mdoc.result;

	var parr = result.split("-");
	var p1 = parr[0];
	var p2 = parr[1];

	var goldenpoint = mdoc.goldenpoint;
	colog("goldenpoint: " + goldenpoint);
	//return;
	//return;

	//alert($("ul#lista li.liselected").length);

	var id = mdoc.id;

	//id=$("#popResult #matchid").val();
	var matchnumber = mdoc.matchid;
	conslog("setting result for match " + id);
	//return;

	//delMatchFromRealtime(id);
	//deleteFromConsoles(id);

	var atl = utils.getAtletaById(mdoc.atletaid);


	utils.colog("atleta: ", atl);


	var selectedatletaname = atl.cognome + " " + atl.nome;
	var selectedcat = utils.getCategoria(atl.datanascita);
	var name = atl.cognome + " " + atl.nome;

	var valore = "nondisputato";


	if (p1 > p2) valore = "vinto";
	if (p1 < p2) valore = "perso";
	if (result = "n-d") valore = "nondisputato";


	var doc = {};


	var url = "updagent.php?action=edit&tag=match";

	var urln = "/matches/update/" + jcurrentgara.id + "/" + id;

	var ln = utils.getmatchesbyatleta().length;
	var ord = $("#matchesatleta ul#listampa li#match_" + id).index();
	var ordbin = ln - ord - 1;
	var nextordbin = ordbin - 1;
	//alert(ordbinarr[ordbin])
	//if (nextordbin>-1) alert(ordbinarr[nextordbin])


	var v = "";
	var d = "";
	var dd = "";
	var ris = "";
	var med = "none";

	var vintotxt = "vince";

	if (valore == "nondisputato") {
		v = "no";
		dd = "yes";
		d = "no";
		med = "none";
		notifica = false;

		doc = {
			vinto: v,
			disputato: d,
			dadisputare: dd,
			realtime: false
		}

	} else {
		if (valore == "vinto") {
			v = "yes";
			vintotxt = "vince";

		}
		if (valore == "perso") {
			v = "no";
			vintotxt = "perde";
		}
		d = "yes";
		dd = "yes";
		//var nincontro=selectedmatchid;
		var nincontro = matchnumber;
		var eunico = "";
		if (ln == 1) eunico = " e unico ";

		var thisincontro = "";
		if (ordbin < 4) thisincontro = ", " + ordbinarr[ordbin];
		cronacatxt += selectedatletaname + " " + vintotxt + " il suo " + ordarr[ord] + " " + eunico + "incontro (n." + nincontro + thisincontro + ") ";
		if ($.trim(result) != "") cronacatxt += " per " + result;


		doc = {
			vinto: v,
			disputato: d,
			dadisputare: dd,
			realtime: false
		}
		console.log("docvintoperso", doc);

		doc.goldenpoint = goldenpoint;
		if (goldenpoint) {
			if (String(goldenpoint) == "true") {
				cronacatxt += " al golden point "

			}


		}
		var escl = "";
		if (nextordbin < 2) escl = " !!";
		if ((nextordbin > -1) && (v == "yes")) cronacatxt += " e va in " + ordbinarr[nextordbin] + escl + ". ";


	}





	url += "&id=" + id;
	url += "&garaid=" + garaid;
	url += "&vinto=" + v;
	url += "&disputato=" + d;
	url += "&dadisputare=" + dd;
	if ($.trim(result) != "") {
		url += "&risultato=" + result;
		doc.risultato = result;

	}



	sdebug("ln: " + ln);
	sdebug("ord: " + ord);

	if (parseInt(ord, 10) == (parseInt(ln, 10) - 1)) {
		if (d == "yes") {
			if (v == "no") med = "argento";
			if (v == "yes") med = "oro";
		} else med = "none";
	}

	if (parseInt(ord, 10) == (parseInt(ln, 10) - 2)) {
		if (d == "yes") {
			if (v == "no") med = "bronzo";
		} else med = "none";


	}

	if (med != "none") cronacatxt += ". E' " + med.toUpperCase() + " !";

	url += "&medagliamatch=" + med;
	doc.medagliamatch = med;

	//alert(ord);



	var nextgarecount = 0;
	$("#matchesatleta ul#listampa li").each(function (i) {
		var id = $(this).attr("id").replace("match_", "");
		var urlx = "updagent.php?action=edit&tag=match&garaid=" + garaid + "&id=" + id;
		var pdoc = {

		};
		if (i < ord) {
			sdebug("gara precedente " + i);
			if (d == "yes") {
				urlx += "&disputato=yes&vinto=yes&dadisputare=yes&medagliamatch=none";
				pdoc.disputato = "yes";
				pdoc.vinto = "yes";
				pdoc.dadisputare = "yes";
				pdoc.medagliamatch = "none";

			}

			sdebug(urlx);


			urlx = "/matches/update/" + jcurrentgara.id + "/" + id;

			$.ajax({
				type: "POST",
				url: rooturl + urlx,
				data: pdoc,
				async: false
			});

			/*$.post(urlx,{ a: '1'},function() {
			});*/

		}

		if (i > ord) {
			sdebug("gara successiva " + i);
			nextgarecount++;
			if (nextgarecount == 1) {

				// alert("prossima gara: "+id);

				var derbies = getDerby(id, selectedcat);

				$(derbies.rows).each(function (i) {
					colog("derby con " + derbies.rows[i].doc.atletaname);
					derbytext = " .Sarà derby con " + derbies.rows[i].doc.atletaname + " al " + derbies.rows[i].doc.matchid + " ! "
					var did = derbies.rows[i].doc.id;
					var urld = "/matches/update/" + jcurrentgara.id + "/" + did;

					if (v == "yes") {
						$.ajax({
							type: "POST",
							url: rooturl + urld,
							data: {
								derby: id
							},
							async: false
						});

						urld = "/matches/update/" + jcurrentgara.id + "/" + id;
						$.ajax({
							type: "POST",
							url: rooturl + urld,
							data: {
								derby: did
							},
							async: false
						});

					} else {

						derbytext = "";

						$.ajax({
							type: "POST",
							url: rooturl + urld,
							data: {
								derby: null
							},
							async: false
						});

						urld = "/matches/update/" + jcurrentgara.id + "/" + id;
						$.ajax({
							type: "POST",
							url: rooturl + urld,
							data: {
								derby: null
							},
							async: false
						});


					}

				})



				nextgarecount = 0;
			}



			if (d == "yes") {
				if (v == "yes") {
					urlx += "&disputato=no&vinto=no&dadisputare=yes&medagliamatch=none";
					pdoc.disputato = "no";
					pdoc.vinto = "no";
					pdoc.dadisputare = "yes";
					pdoc.medagliamatch = "none";
				}
				if (v == "no") {
					urlx += "&disputato=no&vinto=no&dadisputare=no&medagliamatch=none";
					pdoc.disputato = "no";
					pdoc.vinto = "no";
					pdoc.dadisputare = "no";
					pdoc.medagliamatch = "none";
				}
			}

			if (d == "no") {
				urlx += "&disputato=no&vinto=no&dadisputare=yes&medagliamatch=none";
				pdoc.disputato = "no";
				pdoc.vinto = "no";
				pdoc.dadisputare = "yes";
				pdoc.medagliamatch = "none";
			}


			urlx = "/matches/update/" + jcurrentgara.id + "/" + id;
			sdebug(urlx);
			$.ajax({
				type: "POST",
				url: rooturl + urlx,
				data: pdoc,
				async: false
			});

			/*$.post(urlx,{ a: '1'},function() {
			});*/

		}


	});


	cronacatxt += derbytext;
	var cronurl = "savecronaca.php?garaid=" + garaid + "&text=" + encodeURI(cronacatxt);

	cronurl = "/matches/addcronaca/" + jcurrentgara.id;


	console.log("posting doc", doc);

	$.post(rooturl + urln, doc, function () {

		$.mobile.back();
		// $("#popResult").popup('close');  
		var atletaid = $("ul#listampa li.liselected").find("input:hidden.atletaid").val();
		$("#matchesatleta ul#listampa li").removeClass("liselected");



		var na = getCookie("notifiche_atleta");
		if (na) {
			if (na.trim() != "") {
				if (na.indexOf(atl.id.trim()) > -1) {
					//sendGCM(cronacatxt);	
					//notify(cronacatxt);  		
				}

			}



		}

		//manda notifica ad altri device

		var rdata = {
			type: "realtime",
			to: "all",
			garaid: jcurrentgara.id,
			matchid: id,
			matchnumber: matchnumber,
			result: "",
			ammoniz1: 0,
			ammoniz2: 0,
			event: "realtime",
			text: "",
			match: getMatchById(id),
			active: false

		}

		socketNotify(rdata);

		if (notifica) {
			socketNotify({
				type: "notification",
				to: "all",
				text: cronacatxt,

				garaid: jcurrentgara.id,
				updategara: "yes"

			})
		}
		postChat({
			garaid: jcurrentgara.id,
			nickname: chatuser.nickname,
			sockid: chatuser.sockid,
			color: "yellow",
			text: cronacatxt
		});
		//sendGCM(cronacatxt);
		$.ajax({
			type: "POST",
			url: rooturl + cronurl,
			async: false,
			data: {
				text: cronacatxt
			}
		}, function () {

			loadCronaca();

		});

		openGara(jGara.gara.rows[0].doc.id, function () {
			// refreshMatches(function(){

			showMatchesForAtleta(atl.id);
			progressStop();
		});









		/*
		
		 */





	});


}


router.get("/fblive", function (req, res) {
	var url = "nourlprovided";

	if (req.query) {
		if (req.query.url) url = req.query.url;
	}
	console.log("Received FBLIVE !!", url);
	if (io) {
		io.emit("fblive", {
			url: url
		});
		console.log("emitted fblive event")

	} else console.log("io not found");

	res.send("ok");

})

router.post("/fblive", function (req, res) {
	var url = "";
	if (req.body) {
		if (req.body.url) url = req.body.url;
	}
	if (req.query) {
		if (req.query.url) url = req.query.url;
	}
	console.log("Received FBLIVE !!", url);
	if (io) {
		io.emit("fblive", {
			id: url
		});
		console.log("emitted fblive event")

	} else console.log("io not found");

	res.send("ok");

})


router.get("/derby", function (req, res) {
	getDerby("20160610185130", "201606101852231000", "")
})


function getDerby(match, allmatches, atleti) {


	var $allmatches = allmatches;
	var garaid = match.garaid;
	var id = match.id;
	var atl = utils.getAtletaById(match.atletaid, atleti);
	utils.colog("getderby, atl", atl);
	var category = utils.getCategoria(atl.doc.datanascita);


	colog("getDerby for garaid " + garaid + ", matchid " + id + " in category " + category);
	var retvalue = {
		rows: []
	};
	var samemid = {
		rows: []
	}
	colog("allmatches")


	colog($allmatches)
	var $r = utils.filterRows($allmatches, {
		id: id
	});

	//console.log("$r-->"+JSON.stringify($r))

	var mid = $r.rows[0].doc.matchid;
	var dn = $r.rows[0].doc.datanascita;
	var cat = utils.getCategoria(dn);

	var $r1 = utils.filterRows($allmatches, {
		matchid: mid,
		dadisputare: "yes",
		disputato: "no"
	})
	colog("incontri con matchid=" + mid + ": " + $r1.rows.length + " in categoria " + cat);
	$r1.rows.forEach(function (item, i) {
		var row = $r1.rows[i];
		var rid = row.doc.id;
		if (rid != id) {
			var cat = utils.getCategoria(row.doc.datanascita);
			var doIt = true;
			if (cat.trim().toLowerCase() != category.trim().toLowerCase()) {
				doIt = false;
				utils.colog("match " + mid + " in category " + cat + " ignored, searching for category " + category);
			}
			if (doIt) samemid.rows.push(row);
			//retvalue.rows.push(row);

		}



	})


	//determina se i presunti derby siano il prossimo incontro dell'atleta derbeggiante

	samemid.rows.forEach(function (sitem, i) {
		var row = samemid.rows[i];
		var aname = row.doc.atletaname;
		var aid = row.doc.atletaid;


		var $ia = utils.filterRows($allmatches, {
			atletaid: aid

		})

		$ia.rows.sort(function (a, b) {
			var a1 = a.doc.matchid;
			var b1 = b.doc.matchid;
			if (a1 > b1) return 1;
			if (a1 < b1) return -1;
			return 0;
		})
		var iord = 0;
		utils.colog("analisi incontri di " + aname);
		$ia.rows.forEach(function (jitem, j) {
			var row = $ia.rows[j];
			var mmid = row.doc.matchid;
			var disp = row.doc.disputato;
			var dadisp = row.doc.dadisputare;



			var eligible = false;


			if ((disp == "no") && (dadisp == "yes")) {

				iord++;
				eligible = true;
			}
			utils.colog("matchid " + mmid + " - eligible: " + eligible)
			if ((mmid == mid) && (iord == 1)) {
				retvalue.rows.push(row);
				utils.colog("è il primo prossimo incontro, DERBY OK")

			}
		})
		//alert($ia.rows.length+" incontri per "+aname)


	})


	console.log("Derby trovati per match id " + id + ": " + retvalue.rows.length)
	return retvalue;

}






router.get("/deletenew/:garaid/:matchid/:atletaid", function (req, res) {
	var garaid = req.params.garaid;
	var matchid = req.params.matchid;
	var atletaid = req.params.atletaid;
	delMatch(matchid, garaid, atletaid, function (data) {
		res.send(data);
	});

})



function delMatch(matchid, garaid, atletaid, callback) {

	var id = matchid;

	mongo.getfile("matches_" + garaid + ".json", function (allmatches) {

		utils.colog("got matches fro garaid", garaid, allmatches.rows.length);
		//sort matches
		allmatches.rows.sort(function (a, b) {
			var a1 = a.doc.progid;
			var b1 = b.doc.progid;
			if (a1 > b1) return 1;
			if (a1 < b1) return -1;
			return 0;

		})





		console.log("trying to delete matchid " + id + " for atletaid " + atletaid);


		//find and reset its derby counterpart, if there is one
		utils.colog("finding derbies");

		var alreadyfound = false;

		allmatches.rows.forEach(function (item, i) {
			var meid = item.doc.id;
			var matchnum = item.doc.matchid;

			var doc = item.doc;
			var atlid = doc.atletaid;
			utils.colog("examining match " + matchnum, "atletaid", atlid);

			if (alreadyfound) {
				if (atlid == atletaid) { //this match is posterior to the deleted one, reset its data
					console.log("resetting match " + matchnum);
					doc.disputato = "no";
					doc.dadisputare = "yes";
					doc.risultato = "0-0";
					doc.vinto = "no";
					doc.medagliamatch = "none";
					doc.realtime = "false";
				}

			}



			if (doc.hasOwnProperty("derby")) {
				console.log("has derby !!", doc);
				if (doc.derby) {
					if (doc.derby.trim() != "") {
						var did = doc.derby;

						if (did == id) { //this match was a derby with the deleting match
							utils.colog("found match that had a derby with the deleting one !!", matchnum);

							doc.derby = "";
							console.log("resetted derby flag on matchnum " + matchnum);
						}



					}
				}


			}


			if (meid == id) {
				utils.colog("WILLDELETE match " + matchnum + " !!!!");
				//allmatches.rows.splice(i,1);  //DELETES THE MATCH !!!
				alreadyfound = true;
			}


		})


		//DERBIES and POST matches updated, now finally DELETE the passed match
		allmatches.rows.forEach(function (item, idx) {
			if (item.doc.id == matchid) {
				console.log("finally deleted match ", item.doc.matchid)
				allmatches.rows.splice(idx, 1);

			}

		})


		var newmatchesforatleta = {
			rows: []
		}
		allmatches.rows.forEach(function (item, idx) {
			var doc = item.doc;
			if (doc.atletaid == atletaid) {
				newmatchesforatleta.rows.push(item);
			}

		})

		if (usemongo) {
			mongo.updatefile("matches_" + garaid + ".json", allmatches.rows, function (data) {
				//console.log("match " + matchid + " updated on mongo");
				//ressent=true;
				//console.log(data);
				//res.send(data);
				if (io) {
					io.emit("updategara", {
						garaid: garaid
					});
				}
				if (callback) callback(newmatchesforatleta.rows);
			});
		}





	})



}




module.exports = router;