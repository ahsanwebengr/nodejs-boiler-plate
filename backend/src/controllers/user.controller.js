import { User } from '../models/user.model.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { ApiError } from '../utils/ApiError.js';

const getUsers = async (req, res) => {
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

const getUserById = async (req, res) => {
  try {
    const userId = req.params.userId;

    const users = await User.findById(userId);

    return res
      .status(200)
      .json(new ApiResponse(200, users, 'User retrieved successfully'));
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

const updateUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const userBody = req.body;

    const user = await User.findByIdAndUpdate(userId, userBody);

    if (!user) {
      return res.status(404).json(new ApiResponse(404, null, 'User not found'));
    }

    return res
      .status(200)
      .json(new ApiResponse(200, user, 'User updated successfully'));
  } catch (error) {
    console.error('Error while updating user:', error);
    throw new ApiError(500, 'Internal Server Error');
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).json(new ApiResponse(404, null, 'User not found'));
    }

    return res
      .status(200)
      .json(new ApiResponse(200, user, 'User deleted successfully'));
  } catch (error) {
    console.error('Error while deleting user:', error);
    throw new ApiError(500, 'Internal Server Error');
  }
};

export { getUsers, createUser, updateUser, deleteUser, getUserById };
