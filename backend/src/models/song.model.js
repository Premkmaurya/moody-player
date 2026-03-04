const mongoose = require("mongoose");

const { Schema } = mongoose;

const SongSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    artist: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      trim: true,
      required: true,
      enum:["happy", "sad", "angry", "excited"],
      default: "happy",
    },
    url: {
      type: String,
      required: true,
    }, // file or streaming URL
    coverImage: {
      type: String,
    }, // URL or path to cover image
    lyrics: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

const songModel = mongoose.model("song", SongSchema);


module.exports = songModel;
