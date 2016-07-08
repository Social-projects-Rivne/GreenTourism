var express = require('express');
var router = express.Router();  // eslint-disable-line new-cap

var User = require('mongoose').model('User');
var userController = require('../controllers/default-crud-controller')(User);
var passport = require('passport');

/*
router.route('/me').get(passport.authenticate('basic', {session: false}),
  function(req, res) {
    res.json(req.user);
  }
);
*/

router.route('/me').get(passport.authenticate('basic', {session: false}),
  function(req, res) {
    res.json(req.user);
  });

router.route('/signup').post(userController.create);

router.route('/login').post(passport.authenticate('basic', {session: false}),
  function(req, res) {
    res.json(req.user);
  });

router.route('/logout').get(function(req, res) {
  req.logout();
});

module.exports = router;
