/*

IBM Business Partner Ecosystem Italia
Licensed Materials - Property of IBM
© Copyright IBM Corporation 2017   
All Rights Reserved

*/


var utils = require("../routes/utils");
var express = require('express');
var fs = require('fs')
var router = express.Router();
//var nano=require('nano')('2be28457-cba7-449a-a870-b1caa45d9350-bluemix.cloudant.com');
var Cloudant = require('cloudant');
var http = require('http');
//var username = 'cdf8a0ef-8440-4070-b202-b4917838e42f-bluemix';

var credentials_c365 = {
	"username": "20235a9a-2968-42f9-9d2b-085d2c37d4b3-bluemix",
	"password": "e7ea9ebde0b8232343a52edbe0cdfb53dce3c83fb06414558ec318e0034ebcea",
	"host": "20235a9a-2968-42f9-9d2b-085d2c37d4b3-bluemix.cloudant.com",
	"port": 443,
	"url": "https://20235a9a-2968-42f9-9d2b-085d2c37d4b3-bluemix:e7ea9ebde0b8232343a52edbe0cdfb53dce3c83fb06414558ec318e0034ebcea@20235a9a-2968-42f9-9d2b-085d2c37d4b3-bluemix.cloudant.com"
}

var credentials_bp = {
	"username": "08cda592-5752-4798-aaca-e273208036ed-bluemix",
	"password": "a01abe679dc2736fbdfea116bf71bd4bc9a282c9d7871cedd78aa3680a0c8c03",
	"host": "08cda592-5752-4798-aaca-e273208036ed-bluemix.cloudant.com",
	"port": 443,
	"url": "https://08cda592-5752-4798-aaca-e273208036ed-bluemix:a01abe679dc2736fbdfea116bf71bd4bc9a282c9d7871cedd78aa3680a0c8c03@08cda592-5752-4798-aaca-e273208036ed-bluemix.cloudant.com"
}

var credentials_fake = {
	"username": "08cda592-5752-4798-aaca-e273208036ed-bluemixxxxx",
	"password": "a01abe679dc2736fbdfea116bf71bd4bc9a282c9d7871cedd78aa3680a0c8c03",
	"host": "08cda592-5752-4798-aaca-e273208036ed-bluemix.cloudant.com",
	"port": 443,
	"url": "https://08cda592-5752-4798-aaca-e273208036ed-bluemix:a01abe679dc2736fbdfea116bf71bd4bc9a282c9d7871cedd78aa3680a0c8c03@08cda592-5752-4798-aaca-e273208036ed-bluemix.cloudant.com"
}

var credentials_bp_dbg = {
	"apikey": "xuM3jaxYMYXBxZWKCJrcktuvNCRlfgCQdKV9IZCkQU9U",
	"host": "d77aacc7-ef47-4fdd-8e0f-78c204960859-bluemix.cloudant.com",
	"iam_apikey_description": "Auto generated apikey during resource-key operation for Instance - crn:v1:bluemix:public:cloudantnosqldb:eu-gb:a/d1329b931af3c86513186f0d7ca1734b:238c0760-22bb-488d-9212-0256e61c2251::",
	"iam_apikey_name": "auto-generated-apikey-64e97aa4-d7b2-46f5-ba6e-f44a49ae00c4",
	"iam_role_crn": "crn:v1:bluemix:public:iam::::serviceRole:Manager",
	"iam_serviceid_crn": "crn:v1:bluemix:public:iam-identity::a/d1329b931af3c86513186f0d7ca1734b::serviceid:ServiceId-d0fd0794-1857-4a87-8c85-8aa19b5fd339",
	"password": "60beca3f62084aa3cf7f8280c7e3993490baa570c59a2c68348c0b63eda7f1a4",
	"port": 443,
	"url": "https://d77aacc7-ef47-4fdd-8e0f-78c204960859-bluemix:60beca3f62084aa3cf7f8280c7e3993490baa570c59a2c68348c0b63eda7f1a4@d77aacc7-ef47-4fdd-8e0f-78c204960859-bluemix.cloudant.com",
	"username": "d77aacc7-ef47-4fdd-8e0f-78c204960859-bluemix"
}


var credentials_appkwondo ={
    "apikey": "KQS2BovB_K4ulVCWgpW260fEiDqiWEV08dZnaqJyqFGf",
    "host": "9c9b444b-a920-4cda-820a-27a4a1bd2909-bluemix.cloudantnosqldb.appdomain.cloud",
    "iam_apikey_description": "Auto-generated for key 740f2d21-380c-4450-9d63-3f2916cc40db",
    "iam_apikey_name": "Credenziali del servizio-1",
    "iam_role_crn": "crn:v1:bluemix:public:iam::::serviceRole:Manager",
    "iam_serviceid_crn": "crn:v1:bluemix:public:iam-identity::a/c31a0037a61d9a2930a4eb791d3843b2::serviceid:ServiceId-9511e607-97b5-459b-8561-af276ade7720",
    "password": "a87c8b05c5d5b97a1ce346e7c14f5a3a5c1d5e2b8e4bdf7c4a37722f205d7adb",
    "port": 443,
    "url": "https://9c9b444b-a920-4cda-820a-27a4a1bd2909-bluemix:a87c8b05c5d5b97a1ce346e7c14f5a3a5c1d5e2b8e4bdf7c4a37722f205d7adb@9c9b444b-a920-4cda-820a-27a4a1bd2909-bluemix.cloudantnosqldb.appdomain.cloud",
    "username": "9c9b444b-a920-4cda-820a-27a4a1bd2909-bluemix"
  }


  

  
