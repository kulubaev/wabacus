const { insertRow } = require('../store/pg')
const { arithmetic_expression_build } = require('../utils/txt-manage');

const persist = (store) =>{
  return {
    inbound: (message, next) => {
      insertRow(message);
      next();
    }
  }

}

module.exports = persist;
