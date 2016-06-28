var express = require('express');
var router = express.Router();

var defaultController = require('../controllers/default-crud-controller');
var authController = require('../auth/auth');

var User = require('../models/user');

router.route('/')
  // TODO: Make users can't see user list!
  .get(authController.isAuthenticated, defaultController.list(User))
  .post(defaultController.create(User));

// TODO: Make user can see, edit and delete only himself!
router.route('/:id')
  .get(authController.isAuthenticated, defaultController.show(User))
  .put(authController.isAuthenticated, defaultController.update(User))
  .delete(authController.isAuthenticated, defaultController.delete(User));

module.exports = router;
