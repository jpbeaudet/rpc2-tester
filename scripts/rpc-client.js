// Author: Jean-Philippe Beaudet @ S3R3NITY Technology
// 
// RPC2-tester
// Version : 0.0.1
// License:
// rpc-client module
//
// Model to build
// var rpc = require('json-rpc2');
// client = rpc.Client.$create(8000, 'localhost');
// Call add function on the server 
// client.call('add', [1, 2], function(err, result) {
//   console.log('1 + 2 = ' + result);
// });
///////////////////////////////////////////////////////////


var rpc2 = require('json-rpc2');


module.exports= {
	"call": function(form, callback){
		
		// setting default value
		var HOST = form.rpc_host || 'localhost'
		var PORT = form.rpc_port || '80'
		var METHOD =  form.rpc_method || "NoName"
		var ARGS1 = form.rpc_args1 || ""
		var ARGS2 = form.rpc_args2 || null
		var ARGS3 = form.rpc_args3 || null
		var parameters = [ARGS1]
		
		// setting up rpc client
		var client = rpc2.Client.$create(PORT, HOST);
		var client_string='var client = rpc2.Client.$create('+PORT+','+HOST+')'
		
		// setting up strings for screen
		var call_string='client.call('+METHOD+', ['+ARGS1
		if(ARGS2 != null){
			call_string+=','+ARGS2
			parameters.push(ARGS2)
		}
		if(ARGS3 != null){
			var argsss3 = ARGS3.split("~")
			for (var i = 0; i < argsss3.length; i++) { 
			call_string+=','+argsss3[i]
			parameters.push(argsss3[i])
			}
		}
		call_string+="], function(err, result){callback(result);})"

		// actually call the method
		var status= "_DEFAULT"
		try {
			client.call(METHOD, parameters, function(err, result) {
				var message = "Message:  "+ METHOD+" sent response. "
				if(err){
					message = "Reason:  "+ err.message
					status = "_ERROR"
				}else{
					status = "_SUCCESS"
				}
				callback(result, client_string, call_string, message, status);
			});
		}
		catch(err) {
			var message= "Reason:  "+ err.message
			status = "_REFUSED"
			callback(err, client_string, call_string, message, status)
		}
	},



}
