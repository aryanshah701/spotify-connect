const express = require('express');
const request = require('request');
const router = express.Router();
const CLIENT_SECRET = require('../config/secret');
const REDIRECT_URI = require('../config/id');

// URL and Query Parameters
const CLIENT_ID = '55aa22f2255c491292a71619bde59924';
const URL = 'https://accounts.spotify.com/authorize?';
const AUTH_URL =
  URL +
  'client_id=' +
  CLIENT_ID +
  '&response_type=code&redirect_uri=' +
  REDIRECT_URI +
  '&scope=user-top-read%20user-read-email&state=34fFs29kd09';

// Redirect User to Spotify for authorization request
router.get('/', function (req, res, next) {
  res.redirect(AUTH_URL);
});

// Callback from spotify with auth code
router.get('/callback', function (req, res, next) {
  // Get auth code from req
  let code = req.query.code || null;

  // Set all the auth options as required for POST
  let authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    form: {
      code: code,
      redirect_uri: 'http://localhost:9000/login/callback',
      grant_type: 'authorization_code',
    },
    headers: {
      Authorization:
        'Basic ' +
        Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64'),
    },
    json: true,
  };

  // Sent spotify POST request to get access token
  request.post(authOptions, function (error, response, body) {
    var access_token = body.access_token;
    let uri = process.env.FRONTEND_URI || 'http://localhost:3000';
    console.log('From final POST');
    console.log(body);

    // Redirect back to the client with access token
    res.redirect(uri + '?access_token=' + access_token);
  });
});

module.exports = router;
