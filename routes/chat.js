var express = require('express');
var router = express.Router();
var gcm = require('node-gcm');
var gcm2 = require('../routes/gcm');
//var io = require('socket.io');
var request = require('request');
var mongo = require('../routes/mongo');
var base64 = require('node-base64-image');
var utils = require("../routes/utils");

var path = require('path');
var util = require("util");
var mime = require("mime");
var fs = require("fs");
var Jimp = require("jimp");
var usemongo = true;




var message = new gcm.Message();
var alterbridge = false;
//var altervistaurl="http://localhost:90/tkdr";
var altervistaurl = "http://demym.altervista.org";

var fs = require('fs'),
	xml2js = require('xml2js');


var matches;
var chat = {};


var parser = new xml2js.Parser();
var sock;




router.get('/delete/:timestamp', function (req, res) {

	var ts = req.params.timestamp;
	console.log("Delete chat_" + ts);
	var fname = "chat_" + ts + ".json";
	mongo.deletefile(fname, function (data) {

		res.send({
			"error": false,
			"msg": "Deleted file " + fname + " from mongo "
		});
	});


});


router.get('/get/:garaid', function (req, res) {

	//var fname="chat_"+req.params.garaid+".json";
	var garaid = req.params.garaid;
	var fname = "./public/data/media/chat_" + garaid + ".json";
	var mfname = "chat_" + garaid + ".json";
	mongo.checkCreateFile(mfname, function (data) {
		mongo.getfile(mfname, function (data) {

			console.log("got file " + mfname + " from mongo");
			res.send(data);
		});

	});

	/*
	fs.readFile(fname, "utf-8",function(err, data) {
		
	if (err){
		/*
		if (err.errno==-4058){
			var empty={
				"rows": []
			}
			fs.writeFileSync("chat_"+garaid+".json",JSON.stringify(empty));
		}
			
	
		var data={};
		data.msg="Error "+err.message;
		data.rows=[];
		console.log("Error",err)
		res.send(data);
		
		// if not found init matches_xxx.json file
		
		
		return;
		
		
	}	else {
		//console.log(data);
		var dat = JSON.parse(data);
		chat=dat;
		console.log("chat rows: "+chat.rows.length);
		res.send(chat);
		
		
	}
	
	
	});
	
	*/
});


router.get('/get', function (req, res) {

	//var fname="chat_"+req.params.garaid+".json";
	var garaid = req.params.garaid;
	var fname = "./public/data/media/chat.json";
	var mfname = "chat.json";
	mongo.checkCreateFile(mfname, function (data) {
		mongo.getfile(mfname, function (data) {

			console.log("got file " + mfname + " from mongo");
			res.send(data);
		});

	});

	/*
	fs.readFile(fname, "utf-8",function(err, data) {
		
	if (err){
		/*
		if (err.errno==-4058){
			var empty={
				"rows": []
			}
			fs.writeFileSync("chat_"+garaid+".json",JSON.stringify(empty));
		}
			
	
		var data={};
		data.msg="Error "+err.message;
		data.rows=[];
		console.log("Error",err)
		res.send(data);
		
		// if not found init matches_xxx.json file
		
		
		return;
		
		
	}	else {
		//console.log(data);
		var dat = JSON.parse(data);
		chat=dat;
		console.log("chat rows: "+chat.rows.length);
		res.send(chat);
		
		
	}
	
	
	});
	
	*/
});


