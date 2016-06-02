// Author: Jean-Philippe Beaudet @ S3R3NITY Technology
// 
// RPC2-tester
// Version : 0.0.1
// License: 
//
// =====================================================

exports.index = function (req, res) {
	var data;
	if(req.session.data){
		data = req.session.data
		req.session.data = null;
	}else{
		var data = {
		title: " RPC2-Tester ",
		subtitle: "Dummy tester for json-rpc2 methods",
		results: "Results will appear here.",
		callback: "Callback argument value",
		status: "_DEFAULT"
		};
	}
	res.render('index/index', data);
};
