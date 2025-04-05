const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload');
const { signup, login } = require('../controllers/authController');
const { validate } = require('express-validation');

const {
  signupValidation,
  loginValidation,
} = require('../validations/authValidation');

router.post(
  '/signup',
  upload.single('profileImage'),
  validate(signupValidation),
  signup
);
router.post('/login', validate(loginValidation), login);

module.exports = router;
