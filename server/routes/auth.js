const express = require('express');
const passport = require('passport');
const router = express.Router();

// Route for initiating Google OAuth
router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Callback route after Google OAuth
router.get('/google/callback',
  passport.authenticate('google', { 
    failureRedirect: process.env.FRONTEND_URL + '/login',
    successRedirect: process.env.FRONTEND_URL
  })
);

router.get('/logout', (req, res) => {
  req.logout();
  res.json({ message: 'Logged out successfully' });
});

module.exports = router;