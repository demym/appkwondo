
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




function paginateRows(req, dataarr, callback) {

	var rows = dataarr;
	if (dataarr.hasOwnProperty("rows")) rows = dataarr.rows;
	var page = 0;
	var start = 0;
	var count = -1;
	var sortfield = "jdate";
	var usedoc = true;
	if (req.query.usedoc) usedoc = Bool(req.query.usedoc);
	if (req.query.page) page = parseInt(req.query.page, 10);
	if (req.query.start) start = parseInt(req.query.start, 10);
	if (req.query.count) count = parseInt(req.query.count, 10);
	if (req.query.sortfield) sortfield = req.query.sortfield;

	/*var pdata = {
			data: data,
			page: page,
			start: start,
			count: count,
			t1: new Date(),
			doxls: false
	}*/


	//var rows = obj.data.rows;
	//var data = obj.data;
	var freetextsearch = "";
	//var page = 0;
	//var start = 0;
	//var count = 200;
	var t1 = new Date();
	var doxls = false;
	if (req.query.freetextsearch) freetextsearch = req.query.freetextsearch;
	//if (obj.hasOwnProperty("page")) page = obj.page;
	//if (obj.hasOwnProperty("count")) count = obj.count;
	//if (obj.hasOwnProperty("t1")) t1 = obj.t1;
	//if (obj.hasOwnProperty("doxls")) doxls = obj.doxls;

	if (count == -1) count = rows.length;

	var arr = rows;

	var l = JSON.stringify(rows).length;


	if (freetextsearch.trim() != "") {
		var sarr = [];

		arr.forEach(function (item, idx) {
			var doc = item;
			if (item.hasOwnProperty("doc")) doc = item.doc;
			var alreadydone = false;
			for (var k in doc) {
				var campovalue = doc[k];

				if (typeof campovalue === 'string' || campovalue instanceof String) {
					if (campovalue.toLowerCase().trim().indexOf(freetextsearch.toLowerCase().trim()) > -1) {

						if (!alreadydone) sarr.push(item);
						alreadydone = true;
					}
				}
			}
		})
		arr = sarr;
	}

	var totreccount = arr.length;


	/*arr.sort(function (a, b) {
		var a1 = a[sortfield];
		var b1 = b[sortfield];
		if (a.hasOwnProperty("doc")) a1 = a.doc[sortfield];
		if (b.hasOwnProperty("doc")) b1 = b.doc[sortfield];
		if (a1 > b1) return -1;
		if (a1 < b1) return 1;
		return 0;

	});*/


	/*if (usedoc){
			var newarr=[]
			arr.forEach(function(item,idx){
					var newitem={
							doc: item
					}
					newarr.push(newitem)
			})
			arr=newarr;
	}*/


	var pages = 0;

	if (page > 0) {
		start = count * page;
	}


	if (count > 0) {
		//console.log("start", start, "end", start + count)
		arr = arr.slice(start, start + count);

	}



	if (count > 0) {
		var totalPages_pre = Math.floor(totreccount / count)
		pages = (totreccount % count) == 0 ? totalPages_pre : totalPages_pre + 1;
		page = Math.ceil(start / count);
		if (page > (pages - 1)) {
			start = 0;
			page = 0;
		}


	}





	var t2 = new Date();
	var tdiff = t2.getTime() - t1.getTime();

	var endrec = start + count - 1;
	if (endrec > totreccount - 1) endrec = totreccount - 1

	const used = process.memoryUsage();
	var memusage = {}
	for (var key in used) {
		memusage[key] = Math.round(used[key] / 1024 / 1024 * 100) / 100 + " MB";
		//console.log(`${key} ${Math.round(used[key] / 1024 / 1024 * 100) / 100} MB`);
	}




	//var tottime = data.time_ms_cloudantlist + tdiff;
	var tottime = t1 + tdiff;

	if (totreccount == arr.length) endrec = totreccount - 1;

	var firstpage = false;
	if (page == 0) firstpage = true;
	var lastpage = false;
	if (page == (pages - 1)) lastpage = true;


	var time_cloudant;
	var operation = "LIST";



	/*if (dataarr.hasOwnProperty("time_ms_cloudantlist")) {
		time_cloudant = data.time_ms_cloudantlist;
		console.log("CLOUDANT LIST !!");
	}
	if (data.hasOwnProperty("time_ms_cloudantfind")) {
		console.log("CLOUDANT FIND !!!")
		time_cloudant = data.time_ms_cloudantfind;
		tottime = data.time_ms_cloudantfind + tdiff;
		operation = "FIND";
	}*/

	var retvalue = {
		//time_ms_cloudant: time_cloudant,
		//time_ms_list: tdiff,
		//time_ms: tottime,
		//cloudant_operation: operation,
		rows: arr,
		length: l,
		pagecount: count,
		pages: pages,
		page: page,
		firstpage: firstpage,
		lastpage: lastpage,
		chunkcount: arr.length,
		startrec: start,
		endrec: endrec,
		totalcount: totreccount,
		memusage: memusage,
		//cloudantdata: data
	}



	console.log(retvalue.rows.length + " records found")
	if (doxls) {
		utils.array2xls(arr, function (xls) {
			//res.send(xls);
			callback(xls)
		});
	} else {
		//res.send(retvalue);
		callback(retvalue)
	}
}


exports.sendChatMediaToAltervista = sendChatMediaToAltervista;
exports.sendMediaFileToAltervista = sendMediaFileToAltervista;
exports.colog = colog;
exports.consolog = consolog;
exports.clearlog = clearlog;
exports.json2xml = json2xml;
exports.paginateRows=paginateRows;

