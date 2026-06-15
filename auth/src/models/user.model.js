import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      firstName: { type: String, required: true },
      middleName: { type: String, trim: true },
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
      required: true,
    },

    // Artist fields
    isStageNameSameAsFullName: {
      type: Boolean,
      default: false,
    },

    stageName: {
      type: String,
      trim: true,
    },

    isVerified: {
      type: Boolean,
      default: false,
      required: true
    },
  },
  { timestamps: true },
);

userSchema.pre("validate", function (next) {
  if (this.role !== "artist") {
    this.isStageNameSameAsFullName = undefined;
    this.stageName = undefined;
    this.bio = undefined;
    this.verified = undefined;
    return;
  }

  const { firstName, middleName, lastName } = this.fullName;

  const fullArtistName = [firstName, middleName, lastName]
    .map((name) => name?.trim())
    .filter(Boolean)
    .join(" ");

  if (this.isStageNameSameAsFullName === true) this.stageName = fullArtistName;

  if (this.isStageNameSameAsFullName === false && !this.stageName?.trim()) this.invalidate( "stageName", "Stage name is required when it is different from full name" );
});


const userModel = mongoose.model("user", userSchema);

export default userModel;
