'use strict';

const { validationResult } = require('express-validator');

const FriendRequest = require('../../../models/FriendRequest');

const sendFriendRequest = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { recipientId } = req.body;
  const newFriendRequestObject = {
    status: 'requested',
    requester: req.user.id,
    recipient: recipientId
  };

  try {
    const docRequester = await FriendRequest.findOneAndUpdate(
      { requester: req.user.id, recipient: recipientId },
      { status: 'requested' },
      { new: true, upsert: true }
    );

    const docRecipient = await FriendRequest.findOneAndUpdate(
      { recipient: req.user.id, requester: recipientId },
      { status: 'pending' },
      { new: true, upsert: true }
    );

    res.json([docRequester, docRecipient]);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

module.exports = sendFriendRequest;
