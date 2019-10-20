'use strict';

const express = require('express');
const router = express.Router();

const { check } = require('express-validator');
const auth = require('../../../middleware/auth');

const createMessage = require('./createMessage');
const getMessages = require('./getMessages');

// @route   POST api/message
// @desc    Create message
// @access  Private
router.post(
  '/',
  [
    auth,
    [
      check('text', 'Text is required')
        .not()
        .isEmpty(),
    ],
  ],
  createMessage,
);

// @route   GET api/message
// @desc    Get message history
// @access  Private
router.get('/:sender_id/:receiver_id', auth, getMessages);

module.exports = router;
