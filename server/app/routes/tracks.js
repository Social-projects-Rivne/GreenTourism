var express = require('express');
var router = express.Router(); // eslint-disable-line new-cap

var controller = require('../controllers/tracks');
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
  .post(auth.isLoggedIn, controller.createComment);

router.route('/:id/likes')
  .get(controller.listLikes)
  .post(auth.isLoggedIn, controller.addOrDeleteLike);

router.route('/:id/comments/:commentId')
  .get(controller.showComment)
  .put(auth.isCommentAuthor, controller.updateComment)
  .delete(auth.isCommentAuthor, controller.deleteComment);

router.param('commentId', controller.getCommentById);

module.exports = router;
