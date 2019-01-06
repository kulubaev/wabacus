
const zmq = require('zeromq');

const { 
  Pipeline, 
  jsonMiddleware, 
  routeMiddleware,
  config } = require('megasoft-shared');

const { port, host } = config;

const channel = zmq.socket('req');
channel.connect(`${host}:${port}`);


const pipeline = new Pipeline(channel);
const cache = new WeakMap();

pipeline.use(jsonMiddleware());
pipeline.use(routeMiddleware(cache));




exports.pipeline = pipeline;
exports.cache = cache;
exports.zmq = zmq;

