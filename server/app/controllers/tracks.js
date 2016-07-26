var Track = require('mongoose').model('Track');
var defaultController = require('./default-crud-controller')(Track);
var sliceQueryOptions = require('../helpers/slice-query-options');

exports.list = function(req, res) {
  var queryAndOptions = sliceQueryOptions(req.query);

  var location = req.query.location;
  delete req.query.location;

  var radius = req.query.radius;
  delete req.query.radius;

  if (location) {
    Track.find({
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: location
          },
          $maxDistance: radius,
          $minDistance: 0
        }
      }
    }, function(err, records) {
      if (err) {
        res.status(400).json(err);
      } else {
        res.json(records);
      }
    });
  } else {
    Track.find(queryAndOptions.query, null, queryAndOptions.options,
      function(err, records) {
        if (err) {
          res.status(400).json(err);
        } else {
          res.json(records);
        }
      }
    );
  }
};

exports.create = defaultController.create;

exports.getById = defaultController.getById;

exports.show = defaultController.show;

exports.update = defaultController.update;

exports.delete = defaultController.delete;
