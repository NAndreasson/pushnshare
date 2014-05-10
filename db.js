var mongo = require('mongodb');

var Server = mongo.Server;
var Db = mongo.Db;
var BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, { auto_reconnect: false });
var db = new Db('pushnshare', server);

db.open(function(err, db) {
});

exports.getFile = function(id, cb) {
  db.collection('files', function(err, collection) {
    collection.findOne({ '_id': new BSON.ObjectID(id) }, cb);
  });
}; 

exports.addFile = function(file, cb) {
  db.collection('files', function(err, collection) {
    collection.insert({ data: file }, { safe: true }, cb);
  });
};
