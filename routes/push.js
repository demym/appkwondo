/*

IBM Business Partner Ecosystem Italia
Licensed Materials - Property of IBM
© Copyright IBM Corporation 2017   
All Rights Reserved

*/


var express = require('express');
var router = express.Router();
var gcm = require('node-gcm');
 
var api_key="AIzaSyAMGARow-zXeAOVSfrI2jETrR2NVXMDZno"; 
var regid="APA91bHcdndUGSOACuyFQcivWyqHjOjwgsoWr2WiQ5P7CxTuB6YchRdYh4mVxwqbynDJGNrbK6-7fhuI0xVZ3SLKQ_O65wPenN5_5YZoXvoeN_SibIdbVjWEw6IQG-RxQjL3tGWKo1c4"; 
 

router.get("/",function(req,res){
	
	sendGCM(function(data) {
		
		res.send(data);
	});
	
	
}); 
 
 
function sendGCM(callback) {
	
var message = new gcm.Message({
	
	data: {
        key1: 'message1',
        key2: 'message2'
    },
    notification: {
        title: "Hello, World",
        icon: "ic_launcher",
        body: "This is a notification that will be displayed ASAP."
    }
});
/*
var message = new gcm.Message({
    collapseKey: 'demo',
    priority: 'high',
    contentAvailable: true,
    delayWhileIdle: true,
    timeToLive: 3,
	
    restrictedPackageName: "somePackageName",
    dryRun: true,
    data: {
        key1: 'message1',
        key2: 'message2'
    },
    notification: {
        title: "Hello, World",
        icon: "ic_launcher",
        body: "This is a notification that will be displayed ASAP."
    }
});
*/
 
//message.addData('key1', 'msg1');
 
var regTokens = ['flHZUR3Cqow:APA91bHOmBjbz0gEQSha7M20mU4CqYvijN8hnxaGnDCMSu9Ze7DMDYzhxO3xTB1LmPyeF2oWfnTc_ucU7s8w3dX7tk6Z9IB3MVEyUdD-UG9kTY_53d82BBGZgJR-sqSgGfTBOdZylGox','APA91bGLmjFzADrqpT-eyx-o4i9_bfLiyiAqdzxtFN9G47K39wUYHBsoNQXCP7Fi42tVx0jWUDpRjJV7mK3YNTX-ww1mz7lDPqhDBJCxdgLD12hF6jb7nbRpIjkrHHBMGzCXQM_chD90',
regid];

console.log("registered tokens:",regTokens.length);
 
// Set up the sender with you API key 
var sender = new gcm.Sender(api_key);
 
// Now the sender can be used to send messages 
sender.send(message, { registrationTokens: regTokens }, function (err, response) {
	
	var data={};
	
	if(err) {
		console.log("error !")
		console.error(err);
		data=err
	}
	else {
		console.log("OK")
		console.log(response);
		data=response;
	}	
	if (callback) callback(data);
});
 
// Send to a topic, with no retry this time 
/*sender.sendNoRetry(message, { topic: '/topics/global' }, function (err, response) {
	if(err) console.error(err);
	else {
		console.log(response);
		
	}	
});*/

}



module.exports = router;



