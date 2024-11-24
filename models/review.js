// models/music.js
const mongoose = require('mongoose');

// defines structure for the "Review" collection in the database
const reviewSchema = new mongoose.Schema({
    // references to the ID of the music being reviewed. This is required and connects the review to a specific music entry
    musicId: { type: mongoose.Schema.Types.ObjectId, ref: 'Music', required: true },
    username: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5, required: true },
    reviewText: { type: String } // optional text for the review
});

// exports the structure as a mongoose model named "Review"
module.exports = mongoose.model('Review', reviewSchema);
