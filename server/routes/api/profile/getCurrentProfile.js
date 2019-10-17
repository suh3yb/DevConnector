'use strict';

const Profile = require('../../../models/Profile');

const getCurrentProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id })
      .populate('user', ['name', 'avatar', 'conversation'])
      .populate({
        path: 'user',
        populate: { path: 'conversation', model: 'message' },
      });

    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }

    res.send(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

module.exports = getCurrentProfile;
