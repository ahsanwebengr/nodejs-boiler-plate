import { Router } from 'express';
import { createCategory } from '../../controllers/admin/category.controller.js';

const router = new Router();

router.post('/create', createCategory);

export default router;
