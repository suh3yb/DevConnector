'use strict';

const { validationResult } = require('express-validator');

const FriendRequest = require('../../../models/FriendRequest');
const Profile = require('../../../models/Profile');

const rejectFriendRequest = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { recipientId } = req.body;

  try {
    const docRequester = await FriendRequest.findOneAndUpdate(
      { requester: recipientId, recipient: req.user.id },
      { $set: { status: 'rejected' } },
      { new: true }
    );

    const docRecipient = await FriendRequest.findOneAndUpdate(
      { recipient: recipientId, requester: req.user.id },
      { $set: { status: 'rejected' } },
      { new: true }
    );

    res.json([docRequester, docRecipient]);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

module.exports = rejectFriendRequest;
