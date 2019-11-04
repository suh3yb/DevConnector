'use strict';

const Post = require('../../../models/Post');

const addReaction = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const emoji = req.params.reaction;
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }
    if (post.reaction[emoji].filter(emoji => emoji.user.toString() === req.user.id).length > 0) {
      return res.status(400).json({ msg: 'Already reacted' });
    }

    post.reaction[emoji].unshift({ user: req.user.id });
    await post.save();
    res.json(post.reaction);
  } catch (error) {
    console.error(error.message);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' });
    }

    res.send('Server Error');
  }
};

module.exports = addReaction;
