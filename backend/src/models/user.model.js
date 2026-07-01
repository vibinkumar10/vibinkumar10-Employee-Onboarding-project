import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["admin", "employee"],
        default: "employee"
    },
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "employees"
    }
}, {
    timestamps: true
});

const User = mongoose.model("users", userSchema);

export default User;