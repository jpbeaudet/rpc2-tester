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
		callback: "Callback results",
		status: "_DEFAULT",
		form: {}
		};
	}
	if(req.session.form){
		data.form=req.session.form
		data.form.rpc_host=JSON.stringify(req.session.form.rpc_host).replace(/"/g,"")
		data.form.rpc_port=JSON.stringify(req.session.form.rpc_port).replace(/"/g,"")
		data.form.rpc_method=JSON.stringify(req.session.form.rpc_method).replace(/"/g,"")
		data.form.rpc_args1=JSON.stringify(req.session.form.rpc_args1).replace(/"/g,"")
		data.form.rpc_args2=JSON.stringify(req.session.form.rpc_args2).replace(/"/g,"")
		data.form.rpc_args3=JSON.stringify(req.session.form.rpc_args3).replace(/"/g,"")
	}
	res.render('index/index', data);
};
