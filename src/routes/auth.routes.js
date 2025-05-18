import { Router } from 'express';
import { addValidation } from '../utils/index.js';
import { loginSchema, registerSchema } from '../schemas/auth.validator.js';
import { login, logout, register } from '../controllers/auth.controller.js';
import { verifyJWT } from '../middlewares/index.js';

const router = new Router();

router.post('/register', addValidation(registerSchema), register);
router.post('/login', addValidation(loginSchema), login);
router.post('/logout', verifyJWT(['User', 'Admin']), logout);

export default router;
