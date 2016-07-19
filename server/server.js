process.env.NODE_ENV = 'development'; // process.env.NODE_ENV || 'development';
process.env.PORT = process.env.PORT || 8080;

var mongoose = require('./config/mongoose');
var express = require('./config/express');
var sequelize = require('./config/sequelize');

var db = mongoose(); // eslint-disable-line no-unused-vars
var app = express();
var sql = sequelize();
var passport = require('./config/passport')(); // eslint-disable-line no-unused-vars

app.listen(process.env.PORT, function() {
  console.log('Server running at http://localhost:' + process.env.PORT + '/');
});

module.exports = app;
