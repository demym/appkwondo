/*

IBM Business Partner Ecosystem Italia
Licensed Materials - Property of IBM
© Copyright IBM Corporation 2017   
All Rights Reserved

*/

var gcm = require('node-gcm');
var dbs = require("../routes/dbs");
var request = require('request');
var mongo = require('../routes/mongo');

var gcmsender = new gcm.Sender('AAAA8NbYOh0:APA91bHMyE-jTX-SX1kROJ-W-t-GSn9wIpyXqGPQOO8LHsLAp-EtO_CXgxGIT_8ic1ccRWDJ8VEiISLmHkayvDLtncd4nebcUh7jDkVUYT9G3IF4etaNvfj1uwBBdRPFT5NgYMZhr-qB');
console.log("GCMSENDER", gcmsender);

var gcm_enabled = true;


var tokens = [];


function deleteToken(deviceid) {
	var newtokens = [];
	tokens.forEach(function (item, idx) {
		var tok = item.token;
		var uid = item.deviceid
		if (uid != deviceid) newtokens.push(item);
	})
	tokens = newtoken;
	return tokens;
}



function viewTokens() {
	console.log("viewTokens", tokens);
	return tokens;
}
function addToken(deviceid, token) {
	var found = false;
	tokens.forEach(function (item, idx) {
		var tok = item.token;
		var uid = item.deviceid;
		if (uid == deviceid) {
			found = true;
			item.token = token;

		}
	})
	if (!found) {
		var newtoken = {
			token: token,
			deviceid: deviceid,
			count: 0
		}
		console.log("adding new gcmtoken", newtoken);
		tokens.push(newtoken);
	}
}


function resetTokens() {
	tokens = [];
	return tokens;
}

function resetTokenCount(deviceid) {
	tokens.forEach(function (item, idx) {
		if (deviceid == item.deviceid) {
			item.count = 0;
		}
	})
}


function setTokenCount(deviceid, n) {
	tokens.forEach(function (item, idx) {
		if (deviceid == item.deviceid) {
			item.count = n;
		}
	})
}



function getTokens(callback) {
	mongo.getfile("users.json", function (data) {
		//dbs.list("users", function (data) {

		var tokens = [];
		data.rows.forEach(function (item, idx) {
			var doc = item.doc;
			//if (doc.gcmtoken) tokens.push(doc.gcmtoken);
			if (doc.hasOwnProperty("gcmtokens")) {
				doc.gcmtokens.forEach(function (item, idx) {
					tokens.push(item);
				})
			}

		})
		tokens.push("flHZUR3Cqow:APA91bHOmBjbz0gEQSha7M20mU4CqYvijN8hnxaGnDCMSu9Ze7DMDYzhxO3xTB1LmPyeF2oWfnTc_ucU7s8w3dX7tk6Z9IB3MVEyUdD-UG9kTY_53d82BBGZgJR-sqSgGfTBOdZylGox");
		if (callback) callback(tokens);

	})

}

function setGcmEnabled(v) {
	gcm_enabled = v;
}


function testGCM(callback) {
	var body = {
		"to": "flHZUR3Cqow:APA91bHOmBjbz0gEQSha7M20mU4CqYvijN8hnxaGnDCMSu9Ze7DMDYzhxO3xTB1LmPyeF2oWfnTc_ucU7s8w3dX7tk6Z9IB3MVEyUdD-UG9kTY_53d82BBGZgJR-sqSgGfTBOdZylGox",

		"data": {
			"message": "This is a GCM Topic Message!",
			"title": "title"
		}
	}
	var request_options = {
		method: 'POST',
		headers: {
			'Authorization': 'key=AAAAXgIzogI:APA91bEKKvmaROzG0ufAOTYrPU5UiP9VNtQfPOuIq4zhmFJIKcT4_2qv5FD7_J2o9uXn-AnKE83AuuRds5k4zVDM8TmBtTLa4Ru89wQxsYqqGmK3orm-KH7bA7avX6k-kulRiO8sZUJ6'
		},
		uri: "https://fcm.googleapis.com/fcm/send",
		json: body
	}

	request_options.json.data["content-available"] = 1;

	console.log("request_options", request_options);

	request(request_options, function (err, res, resBodyJSON) {
		if (err) {
			return callback(err);
		}
		if (res.statusCode >= 500) {
			console.log('GCM service is unavailable (500)');
			return callback(res.statusCode);
		}
		if (res.statusCode === 401) {
			console.log('Unauthorized (401). Check that your API token is correct.');
			return callback(res.statusCode);
		}
		if (res.statusCode !== 200) {
			console.log('Invalid request (' + res.statusCode + '): ' + resBodyJSON);
			return callback(res.statusCode);
		}
		if (!resBodyJSON) {
			console.log('Empty response received (' + res.statusCode + ' ' + res.statusMessage + ')');
			// Spoof error code 400 to avoid retrying the request
			return callback({ error: res.statusMessage, code: 400 });
		}
		callback(null, resBodyJSON, body.registration_ids || [body.to]);
	});

}


