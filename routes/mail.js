var nodemailer = require("nodemailer");
var mongo = require('../routes/mongo');

var smtpTransport;

mongo.getfile("config.json", function (data) {
    console.log("got config",data);
    var doc=data.rows[0].doc.smtp;
    
    var auth = {
        user: doc.email,
        pass: doc.pass
    }

    smtpTransport = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: doc.email,
            pass: doc.pass
        }
    });

    console.log("smtp configured !");
})






var mailobj = {
    from: "AppKwonDo <appkwondo@tkdr.org>", // sender address
    to: "demym@yahoo.it", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world ✔", // plaintext body
    html: "<b>Hello world ✔</b>" // html body
}


function sendTestEmail() {

    sendMail(mailobj, function (data) {
        console.log(data);
    })
}

function sendMail(mailobj, callback) {



    // setup e-mail data with unicode symbols
    var mailOptions = {
        from: mailobj.from, // sender address
        to: mailobj.to, // list of receivers
        subject: mailobj.subject, // Subject line
        text: mailobj.text, // plaintext body
        html: mailobj.html // html body
    }

    // send mail with defined transport object
    smtpTransport.sendMail(mailOptions, function (error, response) {
        if (error) {
            console.log(error);
            if (callback) callback(error);
        } else {
            console.log("Message sent: " + response);
            if (callback) callback(response);
        }

        // if you don't want to use this transport object anymore, uncomment following line
        //smtpTransport.close(); // shut down the connection pool, no more messages
    });



}


exports.sendTestEmail = sendTestEmail;
exports.sendMail = sendMail;

// create reusable transport method (opens pool of SMTP connections)
