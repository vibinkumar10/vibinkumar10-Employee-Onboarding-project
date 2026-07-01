import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken.js";

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {

            return res.status(404).json({
                message: "User not found"
            });

        }
        const isMatch = await bcrypt.compare(
            password,
            user.password
        );
        if (!isMatch) {

            return res.status(401).json({
                message: "Invalid Credentials"
            });
        }
        const token = generateToken(user);
        res.status(200).json({
            message: "Login Successful",
            token,
            user: {
                id: user._id,
                email: user.email,
                role: user.role,
                employeeId: user.employee
            }
        });
    } catch (err) {

        console.error("LOGIN ERROR:", err);

        res.status(500).json({
            message: err.message,
            error: err
        });

    }
};