const express = require('express');
const router = express.Router();
const Music = require('../models/music');
const Review = require('../models/review');
const mongoose = require('mongoose');
const { isAuthenticated } = require('../middleware/auth'); // Import the isAuthenticated middleware

// Add music form (protected route)
router.get('/add', isAuthenticated, (req, res) => {
    res.render('add_music');
});

router.post('/add', async (req, res) => {
    const { title, artist, genre, releaseYear } = req.body;

    try {
        if (!title || !artist || !genre || !releaseYear) {
            return res.status(400).send('All fields are required');
        }

        const newMusic = new Music({
            title,
            artist,
            genre,
            releaseYear: parseInt(releaseYear)
        });

        await newMusic.save();
        res.redirect('/music');
    } catch (error) {
        res.status(500).send('Server error');
    }
});


// Handle add music submission (protected route)
router.post('/:id/review', async (req, res) => {
    const { id } = req.params;
    const { username, rating, reviewText } = req.body;

    if (!mongoose.isValidObjectId(id)) {
        console.log('Invalid music ID:', id);
        return res.status(400).send('Invalid music ID');
    }

    try {
        const music = await Music.findById(id);
        if (!music) {
            console.log('Music not found:', id);
            return res.status(404).send('Music not found');
        }

        const newReview = await Review.create({
            musicId: id,
            username,
            rating: parseInt(rating),
            reviewText
        });

        const reviews = await Review.find({ musicId: id });
        const averageRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

        music.averageRating = averageRating.toFixed(1);
        await music.save();

        res.redirect(`/music/${id}`);
    } catch (error) {
        console.error('Error adding review:', error);
        res.status(500).send('Server error');
    }
});


// Music list (public route)
router.get('/', async (req, res) => {
    const allMusic = await Music.find();
    res.render('music_list', { music: allMusic });
});

// Music detail (public route)
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
