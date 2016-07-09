var express = require('express');
var router = express.Router();

var Track = require('../models/track');
var defaultController = require('../controllers/default-crud-controller')(Track);

router.route('/')
  .get(defaultController.list)
  .post(defaultController.create);

router.route('/:id')
  .get(defaultController.show)
  .put(defaultController.update)
  .delete(defaultController.delete);

module.exports = router;