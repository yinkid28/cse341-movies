const express = require('express');
const passport = require('passport');
const router = express.Router();

// Start Google login
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google callback
router.get('/google/callback', (req, res, next) => {
  // Guard: if no code param, Google didn't send one — don't re-process
  if (!req.query.code) {
    return res.redirect('/');
  }
  passport.authenticate('google', {
    failureRedirect: '/',
    failureMessage: true
  })(req, res, (err) => {
    if (err) {
      console.error('OAuth callback error:', err);
      return res.status(500).json({ error: 'OAuth failed', details: err.message });
    }
    // Log failure messages stored in session
    if (req.session && req.session.messages && req.session.messages.length) {
      console.error('OAuth failure messages:', req.session.messages);
    }
    res.redirect('/api-docs');
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