var express = require('express');
var router = express.Router();

var defaultControllers = require('../defaultControllers.js');

var Track = require('../models/tracks');

router.route('/')
  .get(defaultControllers.list(Track))
  // TODO: Restrict creating places to logged in users only
  .post(defaultControllers.create(Track));

router.route('/:id')
  .get(defaultControllers.show(Track))
  // TODO: Restrict updating places to logged in users only
  .put(defaultControllers.update(Track))
  // TODO: Restrict deleting places to logged in users only
  .delete(defaultControllers.delete(Track));

module.exports = router;
