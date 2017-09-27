var express = require('express');
var router = express.Router();




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
        text: data
     });
	}); 
	
	
	
	
    //response.sendfile(path.join(__dirname+'/editfile.html?file='+fname));
});




router.post("/save/:filename",function(req,res){
	var body=req.body;
	console.log(body);
	
	
	
})