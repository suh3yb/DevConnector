'use strict';

const Post = require('../../../models/Post');

const removeReaction = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const emoji = req.params.reaction;

    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    // Check if the reaction is already be added
    if (post.reaction[emoji].filter(emoji => emoji.user.toString() === req.user.id).length === 0) {
      return res.status(400).json({ msg: 'Not reacted' });
    }

    // Get remove index
    const removeIndex = post.reaction[emoji].map(emo => emo.user.toString()).indexOf(req.user.id);

    post.reaction[emoji].splice(removeIndex, 1);

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

module.exports = removeReaction;
