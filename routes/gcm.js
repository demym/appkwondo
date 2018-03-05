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
var admin = require("firebase-admin");



var serviceAccount = {
	"type": "service_account",
	"project_id": "appkwondo",
	"private_key_id": "e4de75a1e74f1e10f494fa555b733de940947358",
	"private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCpJ2t7qrCT9Lfa\nF/A5zGs5XKatDBZzN5VB0R6QqRVQVVamkMlB3k1/VM5yPuB8gqgsr9Kq4VzvMYGs\nKdkMcYFDjxX19u69SiezIva+MHJ1+B3eTDZxhDjZPI79TDrSkD3kxJx393EW6eu0\nFvojVSoUqhRm6C8sjoPs0F/fU7Xsg/OfdsoO5ODWDbEXQw1ufTwULTVFzfRuFh17\n0PT0Io/JZyExNv94z7Jd/kotP23Xq0fVrRqpSGYzBHz2sKEMhqObcuOyS+29yD4r\nXwUmbrIvhGmXV+R5K4IX0tM+mg1dD1jx0LPowPK7tCDSOqs5euJP1jSPNmVeZLpp\nfPneqCB1AgMBAAECggEAUPxHkIjTS7MhhvBpGjMNrwP15Onhob4d3soROS9KvhBt\nkQfG45tcPTdMNBR4hARGIkb3tMp7JSXtsJDEkxmQytipqf5UpRno0fJOchZd5q8p\nFbIlasnkMdW1m/4wN3nJuEqNoz47zb2nFKzfi6UNpaEcbXyCgXGmJe5JyHGaqyZm\nZtf+w7a57ey66DpbloDZbIgLO+YMElZiz3iRKCmOMp8Av4RzJ6DP5EoxGAPKnxW7\npbaZPMWRkmDr9P+gMjYoRYUyRP2iEg+XDpxIuRBlAma2+6H41CYDXH3EWfhIzz+y\n6CBb8Gg7TrnOwZsJUuHIt3X5bVV/3g+XlE9qKLIsrQKBgQDTizAIQaqJ2yPLVDMY\nS2Pjt/dHLicaFpLRf3tIxdSFBKhw43bIkPqhGKukWJO/w+GnPCPLrUoYdzZqks7b\nrNb57pplneZ1abpKc31h9LLBXMqsfOFoRNQ6rZ5Vs3lqVSYBBjXgV+CO9F1q1E8D\nXf43q9y0PbGutVL8uYBjnaORywKBgQDMs7aX7tBXzpj81eQKPsMXKOdvjJkrtwqB\nAtvQrXZ3WE/t7Fc+1/BreWAlxJL8c7+/yZDCCY4RW83TB3yGvVrfRfNgql99Nbbr\nsk5eHmFil3pwcr3rlG/j2TBQeeYjxekUwhcmfHQboV/rFhSfL2hvl83cSmFJQxip\noCquOUfOvwKBgQC4i8OCYG77Rq6qUjEk75gb78CMW0oHa0v38aPGr7cfuBmOKhHV\nFQ1gfpo2jIOQlr0D3OZJaEqsn0tcm+hUIiuE7E/LeH21TmATVT87tnI/V8kDwwoN\noYYYDqCDmUfBqLi3ygg0R9WCQNJCQScRA+2j+Y1XvD6G8G6ORPIpdTteEwKBgFN+\nPczMuKgH+XivGVtgbByHL5bdJyCggSVL8DK2feqB1+A4lQFp/IMpt6DQBA/6ekyU\nv3mVgh/sbRBVLmKa23TUSEe2Vkpw3VJXoQVcqOYY2PUCqBptqhGqZb19avROZhp0\nbBLjkkwuzzvI/tJK+PMDXREsOXAzcNzHGoGDlZlrAoGBALBtv8O55rQ7pgscO85m\nMCHf/IPLrsyK/1jlUPsgmVf0yFaqdYjXaYANeOoHUDe9vijnI2tOngkO4XzV/g4l\n0uQSrBGX7X8qAp7uCGIIYXJ+YjLaa3fzJ4C9rmOG/IRLAjERzWqbU0vLmuLE2A0R\n8IUvZ/G8kFcmV4WUh2MylztB\n-----END PRIVATE KEY-----\n",
	"client_email": "firebase-adminsdk-cczfz@appkwondo.iam.gserviceaccount.com",
	"client_id": "115771755796174052304",
	"auth_uri": "https://accounts.google.com/o/oauth2/auth",
	"token_uri": "https://accounts.google.com/o/oauth2/token",
	"auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
	"client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-cczfz%40appkwondo.iam.gserviceaccount.com"
}

//var serviceAccount = require("path/to/serviceAccountKey.json");

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: "https://appkwondo.firebaseio.com"
});

var gcmsender = new gcm.Sender('AAAA8NbYOh0:APA91bHMyE-jTX-SX1kROJ-W-t-GSn9wIpyXqGPQOO8LHsLAp-EtO_CXgxGIT_8ic1ccRWDJ8VEiISLmHkayvDLtncd4nebcUh7jDkVUYT9G3IF4etaNvfj1uwBBdRPFT5NgYMZhr-qB');
console.log("GCMSENDER", gcmsender);

var gcm_enabled = true;


/*var FCM = require('fcm-node');


var serverKey = 'AIzaSyDT30ffP_a3HjHTd0Fbk4hi4TvAhseEUwA';
var fcm = new FCM(serverKey);*/


