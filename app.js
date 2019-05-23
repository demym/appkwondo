/**
 * Public Module dependencies.
 */
require('dotenv').load();
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var debug = require('debug')('rpozzi-node:server');
var http = require('http');
var session = require('express-session')
var request = require('request');
var jwt = require('jsonwebtoken');
var uuid = require('node-uuid');
var fs = require('fs');
var gcm = require('./routes/gcm');
var fcm = require('./routes/fcm');
var dbscl = require('./routes/dbscl');
//var mongo = require('mongodb');
var EasyZip = require('easy-zip').EasyZip;
var syncrequest = require('sync-request');
var cors = require('cors');
var moment = require("moment");
var syncavfiles = true;
var broadcastes = [];

var zip = new EasyZip();
var clients = [];
var logActive = true;

var superSecret = "inespugnabile"
var tokenExpireMinutes = 60;
var usewhitelist = true; //true=token is used     false=token is not used

process.on('uncaughtException', function (err) {
	console.error(err);
	console.log("Server NOT Exiting...");
});

//var cookie=require('cookie');

//var clientsession = require("client-sessions");

//var	locations =require('./routes/locations');
//assets =require('./routes/assets'),
//login =require('./routes/login'),
var atleti = require('./routes/atleti'),
	matches = require('./routes/matches'),
	convert = require('./routes/convert'),
	filemanager = require('./routes/filemanager'),
	mongo = require('./routes/mongo'),
	gare = require('./routes/gare'),
	garecloudant = require('./routes/garecloudant'),
	sync = require('./routes/sync'),
	chat = require('./routes/chat'),
	tkdt = require('./routes/tkdt'),
	societa = require('./routes/societa'),
	utils = require("./routes/utils"),
	realtime = require("./routes/realtime"),
	users = require("./routes/users"),
	eventi = require("./routes/eventi"),
	minimarket = require("./routes/minimarket");
//mysql = require('./routes/mysql');;
//contacts = require('./routes/contacts'),
//index = require('./routes/index'),
//installations = require('./routes/installations'),
//items = require('./routes/items'),
//schede = require('./routes/schede');

global.loggedin = false;

/**
 * Single SignOn Module dependencies.
 */

/*
var passport = require('passport'),
    LocalStrategy = require('passport-local'),
    TwitterStrategy = require('passport-twitter'),
    GoogleStrategy = require('passport-google'),
    FacebookStrategy = require('passport-facebook');
	*/
//var session = require('cookie-session');
/**
 * Application Module dependencies.
 */
//var cache = require('./routes/cache');
//var customers = require('./routes/customers');
/**
 * Create and setup Express app
 */
var app = express();
app.use(bodyParser.json({
	limit: "30mb"
}));
app.use(bodyParser.urlencoded({
	extended: true,
	limit: "30mb",
	parameterLimit: 30000
}));
app.use(favicon(__dirname + '/public/img/bluemix_logo.png'));
app.use(logger('dev'));
app.use(cookieParser());

//app.use(app.router());

app.use(express.static(path.join(__dirname, 'public')));
//app.use(express.static(path.join(__dirname, 'www')));
app.use(cors());

var allowCrossDomain = function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
	res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

	res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
	next();
}

app.use(allowCrossDomain);


//TOKEN check
app.use(function (req, res, next) {

	var whitelist = [
		"/importcsv",
		"/gcm",
		"/atleti/login",
		"/users/login",
		"/users/register",
		"/users/registerios",
		"/users/retrievepsw",
		"/users/potentialios",
		"/data/chatmedia",
		"/broadcast",
		"/peerjs",
		"/token/true",
		"/token/false",
		"/tpss_source",
		"/listusers?token=nonsientramai",
		"/clearlog?token=nonsientramai",
		"/cordova.js",
		"/img/favicon.ico",
		"/tpss/",
		"/favicon.ico"
	]; //only these paths are allowed to proceed without providing a valid token

	//console.log("req.url="+req.url);
	var doNext = false;

	for (var i = 0; i < whitelist.length; i++) {
		var wl = whitelist[i].toLowerCase();
		if (req.url.toLowerCase().indexOf(wl) > -1) doNext = true;

	}

	if (!usewhitelist) doNext = true;

	if (doNext) {
		next();
		return;
	};

	// check header or url parameters or post parameters for token
	// var token = req.body.token || req.query.token || req.headers['x-access-token'];
	//console.log(req.headers);
	var token = req.body.token || req.query.token || req.headers['x-auth-token'];
	//console.log("app.use - token: "+token)

	// decode token
	if (token) {

		if (token == "nonsientramaiquidentro") {
			next();
			return;
		}

		// verifies secret and checks exp
		jwt.verify(token, superSecret, function (err, decoded) {
			if (err) {
				console.log("failed to authenticate token: " + err.message)
				return res.json({
					success: false,
					message: 'Failed to authenticate token:' + err.message
				});
			} else {
				// if everything is good, save to request for use in other routes
				//console.log("token is valid")
				req.decoded = decoded;
				next();
			}
		});

	} else {

		// if there is no token
		// return an error
		console.log("No token provided in request " + req.url);
		return res.status(403).send({
			success: false,
			message: 'No token provided.'
		});


	}
});


/*
app.use(function(req, res, next) {
 
    var sessionId = req.param('sessionId');
    
    // if there was a session id passed add it to the cookies
    if (sessionId) {
        console.log("sessionId="+sessionId);
        var header = req.headers.cookie;
 
        // sign the cookie so Express Session unsigns it correctly
        var signedCookie = 's:' + cookieSignature.sign(sessionId, 'keyboard cat');
 
        req.headers.cookie = cookie.serialize('connect.sid', signedCookie);
 
    }
 
    next();
 
});
*/

/*
app.use(function(req, res, next) {
 
    session({
        'cookie': {
            'httpOnly': false,
            'maxAge': 1000 * 60 * 60 * 24 * 60,
        },
        'name': 'connect.sid',
        'secret': 'keyboard cat',
        'saveUninitialized': true,
        'genid': function() {
 
            var sessionId = req.param('sessionId');
            console.log("sessionId; "+sessionId);
            if (sessionId) {
                return req.param('sessionId');
            }
 
            return "default-session";
 
        }
 
    })(req, res, next);
 
});
*/

/*
app.use(session({
  secret: 'appsecret',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false,
    maxAge: new Date(Date.now() + 3600000)
  }
}));

*/
app.use(session({
	'cookie': {
		'httpOnly': false,
		'maxAge': 1000 * 60 * 60 * 24 * 60,
	},
	secret: 'keyboard cat'
}));

