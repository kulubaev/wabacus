const {
  SUM,
  DEDUCT,
  DIVIDE,
  PRODUCT,
  DIVISION_BY_ZERO_ENCOUNTERED
} = require('megasoft-shared');

/**
 *@description routine defintions for basic/primary calculations
 *
 *@param {number} x - argument 
 *@param {number} y - argument 
 */

const sum = ({x, y}) =>{ 
  return x + y;
}
const subtract = ({x, y}) => x - y;
const product = ({x, y}) => x * y;

const divide =({x, y}) => {
  if(y===0) {
    return undefined;
  }

  return x/y;
}



/**
 *@description returns the square root of a given number
 *
 *@param {number} x - argument for sqare root
 */
const squareRoot = ({x}) => Math.sqrt(x); 


/**
 *@description returns the cube root of a given number
 *
 *@param {number} x - argument for cube root
 */
const cubeRoot = ({x}) => Math.cbrt(x); 


/**
 *@description returns the nth power of a given number
 *
 *@param {number} x - argument for cube root
 *@param {number} x - argument for cube root
 */
const power = ({x, n}) => Math.pow(x,n); 





/**
 *
 */
const factorial = ({x}) => {
  if(x === 1) return 1;

  return x * factorial({x:x - 1});
  
}


module.exports = {
  sum,
  subtract,
  divide,
  product,
  squareRoot,
  power,
  cubeRoot,
  factorial
};

