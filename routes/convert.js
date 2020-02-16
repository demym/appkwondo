var express = require('express');
var router = express.Router();
var gcm = require('node-gcm');
var message = new gcm.Message();
var utils = require("../routes/utils");
var alterbridge=true;

var fs = require('fs'),
    xml2js = require('xml2js');

	
var matches;	

	
var parser = new xml2js.Parser();


function readFileJson(f,callback) {
	
	
	
	var fname=f;
	if (f.indexOf(".json")==-1) fname+=".json";
	
	console.log("readFileJson file "+fname);
	fs.readFile(fname, "utf-8",function(err, data) {
		
	if (err){
		var data={};
		data.msg="Error "+err.message;
		data.rows=[];
		callback(data);
		return;
		
		
	}	
	data=data.trim();
    console.log("Read file "+fname);
	var json={};
	if (!data) {
		data={rows:[]}
		json=data;
	} else json=JSON.parse(data);
   //atleti=xmlToJson(data);
   //console.log(atleti);
   //atleti =  JSON.parse(data, 'utf8');
   //console.log('Read file atleti.json: '+atleti.length);
  // console.log("read from file "+fname+" :   "+JSON.stringify(matches));
   callback(json); 
   //console.log(data);
	});

	
	
	
}



router.get("/xml/:fname/:root/:tag",function(req,res){
	
	var fname=req.params.fname;
	var root=req.params.root;
	var tag=req.params.tag;
	
	var xml="";
	
	readFileJson(fname,function(data) {
		
		xml+="<"+root+">\n";
		
		for (var i=0; i<data.rows.length; i++){
			xml+="<"+tag+">\n";
			var row=data.rows[i].doc;
			
			for (var key in row) {
               xml+="<"+key+">"+row[key]+"</"+key+">\n";
            }
			
			xml+="</"+tag+">\n";

			
			
			
			
		}
		xml+="</"+root+">";
		res.send("<textarea>"+xml+"</textarea>");
		
		
	})
	
	
})




router.get('/', function(req, res) {
	console.log("called matches findall");
	console.log(generateId());
	findAll(function(obj) {
		//console.log("###### users ( /getAllAssets route ) -->  " + JSON.stringify(obj));
		res.send(obj);
	});
});

router.get("/notify",function(req,res){
	notify();
	res.send({"error":false,"msg":"push notification sent"});
	
	
})

router.post("/notify",function(req,res){
	var obj=req.body;
	notify(obj);
	res.send({"error":false,"msg":"push notification sent"});
	
	
})

function notify(obj) {
 
 if (!obj) {
	 obj={};
	 obj.message="\u270C Peace, Love \u2764 and AppKwonDo \u2706!";
	 obj.title="AppKwonDo";
	 obj.msgcnt="3";
	 obj.soundname="beep.wav";
 }
 
	console.log("notifying GCM")
	var sender = new gcm.Sender('AIzaSyBDU5stA6tX1IWaKJjGgC976dViNq4uk0Y');
var registrationIds = [];
 
// Value the payload data to send...
message.addData('message',obj.message);
message.addData('title',obj.title);
message.addData('msgcnt',obj.msgcnt); // Shows up in the notification in the status bar
message.addData('soundname',obj.soundname); //Sound to play upon notification receipt - put in the www folder in app
//message.collapseKey = 'demo';
//message.delayWhileIdle = true; //Default is false
message.timeToLive = 3000;// Duration in seconds to hold in GCM and retry before timing out. Default 4 weeks (2,419,200 seconds) if not specified.
 
// At least one reg id required
registrationIds.push('APA91bEOWx9ORkjLLAa_FghfteU_f9-9GlgRnHYOffQbOVZErrwLbEoKcPxvHi4uOlYaiodDZpzEUEb9ra6QEmJ7BR4MJlpWL_V1YYrTjTR1qvGjNsVCmiCKp2Qo4BIKiRaQpRm8rE9NZwVeiIGlOU-rY_URq7i0fw');
 
/**
 * Parameters: message-literal, registrationIds-array, No. of retries, callback-function
 */
sender.send(message, registrationIds, 4, function (result) {
    console.log("notify send result: "+result);
});
	
}



