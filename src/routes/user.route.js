import { Router } from 'express';
import {
  getUsers,
  updateUser,
  deleteUser,
  getUserById,
} from '../controllers/user.controller.js';
import auth from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/', auth, getUsers);
router.get('/:userId', auth, getUserById);
router.put('/:userId', auth, updateUser);
router.delete('/:userId', auth, deleteUser);

export default router;
