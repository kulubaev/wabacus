const {
  SUM, 
  DIVIDE,
  DEDUCT,
  PRODUCT,
  FACTORIAL,
  CUBE_ROOT,
  SQUARE_ROOT,
  POWER
} = require('../constants');

const arithmetic_expression_build =({op, x, y, n, exp, result}) => {
  switch(op) {
    case SUM: return `${x} + ${y} = ${result}`;
    case DIVIDE: return `${x} / ${y} = ${result}`;
    case DEDUCT: return `${x} - ${y} = ${result}`;
    case PRODUCT: return `${x} * ${y} = ${result}`;
    case FACTORIAL: return `${x}! = ${result}`;
    case CUBE_ROOT: return `3√${x} = ${result}`;
    case SQUARE_ROOT: return `√${x} = ${result}`;
    case POWER: return `${x}^${n} = ${result}`;
  }

}

exports.arithmetic_expression_build = arithmetic_expression_build;
