'use strict';

const jwt = require('jsonwebtoken');
const config = require('config');

const User = require('../../../models/User');

const mediaLogin = async (req, res) => {
  const { name, email, avatar } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
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