/**
 * View engine setup
 */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
/**
 * SSO initialization
 */
/*
 var sessionMiddleware = express.session({
    //session configurations
});

function sessionHandler(req, res, next) { sessionMiddleware(req, res, next); }
*/

//app.set('trust proxy', 1) // trust first proxy
/*app.use(clientsession({
  cookieName: 'mysession', // cookie name dictates the key name added to the request object
  secret: 'blargadeeblargblarg', // should be a large unguessable string
  duration: 24 * 60 * 60 * 1000, // how long the session will stay valid in ms
  activeDuration: 1000 * 60 * 5 // if expiresIn < activeDuration, the session will be extended by activeDuration milliseconds
}));*/

//app.use(app.router);
/*
app.use(session({
  keys: ['key1', 'key2']
}))
*/


//app.use(express.cookieSession());




//app.use(passport.initialize());
//app.use(passport.session());


/*
var allowCrossDomain = function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
	res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Authorization, Content-Length, X-Requested-With, Accept');

	res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
	next();
}

app.use(allowCrossDomain);
*/


/**
 * Get port from environment and store in Express app
 */
var port = parseInt(process.env.PORT, 10) || 3000;
app.set('port', port);



/**
 * Routing setup
 */
//app.use('/', index);
//app.use('/users', users);

/*
passport.use('local-signin', new LocalStrategy(
  {passReqToCallback : true}, //allows us to pass back the request to the callback
  function(req, username, password, done) {
    funct.localAuth(username, password)
    .then(function (user) {
      if (user) {
        console.log("LOGGED IN AS: " + user.username);
        req.session.success = 'You are successfully logged in ' + user.username + '!';
        done(null, user);
      }
      if (!user) {
        console.log("COULD NOT LOG IN");
        req.session.error = 'Could not log user in. Please try again.'; //inform user could not log them in
        done(null, user);
      }
    })
    .fail(function (err){
      console.log(err.body);
    });
  }
));
*/

/*
app.post('/login', passport.authenticate('local-signin', {
  successRedirect: '/',
  failureRedirect: '/signin'
  })
);
*/

//app.use('/login', login);
//app.use('/items', items);
//app.use('/contacts', contacts);
//app.use('/locations', locations);
//app.use('/assets', assets);
//app.use("/installations",installations)
//app.use("/schede",schede)

app.get('/', function (req, res) {


	res.sendfile('index.html', {
		root: path.join(__dirname, 'public')
	});

});


app.use("/convert", convert);
app.use("/files", filemanager)
app.use("/atleti", atleti)
app.use("/gare", gare)
app.use("/garecloudant", garecloudant)
app.use("/societa", societa)
app.use("/matches", matches)
app.use("/chat", chat)
app.use("/tkdt", tkdt)
app.use("/eventi", eventi)
app.use("/users", users)
app.use("/minimarket", minimarket)


app.get("/prova", function (req, res) {
	var cloudscraper = require('cloudscraper');

	cloudscraper.get('https://www.tkdtechnology.it/index.php/welcome/tabulati_giorni?id=87', function (error, response, body) {
		if (error) {
			res.send({ error: error });
		} else {
			//console.log(body, response);
			var json = {
				body: body
			}
			res.send(json);
		}
	});

})


app.get("/zipdata", function (req, res) {

	var zip5 = new EasyZip();
	zip5.zipFolder('data', function () {
		zip5.writeToFile('public/data.zip');
		res.send("Data zipped <a href='data.zip'>Download</a>");
		//var file = fs.createWriteStream("data/data.zip");


		/*var request = http.get("http://i3.ytimg.com/vi/J---aiyznGQ/mqdefault.jpg", function(response) {
		  response.pipe(file);
		});*/

	});

})

app.get("/token/:enabled", function (req, res) {
	var enabled = req.params.enabled;

	var text = ""

	if (String(enabled) == "true") {
		text = "tokens enabled, app is now protected";
		usewhitelist = true;
	} else {
		text = "tokens disabled, app is now unprotected";
		usewhitelist = false;
	}

	res.send(text);


})

app.get("/mongoprova", function (req, res) {
	mongo.prova(function (err, data) {
		console.log("firnuto", err, data);
		res.send(data);
	});

})


app.post("/tpss/save/:filename", function (req, res) {
	var fname = req.params.filename;
	var body = req.body;
	var json = body.json;

	if (fname.toLowerCase().indexOf(".json") == -1) fname += ".json";
	console.log("filename", fname);
	console.log("saving following json", json.atleti_iscritti.length);



	if (!json.hasOwnProperty("atleti")) json.atleti = [];
	if (!json.hasOwnProperty("tabulati")) json.tabulati = [];
	if (!json.hasOwnProperty("giorni")) json.giorni = [];

	var rows = [json];

	mongo.updatefile(fname, rows, function (data) {
		res.send(data);
	})
})

app.post("/crossd", function (req, res) {
	console.log("called /crossd with following parms:")

	var host = req.body.host;
	var path = req.body.path;
	var url = req.body.url;
	var format = "";


	console.log("host: " + host);
	console.log("path: " + path);
	console.log("url: " + url);

	if (req.body.format) format = req.body.format;




	var options = {
		host: host,
		port: 80,
		path: '/' + path
	};


	var request = require('request');
	request.get(url, function (error, response, body) {
		if (!error && response.statusCode == 200) {

			if (format.trim().toLowerCase() == "xml") {
				parser.parseString(body, function (err, result) {

					if (err) {
						console.log("Error parsing XML: " + err);
						res.send({
							"error": true,
							"msg": err.message
						})
						return;

					}

					res.send(result);


				});
				//console.log(result);
				return;

			}

			res.send(body);
			return;
		}
		if (error) {
			console.log("error reading remote file: " + error.message);
			res.send({
				"error": true,
				"msg": error.message
			})
			return;
		}
	});

});

app.get("/socketusers", function (req, res) {

	var clients = findClientsSocket();
	console.log(clients.length)
	var out = [];
	if (clients.length > 0) {
		for (var i = 0; i < clients.length; i++) {
			var e = clients[i];
			var appv = "";
			var gcmtoken = "";
			if (e.appversion) appv = e.appversion;
			if (e.gcmtoken) gcmtoken = e.gcmtoken;
			if (e.hasOwnProperty("id")) {
				var cl = {
					id: e.id,
					email: e.email,
					role: e.role,
					nickname: e.nickname,
					customer: e.customer,
					ipaddress: e.ipaddress,
					device: e.device,
					appversion: appv,
					gcmtoken: gcmtoken
				}
				out.push(cl)
			}

		}


	}


	res.send(out);
});




