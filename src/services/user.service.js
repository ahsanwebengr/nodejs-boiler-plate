import { userDB } from '../instances/db.instance.js';
import { checkField } from '../utils/index.js';
import { STATUS_CODES } from '../constants/index.js';
import { createOTPWithExpiry } from '../helper/generateOtp.js';

export class UserService {
  static async checkEmailExists(email) {
    const existingEmail = await userDB.findOne({ email });
    checkField(existingEmail, 'Email already exists', STATUS_CODES.CONFLICT);
  }

  static async checkUsernameExists(username) {
    const existingUsername = await userDB.findOne({ username });
    checkField(
      existingUsername,
      `Username "${username}" already exists`,
      STATUS_CODES.CONFLICT
    );
  }

  static async findUserByEmail(email, selectPassword = false) {
    const projection = selectPassword ? '+password' : '';
    return await userDB.findOne({ email }, projection);
  }

  static async findUserById(userId) {
    const user = await userDB.findById(userId);
    return user;
  }

  static async findOne(query, projection = '') {
    const user = await userDB.findOne(query, projection);
    checkField(!user, 'User not found', STATUS_CODES.NOT_FOUND);
    return user;
  }

  static async updateUserDetails(userId, updateData) {
    const user = await this.findUserById(userId);
    Object.assign(user, updateData);
    await user.save();
    return user;
  }

  static async generateAndSaveToken(user) {
    const accessToken = user.generateAccessToken();
    user.accessToken.push(accessToken);
    await user.save();
    return accessToken;
  }

  static async forgotPassword(email) {
    const user = await this.findUserByEmail(email);
    checkField(!user, 'User not found', STATUS_CODES.NOT_FOUND);

    const { otp, expiry } = createOTPWithExpiry();

    if (!user.resetPassword) {
      user.resetPassword = {};
    }

    user.resetPassword = { otp, expiry, verified: false };
    await user.save();
    return otp;
  }

  static async verifyResetOTP(email, otp) {
    const user = await this.findUserByEmail(email);
    checkField(!user, 'User not found', STATUS_CODES.NOT_FOUND);

    checkField(
      !user.resetPassword?.otp ||
        user.resetPassword.otp !== otp ||
        user.resetPassword.expiry < new Date(),
      'Invalid or expired OTP'
    );

    user.resetPassword.verified = true;
    user.resetPassword.otp = null;
    user.resetPassword.expiry = null;
    user.resetPassword.updatedAt = new Date();

    await user.save();
  }

  static async resetPassword(email, newPassword) {
    const user = await UserService.findOne({ email });

    checkField(
      !user.resetPassword?.verified,
      'OTP not verified or invalid request'
    );

    user.password = newPassword;
    user.resetPassword = undefined;
    await user.save();
  }

  static async loginUser(email, password, selectPassword = true) {
    const user = await UserService.findUserByEmail(
      email,
      selectPassword ? '+password' : ''
    );
    checkField(!user, 'Invalid email or password');

    const isPasswordCorrect = await user.isPasswordCorrect(password);
    checkField(!isPasswordCorrect, 'Invalid email or password');

    const accessToken = await UserService.generateAndSaveToken(user);

    return accessToken;
  }
}
