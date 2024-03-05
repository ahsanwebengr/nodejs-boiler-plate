import express from "express";
import cors from 'cors';
import auth from "././src/routes/auth.route.js";
const app = express();

// App Middlewares 
app.use(cors());
app.use(express());

// Route Middlewares 
app.use("/auth", auth);

export { app };