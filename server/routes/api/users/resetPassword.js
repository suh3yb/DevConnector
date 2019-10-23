'use strict';

const { validationResult } = require('express-validator');

const User = require('../../../models/User');

const resetPassword = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { token } = req.params;
  console.log('token', token);

  try {
    let user = await User.findOne({
      resetPasswordToken: token
      // resetPasswordExpires: {
      //   $gt: Date.now()
      // }
    });

    console.log('user', user);

    if (!user) {
      console.log('Password reset link invalid or has expired');

      return res.status(403).json({
        errors: [{ msg: 'Password reset link invalid or has expired' }]
      });
    }

    res.status(200).json({
      email: user.email,
      message: 'Password reset link ok'
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

module.exports = resetPassword;
