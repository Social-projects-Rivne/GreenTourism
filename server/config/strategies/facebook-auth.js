var configAuth = require('./auth.js');
var passport = require('passport');
var User = require('mongoose').model('User');
var FacebookStrategy = require('passport-facebook').Strategy;

module.exports = function() {
  passport.use(new FacebookStrategy({
      clientID: configAuth.facebookAuth.clientID,
      clientSecret: configAuth.facebookAuth.clientSecret,
      callbackURL: configAuth.facebookAuth.callbackURL,
    },
    function(accessToken, refreshToken, profile, done) {
      User.findOne({facebookid: profile.id}, function(err, user){
        if (err)
          return done(err);
          console.log('smth went wrong');
        if (user)
          return done(null, user);
     });
    }
  ));
};