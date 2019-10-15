'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const MessageSchema = new Schema({
  text: {
    type: String,
    max: 2000,
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },

  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Message = mongoose.model('message', MessageSchema);
module.exports = Message;
