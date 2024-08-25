import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import UserValidation from '../utils/validations/users.js';

const registerUser = async (req, res) => {
  try {
    const { username, email, fullName, avatar, password, posts } = req.body;

    const { error } = UserValidation.validate(req.body);
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

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      username,
      email,
      fullName,
      avatar,
      password: hashedPassword,
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
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: 'Invalid Password',
      });
    }

    const payload = { user: { id: user.id } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

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
