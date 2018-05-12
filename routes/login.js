var express = require('express');
var router = express.Router();
var loginServices = require("../services/loginService");

/* GET users root resource. */
router.get('/', function(req, res) {
	res.send('respond with a resource');
});

/* GET all users. */
// ############################## UNCOMMENT FOR DEMO

router.get('/:uid/:psw', function(req, res) {
	
	var uid=req.params.uid;
	var psw=req.params.psw;
	
	var o={"uid":uid, "psw":psw};
	console.log("trying to login "+uid+" "+psw);
	//res.send("semchi");
	//return;d
	loginServices.checkLogin(o,function(obj) {
		console.log("###### checked login -->  " + JSON.stringify(obj));
		if (obj.loggedin) {
			console.log(JSON.stringify(req.session));
			req.session.username=uid;
			console.log("saved session: "+JSON.stringify(req.session));
			
		}
		res.send(obj);
	});
	
});

router.get('/getAllUsers', function(req, res) {
	console.log("getAllUsers");
	console.log("reading session: "+JSON.stringify(req.session));
	res.send("allusers");
	/*
	loginServices.getAllUsers(function(obj) {
		console.log("###### users ( /getAllUsers route ) -->  " + JSON.stringify(obj));
		res.send(obj);
	});
	*/
});

router.get('/logout', function(req, res) {
	loginServices.logOut(function(obj) {
		console.log("###### users ( /logout -->  " + JSON.stringify(obj));
		//req.session.username="";
		console.log("reading session: "+JSON.stringify(req.session));
		res.send(obj);
	});
});


module.exports = router;