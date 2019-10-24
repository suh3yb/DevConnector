'use strict';

const { validationResult } = require('express-validator');

const User = require('../../../models/User');

const searchProfile = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { input } = req.params;
  const inputReg = new RegExp(input, 'gmi');

  try {
    const foundUsers = await User.find({ name: inputReg }, 'name _id');

    res.json(foundUsers);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

module.exports = searchProfile;
