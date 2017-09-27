var express = require('express');
var router = express.Router();
var Cloudant = require('cloudant');
var http = require('http');
var dbs=require("../routes/dbs");

var installBuffer=[];

var username = '2be28457-cba7-449a-a870-b1caa45d9350-bluemix';
var password = '24c7295ad9c99d96d8cbfba3deec7f855de6504866e72c76afc244cabe2c7972';
var CLOUDANT_REST_URL = "2be28457-cba7-449a-a870-b1caa45d9350-bluemix.cloudant.com";
//))var clientsession=require("client-sessions");



//var assetServices = require("../services/assetsService");

var fs = require('fs'),
    xml2js = require('xml2js');

	
var installs;	
	
var parser = new xml2js.Parser();
var fname="a_assets.xml";

var sess;

/* GET users root resource. */
router.get('/', function(req, res) {
//res.send('respond with a resource');
 console.log("called schede");
	dbs.getAllItemsREST("schede",function(data){
	 	console.log("db got from schede: "+JSON.stringify(data));
		
		
		var error={error: "true"};
		var result={};
		
		/*if (data.rows.length==0){
			result=error;
	
			
		}*/
		
		result=data;
		if (data.error){
			result=error;;
			//return;
			
		} else
		{
		 console.log("records: "+data.rows.length);	
			
		}
		
		/*
		var htm="";
		data.rows.sort(function(a,b){
			
			var coda=a.doc.name;
            var codb=b.doc.name;
            if (coda>codb) return 1;			
			if (coda<codb) return -1;
			return 0;
		})
		*/
		
	    res.send(result);
		
		
		
	});  
	
});


//POST


router.post('/addItem', function(req, res) {
	sess=req.session;
	console.log("sessionid: "+req.sessionID);
	 var tipo = req.body.tipo;   
	var aas = req.body.assignee; 
	var location = req.body.location; 
	console.log("router post installations addItem");
	console.log(JSON.stringify(req.body));
	
	var l=installBuffer.length;
	
	var idx=l++;
	
	installBuffer[idx]=req.body;

	//req.session.addItem="added"; 
	sess.installBuffer = installBuffer;
	sess.save();
    console.log(JSON.stringify(sess));
    console.log("Added item to buffer, now there are "+req.session.installBuffer.length);
	
	
	var o=sess.installBuffer;
	
	console.log("reading now session: "+JSON.stringify(sess));
	
	if (o)
    {	
	var htm="";
	htm+="<li style='font-size:14px'>"+o.length+" elementi</li>";
	for (var i=0; i<o.length; i++)
    {
	 htm+="<li style='font-size:11px'><a href='#'>"+o[i].tipo+" - "+o[i].assignee+" - "+o[i].location+"</a></li>"	
		
	}
    } 
	else 
	{
 	htm="<i>no session found</i>";
	}
	
	//res.redirect('/addItem/addInstallation');
	res.send(htm); 
	
	//res.send("added");
	
});



router.post('/addScheda', function(req, res) {
	console.log("router post addScheda");
	console.log("Inserting "+JSON.stringify(req.body)+" items as Scheda");
	
	var today = new Date();
    var dateString = today.yyyymmdd();
	

	console.log()
	
	
	dbs.insert(req.body,function(data){
		console.log("cloudant insert operation result: "+JSON.stringify(data));
		res.send(data);
		
	});
	/*
	dbs.addItemREST("schede",obj,function(data) {
		console.log("cloudant db operation result: "+JSON.stringify(data));
		
		res.send(data);
		//return;
	})
	*/
	
   
});

router.post('/updScheda', function(req, res) {
	console.log("router post updScheda");
	console.log("Updating "+JSON.stringify(req.body)+" items as Scheda");
	
	var today = new Date();
    var dateString = today.yyyymmdd();
	

	console.log()
	
	
	dbs.update(req.body,req.body._id,function(data){
		console.log("cloudant update operation result: "+JSON.stringify(data));
		res.send(data);
		
	});
	/*
	dbs.addItemREST("schede",obj,function(data) {
		console.log("cloudant db operation result: "+JSON.stringify(data));
		
		res.send(data);
		//return;
	})
	*/
	
   
});

