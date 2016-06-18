var express = require('express');
var app = express();
app.use(express.static('app'));

var logger = require('./logger');
app.use(logger);

/* Mongo:
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
*/

// Routes
var places = require('./routes/places');
app.use('/places', places);

app.listen(3000, function() {
  console.log('Listening on port 3000...');
});
