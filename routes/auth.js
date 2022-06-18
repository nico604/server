var express = require('express');
var passport = require('passport');
var logger  = require('morgan');

const DiscogsStrategy = require('passport-discogs').Strategy;
require('dotenv').config();
//const User = require('../models/user');
//const User = {};

//const discogsConfig = config.get('discogs');

passport.use(new DiscogsStrategy({
  consumerKey: process.env.consumerKey,
  consumerSecret: process.env.consumerSecret,
  callbackURL: '/discogo/callback',
  passReqToCallback: true
},  function verify(req, token, refreshToken, profile, done) {
   //const updateUser = function () {
    const user = req.user;
    logger.debug({ user: user }, 'user exists, updating discogs details');
    user.discogs.id = profile.id;
    user.discogs.token = token;
    return done(null, profile);
       //}
}));

passport.serializeUser(function(user, done) {
  process.nextTick(function() {
    done(null, { id: user.id, username: user.username, name: user.displayName });
  });
});

passport.deserializeUser(function(user, done) {
  process.nextTick(function() {
    return done(null, user);
  });
});



var router = express.Router();

router.get('/login', passport.authenticate('discogs'));

router.get('/discogo/callback', passport.authenticate('discogs', {
  successRedirect: '/',
  failureRedirect: '/login'
}));

module.exports = router;
