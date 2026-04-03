const express = require('express');
const passport = require('passport');
const router = express.Router();

// Google login
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google callback
router.get('/google/callback', (req, res, next) => {
  passport.authenticate('google', (err, user, info) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!user) return res.status(401).json({ error: 'Authentication failed' });
    req.login(user, (loginErr) => {
      if (loginErr) return res.status(500).json({ error: loginErr.message });
      req.session.save(() => {
        res.redirect('/api-docs');
      });
    });
  })(req, res, next);
});

// Logout
router.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect('/');
  });
});

// Get current user
router.get('/current-user', (req, res) => {
  if (!req.user) return res.status(401).json({ message: 'Not logged in' });
  res.json({ user: req.user });
});

module.exports = router;
