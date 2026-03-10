const express = require("express");
const songController = require("../controllers/song.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const multer = require("multer");

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

// Get all songs
router.get("/get", authMiddleware, songController.getSongs);

// Add a new song
router.post(
  "/add",
  authMiddleware,
  upload.fields([
    { name: "song", maxCount: 1 },
    { name: "coverImage", maxCount: 1 },
  ]),
  songController.addSong,
);

// delete a song by ID
router.delete("/delete/:id", authMiddleware, songController.deleteSong);

module.exports = router;
