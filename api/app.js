const express = require('express');
const cors = require('cors');
const calculate = require('./routes/arithmetic');

const app = express();


app.use("/", calculate);


app.listen(3000, () => {

  console.log('up and running at port 3000');

});





