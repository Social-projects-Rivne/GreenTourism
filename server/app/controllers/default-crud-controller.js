module.exports = function(Model) {
  var controller = {};

  controller.list = function(req, res) {
    var limit = req.query.limit;
    delete req.query.limit;

    var sort = req.query.sort;
    delete req.query.sort;

    var skip = req.query.skip;
    delete req.query.skip;

    Model.find(req.query, null, {limit: limit, skip: skip, sort: sort},
      function(err, records) {
        if (err) {
          res.status(400).json(err);
        } else {
          res.json(records);
        }
      }
    );
  };

  controller.show = function(req, res) {
    Model.findById(req.params.id, function(err, record) {
      if (err) {
        res.status(404).json(err);
      } else {
        res.json(record);
      }
    });
  };

  controller.create = function(req, res) {
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

  controller.update = function(req, res) {
    Model.findById(req.params.id, function(err, record) {
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

  controller.delete = function(req, res) {
    Model.findByIdAndRemove(req.params.id, function(err) {
      if (err) {
        res.status(400).json(err);
      } else {
        res.json({message: 'Record ' + req.params.id +
                  ' was successfully deleted'});
      }
    });
  };

  return controller;
};
