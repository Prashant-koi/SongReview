const express = require('express');
const router = express.Router();
const spotifyApi = require('../config/spotify');
const auth = require('../middleware/auth');
const User = require('../models/User');

router.get('/login', auth, (req, res) => {
  const scopes = ['user-read-private', 'user-read-email', 'playlist-read-private'];
  const authorizeURL = spotifyApi.createAuthorizeURL(scopes);
  res.json({ url: authorizeURL });
});

router.get('/callback', auth, async (req, res) => {
  try {
    const { code } = req.query;
    const data = await spotifyApi.authorizationCodeGrant(code);
    
    const user = await User.findByIdAndUpdate(req.userId, {
      spotifyAccessToken: data.body.access_token,
      spotifyRefreshToken: data.body.refresh_token,
      spotifyTokenExpiry: new Date(Date.now() + data.body.expires_in * 1000)
    }, { new: true });

    res.redirect(`${process.env.CLIENT_URL}/dashboard`);
  } catch (err) {
    res.status(500).json({ message: 'Error connecting to Spotify' });
  }
});

router.get('/search', auth, async (req, res) => {
  try {
    const { query } = req.query;
    const user = await User.findById(req.userId);
    
    spotifyApi.setAccessToken(user.spotifyAccessToken);
    const data = await spotifyApi.searchTracks(query);
    
    res.json(data.body);
  } catch (err) {
    res.status(500).json({ message: 'Error searching tracks' });
  }
});

module.exports = router; 