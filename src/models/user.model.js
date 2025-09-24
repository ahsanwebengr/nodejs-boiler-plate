import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { ACCESS_TOKEN_SECRET } from '../configs/env.config.js';

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    password: {
      type: String,
      select: false
    },
    role: {
      type: String,
      enum: ['Admin', 'User'],
      default: 'User'
    },
    accessToken: {
      type: [String],
      default: []
    },
    resetPassword: {
      otp: String,
      expiry: Date,
      verified: { type: Boolean, default: false },
      updatedAt: { type: Date }
    },

    provider: {
      type: String,
      enum: ['google', 'local'],
      default: 'local'
    },
    googleId: { type: String, unique: true }
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      role: this.role
    },
    ACCESS_TOKEN_SECRET
  );
};

const Users = model('User', userSchema);

export default Users;
