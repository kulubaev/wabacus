const express = require('express');
const cors = require('cors');
const parser = require('body-parser');

const calculate = require('./routes/arithmetic');
const reports = require('./routes/reports');

const app = express();

app.use(cors());
app.use(parser.json());



app.use("/", calculate);
app.use("/chrono", reports);


app.listen(4000, () => {
  console.log('up and running at port 4000');
});





