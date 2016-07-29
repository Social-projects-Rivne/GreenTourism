var Blog = require('../models/blog');
var User = require('mongoose').model('User');

exports.list = function (req, res) {
  Blog.blog.findAll({
    where: req.query,
    order: 'createdAt ASC',
    limit: 10,
    include: [
      {model: Blog.photos},
      {model: Blog.categories},
      {model: Blog.comment},
      {model: Blog.likes}
    ],
    raw: true
  })
      .then(function(records) {
        records.forEach(function (item, index) {
          User.findById("5796858fdb537888027dea86", 'avatar firstName lastName', {lean: true}, function (err, user) {
            item.userId = user;
            if(index == records.length-1){
              res.json(records);
            }
          });
        });
      })
      .catch(function (err) {
        res.status(400).json({message: err.message});
      });
};
exports.show = function (req, res) {
  Blog.blog.findOne({
    where: {id: req.params.id},
    include: [
      {model: Blog.photos},
      {model: Blog.categories},
      {model: Blog.comment},
      {model: Blog.likes}
    ]
  })
      .then(function (record) {
        if (!record) {
          res.status(404).json({
            message: 'Record with id ' + req.params.id +
            ' was not found!'
          });
        } else {
          res.json(record);
        }
      });
};

exports.category = function (req, res) {
  Blog.categories.findAll({
    where: req.query
  })
      .then(function (records) {
        res.json(records);
      })
      .catch(function (err) {
        res.status(400).json({message: err.message});
      });
};
exports.popular = function (req, res) {
  Blog.blog.findAll({
    where: req.query,
    include: [
      {model: Blog.photos},
      {model: Blog.comment},
      {model: Blog.likes}
    ]
  })
      .then(function (records) {
        res.json(records);
      })
      .catch(function (err) {
        res.status(400).json({message: err.message});
      });
};

exports.create = function (req, res) {
  if (!req.body) {
    res.sendStatus(400);
  } else {
    model.create(req.body)
        .then(function (record) {
          res.status(201).json({
            message: 'Record was successfully created!',
            record: record
          });
        })
        .catch(function (err) {
          res.status(400).json({message: err.message, errors: err.errors});
        });
  }
};
exports.update = function (req, res) {
  if (!req.body) {
    res.sendStatus(400);
  } else {
    model.update(req.body, {where: {id: req.params.id}})
        .then(function () {
          res.status(200).json({
            message: 'Record ' + req.params.id +
            ' was successfully updated'
          });
        })
        .catch(function (err) {
          res.status(400).json({message: err.message, errors: err.errors});
        });
  }
};
exports.delete = function (req, res) {
  model.destroy({where: {id: req.params.id}})
      .then(function () {
        res.status(200).json({
          message: 'Record ' + req.params.id +
          ' was successfully deleted'
        });
      })
      .catch(function (err) {
        res.status(400).json({message: err.message});
      });
};