router.get('/findall', function(req, res) {
	console.log("called matches findall");
	findAll(function(obj) {
		//console.log("###### users ( /getAllAssets route ) -->  " + JSON.stringify(obj));
		res.send(obj);
	});
});


router.get('/findByName/:nome', function(req, res)  {
	console.log("called matches findByName");
	var nome=req.params.nome;
	//res.send(risp);
	findByName(nome,function(obj) {
		res.send(obj);
	});
	

});


router.post('/addcronaca/:garaid',function(req,res) {
	  var id=req.params.garaid;
	 var fname="cronaca_"+id+".txt";
	 var jfname="cronaca_"+id+".json";
	 var dat={
		 rows: []
	 }
	 if (!fs.existsSync(jfname)) {   //file cronaca_garaid.json exists
	   
	 
	 } else {
		 
    // Do something
	   console.log(jfname+" file exists");
	   dat = require('../'+jfname);
	  
	   
    }
	 var date=new Date();
	dat.rows.push({ "time": date.juliandateshort(), "text": req.body.text });
	fs.writeFile(jfname, JSON.stringify(dat), function (err) {
					if (err) return console.log(err);
				  console.log("File "+jfname+" saved on server");
				  var dat = require('../'+jfname);
				  console.log(dat.rows.length);
				});
	res.send({"error":"false","msg":"cronaca added "+req.body.text});
})

router.get('/getcronaca/:garaid',function(req,res){
	 var id=req.params.garaid;
	 var fname="cronaca_"+id+".txt";
	 var jfname="cronaca_"+id+".json";
	 var cronaca={
		 rows:[]
	 };
	 if (fs.existsSync(jfname)) {   //file cronaca_garaid.json exists
    // Do something
	   console.log(jfname+" file exists");
	   var dat = require('../'+jfname);
	   console.log(dat.rows.length);
	   dat.rows.sort(function(a,b){
					var a1=a.time;
					var b1=b.time;
					if (a1<b1) return 1;
					if (a1>b1) return -1;
					return 0;
					
				})
	   dat.msg="read locally"			
	   res.send(dat);
	   return;
    } else
	{
	 if (!fs.existsSync(jfname)) {	//if not existing check for .txt, if not existing pull it from altervista
		var request = require('request');
        request.get('http://demym.altervista.org/'+fname, function (error, response, body) {
			if (!error && response.statusCode == 200) {
				var xml = body;
				console.log("altervsita cronaca: "+xml);
		        var array = body.split("\n");
				for(i in array) {
					console.log(array[i])
					var ts=array[i].substring(0,14).trim();
					var text=array[i].substring(16);
					var row={
			
						time: ts,
						text: text
					}
					cronaca.rows.push(row);
					//console.log(ts+" - "+text);
				}
				
				cronaca.rows.sort(function(a,b){
					var a1=a.time;
					var b1=b.time;
					if (a1<b1) return 1;
					if (a1>b1) return -1;
					return 0;
					
				})
		        
				fs.writeFile(jfname, JSON.stringify(cronaca), function (err) {
					if (err) return console.log(err);
				  console.log("File "+jfname+" saved on server");
				  var dat = require('../'+jfname);
				  console.log(dat.rows.length);
				});
				cronaca.msg="retrieved from altervista";
				res.send(cronaca);
				return;
				 
			}
			if (error)
			{
			 console.log("error reading remote file: "+error.message);
				fs.writeFile(jfname, JSON.stringify(cronaca), function (err) {
					if (err) return console.log(err);
				  console.log("File "+jfname+" saved on server");
				  var dat = require('../'+jfname);
				  console.log(dat.rows.length);
				});
				cronaca.msg="Not found on altervista, initialized";
				res.send(cronaca);
				return;
			}
		});
			
	 }	
	}	
	 
	
})


