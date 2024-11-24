const express = require('express');
const router = express.Router();
const Music = require('../models/music');

// GET: Home page with top-rated music
router.get('/', async (req, res) => {
    try {
        const topMusic = await Music.find().sort({ averageRating: -1 }).limit(5);
        res.render('home', { music: topMusic });
    } catch (error) {
        res.status(500).send("Error loading home page");
    }
});

module.exports = router;
