var express = require('express');
var path = require('path');
var app = express();
var server = require('https'),
    url = require('url'),
    path = require('path'),
    fs = require('fs');

var isUseHTTPs = false && !(!!process.env.PORT || !!process.env.IP);
var port = process.env.PORT || 9001;	
var myapp;



//app.use("/demos", express.static(__dirname + "/demos"));
app.use(express.static(path.join(__dirname, 'demos')));

//pp.use(express.static(path.join(__dirname, 'demos')));


app.use(function(req, res, next) {
/*
   var url=req.url.toLowerCase();
   console.log(url);
   if (url.indexOf("demos/")>-1)  {
	    req.url = url.replace("/demos/","");
   }
   console.log("new url",req.url);
*/
   next();
});

app.get('/fanguls', function (req, res) {
  res.send('Hello World!');
});


app.get("/viewers/connected", function(req, res){

var clients = findClientsSocket() ;
//console.log("clients sockets: "+clients)
var cl={};
cl.clients=clients;
var sock=io.sockets.sockets;
//console.log("sock",sock)
console.log(sock.email)
//colog(cl)
//res.send(sock.length);
//res.send(JSON.stringify(cl));

var conn="";

var users=[];
io.sockets.sockets.map(function(e) {
    conn+=e.id+" ";

	var connected=false;
	if (e.hasOwnProperty("connected")){

		if (e.connected==true) connected=true;
	}

	var user={
		id: e.id,
		email: e.email,
		role: e.role,
		nickname: e.nickname,
		customer: e.customer,
		connected: connected,
		userphoto: e.userphoto

	}
	//colog(user.id+" - "+user.email+" - "+user.connected);
	if (connected) users.push(user)
})
res.send(users);
});

var options = {
        key: fs.readFileSync(path.join(__dirname, 'fake-keys/privatekey.pem')),
        cert: fs.readFileSync(path.join(__dirname, 'fake-keys/certificate.pem'))
    };

var capp = server.createServer(options);
var io = require('socket.io').listen(capp);

//app = server.createServer(options,app);

function handler(req,res){

    
}


//runServer();

var myapp=capp.listen(port,function(){
     var addr = myapp.address();
     if (addr.address === '0.0.0.0') {
            addr.address = 'localhost';
        }
   console.log('Server listening at ' + (isUseHTTPs ? 'https' : 'http') + '://' + addr.address + ':' + addr.port);

});

app.use(express.static(path.join(__dirname, 'demos')));



requireSignaling();

 



function runServer() {
    myapp = app.listen(port, process.env.IP || '0.0.0.0', function() {
        var addr = myapp.address();

        if (addr.address === '0.0.0.0') {
            addr.address = 'localhost';
        }

        console.log('Server listening at ' + (isUseHTTPs ? 'https' : 'http') + '://' + addr.address + ':' + addr.port);
    });

     requireSignaling();
	

}


function requireSignaling(){
  require('./Signaling-Server.js')(myapp, function(socket) {
        try {
            var params = socket.handshake.query;

            // "socket" object is totally in your own hands!
            // do whatever you want!

            // in your HTML page, you can access socket as following:
            // connection.socketCustomEvent = 'custom-message';
            // var socket = connection.getSocket();
            // socket.emit(connection.socketCustomEvent, { test: true });

            if (!params.socketCustomEvent) {
                params.socketCustomEvent = 'custom-message';
            }

            socket.on(params.socketCustomEvent, function(message) {
                try {
                    socket.broadcast.emit(params.socketCustomEvent, message);
                } catch (e) {}
            });
        } catch (e) {}
    });

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