router.post('/update/:garaid/:matchid',function(req,res){
	var body=req.body;
	var garaid=req.params.garaid;
	var matchid=req.params.matchid;
	console.log("Update match id="+matchid+": "+JSON.stringify(body));
	readMatchesJson(garaid,function(data) {
		 if (!data) data={rows: []};
		 console.log("matches rows: "+data.rows.length);
		 for (var i=0; i<data.rows.length; i++){
			 
			 var row=data.rows[i].doc;
			 //console.log(row.id);
			 if (row.id.trim()==matchid.trim()) {
				 console.log("found match "+row.id+" to update");
				 for (var key in body) {
					// console.log("key: "+key);
					//if (p.hasOwnProperty(key)) {
						//console.log("key: "+key+"   value: "+p[key]);
						row[key]=body[key];
					//}
				 }
			 }
			 
		 }
		  var fname="matches_"+garaid+".json";
		  fs.writeFile(fname, JSON.stringify(data), function (err) {
          if (err) return console.log(err);
          console.log('File '+fname+' updated on server');
		 res.send({"error":false,"msg":"Delete match "+matchid+" for gara "+garaid});
	     });
		 //res.send(data);
	});	 
	
	
	
});


router.post('/delete/:garaid/:matchid',function(req,res){
	var garaid=req.params.garaid;
	var matchid=req.params.matchid;
	console.log("Delete match id="+matchid);
	readMatchesJson(garaid,function(data) {
		 if (!data) data={rows: []};
		 console.log("matches rows: "+data.rows.length);
		 for (var i=0; i<data.rows.length; i++){
			 
			 var row=data.rows[i].doc;
			 console.log(row.id);
			 if (row.id.trim()==matchid.trim()) {
				 data.rows.splice(i,1);
				 console.log("match "+matchid+" deleted");
			 }
			 
		 }
		 console.log("matches rows: "+data.rows.length);
		  var fname="matches_"+garaid+".json";
		  fs.writeFile(fname, JSON.stringify(data), function (err) {
          if (err) return console.log(err);
          console.log('File '+fname+' updated on server');
		 res.send({"error":false,"msg":"Delete match "+matchid+" for gara "+garaid});
	     });
     });
		 
	
});	
	

router.post('/add/:garaid',function(req,res){
	var body=req.body;
	var garaid=req.params.garaid;
	
	var doc={
		doc: body
	}
	
	
	
	 var rows=[];
	 readMatchesJson(garaid,function(data) {
		 
		 if (!data) data={rows: []};
		 
		 var arr=doc.doc.matchid.split(",");
		 
	
		 
		 for (var i=0; i<arr.length; i++){
			 
			 var sdoc=JSON.parse(JSON.stringify(body));
			 			 
			 
			 //sdoc=body;
			 delete sdoc.id;
			 delete sdoc.matchid;
			 delete sdoc.progid;
			 sdoc.id=generateId()+i;
			 sdoc.matchid=arr[i];
			 sdoc.progid=arr[i].substring(1);
			 sdoc.garaid=garaid;
			
			 console.log("added match "+arr[i] + "  - "+ JSON.stringify(sdoc));
			 data.rows.push({ doc: sdoc});
			 
		 }
		 
		 console.log("rows: "+JSON.stringify(rows));
	     //res.send(rows);
		 //return;
		 
		 //data.rows = data.rows.concat(rows);
		 
	     //console.log(JSON.stringify(data));
		 var fname="matches_"+garaid+".json";
		  fs.writeFile(fname, JSON.stringify(data), function (err) {
          if (err) return console.log(err);
          console.log('File '+fname+' updated on server');
		  res.send({"error":false,"msg":"Added match "+doc.doc.matchid+" for atleta "+doc.doc.atletaname});
        });
		 
		 
	 })
	
	
	
})

