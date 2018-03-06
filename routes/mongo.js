var express = require('express');
var router = express.Router();
var fs = require('fs');
var MongoClient = require('mongodb').MongoClient;
var utils = require("../routes/utils");
var debug = false;
var async = require('async');



var mongourl=process.env.MONGOURL


var state = {
	db: null
}


/*
connect(function(err){
	
	if (err) {
		
		console.log("Error connecting to mongodb: "+err.message);
	}
	
})*/

function colog(txt) {
	if (debug) console.log(txt);

}

function prova(callback) {


	var matchids = ["201606101852231000", "201606101852231011"];



	var matches = [];

	// The 'async.forEach()' function will call 'iteratorFcn' for each element in
	// stuObjList, passing a student object as the first param and a callback
	// function as the second param. Run the callback to indicate that you're
	// done working with the current student object. Anything you pass to done()
	// is interpreted as an error. In that scenario, the iterating will stop and
	// the error will be passed to the 'doneIteratingFcn' function defined below.
	var iteratorFcn = function (match, done) {

		// If the current student object doesn't have the 'honor_student' property
		// then move on to the next iteration.
		//if (!stuObj.honor_student) {
		if (1 == 2) {
			done();
			return; // The return statement ensures that no further code in this
			// function is executed after the call to done(). This allows
			// us to avoid writing an 'else' block.
		}
		console.log("getting match ", match);
		findRecords("matches_20160610185130.json", { 'id': match }, function (m) {
			console.log("findrecords result", m);
			//collection.findOne({ 'id': match }, function (err, m) {
			/*	if (err) {
					done(err);
					return;
				}*/

			matches.push(m);
			done();
			return;
		});
	}

	var doneIteratingFcn = function (err) {
		// In your 'callback' implementation, check to see if err is null/undefined
		// to know if something went wrong.
		console.log("doneiterating", err);
		callback(err, matches);
	}

	// iteratorFcn will be called for each element in stuObjList.
	async.forEach(matchids, iteratorFcn, doneIteratingFcn);

}

function archivefile(fname, newfname, callback) {

	getfile(fname, function (data) {

		//console.log(data);
		console.log(data.rows.length);
		var rows = data.rows;
		createfile(newfname, rows, function (data) {

			if (callback) callback(data);

		});


	});


}

function listfilessync(fnameroot) {

}

function listfiles(fnameroot, callback) {

	utils.colog("listing files with root: " + fnameroot + " from mongodb");
	var retvalue = {
		requestedfilename: fnameroot,
		error: false,
		errormsg: "",
		rows: []
	};

	// Connect to the db
	//MongoClient.connect(mongourl, function(err, db) {
	connect(function (err, db) {

		if (err) {
			console.log("error connecting to mongo");
			retvalue.error = true;
			retvalue.errormsg = err.message;
			callback(retvalue);
			return console.dir(retvalue);
		}
		//console.log("connected to mongodb");
		var collection = db.collection('tkdr');
		//collection.find({"filename" : {$regex : ".*son.*"}});
		//collection.find({"filename" : fnameroot}).toArray(function(err, items) {
		collection.find({ filename: { $regex: fnameroot } }).toArray(function (err, items) {

			if (!err) {
				console.log("items: ", items)
				if (items.length > 0) {
					retvalue.id = items[0]._id;
					for (var i = 0; i < items.length; i++) {
						retvalue.rows.push({
							filename: items[i].filename,
							size: JSON.stringify(items[i].filecontent).length
						});
					}
					/*if (items[0].filecontent.rows){
					//retvalue.rows=items[0].filecontent.rows; 
					retvalue.rows=items;
					} else retvalue.rows=[];*/

				} else {
					retvalue.error = true;
					retvalue.errormsg = "Mongo listfiles Filenames " + fnameroot + " not found in mongodb collection";
				}



			} else {
				console.log("error finding records with fname=" + fnameroot);
				retvalue.error = true;
				retvalue.errmsg = err.message;
				retvalue.errormessage = err.message;
				//callback(retvalue);
				//console.return(retvalue);
			}


			//console.log("mongo getfile returning: "+JSON.stringify(retvalue));
			if (callback) callback(retvalue);



		});



	});





}

