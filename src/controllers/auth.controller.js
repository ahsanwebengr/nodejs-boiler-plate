import { asyncHandler, checkField, sendResponse } from '../utils/index.js';
import { userDB } from '../instances/db.instance.js';
import { MESSAGES, STATUS_CODES } from '../constants/index.js';

const register = asyncHandler(async (req, res) => {
  const { fullName, email, password } = req.body;

  const user = await userDB.findOne({ email });

  checkField(user, 'User with this email already exist');

  await userDB.create({
    fullName,
    email,
    password
  });

  sendResponse(res, STATUS_CODES.CREATED, MESSAGES.SUCCESS);
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await userDB.findOne({ email }, '+password');
  checkField(!user, 'Invalid email or password');

  const isPasswordCorrect = await user.isPasswordCorrect(password);
  checkField(!isPasswordCorrect, 'Invalid email or password');

  const accessToken = user.generateAccessToken();
  user.accessToken.push(accessToken);

  await user.save();

  sendResponse(res, STATUS_CODES.SUCCESS, MESSAGES.SUCCESS, {
    accessToken
  });
});

const logout = asyncHandler(async (req, res) => {
  const accessToken = req?.headers['authorization']?.split(' ')[1];
  const userId = req.user._id;

  checkField(!accessToken, 'You are already logged out');

  const user = await userDB.updateByQuery(
    { _id: userId, accessToken },
    { $pull: { accessToken } }
  );

  checkField(!user, 'User not found or session expired');

  sendResponse(res, STATUS_CODES.SUCCESS, 'Logged Out Success');
});

export { register, login, logout };
