import express from "express";
import auth from "././src/routes/auth.route.js";
const app = express();

// Route Middlewares 
app.use("/auth", auth);

export { app };