function resetfile(fname, doc, callback) {
	console.log("resetting file " + fname + " from mongodb");
	var retvalue = {
		requestedfilename: fname,
		error: false,
		errormsg: "",
		rows: []
	};

	// Connect to the db
	//MongoClient.connect(mongourl, function(err, db) {
	connect(function (err, db) {

		var collection = db.collection('tkdr');


		if (err) {
			console.log("error connecting to mongo");
			retvalue.error = true;
			retvalue.errormsg = err.message;
			callback(retvalue);
			return console.dir(retvalue);
		}
		collection.update({ filename: fname }, { $set: { "filecontent": doc } });
		console.log("resetted file " + fname + " on mongodb");
		callback();

	});




}

function getallfiles(callback) {
	colog("getting all files combo from mongo")
	connect(function (err, db) {

		var collection = db.collection('tkdr');
		//collection.find({ filename: { $not: /chat*/   }}).toArray(function(err, items) {
		collection.find({ $and: [{ filename: { $not: /chat*/ } }, { filename: { $not: /tkdt*/ } }] }).toArray(function (err, items) {
			//console.log(items);
			callback(items);

		});
	});


}

function getfile(fname, callback) {
	colog("getting file " + fname + " from mongodb");
	var retvalue = {
		requestedfilename: fname,
		error: false,
		errormsg: "",
		rows: []
	};

	// Connect to the db
	//MongoClient.connect(mongourl, function(err, db) {
	connect(function (err, db) {

		if (err) {
			console.log("error connecting to mongo");
			retvalue.error = true;
			retvalue.errormsg = err.message;
			callback(retvalue);
			return console.dir(retvalue);
		}
		//console.log("connected to mongodb");
		var collection = db.collection('tkdr');
		collection.find({ filename: fname }).toArray(function (err, items) {

			if (!err) {
				//console.log("items: "+JSON.stringify(items))
				if (items.length > 0) {
					retvalue.id = items[0]._id;
					if (items[0].filecontent.rows) {
						retvalue.rows = items[0].filecontent.rows;
					} else retvalue.rows = [];

				} else {
					retvalue.error = true;
					retvalue.errormsg = "mongo getfile: Filename " + fname + " not found in mongodb collection";
				}



			} else {
				console.log("error finding record with fname=" + fname);
				retvalue.error = true;
				retvalue.errmsg = err.message;
				retvalue.errormessage = err.message;
				//callback(retvalue);
				//console.return(retvalue);
			}


			//console.log("mongo getfile returning: "+JSON.stringify(retvalue));
			if (callback) callback(retvalue);



		});



	});




}

function loadDataFiles(callback) {
	var fs = require("fs"),
		path = require("path");

	var p = "data/"
	var htm = "<ul>";
	fs.readdir(p, function (err, files) {
		if (err) {
			throw err;
		}

		files.map(function (file) {
			return path.join(p, file);
		}).filter(function (file) {
			return fs.statSync(file).isFile();
		}).forEach(function (file) {
			if (path.extname(file) == ".json") {
				var fname = file.replace("data\\", "")
				htm += "<li>" + fname + "</li>";
				console.log("%s (%s)", fname, path.extname(file));
				createRecordFromFile(fname, function (data) {
					htm += "<li>" + JSON.stringify(data) + "</li>"

				})
			}


		});
		htm += "</ul>";
		callback(htm);
	});


}


function updateRecords(fname, records, callback) {
	var retdoc = {};
	var upddocs = [];
	//MongoClient.connect(mongourl, function(err, db) {
	connect(function (err, db) {
		if (err) {
			callback(err);
			return console.dir(err);
		}

		var collection = db.collection("tkdr");
		var cursor = collection.find({ "filename": fname });
		cursor.each(function (err, doc) {
			//assert.equal(err, null);
			if (doc != null) {
				colog("updating object: ")
				//console.log(obj);
				var data = doc.filecontent;

				for (var i = 0; i < data.rows.length; i++) {

					var did = data.rows[i].doc.id;

					records.forEach(function (item, idx) {
						var id = item.id;
						var obj = {
							doc: item
						}
						if (did == id) {

							console.log("found " + did + "=" + id + " !!!");

							for (var prop in obj.doc) {
								//console.log("obj." + prop + " = " + obj.doc[prop]);
								data.rows[i].doc[prop] = obj.doc[prop];
							}

							upddocs.push(data.rows[i].doc)

							//retdoc = data.rows[i].doc;
						}


					})
					//var fid = doc._id


				}

				var fid = doc._id;
				collection.update({ _id: fid }, { $set: { "filecontent": data } }, function () {

					//console.log("collection update complete, sending callback");
					callback(upddocs);
					//return;


				});


			}

		});
	});




}

