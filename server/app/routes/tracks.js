var express = require('express');
var router = express.Router(); // eslint-disable-line new-cap

var controller = require('../controllers/track');

router.route('/')
  .get(controller.list)
  .post(controller.create);

router.route('/:id')
  .get(controller.show)
  .put(controller.update)
  .delete(controller.delete);

module.exports = router;
