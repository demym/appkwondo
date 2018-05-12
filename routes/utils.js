
var express = require('express');
var js2xmlparser = require("js2xmlparser");
var fs = require("fs");
var base64 = require('node-base64-image');
var path = require('path');
var util = require("util");
var mime = require("mime");
var Jimp = require("jimp");
var request = require('request');
var altervistaurl = "http://demym.altervista.org";

var mongo = require('../routes/mongo');


var router = express.Router();
var debug = false;
var writelog = false;




function colog_old(txt) {

	var date = new Date();
	var jdate = date.julian();

	console.log(txt);

	if (writelog) {

		var dtxt = jdate + " - " + txt + "\r\n";
		fs.appendFile('./public/log.txt', dtxt, function (err) {

		});
	}

}


function json2xml(json, roottag) {

	if (!roottag) roottag = "root";

	var xml = js2xmlparser(roottag, json)

	return xml;
}

function colog() {

	//console.log("args: "+args);

	var date = new Date();
	var jdate = date.julian();

	if (debug) console.log.apply(console, arguments);

	if (writelog) {
		var logtxt = "";
		for (var i = 0; i < arguments.length; i++) {

			var addtext = arguments[i];
			//console.log(arguments[i]);
			//console.log(isObject(addtext));
			if (isObject(arguments[i])) addtext = JSON.stringify(arguments[i]);
			logtxt += addtext + "\r\n";
		}

		logtxt = jdate + " - " + logtxt;
		fs.appendFile('./public/log.txt', logtxt, function (err) {

		});
	}

}


function clearlog() {

	fs.writeFile('./public/log.txt', "", function (err) {

	});
}

function consolog() {

	//console.log("args: "+args);

	var date = new Date();
	var jdate = date.julian();

	if (debug) console.log.apply(console, arguments);

	if (writelog) {
		var logtxt = "";
		for (var i = 0; i < arguments.length; i++) {

			var addtext = arguments[i];
			//console.log(arguments[i]);
			//console.log(isObject(addtext));
			if (isObject(arguments[i])) addtext = JSON.stringify(arguments[i]);
			logtxt += addtext + "\r\n";
		}

		logtxt = jdate + " - " + logtxt;
		fs.appendFile('./public/log.txt', logtxt, function (err) {

		});
	}

}







function isObject(item) {
	//return typeof var === 'object' && var	
	return (typeof item === "object" && !Array.isArray(item) && item !== null);
}


Date.prototype.julian = function () {
	var yyyy = this.getFullYear().toString();
	var MM = (this.getMonth() + 1).toString(); // getMonth() is zero-based
	var dd = this.getDate().toString();
	var hh = this.getHours();
	var mm = this.getMinutes();
	var ss = this.getSeconds();
	var ms = this.getMilliseconds();

	var n = 2;
	var jdate = yyyy + padZeros(MM, n) + padZeros(dd, n) + padZeros(hh, n) + padZeros(mm, n) + padZeros(ss, n) + padZeros(ms, 3);
	//console.log("jdate: "+jdate);

	//var jdate=yyyy+(MM[1]?MM:"0"+MM[0]) + (dd[1]?dd:"0"+dd[0]) + (hh[1]?hh:"0"+hh[0]) + (mm[1]?mm:"0"+mm[0]) + (ss[1]?ss:"0"+ss[0]);
	return jdate; // padding
};

function padZeros(theNumber, max) {
	var numStr = String(theNumber);

	while (numStr.length < max) {
		numStr = '0' + numStr;
	}

	return numStr;
}



function sendChatMediaToAltervista(filename, content, callback) {
	var dat = content;
	//dat = data;

	console.log("sendchatmediatoaltervista filename: " + filename);
	var headers = {
		'User-Agent': 'Super Agent/0.0.1',
		'Content-Type': 'application/jsonrequest'
	}


	// Configure the request
	var options = {
		url: altervistaurl + '/savechatmedia.php',
		method: 'POST',
		headers: headers,
		dataType: "json",
		form: { 'filename': filename, 'content': dat }
	}
	console.log(options.url)
	// Start the request
	request(options, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			// Print out the response body
			console.log(body)
			console.log("file " + filename + " saved on altervista");
			if (callback) callback(body);
			return;
		}
		if (error) {
			console.log(error);
			if (callback) callback(error);
			return;
		}

	})


}


