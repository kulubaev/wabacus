const express = require('express');
const cors = require('cors');
const parser = require('body-parser');

const calculate = require('./routes/arithmetic');
const reports = require('./routes/reports');

const app = express();

app.use(parser.json());


app.use("/", calculate);
app.use("/operations", reports);


app.listen(3000, () => {

  console.log('up and running at port 3000');

});





