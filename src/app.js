import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import userRoutes from './routes/user.route.js';
import postRoutes from './routes/post.route.js';
import authRoutes from './routes/auth.route.js';
import { swaggerSpec, swaggerUi } from './swaggerConfig.js';

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/', (req, res) => {
  res.send('Welcome to the Node JS!');
});

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/posts', postRoutes);

export default app;
