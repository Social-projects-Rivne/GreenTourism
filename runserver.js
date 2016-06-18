var express = require('express');
var app = express();
app.use(express.static('app'));

var logger = require('./logger');
app.use(logger);

var Sequelize = require('sequelize');

/* Mongo:
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
*/

var Place = require('./models/place');

app.get('/places', function(req, res) {
  /* Mongo:
  Place.find(function(err, places) {
    if (err) {
      res.send(err);
    }

    res.json(places);
  });
  */

  Place.findAll().then(function(places) {
    var arr = [];
    for (var i = 0; i < places.length; i++) {
      arr.push(places[i].get());
    }

    res.json(arr);
  });
});

app.listen(3000, function() {
  console.log('Listening on port 3000...');
});
