var express = require('express');
var app = express();
var morgan = require('morgan');  // Logger
var bodyParser = require('body-parser');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var PORT = process.env.PORT || 8080;

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(passport.initialize());
app.use(express.static(__dirname + '/../app'));

// Mongo
var mongoose = require('mongoose');
// TODO: Move mongo database somewhere to the cloud
mongoose.connect('mongodb://localhost/test_greentourism');

// Routes
app.use('/api/places', require('./routes/places'));
app.use('/api/users', require('./routes/users'));

app.listen(PORT, function() {
  console.log('Listening on port ' + PORT + '...');
});
