const mongoose = require('mongoose');

const musicSchema = new mongoose.Schema({
    title: { type: String, required: true },
    artist: { type: String, required: true },
    genre: { type: String, required: true },
    releaseYear: { type: Number, required: true },
    averageRating: { type: Number, default: 0 }
});

module.exports = mongoose.model('Music', musicSchema);