app.get("/socketusersold", function (req, res) {

	var clients = findClientsSocket();
	var cl = {};
	cl.clients = clients;
	var sock = io.sockets.sockets;
	//console.log(sock);
	//colog(cl)
	//res.send(sock.length);
	//res.send(JSON.stringify(cl));

	var conn = "";

	var users = [];
	//res.send(sock);


	io.sockets.sockets.map(function (e) {
		conn += e.id + " ";
		var user = {
			id: e.id,
			email: e.email,
			role: e.role,
			nickname: e.nickname,
			customer: e.customer,
			ipaddress: e.ipaddress,
			device: e.device


		}
		users.push(user)
	})
	res.send(users);

});

app.get("/loaddatafiles", function (req, res) {

	mongo.loadDataFiles(function (data) {

		res.send(data);
	})

})


app.get("/sendtoaltervista", function (req, res) {
	var headers = {
		'User-Agent': 'Super Agent/0.0.1',
		'Content-Type': 'application/jsonrequest'
	}

	// Configure the request
	var options = {
		url: 'http://localhost:90/tkdr/savefile2.php',
		method: 'POST',
		headers: headers,
		dataType: "json",
		form: {
			'filename': 'collaminchia.json',
			'fdata': 'fanculo'
		}
	}

	// Start the request
	request(options, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			// Print out the response body
			console.log(body)
			res.send("ok");
		}
		if (error) {
			res.send(error);
		}

	})




})

app.post("/gettkdtabulato", function (req, res) {

	var url = req.body.url;

	// Configure the request
	var options = {
		url: url,
		method: 'GET',
		dataType: "html"
	}

	// Start the request
	request(options, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			// Print out the response body
			console.log(body)
			res.send(body);
		}
		if (error) {
			res.send(error);
		}

	})

})


app.get("/gettkdtech", function (req, res) {

	// Configure the request
	var options = {
		url: 'http://demo.tkdtechnology.it',
		method: 'GET',
		dataType: "html"
	}

	// Start the request
	request(options, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			// Print out the response body
			console.log(body)
			res.send(body);
		}
		if (error) {
			res.send(error);
		}

	})

})






app.get("/createmongofile/:fname", function (req, res) {
	var retvalue = {
		error: false,
		errormsg: ""

	}
	var fname = req.params.fname;
	mongo.createRecordFromFile(fname, function (obj) {
		retvalue.errormsg = "mongo record created from file " + fname
		if (obj.hasOwnProperty("error")) {
			if (obj.error == true) {
				retvalue = obj;

			}

		}


		console.log(retvalue.errormsg);

		res.send(retvalue);

	})


})
/*
app.get('/editfile/:filename', function(req, res){
	var fname=req.params.filename;
	fname="data/"+fname;
    console.log("editfile filename: "+fname);
	
	//fname="data/"+fname;
	fs.readFile(fname, "utf-8",function(err, data) {
		
	 if (err){
		data={};
		data.error=true;
		data.msg="Error "+err.message;
	    console.log("Error reading file "+fname+": "+err.message);
		res.send(err);
		return;
	 }	
	 
	 console.log("file data:");
	 console.log(data);
	
	 var drinks = [
        { name: 'Bloody Mary', drunkness: 3 },
        { name: 'Martini', drunkness: 5 },
        { name: 'Scotch', drunkness: 10 }
     ];
     var tagline = "Any code of your own that you haven't looked at for six or more months might as well have been written by someone else.";

     res.render('editfile.ejs', {
        text: data
     });
	}); 
	
	
	
	
    //response.sendfile(path.join(__dirname+'/editfile.html?file='+fname));
});

*/

app.get("/broadcast/reset", function (req, res) {
	broadcastes = [];
	if (io) {
		io.emit("broadcast", {
			action: "reset",
			broadcast: "",
			broadcastes: broadcastes
		});
		console.log("emitted reset broadcastes event")

	} else console.log("io not found");
	res.send(broadcastes);
})

app.get("/broadcast/list", function (req, res) {
	res.send(broadcastes);
})


app.post("/broadcast/add", function (req, res) {

	var body = req.body;
	var bcast = body.broadcast;
	console.log("BROADCAST ADD", bcast);
	if (broadcastes.indexOf(bcast) == -1) broadcastes.push(bcast);
	if (io) {
		io.emit("broadcast", {
			action: "add",
			broadcast: bcast,
			broadcastes: broadcastes
		});
		console.log("emitted add broadcast event")

	} else console.log("io not found");
	res.send(bcast);

})


app.post("/broadcast/remove", function (req, res) {

	var body = req.body;
	var bcast = body.broadcast;
	console.log("BROADCAST REMOVE", bcast);
	var bcastes = [];
	broadcastes.forEach(function (item, idx) {
		if (item != bcast) bcastes.push(bcast);

	})
	broadcastes = bcastes;
	if (io) {
		io.emit("broadcast", {
			action: "remove",
			broadcast: bcast,
			broadcastes: broadcastes
		});
		console.log("emitted remove broadcast event")

	} else console.log("io not found");
	res.send(bcast);

})




app.get("/fblive", function (req, res) {
	var url = "";
	var status = "on";



	if (req.query) {
		if (req.query.url) url = req.query.url;
		if (req.query.status) status = req.query.status;
	}
	console.log("Received FBLIVE !!", url);
	if (io) {
		io.emit("fblive", {
			url: url,
			status: status
		});
		console.log("emitted fblive event")

	} else console.log("io not found");

	res.send("ok");

})


app.get("/fcm/test", function (req, res) {
	gcm.fcmSendToTopic({}, function (data) {
		res.send(data);

	})
})

app.get("/fcm/sendtest", function (req, res) {
	var obj = {
		title: "AppkwondoV2",
		body: "prova messaggio push",
		topic: "chatkwondo"

	}


	if (req.query.hasOwnProperty("badge")) obj.badge = req.query.badge;
	if (req.query.hasOwnProperty("body")) obj.body = req.query.body;
	if (req.query.hasOwnProperty("text")) obj.body = req.query.text;
	if (req.query.hasOwnProperty("title")) obj.title = req.query.title;
	if (req.query.hasOwnProperty("disablebadge")) obj.disablebadge = req.query.disablebadge;

	gcm.fcmSend(obj, function (data) {
		res.send(data);
	})

});

