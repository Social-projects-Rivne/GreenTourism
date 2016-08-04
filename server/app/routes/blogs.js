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

router.route('/comment/:id')
  .delete(blogController.deleteComments);

module.exports = router;