router.get('/getno64', function (req, res) {

	//var fname="chat_"+req.params.garaid+".json";
	var garaid = req.params.garaid;
	var fname = "./public/data/media/chat.json";
	var mfname = "chatno64.json";
	mongo.checkCreateFile(mfname, function (data) {
		mongo.getfile(mfname, function (data) {
			console.log("read " + data.rows.length + " records from " + mfname);
			data.rows.forEach(function (item, idx) {
				if (item.foto) {
					delete item.foto;
				}

			})

			data.rows.sort(function (a, b) {
				var a1 = a.time;
				var b1 = b.time;
				if (a1 > b1) return 1;
				if (a1 < b1) return -1;
				return 0;
			})

			console.log("got file " + mfname + " from mongo");
			res.send(data);
		});

	});

	/*
	fs.readFile(fname, "utf-8",function(err, data) {
		
	if (err){
		/*
		if (err.errno==-4058){
			var empty={
				"rows": []
			}
			fs.writeFileSync("chat_"+garaid+".json",JSON.stringify(empty));
		}
			
	
		var data={};
		data.msg="Error "+err.message;
		data.rows=[];
		console.log("Error",err)
		res.send(data);
		
		// if not found init matches_xxx.json file
		
		
		return;
		
		
	}	else {
		//console.log(data);
		var dat = JSON.parse(data);
		chat=dat;
		console.log("chat rows: "+chat.rows.length);
		res.send(chat);
		
		
	}
	
	
	});
	
	*/
});

router.get("/reset/:garaid", function (req, res) {
	var garaid = req.params.garaid;
	resetGara(garaid, function (data) {
		res.send(data);
	});
});


router.get("/reset", function (req, res) {
	var garaid = req.params.garaid;
	resetGara("", function (data) {
		res.send(data);
	});
});

router.post("/put/:garaid", function (req, res) {
	var body = req.body;
	var chatobj = body;

	var date = new Date();
	var garaid = req.params.garaid;



	chatobj.time = date.juliandateshort();

	//var sock = req.app.get('socketio');
	var socketio = req.app.get('socketio');
	console.log("emitting chatmsg");
	socketio.emit('chatmsg', chatobj);
	//console.log("sock",sock);
	//sock.io.broadcast.emit("chatmsg", chatobj); 

	var mfname = "chat_" + garaid + ".json";
	mongo.addRecord(mfname, garaid, chatobj, function (data) {
		console.log("chat record inserted", data);
		res.send(data);
	});

	/*
	
	var fname="./public/data/media/chat_"+garaid+".json";
	
	fs.readFile(fname, "utf-8",function(err, data) {
		
		var dat;
	if (err){
		var data={};
		data.msg="Error "+err.message;
		data.rows=[];
		//res.send(data);
		
		// if not found init matches_xxx.json file
		
	    dat=data; 
		
		
	}	else dat = JSON.parse(data);
		dat.rows.push(chatobj);
		
		fs.writeFile(fname, JSON.stringify(dat), function (err) {
          if (err) return console.log(err);
          console.log('File matches.json saved on server');
		  //var dat = require('../data/matches.json');
		  res.send("ok")
        });
		
	
	
	});
	
	*/

});



