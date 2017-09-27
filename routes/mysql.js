var express = require('express');
var router = express.Router();
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : '< MySQL username >',
  password : '< MySQL password >',
  database : '<your database name>'
});



router.get('/getfile/:filename', function(req, res) {
	console.log("called matches findall");
	console.log(generateId());
	readfile(function(obj) {
		//console.log("###### users ( /getAllAssets route ) -->  " + JSON.stringify(obj));
		res.send(obj);
	});
});






function readfile(fname,callback){
connection.connect();
connection.query('SELECT * from tkdr', function(err, rows, fields) {
  if (!err)
    console.log('The solution is: ', rows);
    if (callback) callback(rows);
  else
    console.log('Error while performing Query.');
});

connection.end();
}












exports.readfile=readfile;