import { User } from '../models/user.model.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { ApiError } from '../utils/ApiError.js';

const getUser = async (req, res) => {
  try {
    let users;
    if (req.query.username) {
      users = await User.find({ username: req.query.username });
    } else {
      users = await User.find();
    }
    return res
      .status(200)
      .json(new ApiResponse(200, users, 'Users retrieved successfully'));
  } catch (error) {
    console.log('Error while getting users:', error);
    throw new ApiError(500, 'Internal Server Error');
  }
};

const createUser = async (req, res) => {
  try {
    const {
      username,
      email,
      fullName,
      avatar,
      password,
      coverImage,
      refreshToken,
    } = req.body;

    if (!username || !email || !fullName || !avatar || !password) {
      return res
        .status(400)
        .json(new ApiResponse(400, null, 'Required fields are missing'));
    }

    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res
        .status(400)
        .json(new ApiResponse(400, null, 'Username or email already exists'));
    }

    const user = await User.create({
      username,
      email,
      fullName,
      avatar,
      password,
      coverImage,
      refreshToken,
    });

    return res
      .status(201)
      .json(new ApiResponse(201, user, 'User created successfully'));
  } catch (error) {
    console.error('Error while creating user:', error);
    throw new ApiError(500, 'Internal Server Error');
  }
};

export { getUser, createUser };
