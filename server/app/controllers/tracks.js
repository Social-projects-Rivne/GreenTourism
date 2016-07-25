var mongo = require('../helpers/mongo-queries');
var Track = require('mongoose').model('Track');

exports.list = function(req, res) {
  var limit = req.query.limit;
  delete req.query.limit;

  var sort = req.query.sort;
  delete req.query.sort;

  var skip = req.query.skip;
  delete req.query.skip;

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
    Track.find(req.query, null, {limit: limit, skip: skip, sort: sort},
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

exports.show = function(req, res) {
  mongo.findById(res, Track, req.params.id);
};

exports.create = function(req, res) {
  var record = new Track(req.body);

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
    mongo.update(res, Track, req.params.id, req.body);
  } else { // eslint-disable-line eqeqeq
    mongo.update(res, Track, req.user._id, req.body, function(err, record) {
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
    mongo.remove(res, Track, req.params.id);
  } else { // eslint-disable-line eqeqeq
    Track.findById(req.params.id, function(err, record) {
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
