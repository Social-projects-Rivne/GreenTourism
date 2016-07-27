var User = require('mongoose').model('User');
var Place = require('mongoose').model('Place');
var Track = require('mongoose').model('Track');
var defaultController = require('./default-crud-controller')(User);
var sliceQueryOptions = require('../helpers/slice-query-options');

exports.list = defaultController.list;

exports.getById = function(req, res, next, id) {
  var projection = [
    '-password',
    '-provider',
    '-providerId',
    '-providerData',
    '-createdAt',
    '-updatedAt',
    '-role'
  ].join(' ');

  User.findById(id, projection, function(err, record) {
    if (err) {
      return res.status(404).json(err);
    }

    req.record = record;
    next();
  });
};

exports.show = defaultController.show;

exports.showMe = function(req, res) {
  var projection = [
    '-password',
    '-provider',
    '-providerId',
    '-providerData',
    '-createdAt',
    ' -updatedAt',
    '-role'
  ].join(' ');

  User.findById(req.user._id, projection, function(err, record) {
    if (err) {
      return res.status(404).json(err);
    }

    return res.json(record);
  });
};

exports.update = defaultController.update;

exports.delete = defaultController.delete;

exports.listPlaces = function(req, res) {
  req.query.owner = req.params.id;

  var queryAndOptions = sliceQueryOptions(req.query);

  Place.find(queryAndOptions.query, null, queryAndOptions.options,
    function(err, records) {
      if (err) {
        return res.status(400).json(err);
      }

      return res.json(records);
    });
};

exports.listTracks = function(req, res) {
  req.query.owner = req.params.id;

  var queryAndOptions = sliceQueryOptions(req.query);

  Track.find(queryAndOptions.query, null, queryAndOptions.options,
    function(err, records) {
      if (err) {
        return res.status(400).json(err);
      }

      return res.json(records);
    });
};