router.post('/delScheda', function(req, res) {
	console.log("router post addScheda");
	console.log("Storing "+JSON.stringify(req.body)+" items as Scheda");
	
	var today = new Date();
    var dateString = today.yyyymmdd();
	

	console.log()
	
	
	dbs.remove(req.body,function(data){
		console.log("cloudant remove operation result: "+JSON.stringify(data));
		res.send(data);
		
	});
	/*
	dbs.addItemREST("schede",obj,function(data) {
		console.log("cloudant db operation result: "+JSON.stringify(data));
		
		res.send(data);
		//return;
	})
	*/
	
   
});



/* GET all users. */
// ############################## UNCOMMENT FOR DEMO
router.get('/findall', function(req, res) {
	console.log("called schede findall");
	
	findAll(function(data){
		console.log("got data:");
		console.log(data);
		res.send(data);
	});
	
});

router.get('/findselectall', function(req, res) {
	console.log("called installations findselectall");
	console.log("session: "+JSON.stringify(req.session));
	
	findSelectAll(function(data){
		res.send(data);
	});
	
});

router.get('/carrello', function(req, res) {
	console.log("called installations carrello");
	console.log("session: "+JSON.stringify(req.session));
	
	var o=req.session.installBuffer;
	
	console.log(JSON.stringify(o))
	
	if (o)
    {	
	var htm="";
	htm+="<li style='font-size:14px'>"+o.length+" elementi</li>";
	for (var i=0; i<o.length; i++)
    {
	 htm+="<li style='font-size:11px'><a href='#'>"+o[i].tipo+" - "+o[i].assignee+" - "+o[i].location+"</a></li>"	
		
	}
    } 
	else 
	{
 	htm="<i>no session found</i>";
	}
	
	
	res.send(htm); 
	
});

router.post('/carr', function(req, res) {
	console.log("called installations carr");
	console.log("session: "+JSON.stringify(req.session));
	
	var o=req.session.installBuffer;
	
	console.log(JSON.stringify(o))
	
	if (o)
    {	
	var htm="";
	htm+="<li style='font-size:14px'>"+o.length+" elementi</li>";
	for (var i=0; i<o.length; i++)
    {
	 htm+="<li style='font-size:11px'><a href='#'>"+o[i].tipo+" - "+o[i].assignee+" - "+o[i].location+"</a></li>"	
		
	}
    } 
	else 
	{
 	htm="<i>no session found</i>";
	}
	
	
	res.send(htm); 
	
});


router.get('/findById/:id', function(req, res)  {
	console.log("called schede findById");
	var id=req.params.id;
	//res.send(risp);
	findById(id,function(obj) {
		console.log("got data "+JSON.stringify(obj));
		res.send(obj);
	});
	

});

router.get('/deleteById/:id', function(req, res)  {
	console.log("called schede deleteById");
	var id=req.params.id;
	//res.send(risp);
	deleteById(id,rev,function(obj) {
		console.log("got data "+JSON.stringify(obj));
		res.send(obj);
	});
	

});


router.get('/nome/:nome', function(req, res)  {
	console.log("called locations findByName");
	var nome=req.params.nome;
	//res.send(risp);
	findByName(nome,function(obj) {
		res.send(obj);
	});
	

});

router.post('/deleteById/:id/:rev', function(req, res) {
	var id=req.params.id; 
	var rev=req.params.rev;
	console.log("delete item "+id);
	dbs.deleteItemREST("installations", id, rev, function(data){
		console.log("deleted item "+id);
		
		findAll(function(data){
			res.send(data);
		});
		
	})


	
});	


function findByName(nome,callback) {

	 if (!global.loggedin) {
	  res.send("User not logged in");	
	  return;	
	}
    console.log('assets findByName=' + nome);
    if (nome) {
        var results = assets.filter(function(element) {
			
			if (element.ASSET_SN)
			{	
            var fullName = element.ASSET_SN[0];
			//console.log(fullName);
			var retval=(fullName.toLowerCase().indexOf(nome.toLowerCase()) > -1);
			if (retval) console.log("--- "+fullName);
            return retval;
			} else return false;
        });
		results.sort(function(a,b) {
			if (a.ASSET_SN)
			{	
		    var a1=a.ASSET_SN[0];
			console.log(a1);
			var b1=b.ASSET_SN[0];
			if (a1>b1) return 1;
			if (a1<b1) return -1;
			return 0;
			} else return 0;
		});
		console.log("found "+results.length+" results"); 
		//res.render('lv_atleti.ejs',{ posts: results});
        callback(results);
    } else {
        callback(assets);
    }
};

