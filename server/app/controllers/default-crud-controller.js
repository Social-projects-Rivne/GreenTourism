module.exports = function(Model) {
  var controller = {};

  controller.showComments = function(req, res) {
    Model.findById(req.params.id, function(err, record) {
      if (err) {
        return res.status(404).json(err);
      }
      return res.json(record.comments);
    });
  };

  controller.showComment = function(req, res) {
    Model.findById(req.params.id, function(err, record) {
      if (err) {
        return res.status(404).json(err);
      }
      return res.json(record.comments.id(req.params.commentId));
    });
  };

  controller.updateComment = function(req, res) {
    Model.findById(req.params.id, function(err, record) {
      if (err) {
        return res.status(400).json(err);
      }
      record.comments.id(req.params.commentId).remove();
      record.comments.push(req.body);
      record.save(function(err, resp) {
        if (err) throw err;
        res.json(resp);
      });
    });
  };

  controller.deleteComment = function(req, res) {
    Model.findById(req.params.id, function(err, record) {
      if (err) {
        return res.status(400).json(err);
      }
      record.comments.id(req.params.commentId).remove();
      record.save(function(err, resp) {
        if (err) throw err;
        res.json(resp);
      });
    });
  };

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
          return res.status(400).json(err);
        }

        return res.json(records);
      });
  };

  controller.show = function(req, res) {
    Model.findById(req.params.id, function(err, record) {
      if (err) {
        return res.status(404).json(err);
      }

      return res.json(record);
    });
  };

  controller.create = function(req, res) {
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

  controller.update = function(req, res) {
    Model.findById(req.params.id, function(err, record) {
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
  };

  controller.delete = function(req, res) {
    Model.findByIdAndRemove(req.params.id, function(err) {
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
