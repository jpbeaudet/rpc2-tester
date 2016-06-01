// Author: Jean-Philippe Beaudet @ S3R3NITY Technology
// 
// RPC2-tester
// Version : 0.0.1
// License: 
//
// =====================================================

var express = require('express');
var index = require('../routes/index');

module.exports = function (app) {
	
	//Main routes
	///////////////////////////
	app.get('/', index.index);

	
	// error handlers
	/////////////////////////////////
	// catch 404 and forward to error handler
	app.use(function(req, res, next) {
	    var err = new Error('Not Found');
	    err.status = 404;
	    next(err);
	});
	
	// development error handler
	// will print stacktrace
	if (app.get('env') === 'development') {
	    app.use(function(err, req, res, next) {
	        res.status(err.status || 500);
	        res.render('index/error', {
	            message: err.message,
	            error: err
	        });
	    });
	}

	// production error handler
	// no stacktraces leaked to user
	app.use(function(err, req, res, next) {
	    res.status(err.status || 500);
	    res.render('index/error', {
	        message: err.message,
	        error: {}
	    });
	});
};

