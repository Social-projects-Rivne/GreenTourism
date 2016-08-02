var express = require('express');
var router = express.Router(); // eslint-disable-line new-cap

var controller = require('../controllers/places');
var auth = require('../helpers/auth.js');

router.route('/')
  .get(controller.list)
  .post(auth.isLoggedIn, controller.create);

router.route('/:id')
  .get(controller.show)
  .put(auth.isOwner, controller.update)
  .delete(auth.isOwner, controller.delete);

router.param('id', controller.getById);

router.route('/:id/comments')
  .get(controller.listComments)
  .post(controller.createComment);

router.route('/:id/likes')
  .get(controller.listLikes)
  .post(auth.isLoggedIn, controller.createDeleteLike);

router.route('/:id/comments/:commentId')
  .get(controller.showComment)
  .put(controller.updateComment) // TODO: Only author should hace access to change comment
  .delete(controller.deleteComment); // TODO: Only author should hace access to delete comment

router.param('commentId', controller.getCommentById);

module.exports = router;
