var express = require('express');

var router = express.Router(); // eslint-disable-line new-cap

var blogController = require('../controllers/blog-controller');
var auth = require('../helpers/auth.js');

router.route('/')
  .get(blogController.list)
  .post(auth.isLoggedIn, blogController.create);

router.route('/popular')
  .get(blogController.popular);

router.route('/category')
  .get(blogController.category);

router.route('/:id')
  .get(blogController.show)
  .put(blogController.update)
  .delete(blogController.delete);

router.route('/comment')
  .post(auth.isLoggedIn, blogController.createComment);
router.route('/comment/:id')
  .get(blogController.showComment)
  .put(blogController.editComment)
  .delete(blogController.deleteComment);

router.route('/like')
    .post(auth.isLoggedIn, blogController.addLike);
router.route('/like/:id')
    .delete(blogController.removeLike);

module.exports = router;
