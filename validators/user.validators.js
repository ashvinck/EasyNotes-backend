import { body } from 'express-validator';

const userRegisterationValidation = () => {
  return [
    body('email')
      .trim()
      .notEmpty()
      .withMessage('Email is required')
      .isEmail()
      .withMessage('Email is invalid'),
    body('username')
      .notEmpty()
      .withMessage('Username is required')
      .isLength({ min: 3 })
      .withMessage('Username must be at lease 3 characters long')
      .customSanitizer((value) => value.toLowerCase()),
    body('password').trim().notEmpty().withMessage('Password is required'),
  ];
};

const userLoginValidator = () => {
  return [
    body('email').optional().isEmail().withMessage('Email is invalid'),
    body('password').notEmpty().withMessage('Password is required'),
  ];
};

const userForgotPasswordValidator = () => {
  return [
    body('email')
      .notEmpty()
      .withMessage('Email is required')
      .isEmail()
      .withMessage('Email is invalid'),
  ];
};
const userResetPasswordValidator = () => {
  return [body('password').notEmpty().withMessage('Password is required')];
};

export {
  userRegisterationValidation,
  userLoginValidator,
  userForgotPasswordValidator,
  userResetPasswordValidator,
};
