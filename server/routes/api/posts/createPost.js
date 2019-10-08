'use strict';

const { validationResult } = require('express-validator');

const Post = require('../../../models/Post');
const User = require('../../../models/User');

const createPost = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const user = await User.findById(req.user.id).select('-password');

    const newPost = new Post({
      text: req.body.text,
      name: user.name,
      avatar: user.avatar,
      user: req.user.id,
    });

    const post = await newPost.save();

    res.json(post);
  } catch (error) {
    console.error(error.message);
    res.send('Server Error');
  }
};

module.exports = createPost;
