var express = require('express');
var app = express();

var config = require('../config');

app.set('port', config['entry_port']);

app.use((req, res) => {
  res.send('I am entry server');
});

module.exports = app;