app.post("/fblive", function (req, res) {
	var url = "";
	var status = "on";
	if (req.body) {
		if (req.body.url) url = req.body.url;
		if (req.body.status) status = req.body.status;
	}
	if (req.query) {
		if (req.query.url) url = req.query.url;
		if (req.query.status) status = req.query.status;
	}
	console.log("Received FBLIVE !!", url);
	if (io) {
		io.emit("fblive", {
			url: url,
			status: status
		});
		console.log("emitted fblive event")

	} else console.log("io not found");

	res.send("ok");

})

app.get("/news", function (req, res) {
	var sdata = {};
	mongo.getfile("news.json", function (jdata) {
		//fs.readFile("data/news.json", "utf-8",function(err, data) {
		/*if (err){
			console.log("error: "+err);
			sdata={error: true, errormsg: err.message};
			
		} else sdata=data;
		
		console.log(sdata);
		
		var jdata=JSON.parse(sdata);*/
		jdata.rows.sort(function (a, b) {
			var a1 = a.time;
			var b1 = b.time;
			if (a1 > b1) return -1;
			if (a1 < b1) return 1;
			return 0;


		});

		res.send(jdata);

	});


});

app.get("/altervistasync", function (req, res) {
	var folder = "data_altervista";
	var htm = "";
	var repl = req.query.replace;
	if (!repl) repl = "false";
	if (repl == "true") folder = "data";
	utils.colog("altervista sync, replace=" + repl);
	htm += "altervista sync, replace=" + repl + "<br>";





	request.get('http://demym.altervista.org/savefile.php?action=herokudatafilelist', function (error, response, body) {
		console.log("got filelist from altervista herokudata: " + body);
		//res.send(body);
		var arr = JSON.parse(body);
		console.log(body);

		for (var i = 0; i < arr.length; i++) {
			var fname = arr[i];
			utils.colog("fname: " + fname);
			var url = "http://demym.altervista.org/herokudata/" + fname;
			var syncres = syncrequest('GET', url);
			fs.writeFileSync(folder + "/" + fname, syncres.body);
			utils.colog("Remote file " + fname + " was saved!");
			htm += "Remote file " + fname + " was saved to folder " + folder + " !<br>";
			/*
			fs.writeFile("data_altervista/"+fname,syncres.body, function(err) {
				 if(err) {
					console.log("error: "+err); 
					return console.log(err);
					
                 }
			     console.log("Remote file "+fname+" was saved!");
				
			});
			*/

			//request.get(url, function (error, response, fbody) {
			//var ffname=fname;
			//console.log("got altervista herokudata "+fname+": "+fbody);



			//});
		}
		res.send("altervistasync complete<br><br>" + htm)
	});


});


app.get("/mongo/sync", function (req, res) {
	var result = mongo.getfilesync("gare.json");
	res.send(result);

})
app.get("/mongo/getallfiles", function (req, res) {
	mongo.getallfiles(function (data) {

		res.send(data);

	});


})
app.get("/mongo/:fname", function (req, res) {

	var fname = req.params.fname;
	fname = fname + ".json";

	mongo.getfile(fname, function (data) {
		console.log(data.rows.length);
		res.send(data)
	})



})

app.get("/clearlog", function (req, res) {
	utils.clearlog();
	res.send("log cleared");

});

app.get("/realtime", function (req, res) {
	var rta = realtime.getRealtimeMatches();
	res.send(rta);
})

app.get("/scoreboards", function (req, res) {
	var rta = realtime.getScoreboards();
	res.send(rta);
})

app.get("/scoreboards/reset", function (req, res) {
	var rta = realtime.clearScoreboards();
	res.send(rta);
})

app.get("/scoreboards/remove/:clientid", function (req, res) {
	var clientid = req.params.clientid;
	realtime.removeScoreboard(clientid);
	if (io) {
		io.emit("scoreboards", {
			scoreboards: realtime.getScoreboards()
		});
	}
	res.send(realtime.getScoreboards())
})

app.get("/realtime/reset", function (req, res) {
	realtime.clearRealtime();
	realtime.initRealtime(function () {
		res.send(realtime.getRealtimeMatches());

	});

})

app.get("/scoreboards/reset", function (req, res) {
	realtime.clearScoreboards();

	res.send(realtime.getScoreboards());



})

app.get("/realtime/html", function (req, res) {

	var data = realtime.getRealtimeMatches();

	//console.log(data);
	res.render('realtime.ejs', {
		data: data
	});
	//res.send(html);





})

app.get("/scoreboards/html", function (req, res) {

	var data = realtime.getScoreboards();

	//console.log(data);
	res.render('scoreboards.ejs', {
		data: data
	});
	//res.send(html);





})

app.get("/realtimex/html", function (req, res) {

	var data = realtime.getRealtimeMatches();

	//console.log(data);
	res.render('realtimex.ejs', {
		data: data
	});
	//res.send(html);





})


/*y
    var tipo = req.body.tipo;   
	var aas = req.body.assignee; 
	var location = req.body.location; 
	console.log("post addInstallation");
	console.log(JSON.stringify(req.body));
});
*/

/*
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});*/



app.get("/importcsv", function (req, res) {
	var fields = [];
	var inserted = 0;
	var linesread = 0;
	var output = {
		rows: []
	}

	var fs = require('fs'),
		readline = require('readline');

	var rd = readline.createInterface({
		input: fs.createReadStream('data/minimarket.csv'),
		output: process.stdout,
		terminal: false
	});

	rd.on('line', function (line) {

		linesread++;
		if (linesread == 1) {
			console.log(line);
			fields = line.split(";");

			console.log(fields.length + " fields found");



		} else {

			var values = line.split(";");

			var docjson = {};
			var foundnonblank = false;

			var d = new Date();
			var mom = moment(d).format("YYYYMMDDHHmmss") + utils.Right("000" + inserted, 3);
			docjson.id = mom;
			docjson.imgurl = "";

			values.forEach(function (item, idx) {
				var campo = fields[idx];
				//console.log(campo);
				var sitem = item;
				if (campo == "type") {
					//console.log("item",item);

					sitem = sitem.replace('\"', '');
					sitem = sitem.replace('\"', '');
				}
				docjson[campo] = sitem;

				if (item.trim() != "") foundnonblank = true;

			})
			if (foundnonblank) {
				inserted++;
				//console.log("values",values.length);
				//if (inserted < 50) output.rows.push(docjson);
				output.rows.push(docjson)

			}


		}

	});

	rd.on("close", function () {
		console.log("firnuto, documents n.", inserted);
		fs.writeFile('data/minimarket.json', JSON.stringify(output, null, ' '));
		/*dbs.insert_bulk("customeranag", output.rows, function (data) {
			console.log("bulk insert completed");
			res.send("done");
		})*/

	})
});


