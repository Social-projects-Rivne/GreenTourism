var express = require('express');
var router = express.Router();

var defaultController = require('../controllers/default-crud-controller');
//var authController = require('../auth/auth');

var User = require('../models/user');

router.route('/')
  // TODO: Make users can't see user list!
  .get(defaultController.list(User))
  .post(defaultController.create(User));

// TODO: Make user can see, edit and delete only himself!
router.route('/:id')
  .get(defaultController.show(User))
  .put(defaultController.update(User))
  .delete(defaultController.delete(User));

module.exports = router;
