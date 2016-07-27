var configAuth = require('./auth.js');
var passport = require('passport');
var User = require('mongoose').model('User');
var GoogleStrategy = require('passport-google-oauth2').Strategy;
var LocalStrategy = require('passport-local').Strategy;

module.exports = function() {
    passport.use(new GoogleStrategy({
        clientID: configAuth.googleAuth.clientID,
        clientSecret: configAuth.googleAuth.clientSecret,
        callbackURL: configAuth.googleAuth.callbackURL,
        passReqToCallback   : true
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
                  user.providerData.google.id = profile.id;
                  user.providerData.google.token = accessToken;
                  user.name = profile.displayName
                  user.email = profile.emails[0].value;

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
