var User = require('mongoose').model('User');
var getErrorMessage = require('../helpers/errors').getErrorMessage;

exports.saveOAuthUserProfile = function(req, profile, done) {
  User.findOne({
    provider: profile.provider,
    providerId: profile.providerId
  }, function(err, user) {
    if (err) return done(err);

    if (!user) {
      user = new User(profile);

      user.save(function(err, user) {
        if (err) {
          var message = getErrorMessage(err);

          req.flash('error', message);
          return done(err);
        }

        return done(err, user);
      });
    }

    return done(err, user);
  });
};