app.get("/tpsssource", function (req, res) {
	var url = "https://tpss.eu/CheckTournament.asp?Code=27370418";
	request.get(url, function (error, response, body) {
		console.log("body", body)
		var body2 = body.replace("window.location='./login.asp'", "");
		res.send(body2);
	})
})


var headers;

app.post("/stocaz", function (req, res) {
	var body = req.body;
	header = req.headers;
	console.log(req);
})

app.get("/tpss2", function (req, res) {

	var url = 'http://tpss.eu/Overviewcategories.asp?Code=89766658';

	url = "https://tpss.eu/Overviewcategories.asp?Code=89766658&Code=89766658&Code=89766658";
	var request = require("request");
	var form = {
		Action: 'Full',
		FormsButton7: 'Full+competitor+list'
	};
	var formData = JSON.stringify(form);
	var contentLength = formData.length;
	request({
		url: url,
		method: "POST",
		headers: {
			'content-type': 'application/x-www-form-urlencoded',
			'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36',
			'content-length': '11',

			'referer': 'https://tpss.eu',
			'accept-encoding': 'gzip, deflate, br',
			'accept-language': 'it-IT,it;q=0.9,en-US;q=0.8,en;q=0.7',
			'cookie': 'connect.sid=s%3A74O9Q6oAJxS3kd6KLNfqXtFckOzfIJyD.HK1PU0KMlnAao69wAHYhE%2BmC0dSBwGCnDaHe3uJI1TI',
			'cache-control': 'max-age=0',
			'origin': 'https://tpss.eu',

		},
		form: form

	}, function (error, response, body) {
		console.log("error", error);

		console.log(body);
		res.send(body);
	});
})

app.get("/tpss3", function (req, res) {

	var url = "https://tpss.eu/Overviewcategories.asp?Code=89766658";
	var FormData = require('form-data');
	var request = require('request');

	var form = new FormData();

	form.append('Action', 'Full');
	form.submit(url, function (err, response) {
		// res – response object (http.IncomingMessage)  //
		console.log("response", response.body)

	});
})


app.get("/tpss4", function (req, res) {
	var https = require('https');
	var querystring = require('querystring');

	// form data
	var postData = querystring.stringify({
		Action: "Full",
		FormsButton7: "Full competitor list"
	});

	// request option
	var options = {
		host: 'tpss.eu',
		port: 443,
		method: 'POST',
		path: '/Overviewcategories.asp?Code=89766658&Code=89766658',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			'Content-Length': postData.length,
			'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36',
		}
	};

	// request object
	var req = https.request(options, function (res) {
		var result = '';
		res.on('data', function (chunk) {
			result += chunk;
		});
		res.on('end', function () {
			console.log(result);
		});
		res.on('error', function (err) {
			console.log(err);
		})
	});

	// req error
	req.on('error', function (err) {
		console.log(err);
	});

	//send request witht the postData form
	req.write(postData);
	req.end();
})


app.get("/gcm/resetcount/:token", function (req, res) {
	var token = req.params.token;
	gcm.resetTokenCount(token);
	res.send({
		error: false,
		tokens: gcm.viewTokens()
	});
})

app.get("/gcm/setcount/:token/:n", function (req, res) {
	var token = req.params.token;
	var n = req.params.n;
	gcm.setTokenCount(token, n);
	res.send({
		error: false,
		tokens: gcm.viewTokens()
	});
})


app.get("/gcm/setenabled/:value", function (req, res) {
	var value = req.params.value;
	if (String(value) == "yes") {
		gcm.setGcmEnabled(true);
	}
	if (String(value) == "no") {
		gcm.setGcmEnabled(false);
	}
	res.send("gcm setted enable to " + value);
})


app.get("/gcm/viewtokens", function (req, res) {
	res.send(gcm.viewTokens());
})

app.get("/gcm/getmemorytokens", function (req, res) {
	res.send(gcm.viewTokens());
})

app.get("/gcm/gettokens", function (req, res) {

	gcm.getTokens(function (data) {
		res.send(data);
	})


})


app.get("/gcm/reset", function (req, res) {
	res.send(gcm.resetTokens());
})

app.get("/gcm/deletetoken/:token", function (req, res) {
	var token = req.params.token;
	res.send(gcm.deleteToken(token));
})






app.get("/gcm/enablenotifications/:deviceid/:token", function (req, res) {
	var token = req.params.token;
	var deviceid = req.params.deviceid;
	gcm.addToken(deviceid, token);
	var retvalue = {
		success: true,
		text: "Notifications enabled for deviceid " + deviceid + " - token " + token
	}
	res.send(retvalue)

})


app.get("/gcm/savetokens", function (req, res) {
	gcm.saveTokens(function (data) {
		res.send(data);
	})
})

app.get("/gcm/disablenotifications/:deviceid/:token", function (req, res) {
	var token = req.params.token;
	var deviceid = req.params.deviceid;
	gcm.deleteToken(deviceid);
	var retvalue = {
		success: true,
		text: "Notifications disabled for deviceid " + deviceid + " - token " + token
	}
	res.send(retvalue)

})

app.get("/gcm/send", function (req, res) {

	var text = "Notification text";
	var title = "Notification title";
	var icon = "ic_launcher";
	var color = "#000000";
	var tag = "appkwondov2";
	var badge = "1";
	var topic = tag;
	var token = "";





	if (req.query.text) text = req.query.text;
	if (req.query.title) title = req.query.title;
	if (req.query.icon) icon = req.query.icon;
	if (req.query.color) color = req.query.color;
	if (req.query.tag) tag = req.query.tag;
	if (req.query.badge) badge = req.query.badge;
	if (req.query.topic) topic = req.query.topic;
	if (req.query.tk) token = req.query.tk;


	var obj = {
		text: text,
		title: title,
		icon: icon,
		color: color,
		tag: tag,
		badge: badge,
		topic: topic,
		token: token
	}

	if (token.trim() != "") {

		console.log("TOKEN", obj.token);

		gcm.sendToToken(obj, function (data) {
			console.log(data);
			console.log("sending gcm to token ", obj.token)
			res.send(data);
		})

	} else {

		gcm.sendToAll(obj, function (data) {
			console.log("sending gcm to all tokens", data);
			res.send(data);
		})


	}



})