//console.log("global.appconfig",global.appconfig)
//credentials_bp_dbg=global.appconfig.cloudant;

//var credentials = credentials_bp_dbg;
var credentials = credentials_appkwondo;


var username = credentials.username;
var host = username + ".cloudant.com";
var password = credentials.password;
var CLOUDANT_REST_URL = credentials.host;
var url = credentials.url;



var state = {
	cloudant: null
}


var headers = {
	'Authorization': 'Basic MmJlMjg0NTctY2JhNy00NDlhLWE4NzAtYjFjYWE0NWQ5MzUwLWJsdWVtaXg6MjRjNzI5NWFkOWM5OWQ5NmQ4Y2JmYmEzZGVlYzdmODU1ZGU2NTA0ODY2ZTcyYzc2YWZjMjQ0Y2FiZTJjNzk3Mg==',
	'Content-Type': 'application/json'
};

function list(dbname, callback) {
	var ret = {
		rows: []
	}
	connect(function (er, cloudant) {
		if (er) {
			callback({
				error: "true",
				msg: er.message,
				rows: []
			});
			return console.log('Error connecting to Cloudant account %s: %s', username, er.message)
		}
		var db = cloudant.db.use(dbname);
		db.list({
			include_docs: true
		}, function (err, body) {
			if (!err) {
				//console.log("db.list results: "+JSON.stringify(body)); 
				callback(body);
			} else {
				console.log("list db error on db ", dbname);
				callback({
					error: "true",
					msg: "messaggio",
					rows: []
				});
			}
		})
	});


}



function listusers(callback) {

	connect(function (er, cloudant) {
		if (er) {
			callback({
				error: "true",
				msg: er.message
			});
			return console.log('Error connecting to Cloudant account %s: %s', username, er.message)
		}
		var db = cloudant.db.use("users");
		db.list({
			include_docs: true,
			include_attachments: true
		}, function (err, body) {
			if (!err) {


				//console.log("db.list results: "+JSON.stringify(body)); 

				callback(body);
			} else {
				console.log("list db error");
				callback({
					error: "true",
					msg: "messaggio"
				});
			}
		})
	});


}

function listById(dbname, id, callback) {
	//console.log("DBSListById dbanem: "+dbname+" - id: "+id)
	var result = {
		rows: []
	};

	connect(function (er, cloudant) {
		if (er) {
			callback({
				error: "true",
				msg: er.message
			});
			return console.log('Error connecting to Cloudant account %s: %s', username, er.message)
		}
		var db = cloudant.db.use(dbname);
		db.list({
			include_docs: true
		}, function (err, body) {
			if (!err) {
				//console.log("db.list results: "+JSON.stringify(body)); 

				for (var i = 0; i < body.rows.length; i++) {
					var docid = body.rows[i].doc._id;
					if (docid == id) result.rows.push(body.rows[i]);

				}


				callback(result);
			} else {
				console.log("list db error");
				callback({
					error: "true",
					msg: err.message
				});
			}
		})
	});


}

function find(dbname, filter, callback) {

	connect(function (er, cloudant) {
		if (er) {
			callback({
				error: "true",
				msg: er.message
			});
			return console.log('Error connecting to Cloudant account %s: %s', username, er.message)
		}
		var db = cloudant.db.use(dbname);

		var fields = [];

		for (f in filter) {
			fields.push(f);
		}

		//list indexes
		var country = {
			name: 'country',
			type: 'json',
			index: {
				fields: fields
			}
		}
		db.index(country, function (er, response) {
			if (er) {
				throw er;
			}

			console.log('Index creation result: %s', response.result);

			//db.find({selector:{"OwningTeamCountry":'Italy',"StartDate":"10/11/2015"}}, function(er, result) {
			db.find({
				selector: filter
			}, function (er, result) {
				if (er) {
					throw er;
				}
				console.log(result.docs.length + " results found")


				var retvalue = {
					rows: []
				};

				for (var i = 0; i < result.docs.length; i++) {
					var row = result.docs[i];
					var newdoc = {
						id: row._id,
						rev: row._rev,
						doc: row

					}
					retvalue.rows.push(newdoc);


				}

				//retvalue.rows=result.docs;
				callback(retvalue);
			});

		});








	});
}

