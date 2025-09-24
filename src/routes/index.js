import express from 'express';

import authRoutes from './auth.routes.js';
// import paymentRoutes from './payment.routes.js';
const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoutes
  }
];

// router.use('/payment', paymentRoutes);

router.use(express.json({ limit: '16kb' }));

defaultRoutes.forEach(({ path, route }) => {
  router.use(path, route);
});

export default router;
