var express = require('express');
var router = express.Router(); // eslint-disable-line new-cap
var Blog = require('../models/blog');

var blogController = require('../controllers/blog-controller');

router.route('/')
  .get(blogController.list)
  .post(blogController.create);
router.route('/:id')
  .get(blogController.show)
  .put(blogController.update)
  .delete(blogController.delete);
module.exports = router;
