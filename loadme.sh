#!/bin/bash

function load() {
for i in {1..100}; do 
    echo "client $i"
    node client.js & 
done
}
wait
time load
