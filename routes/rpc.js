// Author: Jean-Philippe Beaudet @ S3R3NITY Technology
// 
// RPC2-tester
// Version : 0.0.1
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

exports.call = function (req, res) {
	
	// parse argument dynamically
	var args = _parse_args(req.body)
	console.log("args array: "+ args)
	args = _parse_types(args)
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

// Private functions
////////////////////////
function _parse_args(body){
	var x =1
	var args =[]
	Object.keys(body).forEach(function (key) {
		
	// do something with obj[key]
	if(key == "rpc_args"+x){
		args.push(body[key])
		console.log(body[key])
		x=x+1   
	}
	});
	return args
}

function _parse_types(args){
	for (i = 0; i < args.length; i++) {
		var isInt = _isNormalInteger(args[i])
		var isFloat = _isNormalFloat(args[i])
		var isArray = _isNormalArray(args[i])
		var isJson = _isNormalJsonObject(args[i])
		switch(true) {
		case isInt:
			// is an integer
			args[i]= parseInt(args[i]);
			console.log("is an integer: "+typeof(args[i]))
			break;
		case isFloat:
			// Is a float
			args[i]= parseFloat(args[i]);
			console.log("Is a float: "+typeof(args[i]))
			break;
		case isArray:
			// Is an array
			var tmp = args[i]
			tmp= tmp.replace(tmp.charAt(0),"")
			tmp= tmp.replace(tmp.charAt(tmp.length-1),"")
			args[i]= _parse_types(tmp.split(","))
			console.log("Is an Array: "+typeof(args[i]))
			break;
		case isJson:
			// Is a Json object
			args[i]= JSON.stringify(eval("(" + args[i] + ")"))
			console.log("Is a Json object: "+typeof(args[i]))
			break;
		default:
			// is a string
			args[i]= args[i]
			console.log("is a string: "+typeof(args[i]))
			break;
		}
		if(i==(args.length-1)){
			return args
		}
	}
}
function _isNormalInteger(str) {
	var n = ~~Number(str);
	return String(n) === str && n >= 0;
}
function _isNormalFloat(str) {
	return !isNaN(str) && str.toString().indexOf('.') != -1
}
function _isNormalJsonObject(str) {
	try {
		JSON.parse(str);
	} catch (e) {
		return false;
	}
	return true;
}
function _isNormalArray(str) {
	var first = str.charAt(0)
	var last = str.slice(-1);
	if (first =="[" && last == "]" && str.split(",").length > 0){
			return true
	}else{
		return false
	}
}
