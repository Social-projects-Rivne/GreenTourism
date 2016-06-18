var express = require('express');
var app = express();
app.use(express.static('app'));

var logger = require('./logger');
app.use(logger);

/* Mongo:
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
*/

var Place = require('./models/place');

app.get('/places', function(req, res) {
  if (req.query.type) {
    Place.findAll({where: {type: req.query.type}}).then(function(places) {
      var arr = [];
      for (var i = 0; i < places.length; i++) {
        arr.push(places[i].get());
      }

      res.json(arr);
    });

  } else {
    Place.findAll().then(function(places) {
      var arr = [];
      for (var i = 0; i < places.length; i++) {
        arr.push(places[i].get());
      }

      res.json(arr);
    });
  }

  /* Mongo:
  Place.find(function(err, places) {
    if (err) {
      res.send(err);
    }

    res.json(places);
  });
  */
});

app.get('/places/:id', function(req, res) {
  Place.findById(req.params.id).then(function(place) {
    if (place) {
      res.json(place);
    } else {
      res.status(404).send('Place with id ' + req.params.id + ' is not found!');
    }
  });
});

app.listen(3000, function() {
  console.log('Listening on port 3000...');
});
