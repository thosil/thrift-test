all: nodejs

nodejs: gen-nodejs/Messager.js

gen-nodejs/Messager.js:
	thrift -r -o . --gen js:node schemas/example.thrift
