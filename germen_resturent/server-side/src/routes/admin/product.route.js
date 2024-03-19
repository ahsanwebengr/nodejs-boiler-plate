import { Router } from 'express';
import {
  createProduct,
  allProducts,
  singleProduct,
  updateProduct,
  deleteProduct,
} from '../../controllers/admin/product.controller.js';
import { fileUpload } from '../../middlewares/multer.js';
const router = Router();

router.post('/addProduct',fileUpload, createProduct);
router.get('/getProducts', allProducts);
router.get('/getProducts/:id', singleProduct);
router.put('/editProduct/:id', updateProduct);
router.delete('/removeProduct/:id', deleteProduct);

export default router;
