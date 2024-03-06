import express from "express";
import { 
    createUser,
    loginUser,
} from '../controllers/auth.controller.js';

const router = express.Router();

router.post("/userRegister", createUser);
router.post("/userLogin", loginUser);

export default router; 
