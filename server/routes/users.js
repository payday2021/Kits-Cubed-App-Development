const express = require('express');
const router = express.Router();
const users = require('../services/users');

// TODO: success/error status codes + messages

router.get('/auth', function (req, res) {
  try {
    res.json({
      text: 'auth router'
    });
  } catch (error) {
    console.error('ERROR ACCESSING AUTH', error.message);
  }
});

router.post('/auth/login', function (req, res) {
  try {
    res.send(users.userSignIn(req.body));
  } catch (error) {
    console.error('ERROR LOGGING IN', error.message);
  }
});

router.post('/auth/register', function (req, res) {
  try {
    res.send(users.userSignUp(req.body));
  } catch (error) {
    console.error('ERROR REGISTERING', error);
  }
});

module.exports = router;
