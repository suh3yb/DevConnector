'use strict';

const Profile = require('../../../models/Profile');

const deleteEducation = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    // Get remove index
    const removeIndex = profile.education.map(education => education.id).indexOf(req.params.edu_id);

    if (removeIndex === -1) {
      return res.status(400).json({ msg: 'No education found' });
    }

    profile.education.splice(removeIndex, 1);

    await profile.save();

    res.json(profile);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

module.exports = deleteEducation;
