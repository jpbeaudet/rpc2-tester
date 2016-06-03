// Author: Jean-Philippe Beaudet @ S3R3NITY Technology
// 
// RPC2-tester
// Version : 1.1
// License: 
//
// Route used for client config and call:

// #callback will parse result and render if in callback section 
// (callback will eventually be provided directly and parsed into functuiion and promise of returned nb of argument but i dont need it rigth now)
// # status will be determine if there is an error , or a bad status response fomr the rpc server
// # client will be a string constructor representing the actual javascript client server configuration
// # call will be a string constructor representing the actual method that was called in javascript
// example function builder object : var adder = new Function("a", "b", "return a + b");
// =====================================================
var client = require('../scripts/rpc-client')
var argsParse = require('../scripts/args')

exports.call = function (req, res){
	
	// parse argument dynamically
	var args = argsParse.argparse( req.body)
	// testing if all type are corrects
	for (y = 0; y < args.length; y++) {
		console.log("arg type for: "+ args[y])
		console.log(typeof(args[y]))
	}
	
	// load form data
	var form = {
		"rpc_host": req.body.rpc_host,
		"rpc_port": req.body.rpc_port,
		"rpc_method": req.body.rpc_method,
		"rpc_args1": req.body.rpc_args1,
		"type1": req.body.type1,
		"rpc_args2": req.body.rpc_args2,
		"type2": req.body.type2,
		"rpc_args3": req.body.rpc_args3,
		"type3": req.body.type3,
		"args":[]
	}
	req.session.form = form
	//console.log(JSON.stringify(form))
	
	var _cb= function(results, client_string, call_string, message, status){
		// set response object
		var data = {
			title: " RPC2-Tester ",
			callback: results || "No results",
			status: status,
			message: message,
			client: client_string,
			call: call_string
		};
		req.session.data = data

		// load back index page
		res.redirect('/');
	}
	client.call(form, _cb)
};
