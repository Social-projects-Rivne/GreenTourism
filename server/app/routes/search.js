var express = require('express');
var router = express.Router();

var controller = require('../controllers/search');

router.route('/')
  .get(controller.list);
router.route('/search')
  .get(controller.list);

module.exports = router;