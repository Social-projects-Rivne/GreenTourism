var express = require('express');
var router = express.Router();  // eslint-disable-line new-cap

var User = require('../models/user');
var userController = require('../controllers/default-crud-controller')(User);
//var authController = require('../auth/auth');

router.route('/')
  // TODO: Make users can't see user list!
  .get(userController.list)
  .post(userController.create);

// TODO: Make user can see, edit and delete only himself!
router.route('/:id')
  .get(userController.show)
  .put(userController.update)
  .delete(userController.delete);

module.exports = router;
