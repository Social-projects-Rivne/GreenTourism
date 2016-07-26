var express = require('express');
var router = express.Router(); // eslint-disable-line new-cap

var passport = require('passport');
var authController = require('../controllers/auth-controller');

router.route('/signup').post(authController.signup);

router.route('/login').post(
  passport.authenticate('local', {
    successRedirect: '/#!/profile',
    failureRedirect: '/',
    failureFlash: 'Invalid email or password!'
  })
);

router.route('/logout').get(authController.logout);

//FACEBOOK
router.route('/auth/facebook').get(
  passport.authenticate('facebook', { scope: ['email'] }));

router.route('/auth/facebook/callback').get(
  passport.authenticate('facebook', { successRedirect: '/#!/profile',
                                      failureRedirect: '/#!/login' }));



//google
router.route('/auth/google').get(
  passport.authenticate('google', {scope: [
       'https://www.googleapis.com/auth/plus.login',
       'https://www.googleapis.com/auth/plus.profile.emails.read'] }));


function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/#/login');
}


module.exports = router;
