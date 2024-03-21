import { Router } from 'express';
import {
  createOrder,
  deleteOrder,
  editOrder,
  getOrders,
  getSingleOrders,
} from '../../controllers/user/order.controller.js';

const router = new Router();

router.post('/createOrder', createOrder);
router.put('/editOrder/:id', editOrder);
router.delete('/deleteOrder/:id', deleteOrder);
router.get('/getOrders', getOrders);
router.get('/getOrders/:id', getSingleOrders);

export default router;