function find2(dbname, query, callback) {
	var retvalue = {
	  rows: []
	}
	var fields = [];
	for (var k in query) {
	  //console.log("adding field", k);
	  fields.push(k);
	}
	connect(function (er, cloudant) {
	  if (er) {
		callback({
		  error: "true",
		  msg: er.message
		});
		return console.log('Error connecting to Cloudant account %s: %s', username, er.message)
	  }
	  var db = cloudant.db.use(dbname);
	  var idx = {
		name: 'idx',
		type: 'json',
		index: {
		  fields: fields
		}
	  }
  
	  var q = {
		"selector": {
		  "_id": {
			"$gt": ""
		  },
		  "local": {
			"$eq": false
		  }
		},
		"fields": [
		  "_id",
		  "_rev",
		  "SERIE",
		  "NOMINATIVOCONTA",
		  "EMAILCONTA",
		  "UNIQUEIBMID"
		],
		"sort": [{
		  "_id": "asc"
		}]
	  }
	  var t1 = new Date();
	  db.find(query, function (er, result) {
		var t2 = new Date();
		var tdiff = t2.getTime() - t1.getTime();
		if (er) {
		  console.log("error", er);
		  retvalue = {
			"error": true,
			"errdata": er,
			"rows": [],
			"time_ms_cloudantfind": tdiff
		  };
		  callback(retvalue);
		} else {
		  var l = JSON.stringify(result.docs).length;
		  //console.log(result);
		  //retvalue.result=result;
		  retvalue.rows = result.docs;
		  retvalue.time_ms_cloudantfind = tdiff;
		  retvalue.length = l;
		  callback(retvalue);
  
  
		}
  
	  });
	});
  
  
  }

function listByFilter(dbname, filter, callback) {
	var querycount = 0;
	var flt = {
		"OwningTeamCountry": "Italy",
		"StartDate": "10/11/2015"

	}
	var operator = "AND";
	flt = filter
	console.log("DBSlistByFilter dbname: " + dbname + " - filter: " + JSON.stringify(flt))
	var result = {
		rows: []
	};

	connect(function (er, cloudant) {
		if (er) {
			callback({
				error: "true",
				msg: er.message
			});
			return console.log('Error connecting to Cloudant account %s: %s', username, er.message)
		}
		var db = cloudant.db.use(dbname);
		db.list({
			include_docs: true
		}, function (err, body) {
			if (!err) {
				//console.log("db.list results: "+JSON.stringify(body)); 

				for (var i = 0; i < body.rows.length; i++) {
					var doc = body.rows[i].doc;
					var eligible = true;

					for (f in flt) {

						var val = flt[f];

						if (doc[f]) {

							if (doc[f].indexOf(val) > -1) {

								if (operator == "AND") eligible = eligible && true;
								if (operator == "OR") eligible = eligible || true;
							} else {
								if (operator == "AND") eligible = eligible && false;
								if (operator == "OR") eligible = eligible || false;
							}


						} else {
							if (operator == "AND") eligible = false;
						}



					}

					if (eligible) {
						result.rows.push(body.rows[i]);

						querycount++;
					}

				}

				console.log("found " + querycount + " eligible documents y")
				callback(result);
			} else {
				console.log("listbyfilter db error");
				callback({
					error: "true",
					msg: err.message
				});
			}
		})
	});


}




function listByField(dbname, field, value, callback) {
	console.log("DBSListByField dbanem: " + dbname + " - field: " + field + " with value: " + value)
	var result = {
		rows: []
	};

	connect(function (er, cloudant) {
		if (er) {
			callback({
				error: "true",
				msg: er.message
			});
			return console.log('Error connecting to Cloudant account %s: %s', username, er.message)
		}
		var db = cloudant.db.use(dbname);
		db.list({
			include_docs: true
		}, function (err, body) {
			if (!err) {
				//console.log("db.list results: "+JSON.stringify(body)); 

				for (var i = 0; i < body.rows.length; i++) {
					var docid = body.rows[i].doc._id;
					var valorcampo = body.rows[i].doc[field];
					if (valorcampo == value) result.rows.push(body.rows[i]);

				}


				callback(result);
			} else {
				console.log("list db error");
				callback({
					error: "true",
					msg: err.message
				});
			}
		})
	});


}



function listrest(dbname, callback) {
	getAllItemsREST(dbname, function (data) {
		console.log("db.list results: " + JSON.stringify(data));
		callback(data);

	});
}




function insert(dbname, obj, callback) {

	connect(function (er, cloudant) {
		if (er) {

			callback({
				error: "true",
				msg: er.message
			});
			return console.log('Error connecting to Cloudant account %s: %s', username, er.message)
		}

		//console.log('Connected to %s:', username);
		var db = cloudant.db.use(dbname);
		db.insert(obj, function (err, body) {
			if (!err) {
				console.log(body);
				callback(body);
			} else {
				console.log("insert db error", err);
				callback({
					error: "true",
					msg: err.message
				});
			}

		});

	});


}




function insert_bulk(dbname, docs, callback) {

	connect(function (er, cloudant) {
		if (er) {

			callback({
				error: "true",
				msg: er.message
			});
			return console.log('Error connecting to Cloudant account %s: %s', username, er.message)
		}

		//  console.log('Connected to %s:', username);
		var db = cloudant.db.use(dbname);
		db.bulk({
			docs: docs
		}, function (err, result) {
			if (err) {
				console.log("insert db error");
				callback({
					error: "true",
					msg: err.message
				});

			} else {

				console.log("documents inserted into db " + dbname)
				callback(result);
			}

		});

	});


}