function sendMediaFileToAltervista(filename, content) {
	var dat = content;
	//dat = data;

	console.log("sendtoaltervsita filename: " + filename);
	var headers = {
		'User-Agent': 'Super Agent/0.0.1',
		'Content-Type': 'application/jsonrequest'
	}


	// Configure the request
	var options = {
		url: altervistaurl + '/savemedia.php?encode=yes',
		method: 'POST',
		headers: headers,
		dataType: "json",
		form: { 'filename': filename, 'fdata': dat }
	}
	console.log(options.url)
	// Start the request
	request(options, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			// Print out the response body
			console.log(body)
			console.log("file " + filename + " saved on altervista");
		}
		if (error) {
			console.log(error);
		}

	})


}



exports.getAtletaById = function (id, atleti) {

	for (var i = 0; i < atleti.rows.length; i++) {

		var row = atleti.rows[i];
		var doc = row.doc;

		if (doc.id == id) return row;


	}

	return {};
}

exports.getMatchById = function (id, matches) {

	for (var i = 0; i < matches.rows.length; i++) {

		var row = matches.rows[i];
		var doc = row.doc;

		if (doc.id == id) return row;


	}

	return {};
}




exports.getCategoria = function (dn, referralDate) {

	var cat = "senior a";
	var curyear = new Date().getFullYear();
	//console.log("curyear "+curyear)
	//if (!jcurrentgara.data) useCurrentDate = true;
	if (referralDate) {
		var arrd = referralDate.split("/");
		var annogara = arrd[2];
		curyear = annogara;
	}
	//sdebug("curyear: "+curyear);

	if (dn.trim() == "") {
		return "senior b";
	}
	var ar = dn.split(".");
	var byear = ar[2];

	var eta = parseInt(curyear, 10) - parseInt(byear, 10);
	//sdebug("calcolo età: "+eta);

	if ((eta >= 18) && (eta <= 35)) cat = "senior a";
	if ((eta >= 15) && (eta <= 17)) cat = "junior";
	if ((eta >= 12) && (eta <= 14)) cat = "cadetti a";
	if ((eta >= 10) && (eta <= 11)) cat = "cadetti b";
	if (eta > 35) cat = "senior b";
	if (eta < 10) cat = "esordienti";


	return cat

}

/*
exports.getCategoria=function(datanascita,usaDataOggi){

   return "categoria dogaz";


}
*/


exports.Right = function (str, n) {
	if (n <= 0)
		return "";
	else if (n > String(str).length)
		return str;
	else {
		var iLen = String(str).length;
		return String(str).substring(iLen, iLen - n);
	}
}

exports.filterRows = function ($m, filt, exact) {
	if (!exact) exact = false;
	//console.log("filterrows: ")
	//console.log($m)
	var $retrows = {
		rows: []
	};

	var rows = $m;
	if ($m.rows) rows = $m.rows;
	//var rows = $m.rows; //[{person:"me", age :"30"},{person:"you",age:"25"}];

	for (var i = 0; i < rows.length; i++) {

		var row = rows[i];
		var eligible = true;

		for (var key in row.doc) {
			//console.log("key: " + key + " . " + row.doc[key]);
			for (var fkey in filt) {
				if (fkey != "equals") {
					if (fkey == key) {
						//console.log("found key ---->"+fkey);
						var v1 = filt[fkey].toLowerCase();

						if (v1.trim() != "") {
							var v2 = row.doc[key].toLowerCase();
							//console.log(v2);
							if (exact) {
								if (v2.trim() == v1.trim()) {
									// console.log("found !: "+v2);

								} else {
									eligible = eligible && false;
								}
							} else {
								if (v2.indexOf(v1) > -1) {
									// console.log("found !: "+v2);

								} else {
									eligible = eligible && false;
								}


							}

						}

					}
				}
			}
		}

		if (eligible) $retrows.rows.push(row);
	}

	return $retrows;
}



exports.sendChatMediaToAltervista = sendChatMediaToAltervista;
exports.sendMediaFileToAltervista = sendMediaFileToAltervista;
exports.colog = colog;
exports.consolog = consolog;
exports.clearlog = clearlog;
exports.json2xml = json2xml;
