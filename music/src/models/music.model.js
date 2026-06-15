import mongoose from "mongoose";

const musicSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: true,
      trim: true,
    },
    subGenre: {
      type: String,
      trim: true,
      default: "",
    },
    language: {
      type: String,
      required: true,
      trim: true,
    },
    isExplicit: {
      type: Boolean,
      default: false,
    },
    releaseYear: {
      type: Number,
      required: true,
    },
    artist: {
      type: String,
      required: true,
    },
    artistId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    musicKey: {
      type: String,
      required: true,
    },
    coverImageKey: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const musicModel = mongoose.model("music", musicSchema);

export default musicModel;
