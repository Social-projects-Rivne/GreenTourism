var express = require('express');
var router = express.Router();

var Place = require('../models/place');

router.route('/')
  .get(function(req, res) {
    var query;

    if (req.query.type) {
      query = {where: {type: req.query.type}};
    } else {
      query = {};
    }

    Place.findAll(query).then(function(places) {
      var arr = [];
      for (var i = 0; i < places.length; i++) {
        arr.push(places[i].get());
      }

      res.json(arr);
    });
  });

router.route('/:id')
  .get(function(req, res) {
    Place.findById(req.params.id).then(function(place) {
      if (place) {
        res.json(place);
      } else {
        res.status(404).json('Place with id ' + req.params.id +
                             ' was not found!');
      }
    });
  });

module.exports = router;
