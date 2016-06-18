var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: false});
var jsonParser = bodyParser.json();

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
      res.json(places);
    });
  })
  .post(jsonParser, function(req, res) {
    // TODO: Restrict creating points to logged in users only

    if (!req.body) {
      res.sendStatus(400);
    } else {
      Place.create(req.body).then(function(place) {
        res.status(201).json(place);
      }).catch(function(err) {
        res.status(400).json(err.errors);
      });
    }
  });

router.route('/:id')
  .get(function(req, res) {
    Place.findById(req.params.id).then(function(place) {
      if (!place) {
        res.status(404).json('Place with id ' + req.params.id +
                             ' was not found!');
      } else {
        res.json(place);
      }
    });
  })
  .delete(function(req, res) {
    Place.destroy({where: {id: req.params.id}}).then(function() {
      res.sendStatus(200);
    });
  });

module.exports = router;
