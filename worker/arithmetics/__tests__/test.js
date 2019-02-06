const {
  sum,
  subtract,
  product,
  divide,
  power,
  squareRoot,
  cubeRoot,
  factorial
} = require('../');


describe('basic artithmetic operations', () => {

  it ('should get correct sum for given numbers', () => {
    expect(sum({x:1,   y:2})).toEqual(3);
    expect(sum({x:-10, y:2})).toEqual(-8);
    expect(sum({x:5,   y:0})).toEqual(5);
    expect(sum({x:-3,  y:3})).toEqual(0);
  })

  it ('should get correct substraction of given numbers', () => {
    expect(subtract({x:1,   y:2})).toEqual(-1);
    expect(subtract({x:-10, y:2})).toEqual(-12); 
    expect(subtract({x:5,   y:0})).toEqual(5);
    expect(subtract({x:-3,  y:-3})).toEqual(0);
  })

  it ('should get correct product of given numbers', () => {
    expect(product({x:1,   y:2})).toEqual(2);
    expect(product({x:-10, y:2})).toEqual(-20);
    expect(product({x:5,   y:0})).toEqual(0);
    expect(product({x:-3,  y:-3})).toEqual(9);
  })

  it ('should get correct division of given numbers', () => {
    expect(divide({x:2,   y:1})).toEqual(2);
    expect(divide({x:-10, y:2})).toEqual(-5);
    expect(divide({x:0,   y:5})).toEqual(0);
    expect(divide({x:-3,  y:-3})).toEqual(1);
  })

  it ('should get correct square root for given number', () =>{
    expect(squareRoot({x:9})).toEqual(3);
    expect(squareRoot({x:0})).toEqual(0);
  })

  it ('should get correct cube root for given number', () =>{
    expect(cubeRoot({x:27})).toEqual(3);
    expect(cubeRoot({x:-1})).toEqual(-1);
    expect(cubeRoot({x:0})).toEqual(0);
  })

  it ('should get correct nth pwer for given number', () =>{
    expect(power({x:3, n:2})).toEqual(9);
    expect(power({x:7, n:3})).toEqual(343);
    expect(power({x:4, n:0.5})).toEqual(2);
  })

  it ('should get correct factorial for given number', () =>{
    expect(factorial({x:3})).toEqual(6);
    expect(factorial({x:5})).toEqual(120);
  })


});