function updateRecord(fname, id, obj, callback) {

	var retdoc = {};
	//MongoClient.connect(mongourl, function(err, db) {
	connect(function (err, db) {
		if (err) {
			callback(err);
			return console.dir(err);
		}

		var collection = db.collection("tkdr");
		var cursor = collection.find({ "filename": fname });
		cursor.each(function (err, doc) {
			//assert.equal(err, null);
			if (doc != null) {
				colog("updating object: ")
				//console.log(obj);
				var data = doc.filecontent;

				for (var i = 0; i < data.rows.length; i++) {

					var did = data.rows[i].doc.id;
					var fid = doc._id

					if (did == id) {

						//console.log("found "+did+"="+id+" !!!");

						for (var prop in obj.doc) {
							//console.log("obj." + prop + " = " + obj.doc[prop]);
							data.rows[i].doc[prop] = obj.doc[prop];
						}

						retdoc = data.rows[i].doc;



						//data.rows[i]=obj
						collection.update({ _id: fid }, { $set: { "filecontent": data } }, function () {

							//console.log("collection update complete, sending callback");
							callback(retdoc);
							//return;


						});
						return;

					}


				}
			} else {
				//callback();
			}
		});



		// collection.find( { filename: fname })
		// collection.update({ filename: fname },{$set: {"filecontent":data}});
	});
}


function updateAll(fname, obj, callback) {

	//MongoClient.connect(mongourl, function(err, db) {
	connect(function (err, db) {
		if (err) {
			callback(err);
			return console.dir(err);
		}

		var collection = db.collection("tkdr");
		var cursor = collection.find({ "filename": fname });
		cursor.each(function (err, doc) {
			//assert.equal(err, null);
			if (doc != null) {
				colog("updating object: ")
				colog(obj);
				var data = doc.filecontent;
				var fid = doc._id
				colog("data rows: " + data.rows.length)
				for (var i = 0; i < data.rows.length; i++) {

					var did = data.rows[i].doc.id;
					//console.log(did)



					for (var prop in obj.doc) {
						// console.log("obj." + prop + " = " + obj.doc[prop]);
						data.rows[i].doc[prop] = obj.doc[prop];
					}



					//data.rows[i]=obj





				}
				collection.update({ _id: fid }, { $set: { "filecontent": data } }, function () {

					callback("done");


				});
			} else {
				//callback();
			}
		});



		// collection.find( { filename: fname })
		// collection.update({ filename: fname },{$set: {"filecontent":data}});
	});
}



function addRecord(fname, id, obj, callback) {
	connect(function (err, db) {
		//MongoClient.connect(mongourl, function(err, db) {
		if (err) {
			callback(err);
			return console.dir(err);
		}

		var collection = db.collection("tkdr");
		console.log("mongo addrecord to " + fname);
		var cursor = collection.find({ "filename": fname });
		//console.log("cursor: ",cursor);
		cursor.each(function (err, doc) {
			if (err) {
				console.log("mongo addrecord error", err)
				callback(err);
			}
			//assert.equal(err, null);
			if (doc != null) {
				//console.dir(doc);
				//console.log(doc.filecontent);
				console.log("adding object to filename " + fname + ": ")
				//console.log(obj);
				var data = doc.filecontent;
				data.rows.push(obj);

				var fid = doc._id;
				collection.update({ _id: fid }, { $set: { "filecontent": data } }, function () {

					if (obj.doc) {
						obj.doc.action = "added";
					} else obj.action = "added";

					callback(obj);

				});

				if (fname.toLowerCase().trim() == "gare.json") {  //add cronaca and matches if gare


					var fc = {
						rows: []
					}

					var fn = "matches_" + id + ".json";
					collection.insert({ "filename": fn, "filecontent": fc });
					fn = "cronaca_" + id + ".json";
					collection.insert({ "filename": fn, "filecontent": fc });
				}





			}
		});

		//callback("done");

		// collection.find( { filename: fname })
		// collection.update({ filename: fname },{$set: {"filecontent":data}});
	});
	//callback("error, cursor for file "+fname+" not found");
}



