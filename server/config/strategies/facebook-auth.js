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
          profileFields: ['emails', 'photos', 'displayName', 'name', 'gender', 'profileUrl'],
          //enableProof: true,
      },
      function(accessToken, refreshToken, profile, done) {
          process.nextTick(function() {
              User.findOne({'facebook.id': profile.id}, function (err, user) {
                //console.log(profile);
                if (err) 
                  return done(err);
                if (user) {
                    done(null, user);
                } else {
                  var newUser = new User();
                  newUser.facebook.id = profile.id;
                  newUser.facebook.token = accessToken;
                  newUser.facebook.name = profile.name.givenName;
                  newUser.facebook.email = profile.emails[0].value;
                  newUser.facebook.picurl = profile.photos[0].value;
                  newUser.facebook.name = profile.name.givenName + ' ' + profile.name.familyName;

                  newUser.save(function (err) {
                    if (err) 
                      return err;
                    return done(null, user);
                });
                  console.log(newUser)
            }
         });
      });
  }
));
};