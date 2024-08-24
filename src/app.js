import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './routes/user.route.js';
import postRoutes from './routes/post.route.js';
import { swaggerSpec, swaggerUi } from './swaggerConfig.js';

const app = express();
app.use(express.json());
app.use(bodyParser.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/', (req, res) => {
  res.send('Welcome to the Node JS!');
});

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/posts', postRoutes);

export default app;
