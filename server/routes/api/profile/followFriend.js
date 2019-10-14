'use strict';

const Profile = require('../../../models/Profile');

const followFriend = async (req, res) => {
  const { id } = req.body;

  const newFriend = {
    id,
  };

  try {
    const profile = await Profile.findOne({ user: req.user.id });

    profile.friend.unshift(newFriend);

    await profile.save();

    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

module.exports = followFriend;
