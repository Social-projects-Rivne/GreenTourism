var express = require('express');
var router = express.Router(); // eslint-disable-line new-cap

var controller = require('../controllers/users');
var auth = require('../helpers/auth.js');

router.route('/')
  .get(auth.isAdmin, controller.list);

router.route('/:id')
  .get(auth.isCurrentUser, controller.show)
  .put(auth.isCurrentUser, controller.update)
  .delete(auth.isCurrentUser, controller.delete);

router.param('id', controller.getById);

router.route('/me')
  .get(auth.isLoggedIn, controller.showMe);

router.route('/:id/places')
  .get(auth.isLoggedIn, controller.myPlaces);

router.route('/:id/tracks')
  .get(auth.isLoggedIn, controller.myTracks);

router.route('/:id/places/favorite')
  .get(auth.isLoggedIn, controller.favoritePlaces);

router.route('/:id/tracks/favorite')
  .get(auth.isLoggedIn, controller.favoriteTracks);

module.exports = router;
