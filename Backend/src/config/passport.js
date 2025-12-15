const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/userModel');
const crypto = require('crypto');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback" 
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await User.findOne({ email: profile.emails[0].value });

      if (user) {
        return done(null, user);
      } else {
        user = await User.create({
          username: profile.displayName,
          email: profile.emails[0].value,
          profilePic: profile.photos[0].value,
          googleId: profile.id, 
         password: crypto.randomBytes(16).toString('hex')
        });
        return done(null, user);
      }
    } catch (error) {
      return done(error, null);
    }
  }
));

// These are required for sessions to work
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});