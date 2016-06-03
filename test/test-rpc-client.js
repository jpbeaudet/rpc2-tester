// Author: Jean-Philippe Beaudet @ S3R3NITY Technology
// 
// RPC2-tester
// Version : 1.1
// License: 
//

var chai = require('chai');
var should = require('chai').should()
var rpc = require('json-rpc2');
var client = require('../scripts/rpc-client')

// Create a dummy test server
var server = rpc.Server.$create({
    'websocket': true, // is true by default 
    'headers': { // allow custom headers is empty by default 
        'Access-Control-Allow-Origin': '*'
    }
});

// expose a dummy method for testing 
function add(args, opt, callback) {
  callback(null, args[0] + args[1]);
}
server.expose('add', add);

// Listen on default value
server.listen(80, 'localhost');

describe('#client.call', function() {
	
	it('connect/return results', function() {
		//load dummy form data
		var form = {
			"rpc_host": "",
			"rpc_port": "",
			"rpc_method": "add",
			"rpc_args1": 1,
			"type1": "integer",
			"rpc_args2": 1,
			"type2": "integer",
			"rpc_args3": "",
			"type3": ""
		}
		var _cb= function(err, result){
			if (err){ throw err}
			result.should.equal(2);
		}
		client.call(form, _cb)
	});
	
	it('return err message', function() {
		//load dummy form data with wrong host and port
		var form = {
			"rpc_host": "567",
			"rpc_port": "7777",
			"rpc_method": "add",
			"rpc_args1": 1,
			"type1": "integer",
			"rpc_args2": 1,
			"type2": "integer",
			"rpc_args3": "",
			"type3": ""
		}
		var _cb= function(err, result){
			if (err){ err.message.should.equal("Have no response object");
				}
		}
		client.call(form, _cb)
	});
});
