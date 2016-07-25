var User = require('mongoose').model('User');
var defaultController = require('./default-crud-controller')(User);

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
