
const config = require('../.env');
const { arithmetic_expression_build } = require('../utils/txt-manage');

const { Pool } = require('pg');

const {
  pgHost:host,
  pgDtabase: database,
  pgUser: user,
  pgPort: port,
  pgPassword: password
} = config;

const store = new Pool({
  host,
  database,
  user,
  password,
  port
});

const errorHandler = (error) => console.log(error);

store.on('error', (error) => { });

store.query(`CREATE TABLE IF NOT EXISTS operations (
  id varchar(50) PRIMARY KEY,
  expression  varchar(300) NOT NULL,
  type varchar(20) NOT NULL,
  status varchar(10)  NOT NULL,
  created timestamp NOT NULL
)`)
  .catch((error) =>  errorHandler(error) );


const run = (sql) => {
 store.query(sql)
  .catch((error) => errorHandler(error));
}

const insertRow = ({id, op, x, y, n ,result, success}) => {

  const expression = arithmetic_expression_build({ op, x, y, n, result });

  const queryTxt = 'INSERT INTO operations(id, type, expression, status, created ) VALUES($1, $2, $3, $4, $5 )';

  store.query(queryTxt, [ id, op, expression, success ? 'success' : 'failed' ], new Date())
    .catch(error => errorHandler(error))
}

const queryBetween = (start, end) => {
  const sql = `SELECT * FROM operations WHERE created::date >= ${start.shorten()} AND created::date <= ${start.shorten()}`;
  return run(sql);
}


const queryAll = () => {
  const sql = `SELECT * FROM operations`; 

  return run(sql);
}

const queryDaily = () => {

  const start = new Date();
  const end = start.addDays(1);

  return queryBetween(start,end);
}


const queryWeekly = () => {

  const today = new Date();

  return queryBetween(today.getFirstDayOfWeek(), getLastDayOfWeek());
}



module.exports = store;
exports.queryAll= queryAll;
exports.queryDaily= queryDaily;
exports.queryWeekly= queryWeekly;
exports.insertRow = insertRow;


