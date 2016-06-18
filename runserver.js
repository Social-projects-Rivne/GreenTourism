var express = require('express');
var app = express();
app.use(express.static('app'));

var logger = require('./logger');
app.use(logger);

/* Mongo:
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test_greentourism');
*/

// Routes
var places = require('./routes/places');
app.use('/places', places);

var port = process.env.PORT || 8080;

app.listen(port, function() {
  console.log('Listening on port ' + port + '...');
});
