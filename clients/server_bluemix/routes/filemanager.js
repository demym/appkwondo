var express = require('express');
var router = express.Router();
var fs = require('fs');
var MongoClient = require('mongodb').MongoClient;
var mongourl="mongodb://demym:Ser07glr@ds045734.mongolab.com:45734/tkdr";




router.get('/edit/:filename', function(req, res){
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
        text: data,
		filename: fname
     });
	}); 
	
	
	
	
    //response.sendfile(path.join(__dirname+'/editfile.html?file='+fname));
});







router.post("/save",function(req,res){
	var body=req.body;
	console.log(body);
	var fname=body.filename;
	var text=body.txtfile;
	
	fs.writeFile(fname, text, function (err) {
          if (err) return console.log(err);
		  console.log(fname+" saved");
		  res.send("file "+fname+" saved correctly");
	});	  
	
	
	
})





module.exports=router;