//var tokens = [];

var tokens = [{
	"token": "c3ox917Yeq8:APA91bFZV1lShlM3HPMlBIzd2FihRs7337qYnKl357CNinmmA-tkr9oqpz4ILxVk4DjSNaNTFVhYxG5z4qYLXMyxm9Km9MFM-jOaNlfv_rEu-hi_tvkri3KeHg4bXLb_GsMIZpc2ABJh",
	"deviceid": "1767535d-04f5-1a05-3587-360648030808",
	"count": "0"
}, {
	"token": "exczoFr02_I:APA91bF8SVMG5TOq-tWJXLbYueuhiiNyzmD1hE9R4-FjfjSz-RWwaQJ8N-udy6YBYrpHonBGmr9C8h5vlH1HH8TBNBrR3pdzawDgSNOCFGdBqoGjd0pEewjtz-Z47pCSHGRpvs_4FZaS",
	"deviceid": "50138EE7-9B89-40AF-A057-521D0849828C",
	"count": "0"
}]

function fcmSend(obj, callback) {

	if (!gcm_enabled) {
		callback({
			error: true,
			errmsg: "GCM not enabled"
		});
		return;
	};

	var payload = {
		notification: {
			title: "This is a Notification",
			body: "This is the body of the notification message.",
			sound: "default",
			badge: "6",
			tag: "chatkwondo",
			group: "chatkwondo",
			click_action: "FCM_PLUGIN_ACTIVITY"
		}
	};

	var topic = "chatkwondo";
	var usebadge = true;

	if (obj.hasOwnProperty("title")) payload.notification.title = obj.title;
	if (obj.hasOwnProperty("body")) payload.notification.body = obj.body;
	if (obj.hasOwnProperty("topic")) topic = obj.topic;
	if (obj.hasOwnProperty("badge")) payload.notification.badge = obj.badge;

	if (obj.hasOwnProperty("disablebadge")) {
		if (String(obj.disablebadge)=="true") {
			usebadge = false;
		}

	}


	var options = {
		priority: "high",
		timeToLive: 60 * 60 * 24
	};

	/*

			admin.messaging().sendToTopic(topic, payload)
				.then(function (response) {
					console.log("Successfully sent notification message:", response);

					//SEND SECOND PART FOR ANDROID
					var payload1 = {
						data: {
							badge: payload.notification.badge,
							msgcnt: "3",
							"content-available": '1'
						}
					}
					admin.messaging().sendToTopic(topic, payload1)
						.then(function (response) {
							console.log("Successfully sent data message:", response);
							if (callback) callback(response);
						})
						.catch(function (error) {
							console.log("Error sending data message:", error);
							if (callback) callback(error);
						});
					//if (callback) callback(response);
				})
				.catch(function (error) {
					console.log("Error sending notification message:", error);
					if (callback) callback(error);
				});
	*/



	var success = [];
	var fail = [];

	tokens.forEach(function (item, idx) {
		var tok = item.token;
		if (usebadge) {
			item.count++;
			//payload.token = tok;
			payload.notification.badge = String(item.count);
		} else {
			delete payload.notification.badge;
		}



		admin.messaging().sendToDevice(tok, payload)
			.then((response) => {
				// Response is a message ID string.
				console.log('Successfully sent FCM notification to token', tok);
				var payload1 = {
					data: {
						badge: payload.notification.badge,
						msgcnt: payload.notification.badge,
						"content-available": '1'
					}
				}
				if (usebadge) {
					admin.messaging().sendToDevice(tok, payload1)
						.then((response1) => {
							// Response is a message ID string.
							console.log('Successfully sent FCM data to token', tok);
						})
						.catch((error1) => {
							console.log('Error sending FCM data to token', tok, error1);
						});
				}
			})
			.catch((error) => {
				console.log('Error sending FCM notification to token', tok, error);
			});

	})



	callback({
		completed: true
	})





}


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
			return callback({
				error: res.statusMessage,
				code: 400
			});
		}
		callback(null, resBodyJSON, body.registration_ids || [body.to]);
	});

}


function sendToAll(obj, callback) {

	if (!gcm_enabled) {
		callback({
			error: true,
			errmsg: "GCM not enabled"
		});
		return;
	};

	var resp = [];

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


	console.log("tokens", tokens);

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
			badge: item.count
			/*,
		contentAvailable: 1*/


		});


		//console.log("message", message);

		//message.data.msgcount = item.count;
		console.log("sending gcm message to ", item.token);
		gcmsender.send(message, {
			registrationTokens: [item.token]
		}, function (err, response) {
			if (err) {
				//console.error("error sending gcm", 400);
				console.log("error in gcm response", err);
				//if (callback) callback(err);
				resp.push(err);
			} else {
				console.log("gcm response", response);
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
		callback({
			error: true,
			message: "GCM not enabled"
		});
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
				callback({
					error: res.statusMessage,
					code: 400
				});
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
exports.setTokenCount = setTokenCount;
exports.addToken = addToken;
exports.viewTokens = viewTokens;
exports.getTokens = getTokens;
exports.sendToAll = sendToAll;
exports.sendToToken = sendToToken;
exports.sendToEmail = sendToEmail;
exports.sendHttps = sendHttps;
exports.testGCM = testGCM;
exports.setGcmEnabled = setGcmEnabled;
exports.fcmSend = fcmSend;