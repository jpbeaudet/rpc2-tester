# rpc2-tester
##### Dummy dashnoard to test json-rpc client and methods

#### Version: 1.0
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

####### Nota:
You migth have to explicitly permit cross origin connection(Access-Control-Allow-Origin to * or explicitly the url you made for the tester) to test your rpc-server depending on your settings.
```
var server = rpc.Server.$create({
    'websocket': true, // is true by default 
    'headers': { // allow custom headers is empty by default 
        'Access-Control-Allow-Origin': '*'
    }
});

```