function update(dbname, obj, callback) {
	var rev = obj._rev;
	var id = obj._id;
	obj._rev = rev;

	connect(function (er, cloudant) {
		if (er) {

			callback({
				error: "true",
				msg: er.message
			});
			return console.log('Error connecting to Cloudant account %s: %s', username, er.message)
		}

		// console.log('Connected to %s:', username);
		var db = cloudant.db.use(dbname);
		console.log("trying to update document " + id + " with rev " + rev);
		db.insert(obj, id, function (err, body) {
			if (!err) {
				//console.log(body); 
				callback(body);
			} else {
				console.log("update db error");
				callback({
					error: "true",
					msg: err.message
				});
			}

		});

	});


}

function remove(dbname, doc, callback) {

	connect(function (er, cloudant) {
		if (er) {
			callback(er);
			return console.log('Error connecting to Cloudant account %s: %s', username, er.message)
		}

		//  console.log('Connected to %s:', username);
		var db = cloudant.db.use(dbname);
		db.destroy(doc.id, doc.rev, function (err, body) {
			if (!err) {
				console.log(body);
				callback(body);
			} else {
				console.log("remove db error");
				callback({
					error: "true",
					msg: err.message
				});
			}

		});

	});


}


function create(dbname, callback) {
	connect(function (er, cloudant) {
		if (er) {
			callback(er);
			return console.log('Error connecting to Cloudant account %s: %s', username, er.message)
		}



		cloudant.db.create(dbname, function () {
			console.log("cloudant db " + dbname + " created ");
			callback();
		});
	});
}

function destroy(dbname, callback) {

	connect(function (er, cloudant) {
		if (er) {
			callback(er);
			return console.log('Error connecting to Cloudant account %s: %s', username, er.message)
		}

		cloudant.db.destroy(dbname, function (err) {

			console.log("cloudant db " + dbname + " destroyed ");
			callback();
		})

	});


}


//DB functions

//GETALLITEMS


function getAllItemsREST(dbname, callback) {
	var PATH = "/" + dbname + "/_all_docs?include_docs=true";
	var options = {
		hostname: CLOUDANT_REST_URL,
		port: '80',
		path: PATH,
		method: 'GET',
		headers: headers,
		rejectUnauthorized: false,
		agent: false,
	};
	var req = http.request(options, function (res) {
		var resultString = '';
		res.on('data', function (chunk) {
			console.log('get response: ' + chunk);
			resultString += chunk;
		});
		res.on('error', function (c) {
			console.log('get error: ' + c);
		});
		res.on('end', function () {
			console.log('get status ' + res.statusCode);
			if (res.statusCode === 200) {
				//console.log("got following response: "+JSON.parse(resultString))
				callback(JSON.parse(resultString));
			} else {
				callback({
					error: "true",
					statusCode: res.statusCode
				}); // error case
			}
		});

	});
	req.on('error', function (err) {
		console.log("req error: " + err);
		callback({
			error: "true",
			msg: err.message
		});
	});

	req.end();
}


//GETITEMBYID


function getItemByIdREST(dbname, itemId, callback) {
	var PATH = "/" + dbname + "/" + itemId;
	var options = {
		hostname: CLOUDANT_REST_URL,
		port: '80',
		path: PATH,
		method: 'GET',
		headers: headers,
		rejectUnauthorized: false,
		agent: false,
	};
	var req = http.request(options, function (res) {
		var resultString = '';
		res.on('data', function (chunk) {
			//console.log('get response: ' + chunk);
			resultString += chunk;
		});
		res.on('error', function (c) {
			console.log('get error: ' + c);
		});
		res.on('end', function () {
			console.log('get status ' + res.statusCode);
			if (res.statusCode === 200) {
				callback(JSON.parse(resultString));
			} else {
				callback({
					error: "true",
					statusCode: res.statusCode
				});
			}
		});
	});
	req.on('error', function (err) {
		console.log("req error: " + err);
		callback(err);
	});

	req.end();
}


//ADDITEM


function addItemREST(dbname, item, callback) {


	console.log("dbs addItemREST to db " + dbname + " --> " + JSON.stringify(item));
	var PATH = "/" + dbname;
	var options = {
		hostname: CLOUDANT_REST_URL,
		port: '80',
		path: PATH,
		method: 'POST',
		headers: headers,
		rejectUnauthorized: false,
		agent: false,
	};
	var req = http.request(options, function (res) {
		//console.log("httpreq: "+JSON.stringify(res))
		//res.setEncoding('utf8');
		var resultString = '';
		res.on('data', function (chunk) {
			console.log('ondata: ' + chunk);
			resultString += chunk;
		});
		res.on('error', function (e) {
			console.log("Error: " + e.message);
			console.log(e.stack);
			//callback({"error": e.message});
		});
		res.on('end', function () {
			console.log('get status ' + res.statusCode);
			if (res.statusCode === 201) {
				callback(JSON.parse(resultString));
			} else {
				callback(JSON.parse(resultString)); // error case
			}
		});
	});
	req.on('error', function (err) {
		console.log("req error: " + err);
		callback(err);
	});
	req.end();
	//req.write(JSON.stringify(item));
	//req.end();
}


