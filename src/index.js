const express = require('express');
const http = require('http');
const dotenv = require('dotenv');
const morgan = require('morgan');

dotenv.config();

const app = express();
app.use(express.json());
app.use(morgan('dev'));

require('./routes')(app);
app.use('*', (req, res) => {
  res.status(404).json({
    message: "URL NOT FOUND"
  })
})

const server = http.createServer(app);

server.listen(3000, () => {
  console.log('Server listening on port 3000');
})