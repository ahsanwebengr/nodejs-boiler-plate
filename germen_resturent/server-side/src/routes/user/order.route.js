import { Router } from 'express';
import { createOrder } from '../../controllers/user/order.controller.js';

const router = new Router();

router.post('/createOrder', createOrder);

export default router;
