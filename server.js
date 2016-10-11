var fs = require("fs");
var thrift = require("thrift");
var Messager = require("./gen-nodejs/Messager.js");
var ttypes = require("./gen-nodejs/example_types.js");
var transport = thrift.TBufferedTransport;
var protocol = thrift.TBinaryProtocol;
var socket_name = "/tmp/messager.em";
var msg = 0;

function clean_socket(socket_name) {
    try {
       fs.unlinkSync(socket_name);
    }catch(e){
        console.log("...");
    }
}

var server = thrift.createServer(Messager, {
    send: function(message) {
        //console.log(msg++ + ": " + message.id);
    }
}, {transport: transport, protocol: protocol}
);

server.on("error", function(err){
    if(err.errno === "ECONNRESET"){
        return;
    }
    console.log(err);
});

clean_socket(socket_name);
server.listen(socket_name);
process.on("exit", function(code){
    clean_socket(socket_name);
});
