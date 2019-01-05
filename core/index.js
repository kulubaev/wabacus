
const redis = require('redis');

const { Pipeline, JsonMiddleware }  = require('megasoft-shared');
const { host, port } = require('./.env');

/**
 *@description importing arithmetic operation related constants
 *
 */
const {
  DIVIDE,
  PRODUCT,
  SUM,
  DEDUCT,
} = require('./arithmethics/constants');

/**
 *@description importing arithmetic opreations
 *
 */

const {
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

const cache = redis.createClient({
  host,
  port
});


/**
 *@description  per redis requirement we need to use two distinct instances ala subsctiption, operations.
 *
 */
const  subscription  = cache.duplicate(); 


const pipeline = new Pipeline(subscription);
pipeline.use(JsonMiddleware());

pipeline.use({
  inbound: (message, next) => {
    /*
     * @description implement pub/sub pattern within redis
     *
     * @param {string} channel - channel name where the message emitts from
     * @param {string} message - message body 
     */

    switch(channel) {
      case SUM:
        cache.hset(channel, message, sum(message), cache.print );
        break;

      case SUBTRACT:
        const { x, y } = JSON.parse(message);
        cache.hset(channel, message, subtract(message), cache.print );
        break;

      case DIVIDE:
        const { x, y } = JSON.parse(message);
        cache.hset(channel, message, divide(message), cache.print );
        break;

      case PRODUCT:
        const { x, y } = JSON.parse(message);
        cache.hset(channel, message, product(message), cache.print );
        break;
    }

    next();
  }
});

/**
 *@description subscribe to listen any event when a new entry will be added to redis
 *@param {strind} 'insert' - name of new value added event
 */
subscription.subscribe(
  SUM, 
  DIVIDE, 
  SUBTRACT,
  PRODUCT
);