//DELETEITEM


function deleteItemREST(dbname, itemId, rev, callback) {
	getItemByIdREST(dbname, itemId, function (obj) {

		var PATH = "/" + dbname + "/" + itemId + "?rev=" + rev;
		//var PATH = "/installations/" + itemId ;
		var options = {
			hostname: CLOUDANT_REST_URL,
			port: '80',
			path: PATH,
			method: 'DELETE',
			headers: headers,
			rejectUnauthorized: false,
			agent: false,
		};
		var req = http.request(options, function (res) {
			var resultString = '';
			res.on('data', function (chunk) {
				//console.log('get response: ' + chunk);
				resultString += chunk;
			});
			res.on('error', function (c) {
				console.log('get error: ' + c);
			});
			res.on('end', function () {
				console.log('get status ' + res.statusCode);
				if (res.statusCode === 200) {
					callback(JSON.parse(resultString));
				} else {
					callback({
						error: "true",
						statusCode: res.statusCode
					});
				}
			});
		});
		req.end();
	});
}



function insertAttach(dbname, obj, callback) {

	connect(function (er, cloudant) {
		if (er) {
			callback({
				error: "true",
				msg: er.message
			});
			return console.log('Error connecting to Cloudant account %s: %s', username, er.message)
		}

		//console.log("received insertAttach for object "+JSON.stringify(obj));

		var pth = obj.path;
		var fname = obj.fname;
		var filedata = obj.data;
		delete obj["data"];
		console.log("uploaded as " + pth)
		//obj.data="";
		//callback(obj);



		var db = cloudant.db.use(dbname);

		db.insert(obj, function (err, body) {
			if (!err) {
				console.log("inserted record " + JSON.stringify(body));

				/*
				  var img_stream = fs.createReadStream(pth)
				  var att = db.attachment.insert(body.id, fname, null, 'image/png')
			 
				 img_stream.pipe(att)
				 */
				//console.log(img_stream);
				//console.log("file streamed into record");
				callback(body);
				return;

				/*   
				  db.attachment.insert(body.id, fname, filedata, 'image/png',
				  { rev: body.rev}, function(err, body) {
					if (!err) {
						console.log("inserted attachment succesfully")
						callback(body);
						return;
					}  else {
						  console.log("insert attachment error");
						  callback({error: "true", msg: err.message});
						 return;
					}
				
				 })
				 */
			} else {
				console.log("insert db error");
				callback({
					error: "true",
					msg: er.message
				});
			}

		});



		/*
		db.multipart.insert(obj, attachments, 'rabbit', function(err, body) {
		  if (!err)
		  {	  
			console.log(body);
			callback(body)
		  }	else callback(body)
		})
	*/
	});
}



function listObjects(cobj, callback) {

	var dbname = cobj.dbname;
	var field = cobj.field;
	var value = cobj.value;

	value = value.trim().toLowerCase();

	var cdata = {
		rows: []
	};

	//console.log(JSON.stringify(req.body));


	list(dbname, function (data) {

		if (data.error) {
			console.log("Error", data)
			callback(data);

		} else {

			if (data.rows) {





				for (var i = 0; i < data.rows.length; i++) {

					var doc = data.rows[i].doc;
					if (doc[field]) {
						var id = doc[field].toLowerCase().trim();
						if (id.indexOf(value) > -1) {

							//if dbname=users get also userphoto and put it into userphoto field



							cdata.rows.push(data.rows[i])
						}

					}




				}
				//console.log("list result: "+JSON.stringify(data))

				cdata.total_rows = cdata.rows.length;
				callback(cdata)
				//res.send(cdata);
			} else {

				console.log("no data.rows found")
				callback(cdata)
			}
		}
	})


}




function viewAttachFile(obj, callback) {

	var dbname = obj.dbname;
	var id = obj.id;
	var fname = obj.filename;



	//console.log("viewAttachFile on db " + dbname + ", id " + id + ", filename " + fname)

	/*Cloudant({
        "username": username,
        "password": password,
        "host": host,
        "port": 443,
        "url": url
      }, function(er, cloudant) {*/
	connect(function (er, cloudant) {
		if (er) {
			callback(er);
			return console.log('Error connecting to Cloudant account %s: %s', username, er.message)
		}

		var db = cloudant.db.use(dbname);
		db.attachment.get(id, fname, function (err, body) {

			if (!err) {

				fs.writeFile("public/temp/" + fname, body);
				//console.log("file attachment " + fname + " got from db")
				/*
				var file = fs.readFile("temp/"+fname, 'binary');
				var stat = fs.statSync("temp/"+fname);
				var retobj={
					size: stat.size,
					type: 
				}

res.setHeader('Content-Length', stat.size);
res.setHeader('Content-Type', 'audio/mpeg');
res.setHeader('Content-Disposition', 'attachment; filename=your_file_name');
res.write(file, 'binary');
res.end();*/
				var filepath = __dirname + '/public/temp/' + fname;

				if (callback) callback(filepath);
			} else {
				console.log("error ! ", err);
				var filepath = __dirname + '/public/temp/omino.jpg';
				callback(filepath);
			}
		});



	});


}


