var thrift = require("thrift");
var Messager = require("./gen-nodejs/Messager.js");
var ttypes = require("./gen-nodejs/example_types.js");

var transport = thrift.TBufferedTransport;
var protocol = thrift.TBinaryProtocol;

//var connection = thrift.createConnection("localhost", 9090, {transport: transport, protocol: protocol});
var connection = thrift.createConnection(0, '/tmp/messager.em', {transport: transport, protocol: protocol});
//var connection = thrift.createConnection(0, '/tmp/messager.em');

connection.on('error', function(err){
    console.log("Got error: " + err);
});

var client = thrift.createClient(Messager, connection);
var myid = 0;
var maxid = 100;

var interval = setInterval( function() {
    //console.log("sending new message, id: " + myid);
    var msg = new ttypes.Message({id: myid++, name: "toto", desc: "hello world!"});
    client.send(msg, function(err){
        if(err){
            console.log("send got errors for id " + msg  + ", booohoo: " + err);
            return;
        }
    });
    if (myid > maxid) {
        process.exit(0);
    }
}, 1);

process.on('exit', function(code) {
    clearInterval(interval);
    connection.end();
    console.log("sent " + myid + " messages");
});
