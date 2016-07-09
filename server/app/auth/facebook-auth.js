/*var FacebookStrategy = require('passport-facebook').Strategy;

var FACEBOOK_APP_ID = 'your app id';  // Remove this from git repo
var FACEBOOK_APP_SECRET = 'your app secret';  // Remove this from git repo

passport.use(new FacebookStrategy({
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: 'http://localhost:' + PORT + '/auth/facebook/callback'
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOrCreate(..., function(err, user) {
      if (err) { return done(err); }
      done(null, user);
    });
  }
));*/
