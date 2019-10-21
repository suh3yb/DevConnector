'use strict';

const express = require('express');
const router = express.Router();
const auth = require('../../../middleware/auth');

const { check } = require('express-validator');

const getUser = require('./getUser');
const loginUser = require('./loginUser');
const mediaLogin = require('./mediaLogin');

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

// @route    POST api/auth/media
// @desc     Login Social Media
// @access   Public
router.post(
  '/media',
  mediaLogin,
  getUser);

module.exports = router;
