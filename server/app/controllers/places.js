var mongo = require('../helpers/mongo-queries');
var Place = require('mongoose').model('Place');

exports.list = function(req, res) {
  mongo.find(res, Place);
};

exports.show = function(req, res) {
  mongo.findById(res, Place, req.params.id);
};

exports.create = function(req, res) {
  var record = new Place(req.body);

  record.owner = req.user._id;

  record.save(function(err) {
    if (err) {
      return res.status(400).json(err);
    }

    return res.status(201).json({
      message: 'Record was successfully created!',
      record: record
    });
  });
};

exports.update = function(req, res) {
  if (req.user.role === 'admin') {
    mongo.update(res, Place, req.params.id, req.body);
  } else { // eslint-disable-line eqeqeq
    mongo.update(res, Place, req.user._id, req.body, function(err, record) {
      if (record.owner !== req.user._id) {
        return res.sendStatus(403);
      }

      if (err) {
        return res.status(400).json(err);
      }

      for (var key in req.body) {
        if ({}.hasOwnProperty.call(req.body, key)) {
          record.set(key, req.body[key]);
        }
      }

      record.save(function(err) {
        if (err) {
          return res.status(400).json(err);
        }

        return res.json({
          message: 'Record ' + req.params.id + ' was successfully updated',
          record: record
        });
      });
    });
  }
};

exports.delete = function(req, res) {
  if (req.user.role === 'admin') {
    mongo.remove(res, Place, req.params.id);
  } else { // eslint-disable-line eqeqeq
    Place.findById(req.params.id, function(err, record) {
      if (record.owner !== req.user._id) {
        return res.sendStatus(403);
      }

      if (err) {
        return res.status(400).json(err);
      }

      record.remove(function(err) {
        if (err) {
          return res.status(400).json(err);
        }

        return res.json({
          message: 'Record ' + req.params.id + ' was successfully deleted'
        });
      });
    });
  }
};
