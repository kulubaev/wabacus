
const config = require('../.env');
const constants = require('../constants');

const { PAGE_SIZE } = constants;

const { Pool } = require('pg');

const {
  pgHost:host,
  pgDatabase: database,
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

const errorHandler = (error) => {
  console.log(error);
};

store.on('error', (error) => console.log(error));

store.query(`CREATE TABLE IF NOT EXISTS operations (
  id   serial PRIMARY KEY, 
  uuid varchar(50) NOT NULL, 
  expression  varchar(300) NOT NULL,
  operation varchar(20) NOT NULL,
  result varchar(20) NOT NULL,
  status varchar(10)  NOT NULL,
  created timestamp NOT NULL
)`)
  .catch((error) =>  {


  });


const run = (sql) => {
 return store.query(sql)
  .catch((error) => errorHandler(error));
}

const insertRow = ({data: {id, op, x, y, n ,result,  expression, success, date}}) => {

  const queryTxt = 'INSERT INTO operations(uuid,  expression, operation,  result, status,  created ) VALUES($1, $2, $3, $4, $5, $6 )';

  return store.query(queryTxt, [ id, expression, op,  result,  success ? 'success' : 'failed' ,date])
    .catch((error) => errorHandler)
}

const queryBetween = (start, end) => {
  const sql = `SELECT * FROM operations WHERE created::date >= '${start.shorten()}' AND created::date <= '${start.shorten()}'`;
  return run(sql);
}


const queryAll = (page) => {
  
  const sql = `SELECT *, created as date FROM operations  ORDER BY id DESC limit ${ PAGE_SIZE } offset ${ page * PAGE_SIZE}`; 

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

exports.pool = store;
exports.queryAll= queryAll;
exports.queryDaily= queryDaily;
exports.queryWeekly= queryWeekly;
exports.insertRow = insertRow;


