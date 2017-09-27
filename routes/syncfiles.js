var express = require('express');
var fs=require("fs")
var path=require("path")
var router = express.Router();

var DOWNLOAD_DIR = './data/media/';



router.get("getmediafiles",function(req,res) {
	
	var url="http://demym.altervista.org/herokudata/cronacamedia/";
	
	var fname="20160404102538_20160413205359.m4a";
	
	
	
	downloadhttpfile(url+fname);
	
});


function getFiles (dir, files_){
    files_ = files_ || [];
    var files = fs.readdirSync(dir);
    for (var i in files){
        var name = dir + '/' + files[i];
        if (fs.statSync(name).isDirectory()){
            //getFiles(name, files_);
        } else {
            files_.push(name);
        }
    }
    return files_;
}


function downloadhttpfile(file_url) {
var options = {
    host: url.parse(file_url).host,
    port: 80,
    path: url.parse(file_url).pathname
};

var file_name = url.parse(file_url).pathname.split('/').pop();
var file = fs.createWriteStream(DOWNLOAD_DIR + file_name);

http.get(options, function(res) {
    res.on('data', function(data) {
            file.write(data);
        }).on('end', function() {
            file.end();
            console.log(file_name + ' downloaded to ' + DOWNLOAD_DIR);
        });
    });
};


module.exports = router;