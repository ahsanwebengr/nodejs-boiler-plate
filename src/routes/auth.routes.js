import { Router } from 'express';
import { addValidation } from '../utils/index.js';
import { loginSchema, registerSchema } from '../schemas/auth.validator.js';
import {
  login,
  logout,
  register,
  test
} from '../controllers/auth.controller.js';
import { verifyJWT } from '../middlewares/index.js';

const router = new Router();

router.post('/register', addValidation(registerSchema), register);
router.post('/login', addValidation(loginSchema), login);
router.post('/logout', verifyJWT(['User', 'Admin']), logout);
router.get('/test', test);

export default router;