function addRecords(fname, id, objs, callback) {
	connect(function (err, db) {
		//MongoClient.connect(mongourl, function(err, db) {
		if (err) {
			callback(err);
			return console.dir(err);
		}

		var collection = db.collection("tkdr");
		var cursor = collection.find({ "filename": fname });
		cursor.each(function (err, doc) {
			//assert.equal(err, null);
			if (doc != null) {
				//console.dir(doc);
				//console.log(doc.filecontent);
				console.log("adding object to filename " + fname + ": ")
				console.log(obj);
				var data = doc.filecontent;

				for (var i = 0; i < objs.length; i++) {
					var obj = objs[i];
					data.rows.push(obj);
				}

				var fid = doc._id;
				collection.update({ _id: fid }, { $set: { "filecontent": data } }, function () {
					obj.doc.action = "added";
					callback(obj);

				});







			}
		});

		//callback("done");

		// collection.find( { filename: fname })
		// collection.update({ filename: fname },{$set: {"filecontent":data}});
	});
}





function deleteRecord(fname, id, callback) {
	connect(function (err, db) {
		//MongoClient.connect(mongourl, function(err, db) {
		if (err) {
			callback(err);
			return console.dir(err);
		}

		var collection = db.collection("tkdr");
		var cursor = collection.find({ "filename": fname });
		cursor.each(function (err, doc) {
			//assert.equal(err, null);
			if (doc != null) {
				console.log("deleting object id " + id + " from filename " + fname);

				var data = doc.filecontent;
				for (var i = 0; i < data.rows.length; i++) {

					var did = data.rows[i].doc.id;
					var fid = doc._id
					if (did == id) {


						data.rows.splice(i, 1);
						//data.rows[i]=obj
						collection.update({ _id: fid }, { $set: { "filecontent": data } }, function () {

							callback({ error: false, message: "deleted id " + id + " from file " + fname + " on mongodb" });

						});


						if (fname.toLowerCase().trim() == "gare.json") {  //delete cronaca and matches if gare


							var fc = {
								rows: []
							}

							var fn = "matches_" + id + ".json";
							collection.remove({ "filename": fn });
							fn = "cronaca_" + id + ".json";
							collection.remove({ "filename": fn });
						}





					}


				}
			}
		});

		// callback("done");

		// collection.find( { filename: fname })
		// collection.update({ filename: fname },{$set: {"filecontent":data}});
	});
}



function findRecords(filename, filter, callback) {
	var ret = {
		rows: []
	}
	connect(function (err, db) {
		//MongoClient.connect(mongourl, function(err, db) {
		if (err) {
			callback(err);
			return console.dir(err);
		}

		var filefilt = {
			filename: filename

		}
		var collection = db.collection('tkdr');
		collection.find(filefilt).toArray(function (err, items) {

			//console.log("found "+items.length+" items");

			if (items.length > 0) {

				//console.log(items[0])

				var fc = items[0].filecontent;

				for (var i = 0; i < fc.rows.length; i++) {

					var rowdoc = fc.rows[i].doc;

					var eligible = true;
					for (x in filter) {

						if (rowdoc.hasOwnProperty(x)) {



							if (rowdoc[x].toLowerCase().indexOf(filter[x].toLowerCase()) == -1) eligible = eligible && false;

						}

					}

					if (eligible) ret.rows.push(fc.rows[i])


				}
			}
			console.log("found " + ret.rows.length + " elements with the following parms", filter)
			callback(ret);

		});
	});

}

function updatefile(fname, rows, callback) {
	var retvalue = {
		error: false,
		errormsg: ""
	}
	var newdata = {
		"rows": rows
	}

	connect(function (err, db) {
		//MongoClient.connect(mongourl, function(err, db) {
		if (err) {
			retvalue.error = true;
			retvalue.errormsg = err.message;
			callback(retvalue);
			return console.dir(retvalue);
		}

		var collection = db.collection('tkdr');
		getfile(fname, function (gdata) {
			//console.log("gdata")
			//console.log(gdata);

			if (gdata.error == false) {
				console.log("file " + fname + " exists on mongodb");
				console.log(gdata.id);
				collection.update({ _id: gdata.id }, { $set: { "filecontent": newdata } });
				retvalue.errormsg = "file " + fname + " already exists on mongo, it has been updated";
			} else {


				collection.insert({ "filename": fname, "filecontent": newdata });
				retvalue.errormsg = "file " + fname + " not existing, created on mongo";
				console.log(retvalue.errormsg);
			}
			if (callback) callback(retvalue);

		});
	});

}


