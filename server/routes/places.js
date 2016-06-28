var express = require('express');
var router = express.Router();

// var defaultController = require('../controllers/default-controller');
var defaultOwnerController = require('../controllers/default-owner-controller');
var authController = require('../auth/auth');

var Place = require('../models/place');

router.route('/')
  .get(authController.isAuthenticated, defaultOwnerController.list(Place))
  // TODO: Restrict creating places to logged in users only
  .post(authController.isAuthenticated, defaultOwnerController.create(Place));

router.route('/:id')
  .get(authController.isAuthenticated, defaultOwnerController.show(Place))
  // TODO: Restrict updating places to logged in users only
  .put(authController.isAuthenticated, defaultOwnerController.update(Place))
  // TODO: Restrict deleting places to logged in users only
  .delete(authController.isAuthenticated, defaultOwnerController.delete(Place));

module.exports = router;
