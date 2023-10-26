'use strict';

const express = require('express');
let Scoreboard = require('./server/scoreboard');
let Index = require('./server/index');
let Match = require('./server/match');

function Initialize() {
  let api = express();
  api.use('/', Index());
  api.use('/matches', Match())
  api.use('/scoreboards', Scoreboard());

  return api;
}

module.exports = {
    Initialize: Initialize,
};