router.post("/put", function (req, res) {
	var body = req.body;
	var chatobj = body;

	var date = new Date();
	//var garaid=req.params.garaid;

	var notify=false;
	if (chatobj.hasOwnProperty("notify")){
		if (String(chatobj.notify)=="true") notify=true;
	}



	chatobj.time = date.juliandateshort();

	//var sock = req.app.get('socketio');
	var socketio = req.app.get('socketio');
	console.log("emitting chatmsg");

	//res.send("ok");
	//console.log("sock",sock);
	//sock.io.broadcast.emit("chatmsg", chatobj); 

	var chatobjfoto;
	var hasfoto = false;
	if (chatobj.foto) {
		var fotofname = chatobj.time + ".jpg";
		//console.log("storing image on altervista")
		//utils.sendChatMediaToAltervista(fotofname,chatobj.foto);
		chatobj.fotourl = "http://demym.altervista.org/herokudata/chatmedia/" + fotofname;
		chatobjfoto = chatobj.foto;
		hasfoto = true;
		//delete chatobj.foto;
	}




	if (chatobj.audio) {
		var audiofname = chatobj.time + ".m4a";
		utils.colog("dirname: " + __dirname);
		var folder = __dirname.replace("\routes", "").replace("/routes", "");
		utils.colog("folder " + folder)
		console.log("received chat audio", chatobj.audio.substring(0, 40));
		var c = chatobj.audio.replace("data:audio/mpeg;base64,", "");
		if (c.indexOf("data:audio/mp3;base64,") > -1) {

			//audiofname=chatobj.time+".mp3";
			c = c.replace("data:audio/mp3;base64,", "");

		}



		var b = new Buffer(c, 'base64')
		var s = b.toString("binary");
		utils.colog("writing file to folder " + folder);
		fs.writeFile(folder + "/public/data/chatmedia/" + audiofname, s, "binary", function (err) {
			if (err) {
				utils.colog("error !");
				utils.colog(err);
				return console.log(err);
			}
			utils.colog('File ' + audiofname + ' saved on server');
			//var dat = require('../data/matches.json');
			//res.send("ok")
		});
		utils.colog("storing audio on altervista")
		utils.sendChatMediaToAltervista(audiofname, chatobj.audio);
		chatobj.audiourl = "http://demym.altervista.org/herokudata/chatmedia/" + audiofname;
		chatobj.audiofilename = audiofname;
		//delete chatobj.audio;
	}






	var chatno64 = JSON.parse(JSON.stringify(chatobj));
	delete chatno64.foto;
	mongo.addRecord("chatno64.json", "", chatno64, function (no64data) {

		console.log("record added to chatno64.json", no64data);

		var mfname = "chat.json";

		mongo.addRecord(mfname, "", chatobj, function (data) {
			console.log("chat record inserted to " + mfname);
			if (hasfoto) {
				var fotofname = chatobj.time + ".jpg";
				console.log("storing image on altervista")
				utils.sendChatMediaToAltervista(fotofname, chatobjfoto, function (cmdata) {

					/*var obj = {
						text: chatobj.nickname + " ha postato un'immagine",
						title: "ChatKwonDo",
						icon: "ic_launcher",
						color: "#000000",
						tag: "appkwondov2",
						badge: "1",
						topic: "appkwondov2",
						token: ""

					}*/

					var text = "";
					if (chatobj.hasOwnProperty("text")) {
						if (chatobj.text.trim() != "") {
							text = chatobj.text
						}
					}

					if (chatobj.hasOwnProperty("fotourl")) {
						text = "Immagine";
					}

					var hasAudio = false;
					if (chatobj.hasOwnProperty("audio")) hasAudio = true;
					if (chatobj.hasOwnProperty("audiourl")) hasAudio = true;
					if (chatobj.hasOwnProperty("audiofilename")) hasAudio = true;

					if (hasAudio) text = "Messaggio vocale";

					var obj = {
						title: chatobj.nickname,
						body: text

					}

					var doPush = false;
					if (chatobj.nickname.toLowerCase() == "system") doPush = true;
					if (notify) doPush=true;

					if (doPush) {
						gcm2.fcmSend(obj, function (fcmdata) {
							console.log("fcm sent", fcmdata)
						})
					}



					/*gcm2.sendToAll(obj, function (data) {
						console.log("gcmsendtoall done", data);
					})*/
					socketio.emit('chatmsg', chatobj);
					res.send(data);

				});
			} else {
				/*var obj = {
					text: chatobj.nickname + " - " + chatobj.text,
					title: "ChatKwonDo",
					icon: "ic_launcher",
					color: "#000000",
					tag: "appkwondov2",
					badge: "1",
					topic: "appkwondov2",
					token: "",
					sound: "default"

				}
				gcm2.sendToAll(obj, function (data) {
					console.log("gcmsendtoall done", data);
				})*/



				var text = "";
				if (chatobj.hasOwnProperty("text")) {
					if (chatobj.text.trim() != "") {
						text = chatobj.text
					}
				}

				if (chatobj.hasOwnProperty("fotourl")) {
					text = "Immagine";
				}

				var hasAudio = false;
				if (chatobj.hasOwnProperty("audio")) hasAudio = true;
				if (chatobj.hasOwnProperty("audiourl")) hasAudio = true;
				if (chatobj.hasOwnProperty("audiofilename")) hasAudio = true;

				if (hasAudio) text = "Messaggio vocale";

				var obj = {
					title: chatobj.nickname,
					body: text

				}

				var doPush = false;
				if (chatobj.nickname.toLowerCase() == "system") doPush = true;

				console.log(chatobj.nickname,"doPush",doPush);
				if (doPush) {

					gcm2.fcmSend(obj, function (fcmdata) {
						console.log("fcm sent", fcmdata)
					})
				} else {

					gcm2.fcmSendMsg(obj, function (fcmdata) {
						console.log("fcm sent", fcmdata)
					})

				}

				socketio.emit('chatmsg', chatobj);
				res.send(data);
			}

		});

	})

	/*
	
	var fname="./public/data/media/chat_"+garaid+".json";
	
	fs.readFile(fname, "utf-8",function(err, data) {
		
		var dat;
	if (err){
		var data={};
		data.msg="Error "+err.message;
		data.rows=[];
		//res.send(data);
		
		// if not found init matches_xxx.json file
		
	    dat=data; 
		
		
	}	else dat = JSON.parse(data);
		dat.rows.push(chatobj);
		
		fs.writeFile(fname, JSON.stringify(dat), function (err) {
          if (err) return console.log(err);
          console.log('File matches.json saved on server');
		  //var dat = require('../data/matches.json');
		  res.send("ok")
        });
		
	
	
	});
	
	*/

});


