'use strict';

const User = require('../../../models/User');

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .populate('conversation')
      .select('-password');
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error!');
  }
};

module.exports = getUser;
