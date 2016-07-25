var express = require('express');
var router = express.Router(); // eslint-disable-line new-cap

var controller = require('../controllers/users');
var auth = require('../helpers/auth.js');

router.route('/')
  .get(auth.isAdmin, controller.list);

router.route('/me')
  .get(auth.isLoggedIn, controller.showMe);

router.route('/:id')
  .get(auth.isCurrentUser, controller.show)
  .put(auth.isCurrentUser, controller.update)
  .delete(auth.isCurrentUser, controller.delete);

router.route('/:id/places')
  .get(auth.isLoggedIn, controller.listPlaces);

router.route('/:id/tracks')
  .get(auth.isLoggedIn, controller.listTracks);

module.exports = router;
