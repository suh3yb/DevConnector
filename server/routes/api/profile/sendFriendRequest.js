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
    const friendRequest = await FriendRequest.findOne({
      requester: req.user.id,
      recipient: recipientId
    });

    let newRequest;
    if (!friendRequest) {
      newRequest = new FriendRequest(newFriendRequestObject);
      await newRequest.save();
    } else {
      return res.status(400).json({
        msg: 'This request has been already sent to this user before!'
      });
    }

    res.json(newRequest);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

module.exports = sendFriendRequest;
