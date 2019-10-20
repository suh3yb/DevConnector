'use strict';

const Post = require('../../../models/Post');

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });

    res.json(posts);
  } catch (error) {
    console.error(error.message);
    res.send('Server Error');
  }
};

module.exports = getAllPosts;
