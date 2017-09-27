var express = require('express');
var router = express.Router();
var fs = require('fs');
var MongoClient = require('mongodb').MongoClient;


var mongourl="mongodb://demym:Ser07glr@ds045734.mongolab.com:45734/tkdr";


var state = {
  db: null
}


/*
connect(function(err){
	
	if (err) {
		
		console.log("Error connecting to mongodb: "+err.message);
	}
	
})*/




function resetfile(fname,doc,callback){
 console.log("resetting file "+fname+" from mongodb");	
 var retvalue={
		  requestedfilename: fname,
		  error: false,
		  errormsg: "",
		  rows: []
	}; 	

// Connect to the db
//MongoClient.connect(mongourl, function(err, db) {
connect(function(err,db) {	
  
 var collection = db.collection('tkdr');
  
  
  if(err) { 
    console.log("error connecting to mongo");
    retvalue.error=true;
    retvalue.errormsg=err.message;
	callback(retvalue);
    return console.dir(retvalue);
  }
  collection.update({ filename: fname },{$set: {"filecontent": doc}});
  console.log("resetted file "+fname+" on mongodb");
  callback();
  
});
	
	
	
	
}

function getallfiles(callback) {
	console.log("getting all files combo from mongo")
	connect(function(err,db) {	
	
	  var collection = db.collection('tkdr');
	  collection.find().toArray(function(err, items) {
		  //console.log(items);
		  callback(items);
		  
	  });
	});
	
	
}

function getfile(fname,callback){
 console.log("getting file "+fname+" from mongodb");	
 var retvalue={
		  requestedfilename: fname,
		  error: false,
		  errormsg: "",
		  rows: []
	}; 	

// Connect to the db
//MongoClient.connect(mongourl, function(err, db) {
connect(function(err,db) {	
  
  if(err) { 
    console.log("error connecting to mongo");
    retvalue.error=true;
    retvalue.errormsg=err.message;
	callback(retvalue);
    return console.dir(retvalue);
  }
  //console.log("connected to mongodb");
  var collection = db.collection('tkdr');
  collection.find({filename: fname}).toArray(function(err, items) {
	 
	  if (!err){
		  //console.log("items: "+JSON.stringify(items))
		  if (items.length>0){
			  retvalue.id=items[0]._id;
			  if (items[0].filecontent.rows){
			  retvalue.rows=items[0].filecontent.rows; 
			  } else retvalue.rows=[];
			  
		  } else {
			  retvalue.error=true;
			  retvalue.errormsg="Filename "+fname+" not found in mongodb collection";
		  }
		  
		  
		 
	  } else {
		  console.log("error finding record with fname="+fname);
		  retvalue.error=true;
		  retvalue.errmsg=err.message;
		  retvalue.errormessage=err.message;
		  //callback(retvalue);
		  //console.return(retvalue);
		  }
	  
	  
	  //console.log("mongo getfile returning: "+JSON.stringify(retvalue));
	  if (callback) callback(retvalue);
	  
	 
	  
  });
 
 

});
	
	
	
	
}

function loadDataFiles(callback){
	var fs = require("fs"),
    path = require("path");

var p = "data/"
var htm="<ul>";
fs.readdir(p, function (err, files) {
    if (err) {
        throw err;
    }

    files.map(function (file) {
        return path.join(p, file);
    }).filter(function (file) {
        return fs.statSync(file).isFile();
    }).forEach(function (file) {
		if (path.extname(file)==".json"){
	     var fname=file.replace("data\\","")	
		 htm+="<li>"+fname+"</li>";	
		 console.log("%s (%s)", fname, path.extname(file));	
		 createRecordFromFile(fname,function(data){
			 htm+="<li>"+JSON.stringify(data)+"</li>"
			 
		 })
		}
        
		
    });
	htm+="</ul>";
	callback(htm);
});
	
	
}


