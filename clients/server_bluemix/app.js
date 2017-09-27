/**
 * Public Module dependencies.
 */ 
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
var fs = require('fs');
//var mongo = require('mongodb');
var EasyZip = require('easy-zip').EasyZip;
var syncrequest = require('sync-request');

var zip = new EasyZip();
var clients = [];
var logActive=true;

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
	sync = require('./routes/sync'),
	chat = require('./routes/chat'),
	societa = require('./routes/societa')
	//mysql = require('./routes/mysql');;
	//contacts = require('./routes/contacts'),
	//index = require('./routes/index'),
	//installations = require('./routes/installations'),
	//items = require('./routes/items'),
    //schede = require('./routes/schede');
	
	global.loggedin=false;
	
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
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended : true,
	limit: "30mb",
	parameterLimit: 30000
}));
app.use(favicon(__dirname + '/public/img/bluemix_logo.png'));
app.use(logger('dev'));
app.use(cookieParser());

//app.use(app.router());

app.use(express.static(path.join(__dirname, 'public')));


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
secret: 'keyboard cat' }));

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


var allowCrossDomain = function(req, res, next) {
res.header('Access-Control-Allow-Origin', '*');
res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
next();
}

app.use(allowCrossDomain);


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

app.get('/', function(req, res){
    res.sendfile('index.html', { root: path.join(__dirname, 'public')} );
});


app.use("/convert",convert);
app.use("/files",filemanager)
app.use("/atleti",atleti)
app.use("/gare",gare)
app.use("/societa",societa)
app.use("/matches",matches)
app.use("/chat",chat)



app.get("/zipdata",function(req,res){
	
	var zip5 = new EasyZip();
	zip5.zipFolder('data',function(){
    zip5.writeToFile('public/data.zip');
	res.send("Data zipped <a href='data.zip'>Download</a>");
	//var file = fs.createWriteStream("data/data.zip");
	
	
/*var request = http.get("http://i3.ytimg.com/vi/J---aiyznGQ/mqdefault.jpg", function(response) {
  response.pipe(file);
});*/
	
});
	
})

app.get("/socketusers", function(req, res){
	
var clients = findClientsSocket() ;
console.log(clients.length)
var out=[];
if (clients.length>0) {
	for (var i=0;i<clients.length; i++){
		var e=clients[i];
		var cl={
			id: e.id,
		email: e.email,
		role: e.role,
		nickname: e.nickname,
		customer: e.customer,
		ipaddress: e.ipaddress,
		device: e.device
		}
		out.push(cl)
		
	}
	
	
}


res.send(out);
});


app.get("/socketusersold", function(req, res){
	
var clients = findClientsSocket() ;
var cl={};
cl.clients=clients;
var sock=io.sockets.sockets;
//console.log(sock);
//colog(cl)
//res.send(sock.length);
//res.send(JSON.stringify(cl));

var conn="";

var users=[];
//res.send(sock);


io.sockets.sockets.map(function(e) {
    conn+=e.id+" ";
	var user={
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

app.get("/loaddatafiles",function(req,res){
	
	mongo.loadDataFiles(function(data){
		
		res.send(data);
	})
	
})


app.get("/sendtoaltervista",function(req,res){
	var headers = {
    'User-Agent':       'Super Agent/0.0.1',
    'Content-Type':     'application/jsonrequest'
}
 
// Configure the request
var options = {
    url: 'http://localhost:90/tkdr/savefile2.php',
    method: 'POST',
    headers: headers,
	dataType: "json",
    form: {'filename': 'collaminchia.json', 'fdata': 'fanculo'}
}
 
// Start the request
request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        // Print out the response body
        console.log(body)
		res.send("ok");
    }
	if (error){
		res.send(error);
	}
	
})
	
	
	
	
})

app.post("/gettkdtabulato",function(req,res){
 
var url=req.body.url; 
 
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
	if (error){
		res.send(error);
	}
	
})

})


app.get("/gettkdtech",function(req,res){
 
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
	if (error){
		res.send(error);
	}
	
})

})






