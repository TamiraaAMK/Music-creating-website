const express = require('express');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();

// Middleware
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
<<<<<<< HEAD
app.use(express.urlencoded({ extended: true }));

// Fix for Mongoose strictQuery warning
mongoose.set('strictQuery', true);
=======
>>>>>>> f67922986e180db18a768c8e723b9dcf30441774

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// Routes
const indexRoutes = require('./routes/index');
const musicRoutes = require('./routes/music');

<<<<<<< HEAD



=======
>>>>>>> f67922986e180db18a768c8e723b9dcf30441774
app.use('/', indexRoutes);
app.use('/music', musicRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
