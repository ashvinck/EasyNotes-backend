import { Router } from 'express';
import {
  userForgotPasswordValidator,
  userLoginValidator,
  userRegisterationValidation,
  userResetPasswordValidator,
} from '../validators/user.validators.js';
import { validate } from '../validators/validate.js';
import {
  forgotPasswordRequest,
  loginUser,
  refreshAccessToken,
  registerUser,
  resetForgottenPassword,
  verifyEmail,
} from '../controller/user.controller.js';

const router = Router();

router
  .route('/register')
  .post(userRegisterationValidation(), validate, registerUser);
router.route('/login').post(userLoginValidator(), validate, loginUser);
router.route('/verify-email/:verificationToken').get(verifyEmail);
router
  .route('/forgot-password')
  .post(userForgotPasswordValidator(), validate, forgotPasswordRequest);
router
  .route('/reset-password/:resetToken')
  .post(userResetPasswordValidator(), validate, resetForgottenPassword);
router.route('/refresh-token').get(refreshAccessToken);

export default router;
