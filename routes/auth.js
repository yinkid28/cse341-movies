const express = require('express');
const passport = require('passport');
const router = express.Router();

// Start Google login
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google callback
router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    // Explicitly save session to MongoStore before redirecting.
    // Without this, the redirect can beat the async session save,
    // causing the next request to have no user (401).
    req.session.save((err) => {
      if (err) console.error('Session save error:', err);
      res.redirect('/api-docs');
    });
  }
);

// Debug: check if session is alive (hit this after login to verify)
router.get('/status', (req, res) => {
  res.json({
    authenticated: req.isAuthenticated(),
    user: req.user || null,
    sessionID: req.sessionID
  });
});

// Logout
router.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect('/');
  });
});

// Check who's logged in
router.get('/current-user', (req, res) => {
  if (!req.user) return res.status(401).json({ message: 'Not logged in' });
  res.json({ user: req.user });
});

module.exports = router;