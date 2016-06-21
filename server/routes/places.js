var express = require('express');
var router = express.Router();
var defaultControllers = require('../defaultControllers.js');

var Place = require('../models/place');

router.route('/')
  .get(defaultControllers.list(Place))
  // TODO: Restrict creating places to logged in users only
  .post(defaultControllers.create(Place));

router.route('/:id')
  .get(defaultControllers.show(Place))
  // TODO: Restrict updating places to logged in users only
  .put(defaultControllers.update(Place))
  // TODO: Restrict deleting places to logged in users only
  .delete(defaultControllers.delete(Place));

module.exports = router;
