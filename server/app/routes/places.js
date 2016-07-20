var express = require('express');
var router = express.Router(); // eslint-disable-line new-cap

var Place = require('mongoose').model('Place');
var placeController = require('../controllers/default-crud-controller')(Place);
//var defaultControllerWithOwner = require('../controllers/default-crud-controller-with-owner');
//var authController = require('../auth/auth');

router.route('/')
  .get(placeController.list)
  // TODO: Restrict creating places to logged in users only
  .post(placeController.create);

router.route('/:id')
  .get(placeController.show)
  // TODO: Restrict updating places to logged in users only
  .put(placeController.update)
  // TODO: Restrict deleting places to logged in users only
  .delete(placeController.delete);

router.route('/:id/comments')
  .get(placeController.listComments);

router.route('/:id/comments/:commentId')
  .get(placeController.showComment)
  // TODO: add POST
  .put(placeController.updateComment)
  .delete(placeController.deleteComment);

module.exports = router;
