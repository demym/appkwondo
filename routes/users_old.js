var express = require('express');
var router = express.Router();
var userServices = require("../services/userService");


/* GET users root resource. */
router.get('/', function(req, res) {
	res.send('respond with a resource');
});

/* GET all users. */
// ############################## UNCOMMENT FOR DEMO
router.get('/getAllUsers', function(req, res) {
	userServices.getAllUsers(function(obj) {
		console.log("###### users ( /getAllUsers route ) -->  " + JSON.stringify(obj));
		res.send(obj);
	});
});


/* ADD user. */
router.post('/addUser', function(req, res) {
	userServices.addUser(req.body, function(obj) {
		console.log("###### users ( /addUser route ) -->  " + JSON.stringify(obj));
		res.send(obj);
	});
});

/* DELETE user by ID. */
router.get('/deleteUser/:objd', function(req, res) {
	var userId = req.params.objd;
	console.log('########## about to delete user: ' + userId);
	userServices.deleteUser(userId, function(obj) {
		console.log("###### users ( /deleteUser route ) -->  " + JSON.stringify(obj));
		res.send(obj);
	});
});
module.exports = router;