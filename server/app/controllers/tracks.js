var Track = require('mongoose').model('Track');
var defaultController = require('./default-crud-controller')(Track);
var sliceQueryOptions = require('../helpers/slice-query-options');

exports.list = function(req, res) {
  var queryAndOptions = sliceQueryOptions(req.query);

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
    Track.find(queryAndOptions.query, null, queryAndOptions.options,
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

exports.getById = function(req, res, next, id) {
  Track.findById(id).populate({
    path: 'comments.author',
    select: 'firstName lastName fullName avatar'
  })
    .exec(function(err, record) {
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

exports.create = defaultController.create;

exports.show = defaultController.show;

exports.update = defaultController.update;

exports.delete = defaultController.delete;

// Comments

exports.listComments = defaultController.listComments;

exports.createComment = defaultController.createComment;

exports.getCommentById = defaultController.getCommentById;

exports.showComment = defaultController.showComment;

exports.updateComment = defaultController.updateComment;

exports.deleteComment = defaultController.deleteComment;

// Likes

exports.listLikes = defaultController.listLikes;

exports.addOrDeleteLike = defaultController.addOrDeleteLike;
