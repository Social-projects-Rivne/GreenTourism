var express = require('express');
var router = express.Router(); // eslint-disable-line new-cap

var controller = require('../controllers/tracks');
var auth = require('../helpers/auth.js');

router.route('/')
  .get(controller.list)
  .post(auth.isLoggedIn, controller.create);

router.route('/:id')
  .get(controller.show)
  .put(auth.isOwner, controller.update)
  .delete(auth.isOwner, controller.delete);

router.param('id', controller.getById);

module.exports = router;
