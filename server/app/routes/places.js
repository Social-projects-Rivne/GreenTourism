var express = require('express');
var router = express.Router(); // eslint-disable-line new-cap

var controller = require('../controllers/places');
var auth = require('../helpers/auth.js');

// TODO: Refactor routes so there is no need to raise 403 inside controller
// TODO: Use app.param()

router.route('/')
  .get(controller.list)
  .post(auth.isLoggedIn, controller.create);

router.route('/:id')
  .get(controller.show)
  .put(auth.isLoggedIn, controller.update)
  .delete(auth.isLoggedIn, controller.delete);

module.exports = router;
