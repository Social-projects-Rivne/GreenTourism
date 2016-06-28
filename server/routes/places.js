var express = require('express');
var router = express.Router();

// var defaultController = require('../controllers/default-crud-controller');
var defaultControllerWithOwner = require('../controllers/default-crud-controller-with-owner');
var authController = require('../auth/auth');

var Place = require('../models/place');

router.route('/')
  .get(authController.isAuthenticated, defaultControllerWithOwner.list(Place))
  // TODO: Restrict creating places to logged in users only
  .post(authController.isAuthenticated, defaultControllerWithOwner.create(Place));

router.route('/:id')
  .get(authController.isAuthenticated, defaultControllerWithOwner.show(Place))
  // TODO: Restrict updating places to logged in users only
  .put(authController.isAuthenticated, defaultControllerWithOwner.update(Place))
  // TODO: Restrict deleting places to logged in users only
  .delete(authController.isAuthenticated, defaultControllerWithOwner.delete(Place));

module.exports = router;
