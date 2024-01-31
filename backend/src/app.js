import express from 'express';
import userRoutes from './routes/user.route.js';

const app = express();

app.get('/api/v1', (req, res) => {
    res.send('Welcome to the Google!');
});

app.use('/api/v1/users', userRoutes);

export default app;