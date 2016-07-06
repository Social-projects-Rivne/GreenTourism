var express = require('express');
var router = express.Router();

var defaultController = require('../controllers/default-crud-controller');

var Track = require('../models/track');

router.route('/')
  .get(defaultController.list(Track))
  .post(defaultController.create(Track));

router.route('/:id')
  .get(defaultController.show(Track))
  .put(defaultController.update(Track))
  .delete(defaultController.delete(Track));

module.exports = router;