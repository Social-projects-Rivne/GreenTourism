var config = require('./config');
var express = require('express');
var morgan = require('morgan');  // Logger
var bodyParser = require('body-parser');
var session = require('express-session');
// var passport = require('passport');
// var LocalStrategy = require('passport-local').Strategy;

module.exports = function() {
  var app = express();

  if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  } else if (process.env.NODE_ENV === 'production') {
    // app.use(compress());
  }

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));
  // app.use(methodOverride());

  // app.use(passport.initialize());

  app.use(session({
    saveUninitialized: true,
    resave: true,
    secret: config.sessionSecret
  }));

  // Routes
  app.use('/api/places', require('../app/routes/places'));
  app.use('/api/users', require('../app/routes/users'));

  app.use(express.static('./client'));

  return app;
};
