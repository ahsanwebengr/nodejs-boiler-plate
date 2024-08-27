import { User } from '../models/user.model.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { ApiError } from '../utils/ApiError.js';
import { UserUpdateSchema } from '../utils/validations/users.js';

const getUsers = async (req, res) => {
  try {
    let query = {};

    if (req.query.username) {
      query.username = req.query.username;
    }

    if (req.query.email) {
      query.email = req.query.email;
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const users = await User.find(query)
      .populate('posts')
      .limit(limit)
      .skip(skip);

    const total_users = await User.countDocuments(query);

    return res.status(200).json(
      new ApiResponse(
        200,
        {
          users,
          total_users,
          page,
          total_pages: Math.ceil(total_users / limit),
        },
        'Users retrieved successfully'
      )
    );
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

const updateUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const userBody = { ...req.body };

    delete userBody.password;

    const { error } = UserUpdateSchema.validate(userBody);

    if (error) {
      return res
        .status(400)
        .json(
          new ApiResponse(
            400,
            null,
            `Validation error: ${error.details[0].message}`
          )
        );
    }

    const user = await User.findByIdAndUpdate(userId, userBody, { new: true });

    if (!user) {
      return res.status(404).json(new ApiResponse(404, null, 'User not found'));
    }

    return res
      .status(200)
      .json(new ApiResponse(200, user, 'User updated successfully'));
  } catch (error) {
    console.error('Error while updating user:', error);
    return res.status(500).json(new ApiError(500, 'Internal Server Error'));
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json(new ApiResponse(404, null, 'User not found'));
    }

    return res.status(204).json(new ApiResponse(204, user, 'User deleted successfully'));
  } catch (error) {
    console.error('Error while deleting user:', error);
    throw new ApiError(500, 'Internal Server Error');
  }
};

export { getUsers, updateUser, deleteUser, getUserById };
