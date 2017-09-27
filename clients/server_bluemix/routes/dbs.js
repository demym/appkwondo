var express = require('express');
var router = express.Router();
//var nano=require('nano')('2be28457-cba7-449a-a870-b1caa45d9350-bluemix.cloudant.com');
var Cloudant = require('cloudant');
var http = require('http');
var username = '2be28457-cba7-449a-a870-b1caa45d9350-bluemix';
var password = '24c7295ad9c99d96d8cbfba3deec7f855de6504866e72c76afc244cabe2c7972';
var CLOUDANT_REST_URL = "2be28457-cba7-449a-a870-b1caa45d9350-bluemix.cloudant.com";

var headers = {
			'Authorization': 'Basic MmJlMjg0NTctY2JhNy00NDlhLWE4NzAtYjFjYWE0NWQ5MzUwLWJsdWVtaXg6MjRjNzI5NWFkOWM5OWQ5NmQ4Y2JmYmEzZGVlYzdmODU1ZGU2NTA0ODY2ZTcyYzc2YWZjMjQ0Y2FiZTJjNzk3Mg==',
			'Content-Type' : 'application/json'
		};

		/*
Cloudant({
        "username": "2be28457-cba7-449a-a870-b1caa45d9350-bluemix",
        "password": "24c7295ad9c99d96d8cbfba3deec7f855de6504866e72c76afc244cabe2c7972",
        "host": "2be28457-cba7-449a-a870-b1caa45d9350-bluemix.cloudant.com",
        "port": 443,
        "url": "https://2be28457-cba7-449a-a870-b1caa45d9350-bluemix:24c7295ad9c99d96d8cbfba3deec7f855de6504866e72c76afc244cabe2c7972@2be28457-cba7-449a-a870-b1caa45d9350-bluemix.cloudant.com"
      }, function(er, cloudant) {
  if (er)
    return console.log('Error connecting to Cloudant account %s: %s', username, er.message)
  
	  console.log('Connected to %s:', username);
  
});
*/



function insert(obj,callback)
{
 Cloudant({
        "username": "2be28457-cba7-449a-a870-b1caa45d9350-bluemix",
        "password": "24c7295ad9c99d96d8cbfba3deec7f855de6504866e72c76afc244cabe2c7972",
        "host": "2be28457-cba7-449a-a870-b1caa45d9350-bluemix.cloudant.com",
        "port": 443,
        "url": "https://2be28457-cba7-449a-a870-b1caa45d9350-bluemix:24c7295ad9c99d96d8cbfba3deec7f855de6504866e72c76afc244cabe2c7972@2be28457-cba7-449a-a870-b1caa45d9350-bluemix.cloudant.com"
      }, function(er, cloudant) {
  if (er)
  {
  
  callback({error: "true", msg: er.message});   
   return console.log('Error connecting to Cloudant account %s: %s', username, er.message)	  
  } 
  
	  console.log('Connected to %s:', username);
	  var db = cloudant.db.use('schede');
      db.insert(obj, function(err, body) {
  if (!err) {
	  console.log(body); 
	  callback(body);
  } else
  {
	  console.log("insert db error");
	  callback({error: "true", msg: er.message});
  }
    
 });	
  
});	
 
	
}


function update(obj,id,callback)
{
 Cloudant({
        "username": "2be28457-cba7-449a-a870-b1caa45d9350-bluemix",
        "password": "24c7295ad9c99d96d8cbfba3deec7f855de6504866e72c76afc244cabe2c7972",
        "host": "2be28457-cba7-449a-a870-b1caa45d9350-bluemix.cloudant.com",
        "port": 443,
        "url": "https://2be28457-cba7-449a-a870-b1caa45d9350-bluemix:24c7295ad9c99d96d8cbfba3deec7f855de6504866e72c76afc244cabe2c7972@2be28457-cba7-449a-a870-b1caa45d9350-bluemix.cloudant.com"
      }, function(er, cloudant) {
  if (er)
  {
  
  callback({error: "true", msg: er.message});   
   return console.log('Error connecting to Cloudant account %s: %s', username, er.message)	  
  } 
  
	  console.log('Connected to %s:', username);
	  var db = cloudant.db.use('schede');
      db.insert(obj, id,function(err, body) {
  if (!err) {
	  console.log(body); 
	  callback(body);
  } else
  {
	  console.log("update db error");
	  callback({error: "true", msg: err.message});
  }
    
 });	
  
});	
 
	
}

function remove(doc,callback)
{
 Cloudant({
        "username": "2be28457-cba7-449a-a870-b1caa45d9350-bluemix",
        "password": "24c7295ad9c99d96d8cbfba3deec7f855de6504866e72c76afc244cabe2c7972",
        "host": "2be28457-cba7-449a-a870-b1caa45d9350-bluemix.cloudant.com",
        "port": 443,
        "url": "https://2be28457-cba7-449a-a870-b1caa45d9350-bluemix:24c7295ad9c99d96d8cbfba3deec7f855de6504866e72c76afc244cabe2c7972@2be28457-cba7-449a-a870-b1caa45d9350-bluemix.cloudant.com"
      }, function(er, cloudant) {
  if (er)
  {
   callback(er);	  
   return console.log('Error connecting to Cloudant account %s: %s', username, er.message)	  
  } 
  
	  console.log('Connected to %s:', username);
	  var db = cloudant.db.use('schede');
      db.destroy(doc.id, doc.rev, function(err, body) {
  if (!err) {
	  console.log(body); 
	  callback(body);
  } else
  {
	  console.log("insert db error");
	  callback(body);
  }
    
 });	
  
});	
 
	
}


