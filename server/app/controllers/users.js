var User = require('mongoose').model('User');
var Place = require('mongoose').model('Place');
var Track = require('mongoose').model('Track');
var defaultController = require('./default-crud-controller')(User);
var sliceQueryOptions = require('../helpers/slice-query-options');
var callbacks = require('../helpers/default-callbacks');

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

exports.myPlaces = function(req, res) {
  req.query.owner = req.params.id;

  var queryAndOptions = sliceQueryOptions(req.query);

  Place.find(queryAndOptions.query, null, queryAndOptions.options,
    callbacks.find(res));
};

exports.myTracks = function(req, res) {
  req.query.owner = req.params.id;

  var queryAndOptions = sliceQueryOptions(req.query);

  Track.find(queryAndOptions.query, null, queryAndOptions.options,
    callbacks.find(res));
};

exports.favoritePlaces = function(req, res) {
  req.query.likes = req.params.id;

  var queryAndOptions = sliceQueryOptions(req.query);

  Place.find(queryAndOptions.query, null, queryAndOptions.options,
    callbacks.find(res));
};

exports.favoriteTracks = function(req, res) {
  req.query.likes = req.params.id;

  var queryAndOptions = sliceQueryOptions(req.query);

  Track.find(queryAndOptions.query, null, queryAndOptions.options,
    callbacks.find(res));
};
