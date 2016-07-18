var express = require('express');
var router = express.Router(); // eslint-disable-line new-cap

var controller = require('../controllers/users');
var auth = require('../helpers/auth.js');

router.route('/')
  .get(auth.isAdmin, controller.list);

router.route('/:id')
  .get(auth.hasAuthorization, controller.show)
  .put(auth.hasAuthorization, controller.update)
  .delete(auth.hasAuthorization, controller.delete);

module.exports = router;