router.get('/findbygaraid/:garaid', function(req, res)  {
	
	var id=req.params.garaid;
	console.log("called  findByGaraId for gara "+id);
	var fname="matches_"+id+".xml";
	console.log("fname: "+fname)

//var atleti = loadJSONfile(__dirname + '/atleti.json');
//console.log(atleti.length);
  var cronfname="cronaca_"+id+".txt";
  getAltervistaFile(cronfname,function(data) {
	  
	  console.log("got "+cronfname+" from altervista"); 
  })
   

 if (alterbridge)
 { 

var request = require('request');
request.get('http://demym.altervista.org/'+fname, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        var xml = body;
		//console.log(xml);
		fs.writeFile(fname,xml, function(err) {
             if(err) {
                return console.log(err);
				
            }

            console.log("Remote file "+fname+" was saved!");
			
fs.readFile(fname, "utf-8",function(err, data) {
	if (err){
		console.log("error reading "+fname+": "+err.message);
		res.send({"error":true,"message":err.message,"rows":[]});
		return;
	}
   console.log("Read file "+fname);
   //atleti=xmlToJson(data);
   //console.log(atleti);
   //atleti =  JSON.parse(data, 'utf8');
   //console.log('Read file atleti.json: '+atleti.length);
   
   //console.log(data);
   //console.log(data);

   
    parser.parseString(data, function (err, result) {
        //console.log(JSON.stringify(result));
		if (err) console.log("Error parsing XML: "+err);
		//console.log(result);
		
		matches=result;
		//console.log(JSON.stringify(result));
		
		if (Array.isArray(result.matches.match))
		{
			console.log("Loaded "+result.matches.match.length+" matches for gara "+id);
		matches=xform(matches);
		matches.rows.sort(function(a,b){
			
			var a1=a.doc.progid;
			var b1=b.doc.progid;
			if (a1>b1) return 1;
			if (a1<b1) return -1;
			return 0;
			
		})
		console.log("Loaded "+matches.rows.length+" matches for gara "+id);
		//atleti=result;
		//console.log(JSON.stringify(xform(result)));
		res.send(matches);
		} else {
			console.log("No matches found for gara "+id)
			res.send({rows: []});
		}	
        //console.log('Read file atleti.xml: '+atleti.length);
    });
});
	
	
        }); 
        // Continue with your processing here.
    }
	if (error)
	{
	 console.log("error reading remote file: "+error.message);
     	res.send({"error":true,"message":error.message,"rows":[]}); 	 
		return;
	}
});

 } else {
	 readMatchesJson(id,function(data) {
		 if (!data) data={rows: []};
		 data.rows.sort(function(a,b){
			 var a1=a.doc.progid;
			 var b1=b.doc.progid;
			 if (a1>b1) return 1;
			 if (a1<b1) return -1;
			 return 0;
		 })
		 res.send(data);
		 
		 
	 })
	 
 }

});




router.get('/findbygaraid/byatleta/:garaid', function(req, res)  {
	
	var id=req.params.garaid;
	console.log("called  findByGaraId for gara "+id);
	var fname="matches_"+id+".xml";
	var jfname="matches_"+id+".json";
	console.log("fname: "+fname)

//var atleti = loadJSONfile(__dirname + '/atleti.json');
//console.log(atleti.length);

if (alterbridge) {

var request = require('request');
request.get('http://demym.altervista.org/'+fname, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        var xml = body;
		//console.log(xml);
		fs.writeFile(fname,xml, function(err) {
             if(err) {
                return console.log(err);
				
            }

            console.log("Remote file "+fname+" was saved!");
			
fs.readFile(fname, "utf-8",function(err, data) {
	if (err){
		console.log("error reading "+fname+": "+err.message);
		res.send({"error":true,"message":err.message,"rows":[]});
		return;
	}
   console.log("Read file "+fname);
   //atleti=xmlToJson(data);
   //console.log(atleti);
   //atleti =  JSON.parse(data, 'utf8');
   //console.log('Read file atleti.json: '+atleti.length);
   
   //console.log(data);
   //console.log(data);

   
    parser.parseString(data, function (err, result) {
        //console.log(JSON.stringify(result));
		if (err) console.log("Error parsing XML: "+err);
		//console.log(result);
		
		matches=result;
		if (Array.isArray(result.matches.match))
		{
		matches=xform(matches);
		matches.rows.sort(function(a,b){
			
			var a1=a.doc.progid;
			var b1=b.doc.progid;
			if (a1>b1) return 1;
			if (a1<b1) return -1;
			return 0;
			
		})
		fs.writeFile(jfname, JSON.stringify(matches), function (err) {
          if (err) return console.log(err);
          console.log('File '+jfname+' saved on server');
		  var dat = require('../'+jfname);
		  console.log(dat.rows.length);
        });
		console.log("Loaded "+result.matches.match.length+" matches for gara "+id);
		//atleti=result;
		//console.log(JSON.stringify(xform(result)));
		findAllByAtleta(id,function(data){
			
			res.send(data);
		})
		} else
		{
		 console.log("No matches found for gara "+id)
		 res.send([]);	
			
		}
		
        //console.log('Read file atleti.xml: '+atleti.length);
    });
});
	
	
        }); 
        // Continue with your processing here.
    }
	if (error)
	{
	 console.log("error reading remote file: "+error.message);
     	res.send({"error":true,"message":error.message,"rows":[]}); 	 
		return;
	}
});

} else{
	
		findAllByAtleta(id,function(dat){
			
			res.send(dat);
		})
		
		
	
	
}

});



