'use strict';

const express = require('express');
const router = express.Router();

const { check } = require('express-validator');
const auth = require('../../../middleware/auth');

const createPost = require('./createPost');
const getAllPosts = require('./getAllPosts');
const getPostById = require('./getPostById');
const deletePost = require('./deletePost');
const likePost = require('./likePost');
const unlikePost = require('./unlikePost');
const createComment = require('./createComment');
const deleteComment = require('./deleteComment');
const editPost = require('./editPost');

// @route   POST api/posts
// @desc    Create post
// @access  Private
router.post(
  '/',
  [
    auth,
    [
      check('text', 'Text is required')
        .not()
        .isEmpty(),
    ],
  ],
  createPost,
);

// @route   GET api/posts
// @desc    Get all posts
// @access  Private
router.get('/', auth, getAllPosts);

// @route   GET api/posts/:id
// @desc    Get post by id
// @access  Private
router.get('/:id', auth, getPostById);

// @route   DELETE api/posts/:id
// @desc    Delete post by id
// @access  Private
router.delete('/:id', auth, deletePost);

// @route    Update api/posts/:id
// @desc     Update a post
// @access   Private
router.post('/:id', auth, editPost);

// @route   PUT api/posts/like/:id
// @desc    Like a post
// @access  Private
router.put('/like/:id', auth, likePost);

// @route   PUT api/posts/unlike/:id
// @desc    Unlike a post
// @access  Private
router.put('/unlike/:id', auth, unlikePost);

// @route   POST api/posts/comment/:id
// @desc    Comment on a post
// @access  Private
router.post(
  '/comment/:id',
  [
    auth,
    [
      check('text', 'Text is required')
        .not()
        .isEmpty(),
    ],
  ],
  createComment,
);

// @route   DELETE api/posts/comment/:id/:comment_id
// @desc    Delete comment
// @access  Private
router.delete('/comment/:id/:comment_id', auth, deleteComment);

module.exports = router;
