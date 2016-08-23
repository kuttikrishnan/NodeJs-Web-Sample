//https://groups.google.com/forum/?utm_medium=email&utm_source=footer#!msg/mongodb-user/1TcZ5OV_qdY/pfmNb1rvCAAJ

var mclient = require('mongodb').MongoClient;
var dburl = 'mongodb://localhost:27017/libraryApp';

module.exports.connect = function connect(callback) {
    mclient.connect(dburl, function(err, conn){
        module.exports.db = conn;
        callback(err);
    });
};
