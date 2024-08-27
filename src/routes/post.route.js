import { Router } from 'express';
import {
  createPost,
  deletePost,
  getPosts,
  updatePost,
} from '../controllers/post.controller.js';
import auth from '../middlewares/auth.middleware.js';

const router = new Router();

router.get('/', auth, getPosts);
router.post('/', auth, createPost);
router.put('/:postId', auth, updatePost);
router.delete('/:postId', auth, deletePost);

export default router;