router.get('/findById/:id', function(req, res)  {
	console.log("called atleti findById");
	var id=req.params.id;
	//res.send(risp);
	findById(id,function(obj) {
		console.log("got data "+JSON.stringify(obj));
		res.send(obj);
	});
	

});



function findByName(nome,callback)  {
  
    console.log('atleti findByName=' + nome);
    if (nome) {
        var results = atleti.filter(function(element) {
            var fullName = element.cognome + " " + element.nome;
			//console.log(fullName);
			var retval=(fullName.toLowerCase().indexOf(nome.toLowerCase()) > -1);
			if (retval) console.log("--- "+fullName);
            return retval;
        });
		results.sort(function(a,b) {
		    var a1=a.cognome;
			console.log(a1);
			var b1=b.cognome;
			if (a1>b1) return 1;
			if (a1<b1) return -1;
			return 0;
		});
		console.log("found "+results.length+" results"); 
		callback(results);
        //res.send(results);
    } else {
        callback({error: "not found nome "+nome});
    }
};

function findById(id,callback) {
    //var id = req.params.id;
	
    console.log('findMatchById: ' + id);
	console.log("matches totali: "+atleti.length);
    if (id) {
        var results = atleti.filter(function(element) {
            var aid = element.id;
			//console.log(aid);
			var fullName=element.cognome+" "+element.nome;
			if (id==aid) {
			 console.log("--- "+fullName);
			return true;
			 
			}
            return false;
        });
		console.log("Found "+results.length+" results");
		var data=xform(results);
        callback(data);
    } else {
       callback({error: "not found id "+id});
    }
};


function findAll(callback) {
    console.log('matches findAll');
    
	/*atleti.sort(function(a,b) {
		    var a1=a.cognome[0];
			//console.log(a1);
			var b1=b.cognome[0];
			if (a1>b1) return 1;
			if (a1<b1) return -1;
			return 0;
		});
		*/
		
		var data=xform(matches);
		
		data.rows.sort(function(a,b){
			
			var a1=a.doc.cognome;
			var b1=b.doc.cognome;
			if (a1>b1) return 1;
			if (a1<b1) return -1;
			return 0;
		})
		
	 	
		
		callback(data);
		//res.render('lv_atleti.ejs',{ posts: atleti});
   // res.send(atleti);
};


