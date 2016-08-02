var Place = require('mongoose').model('Place');
var defaultController = require('./default-crud-controller')(Place);
var sliceQueryOptions = require('../helpers/slice-query-options');

exports.list = function(req, res) {
  var projection = [
    '-description',
    '-comments',
    '-owner',
    '-createdAt',
    '-updatedAt'
  ].join(' ');

  if (req.query.type) {
    req.query.type = {$in: req.query.type};
  }
  if (req.query.locationSW && req.query.locationNE) {
    req.query.location = {
      $geoWithin: {
        $box: [
          req.query.locationSW,
          req.query.locationNE
        ]
      }
    };
  }

  delete req.query.locationSW;
  delete req.query.locationNE;

  var queryAndOptions = sliceQueryOptions(req.query);

  Place.find(queryAndOptions.query, projection, queryAndOptions.options,
    function(err, records) {
      if (err) {
        return res.status(400).json(err);
      }

      return res.json(records);
    }
  );
};

exports.getById = function(req, res, next, id) {
  Place.findById(id).populate({
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
