const express = require('express');
const router = express.Router();
const Music = require('../models/music');
const Review = require('../models/review');
const mongoose = require('mongoose');


// Add music form (define this route first)
router.get('/add', (req, res) => {
    res.render('add_music');
});

// Handle add music submission
router.post('/add', async (req, res) => {
    const { title, artist, genre, releaseYear } = req.body;
    try {
        await Music.create({ title, artist, genre, releaseYear });
        res.redirect('/music');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error adding music');
    }
});

// Music list
router.get('/', async (req, res) => {
    const allMusic = await Music.find();
    res.render('music_list', { music: allMusic });
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;

    // Check if the ID is valid
    if (!mongoose.isValidObjectId(id)) {
        console.log('Invalid ID format:', id);
        return res.status(400).send('Invalid music ID');
    }

    try {
        const music = await Music.findById(id);
        if (!music) {
            console.log('Music not found for ID:', id);
            return res.status(404).send('Music not found');
        }

        const reviews = await Review.find({ musicId: id });
        res.render('music_detail', { music, reviews });
    } catch (error) {
        console.error('Error fetching music details:', error);
        res.status(500).send('Server error');
    }
});

module.exports = router;