function sendToAll(obj, callback) {

	var resp=[];

	var text = "Notification text";
	var title = "Notification title";
	var icon = "ic_launcher";
	var color = "#000000";
	var tag = "bpecosystemitaly";
	var badge = "1";
	var topic = tag;

	if (obj.text) text = obj.text;
	if (obj.title) title = obj.title;
	if (obj.icon) icon = obj.icon;
	if (obj.color) color = obj.color;
	if (obj.tag) tag = obj.tag;
	if (obj.badge) badge = obj.badge;
	if (obj.topic) topic = obj.topic;





	var msg = {
		title: title,
		text: text,
		to: "flHZUR3Cqow:APA91bHOmBjbz0gEQSha7M20mU4CqYvijN8hnxaGnDCMSu9Ze7DMDYzhxO3xTB1LmPyeF2oWfnTc_ucU7s8w3dX7tk6Z9IB3MVEyUdD-UG9kTY_53d82BBGZgJR-sqSgGfTBOdZylGox"
	}



	tokens.forEach(function (item, idx) {
		item.count++;

		var message = new gcm.Message({
			priority: 'high',
			delayWhileIdle: true,
			timeToLive: 3,
			data: {
				/*url: 'infos',*/
				title: title,
				body: text,
				sound: 'default',
				msgcnt: item.count,
				"content-available": '1'
			}
		});


		//this is for IOS
		message.addNotification({
			title: title,
			body: text,
			icon: icon,
			tag: tag,
			to: topic,
			notId: 10,
			badge: item.count /*,
		contentAvailable: 1*/


		});


		//console.log("message", message);

		//message.data.msgcount = item.count;
		console.log("sending gcm message to ",item.token);
		gcmsender.send(message, {
			registrationTokens: [item.token]
		}, function (err, response) {
			if (err) {
				//console.error("error sending gcm", 400);
				console.log("error in gcm response",err);
				//if (callback) callback(err);
				resp.push(err);
			} else {
				console.log("gcm response",response);
				//if (callback) callback(response);
				resp.push(response);
			}
		});

	})


	if (callback) callback(resp);





}

function sendToAllOld(obj, callback) {

	var text = "Notification text";
	var title = "Notification title";
	var icon = "ic_launcher";
	var color = "#000000";
	var tag = "bpecosystemitaly";
	var badge = "1";
	var topic = tag;

	if (obj.text) text = obj.text;
	if (obj.title) title = obj.title;
	if (obj.icon) icon = obj.icon;
	if (obj.color) color = obj.color;
	if (obj.tag) tag = obj.tag;
	if (obj.badge) badge = obj.badge;
	if (obj.topic) topic = obj.topic;


	var message = new gcm.Message({
		priority: 'high',
		delayWhileIdle: true,
		timeToLive: 3,
		data: {
			/*url: 'infos',*/
			title: title,
			body: text,
			sound: 'default',
			/*msgcnt: 8,*/
			"content-available": '1'
		}
	});

	console.log("message", message);


	var msg = {
		title: title,
		text: text,
		to: "flHZUR3Cqow:APA91bHOmBjbz0gEQSha7M20mU4CqYvijN8hnxaGnDCMSu9Ze7DMDYzhxO3xTB1LmPyeF2oWfnTc_ucU7s8w3dX7tk6Z9IB3MVEyUdD-UG9kTY_53d82BBGZgJR-sqSgGfTBOdZylGox"
	}



	getTokens(function (regTokens) {

		console.log("registrationTokens", regTokens);

		// Actually send the message 
		gcmsender.send(message, {
			registrationTokens: regTokens
		}, function (err, response) {
			if (err) {
				console.error("error sending gcm", 400);
				if (callback) callback(err);
			} else {
				console.log(response);
				if (callback) callback(response);
			}
		});

	});



}


function sendHttps(msg, callback) {
	if (gcm_enabled) {
		_sendHttps(msg, function (data) {
			callback(data);
		});
	} else {
		callback({ error: true, message: "GCM not enabled" });
	}
}


