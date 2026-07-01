import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import User from "../models/user.model.js";
dotenv.config();

const createAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const adminExists = await User.findOne({
            email: "admin@gmail.com"
        });

        if (adminExists) {
            console.log("Admin already exists.");
            process.exit();
        }

        const hashedPassword = await bcrypt.hash("Admin@123", 10);

        await User.create({
            email: "admin@gmail.com",
            password: hashedPassword,
            role: "admin"
        });

        console.log("Admin created successfully!");
        process.exit();

    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

createAdmin();