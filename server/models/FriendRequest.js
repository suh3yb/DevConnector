'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const FriendRequestSchema = new Schema({
  status: {
    type: String,
  },
  requester: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },

  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

//status can be requested(1), accepted(2), rejected(3)

const FriendRequest = mongoose.model('friendRequest', FriendRequestSchema);
module.exports = FriendRequest;