app.get("/fcm/send", function (req, res) {

	var title = "Notifica di prova";
	var text = "Testo notifica di prova";

	if (req.query.title) title = req.query.title;
	if (req.query.text) text = req.query.text;

	var obj = {
		title: title,
		body: text,
		disablebadge: true

	}

	gcm.fcmSendToTopic(obj, function (fcmdata) {
		console.log("fcm sent", fcmdata)
		res.send(fcmdata);
	})
})


app.get("/triggerupdategara/:garaid", function (req, res) {
	var garaid = req.params.garaid;
	if (io) {
		io.emit("updategara", {
			garaid: garaid
		});
		res.send({ ok: true })
	} else res.send({ ok: false })

})


app.get("/gcm/test", function (req, res) {

	var text = "Testo notifica di prova";
	var title = "Notifica di prova";

	var msg = {
		title: title,
		text: "testo notifica"
	}

	/*
		gcm.sendHttps(msg, function (data) {
			console.log(data);
			res.send(data);
		})*/

	gcm.sendToEmail("demym@yahoo.it", msg, function (data) {
		res.send(data);
	})
})

app.get("/writeallgare", function (req, res) {
	writeAllGare(function (data) {
		res.send(data)
	})
})


app.get("/historyavversario", function (req, res) {
	var atletaid = req.query.atletaid;
	atletaid = "000000000000062";
	var avvers = "fisch";
	var matches_atleta = [];

	fs.readFile('./data/allgare.json', 'utf8', (err, jsonString) => {
		if (err) {
			console.log("File read failed:", err)
			return
		}
		var gare = JSON.parse(jsonString)
		gare.rows.forEach(function (item, idx) {
			var gara = item.doc;
			var matches = Object.assign({}, gara.matches);
			delete item.doc.matches;
			matches.rows.forEach(function (mitem, midx) {
				var match = mitem.doc;
				match.gara = item.doc;
				var atlid = match.atletaid;

				if (atlid == atletaid) {

					if (match.hasOwnProperty("avversario")) {
						var avv = match.avversario;
						console.log(avv)
						if (avv.toLowerCase().indexOf(avvers.toLowerCase()) > -1) {
							matches_atleta.push(match)
						}


					}
				}
			})
		})
		res.send(matches_atleta);
	})
})

app.get("/historyatleta", function (req, res) {

	atletaid = "000000000000062";
	if (req.query.atletaid) atletaid = req.query.atletaid;

	console.log("atletaid", atletaid)
	var matches_atleta = [];
	fs.readFile('./data/allgare.json', 'utf8', (err, jsonString) => {
		if (err) {
			console.log("File read failed:", err)
			return
		}
		var gare = JSON.parse(jsonString)


		//var gare = require('./data/allgare.json');
		gare.rows.forEach(function (item, idx) {
			var gara = item.doc;
			var matches = Object.assign({}, gara.matches);
			delete item.doc.matches;
			if (matches.hasOwnProperty("rows")) {
				matches.rows.forEach(function (mitem, midx) {
					var match = mitem.doc;
					match.gara = item.doc;
					if (match.hasOwnProperty("atletaid")) {

						var atlid = match.atletaid;
						//	console.log(atlid)
						if (atlid.trim() == atletaid.trim()) {
							//console.log(match.risultato)
							matches_atleta.push(match)

						}
					}
				})
			}
		})
		res.send(matches_atleta);
	})
})


app.get("/queryatletabyname", function (req, res) {
	var name = req.query.name;
	queryAtletaByName(name, function (data) {
		res.send(data)
	})
})





app.get("/bulk", function (req, res) {
	//var json=require("./data/json/a.json");
	var rawdata = fs.readFileSync('./data/json/atleti.json', 'utf8');
	console.log("rawdata", rawdata)
	var json = JSON.parse(rawdata)
	var arr = []
	json.forEach(function (item) {
		arr.push(item.doc)
	})
	dbscl.insert_bulk("atleti", arr, function (data) {
		res.send(data)
	});

})


app.get("/bulk2", function (req, res) {
	var garaid = "20151019175533";
	var query = {
		"selector": {
			"_id": {
				"$gt": ""
			}
		}
	}
	dbscl.find2("gare", query, function (data) {
		//console.log
		var arrids = [];

		data.rows.forEach(function (item) {
			var id = item.id;
			arrids.push(id);


		})
		//console.log("arrids", arrids)
		mongo.getfullfiles(function (combo) {

			var matchesarr = [];
			var bulkarr = [];

			/*
			arrids.forEach(function (item) {
				var gid = item;
				var matches = getfilecombo("cronaca_" + gid, combo);
				if (matches) {
					if (matches.hasOwnProperty("rows")) {
						console.log("cronaca_" + gid, matches.rows.length);
						
						//matchesarr=matchesarr.concat(matches.rows);
						var m=[];
						matches.rows.forEach(function(mitem){
							m.push(mitem);
						})
						var newbulkel={
							garaid: gid,
							rows: m
						}
						bulkarr.push(newbulkel);
					} else {
						console.log("WARNING matches_" + gid + " does not have rows !!")
					}
				} else {
					console.log("WARNING !! matches_" + gid + " is null")
				}


			})*/

			combo.forEach(function (item) {

				var fname = item.filename;
				if (fname.indexOf("tkdt") > -1) {

					var newitem = {
						id: fname,
						rows: item.filecontent.rows
					}


					var ss = JSON.stringify(newitem);
					console.log(fname, ss.length);
					if (ss.length > 800000) {
						console.log("SIZE WARNING ON " + fname + " !!!")
					} else bulkarr.push(newitem);
					/*newitem.rows.forEach(function(nitem){
						delete nitem.audio;
						delete nitem.photo;
						delete nitem.foto;
					})*/
					//bulkarr=bulkarr.concat(item.filecontent.rows)

				}
			})

			//res.send(bulkarr)
			dbscl.insert_bulk("tkdt", bulkarr, function (bdata) {
				res.send(bdata)
			})
			//res.send(bulkarr);


		})
		/*mongo.getall("matches_"+id+".json",function(mdata){
			console.log(mdata);
		})*/

	})
})

