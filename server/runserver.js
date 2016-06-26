var express = require('express');
var app = express();
app.use(express.static(__dirname + '/../app'));

var logger = require('./logger');
app.use(logger);

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

/* Mongo:
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test_greentourism');
*/

// Routes
var places = require('./routes/places');
app.use('/api/places', places);

var port = process.env.PORT || 8080;

app.listen(port, function() {
  console.log('Listening on port ' + port + '...');
});
