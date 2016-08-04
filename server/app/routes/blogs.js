var express = require('express');

var router = express.Router(); // eslint-disable-line new-cap

var blogController = require('../controllers/blog-controller');

router.route('/')
  .get(blogController.list)
  .post(blogController.create);

router.route('/popular')
  .get(blogController.popular);

router.route('/category')
  .get(blogController.category);

router.route('/:id')
  .get(blogController.show)
  .put(blogController.update)
  .delete(blogController.delete);

router.route('/comment')
  .post(blogController.createComment);
router.route('/comment/:id')
  .get(blogController.showComment)
  .put(blogController.editComment)
  .delete(blogController.deleteComment);

router.route('/like')
    .post(blogController.addLike);
router.route('/like/:id')
    .delete(blogController.removeLike);

module.exports = router;
