<<<<<<< HEAD
const mongoose = require('mongoose');

=======
// models/music.js
const mongoose = require('mongoose');

// defines the structure for the "Music" collection in the database
>>>>>>> f67922986e180db18a768c8e723b9dcf30441774
const musicSchema = new mongoose.Schema({
    title: { type: String, required: true },
    artist: { type: String, required: true },
    genre: { type: String, required: true },
    releaseYear: { type: Number, required: true },
    averageRating: { type: Number, default: 0 }
});

<<<<<<< HEAD
=======
// exporting the structure as mongoose model "Music" and creates the "Music" collection in the database
>>>>>>> f67922986e180db18a768c8e723b9dcf30441774
module.exports = mongoose.model('Music', musicSchema);