app.get("/createmongofile/:fname",function(req,res){
	var retvalue={
		error: false,
		errormsg: ""
	
	}
	var fname=req.params.fname;
	mongo.createRecordFromFile(fname,function(obj){
		retvalue.errormsg="mongo record created from file "+fname
		if (obj.hasOwnProperty("error")) {
			if (obj.error==true){
				retvalue=obj;
				
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

app.get("/news", function(req, res){
	var sdata={};
	mongo.getfile("news.json",function(jdata){
	//fs.readFile("data/news.json", "utf-8",function(err, data) {
		/*if (err){
			console.log("error: "+err);
			sdata={error: true, errormsg: err.message};
			
		} else sdata=data;
		
		console.log(sdata);
		
		var jdata=JSON.parse(sdata);*/
		jdata.rows.sort(function(a,b){
			var a1=a.time;
			var b1=b.time;
			if (a1>b1) return -1;
			if (a1<b1) return 1;
			return 0;
			
			
		});
		
		res.send(jdata);
		
	});
	
	
});

app.get("/altervistasync", function(req, res){
	var folder="data_altervista";
	var htm="";
	var repl=req.query.replace;
	if (!repl) repl="false";
	if (repl=="true") folder="data";
	console.log("altervista sync, replace="+repl);
	htm+="altervista sync, replace="+repl+"<br>";
	
	

	
	
	request.get('http://demym.altervista.org/savefile.php?action=herokudatafilelist', function (error, response, body) {
		console.log("got filelist from altervista herokudata: "+body);
		//res.send(body);
		var arr=JSON.parse(body);
		console.log(body);
		
		for (var i=0; i<arr.length; i++){
			var fname=arr[i];
			console.log("fname: "+fname);
			var url="http://demym.altervista.org/herokudata/"+fname;
			var syncres = syncrequest('GET', url);
			fs.writeFileSync(folder+"/"+fname,syncres.body);
			console.log("Remote file "+fname+" was saved!");
			htm+="Remote file "+fname+" was saved to folder "+folder+" !<br>";
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
		 res.send("altervistasync complete<br><br>"+htm)
	});
	
	
});


app.get("/mongo/sync",function(req,res){
	var result=mongo.getfilesync("gare.json");
	res.send(result);
	
})
app.get("/mongo/getallfiles",function(req,res){
	mongo.getallfiles(function(data){
		
		res.send(data);
		
	});
	
	
})
app.get("/mongo/:fname",function(req,res){
	
	var fname=req.params.fname;
	fname=fname+".json";
	
	mongo.getfile(fname,function(data){
		console.log(data.rows.length);
		res.send(data)
	})
	

	
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



// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
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
var server=app.listen(port)
 
//server.listen(port);
var io = require('socket.io').listen(server);
app.set('socketio', io); 
//var io = require('socket.io').listen(app.listen(port));

sync.downloadAvFiles();
//SOCKET.IO definitions



io.sockets.on('connection', function (socket) {
	var address = socket.handshake.address;
	socket.ipaddress=address;
	colog("socket id "+socket.id+" connected from ip "+address);
	//socket.broadcast.emit("refreshsockets", {text: "Socket "+socket.id+" connected"});
	io.to(socket.id).emit("getnickname", {sockid: socket.id});
	//socket.emit("refreshsockets",{text: "Socket "+socket.id+" connected"});
	
	socket.on('create', function(roomname) {
	  colog("socket create");	
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
	
	
	socket.on('realtime',function(data){
		colog("socket realtime received");
		colog(data)
		
		
	});
	
	
	
	
	socket.on('message', function(msg){
		colog('received message from socketid '+socket.id+":"+JSON.stringify(msg));
		var toid="";
		var tipo=msg.type;
		var nick="";
		if (msg.nickname) nick=msg.nickname;
		if (msg.to) toid=msg.to;
		if (toid.toLowerCase().trim()=="all") toid="";
		
		if (tipo=="clientspecs"){
			colog("received clientspecs from "+socket.id+":");
            colog(msg);
            socket.device=msg.device;
			socket.nickname=nick;
			//socket.broadcast.emit("refreshsockets", {text: "Socket "+socket.id+" identificated as "+msg.device});
			
		}
		
		
		if (tipo=="realtime"){
			colog("socket realtime received");
		    colog(data)
			console.log("broadcasting to all")
			socket.broadcast.emit(tipo, msg); 
			
			
		}
		
		if (tipo=='notification')
		{	
         
         //socket.emit(tipo, msg);
         if (toid==""){
			 console.log("broadcasting to all")
			socket.broadcast.emit(tipo, msg); 
		 } else {
			 console.log("broadcasting to "+toid)
		    //io.to(toid).emit(tipo,'ciao sono '+socket.id)
			var data={
				type: "notification",
				text: msg.text+" from "+socket.id
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
	
	/*
	socket.on('typing', function(msg){
       //colog('received typing from user: ' + msg.user);
	   io.emit('typing', { message: "", user: msg.user });
    });
	*/
	
	
	socket.on('connected', function(msg){
      colog("socket connected")
	 // rooms[msg.room] = msg.room;
      //socket.room = msg.room;
      //socket.join(msg.room);
	  
	  /*
	  socket.id=msg.useremail;
	  socket.email=msg.useremail;
	  
	  var obj={
		dbname: "users",
		field: "email",
		value: msg.useremail
	  }
	
	  dbs.listObjects(obj,function(data){
		//res.send(data);
		if (data.rows[0]){
		var r=data.rows[0].doc;
		
		socket.nickname=r.firstname+" "+r.lastname;
		socket.role=r.role;
		socket.customer=r.company;
		
		
		
		colog('socket id '+socket.id+' joined the chat');
	    io.sockets.in(msg.room).emit('connected', { message: "", user: msg.user });
		} else {
			
			colog("data.rows[0].doc is undefined (625-app.js)")
			
		}
		*/
	  });
	  
	socket.on('disconnect', function() {
		var txt="Socket "+socket.id+" disconnected";
      colog(txt);
	  //socket.broadcast.emit("refreshsockets", {text: txt});
      //socket.emit("refreshsockets",{text: txt});
   });
	  
	
	 //res.send(sock) ;
	  
	  // io.emit('connected', { message: "", user: msg.user });
    
	//socket.emit('message', { message: 'welcome to the chat', user: "Server" });
	
});





server.on('error', onError);
server.on('listening', onListening);
//var io = require('socket.io').listen(app.listen(port));
/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
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
  console.log('Listening on port ' + server.address().port);
}


function findClientsSocket(roomId, namespace) {
    var res = []
    , ns = io.of(namespace ||"/");    // the default namespace is "/"

    if (ns) {
        for (var id in ns.connected) {
            if(roomId) {
                var index = ns.connected[id].rooms.indexOf(roomId) ;
                if(index !== -1) {
                    res.push(ns.connected[id]);
                }
            } else {
                res.push(ns.connected[id]);
            }
        }
    }
    return res;
}


function colog(txt){
	if (logActive) console.log(txt);
	
}