var configAuth = require('./auth.js');
var passport = require('passport');
var User = require('mongoose').model('User');
var GoogleStrategy = require('passport-google-oauth2').Strategy;

module.exports = function() {
  passport.use(new GoogleStrategy({
      clientID: configAuth.googleAuth.clientID,
      clientSecret: configAuth.googleAuth.clientSecret,
      callbackURL: configAuth.googleAuth.callbackURL,
    },
    function(accessToken, refreshToken, profile, done) {
      process.nextTick(function() {
        User.findOne({
          'providerData.google.id': profile.id
        }, function(err, user, eq, res, next) {
          if (err)
            return done(err);
          if (user) {
            done(null, user);
          } else {
            var user = new User();
            user.provider = 'google';
            user.providerData.google.id = profile.id;
            user.providerData.google.token = accessToken;
            user.email = profile.emails[0].value;
            user.avatar = profile.photos[0].value;
            user.firstName = profile.name.givenName;
            user.lastName = profile.name.familyName;
            user.save(function(err) {
              if (err) {} else {
                done(null, user);
              }
            });
          }
        });
      });
    }
  ));
};
