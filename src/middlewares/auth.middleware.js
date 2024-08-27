import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.js';

const auth = async (req, res, next) => {
  const authHeader = req.header('Authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return res
      .status(401)
      .json({ msg: 'No token provided, authorization denied' });
  }

  try {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    let user = await User.findById(decoded._id);
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

export default auth;
