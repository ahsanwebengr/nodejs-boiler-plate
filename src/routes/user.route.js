import { Router } from 'express';
import {
  createUser,
  getUsers,
  updateUser,
  deleteUser,
  getUserById,
} from '../controllers/user.controller.js';
import auth from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/', auth, getUsers);

router.get('/:userId', getUserById);

router.post('/', createUser);

router.put('/:userId', updateUser);

router.delete('/:userId', deleteUser);

export default router;