function _sendHttps(msg, callback) {

	getTokens(function (regTokens) {
		console.log("got regtokens", regTokens.length);

		var body = {
			"to": "flHZUR3Cqow:APA91bHOmBjbz0gEQSha7M20mU4CqYvijN8hnxaGnDCMSu9Ze7DMDYzhxO3xTB1LmPyeF2oWfnTc_ucU7s8w3dX7tk6Z9IB3MVEyUdD-UG9kTY_53d82BBGZgJR-sqSgGfTBOdZylGox",
			//"to": regTokens.join(","),
			"data": {
				"message": "This is a GCM Topic Message!",
				"title": "title"
			}
		}

		if (msg.message) body.data.message = msg.message;
		if (msg.title) body.data.title = msg.title;
		if (msg.text) body.data.message = msg.text;
		//if (msg.to) body.to = msg.to;


		var request_options = {
			method: 'POST',
			headers: {
				'Authorization': 'key=AAAAXgIzogI:APA91bEKKvmaROzG0ufAOTYrPU5UiP9VNtQfPOuIq4zhmFJIKcT4_2qv5FD7_J2o9uXn-AnKE83AuuRds5k4zVDM8TmBtTLa4Ru89wQxsYqqGmK3orm-KH7bA7avX6k-kulRiO8sZUJ6'
			},
			uri: "https://fcm.googleapis.com/fcm/send",
			json: body
		}

		request_options.json.data["content-available"] = 1;

		console.log("request_options", request_options);

		request(request_options, function (err, res, resBodyJSON) {
			if (err) {
				callback(err);
			}
			if (res.statusCode >= 500) {
				console.log('GCM service is unavailable (500)');
				callback(res.statusCode);
			}
			if (res.statusCode === 401) {
				console.log('Unauthorized (401). Check that your API token is correct.');
				callback(res.statusCode);
			}
			if (res.statusCode !== 200) {
				console.log('Invalid request (' + res.statusCode + '): ' + resBodyJSON);
				callback(res.statusCode);
			}
			if (!resBodyJSON) {
				console.log('Empty response received (' + res.statusCode + ' ' + res.statusMessage + ')');
				// Spoof error code 400 to avoid retrying the request
				callback({ error: res.statusMessage, code: 400 });
			}
			callback(null, resBodyJSON, body.registration_ids || [body.to]);
		});
	});

}


function sendToEmail(email, obj, callback) {

	mongo.getfile("users.json", function (data) {

		//dbs.list("users",function(data){
		data.rows.forEach(function (item, idx) {
			var doc = item.doc;
			if (doc.email == email) {
				var gcmtoken = "";
				if (doc.gcmtoken) gcmtoken = doc.gcmtoken;
				console.log("found email " + doc.email + ",gcmtoken", gcmtoken);
				obj.token = gcmtoken;
				if (obj.token.trim() != "") {
					sendToToken(obj, function (data) {
						console.log("GCM sent to token", gcmtoken);
						if (callback) callback(data);
					})
				}


			}
		})

	})


}

function sendToToken(obj, callback) {

	var text = "Notification text";
	var title = "Notification title";
	var icon = "ic_launcher";
	var color = "#000000";
	var tag = "appkwondov2";
	var badge = "1";
	var topic = tag;
	var token = "";

	if (obj.text) text = obj.text;
	if (obj.title) title = obj.title;
	if (obj.icon) icon = obj.icon;
	if (obj.color) color = obj.color;
	if (obj.tag) tag = obj.tag;
	if (obj.badge) badge = obj.badge;
	if (obj.topic) topic = obj.topic;
	if (obj.token) token = obj.token;


	var message = new gcm.Message({
		priority: 'high',
		delayWhileIdle: true,
		timeToLive: 3,
		data: {
			/*url: 'infos',*/
			title: title,
			body: text,
			sound: 'default',
			msgcnt: 8,
			"content-available": '1'
		}
	});
	/*var message = new gcm.Message({
		//badge: badge,
		color: color,
		tag: tag,
		to: topic,
		notId: 10,

		notification: {
			title: title,
			icon: icon,
			body: text,
			notId: 10
		}
	});

	
	message.addData("text", text);
	message.addData("title", title);
	*/
	/*
	message.addNotification({
		title: title,
		body: text,
		icon: icon,
		notId: 10

	});
	*/





	// Specify which registration IDs to deliver the message to 
	//var regTokens = ['eUDsOhXfAvQ:APA91bE7pSIi4_dnO2i7dJCb6WgfNyg7I0s9dpQYSXHQ58BDF9o98ud357SKTM3iG2PPsnItDFSnBhyh3rce_TSqaYNSg3RCkAzIhYauzXittOezq6rGHsY3aAGI-pYYxme8aMKFfiM4'];
	//var regTokens=[];
	//get connected users
	/*	io.sockets.sockets.map(function (e) {
			if (e.gcmtoken) regTokens.push(e.gcmtoken);
	
		});*/

	var regTokens = [token];

	console.log("regTokens", regTokens)

	//getTokens(function(regTokens){


	// Actually send the message 
	gcmsender.send(message, {
		registrationTokens: regTokens
	}, function (err, response) {
		if (err) {
			console.error(err);
			if (callback) callback(err);
		} else {
			console.log(response);
			if (callback) callback(response);
		}
	});

	//});



}

exports.deleteToken = deleteToken;
exports.resetTokens = resetTokens;
exports.resetTokenCount = resetTokenCount;
exports.addToken = addToken;
exports.viewTokens = viewTokens;
exports.getTokens = getTokens;
exports.sendToAll = sendToAll;
exports.sendToToken = sendToToken;
exports.sendToEmail = sendToEmail;
exports.sendHttps = sendHttps;
exports.testGCM = testGCM;
exports.setGcmEnabled = setGcmEnabled;
