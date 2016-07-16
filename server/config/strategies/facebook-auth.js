var configAuth = require('./auth.js');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var User = require('mongoose').model('User');

module.exports = function() {
  passport.use(new FacebookStrategy({
      clientID: configAuth.facebookAuth.clientID,
      clientSecret: configAuth.facebookAuth.clientSecret,
      callbackURL: configAuth.facebookAuth.callbackURL,
    },
    function(accessToken, refreshToken, profile, done) {
      User.findOne({'facebook.id': profile.id}, function(err, user){
        if (err)
          return done(err);
        if (user)
          return done(null, user);
     });
    }
  ));
};