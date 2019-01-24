const { insertRow } = require('../store/pg')

const persist = (store) =>{
  return {
    inbound: (message, next) => {
      insertRow(message);
      next();
    }
  }

}

module.exports = persist;
