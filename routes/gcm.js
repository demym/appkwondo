

var gcm = require('node-gcm');
var dbs = require("../routes/dbs");
var request = require('request');
var mongo = require('../routes/mongo');
var admin = require("firebase-admin");


var gcmsender;

mongo.getfile("config.json", function (data) {
    console.log("got config",data);
    var doc=data.rows[0].doc;
    var gcmaccount=doc.gcmaccount;
    admin.initializeApp({
	credential: admin.credential.cert(gcmaccount),
	databaseURL: "https://appkwondo.firebaseio.com"
});
    
    gcmsender = new gcm.Sender(doc.gcmsender);
    console.log("GCMSENDER", gcmsender);
    console.log("GCM configured !");
})










/*var gcms=process.env.GCM_SENDER;
var gcmsender = new gcm.Sender(gcms);*/


var gcm_enabled = true;



var tokens = [];

var mytokens = [{
	"token": "c3ox917Yeq8:APA91bFZV1lShlM3HPMlBIzd2FihRs7337qYnKl357CNinmmA-tkr9oqpz4ILxVk4DjSNaNTFVhYxG5z4qYLXMyxm9Km9MFM-jOaNlfv_rEu-hi_tvkri3KeHg4bXLb_GsMIZpc2ABJh",
	"deviceid": "1767535d-04f5-1a05-3587-360648030808",
	"count": "0"
}, {
	"token": "exczoFr02_I:APA91bF8SVMG5TOq-tWJXLbYueuhiiNyzmD1hE9R4-FjfjSz-RWwaQJ8N-udy6YBYrpHonBGmr9C8h5vlH1HH8TBNBrR3pdzawDgSNOCFGdBqoGjd0pEewjtz-Z47pCSHGRpvs_4FZaS",
	"deviceid": "50138EE7-9B89-40AF-A057-521D0849828C",
	"count": "0"
}]

tokens = mytokens;


mongo.getfile("gcmtokens.json",function(data){
	tokens=data.rows;
	console.log("Retrieved GCM tokens from mongo");
})



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
		if (String(obj.disablebadge) == "true") {
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




function fcmSendMsg(obj, callback) {



	console.log("fcmSendMsg",obj);

	tokens.forEach(function (item, idx) {
		var tok = item.token;
		item.count++;
		var count = String(item.count);


		var payload1 = {
			data: {
				

				badge: count,
				msgcnt: count,

				"content-available": '1'
			}
		}

		admin.messaging().sendToDevice(tok, payload1)
			.then((response1) => {
				// Response is a message ID string.
				console.log('Successfully sent FCM data to token', tok);
			})
			.catch((error1) => {
				console.log('Error sending FCM data to token', tok, error1);
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
	tokens = newtokens;
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


function saveTokens(callback){

	mongo.updatefile("gcmtokens.json",tokens,function(data){
		if (callback) callback(data)

	})
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
exports.fcmSendMsg=fcmSendMsg;
exports.saveTokens=saveTokens;