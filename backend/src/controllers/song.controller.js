const songModel = require("../models/song.model");



// -------- Controller to get all songs --------
async function getSongs(req, res) {
  try {
    const songs = await songModel.find();
    res.json(songs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching songs", error });
  }
}

// -------- Controller to add a new song --------
async function addSong(req, res) {
  try {
    const { title, artist, album, url, coverImage, lyrics, category } =
      req.body;
    if (!title || !artist || !url || !category) {
      return res
        .status(400)
        .json({ message: "Title, artist, URL, and category are required" });
    }
    const newSong = new songModel({
      title,
      artist,
      album,
      url,
      coverImage,
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
