# Thrift test

Simple client server test using [thrift](https://thrift.apache.org/)

# Install it

* clone me
* `npm install`
* `make`

# Using it

From one terminal:

    node server.js


From another one

    node client.js

`client.js `will send 100 messages to `server.js` using a unix socket.

# Hack it

Models and services are defined in [example.thrift](./schemas/example.thrift) (obviously in thrift format).  
Running `make` will build the `gen-nodejs/*` files that will be used by both client and server
