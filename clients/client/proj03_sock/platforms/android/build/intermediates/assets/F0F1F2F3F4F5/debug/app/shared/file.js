var fs = require("file-system");



exports.writeJsonFile = function (fname, json, callback) {

    var documents = fs.knownFolders.documents();
    var path = fs.path.join(documents.path, fname);
    var file = fs.File.fromPath(path);

    // Writing text to the file.
    var sjson = JSON.stringify(json);

    file.writeText(sjson)
        .then(function () {
            if (callback) callback({ filename: fname, operation: "write", success: true })
        }, function (error) {
            // Failed to write to the file.
            if (callback) callback({ filename: fname, operation: "write", success: false, error: error })
        });
}

fileExists = function (fname) {

    var documents = fs.knownFolders.documents();
    var filePath = fs.path.join(documents.path, fname);
    var exists = fs.File.exists(filePath);
    return exists;
}

exports.readJsonFile = function (fname, callback, defaultjson) {
    var documents = fs.knownFolders.documents();

    if (!fileExists(fname)) {
        var retvalue=[];
        if (defaultjson) retvalue=defaultjson;
        if (callback) callback(retvalue);
        return;
    }

    var myFile = documents.getFile(fname);

    myFile.readText()
        .then(function (content) {
            // Successfully read the file's content.
            //console.log(content);
            if (callback) callback(JSON.parse(content));
        }, function (error) {
            // Failed to read from the file.
            if (callback) callback({ success: false, error: error })
        });
}

exports.colog = function () {
    var dbg = debugActive;
    if (!dbg) return;
    console.log.apply(console, arguments);
}


exports.fileExists=fileExists;