'use strict';

const Profile = require('../../../models/Profile');

const unfollowFriend = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate('user', [
      'name',
      'avatar',
    ]);

    // Get remove index
    const removeIndex = profile.following
      .map(friendObj => friendObj.user)
      .indexOf(req.params.user_id);

    if (removeIndex === -1) {
      return res.status(400).json({ msg: 'No friend found' });
    }

    profile.following.splice(removeIndex, 1);

    await profile.save();

    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

module.exports = unfollowFriend;
