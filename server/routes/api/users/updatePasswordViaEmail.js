const bcrypt = require('bcryptjs');

const User = require('../../../models/User');

const updatePasswordViaEmail = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res
        .status(403)
        .json({ errors: [{ msg: 'There is no user with this email' }] });
    }

    const salt = await bcrypt.genSalt(10);

    const cryptedPassword = await bcrypt.hash(password, salt);

    await User.findOneAndUpdate(
      { email },
      {
        password: cryptedPassword,
        resetPasswordToken: null,
        resetPasswordExpires: null
      }
    );

    res.json({ msg: 'Password updated' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

module.exports = updatePasswordViaEmail;
