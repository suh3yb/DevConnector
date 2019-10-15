'use strict';

const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

const User = require('../../../models/User');

const updatePassword = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { oldPassword, newPassword } = req.body;

  try {
    const user = await User.findById(req.user.id);

    const isMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] });
    }

    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(newPassword, salt);

    user.save();

    res.json({ msg: 'Password updated' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

module.exports = updatePassword;