function updateRecord(fname,id,obj,callback){
	
	//MongoClient.connect(mongourl, function(err, db) {
	connect(function(err,db) {	
    if(err) { 
	 callback(err);
	 return console.dir(err);
     }
	 
   var collection=db.collection("tkdr");
   var cursor =collection.find( { "filename": fname } );
   cursor.each(function(err, doc) {
      //assert.equal(err, null);
      if (doc != null) {
         console.log("updating object: ")
		 //console.log(obj);
		 var data=doc.filecontent;
		 for (var i=0; i<data.rows.length; i++){
			 
			 var did=data.rows[i].doc.id;
			 var fid=doc._id
			 if (did==id){
				 
				 for (var prop in obj.doc) {
				  //console.log("obj." + prop + " = " + obj.doc[prop]);
				  data.rows[i].doc[prop]=obj.doc[prop];
				}

				 
				 
				 //data.rows[i]=obj
				 collection.update({ _id: fid },{$set: {"filecontent":data}},function(){
					  
					  callback("done");
					 
					 
				 });
				 
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


function updateAll(fname,obj,callback){
	
	//MongoClient.connect(mongourl, function(err, db) {
	connect(function(err,db) {	
    if(err) { 
	 callback(err);
	 return console.dir(err);
     }
	 
   var collection=db.collection("tkdr");
   var cursor =collection.find( { "filename": fname } );
   cursor.each(function(err, doc) {
      //assert.equal(err, null);
      if (doc != null) {
         console.log("updating object: ")
		 console.log(obj);
		 var data=doc.filecontent;
		 var fid=doc._id
		 console.log("data rows: "+data.rows.length)
		 for (var i=0; i<data.rows.length; i++){
			 
			 var did=data.rows[i].doc.id;
			 //console.log(did)
			 
			
				 
				for (var prop in obj.doc) {
				 // console.log("obj." + prop + " = " + obj.doc[prop]);
				  data.rows[i].doc[prop]=obj.doc[prop];
				}

				 
				 
				 //data.rows[i]=obj
				 
				 
			
			 
			 
		 }
		 collection.update({ _id: fid },{$set: {"filecontent":data}},function(){
					  
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



function addRecord(fname,id,obj,callback){
	connect(function(err,db) {	
	//MongoClient.connect(mongourl, function(err, db) {
    if(err) { 
	 callback(err);
	 return console.dir(err);
     }
	 
   var collection=db.collection("tkdr");
   console.log("mongo addrecord to "+fname);
   var cursor =collection.find( { "filename": fname } );
   //console.log("cursor: ",cursor);
   cursor.each(function(err, doc) {
	  if (err) {
		  console.log("mongo addrecord error",err)
		  callback(err);
	  } 
      //assert.equal(err, null);
      if (doc != null) {
         //console.dir(doc);
		 //console.log(doc.filecontent);
		 console.log("adding object to filename "+fname+": ")
		 console.log(obj);
		 var data=doc.filecontent;
		 data.rows.push(obj);
		 
		 var fid=doc._id;
		 collection.update({ _id: fid },{$set: {"filecontent":data}},function(){
			 
			if (obj.doc) {
			obj.doc.action="added";  
		 } else obj.action="added";
		 
		 callback(obj);
			 
		 });
		 
		 if (fname.toLowerCase().trim()=="gare.json") {  //add cronaca and matches if gare
			 
			 
			 var fc={
				 rows:[]
			 }
			 
			 var fn="matches_"+id+".json";
			 collection.insert({ "filename": fn, "filecontent": fc});
			 fn="cronaca_"+id+".json";
			 collection.insert({ "filename": fn, "filecontent": fc});
		 }
		 
		
		 
		 
		 
      }
   });

	 //callback("done");
	 
	// collection.find( { filename: fname })
	// collection.update({ filename: fname },{$set: {"filecontent":data}});
	});
	//callback("error, cursor for file "+fname+" not found");
}



function addRecords(fname,id,objs,callback){
	connect(function(err,db) {	
	//MongoClient.connect(mongourl, function(err, db) {
    if(err) { 
	 callback(err);
	 return console.dir(err);
     }
	 
   var collection=db.collection("tkdr");
   var cursor =collection.find( { "filename": fname } );
   cursor.each(function(err, doc) {
      //assert.equal(err, null);
      if (doc != null) {
         //console.dir(doc);
		 //console.log(doc.filecontent);
		 console.log("adding object to filename "+fname+": ")
		 console.log(obj);
		 var data=doc.filecontent;
		 
		 for (var i=0; i<objs.length; i++) {
			 var obj=objs[i]; 
		     data.rows.push(obj);
		 }
		 
		 var fid=doc._id;
		 collection.update({ _id: fid },{$set: {"filecontent":data}},function(){
			 	 obj.doc.action="added";
		    callback(obj);
			 
		 });
		 
		 
		 
	
		 
		 
		 
      }
   });

	 //callback("done");
	 
	// collection.find( { filename: fname })
	// collection.update({ filename: fname },{$set: {"filecontent":data}});
	});
}





function deleteRecord(fname,id,callback){
	connect(function(err,db) {	
	//MongoClient.connect(mongourl, function(err, db) {
    if(err) { 
	 callback(err);
	 return console.dir(err);
     }
	 
   var collection=db.collection("tkdr");
   var cursor =collection.find( { "filename": fname } );
   cursor.each(function(err, doc) {
      //assert.equal(err, null);
      if (doc != null) {
         console.log("deleting object id "+id+" from filename "+fname);
		 
		 var data=doc.filecontent;
		 for (var i=0; i<data.rows.length; i++){
			 
			 var did=data.rows[i].doc.id;
			 var fid=doc._id
			 if (did==id){
				 
				 
				 data.rows.splice(i, 1);
				 //data.rows[i]=obj
				 collection.update({ _id: fid },{$set: {"filecontent":data}},function(){
					 
					 callback({error: false,message: "deleted id "+id+" from file "+fname+" on mongodb"});
					 
				 });
				 
			
			if (fname.toLowerCase().trim()=="gare.json") {  //delete cronaca and matches if gare
			 
			 
			 var fc={
				 rows:[]
			 }
			 
			 var fn="matches_"+id+".json";
			 collection.remove({ "filename": fn});
			 fn="cronaca_"+id+".json";
			 collection.remove({ "filename": fn});
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



function findRecords(filename,filter,callback){
	var ret={
		rows:[]
	}
	connect(function(err,db) {	
	//MongoClient.connect(mongourl, function(err, db) {
    if(err) { 
	 callback(err);
	 return console.dir(err);
     }
	
	var filefilt={
		filename: filename
		
	}
	var collection = db.collection('tkdr');
    collection.find(filefilt).toArray(function(err, items) {
		
		//console.log("found "+items.length+" items");
		
		if (items.length>0){
		
		//console.log(items[0])
		
		var fc=items[0].filecontent; 	
		
		for (var i=0; i<fc.rows.length; i++){
			
			var rowdoc=fc.rows[i].doc;
			
			var eligible=true;
			for (x in filter){
				
				if (rowdoc.hasOwnProperty(x)){
					
					
					
					if (rowdoc[x].toLowerCase().indexOf(filter[x].toLowerCase())==-1)  eligible=eligible && false; 
					
				}
				
			}
			
			if (eligible) ret.rows.push(fc.rows[i])
			
			
		}
		}
		console.log("found "+ret.rows.length+" elements with the following parms",filter)
		callback(ret);
		
	});
	});
	
}


function checkCreateFile(fname,callback) {
	var retvalue={
		error: false,
		errormsg: ""
	}
	var newdata={
			"rows":[]
		}
	
	connect(function(err,db) {	
	//MongoClient.connect(mongourl, function(err, db) {
    if(err) { 
	 retvalue.error=true;
	 retvalue.errormsg=err.message;
	 callback(retvalue);
	 return console.dir(retvalue);
     }
	 
	 var collection = db.collection('tkdr');
	 getfile(fname,function(gdata) {
		 console.log("gdata")
		 console.log(gdata);
		 
	 if (gdata.error==false){
				console.log("file "+fname+" exists on mongodb");
				console.log(gdata.id);
				//collection.update({ _id: gdata.id },{$set: {"filecontent":data}});
                retvalue.errormsg="file "+fname+" already exists on mongo";
			} else {
				
			  	
			  collection.insert({ "filename": fname, "filecontent": newdata});
			  retvalue.errormsg="file "+fname+" not existing, created on mongo";
			  console.log(retvalue.errormsg);
			}
			if (callback) callback(retvalue); 
	
	 });
	});
	
}


function createRecordFromFile(fname,callback){
	var retvalue={
		error: false,
		errormsg: ""
	}
	connect(function(err,db) {	
	//MongoClient.connect(mongourl, function(err, db) {
    if(err) { 
	 retvalue.error=true;
	 retvalue.errormsg=err.message;
	 callback(retvalue);
	 return console.dir(retvalue);
     }
	
	 fs.readFile("data/"+fname, "utf-8",function(err, data) {
		 if(err) { 
		    retvalue.error=true;
			retvalue.errormsg=err.message;
			callback(retvalue);
			return console.dir(retvalue);
		 }
		 var collection = db.collection('tkdr');
		 
		 getfile(fname,function(gdata) {
			 
			//console.log(gdata);
			data=JSON.parse(data);
			//console.log(data)
			if (gdata.error==false){
				console.log("file "+fname+" exists on mongodb, will update");
				console.log(gdata.id);
				collection.update({ _id: gdata.id },{$set: {"filecontent":data}});
 
			} else {
				
			  collection.insert({ "filename": fname, "filecontent": data});
			}
			if (callback) callback(retvalue); 
		 })
		 
		
		 
			 
	 });
	
    
  
  
	});
	
	
}


function connect(done) {
  if (state.db) return done(null,state.db)

  MongoClient.connect(mongourl, function(err, db) {
    if (err) { 
	  console.log("error connecting to mongodb")
	  return done(err,null)
	}
	console.log("connected to mongodb !!")
    state.db = db
    done(null,db);
  })
}

function get() {
  return state.db
}

function close(done) {
  if (state.db) {
    state.db.close(function(err, result) {
      state.db = null
      state.mode = null
      done(err)
    })
  }
}




  
exports.getfile=getfile;
exports.getallfiles=getallfiles;
exports.resetfile=resetfile;
exports.checkCreateFile=checkCreateFile;
exports.createRecordFromFile=createRecordFromFile;
exports.addRecord=addRecord;
exports.addRecords=addRecords;
exports.updateRecord=updateRecord;
exports.updateAll=updateAll;
exports.deleteRecord=deleteRecord;
exports.findRecords=findRecords;
exports.connect=connect;
exports.get=get;
exports.close=close;
exports.loadDataFiles=loadDataFiles;

