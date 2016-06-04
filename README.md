# rpc2-tester
##### Dummy dashnoard to test json-rpc client and methods

###### Description:
An alternative to [Guru JSON-RPC Tester](http://gurujsonrpc.appspot.com/ "GuruRpctester") or postman for easy rpc2 method testing on any rpc server endpoint.

#### Version: 1.1
##### Dependencies:

###### Node.js

* json-rpc2 : "1.0.2"
* unit-test : "0.0.9"
* chai : "3.5.0"

###### Usage:
* Clone the repo
* Modify the config to listen to your desired port and host
* Go to repo root location and type: node app.js
* Go the the url and port
* Enter your rpc2 server url(default localhost) in the form
* enter your rpc2 server port
* Enter the rpc methods name
* enter parameters field
* Click send and wait for the answer (callback results will be rendered in string/json)

###### Nota:
You migth have to explicitly permit cross origin connection(Access-Control-Allow-Origin to * or explicitly the url you made for the tester) to test your rpc-server depending on your settings.
```
var server = rpc.Server.$create({
    'websocket': true, // is true by default 
    'headers': { // allow custom headers is empty by default 
        'Access-Control-Allow-Origin': '*'
    }
});

```
###### License:
Open Source
GNU Public License

###### Contributors are welcome!!

###### Todos: 
* ~~Parse incoming argument and and morph them to correspondin data type, int, float,object,functions(default string)~~
* Add the dynamic boxes for unlimited args possibility
* add response objects(shows response parameters value and size)
* show the response bytes size
* Make a separate result section for result and error
* allow a textarea to copy/paste the client call directly 
* Add a manual callback method box and function parser to test callback reactions
* Add other rpc protocol as options
* Make a version 2.0 with below todos and push it to npm
* Any other cleaver addons that you will find useful!!
