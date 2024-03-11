import bcrypt from 'bcrypt';
import { User } from '../models/user.model.js';
import { transporter } from '../senders/emailSend.js';
import { generateOTP } from '../utils/otp.js';

const createUser = async (req, res) => {
  try {
    const { email, password, userName } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ error: 'User with this email already exists.', success: false });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({ email, password: hashedPassword, userName });
    const userCreated = await newUser.save();

    res.status(201).json({ userCreated, success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error', success: false });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userLogin = await User.findOne({ email });

    if (!userLogin) {
      return res.status(404).json({ error: 'User not found', success: false });
    }

    const isPasswordValid = await bcrypt.compare(password, userLogin.password);

    if (isPasswordValid) {
      res
        .status(200)
        .json({ message: 'User login successfully', userLogin, success: true });
    } else {
      res.status(401).json({ error: 'Invalid password', success: false });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error', success: false });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    let userEmail = await User.findOne({ email });

    if (!userEmail) {
      res.status(404).json({ error: 'This email does not exist', success: false });
    }

    const otp = generateOTP(6);

    const mailOptions = {
      from: 'jeanne.considine54@ethereal.email',
      to: email,
      subject: 'Password Reset',
      html: `
        <div style="font-family: 'Arial', sans-serif; background-color: #f4f4f4; padding: 20px; text-align: center;">
            <h2 style="color: #333;">Password Reset</h2>
            <p style="color: #555;">Use the following verification code to reset your password:</p>
            <div style="background-color: #fff; padding: 10px; border: 1px solid #ddd; border-radius: 5px; font-size: 18px; color: #333; margin: 20px 0;">
                <strong>${otp}</strong>
            </div>
            <p style="color: #555;">This code is valid for a limited time. Do not share it with others.</p>
        </div>
    `,
    };

    await transporter.sendMail(mailOptions);

    res
      .status(200)
      .json({ message: 'OTP sent to your email for password reset', success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Server Error', success: false });
  }
};

export { createUser, loginUser, forgotPassword };