router.get("/getfile/:fname", function (req, res) {

	var fname = req.params.fname;

	mongo.getfile(fname, function (data) {

		res.send(data);
	});

});

router.get("/list", function (req, res) {


	var rgx = "chat";
	if (req.query.filter) rgx = req.query.filter;




	mongo.listfiles(rgx, function (data) {
		data.rows.sort(function (a, b) {
			var a1 = a.filename;
			var b1 = b.filename;
			if (a1 > b1) return 1;
			if (a1 < b1) return -1;
			return 0;
		});
		res.send(data);
	});

});

router.get("/archive", function (req, res) {


	var date = new Date();
	var time = date.juliandateshort();
	var newfname = "chat_" + time + ".json";
	utils.colog("archiving chat.json file to file " + newfname);

	var empty = {
		"rows": []
	}

	mongo.archivefile("chatno64.json", newfname, function (data) {
		mongo.resetfile("chatno64.json", empty, function (rdata) {

			utils.colog("chat.json archived to " + newfname + " and chat.json resetted");
			res.send(data);

		});
		//console.log(data);


	});


});

function resetGara(garaid, callback) {


	var fname = "./public/data/media/chat_" + garaid + ".json";
	if (garaid == "") fname = "./public/data/media/chat.json";
	var mfname = "chat_" + garaid + ".json";
	if (garaid == "") mfname = "chat.json";
	var empty = {
		"rows": []
	}

	mongo.resetfile(mfname, empty, function () {

		console.log("chat resetted for file " + mfname + " on mongodb")
		callback(empty);
	})

	/*
	fs.writeFile(fname, JSON.stringify(empty), function (err) {
          if (err) return console.log(err);
          console.log('File matches.json saved on server');
		  //var dat = require('../data/matches.json');
		  sendMediaFileToAltervista("chat_"+garaid+".json",JSON.stringify(empty));
		  callback("ok");
        });
	*/
}

//////////////////////////////////////////

function readMatchesMongo(garaid, callback) {
	var jfname = "matches_" + garaid + ".json";
	console.log("readMatchesMongo " + jfname);
	mongo.getfile(jfname, function (data) {
		//console.log(data.rows.length);
		console.log(JSON.stringify(data));
		matches = data;
		console.log("read matches from mongo " + jfname + " :   " + matches.rows.length);
		callback(matches);

	})


}


