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

router.route('/auth/facebook').get(
  passport.authenticate('facebook', {
    failureRedirect: '/',
    scope: ['email']
  }
));

router.route('/auth/facebook/callback').get(
  passport.authenticate('facebook', {
    successRedirect: '/#!/profile',
    failureRedirect: '/'
  })
);

router.route('/auth/google').get(
  passport.authenticate('google', {
    failureRedirect: '/',
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email'
    ]
  })
);

router.route('/auth/google/callback').get(
  passport.authenticate('google', {
    successRedirect: '/#!/profile',
    failureRedirect: '/'
  })
);

module.exports = router;
