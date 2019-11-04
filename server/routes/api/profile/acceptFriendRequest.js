'use strict';

const { validationResult } = require('express-validator');

const FriendRequest = require('../../../models/FriendRequest');
const Profile = require('../../../models/Profile');
const User = require('../../../models/User');

const acceptFriendRequest = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { recipientId } = req.body;

  try {
    const docRequester = await FriendRequest.findOneAndUpdate(
      { requester: recipientId, recipient: req.user.id },
      { $set: { status: 'accepted' } },
      { new: true }
    );

    const docRecipient = await FriendRequest.findOneAndUpdate(
      { recipient: recipientId, requester: req.user.id },
      { $set: { status: 'accepted' } },
      { new: true }
    );

    const recipient = await User.findById(req.user.id);

    const requester = await User.findById(recipientId);

    await Profile.findOneAndUpdate(
      { user: req.user.id },
      { $push: { friendship: requester } }
    );

    await Profile.findOneAndUpdate(
      { user: recipientId },
      { $push: { friendship: recipient } }
    );

    res.json([docRequester, docRecipient]);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

module.exports = acceptFriendRequest;
