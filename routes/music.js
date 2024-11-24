const express = require('express');
const router = express.Router();
const Music = require('../models/music');
const Review = require('../models/review');
<<<<<<< HEAD
const mongoose = require('mongoose');


// Add music form (define this route first)
=======

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
>>>>>>> f67922986e180db18a768c8e723b9dcf30441774
router.get('/add', (req, res) => {
    res.render('add_music');
});

<<<<<<< HEAD
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
=======
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
>>>>>>> f67922986e180db18a768c8e723b9dcf30441774
    }
});

module.exports = router;
