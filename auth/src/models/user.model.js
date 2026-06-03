import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName: {
        firstName: { type: String, required: true },
        middleName: { type: String },
        lastName: { type: String, required: true }
    },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: () => !this.googleId },
    googleId: { type: String },
    role: {
        type: String,
        enum: ["user", "artist"],
        default: "user"
    }
}, { timestamps: true});

const userModel = mongoose.model("user", userSchema);

export default userModel;
