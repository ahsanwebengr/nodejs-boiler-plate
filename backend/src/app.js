import express from 'express';

const app = express();

app.get('/api/v1', (req, res) => {
    res.send('Welcome to the Google!');
});

export default app;