//DB functions

//GETALLITEMS


function getAllItemsREST(dbname,callback) {
	var PATH = "/"+dbname+"/_all_docs?include_docs=true";
	var options = {
		hostname : CLOUDANT_REST_URL,
		port : '80',
		path : PATH,
		method : 'GET',
		headers : headers,
		rejectUnauthorized : false,
		agent : false,
	};
	var req = http.request(options, function(res) {
		var resultString = '';
		res.on('data', function(chunk) {
			console.log('get response: ' + chunk);
			resultString += chunk;
		});
		res.on('error', function(c) {
			console.log('get error: ' + c);
		});
		res.on('end', function() {
			console.log('get status ' + res.statusCode);
			if (res.statusCode === 200) {
				//console.log("got following response: "+JSON.parse(resultString))
				callback(JSON.parse(resultString));
			} else {
				callback({error: "true", statusCode: res.statusCode}); // error case
			}
		});
		
	});
	req.on('error',function(err){
      console.log("req error: "+err);
	  callback({error: "true", msg: err.message});
    });

	req.end();
}


//GETITEMBYID


function getItemByIdREST(dbname, itemId, callback) {
	var PATH = "/"+dbname+"/" + itemId;
	var options = {
		hostname : CLOUDANT_REST_URL,
		port : '80',
		path : PATH,
		method : 'GET',
		headers : headers,
		rejectUnauthorized : false,
		agent : false,
	};
	var req = http.request(options, function(res) {
		var resultString = '';
		res.on('data', function(chunk) {
			//console.log('get response: ' + chunk);
			resultString += chunk;
		});
		res.on('error', function(c) {
			console.log('get error: ' + c);
		});
		res.on('end', function() {
			console.log('get status ' + res.statusCode);
			if (res.statusCode === 200) {
				callback(JSON.parse(resultString));
			} else {
				callback({error: "true", statusCode: res.statusCode}); 
			}
		});
	});
	req.on('error',function(err){
      console.log("req error: "+err);
	    callback(err);
    });

	req.end();
}


//ADDITEM


function addItemREST(dbname, item, callback) {
	

	console.log("dbs addItemREST to db "+dbname+" --> " + JSON.stringify(item));
	var PATH = "/"+dbname;
	var options = {
		hostname : CLOUDANT_REST_URL,
		port : '80',
		path : PATH,
		method : 'POST',
		headers : headers,
		rejectUnauthorized : false,
		agent : false,
	};
	var req = http.request(options, function(res) {
		//console.log("httpreq: "+JSON.stringify(res))
		//res.setEncoding('utf8');
		var resultString = '';
		res.on('data', function(chunk) {
			console.log('ondata: ' + chunk);
			resultString += chunk;
		});
		res.on('error', function(e) {
			  console.log("Error: " +  e.message); 
              console.log( e.stack );
			  //callback({"error": e.message});
		});
		res.on('end', function() {
			console.log('get status ' + res.statusCode);
			if (res.statusCode === 201) {
				callback(JSON.parse(resultString));
			} else {
				callback(JSON.parse(resultString));// error case
			}
		});
	});
	req.on('error',function(err){
      console.log("req error: "+err);
	  callback(err);
    });
    req.end();
	//req.write(JSON.stringify(item));
	//req.end();
}


//DELETEITEM


function deleteItemREST(dbname, itemId, rev, callback) {
	getItemByIdREST(dbname,itemId, function(obj) {
		
		var PATH = "/"+dbname+"/" + itemId + "?rev=" + rev;
		//var PATH = "/installations/" + itemId ;
		var options = {
			hostname : CLOUDANT_REST_URL,
			port : '80',
			path : PATH,
			method : 'DELETE',
			headers :headers,
			rejectUnauthorized : false,
			agent : false,
		};
		var req = http.request(options, function(res) {
			var resultString = '';
			res.on('data', function(chunk) {
				//console.log('get response: ' + chunk);
				resultString += chunk;
			});
			res.on('error', function(c) {
				console.log('get error: ' + c);
			});
			res.on('end', function() {
				console.log('get status ' + res.statusCode);
				if (res.statusCode === 200) {
					callback(JSON.parse(resultString));
				} else {
					callback({error: "true", statusCode: res.statusCode}); 
				}
			});
		});
		req.end();
	});
}




exports.update=update;
exports.remove=remove;
exports.insert=insert;
exports.addItemREST=addItemREST;
exports.getAllItemsREST=getAllItemsREST;
exports.deleteItemREST=deleteItemREST;
exports.getItemByIdREST=getItemByIdREST;