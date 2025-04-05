const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
  try {
    const { email, password } = req.body;
    const profileImage = req.file?.filename;

    if (!req.file) {
      return res
        .status(400)
        .json({ msg: 'profile image is required property' });
    }

    const isUserExists = await User.findOne({ email });
    if (isUserExists) {
      return res
        .status(400)
        .json({ msg: 'User already exists, signup from other email' });
    }

    const bcryptPD = await bcrypt.hash(password, 10);
    await User.create({
      email,
      password: bcryptPD,
      profileImage,
    });

    res.status(201).json({ msg: 'User successfully signed up' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const isUser = await User.findOne({ email });
    if (!isUser) {
      return res.status(400).json({ msg: 'User not found' });
    }

    const isPasswordMatched = await bcrypt.compare(password, isUser.password);
    if (!isPasswordMatched) {
      return res.status(400).json({ msg: 'Incorrect password' });
    }

    const token = jwt.sign({ id: isUser._id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    res.status(200).json({ token, isUser, msg: 'successfully login' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
