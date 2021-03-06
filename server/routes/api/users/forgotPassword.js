'use strict';

const config = require('config');
const crypto = require('crypto');

const { validationResult } = require('express-validator');
const nodemailer = require('nodemailer');

const User = require('../../../models/User');

const forgotPassword = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(403).json({ errors: [{ msg: 'There is no user with this email' }] });
    }

    const token = crypto.randomBytes(20).toString('hex');

    await User.findOneAndUpdate(
      { email: user.email },
      {
        resetPasswordToken: token,
        resetPasswordExpires: Date.now() + 36000,
      },
      { new: true, upsert: true },
    );

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: config.get('email'),
        pass: config.get('password'),
      },
    });

    const mailOptions = {
      from: 'talipaltas@gmail.com',
      to: `${user.email}`,
      subject: 'Link to Reset Password',
      html: `
        <h1>Reset Your Password</h1>
        You are receiving this because you (or someone else) have requested the reset of the password for your account.
        Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:
        http://localhost:3000/reset-password/${token}
        If you did not request this, please ignore this email and your password will remain unchanged.`,
    };

    transporter.sendMail(mailOptions, (err, response) => {
      if (err) {
        console.error('There is an error: ', err);
        res.status(500).json('Sending mail failed');
      } else {
        console.log('Response: ', response);
        res.status(200).json('Recovery mail sent');
      }
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json('Server error');
  }
};

module.exports = forgotPassword;
