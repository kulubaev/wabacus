const express = require('express');

const { pipeline }  = require('../messaging/zmq');
const { store }  = require('megasoft-shared');

const api = express.Router();


api.get('/all', async(req, res) =>  { 

  const all =  await store.queryAll();
  res.status(200).send(all.rows);

})


api.get('/daily', async(req, res) => {

  const daily =  await store.queryDaily();
  res.status(200).send(daily.rows);

})

api.get('/weekly', async(req, res) => {

  const weekly =  await store.queryWeekly();
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
