import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { UserCreationSchema } from '../utils/validations/users.js';

const registerUser = async (req, res) => {
  try {
    const { username, email, fullName, avatar, password, posts } = req.body;

    const { error } = UserCreationSchema.validate(req.body);
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
      posts,
    });

    const payload = { user: { id: user.id } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    return res
      .status(201)
      .json(
        new ApiResponse(201, { user, token }, 'User registered successfully')
      );
  } catch (error) {
    console.error('Error while registering user:', error);
    throw new ApiError(500, 'Internal Server Error');
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid Email Address',
      });
    }

    const isMatch = await user.isPasswordCorrect(password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: 'Invalid Password',
      });
    }

    const token = user.generateAccessToken();

    return res.json({
      success: true,
      token,
      message: 'Login successful',
    });
  } catch (err) {
    console.error('Error during login:', err);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};

export { registerUser, loginUser };
