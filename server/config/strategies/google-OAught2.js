var configAuth = require('./auth.js');
var passport = require('passport');
var User = require('mongoose').model('User');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

module.exports = function(passport) {

    
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });


	passport.use(new GoogleStrategy({
	    clientID: configAuth.gmail.clientID,
	    clientSecret: configAuth.gmail.clientSecret,
	    callbackURL: onfigAuth.gmail.callbackURL,
	  },

	   function(token, refreshToken, profile, done) {

        process.nextTick(function() {

            User.findOne({ 'google.id' : profile.id }, function(err, user) {
                if (err)
                    return done(err);

                if (user) {

                    return done(null, user);
                } else {
                    var newUser          = new User();

                    newUser.google.id    = profile.id;
                    newUser.google.token = token;
                    newUser.google.name  = profile.displayName;
                    newUser.google.email = profile.emails[0].value; // pull the first email

                    newUser.save(function(err) {
                        if (err)
                            throw err;
                        return done(null, newUser);
                    });
                }
            });
        });

    }));

};