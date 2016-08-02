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

    record.save(function(err, record) {
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

    record.save(function(err, record) {
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

  // Comments

  controller.listComments = function(req, res) {
    var record = req.record;

    return res.json(record.comments);
  };

  controller.createComment = function(req, res) {
    var record = req.record;

    record.comments.push(req.body);

    record.save(function(err, record) {
      if (err) {
        return res.status(400).json(err);
      }

      return res.json(record);
    });
  };

  controller.getCommentById = function(req, res, next, id) {
    var record = req.record;
    var comment = record.comments.id(req.params.commentId);

    if (!comment) {
      return res.status(404).json({
        message: 'Comment not found'
      });
    }

    req.comment = comment;
    next();
  };

  controller.showComment = function(req, res) {
    var comment = req.comment;

    return res.json(comment);
  };

  controller.updateComment = function(req, res) {
    var record = req.record;
    var comment = req.comment;

    comment.remove();
    record.comments.push(req.body);

    record.save(function(err, record) {
      if (err) {
        return res.status(400).json(err);
      }

      return res.json(record);
    });
  };

  controller.deleteComment = function(req, res) {
    var record = req.record;
    var comment = req.comment;

    comment.remove();

    record.save(function(err, record) {
      if (err) {
        return res.status(400).json(err);
      }

      return res.json(record);
    });
  };

  // Likes

  controller.listLikes = function(req, res) {
    var record = req.record;

    return res.json(record.likes);
  };

  controller.addOrDeleteLike = function(req, res) {
    var record = req.record;

    if (req.body.id === req.user.id) {
      record.likes.push(req.body.id);
    }
    if (req.body.deleteId === req.user.id) {
      record.likes = record.likes.filter(function(like) {
        return like != req.body.deleteId;
      });
    }

    record.save(function(err, record) {
      if (err) {
        return res.status(400).json(err);
      }

      return res.json(record);
    });
  };

  return controller;
};
