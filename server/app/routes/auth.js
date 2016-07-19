var express = require('express');
var router = express.Router(); // eslint-disable-line new-cap

var passport = require('passport');
var authController = require('../controllers/auth-controller');

router.route('/signup').post(authController.signup);

router.route('/login').post(
  passport.authenticate('local', {
    successRedirect: '/#!/profile',
    failureRedirect: '/',
    failureFlash: 'Invalid email or password!'
  })
);

router.route('/logout').get(authController.logout);

module.exports = router;
