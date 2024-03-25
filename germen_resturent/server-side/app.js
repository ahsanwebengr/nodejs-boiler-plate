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

app.get('/api/admin/product/update', (req, res) => {
  res.render('admin/products/update');
});

// Route Middlewares
app.use('/api/auth', authRoutes);
app.use('/api/admin', productRoutes);
app.use('/api/user', orderRoutes);

export { app };
