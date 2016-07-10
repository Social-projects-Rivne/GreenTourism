var express = require('express');
var router = express.Router(); // eslint-disable-line new-cap

var User = require('mongoose').model('User');
var passport = require('passport');

// router.route('/me').get();

// Get mongoose error message
var getErrorMessage = function(err) {
  var message = '';
  if (err.code) {
    switch (err.code) {
      case 11000:
      case 11001:
        message = 'Username already exists';
        break;
      default:
        message = 'Something went wrong';
    }
  } else {
    for (var errName in err.errors) {
      if (err.errors[errName].message) message = err.errors[errName].message;
    }
  }
  return message;
};

router.route('/signup').post(function(req, res, next) {
  if (!req.user) { // eslint-disable-line no-negated-condition
    var user = new User(req.body);

    user.provider = 'local';

    user.save(function(err) {
      if (err) {
        var message = getErrorMessage(err);

        req.flash('error', message);
        return res.redirect('/#!/signup');
      }

      req.login(user, function(err) {
        if (err) {
          return next(err);
        }

        return res.redirect('/');
      });
    });
  } else {
    return res.redirect('/');
  }
});

router.route('/login').post(
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/#!/login',
    failureFlash: 'Invalid email or password!'
  })
);

router.route('/logout').get(function(req, res) {
  req.logout();
  res.redirect('/');
});

module.exports = router;
