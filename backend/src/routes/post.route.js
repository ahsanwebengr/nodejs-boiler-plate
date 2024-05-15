import { Router } from "express";
import { createPost, deletePost, getPosts } from "../controllers/post.controller.js";
const router = new Router();

router.get('/', getPosts)
router.post('/', createPost)
router.delete('/:postId', deletePost)

export default router