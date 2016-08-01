var express = require('express');
var router = express.Router(); // eslint-disable-line new-cap

var Event = require('mongoose').model('Event');
var EventController = require('../controllers/events');

router.route('/')
  .get(EventController.list)
  // TODO: Restrict creating Events to logged in users only
  .post(EventController.create);

router.route('/:id')
  .get(EventController.show)
  // TODO: Restrict updating Events to logged in users only
  .put(EventController.update)
  // TODO: Restrict deleting Events to logged in users only
  .delete(EventController.delete);

module.exports = router;
