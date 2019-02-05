const express = require('express');
const uuid = require('uuid/v4');
const { pipeline, cache, zmq }  = require('../messaging/zmq');

const {
  PRODUCT,
  DIVIDE,
  SUM,
  DEDUCT,
  FACTORIAL,
  CUBE_ROOT,
  SQUARE_ROOT,
  POWER
}  = require('../static/constants');


const api = express.Router();

api.get(/^\/power\/([\+\-]?\d*\.?\d+(?:[Ee][\+\-]?\d+)?)\/([\+\-]?\d*\.?\d+(?:[Ee][\+\-]?\d+)?)$/, (req, res) => {
  const id = uuid();
  const payload = {id, x: req.params[0], n: req.params[1], op: POWER};

  new Promise((resolve, reject) => {
    cache[id] = ({ error, success, result, x, n, op, expression, date }) => success ? resolve({result, num1: x, power: n, operation:op, expression, date}) : reject(error);
  })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(500).json({error:'something went wrong'});
    })

  pipeline.send(payload);
})


api.get(/^\/factorial\/(\d+)$/, (req, res) => {
  const id = uuid();
  const payload = {id, x: req.params[0], op: FACTORIAL};

  if(payload.x > 30)  {
    payload.x = 30;
  }

  new Promise((resolve, reject) => {
    cache[id] = ({ error, success, result, x, y, op, expression, date }) => success ? resolve({result, num1: x, operation:op, expression, date}) : reject(error);
  })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(500).json({error:'something went wrong'});
    })

  pipeline.send(payload);
});

api.get(/^\/(cbrt|sqrt)\/([\+\-]?\d*\.?\d+(?:[Ee][\+\-]?\d+)?)$/, (req, res) => {

  const id = uuid();
  const payload = {id, x: req.params[1]};

  payload.op = ((op) => {
    switch(op) {
      case 'cbrt': return CUBE_ROOT;
      case 'sqrt': return SQUARE_ROOT;
      default: return op;
    }
  })(req.params[0]);


  new Promise((resolve, reject) => {
    cache[id] = ({ error, success, result, x, y, op, expression, date }) => success ? resolve({result, num1: x, operation:op, expression, date}) : reject(error);
  })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(500).json({error:'something went wrong'});
    })

  pipeline.send(payload);
});

api.get(/^\/(add|divide|subtract|multiply)\/([\+\-]?\d*\.?\d+(?:[Ee][\+\-]?\d+)?)\/([\+\-]?\d*\.?\d+(?:[Ee][\+\-]?\d+)?)$/, (req, res) => {

  const id = uuid();
  const payload = {id, x: req.params[1], y: req.params[2]};


  payload.op = ((op) => {
    switch(op) {
      case 'add': return SUM;
      case 'divide': return DIVIDE;
      case 'subtract': return DEDUCT;
      case 'multiply': return PRODUCT;
      default: return op;
    }
  })(req.params[0]);

  new Promise((resolve, reject) => {
    cache[id] = ({ error, success, result, x, y, op, expression, date }) => success ? resolve({result, num1: x, num2:y, operation:op, expression, date}) : reject(error);
  })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(500).json({error:'something went wrong'});
    })


  pipeline.send(payload);

});

module.exports = api;
