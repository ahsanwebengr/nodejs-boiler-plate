import express from 'express';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import userRoutes from './routes/user.route.js';
import swaggerSpec from './swaggerConfig.js';

const app = express();
app.use(express.json());
app.use(bodyParser.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/', (req, res) => {
  res.send('Welcome to the Google!');
});

app.use('/api/v1/users', userRoutes);

export default app;
