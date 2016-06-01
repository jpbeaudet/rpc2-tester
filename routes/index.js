// Author: Jean-Philippe Beaudet @ S3R3NITY Technology
// 
// RPC2-tester
// Version : 0.0.1
// License: 
//
// =====================================================

exports.index = function (req, res) {
	var data = {
		title: " RPC2-Tester | Dummy tester for json-rpc2 methods",
	};
	res.render('index/index', data);
};
