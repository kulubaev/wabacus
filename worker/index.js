
const zmq = require('zeromq');


const Pipeline = require('./middleware');
const jsonMiddleware = require('./middleware/json');

const { zmqPort, zmqWHost } = require('./static/.env');
const { txtmanage } = require('./utils');
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
} = require('./static/constants'); 

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
channel.bind(`${zmqWHost}:${zmqPort}`);

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

    try{

    let result;
      switch(op) {
        case SUM:
          result = sum({x: parseFloat(x), y: parseFloat(message.data.y)});
         break;

        case DIVIDE:
          result = divide({x: parseFloat(x), y: parseFloat(message.data.y)});
          break;

        case PRODUCT:
          result = product({x: parseFloat(x), y: parseFloat(message.data.y)});
          break;

        case DEDUCT:
          result = subtract({x: parseFloat(x), y: parseFloat(message.data.y)});
          break;

        case POWER:
          result = power({x: parseFloat(x), n: parseFloat(message.data.n)});
          break;

        case FACTORIAL:
          result = factorial({x: parseInt(x)});
          break;

        case SQUARE_ROOT:
         result = squareRoot({x: parseFloat(x)});
          break;

        case CUBE_ROOT:
         result = cubeRoot({x: parseFloat(x)});
          break;

        default:
          result = null;
          break;
      }

      if(result) {
        console.log(result);
        const { op, x, y, n } = message.data;
        const expression = txtmanage({ op, x, y, n, result });
        pipeline.send({...message.data, result , success:true, expression, date : (new Date()).shorten()});
      }

    }


    catch(error) {
      console.log(error);
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
