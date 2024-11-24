const express = require('express');
const router = express.Router();
const Music = require('../models/music');

<<<<<<< HEAD
// Home page
router.get('/', async (req, res) => {
    const topMusic = await Music.find().sort({ averageRating: -1 }).limit(5);
    res.render('home', { music: topMusic });
});



=======
// GET: Home page with top-rated music
router.get('/', async (req, res) => {
    try {
        const topMusic = await Music.find().sort({ averageRating: -1 }).limit(5);
        res.render('home', { music: topMusic });
    } catch (error) {
        res.status(500).send("Error loading home page");
    }
});

>>>>>>> f67922986e180db18a768c8e723b9dcf30441774
module.exports = router;
