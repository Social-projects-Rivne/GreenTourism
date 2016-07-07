// TODO: Add limit and offset
// TODO: Add query filtering
exports.list = function(Model) {
  return function(req, res) {
    var limit = req.query.limit;
    delete req.query.limit;

    Model.find(req.query, function(err, records) {
      if (err) {
        res.status(400).json(err);
      } else {
        res.json(records);
      }
    }).limit(limit);
  };
};

exports.show = function(Model) {
  return function(req, res) {
    Model.findById(req.params.id, function(err, record) {
      if (err) {
        res.status(404).json(err);
      } else {
        res.json(record);
      }
    });
  };
};

exports.create = function(Model) {
  return function(req, res) {
    var record = new Model(req.body);

    record.save(function(err) {
      if (err) {
        res.status(400).json(err);
      } else {
        res.status(201).json({message: 'Record was successfully created!',
                  record: record});
      }
    });
  };
};

// TODO: Show error if wrong fields sent
exports.update = function(Model) {
  return function(req, res) {
    Model.findById(req.params.id, function(err, record) {
      if (err) {
        res.status(400).json(err);
      } else {
        for (var key in req.body) {
          record.set(key, req.body[key]);
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
};

exports.delete = function(Model) {
  return function(req, res) {
    Model.findByIdAndRemove(req.params.id, function(err) {
      if (err) {
        res.status(400).json(err);
      } else {
        res.json({message: 'Record ' + req.params.id +
                  ' was successfully deleted'});
      }
    });
  };
};
