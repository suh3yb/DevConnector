'use strict';

const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const registerUser = require('./registerUser');
const forgotPassword = require('./forgotPassword');
const resetPassword = require('./resetPassword');
const updatePasswordViaEmail = require('./updatePasswordViaEmail');

// @route   POST api/users
// @desc    Register user
// @access  Public
router.post(
  '/',
  [
    check('name', 'Name is required')
      .not()
      .isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
  ],
  registerUser,
);

// @route   POST api/users/forgot-password
// @desc    Forgot Password
// @access  Public
router.post(
  '/forgot-password',
  check('email', 'Email is required')
    .not()
    .isEmpty(),
  forgotPassword,
);

// @route   POST api/users/reset-password
// @desc    Reset Password
// @access  Public
router.get('/reset-password/:token', resetPassword);

// @route   POST api/users/reset-password
// @desc    Reset Password
// @access  Public
router.post('/update-password-via-email', updatePasswordViaEmail);

module.exports = router;
