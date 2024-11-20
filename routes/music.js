const express = require('express');
const router = express.Router();
const Music = require('../models/music');
const Review = require('../models/review');

// Music list
router.get('/', async (req, res) => {
    const allMusic = await Music.find();
    res.render('music_list', { music: allMusic });
});

// Music detail
router.get('/:id', async (req, res) => {
    const music = await Music.findById(req.params.id);
    const reviews = await Review.find({ musicId: req.params.id });
    res.render('music_detail', { music, reviews });
});

// Add music form
router.get('/add', (req, res) => {
    res.render('add_music');
});

// Handle add music submission
router.post('/add', async (req, res) => {
    const { title, artist, genre, releaseYear } = req.body;
    await Music.create({ title, artist, genre, releaseYear });
    res.redirect('/music');
});

module.exports = router;