function readMatchesJson(garaid, callback) {

	if (usemongo) {
		readMatchesMongo(garaid, callback);
	} else {



		console.log("readMatchesJson garaid=" + garaid)
		var fname = "data/matches_" + garaid + ".json";
		console.log("readMatchesJson file " + fname);
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
			console.log("Read file " + fname);
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

			matches = result.matches.match;
			matches = result;
			matches = xform(matches);
			fs.writeFile('data/matches.json', JSON.stringify(matches), function (err) {
				if (err) return console.log(err);
				console.log('File matches.json saved on server');
				//var dat = require('../data/matches.json');
				var dat = JSON.parse(fs.readFileSync('../data/matches.json', 'utf8'));
				console.log(dat.rows.length);
			});
			console.log("Loaded " + result.matches.match.length + " matches");
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

				console.log("Remote file " + fname + " was saved on server !");
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
	console.log("called matches findall");
	console.log(generateId());
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

function notify(obj, callback) {

	if (!obj) {
		obj = {};
		obj.message = "\u270C Peace, Love \u2764 and AppKwonDo \u2706!";
		obj.title = "AppKwonDo";
		obj.msgcnt = "3";
		obj.soundname = "beep.wav";
	}

	console.log("notifying GCM")
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
	console.log("called matches findall");
	findAll(function (obj) {
		//console.log("###### users ( /getAllAssets route ) -->  " + JSON.stringify(obj));
		res.send(obj);
	});
});


router.get('/findByName/:nome', function (req, res) {
	console.log("called matches findByName");
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
		console.log(jfname + " file exists");
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
		console.log("File " + jfname + " saved on server");
		// var dat = require('../'+jfname);
		var dat = JSON.parse(fs.readFileSync(jfname, 'utf8'));
		console.log(dat.rows.length);
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
			console.log("checkCreateFile  " + ffname + ": ")
			console.log(data);

			var pth = "./public/data/media";



			console.log("pth: " + pth);

			if (fs.existsSync(pth)) {
				console.log("folder " + pth + " exists")
				// Do something
			} else {
				console.log("folder " + pth + " does not exists")
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

				console.log(bdata)


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

				console.log(bdata)


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

						console.log("saved thumb in " + thumbfname);
						console.log("thumbfname: ", thumbfname)
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
							console.log("image and thumbnail sent to altervista")

							saveobj.imagelocal = thumbfname.replace("./public/", "");
							saveobj.image = avmediaurl + avthumbfname;

							//console.log(saveobj.image);
							mongo.addRecord("cronaca_" + id + ".json", "", saveobj, function (data) {
								console.log("add cronacaelements result");
								console.log(data);
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
					console.log("add cronacaelements result");
					console.log(data);
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



router.post('/update/:garaid/:matchid', function (req, res) {
	var body = req.body;
	var garaid = req.params.garaid;
	var matchid = req.params.matchid;
	console.log("Update match id=" + matchid + ": " + JSON.stringify(body));

	var doc = {
		doc: body
	}

	if (usemongo) {
		mongo.updateRecord("matches_" + garaid + ".json", matchid, doc, function (data) {
			console.log("updated");
			//ressent=true;
			res.send(data);

		})

	}






	readMatchesJson(garaid, function (data) {
		if (!data) data = {
			rows: []
		};
		console.log("matches rows: " + data.rows.length);
		for (var i = 0; i < data.rows.length; i++) {

			var row = data.rows[i].doc;
			//console.log(row.id);
			if (row.id.trim() == matchid.trim()) {
				console.log("found match " + row.id + " to update");
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
			console.log('File ' + fname + ' updated on server');
			var fullUrl = req.protocol + '://' + req.get('host');
			saveToAltervista(fullUrl + "/matches/findbygaraid/" + garaid, "matches_" + garaid + ".json");
			//res.send({"error":false,"msg":"Delete match "+matchid+" for gara "+garaid});
		});
		//res.send(data);
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
	console.log("milliseconds: " + ms)

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

	console.log("saving to altervista at url: " + url);
	request.get(url, function (error, response, body) {
		console.log(body);

	});


}

function sendMediaFileToAltervista(filename, content) {
	var dat = content;
	//dat = data;

	console.log("sendtoaltervsita filename: " + filename);
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


}

function saveFileToAltervista(fullpath) {
	var dat; // = require('../data/'+filename);
	console.log("saving " + fullpath + " to altervista");

	var arr = fullpath.split("/");
	var filename = arr[arr.length - 1];
	console.log("filename: " + filename)

	fs.readFile(fullpath, function (err, data) {
		if (err) {

			console.log("error!", err);
			return;
		}
		//console.log(data)

		dat = data;

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
				'fdata': dat
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
	console.log("called getmatchesbyprog for gara " + id);
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
		callback(data);
	});


}

function getmatchesbyatleta(garaid, callback) {
	var id = garaid;
	console.log("called  getmatchesbyatleta for gara " + id);
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




module.exports = router;