var User = require('mongoose').model('User');
var getErrorMessage = require('../helpers/errors').getErrorMessage;

// Get mongoose error message

exports.signup = function(req, res, next) {
  if (!req.user) { // eslint-disable-line no-negated-condition
    var user = new User(req.body);

    user.provider = 'local';

    user.save(function(err) {
      if (err) {
        var message = getErrorMessage(err);

        req.flash('error', message);
        return res.redirect('/');
      }

      req.login(user, function(err) {
        if (err) {
          return next(err);
        }

        return res.redirect('/#!/profile');
      });
    });
  } else {
    return res.redirect('/#!/profile');
  }
};

exports.logout = function(req, res) {
  req.logout();
  res.redirect('/');
};
