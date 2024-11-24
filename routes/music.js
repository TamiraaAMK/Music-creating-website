const express = require('express');
const router = express.Router();
const Music = require('../models/music');
const Review = require('../models/review');

// GET: List all music
router.get('/', async (req, res) => {
    try {
        const allMusic = await Music.find();
        res.render('music_list', { music: allMusic });
    } catch (error) {
        res.status(500).send("Error retrieving music list");
    }
});

// GET: Show details for a specific music item
router.get('/:id', async (req, res) => {
    try {
        const music = await Music.findById(req.params.id);
        const reviews = await Review.find({ musicId: req.params.id });
        if (!music) {
            return res.status(404).send("Music not found");
        }
        res.render('music_detail', { music, reviews });
    } catch (error) {
        res.status(500).send("Error retrieving music details");
    }
});

// GET: Show form to add new music
router.get('/add', (req, res) => {
    res.render('add_music');
});

// POST: Handle new music creation
router.post('/add', async (req, res) => {
    const { title, artist, genre, releaseYear } = req.body;
    try {
        const newMusic = new Music({ title, artist, genre, releaseYear });
        await newMusic.save();
        res.redirect('/music');
    } catch (error) {
        res.status(500).send("Error adding new music");
    }
});

// POST: Add a review to a specific music item
router.post('/:id/review', async (req, res) => {
    const { username, rating, reviewText } = req.body;
    try {
        const review = new Review({
            musicId: req.params.id,
            username,
            rating,
            reviewText
        });
        await review.save();

        // Update the average rating for the music item
        const reviews = await Review.find({ musicId: req.params.id });
        const averageRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
        await Music.findByIdAndUpdate(req.params.id, { averageRating });

        res.redirect(`/music/${req.params.id}`);
    } catch (error) {
        res.status(500).send("Error adding review");
    }
});

// DELETE: Remove a music item by ID
router.delete('/:id', async (req, res) => {
    try {
        await Music.findByIdAndDelete(req.params.id);
        res.redirect('/music');
    } catch (error) {
        res.status(500).send("Error deleting music");
    }
});

module.exports = router;
