'use strict';

const Profile = require('../../../models/Profile');
const User = require('../../../models/User');
const Post = require('../../../models/Post');

const deleteProfileAndUser = async (req, res) => {
  try {
    // Remove user posts
    await Post.deleteMany({ user: req.user.id });

    // Remove profile
    await Profile.findOneAndRemove({ user: req.user.id });

    // Remove user
    await User.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: 'User deleted' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

module.exports = deleteProfileAndUser;