function getfilecombo(filename, arr) {
	for (var i = 0; i < arr.length; i++) {

		var fname = filename + ".json";
		if (arr[i].filename == fname) {

			return arr[i].filecontent
		}


	}



}
/**
 * Error handlers
 */
// development error handler
// will print stacktrace
/*
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}
*/
// production error handler
// no stacktraces leaked to user

/*
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});
*/
/**
 * Create HTTP server.
 */
var server = http.createServer(app);
/**
 * Listen on provided port, on all network interfaces.
 */
var ExpressPeerServer = require('peer').ExpressPeerServer;
//var peerserver = require('peer').ExpressPeerServer;


var server = app.listen(port);
var io = require('socket.io').listen(server);
var nspChat = io.of('/chat')
var nspDefault = io.nsps['/']
var messageList = []
var userList = []

//ELIMINARE QUI PEERJS !!!

var q = ExpressPeerServer(server, { debug: true, allow_discovery: true });

app.use('/peerjs', q);




q.on('connection', function (id) {
	console.log('new connection with id ', id);
	if (io) {
		io.emit("rtcpeerconnected", id);
	}
});

q.on('disconnect', function (id) {
	console.log('disconnect with id ', id);
	if (io) {
		io.emit("rtcpeerdisconnected", id);
	}

});

//FINE BLOCCO  PEERJS !!!



// catch 404 and forward to error handler
app.use(function (req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});



//server.listen(port);

app.set('socketio', io);
//var io = require('socket.io').listen(app.listen(port));




if (syncavfiles) {
	sync.downloadAvFiles();
	sync.downloadChatAvFiles();
}
//SOCKET.IO definitions

global.io = io;

io.sockets.on('connection', function (socket) {
	var address = socket.handshake.address;
	global.socket = socket;
	socket.ipaddress = address;
	var addedUser = false;
	console.log("socket id " + socket.id + " connected from ip " + address);
	//socket.broadcast.emit("refreshsockets", {text: "Socket "+socket.id+" connected"});
	io.to(socket.id).emit("getnickname", {
		sockid: socket.id
	});
	//socket.emit("refreshsockets",{text: "Socket "+socket.id+" connected"});

	socket.on('create', function (roomname) {
		utils.colog("socket create");
		//socket.room = roomname;
		/* socket.join(roomname);
	  if (roomname.indexOf("ROOM|")>-1)
	  {
	   var arr=roomname.split("|");
       var fromemail=arr[1];
       var toemail=arr[2]; 
	   var r="ROOM|"+fromemail+"|"+toemail;
	
       socket.emit("create",r)	
       colog("emitted create room "+r) 	   
	  }
	  rooms[roomname] = roomname;
      */

	});


	socket.on('realtime', function (data) {
		colog("socket realtime received.... non dovrebbe arrivare");
		//colog(data)


	});


	socket.on('chatmsg', function (data) {
		utils.colog("chatmsg from " + socket.id + ": ");
		colog(data);
		var dataoggi = new Date();
		var tempo = dataoggi.juliandate();
		data.time = tempo;
		socket.broadcast.emit('chatmsg', data);



	});


	socket.on('message', function (msg) {




		colog('received message from socketid ' + socket.id + ":" + JSON.stringify(msg));
		var toid = "";
		var tipo = msg.type;
		var nick = "";
		var email = "";
		if (msg.nickname) nick = msg.nickname;
		if (msg.hasOwnProperty("email")) email = msg.email;
		if (msg.to) toid = msg.to;
		if (toid.toLowerCase().trim() == "all") toid = "";

		if (tipo == "refreshchat") {
			colog('received refreshchat from user: ' + msg.nickname);
			//io.emit('typing', msg);
			socket.broadcast.emit("refreshchat", msg);


		}

		if (tipo == "clientspecs") {
			console.log("received clientspecs from " + socket.id + ":", msg);

			if (msg.hasOwnProperty("gcmtoken") && msg.hasOwnProperty("deviceid")) {
				if ((msg.gcmtoken != "") && (msg.deviced != "")) gcm.addToken(msg.deviceid, msg.gcmtoken);

			}

			socket.device = msg.device;
			socket.nickname = nick;
			socket.email = email;
			if (msg.gcmtoken) socket.gcmtoken = msg.gcmtoken;
			if (msg.deviceid) socket.deviceid = msg.deviceid;
			if (msg.appversion) socket.appversion = msg.appversion;
			io.emit('auserhasconnected');

			//socket.broadcast.emit("auserhasconnected", socket);

		}


		if (tipo == "realtime") {
			console.log("socket message->realtime received", new Date());

			colog("broadcasting " + tipo + " to all")



			socket.broadcast.emit(tipo, msg);



			if (msg.deleterealtime) {
				if (String(msg.deleterealtime) == "true") return;


			}



			console.log("syncing rt", msg);
			realtime.updateRealtimeMatches(msg);
			socket.broadcast.emit("realtimematches", {
				matches: realtime.getRealtimeMatches()
			});


		}

		if (tipo == 'notification') {

			//socket.emit(tipo, msg);
			if (toid == "") {
				colog("broadcasting " + tipo + " to all")
				socket.broadcast.emit(tipo, msg);
			} else {
				colog("broadcasting " + tipo + " to " + toid)
				//io.to(toid).emit(tipo,'ciao sono '+socket.id)
				var data = {
					type: "notification",
					text: msg.text + " from " + socket.id
				}
				io.to(toid).emit("notification", data);
				//io.sockets.connected[toid].emit(tipo,data);

			}
		}

		/* var mess={
			text: msg.text,
			from_nickname: msg.from_nickname,
			from_email: msg.from_email,
			to_nickname: msg.to_nickname,
			to_email: msg.to_email,
			room: msg.room
		   
       };
	   */

		/*
	   var mess=msg;
	   

	   
	   if (msg.to_email.trim()!=""){
		    io.emit('message', mess)
		  // io.sockets.in(mess.to_email).emit('new_msg', {msg: 'hello'});
		   //io.to(msg.room).emit("message", mess);
	   } else  {
		   msg.room="ROOM|"+mess.from_email+"|"+mess.to_email;
		   io.emit('message', mess);
	   }
	   */
	});

	socket.on("getrealtimematches", function () {
		io.to(socket.id).emit("realtimematches", {
			matches: realtime.getRealtimeMatches()
		});
	})

	socket.on("getscoreboards", function () {
		console.log("received getscoreboards")
		io.to(socket.id).emit("scoreboards", {
			scoreboards: realtime.getScoreboards()
		});
	})

	socket.on('scoreboard', function (data) {
		colog("socket scoreboard received");
		console.log("socket scoreboard received", data);
		console.log("syncing scoreboards", data);
		realtime.syncScoreboards(data);
		socket.broadcast.emit("scoreboard", data);
	});





	socket.on('typing', function (msg) {
		//colog('received typing from user: ' + msg.nickname);
		//io.emit('typing', msg);
		socket.broadcast.emit("typing", msg);
		//socket.broadcast.emit(tipo, msg); 
	});

	/*socket.on('refreshchat', function(msg){
       colog('received refreshchat from user: ' + msg.nickname);
	   //io.emit('typing', msg);
	   socket.broadcast.emit("refreshchat", msg); 
	   //socket.broadcast.emit(tipo, msg); 
    });*/



	socket.on('connected', function (msg) {
		console.log("socket connected", msg);
		//io.to(socket.id).emit("getclientspecs", msg);
		io.to(socket.id).emit("getnickname", {
			sockid: socket.id
		});
	});

	socket.on('disconnect', function () {
		var txt = "Socket " + socket.id + " disconnected";
		realtime.removeScoreboard(socket.id);
		console.log(txt);
		utils.colog(txt);
		io.emit("scoreboard")
		io.emit("scoreboards")
		io.emit('auserhasdisconnected');

		//WEBRTC PART
		if (addedUser) {
			for (let i = 0; i < userList.length; i++) {
				if (socket.username === userList[i].username) {
					userList.splice(i, 1);
				}
			}
			socket.broadcast.emit('user left', {
				username: socket.username
			});

			socket.emit('getUsers', userList);
		}
		//socket.broadcast.emit("refreshsockets", {text: txt});
		//socket.emit("refreshsockets",{text: txt});
	});

	/*
		socket.on("error",function(err){
			console.log("error",err)
		})
	*/

	//res.send(sock) ;

	// io.emit('connected', { message: "", user: msg.user });

	//socket.emit('message', { message: 'welcome to the chat', user: "Server" });




	//WEBRTC LISTENERS !!

	socket.on('add user', function (data) {
		if (addedUser) return;
		addedUser = true;
		socket.username = data.username;
		console.log('Username: ', data.username);
		userList.push({
			username: data.username
		});

		socket.emit('login', {
			userList: userList
		});

		socket.broadcast.emit('user joined', {
			username: data.username
		});

		socket.join(data.username);
	});

	socket.on('call', function (data) {
		console.log('call from', data.from);
		console.log('call to', data.to);
		io.sockets.in(data.to).emit('call:incoming', data);
	});


	socket.on('iceCandidate', function (data) {
		io.sockets.in(data.to).emit('call:iceCandidate', data);
	});

	socket.on('answer', function (data) {
		console.log('answer from', data.from);
		console.log('answer to', data.to);
		io.sockets.in(data.to).emit('call:answer', data);
	});

	socket.on('answered', function (data) {
		console.log('answer from', data.from);
		console.log('answer to', data.to);
		io.sockets.in(data.to).emit('call:answered', data);
	})

	socket.on('new message', function (data, cb) {
		cb(true);
		console.log(data);
		messageList.push(data);
		socket.broadcast.emit('new message', data);
	})

	socket.on('getUsers', function () {
		socket.emit('getUsers', userList);
	})
	socket.on('user count', function () {
		socket.emit('user count', userList.length)
	})
	socket.on('getMessages', function () {
		socket.emit('getMessages', messageList)
	})

});


