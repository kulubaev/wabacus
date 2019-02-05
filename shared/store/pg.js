
const config = require('../static/.env');
const constants = require('../static/constants');

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



 const select_sql = 'SELECT *, created as date FROM operations'; 
 const order_by_sql = 'ORDER BY id DESC';

/**
 *
 *
 */
const run = (sql) => {
 return store.query(sql)
  .catch((error) => errorHandler(error));
}

/**
 *
 *
 */
const insertRow = ({data: {id, op, x, y, n ,result,  expression, success, date}}) => {

  const queryTxt = 'INSERT INTO operations(uuid,  expression, operation,  result, status,  created ) VALUES ($1, $2, $3, $4, $5, $6 )';

  return store.query(queryTxt, [ id, expression, op,  result,  success ? 'success' : 'failed' ,date])
    .catch((error) => errorHandler)
}

/**
 *
 *
 */
const queryBetween = (start, end, page) => {

  let sql = `${select_sql} WHERE created::date >= '${start.shorten()}' AND created::date <= '${end.shorten()}' ${order_by_sql} `;


  if(!isNaN(parseInt(page))) {
    sql = ` ${sql} limit ${ PAGE_SIZE } offset ${ page * PAGE_SIZE}`;
  }

  return run(sql);
}

/**
 *
 *
 */
const queryAll = (page) => {

  let page_sql;

  let sql = `${select_sql} ${order_by_sql}`;

  if(!isNaN(parseInt(page))) {
    sql = `${sql} limit ${ PAGE_SIZE } offset ${ page * PAGE_SIZE}`;
  }

  return run(sql);
}

/**
 *
 *
 */
const queryDay= (page) => {
  const start = new Date();
  const end = start.addDays(1);

  return queryBetween(start,end, page);
}

/**
 *
 *
 */
const queryWeek = (page) => {

  const end = new Date();
  const start = end.subtractDays(7);

  return queryBetween(start, end, page);
}


/**
 *
 *
 */
const queryMonth = (page) => {

  const end = new Date();
  const start = end.subtractDays(30);


  return queryBetween(start, end, page);
}


const reset = () => {
  run('TRUNCATE operations');
}

exports.pool = store;
exports.queryAll= queryAll;
exports.queryDay= queryDay;
exports.queryWeek= queryWeek;
exports.queryMonth= queryMonth;
exports.insertRow = insertRow;
exports.reset = reset;


