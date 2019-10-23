'use strict';

const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

const User = require('../../../models/User');

const changePassword = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { password } = req.body;

  try {
    const user = await User.findById(req.user.id);

    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password, salt);

    user.save();

    res.json({ msg: 'Password changed' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

module.exports = changePassword;