function findById(id,callback) {


    console.log('find scheda by id: ' + id);
    if (id) {
        dbs.getItemByIdREST("schede",id,function(data){
	 	console.log("db got from schede: "+JSON.stringify(data));
		
		
		
	
		if (data.error){
			callback(data.error);
			return;
			
		}
		
		/*
		var htm="";
		data.rows.sort(function(a,b){
			
			var coda=a.doc.name;
            var codb=b.doc.name;
            if (coda>codb) return 1;			
			if (coda<codb) return -1;
			return 0;
		})
		*/
		
	    callback(data);
		
		
		
	});  
    }
};

function deleteById(id,rev,callback) {


    console.log('find scheda by id: ' + id);
    if (id) {
        dbs.deleteItemREST("schede",id,rev,function(data){
	 	console.log("db got from schede: "+JSON.stringify(data));
		
		
		
	
		if (data.error){
			callback(data.error);
			return;
			
		}
		
		/*
		var htm="";
		data.rows.sort(function(a,b){
			
			var coda=a.doc.name;
            var codb=b.doc.name;
            if (coda>codb) return 1;			
			if (coda<codb) return -1;
			return 0;
		})
		*/
		
	    callback(data);
		
		
		
	});  
    }
};



function findAll(callback) {
  dbs.getAllItemsREST("schede",function(data){
	 	console.log("db got from schede: "+JSON.stringify(data));
		console.log("records: "+data.rows.length);
		
		if (data.rows.length==0){
			callback("No records");
			return;
			
		}
		
		if (data.error!=""){
			callback(data.error);
			return;
			
		}
		
		/*
		var htm="";
		data.rows.sort(function(a,b){
			
			var coda=a.doc.name;
            var codb=b.doc.name;
            if (coda>codb) return 1;			
			if (coda<codb) return -1;
			return 0;
		})
		*/
		
	    callback(data);
		
		
		
	});  
}

function findSelectAll(callback) {
  dbs.getAllItemsREST("installations",function(data){
	 	console.log(JSON.stringify(data));
		callback(data);
		return;
		
		var htm="";
		data.rows.sort(function(a,b){
			
			var coda=a.doc.name;
            var codb=b.doc.name;
            if (coda>codb) return 1;			
			if (coda<codb) return -1;
			return 0;
		})
		
		//htm+='<div class="recnum ui-corner-all " style="text-align: left; left: 20px;">'+data.rows.length+' records</div>';
		htm+='<ul data-role="listview" data-inset="false" class="collaps">';
		for (var j=0; j<data.rows.length; j++)
		{
		 var row=data.rows[j];	
		// htm+='<table border=0 width=100%><tr><td valign=middle width=20 ><div><a class=delitem href="#" id="del'+row.doc._id+'"><simg src="img/remove.png" /></a></div></td><td valign="top"><div data-role="collapsible" id="set1" data-collapsed="true" class="insta set1 ui-collapsible ui-corner-all ui-collapsible-themed-content"><h3 class="insth ui-collapsible-heading ui-collapsible-heading-collapsed">'+row.doc.date+' - '+row.doc.name+'</h3><ul data-role=listview" data-inset="false" class="collaps">';

		 htm+='<li class="ui-li-static ui-body-inherit ui-first-child ui-last-child"><a id="doc_'+row.doc._id+'" onclick="editInstallation(this)">'+row.doc.name+'</a></li>';
		 for (var i=0;i<row.doc.items.length; i++)
		 {
		  var rowit=row.doc.items[i];
		  //htm+='<li><a href="#">'+rowit.assignee+'<br>'+rowit.tipo+'<br>'+rowit.location+'</a></li>';
		 
		 }
		 
		}
		htm+='</ul>';
	    callback(htm);
		
		
		
	});  
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


function generateId()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text.toUpperCase();
}

Date.prototype.yyyymmdd = function() {
   var yyyy = this.getFullYear().toString();
   var mm = (this.getMonth()+1).toString(); // getMonth() is zero-based
   var dd  = this.getDate().toString();
   return yyyy + (mm[1]?mm:"0"+mm[0]) + (dd[1]?dd:"0"+dd[0]); // padding
  };


module.exports = router;

