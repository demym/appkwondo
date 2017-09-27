var express = require('express');
var router = express.Router();
var request = require('request');

var fs = require('fs');
var xml2js = require('xml2js');
var mongo = require('../routes/mongo');	
var usemongo=true;
var usealtervista=false;
var altervistaurl="http://demym.altervista.org/";
var altervistadataurl="http://demym.altervista.org/herokudata/";

	
var societa;	
	
var parser = new xml2js.Parser();
var fname="societa.xml";
var jfname="societa.json";
//var altervistaurl="http://localhost:90/tkdr";



//var atleti = loadJSONfile(__dirname + '/atleti.json');
//console.log(atleti.length);


function readSocietaMongo(callback){
	mongo.getfile(jfname,function(data){
		//console.log(data.rows.length);
		societa=data;
		console.log("read societa from mongo "+jfname+" :   "+societa.rows.length);
        callback(); 
		
	})
	
	
}


function readSocietaJson(callback) {
	if (usemongo){
	readSocietaMongo(callback);
	} else if (usealtervista){
	 /*readAtletiAltervista(callback);*/
	} else {
	//console.log("readGareJson")
	var fname="data/societa.json";
	fs.readFile(fname, "utf-8",function(err, data) {
    //console.log("Read file "+fname);
	societa=JSON.parse(data);
   //atleti=xmlToJson(data);
   //console.log(atleti);
   //atleti =  JSON.parse(data, 'utf8');
   //console.log('Read file atleti.json: '+atleti.length);
   console.log("read societa from file "+fname+" :   "+societa.rows.length);
   callback(); 
   //console.log(data);
	});
	}

	
	
	
}


function readSocieta(callback)
{
	console.log("readSocieta")
	
	
	readSocietaJson(function(){
	 findAll(function(obj) {
		//console.log("###### users ( /getAllAssets route ) -->  " + JSON.stringify(obj));
		if (callback) {
		  callback(obj);	
		  return;	
		}
			
 
		
	 });	
	});
	
 return;

}

router.get("/prova",function(req,res){
	 //saveToAltervista();
	 res.send("ok");
	
})

//readAtleti(function() {});

router.get('/findall', function(req, res) {
	console.log("called societa findall");
	readSocieta(function(){
		findAll(function(obj) {
		//console.log("###### users ( /getAllAssets route ) -->  " + JSON.stringify(obj));
		res.send(obj);
	   });
		
	});
	
});

router.get('/findbyname/:nome', function(req, res)  {
	console.log("called atleti findByName");
	var nome=req.params.nome;
	//res.send(risp);
	findByName(nome,function(obj) {
		res.send(obj);
	});
	

});

router.get('/findById/:id', function(req, res)  {
	console.log("called societa findById");
	var id=req.params.id;
	//res.send(risp);
	findById(id,function(obj) {
		console.log("got data "+JSON.stringify(obj));
		res.send(obj);
	});
	

});


router.post('/add', function(req, res) {
	var body=req.body;
	var row={};
	row.doc=body;
	
	var today = new Date();
	var id=today.julian();
	console.log("adding new societa id: "+id);
	row.doc.id=id;
	
	if (usemongo){
	mongo.addRecord("societa.json",id,row,function(data){
		
		row.doc.action="added";
		console.log("added societa ");
		res.send(row);
		
	})
	}
	
	return;

	
});



router.post('/update/:id', function(req, res) {
	var body=req.body;
	console.log(body)
	var id=req.params.id;
	var row={};
	row.doc=body;
	
	if (usemongo){
		  mongo.updateRecord("societa.json",id,row,function(data){
			  console.log("societa updated");
			  //ressent=true;
			  row.doc.action="updated";
			  res.send(row);
		
		  })
		  
	  }
	
	return;
	
});


router.post('/delete', function(req, res) {
	var body=req.body;
	var id=body.id;
	var rev=body.id;
	
	
	if (usemongo){
		  mongo.deleteRecord("societa.json",id,function(data){
			  console.log("deleted");
			  //ressent=true;
			  res.send(data);
		
		  })
		  
	  }
	  
	return;
	
});