function getRawUserPhoto(obj, callback) {

	var dbname = obj.dbname;
	var id = obj.id;
	var fname = obj.filename;
	//var uphotofilename=



	console.log("viewUserPhoto on db " + dbname + ", id " + id + ", filename " + fname)


	connect(function (er, cloudant) {
		if (er) {
			callback(er);
			return console.log('Error connecting to Cloudant account %s: %s', username, er.message)
		}

		var db = cloudant.db.use(dbname);
		db.attachment.get(id, fname, function (err, body) {

			if (!err) {


				if (callback) callback(body);
			} else {

				callback("");
			}
		});



	});


}




function viewUserPhoto(obj, callback) {

	var dbname = obj.dbname;
	var id = obj.id;
	var fname = obj.filename;
	//var uphotofilename=



	//console.log("viewUserPhoto on db " + dbname + ", id " + id + ", filename " + fname)

	connect(function (er, cloudant) {
		if (er) {
			callback(er);
			return console.log('Error connecting to Cloudant account %s: %s', username, er.message)
		}

		var db = cloudant.db.use(dbname);
		db.attachment.get(id, fname, function (err, body) {

			if (!err) {

				fs.writeFile("public/temp/" + id + "_" + fname, body);
				//console.log("file attachment " + fname + " got from db")
				/*
				var file = fs.readFile("temp/"+fname, 'binary');
				var stat = fs.statSync("temp/"+fname);
				var retobj={
					size: stat.size,
					type: 
				}

res.setHeader('Content-Length', stat.size);
res.setHeader('Content-Type', 'audio/mpeg');
res.setHeader('Content-Disposition', 'attachment; filename=your_file_name');
res.write(file, 'binary');
res.end();*/
				var filepath = __dirname + '/public/temp/' + id + "_" + fname;

				if (callback) callback(filepath);
			} else {
				console.log("error ! ");
				var filepath = __dirname + '/public/temp/omino.jpg';
				callback(filepath);
			}
		});



	});


}

function deleteAttachFile(obj, callback) {
	var dbname = obj.dbname;
	var id = obj.id;
	var filename = obj.filename;


	connect(function (er, cloudant) {
		if (er) {
			callback(er);
			return console.log('Error connecting to Cloudant account %s: %s', username, er.message)
		}

		var db = cloudant.db.use(dbname);

		db.get(id, {}, function (err, body) {

			if (err) {
				callback({
					error: "true",
					errormsg: err.message
				});

			}
			if (!err) {
				console.log(body);
				console.log("got document from db " + dbname + " - id: " + id + " - rev: " + body._rev);
				var rev = body._rev;
				db.attachment.destroy(id, filename, {
					rev: rev
				}, function (err, body) {
					if (!err) {
						console.log(body);
						callback({
							error: false,
							msg: "attachment " + filename + " deleted from docid " + id + " in db " + dbname
						});
					}
					if (err) callback({
						error: true,
						errormsg: err.message
					});
				});
			}
		});







	});





}

function attachFile(obj, callback) {

	var dbname = obj.dbname;
	var id = obj.id;
	var path = obj.filename;
	var orfname = obj.originalfilename;

	var mime = 'image/png';

	if (orfname.toLowerCase().indexOf(".jpg") > -1) mime = 'image/jpg';
	if (orfname.toLowerCase().indexOf(".gif") > -1) mime = 'image/gif';
	if (orfname.toLowerCase().indexOf(".pdf") > -1) mime = 'application/pdf';

	//var path=fname;

	//var dbname="elibrary";
	//var id="887f3f9615ae685898836a86dda39899";
	var rev = "2-8a3173fb47c5e13379515582f7421a9c";


	connect(function (er, cloudant) {
		if (er) {
			callback(er);
			return console.log('Error connecting to Cloudant account %s: %s', username, er.message)
		}

		var db = cloudant.db.use(dbname);
		var cb = {
			error: false,
			erromsg: '',
			userphoto: ""

		}

		db.get(id, {}, function (err, body) {



			var newfname = 'public/uploads/' + orfname;
			if (err) {
				cb.error = true;
				cb.errormsg = err.message;
				callback(cb);

			}
			if (!err) {
				console.log(body);
				console.log("got document from db " + dbname + " - id: " + id + " - rev: " + body._rev);
				rev = body._rev;


				fs.readFile(path, function (err, data) {
					if (!err) {
						console.log("read file " + path + " from server");

						if (dbname == "users") {

							fs.writeFile('temp/' + orfname, data, function (err) {});
							var base64Image = data.toString('base64');
							var decodedImage = new Buffer(base64Image, 'base64');
							cb.userphoto = decodedImage;
							fs.writeFile('temp/' + orfname + '_decoded.jpg', decodedImage, function (err) {});


						}


						db.attachment.insert(id, orfname, data, mime, {
							rev: rev
						}, function (err, body) {
							if (err) console.log("error: " + err.message);
							if (!err) {
								console.log(body);
								console.log("attachment " + path + " inserted in docid: " + id + " in dbname " + dbname + " as " + orfname);
								cb.status = "okuploaded";

								if (callback) callback(cb);
								/* db.attachment.get(id, orfname, function(err, body) {
									 if (!err) {
									   fs.writeFile(newfname, body);
									   console.log("file "+newfname+" got from db")
									   if (callback) callback(); 
									 }
								 });*/
							}
						});


					}
				});

			}
		});




	});
}



