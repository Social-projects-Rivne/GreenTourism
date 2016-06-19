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
      res.json(places);
    });
  })
  .post(function(req, res) {
    // TODO: Restrict creating points to logged in users only

    if (!req.body) {
      res.sendStatus(400);
    } else {
      Place.create(req.body)
        .then(function(place) {
          res.status(201).json({message: 'Place was successfully create!',
                                place: place});
        })
        .catch(function(err) {
          res.status(400).json({errors: err.errors});
        });
    }
  });

router.route('/:id')
  .get(function(req, res) {
    Place.findById(req.params.id).then(function(place) {
      if (!place) {
        res.status(404).json({message: 'Place with id ' + req.params.id +
                             ' was not found!'});
      } else {
        res.json(place);
      }
    });
  })
  .put(function(req, res) {
    // TODO: Restrict updating points to logged in users only

    if (!req.body) {
      res.sendStatus(400);
    } else {
      Place.update(req.body, {where: {id: req.params.id}})
        .then(function() {
          res.status(200).json({message: 'Place ' + req.params.id +
                                ' was successfully updated'});
        })
        .catch(function(err) {
          res.status(400).json({errors: err.errors});
        });
    }
  })
  .delete(function(req, res) {
    // TODO: Restrict deleting points to logged in users only

    Place.destroy({where: {id: req.params.id}}).then(function() {
      res.status(200).json({message: 'Place ' + req.params.id +
                            ' was successfully deleted'});
    });
  });

module.exports = router;
