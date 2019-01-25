const express = require('express');

const { pipeline }  = require('../messaging/zmq');
const { config, store }  = require('megasoft-shared');


const api = express.Router();
const { pg:db } = store;

api.get(/\/all\/(\d+)$/, async(req, res) =>  { 
  console.log(req.params[0])
  const all =  await db.queryAll(req.params[0]);
  res.status(200).send(all.rows);

})


api.get('/daily', async(req, res) => {

  const daily =  await db.queryDaily();
  res.status(200).send(daily.rows);

})

api.get('/weekly', async(req, res) => {

  const weekly =  await db.queryWeekly();
  res.status(200).send(weekly.rows);

})

api.post('/query', async(req, res) => {

  const { 
    startdate,
    endate,
    type,
    status
  } = req.body;

  res.status(200).send(all.rows);
})



module.exports = api;
