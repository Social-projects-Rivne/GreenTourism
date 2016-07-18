var express = require('express');
var router = express.Router(); // eslint-disable-line new-cap

var Track = require('mongoose').model('Track');
var trackController = require('../controllers/track-crud-controller')(Track);

router.route('/')
  .get(trackController.list)
  .post(trackController.create);

router.route('/:id')
  .get(trackController.show)
  .put(trackController.update)
  .delete(trackController.delete);

module.exports = router;
