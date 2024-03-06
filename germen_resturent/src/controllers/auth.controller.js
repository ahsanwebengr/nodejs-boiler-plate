import bcrypt from "bcrypt";
import { User } from "../models/user.model.js";

const createUser = async (req, res) => {

    try {
        const { email, password, userName } = req.body;
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ error: "User with this email already exists." });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = new User({ email, password: hashedPassword, userName });
        const userCreated = await newUser.save();

        res.status(201).json(userCreated);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const loginUser = async (req, res) => {
    
    try {
        const { email, password } = req.body;

        const userLogin = await User.findOne({ email });

        if (!userLogin) {
            return res.status(404).json({ error: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, userLogin.password);

        if (isPasswordValid) {
            res.status(200).json({ message: "User login successfully", userLogin });
        } else {
            res.status(401).json({ error: "Invalid password" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


export { createUser, loginUser };
