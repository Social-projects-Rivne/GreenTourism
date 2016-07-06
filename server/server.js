var path = require('path');
var express = require('express');
var app = express();
var morgan = require('morgan');  // Logger
var bodyParser = require('body-parser');
var passport = require('passport');
//var LocalStrategy = require('passport-local').Strategy;

var PORT = process.env.PORT || 8080;

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(passport.initialize());
app.use(express.static(path.join(__dirname, '../app')));

// Mongo
var mongoose = require('mongoose');
// TODO: Hide username and password
var dbUrl = 'mongodb://user:qwerty1234@ds019664.mlab.com:19664/test_greentourism';
var dbLocalUrl = 'mongodb://localhost/test_greentourism';
mongoose.connect(dbUrl);

// Routes
app.use('/api/places', require('./routes/places'));
app.use('/api/users', require('./routes/users'));
app.use('/api/tracks', require('./routes/tracks'));

app.listen(PORT, function() {
  console.log('Listening on port ' + PORT + '...');
});
