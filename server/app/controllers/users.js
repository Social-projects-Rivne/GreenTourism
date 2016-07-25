var mongo = require('../helpers/mongo-queries');
var User = require('mongoose').model('User');
var Place = require('mongoose').model('Place');
var Track = require('mongoose').model('Track');

exports.list = function(req, res) {
  mongo.find(res, User, req.query);
};

exports.show = function(req, res) {
  var projection = '-password -provider -providerId -providerData -createdAt' +
    ' -updatedAt -role';

  if (req.user.role === 'admin') {
    mongo.findById(res, User, req.params.id, projection);
  } else if (req.params.id == req.user._id) { // eslint-disable-line eqeqeq
    mongo.findById(res, User, req.user._id, projection);
  }
};

exports.showMe = function(req, res) {
  var projection = '-password -provider -providerId -providerData -createdAt' +
    ' -updatedAt -role';

  mongo.findById(res, User, req.user._id, projection);
};

exports.update = function(req, res) {
  if (req.user.role === 'admin') {
    mongo.update(res, User, req.params.id, req.body);
  } else if (req.params.id == req.user._id) { // eslint-disable-line eqeqeq
    mongo.update(res, User, req.user._id, req.body);
  }
};

exports.delete = function(req, res) {
  if (req.user.role === 'admin') {
    mongo.remove(res, User, req.params.id);
  } else if (req.params.id == req.user._id) { // eslint-disable-line eqeqeq
    mongo.remove(res, User, req.user._id);
  }
};

exports.listPlaces = function(req, res) {
  req.query.owner = req.params.id;

  mongo.find(res, Place, req.query);
};

exports.listTracks = function(req, res) {
  req.query.owner = req.params.id;

  mongo.find(res, Track, req.query);
};