function createIndex(callback) {

	var dataoggi = "10/11/2015";

	var docs_indexer = function (doc) {
		if (doc.OwningTeamCountry && doc.StartDate) {
			// This looks like a book. 
			index('data', doc.StartDate);
			index('country', doc.StartDate);
		}
	}

	var ddoc = {
		_id: '_design/library',
		indexes: {
			books: {
				analyzer: {
					name: 'standard'
				},
				index: docs_indexer
			}
		}
	};

	connect(function (er, cloudant) {
		if (er) {
			callback(er);
			return console.log('Error connecting to Cloudant');
		}
		var db = cloudant.db.use("globalevents");

		db.insert(ddoc, function (er, result) {
			if (er) {
				throw er;
			}

			console.log('Created design document with docs index');
			callback(result);
		});

	});

}


function connect(done) {
	if (state.cloudant) {
		return done(null, state.cloudant);

	}
	console.log("Cloudant db is not connected, connecting....")

	Cloudant({
		"username": username,
		"password": password,
		"host": host,
		"port": 443,
		"url": url
	}, function (er, cloudant) {

		if (er) {
			console.log('Error connecting to Cloudant account %s: %s', username, er.message)
			return done(er, null);
		}
		console.log("connected to cloudant as %s !!", username)
		state.cloudant = cloudant;
		done(null, cloudant);
	});


	/* 
 MongoClient.connect(mongourl, function(err, db) {
   if (err) { 
	 console.log("error connecting to mongodb")
	 return done(err,null)
   }
   console.log("connected to mongodb !!")
   state.db = db
   done(null,db);
 })
 */
}

function get() {
	return state.cloudant;
}

function close(done) {
	if (state.cloudant) {
		state.cloudant.close(function (err, result) {
			state.cloudant = null
			state.mode = null
			done(err)
		})
	}
}

function uploadFileTry(fname, callback) {
	var fs = require('fs');
	connect(function (er, cloudant) {
		if (er) {
			callback(er);
			return console.log('Error connecting to Cloudant');
		}
		var db = cloudant.db.use("images");

		var mime = "";
		if (fname.toLowerCase().indexOf(".jpg") > -1) mime = 'image/jpeg';
		if (fname.toLowerCase().indexOf(".gif") > -1) mime = 'image/gif';
		if (fname.toLowerCase().indexOf(".pdf") > -1) mime = 'application/pdf';

		fs.readFile(fname, function (err, data) {
			if (!err) {
				db.attachment.insert('cloud', fname, data, mime, {}, function (err, body) {
					if (!err) {
						console.log(body);
						callback("done attaching file " + fname + " !!");

					} else {
						console.log("ERROR !", err);
						callback(err);
					}

				});
			}
		});
	});


}



function uploadFile(id, fname, rev, callback) {
	var fs = require('fs');
	connect(function (er, cloudant) {
		if (er) {
			callback(er);
			return console.log('Error connecting to Cloudant');
		}
		var db = cloudant.db.use("images");

		var mime = "";
		if (fname.toLowerCase().indexOf(".jpg") > -1) mime = 'image/jpeg';
		if (fname.toLowerCase().indexOf(".gif") > -1) mime = 'image/gif';
		if (fname.toLowerCase().indexOf(".pdf") > -1) mime = 'application/pdf';

		var rv = {};
		if (rev.trim() != "") rv = {
			rev: rev
		};

		fs.readFile(fname, function (err, data) {
			if (!err) {
				db.attachment.insert(id, fname, data, mime,
					rv,
					function (err, body) {
						if (!err) {
							console.log(body);
							callback("done attaching file " + fname + " to document with id " + id + "!!");

						} else {
							console.log("ERROR !", err);
							callback(err);
						}

					});
			}
		});
	});


}


function getFile(id, fname, callback) {
	var fs = require('fs');
	connect(function (er, cloudant) {
		if (er) {
			callback(er);
			return console.log('Error connecting to Cloudant');
		}
		var db = cloudant.db.use("images");
		listById("images", id, function (data) {

			console.log("data", data);
			var doc = data.rows[0].doc;

			var fnames = [];

			for (var k in doc._attachments) {
				fnames.push(k);
			}

			if (fname.toLowerCase().trim() == "random") {
				var r = Math.floor((Math.random() * fnames.length));
				console.log("randomnumber: " + r + ", filename: " + fnames[r]);
				fname = fnames[r];
			}

			db.attachment.get(id, fname, function (err, body) {
				if (!err) {
					var ffname = "down_" + fname;
					var filepath = __dirname + '/public/' + ffname;

					fs.writeFile("public/" + ffname, body);
					callback(fname);
				} else {
					callback(err);
				}

			});
		})
	});

}


