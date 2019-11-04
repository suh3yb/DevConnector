'use strict';

const FriendRequest = require('../../../models/FriendRequest');

const getAllFriendRequests = async (req, res) => {
  try {
    const friendRequests = await FriendRequest.find();

    res.json(friendRequests);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

module.exports = getAllFriendRequests;
