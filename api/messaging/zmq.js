
const zmq = require('zeromq');

const { 
  Pipeline, 
  store,
  jsonMiddleware, 
  routeMiddleware,
  persistMiddleware ,
  config } = require('megasoft-shared');

console.log(persistMiddleware);

const { zmqPort, zmqHost } = config;
const { pool } = store;

const channel = zmq.socket('req');
channel.connect(`${zmqHost}:${zmqPort}`);


const pipeline = new Pipeline(channel);
const cache = new WeakMap();

pipeline.use(jsonMiddleware());
pipeline.use(routeMiddleware(cache));
pipeline.use(persistMiddleware(store));




exports.pipeline = pipeline;
exports.cache = cache;
exports.zmq = zmq;

