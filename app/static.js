var express = require('express');
var app = express();

var config = require('../config');

app.set('port', config['static_port']);

app.use((req, res) => {
  res.send('I am static server');
})

module.exports = app;