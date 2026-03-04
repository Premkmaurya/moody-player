const express = require('express');
const songController = require('../controllers/song.controller');

const router = express.Router();

// Get all songs
router.get('/get',songController.getSongs);

// Add a new song
router.post('/add',songController.addSong);

// delete a song by ID
router.delete('/delete/:id',songController.deleteSong);

module.exports = router;