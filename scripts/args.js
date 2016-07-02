// Author: Jean-Philippe Beaudet @ S3R3NITY Technology
// 
// RPC2-tester
// Version : 1.1
// License:
// arg parse module

module.exports= {
	"argparse": function(body){
		var args = this._parse_args(body)
		console.log("args array: "+ args)
		args = this._parse_types(args)
		args = args.filter(Boolean)
		console.log("final args: "+args)
		return args
	},
	"_parse_args": function (body){
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
	},
	"_parse_types": function (args){
		for (i = 0; i < args.length; i++) {
			var isInt = this._isNormalInteger(args[i])
			var isFloat = this._isNormalFloat(args[i])
			var isArray = this._isNormalArray(args[i])
			var isJson = this._isNormalJsonObject(args[i])
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
				args[i]= this._parse_types(tmp.split(","))
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
	},
	"_isNormalInteger": function (str) {
		var n = Number(str);
		return String(n) === str && n >= 0;
	},
	"_isNormalFloat": function (str) {
		return !isNaN(str) && str.toString().indexOf('.') != -1
	},
	"_isNormalJsonObject":function (str) {
		try {
			JSON.parse(str);
		} catch (e) {
			return false;
		}
		return true;
	},
	"_isNormalArray": function (str) {
		var first = str.charAt(0)
		var last = str.slice(-1);
		if(first =="[" && last == "]" && str.split(",").length > 0){
				return true
		}else{
			return false
		}
	}
}
