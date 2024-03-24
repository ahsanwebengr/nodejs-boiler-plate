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
  res.render('index');
});

// Route Middlewares
app.use('/api/auth', authRoutes);
app.use('/api/admin', productRoutes);
app.use('/api/user', orderRoutes);

export { app };
