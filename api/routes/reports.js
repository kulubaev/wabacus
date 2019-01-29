const express = require('express');

const { pipeline }  = require('../messaging/zmq');


const store = require('../store');
const config = require('../static/.env');
const constants = require('../static/constants');
const utils = require('../utils');



const {
  ALL,
  TODAY,
  THIS_WEEK,
  THIS_MONTH
} = constants;

const api = express.Router();
const { pg:db } = store;

api.get(/\/(all|daily|weekly|monthly)\/(\d+$)?/, async(req, res) =>  { 

  let result = [];

  switch(req.params[0]) {

    case ALL:
      result =  await db.queryAll(req.params[1]);
      break;
    case TODAY:
      result =  await db.queryDay(req.params[1]);
      break;
    case THIS_WEEK:
      result =  await db.queryWeek(req.params[1]);
      break;
    case THIS_MONTH:
      result =  await db.queryMonth(req.params[1]);
      break;
    default:
      break;
  }

  if(result && result.rows) {
    result.rows.forEach(r => r.date = new Date(r.date).shorten());
    res.status(200).send(result.rows);
  }else {
    res.status(500).send('something went wrong');
  }

})



module.exports = api;
