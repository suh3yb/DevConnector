'use strict';

const Profile = require('../../../models/Profile');

const deleteExperience = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    // Get remove index
    const removeIndex = profile.experience
      .map(experience => experience.id)
      .indexOf(req.params.exp_id);

    if (removeIndex === -1) {
      return res.status(400).json({ msg: 'No experience found' });
    }

    profile.experience.splice(removeIndex, 1);

    await profile.save();

    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

module.exports = deleteExperience;
