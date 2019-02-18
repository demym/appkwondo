var FCM = require('fcm-node');

var serverKey = 'AAAA8NbYOh0:APA91bHMyE-jTX-SX1kROJ-W-t-GSn9wIpyXqGPQOO8LHsLAp-EtO_CXgxGIT_8ic1ccRWDJ8VEiISLmHkayvDLtncd4nebcUh7jDkVUYT9G3IF4etaNvfj1uwBBdRPFT5NgYMZhr-qB';
var DeviceRegistrationToken = 'reg-token';
var topic1 = '/topics/chatkwondaz';
var fcm = new FCM(serverKey);

var message = { 
 to: topic1,  // either DeviceRegistrationToken or topic1
 notification: {
     title: 'Test message', 
     body: 'Hello Nodejs' 
 },
 data: {
 	title: 'Test message data',
 	body: "Hello Nodejs data"
 }

};

exports.send=function(){
fcm.send(message, function(err, response){
if (err) {
    console.log(err);
} else {
       console.log("Successfully sent with response: ", response);
    }
 });
}



