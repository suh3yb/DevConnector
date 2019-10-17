'use strict';

const { validationResult } = require('express-validator');

const Post = require('../../../models/Post');
const User = require('../../../models/User');

const editPost = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  console.log({req})
  try {
    const user = await User.findById(req.user.id).select('-password');
    const post = await Post.findById(req.params.id);
    console.log('text', req.body.text)
    const updatedPost = {
      text: req.body.text,
      name: user.name,
      avatar: user.avatar,
      user: req.user.id,
    };

    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    // Check user
		if (post.user.toString() !== req.user.id) {
			return res.status(401).json({ msg: 'User not authorized' });
		}
		// Using upsert option (creates new doc if no match is found):
		await Post.findByIdAndUpdate(
			req.params.id ,
			{ $set: updatedPost },
			{ new: true, upsert: true },
		);
		res.json('post updated!');
  } catch (error) {
    console.error(error.message);

    if (error.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' });
    }

    res.send('Server Error');
  }
};

module.exports = editPost;
