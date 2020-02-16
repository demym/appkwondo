var express = require('express');
var fs=require("fs")
var path=require("path")
var url=require("url")
var http=require("http")
var router = express.Router();
var utils=require("../routes/utils");

var DOWNLOAD_DIR = './public/data/media/';
var chatdownloaddir = './public/data/chatmedia/';


/*
router.get("/getmediafiles",function(req,res) {
	
	var url="http://demym.altervista.org/herokudata/cronacamedia/";
	
	//var fname="20160404102538_20160413205359.m4a";
	
	
	//get av mediafiles
	var htm="";
	getAvFiles(function(data) {
		
		console.log("SYNC AV MEDIA FILES");
		
		
		
		var arr=data.split(",");
		
		for (var i=0; i<arr.length; i++) {
			var fname=arr[i];
			console.log("downloading file "+fname);
			htm+=fname+"<br>";
			downloadhttpfile(url+fname);
			
			
		}
		
		res.send(htm+"<br><br>AV MEDIA FILES DOWNLOADED");
		
	});
	
	
	
	
	//downloadhttpfile(url+fname);
	
	
});
*/


function downloadAvFiles(callback){
	var url="http://demym.altervista.org/herokudata/cronacamedia/";
	
	//var fname="20160404102538_20160413205359.m4a";
	
	
	//get av mediafiles
	var htm="";
	getAvFiles(function(data) {
		
		utils.colog("SYNC AV MEDIA FILES");
		
		
		
		var arr=data.split(",");
		
		for (var i=0; i<arr.length; i++) {
			var fname=arr[i];
			utils.colog("downloading file "+fname);
			htm+=fname+"<br>";
			downloadhttpfile(url+fname);
			
			
		}
		
		//res.send(htm+"<br><br>AV MEDIA FILES DOWNLOADED");
		if (callback) callback(htm);
		
	});
	
	
	
	
}


function downloadChatAvFiles(callback){
	var url="http://demym.altervista.org/herokudata/chatmedia/";
	
	//var fname="20160404102538_20160413205359.m4a";
	
	
	//get av mediafiles
	var htm="";
	getChatAvFiles(function(data) {
		
		utils.colog("SYNC AV CHAT MEDIA FILES");
		
		
		
		var arr=data.split(",");
		
		for (var i=0; i<arr.length; i++) {
			var fname=arr[i];
			utils.colog("downloading file "+fname);
			htm+=fname+"<br>";
			downloadaltervistafile(url+fname,chatdownloaddir);
			
			
		}
		
		//res.send(htm+"<br><br>AV MEDIA FILES DOWNLOADED");
		if (callback) callback(htm);
		
	});
	
	
	
	
}


function getAvFiles(callback){
	var options = {
  host: 'demym.altervista.org',
  path: '/herokudata/cronacamedia/listfiles.php'
};

var req = http.get(options, function(res) {
  //console.log('STATUS: ' + res.statusCode);
  //console.log('HEADERS: ' + JSON.stringify(res.headers));

  // Buffer the body entirely for processing as a whole.
  var bodyChunks = [];
  res.on('data', function(chunk) {
    // You can process streamed parts here...
    bodyChunks.push(chunk);
  }).on('end', function() {
    var body = Buffer.concat(bodyChunks);
    //console.log('BODY: ' + body);
	if (callback) callback(body.toString());
    // ...and/or process the entire body here.
  }).on("error",function(e){
     console.log("error in getting filelist from altervista - getavfiles",err);
     if (callback) callback(err);
  })
});

req.on('error', function(e) {
  console.log('ERROR: ' + e.message);
});
	
	
}



function getChatAvFiles(callback){
	var options = {
  host: 'demym.altervista.org',
  path: '/herokudata/chatmedia/listfiles.php'
};

var req = http.get(options, function(res) {
  //console.log('STATUS: ' + res.statusCode);
  //console.log('HEADERS: ' + JSON.stringify(res.headers));

  // Buffer the body entirely for processing as a whole.
  var bodyChunks = [];
  res.on('data', function(chunk) {
    // You can process streamed parts here...
    bodyChunks.push(chunk);
  }).on('end', function() {
    var body = Buffer.concat(bodyChunks);
    //console.log('BODY: ' + body);
	if (callback) callback(body.toString());
    // ...and/or process the entire body here.
  }).on("error",function(e){
      console.log("error in getting filelist from altervista - getchatavfiles",err);
      if (callback) callback(e);

  })
});

req.on('error', function(e) {
  console.log('ERROR: ' + e.message);
});
	
	
}



function getFiles (dir, files_){
    files_ = files_ || [];
    var files = fs.readdirSync(dir);
    for (var i in files){
        var name = dir + '/' + files[i];
        if (fs.statSync(name).isDirectory()){
            //getFiles(name, files_);
        } else {
            files_.push(name);
        }
    }
    return files_;
}




function downloadaltervistafile(file_url,downloaddir) {
var options = {
    host: url.parse(file_url).host,
    port: 80,
    path: url.parse(file_url).pathname
};

var file_name = url.parse(file_url).pathname.split('/').pop();
var file = fs.createWriteStream(downloaddir + file_name);

http.get(options, function(res) {
    res.on('data', function(data) {
            file.write(data);
        }).on('end', function() {
            file.end();
            console.log(file_name + ' downloaded from altervista to ' + DOWNLOAD_DIR);
        }).on("error",function(e){
            console.log("error downloading file "+file_name,e);
        });
    });
};



function downloadhttpfile(file_url) {
var options = {
    host: url.parse(file_url).host,
    port: 80,
    path: url.parse(file_url).pathname
};

var file_name = url.parse(file_url).pathname.split('/').pop();
var file = fs.createWriteStream(DOWNLOAD_DIR + file_name);
console.log("trying to download http file ",file_name);
http.get(options, function(res) {
    res.on('data', function(data) {
            file.write(data);
        }).on('end', function() {
            file.end();
            console.log(file_name + ' downloaded to ' + DOWNLOAD_DIR);
        }).on("error",function(e){
            console.log("error downloading file "+file_name,e);
        });
    });
};


exports.downloadAvFiles=downloadAvFiles;
exports.downloadChatAvFiles=downloadChatAvFiles;