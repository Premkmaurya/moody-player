const express = require('express');
const songController = require('../controllers/song.controller');

const router = express.Router();


router.get('/get',songController.getSongs);

router.post('/add',songController.addSong);

router.delete('/delete/:id',songController.deleteSong);

module.exports = router;