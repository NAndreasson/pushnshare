var express = require('express');
var http = require('http');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');

var db = require('./db');
var config = require('./config');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(app.router);

var auth = express.basicAuth(function(username, password) {
  return password === config.password;
});

app.get('/:id', function(req, res) {
  var id = req.params.id;
  db.getFile(id, function(err, file) {
    res.send(file.data);
  });
});

app.post('/', auth, function(req, res) {
  var name = req.body.name;
  db.addFile(name, function(err, result) {
    res.send(result[0]._id);
  });
});

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  console.log('Fail');
});


module.exports = app;
