import nodemailer from 'nodemailer';
import { API } from '../constants/constants.js';
import createError from 'http-errors';

/**
 * Sends an email verification email to the specified email address.
 * @param {string} email - The email address to which the verification email will be sent.
 * @param {string} token - The token required for email verification.
 * @returns {Promise} - A Promise that resolves with the result of sending the email or rejects with an error.
 */
export const sendEmailVerification = async (email, token) => {
  // Construct the email verification link using the provided user ID and token
  const link = `${API}/auth/verify-email/${token}`;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.NODEMAILER_ADMIN_EMAIL,
      pass: process.env.NODEMAILER_ADMIN_PASSWORD,
    },
  });

  const mailOptions = {
    to: email,
    from: 'admin.easyNotes@gmail.com',
    text: 'Email Verification',
    subject: 'Verify Your Email for EasyNotes Application',
    html: `<h4>Email Verification</h4><br>
        <p>Hello , Welcome to the EasyNotes! Please verify your email address by following this link:</p>
        ${link}
        <p>This link is valid for a time of 20 minutes. If you didn\'t register for EasyNotes, you can ignore this email.</p>
        <p>Thanks,</p>
        <p>Your EasyNotes Admin</p>`,
  };

  try {
    const result = await transporter.sendMail(mailOptions);
    return result;
  } catch (error) {
    console.error('Error sending mail: ' + error.message);
    throw createError.InternalServerError();
  }
};

/**
 * Sends a password reset email to the specified email address.
 * @param {string} email - The email address to which the password reset email will be sent.
 * @param {string} token - The token required for password reset verification.
 * @returns {Promise} - A Promise that resolves with the result of sending the email or rejects with an error.
 */
export const sendPasswordResetMail = async (email, token) => {
  // Construct the password reset link using the provided token
  const link = `${API}/auth/reset-password/${token}`;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.NODEMAILER_ADMIN_EMAIL,
      pass: process.env.NODEMAILER_ADMIN_PASSWORD,
    },
  });

  // Define email content and options
  const mailOptions = {
    to: email,
    from: 'admin.easyNotes@gmail.com',
    text: 'Reset Password',
    subject: 'Reset Password for your EasyNotes Application',
    html: `<h4>Reset your Password</h4><br>
        <p>Hello , Follow this link to reset your EasyNotes password for your ${email} account. This link is valid for 20 minutes.</p>
        ${link}
        <p>If you didn\'t ask to reset your password, you can ignore this email.</p>
        <p>Thanks,</p>
        <p>Your EasyNotes Admin</p>`,
  };
  try {
    const result = await transporter.sendMail(mailOptions);
    return result;
  } catch (error) {
    console.error(error);
    return;
  }
};
