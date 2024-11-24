const express = require('express');
const router = express.Router();
const Music = require('../models/music');

// Home page
router.get('/', async (req, res) => {
    const topMusic = await Music.find().sort({ averageRating: -1 }).limit(5);
    res.render('home', { music: topMusic });
});



module.exports = router;
