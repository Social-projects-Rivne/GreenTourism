var Blog = require('../models/blog');
var User = require('mongoose').model('User');
var _ = require('lodash');
var sliceQueryOptions = require('../helpers/slice-query-options');

exports.list = function(req, res) {
  var queryAndOptions = sliceQueryOptions(req.query);
  Blog.blog.findAll({
    where: queryAndOptions.query,
    order: 'createdAt ASC',
    limit: _.toNumber(queryAndOptions.options.limit) || 100,
    include: [
      {model: Blog.categories},
      {model: Blog.comment},
      {model: Blog.likes}
    ]
  })
      .then(function(records) {
        records.forEach(function(item, index) {
          User.findById(item.owner, 'firstName lastName fullName', function(err, user) {
            item.owner = user;
            if (index === records.length - 1) {
              res.json(records);
            }
          });
        });
      })
      .catch(function(err) {
        res.status(400).json({message: err.message});
      });
};
exports.show = function(req, res) {
  Blog.blog.findOne({
    where: {id: req.params.id},
    include: [
      {model: Blog.categories},
      {model: Blog.comment},
      {model: Blog.likes}
    ]
  })
      .then(function(record) {
        if (record) {
          User.findById(record.owner, 'firstName lastName fullName', function(err, user) {
            record.owner = user;
            if (_.isEmpty(record.blogComments)) {
              res.json(record);
            } else {
              record.blogComments.forEach(function(item, index) {
                User.findById(item.author, 'firstName lastName fullName avatar', function(err, user) {
                  item.author = user;
                  if (index === record.blogComments.length - 1) {
                    res.json(record);
                  }
                });
              });
            }
          });
        } else {
          res.status(404).json({
            message: 'Record with id ' + req.params.id +
            ' was not found!'
          });
        }
      });
};

exports.category = function(req, res) {
  Blog.categories.findAll({
    where: req.query
  })
      .then(function(records) {
        res.json(records);
      })
      .catch(function(err) {
        res.status(400).json({message: err.message});
      });
};
exports.popular = function(req, res) {
  Blog.blog.findAll({
    where: req.query,
    include: [
      {model: Blog.comment},
      {model: Blog.likes}
    ]
  })
      .then(function(records) {
        res.json(records);
      })
      .catch(function(err) {
        res.status(400).json({message: err.message});
      });
};

exports.create = function(req, res) {
  if (req.body) {
    for(var key in req.body){
      console.log("!!!!!!: " + key);
    }
    Blog.blog.create(req.body).then(function(record) {
          res.status(201).json({
            message: 'Record was successfully created!',
            record: record
          });
        })
        .catch(function(err) {
          res.status(400).json({message: err.message, errors: err.errors});
        });
  } else {
    res.sendStatus(400);
  }
};
exports.update = function(req, res) {
  if (!req.body) {
    res.sendStatus(400);
  } else {
    model.update(req.body, {where: {id: req.params.id}})
        .then(function() {
          res.status(200).json({
            message: 'Record ' + req.params.id +
            ' was successfully updated'
          });
        })
        .catch(function(err) {
          res.status(400).json({message: err.message, errors: err.errors});
        });
  }
};
exports.delete = function(req, res) {
  Blog.blog.destroy({where: {id: req.params.id}})
      .then(function() {
        res.status(200).json({
          message: 'Record ' + req.params.id + ' was successfully deleted',
          id: req.params.id
        });
      })
      .catch(function(err) {
        res.status(400).json({message: err.message});
      });
};

exports.showComment = function(req, res) {
  Blog.comment.findOne({
    where: {id: req.params.id}
  })
      .then(function(record) {
        if (record) {
          User.findById(record.author, 'firstName lastName fullName avatar', function(err, user) {
            record.author = user;
            res.json(record);
          });
        } else {
          res.status(404).json({
            message: 'Record with id ' + req.params.id +
            ' was not found!'
          });
        }
      });
};
exports.editComment = function(req, res) {

  Blog.comment.update(
      {
        text: req.body.data
      },
      {
        where: {id: req.params.id}
      })
      .then(function(record) {
        if (record) {
          res.json(record);
        } else {
          res.status(404).json({
            message: 'Record with id ' + req.params.id +
            ' was not found!'
          });
        }
      });
};
exports.createComment = function(req, res) {
  if (req.body) {
    Blog.comment.create(req.body)
        .then(function(record) {
          res.status(201).json({
            message: 'Record was successfully created!',
            record: record
          });
        })
        .catch(function(err) {
          res.status(400).json({message: err.message, errors: err.errors});
        });
  } else {
    res.sendStatus(400);
  }
};
exports.deleteComment = function(req, res) {
  Blog.comment.destroy({where: {id: req.params.id}})
      .then(function() {
        res.status(200).json({
          message: 'Record ' + req.params.id +
          ' was successfully deleted'
        });
      })
      .catch(function(err) {
        res.status(400).json({message: err.message});
      });
};

exports.addLike = function(req, res) {
  if (req.body) {
    Blog.likes.create(req.body)
        .then(function(like) {
          res.status(201).json({
            message: 'Record was successfully created!',
            record: like
          });
        })
        .catch(function(err) {
          res.status(400).json({message: err.message, errors: err.errors});
        });
  } else {
    res.sendStatus(400);
  }
};
exports.removeLike = function(req, res) {
  Blog.likes.destroy({where: {author: req.params.id}})
      .then(function() {
        res.status(200).json({
          message: 'Like ' + req.params.id +
          ' was successfully deleted'
        });
      })
      .catch(function(err) {
        res.status(400).json({message: err.message});
      });
};