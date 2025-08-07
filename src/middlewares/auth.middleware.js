import jwt from 'jsonwebtoken';
import { MESSAGES, STATUS_CODES } from '../constants/index.js';
import Users from '../models/user.model.js';
import { asyncHandler, checkField, handleError } from '../utils/index.js';
import { ACCESS_TOKEN_SECRET } from '../configs/env.config.js';

export const verifyJWT = (roles = []) =>
  asyncHandler(async (req, _, next) => {
    try {
      const token =
        req.cookies?.accessToken || req.headers.authorization?.split(' ')[1];
      checkField(!token, MESSAGES.UNAUTHORIZED, STATUS_CODES.UNAUTHORIZED);

      const decodedToken = jwt.verify(token, ACCESS_TOKEN_SECRET);

      const user = await Users.findById(decodedToken?._id).select('-password');
      checkField(!user, MESSAGES.UNAUTHORIZED, STATUS_CODES.UNAUTHORIZED);

      if (roles.includes(user?.role)) {
        req.user = user;
        next();
      } else {
        handleError(next, MESSAGES.FORBIDDEN, STATUS_CODES.FORBIDDEN);
      }
    } catch {
      handleError(next, MESSAGES.UNAUTHORIZED, STATUS_CODES.UNAUTHORIZED);
    }
  });
