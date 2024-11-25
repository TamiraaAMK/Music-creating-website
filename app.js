const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const app = express();
const authRoutes = require('./routes/auth');
const indexRoutes = require('./routes/index');
const musicRoutes = require('./routes/music');
require('dotenv').config();

// Middleware
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Session setup
app.use(session({
    secret: 'yourSecretKey', 
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } 
}));

// Middleware to protect routes
function requireLogin(req, res, next) {
    if (!req.session.userId) {
        return res.redirect('/auth/login'); // Redirect to login if not logged in
    }
    next();
}

// Use auth routes for login/register
app.use('/auth', authRoutes);

// Fix for Mongoose strictQuery warning
mongoose.set('strictQuery', true);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// Use other routes
app.use('/', indexRoutes);
app.use('/music', requireLogin, musicRoutes); // Protect /music routes with login

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
