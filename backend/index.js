import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3100;

app.get('/', (req, res) => {
    res.send('Welcome from Index!');
    res.end();
});

// Server Listening
app.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}`);
});
