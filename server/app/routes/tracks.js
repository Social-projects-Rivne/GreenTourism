var express = require('express');
var router = express.Router(); // eslint-disable-line new-cap

var controller = require('../controllers/tracks');

// TODO: Refactor routes so there is no need to raise 403 inside controller
// TODO: Use app.param()

router.route('/')
  .get(controller.list)
  .post(controller.create);

router.route('/:id')
  .get(controller.show)
  .put(controller.update)
  .delete(controller.delete);

module.exports = router;
