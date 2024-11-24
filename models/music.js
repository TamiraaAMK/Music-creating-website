// models/music.js
const mongoose = require('mongoose');

// defines the structure for the "Music" collection in the database
const musicSchema = new mongoose.Schema({
    title: { type: String, required: true },
    artist: { type: String, required: true },
    genre: { type: String, required: true },
    releaseYear: { type: Number, required: true },
    averageRating: { type: Number, default: 0 }
});

// exporting the structure as mongoose model "Music" and creates the "Music" collection in the database
module.exports = mongoose.model('Music', musicSchema);
