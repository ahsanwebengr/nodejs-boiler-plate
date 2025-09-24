import { Router } from 'express';
import { addValidation } from '../utils/index.js';
import {
  forgotPasswordSchema,
  loginSchema,
  registerSchema,
  resetPasswordSchema,
  verifyEmailSchema
} from '../validators/auth.validator.js';
import {
  forgotPassword,
  login,
  loginWithGoogle,
  logout,
  register,
  resetPassword,
  verifyResetOTP
} from '../controllers/auth.controller.js';
import { rateLimiter, verifyJWT } from '../middlewares/index.js';
import { ROLES } from '../constants/index.js';

const router = new Router();

router.post('/register', addValidation(registerSchema), register);
router.post('/login', addValidation(loginSchema), login);
router.post('/logout', verifyJWT([ROLES.USER]), logout);
router.post('/google', loginWithGoogle);

router.post(
  '/forgot-password',
  addValidation(forgotPasswordSchema),
  forgotPassword
);
router.post(
  '/verify-reset-otp',
  addValidation(verifyEmailSchema),
  rateLimiter,
  verifyResetOTP
);
router.post(
  '/reset-password',
  addValidation(resetPasswordSchema),
  resetPassword
);

export default router;
