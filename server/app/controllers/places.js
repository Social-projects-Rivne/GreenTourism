var Place = require('mongoose').model('Place');
var defaultController = require('./default-crud-controller')(Place);

exports.list = defaultController.list;

exports.create = defaultController.create;

exports.getById = defaultController.getById;

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
