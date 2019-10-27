'use strict';

const { validationResult } = require('express-validator');

const FriendRequest = require('../../../models/FriendRequest');
const Profile = require('../../../models/Profile');

const acceptFriendRequest = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { recipientId, receipentName, requesterName } = req.body;

  const receipentObj = { user: recipientId, receipentName };
  const requesterObj = { user: req.user.id, requesterName };

  try {
    const friendRequest = await FriendRequest.findOneAndUpdate(
      { requester: recipientId, recipient: req.user.id },
      { $set: { status: 'accepted' } },
      { new: true }
    );

    await Profile.findOneAndUpdate(
      { user: req.user.id },
      { $addToSet: { friendship: receipentObj } }
    );

    await Profile.findOneAndUpdate(
      { user: recipientId },
      { $addToSet: { friendship: requesterObj } }
    );

    if (friendRequest) {
      res.json(friendRequest);
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

module.exports = acceptFriendRequest;
