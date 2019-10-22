'use strict';

const Post = require('../../../models/Post');
const User = require('../../../models/User');

const likePost = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    const post = await Post.findById(req.params.id);
        // Check if the post has already been liked
        if (post.likes.filter((like) => like.user.toString() === req.user.id).length > 0) {
            return res.status(400).json({ msg: 'Post already liked' });
        }
    const newLike = {      
      name: user.name,
      avatar: user.avatar,
      user: req.user.id,
    };
        post.likes.unshift(newLike);
        await post.save();
        res.json(post.likes);
  } catch (error) {
    console.error(error.message);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.send('Server Error');
  }
};
module.exports = likePost;