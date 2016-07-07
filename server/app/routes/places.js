var express = require('express');
var router = express.Router();

var defaultController = require('../controllers/default-crud-controller');
//var defaultControllerWithOwner = require('../controllers/default-crud-controller-with-owner');
//var authController = require('../auth/auth');

var Place = require('mongoose').model('Place');

router.route('/')
  .get(defaultController.list(Place))
  // TODO: Restrict creating places to logged in users only
  .post(defaultController.create(Place));

router.route('/:id')
  .get(defaultController.show(Place))
  // TODO: Restrict updating places to logged in users only
  .put(defaultController.update(Place))
  // TODO: Restrict deleting places to logged in users only
  .delete(defaultController.delete(Place));

module.exports = router;
