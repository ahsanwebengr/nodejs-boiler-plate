import { Router } from 'express';
import {
  createUser,
  getUsers,
  updateUser,
  deleteUser,
  getUserById,
} from '../controllers/user.controller.js';

const router = Router();

router.get('/', getUsers);

router.get('/:userId', getUserById);

router.post('/', createUser);

router.put('/:userId', updateUser);

/**
 * @swagger
 * /users/{userId}:
 *   delete:
 *     summary: Delete a user
 *     description: Delete a user by their ID
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user to be deleted
 *     responses:
 *       '200':
 *         description: User successfully deleted
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Server error
 *     tags:
 *       - Users
 */
router.delete('/:userId', deleteUser);

export default router;
