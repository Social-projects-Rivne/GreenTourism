var config = require('./config');
var express = require('express');
var morgan = require('morgan');  // Logger
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');

module.exports = function() {
  var app = express();

  if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  } else if (process.env.NODE_ENV === 'production') {
    // app.use(compress());
  }

  app.use(cookieParser());

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));
  // app.use(methodOverride());

  app.use(session({
    saveUninitialized: true,
    resave: true,
    secret: config.sessionSecret
  }));

  app.use(passport.initialize());
  app.use(passport.session());

  // Routes
  var router = express.Router();  // eslint-disable-line new-cap

  router.use('/', require('../app/routes/auth'));
  router.use('/places', require('../app/routes/places'));
  router.use('/users', require('../app/routes/users'));

  app.use('/api', router);

  app.use(express.static('./client'));

  return app;
};
