'use strict';

const express = require('express');
const router = express.Router();

const auth = require('../../../middleware/auth');
const { check } = require('express-validator');

const getCurrentProfile = require('./getCurrentProfile');
const createUpdateProfile = require('./createUpdateProfile');
const getAllProfiles = require('./getAllProfiles');
const getUserProfile = require('./getUserProfile');
const deleteProfileAndUser = require('./deleteProfileAndUser');
const addExperience = require('./addExperience');
const deleteExperience = require('./deleteExperience');
const addEducation = require('./addEducation');
const deleteEducation = require('./deleteEducation');
const getGithubRepos = require('./getGithubRepos');
const followFriend = require('./followFriend');
const unfollowFriend = require('./unfollowFriend');
const updatePassword = require('./updatePassword');

// @route   GET api/profile/me
// @desc    Get current user's profile
// @access  Private
router.get('/me', auth, getCurrentProfile);

// @route   POST api/profile
// @desc    Create or update user's profile
// @access  Private
router.post(
  '/',
  [
    auth,
    [
      check('status', 'Status is required')
        .not()
        .isEmpty(),
      check('skills', 'Skills are required')
        .not()
        .isEmpty(),
    ],
  ],
  createUpdateProfile,
);

// @route   GET api/profile
// @desc    Get all profiles
// @access  Public
router.get('/', getAllProfiles);

// @route   GET api/profile/user/:user_id
// @desc    Get profile by user profile id
// @access  Public
router.get('/user/:user_id', getUserProfile);

// @route   DELETE api/profile
// @desc    Delete profile, user and posts
// @access  Private
router.delete('/', auth, deleteProfileAndUser);

// @route   PUT api/profile/experience
// @desc    Add profile experience
// @access  Private
router.put(
  '/experience',
  [
    auth,
    [
      check('title', 'Title is required')
        .not()
        .isEmpty(),
      check('company', 'Company is required')
        .not()
        .isEmpty(),
      check('from', 'From date is required')
        .not()
        .isEmpty(),
    ],
  ],
  addExperience,
);

// @route   DELETE api/profile/experience/:exp_id
// @desc    Delete experience from profile
// @access  Private
router.delete('/experience/:exp_id', auth, deleteExperience);

// @route   PUT api/profile/education
// @desc    Add profile education
// @access  Private
router.put(
  '/education',
  [
    auth,
    [
      check('school', 'School is required')
        .not()
        .isEmpty(),
      check('degree', 'Degree is required')
        .not()
        .isEmpty(),
      check('fieldofstudy', 'Field of study is required')
        .not()
        .isEmpty(),
      check('from', 'From date is required')
        .not()
        .isEmpty(),
    ],
  ],
  addEducation,
);

// @route   DELETE api/profile/education/:edu_id
// @desc    Delete education from profile
// @access  Private
router.delete('/education/:edu_id', auth, deleteEducation);

// @route   GET api/profile/github/:username
// @desc    Get user repos from Github
// @access  Public
router.get('/github/:username', getGithubRepos);

// @route   POST api/profile/follow/
// @desc    Follow a user as friend
// @access  Private
router.post(
  '/follow',
  auth,
  [
    check('followId', 'Specify a user to follow')
      .not()
      .isEmpty(),
  ],
  followFriend,
);

// @route   DELETE api/profile/follow/:user_id
// @desc    Unfollow a user
// @access  Private
router.delete('/follow/:user_id', auth, unfollowFriend);

// @route   POST api/profile/password
// @desc    Change user's password
// @access  Private
router.post(
  '/password',
  [
    auth,
    [
      check('oldPassword', 'Please enter your current password').exists(),
      check('newPassword', 'Please enter a password with 6 or more characters').isLength({
        min: 6,
      }),
    ],
  ],
  updatePassword,
);

module.exports = router;
