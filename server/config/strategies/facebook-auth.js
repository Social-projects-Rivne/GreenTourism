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
              User.findOne({'email': profile.email}, function (err, user, eq, res, next) {
                //console.log(profile);
                if (err) 
                  return done(err);
                if (user) {
                    done(null, user);
                } else {
                  var user = new User();
                  user.providerData.facebook.fbid = profile.id;
                  user.providerData.facebook.fbtoken = accessToken;
                  user.email = profile.emails[0].value;
                  user.avatar = profile.photos[0].value;
                  user.firstName = profile.name.givenName;
                  user.lastName =  profile.name.familyName;

                  user.save(function(err) {
                    if(err) {
                      console.log(err);  //handle errors!
                     } else {
                      console.log("saving user ...");
                      done(null, user);
                    }
                  });
                  console.log(user)
            }
         });
      });
  }
));
};
