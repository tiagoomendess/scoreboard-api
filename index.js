'use strict';

const express = require('express');
const http = require('http');
var cors = require('cors');

const hostname = '127.0.0.1';
const port = 3001;
let router = require('./router');
const data = require('./data/Scoreboards.js');
var app = express();
app.use(cors());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
  });

app.use(router.Initialize());

const server = http.Server(app);
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
