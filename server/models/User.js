'use strict';

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  },
  resetPasswordToken: {
    type: String,
    default: ''
  },
  resetPasswordExpires: {
    type: Date
  },
  conversation: [{ type: mongoose.Schema.Types.ObjectId, ref: 'message' }]
});

const User = mongoose.model('user', UserSchema);
module.exports = User;
