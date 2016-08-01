var configAuth = require('./auth.js');
var passport = require('passport');
var User = require('mongoose').model('User');
var FacebookStrategy = require('passport-facebook').Strategy;
var LocalStrategy    = require('passport-local').Strategy;
module.exports = function() {
  passport.use(new FacebookStrategy({
          clientID: configAuth.facebookAuth.clientID,
          clientSecret: configAuth.facebookAuth.clientSecret,
          callbackURL: configAuth.facebookAuth.callbackURL,  //'http://greentourism.herokuapp.com/auth/facebook/callback',
          profileFields: ['emails', 'photos', 'displayName', 'name', 'gender'],
          passReqToCallback : false,
          enableProof: true,
          session: true,
      },
      function(accessToken, refreshToken, profile, done) {
          process.nextTick(function() {
              User.findOne({'providerData.facebook.id': profile.id}, function (err, user, eq, res, next) {
                if (err) 
                  return done(err);
                if (user) {
                    done(null, user);
                } else {
                  var user = new User();
                  user.provider = 'facebook';
                  user.providerData.facebook.id = profile.id;
                  user.providerData.facebook.token = accessToken;
                  user.email = profile.emails[0].value;
                  user.avatar = profile.photos[0].value;
                  user.firstName = profile.name.givenName;
                  user.lastName = profile.name.familyName;
                  user.save(function(err) {
                    if(err) {
                     } else {
                      done(null, user);
                    }
                  });
            }
         });
      });
  }
));
};
