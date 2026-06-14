import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      firstName: { type: String, required: true },
      middleName: { type: String },
      lastName: { type: String, required: true },
    },
    email: { type: String, required: true, unique: true },
    googleId: { type: String },
    password: {
      type: String,
      required: function () {
        return !this.googleId;
      },
    },
    role: {
      type: String,
      enum: ["user", "artist", "admin"],
      default: "user",
    },

    artistProfile: {
      stageName: {
        type: String,
        trim: true,
        required: function () {
          return this.role === "artist";
        },
      },
      bio: {
        type: String,
        trim: true,
        default: "",
      },
    },
    verified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

const userModel = mongoose.model("user", userSchema);

export default userModel;
