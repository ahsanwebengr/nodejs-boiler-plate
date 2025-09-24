import { userDB } from '../instances/db.instance.js';
import { UserService } from '../services/user.service.js';
import { fireBaseAdminConfig } from '../configs/firebase.config.js';
import { asyncHandler, checkField, sendResponse } from '../utils/index.js';
import { COOKIE_OPTIONS, MESSAGES, STATUS_CODES } from '../constants/index.js';

const register = asyncHandler(async (req, res) => {
  const { fullName, email, password } = req.body;

  await UserService.checkEmailExists(email);

  await userDB.create({
    fullName,
    email,
    password
  });

  sendResponse(res, STATUS_CODES.CREATED, MESSAGES.SUCCESS);
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const accessToken = await UserService.loginUser(email, password);

  res.cookie('accessToken', accessToken, COOKIE_OPTIONS);

  sendResponse(res, STATUS_CODES.SUCCESS, MESSAGES.SUCCESS, {
    accessToken
  });
});

const logout = asyncHandler(async (req, res) => {
  const userId = req.user._id.toString();
  const accessToken =
    req.cookies?.accessToken || req.headers.authorization?.split(' ')[1];

  checkField(!accessToken, 'You are already logged out');

  const user = await userDB.removeAccessToken(userId, accessToken);

  checkField(!user, 'User not found or session expired');

  res.clearCookie('accessToken', COOKIE_OPTIONS);

  sendResponse(res, STATUS_CODES.SUCCESS, 'Logged out Successfully');
});

const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const otp = await UserService.forgotPassword(email);

  //   await sendEmail({
  //     to: email,
  //     subject: 'Reset Your Password',
  //     htmlContent: generateOtpEmail(otp)
  //   });

  sendResponse(res, STATUS_CODES.SUCCESS, `OTP sent to ${email}`);
});

const verifyResetOTP = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;

  await UserService.verifyResetOTP(email, otp);

  sendResponse(res, STATUS_CODES.SUCCESS, 'OTP verified successfully');
});

const resetPassword = asyncHandler(async (req, res) => {
  const { email, newPassword } = req.body;

  await UserService.resetPassword(email, newPassword);

  sendResponse(res, STATUS_CODES.SUCCESS, 'Password reset successful');
});

const loginWithGoogle = asyncHandler(async (req, res) => {
  const { idToken } = req.body;

  checkField(!idToken, 'ID Token is required');
  const decodedToken = await fireBaseAdminConfig.auth().verifyIdToken(idToken);
  const { email, name, uid } = decodedToken;

  await UserService.checkEmailExists(email);

  const user = {
    googleId: uid,
    email,
    fullName: name,
    provider: 'google'
  };

  await userDB.create(user);

  sendResponse(res, STATUS_CODES.SUCCESS, 'User authenticated successfully');
});

export {
  register,
  login,
  logout,
  forgotPassword,
  verifyResetOTP,
  resetPassword,
  loginWithGoogle
};
