'use strict';

const express = require('express');
let Scoreboard = require('./server/scoreboard');
let Index = require('./server/index');
let Match = require('./server/match');

function Initialize() {
  let api = express();
  api.use('/', Index());
  api.use('/scoreboards', Scoreboard());
  api.use('/matches', Match())

  return api;
}

module.exports = {
    Initialize: Initialize,
};
