import express from "express";
import cors from 'cors';
import bodyParser from "body-parser";
import auth from "././src/routes/auth.route.js";
const app = express();

// App Middlewares 
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());
app.use(express());

// Route Middlewares 
app.use("/api/auth", auth);

export { app };