function checkCreateFile(fname, callback) {
	var retvalue = {
		error: false,
		errormsg: ""
	}
	var newdata = {
		"rows": []
	}

	connect(function (err, db) {
		//MongoClient.connect(mongourl, function(err, db) {
		if (err) {
			retvalue.error = true;
			retvalue.errormsg = err.message;
			callback(retvalue);
			return console.dir(retvalue);
		}

		var collection = db.collection('tkdr');
		getfile(fname, function (gdata) {
			//console.log("gdata")
			//console.log(gdata);

			if (gdata.error == false) {
				console.log("file " + fname + " exists on mongodb");
				console.log(gdata.id);
				//collection.update({ _id: gdata.id },{$set: {"filecontent":data}});
				retvalue.errormsg = "file " + fname + " already exists on mongo";
			} else {


				collection.insert({ "filename": fname, "filecontent": newdata });
				retvalue.errormsg = "file " + fname + " not existing, created on mongo";
				console.log(retvalue.errormsg);
			}
			if (callback) callback(retvalue);

		});
	});

}

function deletefile(fname, callback) {
	var retvalue = {
		error: false,
		errormsg: ""
	}


	connect(function (err, db) {
		//MongoClient.connect(mongourl, function(err, db) {
		if (err) {
			retvalue.error = true;
			retvalue.errormsg = err.message;
			callback(retvalue);
			return console.dir(retvalue);
		}

		var collection = db.collection('tkdr');



		collection.remove({ "filename": fname }, true);
		retvalue.errormsg = "file " + fname + " deleted from mongo";
		console.log(retvalue.errormsg);

		if (callback) callback(retvalue);


	});



}

function createfile(fname, rows, callback) {

	var retvalue = {
		error: false,
		errormsg: ""
	}
	var newdata = {
		"rows": rows
	}

	connect(function (err, db) {
		//MongoClient.connect(mongourl, function(err, db) {
		if (err) {
			retvalue.error = true;
			retvalue.errormsg = err.message;
			callback(retvalue);
			return console.dir(retvalue);
		}

		var collection = db.collection('tkdr');



		collection.insert({ "filename": fname, "filecontent": newdata });
		retvalue.errormsg = "file " + fname + " not existing, created on mongo";
		console.log(retvalue.errormsg);

		if (callback) callback(retvalue);


	});


}

function createRecordFromFile(fname, callback) {
	var retvalue = {
		error: false,
		errormsg: ""
	}
	connect(function (err, db) {
		//MongoClient.connect(mongourl, function(err, db) {
		if (err) {
			retvalue.error = true;
			retvalue.errormsg = err.message;
			callback(retvalue);
			return console.dir(retvalue);
		}

		fs.readFile("data/" + fname, "utf-8", function (err, data) {
			if (err) {
				retvalue.error = true;
				retvalue.errormsg = err.message;
				callback(retvalue);
				return console.dir(retvalue);
			}
			var collection = db.collection('tkdr');

			getfile(fname, function (gdata) {

				//console.log(gdata);
				data = JSON.parse(data);
				//console.log(data)
				if (gdata.error == false) {
					console.log("file " + fname + " exists on mongodb, will update");
					console.log(gdata.id);
					collection.update({ _id: gdata.id }, { $set: { "filecontent": data } });

				} else {

					collection.insert({ "filename": fname, "filecontent": data });
				}
				if (callback) callback(retvalue);
			})




		});




	});


}


function connect(done) {
	if (state.db) return done(null, state.db)

	MongoClient.connect(mongourl, function (err, db) {
		if (err) {
			console.log("error connecting to mongodb")
			return done(err, null)
		}
		console.log("connected to mongodb !!")
		state.db = db
		done(null, db);
	})
}

function get() {
	return state.db
}

function close(done) {
	if (state.db) {
		state.db.close(function (err, result) {
			state.db = null
			state.mode = null
			done(err)
		})
	}
}




exports.listfiles = listfiles;
exports.createfile = createfile;
exports.updatefile = updatefile;
exports.deletefile = deletefile;
exports.archivefile = archivefile;
exports.getfile = getfile;
exports.getallfiles = getallfiles;
exports.resetfile = resetfile;
exports.checkCreateFile = checkCreateFile;
exports.createRecordFromFile = createRecordFromFile;
exports.addRecord = addRecord;
exports.addRecords = addRecords;
exports.updateRecord = updateRecord;
exports.updateRecords = updateRecords;
exports.updateAll = updateAll;
exports.deleteRecord = deleteRecord;
exports.findRecords = findRecords;
exports.connect = connect;
exports.get = get;
exports.close = close;
exports.loadDataFiles = loadDataFiles;
exports.prova = prova;

