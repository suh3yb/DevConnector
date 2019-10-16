'use strict';

const { validationResult } = require('express-validator');

const Profile = require('../../../models/Profile');

const followFriend = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { followId, name } = req.body;

  const newFriend = {
    user: followId,
    name,
  };

  try {
    let profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'avatar']);

    if (profile) {
      profile.friend.unshift(newFriend);
    } else {
      return res.status(400).json({ msg: 'Please create a profile first.' });
    }

    await profile.save();

    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

module.exports = followFriend;
