const zmq = require('zeromq');


const client_channel = zmq.socket('router');
const worker_channel = zmq.socket('dealer');

const { MQHOST, MQPORT_CLIENT, MQPORT_WORKER } = process.env;

const client = `tcp://${MQHOST}:${MQPORT_CLIENT}` || 'tcp://*:5000';
const worker  = `tcp://${MQHOST}:${MQPORT_WORKER}` || 'tcp://*:6000';


client_channel.on('message', (...message) => {
  worker_channel.send(message);
});

worker_channel.on('message', (...message) => {
  client_channel.send(message);
});


client_channel.bindSync(client);
worker_channel.bindSync(worker);

process.on('SIGINT', () => {
  //log here
  client_channel.close();
  worker_channel.close();
});