function findAllByAtleta(garaid,callback)
{

	  refreshMode="byatleta";
		    var aid=garaid;
		var matches;
 readMatchesJson(aid,function(matches){		

			 
			//var allmatches=$(xml).find("match");
			var allmatches=matches.rows;
			//sdebug("Estrazione match per questa gara da "+allmatches.length+" matches");
			
	
		

		   allmatches.sort(function(a, b){
		     	var progid_a = a.doc.atletaid;
				var progid_b = b.doc.atletaid;
				
				if ( progid_a< progid_b )  return -1;
                if ( progid_a> progid_b  ) return 1;
               return 0;
           }); 
		   
		   var curratleta="";
		   var curratletaname="";
		   var currmatches="";
		   var currmatchesarray=[];
		   
		   var currcategoria="";
		   var currdatanasc="";
		   var count=0;
		   //var lista=$("<lista></lista>");
		   var lista=[]
		   
		   var ca="";
		   var atleticount=0;
		   for (var ii=0; ii<allmatches.length; ii++)
		   {
			 var match=allmatches[ii].doc;  
		     var aid=match.atletaid; 
			 if (aid!=ca) {
			 atleticount++;
			 ca=aid;
			 }
		   }
		   
		   console.log(atleticount+ " unique atleti");
		   
		   var mtext="";
		   //if ($.trim(viewcat)!="") mtext=" in cat. "+viewcat.toUpperCase();
		   
		   
		   for (var ii=0; ii<allmatches.length; ii++)
		   {
		    var match=allmatches[ii].doc;   
			count++;
			//sdebug(count);
			var progid=match.progid; 
			var aid=match.atletaid; 
			var aname=match.atletaname; 
			var matchid=match.matchid; 
			var vinto=match.vinto; 
			var disputato=match.disputato; 
			var dadisputare=match.dadisputare; 
			var medaglia=match.medagliamatch; 
			var risultato=match.risultato; 
			var datanasc=match.datanascita; 
			//var categoria=getCategoria(datanasc);
			var categoria="";
				
			//console.log("matchid: "+matchid+" - atleta: "+aname);
			//era qui
			
			
			
			
			if (aid!=curratleta)
			{
			if (count==1)
				 
			 {
				
			  curratleta=aid;
			  currmatches=matchid;
			  currmatchesarray.push(match);
			  curratletaname=aname;
			  currcategoria=categoria;
			  currdatanasc=datanasc;
			  //anome=aname;
			  //console.log("primo atleta");
			 
			 } else
			 {
			  
			  //var anome=sgetAtletaNameById(curratleta);
			  //var anome=aname;
			  var anome=curratletaname;
			  var atl={};
			  atl.nome=anome;
			  atl.id=curratleta;
			  atl.datanascita=currdatanasc;
			  atl.categoria=currcategoria;
			  atl.matches=currmatches;
			  atl.matchesarray=currmatchesarray;
			  atl.matchesarray.sort(function (a,b){
				  var a1=a.progid;
				  var b1=b.progid;
				  if (a1>b1) return 1;
				  if (a1<b1) return -1;
				  return 0;
				  
			  })
			  //atl.matches
			  
			  lista.push(atl);
			  
			  //lista.append("<atleta><nome>"+anome+"</nome><id>"+curratleta+"</id><datanascita>"+currdatanasc+"</datanascita><categoria>"+currcategoria+"</categoria><matches>"+currmatches+"</matches></atleta>");
			  
			 /*htm+="<li><img src='images/matchtoplay.png' alt='France' class='ui-li-icon ui-corner-none'><div>"+getAtletaNameById(curratleta)+" "+currmatches+"</div></li>";*/
			//  console.log("depositato "+anome+" - "+currmatches);
			//  console.log("cambiato atleta: "+curratleta+" "+anome+" "+currmatches);
			 curratleta=aid;
			 curratletaname=aname;
			 currcategoria=categoria;
			 currdatanasc=datanasc;
			 currmatches="";
			 currmatchesarray=[];
			 currmatches+=matchid;
			 currmatchesarray.push(match);
			 }
			
			
			} else {
			  if (currmatches!="") currmatches+=",";
			  currmatches+=matchid;
			  currmatchesarray.push(match);
			
			}
			
			if (count==allmatches.length)
			{
			 // sdebug("count = matches.length ");
			  //if ($.trim(currmatches)!="") currmatches+=",";
			  //currmatches+=matchid;
			  
			  //var anome=sgetAtletaNameById(curratleta);
			  var anome=curratletaname;
			  if (matches.length==1) {
			   //anome=sgetAtletaNameById(aid);
			   anome=aname;
			   currmatches=matchid;
			   currmatchesarray=[];
			   currmatchesarray.push(match);
			   curratleta=aid;
			   curratletaname=aname;
			   currcategoria=categoria;
			   currdatanasc=datanasc;
			 //  console.log("matches.length = 1 ");
			  } 
			  
			  	  var atl={};
			  atl.nome=anome;
			  atl.id=curratleta;
			  atl.datanascita=currdatanasc;
			  atl.categoria=currcategoria;
			  atl.matches=currmatches;
			  atl.matchesarray=currmatchesarray;
			  atl.matchesarray.sort(function (a,b){
				  var a1=a.progid;
				  var b1=b.progid;
				  if (a1>b1) return 1;
				  if (a1<b1) return -1;
				  return 0;
				  
			  })
			  
			  for (var i=0; i<atl.matchesarray.length; i++)
			  {
				//console.log(atl.matchesarray[i].matchid) ; 
				  
			  }
			  
			    
			  lista.push(atl);
			  
			  //lista.append("<atleta><nome>"+anome+"</nome><id>"+curratleta+"</id><datanascita>"+currdatanasc+"</datanascita><categoria>"+currcategoria+"</categoria><matches>"+currmatches+"</matches></atleta>");
             
			}
			
			
			
			
			 
		  }
		   //htm+="</ul>";
		   
		   // var list=lista.find("atleta");
		   var list=lista;
		    list.sort(function(a, b){
		     	var nome_a = a.nome;
				var nome_b = b.nome;
				
				if ( nome_a< nome_b )  return -1;
                if ( nome_a> nome_b  ) return 1;
               return 0;
           }); 
		   
		   //sdebug(list.html());
		   for (var jj=0; jj<list.length; jj++)
		   {
			   var lst=list[jj]; 
		      var nome=lst.nome;
			  var categ=lst.categoria; //.toUpperCase();
			  var datan=lst.datanascita; //.toUpperCase();
			  //alert(nome);
			  var incontri=lst.matches;
			  var aid=lst.id;
		
			  if (incontri)
			  {	  
			  var arr=incontri.split(",");
			  arr.sort(function(a, b){
		     	//var nome_a = $(a).find('progid').text();
				//var nome_b = $(b).find('progid').text();
				
				
				
			    var proga=a.substring(1);
				var progb=b.substring(1);
			    /* 
		     	var nome_a = $(a).find('progid').text();
				var nome_b = $(b).find('progid').text();
				
				if ( nome_a< nome_b )  return 1;
                if ( nome_a> nome_b  ) return -1;
				*/
				if ( proga< progb )  return -1;
                if ( proga> progb ) return 1;
               return 0;
             }); 
					  var incontri2="";
			  
			  for (var xx=0; xx<arr.length; xx++)
			  {
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
   htm+="<li>"+element.cognome+" "+element.nome+"</li>";
 });
 htm+="</ul>";
 return htm;
}


function xform(d)
{
 var data={
	 rows: []
 };

 for (var i=0; i<d.matches.match.length; i++)
 {
 // console.log(i);	 
  var doc={};
  var p=d.matches.match[i];
  var element={}
  for (var key in p) {
	 // console.log("key: "+key);
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

function sdebug(txt)
{
 console.log(txt);	
	
}


function generateId() {
	var today = new Date();
	var id=today.juliandate();
	return id;
}

Date.prototype.juliandate = function() {
   var yyyy = this.getFullYear().toString();
   var MM = (this.getMonth()+1).toString(); // getMonth() is zero-based
   var dd  = this.getDate().toString();
   var hh = this.getHours();
   var mm = this.getMinutes();
   var ss = this.getSeconds();
   var ms = this.getMilliseconds();
   utils.colog("milliseconds: "+ms)
   
   var n=2;
   var jdate=yyyy+padZeros(MM,n)+padZeros(dd,n)+padZeros(hh,n)+padZeros(mm,n)+padZeros(ss,n)+padZeros(ms,3);
   utils.colog("jdate: "+jdate);
   
   //var jdate  =yyyy+(MM[1]?MM:"0"+MM[0]) + (dd[1]?dd:"0"+dd[0]) + (hh[1]?hh:"0"+hh[0]) + (mm[1]?mm:"0"+mm[0]) + (ss[1]?ss:"0"+ss[0]);
   return jdate; // padding
  };
  
  Date.prototype.juliandateshort = function() {
   var yyyy = this.getFullYear().toString();
   var MM = (this.getMonth()+1).toString(); // getMonth() is zero-based
   var dd  = this.getDate().toString();
   var hh = this.getHours();
   var mm = this.getMinutes();
   var ss = this.getSeconds();
   //var ms = this.getMilliseconds();
   //console.log("milliseconds: "+ms)
   
   var n=2;
   var jdate=yyyy+padZeros(MM,n)+padZeros(dd,n)+padZeros(hh,n)+padZeros(mm,n)+padZeros(ss,n);
   utils.colog("jdate: "+jdate);
   
   //var jdate  =yyyy+(MM[1]?MM:"0"+MM[0]) + (dd[1]?dd:"0"+dd[0]) + (hh[1]?hh:"0"+hh[0]) + (mm[1]?mm:"0"+mm[0]) + (ss[1]?ss:"0"+ss[0]);
   return jdate; // padding
  };


  
    
  function padZeros(theNumber, max) {
    var numStr = String(theNumber);
    
    while ( numStr.length < max) {
        numStr = '0' + numStr;
    }
    
    return numStr;
}
	

  
module.exports=router;