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
function(token, refreshToken, profile, done) {

        process.nextTick(function() {

            User.findOne({ 'google.id' : profile.id }, function(err, user) {
                if (err)
                    return done(err);

                if (user) {

                    return done(null, user);
                } else {
                    var newUser = new User();

                    newUser.providerData.google.id    = profile.id;
                    newUser.providerData.google.token = token;
                    newUser.providerData.google.name  = profile.displayName;
                    newUser.providerData.google.email = profile.emails[0].value; 

                    
                    newUser.save(function(err) {
                        if (err)
                            throw err;
                        return done(null, newUser);
                    });
                    console.log(newUser);
                }
            });
        });

    }));

};
