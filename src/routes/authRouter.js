const express = require('express');
const authController = require('../controllers').auth;
const validator = require('../middlewares/validator');

const userRouter = express.Router();

userRouter.post(
  '/auth/signup',
  validator.validateUserBody,
  validator.checkUserExists,
  authController.signupUser
);
userRouter.post('/auth/signin', authController.signinUser);

module.exports = userRouter;
