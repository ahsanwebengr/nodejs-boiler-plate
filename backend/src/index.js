import app from "./app.js";
import { connectDB } from "./db/index.js";
import { config } from 'dotenv';
config();

const port = process.env.PORT || 8000;

connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Server listening on http://localhost:${port}/api/v1`);
    });
}).catch((err) => {
    console.log('Failed to Start Server', err);
});

