// Author: Jean-Philippe Beaudet @ S3R3NITY Technology
// 
// RPC2-tester
// Version : 0.0.1
// License: 
//
// =====================================================

var express = require('express');
var http = require('http');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var logger = require('morgan');


//main config
var app = express();
config = require('./scripts/config.js');

var server = require('http').createServer(app);
app.set('port', process.env.PORT || config.NODE_PORT);
app.set('views', path.join(__dirname + '/views'));
app.set('view engine', 'jade');
app.set('view options', { layout: true });

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(require('express-session')({
    secret: 'rpc2-tester_secret',
    resave: false,
    saveUninitialized: false
}));

app.use(express.static(path.join(__dirname, 'public')));

// routes
require('./routes/routes')(app);
console.log(("Express server listening on port " + app.get('port')));

server.listen(config.NODE_PORT);

