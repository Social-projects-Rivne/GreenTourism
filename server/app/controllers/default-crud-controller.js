var sliceQueryOptions = require('../helpers/slice-query-options');

module.exports = function(Model) {
  var controller = {};

  controller.list = function(req, res) {
    var queryAndOptions = sliceQueryOptions(req.query);

    Model.find(queryAndOptions.query, null, queryAndOptions.options,
      function(err, records) {
        if (err) {
          return res.status(400).json(err);
        }

        return res.json(records);
      }
    );
  };

  controller.create = function(req, res) {
    req.body.owner = req.user._id;

    var record = new Model(req.body);

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

  controller.getById = function(req, res, next, id) {
    Model.findById(id, function(err, record) {
      if (err) {
        return res.status(404).json(err);
      } else if (record) {
        req.record = record;
        next();
      } else {
        return res.status(500).json({
          message: 'Failed to load record ' + id
        });
      }
    });
  };

  controller.show = function(req, res) {
    return res.json(req.record);
  };

  controller.update = function(req, res) {
    var record = req.record;

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
  };

  controller.delete = function(req, res) {
    var record = req.record;

    record.remove(function(err) {
      if (err) {
        return res.status(400).json(err);
      }

      return res.json({
        message: 'Record ' + req.params.id + ' was successfully deleted'
      });
    });
  };

  return controller;
};