function attachBase64File(dbname, id, filename, b64withheader, callback) {


	//B64 data passed is inclusive of data:image/jpeg;base64, for example

	var orfname = filename;


	var img = b64withheader;
	var data = img.replace(/^data:image\/\w+;base64,/, "");
	var buf = new Buffer(data, 'base64');



	var mime = 'image/png';

	if (orfname.toLowerCase().indexOf(".jpg") > -1) mime = 'image/jpg';
	if (orfname.toLowerCase().indexOf(".gif") > -1) mime = 'image/gif';
	if (orfname.toLowerCase().indexOf(".pdf") > -1) mime = 'application/pdf';


	var rev = "2-8a3173fb47c5e13379515582f7421a9c";


	connect(function (er, cloudant) {
		if (er) {
			callback(er);
			return console.log('Error connecting to Cloudant account %s: %s', username, er.message)
		}

		var db = cloudant.db.use(dbname);
		var cb = {
			error: false,
			erromsg: '',
			userphoto: ""

		}
		var obj = {
			dbname: dbname,
			filename: filename,
			id: id
		}
		deleteAttachFile(obj, function (deletedata) {
			console.log("deletedata",deletedata)

			db.get(id, {}, function (err, body) {



				var newfname = 'public/uploads/' + orfname;
				if (err) {
					cb.error = true;
					cb.errormsg = err.message;
					callback(cb);

				}
				if (!err) {
					console.log(body);
					console.log("got document from db " + dbname + " - id: " + id + " - rev: " + body._rev);
					rev = body._rev;




					var decodedImage = buf

					cb.userphoto = decodedImage;
					fs.writeFile('temp/' + orfname + '_decoded.jpg', decodedImage, function (err) {});



					db.attachment.insert(id, orfname, decodedImage, mime, {
						rev: rev
					}, function (err, body) {
						if (err) console.log("error: " + err.message);
						if (!err) {
							console.log(body);
							console.log("attachment inserted in docid: " + id + " in dbname " + dbname + " as " + orfname);
							cb.status = "okuploaded";

							if (callback) callback(cb);
							/* db.attachment.get(id, orfname, function(err, body) {
				   if (!err) {
					 fs.writeFile(newfname, body);
					 console.log("file "+newfname+" got from db")
					 if (callback) callback(); 
				   }
			   });*/
						}
					});





				}
			});




		});
	});
}




function getAttachFileasB64(obj, callback) {

	/*var obj = {
	  dbname: "",
	  id: "",
	  filename: ""
	}*/

	var dbname = obj.dbname;
	var id = obj.id;
	var fname = obj.filename;



	//console.log("viewAttachFile on db " + dbname + ", id " + id + ", filename " + fname)

	/*Cloudant({
		  "username": username,
		  "password": password,
		  "host": host,
		  "port": 443,
		  "url": url
		}, function(er, cloudant) {*/
	connect(function (er, cloudant) {
		if (er) {
			callback(er);
			return console.log('Error connecting to Cloudant account %s: %s', username, er.message)
		}

		var db = cloudant.db.use(dbname);
		db.attachment.get(id, fname, function (err, body) {

			if (!err) {

				var buff = new Buffer(body);
				var base64data = buff.toString('base64');
				var cbdata = "data:image/png;base64," + base64data;
				//console.log("file attachment " + fname + " got from db")
				callback(cbdata);
				//fs.writeFile("public/temp/" + fname, body);

				/*
				  var file = fs.readFile("temp/"+fname, 'binary');
				  var stat = fs.statSync("temp/"+fname);
				  var retobj={
					  size: stat.size,
					  type: 
				  }
  
  res.setHeader('Content-Length', stat.size);
  res.setHeader('Content-Type', 'audio/mpeg');
  res.setHeader('Content-Disposition', 'attachment; filename=your_file_name');
  res.write(file, 'binary');
  res.end();*/
				//var filepath = __dirname + '/public/temp/' + fname;

				//if (callback) callback(filepath);
			} else {
				console.log("error ! ");
				var cb = {
					error: true,
					err: err
				}
				callback(cb);
			}
		});



	});


}



exports.connect = connect;
exports.get = get;
exports.close = close;
exports.insertAttach = insertAttach;
exports.list = list;
exports.listById = listById;
exports.listByField = listByField;
exports.listByFilter = listByFilter;
exports.listObjects = listObjects;
exports.listusers = listusers;
exports.listrest = listrest;
exports.update = update;
exports.create = create;
exports.destroy = destroy;
exports.remove = remove;
exports.insert = insert;
exports.find = find;
exports.find2 = find2;
exports.insert_bulk = insert_bulk;
exports.createIndex = createIndex;
exports.addItemREST = addItemREST;
exports.getAllItemsREST = getAllItemsREST;
exports.deleteItemREST = deleteItemREST;
exports.getItemByIdREST = getItemByIdREST;
exports.attachFile = attachFile;
exports.viewAttachFile = viewAttachFile;
exports.viewUserPhoto = viewUserPhoto;
exports.getRawUserPhoto = getRawUserPhoto;
exports.deleteAttachFile = deleteAttachFile;
exports.getAttachFileasB64 = getAttachFileasB64;
exports.attachBase64File = attachBase64File;
exports.uploadFile = uploadFile;
exports.getFile = getFile;