import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isActive: { type: Boolean, default: false },
    resetToken: { type: String },
    resetTokenExpire: { type: Date },
})

const User = mongoose.model("User", userSchema);

export default User;