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
    case SUM: return `${x} + ${y}`;
    case DIVIDE: return `${x} / ${y}`;
    case DEDUCT: return `${x} - ${y}`;
    case PRODUCT: return `${x} * ${y}`;
    case FACTORIAL: return `${x}!`;
    case CUBE_ROOT: return `3√${x}`;
    case SQUARE_ROOT: return `√${x}`;
    case POWER: return `${x}^${n}`;
  }

}

module.exports = arithmetic_expression_build;
