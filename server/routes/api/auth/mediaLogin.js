'use strict';

const admin = require('firebase-admin');
const jwt = require('jsonwebtoken');
const config = require('config');
const { validationResult } = require('express-validator');

const User = require('../../../models/User');

const serviceAccount = config.get('firebaseAdminPrivateKey');
const defaultApp = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://class21-dev.firebaseio.com',
});

const mediaLogin = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { socialToken } = req.body;

  try {
    const decodedToken = await defaultApp.auth().verifyIdToken(socialToken);
    const { email } = decodedToken;

    let user = await User.findOne({ email });

    if (!email) {
      return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
    }

    if (email && !user) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'To login with social media, please register first' }] });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 3600 }, (error, token) => {
      if (error) throw error;

      res.json({ token });
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

module.exports = mediaLogin;
