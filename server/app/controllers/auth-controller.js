var User = require('mongoose').model('User');
var getErrorMessage = require('../helpers/errors').getErrorMessage;
var crypto = require('crypto');
var smtpTransport = require('../../config/nodemailer');
var mail = require('../helpers/mail');

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

exports.forgot = function(req, res, next) {
  crypto.randomBytes(20, function(err, buf) {
    var token = buf.toString('hex');

    if (err) return res.status(500).json(err);

    User.findOne({email: req.body.email}, function(err, user) {
      if (err) return res.status(500).json(err);

      if (!user) {
        req.flash('error', 'No account with that email address exists.');
        return res.redirect('/');
      }

      user.resetPasswordToken = token;
      user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

      user.save(function(err) {
        if (err) return res.status(500).json(err);

        var letter = mail.forgotPassword(user.email, token, req.headers.host);

        smtpTransport.sendMail(letter, function(err) {
          if (err) {
            return res.status(500).json(err);
          }

          req.flash('info', 'An e-mail has been sent to ' + user.email +
            ' with further instructions.');

          return res.redirect('/');
        });
      });
    });
  });
};

exports.getReset = function(req, res) {
  User.findOne({
    resetPasswordToken: req.params.token,
    resetPasswordExpires: {$gt: Date.now()}
  },
  function(err, user) {
    if (err) return res.json(err);

    if (!user) {
      req.flash('error', 'Password reset token is invalid or has expired.');
      return res.redirect('/');
    }

    res.render('reset', {
      user: req.user
    });
  });
};

exports.postReset = function(req, res) {
  User.findOne({
    resetPasswordToken: req.params.token,
    resetPasswordExpires: {$gt: Date.now()}
  },
  function(err, user) {
    if (err) return res.status(500).json(err);

    if (!user) {
      req.flash('error', 'Password reset token is invalid or has expired.');
      return res.redirect('back');
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    user.save(function(err) {
      if (err) return res.status(500).json(err);

      req.login(user, function(err) {
        if (err) return res.status(500).json(err);

        var letter = mail.passwordResetSuccess(user.email);

        smtpTransport.sendMail(letter, function(err) {
          if (err) return res.status(500).json(err);

          req.flash('success', 'Success! Your password has been changed.');

          res.redirect('/');
        });
      });
    });
  });
};
