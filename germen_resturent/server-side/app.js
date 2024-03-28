import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
const app = express();

// EJS VIEWS Rendering
app.set('views', 'views');
app.set('view engine', 'ejs');

// Routes Imports
import authRoutes from '././src/routes/auth.route.js';
import productRoutes from './src/routes/admin/product.route.js';
import orderRoutes from './src/routes/user/order.route.js';
import categoryRoutes from './src/routes/admin/category.route.js';
import { Product } from './src/models/admin/product.model.js';

// App Middlewares
app.use('/', express.static('public'));
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/api/client', (req, res) => {
  res.render('client/index');
});

app.get('/api/admin', (req, res) => {
  res.render('admin/index');
});

app.get('/api/admin/product', (req, res) => {
  res.render('admin/products/index');
});

app.get('/api/admin/product/create', (req, res) => {
  res.render('admin/products/create');
});

app.get('/api/admin/product/get/:id', async (req, res) => {
  const { id } = req.params;
  console.log('dfkljfdf');
  const data = await Product.findById(id);
  res.render('admin/products/update', { data });
});

app.post('/api/admin/product/update/:id', async (req, res) => {
  console.log("🚀 ~ app.post ~ req:", req);
  const { id } = req.params;
  console.log('🚀 ~ app.post ~ id:', id);
  const  name  = req.body.LOVE;
  console.log(name);
  console.log('🚀 ~ app.post ~ body:', name);
  console.log('dfkljfdf');
  let data = await Product.findByIdAndUpdate(id);
  console.log('🚀 ~ app.post ~ data:', data);
  data = body;
  await data.save();
  //   res.render('admin/products/update', { data });
  res.send('OK HAI SUB');
});

// Route Middlewares
app.use('/api/auth', authRoutes);
app.use('/api/admin', productRoutes);
app.use('/api/user', orderRoutes);
app.use('/api/category', categoryRoutes);

export { app };
