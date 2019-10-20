'use strict';

const express = require('express');
const router = express.Router();
const auth = require('../../../middleware/auth');

const { check } = require('express-validator');

const getUser = require('./getUser');
const loginUser = require('./loginUser');

// @route   GET /api/auth
// @desc    Test route
// @access  Private
router.get('/', auth, getUser);

// @route POST /api/auth
// @desc Authenticate user & Get token
// @access Public
router.post(
  '/',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  loginUser,
);

module.exports = router;