nspDefault.on('connect', (socket) => {
	console.log('Joined Namespace: /')
	socket.on('disconnect', () => {
		console.log('Left Namespace: /')
	})
})

nspChat.on('connect', (socket) => {
	console.log('Joined Namespace: /chat')

	socket.on('disconnect', () => {
		console.log('Left Namespace: /chat')
	})
})






server.on('error', onError);
server.on('listening', onListening);
//var io = require('socket.io').listen(app.listen(port));
/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
	console.log("SERVER ONERROR !!", error);
	if (error.syscall !== 'listen') {
		throw error;
	}
	// handle specific listen errors with friendly messages
	switch (error.code) {
		case 'EACCES':
			console.error('Port ' + port + ' requires elevated privileges');
			process.exit(1);
			break;
		case 'EADDRINUSE':
			console.error('Port ' + port + ' is already in use');
			process.exit(1);
			break;
		default:
			throw error;
	}
}
/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
	utils.colog("");
	utils.colog("-----------------------------------------------------------");
	utils.colog("AppKwonDo server started");
	utils.colog('Listening on port ' + server.address().port);
	utils.colog("-----------------------------------------------------------");
}


function findClientsSocket(roomId, namespace) {
	var res = [],
		ns = io.of(namespace || "/"); // the default namespace is "/"

	if (ns) {
		for (var id in ns.connected) {
			if (roomId) {
				var index = ns.connected[id].rooms.indexOf(roomId);
				if (index !== -1) {
					res.push(ns.connected[id]);
				}
			} else {
				res.push(ns.connected[id]);
			}
		}
	}
	return res;
}


function colog(txt) {
	if (logActive) console.log(txt);

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







//PEER SERVER

var ip = require('ip');
var peerserverport = 9000;

//var PeerServer = require('peer').PeerServer;
//var peerserver = new PeerServer({port: peerserverport, allow_discovery: true});

//app.use('/peerjs', peerserver(server, {debug: true, allow_discovery: true}));


function writeAllGare(callback) {

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


		gare_json.rows.sort(function (a, b) {
			var a1 = a.doc.data;
			var b1 = b.doc.data;
			var m1 = moment(a1, "DD/MM/YYYY").format("YYYYMMDD");
			var m2 = moment(b1, "DD/MM/YYYY").format("YYYYMMDD");
			if (m1 > m2) return -1;
			if (m1 < m2) return 1;
			return 0;
		})


		fs.writeFile('data/allgare.json', JSON.stringify(gare_json), 'utf8', function () {
			callback(gare_json)
		});










	});


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



function queryAtletaByName(name, callback) {
	var atls = [];
	mongo.getfile("atleti.json", function (data) {
		data.rows.forEach(function (item, idx) {
			var atl = item.doc;
			var atlname = atl.cognome.toLowerCase() + " " + atl.nome.toLowerCase();
			if (atlname.toLowerCase().indexOf(name.toLowerCase()) > -1) {
				atls.push(atl)
			}
		})
		callback(atls);
	})
}