function findByName(nome,callback)  {
 
    console.log('findbyname societa: ' + nome);
   mongo.getfile("societa.json",function(societa){	
	//console.log(JSON.stringify(atleti));
	console.log("societa totali: "+societa.rows.length);
	var found=false;
	var data={
		 "rows": []
	  } 
	if (nome)
	{
	for (var i=0; i<societa.rows.length; i++)
    {
	 var doc=societa.rows[i].doc;	
	 //console.log(id+" - "+doc.id)
	 nome=nome.toLowerCase();
	 var docnome=doc.nome.toLowerCase();
	 if (docnome.indexOf(nome)>-1)
	 {
	  var docu={
		  "doc": doc
	  };	  
	  data.rows.push(docu);
	  //callback(data);
	  found=true;
	  //return;
	 }		 
		
	}	
	
	//callback(data);
	//return;
	} /*
	data.error=true;
	data.errormessage="nome not specified";*/
	callback(data)
	return;
	})
	
};


function findById(id,callback) {
    //var id = req.params.id;
	
    console.log('findById societa: ' + id);
   mongo.getfile("societa.json",function(societa){	
	//console.log(JSON.stringify(atleti));
	console.log("societa totali: "+societa.rows.length);
	var found=false;
	var data={
		 "rows": []
	  } 
	if (id)
	{
	for (var i=0; i<societa.rows.length; i++)
    {
	 var doc=societa.rows[i].doc;	
	 //console.log(id+" - "+doc.id)
	 if (id==doc.id)
	 {
	  var docu={
		  "doc": doc
	  };	  
	  data.rows.push(docu);
	  callback(data);
	  found=true;
	  return;
	 }		 
		
	}	
	 if (!found) {
		 data.error=true;
		 data.errormessage="id "+id+" not found";
		 callback(data)
		 return;
	 }
	}
	data.error=true;
	data.errormessage="id not specified";
	callback(data)
	return;
	})
	
};




function findAll(callback) {
    console.log('societa findAll');
    
	/*atleti.sort(function(a,b) {
		    var a1=a.cognome[0];
			//console.log(a1);
			var b1=b.cognome[0];
			if (a1>b1) return 1;
			if (a1<b1) return -1;
			return 0;
		});
		*/
		//console.log(JSON.stringify(atleti))
		
		//var data=xform(atleti);
		var data=societa;
		
		data.rows.sort(function(a,b){
			
			var a1=a.doc.nome;
			var b1=b.doc.nome;
			if (a1>b1) return 1;
			if (a1<b1) return -1;
			return 0;
		})
		
	 	
		
		callback(data);
		//res.render('lv_atleti.ejs',{ posts: atleti});
   // res.send(atleti);
};

function loadJSONfile (filename, encoding) {
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
		for(var i = 0; i < xml.childNodes.length; i++) {
			var item = xml.childNodes.item(i);
			var nodeName = item.nodeName;
			if (typeof(obj[nodeName]) == "undefined") {
				obj[nodeName] = xmlToJson(item);
			} else {
				if (typeof(obj[nodeName].push) == "undefined") {
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


function renderHtm(res)
{
 var htm="<ul data-role='listview' />";
 var results = res.filter(function(element) {
   htm+="<li>"+element.nome+"</li>";
 });
 htm+="</ul>";
 return htm;
}


function xform(d)
{
 var data={
	 rows: []
 };

 for (var i=0; i<d.atleti.atleta.length; i++)
 {
  var doc={};
  var p=d.atleti.atleta[i];
  var element={}
  for (var key in p) {
  if (p.hasOwnProperty(key)) {
    //console.log("key: "+key+"   value: "+p[key]);
	element[key]=p[key][0];
  }
  }
  doc={ doc: element};  
  data.rows[i]=doc;	 
	 
 }	 
 
 return data; 
	
}



function saveToAltervista(finto,filename){
		var dat; // = require('../data/'+filename);
		
		fs.readFile('./data/'+filename, 'utf8', function (err, data) {
  if (err) throw err;
  console.log(data)
 dat = JSON.parse(data);

	console.log("savetoaltervista filename: "+filename);
	var headers = {
    'User-Agent':       'Super Agent/0.0.1',
    'Content-Type':     'application/jsonrequest'
}
 
// Configure the request
var options = {
    url: altervistaurl+'/savefile2.php',
    method: 'POST',
    headers: headers,
	dataType: "json",
    form: {'filename': filename, 'fdata': JSON.stringify(dat)}
}
 console.log(options.url)
// Start the request
request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        // Print out the response body
        console.log(body)
		console.log("file "+filename+" saved on altervista");
    }
	if (error){
		console.log(error);
	}
	
})
	});
	
}

function saveToAltervistaold(path,fname){
	var url=altervistaurl+"/savefile.php?url="+path+"&filename="+fname;
	
	console.log("saving to altervista at url: "+url);
	request.get(url, function (error, response, body) {
		 console.log(body);
		 
	});
	
	
	//new try

	
	
	
}

module.exports=router;