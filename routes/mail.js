var nodemailer = require("nodemailer");

var smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "demym13@gmail.com",
        pass: "Ser01glr"
    }
});

var mailobj={
    from: "AppKwonDo", // sender address
    to: "demym@yahoo.it", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world ✔", // plaintext body
    html: "<b>Hello world ✔</b>" // html body
}


function sendTestEmail(){
    sendMail(mailobj,function(data){
        console.log(data);
    })
}

function sendMail(mailobj,callback){

  
    
    // setup e-mail data with unicode symbols
    var mailOptions = {
        from: mailobj.from, // sender address
        to: mailobj.to, // list of receivers
        subject: mailobj.subject, // Subject line
        text: mailobj.text, // plaintext body
        html: mailobj.html // html body
    }
    
    // send mail with defined transport object
    smtpTransport.sendMail(mailOptions, function(error, response){
        if(error){
            console.log(error);
            if (callback) callback(error);
        }else{
            console.log("Message sent: " + response);
            if (callback) callback(response);
        }
    
        // if you don't want to use this transport object anymore, uncomment following line
        //smtpTransport.close(); // shut down the connection pool, no more messages
    });



}


exports.sendTestEmail=sendTestEmail;
exports.sendMail=sendMail;

// create reusable transport method (opens pool of SMTP connections)
