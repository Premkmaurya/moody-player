const songModel = require("../models/song.model");
const { uploadSong, uploadImage } = require("../services/storage.service");
const { v4: uuidv4 } = require("uuid");

// -------- Controller to get all songs --------
async function getSongs(req, res) {
  const { mood } = req.query;
  try {
    const songs = await songModel.find({ category: mood });
    res.json(songs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching songs", error });
  }
}

// -------- Controller to add a new song --------
async function addSong(req, res) {
  if (req.user.type !== "artist") {
    return res.status(500).json({
      message: "only artist can add songs.",
    });
  }
  try {
    const { title, artist, lyrics, category } = req.body;
    const song = req.files.song[0];
    const coverImage = req.files.coverImage[0];

    if (!title || !artist || !song || !category) {
      return res
        .status(400)
        .json({ message: "Title, artist, URL, and category are required" });
    }

    const [uploadedSong, uploadedImage] = await Promise.all([
      uploadSong(song.buffer, `${uuidv4()}`),
      uploadImage(coverImage.buffer, `${uuidv4()}`),
    ]);

    const newSong = new songModel({
      title,
      artist,
      url: uploadedSong.url,
      coverImage: uploadedImage.url,
      lyrics,
      category,
    });
    await newSong.save();
    res.status(201).json(newSong);
  } catch (error) {
    res.status(500).json({ message: "Error adding song", error });
  }
}

// -------- Controller to delete a song --------
async function deleteSong(req, res) {
  if (req.user.type !== "artist") {
    return res.status(500).json({
      message: "only artist can add songs.",
    });
  }
  try {
    const { id } = req.params;
    const deletedSong = await songModel.findByIdAndDelete(id);
    if (!deletedSong) {
      return res.status(404).json({ message: "Song not found" });
    }
    res.json({ message: "Song deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting song", error });
  }
}

module.exports = {
  getSongs,
  addSong,
  deleteSong,
};
