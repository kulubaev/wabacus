
const redis = require('redis');
const zmq = require('zeromq');

const { Pipeline, jsonMiddleware, config, constants }  = require('megasoft-shared');
const { host, port } = config; 

/**
 *@description importing arithmetic operation related constants
 *
 */
const {
  DIVIDE,
  PRODUCT,
  SUM,
  DEDUCT,
  FACTORIAL,
  CUBE_ROOT,
  SQUARE_ROOT,
  POWER
} = constants; 

/**
 *@description importing arithmetic opreations
 *
 */

const {


  subtract,
  product,
  divide,
  sum,
  power,
  squareRoot,
  cubeRoot,
  factorial
} = require('./arithmetics');


/**
 * @description instantiating connection to redis server
 *
 * @param {string} host - server name  
 * #param {number} port - server port 
 * @param {number} retry_strategy - the number in ms to retry in case of ordeal
 */

/*
const cache = redis.createClient({
  host,
  port
});
*/

/**
 *@description  per redis requirement we need to use two distinct instances ala subsctiption, operations.
 *
 */
/*
const  subscription  = cache.duplicate(); 


*/

const channel = zmq.socket('rep');
channel.bind(`${host}:${port}`);

const pipeline = new Pipeline(channel);
pipeline.use(jsonMiddleware());

pipeline.use({
  inbound: (message, next) => {
    /*
     * @description implement pub/sub pattern within redis
     *
     * @param {string} channel - channel name where the message emitts from
     * @param {string} message - message body 
     */

    const { id, op, x } = message.data;
    let result;

    try{
      switch(op) {
        case SUM:
         pipeline.send({...message.data, result: sum({x: parseInt(x), y: parseInt(message.data.y)}), success:true});
        break;

        case DIVIDE:
          pipeline.send({...message.data, result: divide({x: parseInt(x), y: parseInt(message.data.y)}), success:true});
          break;

        case PRODUCT:
          pipeline.send({...message.data, result: product({x: parseInt(x), y: parseInt(message.data.y)}), success:true});
          break;

        case DEDUCT:
          pipeline.send({...message.data, result: subtract({x: parseInt(x), y: parseInt(message.data.y)}), success:true});
          break;

        case POWER:
          pipeline.send({...message.data, result: power({x: parseInt(x), n: parseInt(message.data.n)}), success:true});
          break;

        case FACTORIAL:
          pipeline.send({...message.data, result: factorial({x: parseInt(x)}), success:true});
          break;

        case SQUARE_ROOT:
          pipeline.send({...message.data, result: squareRoot({x: parseInt(x)}), success:true});
          break;

        case CUBE_ROOT:
          pipeline.send({...message.data, result: cubeRoot({x: parseInt(x)}), success:true});
          break;

        default:
          pipeline.send({...message.data, success:false, error: 'given arithmetical operation can not be recongnized'});
      }
    }

    catch(error) {
      pipeline.send({...message.data, success:false, error});
    };

    next();
  }
});

/**
 *@description subscribe to listen any event when a new entry will be added to redis
 *@param {strind} 'insert' - name of new value added event
 */
/*
subscription.subscribe(
  SUM, 
  DIVIDE, 
  SUBTRACT,
  PRODUCT
);
*/
