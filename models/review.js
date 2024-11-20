const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    musicId: { type: mongoose.Schema.Types.ObjectId, ref: 'Music', required: true },
    username: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5, required: true },
    reviewText: { type: String }
});

module.exports = mongoose.model('Review', reviewSchema);
