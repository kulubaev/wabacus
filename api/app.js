const express = require('express');
const zmq = require('zeromq');
const { Pipeline, jsonMiddleware, config } = require('megasoft-shared');

const { port, host } = config;

console.log(host, port);
console.log(`${host}:${port}`);

const channel = zmq.socket('req');
channel.connect(`${host}:${port}`);

console.log(Pipeline);

const pipeline = new Pipeline(channel);

pipeline.use(jsonMiddleware());
pipeline.use({
  inbound:(message, next) => {
    console.log('echoing:' + message.data)
  }
});





module.exports = zmq;
