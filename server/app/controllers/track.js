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
  Track.findById(req.params.id, function(err, record) {
    if (err) {
      res.status(404).json(err);
    } else {
      res.json(record);
    }
  });
};

exports.create = function(req, res) {
  var record = new Track(req.body);

  record.save(function(err) {
    if (err) {
      res.status(400).json(err);
    } else {
      res.status(201).json({message: 'Record was successfully created!',
                record: record});
    }
  });
};

exports.update = function(req, res) {
  Track.findById(req.params.id, function(err, record) {
    if (err) {
      res.status(400).json(err);
    } else {
      for (var key in req.body) {
        if ({}.hasOwnProperty.call(req.body, key)) {
          record.set(key, req.body[key]);
        }
      }

      record.save(function(err) {
        if (err) {
          res.status(400).json(err);
        } else {
          res.json(record);
        }
      });
    }
  });
};

exports.delete = function(req, res) {
  Track.findByIdAndRemove(req.params.id, function(err) {
    if (err) {
      res.status(400).json(err);
    } else {
      res.json({message: 'Record ' + req.params.id +
                ' was successfully deleted'});
    }
  });
};

