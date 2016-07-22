var User = require('mongoose').model('User');

// Get mongoose error message
var getErrorMessage = function(err) {
  var message = '';
  if (err.code) {
    switch (err.code) {
      case 11000:
      case 11001:
        message = 'Email already exists';
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
