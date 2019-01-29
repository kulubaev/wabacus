
const zmq = require('zeromq');

const Pipeline = require('../middleware');
const jsonMiddleware = require('../middleware/json');
const routeMiddleware = require('../middleware/route');

const store = require('../store');
const persistMiddleware = require('../middleware/persist');

const config = require('../static/.env');

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

